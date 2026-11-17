import { canAttemptSync, noteSyncResult } from "./kv-sync-policy";
import { jstToday } from "./lesson-review";

/**
 * Unified vocabulary review queue (单词队列).
 *
 * Every source of new words (work topics, IT-listening mistakes, class review,
 * favourites, the personal mistakes book, 番番词书, N2 decks) is merged into ONE
 * word list (public/data/vocab-queue.json, built by scripts/build-vocab-queue.mts)
 * and reviewed here with an Anki-style fixed ladder:
 *
 *   step 0 ──know──▶ 1 ──know──▶ 2 ──know──▶ 3 ──know──▶ 4 ──know──▶ 5
 *   interval after a "know":        3d        7d        14d       30d       60d
 *   "fuzzy" keeps the step and comes back sooner (1/1/3/7/14/30d by step).
 *   "again" resets to step 0 and is due tomorrow.
 *   Both "again" and "fuzzy" are re-shown once more in today's session (at
 *   most one re-show per card per day); the re-show grade is the day's final
 *   result. Words already graded today can also be re-tested singly from the
 *   「今日已过」list — the retest grade likewise overwrites today's result and
 *   never double-counts the daily quota (done is a per-word set).
 *
 * Daily plan (Daniel's ruling, 2026-11-13): TWO separate batches — ALL due
 * reviews (most overdue first, then priority tier; never capped and never
 * eating the new-word quota) plus exactly 50 new words in priority order.
 * The batches are counted apart (复习 x/N, 新词 y/50); the day is complete
 * when both are. Reviews are served first, new words after. After both
 * batches are met, 「再来 20」appends extra batches of NEW words only
 * (plan.extra), graded with the exact same SRS/re-show rules but tracked
 * apart so the batch counts stay pure. Extra batches persist inside the
 * same server-side plan.
 *
 * Plans carry a regime marker (plan.pv). A same-day plan minted under the
 * old shared-50 regime (no marker) is rebuilt in place on sight — see
 * upgradeSameDayPlan — keeping everything already graded today.
 *
 * State syncs through /api/vocab-queue under its own KV key (vocab-queue:<uid>);
 * it never touches the due-review / mastery / mistakes payloads.
 */

export type VocabGrade = "again" | "fuzzy" | "know";

export type VocabWord = {
	id: string;
	/** Word / phrase as printed. */
	w: string;
	/** Reading (kana). May be empty when no source provides one. */
	r: string;
	/** Chinese gloss. */
	zh: string;
	en?: string;
	/** Priority tier 1..5 (lower = sooner). */
	tier: number;
	/** Source label, e.g. 前端专题 / IT听力错词本 / 课堂复习 / 收藏 / 错词本 / 番番词书 / N2词汇 / N2汉字. */
	src: string;
	/** Order inside the source. */
	ord: number;
	ex?: string;
	exZh?: string;
	/** Segmented ruby for the example sentence (built by scripts/build-vocab-queue.mts):
	 * segments concatenate to ex; ruby markup only ever sits on kanji. */
	exRuby?: VocabExRubySeg[];
	/** Grammar breakdown for sentence-type entries (built by scripts/build-vocab-queue.mts). */
	breakdown?: VocabBreakdown;
	/** Grammar breakdown of the example sentence, same format as breakdown. */
	exampleBreakdown?: VocabBreakdown;
};

/** One fragment of a sentence-type entry's grammar breakdown: the fragment,
 * its form & connection, and what it does in this sentence. */
export type VocabBreakdownLine = {
	seg: string;
	/** The fragment's reading (kana). */
	reading: string;
	/** <ruby> markup for the fragment, present when it contains kanji. */
	ruby?: string;
	form: string;
	role: string;
};

/** One segment of an example sentence's ruby annotation: the surface text,
 * its reading, and <ruby> markup when the segment contains kanji. */
export type VocabExRubySeg = {
	seg: string;
	reading: string;
	ruby?: string;
};

export type VocabBreakdown = {
	lines: VocabBreakdownLine[];
	/** Keigo point: the keigo segment in the headword, its type
	 * （尊敬語 / 謙譲語 / 丁寧語） and the corresponding plain form. */
	keigo?: { seg: string; reading: string; ruby?: string; type: string; plain: string };
};

export type VocabWordState = {
	/** Ladder step 0..5. */
	s: number;
	/** Next due date (JST, YYYY-MM-DD). */
	due: string;
	ts: number;
};

/** One or more「再来 20」batches appended after the day's two batches are met. Kept apart from the plan's own ids/done/review/fresh so the batch counts are never polluted; grades/reshown stay plan-global, so extra words follow the same same-day re-show and overwrite rules. New batches are new words only (reviews are never deferred under the current regime); the review count only survives on blocks minted before 2026-11-14. */
export type VocabPlanExtra = {
	/** Extra word ids, in the order the batches were added. */
	ids: string[];
	/** Extra ids completed (subset of ids). */
	done: string[];
	/** Of the extra ids, how many were due reviews when their batch was built (0 for batches minted under the current regime). */
	review: number;
	/** Of the extra ids, how many were new words. */
	fresh: number;
};

/** Plan-regime marker stored on VocabPlan.pv: 2 = 「复习全上 + 新词另算 50」 (separate batches). Absent = the old shared-50 regime. */
export const PLAN_PV = 2;

export type VocabPlan = {
	/** Regime marker (see PLAN_PV). Same-day plans without it are migrated on sight. */
	pv?: number;
	date: string;
	/** Review batch first (all due words), then the new-word batch — session order. */
	ids: string[];
	done: string[];
	/** How many of today's ids are the review batch (the first `review` ids). */
	review: number;
	/** How many are the new-word batch (the remaining ids; capped at the daily new-word quota). */
	fresh: number;
	/** Today's latest grade per word id (for the「今日已过」list and retests). Covers baseline and extra ids alike. */
	grades?: Record<string, VocabGrade>;
	/** Word ids already re-shown once today (again/fuzzy) — persisted so a page reload keeps the once-per-day cap. Covers baseline and extra ids alike. */
	reshown?: string[];
	/** Optional「再来 20」extra batches (see VocabPlanExtra). */
	extra?: VocabPlanExtra;
};

export type VocabQueueData = {
	v: 1;
	states: Record<string, VocabWordState>;
	plan: VocabPlan | null;
};

/** Daily NEW-word quota, 雷打不动 — due reviews ride on top of it, uncounted (see the plan-regime note at the top of this file). */
export const DAILY_QUOTA = 50;
/** Size of one「再来 20」extra batch, added on demand after the day's batches are met. */
export const EXTRA_BATCH_SIZE = 20;
export const VOCAB_QUEUE_STORAGE_KEY = "jl-vocab-queue-v1";
export const VOCAB_QUEUE_ENDPOINT = "/api/vocab-queue";
const MAX_STEP = 5;
/** Interval (days) after grading "know", indexed by the step reached. */
const KNOW_INTERVAL: Record<number, number> = { 0: 1, 1: 3, 2: 7, 3: 14, 4: 30, 5: 60 };
/** Interval (days) after grading "fuzzy", indexed by the (unchanged) step. */
const FUZZY_INTERVAL: Record<number, number> = { 0: 1, 1: 1, 2: 3, 3: 7, 4: 14, 5: 30 };

export function addIsoDays(iso: string, days: number): string {
	const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
	if (!match) return iso;
	const utc = Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]) + days);
	const next = new Date(utc);
	const year = next.getUTCFullYear();
	const month = String(next.getUTCMonth() + 1).padStart(2, "0");
	const day = String(next.getUTCDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

function clampStep(step: number): number {
	return Number.isInteger(step) ? Math.min(Math.max(step, 0), MAX_STEP) : 0;
}

/** Pure SRS transition. `prev` undefined = the word has never been studied. */
export function gradeWordState(
	prev: VocabWordState | undefined,
	grade: VocabGrade,
	today: string,
	now = Date.now(),
): VocabWordState {
	const step = clampStep(prev?.s ?? 0);
	if (grade === "again") return { s: 0, due: addIsoDays(today, 1), ts: now };
	if (grade === "fuzzy") return { s: step, due: addIsoDays(today, FUZZY_INTERVAL[step]), ts: now };
	const next = Math.min(step + 1, MAX_STEP);
	return { s: next, due: addIsoDays(today, KNOW_INTERVAL[next]), ts: now };
}

export function compareWords(a: VocabWord, b: VocabWord): number {
	return a.tier - b.tier || a.ord - b.ord || a.id.localeCompare(b.id);
}

function kataToHira(text: string): string {
	return text.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
}

function isKanaSurface(text: string): boolean {
	if (!text) return false;
	return [...text].every((c) => {
		const code = c.codePointAt(0) ?? 0;
		return (code >= 0x3040 && code <= 0x30ff) || c === "・";
	});
}

/**
 * Same-word guard for plan building. The built word list is deduped at
 * build time, but if a notation twin ever slips through （わすれる spelled
 * in kana vs 忘れる in kanji — two ids, one word), a day's served set must
 * still never contain both spellings. Kana-only words key by their kana
 * form; kanji words register their reading's kana form, so whichever twin
 * is picked first blocks the other. Homophones （直す / 治す — both kanji
 * words sharing a reading) are NOT blocked: only kana twins consult the
 * reading key.
 */
function makeTwinGuard() {
	const ids = new Set<string>();
	/** Kana forms of kana-only words already taken. */
	const kanaWordForms = new Set<string>();
	/** Kana forms of the readings of kanji words already taken. */
	const readingForms = new Set<string>();
	const register = (word: VocabWord) => {
		ids.add(word.id);
		if (isKanaSurface(word.w)) kanaWordForms.add(kataToHira(word.w));
		else if (word.r) readingForms.add(kataToHira(word.r));
	};
	return {
		/** Register a word that is already served (e.g. in today's plan) without blocking it. */
		seed(word: VocabWord) {
			register(word);
		},
		tryTake(word: VocabWord): boolean {
			if (ids.has(word.id)) return false;
			if (isKanaSurface(word.w)) {
				const form = kataToHira(word.w);
				if (kanaWordForms.has(form) || readingForms.has(form)) return false;
			} else if (word.r && kanaWordForms.has(kataToHira(word.r))) {
				return false;
			}
			register(word);
			return true;
		},
	};
}

/** All words due today (or overdue), most overdue first, then priority. */
function sortedDueWords(words: VocabWord[], states: Record<string, VocabWordState>, today: string): VocabWord[] {
	return words
		.filter((word) => {
			const state = states[word.id];
			return state && state.due <= today;
		})
		.sort((a, b) => {
			const da = states[a.id].due;
			const db = states[b.id].due;
			return da.localeCompare(db) || compareWords(a, b);
		});
}

/** Untouched (never-studied) words in priority order. */
function sortedFreshWords(words: VocabWord[], states: Record<string, VocabWordState>): VocabWord[] {
	return words.filter((word) => !states[word.id]).sort(compareWords);
}

/**
 * Build today's plan as two separate batches: the review batch takes EVERY
 * due word (uncapped), then the new-word batch takes up to `quota` untouched
 * words in priority order. `quota` counts new words only.
 */
export function buildDailyPlan(
	words: VocabWord[],
	states: Record<string, VocabWordState>,
	today: string,
	quota = DAILY_QUOTA,
): VocabPlan {
	const guard = makeTwinGuard();
	const reviewPart: VocabWord[] = [];
	for (const word of sortedDueWords(words, states, today)) {
		if (guard.tryTake(word)) reviewPart.push(word);
	}
	const freshPart: VocabWord[] = [];
	for (const word of sortedFreshWords(words, states)) {
		if (freshPart.length >= quota) break;
		if (guard.tryTake(word)) freshPart.push(word);
	}
	return {
		pv: PLAN_PV,
		date: today,
		ids: [...reviewPart, ...freshPart].map((word) => word.id),
		done: [],
		review: reviewPart.length,
		fresh: freshPart.length,
	};
}

/** Per-batch progress of a plan: the review batch is the first `review` ids, the new-word batch the rest; extra batches count apart, as before. */
export function planBatchProgress(plan: VocabPlan): {
	reviewDone: number;
	reviewTotal: number;
	freshDone: number;
	freshTotal: number;
} {
	const done = new Set(plan.done);
	const reviewIds = plan.ids.slice(0, plan.review);
	const freshIds = plan.ids.slice(plan.review);
	return {
		reviewDone: reviewIds.filter((id) => done.has(id)).length,
		reviewTotal: reviewIds.length,
		freshDone: freshIds.filter((id) => done.has(id)).length,
		freshTotal: freshIds.length,
	};
}

/**
 * Rebuild a same-day plan minted under the old shared-50 regime (no pv
 * marker) under the current regime, in place:
 *  - the review batch grows to ALL words due today; review words already
 *    graded today (their states moved past today) stay in the batch, so
 *    today's done tally carries over untouched;
 *  - the new-word batch keeps every word the old plan already served and
 *    tops up to the quota with untouched words in priority order; new words
 *    already graded today count toward the batch's progress;
 *  - done / grades / reshown / extra carry over (the new baseline is a
 *    superset of the old one, so extra blocks stay disjoint).
 * Returns the plan unchanged when it already carries the current marker.
 */
export function upgradeSameDayPlan(
	words: VocabWord[],
	states: Record<string, VocabWordState>,
	plan: VocabPlan,
	today: string,
	quota = DAILY_QUOTA,
): VocabPlan {
	if (plan.pv === PLAN_PV || plan.date !== today) return plan;
	const byId = new Map(words.map((word) => [word.id, word]));
	const oldReviewIds = plan.ids.slice(0, plan.review);
	const oldFreshIds = plan.ids.slice(plan.review);
	const touchedToday = new Set([...plan.done, ...Object.keys(plan.grades ?? {}), ...(plan.reshown ?? [])]);

	const guard = makeTwinGuard();
	// Register everything the old plan already serves today (baseline + extra)
	// so the rebuilt batches can never add the other spelling of a served word.
	for (const id of [...plan.ids, ...(plan.extra?.ids ?? [])]) {
		const word = byId.get(id);
		if (word) guard.seed(word);
	}

	// Review batch: every due word first (most overdue first). Words the old
	// plan already serves were seeded into the guard above, so tryTake would
	// refuse them — old review words go in directly, the rest pass the guard.
	const oldReviewSet = new Set(oldReviewIds);
	const reviewIds: string[] = [];
	for (const word of sortedDueWords(words, states, today)) {
		if (oldReviewSet.has(word.id) || guard.tryTake(word)) reviewIds.push(word.id);
	}
	// …then old review words that already left the due set by being graded
	// today — history wins over the twin guard, they belong to today's batch.
	for (const id of oldReviewIds) {
		if (reviewIds.includes(id) || !touchedToday.has(id)) continue;
		const word = byId.get(id);
		if (word) guard.seed(word);
		reviewIds.push(id);
	}

	// New-word batch: keep the old batch whole, then top up to the quota.
	const freshIds: string[] = [...oldFreshIds];
	for (const word of sortedFreshWords(words, states)) {
		if (freshIds.length >= quota) break;
		if (freshIds.includes(word.id)) continue;
		if (guard.tryTake(word)) freshIds.push(word.id);
	}

	const ids = [...reviewIds, ...freshIds];
	const known = [...ids, ...(plan.extra?.ids ?? [])];
	const grades: Record<string, VocabGrade> = {};
	for (const [id, grade] of Object.entries(plan.grades ?? {})) {
		if (known.includes(id)) grades[id] = grade;
	}
	const reshown = (plan.reshown ?? []).filter((id) => known.includes(id));
	return {
		pv: PLAN_PV,
		date: plan.date,
		ids,
		done: plan.done.filter((id) => ids.includes(id)),
		review: reviewIds.length,
		fresh: freshIds.length,
		...(Object.keys(grades).length ? { grades } : {}),
		...(reshown.length ? { reshown } : {}),
		...(plan.extra ? { extra: plan.extra } : {}),
	};
}

/** Words due today (or overdue) that are NOT in today's plan stay due tomorrow — count for display. */
export function dueWordCount(words: VocabWord[], states: Record<string, VocabWordState>, today: string): number {
	return words.filter((word) => {
		const state = states[word.id];
		return state && state.due <= today;
	}).length;
}

/**
 * Candidates for a「再来 20」batch: NEW words only, in priority order, minus
 * everything already in today's plan (baseline or earlier extra batches).
 * Due reviews are never candidates — under the current regime the review
 * batch already serves every due word, so there is nothing to defer.
 */
function extraCandidates(words: VocabWord[], states: Record<string, VocabWordState>, plan: VocabPlan): VocabWord[] {
	const taken = new Set([...plan.ids, ...(plan.extra?.ids ?? [])]);
	// Seed the twin guard with everything already in today's plan so an extra
	// batch can never add the other spelling of a word served today.
	const guard = makeTwinGuard();
	const byId = new Map(words.map((word) => [word.id, word]));
	for (const id of taken) {
		const word = byId.get(id);
		if (word) guard.seed(word);
	}
	return sortedFreshWords(words, states)
		.filter((word) => !taken.has(word.id))
		.filter((word) => guard.tryTake(word));
}

/** How many new words a「再来 20」click could still pull today. */
export function countExtraCandidates(
	words: VocabWord[],
	states: Record<string, VocabWordState>,
	plan: VocabPlan,
): { fresh: number; total: number } {
	const fresh = extraCandidates(words, states, plan);
	return { fresh: fresh.length, total: fresh.length };
}

/**
 * Build one extra batch of up to `count` NEW words (priority order).
 * Returns null when no untouched word is left.
 */
export function buildExtraBatch(
	words: VocabWord[],
	states: Record<string, VocabWordState>,
	plan: VocabPlan,
	count = EXTRA_BATCH_SIZE,
): { ids: string[]; review: number; fresh: number } | null {
	const freshPart = extraCandidates(words, states, plan).slice(0, count);
	if (!freshPart.length) return null;
	return { ids: freshPart.map((word) => word.id), review: 0, fresh: freshPart.length };
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function cleanState(value: unknown): VocabWordState | null {
	if (!value || typeof value !== "object" || Array.isArray(value)) return null;
	const item = value as Record<string, unknown>;
	if (typeof item.s !== "number" || !Number.isInteger(item.s) || item.s < 0 || item.s > MAX_STEP) return null;
	if (typeof item.due !== "string" || !DATE_RE.test(item.due)) return null;
	if (typeof item.ts !== "number" || !Number.isFinite(item.ts)) return null;
	return { s: item.s, due: item.due, ts: item.ts };
}

const VOCAB_GRADES: readonly string[] = ["again", "fuzzy", "know"];

function cleanExtra(value: unknown, baseIds: string[]): VocabPlanExtra | null {
	if (!value || typeof value !== "object" || Array.isArray(value)) return null;
	const item = value as Record<string, unknown>;
	if (!Array.isArray(item.ids) || !Array.isArray(item.done)) return null;
	if (typeof item.review !== "number" || typeof item.fresh !== "number") return null;
	// Extra ids must be strings, unique, and disjoint from the baseline ids.
	const ids = [
		...new Set(
			item.ids.filter(
				(id): id is string => typeof id === "string" && id.length > 0 && id.length <= 200 && !baseIds.includes(id),
			),
		),
	];
	if (!ids.length) return null;
	const done = item.done.filter((id): id is string => typeof id === "string" && ids.includes(id));
	return { ids, done: [...new Set(done)], review: item.review, fresh: item.fresh };
}

function cleanPlan(value: unknown): VocabPlan | null {
	if (!value || typeof value !== "object" || Array.isArray(value)) return null;
	const item = value as Record<string, unknown>;
	if (typeof item.date !== "string" || !DATE_RE.test(item.date)) return null;
	if (!Array.isArray(item.ids) || !Array.isArray(item.done)) return null;
	// A stored plan must never serve the same id twice — dedupe defensively.
	const ids = [
		...new Set(item.ids.filter((id): id is string => typeof id === "string" && id.length > 0 && id.length <= 200)),
	];
	const done = item.done.filter((id): id is string => typeof id === "string" && ids.includes(id));
	if (typeof item.review !== "number" || typeof item.fresh !== "number") return null;
	const plan: VocabPlan = {
		...(item.pv === PLAN_PV ? { pv: PLAN_PV } : {}),
		date: item.date,
		ids,
		done: [...new Set(done)],
		review: item.review,
		fresh: item.fresh,
	};
	const extra = cleanExtra(item.extra, ids);
	if (extra) plan.extra = extra;
	// grades/reshown cover baseline and extra ids alike.
	const known = extra ? [...ids, ...extra.ids] : ids;
	if (item.grades && typeof item.grades === "object" && !Array.isArray(item.grades)) {
		const grades: Record<string, VocabGrade> = {};
		for (const [id, grade] of Object.entries(item.grades as Record<string, unknown>)) {
			if (known.includes(id) && typeof grade === "string" && VOCAB_GRADES.includes(grade)) {
				grades[id] = grade as VocabGrade;
			}
		}
		if (Object.keys(grades).length) plan.grades = grades;
	}
	if (Array.isArray(item.reshown)) {
		const reshown = item.reshown.filter((id): id is string => typeof id === "string" && known.includes(id));
		if (reshown.length) plan.reshown = [...new Set(reshown)];
	}
	return plan;
}

/** Resolve an id through the alias chain (dropped duplicate → survivor). */
function resolveVocabAlias(aliases: Record<string, string>, id: string): string {
	let cur = id;
	const seen = new Set<string>();
	while (aliases[cur] && !seen.has(cur)) {
		seen.add(cur);
		cur = aliases[cur];
	}
	return cur;
}

/**
 * Fold data stored under dropped duplicate ids into their survivors. The
 * built word list carries `aliases` (old id → surviving id) for every word
 * a rebuild merged away; without this, SRS progress recorded under the old
 * id would be orphaned and the word would restart from step 0 under its
 * surviving id. When both ids carry a state, the most advanced progress
 * wins (higher ladder step, then the fresher record) — nothing is wiped.
 * Plan ids/done/grades/reshown/extra are remapped and deduped likewise.
 * Returns the input unchanged when no stored id is aliased.
 */
export function applyVocabAliases(dataIn: VocabQueueData, aliases: Record<string, string>): VocabQueueData {
	if (!aliases || !Object.keys(aliases).length) return dataIn;
	const plan = dataIn.plan;
	const planIds = plan
		? [
				...plan.ids,
				...plan.done,
				...(plan.extra?.ids ?? []),
				...(plan.extra?.done ?? []),
				...(plan.reshown ?? []),
				...Object.keys(plan.grades ?? {}),
			]
		: [];
	const touched =
		Object.keys(dataIn.states).some((id) => resolveVocabAlias(aliases, id) !== id) ||
		planIds.some((id) => resolveVocabAlias(aliases, id) !== id);
	if (!touched) return dataIn;
	const states: Record<string, VocabWordState> = {};
	for (const [id, state] of Object.entries(dataIn.states)) {
		const target = resolveVocabAlias(aliases, id);
		const prev = states[target];
		if (!prev || state.s > prev.s || (state.s === prev.s && state.ts > prev.ts)) states[target] = state;
	}
	let nextPlan = plan;
	if (plan) {
		const mapIds = (ids: string[]) => [...new Set(ids.map((id) => resolveVocabAlias(aliases, id)))];
		const baseIds = mapIds(plan.ids);
		const grades: Record<string, VocabGrade> = {};
		for (const [id, grade] of Object.entries(plan.grades ?? {})) {
			const target = resolveVocabAlias(aliases, id);
			if (!(target in grades)) grades[target] = grade;
		}
		nextPlan = {
			...plan,
			ids: baseIds,
			done: mapIds(plan.done).filter((id) => baseIds.includes(id)),
			...(Object.keys(grades).length ? { grades } : {}),
			...(plan.reshown ? { reshown: mapIds(plan.reshown) } : {}),
			...(plan.extra
				? {
						extra: {
							...plan.extra,
							ids: mapIds(plan.extra.ids).filter((id) => !baseIds.includes(id)),
							done: mapIds(plan.extra.done).filter((id) => !baseIds.includes(id)),
						},
					}
				: {}),
		};
	}
	return { v: 1, states, plan: nextPlan };
}

export function cleanVocabQueueData(value: unknown): VocabQueueData {
	const empty: VocabQueueData = { v: 1, states: {}, plan: null };
	if (!value || typeof value !== "object" || Array.isArray(value)) return empty;
	const raw = value as Record<string, unknown>;
	const states: Record<string, VocabWordState> = {};
	if (raw.states && typeof raw.states === "object" && !Array.isArray(raw.states)) {
		for (const [id, state] of Object.entries(raw.states as Record<string, unknown>)) {
			if (id === "__proto__" || id === "prototype" || id === "constructor" || id.length > 200) continue;
			const cleaned = cleanState(state);
			if (cleaned) states[id] = cleaned;
		}
	}
	return { v: 1, states, plan: cleanPlan(raw.plan) };
}

/**
 * Merge two same-day extra blocks: the longer one (more batches appended) is
 * the base, its done set unioned with the other side's. Concurrent divergent
 * batches on two devices degrade to the bigger block — the dropped words'
 * SRS states still merge per-word, so nothing corrupts.
 */
function mergeExtra(local?: VocabPlanExtra, server?: VocabPlanExtra): VocabPlanExtra | undefined {
	if (!local) return server;
	if (!server) return local;
	const [main, other] = local.ids.length >= server.ids.length ? [local, server] : [server, local];
	const done = [...new Set([...main.done, ...other.done])].filter((id) => main.ids.includes(id));
	return { ...main, done };
}

/**
 * Merge two snapshots: per-word the newer ts wins; the later day's plan wins.
 * Same-day plans take the SERVER plan as the base (it is the source of truth)
 * and union the day's progress (done / grades / reshown) onto it, keeping only
 * entries for ids the merged plan actually serves. A device that minted its
 * own plan from a stale snapshot — e.g. an empty one, whose deterministic
 * build yields the queue's first batch — must converge to the server's list
 * instead of keeping its ids and winning every later merge; progress it made
 * on local-only ids is not lost, because the per-word states above still
 * merge by ts.
 */
export function mergeVocabQueueData(local: VocabQueueData, server: VocabQueueData): VocabQueueData {
	const states: Record<string, VocabWordState> = { ...server.states };
	for (const [id, state] of Object.entries(local.states)) {
		const prev = states[id];
		if (!prev || state.ts > prev.ts) states[id] = state;
	}
	let plan: VocabPlan | null;
	if (!local.plan) plan = server.plan;
	else if (!server.plan) plan = local.plan;
	else if (local.plan.date > server.plan.date) plan = local.plan;
	else if (server.plan.date > local.plan.date) plan = server.plan;
	else {
		// Extra blocks merge as before (longer block is the base, done unioned),
		// then align to the server-based plan: extra ids must stay disjoint from
		// the baseline ids — a local extra batch built against a divergent local
		// plan can name words the server's baseline already serves.
		let extra = mergeExtra(local.plan.extra, server.plan.extra);
		if (extra) {
			const ids = extra.ids.filter((id) => !server.plan!.ids.includes(id));
			extra = ids.length ? { ...extra, ids, done: extra.done.filter((id) => ids.includes(id)) } : undefined;
		}
		const known = [...server.plan.ids, ...(extra?.ids ?? [])];
		const done = [...new Set([...local.plan.done, ...server.plan.done])].filter((id) => server.plan!.ids.includes(id));
		const grades: Record<string, VocabGrade> = {};
		for (const [id, grade] of Object.entries({ ...(server.plan.grades ?? {}), ...(local.plan.grades ?? {}) })) {
			if (known.includes(id)) grades[id] = grade;
		}
		const reshown = [...new Set([...(server.plan.reshown ?? []), ...(local.plan.reshown ?? [])])].filter((id) =>
			known.includes(id),
		);
		plan = {
			// The regime marker rides with the base (server) plan: if the
			// server plan is old-regime, the merged plan is too, and
			// todayPlan migrates it — with the unioned progress — on sight.
			...(server.plan.pv === PLAN_PV ? { pv: PLAN_PV } : {}),
			date: server.plan.date,
			ids: server.plan.ids,
			done,
			review: server.plan.review,
			fresh: server.plan.fresh,
			...(Object.keys(grades).length ? { grades } : {}),
			...(reshown.length ? { reshown } : {}),
			...(extra ? { extra } : {}),
		};
	}
	return { v: 1, states, plan };
}

// ---- module store (mirrors due-review.ts) ----

const listeners = new Set<() => void>();
let version = 0;
let data: VocabQueueData = { v: 1, states: {}, plan: null };
let signedIn = false;
/** True once the app has told us there is no account (noteVocabQueueSignedOut): local state is the only truth there is, so plan minting may proceed from it. Distinct from "auth not resolved yet" (both flags false at boot). */
let signedOut = false;
/** JST day (YYYY-MM-DD) of the last SUCCESSFUL server pull this session (initial pull, resync, or the read half of a push); null = no verified server state yet. */
let lastPullDay: string | null = null;
let ready = false;
let dirty = false;
let pushing = false;
let resyncing = false;
let wordsCache: VocabWord[] | null = null;
let wordsPromise: Promise<VocabWord[]> | null = null;
/** Dropped-duplicate id → survivor id, from the built word list (see applyVocabAliases). */
let aliasMap: Record<string, string> = {};
let aliasesApplied = false;

/** One-shot migration of stored state/plan onto surviving ids, once the word list (and its aliases) is known. */
function applyAliasesIfNeeded() {
	if (aliasesApplied || !Object.keys(aliasMap).length) return;
	aliasesApplied = true;
	const next = applyVocabAliases(data, aliasMap);
	if (next !== data) {
		data = next;
		commit();
	}
}

export function subscribeVocabQueue(listener: () => void) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

export function getVocabQueueVersion() {
	return version;
}

function emitVocabQueue() {
	version += 1;
	listeners.forEach((fn) => fn());
}

export function vocabQueueData(): VocabQueueData {
	return data;
}

/**
 * True once the initial server pull (or the signed-out note) has settled.
 * The queue page must not build today's plan before this — otherwise a stale
 * local snapshot would mint a fresh plan and clobber the server-side one
 * (progress, plan order, re-show state) that should have been restored.
 */
export function vocabQueueReady() {
	return ready;
}

/**
 * Whether a NEW daily plan may be minted from the in-memory states.
 *
 * Minting is deterministic over `states`, so minting from a stale snapshot
 * resurrects yesterday's batches: words studied yesterday (on any device)
 * come back as "new", and words graded yesterday reappear as "due" — and
 * because mergeVocabQueueData lets the later-dated plan win, the bogus plan
 * then displaces the server's plan on the next push (2026-11-17 incident:
 * the home-page card minted before bootAccount's pull chain reached this
 * module, off a localStorage snapshot from before yesterday's session).
 *
 * So: signed-out (local-only) clients may always mint; signed-in clients
 * only when the server blob was pulled successfully TODAY (an app left open
 * overnight, or a pull that failed, must wait for a fresh pull — showing
 * yesterday's plan or an empty state beats minting a wrong one).
 */
export function vocabQueueCanMint(today: string): boolean {
	if (signedOut) return true;
	return signedIn && lastPullDay === today;
}

export function vocabWordsCache(): VocabWord[] | null {
	return wordsCache;
}

/** Fetch the built word list once (public/data/vocab-queue.json, lazy — never in the first-screen bundle). */
export function ensureVocabWords(): Promise<VocabWord[]> {
	if (wordsCache) return Promise.resolve(wordsCache);
	if (!wordsPromise) {
		wordsPromise = fetch("/data/vocab-queue.json", { credentials: "same-origin" })
			.then((res) =>
				res.ok
					? (res.json() as Promise<{ words?: VocabWord[]; aliases?: Record<string, string> }>)
					: { words: [] as VocabWord[] },
			)
			.then((payload) => {
				wordsCache = Array.isArray(payload?.words) ? payload.words : [];
				if (payload?.aliases && typeof payload.aliases === "object" && !Array.isArray(payload.aliases)) {
					aliasMap = Object.fromEntries(
						Object.entries(payload.aliases).filter(
							([from, to]) => typeof from === "string" && typeof to === "string" && from !== to,
						),
					);
					aliasesApplied = false;
				}
				applyAliasesIfNeeded();
				emitVocabQueue();
				return wordsCache;
			})
			.catch(() => {
				wordsPromise = null;
				return [] as VocabWord[];
			});
	}
	return wordsPromise;
}

function writeLocal() {
	try {
		localStorage.setItem(VOCAB_QUEUE_STORAGE_KEY, JSON.stringify(data));
	} catch {
		/* ignore quota / private mode */
	}
}

function commit() {
	dirty = true;
	writeLocal();
	emitVocabQueue();
	scheduleVocabQueuePush();
}

let pushTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * The server is the source of truth for progress: every mutation schedules an
 * immediate push (short debounce) instead of waiting for the next app open.
 * When signed out or before the first pull settles, pushVocabQueueNow no-ops
 * and the change stays local-only, as with the app's other sync modules.
 */
function scheduleVocabQueuePush() {
	if (pushTimer) clearTimeout(pushTimer);
	pushTimer = setTimeout(() => {
		pushTimer = null;
		void pushVocabQueueNow();
	}, 800);
}

export function hydrateVocabQueue() {
	try {
		const raw = localStorage.getItem(VOCAB_QUEUE_STORAGE_KEY);
		data = raw ? cleanVocabQueueData(JSON.parse(raw)) : { v: 1, states: {}, plan: null };
	} catch {
		data = { v: 1, states: {}, plan: null };
	}
	emitVocabQueue();
}

/**
 * Return today's plan, building (and persisting) a fresh one when the stored
 * plan is for another day. A same-day plan minted under the old shared-50
 * regime is first rebuilt under the current regime (upgradeSameDayPlan) and
 * persisted, so every device converges to the new batches on its next pull.
 *
 * Both the build and the same-day upgrade are gated on vocabQueueCanMint:
 * with an unverified (possibly stale) snapshot the stored plan is returned
 * untouched instead — never persisted over, never rebuilt — until a fresh
 * server pull lands and the caller retries.
 */
export function todayPlan(words: VocabWord[], today = jstToday()): VocabPlan {
	applyAliasesIfNeeded();
	if (data.plan && data.plan.date === today) {
		if (data.plan.pv === PLAN_PV) return data.plan;
		if (!vocabQueueCanMint(today)) return data.plan;
		const plan = upgradeSameDayPlan(words, data.states, data.plan, today);
		data = { ...data, plan };
		commit();
		return plan;
	}
	if (!vocabQueueCanMint(today)) {
		// Refuse to mint from an unverified snapshot. Return the stored plan
		// as-is (callers key on its date), or an unpersisted empty plan when
		// there is none — nothing is written, locally or to the server.
		return data.plan ?? { pv: PLAN_PV, date: today, ids: [], done: [], review: 0, fresh: 0 };
	}
	const plan = buildDailyPlan(words, data.states, today);
	data = { ...data, plan };
	commit();
	return plan;
}

/**
 * Same-day re-show decision: a card graded "again" or "fuzzy" is shown once
 * more later in today's session; any card re-shows at most once per day, so
 * re-shows never stack into a loop. The re-show grade overwrites today's
 * result (it is applied on top of the intermediate state via gradeWordState).
 */
export function shouldReshowToday(grade: VocabGrade, alreadyReshown: boolean): boolean {
	return (grade === "again" || grade === "fuzzy") && !alreadyReshown;
}

/**
 * Append one「再来 20」extra batch of NEW words to today's plan and persist
 * it with the plan. Returns the added word ids, or [] when today's plan is
 * missing/stale or the new-word source is exhausted. The baseline
 * ids/done/review/fresh are never touched.
 */
export function addExtraBatch(words: VocabWord[], today = jstToday()): string[] {
	applyAliasesIfNeeded();
	if (!data.plan || data.plan.date !== today) return [];
	const batch = buildExtraBatch(words, data.states, data.plan);
	if (!batch) return [];
	const prev = data.plan.extra ?? { ids: [], done: [], review: 0, fresh: 0 };
	const extra: VocabPlanExtra = {
		ids: [...prev.ids, ...batch.ids],
		done: prev.done,
		review: prev.review + batch.review,
		fresh: prev.fresh + batch.fresh,
	};
	data = { ...data, plan: { ...data.plan, extra } };
	commit();
	return batch.ids;
}

/** Grade one word; marks it done in today's plan unless `markDone` is false (first "again"/"fuzzy" re-show — that call also records the word in plan.reshown so the once-per-day re-show cap survives reloads). Extra-batch words are graded exactly the same; their done marks land in plan.extra.done so the baseline count is untouched. */
export function applyVocabGrade(id: string, grade: VocabGrade, markDone = true, today = jstToday()) {
	const next = gradeWordState(data.states[id], grade, today);
	const states = { ...data.states, [id]: next };
	let plan = data.plan;
	if (plan && plan.date === today) {
		const inBase = plan.ids.includes(id);
		const inExtra = plan.extra?.ids.includes(id) ?? false;
		if (inBase || inExtra) {
			const done = inBase && markDone && !plan.done.includes(id) ? [...plan.done, id] : plan.done;
			const extra =
				inExtra && plan.extra
					? markDone && !plan.extra.done.includes(id)
						? { ...plan.extra, done: [...plan.extra.done, id] }
						: plan.extra
					: plan.extra;
			const reshown =
				!markDone && !(plan.reshown ?? []).includes(id) ? [...(plan.reshown ?? []), id] : plan.reshown;
			if (done !== plan.done || extra !== plan.extra || reshown !== plan.reshown || plan.grades?.[id] !== grade) {
				plan = {
					...plan,
					done,
					...(extra ? { extra } : {}),
					grades: { ...(plan.grades ?? {}), [id]: grade },
					...(reshown ? { reshown } : {}),
				};
			}
		}
	}
	data = { ...data, states, plan };
	commit();
}

/** Everything one grade is about to change, captured BEFORE the grade lands. The queue page's「上一个」button keeps one snapshot per grade so the grade can be annulled exactly — an SRS transition is not invertible from the resulting state alone (the step it came from is lost), so the pre-grade values have to be recorded up front. */
export type VocabGradeSnapshot = {
	id: string;
	/** SRS state before the grade; undefined = the word had never been studied. */
	prevState?: VocabWordState;
	/** Today's recorded grade before this grade (a re-show intermediate or an earlier final), if any. */
	prevGrade?: VocabGrade;
	/** Whether the word was already in the baseline done set before the grade (retest case). */
	wasDone: boolean;
	/** Whether the word was already in the extra-batch done set before the grade. */
	wasExtraDone: boolean;
	/** Whether the word was already in today's re-shown set before the grade. */
	wasReshown: boolean;
};

/** Snapshot the pre-grade values for one word (see VocabGradeSnapshot). */
export function snapshotVocabGrade(id: string): VocabGradeSnapshot {
	const plan = data.plan;
	return {
		id,
		prevState: data.states[id],
		prevGrade: plan?.grades?.[id],
		wasDone: plan?.done.includes(id) ?? false,
		wasExtraDone: plan?.extra?.done.includes(id) ?? false,
		wasReshown: (plan?.reshown ?? []).includes(id),
	};
}

/**
 * Annul one grade: restore the word's SRS state and today's plan marks
 * (done / extra done / grades / reshown) to the snapshot taken just before
 * it. The word can then be graded again from the restored state, so the
 * re-grade replaces the annulled one outright — progress counts the word
 * once, with the new grade as the day's result. Mirrors applyVocabGrade's
 * plan-membership guard; the state restore itself is unconditional, like
 * the grade's own state write.
 */
export function revertVocabGrade(snap: VocabGradeSnapshot, today = jstToday()) {
	const states = { ...data.states };
	if (snap.prevState) states[snap.id] = snap.prevState;
	else delete states[snap.id];
	let plan = data.plan;
	if (plan && plan.date === today) {
		const inBase = plan.ids.includes(snap.id);
		const inExtra = plan.extra?.ids.includes(snap.id) ?? false;
		if (inBase || inExtra) {
			const done = inBase
				? snap.wasDone
					? plan.done.includes(snap.id)
						? plan.done
						: [...plan.done, snap.id]
					: plan.done.filter((id) => id !== snap.id)
				: plan.done;
			const extra =
				inExtra && plan.extra
					? {
							...plan.extra,
							done: snap.wasExtraDone
								? plan.extra.done.includes(snap.id)
									? plan.extra.done
									: [...plan.extra.done, snap.id]
								: plan.extra.done.filter((id) => id !== snap.id),
						}
					: plan.extra;
			const grades: Record<string, VocabGrade> = { ...(plan.grades ?? {}) };
			if (snap.prevGrade) grades[snap.id] = snap.prevGrade;
			else delete grades[snap.id];
			const reshown = snap.wasReshown
				? (plan.reshown ?? []).includes(snap.id)
					? (plan.reshown ?? [])
					: [...(plan.reshown ?? []), snap.id]
				: (plan.reshown ?? []).filter((id) => id !== snap.id);
			const next: VocabPlan = { ...plan, done };
			if (extra) next.extra = extra;
			if (Object.keys(grades).length) next.grades = grades;
			else delete next.grades;
			if (reshown.length) next.reshown = reshown;
			else delete next.reshown;
			plan = next;
		}
	}
	data = { ...data, states, plan };
	commit();
}

export function noteVocabQueueSignedOut() {
	signedIn = false;
	signedOut = true;
	ready = true;
	emitVocabQueue();
}

export async function pullVocabQueueFromServer(_accountId: string) {
	signedIn = true;
	signedOut = false;
	let pulled = false;
	try {
		const res = await fetch(VOCAB_QUEUE_ENDPOINT, { cache: "no-store", credentials: "same-origin" });
		if (res.ok) {
			const payload: unknown = await res.json();
			const server = cleanVocabQueueData(payload);
			const merged = mergeVocabQueueData(data, server);
			data = merged;
			writeLocal();
			dirty = JSON.stringify(merged) !== JSON.stringify(server);
			pulled = true;
			lastPullDay = jstToday();
		}
	} catch {
		/* offline */
	} finally {
		ready = true;
		if (!pulled && (Object.keys(data.states).length || data.plan)) dirty = true;
		emitVocabQueue();
	}
}

/**
 * Push the local blob — but never as a blind overwrite. The API route stores
 * the PUT body verbatim, so a client holding a stale snapshot would roll the
 * server's states back (words graded on another device losing their newer
 * records). Instead: GET the server blob first, merge it with the local one
 * (per-word newer ts wins; same-day plans converge to the server's ids with
 * progress unioned), and PUT the merged result. A failed GET aborts the push
 * outright — unverified state is never written.
 */
export async function pushVocabQueueNow() {
	if (!signedIn || !ready || !dirty) return false;
	if (pushing) return false;
	if (!canAttemptSync(VOCAB_QUEUE_ENDPOINT)) return false;
	pushing = true;
	const snapshot = data;
	try {
		const getRes = await fetch(VOCAB_QUEUE_ENDPOINT, { cache: "no-store", credentials: "same-origin" });
		noteSyncResult(VOCAB_QUEUE_ENDPOINT, getRes.status);
		if (!getRes.ok) throw new Error(`vocab queue sync read failed: ${getRes.status}`);
		const server = cleanVocabQueueData(await getRes.json());
		// The read half of this push is a successful pull of the server blob.
		lastPullDay = jstToday();
		const merged = mergeVocabQueueData(snapshot, server);
		const response = await fetch(VOCAB_QUEUE_ENDPOINT, {
			method: "PUT",
			headers: { "content-type": "application/json" },
			credentials: "same-origin",
			body: JSON.stringify(merged),
		});
		noteSyncResult(VOCAB_QUEUE_ENDPOINT, response.status);
		if (!response.ok) throw new Error(`vocab queue sync failed: ${response.status}`);
		if (data === snapshot) {
			// Nothing changed locally during the flight: adopt the merged blob
			// (it may carry newer server-side states) as the local truth.
			const changed = JSON.stringify(merged) !== JSON.stringify(data);
			data = merged;
			writeLocal();
			dirty = false;
			if (changed) emitVocabQueue();
		} else {
			// Local state moved on while we were writing; push again so the
			// newer mutations get their own merge round.
			dirty = true;
			scheduleVocabQueuePush();
		}
		return true;
	} catch {
		noteSyncResult(VOCAB_QUEUE_ENDPOINT, 0);
		return false;
	} finally {
		pushing = false;
	}
}

export async function resyncVocabQueue() {
	if (!signedIn || !ready || pushing || dirty || resyncing) return;
	resyncing = true;
	try {
		const res = await fetch(VOCAB_QUEUE_ENDPOINT, { cache: "no-store", credentials: "same-origin" });
		if (!res.ok) return;
		const payload: unknown = await res.json();
		const server = cleanVocabQueueData(payload);
		const merged = mergeVocabQueueData(data, server);
		const changed = JSON.stringify(merged) !== JSON.stringify(data);
		data = merged;
		writeLocal();
		dirty = JSON.stringify(merged) !== JSON.stringify(server);
		lastPullDay = jstToday();
		if (changed) emitVocabQueue();
	} catch {
		/* ignore */
	} finally {
		resyncing = false;
	}
}

export function kickVocabQueueSync() {
	if (!signedIn || !ready) return;
	// When there is local state to upload, push (its read-merge also refreshes
	// the verified-pull day, unblocking plan minting after an overnight stay);
	// otherwise a plain read-only resync suffices.
	if (!dirty) void resyncVocabQueue();
	else void pushVocabQueueNow();
}

export function resetVocabQueueForTests() {
	data = { v: 1, states: {}, plan: null };
	signedIn = false;
	// Store unit tests run the module as a local-only client (no server), so
	// minting is ungated there; tests for the signed-in guard drive
	// pullVocabQueueFromServer with a stubbed fetch instead.
	signedOut = true;
	lastPullDay = null;
	ready = false;
	dirty = false;
	pushing = false;
	resyncing = false;
	wordsCache = null;
	wordsPromise = null;
	aliasMap = {};
	aliasesApplied = false;
	if (pushTimer) {
		clearTimeout(pushTimer);
		pushTimer = null;
	}
}
