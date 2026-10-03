import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { DuePage } from "../../app/study/DuePage";
import {
	DAILY_REVIEW_CAP,
	markReviewed,
	recordGrammarPage,
	resetDailyReviewForTests,
	reviewCount,
	selectDailyReview,
	type GrammarVisitPoint,
} from "../../app/study/daily-review";
import { DUE_STORAGE_KEY, addIsoDays, grammarDueId, hydrateDue, noteDueSignedOut, rememberFail, resetDueForTests } from "../../app/study/due-review";
import { jstToday } from "../../app/study/lesson-review";
import { MISTAKES, resetStudyStateForTests } from "../../app/study/store";

function point(pattern: string, cn = "意思"): GrammarVisitPoint {
	return { pattern, cn, en: "meaning", reading: pattern };
}

beforeEach(() => {
	localStorage.clear();
	resetStudyStateForTests();
	resetDueForTests();
	resetDailyReviewForTests();
});

describe("daily review selection", () => {
	it("ranks a mistake above a page that was only opened, and keeps the same order", () => {
		const today = jstToday();
		const yesterday = addIsoDays(today, -1);
		recordGrammarPage({
			module: "grammar",
			week: 1,
			day: 1,
			focused: null,
			today: yesterday,
			now: 1,
			points: [point("ばかり")],
		});
		MISTAKES.push({
			id: "m1",
			type: "q",
			text: "残高が足りない\n正确答案：引き出す",
			ts: Date.parse(`${yesterday}T12:00:00+09:00`),
			level: "new",
		});

		const first = selectDailyReview(today);
		const second = selectDailyReview(today);
		expect(first.cards.map((card) => card.jp)).toEqual(["残高が足りない", "ばかり"]);
		expect(first.cards.map((card) => card.weight)).toEqual([5, 1]);
		expect(second.cards.map((card) => card.id)).toEqual(first.cards.map((card) => card.id));
		expect(first.sourceDate).toBe(yesterday);
		expect(reviewCount(today)).toBe(2);
	});

	it("weighs a focused point and repeated opens above a single glance", () => {
		const today = jstToday();
		const yesterday = addIsoDays(today, -1);
		recordGrammarPage({
			module: "grammar",
			week: 3,
			day: 2,
			focused: 1,
			today: yesterday,
			now: 1,
			points: [point("甲"), point("乙")],
		});
		recordGrammarPage({
			module: "grammar",
			week: 3,
			day: 2,
			focused: 1,
			today: yesterday,
			now: 2,
			points: [point("甲"), point("乙")],
		});

		const cards = selectDailyReview(today).cards;
		expect(cards.map((card) => [card.jp, card.weight, card.times])).toEqual([
			["乙", 6, 2],
			["甲", 2, 2],
		]);
	});

	it("extracts a capped portion and lets yesterday's study crowd out an old due card", () => {
		const today = jstToday();
		const yesterday = addIsoDays(today, -1);
		const points = Array.from({ length: 15 }, (_, index) => point(`句型${index}`));
		recordGrammarPage({ module: "grammar", week: 2, day: 1, focused: null, today: yesterday, now: 1, points });
		MISTAKES.push({
			id: "m-cap",
			type: "q",
			text: "错题一\n正确答案：A",
			ts: Date.parse(`${yesterday}T08:00:00+09:00`),
			level: "new",
		});
		rememberFail({ id: "listening:old", kind: "listening", jp: "没听清", cn: "", en: "" }, yesterday);

		const review = selectDailyReview(today);
		expect(review.candidateCount).toBe(17);
		expect(review.cards).toHaveLength(DAILY_REVIEW_CAP);
		expect(review.cards[0]).toMatchObject({ reason: "mistake", jp: "错题一" });
		expect(review.cards.filter((card) => card.reason === "grammar")).toHaveLength(DAILY_REVIEW_CAP - 1);
		expect(review.cards.some((card) => card.id === "listening:old")).toBe(false);
	});

	it("fills empty study days with cards that are already due", () => {
		const today = jstToday();
		rememberFail({ id: "due-1", kind: "grammar", jp: "到期", cn: "还没记住", en: "" }, addIsoDays(today, -1));
		const review = selectDailyReview(today);
		expect(review.sourceDate).toBeNull();
		expect(review.cards.map((card) => card.jp)).toEqual(["到期"]);
		expect(review.cards[0].reason).toBe("due");
	});

	it("uses a due topic card only when study did not fill the day", () => {
		const today = jstToday();
		rememberFail(
			{ id: "topic:bank-atm:atm-001", kind: "topic", jp: "お引出し", cn: "取款", en: "withdrawal", reading: "おひきだし" },
			addIsoDays(today, -1),
		);
		const review = selectDailyReview(today);
		expect(review.cards[0]).toMatchObject({ kind: "topic", jp: "お引出し", reason: "due", reading: "おひきだし" });
	});

	it("uses the latest earlier study day when yesterday is empty", () => {
		const today = jstToday();
		const older = addIsoDays(today, -4);
		recordGrammarPage({
			module: "n2grammar",
			week: 1,
			day: 2,
			focused: 0,
			today: older,
			now: 1,
			points: [point("によって")],
		});
		const review = selectDailyReview(today);
		expect(review.sourceDate).toBe(older);
		expect(review.cards[0]).toMatchObject({ jp: "によって", weight: 3 });
	});

	it("lowers a grammar point that was already passed and is not due yet", () => {
		const today = jstToday();
		const yesterday = addIsoDays(today, -1);
		const knownId = grammarDueId("grammar", 1, 1, "既知");
		localStorage.setItem(
			DUE_STORAGE_KEY,
			JSON.stringify([
				{
					id: knownId,
					kind: "grammar",
					jp: "既知",
					cn: "已经会",
					en: "known",
					due: addIsoDays(today, 10),
					step: 2,
					ts: Date.parse("2020-01-01T00:00:00Z"),
				},
			]),
		);
		hydrateDue();
		recordGrammarPage({
			module: "grammar",
			week: 1,
			day: 1,
			focused: null,
			today: yesterday,
			now: 1,
			points: [point("既知", "已经会"), point("新出", "新的")],
		});
		expect(selectDailyReview(today).cards.map((card) => [card.jp, card.weight])).toEqual([
			["新出", 1],
			["既知", 0.35],
		]);
	});

	it("hides a card after it is graded today", () => {
		const today = jstToday();
		const yesterday = addIsoDays(today, -1);
		recordGrammarPage({
			module: "grammar",
			week: 1,
			day: 3,
			focused: null,
			today: yesterday,
			now: 1,
			points: [point("ばかり")],
		});
		const id = grammarDueId("grammar", 1, 3, "ばかり");
		expect(selectDailyReview(today).cards.map((card) => card.id)).toEqual([id]);
		markReviewed(id, today);
		expect(selectDailyReview(today).cards).toEqual([]);

		rememberFail({ id: "fresh-miss", kind: "grammar", jp: "刚标的", cn: "", en: "" }, today);
		expect(selectDailyReview(today).cards.some((card) => card.id === "fresh-miss")).toBe(false);
		expect(selectDailyReview(addIsoDays(today, 1)).cards.map((card) => card.id)).toContain("fresh-miss");
	});
});

describe("DuePage sampling", () => {
	it("shows a grammar point opened yesterday", async () => {
		noteDueSignedOut();
		const yesterday = addIsoDays(jstToday(), -1);
		recordGrammarPage({
			module: "grammar",
			week: 1,
			day: 1,
			focused: 0,
			today: yesterday,
			now: 1,
			points: [point("ばかり", "刚做完")],
		});
		render(<DuePage />);
		expect(await screen.findByText("ばかり")).toBeInTheDocument();
		expect(screen.getByText("看过的语法")).toBeInTheDocument();
		expect(screen.getByText(/昨天看过的语法和做错的题/)).toBeInTheDocument();
	});
});
