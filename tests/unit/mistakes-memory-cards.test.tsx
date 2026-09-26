import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
	MistakesMemoryCards,
	cardsFromMistakes,
	mistakeStudyParts,
	mistakeTranslationSource,
} from "../../app/study/mistakes-memory-cards";
import { resetStudyStateForTests, setMistakeStudy } from "../../app/study/store";

beforeEach(() => {
	localStorage.clear();
	resetStudyStateForTests();
	vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ translations: {} }), { status: 200 })));
});

afterEach(() => {
	vi.unstubAllGlobals();
});

describe("mistakeStudyParts", () => {
	it("keeps the answer off the front and on the back", () => {
		expect(
			mistakeStudyParts({
				text: "商品券の読み方\n你的答案：しょうひんけん\n正确答案：しょうひんけん",
			}),
		).toEqual({ jp: "商品券の読み方", cn: "しょうひんけん" });
	});

	it("parses English-UI answer labels too", () => {
		expect(mistakeStudyParts({ text: "問題\nYour answer：a\nCorrect answer：b" })).toEqual({ jp: "問題", cn: "b" });
	});

	it("falls back to the whole note when there is no answer line", () => {
		expect(mistakeStudyParts({ text: "冷蔵庫" })).toEqual({ jp: "冷蔵庫", cn: "" });
	});
});

describe("cardsFromMistakes", () => {
	it("maps notebook types onto memory-card kinds and adds furigana for kanji", () => {
		const cards = cardsFromMistakes([
			{ id: "1", type: "word", text: "冷蔵庫" },
			{ id: "2", type: "grammar", text: "ばかり" },
			{ id: "3", type: "q", text: "問題\n正确答案：答え" },
			{ id: "4", type: "word", text: "商品券\n正确答案：しょうひんけん" },
		]);
		expect(cards[0]).toMatchObject({ id: "1", jp: "冷蔵庫", kind: "word" });
		expect(cards[0].jpHtml).toContain("<ruby>冷蔵庫<rt>れいぞうこ</rt></ruby>");
		expect(cards[1]).toMatchObject({ id: "2", jp: "ばかり", cn: undefined, kind: "grammar" });
		expect(cards[1].jpHtml).toBeUndefined();
		expect(cards[2]).toMatchObject({ id: "3", jp: "問題", cn: "答え", kind: "q" });
		expect(cards[2].jpHtml).toContain("<rt>もんだい</rt>");
		expect(cards[3].jpHtml).toBe("<ruby>商品券<rt>しょうひんけん</rt></ruby>");
		expect(cards[3].reading).toBeUndefined();
	});
});

describe("mistakeTranslationSource", () => {
	it("fills in the correct answer and drops the wrong one", () => {
		expect(
			mistakeTranslationSource({ text: "読んではいる（　　）、本は頭に入らない。\n你的答案：ものだから\n正确答案：ものの" }),
		).toBe("読んではいる（　　）、本は頭に入らない。\n正确答案：ものの");
	});
});

describe("MistakesMemoryCards", () => {
	it("shows the Chinese translation with the revealed answer", async () => {
		const user = userEvent.setup();
		const fetchMock = vi.fn(async () =>
			new Response(JSON.stringify({ translations: { "気づく": "注意到；察觉" } }), { status: 200 }),
		);
		vi.stubGlobal("fetch", fetchMock);
		render(<MistakesMemoryCards list={[{ id: "w1", type: "word", text: "気づく" }]} />);
		await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
		expect(screen.queryByText("注意到；察觉")).not.toBeInTheDocument();
		await user.click(screen.getByText("回想读音和意思，点击翻面"));
		expect(await screen.findByText("注意到；察觉")).toBeInTheDocument();
		expect(screen.getByText("翻译")).toBeInTheDocument();
		expect(JSON.parse(localStorage.getItem("mistake-translations") || "{}")).toEqual({ "気づく": "注意到；察觉" });
	});

	it("uses cached translations without refetching", async () => {
		localStorage.setItem("mistake-translations", JSON.stringify({ "気づく": "注意到" }));
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock);
		const user = userEvent.setup();
		render(<MistakesMemoryCards list={[{ id: "w1", type: "word", text: "気づく" }]} />);
		await user.click(screen.getByText("回想读音和意思，点击翻面"));
		expect(screen.getByText("注意到")).toBeInTheDocument();
		expect(fetchMock).not.toHaveBeenCalled();
	});

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
		expect(document.querySelector(".review-flip-ruby rt")?.textContent).toBeTruthy();
		expect(screen.getByRole("button", { name: /还没记住|Still learning/ })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /已经记住|Got it/ })).toBeInTheDocument();
	});
});
