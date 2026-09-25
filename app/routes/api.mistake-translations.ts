import type { AppLoadContext } from "react-router";

import { isAuthConfigured } from "../auth/google";
import { getSessionUser, json } from "../auth/http";
import {
	DEFAULT_GEMINI_MODEL,
	MAX_TRANSLATION_GENERATE,
	geminiTranslate,
	isTranslationRequest,
	normalizeTranslationSource,
	translationKey,
	type TranslationMap,
} from "../study/mistake-translations";

type Args = { request: Request; context: AppLoadContext };

/**
 * POST { texts } → { translations: { [text]: 中文 } }.
 * Cached translations are returned to anyone; new ones are only generated
 * for signed-in users (or local dev without auth) so the Gemini key can't be
 * used as an open translation proxy.
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
	if (missing.length && env.GEMINI_API_KEY) {
		const allowed = !isAuthConfigured(env) || Boolean(await getSessionUser(request, env));
		if (allowed) {
			const todo = missing.slice(0, MAX_TRANSLATION_GENERATE);
			const generated = await geminiTranslate(
				todo.map((i) => texts[i]),
				env.GEMINI_API_KEY,
				{ model: env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL },
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
		}
	}

	return json({ translations, pending });
}
