import { describe, expect, it, vi } from "vitest";

import {
	buildReviewRuby,
	formatReviewDate,
	formatReviewDayNum,
	formatReviewMonth,
	formatReviewMonthDay,
	formatReviewWeekday,
	isLessonReviewPayload,
	jstToday,
	LESSON_REVIEW_KV_KEY,
	parseReviewRoute,
	reviewDayCounts,
	toKatakana,
} from "../../app/study/lesson-review";
import { buildLessonReviewPayload, parseLessonReview } from "../../app/study/lesson-review-parse";
import { fetchGoogleDocText, syncLessonReview } from "../../app/study/lesson-review-sync";
import { memoryKv } from "./auth-test-utils";

const SAMPLE = `
# 先生から

# 2026.09.14

# 2026.09.11

朝型　morning person

夜型　night person

先進国（せんしんこく）　developed country

練習すれば練習するほど、日本語が上手になる

https://example.com/skip-me

![][image1]

# 2026.08.05

### 問題

うどんよりおそばがいいわ

# 職場で文

お世話になっております

### 打电话

お電話しました

# 銀行で

| 日文按钮 | 读音 | 中文 |
| :---- | :---- | :---- |
| お預入れ | おあずけいれ | 存款 |
`;

describe("lesson review parser", () => {
	it("groups words and sentences by date and keeps note sections", () => {
		const days = parseLessonReview(SAMPLE);
		expect(days.map((day) => day.id)).toEqual(["2026-09-11", "2026-08-05", "note-workplace", "note-bank"]);
		expect(days.find((day) => day.id === "2026-09-14")).toBeUndefined();

		const sept11 = days.find((day) => day.id === "2026-09-11")!;
		expect(sept11.items).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ jp: "朝型", en: "morning person", kind: "word" }),
				expect.objectContaining({ jp: "夜型", en: "night person", kind: "word" }),
				expect.objectContaining({ jp: "先進国（せんしんこく）", reading: "せんしんこく", en: "developed country", kind: "word" }),
				expect.objectContaining({ jp: "練習すれば練習するほど、日本語が上手になる", kind: "sentence" }),
			]),
		);
		expect(sept11.items.some((item) => /https?:/.test(item.jp))).toBe(false);

		const exam = days.find((day) => day.id === "2026-08-05")!;
		expect(exam.items.some((item) => item.jp.includes("おそば"))).toBe(true);

		const work = days.find((day) => day.id === "note-workplace")!;
		expect(work.items.map((item) => item.jp)).toEqual(expect.arrayContaining(["お世話になっております", "お電話しました"]));

		const bank = days.find((day) => day.id === "note-bank")!;
		expect(bank.items[0]).toMatchObject({ jp: "お預入れ", reading: "おあずけいれ", cn: "存款", kind: "word" });
	});

	it("parses the plain-text Google export without markdown hashes", () => {
		const days = parseLessonReview(`先生から
2026.09.11
朝型 morning person
職場で文
お世話になっております
`);
		expect(days.map((day) => day.id)).toEqual(["2026-09-11", "note-workplace"]);
		expect(days[0].items[0]).toMatchObject({ jp: "朝型", en: "morning person" });
		expect(days[1].items[0].jp).toBe("お世話になっております");
	});

	it("attaches English-only follow-up lines as glosses", () => {
		const [day] = parseLessonReview(`# 2026.01.02\n荷物をお持ちしましょうか。\nCould you carry it?\n`);
		expect(day.items).toEqual([
			expect.objectContaining({
				jp: "荷物をお持ちしましょうか。",
				en: "Could you carry it?",
				kind: "sentence",
			}),
		]);
	});
});

describe("lesson review helpers", () => {
	it("parses review routes and formats JST dates", () => {
		expect(parseReviewRoute("#/review")).toEqual({ id: null });
		expect(parseReviewRoute("#/review/2026-09-11")).toEqual({ id: "2026-09-11" });
		expect(parseReviewRoute("#/review/note-workplace")).toEqual({ id: "note-workplace" });
		expect(parseReviewRoute("#/cards")).toBeNull();
		expect(formatReviewDate("2026-09-11", "cn")).toBe("2026年9月11日");
		expect(formatReviewDate("2026-09-11", "en")).toBe("Sep 11, 2026");
		expect(formatReviewMonthDay("2026-09-11", "cn")).toBe("9月11日");
		expect(formatReviewMonth("2026-09-11", "cn")).toBe("9月");
		expect(formatReviewDayNum("2026-09-11")).toBe("11");
		expect(formatReviewWeekday("2026-09-11", "cn")).toBe("星期五");
		expect(toKatakana("せんしんこく")).toBe("センシンコク");
		expect(buildReviewRuby("先進国（せんしんこく）")).toBe("<ruby>先進国<rt>センシンコク</rt></ruby>");
		expect(buildReviewRuby("字幕", "じまく")).toBe("<ruby>字幕<rt>ジマク</rt></ruby>");
		expect(jstToday(Date.parse("2026-09-10T16:00:00Z"))).toBe("2026-09-11");
		expect(reviewDayCounts({ id: "x", title: "x", items: [{ jp: "a", kind: "word" }, { jp: "b", kind: "sentence" }] })).toEqual({
			words: 1,
			sentences: 1,
		});
	});

	it("accepts a valid payload and rejects junk", () => {
		const payload = buildLessonReviewPayload(SAMPLE, { fetchedAt: "2026-09-12T00:00:00.000Z" });
		expect(isLessonReviewPayload(payload)).toBe(true);
		const advanced = payload.days.find((day) => day.id === "2026-09-11")!.items.find((item) => item.jp.startsWith("先進国"));
		expect(advanced?.cn).toBe("发达国家");
		expect(advanced?.jp_r).toContain("<ruby>先進国");
		expect(isLessonReviewPayload({ fetchedAt: "x", days: [{ id: "1", title: "1", items: [{ jp: "", kind: "word" }] }] })).toBe(false);
		expect(isLessonReviewPayload(null)).toBe(false);
	});
});

describe("weekly google doc sync", () => {
	it("parses an export and stores it in KV", async () => {
		const kv = memoryKv();
		const fetcher = vi.fn(async () => new Response(SAMPLE, { status: 200 }));
		const result = await syncLessonReview({ FAVORITES_KV: kv as unknown as KVNamespace }, fetcher as unknown as typeof fetch);
		expect(result.ok).toBe(true);
		expect(result.days).toBe(4);
		const stored = JSON.parse(kv.map.get(LESSON_REVIEW_KV_KEY) || "{}");
		expect(stored.days[0].id).toBe("2026-09-11");
	});

	it("keeps the previous snapshot when export is blocked", async () => {
		const kv = memoryKv({ [LESSON_REVIEW_KV_KEY]: JSON.stringify({ kept: true }) });
		const fetcher = vi.fn(async () => new Response("<html>sign in</html>", { status: 200 }));
		const result = await syncLessonReview({ FAVORITES_KV: kv as unknown as KVNamespace }, fetcher as unknown as typeof fetch);
		expect(result.ok).toBe(false);
		expect(kv.map.get(LESSON_REVIEW_KV_KEY)).toContain("kept");
		await expect(fetchGoogleDocText("doc-id", fetcher as unknown as typeof fetch)).rejects.toThrow(/login/i);
	});
});
