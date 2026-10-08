import type { AppLoadContext } from "react-router";

import { isAuthConfigured } from "../auth/google";
import { getSessionUser, json } from "../auth/http";
import {
	MAX_TRANSLATION_GENERATE,
	generateTranslations,
	isTranslationRequest,
	type AiRunner,
	normalizeTranslationSource,
	translationKey,
	type TranslationMap,
} from "../study/mistake-translations";

type Args = { request: Request; context: AppLoadContext };

/**
 * POST { texts } → { translations: { [text]: 中文 } }.
 * Cached translations are returned to anyone; new ones are only generated
 * for signed-in users (or local dev without auth) so the Workers AI binding can't
 * be used as an open translation proxy.
 */
export async function action({ request, context }: Args) {
	if (request.method !== "POST") return json({ error: "method not allowed" }, { status: 405 });
	const env = context.cloudflare.env;

	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return json({ error: "invalid json" }, { status: 400 });
	}
	if (!isTranslationRequest(body)) return json({ error: "invalid payload" }, { status: 400 });

	const texts = [...new Set(body.texts.map(normalizeTranslationSource).filter(Boolean))];
	const keys = await Promise.all(texts.map(translationKey));
	const cached = await Promise.all(keys.map((key) => env.MISTAKES_KV.get(key)));

	const translations: TranslationMap = {};
	const missing: number[] = [];
	cached.forEach((value, i) => {
		if (value) translations[texts[i]] = value;
		else missing.push(i);
	});

	let pending = missing.length;
	let retry = false;
	const ai = (env.AI as unknown as AiRunner | undefined) ?? null;
	if (missing.length && ai) {
		const allowed = !isAuthConfigured(env) || Boolean(await getSessionUser(request, env));
		if (allowed) {
			const todo = missing.slice(0, MAX_TRANSLATION_GENERATE);
			const generated = await generateTranslations(
				todo.map((i) => texts[i]),
				{ ai },
			);
			const writes: Promise<void>[] = [];
			generated.forEach((value, j) => {
				if (!value) return;
				const i = todo[j];
				translations[texts[i]] = value;
				writes.push(env.MISTAKES_KV.put(keys[i], value));
				pending -= 1;
			});
			await Promise.all(writes);
			// Something failed (quota, outage): tell the client a retry may help.
			retry = pending > 0;
		}
	}

	return json({ translations, pending, retry });
}
