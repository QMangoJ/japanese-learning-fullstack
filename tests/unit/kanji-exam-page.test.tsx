import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { KanjiExamPage } from "../../app/study/KanjiExamPage";

describe("KanjiExamPage answers", () => {
	beforeEach(() => localStorage.clear());

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

		await user.click(screen.getByRole("button", { name: /删除错题：あの店です。|Remove incorrect item: あの店です。/ }));
		expect(screen.getByText(/错题（1）|Incorrect \(1\)/)).toBeInTheDocument();
		expect(screen.getByText("8/10")).toBeInTheDocument();
		let saved = JSON.parse(localStorage.getItem("jp-kanji-exam-history-v1") || "[]");
		expect(saved[0].wrongQuestions).toHaveLength(1);
		expect(saved[0].wrongQuestions[0].questionId).toBe("wrong-2");

		await user.click(screen.getByRole("button", { name: /删除错题：きっさてん|Remove incorrect item: きっさてん/ }));
		expect(screen.getByText(/本次错题已全部清理|All incorrect items from this attempt have been removed/)).toBeInTheDocument();
		saved = JSON.parse(localStorage.getItem("jp-kanji-exam-history-v1") || "[]");
		expect(saved[0].wrongQuestions).toEqual([]);
		expect(saved[0]).toMatchObject({ correct: 8, total: 10 });
	});
});
