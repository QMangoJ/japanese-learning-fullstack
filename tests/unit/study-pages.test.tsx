import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useSyncExternalStore } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
	CardsPage,
	FavsPage,
	Fmt,
	HenkeiPage,
	JitaPage,
	KougoPage,
	HomePage,
	MistakesPage,
	RubyHtml,
	SayButton,
	SearchPage,
	Star,
} from "../../app/routes/study-common";
import {
	G,
	V,
	addMistake,
	favsPayload,
	getVersion,
	mistakesPayload,
	registerFavMeta,
	resetStudyStateForTests,
	setCardsWeek,
	setModule,
	setNavImpl,
	setCtMode,
	subscribe,
	toggleFav,
} from "../../app/study/store";
import { ContrastPage, DayPage } from "../../app/study/days";

function LiveMistakes() {
	useSyncExternalStore(subscribe, getVersion, () => 0);
	return <MistakesPage data={mistakesPayload()} />;
}

function LiveFavs() {
	useSyncExternalStore(subscribe, getVersion, () => 0);
	return <FavsPage data={favsPayload()} />;
}

function LiveDay({ w, d }: { w: number; d: number }) {
	useSyncExternalStore(subscribe, getVersion, () => 0);
	return <DayPage w={w} d={d} token={null} />;
}

function seedCatalog() {
	G.weeks = [
		{
			n: 1,
			title: "導入",
			title_cn: "导入",
			days: [
				{
					day: 7,
					title: "実戦問題",
					title_cn: "实战问题",
					mondai1: {
						instruction: "次の文の＿＿に入るものはどれか。",
						items: [{ n: 1, q: "もう＿＿ました。", opts: ["食べ", "食べて", "食べた", "食べる"] }],
					},
				},
				{
					day: 1,
					title: "一日目",
					points: [
						{
							pattern: "ばかり",
							reading: "ばかり",
							usage_cn: "表示刚做完",
							usage_en: "have just done",
							connection: "Vた〜",
							examples: [{ jp: "食べたばかりです。", cn: "刚吃完。", en: "I just ate." }],
						},
					],
				},
			],
		},
	];
	V.weeks = [
		{
			n: 1,
			days: [
				{
					day: 1,
					title: "語彙",
					sections: [{ items: [{ jp: "冷蔵庫", cn: "冰箱", en: "fridge" }] }],
				},
			],
		},
	];
}

beforeEach(() => {
	localStorage.clear();
	resetStudyStateForTests();
	seedCatalog();
});

describe("shared markup helpers", () => {
	it("marks stars, strikethrough, and ruby", () => {
		const { container } = render(
			<>
				<Star text="重要★印" />
				<Fmt text="これは~古い~言い方" />
				<RubyHtml html="<ruby>食<rt>た</rt></ruby>べる<u>ばかり</u>" />
			</>,
		);
		expect(container.querySelector(".num-x")?.textContent).toBe("★");
		expect(container.querySelector("del")?.textContent).toBe("古い");
		expect(container.querySelector("ruby")?.textContent).toContain("食");
		expect(container.querySelector("u")?.textContent).toBe("ばかり");
	});

	it("renders a say button that can be clicked without a window bridge", async () => {
		const user = userEvent.setup();
		class FakeUtterance {
			text = "";
			lang = "";
			rate = 1;
			voice = null;
			constructor(text: string) {
				this.text = text;
			}
		}
		const speak = vi.fn();
		Object.defineProperty(window, "SpeechSynthesisUtterance", { configurable: true, value: FakeUtterance });
		Object.defineProperty(window, "speechSynthesis", {
			configurable: true,
			value: { cancel: vi.fn(), speak, getVoices: () => [] },
		});
		render(<SayButton text="こんにちは" />);
		await user.click(screen.getByRole("button", { name: "朗读" }));
		expect(speak).toHaveBeenCalled();
	});
});

describe("MistakesPage", () => {
	it("adds, filters, studies, and deletes a note", async () => {
		const user = userEvent.setup();
		render(<LiveMistakes />);

		await user.click(screen.getByRole("button", { name: "单词" }));
		await user.type(screen.getByPlaceholderText(/记一下考试错题/), "冷蔵庫");
		await user.click(screen.getByRole("button", { name: "保存" }));
		expect(screen.getByText("冷蔵庫")).toBeInTheDocument();
		expect(screen.getByText(/单词（1）/)).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: /语法（0）/ }));
		expect(screen.getByText(/还没有记录/)).toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: /全部（1）/ }));

		await user.click(screen.getByRole("button", { name: /背诵模式/ }));
		expect(screen.getByText("‹ 返回列表")).toBeInTheDocument();
		const columns = document.querySelector(".study-columns") as HTMLElement;
		await user.click(screen.getByRole("button", { name: "翻译 / 答案" }));
		expect(columns.classList.contains("study-hide-cn")).toBe(true);
		expect(document.querySelector(".study-cn")).not.toBeNull();
		expect(document.querySelector(".study-jp")).not.toBeNull();
		await user.click(screen.getByRole("button", { name: "日语" }));
		expect(columns.classList.contains("study-hide-jp")).toBe(true);
		expect(document.querySelector(".study-jp")).not.toBeNull();
		await user.click(screen.getByRole("button", { name: "‹ 返回列表" }));

		await user.click(screen.getByRole("button", { name: "删除" }));
		expect(screen.getByText(/还没有记录/)).toBeInTheDocument();
	});

	it("keeps type and mastery filters in separate four-option groups", () => {
		render(<LiveMistakes />);

		const typeGroup = screen.getByRole("group", { name: "内容类型" });
		const levelGroup = screen.getByRole("group", { name: "熟练度" });
		expect(typeGroup.querySelectorAll(".mistake-filter-grid button")).toHaveLength(4);
		expect(levelGroup.querySelectorAll(".mistake-filter-grid button")).toHaveLength(4);
		expect(screen.getByRole("button", { name: "背诵模式（0）" })).toBeInTheDocument();
	});
});

describe("SearchPage", () => {
	it("lists hits and opens a grammar point", async () => {
		const user = userEvent.setup();
		const seen: string[] = [];
		setNavImpl((key) => seen.push(key));
		render(<SearchPage />);

		await user.type(screen.getByPlaceholderText(/日文/), "冷蔵庫");
		const hit = screen.getAllByText("冷蔵庫")[0].closest(".result");
		expect(hit).toBeTruthy();
		await user.click(hit!);
		expect(seen[0]).toMatch(/#\/day\/\d+-\d+/);
	});

	it("filters search results by grammar, kanji, and vocabulary", async () => {
		const user = userEvent.setup();
		render(<SearchPage />);
		await user.type(screen.getByPlaceholderText(/日文/), "冷蔵庫");
		expect(screen.getAllByText("冷蔵庫").length).toBeGreaterThan(0);

		await user.click(screen.getByRole("button", { name: /语法/ }));
		expect(screen.getByText(/没有找到/)).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: /词汇/ }));
		expect(screen.getAllByText("冷蔵庫").length).toBeGreaterThan(0);
		expect(screen.getByRole("button", { name: /词汇/ })).toHaveAttribute("aria-pressed", "true");
	});

	it("includes mistake notes in all results and in the mistake filter", async () => {
		addMistake("q", "商品券の読み方\n正确答案：しょうひんけん");
		const user = userEvent.setup();
		render(<SearchPage />);
		await user.type(screen.getByPlaceholderText(/日文/), "商品券");
		expect(document.querySelector(".result")?.textContent).toContain("商品券の読み方");

		await user.click(screen.getByRole("button", { name: /错题本/ }));
		expect(screen.getAllByText("错题本").length).toBeGreaterThan(0);
		expect(document.querySelector(".result")?.textContent).toContain("商品券の読み方");
	});

	it("saves and clears search history", async () => {
		const user = userEvent.setup();
		render(<SearchPage />);
		const input = screen.getByPlaceholderText(/日文/);
		await user.type(input, "fridge{Enter}");
		await user.clear(input);
		expect(screen.getByText("fridge")).toBeInTheDocument();
		await user.click(screen.getByText("清空"));
		expect(screen.queryByText("fridge")).not.toBeInTheDocument();
	});
});

describe("HenkeiPage", () => {
	it("does not crash when verb-form data is missing", () => {
		expect(() => render(<HenkeiPage data={{}} />)).not.toThrow();
		expect(screen.getByText(/变形数据还没加载完|Verb-form data/)).toBeInTheDocument();
	});

	it("renders sound-change rules", () => {
		render(
			<HenkeiPage
				data={{
					henkei: {
						intro: "怎么把动词变成那个形",
						rules: [{ title: "五段動詞のテ形・タ形（音便）", cols: ["変化", "例"], rows: [{ label: "〜く", vals: ["→ いて", "書く→書いて"] }] }],
					},
				}}
			/>,
		);
		expect(screen.getByText("五段動詞のテ形・タ形（音便）")).toBeInTheDocument();
		expect(screen.getByText("書く→書いて")).toBeInTheDocument();
	});
});

describe("KougoPage", () => {
	it("does not crash when contraction data is missing", () => {
		expect(() => render(<KougoPage data={{}} />)).not.toThrow();
		expect(screen.getByText(/口语缩约数据还没加载完|Spoken-contraction data/)).toBeInTheDocument();
	});

	it("renders spoken contractions and examples", () => {
		render(
			<KougoPage
				data={{
					kougo: {
						intro: "日常会话里会缩",
						groups: [
							{
								title: "てしまう：完成、遗憾、不小心",
								items: [
									{
										spoken: "〜ちゃった / 〜じゃった",
										full: "〜てしまった / 〜でしまった",
										cn: "不小心……了",
										eg: "食べちゃった",
										eg_cn: "不小心吃掉了",
									},
								],
							},
						],
					},
				}}
			/>,
		);
		expect(screen.getByRole("columnheader", { name: "口语" })).toBeInTheDocument();
		expect(screen.getByRole("columnheader", { name: "完整形" })).toBeInTheDocument();
		expect(screen.getByText("〜ちゃった / 〜じゃった")).toBeInTheDocument();
		expect(screen.getByText("〜てしまった / 〜でしまった")).toBeInTheDocument();
		expect(screen.getByText("食べちゃった")).toBeInTheDocument();
	});
});

describe("JitaPage", () => {
	it("does not crash when pair data is missing", () => {
		expect(() => render(<JitaPage data={{}} />)).not.toThrow();
		expect(screen.getByText(/自动词和他动词数据还没加载完|Transitive\/intransitive data/)).toBeInTheDocument();
	});

	it("renders transitive and intransitive pairs with readings and examples", () => {
		render(
			<JitaPage
				data={{
					jita: {
						intro: "他动词用を，自动词用が。",
						groups: [
							{
								title: "开闭・开关",
								pairs: [
									{
										cn: "打开",
										ta: {
											dict: "開ける",
											dict_r: "<ruby>開<rt>あ</rt></ruby>ける",
											masu: "開けます",
											masu_r: "<ruby>開<rt>あ</rt></ruby>けます",
											kana: "あける",
											eg: "ドアを開けます。",
											eg_cn: "打开门。",
										},
										ji: {
											dict: "開く",
											dict_r: "<ruby>開<rt>あ</rt></ruby>く",
											masu: "開きます",
											kana: "あく",
											eg: "ドアが開いています。",
											eg_cn: "门开着。",
										},
									},
								],
							},
						],
					},
				}}
			/>,
		);
		expect(screen.getByText("开闭・开关")).toBeInTheDocument();
		expect(screen.getByText("打开")).toBeInTheDocument();
		expect(screen.getByText("他动词 · を")).toBeInTheDocument();
		expect(screen.getByText("自动词 · が")).toBeInTheDocument();
		expect(screen.getByText(/（あける）/)).toBeInTheDocument();
		expect(screen.getByText(/ドアを開けます/)).toBeInTheDocument();
		expect(screen.getByText("门开着。")).toBeInTheDocument();
		expect(document.querySelector(".jita-word ruby")?.childNodes[0]?.textContent).toBe("開");
		expect(document.querySelector(".jita-word")?.textContent).toContain("ける");
		expect(document.querySelector(".jita-masu")?.textContent).toContain("けます");
		expect(document.querySelector("ruby")?.textContent).toContain("開");
		expect(document.querySelector("rt")?.textContent).toBe("あ");
	});
});

describe("HomePage and CardsPage", () => {
	it("opens a week and navigates to a day", async () => {
		const user = userEvent.setup();
		const seen: string[] = [];
		setNavImpl((key) => seen.push(key));
		render(<HomePage data={{ weeks: G.weeks, intro: "目录", lang: "cn", scale: "week" }} />);
		expect(screen.getByText("一日目")).toBeInTheDocument();
		await user.click(screen.getByText("1日目"));
		expect(seen).toContain("#/day/1-1");
	});

	it("flips a grammar flashcard", async () => {
		const user = userEvent.setup();
		setCardsWeek(0);
		render(<CardsPage />);
		expect(screen.getByText("回想接续与意思，点击翻面")).toBeInTheDocument();
		await user.click(screen.getByText("回想接续与意思，点击翻面"));
		expect(screen.getByText("表示刚做完")).toBeInTheDocument();
	});
});

describe("N3 day 7 exam favorites", () => {
	it("lets a question be saved from the weekly grammar test", async () => {
		const user = userEvent.setup();
		setModule("grammar");
		render(<LiveDay w={1} d={7} />);
		const star = screen.getByRole("button", { name: /收藏错题|Save question/ });
		expect(star).toBeInTheDocument();
		await user.click(star);
		expect(favsPayload().total).toBe(1);
		expect(favsPayload().items[0].jp).toContain("もう＿＿ました。");
		expect(screen.getByRole("button", { name: /取消收藏错题|Remove from favorites/ })).toBeInTheDocument();
	});
});

describe("ContrastPage usage notes", () => {
	beforeEach(() => {
		setModule("grammar");
		setCtMode("family");
		G.contrast = {
			intro: "按家族归类",
			groups: [
				{
					title: "①「ように」系列",
					tip: "接辞书形还是意志形",
					rows: [
						{
							loc: "1-4",
							form: "Vる/Vない＋ようにする",
							mean: "表示主观上将某种行为作为习惯，或努力做到某种状态",
							eg: "忘れ物をしないようにする",
							eg_cn: "尽量别丢三落四",
						},
					],
				},
			],
		};
	});

	it("shows pattern, usage, and example labels in the family summary", () => {
		render(<ContrastPage />);
		expect(screen.getAllByText("语法句型").length).toBeGreaterThan(0);
		expect(screen.getByText("用法说明")).toBeInTheDocument();
		expect(screen.getByText("典型例句")).toBeInTheDocument();
		expect(screen.getByText("表示主观上将某种行为作为习惯，或努力做到某种状态")).toBeInTheDocument();
		expect(screen.getByText("忘れ物をしないようにする")).toBeInTheDocument();
	});

	it("shows usage and a sample sentence in the weekly summary", () => {
		setCtMode("week");
		render(<ContrastPage />);
		expect(screen.getByText("用法说明")).toBeInTheDocument();
		expect(screen.getByText("表示刚做完")).toBeInTheDocument();
		expect(screen.getByText("食べたばかりです。")).toBeInTheDocument();
	});
});

describe("FavsPage", () => {
	it("shows saved items and can start study mode", async () => {
		const user = userEvent.setup();
		registerFavMeta("grammar#1-1#0", {
			module: "grammar",
			hash: "#/day/1-1",
			w: 1,
			d: 1,
			jp: "ばかり",
			cn: "刚做完",
		});
		toggleFav("grammar#1-1#0");
		render(<LiveFavs />);
		expect(screen.getByText("刚做完")).toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: "背诵模式" }));
		expect(screen.getByText("‹ 返回列表")).toBeInTheDocument();
	});
});
