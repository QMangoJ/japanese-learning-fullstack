import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { CardsPage } from "../../app/routes/study-common";
import { G, G2, G4, cardsDays, cardsState, resetStudyStateForTests, setCardsDay, setCardsWeek, setModule, setNavImpl } from "../../app/study/store";

const DATA_DIR = join(__dirname, "../../public/data");

function grammarBook(prefix: "grammar" | "n2grammar" | "n4grammar") {
	const file = readdirSync(DATA_DIR).find((name) => new RegExp(`^${prefix}\\.[0-9a-f]+\\.json$`).test(name));
	if (!file) throw new Error(`missing ${prefix} data`);
	return JSON.parse(readFileSync(join(DATA_DIR, file), "utf8"));
}

function point(pattern: string) {
	return { pattern, usage_cn: `${pattern} 的用法` };
}

beforeEach(() => {
	resetStudyStateForTests();
	setNavImpl(() => {});
	setModule("grammar");
});

describe("grammar flashcard day mapping", () => {
	it("maps each grammar card to its source day and skips the day-7 test", () => {
		G.weeks = [
			{
				n: 1,
				days: [
					{ day: 1, points: [point("ばかり"), point("ところ")] },
					{ day: 2, points: [point("うちに")] },
					{ day: 7, points: [], exercises: [{ q: "test" }] },
				],
			},
			{ n: 2, days: [{ day: 1, points: [point("ように")] }] },
		];
		expect(cardsDays(1)).toEqual([1, 2]);
		expect(cardsDays(0)).toEqual([]);
		setCardsWeek(1);
		setCardsDay(1);
		expect(cardsState().deck.map((card) => [card.w, card.d, card.p.pattern]).sort()).toEqual([
			[1, 1, "ところ"],
			[1, 1, "ばかり"],
		]);
		setCardsDay(2);
		expect(cardsState().deck.map((card) => card.p.pattern)).toEqual(["うちに"]);
	});

	it.each(["grammar", "n2grammar", "n4grammar"] as const)("splits every real %s week into days 1-6", (prefix) => {
		const book = grammarBook(prefix);
		setModule(prefix);
		({ grammar: G, n2grammar: G2, n4grammar: G4 })[prefix].weeks = book.weeks;
		for (const week of book.weeks) {
			expect(cardsDays(week.n)).toEqual([1, 2, 3, 4, 5, 6]);
			setCardsWeek(week.n);
			const whole = cardsState().deck.length;
			let sum = 0;
			for (const day of [1, 2, 3, 4, 5, 6]) {
				setCardsDay(day);
				const deck = cardsState().deck;
				expect(deck.length).toBeGreaterThan(0);
				expect(deck.every((card) => card.w === week.n && card.d === day)).toBe(true);
				sum += deck.length;
			}
			expect(sum).toBe(whole);
		}
	});
});

describe("grammar CardsPage day filter", () => {
	it("shows 本周全部 plus days 1-6 and gives each day its own cards", async () => {
		const user = userEvent.setup();
		G.weeks = [
			{
				n: 1,
				days: [
					...[1, 2, 3, 4, 5, 6].map((day) => ({ day, points: [point(`文型${day}`)] })),
					{ day: 7, points: [] },
				],
			},
			{ n: 2, days: [{ day: 1, points: [point("別週")] }] },
		];
		render(<CardsPage />);
		expect(screen.queryByRole("button", { name: "1日目" })).not.toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: "第1週" }));
		expect(screen.getByRole("button", { name: "本周全部" })).toBeInTheDocument();
		for (const day of [1, 2, 3, 4, 5, 6]) expect(screen.getByRole("button", { name: `${day}日目` })).toBeInTheDocument();
		expect(screen.queryByRole("button", { name: "7日目" })).not.toBeInTheDocument();
		expect(screen.getByText(/^\d+ \/ 6$/)).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "1日目" }));
		expect(screen.getByText("1 / 1")).toBeInTheDocument();
		expect(screen.getByText("文型1")).toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: "2日目" }));
		expect(screen.getByText("文型2")).toBeInTheDocument();
		expect(screen.queryByText("文型1")).not.toBeInTheDocument();
		expect(screen.queryByText("別週")).not.toBeInTheDocument();
	});
});
