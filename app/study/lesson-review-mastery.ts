import { reviewItemKey } from "./lesson-review";

const STORAGE_KEY = "lesson-review-mastery";

export type ReviewMasteryMap = Record<string, true>;

export function loadReviewMastery(): ReviewMasteryMap {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return {};
		const parsed: unknown = JSON.parse(raw);
		if (!parsed || typeof parsed !== "object") return {};
		const out: ReviewMasteryMap = {};
		for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
			if (value === true) out[key] = true;
		}
		return out;
	} catch {
		return {};
	}
}

export function saveReviewMastery(map: ReviewMasteryMap) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
	} catch {
		/* ignore quota / private mode */
	}
}

export function isReviewKnown(map: ReviewMasteryMap, dayId: string, jp: string): boolean {
	return map[reviewItemKey(dayId, jp)] === true;
}

export function setReviewKnown(map: ReviewMasteryMap, dayId: string, jp: string, known: boolean): ReviewMasteryMap {
	const key = reviewItemKey(dayId, jp);
	const next = { ...map };
	if (known) next[key] = true;
	else delete next[key];
	saveReviewMastery(next);
	return next;
}

export function reviewUnknownCount(map: ReviewMasteryMap, dayId: string, items: { jp: string }[]): number {
	return items.reduce((sum, item) => sum + (isReviewKnown(map, dayId, item.jp) ? 0 : 1), 0);
}
