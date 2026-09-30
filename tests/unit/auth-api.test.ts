import { describe, expect, it } from "vitest";

import { loader as meLoader } from "../../app/routes/api.me";
import { action as favAction, loader as favLoader } from "../../app/routes/api.favorites";
import { action as mistakeAction, loader as mistakeLoader } from "../../app/routes/api.mistakes";
import { action as dueAction, loader as dueLoader } from "../../app/routes/api.due-review";
import { loader as logoutLoader } from "../../app/routes/auth.logout";
import { dueKey, favsKey, mistakesKey } from "../../app/auth/users";
import { authedRequest, memoryKv, routeContext, seedUser, testEnv } from "./auth-test-utils";

describe("/api/me", () => {
	it("reports when google login is not configured", async () => {
		const env = testEnv(memoryKv(), { GOOGLE_CLIENT_ID: "", SESSION_SECRET: "" });
		const res = await meLoader({ request: new Request("http://localhost/api/me"), context: routeContext(env) });
		expect(await res.json()).toEqual({ user: null, configured: false });
	});

	it("returns a guest payload", async () => {
		const res = await meLoader({
			request: new Request("http://localhost/api/me"),
			context: routeContext(testEnv(memoryKv())),
		});
		expect(await res.json()).toEqual({ user: null, configured: true });
	});

	it("returns the signed-in user", async () => {
		const kv = memoryKv();
		seedUser(kv, { id: "g_1", email: "ada@example.com", name: "Ada" });
		const request = await authedRequest("http://localhost/api/me", "g_1");
		const res = await meLoader({ request, context: routeContext(testEnv(kv)) });
		const body = await res.json();
		expect(body.configured).toBe(true);
		expect(body.user).toMatchObject({ id: "g_1", email: "ada@example.com", name: "Ada" });
	});
});

describe("per-user favorites and mistakes", () => {
	it("rejects guests", async () => {
		const ctx = routeContext(testEnv(memoryKv()));
		const fav = await favLoader({ request: new Request("http://localhost/api/favorites"), context: ctx });
		const mis = await mistakeLoader({ request: new Request("http://localhost/api/mistakes"), context: ctx });
		expect(fav.status).toBe(401);
		expect(mis.status).toBe(401);
	});

	it("reads and writes only the signed-in user's keys", async () => {
		const kv = memoryKv();
		seedUser(kv, { id: "g_1" });
		seedUser(kv, { id: "g_2" });
		kv.map.set(favsKey("g_2"), JSON.stringify({ other: true }));
		kv.map.set("favorites", JSON.stringify({ leaked: true }));
		kv.map.set("mistakes", JSON.stringify([{ id: "leaked" }]));

		const getReq = await authedRequest("http://localhost/api/favorites", "g_1");
		const empty = await favLoader({ request: getReq, context: routeContext(testEnv(kv)) });
		expect(await empty.json()).toEqual({});

		const putReq = await authedRequest("http://localhost/api/favorites", "g_1", {
			method: "PUT",
			body: JSON.stringify({ mine: { module: "grammar", hash: "#/", w: 1, d: 1, jp: "x", cn: "x" } }),
		});
		const put = await favAction({ request: putReq, context: routeContext(testEnv(kv)) });
		expect(put.status).toBe(200);
		expect(kv.map.get(favsKey("g_1"))).toContain("mine");
		expect(kv.map.get("favorites")).toContain("leaked");
		expect(kv.map.get(favsKey("g_2"))).toContain("other");

		const misPut = await mistakeAction({
			request: await authedRequest("http://localhost/api/mistakes", "g_1", {
				method: "PUT",
				body: JSON.stringify([{ id: "m1", type: "q", text: "題", ts: 1, level: "new" }]),
			}),
			context: routeContext(testEnv(kv)),
		});
		expect(misPut.status).toBe(200);
		expect(kv.map.get(mistakesKey("g_1"))).toContain("m1");
		expect(JSON.parse(kv.map.get("mistakes") || "[]")[0].id).toBe("leaked");
	});

	it("rejects invalid payloads", async () => {
		const kv = memoryKv();
		seedUser(kv, { id: "g_1" });
		const ctx = routeContext(testEnv(kv));
		const badFav = await favAction({
			request: await authedRequest("http://localhost/api/favorites", "g_1", { method: "PUT", body: "[]" }),
			context: ctx,
		});
		const badMis = await mistakeAction({
			request: await authedRequest("http://localhost/api/mistakes", "g_1", { method: "PUT", body: "{}" }),
			context: ctx,
		});
		expect(badFav.status).toBe(400);
		expect(badMis.status).toBe(400);
		const unsafeKey = await favAction({
			request: await authedRequest("http://localhost/api/favorites", "g_1", {
				method: "PUT",
				body: '{"__proto__":{"module":"selection","hash":"#/","w":"","d":"","jp":"x","cn":"x"}}',
			}),
			context: ctx,
		});
		expect(unsafeKey.status).toBe(400);
	});

	it("validates entry fields instead of accepting arbitrary containers", async () => {
		const kv = memoryKv();
		seedUser(kv, { id: "g_1" });
		const ctx = routeContext(testEnv(kv));
		const badFav = await favAction({
			request: await authedRequest("http://localhost/api/favorites", "g_1", {
				method: "PUT",
				body: JSON.stringify({ unsafe: { module: ["grammar"] } }),
			}),
			context: ctx,
		});
		const badMis = await mistakeAction({
			request: await authedRequest("http://localhost/api/mistakes", "g_1", {
				method: "PUT",
				body: JSON.stringify([{ id: "m1", type: "q", text: "題", ts: "now", level: "new" }]),
			}),
			context: ctx,
		});
		expect(badFav.status).toBe(400);
		expect(badMis.status).toBe(400);
	});

	it("applies the request limit to UTF-8 bytes, not JavaScript characters", async () => {
		const kv = memoryKv();
		seedUser(kv, { id: "g_1" });
		const payload = {
			large: { module: "selection", hash: "#/", w: "", d: "", jp: "あ".repeat(170_000), cn: "" },
		};
		const res = await favAction({
			request: await authedRequest("http://localhost/api/favorites", "g_1", {
				method: "PUT",
				body: JSON.stringify(payload),
			}),
			context: routeContext(testEnv(kv)),
		});
		expect(res.status).toBe(413);
		expect(kv.map.has(favsKey("g_1"))).toBe(false);
	});
});

describe("/api/due-review", () => {
	const sample = [{ id: "g1", kind: "grammar", jp: "ばかり", cn: "刚", en: "just", due: "2026-10-01", step: 0, ts: 1 }];

	it("rejects guests and stores the signed-in queue on the mistakes namespace", async () => {
		const kv = memoryKv();
		seedUser(kv, { id: "g_1" });
		const guest = await dueLoader({ request: new Request("http://localhost/api/due-review"), context: routeContext(testEnv(kv)) });
		expect(guest.status).toBe(401);

		const put = await dueAction({
			request: await authedRequest("http://localhost/api/due-review", "g_1", { method: "PUT", body: JSON.stringify(sample) }),
			context: routeContext(testEnv(kv)),
		});
		expect(put.status).toBe(200);
		expect(kv.map.get(dueKey("g_1"))).toContain("ばかり");
		expect(kv.map.has(mistakesKey("g_1"))).toBe(false);

		const get = await dueLoader({
			request: await authedRequest("http://localhost/api/due-review", "g_1"),
			context: routeContext(testEnv(kv)),
		});
		expect(await get.json()).toEqual(sample);
	});

	it("rejects a queue entry with an invalid date", async () => {
		const kv = memoryKv();
		seedUser(kv, { id: "g_1" });
		const res = await dueAction({
			request: await authedRequest("http://localhost/api/due-review", "g_1", {
				method: "PUT",
				body: JSON.stringify([{ ...sample[0], due: "tomorrow" }]),
			}),
			context: routeContext(testEnv(kv)),
		});
		expect(res.status).toBe(400);
		expect(kv.map.has(dueKey("g_1"))).toBe(false);
	});
});

describe("logout", () => {
	it("clears the session cookie and returns to study", async () => {
		const res = await logoutLoader({
			request: new Request("http://localhost/auth/logout"),
			context: routeContext(testEnv(memoryKv())),
		});
		expect(res.status).toBe(302);
		expect(res.headers.get("location")).toBe("/study");
		const cookies = res.headers.getSetCookie?.() || [res.headers.get("set-cookie") || ""];
		expect(cookies.some((c) => c.includes("jl_session=") && c.includes("Max-Age=0"))).toBe(true);
	});
});
