/**
 * N2 听解：第1・2章正文中文翻译 + 每道题听力原文的 N3+ 生词注释。
 *
 *   node --experimental-strip-types scripts/generate-n2-listening-support.mts [--fetch] [--only=body|gloss]
 *
 * --fetch（已停用：Gemini key 只用于 news-learning 文章翻译，带 --fetch 会直接报错）调用 Gemini 补齐 scripts/n2-listening-support.json 里缺的条目（已有条目不覆盖，
 * 人工校对后的 JSON 是唯一来源）；不带 --fetch 时只根据 JSON 重新生成
 * app/data/listening-n2-body-support.ts 与 app/data/listening-n2-transcript-glosses.ts。
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";

import type { ListeningLesson, ListeningLessonBlock } from "../app/data/listening-n3-lesson-types.ts";
import { chapter1Lessons } from "../app/data/listening-n2-lessons-ch1.ts";
import { chapter2Lessons } from "../app/data/listening-n2-lessons-ch2.ts";
import { chapter3Lessons } from "../app/data/listening-n2-lessons-ch3.ts";
import { chapter4Lessons } from "../app/data/listening-n2-lessons-ch4.ts";
import { chapter5Lessons } from "../app/data/listening-n2-lessons-ch5.ts";
import { listeningQuestionSupport } from "../app/data/listening-n3-question-support.ts";

type Gloss = { w: string; r: string; cn: string; lv?: string };
type Store = { body: Record<string, string>; glosses: Record<string, Gloss[][]> };

const JSON_PATH = new URL("./n2-listening-support.json", import.meta.url);
const BODY_TS = new URL("../app/data/listening-n2-body-support.ts", import.meta.url);
const GLOSS_TS = new URL("../app/data/listening-n2-transcript-glosses.ts", import.meta.url);
const MODEL = process.env.GEMINI_MODEL || "gemini-pro-latest";
const fetchMode = process.argv.includes("--fetch");
const only = process.argv.find((a) => a.startsWith("--only="))?.slice(7);

const chapters: Record<number, readonly ListeningLesson[]> = {
	1: chapter1Lessons,
	2: chapter2Lessons,
	3: chapter3Lessons,
	4: chapter4Lessons,
	5: chapter5Lessons,
};

const KANA = /[\u3040-\u30ff]/u;
/** 发音/听写练习：选项本身就是答案，翻译会泄题，保持原样。 */
const DRILL_QUESTIONS = new Set(["1-1:1番", "1-1:2番", "1-1:3番", "1-5:問題Ⅰ"]);

/** 第1・2章正文里需要中文翻译的日语字符串（与 LessonBlocks 渲染位置一一对应）。 */
export function bodyStrings(): string[] {
	const out = new Set<string>();
	const add = (text?: string) => {
		if (text && KANA.test(text)) out.add(text);
	};
	for (const ch of [1, 2]) {
		chapters[ch].forEach((lesson, i) => {
			for (const block of lesson.blocks as readonly ListeningLessonBlock[]) {
				switch (block.type) {
					case "h":
					case "p":
						if (!block.cn) add(block.jp);
						break;
					case "example":
						add(block.title);
						block.lines.forEach(add);
						break;
					case "table":
						add(block.title);
						block.rows.forEach((row) => row.forEach(add));
						break;
					case "box":
						add(block.title);
						block.items.forEach((item) => {
							add(item.title);
							item.lines.forEach(add);
							add(item.note);
						});
						break;
					case "aside":
						add(block.text);
						break;
					case "note":
						add(block.text);
						break;
					case "q": {
						const drill = DRILL_QUESTIONS.has(`${ch}-${i + 1}:${block.label}`);
						add(block.prompt);
						if (!drill) {
							add(block.example);
							block.options?.forEach(add);
						}
						add(block.note);
						break;
					}
				}
			}
		});
	}
	return [...out];
}

export function transcriptItems(): { key: string; index: number; jp: string; cn: string }[] {
	const items: { key: string; index: number; jp: string; cn: string }[] = [];
	for (const [ch, lessons] of Object.entries(chapters)) {
		lessons.forEach((lesson, i) => {
			const key = `${ch}-${i + 1}`;
			[...listeningQuestionSupport(lesson).values()].forEach((s, index) => {
				if (s.transcript) items.push({ key, index, jp: s.transcript, cn: s.transcript_cn || "" });
			});
		});
	}
	return items;
}

const BODY_PROMPT = `你是 JLPT N2 听力教材的中文译者。下面 JSON 数组里的每个字符串都来自日语听力教材正文（讲解、例句、表格单元格、题目说明、选项、注释）。
请为每个字符串给出简体中文翻译，规则：
- 译文自然、准确、符合考试语境，简洁；保留编号（①②、1 2 3、A：B：、男：女：）、符号（→ ＝ ／ ○ × 〜 「」）和原有换行（\\n）结构。
- 单词或短语（如「しゅちょう（主張）」「〜わけだ」「ほっと」）：只给中文意思，如「主张」。
- 已经夹带的英文/中文说明不要重复翻译，只翻译其中的日语部分；如果字符串本身已经是中文、或全部日语都已有中文对应，返回空字符串 ""。
- 页码、MP3 等标记照抄。只输出译文本身，不要解释。
按相同顺序返回同样长度的 JSON 字符串数组。`;

const GLOSS_PROMPT = `你是 JLPT 老师。学习者是中文母语、日语约 N4 水平。下面是一段 JLPT N2 听力题原文（附整段中文译文供参考）。
请列出原文中对 N4 学习者来说是生词或难词的词语：JLPT N3、N2、N1 级别的词汇，以及口语惯用表达/敬语（如「かしこまりました」「〜わけにはいかない」）。
规则：
- 跳过 N5、N4 基础词（如 行く、会社、電話、大丈夫、忘れる、準備）、人名地名、数字、「男：」「1番」等标签。
- 每个词只列一次，按在原文中出现的顺序；w 用原文中的写法的辞书形（动词/形容词还原为原形，如「任されること」→「任せる」「任される」取原文实际用的那个的原形），r 为平假名读音（片假名外来语 r 照写片假名），cn 为该词在本文语境中的简洁中文意思（不超过 14 个字），lv 为 "N3"、"N2" 或 "N1"（口语表达按难度归入最接近的级别）。
- 数量视文本长度而定，一般 3～15 个，长文可更多；不要为了凑数列简单词。
返回 JSON 数组，每项 {"w":..., "r":..., "cn":..., "lv":...}。`;

async function gemini(prompt: string, payload: unknown, schema: unknown): Promise<unknown> {
	// Alan's rule: the Gemini key is only for news-learning article translation.
	throw new Error("Refusing to call Gemini: GEMINI_API_KEY is reserved for translating news articles on news-learning (news.ki-toko.com) only. Generate this content without the Gemini API.");
	// eslint-disable-next-line no-unreachable
	const apiKey = process.env.GEMINI_API_KEY;
	if (!apiKey) throw new Error("GEMINI_API_KEY is required for --fetch");
	for (let attempt = 1; attempt <= 3; attempt += 1) {
		const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL)}:generateContent`, {
			method: "POST",
			headers: { "content-type": "application/json", "x-goog-api-key": apiKey },
			body: JSON.stringify({
				contents: [{ role: "user", parts: [{ text: `${prompt}\n\n${JSON.stringify(payload)}` }] }],
				generationConfig: { temperature: 0.2, responseMimeType: "application/json", responseSchema: schema },
			}),
		});
		if (res.ok) {
			const data = (await res.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
			const raw = data.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
			try {
				return JSON.parse(raw);
			} catch {
				/* retry */
			}
		} else {
			console.error(`gemini ${res.status} (attempt ${attempt})`);
		}
		await new Promise((r) => setTimeout(r, 2000 * attempt));
	}
	throw new Error("gemini failed");
}

function load(): Store {
	if (!existsSync(JSON_PATH)) return { body: {}, glosses: {} };
	return JSON.parse(readFileSync(JSON_PATH, "utf8")) as Store;
}

function save(store: Store) {
	writeFileSync(JSON_PATH, `${JSON.stringify(store, null, "\t")}\n`);
}

async function fetchMissing(store: Store) {
	if (only !== "gloss") {
		const todo = bodyStrings().filter((s) => !(s in store.body));
		for (let i = 0; i < todo.length; i += 30) {
			const batch = todo.slice(i, i + 30);
			const out = (await gemini(BODY_PROMPT, batch, { type: "ARRAY", items: { type: "STRING" } })) as string[];
			if (!Array.isArray(out) || out.length !== batch.length) throw new Error("body batch length mismatch");
			batch.forEach((s, j) => (store.body[s] = String(out[j] || "").trim()));
			save(store);
			console.log(`body ${Math.min(i + 30, todo.length)}/${todo.length}`);
		}
	}
	if (only !== "body") {
		const schema = {
			type: "ARRAY",
			items: {
				type: "OBJECT",
				properties: { w: { type: "STRING" }, r: { type: "STRING" }, cn: { type: "STRING" }, lv: { type: "STRING" } },
				required: ["w", "r", "cn", "lv"],
			},
		};
		const items = transcriptItems();
		let done = 0;
		const queue = items.filter((it) => !store.glosses[it.key]?.[it.index]?.length);
		const worker = async () => {
			for (let it = queue.shift(); it; it = queue.shift()) {
				const out = (await gemini(GLOSS_PROMPT, { 原文: it.jp, 译文: it.cn }, schema)) as Gloss[];
				(store.glosses[it.key] ??= [])[it.index] = out.map((g) => ({ w: g.w.trim(), r: g.r.trim(), cn: g.cn.trim(), lv: g.lv.trim() }));
				save(store);
				done += 1;
				console.log(`gloss ${it.key}#${it.index} ${out.length} words (${done}/${items.length})`);
			}
		};
		await Promise.all([worker(), worker(), worker(), worker()]);
	}
}

function emit(store: Store) {
	// 空串（原文已含中文）和与原文相同、不含汉字的“译文”（如「ている → てる」）不输出。
	const useful = (s: string) => Boolean(store.body[s]) && store.body[s] !== s && /[\u4e00-\u9fff]/u.test(store.body[s]);
	const body = Object.fromEntries(bodyStrings().filter(useful).map((s) => [s, store.body[s]]));
	writeFileSync(
		BODY_TS,
		`// Generated by scripts/generate-n2-listening-support.mts from scripts/n2-listening-support.json. Do not edit directly.
/** N2 听解第1・2章正文：日语原文 → 中文翻译。 */
export const listeningN2BodyCn: Readonly<Record<string, string>> = ${JSON.stringify(body, null, "\t")};

export function listeningN2BodyTranslation(text: string): string | undefined {
	return listeningN2BodyCn[text] || undefined;
}
`,
	);
	const glosses: Record<string, Gloss[][]> = {};
	for (const it of transcriptItems()) (glosses[it.key] ??= [])[it.index] = store.glosses[it.key]?.[it.index] ?? [];
	for (const list of Object.values(glosses)) for (let i = 0; i < list.length; i += 1) list[i] ??= [];
	writeFileSync(
		GLOSS_TS,
		`// Generated by scripts/generate-n2-listening-support.mts from scripts/n2-listening-support.json. Do not edit directly.
/** 生词注释：w 词语，r 读音，cn 中文意思，lv JLPT 级别（只收 N3 及以上）。 */
export type ListeningGloss = { readonly w: string; readonly r: string; readonly cn: string; readonly lv?: string };

/** key 为「章-节」，数组下标与该节 listeningQuestionSupport 的题目顺序一致（没有原文的题为空数组）。 */
export const listeningN2TranscriptGlosses: Readonly<Record<string, readonly (readonly ListeningGloss[])[]>> = ${JSON.stringify(glosses, null, "\t")};

export function listeningN2Glosses(chapter: number, section: number): readonly (readonly ListeningGloss[])[] {
	return listeningN2TranscriptGlosses[\`\${chapter}-\${section}\`] ?? [];
}
`,
	);
	console.log(`body: ${Object.keys(body).length} strings; glosses: ${Object.values(glosses).flat().length} transcripts, ${Object.values(glosses).flat(2).length} words`);
}

if (import.meta.url === new URL(process.argv[1] ?? "", "file://").href) {
	const store = load();
	if (fetchMode) await fetchMissing(store);
	emit(store);
}
