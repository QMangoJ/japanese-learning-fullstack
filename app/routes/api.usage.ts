import type { AppLoadContext } from "react-router";

import { getSessionUser, json } from "../auth/http";
import { isKvLimitError, kvLimitResponse } from "../auth/kv-write";
import { usageAppKey, usageKey } from "../auth/users";
import {
	applyUsageDelta,
	dayRecordTotal,
	jstDayKey,
	mergeDayRecord,
	parseUsageDelta,
	parseUsageReport,
	sanitizeDays,
	type DayMap,
	type DayRecord,
	type UsageKind,
	USAGE_DAY_CAP_SEC,
} from "../study/usage-time";

const MAX_BYTES = 32_000;
const headers = {
	"content-type": "application/json; charset=utf-8",
	"cache-control": "no-store",
};

type Args = { request: Request; context: AppLoadContext };

function publicApp(request: Request): Exclude<UsageKind, "account"> | "account" | "invalid" {
	const app = new URL(request.url).searchParams.get("app");
	if (!app) return "account";
	if (app === "shadowing" || app === "reading") return app;
	return "invalid";
}

function storageKey(app: "account" | "shadowing" | "reading", userId: string): string {
	return app === "account" ? usageKey(userId) : usageAppKey(app);
}

async function readDays(kv: KVNamespace, key: string) {
	const raw = await kv.get(key, "json");
	if (!raw || typeof raw !== "object") return {};
	return sanitizeDays((raw as { days?: unknown }).days);
}

// One KV record per Asia/Tokyo day: usage-day:<owner>:<YYYY-MM-DD>. The record (per-device absolute
// totals) is stored as value and as metadata so a single list() returns the whole history.
function dayPrefix(app: "account" | "shadowing" | "reading", userId: string): string {
	return app === "account" ? `usage-day:u:${userId}:` : `usage-day:app:${app}:`;
}

const DEVICE_ID = /^[a-z0-9]{6,40}$/;

// Device ids are not day keys, so sanitizeDays() would drop them all: that made every stored record
// look empty, so each report rewrote every day (and lost other devices' totals).
function asRecord(value: unknown): DayRecord | null {
	if (!value || typeof value !== "object") return null;
	const raw = (value as { devices?: unknown }).devices;
	const devices: Record<string, number> = {};
	if (raw && typeof raw === "object" && !Array.isArray(raw)) {
		for (const [device, sec] of Object.entries(raw as Record<string, unknown>)) {
			if (!DEVICE_ID.test(device) || typeof sec !== "number" || !Number.isInteger(sec) || sec <= 0) continue;
			devices[device] = Math.min(USAGE_DAY_CAP_SEC, sec);
		}
	}
	return { devices };
}

async function readHistory(kv: KVNamespace, app: "account" | "shadowing" | "reading", userId: string, device: string | null) {
	const prefix = dayPrefix(app, userId);
	const records: Record<string, DayRecord> = {};
	let cursor: string | undefined;
	do {
		const page = await kv.list<DayRecord>({ prefix, cursor });
		for (const key of page.keys) {
			const rec = asRecord(key.metadata);
			if (rec) records[key.name.slice(prefix.length)] = rec;
		}
		cursor = page.list_complete ? undefined : page.cursor;
	} while (cursor);
	const legacy = await readDays(kv, storageKey(app, userId));
	return { records, legacy, device };
}

// Per-isolate cache of the day list so frequent GETs (other apps poll this) don't each cost a KV list().
// Best effort only: totals may lag by up to HISTORY_CACHE_MS across isolates, writes here update it.
const HISTORY_CACHE_MS = 5 * 60_000;
const historyCache = new Map<string, { at: number; records: Record<string, DayRecord>; legacy: DayMap }>();

function rememberHistory(prefix: string, records: Record<string, DayRecord>, legacy: DayMap) {
	if (historyCache.size > 500) historyCache.clear();
	historyCache.set(prefix, { at: Date.now(), records: { ...records }, legacy });
}

function pickDays(days: DayMap, keys: string[]): DayMap {
	const out: DayMap = {};
	for (const day of keys) if (days[day]) out[day] = days[day];
	return out;
}

function summarize(records: Record<string, DayRecord>, legacy: DayMap, device: string | null) {
	const days: DayMap = {};
	const mine: DayMap = {};
	for (const day of new Set([...Object.keys(records), ...Object.keys(legacy)])) {
		const total = dayRecordTotal({ devices: records[day]?.devices || {}, legacy: legacy[day] });
		if (total > 0) days[day] = total;
		const own = device ? records[day]?.devices[device] : 0;
		if (own) mine[day] = own;
	}
	return { days, mine };
}

function deviceParam(request: Request): string | null {
	const d = new URL(request.url).searchParams.get("device");
	return d && DEVICE_ID.test(d) ? d : null;
}

export async function loader({ request, context }: Args) {
	const app = publicApp(request);
	if (app === "invalid") return json({ error: "unknown app" }, { status: 400 });
	const kv = context.cloudflare.env.MISTAKES_KV;
	let userId = "";
	if (app === "account") {
		const user = await getSessionUser(request, context.cloudflare.env);
		if (!user) return json({ error: "unauthorized" }, { status: 401 });
		userId = user.id;
	}
	const prefix = dayPrefix(app, userId);
	const cached = historyCache.get(prefix);
	let history: { records: Record<string, DayRecord>; legacy: DayMap };
	if (cached && Date.now() - cached.at < HISTORY_CACHE_MS) history = cached;
	else {
		try {
			history = await readHistory(kv, app, userId, null);
		} catch (error) {
			if (isKvLimitError(error)) return kvLimitResponse();
			throw error;
		}
		rememberHistory(prefix, history.records, history.legacy);
	}
	return new Response(JSON.stringify(summarize(history.records, history.legacy, deviceParam(request))), { headers });
}

export async function action({ request, context }: Args) {
	if (request.method !== "POST") return json({ error: "method not allowed" }, { status: 405 });
	const app = publicApp(request);
	if (app === "invalid") return json({ error: "unknown app" }, { status: 400 });

	const user = app === "account" ? await getSessionUser(request, context.cloudflare.env) : null;
	if (app === "account" && !user) return json({ error: "unauthorized" }, { status: 401 });

	const bytes = await request.arrayBuffer();
	if (bytes.byteLength > MAX_BYTES) return json({ error: "payload too large" }, { status: 413 });
	let body: unknown;
	try {
		body = JSON.parse(new TextDecoder().decode(bytes));
	} catch {
		return json({ error: "invalid json" }, { status: 400 });
	}
	const kv = context.cloudflare.env.MISTAKES_KV;
	const userId = user?.id || "";
	const report = parseUsageReport(body);
	if (report) {
		const latest = jstDayKey(Date.now() + 24 * 60 * 60 * 1000);
		const prefix = dayPrefix(app, userId);
		// `lite` clients already did a GET this page open: no list(), answer with the posted days only.
		const lite = new URL(request.url).searchParams.get("lite") === "1";
		try {
			const history = lite ? null : await readHistory(kv, app, userId, report.device);
			const records: Record<string, DayRecord> = history ? history.records : {};
			const legacy = history ? history.legacy : await readDays(kv, storageKey(app, userId));
			for (const [day, sec] of Object.entries(report.totals).slice(0, 400)) {
				if (day > latest) continue;
				const key = prefix + day;
				const current = asRecord(await kv.get(key, "json")) || records[day] || null;
				const next = mergeDayRecord(current, report.device, sec);
				records[day] = next;
				if (next.devices[report.device] === current?.devices[report.device]) continue;
				await kv.put(key, JSON.stringify(next), { metadata: next });
				const cachedHistory = historyCache.get(prefix);
				if (cachedHistory) cachedHistory.records[day] = next;
			}
			if (history) rememberHistory(prefix, records, legacy);
			const shownLegacy = lite ? pickDays(legacy, Object.keys(records)) : legacy;
			return new Response(JSON.stringify(summarize(records, shownLegacy, report.device)), { headers });
		} catch (error) {
			if (isKvLimitError(error)) return kvLimitResponse();
			throw error;
		}
	}
	// Old clients still send deltas; keep them landing in the legacy blob.
	const delta = parseUsageDelta(body);
	if (!delta) return json({ error: "invalid usage payload" }, { status: 400 });
	const key = storageKey(app, userId);
	const days = applyUsageDelta(await readDays(kv, key), delta);
	try {
		await kv.put(key, JSON.stringify({ days }));
	} catch (error) {
		if (isKvLimitError(error)) return kvLimitResponse();
		throw error;
	}
	return new Response(JSON.stringify({ days }), { headers });
}
