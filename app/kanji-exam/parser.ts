import type { KanjiExamBatch } from "../data/kanji-exam";

export type KanjiExamImageInput = {
	name: string;
	mimeType: "image/jpeg" | "image/png" | "image/heic" | "image/heif";
	dataBase64: string;
};

export type KanjiExamParseRequest = {
	images: KanjiExamImageInput[];
	batchTitle?: string;
	provider?: string;
};

export type KanjiExamParseResult = {
	batch: KanjiExamBatch;
	warnings: string[];
	requiresReview: true;
};

export type KanjiExamParserContext = {
	apiKey: string;
	model?: string;
};

/**
 * Provider adapter boundary for future Gemini/OpenAI/other vision models.
 * The provider may extract printed content, but the result must stay in a
 * review state before it is added to the permanent question bank.
 */
export interface KanjiExamVisionProvider {
	id: string;
	parse(request: KanjiExamParseRequest, context: KanjiExamParserContext): Promise<KanjiExamParseResult>;
}

export const KANJI_EXAM_PARSE_LIMITS = {
	maxImages: 20,
	maxImageBytes: 8_000_000,
} as const;

export function validateKanjiExamParseRequest(value: unknown): string | null {
	if (!value || typeof value !== "object" || Array.isArray(value)) return "expected a JSON object";
	const request = value as Partial<KanjiExamParseRequest>;
	if (!Array.isArray(request.images) || request.images.length === 0) return "at least one image is required";
	if (request.images.length > KANJI_EXAM_PARSE_LIMITS.maxImages) return `at most ${KANJI_EXAM_PARSE_LIMITS.maxImages} images are allowed`;
	for (const image of request.images) {
		if (!image || typeof image !== "object") return "invalid image";
		if (typeof image.name !== "string" || !image.name.trim()) return "image name is required";
		if (!(["image/jpeg", "image/png", "image/heic", "image/heif"] as string[]).includes(image.mimeType)) return "unsupported image type";
		if (typeof image.dataBase64 !== "string" || !image.dataBase64) return "image data is required";
		if (image.dataBase64.length > Math.ceil(KANJI_EXAM_PARSE_LIMITS.maxImageBytes * 4 / 3) + 16) return "image is too large";
	}
	return null;
}

export function parserConfiguration(env: Record<string, unknown>) {
	const provider = typeof env.KANJI_EXAM_OCR_PROVIDER === "string" ? env.KANJI_EXAM_OCR_PROVIDER.trim().toLowerCase() : "";
	const model = typeof env.KANJI_EXAM_OCR_MODEL === "string" ? env.KANJI_EXAM_OCR_MODEL.trim() : "";
	const hasKey = typeof env.KANJI_EXAM_OCR_API_KEY === "string" && env.KANJI_EXAM_OCR_API_KEY.length > 0;
	return { provider: provider || null, model: model || null, configured: Boolean(provider && hasKey) };
}
