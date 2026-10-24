import { canAttemptSync, noteSyncResult } from "./kv-sync-policy";

export const USAGE_DAY_CAP_SEC = 16 * 60 * 60;
export const USAGE_IDLE_MS = 3 * 60 * 1000;
export const USAGE_ENDPOINT = "https://japanese-fullstack.alanjwakawaka.workers.dev/api/usage";

const DAY = /^\d{4}-\d{2}-\d{2}$/;
const LOCAL_KEY = "usage-time-v1";
const LOCK_KEY = "usage-time-lock";
const IDLE_SLICE_MS = 60_000;

export type DayMap = Record<string, number>;
export type UsageKind = "account" | "shadowing" | "reading";

export type UsageSnapshot = {
	days: DayMap;
	signedIn: boolean;
	synced: boolean;
	kind: UsageKind;
};

type LocalUsage = { days: DayMap; synced: DayMap; device: string };

export function jstDayKey(ms: number): string {
	return new Intl.DateTimeFormat("en-CA", {
		timeZone: "Asia/Tokyo",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(ms);
}

/** Next midnight in Asia/Tokyo, as a UTC timestamp. */
export function nextJstMidnight(ms: number): number {
	const [year, month, day] = jstDayKey(ms).split("-").map(Number);
	const start = Date.UTC(year, month - 1, day) - 9 * 60 * 60 * 1000;
	const next = start + 24 * 60 * 60 * 1000;
	return next > ms ? next : ms + 1000;
}

export function sanitizeDays(value: unknown): DayMap {
	if (!value || typeof value !== "object" || Array.isArray(value)) return {};
	const out: DayMap = {};
	for (const [day, sec] of Object.entries(value as Record<string, unknown>)) {
		if (!DAY.test(day) || typeof sec !== "number" || !Number.isInteger(sec) || sec <= 0) continue;
		out[day] = Math.min(USAGE_DAY_CAP_SEC, sec);
	}
	return out;
}

export function parseUsageDelta(body: unknown): DayMap | null {
	if (!body || typeof body !== "object" || Array.isArray(body) || !("days" in body)) return null;
	const days = (body as { days: unknown }).days;
	if (!days || typeof days !== "object" || Array.isArray(days)) return null;
	return sanitizeDays(days);
}

function shiftDay(day: string, days: number): string {
	const [year, month, date] = day.split("-").map(Number);
	return new Date(Date.UTC(year, month - 1, date + days)).toISOString().slice(0, 10);
}

export function applyUsageDelta(stored: DayMap, delta: DayMap, now = Date.now()): DayMap {
	const next = { ...sanitizeDays(stored) };
	const latest = shiftDay(jstDayKey(now), 1);
	for (const [day, sec] of Object.entries(delta).slice(0, 400)) {
		if (!DAY.test(day) || day > latest || !Number.isInteger(sec) || sec <= 0) continue;
		next[day] = Math.min(USAGE_DAY_CAP_SEC, (next[day] || 0) + Math.min(sec, USAGE_DAY_CAP_SEC));
	}
	return next;
}

export function addSecondsAcrossDays(days: DayMap, startMs: number, endMs: number): DayMap {
	if (!(endMs > startMs)) return days;
	const next = { ...days };
	let cursor = startMs;
	while (cursor < endMs) {
		const boundary = nextJstMidnight(cursor);
		const sliceEnd = Math.min(endMs, boundary);
		const sec = Math.floor((sliceEnd - cursor) / 1000);
		if (sec > 0) {
			const day = jstDayKey(cursor);
			next[day] = Math.min(USAGE_DAY_CAP_SEC, (next[day] || 0) + sec);
		}
		if (sliceEnd <= cursor) break;
		cursor = sliceEnd;
	}
	return next;
}

export function pendingDelta(local: DayMap, synced: DayMap, remote: DayMap): DayMap {
	const out: DayMap = {};
	for (const day of Object.keys(local)) {
		const pending = Math.max(0, (local[day] || 0) - (synced[day] || 0));
		const room = Math.max(0, USAGE_DAY_CAP_SEC - (remote[day] || 0));
		const send = Math.min(pending, room);
		if (send > 0) out[day] = send;
	}
	return out;
}

export function displayDays(remote: DayMap, local: DayMap, synced: DayMap): DayMap {
	const out: DayMap = {};
	for (const day of new Set([...Object.keys(remote), ...Object.keys(local)])) {
		const pending = Math.max(0, (local[day] || 0) - (synced[day] || 0));
		const total = (remote[day] || 0) + pending;
		if (total > 0) out[day] = Math.min(USAGE_DAY_CAP_SEC, total);
	}
	return out;
}

const DEVICE = /^[a-z0-9]{6,40}$/;

/** Client report: this device's absolute per-day totals. Idempotent, so a retry or stale read never loses time. */
export function parseUsageReport(body: unknown): { device: string; totals: DayMap } | null {
	if (!body || typeof body !== "object" || Array.isArray(body)) return null;
	const { device, totals } = body as { device?: unknown; totals?: unknown };
	if (typeof device !== "string" || !DEVICE.test(device)) return null;
	if (!totals || typeof totals !== "object" || Array.isArray(totals)) return null;
	return { device, totals: sanitizeDays(totals) };
}

export type DayRecord = { devices: Record<string, number>; legacy?: number };

/** Merge one device's absolute total into a day record (max, never decreases). */
export function mergeDayRecord(rec: DayRecord | null, device: string, sec: number): DayRecord {
	const devices = { ...(rec?.devices || {}) };
	devices[device] = Math.min(USAGE_DAY_CAP_SEC, Math.max(devices[device] || 0, sec));
	return { ...(rec?.legacy ? { legacy: rec.legacy } : {}), devices };
}

export function dayRecordTotal(rec: DayRecord | null | undefined): number {
	if (!rec) return 0;
	const sum = Object.values(rec.devices || {}).reduce((a, b) => a + (Number.isFinite(b) ? b : 0), 0);
	return Math.min(USAGE_DAY_CAP_SEC, Math.max(rec.legacy || 0, sum));
}

/** Display: server total minus what this device already uploaded, plus this device's live total. */
export function combineDays(remote: DayMap, mine: DayMap, local: DayMap): DayMap {
	const out: DayMap = {};
	for (const day of new Set([...Object.keys(remote), ...Object.keys(local)])) {
		const others = Math.max(0, (remote[day] || 0) - (mine[day] || 0));
		const total = Math.max(remote[day] || 0, others + (local[day] || 0));
		if (total > 0) out[day] = Math.min(USAGE_DAY_CAP_SEC, total);
	}
	return out;
}

export function usageEndpoint(kind: UsageKind): string {
	if (kind === "shadowing") return `${USAGE_ENDPOINT}?app=shadowing`;
	if (kind === "reading") return `${USAGE_ENDPOINT}?app=reading`;
	return "/api/usage";
}

const EMPTY_SNAPSHOT: UsageSnapshot = { days: {}, signedIn: false, synced: false, kind: "account" };

let kind: UsageKind = "account";
let remote: DayMap = {};
let remoteMine: DayMap = {};
let local: LocalUsage = { days: {}, synced: {}, device: "" };
let signedIn = false;
let lastSyncOk = false;
let audioPlaying = false;
let segmentStart: number | null = null;
let lastInput = 0;
let snapshot: UsageSnapshot = EMPTY_SNAPSHOT;
let timer = 0;
let started = 0;
let syncing: Promise<void> | null = null;
// Study time is kept locally during the session and uploaded once per page open (KV write budget).
let syncedThisPage = false;
const listeners = new Set<() => void>();
const tabId = `t${Math.random().toString(36).slice(2)}`;

function newDevice(): string {
	return `d${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`.slice(0, 40);
}

function emptyLocal(): LocalUsage {
	return { days: {}, synced: {}, device: newDevice() };
}

function loadLocal(): LocalUsage {
	if (typeof localStorage === "undefined") return emptyLocal();
	try {
		const raw = JSON.parse(localStorage.getItem(LOCAL_KEY) || "");
		if (!raw || typeof raw !== "object") return emptyLocal();
		const device = typeof raw.device === "string" && /^[a-z0-9]{6,40}$/.test(raw.device) ? raw.device : newDevice();
		return { days: sanitizeDays(raw.days), synced: sanitizeDays(raw.synced), device };
	} catch {
		return emptyLocal();
	}
}

function saveLocal() {
	if (typeof localStorage === "undefined") return;
	try {
		localStorage.setItem(LOCAL_KEY, JSON.stringify(local));
	} catch {
		/* Private mode can refuse the write. The in-memory day still updates. */
	}
}

function daysWithOpenSegment(now: number): DayMap {
	if (segmentStart == null) return local.days;
	const end = audioPlaying ? now : Math.min(now, lastInput + USAGE_IDLE_MS);
	const capEnd = audioPlaying ? end : Math.min(end, segmentStart + IDLE_SLICE_MS);
	return addSecondsAcrossDays(local.days, segmentStart, capEnd);
}

function publish(now = Date.now()) {
	snapshot = { days: combineDays(remote, remoteMine, daysWithOpenSegment(now)), signedIn, synced: lastSyncOk, kind };
	for (const listener of listeners) listener();
}

function lockOwner(now = Date.now()): string | null {
	if (typeof localStorage === "undefined") return tabId;
	try {
		const raw = localStorage.getItem(LOCK_KEY);
		if (!raw) return null;
		const cur = JSON.parse(raw) as { id?: string; ts?: number };
		if (!cur.id || typeof cur.ts !== "number" || now - cur.ts > 5000) return null;
		return cur.id;
	} catch {
		return null;
	}
}

function claimLock(now = Date.now()): boolean {
	const owner = lockOwner(now);
	if (owner && owner !== tabId && !audioPlaying) return false;
	if (typeof localStorage === "undefined") return true;
	try {
		localStorage.setItem(LOCK_KEY, JSON.stringify({ id: tabId, ts: now }));
		return lockOwner(now) === tabId;
	} catch {
		return true;
	}
}

function counting(now: number): boolean {
	if (audioPlaying) return true;
	if (typeof document !== "undefined" && document.hidden) return false;
	return now - lastInput <= USAGE_IDLE_MS;
}

function commit(start: number, end: number, fromAudio: boolean) {
	const capEnd = fromAudio ? end : Math.min(end, start + IDLE_SLICE_MS);
	if (capEnd <= start) return;
	local = { ...local, days: addSecondsAcrossDays(local.days, start, capEnd) };
	saveLocal();
}

function closeSegment(now = Date.now()) {
	if (segmentStart == null) return;
	commit(segmentStart, now, audioPlaying);
	segmentStart = null;
	publish(now);
}

function tick() {
	const now = Date.now();
	const active = counting(now);
	const mine = active || segmentStart != null ? claimLock(now) : false;
	if (!mine) {
		if (segmentStart != null) closeSegment(now);
		return;
	}
	if (segmentStart == null) {
		if (active) segmentStart = now;
		publish(now);
		return;
	}
	const end = audioPlaying ? now : Math.min(now, lastInput + USAGE_IDLE_MS);
	if (now - segmentStart >= 5000 || !active) {
		commit(segmentStart, end, audioPlaying);
		segmentStart = active ? now : null;
	}
	publish(now);
}

function onPageHide() {
	if (!audioPlaying) closeSegment();
}

function credentials(): RequestCredentials {
	return kind === "account" ? "include" : "omit";
}

async function refreshAccount() {
	if (kind !== "account" || typeof fetch === "undefined") return;
	try {
		const res = await fetch("/api/me", { credentials: "include", cache: "no-store" });
		if (!res.ok) {
			signedIn = false;
			return;
		}
		const data = (await res.json()) as { user?: { id?: string } | null };
		signedIn = Boolean(data?.user?.id);
	} catch {
		signedIn = false;
	}
	publish();
}

function withDevice(endpoint: string): string {
	return `${endpoint}${endpoint.includes("?") ? "&" : "?"}device=${local.device}`;
}

function readRemote(body: { days?: unknown; mine?: unknown }) {
	remote = sanitizeDays(body.days);
	remoteMine = sanitizeDays(body.mine);
}

// A `lite` POST answers with the posted days only; fold them into what the GET returned.
function mergeRemote(body: { days?: unknown; mine?: unknown }) {
	remote = { ...remote, ...sanitizeDays(body.days) };
	remoteMine = { ...remoteMine, ...sanitizeDays(body.mine) };
}

async function doSync() {
	if (kind === "account" && !signedIn) return;
	if (typeof fetch === "undefined" || !local.device) return;
	if (syncedThisPage) return;
	const policyKey = `usage:${kind}`;
	if (!canAttemptSync(policyKey)) return;
	syncedThisPage = true;
	const endpoint = withDevice(usageEndpoint(kind));
	try {
		const got = await fetch(endpoint, { credentials: credentials(), cache: "no-store" });
		if (got.status === 401) {
			syncedThisPage = false;
			signedIn = false;
			lastSyncOk = false;
			publish();
			return;
		}
		if (!got.ok) {
			noteSyncResult(policyKey, got.status);
			lastSyncOk = false;
			publish();
			return;
		}
		readRemote((await got.json()) as { days?: unknown; mine?: unknown });
		// Upload absolute totals for days the server is behind on. The server keeps the max per device, so this is safe to repeat.
		const totals: DayMap = {};
		for (const [day, sec] of Object.entries(local.days)) if (sec > (remoteMine[day] || 0)) totals[day] = sec;
		if (Object.keys(totals).length && claimLock()) {
			const posted = await fetch(`${endpoint}&lite=1`, {
				method: "POST",
				credentials: credentials(),
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ device: local.device, totals }),
			});
			noteSyncResult(policyKey, posted.status);
			if (!posted.ok) {
				lastSyncOk = false;
				publish();
				return;
			}
			mergeRemote((await posted.json()) as { days?: unknown; mine?: unknown });
		} else noteSyncResult(policyKey, got.status);
		lastSyncOk = true;
	} catch {
		noteSyncResult(policyKey, 0);
		lastSyncOk = false;
	}
	publish();
}

function syncNow() {
	if (syncing) return syncing;
	syncing = doSync().finally(() => {
		syncing = null;
	});
	return syncing;
}

function onActivity() {
	const now = Date.now();
	lastInput = now;
	if (segmentStart == null && counting(now) && claimLock(now)) segmentStart = now;
}

function onVisibility() {
	const now = Date.now();
	if (typeof document !== "undefined" && document.hidden && !audioPlaying) closeSegment(now);
	else if (counting(now) && segmentStart == null) segmentStart = now;
}

function onStorage(event: StorageEvent) {
	if (event.key !== LOCAL_KEY) return;
	local = loadLocal();
	publish();
}

export function usageSnapshot(): UsageSnapshot {
	return snapshot;
}

export function subscribeUsage(listener: () => void): () => void {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

export function setUsageAudioPlaying(playing: boolean) {
	if (audioPlaying === playing) return;
	closeSegment();
	audioPlaying = playing;
	const now = Date.now();
	if (counting(now)) segmentStart = now;
	publish();
}

export function refreshUsageAccount(signedInNow?: boolean) {
	if (typeof signedInNow === "boolean") {
		signedIn = signedInNow;
		if (!signedIn) {
			remote = {};
			remoteMine = {};
		}
		publish();
		if (signedIn) void syncNow();
		return;
	}
	void refreshAccount().then(() => syncNow());
}

function startTimer() {
	if (typeof window === "undefined") return;
	if (timer) window.clearInterval(timer);
	timer = window.setInterval(tick, 1000);
}

function stopTimer() {
	if (typeof window === "undefined" || !timer) return;
	window.clearInterval(timer);
	timer = 0;
}

export function startUsageTracker(nextKind: UsageKind = "account"): () => void {
	started += 1;
	kind = nextKind;
	if (typeof window !== "undefined") {
		if (started === 1) {
			local = loadLocal();
			saveLocal();
			lastInput = Date.now();
			const opts = { passive: true } as AddEventListenerOptions;
			window.addEventListener("pointerdown", onActivity, opts);
			window.addEventListener("keydown", onActivity);
			document.addEventListener("scroll", onActivity, { passive: true, capture: true });
			window.addEventListener("touchstart", onActivity, opts);
			document.addEventListener("visibilitychange", onVisibility);
			window.addEventListener("pagehide", onPageHide);
			window.addEventListener("storage", onStorage);
			void refreshAccount().then(() => syncNow());
			if (counting(Date.now())) segmentStart = Date.now();
			publish();
		}
		startTimer();
	}
	return () => {
		started = Math.max(0, started - 1);
		if (started > 0 || typeof window === "undefined") return;
		closeSegment();
		stopTimer();
		window.removeEventListener("pointerdown", onActivity);
		window.removeEventListener("keydown", onActivity);
		document.removeEventListener("scroll", onActivity, true);
		window.removeEventListener("touchstart", onActivity);
		document.removeEventListener("visibilitychange", onVisibility);
		window.removeEventListener("pagehide", onPageHide);
		window.removeEventListener("storage", onStorage);
		audioPlaying = false;
		segmentStart = null;
	};
}
