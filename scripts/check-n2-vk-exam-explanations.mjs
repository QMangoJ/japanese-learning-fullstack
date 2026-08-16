import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const vocabBook = JSON.parse(await readFile(resolve(root, "public/data/n2vocab.4e440284d9.json"), "utf8"));
const kanjiBook = JSON.parse(await readFile(resolve(root, "public/data/n2kanji.d9739ca8d4.json"), "utf8"));
const vocabExam = JSON.parse(await readFile(resolve(root, "public/data/n2-vocab-exam-explanations.json"), "utf8"));
const kanjiExam = JSON.parse(await readFile(resolve(root, "public/data/n2-kanji-exam-explanations.json"), "utf8"));
const store = await readFile(resolve(root, "app/study/store.ts"), "utf8");

function examItems(day) {
	return ["mondai1", "mondai2", "mondai3", "mondai4"].flatMap((key) => day[key]?.items || []);
}

function check(book, pack, label) {
	let count = 0;
	for (const week of book.weeks || []) {
		const day = (week.days || []).find((entry) => entry.day === 7);
		const source = examItems(day || {});
		const generated = pack[`w${week.n}`] || [];
		assert.equal(generated.length, source.length, `${label} week ${week.n}: count`);
		generated.forEach((item, index) => {
			assert.equal(String(item.n), String(source[index].n), `${label} week ${week.n}: n`);
			assert.match(String(item.trans || ""), /[\u3400-\u9fff]/, `${label} w${week.n} #${item.n}: cn`);
			assert.match(String(item.trans_en || ""), /[A-Za-z]/, `${label} w${week.n} #${item.n}: en`);
		});
		count += generated.length;
	}
	return count;
}

const vocabCount = check(vocabBook, vocabExam, "n2 vocab exam");
const kanjiCount = check(kanjiBook, kanjiExam, "n2 kanji exam");
assert.equal(vocabCount, 180);
assert.equal(kanjiCount, 178);
assert.match(store, /n2-vocab-exam-explanations\.json/);
assert.match(store, /n2-kanji-exam-explanations\.json/);
assert.match(store, /attachWeekendKaisetsu/);
console.log(`N2 vocab/kanji weekend explanations passed (${vocabCount} + ${kanjiCount}).`);
