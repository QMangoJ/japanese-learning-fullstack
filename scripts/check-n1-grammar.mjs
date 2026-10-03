import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

// Integrity checks for 日本語総まとめ N1 文法 (n1grammar): structure, answer keys, links, furigana.
const root = resolve(import.meta.dirname, "..");
const book = JSON.parse(await readFile(resolve(root, "public/data/n1grammar.0626af5726.json"), "utf8"));
const besatsu = JSON.parse(await readFile(resolve(root, "public/data/n1-grammar-explanations.json"), "utf8"));
const store = await readFile(resolve(root, "app/study/store.ts"), "utf8");
const days = await readFile(resolve(root, "app/study/days.tsx"), "utf8");

const ruby = /<ruby>(.*?)<rt>.*?<\/rt><\/ruby>/gs;
const tags = /<[^>]+>/g;
const visible = (s) => s.replace(ruby, "$1").replace(tags, "");
function checkRuby(node, path = "$") {
	if (Array.isArray(node)) return node.forEach((v, i) => checkRuby(v, `${path}[${i}]`));
	if (!node || typeof node !== "object") return;
	for (const [k, v] of Object.entries(node)) {
		if (k.endsWith("_r")) {
			const plain = node[k.slice(0, -2)];
			const pairs = typeof v === "string" ? [[plain, v]] : Array.isArray(v) ? v.map((x, i) => [plain?.[i], x]) : [];
			for (const [p, r] of pairs) if (typeof p === "string" && typeof r === "string") assert.equal(visible(r), p.replace(tags, ""), `${path}.${k} ruby text drifted`);
		}
		checkRuby(v, `${path}.${k}`);
	}
}
checkRuby(book);
checkRuby(besatsu);

assert.equal(book.weeks.length, 8, "8 weeks");
let points = 0;
const pointIds = new Set();
for (const w of book.weeks) {
	assert.ok(w.title && w.title_cn, `week ${w.n} title`);
	assert.equal(w.days.length, 7, `week ${w.n} has 7 days`);
	for (const d of w.days) {
		if (d.day === 7) {
			assert.equal(d.mondai1.items.length, 15, `w${w.n} 問題1`);
			assert.equal(d.mondai2.items.length, 5, `w${w.n} 問題2`);
			assert.equal(d.mondai3.items.length, 5, `w${w.n} 問題3`);
			for (const m of ["mondai1", "mondai2", "mondai3"]) for (const it of d[m].items) assert.equal(it.opts.length, 4, `w${w.n} q${it.n} has 4 options`);
			assert.ok(d.mondai3.passage.includes("【21】") || d.mondai3.passage.includes("【21"), `w${w.n} passage blanks`);
			continue;
		}
		assert.ok(d.points.length >= 3, `w${w.n}d${d.day} points`);
		d.points.forEach((p, i) => {
			points++;
			pointIds.add(`#/day/${w.n}-${d.day}/p${i}`);
			assert.ok(p.pattern && p.connection && p.usage_cn, `w${w.n}d${d.day}p${i} basics`);
			assert.ok(p.examples.length >= 1, `w${w.n}d${d.day}p${i} examples`);
			for (const e of p.examples) assert.ok(e.jp && e.cn && e.en, `w${w.n}d${d.day}p${i} example translations`);
		});
		const [choice, order] = d.exercises.sections;
		assert.equal(choice.items.length, 5, `w${w.n}d${d.day} 練習Ⅰ`);
		assert.equal(order.items.length, 2, `w${w.n}d${d.day} 練習Ⅱ`);
		assert.match(d.exercises.answers, /^Ⅰ：①[ab] ②[ab] ③[ab] ④[ab] ⑤[ab]　Ⅱ：⑥[1-4](→[1-4]){3}　⑦[1-4](→[1-4]){3}$/, `w${w.n}d${d.day} answer key`);
	}
}
assert.ok(points >= 185, `grammar points: ${points}`);

for (let w = 1; w <= 8; w++) {
	const wk = besatsu[`w${w}`];
	const exam = book.weeks[w - 1].days[6];
	const all = [...wk.mondai1, ...wk.mondai2, ...wk.mondai3];
	assert.deepEqual(all.map((a) => a.n), Array.from({ length: 25 }, (_, i) => i + 1), `w${w} 25 answers`);
	for (const a of all) {
		assert.ok(a.ans >= 1 && a.ans <= 4, `w${w} q${a.n} answer`);
		assert.ok(a.trans && a.point, `w${w} q${a.n} Chinese explanation`);
		if (a.link) assert.ok(pointIds.has(a.link), `w${w} q${a.n} link ${a.link}`);
	}
	for (const a of wk.mondai2) {
		const seq = a.order.split("→").map(Number);
		assert.deepEqual([...seq].sort(), [1, 2, 3, 4], `w${w} q${a.n} order`);
		assert.equal(seq[2], a.ans, `w${w} q${a.n}: ★ (3rd slot) must be the answer`);
	}
	const examAns = exam.answers;
	for (const a of all) assert.ok(examAns.includes("①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕"[a.n - 1] + a.ans), `w${w} q${a.n} matches day-7 key`);
}

assert.match(store, /n1grammar: "n1grammar\.[0-9a-f]{10}\.json"/, "store must load the hashed N1 file");
assert.match(store, /"n1:grammar": "n1grammar"/, "N1 level maps to n1grammar");
assert.match(days, /MODULE === "n1grammar" \? G1/, "N1 exam reads its own besatsu");
console.log(`n1 grammar ok: ${book.weeks.length} weeks, ${points} points, 200 exam answers`);
