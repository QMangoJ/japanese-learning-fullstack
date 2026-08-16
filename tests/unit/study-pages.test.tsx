import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useSyncExternalStore } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
	CardsPage,
	FavsPage,
	Fmt,
	HenkeiPage,
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
	favsPayload,
	getVersion,
	mistakesPayload,
	registerFavMeta,
	resetStudyStateForTests,
	setCardsWeek,
	setModule,
	setNavImpl,
	subscribe,
	toggleFav,
} from "../../app/study/store";
import { DayPage } from "../../app/study/days";

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
		await user.click(screen.getByRole("button", { name: "‹ 返回列表" }));

		await user.click(screen.getByRole("button", { name: "删除" }));
		expect(screen.getByText(/还没有记录/)).toBeInTheDocument();
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
