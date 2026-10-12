export type MasteryMap = Record<string, true>;

/** Signed-in flashcard mark. `known: false` keeps a newer unmark from being overwritten. */
export type MasteryRow = { id: string; known: boolean; ts: number };

export const FLASHCARD_MASTERY_KEY = "flashcard-mastery";

const MAX_ITEMS = 6_000;
const MAX_ID = 1_000;
const SYNC_RETRY_BASE_MS = 1_500;
const SYNC_RETRY_MAX_MS = 30_000;

type Entry = { known: boolean; ts: number };
type EntryMap = Record<string, Entry>;

const listeners = new Set<() => void>();
let version = 0;
let snapshot: MasteryMap = {};
let snapshotVersion = -1;
let entries: EntryMap = Object.create(null);
let hydrated = false;
let signedIn = false;
let ready = false;
let dirty = false;
let syncing = false;
let pushing = false;
let resyncing = false;
let retryAttempt = 0;
let pushTimer: ReturnType<typeof setTimeout> | null = null;

export function masteryKey(deckId: string, itemId: string): string {
	return `${deckId}::${itemId}`;
}

function freshMap(): EntryMap {
	return Object.create(null);
}

function isSafeCardId(id: string) {
	return id.length > 0 && id.length <= MAX_ID && id !== "__proto__" && id !== "prototype" && id !== "constructor";
}

function byRecent(a: MasteryRow, b: MasteryRow) {
	return b.ts - a.ts || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
}

function rowsFromEntries(): MasteryRow[] {
	const rows: MasteryRow[] = [];
	for (const [id, entry] of Object.entries(entries)) rows.push({ id, known: entry.known, ts: entry.ts });
	rows.sort(byRecent);
	return rows;
}

function sameRows(a: MasteryRow[], b: MasteryRow[]) {
	if (a.length !== b.length) return false;
	const byId = new Map(b.map((item) => [item.id, item]));
	return a.every((item) => {
		const other = byId.get(item.id);
		return !!other && other.known === item.known && other.ts === item.ts;
	});
}

export function cleanMastery(value: unknown): MasteryRow[] {
	if (!Array.isArray(value)) return [];
	const byId = new Map<string, MasteryRow>();
	for (const raw of value) {
		if (!raw || typeof raw !== "object" || Array.isArray(raw)) continue;
		const item = raw as Record<string, unknown>;
		if (typeof item.id !== "string" || !isSafeCardId(item.id)) continue;
		if (typeof item.known !== "boolean") continue;
		if (typeof item.ts !== "number" || !Number.isFinite(item.ts)) continue;
		const prev = byId.get(item.id);
		if (!prev || item.ts >= prev.ts) byId.set(item.id, { id: item.id, known: item.known, ts: item.ts });
	}
	return [...byId.values()].sort(byRecent);
}

export function mergeMastery(local: MasteryRow[], server: MasteryRow[], sameDevice: boolean): MasteryRow[] {
	const copy = (item: MasteryRow): MasteryRow => ({ id: item.id, known: item.known, ts: item.ts });
	if (!sameDevice) return server.map(copy).sort(byRecent);
	const byId = new Map<string, MasteryRow>();
	for (const item of server) byId.set(item.id, copy(item));
	for (const item of local) {
		const prev = byId.get(item.id);
		if (!prev || item.ts >= prev.ts) byId.set(item.id, copy(item));
	}
	return [...byId.values()].sort(byRecent);
}

function readStored(): EntryMap {
	const out = freshMap();
	try {
		const raw = localStorage.getItem(FLASHCARD_MASTERY_KEY);
		if (!raw) return out;
		const parsed: unknown = JSON.parse(raw);
		if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return out;
		for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
			if (!isSafeCardId(key)) continue;
			if (value === true) {
				out[key] = { known: true, ts: 0 };
				continue;
			}
			if (!value || typeof value !== "object" || Array.isArray(value)) continue;
			const item = value as Record<string, unknown>;
			if (typeof item.known !== "boolean") continue;
			if (typeof item.ts !== "number" || !Number.isFinite(item.ts)) continue;
			out[key] = { known: item.known, ts: item.ts };
		}
	} catch {
		/* ignore broken storage */
	}
	return out;
}

function trimEntries() {
	const rows = rowsFromEntries();
	if (rows.length <= MAX_ITEMS) return;
	const tombs = rows.filter((item) => !item.known).sort((a, b) => a.ts - b.ts || (a.id < b.id ? -1 : 1));
	const known = rows.filter((item) => item.known).sort((a, b) => a.ts - b.ts || (a.id < b.id ? -1 : 1));
	let overflow = rows.length - MAX_ITEMS;
	const drop = new Set<string>();
	for (const item of tombs) {
		if (overflow <= 0) break;
		drop.add(item.id);
		overflow -= 1;
	}
	for (const item of known) {
		if (overflow <= 0) break;
		drop.add(item.id);
		overflow -= 1;
	}
	for (const id of drop) delete entries[id];
}

function applyRows(rows: MasteryRow[]) {
	const next = freshMap();
	for (const row of rows) {
		if (!isSafeCardId(row.id)) continue;
		next[row.id] = { known: row.known, ts: row.ts };
	}
	entries = next;
	trimEntries();
}

function writeFlashcards() {
	try {
		const payload: Record<string, Entry> = {};
		for (const [id, entry] of Object.entries(entries)) payload[id] = { known: entry.known, ts: entry.ts };
		localStorage.setItem(FLASHCARD_MASTERY_KEY, JSON.stringify(payload));
	} catch {
		/* ignore quota / private mode */
	}
}

function ensureHydrated() {
	if (hydrated) return;
	entries = readStored();
	hydrated = true;
}

function currentKnown(): MasteryMap {
	ensureHydrated();
	if (snapshotVersion !== version) {
		const next: MasteryMap = {};
		for (const [id, entry] of Object.entries(entries)) if (entry.known) next[id] = true;
		snapshot = next;
		snapshotVersion = version;
	}
	return snapshot;
}

function emit() {
	version += 1;
	listeners.forEach((fn) => fn());
}

export function subscribeMastery(listener: () => void) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

export function getMasteryVersion() {
	return version;
}

export function loadMastery(storageKey: string): MasteryMap {
	if (storageKey === FLASHCARD_MASTERY_KEY) return currentKnown();
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

function retryDelay(attempt: number) {
	return Math.min(SYNC_RETRY_MAX_MS, SYNC_RETRY_BASE_MS * 2 ** Math.max(0, attempt - 1));
}

function schedulePush(delay = 400) {
	if (!signedIn || !ready || !dirty) return;
	if (pushTimer) clearTimeout(pushTimer);
	pushTimer = setTimeout(() => {
		pushTimer = null;
		void pushMasteryNow();
	}, delay);
}

function commitFlashcards() {
	dirty = true;
	writeFlashcards();
	emit();
	if (!signedIn || !ready || syncing) return;
	schedulePush();
}

export function setMastered(
	storageKey: string,
	map: MasteryMap,
	deckId: string,
	itemId: string,
	known: boolean,
): MasteryMap {
	const key = masteryKey(deckId, itemId);
	if (storageKey !== FLASHCARD_MASTERY_KEY) {
		const next = { ...map };
		if (known) next[key] = true;
		else delete next[key];
		saveMastery(storageKey, next);
		return next;
	}
	ensureHydrated();
	if (!isSafeCardId(key)) return currentKnown();
	entries[key] = { known, ts: Date.now() };
	trimEntries();
	commitFlashcards();
	return currentKnown();
}

export function unmasteredCount(map: MasteryMap, deckId: string, items: { id: string }[]): number {
	return items.reduce((sum, item) => sum + (isMastered(map, deckId, item.id) ? 0 : 1), 0);
}

function lastAccountId() {
	try {
		return localStorage.getItem("accountId") || "";
	} catch {
		return "";
	}
}

export function hydrateMastery() {
	entries = readStored();
	hydrated = true;
	emit();
}

export function noteMasterySignedOut() {
	signedIn = false;
	ready = true;
	if (pushTimer) {
		clearTimeout(pushTimer);
		pushTimer = null;
	}
	emit();
}

export async function pullMasteryFromServer(accountId: string) {
	signedIn = true;
	syncing = true;
	ensureHydrated();
	let pulled = false;
	try {
		const res = await fetch("/api/mastery", { cache: "no-store", credentials: "same-origin" });
		if (res.ok) {
			const data: unknown = await res.json();
			if (Array.isArray(data)) {
				const server = cleanMastery(data);
				const same = lastAccountId() === "" || lastAccountId() === accountId;
				applyRows(mergeMastery(rowsFromEntries(), server, same));
				writeFlashcards();
				dirty = !sameRows(rowsFromEntries(), server);
				pulled = true;
			}
		}
	} catch {
		/* offline */
	} finally {
		syncing = false;
		ready = true;
		if (!pulled && rowsFromEntries().length > 0) dirty = true;
		emit();
		if (dirty) schedulePush(0);
	}
}

export async function pushMasteryNow() {
	if (!signedIn || !ready || !dirty) return false;
	if (pushTimer) {
		clearTimeout(pushTimer);
		pushTimer = null;
	}
	if (pushing) return false;
	pushing = true;
	const snapshotRows = JSON.stringify(rowsFromEntries());
	try {
		const response = await fetch("/api/mastery", {
			method: "PUT",
			headers: { "content-type": "application/json" },
			credentials: "same-origin",
			body: snapshotRows,
		});
		if (!response.ok) throw new Error(`mastery sync failed: ${response.status}`);
		retryAttempt = 0;
		if (JSON.stringify(rowsFromEntries()) === snapshotRows) dirty = false;
		return true;
	} catch {
		retryAttempt += 1;
		return false;
	} finally {
		pushing = false;
		if (dirty) schedulePush(retryDelay(retryAttempt || 1));
	}
}

export async function resyncMastery() {
	if (!signedIn || !ready || pushTimer || pushing || dirty || resyncing) return;
	resyncing = true;
	try {
		const res = await fetch("/api/mastery", { cache: "no-store", credentials: "same-origin" });
		if (!res.ok) return;
		const data: unknown = await res.json();
		if (!Array.isArray(data)) return;
		const server = cleanMastery(data);
		const before = rowsFromEntries();
		const merged = mergeMastery(before, server, true);
		syncing = true;
		applyRows(merged);
		writeFlashcards();
		syncing = false;
		dirty = !sameRows(rowsFromEntries(), server);
		if (!sameRows(rowsFromEntries(), before)) emit();
		if (dirty) schedulePush();
	} catch {
		/* ignore */
	} finally {
		syncing = false;
		resyncing = false;
	}
}

export function kickMasterySync() {
	if (!signedIn || !ready) return;
	if (dirty) schedulePush(0);
	else void resyncMastery();
}

export function resetMasteryForTests() {
	entries = freshMap();
	snapshot = {};
	snapshotVersion = -1;
	version = 0;
	hydrated = false;
	signedIn = false;
	ready = false;
	dirty = false;
	syncing = false;
	pushing = false;
	resyncing = false;
	retryAttempt = 0;
	if (pushTimer) clearTimeout(pushTimer);
	pushTimer = null;
}
