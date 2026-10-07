import { jstToday } from "./lesson-review";

export type DueKind = "grammar" | "mistake" | "listening" | "topic";

export type DueEntry = {
	id: string;
	kind: DueKind;
	jp: string;
	cn: string;
	en: string;
	reading?: string;
	due: string;
	step: number;
	ts: number;
	deleted?: boolean;
};

export type DueDraft = {
	id: string;
	kind: DueKind;
	jp: string;
	cn: string;
	en: string;
	reading?: string;
};

/** Days until the next review after a correct answer, indexed by step. A miss always returns to step 0 (tomorrow). */
export const DUE_STEPS = [1, 3, 7, 14, 30] as const;
export const DUE_STORAGE_KEY = "jl-due-review-v1";

const SNAP_JP = 800;
const SNAP_TEXT = 4_000;
const SNAP_READING = 200;
const MAX_ID = 1_000;
const SYNC_RETRY_BASE_MS = 1_500;
const SYNC_RETRY_MAX_MS = 30_000;

const listeners = new Set<() => void>();
let version = 0;
let items: DueEntry[] = [];
let signedIn = false;
let ready = false;
let dirty = false;
let syncing = false;
let pushing = false;
let resyncing = false;
let retryAttempt = 0;
let pushTimer: ReturnType<typeof setTimeout> | null = null;

export function subscribeDue(listener: () => void) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

export function getDueVersion() {
	return version;
}

function emitDue() {
	version += 1;
	listeners.forEach((fn) => fn());
}

function clip(value: string | undefined, max: number) {
	const text = typeof value === "string" ? value : "";
	return text.length > max ? text.slice(0, max) : text;
}

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

export function scheduleAfterFail(today: string) {
	return { due: addIsoDays(today, 1), step: 0 };
}

export function scheduleAfterPass(today: string, step: number) {
	const index = Number.isInteger(step) ? Math.min(Math.max(step, 0), DUE_STEPS.length - 1) : 0;
	return {
		due: addIsoDays(today, DUE_STEPS[index]),
		step: Math.min(index + 1, DUE_STEPS.length - 1),
	};
}

export function grammarDueId(module: string, week: number, day: number, pattern: string) {
	return `grammar:${module}:${week}-${day}:${pattern}`;
}

export function mistakeDueId(id: string) {
	return `mistake:${id}`;
}

export function listeningDueId(scope: string, label: string) {
	return `listening:${scope}:${label}`;
}

export function mistakeDueDraft(mistake: { id: string; text: string }): DueDraft | null {
	const text = mistake.text.trim();
	if (!mistake.id || !text) return null;
	const lines = text.split("\n");
	const jp = clip(lines[0], SNAP_JP);
	const cn = clip(lines.slice(1).join("\n"), SNAP_TEXT);
	if (!jp && !cn) return null;
	return { id: mistakeDueId(mistake.id), kind: "mistake", jp, cn, en: "" };
}

function isKind(value: unknown): value is DueKind {
	return value === "grammar" || value === "mistake" || value === "listening" || value === "topic";
}

export function cleanDue(value: unknown): DueEntry[] {
	if (!Array.isArray(value)) return [];
	const out: DueEntry[] = [];
	for (const raw of value) {
		if (!raw || typeof raw !== "object" || Array.isArray(raw)) continue;
		const item = raw as Record<string, unknown>;
		if (typeof item.id !== "string" || !item.id || item.id.length > MAX_ID) continue;
		if (item.id === "__proto__" || item.id === "prototype" || item.id === "constructor") continue;
		if (!isKind(item.kind)) continue;
		if (typeof item.jp !== "string" || typeof item.cn !== "string" || typeof item.en !== "string") continue;
		if (typeof item.due !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(item.due)) continue;
		if (typeof item.step !== "number" || !Number.isInteger(item.step) || item.step < 0 || item.step > 4) continue;
		if (typeof item.ts !== "number" || !Number.isFinite(item.ts)) continue;
		const entry: DueEntry = {
			id: item.id,
			kind: item.kind,
			jp: item.jp,
			cn: item.cn,
			en: item.en,
			due: item.due,
			step: item.step,
			ts: item.ts,
		};
		if (typeof item.reading === "string" && item.reading) entry.reading = item.reading;
		if (item.deleted === true) entry.deleted = true;
		out.push(entry);
	}
	return out;
}

export function mergeDueEntries(local: DueEntry[], server: DueEntry[], sameDevice: boolean): DueEntry[] {
	if (!sameDevice) return server.map((item) => ({ ...item })).sort((a, b) => b.ts - a.ts);
	const byId = new Map<string, DueEntry>();
	for (const item of server) byId.set(item.id, { ...item });
	for (const item of local) {
		const prev = byId.get(item.id);
		if (!prev || item.ts > prev.ts) byId.set(item.id, { ...item });
	}
	return [...byId.values()].sort((a, b) => b.ts - a.ts);
}

function writeLocal() {
	try {
		localStorage.setItem(DUE_STORAGE_KEY, JSON.stringify(items));
	} catch {
		/* ignore quota / private mode */
	}
}

function commit() {
	dirty = true;
	writeLocal();
	emitDue();
	if (!signedIn || !ready || syncing) return;
	schedulePush();
}

export function hydrateDue() {
	try {
		const raw = localStorage.getItem(DUE_STORAGE_KEY);
		items = raw ? cleanDue(JSON.parse(raw)) : [];
	} catch {
		items = [];
	}
	emitDue();
}

export function dueEntries(): DueEntry[] {
	return items.filter((item) => !item.deleted).map((item) => ({ ...item }));
}

export function dueEntry(id: string): DueEntry | undefined {
	const found = items.find((item) => item.id === id);
	return found ? { ...found } : undefined;
}

export function dueToday(today = jstToday()): DueEntry[] {
	return items
		.filter((item) => !item.deleted && item.due <= today)
		.map((item) => ({ ...item }))
		.sort((a, b) => a.due.localeCompare(b.due) || a.ts - b.ts);
}

export function dueCount(today = jstToday()) {
	return dueToday(today).length;
}

export function rememberFail(draft: DueDraft, today = jstToday()) {
	const id = draft.id.trim();
	if (!id || id.length > MAX_ID) return;
	const jp = clip(draft.jp, SNAP_JP);
	const cn = clip(draft.cn, SNAP_TEXT);
	const en = clip(draft.en, SNAP_TEXT);
	if (!jp && !cn) return;
	const next = scheduleAfterFail(today);
	const entry: DueEntry = {
		id,
		kind: draft.kind,
		jp,
		cn,
		en,
		due: next.due,
		step: next.step,
		ts: Date.now(),
	};
	const reading = clip(draft.reading, SNAP_READING);
	if (reading) entry.reading = reading;
	items = [entry, ...items.filter((item) => item.id !== id)];
	commit();
}

/** A card that was never missed stays out of the queue. */
export function rememberPass(id: string, today = jstToday()) {
	const prev = items.find((item) => item.id === id && !item.deleted);
	if (!prev) return false;
	const next = scheduleAfterPass(today, prev.step);
	const entry: DueEntry = { ...prev, due: next.due, step: next.step, ts: Date.now() };
	delete entry.deleted;
	items = items.map((item) => (item.id === id ? entry : item));
	commit();
	return true;
}

/**
 * 「会了」：已在队列里就按答对推进；从没标过的卡片也排进队列，从第二档（3 天后）开始确认。
 * 专题词汇用它，让「会了」也进入间隔复习。
 */
export function rememberKnown(draft: DueDraft, today = jstToday()) {
	if (rememberPass(draft.id, today)) return;
	const id = draft.id.trim();
	if (!id || id.length > MAX_ID) return;
	const jp = clip(draft.jp, SNAP_JP);
	const cn = clip(draft.cn, SNAP_TEXT);
	if (!jp && !cn) return;
	const next = scheduleAfterPass(today, 1);
	const entry: DueEntry = { id, kind: draft.kind, jp, cn, en: clip(draft.en, SNAP_TEXT), due: next.due, step: next.step, ts: Date.now() };
	const reading = clip(draft.reading, SNAP_READING);
	if (reading) entry.reading = reading;
	items = [entry, ...items.filter((item) => item.id !== id)];
	commit();
}

export function forgetDue(id: string) {
	const prev = items.find((item) => item.id === id);
	if (!prev || prev.deleted) return;
	items = items.map((item) => (item.id === id ? { ...prev, deleted: true, ts: Date.now() } : item));
	commit();
}

function retryDelay(attempt: number) {
	return Math.min(SYNC_RETRY_MAX_MS, SYNC_RETRY_BASE_MS * 2 ** Math.max(0, attempt - 1));
}

function schedulePush(delay = 400) {
	if (!signedIn || !ready || !dirty) return;
	if (pushTimer) clearTimeout(pushTimer);
	pushTimer = setTimeout(() => {
		pushTimer = null;
		void pushDueNow();
	}, delay);
}

function lastAccountId() {
	try {
		return localStorage.getItem("accountId") || "";
	} catch {
		return "";
	}
}

export function noteDueSignedOut() {
	signedIn = false;
	ready = true;
	if (pushTimer) {
		clearTimeout(pushTimer);
		pushTimer = null;
	}
	emitDue();
}

export async function pullDueFromServer(accountId: string) {
	signedIn = true;
	syncing = true;
	let pulled = false;
	try {
		const res = await fetch("/api/due-review", { cache: "no-store", credentials: "same-origin" });
		if (res.ok) {
			const data: unknown = await res.json();
			if (Array.isArray(data)) {
				const server = cleanDue(data);
				const same = lastAccountId() === "" || lastAccountId() === accountId;
				const merged = mergeDueEntries(items, server, same);
				items = merged;
				writeLocal();
				dirty = JSON.stringify(merged) !== JSON.stringify(server);
				pulled = true;
			}
		}
	} catch {
		/* offline */
	} finally {
		syncing = false;
		ready = true;
		if (!pulled && items.length) dirty = true;
		emitDue();
		if (dirty) schedulePush(0);
	}
}

export async function pushDueNow() {
	if (!signedIn || !ready || !dirty) return false;
	if (pushTimer) {
		clearTimeout(pushTimer);
		pushTimer = null;
	}
	if (pushing) return false;
	pushing = true;
	const snapshot = JSON.stringify(items);
	try {
		const response = await fetch("/api/due-review", {
			method: "PUT",
			headers: { "content-type": "application/json" },
			credentials: "same-origin",
			body: snapshot,
		});
		if (!response.ok) throw new Error(`due review sync failed: ${response.status}`);
		retryAttempt = 0;
		if (JSON.stringify(items) === snapshot) dirty = false;
		return true;
	} catch {
		retryAttempt += 1;
		return false;
	} finally {
		pushing = false;
		if (dirty) schedulePush(retryDelay(retryAttempt || 1));
	}
}

export async function resyncDue() {
	if (!signedIn || !ready || pushTimer || pushing || dirty || resyncing) return;
	resyncing = true;
	try {
		const res = await fetch("/api/due-review", { cache: "no-store", credentials: "same-origin" });
		if (!res.ok) return;
		const data: unknown = await res.json();
		if (!Array.isArray(data)) return;
		const server = cleanDue(data);
		const merged = mergeDueEntries(items, server, true);
		const changed = JSON.stringify(merged) !== JSON.stringify(items);
		syncing = true;
		items = merged;
		writeLocal();
		syncing = false;
		dirty = JSON.stringify(merged) !== JSON.stringify(server);
		if (changed) emitDue();
		if (dirty) schedulePush();
	} catch {
		/* ignore */
	} finally {
		resyncing = false;
	}
}

export function kickDueSync() {
	if (!signedIn || !ready) return;
	if (dirty) schedulePush(0);
	else void resyncDue();
}

export function resetDueForTests() {
	items = [];
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
