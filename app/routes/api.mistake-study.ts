import type { AppLoadContext } from "react-router";

import { isAuthConfigured } from "../auth/google";
import { getSessionUser, json } from "../auth/http";
import {
	MAX_TRANSLATION_GENERATE,
	generateStudyAids,
	isTranslationRequest,
	type AiRunner,
	normalizeTranslationSource,
	parseStoredStudyAid,
	studyAidKey,
	type StudyAidMap,
} from "../study/mistake-translations";

type Args = { request: Request; context: AppLoadContext };

/**
 * POST { texts } → { aids: { [text]: { reading?, example?, exampleCn? } } }.
 * Cached aids are returned to anyone. New ones are generated only for a
 * signed-in user, same gate as the Chinese translations.
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

	let pending = missing.length;
	let retry = false;
	const ai = (env.AI as unknown as AiRunner | undefined) ?? null;
	if (missing.length && (env.GEMINI_API_KEY || ai)) {
		const allowed = !isAuthConfigured(env) || Boolean(await getSessionUser(request, env));
		if (allowed) {
			const todo = missing.slice(0, MAX_TRANSLATION_GENERATE);
			const generated = await generateStudyAids(
				todo.map((i) => texts[i]),
				{ apiKey: env.GEMINI_API_KEY || undefined, ai },
			);
			const writes: Promise<void>[] = [];
			generated.forEach((value, j) => {
				if (!value) return;
				const i = todo[j];
				aids[texts[i]] = value;
				writes.push(env.MISTAKES_KV.put(keys[i], JSON.stringify(value)));
				pending -= 1;
			});
			await Promise.all(writes);
			// Something failed (quota, outage): tell the client a retry may help.
			retry = pending > 0;
		}
	}

	return json({ aids, pending, retry });
}
