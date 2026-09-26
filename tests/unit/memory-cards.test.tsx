import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { MemoryCards, type MemoryCardItem } from "../../app/study/memory-cards";
import { ModuleCardsPage } from "../../app/study/ModuleCardsPage";
import {
	annotateText,
	cardsFromListeningLesson,
	cardsFromReadingWeeks,
	cardsFromVocabWeeks,
	cleanQuizHtml,
	exampleFromVocabDay,
	parseListeningHead,
	splitListeningGloss,
} from "../../app/study/memory-deck";
import { chapter1Lessons } from "../../app/data/listening-n3-lessons-ch1";
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

	it("annotates kanji with ruby readings", () => {
		const html = annotateText("健康診断", { reading: "けんこうしんだん" });
		expect(html).toContain("<ruby>");
		expect(html).toContain("けんこうしんだん");
		expect(annotateText("有効期限：XX年○月×日まで", { reading: "ゆうこうきげん" })).toContain("<rt>ゆうこうきげん</rt>");
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
					{ type: "p", jp: "健康診断は午前中に行います。", cn: "体检在上午进行。", en: "The health check is in the morning." },
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
		expect(items[1].jpHtml).toContain("<rt>けんこうしんだん</rt>");
		expect(items[1].reading).toBe("けんこうしんだん");
		expect(items[1].exampleJp).toBe("健康診断は午前中に行います。");
		expect(items[1].exampleCn).toBe("体检在上午进行。");
	});

	it("builds listening cards from study tables, boxes, and set phrases", () => {
		const items = cardsFromListeningLesson(
			{
				blocks: [
					{
						type: "table",
						title: "命令形　／　依頼形",
						rows: [
							["しゅちょう（主張）", "しゅっちょう（出張）"],
							["〜ちゃった・〜じゃった", "（=〜てしまった・〜でしまった）　食べちゃった"],
							["待て", "待って"],
						],
					},
					{
						type: "box",
						items: [{ title: "うかがう（伺う）", lines: ["尋ねる to ask　ちょっと伺いますが、駅はどちらでしょうか。"] }],
					},
					{
						type: "example",
						lines: ["A「どうぞお上がりください。」", "B「おじゃまします。」"],
					},
				],
			},
			1,
			1,
			"listening",
		);
		expect(items.find((item) => item.jp === "主張 ↔ 出張")).toMatchObject({
			reading: "しゅちょう / しゅっちょう",
			cn: "命令形　／　依頼形",
			day: 1,
		});
		expect(items.find((item) => item.jp.includes("ちゃった"))).toMatchObject({
			exampleJp: "食べちゃった",
		});
		expect(items.find((item) => item.jp === "待て")?.cn).toContain("待って");
		expect(items.find((item) => item.jp === "伺う")).toMatchObject({
			reading: "うかがう",
			cn: expect.stringContaining("to ask"),
			exampleJp: expect.stringContaining("伺います"),
		});
		expect(items.find((item) => item.jp === "どうぞお上がりください。")?.cn).toBe("会话表达");
	});

	it("fills the study days of N3 listening chapter 1", () => {
		const days = chapter1Lessons.map((lesson, index) => cardsFromListeningLesson(lesson, 1, index + 1, "listening"));
		expect(days.slice(0, 4).every((items) => items.length >= 4)).toBe(true);
		expect(days[0].some((item) => item.exampleJp === "食べちゃった")).toBe(true);
		expect(days[2].some((item) => item.jp.includes("伺"))).toBe(true);
		expect(days[3].some((item) => item.jp.includes("じゃない"))).toBe(true);
	});

	it("keeps furigana when filling a quiz example", () => {
		expect(
			cleanQuizHtml(
				"<ruby>私<rt>わたし</rt></ruby>は10<ruby>階<rt>かい</rt></ruby>（a. <ruby>建<rt>た</rt></ruby>て　b. <ruby>建<rt>た</rt></ruby>ち）のマンションに<ruby>住<rt>す</rt></ruby>んでいます。",
				["建て"],
			),
		).toBe(
			"<ruby>私<rt>わたし</rt></ruby>は10<ruby>階<rt>かい</rt></ruby><ruby>建<rt>た</rt></ruby>てのマンションに<ruby>住<rt>す</rt></ruby>んでいます。",
		);
	});

	it("pulls a vocab example from the day's quiz sentence", () => {
		expect(
			exampleFromVocabDay("建て", {
				exercises: { sections: [{ items: [{ q: "私は10階（a. 建て　b. 建ち）のマンションに住んでいます。" }] }] },
			}),
		).toMatchObject({ jp: "私は10階建てのマンションに住んでいます。" });
	});

	it("finds a vocab example in another day's quiz, not only the same day", () => {
		V2.daily_translations = { w1d6: { items: [{ n: 1, translation: "这个月的房租已经付完了。" }] } };
		const items = cardsFromVocabWeeks(
			[
				{
					n: 1,
					days: [
						{
							day: 1,
							sections: [{ items: [{ jp: "家賃", jp_r: "<ruby>家賃<rt>やちん</rt></ruby>", cn: "房租", en: "rent" }] }],
						},
						{
							day: 6,
							sections: [{ items: [{ jp: "支払い", cn: "支付", en: "payment" }] }],
							exercises: {
								sections: [
									{
										items: [
											{
												n: 1,
												q: "今月分の家賃の（a. 支払い　b. 支出）を済ませた。",
												q_r: "今月<ruby>分<rt>ぶん</rt></ruby>の<ruby>家賃<rt>やちん</rt></ruby>の（a. <ruby>支払<rt>しはら</rt></ruby>い　b. <ruby>支出<rt>ししゅつ</rt></ruby>）を<ruby>済<rt>す</rt></ruby>ませた。",
											},
										],
									},
								],
							},
						},
					],
				},
			],
			"n2vocab",
		);
		expect(items[0].exampleJp).toBe("今月分の家賃の支払いを済ませた。");
		expect(items[0].exampleJpHtml).toContain("<rt>やちん</rt>");
		expect(items[0].exampleReading).toContain("やちん");
		expect(items[0].exampleCn).toBe("这个月的房租已经付完了。");
	});

	it("builds reading cards from vocab and expressions", () => {
		const items = cardsFromReadingWeeks(
			[
				{
					n: 1,
					days: [
						{
							day: 1,
							vocab: [
								{ jp: "注文", kana: "ちゅうもん", cn: "点餐", en: "order" },
								{ jp: "割引券", kana: "わりびきけん", cn: "折扣券", en: "coupon" },
							],
							expressions: [{ jp: "ご注文の際", kana: "ちゅうもん", cn: "点餐时", en: "when ordering" }],
							snippets: [
								{
									jp: "チーズケーキといえば、{割引券|わりびきけん}があったの。",
									cn: "说到芝士蛋糕，我有张折扣券。",
									en: "Speaking of cheesecake, I had a coupon.",
								},
							],
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
		expect(items.map((item) => item.kind)).toEqual(["word", "word", "expression"]);
		expect(items[0].exampleJp).toContain("注文");
		expect(items[0].reading).toBe("ちゅうもん");
		expect(items[0].jpHtml).toContain("<rt>ちゅうもん</rt>");
		expect(items[0].exampleJpHtml).toContain("<ruby>");
		expect(items[1].exampleJp).toContain("割引券");
		expect(items[1].exampleCn).toContain("折扣券");
		expect(items[2].jpHtml).toContain("注文");
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
							sections: [
								{
									items: [
										{
											n: 1,
											q: "私は10階（a. 建て　b. 建ち）のマンションに住んでいます。",
											q_r: "<ruby>私<rt>わたし</rt></ruby>は10<ruby>階<rt>かい</rt></ruby>（a. <ruby>建<rt>た</rt></ruby>て　b. <ruby>建<rt>た</rt></ruby>ち）のマンションに<ruby>住<rt>す</rt></ruby>んでいます。",
										},
									],
								},
							],
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
		expect(document.querySelector(".fcard-ex ruby rt")?.textContent).toBe("わたし");
		expect(document.querySelector(".fcard-ex .review-reading")?.textContent).toContain("わたし");
		expect(document.querySelector(".fcard-ex .cn")?.textContent).toBe("（建成…层）");
		expect(document.querySelector(".fcard-ex .jp")?.textContent).toContain("マンション");
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
		expect(document.querySelector(".fcard-ex ruby rt")?.textContent).toBeTruthy();
		expect(document.querySelector(".fcard-ex .jp")?.textContent).toContain("設定");
	});

	it("filters a week down to one day", async () => {
		const user = userEvent.setup();
		setModule("n2vocab");
		V2.weeks = [
			{
				n: 1,
				days: [
					{ day: 1, sections: [{ items: [{ jp: "家賃", cn: "房租", en: "rent" }] }] },
					{ day: 2, sections: [{ items: [{ jp: "給料", cn: "工资", en: "salary" }] }] },
				],
			},
			{
				n: 2,
				days: [{ day: 1, sections: [{ items: [{ jp: "残業", cn: "加班", en: "overtime" }] }] }],
			},
		];
		render(<ModuleCardsPage />);
		await user.click(screen.getByRole("button", { name: "第1週" }));
		expect(screen.getByRole("button", { name: "1日目" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "2日目" })).toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: "2日目" }));
		expect(screen.getByText("給料")).toBeInTheDocument();
		expect(screen.queryByText("家賃")).not.toBeInTheDocument();
		expect(screen.queryByText("残業")).not.toBeInTheDocument();
	});
});
