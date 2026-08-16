import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const grammar = JSON.parse(await readFile(resolve(root, "public/data/n4grammar.40e138ccdb.json"), "utf8"));
const vocab = JSON.parse(await readFile(resolve(root, "public/data/n4vocab.026f711eb7.json"), "utf8"));
const kanji = JSON.parse(await readFile(resolve(root, "public/data/n4kanji.655356d8e2.json"), "utf8"));
const grammarDaily = JSON.parse(await readFile(resolve(root, "public/data/n4-grammar-daily-explanations.json"), "utf8"));
const vkDaily = JSON.parse(await readFile(resolve(root, "public/data/n4-vocab-kanji-daily-translations.json"), "utf8"));
const store = await readFile(resolve(root, "app/study/store.ts"), "utf8");

function countDaily(book, pack, label, expectedDays, expectedItems, extraEn = false) {
	let days = 0;
	let items = 0;
	for (const week of book.weeks || []) {
		for (const day of (week.days || []).filter((entry) => entry.day < 7)) {
			days += 1;
			const key = `w${week.n}d${day.day}`;
			const source = (day.exercises?.sections || []).flatMap((section) => section.items || []);
			const generated = pack[key]?.items;
			assert.ok(Array.isArray(generated), `${label} ${key}: missing`);
			assert.equal(generated.length, source.length, `${label} ${key}: count`);
			generated.forEach((item, index) => {
				assert.equal(item.n, source[index].n, `${label} ${key}: n`);
				assert.match(String(item.translation || ""), /[\u3400-\u9fff]/, `${label} ${key} #${item.n}: cn`);
				if (extraEn) assert.match(String(item.translation_en || ""), /[A-Za-z]/, `${label} ${key} #${item.n}: en`);
			});
			items += generated.length;
		}
	}
	assert.equal(days, expectedDays, `${label}: days`);
	assert.equal(items, expectedItems, `${label}: items`);
}

countDaily(grammar, grammarDaily, "n4 grammar", 24, 120, true);
countDaily(vocab, vkDaily.vocab, "n4 vocab", 18, 72, true);
countDaily(kanji, vkDaily.kanji, "n4 kanji", 18, 144, true);
assert.match(store, /n4-grammar-daily-explanations\.json/);
assert.match(store, /n4-vocab-kanji-daily-translations\.json/);
console.log("N4 daily grammar/vocab/kanji explanations passed.");
