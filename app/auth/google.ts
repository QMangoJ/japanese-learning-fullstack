import {
	clearOAuthCookie,
	isSecureRequest,
	makeOAuthCookie,
	makeSessionCookie,
	randomHex,
	readOAuth,
	redirectWithCookies,
	safeNextPath,
} from "./session";
import { toPublicUser, upsertGoogleUser, type GoogleProfile, type PublicUser, type UserRecord } from "./users";

export type AuthEnv = {
	FAVORITES_KV: KVNamespace;
	MISTAKES_KV: KVNamespace;
	GOOGLE_CLIENT_ID?: string;
	GOOGLE_CLIENT_SECRET?: string;
	SESSION_SECRET?: string;
};

const GOOGLE_AUTH = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO = "https://www.googleapis.com/oauth2/v3/userinfo";

export function isAuthConfigured(env: AuthEnv): boolean {
	return Boolean(
		env.GOOGLE_CLIENT_ID &&
			env.GOOGLE_CLIENT_SECRET &&
			env.SESSION_SECRET &&
			env.SESSION_SECRET.length >= 16,
	);
}

export function requestOrigin(request: Request): string {
	const url = new URL(request.url);
	const proto = request.headers.get("x-forwarded-proto") || url.protocol.replace(":", "");
	const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || url.host;
	return `${proto}://${host}`;
}

export function googleCallbackUrl(request: Request): string {
	return `${requestOrigin(request)}/auth/google/callback`;
}

export function buildGoogleAuthUrl(opts: { clientId: string; redirectUri: string; state: string }): string {
	const params = new URLSearchParams({
		client_id: opts.clientId,
		redirect_uri: opts.redirectUri,
		response_type: "code",
		scope: "openid email profile",
		state: opts.state,
		access_type: "online",
		prompt: "select_account",
	});
	return `${GOOGLE_AUTH}?${params.toString()}`;
}

export async function exchangeGoogleCode(opts: {
	code: string;
	clientId: string;
	clientSecret: string;
	redirectUri: string;
}): Promise<string> {
	const body = new URLSearchParams({
		code: opts.code,
		client_id: opts.clientId,
		client_secret: opts.clientSecret,
		redirect_uri: opts.redirectUri,
		grant_type: "authorization_code",
	});
	const res = await fetch(GOOGLE_TOKEN, {
		method: "POST",
		headers: { "content-type": "application/x-www-form-urlencoded" },
		body,
	});
	if (!res.ok) throw new Error(`google token ${res.status}`);
	const data = (await res.json()) as { access_token?: string };
	if (!data.access_token) throw new Error("google token missing");
	return data.access_token;
}

export async function fetchGoogleProfile(accessToken: string): Promise<GoogleProfile> {
	const res = await fetch(GOOGLE_USERINFO, {
		headers: { authorization: `Bearer ${accessToken}` },
	});
	if (!res.ok) throw new Error(`google userinfo ${res.status}`);
	const data = (await res.json()) as GoogleProfile;
	if (!data.sub) throw new Error("google profile missing sub");
	return data;
}

export function authNotConfiguredPage(): Response {
	const html = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>登录尚未配置 · 日本語上手</title>
<style>
body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC",sans-serif;background:#f6f7f9;color:#222;line-height:1.6}
main{max-width:40rem;margin:12vh auto;padding:0 1.25rem}
h1{font-size:1.35rem;margin:0 0 .6rem}
p{margin:.4rem 0;color:#555}
code{font-size:.9em;background:#fff;border:1px solid #e3e6ea;border-radius:6px;padding:.1em .35em}
a{color:#2b6cb0}
</style>
</head>
<body>
<main>
<h1>Google 登录尚未配置</h1>
<p>本地把 <code>GOOGLE_CLIENT_ID</code>、<code>GOOGLE_CLIENT_SECRET</code>、<code>SESSION_SECRET</code> 写进 <code>.dev.vars</code>。</p>
<p>线上用 <code>wrangler secret put</code> 写入同样三个值，并在 Google Cloud Console 里登记回调地址：</p>
<p><code>http://localhost:5173/auth/google/callback</code><br/><code>https://你的域名/auth/google/callback</code></p>
<p>Google sign-in is not configured yet. Add the three secrets locally or with Wrangler, then register the callback URIs above.</p>
<p><a href="/study">← 返回学习区 / Back to study</a></p>
</main>
</body>
</html>`;
	return new Response(html, {
		status: 503,
		headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
	});
}

export async function startGoogleLogin(request: Request, env: AuthEnv): Promise<Response> {
	if (!isAuthConfigured(env) || !env.GOOGLE_CLIENT_ID || !env.SESSION_SECRET) {
		return authNotConfiguredPage();
	}
	const url = new URL(request.url);
	const next = safeNextPath(url.searchParams.get("next"));
	const state = randomHex(24);
	const secure = isSecureRequest(request);
	const cookie = await makeOAuthCookie(env.SESSION_SECRET, state, next, secure);
	const location = buildGoogleAuthUrl({
		clientId: env.GOOGLE_CLIENT_ID,
		redirectUri: googleCallbackUrl(request),
		state,
	});
	return redirectWithCookies(location, [cookie]);
}

export async function finishGoogleLogin(request: Request, env: AuthEnv): Promise<Response> {
	const secure = isSecureRequest(request);
	const fail = () => redirectWithCookies("/study?auth=error", [clearOAuthCookie(secure)]);
	if (!isAuthConfigured(env) || !env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET || !env.SESSION_SECRET) {
		return authNotConfiguredPage();
	}
	const url = new URL(request.url);
	if (url.searchParams.get("error")) return fail();
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const oauth = await readOAuth(request, env.SESSION_SECRET);
	if (!code || !state || !oauth || oauth.s !== state) return fail();
	try {
		const accessToken = await exchangeGoogleCode({
			code,
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
			redirectUri: googleCallbackUrl(request),
		});
		const profile = await fetchGoogleProfile(accessToken);
		const user = await upsertGoogleUser(env.FAVORITES_KV, profile);
		const session = await makeSessionCookie(env.SESSION_SECRET, user.id, secure);
		return redirectWithCookies(safeNextPath(oauth.n), [session, clearOAuthCookie(secure)]);
	} catch {
		return fail();
	}
}

export function publicFromRecord(user: UserRecord): PublicUser {
	return toPublicUser(user);
}
