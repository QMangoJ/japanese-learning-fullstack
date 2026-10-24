import { existsSync, readFileSync } from "node:fs";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CafeMenuBoard } from "../../app/study/CafeMenuBoard";
import { CARDS, CATS, CREDITS, FEAT, PHRASES } from "../../app/study/cafe-menu-board-data";
import type { TopicFile } from "../../app/study/topic-vocab";

const topic = JSON.parse(readFileSync("public/data/topics/cafe-menu.json", "utf8")) as TopicFile;
const plain = (segs: [string, string?][]) => segs.map((s) => s[0]).join("");
const KANJI = /[\u4e00-\u9fff々]/;

describe("café menu board", () => {
	it("has the canvas's 39 cards, each with a feature note and an image or emoji", () => {
		expect(CARDS).toHaveLength(39);
		expect(CATS.map((cat) => CARDS.filter((c) => c.cat === cat).length)).toEqual([8, 5, 5, 5, 3, 3, 10]);
		for (const card of CARDS) {
			expect(FEAT[card.id], card.id).toBeTruthy();
			expect(Boolean(card.img) !== Boolean(card.emoji), card.id).toBe(true);
			if (card.img) expect(existsSync(`public/images/cafe-menu/${card.img}.webp`), card.img).toBe(true);
			// 每个汉字片段都要带读音
			for (const [text, reading] of card.jp) if (KANJI.test(text)) expect(reading, `${card.id} ${text}`).toBeTruthy();
		}
		// 「你：」是中文说明，不算日语
		for (const phrase of PHRASES) for (const [text, reading] of phrase.jp) if (KANJI.test(text.replace(/你/g, ""))) expect(reading, text).toBeTruthy();
		expect(CREDITS).toHaveLength(new Set(CARDS.flatMap((c) => (c.img ? [c.img] : []))).size);
	});

	it("keeps the flashcard topic file in step with the board", () => {
		expect(topic.cards.map((c) => c.jp)).toEqual(CARDS.map((c) => plain(c.jp)));
		expect(topic.cards.map((c) => c.subtopic)).toEqual(CARDS.map((c) => c.cat));
		expect(topic.subtopics.map((s) => s.zh)).toEqual(CATS);
	});

	it("filters by category and word origin, and hides meanings in self-test mode", () => {
		const { container } = render(<CafeMenuBoard />);
		expect(container.querySelectorAll(".cm-card")).toHaveLength(39);
		expect(screen.getByText("咖啡（8）")).toBeTruthy();

		fireEvent.click(container.querySelector("[data-cat='茶']")!);
		expect(container.querySelectorAll(".cm-card")).toHaveLength(5);
		fireEvent.click(container.querySelector("[data-kind='和制英语']")!);
		expect([...container.querySelectorAll(".cm-card")].map((el) => el.getAttribute("data-card"))).toEqual(["royal"]);
		// 「混合」在「茶」里没有，不出现在选项里
		expect(container.querySelector("[data-kind='混合']")).toBeNull();

		fireEvent.click(container.querySelector("[data-cat='全部']")!);
		fireEvent.click(container.querySelector("[data-kind='全部']")!);
		fireEvent.click(screen.getByTestId("cafe-quiz"));
		expect(screen.getAllByText("点一下看意思和特点")).toHaveLength(39);
		const blend = container.querySelector("[data-card='blend']") as HTMLElement;
		fireEvent.click(blend);
		expect(within(blend).getByText("拼配咖啡，店里的招牌热咖啡")).toBeTruthy();
		expect(screen.getAllByText("点一下看意思和特点")).toHaveLength(38);

		const phrases = screen.getByTestId("cafe-phrases");
		expect(phrases.querySelectorAll("tbody tr")).toHaveLength(7);
		expect(container.textContent).not.toMatch(/円|¥/);
	});
});
