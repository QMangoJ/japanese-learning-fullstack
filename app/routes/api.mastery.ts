import type { AppLoadContext } from "react-router";

import { getSessionUser, json } from "../auth/http";
import { putIfChanged } from "../auth/kv-write";
import { isMasteryPayload } from "../auth/study-payloads";
import { masteryKey } from "../auth/users";

const MAX_BYTES = 1_200_000;
const headers = {
	"content-type": "application/json; charset=utf-8",
	"cache-control": "no-store",
};

type Args = { request: Request; context: AppLoadContext };

export async function loader({ request, context }: Args) {
	const user = await getSessionUser(request, context.cloudflare.env);
	if (!user) return json({ error: "unauthorized" }, { status: 401 });
	const raw = await context.cloudflare.env.MISTAKES_KV.get(masteryKey(user.id));
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
		if (!isMasteryPayload(parsed)) {
			return json({ error: "invalid mastery payload" }, { status: 400 });
		}
	} catch {
		return json({ error: "invalid json" }, { status: 400 });
	}

	const saved = await putIfChanged(context.cloudflare.env.MISTAKES_KV, masteryKey(user.id), body);
	if (saved instanceof Response) return saved;
	return json({ ok: true, written: saved.written });
}
