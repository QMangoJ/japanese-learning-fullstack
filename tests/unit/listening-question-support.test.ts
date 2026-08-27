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
		expect(support[2].transcript).toContain("写真を撮ってもらえませんか");
		expect(support[2].transcript).toContain("いつもごちそうになってるから");
		expect(support[2].transcript_cn).toContain("拍张照片");
		expect(support[3].transcript).toContain("午後なら空いているんですが、午前はちょっと");
		expect(support[3].transcript).not.toContain("予定がない");
		expect(support[3].transcript_cn).toContain("下午的话我没有安排，上午就有点");
		expect(support[3].transcript_en).toContain("I'm free in the afternoon");
		expect(support[5].transcript).toContain("証明書をお書きします");
	});

	it("keeps audited listening scripts aligned with the source pages", () => {
		const chapter1Section4 = getListeningLesson(1, 4)!;
		expect(chapter1Section4.transcript).toContain("ねえねえ、それでさあ、結局ね");
		expect(chapter1Section4.transcript).not.toContain("結果ね");
		expect(chapter1Section4.transcript).toContain("受付は11時までとなっております");
		expect(chapter1Section4.transcript).not.toContain("ぼくが言うから");

		const chapter1Section5 = getListeningLesson(1, 5)!;
		expect(chapter1Section5.transcript).toContain("みんなの前で発表してもらいます");
		expect(chapter1Section5.transcript).toContain("先に食事に行っていいよ");
		expect(chapter1Section5.transcript).toContain("どうされましたか");

		const chapter2Section2 = getListeningLesson(2, 2)!;
		expect(chapter2Section2.transcript).toContain("へえー、そうなるのー");
		expect(chapter2Section2.transcript).not.toContain("へえー、そうするのー");

		const chapter1Section3 = getListeningLesson(1, 3)!;
		expect(chapter1Section3.transcript).toContain("2番目にお待ちのお客様、こちらにどうぞ");
		expect(chapter1Section3.transcript).toContain("本日のランチです。AとBがございます");

		const chapter2Section3 = getListeningLesson(2, 3)!;
		expect(chapter2Section3.transcript).toContain("ガレージ低いのに");
		expect(chapter2Section3.transcript).not.toContain("ガレージ狭いのに");

		const chapter2Section5 = getListeningLesson(2, 5)!;
		expect(chapter2Section5.transcript).toContain("お聞きしたいことがありまして");
		expect(chapter2Section5.transcript).not.toContain("お時間を早めたい");

		const chapter4Section5 = getListeningLesson(4, 5)!;
		expect(chapter4Section5.transcript).toContain("右側5階建てのマンションよ");
		expect(chapter4Section5.transcript).not.toContain("左側5階建て");

		const chapter5Section2 = getListeningLesson(5, 2)!;
		expect(chapter5Section2.transcript).toContain("遊ばれたあとじゃ、弱って");
		expect(chapter5Section2.transcript).toContain("来月の給料日には必ず");
		expect(chapter5Section2.transcript).not.toContain("遊ばれたおもちゃ");

		const chapter5Section3 = getListeningLesson(5, 3)!;
		expect(chapter5Section3.transcript).toContain("一緒にセールに行ってほしい");
		expect(chapter5Section3.transcript).not.toContain("一緒にゴルフに行ってほしい");

		const chapter5Section5 = getListeningLesson(5, 5)!;
		expect(chapter5Section5.transcript).toContain("バスは混んでるよ");
		expect(chapter5Section5.transcript).not.toContain("バスは遅れてるよ");
	});
});
