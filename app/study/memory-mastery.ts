export type MasteryMap = Record<string, true>;

export function masteryKey(deckId: string, itemId: string): string {
	return `${deckId}::${itemId}`;
}

export function loadMastery(storageKey: string): MasteryMap {
	try {
		const raw = localStorage.getItem(storageKey);
		if (!raw) return {};
		const parsed: unknown = JSON.parse(raw);
		if (!parsed || typeof parsed !== "object") return {};
		const out: MasteryMap = {};
		for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
			if (value === true) out[key] = true;
		}
		return out;
	} catch {
		return {};
	}
}

export function saveMastery(storageKey: string, map: MasteryMap) {
	try {
		localStorage.setItem(storageKey, JSON.stringify(map));
	} catch {
		/* ignore quota / private mode */
	}
}

export function isMastered(map: MasteryMap, deckId: string, itemId: string): boolean {
	return map[masteryKey(deckId, itemId)] === true;
}

export function setMastered(
	storageKey: string,
	map: MasteryMap,
	deckId: string,
	itemId: string,
	known: boolean,
): MasteryMap {
	const key = masteryKey(deckId, itemId);
	const next = { ...map };
	if (known) next[key] = true;
	else delete next[key];
	saveMastery(storageKey, next);
	return next;
}

export function unmasteredCount(map: MasteryMap, deckId: string, items: { id: string }[]): number {
	return items.reduce((sum, item) => sum + (isMastered(map, deckId, item.id) ? 0 : 1), 0);
}
