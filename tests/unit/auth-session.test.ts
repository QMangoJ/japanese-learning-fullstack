import { describe, expect, it } from "vitest";

import {
	clearSessionCookies,
	makeOAuthCookie,
	makeSessionCookie,
	randomHex,
	readCookie,
	readOAuth,
	readSession,
	safeNextPath,
	signToken,
	verifyToken,
} from "../../app/auth/session";

const SECRET = "unit-test-session-secret!!";

describe("signed tokens", () => {
	it("round-trips a payload", async () => {
		const token = await signToken(SECRET, { u: "g_1", e: Math.floor(Date.now() / 1000) + 60 });
		const payload = await verifyToken<{ u: string }>(SECRET, token);
		expect(payload?.u).toBe("g_1");
	});

	it("rejects a tampered body", async () => {
		const token = await signToken(SECRET, { u: "g_1", e: Math.floor(Date.now() / 1000) + 60 });
		const [body, sig] = token.split(".");
		const tweaked = `${body.slice(0, -2)}aa.${sig}`;
		expect(await verifyToken(SECRET, tweaked)).toBeNull();
	});

	it("rejects a wrong secret", async () => {
		const token = await signToken(SECRET, { u: "g_1", e: Math.floor(Date.now() / 1000) + 60 });
		expect(await verifyToken("different-secret-xxx!!", token)).toBeNull();
	});

	it("rejects an expired payload", async () => {
		const token = await signToken(SECRET, { u: "g_1", e: Math.floor(Date.now() / 1000) - 5 });
		expect(await verifyToken(SECRET, token)).toBeNull();
	});

	it("rejects garbage", async () => {
		expect(await verifyToken(SECRET, "")).toBeNull();
		expect(await verifyToken(SECRET, "no-dot")).toBeNull();
		expect(await verifyToken("", "a.b")).toBeNull();
	});
});

describe("cookies and next path", () => {
	it("reads a named cookie", () => {
		const request = new Request("http://localhost/study", {
			headers: { cookie: "a=1; jl_session=abc; b=2" },
		});
		expect(readCookie(request, "jl_session")).toBe("abc");
		expect(readCookie(request, "missing")).toBeNull();
	});

	it("writes and reads a session cookie", async () => {
		const cookie = await makeSessionCookie(SECRET, "g_99", false);
		const request = new Request("http://localhost/api/me", { headers: { cookie } });
		const session = await readSession(request, SECRET);
		expect(session?.u).toBe("g_99");
	});

	it("writes and reads an oauth state cookie", async () => {
		const cookie = await makeOAuthCookie(SECRET, "state-1", "/study/favs", false);
		const request = new Request("http://localhost/auth/google/callback", { headers: { cookie } });
		const oauth = await readOAuth(request, SECRET);
		expect(oauth?.s).toBe("state-1");
		expect(oauth?.n).toBe("/study/favs");
	});

	it("clears session cookies", () => {
		const cookies = clearSessionCookies(false);
		expect(cookies).toHaveLength(2);
		expect(cookies.every((c) => c.includes("Max-Age=0"))).toBe(true);
	});

	it("only allows in-app next paths", () => {
		expect(safeNextPath(null)).toBe("/study");
		expect(safeNextPath("/study/favs")).toBe("/study/favs");
		expect(safeNextPath("//evil.test")).toBe("/study");
		expect(safeNextPath("https://evil.test")).toBe("/study");
		expect(safeNextPath("/login")).toBe("/study");
	});

	it("makes unique hex nonces", () => {
		expect(randomHex(8)).toHaveLength(16);
		expect(randomHex(8)).not.toBe(randomHex(8));
	});
});
