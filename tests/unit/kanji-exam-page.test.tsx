import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { KANJI_EXAM_BATCHES, completeKanjiWord, questionsForMode } from "../../app/data/kanji-exam";
import { englishSupportForQuestion } from "../../app/data/kanji-exam-english";
import { chineseMeaningForQuestion } from "../../app/data/kanji-exam-chinese";
import { KanjiExamPage } from "../../app/study/KanjiExamPage";

describe("KanjiExamPage answers", () => {
	beforeEach(() => localStorage.clear());
	afterEach(() => vi.restoreAllMocks());

	it.each(["0", "1"])("shows meanings on every result with practice support set to %s", async (preference) => {
		localStorage.setItem("jp-kanji-exam-english-support-v1", preference);
		vi.spyOn(window, "requestAnimationFrame").mockReturnValue(0);
		const user = userEvent.setup();
		const { container } = render(<KanjiExamPage />);
		await user.click(screen.getByRole("button", { name: /10题|10 questions/ }));
		await user.click(screen.getByRole("button", { name: /开始随机练习|Start randomized practice/ }));
		expect(container.querySelectorAll(".kanji-exam-english-support")).toHaveLength(preference === "1" ? 10 : 0);

		const bank = questionsForMode(KANJI_EXAM_BATCHES[0], "mixed");
		const testedQuestions = screen.getAllByRole("textbox").map((input, index) => {
			const prompt = input.getAttribute("aria-label")!.replace(/^\d+\. /, "");
			const target = input.closest(".kanji-exam-question")!.querySelector("mark")!.textContent;
			const question = bank.find((candidate) => candidate.prompt === prompt && candidate.target === target)!;
			fireEvent.change(input, { target: { value: index === 0 ? question.answer : "wrong" } });
			return question;
		});
		await user.click(screen.getByRole("button", { name: /交卷并查看答案|Submit and see answers/ }));
		expect(screen.getByText(/答对 1 题，答错 9 题|1 correct, 9 incorrect/)).toBeInTheDocument();
		expect(container.querySelectorAll(".kanji-exam-answer-gloss")).toHaveLength(10);
		container.querySelectorAll(".kanji-exam-question").forEach((item, index) => {
			const question = testedQuestions[index];
			const word = completeKanjiWord(question);
			expect(item.querySelector(".kanji-exam-answer-gloss [lang='en']")).toHaveTextContent(englishSupportForQuestion(question, word).meaning);
			expect(item.querySelector(".kanji-exam-answer-gloss [lang='zh-Hans']")).toHaveTextContent(chineseMeaningForQuestion(question, word));
		});
		expect(localStorage.getItem("jp-kanji-exam-english-support-v1")).toBe(preference);
		await user.click(screen.getByRole("button", { name: /只重练错题（9）|Retry incorrect \(9\)/ }));
		expect(screen.getAllByRole("textbox")).toHaveLength(9);
		expect(container.querySelectorAll(".kanji-exam-review-meaning")).toHaveLength(0);
		expect(container.querySelectorAll(".kanji-exam-english-support")).toHaveLength(preference === "1" ? 9 : 0);
	});

	it("shows the complete kanji form next to writing answers", async () => {
		const user = userEvent.setup();
		const { container } = render(<KanjiExamPage />);
		await user.click(screen.getByRole("button", { name: /只练汉字|Kanji only/ }));
		await user.click(screen.getByRole("button", { name: /整章全部|Entire chapter/ }));
		await user.click(screen.getByRole("button", { name: /开始随机练习|Start randomized practice/ }));
		await user.click(screen.getByRole("button", { name: /显示全部答案|Show all answers/ }));
		const cafe = [...container.querySelectorAll(".kanji-exam-question")].find((item) =>
			item.querySelector("p")?.textContent?.includes("きっさてん"),
		);
		expect(cafe).toBeTruthy();
		expect(cafe!.querySelector(".kanji-exam-correction strong")?.textContent).toBe("店");
		expect(cafe!.querySelector(".kanji-exam-full-kanji")?.textContent).toBe("喫茶店");
		expect(cafe!.querySelector(".kanji-exam-full-kanji mark")?.textContent).toBe("店");
		expect(cafe!.querySelector(".kanji-exam-answer-gloss [lang='zh-Hans']")?.textContent).toBe("咖啡店；茶馆");
		expect(cafe!.querySelector(".kanji-exam-answer-gloss [lang='en']")?.textContent).toBe("coffee shop; tea house");
	});

	it("reveals and hides every answer without filling the response inputs", async () => {
		const user = userEvent.setup();
		const { container } = render(<KanjiExamPage />);

		await user.click(screen.getByRole("button", { name: /10题|10 questions/ }));
		await user.click(screen.getByRole("button", { name: /开始随机练习|Start randomized practice/ }));
		expect(container.querySelectorAll(".kanji-exam-correction")).toHaveLength(0);

		await user.click(screen.getByRole("button", { name: /显示全部答案|Show all answers/ }));
		expect(container.querySelectorAll(".kanji-exam-correction.answer-key")).toHaveLength(10);
		expect(screen.getAllByRole("textbox").every((input) => (input as HTMLInputElement).value === "")).toBe(true);
		expect(screen.getByText(/还需完成 10 题|10 remaining/)).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: /隐藏全部答案|Hide all answers/ }));
		expect(container.querySelectorAll(".kanji-exam-correction")).toHaveLength(0);
	});

	it("removes one saved incorrect item without changing the attempt score", async () => {
		localStorage.setItem("jp-kanji-exam-english-support-v1", "0");
		localStorage.setItem("jp-kanji-exam-history-v1", JSON.stringify([
			{
				id: "attempt-1",
				batchId: "school-ch2",
				batchTitle: "学校汉字 · 第2章",
				mode: "mixed",
				correct: 8,
				total: 10,
				completedAt: "2026-08-30T08:00:00.000Z",
				wrongQuestions: [
					{ questionId: "wrong-1", lessonTitle: "2章-1 レジ", kind: "reading", prompt: "あの店です。", target: "店", answer: "みせ", userAnswer: "てん" },
					{ questionId: "wrong-2", lessonTitle: "2章-1 レジ", kind: "writing", prompt: "きっさてん", target: "てん", answer: "店", userAnswer: "点" },
				],
			},
		]));
		const user = userEvent.setup();
		const { container } = render(<KanjiExamPage />);
		await screen.findByText(/错题（2）|Incorrect \(2\)/);
		await user.click(container.querySelector(".kanji-exam-history summary")!);
		const meanings = container.querySelectorAll(".kanji-exam-history .kanji-exam-review-meaning");
		expect(meanings).toHaveLength(2);
		expect(meanings[0].querySelector("b")).toHaveTextContent("词义 · Word meaning");
		expect(meanings[1].querySelector("b")).toHaveTextContent("汉字释义 · Word meaning");
		expect(meanings[0].querySelector('[lang="zh-Hans"]')).toHaveTextContent("店铺；商店");
		expect(meanings[0].querySelector('[lang="en"]')).toHaveTextContent("shop; store");
		expect(meanings[1].querySelector('[lang="zh-Hans"]')).toHaveTextContent("咖啡店；茶馆");
		expect(meanings[1].querySelector('[lang="en"]')).toHaveTextContent("coffee shop; tea house");
		const cafeWrong = [...container.querySelectorAll(".kanji-exam-history__wrong-item")].find((item) =>
			item.textContent?.includes("きっさてん"),
		);
		expect(cafeWrong?.querySelector(".kanji-exam-full-kanji")?.textContent).toBe("喫茶店");

		await user.click(screen.getByRole("button", { name: /删除错题：あの店です。|Remove incorrect item: あの店です。/ }));
		expect(screen.getByText(/错题（1）|Incorrect \(1\)/)).toBeInTheDocument();
		expect(screen.getByText("8/10")).toBeInTheDocument();
		let saved = JSON.parse(localStorage.getItem("jp-kanji-exam-history-v1") || "[]");
		expect(saved[0].wrongQuestions).toHaveLength(1);
		expect(saved[0].wrongQuestions[0].questionId).toBe("wrong-2");
		expect(container.querySelectorAll(".kanji-exam-history .kanji-exam-review-meaning")).toHaveLength(1);

		await user.click(screen.getByRole("button", { name: /删除错题：きっさてん|Remove incorrect item: きっさてん/ }));
		expect(screen.getByText(/本次错题已全部清理|All incorrect items from this attempt have been removed/)).toBeInTheDocument();
		saved = JSON.parse(localStorage.getItem("jp-kanji-exam-history-v1") || "[]");
		expect(saved[0].wrongQuestions).toEqual([]);
		expect(saved[0]).toMatchObject({ correct: 8, total: 10 });
	});
});
