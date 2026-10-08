import { describe, expect, it, vi, afterEach } from "vitest";

import { manualNotesNeedingNotify, notifyManualMistakesAdded } from "../../app/study/mistake-notify";
import {
	ASSISTANT_SOURCE,
	parseStoredTranslation,
	serializeTranslation,
	normalizeStudyAid,
} from "../../app/study/mistake-translations";

describe("manualNotesNeedingNotify", () => {
	it("reports new and text-changed word/grammar notes only", () => {
		const prev = JSON.stringify([
			{ id: "1", type: "word", text: "古い", ts: 1, level: "new" },
			{ id: "2", type: "q", text: "問題\n正确答案：a", ts: 1, level: "new" },
			{ id: "3", type: "grammar", text: "ばかり", ts: 1, level: "new", deleted: true },
		]);
		const next = JSON.stringify([
			{ id: "1", type: "word", text: "新しい", ts: 2, level: "new" },
			{ id: "2", type: "q", text: "問題\n正确答案：a", ts: 1, level: "new" },
			{ id: "3", type: "grammar", text: "ばかり", ts: 2, level: "new" },
			{ id: "4", type: "word", text: "勿体ない", ts: 3, level: "new" },
		]);
		expect(manualNotesNeedingNotify(prev, next)).toEqual([
			{ id: "1", text: "新しい", type: "word" },
			{ id: "3", text: "ばかり", type: "grammar" },
			{ id: "4", text: "勿体ない", type: "word" },
		]);
	});

	it("returns empty when nothing manual changed", () => {
		const body = JSON.stringify([{ id: "1", type: "word", text: "能力", ts: 1, level: "new" }]);
		expect(manualNotesNeedingNotify(body, body)).toEqual([]);
	});
});

describe("notifyManualMistakesAdded", () => {
	afterEach(() => vi.unstubAllGlobals());

	it("no-ops when webhook URL is unset", async () => {
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock);
		await notifyManualMistakesAdded({}, "g_1", [{ id: "1", text: "x", type: "word" }]);
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it("POSTs Bearer auth and payload when configured", async () => {
		const fetchMock = vi.fn(async () => new Response("ok", { status: 200 }));
		vi.stubGlobal("fetch", fetchMock);
		await notifyManualMistakesAdded(
			{ MISTAKE_NOTIFY_WEBHOOK_URL: "https://hooks.example/mistake", MISTAKE_NOTIFY_WEBHOOK_KEY: "secret" },
			"g_1",
			[{ id: "1", text: "勿体ない", type: "word" }],
		);
		expect(fetchMock).toHaveBeenCalledOnce();
		const [url, init] = fetchMock.mock.calls[0];
		expect(url).toBe("https://hooks.example/mistake");
		expect(init.method).toBe("POST");
		expect(init.headers.authorization).toBe("Bearer secret");
		expect(JSON.parse(init.body)).toEqual({
			event: "mistake.manual_added",
			userId: "g_1",
			notes: [{ id: "1", text: "勿体ない", type: "word" }],
		});
	});
});

describe("assistant translation storage", () => {
	it("round-trips source=assistant and keeps legacy plain strings", () => {
		expect(parseStoredTranslation("可惜")).toEqual({ cn: "可惜" });
		const locked = serializeTranslation("浪费可惜；不舍得", ASSISTANT_SOURCE);
		expect(parseStoredTranslation(locked)).toEqual({ cn: "浪费可惜；不舍得", source: ASSISTANT_SOURCE });
		expect(normalizeStudyAid({ cn: "用法", source: ASSISTANT_SOURCE })?.source).toBe(ASSISTANT_SOURCE);
	});
});
