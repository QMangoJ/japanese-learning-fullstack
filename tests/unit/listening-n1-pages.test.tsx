import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { listeningN1BookChapters } from "../../app/data/listening-n1-book";
import { getListeningN1Lesson } from "../../app/data/listening-n1-lessons";
import { listeningN1Glosses } from "../../app/data/listening-n1-transcript-glosses";
import { listeningQuestionSupport } from "../../app/data/listening-n3-question-support";
import { ListeningN1Content, listeningN1QuestionSupport } from "../../app/routes/listening-n1";
import { resetStudyStateForTests, setLang } from "../../app/study/store";

beforeEach(() => {
	localStorage.clear();
	resetStudyStateForTests();
	setLang("cn");
});

describe("ListeningN1Content", () => {
	it("renders chapter 1 section 1 with answer, transcript, translation, and review", async () => {
		const user = userEvent.setup();
		render(<ListeningN1Content chapter={1} section={1} embedded />);
		expect(screen.getByRole("heading", { level: 1, name: /発音に関する聞き取り/ })).toBeInTheDocument();
		expect(document.querySelector("audio")).toHaveAttribute("src", "/audio/n1/cd1/CD01_02.mp3");

		const firstQuestion = screen.getAllByRole("heading", { level: 4 })[0].closest("article");
		expect(firstQuestion).toBeTruthy();
		await user.click(within(firstQuestion!).getByText("答案"));
		await user.click(within(firstQuestion!).getByText("听力原文"));
		expect(firstQuestion!.querySelector(".listening-text-answers__body[lang='ja']")?.textContent?.length).toBeGreaterThan(10);
		await user.click(within(firstQuestion!).getByText("译文"));
		await user.click(within(firstQuestion!).getByRole("button", { name: "没听清，加入明天复习" }));
		expect(within(firstQuestion!).getByRole("button", { name: "已加入明天复习" })).toBeInTheDocument();
	});

	it("plays chapter 3 section 5 from CD 2", () => {
		render(<ListeningN1Content chapter={3} section={5} embedded />);
		expect(document.querySelector("audio")).toHaveAttribute("src", "/audio/n1/cd2/CD02_01.mp3");
	});

	it("assigns an answer, transcript, and Chinese translation to every scored question", () => {
		const missing: string[] = [];
		let scored = 0;
		for (const chapter of listeningN1BookChapters()) {
			for (const section of chapter.sections) {
				const lesson = getListeningN1Lesson(chapter.number, section.number)!;
				const support = listeningQuestionSupport(lesson);
				lesson.blocks.forEach((block, index) => {
					if (block.type !== "q" || !/番|問題/.test(block.label)) return;
					scored += 1;
					const item = support.get(index);
					if (!item?.answer) missing.push(`${chapter.number}-${section.number} ${block.label} answer`);
					if (!item?.transcript) missing.push(`${chapter.number}-${section.number} ${block.label} transcript`);
					if (!item?.transcript_cn) missing.push(`${chapter.number}-${section.number} ${block.label} cn`);
				});
			}
		}
		expect(missing).toEqual([]);
		expect(scored).toBeGreaterThan(100);
	});

	it("aligns transcript glosses with the scored questions of each section", () => {
		for (const chapter of listeningN1BookChapters()) {
			for (const section of chapter.sections) {
				const support = listeningN1QuestionSupport(chapter.number, section.number);
				expect(listeningN1Glosses(chapter.number, section.number).length, `${chapter.number}-${section.number}`).toBe(support.size);
			}
		}
		const withGlosses = [...listeningN1QuestionSupport(3, 2).values()].filter((item) => item.glosses?.length);
		expect(withGlosses.length).toBeGreaterThan(0);
	});
});
