import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const vocab = JSON.parse(await readFile(resolve(root, "public/data/n2vocab.4e440284d9.json"), "utf8"));
const kanji = JSON.parse(await readFile(resolve(root, "public/data/n2kanji.d9739ca8d4.json"), "utf8"));
const translations = JSON.parse(
	await readFile(resolve(root, "public/data/n2-vocab-kanji-daily-translations.json"), "utf8"),
);
const store = await readFile(resolve(root, "app/study/store.ts"), "utf8");
const days = await readFile(resolve(root, "app/study/days.tsx"), "utf8");

function validateDailyBook(book, generated, label) {
	let dayCount = 0;
	let itemCount = 0;
	for (const week of book.weeks || []) {
		for (const day of (week.days || []).filter((entry) => entry.day < 7)) {
			dayCount += 1;
			const key = `w${week.n}d${day.day}`;
			const sourceItems = (day.exercises?.sections || []).flatMap((section) => section.items || []);
			const translatedItems = generated[key]?.items;
			assert.ok(Array.isArray(translatedItems), `${label} ${key}: missing translation group`);
			assert.equal(translatedItems.length, sourceItems.length, `${label} ${key}: item count mismatch`);
			translatedItems.forEach((item, index) => {
				assert.equal(item.n, sourceItems[index].n, `${label} ${key}: question number mismatch`);
				assert.equal(typeof item.translation, "string", `${label} ${key} #${item.n}: missing translation`);
				assert.match(item.translation, /[\u3400-\u9fff]/, `${label} ${key} #${item.n}: translation is not Chinese`);
			});
			itemCount += translatedItems.length;
		}
	}
	return { dayCount, itemCount };
}

const vocabResult = validateDailyBook(vocab, translations.vocab, "n2vocab");
const kanjiResult = validateDailyBook(kanji, translations.kanji, "n2kanji");
assert.equal(vocabResult.itemCount, 357, "n2vocab: unexpected daily question count");
assert.equal(kanjiResult.itemCount, 378, "n2kanji: unexpected daily question count");
assert.equal(translations.version, 1, "unexpected translation data version");
assert.match(translations.vocab.w1d1.items[0].translation, /10层|10 层/, "10階建て must mention floors");
assert.match(translations.kanji.w1d1.items[0].translation, /禁止|不许|不能/, "立ち入り禁止 must be a prohibition");
assert.match(store, /n2-vocab-kanji-daily-translations\.json/, "runtime must load N2 vocab/kanji translations");
assert.match(days, /MODULE === "n2vocab"/, "N2 vocab days must read V2 translations");
assert.match(days, /MODULE === "n2kanji"/, "N2 kanji days must read K2 translations");

console.log(
	`Validated ${vocabResult.itemCount} N2 vocab and ${kanjiResult.itemCount} N2 kanji daily translations across ${vocabResult.dayCount + kanjiResult.dayCount} lesson pages.`,
);
