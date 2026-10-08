import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
	MistakesMemoryCards,
	cardsFromMistakes,
	mistakeStudyParts,
	mistakeTranslationSource,
} from "../../app/study/mistakes-memory-cards";
import { addMistakeGloss, findMistakeGloss, glossIndexFromBook } from "../../app/study/memory-deck";
import { resetStudyStateForTests, setMistakeStudy, setStudyBooksForTests } from "../../app/study/store";

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

	it("fills a missing reading and an example sentence", () => {
		const cards = cardsFromMistakes(
			[{ id: "lava", type: "word", text: "溶岩" }],
			{},
			{ 溶岩: { reading: "ようがん", example: "溶岩が冷えて石になりました。", exampleCn: "熔岩冷却后变成了石头。" } },
		);
		expect(cards[0].jpHtml).toContain("ようがん");
		expect(cards[0].exampleJp).toBe("溶岩が冷えて石になりました。");
		expect(cards[0].exampleCn).toBe("熔岩冷却后变成了石头。");
		expect(cards[0].exampleJpHtml).toContain("溶岩");
	});

	it("shows a Chinese answer and a study-aid meaning as the translation", () => {
		const fromAnswer = cardsFromMistakes([{ id: "fridge", type: "word", text: "冷蔵庫\n正确答案：冰箱" }]);
		expect(fromAnswer[0].jp).toBe("冷蔵庫");
		expect(fromAnswer[0].cn).toBeUndefined();
		expect(fromAnswer[0].translation).toBe("冰箱");

		const fromAid = cardsFromMistakes(
			[{ id: "lava", type: "word", text: "溶岩" }],
			{},
			{ 溶岩: { reading: "ようがん", cn: "熔岩" } },
		);
		expect(fromAid[0].translation).toBe("熔岩");
	});

	it("matches a textbook headword and a quiz prompt to their Chinese", () => {
		const index = new Map();
		glossIndexFromBook(
			{
				weeks: [
					{
						n: 1,
						days: [
							{
								day: 1,
								sections: [{ items: [{ jp: "家賃", cn: "房租", en: "monthly rent" }] }],
								exercises: { sections: [{ items: [{ n: 1, q: "私は（　　）に住んでいます。" }] }] },
							},
						],
					},
				],
				daily_translations: { w1d1: { items: [{ n: 1, translation: "我住在那里。" }] } },
			},
			index,
		);
		expect(findMistakeGloss(index, "家賃")).toEqual({ cn: "房租", en: "monthly rent" });
		expect(findMistakeGloss(index, "私は（a. ここ）に住んでいます。")?.cn).toBe("我住在那里。");
		addMistakeGloss(index, "ただ", { cn: "免费" });
		expect(findMistakeGloss(index, "ただ")?.cn).toBe("免费");
	});

	it("does not invent an example for a full question", () => {
		const cards = cardsFromMistakes(
			[{ id: "q", type: "q", text: "読んではいる（　　）、本は頭に入らない。\n正确答案：ものの" }],
			{},
			{
				"読んではいる（　　）、本は頭に入らない。\n正确答案：ものの": {
					example: "これは余計な例句です。",
					exampleCn: "这是多余的例句。",
				},
			},
		);
		expect(cards[0].exampleJp).toBeUndefined();
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
		await waitFor(() => expect(fetchMock).toHaveBeenCalled());
		expect(screen.queryByText("注意到；察觉")).not.toBeInTheDocument();
		await user.click(screen.getByText("回想读音和意思，点击翻面"));
		expect(await screen.findByText("注意到；察觉")).toBeInTheDocument();
		expect(screen.getByText("翻译")).toBeInTheDocument();
		expect(JSON.parse(localStorage.getItem("mistake-translations") || "{}")).toEqual({ "気づく": "注意到；察觉" });
	});

	it("uses cached translations and study aids without refetching", async () => {
		localStorage.setItem("mistake-translations", JSON.stringify({ "気づく": "注意到" }));
		localStorage.setItem(
			"mistake-study-aids",
			JSON.stringify({ "気づく": { reading: "きづく", example: "間違いに気づきました。", exampleCn: "发觉了错误。" } }),
		);
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock);
		const user = userEvent.setup();
		render(<MistakesMemoryCards list={[{ id: "w1", type: "word", text: "気づく" }]} />);
		await user.click(screen.getByText("回想读音和意思，点击翻面"));
		expect(screen.getByText("注意到")).toBeInTheDocument();
		expect(document.querySelector(".fcard-ex .jp")?.textContent).toContain("間違い");
		expect(document.querySelector(".fcard-ex .jp")?.textContent).toContain("づきました");
		expect(screen.getByText("まちがいにきづきました。")).toBeInTheDocument();
		expect(screen.getByText("发觉了错误。")).toBeInTheDocument();
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
	it("shows a grammar test's textbook translation without asking Gemini", async () => {
		setStudyBooksForTests({
			G1: {
				weeks: [
					{
						n: 1,
						days: [
							{
								day: 7,
								mondai1: { items: [{ n: 1, q: "雨の（　　）、試合は中止になった。", opts: ["せいで", "おかげで"] }] },
								mondai3: { passage: "朝は晴れていた。昼から雨が【21】。", items: [{ n: 21, opts: ["降り出した", "降りかけた"] }] },
							},
						],
					},
				],
				besatsu: {
					w1: {
						mondai1: [{ n: 1, ans: 1, trans: "因为下雨，比赛取消了。" }],
						mondai3: [{ n: 21, ans: 1, trans: "从中午开始下起雨来了。" }],
					},
				},
			},
		});
		const fetchMock = vi.fn(async () => new Response(JSON.stringify({ translations: {}, aids: {} }), { status: 200 }));
		vi.stubGlobal("fetch", fetchMock);
		const user = userEvent.setup();
		render(
			<MistakesMemoryCards
				list={[
					{ id: "q1", type: "q", text: "雨の（　　）、試合は中止になった。\n你的答案：おかげで\n正确答案：せいで" },
					{ id: "q2", type: "q", text: "你的答案：降りかけた\n正确答案：降り出した" },
				]}
			/>,
		);
		await user.click(screen.getByText("回想读音和意思，点击翻面"));
		expect(screen.getByText("因为下雨，比赛取消了。")).toBeInTheDocument();
		expect(fetchMock).not.toHaveBeenCalledWith("/api/mistake-translations", expect.anything());
		const cards = cardsFromMistakes([{ id: "q2", type: "q", text: "你的答案：降りかけた\n正确答案：降り出した" }]);
		expect(cards[0]).toMatchObject({ jp: "昼から雨が【21】。", translation: "从中午开始下起雨来了。" });
	});
});
