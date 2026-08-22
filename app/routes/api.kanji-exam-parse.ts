import type { AppLoadContext } from "react-router";

import { json } from "../auth/http";
import { parserConfiguration, validateKanjiExamParseRequest } from "../kanji-exam/parser";

type Args = { request: Request; context: AppLoadContext };

export async function loader({ context }: Args) {
	const status = parserConfiguration(context.cloudflare.env as unknown as Record<string, unknown>);
	return json({
		...status,
		endpointVersion: 1,
		supportedImageTypes: ["image/jpeg", "image/png", "image/heic", "image/heif"],
		reviewRequired: true,
	});
}

export async function action({ request, context }: Args) {
	if (request.method !== "POST") return json({ error: "method not allowed" }, { status: 405 });
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return json({ error: "invalid json" }, { status: 400 });
	}
	const validationError = validateKanjiExamParseRequest(body);
	if (validationError) return json({ error: validationError }, { status: 400 });

	const status = parserConfiguration(context.cloudflare.env as unknown as Record<string, unknown>);
	if (!status.configured) {
		return json(
			{
				error: "parser provider is not configured",
				code: "KANJI_EXAM_PARSER_NOT_CONFIGURED",
				hint: "Configure KANJI_EXAM_OCR_PROVIDER and KANJI_EXAM_OCR_API_KEY, then register its adapter.",
			},
			{ status: 503 },
		);
	}

	return json(
		{
			error: `provider adapter '${status.provider}' is not installed`,
			code: "KANJI_EXAM_PROVIDER_ADAPTER_MISSING",
		},
		{ status: 501 },
	);
}
