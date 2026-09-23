import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import {
	MistakesMemoryCards,
	cardsFromMistakes,
	mistakeStudyParts,
} from "../../app/study/mistakes-memory-cards";
import { resetStudyStateForTests, setMistakeStudy } from "../../app/study/store";

beforeEach(() => {
	localStorage.clear();
	resetStudyStateForTests();
});

describe("mistakeStudyParts", () => {
	it("keeps the answer off the front and on the back", () => {
		expect(
			mistakeStudyParts({
				text: "商品券の読み方\n你的答案：しょうひんけん\n正确答案：しょうひんけん",
			}),
		).toEqual({ jp: "商品券の読み方", cn: "しょうひんけん" });
	});

	it("falls back to the whole note when there is no answer line", () => {
		expect(mistakeStudyParts({ text: "冷蔵庫" })).toEqual({ jp: "冷蔵庫", cn: "" });
	});
});

describe("cardsFromMistakes", () => {
	it("maps notebook types onto memory-card kinds", () => {
		expect(
			cardsFromMistakes([
				{ id: "1", type: "word", text: "冷蔵庫" },
				{ id: "2", type: "grammar", text: "ばかり" },
				{ id: "3", type: "q", text: "問題\n正确答案：答え" },
			]),
		).toEqual([
			{ id: "1", jp: "冷蔵庫", cn: undefined, kind: "word" },
			{ id: "2", jp: "ばかり", cn: undefined, kind: "grammar" },
			{ id: "3", jp: "問題", cn: "答え", kind: "q" },
		]);
	});
});

describe("MistakesMemoryCards", () => {
	it("uses the same flashcard chrome as classroom review", async () => {
		const user = userEvent.setup();
		setMistakeStudy(true);
		render(
			<MistakesMemoryCards
				list={[{ id: "m1", type: "q", text: "商品券の読み方\n正确答案：しょうひんけん" }]}
			/>,
		);
		expect(screen.getByText("商品券の読み方")).toBeInTheDocument();
		expect(screen.queryByText("しょうひんけん")).not.toBeInTheDocument();
		expect(screen.getByRole("button", { name: /未掌握|To review/ })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /注音|Readings/ })).toBeInTheDocument();
		await user.click(screen.getByText("回想读音和意思，点击翻面"));
		expect(screen.getByText("しょうひんけん")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /还没记住|Still learning/ })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /已经记住|Got it/ })).toBeInTheDocument();
	});
});
