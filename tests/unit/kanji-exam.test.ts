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
import { validateKanjiExamParseRequest } from "../../app/kanji-exam/parser";
import { action as parseAction, loader as parseLoader } from "../../app/routes/api.kanji-exam-parse";
import { memoryKv, routeContext, testEnv } from "./auth-test-utils";

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
	});
});

describe("kanji exam parser contract", () => {
	it("validates provider-neutral image payloads", () => {
		expect(validateKanjiExamParseRequest({ images: [] })).toBe("at least one image is required");
		expect(validateKanjiExamParseRequest({ images: [{ name: "page.heic", mimeType: "image/heic", dataBase64: "YWJj" }] })).toBeNull();
		expect(validateKanjiExamParseRequest({ images: [{ name: "page.gif", mimeType: "image/gif", dataBase64: "YWJj" }] })).toBe("unsupported image type");
	});

	it("exposes configuration status and fails closed before a provider is installed", async () => {
		const context = routeContext(testEnv(memoryKv()));
		const status = await parseLoader({ request: new Request("http://localhost/api/kanji-exam/parse"), context });
		expect(await status.json()).toMatchObject({ configured: false, endpointVersion: 1, reviewRequired: true });

		const response = await parseAction({
			request: new Request("http://localhost/api/kanji-exam/parse", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ images: [{ name: "page.heic", mimeType: "image/heic", dataBase64: "YWJj" }] }),
			}),
			context,
		});
		expect(response.status).toBe(503);
		expect(await response.json()).toMatchObject({ code: "KANJI_EXAM_PARSER_NOT_CONFIGURED" });
	});
});
