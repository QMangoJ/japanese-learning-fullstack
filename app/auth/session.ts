const SESSION_COOKIE = "jl_session";
const OAUTH_COOKIE = "jl_oauth";
const SESSION_TTL_SEC = 60 * 60 * 24 * 30;
const OAUTH_TTL_SEC = 60 * 10;

export type SessionPayload = { u: string; e: number };
export type OAuthPayload = { s: string; n: string; e: number };

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function bytesToB64url(bytes: Uint8Array): string {
	let bin = "";
	for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
	return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlToBytes(token: string): Uint8Array<ArrayBuffer> {
	const pad = token.length % 4 === 0 ? "" : "=".repeat(4 - (token.length % 4));
	const b64 = token.replace(/-/g, "+").replace(/_/g, "/") + pad;
	const bin = atob(b64);
	const out = new Uint8Array(bin.length);
	for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
	return out;
}

async function hmacKey(secret: string): Promise<CryptoKey> {
	return crypto.subtle.importKey("raw", textEncoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
		"sign",
		"verify",
	]);
}

export async function signToken(secret: string, payload: unknown): Promise<string> {
	const body = bytesToB64url(textEncoder.encode(JSON.stringify(payload)));
	const key = await hmacKey(secret);
	const sig = await crypto.subtle.sign("HMAC", key, textEncoder.encode(body));
	return `${body}.${bytesToB64url(new Uint8Array(sig))}`;
}

export async function verifyToken<T>(secret: string, token: string): Promise<T | null> {
	if (!secret || !token) return null;
	const i = token.lastIndexOf(".");
	if (i < 1) return null;
	const body = token.slice(0, i);
	const sig = token.slice(i + 1);
	try {
		const key = await hmacKey(secret);
		const ok = await crypto.subtle.verify("HMAC", key, b64urlToBytes(sig), textEncoder.encode(body));
		if (!ok) return null;
		const data = JSON.parse(textDecoder.decode(b64urlToBytes(body))) as T & { e?: number };
		if (typeof data.e === "number" && data.e * 1000 <= Date.now()) return null;
		return data;
	} catch {
		return null;
	}
}

export function randomHex(bytes = 16): string {
	const buf = new Uint8Array(bytes);
	crypto.getRandomValues(buf);
	return [...buf].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function readCookie(request: Request, name: string): string | null {
	const header = request.headers.get("cookie");
	if (!header) return null;
	for (const part of header.split(";")) {
		const trimmed = part.trim();
		if (!trimmed) continue;
		const eq = trimmed.indexOf("=");
		if (eq < 0) continue;
		if (trimmed.slice(0, eq) === name) return trimmed.slice(eq + 1);
	}
	return null;
}

function cookieBase(secure: boolean): string {
	return `Path=/; HttpOnly; SameSite=Lax${secure ? "; Secure" : ""}`;
}

export function isSecureRequest(request: Request): boolean {
	try {
		return new URL(request.url).protocol === "https:";
	} catch {
		return false;
	}
}

export function serializeCookie(name: string, value: string, maxAge: number, secure: boolean): string {
	return `${name}=${value}; Max-Age=${maxAge}; ${cookieBase(secure)}`;
}

export function clearCookie(name: string, secure: boolean): string {
	return `${name}=; Max-Age=0; ${cookieBase(secure)}`;
}

export async function makeSessionCookie(secret: string, userId: string, secure: boolean): Promise<string> {
	const token = await signToken(secret, {
		u: userId,
		e: Math.floor(Date.now() / 1000) + SESSION_TTL_SEC,
	} satisfies SessionPayload);
	return serializeCookie(SESSION_COOKIE, token, SESSION_TTL_SEC, secure);
}

export async function makeOAuthCookie(secret: string, state: string, next: string, secure: boolean): Promise<string> {
	const token = await signToken(secret, {
		s: state,
		n: next,
		e: Math.floor(Date.now() / 1000) + OAUTH_TTL_SEC,
	} satisfies OAuthPayload);
	return serializeCookie(OAUTH_COOKIE, token, OAUTH_TTL_SEC, secure);
}

export async function readSession(request: Request, secret: string): Promise<SessionPayload | null> {
	const raw = readCookie(request, SESSION_COOKIE);
	if (!raw) return null;
	const payload = await verifyToken<SessionPayload>(secret, raw);
	if (!payload || typeof payload.u !== "string" || !payload.u) return null;
	return payload;
}

export async function readOAuth(request: Request, secret: string): Promise<OAuthPayload | null> {
	const raw = readCookie(request, OAUTH_COOKIE);
	if (!raw) return null;
	const payload = await verifyToken<OAuthPayload>(secret, raw);
	if (!payload || typeof payload.s !== "string" || typeof payload.n !== "string") return null;
	return payload;
}

export function clearSessionCookies(secure: boolean): string[] {
	return [clearCookie(SESSION_COOKIE, secure), clearCookie(OAUTH_COOKIE, secure)];
}

export function clearOAuthCookie(secure: boolean): string {
	return clearCookie(OAUTH_COOKIE, secure);
}

export function safeNextPath(value: string | null | undefined): string {
	if (!value) return "/study";
	if (!value.startsWith("/study")) return "/study";
	if (value.startsWith("//") || value.includes("://")) return "/study";
	return value;
}

export function redirectWithCookies(location: string, cookies: string[]): Response {
	const headers = new Headers({ Location: location });
	for (const cookie of cookies) headers.append("Set-Cookie", cookie);
	return new Response(null, { status: 302, headers });
}

export { SESSION_COOKIE, OAUTH_COOKIE, SESSION_TTL_SEC, OAUTH_TTL_SEC };
