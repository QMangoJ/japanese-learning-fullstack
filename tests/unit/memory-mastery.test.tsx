import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { MemoryCards, type MemoryCardItem } from "../../app/study/memory-cards";
import {
	FLASHCARD_MASTERY_KEY,
	loadMastery,
	mergeMastery,
	pushMasteryNow,
	setMastered,
} from "../../app/study/memory-mastery";
import { bootAccount, resetStudyStateForTests } from "../../app/study/store";

const sample: MemoryCardItem[] = [
	{ id: "a", jp: "禁止", reading: "きんし", cn: "禁止", en: "prohibition", kind: "word" },
	{ id: "b", jp: "有効期限", reading: "ゆうこうきげん", cn: "有效期限", en: "expiry", kind: "word" },
];

function stubAccount(userId: string | null, masteryGet: unknown, puts: string[] = []) {
	vi.stubGlobal(
		"fetch",
		vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
			const url = String(input);
			if (url.includes("/api/me")) {
				return Response.json({
					user: userId ? { id: userId, email: "a@b.c", name: "Ada", picture: "" } : null,
					configured: true,
				});
			}
			if (url.includes("/api/mastery") && init?.method === "PUT") {
				puts.push(String(init.body));
				return Response.json({ ok: true });
			}
			if (url.includes("/api/mastery")) return Response.json(masteryGet);
			if (url.includes("/api/favorites")) return Response.json({});
			if (url.includes("/api/mistakes")) return Response.json([]);
			if (url.includes("/api/due-review")) return Response.json([]);
			return new Response("no", { status: 404 });
		}),
	);
}

beforeEach(() => {
	localStorage.clear();
	resetStudyStateForTests();
});

afterEach(() => {
	vi.unstubAllGlobals();
});

describe("flashcard mastery sync", () => {
	it("keeps a newer unmark and drops another account's local marks", () => {
		expect(
			mergeMastery([{ id: "a", known: true, ts: 1 }], [{ id: "a", known: false, ts: 2 }], true),
		).toEqual([{ id: "a", known: false, ts: 2 }]);
		expect(
			mergeMastery([{ id: "a", known: false, ts: 3 }], [{ id: "a", known: true, ts: 2 }], true),
		).toEqual([{ id: "a", known: false, ts: 3 }]);
		expect(
			mergeMastery([{ id: "a", known: false, ts: 2 }], [{ id: "a", known: true, ts: 2 }], true),
		).toEqual([{ id: "a", known: false, ts: 2 }]);
		expect(mergeMastery([{ id: "local", known: true, ts: 9 }], [{ id: "cloud", known: true, ts: 1 }], false)).toEqual([
			{ id: "cloud", known: true, ts: 1 },
		]);
	});

	it("leaves guest marks on this browser", async () => {
		const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
			const url = String(input);
			if (url.includes("/api/me")) return Response.json({ user: null, configured: true });
			return new Response("no", { status: 500 });
		});
		vi.stubGlobal("fetch", fetchMock);
		await bootAccount();
		setMastered(FLASHCARD_MASTERY_KEY, {}, "n2vocab", "単語", true);
		expect(loadMastery(FLASHCARD_MASTERY_KEY)["n2vocab::単語"]).toBe(true);
		expect(fetchMock.mock.calls.some((call) => String(call[0]).includes("/api/mastery"))).toBe(false);
	});

	it("uploads a remembered card and the later unmark", async () => {
		const puts: string[] = [];
		stubAccount("g_1", [], puts);
		await bootAccount();
		const user = userEvent.setup();
		render(<MemoryCards deckId="test" items={sample} />);
		await user.click(screen.getByRole("button", { name: /^记住了$/ }));
		expect(screen.getByText("禁止")).toBeInTheDocument();
		await pushMasteryNow();
		expect(JSON.parse(puts.at(-1) || "[]")).toEqual([expect.objectContaining({ id: "test::a", known: true })]);

		await user.click(screen.getByRole("button", { name: /^完全没印象$/ }));
		await pushMasteryNow();
		expect(JSON.parse(puts.at(-1) || "[]")).toEqual([
			expect.objectContaining({ id: "test::a", known: false, level: "blank" }),
		]);
		await user.click(screen.getByRole("button", { name: /^记住了 / }));
		expect(screen.queryByText("禁止")).not.toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: /^完全没印象 / }));
		expect(screen.getByText("禁止")).toBeInTheDocument();
	});

	it("keeps a card the account already marked known", async () => {
		stubAccount("g_1", [{ id: "test::a", known: true, ts: 10 }]);
		render(<MemoryCards deckId="test" items={sample} />);
		expect(screen.getByText("禁止")).toBeInTheDocument();
		await act(async () => {
			await bootAccount();
		});
		expect(screen.getByText("禁止")).toBeInTheDocument();
		expect(document.querySelector(".review-skill button.on")?.textContent).toBe("记住了");
		expect(screen.getByRole("button", { name: /^记住了 / })).toHaveTextContent("2");
	});

	it("uploads legacy local marks on first login and keeps them when the response is not a list", async () => {
		localStorage.setItem(FLASHCARD_MASTERY_KEY, JSON.stringify({ "test::a": true }));
		const puts: string[] = [];
		stubAccount("g_1", [], puts);
		await bootAccount();
		expect(JSON.parse(puts.at(-1) || "[]")).toEqual([expect.objectContaining({ id: "test::a", known: true, ts: 0 })]);

		localStorage.clear();
		resetStudyStateForTests();
		localStorage.setItem(FLASHCARD_MASTERY_KEY, JSON.stringify({ "test::a": { known: true, ts: 4 } }));
		const retryPuts: string[] = [];
		stubAccount("g_1", {}, retryPuts);
		await bootAccount();
		expect(loadMastery(FLASHCARD_MASTERY_KEY)["test::a"]).toBe(true);
		expect(JSON.parse(retryPuts.at(-1) || "[]")).toEqual([expect.objectContaining({ id: "test::a", known: true, ts: 4 })]);
	});

	it("lets a newer remote unmark clear a card remembered on this browser", async () => {
		localStorage.setItem(FLASHCARD_MASTERY_KEY, JSON.stringify({ "test::a": { known: true, ts: 1 } }));
		stubAccount("g_1", [{ id: "test::a", known: false, ts: 5 }]);
		await bootAccount();
		render(<MemoryCards deckId="test" items={sample} />);
		expect(screen.getByText("禁止")).toBeInTheDocument();
		expect(loadMastery(FLASHCARD_MASTERY_KEY)["test::a"]).toBe("blank");
	});

	it("does not upload the previous account's marks", async () => {
		localStorage.setItem("accountId", "g_old");
		localStorage.setItem(FLASHCARD_MASTERY_KEY, JSON.stringify({ "test::old": { known: true, ts: 9 } }));
		const puts: string[] = [];
		stubAccount("g_new", [{ id: "test::cloud", known: true, ts: 1 }], puts);
		await bootAccount();
		expect(loadMastery(FLASHCARD_MASTERY_KEY)["test::cloud"]).toBe(true);
		expect(loadMastery(FLASHCARD_MASTERY_KEY)["test::old"]).toBeUndefined();
		expect(puts.some((body) => body.includes("test::old"))).toBe(false);
	});

	it("keeps lesson-review marks local", async () => {
		const puts: string[] = [];
		stubAccount("g_1", [], puts);
		const saved = setMastered("lesson-review-mastery", {}, "2026-10-06", "文", true);
		expect(saved).toEqual({ "2026-10-06::文": true });
		expect(JSON.parse(localStorage.getItem("lesson-review-mastery") || "{}")).toEqual({ "2026-10-06::文": true });
		await bootAccount();
		expect(puts.some((body) => body.includes("文"))).toBe(false);
	});

	it("reads a legacy remembered flag as mastered", () => {
		localStorage.setItem(FLASHCARD_MASTERY_KEY, JSON.stringify({ "test::a": true }));
		render(<MemoryCards deckId="test" items={sample} />);
		expect(screen.getByText("禁止")).toBeInTheDocument();
		expect(document.querySelector(".review-skill button.on")?.textContent).toBe("记住了");
		expect(screen.getByRole("button", { name: /^记住了 / })).toHaveTextContent("2");
	});

	it("drops the oldest tombstones once the account cap is reached", () => {
		const raw: Record<string, { known: boolean; ts: number }> = {};
		for (let i = 0; i < 6001; i += 1) raw[`id-${i}`] = { known: false, ts: i };
		localStorage.setItem(FLASHCARD_MASTERY_KEY, JSON.stringify(raw));
		setMastered(FLASHCARD_MASTERY_KEY, {}, "deck", "extra", true);
		const stored = JSON.parse(localStorage.getItem(FLASHCARD_MASTERY_KEY) || "{}") as Record<string, { known: boolean }>;
		expect(Object.keys(stored).length).toBe(6000);
		expect(stored["deck::extra"].known).toBe(true);
		expect(stored["id-0"]).toBeUndefined();
		expect(stored["id-1"]).toBeUndefined();
	});
});
