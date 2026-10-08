/**
 * N2 语法「同级相似（N2）」：同一等级里容易混淆的语法点两两对比（区别 + 各一句例句 + 所在周/天）。
 *
 *   node --experimental-strip-types scripts/generate-n2-grammar-similar.mts [--review]
 *
 * 唯一来源是人工编写、校对的 scripts/n2-grammar-similar.json（{weeks, pairs:[{a:"W-D-I", b:"W-D-I", diff, a_ex, b_ex}]}）。
 * 只收最容易混淆、且不在同一天的组合（同一天的语法点已在「语法总结」里逐条区分），每个语法点最多 2 条。
 * 脚本校验引用的语法点都存在，并按天展开（成对的两边如都在 weeks 内，两天都会显示），输出 public/data/n2-grammar-similar.json，
 * 前端把这些条目和跨等级条目放在同一个「相似表达」列表里，只多一个等级标签 N2。
 * --review（已停用：Gemini key 只用于 news-learning 文章翻译，会直接报错）额外调用 Gemini做一遍校对，只打印可疑条目，不改文件。
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

type Ex = { jp: string; cn: string };
/** a_form／b_form：只对比该语法点的某个变形时（如「に限り」里的「に限らず」）写明。 */
type Pair = { a: string; b: string; a_form?: string; b_form?: string; diff: string; a_ex: Ex; b_ex: Ex };
/** forms：语法点 "W-D-I" → [列表里显示的表达, 简短中文意思]（课本标题多是例句片段，不适合直接当表达名）。 */
type Source = { weeks: number[]; forms: Record<string, [string, string]>; pairs: Pair[] };
/** 前端条目（按天）：form 对方表达，meaning 对方中文意思，against 本课对应语法点，ref 对方位置，example 对方例句。 */
export type SimilarEntry = { ref: [number, number, number]; point: number; form: string; meaning: string; against: string; diff: string; example: Ex };

const root = new URL("../", import.meta.url);
const SOURCE = new URL("scripts/n2-grammar-similar.json", root);
const OUTPUT = new URL("public/data/n2-grammar-similar.json", root);
const dataFile = readdirSync(new URL("public/data/", root)).find((f) => /^n2grammar\.[0-9a-f]+\.json$/.test(f));
if (!dataFile) throw new Error("n2grammar data file not found");
const grammar = JSON.parse(readFileSync(new URL(`public/data/${dataFile}`, root), "utf8"));

function point(ref: string): { ref: [number, number, number]; pattern: string; meaning: string } | null {
	const m = /^(\d+)-(\d+)-(\d+)$/.exec(ref);
	if (!m) return null;
	const [w, d, i] = [+m[1], +m[2], +m[3]];
	const p = grammar.weeks.find((x: any) => x.n === w)?.days.find((x: any) => x.day === d)?.points?.[i];
	return p ? { ref: [w, d, i], pattern: p.pattern, meaning: String(p.usage_cn || "") } : null;
}

export function build(src: Source) {
	const problems: string[] = [];
	const days: Record<string, SimilarEntry[]> = {};
	const perPoint: Record<string, number> = {};
	const seen = new Set<string>();
	for (const pair of src.pairs) {
		const a = point(pair.a);
		const b = point(pair.b);
		const key = [pair.a, pair.b].sort().join("|");
		if (!a || !b) problems.push(`unknown ref ${pair.a} / ${pair.b}`);
		if (pair.a === pair.b || seen.has(key)) problems.push(`duplicate or self pair ${key}`);
		seen.add(key);
		if (!src.weeks.includes(a?.ref[0] ?? -1)) problems.push(`pair ${key}: a must be in weeks ${src.weeks}`);
		for (const s of [pair.diff, pair.a_ex?.jp, pair.a_ex?.cn, pair.b_ex?.jp, pair.b_ex?.cn]) if (!s?.trim()) problems.push(`pair ${key}: empty field`);
		if (!a || !b) continue;
		if (a.ref[0] === b.ref[0] && a.ref[1] === b.ref[1]) problems.push(`pair ${key}: same day, already contrasted in the day summary`);
		for (const ref of [pair.a, pair.b]) if (!src.forms?.[ref]?.[0] || !src.forms[ref][1]) problems.push(`missing form/meaning for ${ref}`);
		const add = (self: typeof a, other: typeof b, otherEx: Ex, selfForm?: string, otherForm?: string) => {
			if (!src.weeks.includes(self.ref[0])) return;
			const id = self.ref.join("-");
			perPoint[id] = (perPoint[id] || 0) + 1;
			if (perPoint[id] > 2) problems.push(`${id}: more than 2 same-level items`);
			(days[`w${self.ref[0]}d${self.ref[1]}`] ??= []).push({ ref: other.ref, point: self.ref[2], form: otherForm || src.forms[other.ref.join("-")]?.[0] || other.pattern, meaning: src.forms[other.ref.join("-")]?.[1] || other.meaning, against: selfForm || src.forms[self.ref.join("-")]?.[0] || self.pattern, diff: pair.diff, example: otherEx });
		};
		add(a, b, pair.b_ex, pair.a_form, pair.b_form);
		add(b, a, pair.a_ex, pair.b_form, pair.a_form);
	}
	for (const list of Object.values(days)) list.sort((x, y) => x.point - y.point);
	return { problems, days };
}

async function review(src: Source) {
	// Alan's rule: the Gemini key is only for news-learning article translation.
	throw new Error("Refusing to call Gemini: GEMINI_API_KEY is reserved for translating news articles on news-learning (news.ki-toko.com) only. Generate this content without the Gemini API.");
	// eslint-disable-next-line no-unreachable
	const apiKey = process.env.GEMINI_API_KEY;
	if (!apiKey) throw new Error("GEMINI_API_KEY is required for --review");
	const items = src.pairs.map((p) => ({ id: `${p.a}|${p.b}`, a: point(p.a)?.pattern, b: point(p.b)?.pattern, diff: p.diff, a_ex: p.a_ex, b_ex: p.b_ex }));
	const prompt = `你是严格的日语母语 JLPT N2 语法校对。逐条检查：a、b 两个 N2 语法是否真的容易混淆；diff 对两者区别（意思、语感、接续、语体）的说明是否准确；a_ex 是否自然地用了 a，b_ex 是否自然地用了 b，日语是否语法正确、像母语者日常会说的话，中文翻译是否准确。只返回有问题的条目 JSON 数组 [{id, problem, fix}]，没问题的不要列出。`;
	const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL || "gemini-pro-latest"}:generateContent`, {
		method: "POST",
		headers: { "content-type": "application/json", "x-goog-api-key": apiKey },
		body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: `${prompt}\n\n${JSON.stringify(items)}` }] }], generationConfig: { temperature: 0, responseMimeType: "application/json" } }),
	});
	if (!res.ok) throw new Error(`gemini ${res.status}`);
	const data = (await res.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
	console.log(data.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "(empty)");
}

if (import.meta.url === new URL(process.argv[1] ?? "", "file://").href) {
	const src = JSON.parse(readFileSync(SOURCE, "utf8")) as Source;
	const { problems, days } = build(src);
	if (problems.length) throw new Error(`invalid:\n${problems.join("\n")}`);
	if (process.argv.includes("--review")) await review(src);
	writeFileSync(OUTPUT, `${JSON.stringify({ weeks: src.weeks, days })}\n`);
	for (const week of src.weeks) {
		const list = Object.entries(days).filter(([k]) => k.startsWith(`w${week}d`)).flatMap(([k, d]) => d.map((e) => `${k}#${e.point}`));
		console.log(`week ${week}: ${new Set(list).size} points covered, ${list.length} same-level items`);
	}
	console.log(`total ${src.pairs.length} pairs`);
}
