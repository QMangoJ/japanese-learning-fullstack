import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ReviewPage } from "../../app/study/ReviewPage";
import { resetStudyStateForTests, setNavImpl } from "../../app/study/store";
import type { LessonReviewPayload } from "../../app/study/lesson-review";

const payload: LessonReviewPayload = {
	source: "test",
	fetchedAt: "2026-09-12T00:00:00.000Z",
	days: [
		{
			id: "2026-09-11",
			date: "2026-09-11",
			title: "2026-09-11",
			items: [
				{ jp: "朝型", en: "morning person", kind: "word" },
				{ jp: "練習すれば練習するほど、日本語が上手になる", cn: "越练越好", kind: "sentence" },
			],
		},
		{
			id: "note-workplace",
			title: "職場で文",
			items: [{ jp: "お世話になっております", kind: "sentence" }],
		},
	],
};

beforeEach(() => {
	resetStudyStateForTests();
	vi.stubGlobal(
		"fetch",
		vi.fn(async () => new Response(JSON.stringify(payload), { status: 200, headers: { "content-type": "application/json" } })),
	);
});

afterEach(() => {
	vi.unstubAllGlobals();
});

describe("ReviewPage", () => {
	it("lists dates and opens a flashcard deck", async () => {
		const user = userEvent.setup();
		const seen: string[] = [];
		setNavImpl((key) => seen.push(key));
		render(<ReviewPage dateId={null} />);
		expect(await screen.findByText("2026年9月11日")).toBeInTheDocument();
		expect(screen.getByText("職場で文")).toBeInTheDocument();
		await user.click(screen.getByText("2026年9月11日"));
		expect(seen).toContain("#/review/2026-09-11");
	});

	it("flips, advances, and filters cards like the module flashcards", async () => {
		const user = userEvent.setup();
		setNavImpl(() => {});
		render(<ReviewPage dateId="2026-09-11" />);
		expect(await screen.findByText("朝型")).toBeInTheDocument();
		expect(screen.getByText("回想中/英文，点击翻面")).toBeInTheDocument();
		await user.click(screen.getByText("回想中/英文，点击翻面"));
		expect(screen.getByText("morning person")).toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: /下一张|Next/ }));
		expect(screen.getByText("練習すれば練習するほど、日本語が上手になる")).toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: /^句子$|^Sentences$/ }));
		expect(screen.getByText("練習すれば練習するほど、日本語が上手になる")).toBeInTheDocument();
		expect(screen.queryByText("朝型")).not.toBeInTheDocument();
	});
});
