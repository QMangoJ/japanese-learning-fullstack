import { afterEach, describe, expect, it, vi } from "vitest";

import {
	buildGoogleAuthUrl,
	exchangeGoogleCode,
	fetchGoogleProfile,
	finishGoogleLogin,
	isAuthConfigured,
	startGoogleLogin,
} from "../../app/auth/google";
import { OAUTH_COOKIE, makeOAuthCookie, readCookie } from "../../app/auth/session";
import { TEST_SECRET, memoryKv, testEnv } from "./auth-test-utils";

afterEach(() => {
	vi.unstubAllGlobals();
	vi.restoreAllMocks();
});

describe("google helpers", () => {
	it("requires all three secrets", () => {
		const kv = memoryKv();
		expect(isAuthConfigured(testEnv(kv, { SESSION_SECRET: "short" }))).toBe(false);
		expect(isAuthConfigured(testEnv(kv, { GOOGLE_CLIENT_ID: "" }))).toBe(false);
		expect(isAuthConfigured(testEnv(kv))).toBe(true);
	});

	it("builds the authorization url", () => {
		const url = new URL(
			buildGoogleAuthUrl({
				clientId: "cid.apps.googleusercontent.com",
				redirectUri: "http://localhost:5173/auth/google/callback",
				state: "abc",
			}),
		);
		expect(url.origin + url.pathname).toBe("https://accounts.google.com/o/oauth2/v2/auth");
		expect(url.searchParams.get("client_id")).toBe("cid.apps.googleusercontent.com");
		expect(url.searchParams.get("redirect_uri")).toBe("http://localhost:5173/auth/google/callback");
		expect(url.searchParams.get("response_type")).toBe("code");
		expect(url.searchParams.get("scope")).toContain("email");
		expect(url.searchParams.get("state")).toBe("abc");
	});

	it("exchanges a code and loads the google profile", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(async (input: RequestInfo | URL) => {
				const url = String(input);
				if (url.includes("oauth2.googleapis.com/token")) {
					return Response.json({ access_token: "tok" });
				}
				if (url.includes("oauth2/v3/userinfo")) {
					return Response.json({ sub: "99", email: "a@b.c", name: "Ada", picture: "https://img" });
				}
				return new Response("no", { status: 404 });
			}),
		);
		const token = await exchangeGoogleCode({
			code: "code-1",
			clientId: "cid",
			clientSecret: "sec",
			redirectUri: "http://localhost/auth/google/callback",
		});
		expect(token).toBe("tok");
		await expect(fetchGoogleProfile(token)).resolves.toMatchObject({ sub: "99", email: "a@b.c" });
	});
});

describe("google login flow", () => {
	it("explains when secrets are missing", async () => {
		const kv = memoryKv();
		const env = testEnv(kv, { GOOGLE_CLIENT_ID: "", GOOGLE_CLIENT_SECRET: "", SESSION_SECRET: "" });
		const res = await startGoogleLogin(new Request("http://localhost/auth/google"), env);
		expect(res.status).toBe(503);
		expect(await res.text()).toContain("尚未配置");
	});

	it("redirects to google and stores signed state", async () => {
		const res = await startGoogleLogin(
			new Request("http://localhost/auth/google?next=/study/favs"),
			testEnv(memoryKv()),
		);
		expect(res.status).toBe(302);
		const location = res.headers.get("location") || "";
		expect(location).toContain("accounts.google.com");
		expect(location).toContain("state=");
		const cookie = res.headers.get("set-cookie") || "";
		expect(cookie).toContain(`${OAUTH_COOKIE}=`);
	});

	it("rejects a callback with a mismatched state", async () => {
		const cookie = await makeOAuthCookie(TEST_SECRET, "expected", "/study", false);
		const res = await finishGoogleLogin(
			new Request("http://localhost/auth/google/callback?code=x&state=other", {
				headers: { cookie },
			}),
			testEnv(memoryKv()),
		);
		expect(res.status).toBe(302);
		expect(res.headers.get("location")).toBe("/study?auth=error");
	});

	it("creates a session after a successful callback", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(async (input: RequestInfo | URL) => {
				const url = String(input);
				if (url.includes("/token")) return Response.json({ access_token: "tok" });
				if (url.includes("/userinfo")) {
					return Response.json({ sub: "42", email: "ada@example.com", name: "Ada", picture: "" });
				}
				return new Response("no", { status: 404 });
			}),
		);
		const kv = memoryKv();
		const cookie = await makeOAuthCookie(TEST_SECRET, "ok-state", "/study/favs", false);
		const res = await finishGoogleLogin(
			new Request("http://localhost/auth/google/callback?code=good&state=ok-state", {
				headers: { cookie },
			}),
			testEnv(kv),
		);
		expect(res.status).toBe(302);
		expect(res.headers.get("location")).toBe("/study/favs");
		const setCookie = res.headers.getSetCookie?.() || [res.headers.get("set-cookie") || ""];
		expect(setCookie.some((c) => c.includes("jl_session="))).toBe(true);
		expect(kv.map.get("google:42")).toBe("g_42");
		expect(kv.map.get("user:g_42")).toContain("ada@example.com");
	});

	it("reads the oauth cookie name after start", async () => {
		const res = await startGoogleLogin(new Request("http://localhost/auth/google"), testEnv(memoryKv()));
		const request = new Request("http://localhost/cb", {
			headers: { cookie: res.headers.get("set-cookie") || "" },
		});
		expect(readCookie(request, OAUTH_COOKIE)).toBeTruthy();
	});
});
