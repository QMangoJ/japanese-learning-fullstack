import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { applyResumeOrder, loadResumePos, loadResumeScope, resumeIndex, saveResume } from "../../app/study/cards-resume";
import { MemoryCards, type MemoryCardItem } from "../../app/study/memory-cards";
import { initialCardsScope } from "../../app/study/ModuleCardsPage";
import { G, cardsState, ensureCardsDeck, fcCardId, fcResumedAt, navTo, nextCard, openModuleCards, resetStudyStateForTests, setCardsDay, setCardsWeek, setModule, setNavImpl } from "../../app/study/store";

const items: MemoryCardItem[] = ["一", "二", "三", "四"].map((jp, i) => ({ id: `c${i}`, jp, cn: jp }));
const resume = { module: "vocab", week: 2, day: 3 };

function current() {
	return document.querySelector('[data-fc-face="jp"]')?.textContent;
}

beforeEach(() => {
	localStorage.clear();
	resetStudyStateForTests();
	setNavImpl(() => {});
});

describe("flashcard resume", () => {
	it("reopens MemoryCards on the last card and shows the 上次看到 hint", async () => {
		const user = userEvent.setup();
		const first = render(<MemoryCards deckId="vocab" items={items} resume={resume} headerSummary={["第2週", "3日目"]} />);
		await user.click(screen.getByRole("button", { name: /下一张/ }));
		await user.click(screen.getByRole("button", { name: /下一张/ }));
		expect(current()).toBe("三");
		first.unmount();

		expect(loadResumeScope("vocab")).toEqual({ week: 2, day: 3 });
		render(<MemoryCards deckId="vocab" items={items} resume={resume} headerSummary={["第2週", "3日目"]} />);
		expect(current()).toBe("三");
		expect(screen.getByText("上次看到：第2週 · 3日目 第 3 张")).toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: /下一张/ }));
		expect(document.querySelector("[data-fc-resume]")).toBeNull();
	});

	it("follows the saved card id when the list changed, and clamps when it is gone", () => {
		saveResume("vocab", 2, 3, { idx: 2, cardId: "c2" });
		const pos = loadResumePos("vocab", 2, 3);
		expect(resumeIndex(items.slice(1), pos, (item) => item.id)).toBe(1);
		expect(resumeIndex(items.slice(0, 2), pos, (item) => item.id)).toBe(1);
		expect(applyResumeOrder(items, ["c3", "gone", "c1"], (item) => item.id).map((item) => item.id)).toEqual(["c3", "c1", "c0", "c2"]);
	});

	it("restores the grammar deck order, scope, and position after a reload", () => {
		setModule("grammar");
		G.weeks = [{ n: 1, days: [1, 2].map((day) => ({ day, points: ["あ", "い", "う"].map((p) => ({ pattern: `${p}${day}` })) })) }];
		ensureCardsDeck();
		setCardsWeek(1);
		setCardsDay(2);
		nextCard();
		const order = cardsState().deck.map(fcCardId);
		const at = fcCardId(cardsState().deck[1]);

		resetStudyStateForTests();
		setModule("grammar");
		G.weeks = [{ n: 1, days: [1, 2].map((day) => ({ day, points: ["あ", "い", "う"].map((p) => ({ pattern: `${p}${day}` })) })) }];
		ensureCardsDeck();
		const fc = cardsState();
		expect([fc.week, fc.day, fc.idx]).toEqual([1, 2, 1]);
		expect(fc.deck.map(fcCardId)).toEqual(order);
		expect(fcCardId(fc.deck[fc.idx])).toBe(at);
		expect(fcResumedAt()).toEqual({ week: 1, day: 2, idx: 1 });
	});

	it("reopens the remembered week/day unless a lesson link asked for one", () => {
		const weeks = [{ n: 1, days: [{ day: 1 }, { day: 2 }] }, { n: 2, days: [{ day: 1 }] }];
		saveResume("vocab", 1, 2);
		navTo("#/cards");
		expect(initialCardsScope("vocab", weeks)).toEqual({ week: 1, day: 2 });
		openModuleCards(2, 1);
		expect(initialCardsScope("vocab", weeks)).toEqual({ week: 2, day: 1 });
		navTo("#/cards");
		saveResume("vocab", 9, 1);
		expect(initialCardsScope("vocab", weeks)).toEqual({ week: 0, day: 0 });
	});
});
