/**
 * 错题本背诵的中文翻译。做题时答错记下的题目，先按题目原文（加正确答案）
 * 在课本数据里查现成译文（见 memory-deck.ts 的 lookupMistakeGloss）。
 * 自己手打的单词/语法（type=word|grammar）不走任何模型：背诵页显示「翻译中…」，
 * 由助手通过 scripts/mistakes-*.mts 写入 KV（source=assistant），优先生效且不会被覆盖。
 * /api/mistake-translations 与 /api/mistake-study 只读 KV 缓存，不调用任何模型：
 * Gemini API 和 Cloudflare Workers AI 额度只给 news-learning 阅读项目用，这里不要接。
 */

export const MISTAKE_TRANSLATION_ENDPOINT = "/api/mistake-translations";
export const MISTAKE_TRANSLATION_KV_PREFIX = "mistake-cn:v1:";
export const MISTAKE_STUDY_ENDPOINT = "/api/mistake-study";
export const MISTAKE_STUDY_KV_PREFIX = "mistake-study:v1:";
export const MAX_TRANSLATION_TEXTS = 200;
export const MAX_TRANSLATION_TEXT_LENGTH = 600;

export type TranslationMap = Record<string, string>;

/** Manual notebook notes the learner typed in (not quiz mistakes). */
export const MANUAL_MISTAKE_TYPES = new Set(["word", "grammar"]);

export function isManualMistakeType(type: string | undefined): boolean {
	return MANUAL_MISTAKE_TYPES.has(String(type || ""));
}

/** Written by the assistant CLI. "workers-ai" / "gemini" only appear on older cached entries. */
export const ASSISTANT_SOURCE = "assistant" as const;
export type MistakeTranslationSource = typeof ASSISTANT_SOURCE | "workers-ai" | "gemini";

export type StudyAid = {
	reading?: string;
	/** 简体中文意思。空字符串表示已经问过、模型没有给出。 */
	cn?: string;
	example?: string;
	exampleCn?: string;
	/** `assistant` = human/assistant review; wins over any model cache. */
	source?: MistakeTranslationSource;
};

export type StudyAidMap = Record<string, StudyAid>;

export function normalizeTranslationSource(text: string): string {
	return String(text || "")
		.replace(/\r\n?/g, "\n")
		.trim()
		.slice(0, MAX_TRANSLATION_TEXT_LENGTH);
}

const ANSWER_LINE = /(?:^|\n)(?:正确答案|Correct answer)：\s*([^\n]+)/;

/** Split a notebook note into front (prompt) and back (answer) sides. */
export function mistakeStudyParts(m: { text?: string }): { jp: string; cn: string } {
	const text = String(m.text || "");
	const correct = text.match(ANSWER_LINE);
	const cn = correct ? correct[1].trim() : "";
	let jp = text
		.replace(/(?:\n|^)(?:你的答案|Your answer)：[\s\S]*$/, "")
		.replace(/(?:\n|^)(?:正确答案|Correct answer)：\s*[^\n]+/g, "")
		.trim();
	if (!jp) jp = text.split("\n")[0] || text;
	return { jp, cn };
}

/**
 * Text sent for translation: the prompt plus the correct answer (so a
 * fill-in-the-blank question is translated with the answer filled in),
 * never the learner's wrong answer.
 */
export function mistakeTranslationSource(m: { text?: string }): string {
	const { jp, cn } = mistakeStudyParts(m);
	return normalizeTranslationSource(cn ? `${jp}\n正确答案：${cn}` : jp);
}

export type TranslationRequest = {
	texts: string[];
	/** When false, only return KV cache (used for manual word/grammar notes). Default true. */
	generate?: boolean;
};

export function isTranslationRequest(value: unknown): value is TranslationRequest {
	if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
	const record = value as { texts?: unknown; generate?: unknown };
	const texts = record.texts;
	if (
		!(
			Array.isArray(texts) &&
			texts.length <= MAX_TRANSLATION_TEXTS &&
			texts.every((t) => typeof t === "string" && t.length <= MAX_TRANSLATION_TEXT_LENGTH * 2)
		)
	) {
		return false;
	}
	if (record.generate !== undefined && typeof record.generate !== "boolean") return false;
	return true;
}

export async function translationKey(text: string): Promise<string> {
	const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
	const hex = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
	return MISTAKE_TRANSLATION_KV_PREFIX + hex;
}

export function normalizeTranslation(v: unknown): string | null {
	if (typeof v === "string" && v.trim()) return v.trim().slice(0, 400);
	if (v && typeof v === "object" && !Array.isArray(v)) {
		const record = v as { cn?: unknown; translation?: unknown; meaning?: unknown };
		const text = [record.cn, record.translation, record.meaning].find((t) => typeof t === "string" && t.trim());
		if (typeof text === "string") return text.trim().slice(0, 400);
	}
	return null;
}

/** A short headword can take an example sentence. A full question already is one. */
export function mistakeNeedsExample(jp: string): boolean {
	const core = jp.replace(/[（(][^）)]*[）)]?/g, "").replace(/\s+/g, "");
	if (!core || core.length > 18) return false;
	if (/[。！？]/.test(jp) || /（\s*）|（　　）/.test(jp)) return false;
	if (/(です|ます|ました|ません)($|。)/.test(core) && core.length > 12) return false;
	return /[\u3040-\u30ff\u4e00-\u9fff]/.test(core);
}

export function normalizeStudyAid(value: unknown): StudyAid | null {
	if (!value || typeof value !== "object" || Array.isArray(value)) return null;
	const raw = value as {
		reading?: unknown;
		cn?: unknown;
		example?: unknown;
		exampleCn?: unknown;
		source?: unknown;
	};
	const aid: StudyAid = {};
	if (typeof raw.reading === "string") {
		const reading = raw.reading.replace(/[\s・]+/g, "");
		if (reading && /^[\u3040-\u30ffー]+$/.test(reading) && reading.length <= 80) aid.reading = reading;
	}
	if (typeof raw.cn === "string") {
		const cn = raw.cn.trim();
		aid.cn = cn && /[\u4e00-\u9fff]/.test(cn) && cn.length <= 120 ? cn : "";
	} else {
		aid.cn = "";
	}
	if (typeof raw.example === "string") {
		const example = raw.example.trim();
		if (example && /[\u3040-\u30ff\u4e00-\u9fff]/.test(example) && example.length <= 80) aid.example = example;
	}
	if (typeof raw.exampleCn === "string") {
		const exampleCn = raw.exampleCn.trim();
		if (exampleCn && exampleCn.length <= 80) aid.exampleCn = exampleCn;
	}
	if (raw.source === ASSISTANT_SOURCE) aid.source = ASSISTANT_SOURCE;
	else if (raw.source === "workers-ai" || raw.source === "gemini") aid.source = raw.source;
	if (!aid.reading && !aid.example && !aid.cn) return null;
	return aid;
}

/** Plain string (legacy AI) or `{ cn, source }` JSON written by the assistant CLI. */
export function parseStoredTranslation(value: string | null): { cn: string; source?: MistakeTranslationSource } | null {
	if (!value) return null;
	const trimmed = value.trim();
	if (!trimmed) return null;
	if (trimmed.startsWith("{")) {
		try {
			const parsed: unknown = JSON.parse(trimmed);
			if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
				const record = parsed as { cn?: unknown; source?: unknown };
				if (typeof record.cn === "string" && record.cn.trim()) {
					const source =
						record.source === ASSISTANT_SOURCE || record.source === "workers-ai" || record.source === "gemini"
							? record.source
							: undefined;
					return { cn: record.cn.trim().slice(0, 400), source };
				}
			}
		} catch {
			/* fall through: treat as plain Chinese */
		}
	}
	return { cn: trimmed.slice(0, 400) };
}

export function serializeTranslation(cn: string, source?: MistakeTranslationSource): string {
	const text = cn.trim().slice(0, 400);
	if (source === ASSISTANT_SOURCE) return JSON.stringify({ cn: text, source });
	return text;
}

export function serializeStudyAid(aid: StudyAid): string {
	return JSON.stringify(aid);
}

export function isAssistantTranslation(value: string | null): boolean {
	return parseStoredTranslation(value)?.source === ASSISTANT_SOURCE;
}

export function isAssistantStudyAid(value: string | null): boolean {
	return parseStoredStudyAid(value)?.source === ASSISTANT_SOURCE;
}

function toHiragana(text: string): string {
	return text.replace(/[\u30a1-\u30f6]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60));
}

/**
 * A generated reading is only shown for a single headword or phrase it fully
 * covers: notes listing several words ("曲がる\n回る") or with their own kana
 * line get a run-together or partial reading from the model, which reads worse
 * than none. Every kana run of the note must appear, in order, in the reading.
 */
export function studyReadingFits(jp: string, reading: string): boolean {
	const text = jp.trim();
	if (!text || !reading || /[\s\u3000]/.test(text) || !/[\u4e00-\u9fff々]/.test(text)) return false;
	if (reading.length > text.length * 4 + 4) return false;
	const kanaRuns = toHiragana(text).match(/[\u3041-\u3096ー]+/g) || [];
	let at = 0;
	for (const run of kanaRuns) {
		const found = reading.indexOf(run, at);
		if (found < 0) return false;
		at = found + run.length;
	}
	return true;
}

export function parseStoredStudyAid(value: string | null): StudyAid | null {
	if (!value) return null;
	try {
		return normalizeStudyAid(JSON.parse(value));
	} catch {
		return null;
	}
}

export async function studyAidKey(text: string): Promise<string> {
	const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(normalizeTranslationSource(text)));
	const hex = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
	return MISTAKE_STUDY_KV_PREFIX + hex;
}
