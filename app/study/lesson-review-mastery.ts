import {
	isMastered,
	loadMastery,
	saveMastery,
	setMastered,
	unmasteredCount,
	type MasteryMap,
} from "./memory-mastery";

const STORAGE_KEY = "lesson-review-mastery";

export type ReviewMasteryMap = MasteryMap;

export function loadReviewMastery(): ReviewMasteryMap {
	return loadMastery(STORAGE_KEY);
}

export function saveReviewMastery(map: ReviewMasteryMap) {
	saveMastery(STORAGE_KEY, map);
}

export function isReviewKnown(map: ReviewMasteryMap, dayId: string, jp: string): boolean {
	return isMastered(map, dayId, jp);
}

export function setReviewKnown(map: ReviewMasteryMap, dayId: string, jp: string, known: boolean): ReviewMasteryMap {
	return setMastered(STORAGE_KEY, map, dayId, jp, known);
}

export function reviewUnknownCount(map: ReviewMasteryMap, dayId: string, items: { jp: string }[]): number {
	return unmasteredCount(
		map,
		dayId,
		items.map((item) => ({ id: item.jp })),
	);
}
