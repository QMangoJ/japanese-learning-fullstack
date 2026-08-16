import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { readingDays } from "../../app/data/reading-n3";
import { ReadingN3Content } from "../../app/routes/reading-n3-book";
import { resetStudyStateForTests, setLang } from "../../app/study/store";

beforeEach(() => {
	localStorage.clear();
	resetStudyStateForTests();
	setLang("cn");
});

describe("ReadingN3Content", () => {
	it("shows English after the 翻译 toggle when LANG is en", async () => {
		const user = userEvent.setup();
		setLang("en");
		render(<ReadingN3Content week={1} day={1} embedded />);

		expect(screen.getByText(/Try to read dates and times correctly/)).toBeInTheDocument();
		const toggle = screen.getByRole("button", { name: /翻译|译文|Translation|CN/i });
		await user.click(toggle);
		expect(screen.getByText(/Read the conversation below/)).toBeInTheDocument();
		expect(screen.getAllByText(/the first 10 days of the month/).length).toBeGreaterThan(0);
		setLang("cn");
	});

	it("renders every reading day without crashing", () => {
		for (const day of readingDays) {
			const view = render(<ReadingN3Content week={day.week} day={day.day} embedded />);
			expect(screen.queryByText(/未找到这一课/)).not.toBeInTheDocument();
			view.unmount();
		}
	});
});
