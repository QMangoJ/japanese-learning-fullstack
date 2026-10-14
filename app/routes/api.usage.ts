import type { AppLoadContext } from "react-router";

import { getSessionUser, json } from "../auth/http";
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

function asRecord(value: unknown): DayRecord | null {
	if (!value || typeof value !== "object") return null;
	const devices = sanitizeDays((value as { devices?: unknown }).devices);
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
	return d && /^[a-z0-9]{6,40}$/.test(d) ? d : null;
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
	const { records, legacy, device } = await readHistory(kv, app, userId, deviceParam(request));
	return new Response(JSON.stringify(summarize(records, legacy, device)), { headers });
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
		const { records, legacy } = await readHistory(kv, app, userId, report.device);
		for (const [day, sec] of Object.entries(report.totals).slice(0, 400)) {
			if (day > latest) continue;
			const key = prefix + day;
			const current = asRecord(await kv.get(key, "json")) || records[day] || null;
			const next = mergeDayRecord(current, report.device, sec);
			if (next.devices[report.device] === current?.devices[report.device]) {
				records[day] = next;
				continue;
			}
			await kv.put(key, JSON.stringify(next), { metadata: next });
			records[day] = next;
		}
		return new Response(JSON.stringify(summarize(records, legacy, report.device)), { headers });
	}
	// Old clients still send deltas; keep them landing in the legacy blob.
	const delta = parseUsageDelta(body);
	if (!delta) return json({ error: "invalid usage payload" }, { status: 400 });
	const key = storageKey(app, userId);
	const days = applyUsageDelta(await readDays(kv, key), delta);
	await kv.put(key, JSON.stringify({ days }));
	return new Response(JSON.stringify({ days }), { headers });
}
