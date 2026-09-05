import { describe, expect, it } from "vitest";

import {
	KANJI_EXAM_BATCHES,
	isKanjiExamAnswerCorrect,
	normalizeKanjiExamAnswer,
	questionsForMode,
	shuffleKanjiExamQuestions,
} from "../../app/data/kanji-exam";
import {
	englishBatchLabel,
	englishLessonLabel,
	englishSupportForQuestion,
	missingEnglishSupport,
} from "../../app/data/kanji-exam-english";
import { chineseMeaningForQuestion } from "../../app/data/kanji-exam-chinese";

describe("kanji exam question bank", () => {
	it("keeps all reviewed photo pages in three school units", () => {
		const batch = KANJI_EXAM_BATCHES[0];
		expect(batch.lessons.map((lesson) => lesson.title)).toEqual(["2章-1 レジ", "2章-2 店内", "2章-3 24時間"]);
		expect(batch.lessons.flatMap((lesson) => lesson.pages)).toEqual([43, 44, 45, 47, 49, 50, 51, 53, 55, 56, 57, 59]);
		expect(questionsForMode(batch, "reading")).toHaveLength(62);
		expect(questionsForMode(batch, "writing")).toHaveLength(89);
		expect(questionsForMode(batch, "mixed")).toHaveLength(151);
	});

	it("has stable unique ids and a visible target for every question", () => {
		const questions = KANJI_EXAM_BATCHES.flatMap((batch) => questionsForMode(batch, "mixed"));
		expect(new Set(questions.map((question) => question.id)).size).toBe(questions.length);
		for (const question of questions) {
			expect(question.prompt).toContain(question.target);
			expect(question.answer.trim()).not.toBe("");
		}
	});

	it("includes every reviewed page from chapters 3 and 4", () => {
		expect(KANJI_EXAM_BATCHES.map((batch) => batch.title)).toEqual([
			"学校汉字 · 第2章",
			"学校汉字 · 第3章",
			"学校汉字 · 第4章",
		]);
		expect(KANJI_EXAM_BATCHES[1].lessons.flatMap((lesson) => lesson.pages)).toEqual([65, 66, 67, 68, 71, 72, 73, 74, 77, 78, 79, 80]);
		expect(KANJI_EXAM_BATCHES[2].lessons.flatMap((lesson) => lesson.pages)).toEqual([87, 88, 89, 90, 93, 94, 95, 96, 99, 100, 101, 102]);
		for (const batch of KANJI_EXAM_BATCHES.slice(1)) {
			expect(batch.lessons).toHaveLength(3);
			expect(questionsForMode(batch, "reading").length).toBeGreaterThan(50);
			expect(questionsForMode(batch, "writing").length).toBeGreaterThan(70);
		}
	});

	it("shuffles without losing or duplicating questions", () => {
		const source = questionsForMode(KANJI_EXAM_BATCHES[1], "mixed");
		let value = 0;
		const shuffled = shuffleKanjiExamQuestions(source, () => (value = (value + 0.37) % 1));
		expect(shuffled).toHaveLength(source.length);
		expect(new Set(shuffled.map((question) => question.id))).toEqual(new Set(source.map((question) => question.id)));
		expect(shuffled.map((question) => question.id)).not.toEqual(source.map((question) => question.id));
	});

	it("accepts equivalent kana and only the target kanji in writing questions", () => {
		const batch = KANJI_EXAM_BATCHES[0];
		const reading = questionsForMode(batch, "reading").find((question) => question.target === "銀行");
		const writing = questionsForMode(batch, "writing").find((question) => question.prompt === "木をきる");
		expect(reading && isKanjiExamAnswerCorrect(reading, "ギンコウ")).toBe(true);
		expect(writing && isKanjiExamAnswerCorrect(writing, "切")).toBe(true);
		expect(writing && isKanjiExamAnswerCorrect(writing, "木を切る")).toBe(false);
		expect(normalizeKanjiExamAnswer("  ギン コウ。", "reading")).toBe("ぎんこう");
	});

	it("keeps surrounding kana and tests only kanji taught on that page", () => {
		const batch = KANJI_EXAM_BATCHES[0];
		const cafe = questionsForMode(batch, "writing").find((question) => question.prompt === "きっさてん");
		expect(cafe).toMatchObject({ target: "てん", answer: "店" });
		expect(cafe && isKanjiExamAnswerCorrect(cafe, "喫茶店")).toBe(false);

		for (const item of KANJI_EXAM_BATCHES) {
			for (const lesson of item.lessons) {
				for (const question of lesson.questions.filter((candidate) => candidate.kind === "writing")) {
					const answerKanji = question.answer.match(/\p{Script=Han}/gu) || [];
					expect(answerKanji.length).toBeGreaterThan(0);
					expect(answerKanji.every((kanji) => lesson.kanji.includes(kanji))).toBe(true);
				}
			}
		}
	});

	it("provides reviewed English support for every imported question", () => {
		const questions = KANJI_EXAM_BATCHES.flatMap((batch) => questionsForMode(batch, "mixed"));
		expect(missingEnglishSupport(questions)).toEqual([]);
		expect(englishBatchLabel(KANJI_EXAM_BATCHES[1])).toMatchObject({ title: "School Kanji · Chapter 3" });
		expect(englishLessonLabel("ch4-2-anniversary", "fallback")).toBe("Chapter 4-2 · Wedding anniversary");
		const giftCertificate = questions.find((question) => question.target === "商品券");
		expect(giftCertificate && englishSupportForQuestion(giftCertificate).meaning).toBe("gift certificate");

		const meaningFor = (target: string) => {
			const question = questions.find((candidate) => candidate.kind === "reading" && candidate.target === target);
			expect(question, `missing reading question for ${target}`).toBeTruthy();
			return englishSupportForQuestion(question!).meaning;
		};
		expect(meaningFor("折り紙")).toBe("origami paper; colored folding paper");
		expect(meaningFor("便")).toBe("flight; transport service");
		expect(meaningFor("送りました")).toBe("took; accompanied (someone)");
		expect(meaningFor("重ねて")).toBe("in layers; layer one over another");
		expect(meaningFor("軽く")).toBe("lighter; less sluggish");
		expect(meaningFor("有力")).toBe("valuable; promising (information or a lead)");
		expect(meaningFor("本場")).toBe("home; place of origin");
	});

	it("provides Chinese meanings for every chapter and preserves contextual senses", () => {
		const questions = KANJI_EXAM_BATCHES.flatMap((batch) => questionsForMode(batch, "mixed"));
		for (const question of questions) {
			const meaning = chineseMeaningForQuestion(question);
			expect(meaning, question.id).not.toBe("词义待补充");
			expect(meaning, question.id).toMatch(/\p{Script=Han}/u);
		}
		const readingMeaning = (target: string) => chineseMeaningForQuestion(questions.find((question) => question.kind === "reading" && question.target === target)!);
		expect(readingMeaning("折り紙")).toBe("折纸用的彩纸");
		expect(readingMeaning("送りました")).toBe("送了（某人到某处）");
		expect(readingMeaning("便")).toBe("航班；交通班次");
		expect(readingMeaning("軽く")).toBe("轻松；轻快（身体的感觉）");
		expect(readingMeaning("当てました")).toBe("抽中了（奖品）");
		expect(readingMeaning("本場")).toBe("发源地；正宗产地");
		expect(chineseMeaningForQuestion({ kind: "writing", target: "てん", answer: "店" })).toBe("店铺；商店");
		expect(chineseMeaningForQuestion({ kind: "reading", target: "未収録", answer: "みしゅうろく" })).toBe("词义待补充");
	});
});
