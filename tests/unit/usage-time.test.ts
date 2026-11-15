import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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

describe("sync failure cooldown", () => {
	it("retries a network error after a short floor but keeps server rejections on the long cooldown", async () => {
		const { canAttemptSync, noteSyncResult, resetSyncPolicyForTests } = await import("../../app/study/kv-sync-policy");
		const t0 = Date.parse("2026-11-15T03:00:00.000Z");
		resetSyncPolicyForTests();
		noteSyncResult("usage:account", 0, t0); // network error: never reached the server
		expect(canAttemptSync("usage:account", t0 + 30_000)).toBe(false);
		expect(canAttemptSync("usage:account", t0 + 61_000)).toBe(true);
		resetSyncPolicyForTests();
		noteSyncResult("usage:account", 500, t0); // server rejection: may have cost KV quota
		expect(canAttemptSync("usage:account", t0 + 30 * 60_000)).toBe(false);
		expect(canAttemptSync("usage:account", t0 + 61 * 60_000)).toBe(true);
		noteSyncResult("usage:account", 200, t0 + 62 * 60_000); // a success clears the failure
		expect(canAttemptSync("usage:account", t0 + 62 * 60_000)).toBe(true);
		resetSyncPolicyForTests();
		// A caller that notes the HTTP status and then notes a network error for the same
		// attempt (throw-into-catch bookkeeping) must not downgrade the server rejection.
		noteSyncResult("usage:account", 503, t0);
		noteSyncResult("usage:account", 0, t0 + 100);
		expect(canAttemptSync("usage:account", t0 + 30 * 60_000)).toBe(false);
		expect(canAttemptSync("usage:account", t0 + 61 * 60_000)).toBe(true);
		resetSyncPolicyForTests();
	});
});

describe("usage tracker runtime", () => {
	let stop: (() => void) | null = null;

	beforeEach(() => {
		vi.useFakeTimers();
		localStorage.clear();
	});

	afterEach(() => {
		stop?.();
		stop = null;
		vi.unstubAllGlobals();
		vi.useRealTimers();
		vi.resetModules();
		localStorage.clear();
	});

	function jsonResponse(body: unknown, status = 200) {
		return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
	}

	function sumDays(days: Record<string, number>): number {
		return Object.values(days).reduce((a, b) => a + b, 0);
	}

	it("accrues the whole session while the user keeps scrolling (the reported afternoon scenario)", async () => {
		// Signed out, so sync is a no-op and only the counting core is exercised.
		vi.stubGlobal("fetch", vi.fn(async () => jsonResponse({ error: "unauthorized" }, 401)));
		const mod = await import("../../app/study/usage-time");
		stop = mod.startUsageTracker("account");
		// Two hours of studying: the 1s tick runs throughout, the user scrolls every ~4s.
		for (let s = 0; s < 2 * 60 * 60; s++) {
			vi.advanceTimersByTime(1000);
			if (s % 4 === 0) document.dispatchEvent(new Event("scroll"));
		}
		expect(sumDays(mod.usageSnapshot().days)).toBeGreaterThanOrEqual(7000);
		const stored = JSON.parse(localStorage.getItem("usage-time-v1") || "{}") as { days?: Record<string, number> };
		expect(sumDays(stored.days || {})).toBeGreaterThanOrEqual(7000);
	});

	it("keeps server traffic to page show/hide: nothing uploads while the session runs, hide flushes, foreground return syncs", async () => {
		const posts: { keepalive: boolean; totals: Record<string, number> }[] = [];
		vi.stubGlobal("fetch", vi.fn(async (url: string, init?: RequestInit & { keepalive?: boolean }) => {
			if (url.includes("/api/me")) return jsonResponse({ user: { id: "g_test" } });
			if (init?.method === "POST") {
				const body = JSON.parse(String(init.body)) as { totals: Record<string, number> };
				posts.push({ keepalive: Boolean(init.keepalive), totals: body.totals });
				return jsonResponse({ days: body.totals, mine: body.totals });
			}
			return jsonResponse({ days: {}, mine: {} });
		}));
		const mod = await import("../../app/study/usage-time");
		stop = mod.startUsageTracker("account");
		await vi.advanceTimersByTimeAsync(1000); // sign-in + initial (page-open) sync settle
		// Six-plus minutes of studying with regular scrolling: local accrual and local
		// persistence keep up, but the server hears nothing — uploads ride visibility
		// transitions only, to stay inside the KV write budget.
		for (let s = 0; s < 390; s++) {
			await vi.advanceTimersByTimeAsync(1000);
			if (s % 4 === 0) document.dispatchEvent(new Event("scroll"));
		}
		expect(posts.length).toBe(0);
		expect(sumDays(mod.usageSnapshot().days)).toBeGreaterThanOrEqual(300);
		const stored = JSON.parse(localStorage.getItem("usage-time-v1") || "{}") as { days?: Record<string, number> };
		expect(sumDays(stored.days || {})).toBeGreaterThanOrEqual(300);
		// Hiding the page flushes the accrued totals with keepalive.
		window.dispatchEvent(new Event("pagehide"));
		await vi.advanceTimersByTimeAsync(100);
		expect(posts.length).toBe(1);
		expect(posts[0].keepalive).toBe(true);
		expect(sumDays(posts[0].totals)).toBeGreaterThanOrEqual(300);
		expect(mod.usageSnapshot().synced).toBe(true);
		// More studying, then returning to the foreground syncs the new totals.
		for (let s = 0; s < 130; s++) {
			await vi.advanceTimersByTimeAsync(1000);
			if (s % 4 === 0) document.dispatchEvent(new Event("scroll"));
		}
		expect(posts.length).toBe(1);
		document.dispatchEvent(new Event("visibilitychange"));
		await vi.advanceTimersByTimeAsync(1000);
		expect(posts.length).toBe(2);
		expect(sumDays(posts[1].totals)).toBeGreaterThanOrEqual(450);
	});

	it("heals a transient network failure without a page reopen and merges the server days", async () => {
		let usageGets = 0;
		vi.stubGlobal("fetch", vi.fn(async (url: string, init?: RequestInit) => {
			if (url.includes("/api/me")) return jsonResponse({ user: { id: "g_test" } });
			if (init?.method === "POST") {
				const body = JSON.parse(String(init.body)) as { totals: Record<string, number> };
				return jsonResponse({ days: body.totals, mine: body.totals });
			}
			usageGets += 1;
			if (usageGets === 1) throw new Error("network down"); // the page-open sync hits a radio blip
			const mod0 = await import("../../app/study/usage-time");
			return jsonResponse({ days: { [mod0.jstDayKey(Date.now())]: 500 }, mine: {} });
		}));
		const mod = await import("../../app/study/usage-time");
		stop = mod.startUsageTracker("account");
		await vi.advanceTimersByTimeAsync(1000);
		expect(mod.usageSnapshot().synced).toBe(false);
		// A minute later the user is still studying and the app comes back to the foreground:
		// the session must re-sync on its own (network errors retry after the short floor).
		for (let s = 0; s < 65; s++) {
			await vi.advanceTimersByTimeAsync(1000);
			if (s % 4 === 0) document.dispatchEvent(new Event("scroll"));
		}
		document.dispatchEvent(new Event("visibilitychange"));
		await vi.advanceTimersByTimeAsync(1000);
		expect(mod.usageSnapshot().synced).toBe(true);
		expect(sumDays(mod.usageSnapshot().days)).toBeGreaterThanOrEqual(500);
	});

	it("flushes pending totals with keepalive when the page is hidden/unloaded", async () => {
		const posts: { keepalive: boolean; totals: Record<string, number> }[] = [];
		vi.stubGlobal("fetch", vi.fn(async (url: string, init?: RequestInit & { keepalive?: boolean }) => {
			if (url.includes("/api/me")) return jsonResponse({ user: { id: "g_test" } });
			if (init?.method === "POST") {
				const body = JSON.parse(String(init.body)) as { totals: Record<string, number> };
				posts.push({ keepalive: Boolean(init.keepalive), totals: body.totals });
				return jsonResponse({ days: body.totals, mine: body.totals });
			}
			return jsonResponse({ days: {}, mine: {} });
		}));
		const mod = await import("../../app/study/usage-time");
		stop = mod.startUsageTracker("account");
		await vi.advanceTimersByTimeAsync(1000);
		for (let s = 0; s < 45; s++) {
			await vi.advanceTimersByTimeAsync(1000);
			if (s % 4 === 0) document.dispatchEvent(new Event("scroll"));
		}
		const before = posts.length;
		window.dispatchEvent(new Event("pagehide"));
		await vi.advanceTimersByTimeAsync(100);
		const flushed = posts.slice(before);
		expect(flushed.length).toBeGreaterThanOrEqual(1);
		expect(flushed[0].keepalive).toBe(true);
		expect(sumDays(flushed[0].totals)).toBeGreaterThanOrEqual(30);
	});
});
