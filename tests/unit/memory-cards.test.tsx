import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { MemoryCards, type MemoryCardItem } from "../../app/study/memory-cards";
import { ModuleCardsPage } from "../../app/study/ModuleCardsPage";
import {
	cardsFromListeningLesson,
	cardsFromReadingWeeks,
	cardsFromVocabWeeks,
	exampleFromVocabDay,
	parseListeningHead,
	splitListeningGloss,
} from "../../app/study/memory-deck";
import { K2, V2, resetStudyStateForTests, setModule, setNavImpl } from "../../app/study/store";

const sample: MemoryCardItem[] = [
	{
		id: "a",
		jp: "禁止",
		jpHtml: "<ruby>禁止<rt>きんし</rt></ruby>",
		reading: "きんし",
		cn: "禁止",
		en: "prohibition",
		kind: "word",
		exampleJp: "ここで禁煙です。",
		exampleCn: "这里禁止吸烟。",
		exampleEn: "No smoking here.",
	},
	{
		id: "b",
		jp: "有効期限",
		reading: "ゆうこうきげん",
		cn: "有效期限",
		en: "expiry date",
		kind: "word",
	},
];

beforeEach(() => {
	localStorage.clear();
	resetStudyStateForTests();
	setNavImpl(() => {});
});

describe("MemoryCards", () => {
	it("flips to show reading, translation, and an example, then marks a card as mastered", async () => {
		const user = userEvent.setup();
		render(<MemoryCards deckId="test" items={sample} />);
		expect(screen.getByText("禁止")).toBeInTheDocument();
		expect(document.querySelector(".review-reading")).toBeNull();
		await user.click(screen.getByText("回想读音和意思，点击翻面"));
		expect(document.querySelector(".review-reading")?.textContent).toBe("きんし");
		expect(screen.getByText("prohibition")).toBeInTheDocument();
		expect(screen.getByText("例句")).toBeInTheDocument();
		expect(screen.getByText("ここで禁煙です。")).toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: /已经记住|Got it/ }));
		expect(screen.queryByText("禁止")).not.toBeInTheDocument();
		expect(screen.getByText("有効期限")).toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: /已掌握|Mastered/ }));
		expect(screen.getByText("禁止")).toBeInTheDocument();
	});
});

describe("memory deck builders", () => {
	it("parses listening heads and glosses", () => {
		expect(parseListeningHead("しゅちょう（主張）")).toEqual({ jp: "主張", reading: "しゅちょう" });
		expect(parseListeningHead("受講する")).toEqual({ jp: "受講する" });
		expect(splitListeningGloss("to take a course　听课")).toEqual({ en: "to take a course", cn: "听课" });
	});

	it("builds listening cards from kv rows and nearby example sentences", () => {
		const items = cardsFromListeningLesson(
			{
				blocks: [
					{ type: "p", jp: "学生課よりお知らせします。", cn: "学生课通知。", en: "An announcement from student affairs." },
					{
						type: "kv",
						rows: [
							{ k: "新入生ガイダンス", v: "new student orientation　新生说明会" },
							{ k: "健康診断", v: "health check　体检" },
						],
					},
				],
			},
			4,
			3,
			"n2listening",
		);
		expect(items).toHaveLength(2);
		expect(items[0]).toMatchObject({
			jp: "新入生ガイダンス",
			cn: "新生说明会",
			en: "new student orientation",
			kind: "word",
			week: 4,
		});
		expect(items[1].exampleJp).toBeUndefined();
	});

	it("pulls a vocab example from the day's quiz sentence", () => {
		expect(
			exampleFromVocabDay("建て", {
				exercises: { sections: [{ items: [{ q: "私は10階（a. 建て　b. 建ち）のマンションに住んでいます。" }] }] },
			}),
		).toEqual({ jp: "私は10階建てのマンションに住んでいます。" });
	});

	it("builds reading cards from vocab and expressions", () => {
		const items = cardsFromReadingWeeks(
			[
				{
					n: 1,
					days: [
						{
							day: 1,
							vocab: [{ jp: "注文", kana: "ちゅうもん", cn: "点餐", en: "order" }],
							expressions: [{ jp: "ご注文の際", kana: "ちゅうもん", cn: "点餐时", en: "when ordering" }],
							grammar: [
								{
									example: {
										jp: "ご{注文|ちゅうもん}の{際|さい}、係の者にお渡しください。",
										cn: "点餐时请交给店员。",
										en: "Please hand it to staff when you order.",
									},
								},
							],
						},
					],
				},
			],
			"n2reading",
		);
		expect(items.map((item) => item.kind)).toEqual(["word", "expression"]);
		expect(items[0].exampleJp).toContain("注文");
		expect(items[0].reading).toBe("ちゅうもん");
	});
});

describe("ModuleCardsPage", () => {
	it("opens N2 vocab cards with reading, translation, and a quiz example", async () => {
		const user = userEvent.setup();
		setModule("n2vocab");
		V2.weeks = [
			{
				n: 1,
				days: [
					{
						day: 1,
						sections: [
							{
								items: [
									{
										jp: "建て",
										jp_r: "<ruby>建<rt>た</rt></ruby>て",
										cn: "建成…层",
										en: "-story (building)",
									},
								],
							},
						],
						exercises: {
							sections: [{ items: [{ q: "私は10階（a. 建て　b. 建ち）のマンションに住んでいます。" }] }],
						},
					},
				],
			},
		];
		render(<ModuleCardsPage />);
		expect(screen.getByText("建て")).toBeInTheDocument();
		await user.click(screen.getByText("回想读音和意思，点击翻面"));
		expect(document.querySelector(".review-reading")?.textContent).toBe("たて");
		expect(screen.getByText("建成…层")).toBeInTheDocument();
		expect(screen.getByText("私は10階建てのマンションに住んでいます。")).toBeInTheDocument();
	});

	it("opens N2 kanji word cards with a usage example", async () => {
		const user = userEvent.setup();
		setModule("n2kanji");
		K2.weeks = [
			{
				n: 1,
				days: [
					{
						day: 1,
						kanji: [
							{
								char: "設",
								words: [{ jp: "設定", reading: "せってい", cn: "设定", en: "setting", jp_r: "<ruby>設定<rt>せってい</rt></ruby>" }],
							},
						],
					},
				],
			},
		];
		render(<ModuleCardsPage />);
		expect(screen.getByText("設定")).toBeInTheDocument();
		await user.click(screen.getByText("回想读音和意思，点击翻面"));
		expect(document.querySelector(".review-reading")?.textContent).toBe("せってい");
		expect(screen.getByText("setting")).toBeInTheDocument();
		expect(screen.getByText("スマートフォンの言語を日本語に設定した。")).toBeInTheDocument();
	});
});
