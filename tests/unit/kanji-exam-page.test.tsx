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
});
