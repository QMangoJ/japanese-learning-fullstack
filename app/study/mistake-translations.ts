/**
 * 错题本背诵的中文翻译。错题是用户自由输入的笔记，没有自带译文，
 * 所以由 /api/mistake-translations 用 Gemini 生成一次后缓存在 KV。
 */

export const MISTAKE_TRANSLATION_ENDPOINT = "/api/mistake-translations";
export const MISTAKE_TRANSLATION_KV_PREFIX = "mistake-cn:v1:";
export const MAX_TRANSLATION_TEXTS = 200;
export const MAX_TRANSLATION_TEXT_LENGTH = 600;
/** Misses translated per request; the rest come back on the next open. */
export const MAX_TRANSLATION_GENERATE = 60;
const GEMINI_BATCH = 25;
export const DEFAULT_GEMINI_MODEL = "gemini-flash-latest";

export type TranslationMap = Record<string, string>;

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

export function isTranslationRequest(value: unknown): value is { texts: string[] } {
	if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
	const texts = (value as { texts?: unknown }).texts;
	return (
		Array.isArray(texts) &&
		texts.length <= MAX_TRANSLATION_TEXTS &&
		texts.every((t) => typeof t === "string" && t.length <= MAX_TRANSLATION_TEXT_LENGTH * 2)
	);
}

export async function translationKey(text: string): Promise<string> {
	const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
	const hex = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
	return MISTAKE_TRANSLATION_KV_PREFIX + hex;
}

const PROMPT = `你是日语老师。下面是一位中文母语的日语学习者在「错题本」里记下的条目（JSON 数组）。
请为每一条给出简体中文翻译，规则：
- 单词/短语：给出简洁的中文意思（可带词性或常见用法，不超过 30 字）。条目里的假名读音、括号注音不用翻译。
- 句子或语法：翻译成自然的中文整句。
- 含「（　　）」空格并附有「正确答案：X」的题目：把正确答案填进空格后翻译整句，不要翻译错误答案。
- 条目里已经夹带的中文说明不要重复，只翻译日语部分。
- 只输出译文本身，不要解释。
按相同顺序返回同样长度的 JSON 字符串数组。`;

type Fetcher = typeof fetch;

export async function geminiTranslate(
	texts: string[],
	apiKey: string,
	{ model = DEFAULT_GEMINI_MODEL, fetchImpl = fetch }: { model?: string; fetchImpl?: Fetcher } = {},
): Promise<(string | null)[]> {
	const out: (string | null)[] = [];
	for (let i = 0; i < texts.length; i += GEMINI_BATCH) {
		const batch = texts.slice(i, i + GEMINI_BATCH);
		let result: (string | null)[] = batch.map(() => null);
		try {
			const res = await fetchImpl(
				`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
				{
					method: "POST",
					headers: { "content-type": "application/json", "x-goog-api-key": apiKey },
					body: JSON.stringify({
						contents: [{ role: "user", parts: [{ text: `${PROMPT}\n\n${JSON.stringify(batch)}` }] }],
						generationConfig: {
							temperature: 0.2,
							responseMimeType: "application/json",
							responseSchema: { type: "ARRAY", items: { type: "STRING" } },
						},
					}),
				},
			);
			if (res.ok) {
				const data = (await res.json()) as {
					candidates?: { content?: { parts?: { text?: string }[] } }[];
				};
				const raw = data.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
				const parsed: unknown = JSON.parse(raw);
				if (Array.isArray(parsed) && parsed.length === batch.length) {
					result = parsed.map((v) => (typeof v === "string" && v.trim() ? v.trim().slice(0, 400) : null));
				}
			}
		} catch {
			/* leave this batch untranslated; it is retried next time */
		}
		out.push(...result);
	}
	return out;
}
