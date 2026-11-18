import { canAttemptSync, noteSyncResult } from "./kv-sync-policy";
import { jstDayKey } from "./usage-time";

/**
 * Feature-use counters （機能埋点）: how often Daniel opens/uses each feature,
 * aggregated as day -> "feature:action" -> count. Storage and sync deliberately
 * mirror usage-time v2 (the 2026-11-15 design): per-day KV records on the
 * server, per-device ABSOLUTE totals, idempotent re-posts, the shared
 * kv-sync-policy failure cooldowns, a keepalive flush when the page hides, and
 * localStorage as the always-available first store. Tracking itself is local
 * and synchronous: a failed or offline sync never blocks or errors a feature.
 */

export const FEATURE_COUNT_CAP = 1_000_000;
export const FEATURE_KEYS_PER_DAY = 80;
export const FEATURE_KEEP_DAYS = 400;

const DAY = /^\d{4}-\d{2}-\d{2}$/;
const PART = /^[a-z][a-z0-9-]{0,30}$/;
const DEVICE = /^[a-z0-9]{6,40}$/;
const LOCAL_KEY = "feature-usage-v1";
const ENDPOINT = "/api/feature-usage";
const POLICY_KEY = "feature-usage";

/** day -> "feature:action" -> count (this device's absolute totals, or a merged view). */
export type FeatureDayMap = Record<string, Record<string, number>>;
/** One day's server record: each device's absolute counter map. */
export type FeatureDayRecord = { devices: Record<string, Record<string, number>> };

export type FeatureUsageSnapshot = {
	days: FeatureDayMap;
	signedIn: boolean;
	synced: boolean;
	persisted: boolean;
};

export function featureKey(feature: string, action: string): string | null {
	if (!PART.test(feature) || !PART.test(action)) return null;
	return `${feature}:${action}`;
}

export function sanitizeFeatureCounts(value: unknown): Record<string, number> {
	if (!value || typeof value !== "object" || Array.isArray(value)) return {};
	const out: Record<string, number> = {};
	for (const [key, count] of Object.entries(value as Record<string, unknown>)) {
		const [feature, action] = key.split(":");
		if (!feature || !action || !PART.test(feature) || !PART.test(action)) continue;
		if (typeof count !== "number" || !Number.isInteger(count) || count <= 0) continue;
		out[key] = Math.min(FEATURE_COUNT_CAP, count);
		if (Object.keys(out).length >= FEATURE_KEYS_PER_DAY) break;
	}
	return out;
}

export function sanitizeFeatureDays(value: unknown): FeatureDayMap {
	if (!value || typeof value !== "object" || Array.isArray(value)) return {};
	const out: FeatureDayMap = {};
	for (const [day, counts] of Object.entries(value as Record<string, unknown>)) {
		if (!DAY.test(day)) continue;
		const clean = sanitizeFeatureCounts(counts);
		if (Object.keys(clean).length) out[day] = clean;
	}
	return out;
}

/** Client report: this device's absolute per-day counter totals. Idempotent, like usage reports. */
export function parseFeatureReport(body: unknown): { device: string; totals: FeatureDayMap } | null {
	if (!body || typeof body !== "object" || Array.isArray(body)) return null;
	const { device, totals } = body as { device?: unknown; totals?: unknown };
	if (typeof device !== "string" || !DEVICE.test(device)) return null;
	if (!totals || typeof totals !== "object" || Array.isArray(totals)) return null;
	return { device, totals: sanitizeFeatureDays(totals) };
}

export function asFeatureRecord(value: unknown): FeatureDayRecord | null {
	if (!value || typeof value !== "object") return null;
	const raw = (value as { devices?: unknown }).devices;
	if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
	const devices: Record<string, Record<string, number>> = {};
	for (const [device, counts] of Object.entries(raw as Record<string, unknown>)) {
		if (!DEVICE.test(device)) continue;
		const clean = sanitizeFeatureCounts(counts);
		if (Object.keys(clean).length) devices[device] = clean;
	}
	return { devices };
}

/** Replace one device's absolute totals in a day record (never additive: re-posts stay idempotent). */
export function mergeFeatureRecord(rec: FeatureDayRecord | null, device: string, counts: Record<string, number>): FeatureDayRecord {
	const devices = { ...(rec?.devices || {}) };
	const clean = sanitizeFeatureCounts(counts);
	if (Object.keys(clean).length) devices[device] = clean;
	else delete devices[device];
	return { devices };
}

/** Sum every device's counters; `mine` is the requesting device's own bucket. */
export function summarizeFeatureRecords(
	records: Record<string, FeatureDayRecord>,
	device: string | null,
): { days: FeatureDayMap; mine: FeatureDayMap } {
	const days: FeatureDayMap = {};
	const mine: FeatureDayMap = {};
	for (const [day, rec] of Object.entries(records)) {
		const total: Record<string, number> = {};
		for (const [dev, counts] of Object.entries(rec.devices || {})) {
			for (const [key, count] of Object.entries(counts)) {
				total[key] = Math.min(FEATURE_COUNT_CAP, (total[key] || 0) + count);
			}
			if (device && dev === device) mine[day] = { ...counts };
		}
		if (Object.keys(total).length) days[day] = total;
	}
	return { days, mine };
}

function shiftDay(day: string, days: number): string {
	const [year, month, date] = day.split("-").map(Number);
	return new Date(Date.UTC(year, month - 1, date + days)).toISOString().slice(0, 10);
}

/** Drop days older than the retention window (they live on the server already). */
export function pruneFeatureDays(days: FeatureDayMap, now = Date.now()): FeatureDayMap {
	const cutoff = shiftDay(jstDayKey(now), -(FEATURE_KEEP_DAYS - 1));
	const out: FeatureDayMap = {};
	for (const [day, counts] of Object.entries(days)) if (day >= cutoff) out[day] = counts;
	return out;
}

/** Days whose local totals differ from what the server last acknowledged. Whole days are sent (absolute). */
export function pendingFeatureTotals(local: FeatureDayMap, posted: FeatureDayMap): FeatureDayMap {
	const out: FeatureDayMap = {};
	for (const [day, counts] of Object.entries(local)) {
		const ack = posted[day] || {};
		const differs = Object.keys(counts).some((key) => (counts[key] || 0) !== (ack[key] || 0));
		if (differs) out[day] = { ...counts };
	}
	return out;
}

/** Display merge: server total, minus this device's uploaded share, plus this device's live totals. */
export function combineFeatureDays(remote: FeatureDayMap, mine: FeatureDayMap, local: FeatureDayMap): FeatureDayMap {
	const out: FeatureDayMap = {};
	for (const day of new Set([...Object.keys(remote), ...Object.keys(local)])) {
		const merged: Record<string, number> = {};
		const keys = new Set([...Object.keys(remote[day] || {}), ...Object.keys(local[day] || {})]);
		for (const key of keys) {
			const server = remote[day]?.[key] || 0;
			const own = mine[day]?.[key] || 0;
			const live = local[day]?.[key] || 0;
			const total = Math.max(server, Math.max(0, server - own) + live);
			if (total > 0) merged[key] = Math.min(FEATURE_COUNT_CAP, total);
		}
		if (Object.keys(merged).length) out[day] = merged;
	}
	return out;
}

// ---- client store -----------------------------------------------------------

type LocalFeatureUsage = { days: FeatureDayMap; posted: FeatureDayMap; device: string };

const EMPTY_SNAPSHOT: FeatureUsageSnapshot = { days: {}, signedIn: false, synced: false, persisted: true };

let local: LocalFeatureUsage = { days: {}, posted: {}, device: "" };
let remote: FeatureDayMap = {};
let remoteMine: FeatureDayMap = {};
let signedIn = false;
let accountChecked = false;
let lastSyncOk = false;
let persistOk = true;
let loaded = false;
let started = 0;
let syncing: Promise<void> | null = null;
let snapshot: FeatureUsageSnapshot = EMPTY_SNAPSHOT;
const listeners = new Set<() => void>();

function newDevice(): string {
	return `d${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`.slice(0, 40);
}

function emptyLocal(): LocalFeatureUsage {
	return { days: {}, posted: {}, device: newDevice() };
}

function loadLocal(): LocalFeatureUsage {
	if (typeof localStorage === "undefined") return emptyLocal();
	try {
		const raw = JSON.parse(localStorage.getItem(LOCAL_KEY) || "");
		if (!raw || typeof raw !== "object") return emptyLocal();
		const device = typeof raw.device === "string" && DEVICE.test(raw.device) ? raw.device : newDevice();
		return { days: pruneFeatureDays(sanitizeFeatureDays(raw.days)), posted: sanitizeFeatureDays(raw.posted), device };
	} catch {
		return emptyLocal();
	}
}

function saveLocal(): boolean {
	if (typeof localStorage === "undefined") return persistOk;
	try {
		localStorage.setItem(LOCAL_KEY, JSON.stringify(local));
		persistOk = true;
	} catch {
		/* Private mode / full quota: counts live in memory and still flush while online. */
		persistOk = false;
	}
	return persistOk;
}

function ensureLoaded() {
	if (loaded) return;
	loaded = true;
	local = loadLocal();
	saveLocal();
	publish();
}

function publish() {
	snapshot = { days: combineFeatureDays(remote, remoteMine, local.days), signedIn, synced: lastSyncOk, persisted: persistOk };
	for (const listener of listeners) listener();
}

export function featureUsageSnapshot(): FeatureUsageSnapshot {
	return snapshot;
}

export function subscribeFeatureUsage(listener: () => void): () => void {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

/** Count one feature interaction. Local and synchronous: it can never throw into the feature itself. */
export function trackFeature(feature: string, action: string) {
	try {
		const key = featureKey(feature, action);
		if (!key || typeof window === "undefined") return;
		ensureLoaded();
		const day = jstDayKey(Date.now());
		const counts = { ...(local.days[day] || {}) };
		counts[key] = Math.min(FEATURE_COUNT_CAP, (counts[key] || 0) + 1);
		local = { ...local, days: pruneFeatureDays({ ...local.days, [day]: counts }) };
		saveLocal();
		publish();
	} catch {
		/* Tracking must never break the feature being used. */
	}
}

async function refreshAccount() {
	if (typeof fetch === "undefined") return;
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
	accountChecked = true;
}

function readRemote(body: { days?: unknown; mine?: unknown }) {
	remote = sanitizeFeatureDays(body.days);
	remoteMine = sanitizeFeatureDays(body.mine);
}

// A POST answers with the posted days only; per-key values only ever grow on
// the server (other devices add, this device's bucket is absolute), so a max
// merge can never make displayed totals regress within a session.
function mergeRemote(body: { days?: unknown; mine?: unknown }) {
	const days = sanitizeFeatureDays(body.days);
	const mine = sanitizeFeatureDays(body.mine);
	for (const [day, counts] of Object.entries(days)) {
		const merged = { ...(remote[day] || {}) };
		for (const [key, count] of Object.entries(counts)) merged[key] = Math.max(merged[key] || 0, count);
		remote[day] = merged;
	}
	for (const [day, counts] of Object.entries(mine)) {
		const merged = { ...(remoteMine[day] || {}) };
		for (const [key, count] of Object.entries(counts)) merged[key] = Math.max(merged[key] || 0, count);
		remoteMine[day] = merged;
	}
}

async function doSync(force: boolean) {
	ensureLoaded();
	if (typeof fetch === "undefined" || !local.device) return;
	if (!accountChecked) await refreshAccount();
	if (!signedIn) {
		publish();
		return;
	}
	if (!canAttemptSync(POLICY_KEY)) return;
	const pending = pendingFeatureTotals(local.days, local.posted);
	if (!Object.keys(pending).length && !force) return;
	try {
		if (Object.keys(pending).length) {
			const posted = await fetch(`${ENDPOINT}?device=${local.device}`, {
				method: "POST",
				credentials: "include",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ device: local.device, totals: pending }),
			});
			noteSyncResult(POLICY_KEY, posted.status);
			if (posted.status === 401) {
				signedIn = false;
				lastSyncOk = false;
				publish();
				return;
			}
			if (!posted.ok) {
				lastSyncOk = false;
				publish();
				return;
			}
			const ack = { ...local.posted };
			for (const [day, counts] of Object.entries(pending)) ack[day] = { ...counts };
			local = { ...local, posted: ack };
			saveLocal();
			mergeRemote((await posted.json()) as { days?: unknown; mine?: unknown });
		}
		if (force) {
			const got = await fetch(`${ENDPOINT}?device=${local.device}`, { credentials: "include", cache: "no-store" });
			if (got.ok) readRemote((await got.json()) as { days?: unknown; mine?: unknown });
			else noteSyncResult(POLICY_KEY, got.status);
		}
		lastSyncOk = true;
	} catch {
		noteSyncResult(POLICY_KEY, 0);
		lastSyncOk = false;
	}
	publish();
}

export function syncFeatureUsage(force = false): Promise<void> {
	if (syncing) return syncing;
	syncing = doSync(force).finally(() => {
		syncing = null;
	});
	return syncing;
}

/**
 * Last-chance upload when the page hides: POST pending absolute totals with
 * keepalive, exactly like the usage-time flush. The server merge replaces this
 * device's bucket, so racing a normal sync is harmless.
 */
function flushFeatureUsage() {
	if (typeof fetch === "undefined") return;
	ensureLoaded();
	if (!signedIn || !local.device) return;
	const pending = pendingFeatureTotals(local.days, local.posted);
	if (!Object.keys(pending).length) return;
	try {
		void fetch(`${ENDPOINT}?device=${local.device}`, {
			method: "POST",
			credentials: "include",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ device: local.device, totals: pending }),
			keepalive: true,
		})
			.then(async (res) => {
				noteSyncResult(POLICY_KEY, res.status);
				if (!res.ok) return;
				const ack = { ...local.posted };
				for (const [day, counts] of Object.entries(pending)) ack[day] = { ...counts };
				local = { ...local, posted: ack };
				saveLocal();
				mergeRemote((await res.json()) as { days?: unknown; mine?: unknown });
				lastSyncOk = true;
				publish();
			})
			.catch(() => noteSyncResult(POLICY_KEY, 0));
	} catch {
		/* The page is going away; the next successful sync reconciles from local state. */
	}
}

function onVisibility() {
	if (typeof document === "undefined") return;
	if (document.hidden) {
		flushFeatureUsage();
		return;
	}
	// Returning to the app: push anything counted while the last flush could
	// not run. doSync gates itself on sign-in state and the failure cooldown.
	if (Object.keys(pendingFeatureTotals(local.days, local.posted)).length) void syncFeatureUsage();
}

function onStorage(event: StorageEvent) {
	if (event.key !== LOCAL_KEY) return;
	const posted = local.posted;
	local = loadLocal();
	local = { ...local, posted };
	publish();
}

export function startFeatureUsage(): () => void {
	started += 1;
	if (typeof window !== "undefined" && started === 1) {
		ensureLoaded();
		void refreshAccount().then(() => publish());
		document.addEventListener("visibilitychange", onVisibility);
		window.addEventListener("pagehide", flushFeatureUsage);
		window.addEventListener("storage", onStorage);
	}
	return () => {
		started = Math.max(0, started - 1);
		if (started > 0 || typeof window === "undefined") return;
		document.removeEventListener("visibilitychange", onVisibility);
		window.removeEventListener("pagehide", flushFeatureUsage);
		window.removeEventListener("storage", onStorage);
	};
}
