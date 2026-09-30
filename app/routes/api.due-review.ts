import type { AppLoadContext } from "react-router";

import { getSessionUser, json } from "../auth/http";
import { isDueReviewPayload } from "../auth/study-payloads";
import { dueKey } from "../auth/users";

const MAX_BYTES = 500_000;
const headers = {
	"content-type": "application/json; charset=utf-8",
	"cache-control": "no-store",
};

type Args = { request: Request; context: AppLoadContext };

export async function loader({ request, context }: Args) {
	const user = await getSessionUser(request, context.cloudflare.env);
	if (!user) return json({ error: "unauthorized" }, { status: 401 });
	const raw = await context.cloudflare.env.MISTAKES_KV.get(dueKey(user.id));
	return new Response(raw || "[]", { headers });
}

export async function action({ request, context }: Args) {
	if (request.method !== "PUT" && request.method !== "POST") {
		return json({ error: "method not allowed" }, { status: 405 });
	}

	const user = await getSessionUser(request, context.cloudflare.env);
	if (!user) return json({ error: "unauthorized" }, { status: 401 });

	const bytes = await request.arrayBuffer();
	if (bytes.byteLength > MAX_BYTES) {
		return json({ error: "payload too large" }, { status: 413 });
	}
	const body = new TextDecoder().decode(bytes);

	try {
		const parsed: unknown = JSON.parse(body);
		if (!isDueReviewPayload(parsed)) {
			return json({ error: "invalid due review payload" }, { status: 400 });
		}
	} catch {
		return json({ error: "invalid json" }, { status: 400 });
	}

	await context.cloudflare.env.MISTAKES_KV.put(dueKey(user.id), body);
	return json({ ok: true });
}