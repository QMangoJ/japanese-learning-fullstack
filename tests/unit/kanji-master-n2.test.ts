import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { filledKanjiExamForm, isKanjiExamAnswerCorrect, kanjiExamTargetIndex } from "../../app/data/kanji-exam";
import {
	KANJI_MASTER_SUMMARY,
	filterKanjiMasterQuestions,
	kanjiMasterScopeQuestions,
	kanjiMasterTests,
	updateKanjiMasterWrongBook,
	type KanjiMasterData,
	type KanjiMasterQuiz,
	type KanjiMasterStructure,
} from "../../app/data/kanji-master-n2";

const dir = join(process.cwd(), "public/data/kanji-master-n2");
const quiz = JSON.parse(readFileSync(join(dir, "quiz.json"), "utf8")) as KanjiMasterQuiz;
const structure = JSON.parse(readFileSync(join(dir, "structure.json"), "utf8")) as KanjiMasterStructure;
const data: KanjiMasterData = { structure, questions: quiz.questions };

describe("漢字マスター N2 data", () => {
	it("matches the book summary shown before loading", () => {
		const lessons = structure.chapters.flatMap((chapter) => chapter.lessons);
		expect(structure.chapters).toHaveLength(KANJI_MASTER_SUMMARY.chapters);
		expect(lessons).toHaveLength(KANJI_MASTER_SUMMARY.lessons);
		expect(lessons.flatMap((lesson) => lesson.kanjiList)).toHaveLength(KANJI_MASTER_SUMMARY.kanji);
		expect(quiz.questions).toHaveLength(KANJI_MASTER_SUMMARY.questions);
		expect(quiz.questions.filter((question) => question.kind === "reading")).toHaveLength(3362);
		expect(quiz.questions.filter((question) => question.kind === "writing")).toHaveLength(3332);
		expect(structure.parts.map((part) => part.name)).toEqual(["基本編", "挑戦編"]);
	});

	it("has unique ids, known lessons and a locatable target for every question", () => {
		const lessonIds = new Set(structure.chapters.flatMap((chapter) => chapter.lessons.map((lesson) => lesson.id)));
		expect(new Set(quiz.questions.map((question) => question.id)).size).toBe(quiz.questions.length);
		for (const question of quiz.questions) {
			expect(lessonIds.has(question.lessonId), question.id).toBe(true);
			const index = kanjiExamTargetIndex(question);
			expect(index, question.id).toBeGreaterThanOrEqual(0);
			expect(question.prompt.slice(index, index + question.target.length)).toBe(question.target);
			expect(question.answer.trim()).not.toBe("");
		}
	});

	it("keeps every choice question's correct option equal to its answer", () => {
		const choiceQuestions = quiz.questions.filter((question) => question.choices);
		expect(choiceQuestions).toHaveLength(110);
		for (const question of choiceQuestions) {
			expect(question.choices![question.correctChoice! - 1]).toBe(question.answer);
			expect(isKanjiExamAnswerCorrect(question, question.choices![question.correctChoice! - 1]!)).toBe(true);
		}
	});
});

describe("blank position (targetIndex)", () => {
	const repeated = quiz.questions.filter((question) => typeof question.targetIndex === "number");

	it("covers exactly the two questions whose blank is not the first occurrence", () => {
		expect(repeated.map((question) => question.id).sort()).toEqual(["km-ch16-2-writing-143-13", "km-ch3-5-writing-40-18"]);
	});

	it("fills the marked blank, not the first matching kana", () => {
		const eien = repeated.find((question) => question.id === "km-ch3-5-writing-40-18")!;
		expect(eien.prompt).toBe("彼女の演技ははえて見えた");
		expect(kanjiExamTargetIndex(eien)).toBe(6);
		expect(filledKanjiExamForm(eien)).toBe("彼女の演技は栄えて見えた");
		// The old first-occurrence logic would have replaced the particle は.
		expect(filledKanjiExamForm({ ...eien, targetIndex: undefined })).toBe("彼女の演技栄はえて見えた");

		const nobita = repeated.find((question) => question.id === "km-ch16-2-writing-143-13")!;
		expect(filledKanjiExamForm(nobita)).toBe("会が予定の時間より延びた");
		expect(filledKanjiExamForm({ ...nobita, targetIndex: undefined })).toBe("会が予定延時間よりのびた");
	});

	it("matches the book's complete phrase for every writing question", () => {
		const withPhrase = quiz.questions.filter((question) => question.kind === "writing" && question.completePhrase);
		expect(withPhrase.length).toBeGreaterThan(2900);
		for (const question of withPhrase) expect(filledKanjiExamForm(question), question.id).toBe(question.completePhrase);
	});

	it("ignores a targetIndex that does not point at the target", () => {
		expect(kanjiExamTargetIndex({ prompt: "はははえる", target: "は", targetIndex: 99 })).toBe(0);
		expect(kanjiExamTargetIndex({ prompt: "あいう", target: "い", targetIndex: 0 })).toBe(1);
	});
});

describe("practice scopes", () => {
	it("by lesson uses that lesson's example words only", () => {
		const lesson = kanjiMasterScopeQuestions(data, { type: "lesson", lessonId: "km-ch1-1" });
		expect(lesson.length).toBeGreaterThan(40);
		expect(lesson.every((question) => question.lessonId === "km-ch1-1" && question.source === "example")).toBe(true);
	});

	it("chapter review adds the chapter-end 復習, keyed by the 復習 page", () => {
		const chapter6 = kanjiMasterScopeQuestions(data, { type: "chapter", chapter: 6 });
		const examples = quiz.questions.filter((question) => question.source === "example" && question.chapter === 6);
		const reviews = chapter6.filter((question) => question.source === "review");
		expect(chapter6).toHaveLength(examples.length + reviews.length);
		expect(reviews).toHaveLength(20);
		// 習慣 is a chapter-5 kanji but printed on the chapter-6 復習 page.
		expect(reviews.map((question) => question.id)).toContain("km-review-p63-s2-10");
		expect(kanjiMasterScopeQuestions(data, { type: "chapter", chapter: 5 }).map((question) => question.id)).not.toContain("km-review-p63-s2-10");
	});

	it("lists the 15 printed tests in book order", () => {
		const tests = kanjiMasterTests(quiz.questions);
		expect(tests).toHaveLength(15);
		expect(tests.map((test) => test.page)).toEqual([...tests.map((test) => test.page)].sort((a, b) => a - b));
		expect(tests.reduce((sum, test) => sum + test.count, 0)).toBe(270 + 80 + 30);
		const first = tests[0];
		expect(first).toMatchObject({ source: "achievement", page: 32, chapters: [1, 2], count: 30 });
		expect(kanjiMasterScopeQuestions(data, { type: "test", testId: first.id })).toHaveLength(30);
	});

	it("splits the whole book into 基本編 and 挑戦編", () => {
		const basic = kanjiMasterScopeQuestions(data, { type: "part", part: "基本編" });
		const challenge = kanjiMasterScopeQuestions(data, { type: "part", part: "挑戦編" });
		expect(basic.length + challenge.length).toBe(quiz.questions.length);
		expect(basic.every((question) => question.chapter <= 10)).toBe(true);
		expect(kanjiMasterScopeQuestions(data, { type: "book" })).toHaveLength(quiz.questions.length);
	});

	it("filters by kind and by the wrong-question book", () => {
		const book = kanjiMasterScopeQuestions(data, { type: "book" });
		expect(filterKanjiMasterQuestions(book, "reading")).toHaveLength(3362);
		expect(filterKanjiMasterQuestions(book, "writing")).toHaveLength(3332);
		const wrong = new Set(["km-ch1-1-reading-20-1", "km-ch1-1-writing-20-1"]);
		expect(filterKanjiMasterQuestions(book, "mixed", wrong).map((question) => question.id)).toEqual([...wrong]);
		expect(filterKanjiMasterQuestions(book, "writing", wrong).map((question) => question.id)).toEqual(["km-ch1-1-writing-20-1"]);
	});
});

describe("wrong-question book", () => {
	const now = new Date("2026-11-16T00:00:00.000Z");

	it("adds misses, and clears a question after two correct answers in a row", () => {
		let book = updateKanjiMasterWrongBook({}, [{ id: "a", correct: false }, { id: "b", correct: true }], now);
		expect(book).toEqual({ a: { misses: 1, streak: 0, lastWrongAt: now.toISOString() } });
		book = updateKanjiMasterWrongBook(book, [{ id: "a", correct: true }], now);
		expect(book.a.streak).toBe(1);
		book = updateKanjiMasterWrongBook(book, [{ id: "a", correct: false }], now);
		expect(book.a).toMatchObject({ misses: 2, streak: 0 });
		book = updateKanjiMasterWrongBook(book, [{ id: "a", correct: true }], now);
		book = updateKanjiMasterWrongBook(book, [{ id: "a", correct: true }], now);
		expect(book).toEqual({});
	});
});
