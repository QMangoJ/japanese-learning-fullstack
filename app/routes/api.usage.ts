import type { AppLoadContext } from "react-router";

import { getSessionUser, json } from "../auth/http";
import { usageAppKey, usageKey } from "../auth/users";
import { applyUsageDelta, parseUsageDelta, sanitizeDays, type UsageKind } from "../study/usage-time";

const MAX_BYTES = 32_000;
const headers = {
	"content-type": "application/json; charset=utf-8",
	"cache-control": "no-store",
};

type Args = { request: Request; context: AppLoadContext };

function publicApp(request: Request): Exclude<UsageKind, "account"> | "account" | "invalid" {
	const app = new URL(request.url).searchParams.get("app");
	if (!app) return "account";
	if (app === "shadowing" || app === "reading") return app;
	return "invalid";
}

function storageKey(app: "account" | "shadowing" | "reading", userId: string): string {
	return app === "account" ? usageKey(userId) : usageAppKey(app);
}

async function readDays(kv: KVNamespace, key: string) {
	const raw = await kv.get(key, "json");
	if (!raw || typeof raw !== "object") return {};
	return sanitizeDays((raw as { days?: unknown }).days);
}

export async function loader({ request, context }: Args) {
	const app = publicApp(request);
	if (app === "invalid") return json({ error: "unknown app" }, { status: 400 });
	const kv = context.cloudflare.env.MISTAKES_KV;
	if (app === "account") {
		const user = await getSessionUser(request, context.cloudflare.env);
		if (!user) return json({ error: "unauthorized" }, { status: 401 });
		return new Response(JSON.stringify({ days: await readDays(kv, usageKey(user.id)) }), { headers });
	}
	return new Response(JSON.stringify({ days: await readDays(kv, usageAppKey(app)) }), { headers });
}

export async function action({ request, context }: Args) {
	if (request.method !== "POST") return json({ error: "method not allowed" }, { status: 405 });
	const app = publicApp(request);
	if (app === "invalid") return json({ error: "unknown app" }, { status: 400 });

	const user = app === "account" ? await getSessionUser(request, context.cloudflare.env) : null;
	if (app === "account" && !user) return json({ error: "unauthorized" }, { status: 401 });

	const bytes = await request.arrayBuffer();
	if (bytes.byteLength > MAX_BYTES) return json({ error: "payload too large" }, { status: 413 });
	try {
		const delta = parseUsageDelta(JSON.parse(new TextDecoder().decode(bytes)));
		if (!delta) return json({ error: "invalid usage payload" }, { status: 400 });
		const kv = context.cloudflare.env.MISTAKES_KV;
		const key = storageKey(app, user?.id || "");
		const days = applyUsageDelta(await readDays(kv, key), delta);
		await kv.put(key, JSON.stringify({ days }));
		return new Response(JSON.stringify({ days }), { headers });
	} catch {
		return json({ error: "invalid json" }, { status: 400 });
	}
}
