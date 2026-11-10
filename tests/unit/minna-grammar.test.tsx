import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MINNA_BOOKS, minnaSearchRecords, plainMinna, validateMinnaCatalog, type MinnaBook } from "../../app/data/minna-grammar";
import { MinnaGrammarPage } from "../../app/study/MinnaGrammarPage";
import { minnaHash, parseMinnaRoute } from "../../app/study/minna-route";
import { Sheet } from "../../app/study/Sheet";
import { bootReadingSearch, openSearchHit, resetStudyStateForTests, searchCategoryForModule, searchHits, setNavImpl } from "../../app/study/store";

const POINTS: Record<number, string[]> = {
	40: ["l40-ka", "l40-kadouka", "l40-temimasu"],
	41: ["l41-itadakimasu", "l41-kudasaimasu", "l41-yarimasu", "l41-te-itadakimasu", "l41-te-kudasaimasu", "l41-te-yarimasu", "l41-kudasaimasenka"],
	42: ["l42-tameni", "l42-noni-use", "l42-kakarimasu"],
	43: ["l43-v-sou", "l43-a-sou", "l43-tekimasu"],
	44: ["l44-sugimasu", "l44-yasui-nikui", "l44-ku-ni-shimasu", "l44-ni-shimasu-choice"],
	45: ["l45-baai", "l45-noni"],
	46: ["l46-ru-tokoro", "l46-teiru-tokoro", "l46-ta-tokoro", "l46-ta-bakari", "l46-hazu"],
	47: ["l47-sou-hearsay", "l47-you"],
	48: ["l48-vi-causative", "l48-vt-causative", "l48-sete"],
	49: ["l49-rareru", "l49-o-ni-narimasu", "l49-special", "l49-o-kudasai"],
	50: ["l50-o-shimasu", "l50-humble-other", "l50-humble-self", "l50-teinei"],
};

const TEXTBOOK_LINES = [
	"台風は来るかどうか",
	"出席できるかどうか",
	"まちがいがないかどうか、みていただけませんか",
	"何時に到着するか",
	"どこへ行ったか、覚えていない",
	"このはさみは花を切るのに使います",
	"雨が降りそうです",
	"私は天ぷらにします",
	"約束したのに",
	"今から食べるところです",
	"田中さんは今日来るはずです",
];

describe("minna no nihongo grammar", () => {
	it("keeps shokyu II lessons 40-50 and leaves room for chukyu", () => {
		expect(validateMinnaCatalog(MINNA_BOOKS)).toEqual([]);
		expect(MINNA_BOOKS.map((book) => book.id)).toEqual(["shokyu-2"]);
		const book = MINNA_BOOKS[0];
		expect(book.stage).toBe("shokyu");
		expect(book.edition).toBe(2);
		expect(book.lessons.map((lesson) => lesson.number)).toEqual([40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]);
		for (const lesson of book.lessons) {
			expect(lesson.points.map((point) => point.id)).toEqual(POINTS[lesson.number]);
		}
		const spoken = book.lessons.flatMap((lesson) => lesson.points.flatMap((point) => point.examples.map((example) => plainMinna(example.jp))));
		for (const line of TEXTBOOK_LINES) expect(spoken.some((sentence) => sentence.includes(line))).toBe(false);

		const chukyu: MinnaBook = {
			id: "chukyu-1",
			stage: "chukyu",
			volume: 1,
			edition: 1,
			titleZh: "大家的日本语 中級 I",
			titleJa: "みんなの日本語 中級I",
			titleEn: "Minna no Nihongo Chukyu I",
			lessons: [
				{
					number: 1,
					titleZh: "示例",
					titleEn: "Sample",
					goalZh: "用来确认中级可以按同一结构追加。",
					goalEn: "Schema check.",
					points: [
						{
							id: "c1-sample",
							pattern: "〜てから",
							reading: "てから",
							connection: "动词て形＋から",
							zh: "这是结构测试用的占位说明。",
							en: "Placeholder.",
							examples: [{ jp: "手を{洗|あら}ってから食べます。", zh: "洗了手再吃。", en: "I eat after washing my hands." }],
						},
					],
				},
			],
		};
		expect(validateMinnaCatalog([chukyu])).toEqual([]);
		expect(MINNA_BOOKS.some((item) => item.stage === "chukyu")).toBe(false);
	});

	it("indexes each grammar point for search and routes to that lesson", async () => {
		const rows = minnaSearchRecords();
		expect(rows.length).toBe(Object.values(POINTS).reduce((sum, ids) => sum + ids.length, 0));
		const hit = rows.find((row) => row.key.includes("かどうか"));
		expect(hit).toMatchObject({ module: "minna", bookId: "shokyu-2", w: 40 });
		expect(parseMinnaRoute("#/minna")).toEqual({ bookId: null, lesson: null, point: null });
		expect(parseMinnaRoute(minnaHash("shokyu-2", 40, hit?.i))).toEqual({ bookId: "shokyu-2", lesson: 40, point: hit?.i });
		expect(parseMinnaRoute("#/minna/not a book")).toBeNull();
		resetStudyStateForTests();
		await bootReadingSearch();
		expect(searchCategoryForModule("minna")).toBe("grammar");
		const found = searchHits("かどうか", 30, "grammar").find((row) => row.module === "minna");
		expect(found?.w).toBe(40);
		const navs: string[] = [];
		setNavImpl((key) => navs.push(key));
		openSearchHit(found);
		expect(navs).toEqual([`#/minna/shokyu-2/40/p${found?.i ?? 0}`]);
		setNavImpl(() => {});
	});

	it("lists lessons and expands the requested one", () => {
		const navs: string[] = [];
		setNavImpl((key) => navs.push(key));
		render(<MinnaGrammarPage bookId="shokyu-2" lesson={40} point={1} />);
		expect(screen.getByTestId("minna-page")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /第40课/ })).toHaveAttribute("aria-expanded", "true");
		expect(screen.getByRole("button", { name: /第50课/ })).toHaveAttribute("aria-expanded", "false");
		expect(screen.getByText("今晚之内联系，说明天的会能不能参加。")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /出張/ })).toBeInTheDocument();
		fireEvent.click(screen.getByRole("button", { name: /第41课/ }));
		expect(navs.at(-1)).toBe("#/minna/shokyu-2/41");
		setNavImpl(() => {});
	});

	it("places the entry after the level buttons on the level sheet", () => {
		const { container } = render(<Sheet kind="level" onClose={() => {}} onLevel={() => {}} />);
		const labels = [...container.querySelectorAll(".sheet-item")].map((node) => node.textContent ?? "");
		const n1 = labels.findIndex((label) => label.includes("N1"));
		const minna = labels.findIndex((label) => label.includes("大家的日本语"));
		expect(n1).toBeGreaterThanOrEqual(0);
		expect(minna).toBeGreaterThan(n1);
	});
});
