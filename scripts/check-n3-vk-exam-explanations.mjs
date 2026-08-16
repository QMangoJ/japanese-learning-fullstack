import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const vocabBook = JSON.parse(await readFile(resolve(root, "public/data/vocab.856eb48e32.json"), "utf8"));
const kanjiBook = JSON.parse(await readFile(resolve(root, "public/data/kanji.e43232869e.json"), "utf8"));
const vocabExam = JSON.parse(await readFile(resolve(root, "public/data/n3-vocab-exam-explanations.json"), "utf8"));
const kanjiExam = JSON.parse(await readFile(resolve(root, "public/data/n3-kanji-exam-explanations.json"), "utf8"));
const store = await readFile(resolve(root, "app/study/store.ts"), "utf8");

function examItems(day) {
	return ["mondai1", "mondai2", "mondai3", "mondai4"].flatMap((key) => day[key]?.items || []);
}

function check(book, pack, label, expectedWeeks, expectedCount) {
	let count = 0;
	for (const week of book.weeks || []) {
		const day = (week.days || []).find((entry) => entry.day === 7);
		if (expectedWeeks.includes(week.n)) {
			assert.equal((day?.kaisetsu || []).length, 0, `${label} w${week.n}: book must not already have kaisetsu`);
			const source = examItems(day || {});
			const generated = pack[`w${week.n}`] || [];
			assert.equal(generated.length, source.length, `${label} week ${week.n}: count`);
			generated.forEach((item, index) => {
				assert.equal(item.n, source[index].n, `${label} w${week.n}: n`);
				assert.match(String(item.trans || ""), /[\u3400-\u9fff]/, `${label} w${week.n} #${item.n}: cn`);
				assert.match(String(item.trans_en || ""), /[A-Za-z]/, `${label} w${week.n} #${item.n}: en`);
			});
			count += generated.length;
		} else {
			assert.ok((day?.kaisetsu || []).length, `${label} w${week.n}: existing kaisetsu must stay`);
			assert.equal(pack[`w${week.n}`], undefined, `${label} w${week.n}: sidecar must not overwrite`);
		}
	}
	assert.equal(count, expectedCount, `${label}: unexpected count`);
	return count;
}

const vocabCount = check(vocabBook, vocabExam, "n3 vocab exam", [1, 2, 3, 4], 100);
const kanjiCount = check(kanjiBook, kanjiExam, "n3 kanji exam", [1, 2, 3, 4], 80);
assert.match(store, /n3-vocab-exam-explanations\.json/);
assert.match(store, /n3-kanji-exam-explanations\.json/);
assert.match(store, /attachWeekendKaisetsu\(v,/);
assert.match(store, /attachWeekendKaisetsu\(k,/);
assert.match(store, /!\(Array\.isArray\(day\.kaisetsu\) && day\.kaisetsu\.length\)/);
console.log(`N3 vocab/kanji weekend explanations passed (${vocabCount} + ${kanjiCount}; weeks 5–6 kept).`);
