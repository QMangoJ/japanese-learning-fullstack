import type { AppLoadContext } from "react-router";

import { json } from "../auth/http";
import {
	isTranslationRequest,
	normalizeTranslationSource,
	parseStoredTranslation,
	translationKey,
	type TranslationMap,
} from "../study/mistake-translations";

type Args = { request: Request; context: AppLoadContext };

/**
 * POST { texts, generate? } → { translations: { [text]: 中文 }, pending, retry }.
 * Returns cached translations only (KV). `generate` is accepted for older
 * clients and ignored; nothing is generated on the server. Manual word/grammar
 * notes are written by the assistant CLI (source=assistant).
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

	// Lookup only: no model is called here (Gemini / Workers AI quota is reserved for news-learning).
	// Missing manual notes are filled by the assistant CLI (scripts/mistakes-*.mts).
	const pending = missing.length;
	const retry = false;

	return json({ translations, pending, retry });
}
