import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { listeningBookChapters } from "../../app/data/listening-n3-book";
import { ListeningN3Content } from "../../app/routes/listening-n3";
import { resetStudyStateForTests, setLang } from "../../app/study/store";

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

		const firstQuestion = screen.getByRole("heading", { level: 4, name: /^1番/ }).closest("article");
		expect(firstQuestion).toBeTruthy();
		await user.click(within(firstQuestion!).getByText("答案"));
		expect(within(firstQuestion!).getByText("1番：2")).toBeInTheDocument();
		await user.click(within(firstQuestion!).getByText("听力原文"));
		expect(firstQuestion!.querySelector("ruby")).toBeInTheDocument();
		expect(firstQuestion!.querySelector("rt")?.textContent).toBeTruthy();
		expect(screen.getByRole("button", { name: /上一节|Previous/ })).toBeEnabled();
		expect(screen.getByRole("button", { name: /下一节|Next/ })).toBeEnabled();
	});

	it("shows Chinese glosses and a transcript translation on chapter 4 teaching pages", async () => {
		const user = userEvent.setup();
		render(<ListeningN3Content chapter={4} section={1} embedded />);

		expect(screen.getByText(/人的外貌或物的形状、状态/)).toBeInTheDocument();
		expect(screen.getByText(/facial hair/)).toBeInTheDocument();
		expect(screen.getByText(/one-size-fits-all/)).toBeInTheDocument();

		const firstQuestion = screen.getByRole("heading", { level: 4, name: /^1番/ }).closest("article");
		await user.click(within(firstQuestion!).getByText("译文"));
		expect(screen.getByText(/女士的妈妈是哪一个人/)).toBeInTheDocument();
	});

	it("renders every catalog section without crashing", async () => {
		const user = userEvent.setup();
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
				expect(screen.getAllByText("答案").length).toBeGreaterThan(0);
				expect(screen.getAllByText("听力原文").length).toBeGreaterThan(0);
				expect(screen.getAllByText("译文").length).toBeGreaterThan(0);
				view.unmount();
			}
		}
	});

	it("renders chapter 3 weather and traffic notes without crashing", () => {
		render(<ListeningN3Content chapter={3} section={2} embedded />);
		expect(screen.getByRole("heading", { level: 1, name: /天気|ニュース|交通/ })).toBeInTheDocument();
		expect(screen.getByText(/ABC航空24便/)).toBeInTheDocument();
	});

	it("shows a Chinese transcript on chapter 3 after 译文", async () => {
		const user = userEvent.setup();
		setLang("cn");
		render(<ListeningN3Content chapter={3} section={1} embedded />);
		const firstQuestion = screen.getByRole("heading", { level: 4, name: /^1番/ }).closest("article");
		await user.click(within(firstQuestion!).getByText("译文"));
		expect(screen.getByText(/鲜鱼日/)).toBeInTheDocument();
	});

	it("shows furigana and Chinese translations on chapter 3-4 teaching examples", () => {
		const chapter3 = render(<ListeningN3Content chapter={3} section={1} embedded />);
		const translation = screen.getByText("很危险，请退到黄线内侧等候。");
		expect(translation.parentElement?.querySelector("ruby")).toBeInTheDocument();
		chapter3.unmount();

		render(<ListeningN3Content chapter={4} section={4} embedded />);
		const comparisonTranslation = screen.getByText("A最……。对我来说，片假名最难。");
		expect(comparisonTranslation).toBeInTheDocument();
		expect(comparisonTranslation.parentElement?.querySelector("ruby")).toBeInTheDocument();
	});

	it("shows chapter 1 and 3 figures and an English transcript when LANG is en", async () => {
		const user = userEvent.setup();
		setLang("en");
		const ch3 = render(<ListeningN3Content chapter={3} section={1} embedded />);
		expect(screen.getByAltText(/マルタケスーパー/)).toBeInTheDocument();
		expect(screen.getByAltText(/黄线/)).toBeInTheDocument();
		const ch3FirstQuestion = screen.getByRole("heading", { level: 4, name: /^1番/ }).closest("article");
		await user.click(within(ch3FirstQuestion!).getByText("Translation"));
		expect(screen.getByText(/Fish Day/)).toBeInTheDocument();
		ch3.unmount();

		render(<ListeningN3Content chapter={1} section={1} embedded />);
		expect(screen.getByAltText(/ちょっとまって/)).toBeInTheDocument();
		const ch1ThirdQuestion = screen.getByRole("heading", { level: 4, name: /^3番/ }).closest("article");
		await user.click(within(ch1ThirdQuestion!).getByText("Translation"));
		expect(screen.getByText(/drank all the milk/i)).toBeInTheDocument();
		setLang("cn");
	});

	it("reconstructs chapter 5 with bilingual slogans, figures, and a Chinese transcript", async () => {
		const user = userEvent.setup();
		render(<ListeningN3Content chapter={5} section={1} embedded />);

		expect(screen.getByText(/先听清提问再作答/)).toBeInTheDocument();
		expect(screen.getByAltText(/月台上四个孩子/)).toBeInTheDocument();
		expect(screen.getByText(/抢包/)).toBeInTheDocument();

		const firstQuestion = screen.getByRole("heading", { level: 4, name: /^1番/ }).closest("article");
		await user.click(within(firstQuestion!).getByText("译文"));
		expect(screen.getByText(/洋子的弟弟是哪个孩子/)).toBeInTheDocument();
	});
});
