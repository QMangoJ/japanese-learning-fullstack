import type { AppLoadContext } from "react-router";

import { isAuthConfigured } from "../auth/google";
import { getSessionUser, json } from "../auth/http";
import {
	MAX_TRANSLATION_GENERATE,
	generateTranslations,
	isAssistantTranslation,
	isTranslationRequest,
	type AiRunner,
	normalizeTranslationSource,
	parseStoredTranslation,
	serializeTranslation,
	translationKey,
	type TranslationMap,
} from "../study/mistake-translations";

type Args = { request: Request; context: AppLoadContext };

/**
 * POST { texts, generate? } → { translations: { [text]: 中文 }, pending, retry }.
 * Cached translations are returned to anyone. New ones are only generated when
 * `generate` is not false and the caller is signed in (or local dev without auth).
 * Manual word/grammar notes must call with `generate: false` — the assistant CLI
 * writes those. Entries marked source=assistant are never overwritten.
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
		const parsed = parseStoredTranslation(value);
		if (parsed) translations[texts[i]] = parsed.cn;
		else missing.push(i);
	});

	let pending = missing.length;
	let retry = false;
	const allowGenerate = body.generate !== false;
	const ai = (env.AI as unknown as AiRunner | undefined) ?? null;
	if (allowGenerate && missing.length && (env.GEMINI_API_KEY || ai)) {
		const allowed = !isAuthConfigured(env) || Boolean(await getSessionUser(request, env));
		if (allowed) {
			const todo = missing.slice(0, MAX_TRANSLATION_GENERATE);
			const generated = await generateTranslations(
				todo.map((i) => texts[i]),
				{ apiKey: env.GEMINI_API_KEY || undefined, ai },
			);
			const writes: Promise<void>[] = [];
			generated.forEach((value, j) => {
				if (!value) return;
				const i = todo[j];
				// Never clobber an assistant-reviewed entry that appeared mid-flight.
				if (isAssistantTranslation(cached[i])) {
					const locked = parseStoredTranslation(cached[i]);
					if (locked) translations[texts[i]] = locked.cn;
					pending -= 1;
					return;
				}
				translations[texts[i]] = value;
				writes.push(env.MISTAKES_KV.put(keys[i], serializeTranslation(value)));
				pending -= 1;
			});
			await Promise.all(writes);
			retry = pending > 0;
		}
	}

	return json({ translations, pending, retry });
}
