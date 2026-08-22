import { describe, expect, it } from "vitest";

import { listeningBookChapters } from "../../app/data/listening-n3-book";
import { getListeningLesson } from "../../app/data/listening-n3-lessons";
import { listeningQuestionSupport } from "../../app/data/listening-n3-question-support";

describe("listeningQuestionSupport", () => {
	it("maps complete answer, transcript and translations to every formal question", () => {
		for (const chapter of listeningBookChapters) {
			for (const section of chapter.sections) {
				const lesson = getListeningLesson(chapter.number, section.number)!;
				const support = [...listeningQuestionSupport(lesson).values()];
				expect(support.length, `${chapter.number}-${section.number} needs mapped questions`).toBeGreaterThan(0);
				for (const [index, item] of support.entries()) {
					const at = `${chapter.number}-${section.number} question ${index + 1}`;
					expect(item.answer, `${at} answer`).toBeTruthy();
					expect(item.transcript, `${at} transcript`).toBeTruthy();
					expect(item.transcript_cn, `${at} Chinese translation`).toBeTruthy();
					expect(item.transcript_en, `${at} English translation`).toBeTruthy();
				}
			}
		}
	});

	it("does not attach the chapter 2 worked example to the first formal exercise", () => {
		const lesson = getListeningLesson(2, 1)!;
		const support = listeningQuestionSupport(lesson);
		const questionIndexes = lesson.blocks.flatMap((block, index) => block.type === "q" ? [index] : []);
		expect(support.has(questionIndexes[0])).toBe(false);
		expect(support.get(questionIndexes[1])?.answer).toBe("1番：2");
		expect(support.get(questionIndexes[1])?.transcript).toContain("テレビを消してくれない");
		expect(support.get(questionIndexes[2])?.transcript_cn).toContain("公司来客人了");
	});

	it("keeps repeated question numbers in their own comprehensive-test groups", () => {
		const lesson = getListeningLesson(2, 6)!;
		const support = [...listeningQuestionSupport(lesson).values()];
		expect(support).toHaveLength(12);
		expect(support[0].answer).toMatch(/問題I\s+1番：2/);
		expect(support[2].answer).toMatch(/問題II\s+1番：1/);
		expect(support[10].answer).toMatch(/問題V\s+1番：2/);
		expect(support[10].transcript).toContain("アンケートの結果");
		expect(support[11].transcript).toContain("留守番電話");
	});

	it("separates all six questions in chapter 1 section 5", () => {
		const lesson = getListeningLesson(1, 5)!;
		const support = [...listeningQuestionSupport(lesson).values()];
		expect(support).toHaveLength(6);
		expect(support[0].transcript).toContain("ふうとう");
		expect(support[2].answer).toMatch(/2番：①1/);
		expect(support[2].transcript).toContain("写真を撮っていただけませんか");
		expect(support[2].transcript_cn).toContain("拍张照片");
		expect(support[5].transcript).toContain("証明書をお書きします");
	});
});
