import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";

// Integrity checks for 日本語総まとめ N1 漢字 (n1kanji): structure, answer keys, translations, furigana.
const root = resolve(import.meta.dirname, "..");
const store = await readFile(resolve(root, "app/study/store.ts"), "utf8");
const file = store.match(/n1kanji: "(n1kanji\.[0-9a-f]{10}\.json)"/)?.[1];
assert.ok(file, "store must load the hashed N1 kanji file");
assert.equal(file, "n1kanji.fd4839449f.json", "store points at the current build");
assert.ok((await readdir(resolve(root, "public/data"))).includes(file), `${file} exists`);
const book = JSON.parse(await readFile(resolve(root, "public/data", file), "utf8"));
const exam = JSON.parse(await readFile(resolve(root, "public/data/n1-kanji-exam-explanations.json"), "utf8"));
const daily = JSON.parse(await readFile(resolve(root, "public/data/n1-kanji-daily-translations.json"), "utf8")).kanji;
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
			for (const [p, r] of pairs) if (typeof p === "string" && typeof r === "string") assert.equal(visible(r), p.replace(/[{}]/g, "").replace(tags, ""), `${path}.${k} ruby text drifted`);
			for (const m of (typeof v === "string" ? v : "").matchAll(/<ruby>(.*?)<rt>(.*?)<\/rt><\/ruby>([ぁ-ん]?)/g)) {
				assert.ok(m[2].length >= m[1].length || /[々ヶ]/.test(m[1]), `${path}.${k}: reading ${m[2]} too short for ${m[1]}`);
				assert.ok(!/[ァ-ヶ]/.test(m[2]) || /[ァ-ヶ]/.test(m[1]), `${path}.${k}: katakana reading ${m[2]}`);
			}
		}
		checkRuby(v, `${path}.${k}`);
	}
}
checkRuby(book);

const circled = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕";
assert.equal(book.weeks.length, 8, "8 weeks");
let rows = 0;
let words = 0;
let drills = 0;
for (const w of book.weeks) {
	assert.ok(w.title && w.title_cn, `week ${w.n} title`);
	assert.equal(w.days.length, 7, `week ${w.n} has 7 days`);
	for (const d of w.days) {
		const id = `w${w.n}d${d.day}`;
		if (d.day === 7) {
			[10, 5, 5].forEach((n, i) => {
				const m = d[`mondai${i + 1}`];
				assert.equal(m.items.length, n, `w${w.n} 問題${i + 1}`);
				for (const it of m.items) assert.equal(it.opts.length, 4, `w${w.n} q${it.n} has 4 options`);
			});
			assert.ok(d.mondai4.wordbank?.length >= 5, `w${w.n} 問題4 word bank`);
			assert.ok(d.mondai4.items.length >= 1, `w${w.n} 問題4 passage`);
			assert.ok(d.column?.title && d.column.kanji?.length, `w${w.n} コラム`);
			const key = exam[`w${w.n}`];
			assert.deepEqual(key.map((a) => a.n), Array.from({ length: 25 }, (_, i) => i + 1), `w${w.n} 25 explanations`);
			for (const a of key) {
				assert.ok(a.point, `w${w.n} q${a.n} explanation`);
				if (a.n <= 20) {
					assert.ok(a.ans >= 1 && a.ans <= 4, `w${w.n} q${a.n} answer`);
					assert.ok(a.trans, `w${w.n} q${a.n} Chinese translation`);
					assert.ok(d.answers.includes(circled[a.n - 1] + a.ans + " ") || d.answers.endsWith(circled[a.n - 1] + a.ans), `w${w.n} q${a.n} matches day-7 key`);
				} else assert.ok(d.answers.includes(circled[a.n - 1]), `w${w.n} q${a.n} in key`);
			}
			continue;
		}
		assert.ok(d.title && d.title_cn, `${id} title`);
		for (const k of d.kanji) {
			rows++;
			assert.ok(k.char, `${id} kanji row`);
			for (const wd of k.words) {
				words++;
				assert.ok(wd.jp, `${id} word text`);
				assert.ok(wd.cn, `${id} ${wd.jp} needs Chinese`);
			}
		}
		const [first, second] = d.exercises.sections;
		assert.equal(first.items.length, 6, `${id} 練習Ⅰ has 6 items`);
		assert.ok([4, 8].includes(second.items.length), `${id} 練習Ⅱ size ${second.items.length}`);
		drills += first.items.length + second.items.length;
		assert.match(d.exercises.answers, /^Ⅰ(\(言い換え\))?：①.*　Ⅱ：⑦/, `${id} answer key`);
		if (first.type === "choice" && first.items.every((it) => it.choices?.length === 2))
			assert.match(d.exercises.answers, /^Ⅰ：①[ab] ②[ab] ③[ab] ④[ab] ⑤[ab] ⑥[ab]　/, `${id} 練習Ⅰ key`);
		const letters = (second.instruction.includes("□") && d.exercises.answers.split("Ⅱ：")[1]) || "";
		assert.ok(letters.length > 0, `${id} 練習Ⅱ key`);
		const tr = daily[id];
		assert.equal(tr?.items?.length, first.items.length + second.items.length, `${id} exercise translations`);
		for (const t of tr.items) assert.ok(t.translation, `${id} q${t.n} translation`);
	}
}
assert.ok(rows >= 1400, `kanji rows: ${rows}`);
assert.ok(words >= 2600, `words: ${words}`);
assert.match(store, /"n1:kanji": "n1kanji"/, "N1 level maps to n1kanji");
assert.match(days, /MODULE === "n1kanji" \? K1/, "N1 kanji day view reads its own book");
console.log(`n1 kanji ok: ${book.weeks.length} weeks, ${rows} rows, ${words} words, ${drills} drills, 200 exam answers`);
