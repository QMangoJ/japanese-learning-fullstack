import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const vocab = JSON.parse(await readFile(resolve(root, "public/data/vocab.856eb48e32.json"), "utf8"));
const kanji = JSON.parse(await readFile(resolve(root, "public/data/kanji.e43232869e.json"), "utf8"));
const translations = JSON.parse(
	await readFile(resolve(root, "public/data/n3-vocab-kanji-daily-translations.json"), "utf8"),
);
const store = await readFile(resolve(root, "app/study/store.ts"), "utf8");
const days = await readFile(resolve(root, "app/study/days.tsx"), "utf8");

function validateDailyBook(book, generated, label, expectedItems) {
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
	assert.equal(dayCount, 36, `${label}: expected all 36 daily lesson pages`);
	assert.equal(itemCount, expectedItems, `${label}: unexpected daily question count`);
	return { dayCount, itemCount };
}

function weeklyItems(day) {
	return ["mondai1", "mondai2", "mondai3", "mondai4"].flatMap((key) => day[key]?.items || []);
}

const vocabResult = validateDailyBook(vocab, translations.vocab, "vocab", 288);
const kanjiResult = validateDailyBook(kanji, translations.kanji, "kanji", 568);

for (const week of vocab.weeks || []) {
	const exam = week.days.find((day) => day.day === 7);
	assert.equal(weeklyItems(exam).length, 25, `vocab w${week.n}: expected 25 weekend questions`);
	assert.ok(exam.answers, `vocab w${week.n}: weekend answers are required for existing analysis`);
}
for (const week of kanji.weeks || []) {
	const exam = week.days.find((day) => day.day === 7);
	const items = weeklyItems(exam);
	assert.equal(items.length, 20, `kanji w${week.n}: expected 20 weekend questions`);
	assert.ok(items.every((item) => Array.isArray(item.opts) && item.opts.length), `kanji w${week.n}: weekend question without options`);
	assert.ok(exam.answers || week.n <= 4, `kanji w${week.n}: weekend answers are required for existing analysis`);
}

assert.equal(translations.version, 1, "unexpected translation data version");
assert.match(translations.vocab.w3d3.items[5].translation, /八折/, "20% off must be translated as 八折");
assert.match(translations.kanji.w4d4.items[3].translation, /申报税款/, "税金を申告する must mean 申报税款");
assert.match(translations.kanji.w5d1.items[1].translation, /感谢/, "お礼 must mean thanks, not apology");
assert.match(store, /n3-vocab-kanji-daily-translations\.json/, "runtime must load N3 vocab/kanji translations");
assert.match(days, /MODULE === "n2vocab" \? V2 : MODULE === "n4vocab" \? V4 : V/, "each vocab level must read its own daily_translations book");
assert.match(days, /MODULE === "n2kanji" \? K2 : MODULE === "n4kanji" \? K4 : K/, "each kanji level must read its own daily_translations book");
assert.match(days, /DailyTranslationOnly/, "runtime must render translation-only controls");
assert.match(days, /kind: "exam-question"/, "weekend favorites must be identifiable as full questions");
assert.match(days, /data-fav-style="exam"/, "weekend favorite buttons must use the labeled toggle state");
assert.match(days, /ExamVocab/, "every vocab weekend question page must render favorites");
assert.match(days, /ExamKanji/, "every kanji weekend question page must render favorites");

console.log(
	`Validated ${vocabResult.itemCount} N3 vocab and ${kanjiResult.itemCount} N3 kanji daily translations; all 270 weekend questions retain their existing analysis and favorite controls.`,
);
