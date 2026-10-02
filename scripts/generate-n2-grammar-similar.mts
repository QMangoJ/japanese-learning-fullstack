/**
 * N2 语法「同级相似（N2）」：同一等级里容易混淆的语法点两两对比（区别 + 各一句例句 + 所在周/天）。
 *
 *   node --experimental-strip-types scripts/generate-n2-grammar-similar.mts [--review]
 *
 * 唯一来源是人工编写、校对的 scripts/n2-grammar-similar.json（{weeks, pairs:[{a:"W-D-I", b:"W-D-I", diff, a_ex, b_ex}]}）。
 * 脚本校验引用的语法点都存在，并按语法点展开（成对的两边如都在 weeks 内，两边都会显示），输出 public/data/n2-grammar-similar.json。
 * --review 额外调用 Gemini（GEMINI_API_KEY）做一遍校对，只打印可疑条目，不改文件。
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

type Ex = { jp: string; cn: string };
/** a_form／b_form：只对比该语法点的某个变形时（如「に限り」里的「に限らず」）写明。 */
type Pair = { a: string; b: string; a_form?: string; b_form?: string; diff: string; a_ex: Ex; b_ex: Ex };
type Source = { weeks: number[]; pairs: Pair[] };
/** 前端条目：ref 为对方语法点 [周, 天, 序号]，self/other 为本条与对方的例句。 */
export type SimilarEntry = { ref: [number, number, number]; pattern: string; form?: string; selfForm?: string; diff: string; self: Ex; other: Ex };

const root = new URL("../", import.meta.url);
const SOURCE = new URL("scripts/n2-grammar-similar.json", root);
const OUTPUT = new URL("public/data/n2-grammar-similar.json", root);
const dataFile = readdirSync(new URL("public/data/", root)).find((f) => /^n2grammar\.[0-9a-f]+\.json$/.test(f));
if (!dataFile) throw new Error("n2grammar data file not found");
const grammar = JSON.parse(readFileSync(new URL(`public/data/${dataFile}`, root), "utf8"));

function point(ref: string): { ref: [number, number, number]; pattern: string } | null {
	const m = /^(\d+)-(\d+)-(\d+)$/.exec(ref);
	if (!m) return null;
	const [w, d, i] = [+m[1], +m[2], +m[3]];
	const p = grammar.weeks.find((x: any) => x.n === w)?.days.find((x: any) => x.day === d)?.points?.[i];
	return p ? { ref: [w, d, i], pattern: p.pattern } : null;
}

export function build(src: Source) {
	const problems: string[] = [];
	const points: Record<string, Record<string, SimilarEntry[]>> = {};
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
		const add = (self: typeof a, other: typeof b, selfEx: Ex, otherEx: Ex, selfForm?: string, otherForm?: string) => {
			if (!src.weeks.includes(self.ref[0])) return;
			const entry: SimilarEntry = { ref: other.ref, pattern: other.pattern, diff: pair.diff, self: selfEx, other: otherEx };
			if (otherForm) entry.form = otherForm;
			if (selfForm) entry.selfForm = selfForm;
			((points[`w${self.ref[0]}d${self.ref[1]}`] ??= {})[self.ref[2]] ??= []).push(entry);
		};
		add(a, b, pair.a_ex, pair.b_ex, pair.a_form, pair.b_form);
		add(b, a, pair.b_ex, pair.a_ex, pair.b_form, pair.a_form);
	}
	return { problems, points };
}

async function review(src: Source) {
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
	const { problems, points } = build(src);
	if (problems.length) throw new Error(`invalid:\n${problems.join("\n")}`);
	if (process.argv.includes("--review")) await review(src);
	writeFileSync(OUTPUT, `${JSON.stringify({ weeks: src.weeks, points })}\n`);
	for (const week of src.weeks) {
		const days = Object.entries(points).filter(([k]) => k.startsWith(`w${week}d`)).map(([, d]) => d);
		const pts = days.reduce((n, d) => n + Object.keys(d).length, 0);
		const entries = days.reduce((n, d) => n + Object.values(d).flat().length, 0);
		console.log(`week ${week}: ${pts} points covered, ${entries} contrast entries`);
	}
	console.log(`total ${src.pairs.length} pairs`);
}
