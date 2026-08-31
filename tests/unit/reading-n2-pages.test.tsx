import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { readingDays } from "../../app/data/reading-n2";
import { ReadingN3Content } from "../../app/routes/reading-n3-book";
import { resetStudyStateForTests, setLang } from "../../app/study/store";

beforeEach(() => {
	localStorage.clear();
	resetStudyStateForTests();
	setLang("cn");
});

describe("N2 ReadingN3Content", () => {
	it("renders week 1 day 1 from the N2 book", async () => {
		const user = userEvent.setup();
		render(<ReadingN3Content week={1} day={1} embedded book="n2" />);

		expect(screen.getByText("割引券・クーポン")).toBeInTheDocument();
		expect(screen.queryByText(/未找到这一课/)).not.toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: /翻译|Translation/i }));
		expect(screen.getByText("注意有效期限！")).toBeInTheDocument();
	});

	it("covers all 42 days", () => {
		expect(readingDays).toHaveLength(42);
		expect(new Set(readingDays.map((day) => `${day.week}-${day.day}`)).size).toBe(42);
	});

	it("renders every transcribed N2 reading day without crashing", () => {
		for (const day of readingDays) {
			const view = render(<ReadingN3Content week={day.week} day={day.day} embedded book="n2" />);
			expect(screen.queryByText(/未找到这一课/), `w${day.week}d${day.day}`).not.toBeInTheDocument();
			view.unmount();
		}
	});
});

