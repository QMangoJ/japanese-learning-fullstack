import { describe, expect, it } from "vitest";

import { KANJI_EXAM_BATCHES } from "../../app/data/kanji-exam";
import { vocabForLesson } from "../../app/data/kanji-exam-vocab";

describe("kanji exam word list", () => {
	it("covers every kanji of every lesson with words and readings", () => {
		for (const batch of KANJI_EXAM_BATCHES) {
			for (const lesson of batch.lessons) {
				const entries = vocabForLesson(lesson);
				expect(entries.map((entry) => entry.kanji), lesson.id).toEqual(lesson.kanji);
				for (const entry of entries) {
					expect(entry.words.length, `${lesson.id} ${entry.kanji}`).toBeGreaterThan(0);
					for (const item of entry.words) {
						expect(item.word, `${lesson.id} ${entry.kanji}`).toContain(entry.kanji);
						expect(item.reading.trim(), `${lesson.id} ${item.word}`).not.toBe("");
						// Readings are kana (plus the long-vowel mark).
						expect(item.reading, `${lesson.id} ${item.word}`).toMatch(/^[ぁ-んァ-ヶー]+$/);
					}
				}
			}
		}
	});

	it("annotates every listed word with a Chinese gloss, part of speech and example", () => {
		for (const batch of KANJI_EXAM_BATCHES) {
			for (const lesson of batch.lessons) {
				for (const entry of vocabForLesson(lesson)) {
					for (const item of entry.words) {
						expect(item.meaningZh?.trim(), `${lesson.id} ${item.word}`).toBeTruthy();
						expect(item.pos?.trim(), `${lesson.id} ${item.word}`).toBeTruthy();
						expect(item.example?.trim(), `${lesson.id} ${item.word}`).toBeTruthy();
						expect(item.example, `${lesson.id} ${item.word}`).toMatch(/。$/);
					}
				}
			}
		}
	});

	it("lists the textbook words for chapter 9 from the book only", () => {
		const chapter9 = KANJI_EXAM_BATCHES.find((batch) => batch.title.includes("第9章"))!;
		const sports = vocabForLesson(chapter9.lessons[0]);
		expect(sports.find((entry) => entry.kanji === "歩")?.words.map(({ word, reading }) => ({ word, reading }))).toEqual([
			{ word: "万歩計", reading: "まんぽけい" },
			{ word: "歩行者", reading: "ほこうしゃ" },
			{ word: "歩道", reading: "ほどう" },
			{ word: "歩く", reading: "あるく" },
			{ word: "散歩", reading: "さんぽ" },
			{ word: "歩行者天国", reading: "ほこうしゃてんごく" },
		]);
		const resort = vocabForLesson(chapter9.lessons[1]);
		expect(resort.find((entry) => entry.kanji === "然")?.words.map((item) => item.word)).toEqual([
			"自然", "全然", "天然水", "天然記念物", "当然",
		]);
		const countryside = vocabForLesson(chapter9.lessons[2]);
		expect(countryside.find((entry) => entry.kanji === "里")?.words.map((item) => item.word)).toEqual([
			"ふる里", "人里", "一里", "里帰り",
		]);
	});

	it("lists the textbook words for chapter 8 from the book only", () => {
		const chapter8 = KANJI_EXAM_BATCHES.find((batch) => batch.title.includes("第8章"))!;
		const study = vocabForLesson(chapter8.lessons[0]);
		expect(study.find((entry) => entry.kanji === "漢")?.words.map(({ word, reading }) => ({ word, reading }))).toEqual([
			{ word: "漢字", reading: "かんじ" },
			{ word: "漢数字", reading: "かんすうじ" },
			{ word: "漢和辞典", reading: "かんわじてん" },
			{ word: "漢方薬", reading: "かんぽうやく" },
		]);
		const library = vocabForLesson(chapter8.lessons[2]);
		expect(library.find((entry) => entry.kanji === "図")?.words.map((item) => item.word)).toEqual([
			"図", "地図", "図書館", "植物図鑑", "動物図鑑",
		]);
	});
});
