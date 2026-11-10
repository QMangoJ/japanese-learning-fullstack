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
 * Daily quota is 50, 雷打不动: due reviews first (most overdue first, then
 * priority tier), new words fill the rest in priority order. If more than 50
 * reviews are due, today's plan is the 50 most overdue and the rest stay due.
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
};

export type VocabWordState = {
	/** Ladder step 0..5. */
	s: number;
	/** Next due date (JST, YYYY-MM-DD). */
	due: string;
	ts: number;
};

export type VocabPlan = {
	date: string;
	ids: string[];
	done: string[];
	/** How many of today's ids were due reviews when the plan was built. */
	review: number;
	/** How many were new words. */
	fresh: number;
	/** Today's latest grade per word id (for the「今日已过」list and retests). */
	grades?: Record<string, VocabGrade>;
	/** Word ids already re-shown once today (again/fuzzy) — persisted so a page reload keeps the once-per-day cap. */
	reshown?: string[];
};

export type VocabQueueData = {
	v: 1;
	states: Record<string, VocabWordState>;
	plan: VocabPlan | null;
};

export const DAILY_QUOTA = 50;
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

/**
 * Build today's plan of exactly `quota` cards (fewer only when the queue runs
 * out): due reviews first — most overdue, then priority — new words after.
 */
export function buildDailyPlan(
	words: VocabWord[],
	states: Record<string, VocabWordState>,
	today: string,
	quota = DAILY_QUOTA,
): VocabPlan {
	const due = words
		.filter((word) => {
			const state = states[word.id];
			return state && state.due <= today;
		})
		.sort((a, b) => {
			const da = states[a.id].due;
			const db = states[b.id].due;
			return da.localeCompare(db) || compareWords(a, b);
		});
	const reviewPart = due.slice(0, quota);
	const freshPart = words
		.filter((word) => !states[word.id])
		.sort(compareWords)
		.slice(0, quota - reviewPart.length);
	return {
		date: today,
		ids: [...reviewPart, ...freshPart].map((word) => word.id),
		done: [],
		review: reviewPart.length,
		fresh: freshPart.length,
	};
}

/** Words due today (or overdue) that are NOT in today's plan stay due tomorrow — count for display. */
export function dueWordCount(words: VocabWord[], states: Record<string, VocabWordState>, today: string): number {
	return words.filter((word) => {
		const state = states[word.id];
		return state && state.due <= today;
	}).length;
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

function cleanPlan(value: unknown): VocabPlan | null {
	if (!value || typeof value !== "object" || Array.isArray(value)) return null;
	const item = value as Record<string, unknown>;
	if (typeof item.date !== "string" || !DATE_RE.test(item.date)) return null;
	if (!Array.isArray(item.ids) || !Array.isArray(item.done)) return null;
	const ids = item.ids.filter((id): id is string => typeof id === "string" && id.length > 0 && id.length <= 200);
	const done = item.done.filter((id): id is string => typeof id === "string" && ids.includes(id));
	if (typeof item.review !== "number" || typeof item.fresh !== "number") return null;
	const plan: VocabPlan = { date: item.date, ids, done: [...new Set(done)], review: item.review, fresh: item.fresh };
	if (item.grades && typeof item.grades === "object" && !Array.isArray(item.grades)) {
		const grades: Record<string, VocabGrade> = {};
		for (const [id, grade] of Object.entries(item.grades as Record<string, unknown>)) {
			if (ids.includes(id) && typeof grade === "string" && VOCAB_GRADES.includes(grade)) {
				grades[id] = grade as VocabGrade;
			}
		}
		if (Object.keys(grades).length) plan.grades = grades;
	}
	if (Array.isArray(item.reshown)) {
		const reshown = item.reshown.filter((id): id is string => typeof id === "string" && ids.includes(id));
		if (reshown.length) plan.reshown = [...new Set(reshown)];
	}
	return plan;
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

/** Merge two snapshots: per-word the newer ts wins; the later day's plan wins, same-day plans merge done sets. */
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
		const done = [...new Set([...local.plan.done, ...server.plan.done])].filter((id) => local.plan!.ids.includes(id));
		const grades = { ...(server.plan.grades ?? {}), ...(local.plan.grades ?? {}) };
		const reshown = [...new Set([...(server.plan.reshown ?? []), ...(local.plan.reshown ?? [])])].filter((id) =>
			local.plan!.ids.includes(id),
		);
		plan = {
			...local.plan,
			done,
			...(Object.keys(grades).length ? { grades } : {}),
			...(reshown.length ? { reshown } : {}),
		};
	}
	return { v: 1, states, plan };
}

// ---- module store (mirrors due-review.ts) ----

const listeners = new Set<() => void>();
let version = 0;
let data: VocabQueueData = { v: 1, states: {}, plan: null };
let signedIn = false;
let ready = false;
let dirty = false;
let pushing = false;
let resyncing = false;
let wordsCache: VocabWord[] | null = null;
let wordsPromise: Promise<VocabWord[]> | null = null;

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

export function vocabWordsCache(): VocabWord[] | null {
	return wordsCache;
}

/** Fetch the built word list once (public/data/vocab-queue.json, lazy — never in the first-screen bundle). */
export function ensureVocabWords(): Promise<VocabWord[]> {
	if (wordsCache) return Promise.resolve(wordsCache);
	if (!wordsPromise) {
		wordsPromise = fetch("/data/vocab-queue.json", { credentials: "same-origin" })
			.then((res) => (res.ok ? (res.json() as Promise<{ words?: VocabWord[] }>) : { words: [] }))
			.then((payload) => {
				wordsCache = Array.isArray(payload?.words) ? payload.words : [];
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

/** Return today's plan, building (and persisting) a fresh one when the stored plan is for another day. */
export function todayPlan(words: VocabWord[], today = jstToday()): VocabPlan {
	if (data.plan && data.plan.date === today) return data.plan;
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

/** Grade one word; marks it done in today's plan unless `markDone` is false (first "again"/"fuzzy" re-show — that call also records the word in plan.reshown so the once-per-day re-show cap survives reloads). */
export function applyVocabGrade(id: string, grade: VocabGrade, markDone = true, today = jstToday()) {
	const next = gradeWordState(data.states[id], grade, today);
	const states = { ...data.states, [id]: next };
	let plan = data.plan;
	if (plan && plan.date === today && plan.ids.includes(id)) {
		const done = markDone && !plan.done.includes(id) ? [...plan.done, id] : plan.done;
		const reshown =
			!markDone && !(plan.reshown ?? []).includes(id) ? [...(plan.reshown ?? []), id] : plan.reshown;
		if (done !== plan.done || reshown !== plan.reshown || plan.grades?.[id] !== grade) {
			plan = {
				...plan,
				done,
				grades: { ...(plan.grades ?? {}), [id]: grade },
				...(reshown ? { reshown } : {}),
			};
		}
	}
	data = { ...data, states, plan };
	commit();
}

export function noteVocabQueueSignedOut() {
	signedIn = false;
	ready = true;
	emitVocabQueue();
}

export async function pullVocabQueueFromServer(_accountId: string) {
	signedIn = true;
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
		}
	} catch {
		/* offline */
	} finally {
		ready = true;
		if (!pulled && (Object.keys(data.states).length || data.plan)) dirty = true;
		emitVocabQueue();
	}
}

export async function pushVocabQueueNow() {
	if (!signedIn || !ready || !dirty) return false;
	if (pushing) return false;
	if (!canAttemptSync(VOCAB_QUEUE_ENDPOINT)) return false;
	pushing = true;
	const snapshot = JSON.stringify(data);
	try {
		const response = await fetch(VOCAB_QUEUE_ENDPOINT, {
			method: "PUT",
			headers: { "content-type": "application/json" },
			credentials: "same-origin",
			body: snapshot,
		});
		noteSyncResult(VOCAB_QUEUE_ENDPOINT, response.status);
		if (!response.ok) throw new Error(`vocab queue sync failed: ${response.status}`);
		if (JSON.stringify(data) === snapshot) dirty = false;
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
		if (changed) emitVocabQueue();
	} catch {
		/* ignore */
	} finally {
		resyncing = false;
	}
}

export function kickVocabQueueSync() {
	if (!signedIn || !ready) return;
	if (!dirty) void resyncVocabQueue();
}

export function resetVocabQueueForTests() {
	data = { v: 1, states: {}, plan: null };
	signedIn = false;
	ready = false;
	dirty = false;
	pushing = false;
	resyncing = false;
	wordsCache = null;
	wordsPromise = null;
	if (pushTimer) {
		clearTimeout(pushTimer);
		pushTimer = null;
	}
}
