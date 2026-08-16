import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { listeningBookChapters } from "../../app/data/listening-n3-book";
import { ListeningN3Content } from "../../app/routes/listening-n3";
import { resetStudyStateForTests } from "../../app/study/store";

beforeEach(() => {
	localStorage.clear();
	resetStudyStateForTests();
});

describe("ListeningN3Content", () => {
	it("reconstructs the book lesson instead of showing a PDF page scan", async () => {
		const user = userEvent.setup();
		render(<ListeningN3Content chapter={2} section={1} embedded />);

		expect(screen.getByRole("heading", { level: 1, name: /何と言いますか/ })).toBeInTheDocument();
		expect(screen.getByText("出题结构")).toBeInTheDocument();
		expect(screen.getByText(/イラストから場面を想像し/)).toBeInTheDocument();
		expect(screen.getByText(/通过插图想像场景/)).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /CD 1 · 19/ })).toBeInTheDocument();
		expect(screen.queryByAltText(/原书第 24 页/)).not.toBeInTheDocument();

		await user.click(screen.getByText("答え"));
		expect(screen.getByText(/1番：2/)).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /上一节|Previous/ })).toBeEnabled();
		expect(screen.getByRole("button", { name: /下一节|Next/ })).toBeEnabled();
	});

	it("shows Chinese glosses and a transcript translation on chapter 4 teaching pages", async () => {
		const user = userEvent.setup();
		render(<ListeningN3Content chapter={4} section={1} embedded />);

		expect(screen.getByText(/人的外貌或物的形状、状态/)).toBeInTheDocument();
		expect(screen.getByText(/facial hair/)).toBeInTheDocument();
		expect(screen.getByText(/one-size-fits-all/)).toBeInTheDocument();

		await user.click(screen.getByText("译文"));
		expect(screen.getByText(/女士的妈妈是哪一个人/)).toBeInTheDocument();
	});

	it("renders every catalog section without crashing", () => {
		for (const chapter of listeningBookChapters) {
			for (const section of chapter.sections) {
				let view;
				try {
					view = render(<ListeningN3Content chapter={chapter.number} section={section.number} embedded />);
				} catch (error) {
					throw new Error(`listening ${chapter.number}-${section.number} crashed: ${(error as Error).message}`);
				}
				expect(screen.queryByText(/未找到这一节听解内容/)).not.toBeInTheDocument();
				expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
				view.unmount();
			}
		}
	});

	it("renders chapter 3 weather and traffic notes without crashing", () => {
		render(<ListeningN3Content chapter={3} section={2} embedded />);
		expect(screen.getByRole("heading", { level: 1, name: /天気|ニュース|交通/ })).toBeInTheDocument();
		expect(screen.getByText(/ABC航空24便/)).toBeInTheDocument();
	});

	it("reconstructs chapter 5 with bilingual slogans, figures, and a Chinese transcript", async () => {
		const user = userEvent.setup();
		render(<ListeningN3Content chapter={5} section={1} embedded />);

		expect(screen.getByText(/先听清提问再作答/)).toBeInTheDocument();
		expect(screen.getByAltText(/月台上四个孩子/)).toBeInTheDocument();
		expect(screen.getByText(/抢包/)).toBeInTheDocument();

		await user.click(screen.getByText("译文"));
		expect(screen.getByText(/洋子的弟弟是哪个孩子/)).toBeInTheDocument();
	});
});
