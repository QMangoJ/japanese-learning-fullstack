import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { readingDays } from "../../app/data/reading-n1";
import { ReadingN3Content } from "../../app/routes/reading-n3-book";
import { resetStudyStateForTests, setLang } from "../../app/study/store";

beforeEach(() => {
	localStorage.clear();
	resetStudyStateForTests();
	setLang("cn");
});

describe("N1 ReadingN3Content", () => {
	it("renders week 1 day 1 from the N1 book", async () => {
		const user = userEvent.setup();
		render(<ReadingN3Content week={1} day={1} embedded book="n1" />);

		expect(screen.getByText("（ ）の中に入るのは？")).toBeInTheDocument();
		expect(screen.queryByText(/未找到这一课/)).not.toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: /翻译|Translation/i }));
		expect(screen.getByText("（ ）的位置不同，解题思路也不一样！")).toBeInTheDocument();
	});

	it("covers the transcribed days exactly once", () => {
		expect(readingDays.length).toBeGreaterThan(0);
		expect(new Set(readingDays.map((day) => `${day.week}-${day.day}`)).size).toBe(readingDays.length);
	});

	it("renders every transcribed N1 reading day without crashing", () => {
		for (const day of readingDays) {
			const view = render(<ReadingN3Content week={day.week} day={day.day} embedded book="n1" />);
			expect(screen.queryByText(/未找到这一课/), `w${day.week}d${day.day}`).not.toBeInTheDocument();
			view.unmount();
		}
	});
});
