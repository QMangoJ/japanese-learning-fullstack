import { describe, expect, it } from "vitest";

import { applySecurityHeaders } from "../../workers/security-headers";
import { isUsageRequest, withUsageCors } from "../../workers/usage-cors";
import { action as usageAction, loader as usageLoader } from "../../app/routes/api.usage";
import { usageAppKey, usageKey } from "../../app/auth/users";
import {
	USAGE_DAY_CAP_SEC,
	addSecondsAcrossDays,
	applyUsageDelta,
	displayDays,
	jstDayKey,
	parseUsageDelta,
	pendingDelta,
} from "../../app/study/usage-time";
import { combineDays, dayRecordTotal, mergeDayRecord, parseUsageReport } from "../../app/study/usage-time";
import { authedRequest, memoryKv, routeContext, seedUser, testEnv } from "./auth-test-utils";

describe("usage time math", () => {
	it("splits a segment on the JST midnight and caps a day at 16 hours", () => {
		const start = Date.parse("2026-10-13T14:59:30.000Z");
		const end = Date.parse("2026-10-13T15:00:30.000Z");
		expect(jstDayKey(start)).toBe("2026-10-13");
		expect(jstDayKey(end)).toBe("2026-10-14");
		expect(addSecondsAcrossDays({}, start, end)).toEqual({ "2026-10-13": 30, "2026-10-14": 30 });
		const dayStart = Date.parse("2026-10-13T15:00:00.000Z");
		const capped = addSecondsAcrossDays({}, dayStart, dayStart + 20 * 60 * 60 * 1000);
		expect(capped).toEqual({ "2026-10-14": USAGE_DAY_CAP_SEC });
		const spilled = addSecondsAcrossDays({}, dayStart, dayStart + 30 * 60 * 60 * 1000);
		expect(spilled["2026-10-14"]).toBe(USAGE_DAY_CAP_SEC);
		expect(spilled["2026-10-15"]).toBe(6 * 60 * 60);
	});

	it("shows the server total plus seconds this device has not uploaded", () => {
		expect(pendingDelta({ "2026-10-14": 150 }, { "2026-10-14": 80 }, { "2026-10-14": 100 })).toEqual({
			"2026-10-14": 70,
		});
		expect(displayDays({ "2026-10-14": 100 }, { "2026-10-14": 150 }, { "2026-10-14": 80 })).toEqual({
			"2026-10-14": 170,
		});
		expect(displayDays({ "2026-10-14": USAGE_DAY_CAP_SEC }, { "2026-10-14": 50 }, {})).toEqual({
			"2026-10-14": USAGE_DAY_CAP_SEC,
		});
	});

	it("adds deltas permanently and drops a future day", () => {
		const now = Date.parse("2026-10-14T03:00:00.000Z");
		expect(parseUsageDelta({ days: { "2026-10-14": 20, bad: 5, "2026-10-13": 0 } })).toEqual({ "2026-10-14": 20 });
		expect(parseUsageDelta([])).toBeNull();
		const stored = applyUsageDelta({ "2026-10-14": 10 }, { "2026-10-14": 15, "2099-01-01": 30 }, now);
		expect(stored).toEqual({ "2026-10-14": 25 });
		expect(applyUsageDelta({ "2026-10-14": USAGE_DAY_CAP_SEC - 10 }, { "2026-10-14": 50 }, now)).toEqual({
			"2026-10-14": USAGE_DAY_CAP_SEC,
		});
	});
});

describe("/api/usage", () => {
	it("keeps a signed-in user's days and a public app's days apart", async () => {
		const kv = memoryKv();
		seedUser(kv, { id: "g_1" });
		const ctx = routeContext(testEnv(kv));
		const guest = await usageLoader({ request: new Request("http://localhost/api/usage"), context: ctx });
		expect(guest.status).toBe(401);

		const post = await usageAction({
			request: await authedRequest("http://localhost/api/usage", "g_1", {
				method: "POST",
				body: JSON.stringify({ days: { "2026-10-14": 40 } }),
			}),
			context: ctx,
		});
		expect(await post.json()).toEqual({ days: { "2026-10-14": 40 } });
		const again = await usageAction({
			request: await authedRequest("http://localhost/api/usage", "g_1", {
				method: "POST",
				body: JSON.stringify({ days: { "2026-10-14": 25 } }),
			}),
			context: ctx,
		});
		expect(await again.json()).toEqual({ days: { "2026-10-14": 65 } });
		expect(JSON.parse(kv.map.get(usageKey("g_1")) || "{}").days).toEqual({ "2026-10-14": 65 });

		const shadow = await usageAction({
			request: new Request("http://localhost/api/usage?app=shadowing", {
				method: "POST",
				body: JSON.stringify({ days: { "2026-10-14": 15 } }),
			}),
			context: ctx,
		});
		expect(shadow.status).toBe(200);
		expect(JSON.parse(kv.map.get(usageAppKey("shadowing")) || "{}").days).toEqual({ "2026-10-14": 15 });
		const read = await usageLoader({
			request: new Request("http://localhost/api/usage?app=reading"),
			context: ctx,
		});
		expect(await read.json()).toEqual({ days: {}, mine: {} });
		expect(JSON.parse(kv.map.get(usageKey("g_1")) || "{}").days["2026-10-14"]).toBe(65);
	});

	it("rejects an unknown app and a bad payload", async () => {
		const ctx = routeContext(testEnv(memoryKv()));
		const unknown = await usageLoader({
			request: new Request("http://localhost/api/usage?app=other"),
			context: ctx,
		});
		expect(unknown.status).toBe(400);
		const bad = await usageAction({
			request: new Request("http://localhost/api/usage?app=reading", { method: "POST", body: "{" }),
			context: ctx,
		});
		expect(bad.status).toBe(400);
	});
});

describe("usage CORS", () => {
	it("lets shadowing and reading read the usage response", () => {
		const secured = applySecurityHeaders(new Response(JSON.stringify({ days: {} }), { status: 200 }));
		const opened = withUsageCors(secured);
		expect(opened.headers.get("Access-Control-Allow-Origin")).toBe("*");
		expect(opened.headers.get("Cross-Origin-Resource-Policy")).toBe("cross-origin");
		expect(isUsageRequest(new Request("https://example.com/api/usage?app=shadowing"))).toBe(true);
		expect(isUsageRequest(new Request("https://example.com/api/mastery"))).toBe(false);
	});
});

describe("per-day records", () => {
	it("stores one idempotent record per day and keeps legacy days", async () => {
		const kv = memoryKv({ [usageKey("g_2")]: JSON.stringify({ days: { "2026-10-13": 500 } }) });
		seedUser(kv, { id: "g_2" });
		const ctx = routeContext(testEnv(kv));
		const send = (totals: Record<string, number>) => authedRequest("http://localhost/api/usage?device=devaaaa", "g_2", {
			method: "POST",
			body: JSON.stringify({ device: "devaaaa", totals }),
		});
		await usageAction({ request: await send({ "2026-10-14": 100 }), context: ctx });
		const res = await usageAction({ request: await send({ "2026-10-14": 100, "2026-10-15": 30 }), context: ctx });
		expect(await res.json()).toEqual({ days: { "2026-10-13": 500, "2026-10-14": 100, "2026-10-15": 30 }, mine: { "2026-10-14": 100, "2026-10-15": 30 } });
		expect(kv.map.has("usage-day:u:g_2:2026-10-15")).toBe(true);
	});
	it("lite reports skip list() and unchanged writes, answering with the posted days only", async () => {
		const kv = memoryKv({ [usageKey("g_3")]: JSON.stringify({ days: { "2026-10-13": 500 } }) });
		seedUser(kv, { id: "g_3" });
		let lists = 0;
		let writes = 0;
		const { list, put } = kv;
		kv.list = async (...args: Parameters<typeof list>) => {
			lists += 1;
			return list(...args);
		};
		kv.put = async (...args: Parameters<typeof put>) => {
			if (args[0].startsWith("usage-day:")) writes += 1;
			return put(...args);
		};
		const ctx = routeContext(testEnv(kv));
		const send = (totals: Record<string, number>) => authedRequest("http://localhost/api/usage?device=devbbbb&lite=1", "g_3", {
			method: "POST",
			body: JSON.stringify({ device: "devbbbb", totals }),
		});
		const res = await usageAction({ request: await send({ "2026-10-14": 100 }), context: ctx });
		expect(await res.json()).toEqual({ days: { "2026-10-14": 100 }, mine: { "2026-10-14": 100 } });
		await usageAction({ request: await send({ "2026-10-14": 100 }), context: ctx });
		expect(lists).toBe(0);
		expect(writes).toBe(1);
		const other = await usageAction({
			request: await authedRequest("http://localhost/api/usage?device=devcccc&lite=1", "g_3", {
				method: "POST",
				body: JSON.stringify({ device: "devcccc", totals: { "2026-10-14": 50 } }),
			}),
			context: ctx,
		});
		expect(await other.json()).toEqual({ days: { "2026-10-14": 150 }, mine: { "2026-10-14": 50 } });
	});
	it("keeps max per device, sums devices, legacy is a floor", () => {
		let rec = mergeDayRecord(null, "dev1abc", 100);
		rec = mergeDayRecord(rec, "dev1abc", 40);
		rec = mergeDayRecord(rec, "dev2abc", 50);
		expect(rec.devices).toEqual({ dev1abc: 100, dev2abc: 50 });
		expect(dayRecordTotal(rec)).toBe(150);
		expect(dayRecordTotal({ ...rec, legacy: 300 })).toBe(300);
	});
	it("combines remote with live local without double counting", () => {
		expect(combineDays({ "2026-10-14": 150 }, { "2026-10-14": 100 }, { "2026-10-14": 120, "2026-10-15": 5 })).toEqual({ "2026-10-14": 170, "2026-10-15": 5 });
		expect(parseUsageReport({ device: "BAD", totals: {} })).toBeNull();
	});
});
