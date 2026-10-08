/**
 * 错题本背诵的中文翻译。做题时答错记下的题目，先按题目原文（加正确答案）
 * 在课本数据里查现成译文（见 memory-deck.ts 的 lookupMistakeGloss）；
 * 课本里没有的自由笔记（自己手打的单词/语法），由 /api/mistake-translations 生成一次后缓存在 KV：
 * 依次尝试 Gemini、Gemini lite、Workers AI，任何一个成功即可。
 */

export const MISTAKE_TRANSLATION_ENDPOINT = "/api/mistake-translations";
export const MISTAKE_TRANSLATION_KV_PREFIX = "mistake-cn:v1:";
export const MISTAKE_STUDY_ENDPOINT = "/api/mistake-study";
export const MISTAKE_STUDY_KV_PREFIX = "mistake-study:v1:";
export const MAX_TRANSLATION_TEXTS = 200;
export const MAX_TRANSLATION_TEXT_LENGTH = 600;
/** Misses translated per request; the rest come back on the next open. */
export const MAX_TRANSLATION_GENERATE = 60;
const GEMINI_BATCH = 25;
export const DEFAULT_GEMINI_MODEL = "gemini-flash-latest";

export type TranslationMap = Record<string, string>;

export type StudyAid = {
	reading?: string;
	/** 简体中文意思。空字符串表示已经问过、模型没有给出。 */
	cn?: string;
	example?: string;
	exampleCn?: string;
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

/** Gemini models tried in order; the lite model has its own quota. */
export const FALLBACK_GEMINI_MODEL = "gemini-flash-lite-latest";
export const GEMINI_MODELS = [DEFAULT_GEMINI_MODEL, FALLBACK_GEMINI_MODEL];
/** Last resort when Gemini is rate-limited or down (Workers AI binding `AI`). */
export const WORKERS_AI_MODEL = "@cf/openai/gpt-oss-120b";

/** The subset of the Workers AI binding we use (also satisfied by a REST shim in scripts). */
export type AiRunner = { run: (model: string, input: Record<string, unknown>) => Promise<unknown> };

export type GenerateOptions = {
	apiKey?: string;
	ai?: AiRunner | null;
	/** Gemini models to try, in order. Defaults to GEMINI_MODELS. */
	models?: string[];
	fetchImpl?: Fetcher;
	log?: (message: string) => void;
};

type Provider = { name: string; run: (batch: string[]) => Promise<unknown> };

function defaultLog(message: string) {
	console.warn(`[mistake-ai] ${message}`);
}

/** Pull the JSON array out of a model reply (tolerates ```json fences and chatter). */
export function parseJsonArray(raw: unknown): unknown[] | null {
	if (Array.isArray(raw)) return raw;
	if (typeof raw !== "string") return null;
	const text = raw.replace(/```(?:json)?/gi, "").trim();
	const start = text.indexOf("[");
	const end = text.lastIndexOf("]");
	if (start < 0 || end <= start) return null;
	try {
		const parsed: unknown = JSON.parse(text.slice(start, end + 1));
		return Array.isArray(parsed) ? parsed : null;
	} catch {
		return null;
	}
}

/** Text of a Workers AI reply: chat-completions, Responses API or legacy `{ response }`. */
export function workersAiText(result: unknown): unknown {
	if (typeof result === "string" || Array.isArray(result)) return result;
	if (!result || typeof result !== "object") return null;
	const r = result as {
		response?: unknown;
		choices?: { message?: { content?: unknown } }[];
		output?: { type?: string; content?: { text?: unknown }[] }[];
		output_text?: unknown;
	};
	if (r.response !== undefined && r.response !== null) return r.response;
	const content = r.choices?.[0]?.message?.content;
	if (typeof content === "string") return content;
	if (typeof r.output_text === "string") return r.output_text;
	if (Array.isArray(r.output)) {
		const text = r.output
			.flatMap((o) => (o.type === "reasoning" ? [] : o.content || []))
			.map((c) => (typeof c.text === "string" ? c.text : ""))
			.join("");
		if (text) return text;
	}
	return null;
}

function providers(prompt: string, schema: unknown, opts: GenerateOptions): Provider[] {
	const log = opts.log || defaultLog;
	const fetchImpl = opts.fetchImpl || fetch;
	const list: Provider[] = [];
	if (opts.apiKey) {
		for (const model of opts.models?.length ? opts.models : GEMINI_MODELS) {
			list.push({
				name: model,
				run: async (batch) => {
					const res = await fetchImpl(
						`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
						{
							method: "POST",
							headers: { "content-type": "application/json", "x-goog-api-key": opts.apiKey as string },
							body: JSON.stringify({
								contents: [{ role: "user", parts: [{ text: `${prompt}\n\n${JSON.stringify(batch)}` }] }],
								generationConfig: {
									temperature: 0.2,
									responseMimeType: "application/json",
									responseSchema: schema,
								},
							}),
						},
					);
					if (!res.ok) {
						const detail = await res.text().catch(() => "");
						log(`gemini ${model} HTTP ${res.status}: ${detail.replace(/\s+/g, " ").slice(0, 200)}`);
						return null;
					}
					const data = (await res.json()) as {
						candidates?: { content?: { parts?: { text?: string }[] } }[];
					};
					return data.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
				},
			});
		}
	}
	if (opts.ai) {
		const ai = opts.ai;
		list.push({
			name: WORKERS_AI_MODEL,
			run: async (batch) =>
				workersAiText(
					await ai.run(WORKERS_AI_MODEL, {
						messages: [
							{ role: "system", content: `${prompt}\n只输出 JSON 数组本身，不要 Markdown。` },
							{ role: "user", content: JSON.stringify(batch) },
						],
						max_tokens: 6000,
						temperature: 0.2,
						reasoning: { effort: "low" },
					}),
				),
		});
	}
	return list;
}

/**
 * Run each batch through Gemini, then the lite model, then Workers AI. Items a
 * provider leaves empty (or a provider that errors / is rate-limited) fall
 * through to the next one, so one exhausted quota no longer means "no
 * translation". Failures are logged so they show up in Workers Observability.
 */
async function generateWithFallback<T>(
	texts: string[],
	prompt: string,
	schema: unknown,
	normalize: (value: unknown) => T | null,
	opts: GenerateOptions,
): Promise<(T | null)[]> {
	const log = opts.log || defaultLog;
	const chain = providers(prompt, schema, opts);
	const out: (T | null)[] = [];
	for (let i = 0; i < texts.length; i += GEMINI_BATCH) {
		const batch = texts.slice(i, i + GEMINI_BATCH);
		const result: (T | null)[] = batch.map(() => null);
		let remaining = batch.map((_, j) => j);
		for (const provider of chain) {
			if (!remaining.length) break;
			const sub = remaining.map((j) => batch[j]);
			try {
				const parsed = parseJsonArray(await provider.run(sub));
				if (!parsed) continue;
				if (parsed.length !== sub.length) {
					log(`${provider.name} returned ${parsed.length} items for ${sub.length}`);
					continue;
				}
				parsed.forEach((value, k) => {
					result[remaining[k]] = normalize(value);
				});
			} catch (error) {
				log(`${provider.name} failed: ${String((error as Error)?.message || error).slice(0, 200)}`);
				continue;
			}
			remaining = remaining.filter((j) => result[j] === null);
		}
		if (remaining.length) log(`${remaining.length}/${batch.length} items left without a result`);
		out.push(...result);
	}
	return out;
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

export function generateTranslations(texts: string[], opts: GenerateOptions): Promise<(string | null)[]> {
	return generateWithFallback(texts, PROMPT, { type: "ARRAY", items: { type: "STRING" } }, normalizeTranslation, opts);
}

/** Gemini-only translation (kept for the backfill script and tests). */
export function geminiTranslate(
	texts: string[],
	apiKey: string,
	{ model = DEFAULT_GEMINI_MODEL, fetchImpl = fetch }: { model?: string; fetchImpl?: Fetcher } = {},
): Promise<(string | null)[]> {
	return generateTranslations(texts, { apiKey, models: [model], fetchImpl });
}

const STUDY_PROMPT = `你是日语老师。下面是一位中文母语的学习者在「错题本」里记下的条目（JSON 数组）。
请为每一条返回一个对象，字段如下：
- reading：词头或整句的平假名读音，不要汉字、不要罗马字、不要空格。条目本身已经全是假名时返回空字符串。
- cn：条目的简体中文意思。单词给词义，句子或填空题把正确答案填进去后翻译整句。不要重复条目里已有的中文。没有日语可译时返回空字符串。
- example：用条目里的单词或语法造一个简短、自然的日语例句，不超过 40 个字。条目本身已经是完整句子时返回空字符串。
- exampleCn：例句的简体中文。没有例句时返回空字符串。
不要解释。按相同顺序返回同样长度的 JSON 对象数组。`;

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
	const raw = value as { reading?: unknown; cn?: unknown; example?: unknown; exampleCn?: unknown };
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
	if (!aid.reading && !aid.example && !aid.cn) return null;
	return aid;
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

const STUDY_SCHEMA = {
	type: "ARRAY",
	items: {
		type: "OBJECT",
		properties: {
			reading: { type: "STRING" },
			cn: { type: "STRING" },
			example: { type: "STRING" },
			exampleCn: { type: "STRING" },
		},
		required: ["reading", "cn", "example", "exampleCn"],
	},
};

export function generateStudyAids(texts: string[], opts: GenerateOptions): Promise<(StudyAid | null)[]> {
	return generateWithFallback(texts, STUDY_PROMPT, STUDY_SCHEMA, normalizeStudyAid, opts);
}

/** Gemini-only study aids (kept for scripts and tests). */
export function geminiStudyAids(
	texts: string[],
	apiKey: string,
	{ model = DEFAULT_GEMINI_MODEL, fetchImpl = fetch }: { model?: string; fetchImpl?: Fetcher } = {},
): Promise<(StudyAid | null)[]> {
	return generateStudyAids(texts, { apiKey, models: [model], fetchImpl });
}
