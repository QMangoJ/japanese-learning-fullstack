import { jstToday } from "./lesson-review";
import {
	addIsoDays,
	dueEntry,
	dueToday,
	grammarDueId,
	mistakeDueDraft,
	type DueEntry,
	type DueKind,
} from "./due-review";
import { reviewMistakes } from "./store";

/** How many cards today's review shows. Recent study fills these first. */
export const DAILY_REVIEW_CAP = 12;
/** Yesterday wins. Otherwise the newest study day in this window, including today. */
export const ACTIVITY_LOOKBACK_DAYS = 14;

const ACTIVITY_KEY = "jl-grammar-visits-v1";
const DONE_KEY = "jl-daily-review-done-v1";
const KEEP_DAYS = 21;
const MAX_HITS = 400;
const SNAP = 800;

export type GrammarVisitPoint = {
	pattern: string;
	reading?: string;
	cn?: string;
	en?: string;
};

export type GrammarHit = {
	id: string;
	date: string;
	count: number;
	focused: number;
	jp: string;
	cn: string;
	en: string;
	reading?: string;
	ts: number;
};

export type ReviewReason = "grammar" | "mistake" | "due";

export type ReviewCard = DueEntry & {
	reason: ReviewReason;
	times: number;
	weight: number;
};

export type DailyReview = {
	cards: ReviewCard[];
	sourceDate: string | null;
	candidateCount: number;
};

const listeners = new Set<() => void>();
let version = 0;

export function subscribeReview(listener: () => void) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

export function getReviewVersion() {
	return version;
}

function emit() {
	version += 1;
	listeners.forEach((fn) => fn());
}

function clip(value: string | undefined, max: number) {
	const text = typeof value === "string" ? value : "";
	return text.length > max ? text.slice(0, max) : text;
}

function roundWeight(value: number) {
	return Math.round(value * 100) / 100;
}

export function isoDaySpan(from: string, to: string) {
	const start = Date.parse(`${from}T00:00:00Z`);
	const end = Date.parse(`${to}T00:00:00Z`);
	if (!Number.isFinite(start) || !Number.isFinite(end)) return 0;
	return Math.round((end - start) / 86_400_000);
}

function salt(today: string, id: string) {
	let hash = 2166136261;
	const text = `${today}:${id}`;
	for (let i = 0; i < text.length; i++) {
		hash ^= text.charCodeAt(i);
		hash = Math.imul(hash, 16777619);
	}
	return (hash >>> 0) % 1000;
}

function readJson(key: string): unknown {
	try {
		if (typeof localStorage === "undefined") return null;
		const raw = localStorage.getItem(key);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}

function isHit(value: unknown): value is GrammarHit {
	if (!value || typeof value !== "object" || Array.isArray(value)) return false;
	const item = value as GrammarHit;
	return typeof item.id === "string" && item.id.length > 0 && item.id.length <= 1000
		&& /^\d{4}-\d{2}-\d{2}$/.test(item.date)
		&& Number.isInteger(item.count) && item.count > 0 && item.count < 10_000
		&& Number.isInteger(item.focused) && item.focused >= 0
		&& typeof item.jp === "string"
		&& typeof item.cn === "string"
		&& typeof item.en === "string"
		&& typeof item.ts === "number" && Number.isFinite(item.ts);
}

function readHits(): GrammarHit[] {
	const raw = readJson(ACTIVITY_KEY);
	if (!Array.isArray(raw)) return [];
	return raw.filter(isHit);
}

function writeHits(hits: GrammarHit[]) {
	try {
		localStorage.setItem(ACTIVITY_KEY, JSON.stringify(hits));
	} catch {
		/* ignore quota / private mode */
	}
}

function readDone(today: string): Set<string> {
	const raw = readJson(DONE_KEY);
	if (!raw || typeof raw !== "object" || Array.isArray(raw)) return new Set();
	const file = raw as { date?: unknown; ids?: unknown };
	if (file.date !== today || !Array.isArray(file.ids)) return new Set();
	return new Set(file.ids.filter((id): id is string => typeof id === "string" && id.length > 0));
}

/** A card graded today stays out of today's pile. A miss is due tomorrow; a pass waits longer. */
function isSettled(id: string, today: string) {
	if (readDone(today).has(id)) return true;
	const entry = dueEntry(id);
	if (!entry || entry.deleted) return false;
	return jstToday(entry.ts) === today && entry.due > today;
}

/**
 * Weight of an existing card.
 * Step 0 (still learning) counts double. A card already passed and not yet due counts less,
 * so glancing at it again rarely crowds out something new.
 */
function weakness(id: string, today: string) {
	const entry = dueEntry(id);
	if (!entry || entry.deleted) return 1;
	if (entry.step === 0) return 2;
	if (entry.due > today) return 0.35;
	return 1.4;
}

function grammarWeight(hit: GrammarHit, today: string) {
	const times = Math.min(Math.max(hit.count, 1), 4);
	const opened = (hit.focused > 0 ? 3 : 1) * times;
	return opened * weakness(hit.id, today);
}

function mistakeWeight(level: string, id: string, today: string) {
	const familiarity = level === "done" ? 0.4 : level === "mid" ? 0.7 : 1;
	return 5 * familiarity * weakness(id, today);
}

function dueItemWeight(entry: DueEntry, today: string) {
	const late = Math.min(Math.max(isoDaySpan(entry.due, today), 0), 3);
	return (entry.step === 0 ? 4 : 2) + late;
}

function dedupe(cards: ReviewCard[]) {
	const byId = new Map<string, ReviewCard>();
	for (const card of cards) {
		const prev = byId.get(card.id);
		if (!prev || card.weight > prev.weight) byId.set(card.id, card);
	}
	return [...byId.values()];
}

function rank(cards: ReviewCard[], today: string) {
	return [...cards].sort((a, b) => {
		const scoreA = a.weight * 10_000 + salt(today, a.id);
		const scoreB = b.weight * 10_000 + salt(today, b.id);
		if (scoreB !== scoreA) return scoreB - scoreA;
		return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
	});
}

function studySourceDate(today: string, hits: GrammarHit[], mistakes: { ts: number }[]) {
	const earliest = addIsoDays(today, -ACTIVITY_LOOKBACK_DAYS);
	const dates: string[] = [];
	for (const hit of hits) {
		if (hit.date <= today && hit.date >= earliest) dates.push(hit.date);
	}
	for (const mistake of mistakes) {
		if (!mistake.ts) continue;
		const date = jstToday(mistake.ts);
		if (date <= today && date >= earliest) dates.push(date);
	}
	if (!dates.length) return null;
	const yesterday = addIsoDays(today, -1);
	if (dates.includes(yesterday)) return yesterday;
	dates.sort();
	return dates[dates.length - 1];
}

function cardShell(
	id: string,
	kind: DueKind,
	jp: string,
	cn: string,
	en: string,
	reading: string | undefined,
	ts: number,
	reason: ReviewReason,
	times: number,
	weight: number,
	fallbackDue: string,
): ReviewCard {
	const entry = dueEntry(id);
	const card: ReviewCard = {
		id,
		kind,
		jp: entry?.jp || jp,
		cn: entry?.cn || cn,
		en: entry?.en || en,
		due: entry?.due || fallbackDue,
		step: entry && !entry.deleted ? entry.step : 0,
		ts: entry?.ts || ts,
		reason,
		times,
		weight: roundWeight(weight),
	};
	const ruby = entry?.reading || reading;
	if (ruby) card.reading = ruby;
	return card;
}

/** Record each grammar point on a page the learner opened. A focused point weighs more. */
export function recordGrammarPage(input: {
	module: string;
	week: number;
	day: number;
	focused: number | null;
	points: GrammarVisitPoint[];
	today?: string;
	now?: number;
}) {
	const today = input.today && /^\d{4}-\d{2}-\d{2}$/.test(input.today) ? input.today : jstToday();
	const now = input.now ?? Date.now();
	const earliest = addIsoDays(today, -KEEP_DAYS);
	const hits = readHits().filter((hit) => hit.date >= earliest && hit.date <= today);
	let changed = false;
	for (let index = 0; index < input.points.length; index++) {
		const point = input.points[index];
		const pattern = clip(point?.pattern, 180).trim();
		if (!pattern) continue;
		const id = grammarDueId(input.module, input.week, input.day, pattern);
		if (id.length > 1000) continue;
		const jp = clip(pattern, SNAP);
		const cn = clip(point.cn, SNAP);
		const en = clip(point.en, SNAP);
		const reading = clip(point.reading, 200);
		const prev = hits.find((hit) => hit.id === id && hit.date === today);
		const focusedBump = input.focused === index ? 1 : 0;
		if (prev) {
			prev.count += 1;
			prev.focused += focusedBump;
			prev.ts = now;
			prev.jp = jp;
			prev.cn = cn;
			prev.en = en;
			if (reading) prev.reading = reading;
		} else {
			const hit: GrammarHit = { id, date: today, count: 1, focused: focusedBump, jp, cn, en, ts: now };
			if (reading) hit.reading = reading;
			hits.push(hit);
		}
		changed = true;
	}
	if (!changed) return;
	hits.sort((a, b) => b.ts - a.ts);
	writeHits(hits.slice(0, MAX_HITS));
	emit();
}

export function markReviewed(id: string, today = jstToday()) {
	const ids = [...readDone(today)];
	if (!ids.includes(id)) ids.push(id);
	try {
		localStorage.setItem(DONE_KEY, JSON.stringify({ date: today, ids }));
	} catch {
		/* ignore */
	}
	emit();
}

export function selectDailyReview(today = jstToday()): DailyReview {
	const hits = readHits();
	const mistakes = reviewMistakes();
	const sourceDate = studySourceDate(today, hits, mistakes);
	const activity: ReviewCard[] = [];
	if (sourceDate) {
		for (const hit of hits) {
			if (hit.date !== sourceDate || isSettled(hit.id, today)) continue;
			const weight = grammarWeight(hit, today);
			if (weight <= 0) continue;
			activity.push(cardShell(hit.id, "grammar", hit.jp, hit.cn, hit.en, hit.reading, hit.ts, "grammar", hit.count, weight, sourceDate));
		}
		for (const mistake of mistakes) {
			if (!mistake.ts || jstToday(mistake.ts) !== sourceDate) continue;
			const draft = mistakeDueDraft(mistake);
			if (!draft || isSettled(draft.id, today)) continue;
			const weight = mistakeWeight(mistake.level, draft.id, today);
			activity.push(cardShell(draft.id, "mistake", draft.jp, draft.cn, draft.en, draft.reading, mistake.ts, "mistake", 1, weight, sourceDate));
		}
	}
	const uniqueActivity = dedupe(activity);
	const activityIds = new Set(uniqueActivity.map((card) => card.id));
	const earliestTouch = addIsoDays(today, -ACTIVITY_LOOKBACK_DAYS);
	const dueCards: ReviewCard[] = [];
	for (const entry of dueToday(today)) {
		if (activityIds.has(entry.id) || isSettled(entry.id, today)) continue;
		// An untouched backlog is what made this page feel useless. Only cards touched recently fill the leftover slots.
		if (!Number.isFinite(entry.ts) || jstToday(entry.ts) < earliestTouch) continue;
		dueCards.push({ ...entry, reason: "due", times: 1, weight: dueItemWeight(entry, today) });
	}
	const rankedActivity = rank(uniqueActivity, today).slice(0, DAILY_REVIEW_CAP);
	const taken = new Set(rankedActivity.map((card) => card.id));
	const fillers = rank(dueCards, today)
		.filter((card) => !taken.has(card.id))
		.slice(0, DAILY_REVIEW_CAP - rankedActivity.length);
	return {
		cards: [...rankedActivity, ...fillers],
		sourceDate,
		candidateCount: uniqueActivity.length + dueCards.length,
	};
}

export function reviewCount(today = jstToday()) {
	return selectDailyReview(today).cards.length;
}

export function resetDailyReviewForTests() {
	try {
		localStorage.removeItem(ACTIVITY_KEY);
		localStorage.removeItem(DONE_KEY);
	} catch {
		/* ignore */
	}
	emit();
}
