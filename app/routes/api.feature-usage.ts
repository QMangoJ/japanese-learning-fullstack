import type { AppLoadContext } from "react-router";

import { getSessionUser, json } from "../auth/http";
import { isKvLimitError, kvLimitResponse } from "../auth/kv-write";
import {
	asFeatureRecord,
	mergeFeatureRecord,
	parseFeatureReport,
	summarizeFeatureRecords,
	type FeatureDayRecord,
} from "../study/feature-usage";
import { jstDayKey } from "../study/usage-time";

/**
 * Feature-use counters, stored exactly like usage-time v2: one KV record per
 * Asia/Tokyo day under `feature-day:u:<userId>:<YYYY-MM-DD>`, each holding
 * per-device absolute counter maps. Reads sum the devices; a write replaces
 * only the posting device's bucket, so retries and multi-device use can
 * neither double-count nor lose another device's totals. Values only (no KV
 * metadata): a day's counter map can outgrow the metadata size limit.
 */

const MAX_BYTES = 32_000;
const RETENTION_DAYS = 400;
const headers = {
	"content-type": "application/json; charset=utf-8",
	"cache-control": "no-store",
};

type Args = { request: Request; context: AppLoadContext };

const DEVICE_ID = /^[a-z0-9]{6,40}$/;

function dayPrefix(userId: string): string {
	return `feature-day:u:${userId}:`;
}

function deviceParam(request: Request): string | null {
	const d = new URL(request.url).searchParams.get("device");
	return d && DEVICE_ID.test(d) ? d : null;
}

function shiftDay(day: string, days: number): string {
	const [year, month, date] = day.split("-").map(Number);
	return new Date(Date.UTC(year, month - 1, date + days)).toISOString().slice(0, 10);
}

async function readRecords(kv: KVNamespace, userId: string): Promise<Record<string, FeatureDayRecord>> {
	const prefix = dayPrefix(userId);
	const cutoff = shiftDay(jstDayKey(Date.now()), -(RETENTION_DAYS - 1));
	const records: Record<string, FeatureDayRecord> = {};
	let cursor: string | undefined;
	do {
		const page = await kv.list({ prefix, cursor });
		for (const key of page.keys) {
			const day = key.name.slice(prefix.length);
			if (day < cutoff) continue;
			const rec = asFeatureRecord(await kv.get(key.name, "json"));
			if (rec && Object.keys(rec.devices).length) records[day] = rec;
		}
		cursor = page.list_complete ? undefined : page.cursor;
	} while (cursor);
	return records;
}

export async function loader({ request, context }: Args) {
	const user = await getSessionUser(request, context.cloudflare.env);
	if (!user) return json({ error: "unauthorized" }, { status: 401 });
	const kv = context.cloudflare.env.MISTAKES_KV;
	try {
		const records = await readRecords(kv, user.id);
		return new Response(JSON.stringify(summarizeFeatureRecords(records, deviceParam(request))), { headers });
	} catch (error) {
		if (isKvLimitError(error)) return kvLimitResponse();
		throw error;
	}
}

export async function action({ request, context }: Args) {
	if (request.method !== "POST") return json({ error: "method not allowed" }, { status: 405 });
	const user = await getSessionUser(request, context.cloudflare.env);
	if (!user) return json({ error: "unauthorized" }, { status: 401 });

	const bytes = await request.arrayBuffer();
	if (bytes.byteLength > MAX_BYTES) return json({ error: "payload too large" }, { status: 413 });
	let body: unknown;
	try {
		body = JSON.parse(new TextDecoder().decode(bytes));
	} catch {
		return json({ error: "invalid json" }, { status: 400 });
	}
	const report = parseFeatureReport(body);
	if (!report) return json({ error: "invalid feature usage payload" }, { status: 400 });

	const kv = context.cloudflare.env.MISTAKES_KV;
	const prefix = dayPrefix(user.id);
	const latest = shiftDay(jstDayKey(Date.now()), 1);
	const touched: Record<string, FeatureDayRecord> = {};
	try {
		for (const [day, counts] of Object.entries(report.totals).slice(0, 31)) {
			if (day > latest) continue;
			const key = prefix + day;
			const current = asFeatureRecord(await kv.get(key, "json"));
			const next = mergeFeatureRecord(current, report.device, counts);
			touched[day] = next;
			if (JSON.stringify(next.devices[report.device] || {}) === JSON.stringify(current?.devices[report.device] || {})) continue;
			await kv.put(key, JSON.stringify(next));
		}
	} catch (error) {
		if (isKvLimitError(error)) return kvLimitResponse();
		throw error;
	}
	// Answer with the posted days only (the client folds them in with max);
	// the stats page follows with a GET when it needs the full history.
	return new Response(JSON.stringify(summarizeFeatureRecords(touched, report.device)), { headers });
}
