import type { AppLoadContext } from "react-router";

import { getSessionUser, json } from "../auth/http";
import { mistakesKey } from "../auth/users";

const MAX_BYTES = 500_000;
const headers = {
	"content-type": "application/json; charset=utf-8",
	"cache-control": "no-store",
};

type Args = { request: Request; context: AppLoadContext };

export async function loader({ request, context }: Args) {
	const user = await getSessionUser(request, context.cloudflare.env);
	if (!user) return json({ error: "unauthorized" }, { status: 401 });
	const raw = await context.cloudflare.env.MISTAKES_KV.get(mistakesKey(user.id));
	return new Response(raw || "[]", { headers });
}

export async function action({ request, context }: Args) {
	if (request.method !== "PUT" && request.method !== "POST") {
		return json({ error: "method not allowed" }, { status: 405 });
	}

	const user = await getSessionUser(request, context.cloudflare.env);
	if (!user) return json({ error: "unauthorized" }, { status: 401 });

	const body = await request.text();
	if (body.length > MAX_BYTES) {
		return json({ error: "payload too large" }, { status: 413 });
	}

	try {
		const parsed: unknown = JSON.parse(body);
		if (!Array.isArray(parsed)) {
			return json({ error: "expected a JSON array" }, { status: 400 });
		}
	} catch {
		return json({ error: "invalid json" }, { status: 400 });
	}

	await context.cloudflare.env.MISTAKES_KV.put(mistakesKey(user.id), body);
	return json({ ok: true });
}
