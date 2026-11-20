import { useSyncExternalStore } from "react";

import { canAttemptSync, noteSyncResult } from "./kv-sync-policy";

/**
 * Per-user edits of the N2 grammar points' native-usage markers.
 * Row id is "week-day-pointIndex" (e.g. "3-2-1"); code is one of the
 * N2_NATIVE_USAGE codes ("e" | "c" | "s" | "f"). `code: ""` is a tombstone:
 * the user reset the point to its built-in default, and the tombstone keeps
 * an older override on the server from resurrecting on merge.
 */
export type NuOverrideRow = { id: string; code: string; ts: number };

export const NU_OVERRIDES_KEY = "nu-overrides";

const MAX_ITEMS = 400;
const NU_ID = /^\d{1,2}-\d{1,2}-\d{1,3}$/;
const NU_CODES = new Set(["e", "c", "s", "f", ""]);

type Entry = { code: string; ts: number };
type EntryMap = Record<string, Entry>;

const listeners = new Set<() => void>();
let version = 0;
let snapshot: Readonly<Record<string, string>> = {};
let snapshotVersion = -1;
let entries: EntryMap = Object.create(null);
let hydrated = false;
let signedIn = false;
let ready = false;
let dirty = false;
let pushing = false;
let resyncing = false;

function freshMap(): EntryMap {
	return Object.create(null);
}

export function isSafeNuId(id: string) {
	return NU_ID.test(id);
}

function byRecent(a: NuOverrideRow, b: NuOverrideRow) {
	return b.ts - a.ts || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
}

function rowsFromEntries(): NuOverrideRow[] {
	const rows: NuOverrideRow[] = [];
	for (const [id, entry] of Object.entries(entries)) {
		rows.push({ id, code: entry.code, ts: entry.ts });
	}
	rows.sort(byRecent);
	return rows;
}

function sameRows(a: NuOverrideRow[], b: NuOverrideRow[]) {
	if (a.length !== b.length) return false;
	const byId = new Map(b.map((item) => [item.id, item]));
	return a.every((item) => {
		const other = byId.get(item.id);
		return !!other && other.code === item.code && other.ts === item.ts;
	});
}

export function cleanNuOverrides(value: unknown): NuOverrideRow[] {
	if (!Array.isArray(value)) return [];
	const byId = new Map<string, NuOverrideRow>();
	for (const raw of value) {
		if (!raw || typeof raw !== "object" || Array.isArray(raw)) continue;
		const item = raw as Record<string, unknown>;
		if (typeof item.id !== "string" || !isSafeNuId(item.id)) continue;
		if (typeof item.code !== "string" || !NU_CODES.has(item.code)) continue;
		if (typeof item.ts !== "number" || !Number.isFinite(item.ts)) continue;
		const prev = byId.get(item.id);
		if (!prev || item.ts >= prev.ts) {
			byId.set(item.id, { id: item.id, code: item.code, ts: item.ts });
		}
	}
	return [...byId.values()].sort(byRecent);
}

export function mergeNuOverrides(local: NuOverrideRow[], server: NuOverrideRow[], sameDevice: boolean): NuOverrideRow[] {
	const copy = (item: NuOverrideRow): NuOverrideRow => ({ id: item.id, code: item.code, ts: item.ts });
	if (!sameDevice) return server.map(copy).sort(byRecent);
	const byId = new Map<string, NuOverrideRow>();
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
		const raw = localStorage.getItem(NU_OVERRIDES_KEY);
		if (!raw) return out;
		const parsed: unknown = JSON.parse(raw);
		if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return out;
		for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
			if (!isSafeNuId(key)) continue;
			if (!value || typeof value !== "object" || Array.isArray(value)) continue;
			const item = value as Record<string, unknown>;
			if (typeof item.code !== "string" || !NU_CODES.has(item.code)) continue;
			if (typeof item.ts !== "number" || !Number.isFinite(item.ts)) continue;
			out[key] = { code: item.code, ts: item.ts };
		}
	} catch {
		/* ignore broken storage */
	}
	return out;
}

function trimEntries() {
	const rows = rowsFromEntries();
	if (rows.length <= MAX_ITEMS) return;
	const tombs = rows.filter((item) => item.code === "").sort((a, b) => a.ts - b.ts);
	const live = rows.filter((item) => item.code !== "").sort((a, b) => a.ts - b.ts);
	let overflow = rows.length - MAX_ITEMS;
	const drop = new Set<string>();
	for (const item of [...tombs, ...live]) {
		if (overflow <= 0) break;
		drop.add(item.id);
		overflow -= 1;
	}
	for (const id of drop) delete entries[id];
}

function applyRows(rows: NuOverrideRow[]) {
	const next = freshMap();
	for (const row of rows) {
		if (!isSafeNuId(row.id)) continue;
		next[row.id] = { code: row.code, ts: row.ts };
	}
	entries = next;
	trimEntries();
}

function writeStored() {
	try {
		const payload: Record<string, Entry> = {};
		for (const [id, entry] of Object.entries(entries)) {
			payload[id] = { code: entry.code, ts: entry.ts };
		}
		localStorage.setItem(NU_OVERRIDES_KEY, JSON.stringify(payload));
	} catch {
		/* ignore quota / private mode */
	}
}

function ensureHydrated() {
	if (hydrated) return;
	entries = readStored();
	hydrated = true;
}

function currentOverrides(): Readonly<Record<string, string>> {
	ensureHydrated();
	if (snapshotVersion !== version) {
		const next: Record<string, string> = {};
		for (const [id, entry] of Object.entries(entries)) {
			if (entry.code !== "") next[id] = entry.code;
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

export function subscribeNuOverrides(listener: () => void) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

/** React hook: the effective per-point marker overrides ("week-day-index" -> code). */
export function useNuOverrides(): Readonly<Record<string, string>> {
	return useSyncExternalStore(subscribeNuOverrides, currentOverrides, currentOverrides);
}

/** Set a point's marker, or pass null to reset it to the built-in default. */
export function setNuOverride(id: string, code: string | null) {
	ensureHydrated();
	if (!isSafeNuId(id)) return;
	if (code !== null && !NU_CODES.has(code)) return;
	entries[id] = { code: code ?? "", ts: Date.now() };
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

export function hydrateNuOverrides() {
	entries = readStored();
	hydrated = true;
	emit();
}

export function noteNuOverridesSignedOut() {
	signedIn = false;
	ready = true;
	emit();
}

export async function pullNuOverridesFromServer(accountId: string) {
	signedIn = true;
	ensureHydrated();
	let pulled = false;
	try {
		const res = await fetch("/api/nu-overrides", { cache: "no-store", credentials: "same-origin" });
		if (res.ok) {
			const data: unknown = await res.json();
			if (Array.isArray(data)) {
				const server = cleanNuOverrides(data);
				const same = lastAccountId() === "" || lastAccountId() === accountId;
				applyRows(mergeNuOverrides(rowsFromEntries(), server, same));
				writeStored();
				dirty = !sameRows(rowsFromEntries(), server);
				pulled = true;
			}
		}
	} catch {
		/* offline */
	} finally {
		ready = true;
		if (!pulled && rowsFromEntries().length > 0) dirty = true;
		emit();
	}
}

export async function pushNuOverridesNow() {
	if (!signedIn || !ready || !dirty) return false;
	if (pushing) return false;
	if (!canAttemptSync("/api/nu-overrides")) return false;
	pushing = true;
	const snapshotRows = JSON.stringify(rowsFromEntries());
	try {
		const response = await fetch("/api/nu-overrides", {
			method: "PUT",
			headers: { "content-type": "application/json" },
			credentials: "same-origin",
			body: snapshotRows,
		});
		noteSyncResult("/api/nu-overrides", response.status);
		if (!response.ok) throw new Error(`nu-overrides sync failed: ${response.status}`);
		if (JSON.stringify(rowsFromEntries()) === snapshotRows) dirty = false;
		return true;
	} catch {
		// Network error: keep local data, try again on a later page open (cooldown applies).
		noteSyncResult("/api/nu-overrides", 0);
		return false;
	} finally {
		pushing = false;
	}
}

export async function resyncNuOverrides() {
	if (!signedIn || !ready || pushing || dirty || resyncing) return;
	resyncing = true;
	try {
		const res = await fetch("/api/nu-overrides", { cache: "no-store", credentials: "same-origin" });
		if (!res.ok) return;
		const data: unknown = await res.json();
		if (!Array.isArray(data)) return;
		const server = cleanNuOverrides(data);
		const before = rowsFromEntries();
		const merged = mergeNuOverrides(before, server, true);
		applyRows(merged);
		writeStored();
		dirty = !sameRows(rowsFromEntries(), server);
		if (!sameRows(rowsFromEntries(), before)) emit();
	} catch {
		/* ignore */
	} finally {
		resyncing = false;
	}
}

export function kickNuOverridesSync() {
	if (!signedIn || !ready) return;
	// Pushes happen once per page open; on focus only pull (read-only) when nothing is pending.
	if (!dirty) void resyncNuOverrides();
}

export function resetNuOverridesForTests() {
	entries = freshMap();
	snapshot = {};
	snapshotVersion = -1;
	version = 0;
	hydrated = false;
	signedIn = false;
	ready = false;
	dirty = false;
	pushing = false;
	resyncing = false;
}
