/**
 * N2 语法「造句练习」：每个语法点 1–2 道「看中文 → 用本语法造日语句」的题目，附参考答案与 N3+ 生词。
 *
 *   GEMINI_API_KEY=... node --experimental-strip-types scripts/generate-n2-grammar-composition.mts [--fetch] [--weeks=2,3]
 *
 * --fetch 调用 Gemini 补齐 scripts/n2-grammar-composition.json 里缺的语法点（已有条目不覆盖；
 * 人工校对后的 JSON 是唯一来源）。不带 --fetch 时只校验并输出 public/data/n2-grammar-composition.json。
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";

export type Gloss = { w: string; r: string; cn: string; lv?: string };
/** cn: 中文题目；jp: 参考答案；use: 答案中体现本语法的片段（必须是 jp 的子串）；words: N3+ 生词。 */
export type Prompt = { cn: string; jp: string; use: string; words: Gloss[] };
export type PointEntry = { pattern: string; prompts: Prompt[] };
type Store = { weeks: number[]; points: Record<string, Record<string, PointEntry>> };

const root = new URL("../", import.meta.url);
const SOURCE = new URL("scripts/n2-grammar-composition.json", root);
const OUTPUT = new URL("public/data/n2-grammar-composition.json", root);
const MODEL = process.env.GEMINI_MODEL || "gemini-pro-latest";
const fetchMode = process.argv.includes("--fetch");
const weeksArg = process.argv.find((a) => a.startsWith("--weeks="))?.slice(8);

const dataFile = readdirSync(new URL("public/data/", root)).find((f) => /^n2grammar\.[0-9a-f]+\.json$/.test(f));
if (!dataFile) throw new Error("n2grammar data file not found");
const grammar = JSON.parse(readFileSync(new URL(`public/data/${dataFile}`, root), "utf8"));

export function grammarPoints(weeks: number[]) {
	const out: { key: string; index: number; point: any }[] = [];
	for (const week of weeks)
		for (const day of grammar.weeks.find((w: any) => w.n === week)?.days || [])
			(day.points || []).forEach((point: any, index: number) => out.push({ key: `w${week}d${day.day}`, index, point }));
	return out;
}

const PROMPT = `你是日语母语的 JLPT N2 语法老师，学习者是中文母语、日语约 N4 水平，正在学 N2 语法。
下面给出一个 N2 语法点（句型、接续、用法说明、课本例句）。请为它出 2 道「中译日造句」练习题：
- cn：一句自然的简体中文，学习者要把它译成日语，并且必须用到这个语法点。中文要像真实生活里会说的话（聊天、工作、家庭、新闻、社交媒体等场景），不要课本腔，不要和课本例句雷同。
- jp：日语母语者会自然说出的参考答案，必须语法正确、确实使用了该语法点的正确接续与用法（注意该语法点的限制，如不能接意志/请求、只用于负面评价等）。词汇控制在 N2 及以下，句子 15–40 字。不要加假名注音。
- use：jp 中体现该语法点的那一段原文（必须是 jp 的连续子串，如「かいがあって」「読みかけ」「限り」）。
- words：jp 中对 N4 学习者是生词的词（JLPT N3/N2/N1，跳过 N5/N4 基础词），每项 {w: 辞书形, r: 平假名读音（片假名词写原词）, cn: 本句语境下的中文（不超过 12 字）, lv: "N3"|"N2"|"N1"}。不要把语法点本身放进 words。没有就返回空数组。
两道题场景要不同。只输出 JSON 数组。`;

const GLOSS = { type: "OBJECT", properties: { w: { type: "STRING" }, r: { type: "STRING" }, cn: { type: "STRING" }, lv: { type: "STRING" } }, required: ["w", "r", "cn", "lv"] };
const SCHEMA = {
	type: "ARRAY",
	items: {
		type: "OBJECT",
		properties: { cn: { type: "STRING" }, jp: { type: "STRING" }, use: { type: "STRING" }, words: { type: "ARRAY", items: GLOSS } },
		required: ["cn", "jp", "use", "words"],
	},
};

async function gemini(payload: unknown): Promise<any> {
	const apiKey = process.env.GEMINI_API_KEY;
	if (!apiKey) throw new Error("GEMINI_API_KEY is required for --fetch");
	for (let attempt = 1; attempt <= 3; attempt += 1) {
		const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL)}:generateContent`, {
			method: "POST",
			headers: { "content-type": "application/json", "x-goog-api-key": apiKey },
			body: JSON.stringify({
				contents: [{ role: "user", parts: [{ text: `${PROMPT}\n\n${JSON.stringify(payload)}` }] }],
				generationConfig: { temperature: 0.7, responseMimeType: "application/json", responseSchema: SCHEMA },
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
	if (!existsSync(SOURCE)) return { weeks: [], points: {} };
	return JSON.parse(readFileSync(SOURCE, "utf8")) as Store;
}
function save(store: Store) {
	writeFileSync(SOURCE, `${JSON.stringify(store, null, "\t")}\n`);
}

async function fetchMissing(store: Store, weeks: number[]) {
	const queue = grammarPoints(weeks).filter((g) => !store.points[g.key]?.[g.index]?.prompts?.length);
	const worker = async () => {
		for (let g = queue.shift(); g; g = queue.shift()) {
			const p = g.point;
			const payload = {
				句型: p.pattern,
				读音: p.reading,
				接续: p.connection,
				用法: [p.usage_jp, p.usage_cn].filter(Boolean).join(" / "),
				课本例句: (p.examples || []).map((e: any) => e.jp),
				注意: (p.notes || []).map((n: any) => `${n.type} ${n.text}`),
			};
			const prompts = (await gemini(payload)) as Prompt[];
			(store.points[g.key] ??= {})[g.index] = { pattern: p.pattern, prompts };
			save(store);
			console.log(`${g.key}#${g.index} ${p.pattern}`);
		}
	};
	await Promise.all([worker(), worker(), worker(), worker()]);
}

/** 校验后输出给前端：{ weeks, points: {wXdY: {pointIndex: Prompt[]}} } */
export function validate(store: Store, weeks: number[]) {
	const problems: string[] = [];
	const points: Record<string, Record<string, Prompt[]>> = {};
	for (const g of grammarPoints(weeks)) {
		const entry = store.points[g.key]?.[g.index];
		const where = `${g.key}#${g.index} ${g.point.pattern}`;
		if (!entry || entry.pattern !== g.point.pattern) {
			problems.push(`${where}: missing or pattern mismatch`);
			continue;
		}
		if (entry.prompts.length < 1 || entry.prompts.length > 2) problems.push(`${where}: needs 1–2 prompts`);
		for (const pr of entry.prompts) {
			if (!pr.cn?.trim() || !pr.jp?.trim()) problems.push(`${where}: empty prompt`);
			if (!pr.use || !pr.jp.includes(pr.use)) problems.push(`${where}: use 「${pr.use}」 not in 「${pr.jp}」`);
			for (const w of pr.words || []) if (!w.w || !w.r || !w.cn || !/^N[123]$/.test(w.lv || "")) problems.push(`${where}: bad gloss ${JSON.stringify(w)}`);
		}
		(points[g.key] ??= {})[g.index] = entry.prompts;
	}
	return { problems, points };
}

if (import.meta.url === new URL(process.argv[1] ?? "", "file://").href) {
	const store = load();
	const weeks = weeksArg ? weeksArg.split(",").map(Number) : store.weeks.length ? store.weeks : [2, 3];
	store.weeks = [...new Set([...store.weeks, ...weeks])].sort((a, b) => a - b);
	if (fetchMode) await fetchMissing(store, weeks);
	save(store);
	const { problems, points } = validate(store, store.weeks);
	if (problems.length) throw new Error(`missing or invalid:\n${problems.join("\n")}`);
	writeFileSync(OUTPUT, `${JSON.stringify({ weeks: store.weeks, points })}\n`);
	const all = Object.values(points).flatMap((d) => Object.values(d));
	for (const week of store.weeks) {
		const wk = Object.entries(points).filter(([k]) => k.startsWith(`w${week}d`)).flatMap(([, d]) => Object.values(d));
		console.log(`week ${week}: ${wk.length} points, ${wk.flat().length} prompts, ${wk.flat().reduce((n, p) => n + p.words.length, 0)} glossed words`);
	}
	console.log(`total ${all.length} points, ${all.flat().length} prompts`);
}
