import { describe, expect, it } from "vitest";

import { loader as meLoader } from "../../app/routes/api.me";
import { action as favAction, loader as favLoader } from "../../app/routes/api.favorites";
import { action as mistakeAction, loader as mistakeLoader } from "../../app/routes/api.mistakes";
import { loader as logoutLoader } from "../../app/routes/auth.logout";
import { favsKey, mistakesKey } from "../../app/auth/users";
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
