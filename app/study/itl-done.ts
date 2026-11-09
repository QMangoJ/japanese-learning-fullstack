import { useSyncExternalStore } from "react";

import { canAttemptSync, noteSyncResult } from "./kv-sync-policy";

/** IT-listening article completion mark. `done: false` is a tombstone so a later unmark is never overwritten by an older mark. */
export type ItlDoneRow = { articleId: string; done: boolean; ts: number };

export const ITL_DONE_KEY = "itl-done";

const MAX_ITEMS = 500;
const MAX_ID = 1_000;

type Entry = { done: boolean; ts: number };
type EntryMap = Record<string, Entry>;

const listeners = new Set<() => void>();
let version = 0;
let snapshot: ReadonlySet<string> = new Set();
let snapshotVersion = -1;
let entries: EntryMap = Object.create(null);
let hydrated = false;
let signedIn = false;
let ready = false;
let dirty = false;
let syncing = false;
let pushing = false;
let resyncing = false;

function freshMap(): EntryMap {
	return Object.create(null);
}

function isSafeArticleId(id: string) {
	return id.length > 0 && id.length <= MAX_ID && id !== "__proto__" && id !== "prototype" && id !== "constructor";
}

function byRecent(a: ItlDoneRow, b: ItlDoneRow) {
	return b.ts - a.ts || (a.articleId < b.articleId ? -1 : a.articleId > b.articleId ? 1 : 0);
}

function rowsFromEntries(): ItlDoneRow[] {
	const rows: ItlDoneRow[] = [];
	for (const [articleId, entry] of Object.entries(entries)) {
		rows.push({ articleId, done: entry.done, ts: entry.ts });
	}
	rows.sort(byRecent);
	return rows;
}

function sameRows(a: ItlDoneRow[], b: ItlDoneRow[]) {
	if (a.length !== b.length) return false;
	const byId = new Map(b.map((item) => [item.articleId, item]));
	return a.every((item) => {
		const other = byId.get(item.articleId);
		return !!other && other.done === item.done && other.ts === item.ts;
	});
}

export function cleanItlDone(value: unknown): ItlDoneRow[] {
	if (!Array.isArray(value)) return [];
	const byId = new Map<string, ItlDoneRow>();
	for (const raw of value) {
		if (!raw || typeof raw !== "object" || Array.isArray(raw)) continue;
		const item = raw as Record<string, unknown>;
		if (typeof item.articleId !== "string" || !isSafeArticleId(item.articleId)) continue;
		if (typeof item.done !== "boolean") continue;
		if (typeof item.ts !== "number" || !Number.isFinite(item.ts)) continue;
		const prev = byId.get(item.articleId);
		if (!prev || item.ts >= prev.ts) {
			byId.set(item.articleId, { articleId: item.articleId, done: item.done, ts: item.ts });
		}
	}
	return [...byId.values()].sort(byRecent);
}

export function mergeItlDone(local: ItlDoneRow[], server: ItlDoneRow[], sameDevice: boolean): ItlDoneRow[] {
	const copy = (item: ItlDoneRow): ItlDoneRow => ({ articleId: item.articleId, done: item.done, ts: item.ts });
	if (!sameDevice) return server.map(copy).sort(byRecent);
	const byId = new Map<string, ItlDoneRow>();
	for (const item of server) byId.set(item.articleId, copy(item));
	for (const item of local) {
		const prev = byId.get(item.articleId);
		if (!prev || item.ts >= prev.ts) byId.set(item.articleId, copy(item));
	}
	return [...byId.values()].sort(byRecent);
}

function readStored(): EntryMap {
	const out = freshMap();
	try {
		const raw = localStorage.getItem(ITL_DONE_KEY);
		if (!raw) return out;
		const parsed: unknown = JSON.parse(raw);
		if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return out;
		for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
			if (!isSafeArticleId(key)) continue;
			if (!value || typeof value !== "object" || Array.isArray(value)) continue;
			const item = value as Record<string, unknown>;
			if (typeof item.done !== "boolean") continue;
			if (typeof item.ts !== "number" || !Number.isFinite(item.ts)) continue;
			out[key] = { done: item.done, ts: item.ts };
		}
	} catch {
		/* ignore broken storage */
	}
	return out;
}

function trimEntries() {
	const rows = rowsFromEntries();
	if (rows.length <= MAX_ITEMS) return;
	const tombs = rows.filter((item) => !item.done).sort((a, b) => a.ts - b.ts);
	const dones = rows.filter((item) => item.done).sort((a, b) => a.ts - b.ts);
	let overflow = rows.length - MAX_ITEMS;
	const drop = new Set<string>();
	for (const item of [...tombs, ...dones]) {
		if (overflow <= 0) break;
		drop.add(item.articleId);
		overflow -= 1;
	}
	for (const id of drop) delete entries[id];
}

function applyRows(rows: ItlDoneRow[]) {
	const next = freshMap();
	for (const row of rows) {
		if (!isSafeArticleId(row.articleId)) continue;
		next[row.articleId] = { done: row.done, ts: row.ts };
	}
	entries = next;
	trimEntries();
}

function writeStored() {
	try {
		const payload: Record<string, Entry> = {};
		for (const [id, entry] of Object.entries(entries)) {
			payload[id] = { done: entry.done, ts: entry.ts };
		}
		localStorage.setItem(ITL_DONE_KEY, JSON.stringify(payload));
	} catch {
		/* ignore quota / private mode */
	}
}

function ensureHydrated() {
	if (hydrated) return;
	entries = readStored();
	hydrated = true;
}

function currentDone(): ReadonlySet<string> {
	ensureHydrated();
	if (snapshotVersion !== version) {
		const next = new Set<string>();
		for (const [id, entry] of Object.entries(entries)) {
			if (entry.done) next.add(id);
		}
		snapshot = next;
		snapshotVersion = version;
	}
	return snapshot;
}

function emit() {
	version += 1;
	listeners.forEach((fn) => fn());
}

export function subscribeItlDone(listener: () => void) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

/** React hook: the set of article ids currently marked 学完. Re-renders on any mark change. */
export function useItlDone(): { doneIds: ReadonlySet<string>; toggle: (articleId: string) => void } {
	const doneIds = useSyncExternalStore(subscribeItlDone, currentDone, currentDone);
	return { doneIds, toggle: toggleItlDone };
}

export function isItlDone(articleId: string): boolean {
	return currentDone().has(articleId);
}

export function toggleItlDone(articleId: string) {
	ensureHydrated();
	if (!isSafeArticleId(articleId)) return;
	const next = !(entries[articleId]?.done ?? false);
	entries[articleId] = { done: next, ts: Date.now() };
	trimEntries();
	dirty = true;
	writeStored();
	emit();
	// Synced to the server once on the next page open (see kv-sync-policy), not on every change.
}

function lastAccountId() {
	try {
		return localStorage.getItem("accountId") || "";
	} catch {
		return "";
	}
}

export function hydrateItlDone() {
	entries = readStored();
	hydrated = true;
	emit();
}

export function noteItlDoneSignedOut() {
	signedIn = false;
	ready = true;
	emit();
}

export async function pullItlDoneFromServer(accountId: string) {
	signedIn = true;
	syncing = true;
	ensureHydrated();
	let pulled = false;
	try {
		const res = await fetch("/api/itl-done", { cache: "no-store", credentials: "same-origin" });
		if (res.ok) {
			const data: unknown = await res.json();
			if (Array.isArray(data)) {
				const server = cleanItlDone(data);
				const same = lastAccountId() === "" || lastAccountId() === accountId;
				applyRows(mergeItlDone(rowsFromEntries(), server, same));
				writeStored();
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
	}
}

export async function pushItlDoneNow() {
	if (!signedIn || !ready || !dirty) return false;
	if (pushing) return false;
	if (!canAttemptSync("/api/itl-done")) return false;
	pushing = true;
	const snapshotRows = JSON.stringify(rowsFromEntries());
	try {
		const response = await fetch("/api/itl-done", {
			method: "PUT",
			headers: { "content-type": "application/json" },
			credentials: "same-origin",
			body: snapshotRows,
		});
		noteSyncResult("/api/itl-done", response.status);
		if (!response.ok) throw new Error(`itl-done sync failed: ${response.status}`);
		if (JSON.stringify(rowsFromEntries()) === snapshotRows) dirty = false;
		return true;
	} catch {
		// Network error: keep local data, try again on a later page open (cooldown applies).
		noteSyncResult("/api/itl-done", 0);
		return false;
	} finally {
		pushing = false;
	}
}

export async function resyncItlDone() {
	if (!signedIn || !ready || pushing || dirty || resyncing) return;
	resyncing = true;
	try {
		const res = await fetch("/api/itl-done", { cache: "no-store", credentials: "same-origin" });
		if (!res.ok) return;
		const data: unknown = await res.json();
		if (!Array.isArray(data)) return;
		const server = cleanItlDone(data);
		const before = rowsFromEntries();
		const merged = mergeItlDone(before, server, true);
		syncing = true;
		applyRows(merged);
		writeStored();
		syncing = false;
		dirty = !sameRows(rowsFromEntries(), server);
		if (!sameRows(rowsFromEntries(), before)) emit();
	} catch {
		/* ignore */
	} finally {
		syncing = false;
		resyncing = false;
	}
}

export function kickItlDoneSync() {
	if (!signedIn || !ready) return;
	// Pushes happen once per page open; on focus only pull (read-only) when nothing is pending.
	if (!dirty) void resyncItlDone();
}

export function resetItlDoneForTests() {
	entries = freshMap();
	snapshot = new Set();
	snapshotVersion = -1;
	version = 0;
	hydrated = false;
	signedIn = false;
	ready = false;
	dirty = false;
	syncing = false;
	pushing = false;
	resyncing = false;
}
