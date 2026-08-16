import { readSession } from "./session";
import { getUser, toPublicUser, type PublicUser, type UserRecord } from "./users";
import type { AuthEnv } from "./google";

export const jsonHeaders = {
	"content-type": "application/json; charset=utf-8",
	"cache-control": "no-store",
};

export function json(body: unknown, init?: ResponseInit): Response {
	return new Response(JSON.stringify(body), { ...init, headers: jsonHeaders });
}

export async function getSessionUser(request: Request, env: AuthEnv): Promise<UserRecord | null> {
	if (!env.SESSION_SECRET) return null;
	const session = await readSession(request, env.SESSION_SECRET);
	if (!session) return null;
	return getUser(env.FAVORITES_KV, session.u);
}

export async function getPublicSessionUser(request: Request, env: AuthEnv): Promise<PublicUser | null> {
	const user = await getSessionUser(request, env);
	return user ? toPublicUser(user) : null;
}
