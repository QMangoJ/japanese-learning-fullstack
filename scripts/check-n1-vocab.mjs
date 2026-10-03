import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";

// Integrity checks for 日本語総まとめ N1 語彙 (n1vocab): structure, answer keys, translations, furigana.
const root = resolve(import.meta.dirname, "..");
const store = await readFile(resolve(root, "app/study/store.ts"), "utf8");
const file = store.match(/n1vocab: "(n1vocab\.[0-9a-f]{10}\.json)"/)?.[1];
assert.ok(file, "store must load the hashed N1 vocab file");
assert.ok((await readdir(resolve(root, "public/data"))).includes(file), `${file} exists`);
const book = JSON.parse(await readFile(resolve(root, "public/data", file), "utf8"));
const exam = JSON.parse(await readFile(resolve(root, "public/data/n1-vocab-exam-explanations.json"), "utf8"));
const daily = JSON.parse(await readFile(resolve(root, "public/data/n1-vocab-daily-translations.json"), "utf8")).vocab;
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
			for (const m of (typeof v === "string" ? v : "").matchAll(/<ruby>(.*?)<rt>(.*?)<\/rt><\/ruby>/g)) assert.ok(m[2].length >= m[1].length || /[々ヶ]/.test(m[1]), `${path}.${k}: reading ${m[2]} too short for ${m[1]}`);
		}
		checkRuby(v, `${path}.${k}`);
	}
}
checkRuby(book);
checkRuby(exam);

const circled = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕";
assert.equal(book.weeks.length, 8, "8 weeks");
let words = 0;
for (const w of book.weeks) {
	assert.ok(w.title && w.title_cn, `week ${w.n} title`);
	assert.equal(w.days.length, 7, `week ${w.n} has 7 days`);
	for (const d of w.days) {
		assert.ok(d.title && d.title_cn, `w${w.n}d${d.day} title`);
		if (d.day === 7) {
			const sizes = [10, 5, 5, 5];
			sizes.forEach((n, i) => {
				const m = d[`mondai${i + 1}`];
				assert.equal(m.items.length, n, `w${w.n} 問題${i + 1}`);
				for (const it of m.items) assert.equal(it.opts.length, 4, `w${w.n} q${it.n} has 4 options`);
			});
			const key = exam[`w${w.n}`];
			assert.deepEqual(key.map((a) => a.n), Array.from({ length: 25 }, (_, i) => i + 1), `w${w.n} 25 answers`);
			for (const a of key) {
				assert.ok(a.ans >= 1 && a.ans <= 4, `w${w.n} q${a.n} answer`);
				assert.ok(a.trans && a.point, `w${w.n} q${a.n} Chinese explanation`);
				assert.equal(a.option_translations.length, 4, `w${w.n} q${a.n} option translations`);
				assert.ok(d.answers.includes(circled[a.n - 1] + a.ans), `w${w.n} q${a.n} matches day-7 key`);
			}
			continue;
		}
		for (const s of d.sections)
			for (const it of s.items) {
				words++;
				assert.ok(it.jp, `w${w.n}d${d.day} word text`);
				if (!/^[⇔→]/.test(it.jp)) assert.ok(it.cn, `w${w.n}d${d.day} ${it.jp} needs Chinese`);
			}
		const [choice, fill] = d.exercises.sections;
		assert.equal(choice.items.length, 6, `w${w.n}d${d.day} 練習Ⅰ`);
		assert.equal(fill.items.length, 2, `w${w.n}d${d.day} 練習Ⅱ`);
		for (const it of fill.items) assert.equal(it.opts.length, 4, `w${w.n}d${d.day} 練習Ⅱ options`);
		assert.match(d.exercises.answers, /^Ⅰ：①[ab] ②[ab] ③[ab] ④[ab] ⑤[ab] ⑥[ab]　Ⅱ：⑦[1-4] ⑧[1-4]$/, `w${w.n}d${d.day} answer key`);
		const tr = daily[`w${w.n}d${d.day}`];
		assert.equal(tr?.items?.length, 8, `w${w.n}d${d.day} 8 exercise translations`);
		for (const t of tr.items) assert.ok(t.translation, `w${w.n}d${d.day} q${t.n} translation`);
	}
}
assert.ok(words >= 1700, `words: ${words}`);
assert.match(store, /"n1:vocab": "n1vocab"/, "N1 level maps to n1vocab");
assert.match(days, /MODULE === "n1vocab" \? V1/, "N1 vocab day view reads its own book");
console.log(`n1 vocab ok: ${book.weeks.length} weeks, ${words} words, 384 drills, 200 exam answers`);
