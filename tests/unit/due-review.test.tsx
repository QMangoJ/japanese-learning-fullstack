import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { isDueReviewPayload } from "../../app/auth/study-payloads";
import {
	addIsoDays,
	dueEntries,
	dueEntry,
	dueToday,
	grammarDueId,
	mergeDueEntries,
	mistakeDueId,
	noteDueSignedOut,
	rememberFail,
	rememberPass,
	scheduleAfterPass,
	type DueEntry,
} from "../../app/study/due-review";
import { DuePage } from "../../app/study/DuePage";
import { jstToday } from "../../app/study/lesson-review";
import { addMistake, bootAccount, deleteMistake, mistakesPayload, resetStudyStateForTests, setAccountStateForTests } from "../../app/study/store";

function card(id: string, ts: number, extra: Partial<DueEntry> = {}): DueEntry {
	return {
		id,
		kind: "grammar",
		jp: id,
		cn: "",
		en: "",
		due: "2026-09-30",
		step: 0,
		ts,
		...extra,
	};
}

beforeEach(() => {
	localStorage.clear();
	resetStudyStateForTests();
});

describe("due review schedule", () => {
	it("brings a miss back tomorrow and lengthens a correct answer", () => {
		rememberFail({ id: "g1", kind: "grammar", jp: "ばかり", cn: "刚做完", en: "just" }, "2026-09-30");
		expect(dueEntry("g1")).toMatchObject({ due: "2026-10-01", step: 0 });
		expect(dueToday("2026-09-30")).toEqual([]);
		expect(dueToday("2026-10-01").map((item) => item.id)).toEqual(["g1"]);

		rememberPass("g1", "2026-10-01");
		expect(dueEntry("g1")).toMatchObject({ due: "2026-10-02", step: 1 });
		rememberPass("g1", "2026-10-02");
		expect(dueEntry("g1")).toMatchObject({ due: "2026-10-05", step: 2 });
		rememberPass("g1", "2026-10-05");
		expect(dueEntry("g1")).toMatchObject({ due: "2026-10-12", step: 3 });
		rememberPass("g1", "2026-10-12");
		expect(dueEntry("g1")).toMatchObject({ due: "2026-10-26", step: 4 });
		rememberPass("g1", "2026-10-26");
		expect(dueEntry("g1")).toMatchObject({ due: "2026-11-25", step: 4 });
		expect(scheduleAfterPass("2026-10-26", 4)).toEqual({ due: "2026-11-25", step: 4 });

		rememberFail({ id: "g1", kind: "grammar", jp: "ばかり", cn: "刚做完", en: "just" }, "2026-11-25");
		expect(dueEntry("g1")).toMatchObject({ due: "2026-11-26", step: 0 });
	});

	it("leaves a card out of the queue until it is missed", () => {
		expect(rememberPass("missing")).toBe(false);
		expect(dueEntries()).toEqual([]);
	});

	it("merges same-device cards by later timestamp and replaces another account", () => {
		const local = [card("local", 2), card("shared", 5, { jp: "新" })];
		const server = [card("shared", 4, { jp: "旧" }), card("cloud", 3)];
		expect(mergeDueEntries(local, server, true).map((item) => [item.id, item.jp])).toEqual([
			["shared", "新"],
			["cloud", "cloud"],
			["local", "local"],
		]);
		expect(mergeDueEntries(local, server, false).map((item) => item.id)).toEqual(["shared", "cloud"]);
	});

	it("queues a saved mistake and drops it when the mistake is deleted", () => {
		addMistake("q", "問題1\n正确答案：B");
		const id = mistakesPayload().list[0].id;
		expect(dueEntries()[0]).toMatchObject({ id: mistakeDueId(id), kind: "mistake", jp: "問題1", cn: "正确答案：B" });
		deleteMistake(id);
		expect(dueEntries()).toEqual([]);
	});

	it("does not queue a mistake the guest was not allowed to save", () => {
		setAccountStateForTests(null, true);
		addMistake("q", "不能写");
		expect(dueEntries()).toEqual([]);
	});

	it("rejects a review payload with a bad step", () => {
		expect(isDueReviewPayload([{ id: "g1", kind: "grammar", jp: "a", cn: "", en: "", due: "2026-09-30", step: 0, ts: 1 }])).toBe(true);
		expect(isDueReviewPayload([{ id: "g1", kind: "grammar", jp: "a", cn: "", en: "", due: "2026-09-30", step: 5, ts: 1 }])).toBe(false);
		expect(isDueReviewPayload([{ id: "g1", kind: "other", jp: "a", cn: "", en: "", due: "2026-09-30", step: 0, ts: 1 }])).toBe(false);
	});
});

describe("due review sync", () => {
	it("uploads cards made on this device when the account is empty", async () => {
		rememberFail({ id: grammarDueId("grammar", 1, 1, "ばかり"), kind: "grammar", jp: "ばかり", cn: "刚", en: "" }, "2026-09-29");
		const puts: string[] = [];
		vi.stubGlobal(
			"fetch",
			vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
				const url = String(input);
				if (url.includes("/api/me")) {
					return Response.json({ user: { id: "g_1", email: "a@b.c", name: "Ada", picture: "" }, configured: true });
				}
				if (url.includes("/api/due-review") && init?.method === "PUT") {
					puts.push(String(init.body));
					return Response.json({ ok: true });
				}
				if (url.includes("/api/due-review")) return Response.json([]);
				if (url.includes("/api/favorites")) return Response.json({});
				if (url.includes("/api/mistakes")) return Response.json([]);
				return new Response("no", { status: 404 });
			}),
		);
		await bootAccount();
		expect(puts.some((body) => body.includes("ばかり"))).toBe(true);
	});

	it("keeps another account's local cards off the signed-in queue", async () => {
		localStorage.setItem("accountId", "g_old");
		rememberFail({ id: "grammar:old", kind: "grammar", jp: "旧账号", cn: "", en: "" }, "2026-09-29");
		const puts: string[] = [];
		vi.stubGlobal(
			"fetch",
			vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
				const url = String(input);
				if (url.includes("/api/me")) {
					return Response.json({ user: { id: "g_new", email: "n@b.c", name: "New", picture: "" }, configured: true });
				}
				if (url.includes("/api/due-review") && init?.method === "PUT") {
					puts.push(String(init.body));
					return Response.json({ ok: true });
				}
				if (url.includes("/api/due-review")) {
					return Response.json([card("grammar:cloud", 1, { jp: "云端", due: "2026-09-30" })]);
				}
				if (url.includes("/api/favorites")) return Response.json({});
				if (url.includes("/api/mistakes")) return Response.json([]);
				return new Response("no", { status: 404 });
			}),
		);
		await bootAccount();
		expect(dueEntries().map((item) => item.id)).toEqual(["grammar:cloud"]);
		expect(puts.some((body) => body.includes("旧账号"))).toBe(false);
	});
});

describe("DuePage", () => {
	it("explains an empty day", async () => {
		noteDueSignedOut();
		render(<DuePage />);
		expect(await screen.findByText("今天没有要复习的内容")).toBeInTheDocument();
	});

	it("grades the snapshotted card and reschedules it", async () => {
		const user = userEvent.setup();
		noteDueSignedOut();
		rememberFail(
			{ id: "a", kind: "grammar", jp: "ばかり", cn: "刚做完", en: "just", reading: "ばかり" },
			addIsoDays(jstToday(), -1),
		);
		render(<DuePage />);
		expect(await screen.findByText("语法")).toBeInTheDocument();
		expect(screen.getByText("ばかり")).toBeInTheDocument();
		await user.click(screen.getByText("先回忆意思，点击翻面"));
		expect(screen.getByText("刚做完")).toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: "已经记住" }));
		expect(dueEntry("a")).toMatchObject({ step: 1, due: addIsoDays(jstToday(), 1) });
		expect(screen.getByText("今天抽出的复习做完了")).toBeInTheDocument();
	});
});
