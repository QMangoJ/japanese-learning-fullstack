import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { listeningN2BookChapters } from "../../app/data/listening-n2-book";
import { listeningN2BodyCn, listeningN2BodyTranslation } from "../../app/data/listening-n2-body-support";
import { getListeningN2Lesson } from "../../app/data/listening-n2-lessons";
import type { ListeningLessonBlock } from "../../app/data/listening-n3-lesson-types";
import { listeningQuestionSupport } from "../../app/data/listening-n3-question-support";
import { listeningN2Glosses } from "../../app/data/listening-n2-transcript-glosses";
import { ListeningN2Content, listeningN2QuestionSupport } from "../../app/routes/listening-n2";
import { resetStudyStateForTests, setLang } from "../../app/study/store";

const KANA = /[\u3040-\u30ff]/u;
const HAN = /[\u4e00-\u9fff]/u;

beforeEach(() => {
	localStorage.clear();
	resetStudyStateForTests();
	setLang("cn");
});

/** 去掉「」（）里引用的日语后仍含假名，才算需要翻译的日语句子（排除「注意带「ない」的用法。」这类中文说明）。 */
const isJapanese = (line: string) => KANA.test(line.replace(/「[^」]*」|（[^）]*）/gu, ""));

/** 第1・2章讲解正文：没有自带 cn 的日语段落、例句与讲解框句子都必须有中文翻译。 */
function teachingLines(blocks: readonly ListeningLessonBlock[]): string[] {
	const out: string[] = [];
	for (const block of blocks) {
		if ((block.type === "p" || block.type === "h") && !block.cn && isJapanese(block.jp)) out.push(block.jp);
		if (block.type === "example") out.push(...block.lines.filter(isJapanese));
		if (block.type === "box") for (const item of block.items) out.push(...item.lines.filter(isJapanese));
	}
	return out;
}

describe("N2 listening chapters 1–2 Chinese translations", () => {
	for (const chapter of [1, 2]) {
		it(`translates the Japanese teaching content of chapter ${chapter}`, () => {
			const sections = listeningN2BookChapters().find((item) => item.number === chapter)!.sections;
			let checked = 0;
			const missing: string[] = [];
			for (const section of sections) {
				const lesson = getListeningN2Lesson(chapter, section.number)!;
				for (const line of teachingLines(lesson.blocks)) {
					checked += 1;
					const cn = listeningN2BodyTranslation(line);
					if (!cn?.trim() || !HAN.test(cn) || cn === line) missing.push(`${chapter}-${section.number}: ${line}`);
				}
			}
			expect(checked).toBeGreaterThan(20);
			expect(missing).toEqual([]);
		});
	}

	it("has no empty translation entries", () => {
		const entries = Object.entries(listeningN2BodyCn);
		expect(entries.length).toBeGreaterThan(200);
		for (const [jp, cn] of entries) expect(cn.trim(), jp).not.toBe("");
	});

	it("renders the Chinese under the Japanese example sentences", () => {
		render(<ListeningN2Content chapter={1} section={2} embedded />);
		const line = screen.getByText("店員が辞めた。店長は困った。→店長は店員に辞められた。");
		const cn = line.closest("p")!.querySelector(".listening-lesson__body-cn");
		expect(cn?.textContent).toBe(listeningN2BodyTranslation("店員が辞めた。店長は困った。→店長は店員に辞められた。"));
	});
});

/** 只有 N5/N4 词汇的原文（如「まだ間に合うよ」），按规则不列生词。 */
const BASIC_TRANSCRIPTS = new Set(["2-1#0"]);

describe("N2 listening transcript glosses", () => {
	it("glosses every question transcript with N3+ words", () => {
		let transcripts = 0;
		let words = 0;
		const problems: string[] = [];
		for (const chapter of listeningN2BookChapters()) {
			for (const section of chapter.sections) {
				const lesson = getListeningN2Lesson(chapter.number, section.number)!;
				const glosses = listeningN2Glosses(chapter.number, section.number);
				[...listeningQuestionSupport(lesson).values()].forEach((support, index) => {
					if (!support.transcript) return;
					transcripts += 1;
					const list = glosses[index];
					if (!list) problems.push(`${chapter.number}-${section.number}#${index} missing`);
					else if (!list.length && !BASIC_TRANSCRIPTS.has(`${chapter.number}-${section.number}#${index}`)) problems.push(`${chapter.number}-${section.number}#${index} empty`);
					if (!list) return;
					for (const g of list) {
						words += 1;
						if (!g.w.trim() || !g.r.trim() || !g.cn.trim()) problems.push(`${chapter.number}-${section.number}#${index} ${g.w}`);
						if (g.lv && !/^N[123]$/.test(g.lv)) problems.push(`${chapter.number}-${section.number}#${index} ${g.w} level ${g.lv}`);
					}
				});
			}
		}
		expect(problems).toEqual([]);
		expect(transcripts).toBeGreaterThan(100);
		expect(words).toBeGreaterThan(transcripts * 3);
	});

	it("attaches glosses to the matching question and shows them on demand", async () => {
		const user = userEvent.setup();
		const support = listeningN2QuestionSupport(2, 2);
		expect([...support.values()].every((item) => item.glosses?.length)).toBe(true);
		render(<ListeningN2Content chapter={2} section={2} embedded />);
		const question = screen.getByRole("heading", { level: 4, name: /^1番/ }).closest("article")!;
		await user.click(within(question).getByText(/^生词/));
		const first = listeningN2Glosses(2, 2)[0][0];
		expect(within(question).getAllByText(first.w).length).toBeGreaterThan(0);
		expect(within(question).getByText(first.cn)).toBeInTheDocument();
	});
});
