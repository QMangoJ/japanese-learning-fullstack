import { readFileSync } from "node:fs";
import { join } from "node:path";
import { beforeEach, describe, expect, it } from "vitest";

import { isDueReviewPayload } from "../../app/auth/study-payloads";
import { dueEntries, dueEntry, rememberFail, rememberKnown, resetDueForTests } from "../../app/study/due-review";
import { parseTopicsRoute } from "../../app/study/topic-route";
import {
	bracketRubyToHtml,
	mergeTopicCards,
	parseDelimited,
	parseMarkdownSections,
	sectionsToDrafts,
	stripRuby,
	topicDueId,
	validateTopicFile,
	type TopicCard,
	type TopicFile,
} from "../../app/study/topic-vocab";
import { checkTopicDir } from "../../scripts/check-topic-vocab.mts";

const DIR = join(process.cwd(), "public/data/topics");

describe("topic vocabulary data", () => {
	it("passes the validator and keeps index.json in sync", () => {
		expect(checkTopicDir(DIR)).toEqual([]);
	});

	it("ships the 日本投资理财日语 word list: 117 doc entries in 9 groups plus 4 extras", () => {
		const topic: TopicFile = JSON.parse(readFileSync(join(DIR, "japan-investing.json"), "utf8"));
		const count = (zh: string) => topic.cards.filter((c) => c.subtopic === zh).length;
		expect(topic.cards).toHaveLength(121);
		expect(topic.subtopics.map((s) => [s.zh, count(s.zh)])).toEqual([
			["开户・本人确认", 10],
			["账户・税制（NISA等）", 15],
			["下单・交易", 14],
			["股票", 14],
			["投资信托・基金", 16],
			["债券・其他商品", 11],
			["收益・成本", 15],
			["汇率・外国证券", 14],
			["风险・策略", 12],
		]);
		for (const card of topic.cards) {
			for (const key of ["id", "jp", "kana", "zh", "subtopic", "example_jp", "example_zh"] as const) expect(card[key], `${card.id}.${key}`).toBeTruthy();
			expect(JSON.stringify(card)).not.toContain("\\\\");
		}
		expect(topic.cards.find((c) => c.jp === "インデックス")?.example_jp).toContain("S&P500");
		expect(topic.cards.find((c) => c.jp === "成行")?.kana).toBe("なりゆき");
		expect(topic.cards.find((c) => c.jp === "貯蓄型投資信託")?.note).toBe("也叫累投型／自動けいぞく投資コース，指分配金自动再投资的类型");
	});
});

describe("topic vocabulary schema", () => {
	const base = (): TopicFile => ({
		version: 1,
		slug: "demo",
		title_zh: "示例",
		title_ja: "デモ",
		subtopics: [{ zh: "股票" }],
		cards: [{ id: "d-001", jp: "株価", kana: "かぶか", zh: "股价", subtopic: "股票", example_jp: "株価が上がった。", example_zh: "股价涨了。" }],
	});

	it("accepts a minimal topic", () => {
		expect(validateTopicFile(base(), "demo")).toEqual([]);
	});

	it("rejects missing fields, unknown subtopics, kanji in kana and bad ruby", () => {
		const t = base();
		t.cards.push({ id: "d-001", jp: "配当", kana: "配当", zh: "", subtopic: "税务", example_jp: "配当", example_zh: "x", example_ruby: "<b>配当</b>" } as TopicCard);
		const errors = validateTopicFile(t, "other").join("\n");
		expect(errors).toMatch(/slug must match/);
		expect(errors).toMatch(/duplicate id/);
		expect(errors).toMatch(/zh is required/);
		expect(errors).toMatch(/subtopic "税务"/);
		expect(errors).toMatch(/kana must be kana only/);
		expect(errors).toMatch(/example_ruby may only contain/);
	});

	it("checks that example_ruby matches example_jp", () => {
		const t = base();
		t.cards[0].example_ruby = "<ruby>株価<rt>かぶか</rt></ruby>が下がった。";
		expect(validateTopicFile(t).join()).toMatch(/must equal example_jp/);
		t.cards[0].example_ruby = "<ruby>株価<rt>かぶか</rt></ruby>が<ruby>上<rt>あ</rt></ruby>がった。";
		expect(validateTopicFile(t)).toEqual([]);
	});
});

describe("topic vocabulary import", () => {
	const doc = [
		"# **词表**",
		"",
		"## **股票**",
		"",
		"|  |  |  |  |  |",
		"| :-: | :-: | :-: | :-: | :-: |",
		"| 日语 | 假名读音 | 中文意思 | 例句（日语） | 例句（中文） |",
		"| 株価 | かぶか | 股价 | 株価が上がった。 | 股价涨了。 |",
		"| インデックス | インデックス | 指数 | S\\\\\\&P500に連動する。 | 跟踪标普500。 |",
		"",
		"## **税务**",
		"",
		"| 日语 | 假名读音 | 中文意思 | 例句（日语） | 例句（中文） |",
		"| :-: | :-: | :-: | :-: | :-: |",
		"| 確定申告 | かくていしんこく | 报税 | 確定申告[かくていしんこく]をする。 | 去报税。 |",
	].join("\n");

	it("reads Google Docs markdown tables, using headings as subtopics and dropping escapes", () => {
		const { drafts, groups } = sectionsToDrafts(parseMarkdownSections(doc));
		expect(groups).toEqual([
			{ heading: "股票", count: 2 },
			{ heading: "税务", count: 1 },
		]);
		expect(drafts[1]).toMatchObject({ jp: "インデックス", subtopic: "股票", example_jp: "S&P500に連動する。" });
		expect(drafts[2]).toMatchObject({
			subtopic: "税务",
			example_jp: "確定申告をする。",
			example_ruby: "<ruby>確定申告<rt>かくていしんこく</rt></ruby>をする。",
		});
	});

	it("parses quoted CSV and TSV", () => {
		expect(parseDelimited('jp,zh\n"株価","股价, 价格"\n', ",")).toEqual([
			["jp", "zh"],
			["株価", "股价, 价格"],
		]);
		expect(parseDelimited("jp\tzh\r\n配当\t分红\r\n", "\t")).toEqual([
			["jp", "zh"],
			["配当", "分红"],
		]);
	});

	it("keeps ids of existing words when re-importing", () => {
		const existing: TopicCard[] = [
			{ id: "inv-001", jp: "株価", kana: "かぶか", zh: "旧", subtopic: "股票", example_jp: "a", example_zh: "b" },
			{ id: "inv-002", jp: "配当", kana: "はいとう", zh: "分红", subtopic: "股票", example_jp: "a", example_zh: "b" },
		];
		const drafts = [
			{ jp: "株価", kana: "かぶか", zh: "股价", subtopic: "股票", example_jp: "a", example_zh: "b" },
			{ jp: "利回り", kana: "りまわり", zh: "收益率", subtopic: "股票", example_jp: "a", example_zh: "b" },
		];
		const replaced = mergeTopicCards(existing, drafts, { mode: "replace", idPrefix: "inv" });
		expect(replaced.cards.map((c) => [c.id, c.jp, c.zh])).toEqual([
			["inv-001", "株価", "股价"],
			["inv-003", "利回り", "收益率"],
		]);
		expect(replaced).toMatchObject({ added: 1, updated: 1, removed: 1 });
		expect(mergeTopicCards(existing, drafts, { mode: "merge", idPrefix: "inv" }).cards.map((c) => c.id)).toEqual(["inv-001", "inv-002", "inv-003"]);
	});

	it("lets a later overrides row add fields to a word from the same import", () => {
		const drafts = [
			{ jp: "株価", kana: "かぶか", zh: "股价", subtopic: "股票", example_jp: "a", example_zh: "b" },
			{ jp: "株価", kana: "かぶか", note: "补充" },
		];
		const { cards, added } = mergeTopicCards([], drafts, { mode: "replace", idPrefix: "inv" });
		expect(added).toBe(1);
		expect(cards).toEqual([{ id: "inv-001", jp: "株価", kana: "かぶか", zh: "股价", subtopic: "股票", example_jp: "a", example_zh: "b", note: "补充" }]);
	});

	it("converts bracket readings to ruby", () => {
		const html = bracketRubyToHtml("株[かぶ]を買[か]う");
		expect(html).toBe("<ruby>株<rt>かぶ</rt></ruby>を<ruby>買<rt>か</rt></ruby>う");
		expect(stripRuby(html)).toBe("株を買う");
	});
});

describe("topic vocabulary review", () => {
	beforeEach(() => resetDueForTests());

	it("routes /study/topics and /study/topics/<slug>", () => {
		expect(parseTopicsRoute("#/topics")).toEqual({ slug: null });
		expect(parseTopicsRoute("#/topics/japan-investing")).toEqual({ slug: "japan-investing" });
		expect(parseTopicsRoute("#/topics/../x")).toBeNull();
	});

	it("feeds 不会 / 会了 into the shared due-review queue", () => {
		const draft = { id: topicDueId("japan-investing", "inv-001"), kind: "topic" as const, jp: "証券口座", cn: "证券账户", en: "", reading: "しょうけんこうざ" };
		rememberFail(draft, "2026-10-03");
		expect(dueEntry(draft.id)).toMatchObject({ kind: "topic", due: "2026-10-04", step: 0 });
		rememberKnown(draft, "2026-10-04");
		expect(dueEntry(draft.id)).toMatchObject({ due: "2026-10-05", step: 1 });
		const fresh = { ...draft, id: topicDueId("japan-investing", "inv-002") };
		rememberKnown(fresh, "2026-10-03");
		expect(dueEntry(fresh.id)).toMatchObject({ due: "2026-10-06", step: 2 });
		expect(isDueReviewPayload(dueEntries())).toBe(true);
	});
});
