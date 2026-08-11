import type { Route } from "./+types/api.mistakes";

const KEY = "mistakes";
const MAX_BYTES = 500_000;
const headers = {
	"content-type": "application/json; charset=utf-8",
	"cache-control": "no-store",
};

function json(body: unknown, init?: ResponseInit) {
	return new Response(JSON.stringify(body), { ...init, headers });
}

export async function loader({ context }: Route.LoaderArgs) {
	const raw = await context.cloudflare.env.MISTAKES_KV.get(KEY);
	return new Response(raw || "[]", { headers });
}

export async function action({ request, context }: Route.ActionArgs) {
	if (request.method !== "PUT" && request.method !== "POST") {
		return json({ error: "method not allowed" }, { status: 405 });
	}

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

	await context.cloudflare.env.MISTAKES_KV.put(KEY, body);
	return json({ ok: true });
}
