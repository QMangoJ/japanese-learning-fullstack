/**
 * N2 语法：「れい」「！」短语中文、「◆」说明中文，以及每日练习完整句的语法拆解与 N3+ 生词。
 *
 *   GEMINI_API_KEY=... node --experimental-strip-types scripts/generate-n2-grammar-breakdowns.mts [--fetch] [--weeks=2]
 *
 * --fetch 调用 Gemini 补齐 scripts/n2-grammar-breakdowns.json 里缺的条目（已有条目不覆盖；
 * 人工校对后的 JSON 是唯一来源）。不带 --fetch 时只校验并输出 public/data/n2-grammar-breakdowns.json。
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";

export type Gloss = { w: string; r: string; cn: string; lv?: string };
export type Breakdown = { patterns: { p: string; cn: string }[]; structure: string; words: Gloss[] };
type Store = {
	weeks: number[];
	rei: Record<string, string[]>;
	bang: Record<string, string[]>;
	tips: Record<string, string>;
	questions: Record<string, Record<string, Breakdown>>;
};

const root = new URL("../", import.meta.url);
const SOURCE = new URL("scripts/n2-grammar-breakdowns.json", root);
const OUTPUT = new URL("public/data/n2-grammar-breakdowns.json", root);
const MODEL = process.env.GEMINI_MODEL || "gemini-pro-latest";
const fetchMode = process.argv.includes("--fetch");
const weeksArg = process.argv.find((a) => a.startsWith("--weeks="))?.slice(8);

const dataFile = readdirSync(new URL("public/data/", root)).find((f) => /^n2grammar\.[0-9a-f]+\.json$/.test(f));
if (!dataFile) throw new Error("n2grammar data file not found");
const grammar = JSON.parse(readFileSync(new URL(`public/data/${dataFile}`, root), "utf8"));
const daily = JSON.parse(readFileSync(new URL("public/data/n2-grammar-daily-explanations.json", root), "utf8"));

/** れい 例：「生きがいを感じる／苦労のしがいが ある・ない」按「／」拆成短语。 */
export function reiPhrases(text: string): string[] {
	return text.split("／").map((s) => s.trim()).filter(Boolean);
}

export function weekDays(week: number): any[] {
	return grammar.weeks.find((w: any) => w.n === week)?.days || [];
}

export function reiNotes(weeks: number[]): { key: string; text: string; pattern: string }[] {
	return notesOf(weeks, "れい");
}

/** 「れい」例子、「！」接续/误用例、「◆」用法说明。 */
export function notesOf(weeks: number[], type: string): { key: string; text: string; pattern: string }[] {
	const out: { key: string; text: string; pattern: string }[] = [];
	for (const week of weeks)
		for (const day of weekDays(week))
			(day.points || []).forEach((p: any) => {
				for (const nt of p.notes || []) if (nt.type === type) out.push({ key: `w${week}d${day.day}`, text: nt.text, pattern: p.pattern });
			});
	return out;
}

export function questions(weeks: number[]) {
	const out: { key: string; n: number; item: any; day: any }[] = [];
	for (const week of weeks)
		for (const day of weekDays(week)) {
			const key = `w${week}d${day.day}`;
			for (const item of daily[key]?.items || []) if (item.completed) out.push({ key, n: item.n, item, day });
		}
	return out;
}

const REI_PROMPT = `你是 JLPT N2 语法老师。下面 JSON 是一个语法点（pattern）以及它的「れい」例子短语数组。
请为每个短语给出简洁、自然的简体中文翻译（一般不超过 16 个字）。
- 「ある・ない」这类并列写法译成「有/没有…」的形式，如「苦労のしがいが ある・ない」→「辛苦值得／不值得」。
- 「（する）」等括号保留其含义即可；只输出译文本身。
按相同顺序返回同样长度的 JSON 字符串数组。`;

const Q_PROMPT = `你是 JLPT N2 语法老师，学习者是中文母语、日语约 N4 水平。下面给出一道 N2 语法练习题的完整句、中文译文、正确答案，以及当天的语法点列表。
请输出 JSON：
- patterns：句中关键语法/句型，第一项必须是本题考查的语法点（从当天语法点中找出与正确答案对应的那个，写成句中实际用到的形式，如「〜たかいがあって」）；其余列出句中其他值得注意的 N3 及以上语法（如「〜なんて」「〜ずに」「〜ないんじゃありませんか」），最多 4 项。每项 {p: 日语句型, cn: 简洁中文意思（不超过 20 字）}。
- structure：一行中文说明句子结构，用「＋」「→」把句子按意群拆开，每段日语后用（）写中文，如「遠くまで来た（大老远跑来）＋かいがあって（没白费）→ さがしていたものが見つかった（找到了要找的东西）」。不超过 90 字。
- words：句中对 N4 学习者是生词的词：JLPT N3、N2、N1 词汇（跳过 N5/N4 基础词，如 会社、顔、勉強、病気、薬、料理、食べる）。每项 {w: 辞书形, r: 平假名读音, cn: 本句语境下的简洁中文（不超过 12 字）, lv: "N3"|"N2"|"N1"}。没有就返回空数组。不要把语法点本身放进 words。`;

async function gemini(prompt: string, payload: unknown, schema: unknown): Promise<any> {
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
			try {
				return JSON.parse(data.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "");
			} catch {
				/* retry */
			}
		} else console.error(`gemini ${res.status} (attempt ${attempt})`);
		await new Promise((r) => setTimeout(r, 2000 * attempt));
	}
	throw new Error("gemini failed");
}

function load(): Store {
	if (!existsSync(SOURCE)) return { weeks: [], rei: {}, bang: {}, tips: {}, questions: {} };
	const store = JSON.parse(readFileSync(SOURCE, "utf8")) as Store;
	store.bang ??= {};
	store.tips ??= {};
	return store;
}
function save(store: Store) {
	writeFileSync(SOURCE, `${JSON.stringify(store, null, "\t")}\n`);
}

const GLOSS = { type: "OBJECT", properties: { w: { type: "STRING" }, r: { type: "STRING" }, cn: { type: "STRING" }, lv: { type: "STRING" } }, required: ["w", "r", "cn", "lv"] };
const BREAKDOWN = {
	type: "OBJECT",
	properties: {
		patterns: { type: "ARRAY", items: { type: "OBJECT", properties: { p: { type: "STRING" }, cn: { type: "STRING" } }, required: ["p", "cn"] } },
		structure: { type: "STRING" },
		words: { type: "ARRAY", items: GLOSS },
	},
	required: ["patterns", "structure", "words"],
};

async function fetchMissing(store: Store, weeks: number[]) {
	for (const note of reiNotes(weeks)) {
		if (store.rei[note.text]?.length) continue;
		const phrases = reiPhrases(note.text);
		const out = await gemini(REI_PROMPT, { pattern: note.pattern, phrases }, { type: "ARRAY", items: { type: "STRING" } });
		if (!Array.isArray(out) || out.length !== phrases.length) throw new Error(`rei length mismatch: ${note.text}`);
		store.rei[note.text] = out.map((s: string) => String(s).trim());
		save(store);
		console.log(`rei ${note.key} ${note.pattern}`);
	}
	const queue = questions(weeks).filter((q) => !store.questions[q.key]?.[q.n]);
	const worker = async () => {
		for (let q = queue.shift(); q; q = queue.shift()) {
			const points = (q.day.points || []).map((p: any) => ({ pattern: p.pattern, connection: p.connection, meaning: p.usage_cn }));
			const out = (await gemini(Q_PROMPT, { 完整句: q.item.completed, 译文: q.item.translation, 正确答案: q.item.answer, 当天语法点: points }, BREAKDOWN)) as Breakdown;
			(store.questions[q.key] ??= {})[q.n] = out;
			save(store);
			console.log(`q ${q.key}#${q.n}`);
		}
	};
	await Promise.all([worker(), worker(), worker(), worker()]);
}

/** 校验后输出给前端的数据：{ rei: {原文: [译文…]}, questions: {wXdY: {n: Breakdown}} } */
function emit(store: Store, weeks: number[]) {
	const problems: string[] = [];
	const rei: Record<string, string[]> = {};
	for (const note of reiNotes(weeks)) {
		const cn = store.rei[note.text];
		if (!cn || cn.length !== reiPhrases(note.text).length || cn.some((s) => !s.trim())) problems.push(`rei ${note.key}: ${note.text}`);
		else rei[note.text] = cn;
	}
	const bang: Record<string, string[]> = {};
	for (const note of notesOf(weeks, "！")) {
		const cn = store.bang[note.text];
		if (!cn || cn.length !== reiPhrases(note.text).length || cn.some((s) => !s.trim())) problems.push(`！ ${note.key}: ${note.text}`);
		else bang[note.text] = cn;
	}
	const tips: Record<string, string> = {};
	for (const note of notesOf(weeks, "◆")) {
		const cn = store.tips[note.text];
		if (!cn?.trim()) problems.push(`◆ ${note.key}: ${note.text}`);
		else tips[note.text] = cn.trim();
	}
	const qs: Record<string, Record<string, Breakdown>> = {};
	for (const q of questions(weeks)) {
		const b = store.questions[q.key]?.[q.n];
		if (!b?.patterns?.length || !b.structure?.trim()) problems.push(`question ${q.key}#${q.n}`);
		else (qs[q.key] ??= {})[q.n] = b;
	}
	if (problems.length) throw new Error(`missing or invalid:\n${problems.join("\n")}`);
	writeFileSync(OUTPUT, `${JSON.stringify({ weeks, rei, bang, tips, questions: qs })}\n`);
	const words = Object.values(qs).flatMap((d) => Object.values(d)).reduce((n, b) => n + b.words.length, 0);
	console.log(
		`weeks ${weeks.join(",")}: ${Object.keys(rei).length} れい notes (${Object.values(rei).flat().length} phrases), ${Object.keys(bang).length} ！ notes (${Object.values(bang).flat().length} phrases), ${Object.keys(tips).length} ◆ notes, ${Object.values(qs).reduce((n, d) => n + Object.keys(d).length, 0)} questions, ${words} glossed words`,
	);
}

if (import.meta.url === new URL(process.argv[1] ?? "", "file://").href) {
	const store = load();
	const weeks = weeksArg ? weeksArg.split(",").map(Number) : store.weeks.length ? store.weeks : [2];
	store.weeks = [...new Set([...store.weeks, ...weeks])].sort((a, b) => a - b);
	if (fetchMode) await fetchMissing(store, weeks);
	save(store);
	emit(store, store.weeks);
}
