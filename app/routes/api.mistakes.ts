import type { AppLoadContext } from "react-router";

import { getSessionUser, json } from "../auth/http";
import { isMistakesPayload } from "../auth/study-payloads";
import { mistakesKey } from "../auth/users";
import { manualNotesNeedingNotify, notifyManualMistakesAdded } from "../study/mistake-notify";

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

	const bytes = await request.arrayBuffer();
	if (bytes.byteLength > MAX_BYTES) {
		return json({ error: "payload too large" }, { status: 413 });
	}
	const body = new TextDecoder().decode(bytes);

	try {
		const parsed: unknown = JSON.parse(body);
		if (!isMistakesPayload(parsed)) {
			return json({ error: "invalid mistakes payload" }, { status: 400 });
		}
	} catch {
		return json({ error: "invalid json" }, { status: 400 });
	}

	const key = mistakesKey(user.id);
	const previous = await context.cloudflare.env.MISTAKES_KV.get(key);
	await context.cloudflare.env.MISTAKES_KV.put(key, body);

	const notes = manualNotesNeedingNotify(previous, body);
	if (notes.length) {
		context.cloudflare.ctx.waitUntil(notifyManualMistakesAdded(context.cloudflare.env, user.id, notes));
	}

	return json({ ok: true });
}
