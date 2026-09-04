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
