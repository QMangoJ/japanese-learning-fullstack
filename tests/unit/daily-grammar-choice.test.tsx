import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { DayPage } from "../../app/study/days";
import { dailyChoiceQuiz, parsePracticeAnswers } from "../../app/study/practice-answers";
import { G, G1, G2, G4, K, V, mistakesPayload, resetStudyStateForTests, setModule } from "../../app/study/store";

const DATA = resolve("public/data");
const json = (name: string) => JSON.parse(readFileSync(resolve(DATA, name), "utf8"));

function pairCount(text: string | undefined) {
	if (!text) return 0;
	return [...text.matchAll(/（\s*a[.．]\s*([^）]*?)\s+b[.．]\s*([^）]*?)\s*）/gu)].length;
}

function coverage(bookFile: string, expFile: string | null) {
	const book = json(bookFile);
	const exp = expFile ? json(expFile) : null;
	const stats = { choice: 0, clickable: 0, multi: 0, marks: 0, both: 0, order: 0, orderQuiz: 0, missed: [] as string[] };
	for (const week of book.weeks || []) {
		for (const day of week.days || []) {
			if (day.day === 7) continue;
			const parsed = parsePracticeAnswers(day.exercises?.answers, day.exercises?.sections);
			const byN = new Map((exp?.[`w${week.n}d${day.day}`]?.items || []).map((item: any) => [item.n, item]));
			for (const sec of day.exercises?.sections || []) {
				for (const it of sec.items || []) {
					const info = byN.get(it.n);
					const answer = info?.type === "order" ? undefined : (info?.answer ?? parsed.get(String(it.n)));
					const quiz = dailyChoiceQuiz(sec.type, it, answer, info?.type);
					if (sec.type === "order") {
						stats.order++;
						if (quiz) stats.orderQuiz++;
						continue;
					}
					if (sec.type !== "choice") continue;
					stats.choice++;
					const pairs = pairCount(it.q);
					if (quiz) {
						stats.clickable++;
						if (/^[○〇◯×✕✖✗]/u.test(String(answer || ""))) stats.marks++;
						if (quiz.accept.length > 1) stats.both++;
					} else if (pairs > 1) stats.multi++;
					else stats.missed.push(`${week.n}-${day.day}#${it.n} pairs=${pairs} ans=${answer} opts=${(it.options || it.opts || []).length}`);
				}
			}
		}
	}
	return stats;
}

beforeEach(() => {
	resetStudyStateForTests();
	window.sessionStorage.clear();
});

describe("dailyChoiceQuiz", () => {
	it("matches every single grammar choice in the books and leaves order and multi-blank items static", () => {
		const n2 = coverage("n2grammar.4e6157570a.json", "n2-grammar-daily-explanations.json");
		const n3 = coverage("grammar.d15be04258.json", "n3-grammar-daily-explanations.json");
		const n4 = coverage("n4grammar.40e138ccdb.json", "n4-grammar-daily-explanations.json");
		const n1 = coverage("n1grammar.c2d6c00681.json", null);
		expect(n2.missed, n2.missed.join("\n")).toEqual([]);
		expect(n3.missed, n3.missed.join("\n")).toEqual([]);
		expect(n4.missed, n4.missed.join("\n")).toEqual([]);
		expect(n1.missed, n1.missed.join("\n")).toEqual([]);
		expect(n2).toMatchObject({ choice: 250, clickable: 246, multi: 4, marks: 20, both: 4, orderQuiz: 0 });
		expect(n3).toMatchObject({ choice: 177, clickable: 173, multi: 4, both: 2, orderQuiz: 0 });
		expect(n4).toMatchObject({ choice: 72, clickable: 72, multi: 0, orderQuiz: 0 });
		expect(n1).toMatchObject({ choice: 240, clickable: 240, multi: 0, orderQuiz: 0 });
		expect(n2.order).toBeGreaterThan(0);
	});

	it("strips the book index off numbered options and accepts either a·b choice", () => {
		expect(dailyChoiceQuiz("choice", {
			q: "米（　）作る。",
			options: ["1 に", "2 から"],
			options_r: ["1 に", "2 から"],
		}, "2")).toEqual({ opts: ["に", "から"], opts_r: ["に", "から"], accept: [2] });
		expect(dailyChoiceQuiz("choice", { q: "起こり（a. える　b. うる）。" }, "a・b")?.accept).toEqual([1, 2]);
		expect(dailyChoiceQuiz("order", { q: "＿＿", options: ["1 あ", "2 い"] }, "2→1")).toBeNull();
		expect(dailyChoiceQuiz("choice", { q: "（a. よう　b. ろう）しても（a. 開かない　b. 開こうとしない）。" }, "a、a")).toBeNull();
	});
});

function lesson(book: any, exercises: any, explanations?: any) {
	book.weeks = [{ n: 9, title: "練習", days: [{ day: 1, title: "練習", title_cn: "练习", points: [], exercises }] }];
	book.daily_explanations = explanations || {};
}

describe("grammar daily practice options", () => {
	it("marks an N2 choice, logs the miss, and keeps the explanation panel", async () => {
		const user = userEvent.setup();
		setModule("n2grammar");
		lesson(G2, {
			answers: "Ⅰ：①b ②a・b　Ⅱ：③4→1→2→3",
			sections: [
				{
					type: "choice",
					instruction: "正しいほうに〇をつけなさい。",
					items: [
						{ n: 1, q: "この牛乳は水（a. っぽくて　b. 気味で）、おいしくない。" },
						{ n: 2, q: "そういう問題は、起こり（a. える　b. うる）だろう。" },
					],
				},
				{
					type: "order",
					instruction: "並べ替えなさい。",
					items: [{ n: 3, q: "両親を ＿＿ ＿＿ だ。", options: ["1 休みがち", "2 仕事も", "3 悲しげで", "4 亡くしてから"] }],
				},
			],
		}, {
			w9d1: {
				items: [
					{ n: 1, type: "choice", answer: "b", translation: "这牛奶味道很淡。" },
					{ n: 2, type: "choice", answer: "a・b", translation: "那种问题有可能发生。" },
					{ n: 3, type: "order", answer: "4→1→2→3" },
				],
			},
		});
		render(<DayPage w={9} d={1} token={null} />);
		const first = screen.getByText(/この牛乳は水/).closest(".daily-q") as HTMLElement;
		expect(within(first).getByRole("button", { name: /显示答案与解析/ })).toBeInTheDocument();
		await user.click(within(first).getByRole("button", { name: "1 っぽくて" }));
		expect(within(first).getByText("✗ 答错了")).toBeInTheDocument();
		expect(within(first).getByRole("button", { name: "1 っぽくて" })).toHaveClass("wrong");
		expect(within(first).getByRole("button", { name: "2 気味で" })).toHaveClass("correct");
		expect(within(first).getByRole("button", { name: /显示答案与解析/ })).toBeInTheDocument();
		expect(mistakesPayload().list[0].text).toContain("你的答案：っぽくて");
		expect(mistakesPayload().list[0].text).toContain("正确答案：気味で");

		const either = screen.getByText(/起こり/).closest(".daily-q") as HTMLElement;
		await user.click(within(either).getByRole("button", { name: "1 える" }));
		expect(within(either).getByText("✓ 答对了")).toBeInTheDocument();
		expect(within(either).getByRole("button", { name: "2 うる" })).toHaveClass("correct");
		expect(mistakesPayload().list).toHaveLength(1);

		const order = screen.getByText(/両親を/).closest(".daily-q") as HTMLElement;
		expect(order.querySelector(".opt-btn")).toBeNull();
		expect(order.querySelectorAll(".opts span").length).toBeGreaterThan(0);
	});

	it("marks an N4 numbered choice and an N1 answer taken from the book key", async () => {
		const user = userEvent.setup();
		setModule("n4grammar");
		lesson(G4, {
			answers: "①2",
			sections: [{
				type: "choice",
				instruction: "いちばんいいものを一つえらんでください。",
				items: [{ n: 1, q: "日本酒は米（　）作られます。", options: ["1 に", "2 から", "3 で", "4 を"] }],
			}],
		}, { w9d1: { items: [{ n: 1, type: "choice", answer: "2", translation: "日本酒是用米酿的。" }] } });
		const n4 = render(<DayPage w={9} d={1} token={null} />);
		const n4q = screen.getByText(/日本酒は米/).closest(".daily-q") as HTMLElement;
		expect(within(n4q).getByRole("button", { name: /显示答案与解析/ })).toBeInTheDocument();
		await user.click(within(n4q).getByRole("button", { name: "2 から" }));
		expect(within(n4q).getByText("✓ 答对了")).toBeInTheDocument();
		n4.unmount();

		setModule("n1grammar");
		lesson(G1, {
			answers: "Ⅰ：①a",
			sections: [{
				type: "choice",
				instruction: "正しいほうに〇をつけなさい。",
				items: [{ n: 1, q: "その国で生活（a. してこそ　b. したこそ）文化がわかる。" }],
			}],
		});
		render(<DayPage w={9} d={1} token={null} />);
		const n1q = screen.getByText(/生活/).closest(".daily-q") as HTMLElement;
		await user.click(within(n1q).getByRole("button", { name: "1 してこそ" }));
		expect(within(n1q).getByText("✓ 答对了")).toBeInTheDocument();
		expect(n1q.querySelector(".daily-explain")).toBeNull();
	});

	it("leaves N3 grammar, vocab, and kanji practice on the paths they already use", async () => {
		const user = userEvent.setup();
		setModule("grammar");
		lesson(G, {
			answers: "Ⅰ：①a",
			sections: [{
				type: "choice",
				instruction: "正しいほうに〇をつけなさい。",
				items: [{ n: 1, q: "英語は世界中で（a. 話されて　b. 話られて）います。" }],
			}],
		}, { w9d1: { items: [{ n: 1, type: "choice", answer: "a", translation: "英语在全世界被使用。" }] } });
		const n3 = render(<DayPage w={9} d={1} token={null} />);
		const q = screen.getByText(/英語は世界中で/).closest(".daily-q") as HTMLElement;
		await user.click(within(q).getByRole("button", { name: "2 話られて" }));
		expect(within(q).getByText("✗ 答错了")).toBeInTheDocument();
		expect(within(q).getByRole("button", { name: /显示答案与解析/ })).toBeInTheDocument();
		n3.unmount();

		setModule("vocab");
		V.weeks = [{
			n: 9,
			days: [{
				day: 1,
				title: "词汇",
				sections: [],
				exercises: { sections: [{ instruction: "選びなさい", items: [{ n: 1, q: "テスト（　）。", opts: ["あ", "い"] }] }] },
			}],
		}];
		const vocab = render(<DayPage w={9} d={1} token={null} />);
		expect(document.querySelector(".daily-q .opt-btn")).toBeNull();
		expect(document.querySelectorAll(".daily-q .opts span")).toHaveLength(2);
		vocab.unmount();

		setModule("kanji");
		K.weeks = [{
			n: 9,
			days: [{
				day: 1,
				title: "汉字",
				kanji: [],
				exercises: { sections: [{ instruction: "選びなさい", items: [{ n: 1, q: "漢字（　）。", options: ["1 あ", "2 い"] }] }] },
			}],
		}];
		render(<DayPage w={9} d={1} token={null} />);
		expect(document.querySelector(".daily-q .opt-btn")).toBeNull();
		expect(document.querySelectorAll(".daily-q .opts span")).toHaveLength(2);
	});
});
