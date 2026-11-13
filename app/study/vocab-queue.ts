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
 * After the quota is met,「再来 20」appends extra batches (plan.extra) in the
 * same order — deferred due reviews first, then new words — graded with the
 * exact same SRS/re-show rules, but tracked apart so the 50-count stays pure.
 * Extra batches persist inside the same server-side plan.
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
	/** Grammar breakdown for sentence-type entries (built by scripts/build-vocab-queue.mts). */
	breakdown?: VocabBreakdown;
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

/** One or more「再来 20」batches appended after the daily quota is met. Kept apart from the plan's own ids/done/review/fresh so the baseline 50-count is never polluted; grades/reshown stay plan-global, so extra words follow the same same-day re-show and overwrite rules. */
export type VocabPlanExtra = {
	/** Extra word ids, in the order the batches were added. */
	ids: string[];
	/** Extra ids completed (subset of ids). */
	done: string[];
	/** Of the extra ids, how many were due reviews when their batch was built. */
	review: number;
	/** Of the extra ids, how many were new words. */
	fresh: number;
};

export type VocabPlan = {
	date: string;
	ids: string[];
	done: string[];
	/** How many of today's ids were due reviews when the plan was built. */
	review: number;
	/** How many were new words. */
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

export const DAILY_QUOTA = 50;
/** Size of one「再来 20」extra batch, added on demand after the daily quota is met. */
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
	const guard = makeTwinGuard();
	const reviewPart: VocabWord[] = [];
	for (const word of due) {
		if (reviewPart.length >= quota) break;
		if (guard.tryTake(word)) reviewPart.push(word);
	}
	const freshPart: VocabWord[] = [];
	for (const word of words.filter((w) => !states[w.id]).sort(compareWords)) {
		if (reviewPart.length + freshPart.length >= quota) break;
		if (guard.tryTake(word)) freshPart.push(word);
	}
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

/** Due words that today's plan (baseline + extra batches) did NOT take — the true「顺延」remainder. */
export function deferredDueCount(
	words: VocabWord[],
	states: Record<string, VocabWordState>,
	plan: VocabPlan,
	today: string,
): number {
	const taken = new Set([...plan.ids, ...(plan.extra?.ids ?? [])]);
	return words.filter((word) => {
		const state = states[word.id];
		return state && state.due <= today && !taken.has(word.id);
	}).length;
}

/**
 * Candidates for a「再来 20」batch, in the same order the daily plan uses:
 * due reviews first (most overdue, then priority), new words after — minus
 * everything already in today's plan (baseline or earlier extra batches).
 */
function extraCandidates(
	words: VocabWord[],
	states: Record<string, VocabWordState>,
	plan: VocabPlan,
	today: string,
): { due: VocabWord[]; fresh: VocabWord[] } {
	const taken = new Set([...plan.ids, ...(plan.extra?.ids ?? [])]);
	// Seed the twin guard with everything already in today's plan so an extra
	// batch can never add the other spelling of a word served today.
	const guard = makeTwinGuard();
	const byId = new Map(words.map((word) => [word.id, word]));
	for (const id of taken) {
		const word = byId.get(id);
		if (word) guard.seed(word);
	}
	const due = words
		.filter((word) => {
			const state = states[word.id];
			return state && state.due <= today && !taken.has(word.id);
		})
		.sort((a, b) => {
			const da = states[a.id].due;
			const db = states[b.id].due;
			return da.localeCompare(db) || compareWords(a, b);
		})
		.filter((word) => guard.tryTake(word));
	const fresh = words
		.filter((word) => !states[word.id] && !taken.has(word.id))
		.sort(compareWords)
		.filter((word) => guard.tryTake(word));
	return { due, fresh };
}

/** How many words a「再来 20」click could still pull today (deferred due + untouched new). */
export function countExtraCandidates(
	words: VocabWord[],
	states: Record<string, VocabWordState>,
	plan: VocabPlan,
	today: string,
): { due: number; fresh: number; total: number } {
	const { due, fresh } = extraCandidates(words, states, plan, today);
	return { due: due.length, fresh: fresh.length, total: due.length + fresh.length };
}

/**
 * Build one extra batch of up to `count` words (deferred due reviews first,
 * then new words in priority order). Returns null when nothing is left.
 */
export function buildExtraBatch(
	words: VocabWord[],
	states: Record<string, VocabWordState>,
	plan: VocabPlan,
	today: string,
	count = EXTRA_BATCH_SIZE,
): { ids: string[]; review: number; fresh: number } | null {
	const { due, fresh } = extraCandidates(words, states, plan, today);
	const reviewPart = due.slice(0, count);
	const freshPart = fresh.slice(0, count - reviewPart.length);
	if (!reviewPart.length && !freshPart.length) return null;
	return {
		ids: [...reviewPart, ...freshPart].map((word) => word.id),
		review: reviewPart.length,
		fresh: freshPart.length,
	};
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
	const plan: VocabPlan = { date: item.date, ids, done: [...new Set(done)], review: item.review, fresh: item.fresh };
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

/** Return today's plan, building (and persisting) a fresh one when the stored plan is for another day. */
export function todayPlan(words: VocabWord[], today = jstToday()): VocabPlan {
	applyAliasesIfNeeded();
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

/**
 * Append one「再来 20」extra batch to today's plan (deferred due reviews first,
 * then new words in priority order) and persist it with the plan. Returns the
 * added word ids, or [] when today's plan is missing/stale or the word source
 * is exhausted. The baseline ids/done/review/fresh are never touched.
 */
export function addExtraBatch(words: VocabWord[], today = jstToday()): string[] {
	applyAliasesIfNeeded();
	if (!data.plan || data.plan.date !== today) return [];
	const batch = buildExtraBatch(words, data.states, data.plan, today);
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
	aliasMap = {};
	aliasesApplied = false;
	if (pushTimer) {
		clearTimeout(pushTimer);
		pushTimer = null;
	}
}
