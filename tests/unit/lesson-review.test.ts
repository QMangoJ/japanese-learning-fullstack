import { describe, expect, it, vi } from "vitest";

import {
	applyKanjiReadings,
	buildReviewRuby,
	formatReviewDate,
	reviewKanaLine,
	reviewSurfaceText,
	formatReviewDayNum,
	formatReviewMonth,
	formatReviewMonthDay,
	formatReviewWeekday,
	isLessonReviewPayload,
	jstToday,
	LESSON_REVIEW_DOCS,
	LESSON_REVIEW_KV_KEY,
	parseReviewRoute,
	reviewDateFromId,
	reviewDayCounts,
	toHiragana,
	toKatakana,
} from "../../app/study/lesson-review";
import {
	buildLessonReviewPayload,
	buildLessonReviewPayloadFromDocs,
	enrichReviewDays,
	parseLessonReview,
} from "../../app/study/lesson-review-parse";
import { fetchGoogleDocText, syncLessonReview } from "../../app/study/lesson-review-sync";
import { memoryKv } from "./auth-test-utils";

const SAMPLE = `
# 先生から

# 2026.09.14

# 2026.09.13 模擬試験N3
原料 材料 賃料
渋滞

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
		expect(days.map((day) => day.id)).toEqual(["2026-09-13", "2026-09-11", "2026-08-05", "note-workplace", "note-bank"]);
		expect(days.find((day) => day.id === "2026-09-14")).toBeUndefined();
		const examN3 = days.find((day) => day.id === "2026-09-13")!;
		expect(examN3.label).toBe("模擬試験N3");
		expect(examN3.items.map((item) => item.jp)).toEqual(["原料", "材料", "賃料", "渋滞"]);

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

	it("keeps consecutive class-note lines as separate cards", () => {
		const [day] = parseLessonReview(`# 2026.09.20 模擬試験N3
見舞い
きっとよろこぶよ
精算機
制限
番号を入力する
レシートのバーコード
気に入ってる
それなら
様子
ますます
会場
`);
		expect(day.items.map((item) => item.jp)).toEqual([
			"見舞い",
			"きっとよろこぶよ",
			"精算機",
			"制限",
			"番号を入力する",
			"レシートのバーコード",
			"気に入ってる",
			"それなら",
			"様子",
			"ますます",
			"会場",
		]);
		expect(day.items.every((item) => !item.reading || item.jp.includes("（"))).toBe(true);
		expect(day.items.find((item) => item.jp === "見舞い")?.cn).toBeUndefined();
		expect(day.items.find((item) => item.jp === "精算機")?.cn).toBeUndefined();
	});

	it("parses short month-day headings and Preply reading/translation follow-ups", () => {
		const days = parseLessonReview(
			`# 2026.08.14
かしこまりました
# 8.12
四日ぶり
よっかぶり
时隔四天
先々週に　｜在上上周
# 8.5
話題
`,
			{ sourceName: "Preply すみれ先生", sourceSlug: "preply" },
		);
		expect(days.map((day) => day.id)).toEqual(["2026-08-14:preply", "2026-08-12:preply", "2026-08-05:preply"]);
		expect(days.every((day) => day.source === "Preply すみれ先生")).toBe(true);
		const aug12 = days.find((day) => day.date === "2026-08-12")!;
		expect(aug12.items).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ jp: "四日ぶり", reading: "よっかぶり", cn: "时隔四天" }),
				expect.objectContaining({ jp: "先々週に", cn: "在上上周" }),
			]),
		);
		const drama = parseLessonReview(`# 2026.09.08
ドラマ
どらま
电视剧／连续剧
似てる
にてる
像；相似（口语，原形「似ている」）
`).find((day) => day.date === "2026-09-08")!;
		expect(drama.items).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ jp: "ドラマ", reading: "どらま", cn: "电视剧／连续剧" }),
				expect.objectContaining({ jp: "似てる", reading: "にてる", cn: "像；相似（口语，原形「似ている」）" }),
			]),
		);
	});

	it("keeps the same calendar date from two documents as separate decks", () => {
		const payload = buildLessonReviewPayloadFromDocs(
			[
				{ id: "class-doc", name: "Danielさん", slug: "class", markdown: "# 2026.09.02\nわさび　もらえますか？\n" },
				{ id: "preply-doc", name: "Preply すみれ先生", slug: "preply", markdown: "# 2026.09.02\n人気があります　｜很受欢迎\n" },
			],
			{ fetchedAt: "2026-09-21T00:00:00.000Z" },
		);
		const days = payload.days.filter((day) => day.date === "2026-09-02");
		expect(days.map((day) => day.id)).toEqual(["2026-09-02", "2026-09-02:preply"]);
		expect(days.map((day) => day.source)).toEqual(["Danielさん", "Preply すみれ先生"]);
		expect(days[0].items[0].jp).toContain("わさび");
		expect(days[1].items[0]).toMatchObject({ jp: "人気があります", cn: "很受欢迎" });
	});
});

describe("lesson review helpers", () => {
	it("parses review routes and formats JST dates", () => {
		expect(parseReviewRoute("#/review")).toEqual({ id: null });
		expect(parseReviewRoute("#/review/2026-09-11")).toEqual({ id: "2026-09-11" });
		expect(parseReviewRoute("#/review/note-workplace")).toEqual({ id: "note-workplace" });
		expect(parseReviewRoute("#/review/2026-09-02:preply")).toEqual({ id: "2026-09-02:preply" });
		expect(reviewDateFromId("2026-09-02")).toBe("2026-09-02");
		expect(reviewDateFromId("2026-09-02:preply")).toBe("2026-09-02");
		expect(reviewDateFromId("note-workplace")).toBeNull();
		expect(parseReviewRoute("#/cards")).toBeNull();
		expect(formatReviewDate("2026-09-11", "cn")).toBe("2026年9月11日");
		expect(formatReviewDate("2026-09-11", "en")).toBe("Sep 11, 2026");
		expect(formatReviewMonthDay("2026-09-11", "cn")).toBe("9月11日");
		expect(formatReviewMonth("2026-09-11", "cn")).toBe("9月");
		expect(formatReviewDayNum("2026-09-11")).toBe("11");
		expect(formatReviewWeekday("2026-09-11", "cn")).toBe("星期五");
		expect(toKatakana("せんしんこく")).toBe("センシンコク");
		expect(toHiragana("センシンコク")).toBe("せんしんこく");
		expect(reviewSurfaceText("先進国（せんしんこく）")).toBe("先進国");
		expect(reviewSurfaceText("完璧（かんぺき）じゃない")).toBe("完璧じゃない");
		expect(reviewSurfaceText("汗(あせ)をかく")).toBe("汗をかく");
		expect(reviewSurfaceText("停（と）める")).toBe("停める");
		expect(reviewSurfaceText("十話 （じゅうわ")).toBe("十話");
		expect(reviewSurfaceText("第二次世界大戦（だいにじ せかいたいせん）")).toBe("第二次世界大戦");
		expect(reviewSurfaceText("もっと楽(らく)になった")).toBe("もっと楽になった");
		expect(reviewSurfaceText("（ならぶ）")).toBe("ならぶ");
		expect(reviewSurfaceText("手伝って（ ）けれど、それでは君のためにならない。")).toBe(
			"手伝って（ ）けれど、それでは君のためにならない。",
		);
		expect(reviewSurfaceText("良い休日を（お過ごし下さい）")).toBe("良い休日を（お過ごし下さい）");
		expect(reviewSurfaceText("朝型 あさがた")).toBe("朝型");
		expect(buildReviewRuby("先進国（せんしんこく）")).toBe("<ruby>先進国<rt>せんしんこく</rt></ruby>");
		expect(buildReviewRuby("つうがく（通学）")).toBe("<ruby>通学<rt>つうがく</rt></ruby>");
		expect(buildReviewRuby("字幕", "じまく")).toBe("<ruby>字幕<rt>じまく</rt></ruby>");
		expect(
			applyKanjiReadings("テストは成績に影響する", { 成績: "せいせき", 影響: "えいきょう" }),
		).toBe("テストは<ruby>成績<rt>せいせき</rt></ruby>に<ruby>影響<rt>えいきょう</rt></ruby>する");
		expect(
			reviewKanaLine({
				jp: "テストは成績に影響する",
				kind: "word",
				jp_r: "テストは<ruby>成績<rt>せいせき</rt></ruby>に<ruby>影響<rt>えいきょう</rt></ruby>する",
			}),
		).toBe("テストはせいせきにえいきょうする");
		expect(enrichReviewDays([{ id: "x", title: "x", items: [{ jp: "テストは成績に影響する", kind: "word" }] }])[0].items[0].jp_r).toBe(
			"テストは<ruby>成績<rt>せいせき</rt></ruby>に<ruby>影響<rt>えいきょう</rt></ruby>する",
		);
		expect(enrichReviewDays([{ id: "x", title: "x", items: [{ jp: "認め", kind: "word" }] }])[0].items[0]).toMatchObject({
			jp_r: "<ruby>認め<rt>みとめ</rt></ruby>",
		});
		expect(buildReviewRuby("日本の男の人は髪（かみ）とか外見（がいけん）に気を遣うけど")).toBe(
			"日本の男の人は<ruby>髪<rt>かみ</rt></ruby>とか<ruby>外見<rt>がいけん</rt></ruby>に気を遣うけど",
		);
		const drama = enrichReviewDays([
			{ id: "x", title: "x", items: [{ jp: "主人公は生まれ育った家庭の影響で、よく現実から逃げてしまう。", kind: "sentence" }] },
		])[0].items[0].jp_r;
		expect(drama).toContain("<ruby>主人公<rt>しゅじんこう</rt></ruby>");
		expect(drama).toContain("<ruby>生まれ育った<rt>うまれそだった</rt></ruby>");
		expect(drama).toContain("<ruby>現実<rt>げんじつ</rt></ruby>");
		expect(drama).not.toContain("<rt>なま</rt>");
		expect(enrichReviewDays([{ id: "x", title: "x", items: [{ jp: "何回も行っている", kind: "sentence" }] }])[0].items[0].jp_r).toContain(
			"<ruby>行っている<rt>いっている</rt></ruby>",
		);
		expect(enrichReviewDays([{ id: "x", title: "x", items: [{ jp: "日本に来たのかな？", kind: "sentence" }] }])[0].items[0].jp_r).toContain(
			"<ruby>来た<rt>きた</rt></ruby>",
		);
		expect(enrichReviewDays([{ id: "x", title: "x", items: [{ jp: "市民税", kind: "word" }] }])[0].items[0].jp_r).toBe(
			"<ruby>市民税<rt>しみんぜい</rt></ruby>",
		);
		const machine = enrichReviewDays([{ id: "x", title: "x", items: [{ jp: "精算機", kind: "word" }] }])[0].items[0];
		expect(machine.jp_r).toBe("<ruby>精算機<rt>せいさんき</rt></ruby>");
		expect(machine.example).toContain("精算機");
		expect(machine.exampleCn).toBeTruthy();
		expect(
			enrichReviewDays([{ id: "x", title: "x", items: [{ jp: "冬にインフルエンザのウイルスと戦うには", kind: "sentence" }] }])[0].items[0].cn,
		).toBe("要在冬天对抗流感病毒的话");
		const rule = enrichReviewDays([{ id: "x", title: "x", items: [{ jp: "ルールを破る", kind: "word" }] }])[0].items[0];
		expect(rule.example_r?.replace(/<ruby>[\s\S]*?<\/ruby>/g, "")).not.toMatch(/[一-龯]/);
		expect(enrichReviewDays([{ id: "x", title: "x", items: [{ jp: "心に残る", kind: "word" }] }])[0].items[0].jp_r).toContain(
			"<ruby>心<rt>こころ</rt></ruby>",
		);
		expect(enrichReviewDays([{ id: "x", title: "x", items: [{ jp: "公积金", kind: "word" }] }])[0].items[0].jp_r).toBeUndefined();
		expect(
			enrichReviewDays([
				{ id: "x", title: "x", items: [{ jp: "公积金", jp_r: "公积<ruby>金<rt>かね</rt></ruby>", kind: "word" }] },
			])[0].items[0].jp_r,
		).toBeUndefined();
		expect(
			enrichReviewDays([{ id: "x", title: "x", items: [{ jp: "伝統的（でんとうてき）な漢字", kind: "word" }] }])[0].items[0].jp_r,
		).toBe("<ruby>伝統的<rt>でんとうてき</rt></ruby>な<ruby>漢字<rt>かんじ</rt></ruby>");
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
		const fetcher = vi.fn(async (url: string) => {
			const body = String(url).includes(LESSON_REVIEW_DOCS[1].id)
				? "# 2026.09.02\n人気があります　｜很受欢迎\n"
				: SAMPLE;
			return new Response(body, { status: 200 });
		});
		const result = await syncLessonReview({ FAVORITES_KV: kv as unknown as KVNamespace }, fetcher as unknown as typeof fetch);
		expect(result.ok).toBe(true);
		expect(result.days).toBe(6);
		const stored = JSON.parse(kv.map.get(LESSON_REVIEW_KV_KEY) || "{}");
		expect(stored.days[0].id).toBe("2026-09-13");
		expect(stored.days[0].label).toBe("模擬試験N3");
		expect(stored.days[0].source).toBe("Danielさん");
		expect(stored.days.find((day: { id: string }) => day.id === "2026-09-02:preply")?.source).toBe("Preply すみれ先生");
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
