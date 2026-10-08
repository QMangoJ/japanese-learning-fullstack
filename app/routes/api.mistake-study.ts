import type { AppLoadContext } from "react-router";

import { json } from "../auth/http";
import {
	isTranslationRequest,
	normalizeTranslationSource,
	parseStoredStudyAid,
	studyAidKey,
	type StudyAidMap,
} from "../study/mistake-translations";

type Args = { request: Request; context: AppLoadContext };

/**
 * POST { texts, generate? } → { aids: { [text]: StudyAid }, pending, retry }.
 * Cached aids only (KV), same as /api/mistake-translations; `generate` is ignored.
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
	const keys = await Promise.all(texts.map(studyAidKey));
	const cached = await Promise.all(keys.map((key) => env.MISTAKES_KV.get(key)));

	const aids: StudyAidMap = {};
	const missing: number[] = [];
	cached.forEach((value, i) => {
		const aid = parseStoredStudyAid(value);
		if (aid) aids[texts[i]] = aid;
		else missing.push(i);
	});

	// Lookup only: no model is called here (Gemini / Workers AI quota is reserved for news-learning).
	// Missing manual notes are filled by the assistant CLI (scripts/mistakes-*.mts).
	const pending = missing.length;
	const retry = false;

	return json({ aids, pending, retry });
}
