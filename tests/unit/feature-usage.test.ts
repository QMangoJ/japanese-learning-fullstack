import { describe, expect, it } from "vitest";

import { action as featureAction, loader as featureLoader } from "../../app/routes/api.feature-usage";
import {
	combineFeatureDays,
	mergeFeatureRecord,
	parseFeatureReport,
	pendingFeatureTotals,
	sanitizeFeatureDays,
	summarizeFeatureRecords,
} from "../../app/study/feature-usage";
import { authedRequest, memoryKv, routeContext, seedUser, testEnv } from "./auth-test-utils";

describe("feature usage math", () => {
	it("sanitizes counter maps and drops malformed keys, days and counts", () => {
		expect(
			sanitizeFeatureDays({
				"2026-11-18": { "it-listening:play": 3, "vocab-queue:grade": 12, bad: 1, "x:": 2, "search:query": 0, "a:b": 1.5 },
				"18-11-2026": { "search:query": 1 },
			}),
		).toEqual({ "2026-11-18": { "it-listening:play": 3, "vocab-queue:grade": 12 } });
	});

	it("parses only well-formed device reports", () => {
		expect(parseFeatureReport({ device: "dev123", totals: { "2026-11-18": { "search:open": 1 } } })).toEqual({
			device: "dev123",
			totals: { "2026-11-18": { "search:open": 1 } },
		});
		expect(parseFeatureReport({ device: "x", totals: {} })).toBeNull();
		expect(parseFeatureReport({ totals: {} })).toBeNull();
		expect(parseFeatureReport([])).toBeNull();
	});

	it("replaces a device's absolute bucket instead of adding to it", () => {
		const first = mergeFeatureRecord(null, "dev123", { "search:open": 2 });
		const second = mergeFeatureRecord(first, "dev123", { "search:open": 5 });
		expect(second.devices.dev123).toEqual({ "search:open": 5 });
		const other = mergeFeatureRecord(second, "dev999", { "search:open": 1 });
		expect(summarizeFeatureRecords({ "2026-11-18": other }, "dev123")).toEqual({
			days: { "2026-11-18": { "search:open": 6 } },
			mine: { "2026-11-18": { "search:open": 5 } },
		});
	});

	it("sends only days that moved past the acknowledged snapshot", () => {
		const local = { "2026-11-17": { "search:open": 1 }, "2026-11-18": { "search:open": 2, "it-listening:play": 1 } };
		const posted = { "2026-11-17": { "search:open": 1 }, "2026-11-18": { "search:open": 1 } };
		expect(pendingFeatureTotals(local, posted)).toEqual({ "2026-11-18": { "search:open": 2, "it-listening:play": 1 } });
		expect(pendingFeatureTotals(local, local)).toEqual({});
	});

	it("displays the server total plus what this device has not uploaded yet", () => {
		const remote = { "2026-11-18": { "search:open": 10 } };
		const mine = { "2026-11-18": { "search:open": 4 } };
		const local = { "2026-11-18": { "search:open": 6 } };
		// Others contributed 6, this device is at 6 live: total 12, never below the server's 10.
		expect(combineFeatureDays(remote, mine, local)).toEqual({ "2026-11-18": { "search:open": 12 } });
		expect(combineFeatureDays(remote, mine, { "2026-11-18": { "search:open": 4 } })).toEqual({
			"2026-11-18": { "search:open": 10 },
		});
	});
});

describe("/api/feature-usage", () => {
	it("requires sign-in, merges devices by sum, and stays idempotent on re-post", async () => {
		const kv = memoryKv();
		seedUser(kv, { id: "g_1" });
		const ctx = routeContext(testEnv(kv));

		const guest = await featureLoader({ request: new Request("http://localhost/api/feature-usage"), context: ctx });
		expect(guest.status).toBe(401);

		const post = async (device: string, totals: unknown) =>
			featureAction({
				request: await authedRequest(`http://localhost/api/feature-usage?device=${device}`, "g_1", {
					method: "POST",
					body: JSON.stringify({ device, totals }),
				}),
				context: ctx,
			});

		const day = "2026-11-18";
		const first = await post("dev123", { [day]: { "it-listening:play": 2, "vocab-queue:grade": 5 } });
		expect(first.status).toBe(200);
		// Same absolute totals posted again (a retry): counts must not move.
		await post("dev123", { [day]: { "it-listening:play": 2, "vocab-queue:grade": 5 } });
		// A second device adds its own totals on top.
		await post("dev999", { [day]: { "it-listening:play": 3 } });

		const read = await featureLoader({
			request: await authedRequest(`http://localhost/api/feature-usage?device=dev123`, "g_1"),
			context: ctx,
		});
		expect(await read.json()).toEqual({
			days: { [day]: { "it-listening:play": 5, "vocab-queue:grade": 5 } },
			mine: { [day]: { "it-listening:play": 2, "vocab-queue:grade": 5 } },
		});
		const stored = JSON.parse(kv.map.get(`feature-day:u:g_1:${day}`) || "{}");
		expect(Object.keys(stored.devices).sort()).toEqual(["dev123", "dev999"]);
	});

	it("rejects a bad payload and a non-POST method", async () => {
		const kv = memoryKv();
		seedUser(kv, { id: "g_1" });
		const ctx = routeContext(testEnv(kv));
		const bad = await featureAction({
			request: await authedRequest("http://localhost/api/feature-usage", "g_1", { method: "POST", body: "{\"device\":1}" }),
			context: ctx,
		});
		expect(bad.status).toBe(400);
		const wrong = await featureAction({
			request: await authedRequest("http://localhost/api/feature-usage", "g_1", { method: "PUT", body: "{}" }),
			context: ctx,
		});
		expect(wrong.status).toBe(405);
	});
});
