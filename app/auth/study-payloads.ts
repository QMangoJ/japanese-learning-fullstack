const MAX_ITEMS = 5_000;
const MAX_ID_LENGTH = 1_000;
const MAX_TEXT_LENGTH = 50_000;
const MAX_LABEL_LENGTH = 100;

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isString(value: unknown, max: number, allowEmpty = true) {
	return typeof value === "string" && value.length <= max && (allowEmpty || value.length > 0);
}

function isFiniteNumber(value: unknown) {
	return typeof value === "number" && Number.isFinite(value);
}

function isLocation(value: unknown) {
	return isString(value, MAX_LABEL_LENGTH) || isFiniteNumber(value);
}

function isSafeId(value: string) {
	return value !== "__proto__" && value !== "prototype" && value !== "constructor";
}

export function isFavoritesPayload(value: unknown) {
	if (!isRecord(value)) return false;
	const entries = Object.entries(value);
	if (entries.length > MAX_ITEMS) return false;
	return entries.every(([id, item]) => {
		if (!isString(id, MAX_ID_LENGTH, false) || !isSafeId(id) || !isRecord(item)) return false;
		if (!isString(item.module, MAX_LABEL_LENGTH, false)) return false;
		if (!isString(item.hash, MAX_ID_LENGTH)) return false;
		if (!isLocation(item.w) || !isLocation(item.d)) return false;
		if (!isString(item.jp, MAX_TEXT_LENGTH) || !isString(item.cn, MAX_TEXT_LENGTH)) return false;
		if (item.kind !== undefined && !isString(item.kind, MAX_LABEL_LENGTH)) return false;
		if (item.selectionType !== undefined && !isString(item.selectionType, MAX_LABEL_LENGTH)) return false;
		return item.ts === undefined || isFiniteNumber(item.ts);
	});
}

export function isMistakesPayload(value: unknown) {
	if (!Array.isArray(value) || value.length > MAX_ITEMS) return false;
	return value.every((item) => {
		if (!isRecord(item)) return false;
		if (!isString(item.id, MAX_ID_LENGTH, false)) return false;
		if (!isString(item.type, MAX_LABEL_LENGTH, false)) return false;
		if (!isString(item.text, MAX_TEXT_LENGTH)) return false;
		if (!isString(item.level, MAX_LABEL_LENGTH, false)) return false;
		if (!isFiniteNumber(item.ts)) return false;
		return item.deleted === undefined || typeof item.deleted === "boolean";
	});
}

const MAX_MASTERY = 6_000;

export function isMasteryPayload(value: unknown) {
	if (!Array.isArray(value) || value.length > MAX_MASTERY) return false;
	return value.every((item) => {
		if (!isRecord(item)) return false;
		if (typeof item.id !== "string" || !isSafeId(item.id) || !isString(item.id, MAX_ID_LENGTH, false)) return false;
		if (typeof item.known !== "boolean") return false;
		if (item.level !== undefined && item.level !== "fuzzy" && item.level !== "blank") return false;
		return isFiniteNumber(item.ts);
	});
}

const MAX_ITL_DONE = 500;

export function isItlDonePayload(value: unknown) {
	if (!Array.isArray(value) || value.length > MAX_ITL_DONE) return false;
	return value.every((item) => {
		if (!isRecord(item)) return false;
		if (typeof item.articleId !== "string" || !isSafeId(item.articleId) || !isString(item.articleId, MAX_ID_LENGTH, false)) return false;
		if (typeof item.done !== "boolean") return false;
		return isFiniteNumber(item.ts);
	});
}

const DUE_KINDS = new Set(["grammar", "mistake", "listening", "topic"]);
const DUE_DATE = /^\d{4}-\d{2}-\d{2}$/;

const VOCAB_QUEUE_MAX_STATES = 8_000;
const VOCAB_QUEUE_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Unified vocab queue state: { v:1, states: {id: {s, due, ts}}, plan: {date, ids, done, review, fresh} | null }. */
export function isVocabQueuePayload(value: unknown) {
	if (!isRecord(value)) return false;
	if (value.v !== 1) return false;
	if (!isRecord(value.states)) return false;
	const stateEntries = Object.entries(value.states);
	if (stateEntries.length > VOCAB_QUEUE_MAX_STATES) return false;
	for (const [id, state] of stateEntries) {
		if (!isSafeId(id) || !isString(id, 200, false) || !isRecord(state)) return false;
		if (typeof state.s !== "number" || !Number.isInteger(state.s) || state.s < 0 || state.s > 5) return false;
		if (typeof state.due !== "string" || !VOCAB_QUEUE_DATE.test(state.due)) return false;
		if (!isFiniteNumber(state.ts)) return false;
	}
	if (value.plan === null) return true;
	if (!isRecord(value.plan)) return false;
	const plan = value.plan;
	if (typeof plan.date !== "string" || !VOCAB_QUEUE_DATE.test(plan.date)) return false;
	if (!Array.isArray(plan.ids) || plan.ids.length > 500) return false;
	if (!plan.ids.every((id) => typeof id === "string" && isSafeId(id) && isString(id, 200, false))) return false;
	if (!Array.isArray(plan.done) || plan.done.length > plan.ids.length) return false;
	if (!plan.done.every((id) => typeof id === "string" && (plan.ids as unknown[]).includes(id))) return false;
	if (typeof plan.review !== "number" || !Number.isInteger(plan.review) || plan.review < 0) return false;
	if (typeof plan.fresh !== "number" || !Number.isInteger(plan.fresh) || plan.fresh < 0) return false;
	return true;
}

export function isDueReviewPayload(value: unknown) {
	if (!Array.isArray(value) || value.length > MAX_ITEMS) return false;
	return value.every((item) => {
		if (!isRecord(item)) return false;
		if (typeof item.id !== "string" || !isSafeId(item.id) || !isString(item.id, MAX_ID_LENGTH, false)) return false;
		if (typeof item.kind !== "string" || !DUE_KINDS.has(item.kind)) return false;
		if (!isString(item.jp, MAX_TEXT_LENGTH) || !isString(item.cn, MAX_TEXT_LENGTH) || !isString(item.en, MAX_TEXT_LENGTH)) return false;
		if (typeof item.due !== "string" || !DUE_DATE.test(item.due)) return false;
		if (typeof item.step !== "number" || !Number.isInteger(item.step) || item.step < 0 || item.step > 4) return false;
		if (!isFiniteNumber(item.ts)) return false;
		if (item.reading !== undefined && !isString(item.reading, MAX_TEXT_LENGTH)) return false;
		return item.deleted === undefined || typeof item.deleted === "boolean";
	});
}
