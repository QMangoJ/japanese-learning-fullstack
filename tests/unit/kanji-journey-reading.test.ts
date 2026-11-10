import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { validateKanjiJourneyArticle, type KanjiJourneyArticle } from "../../app/study/kanji-journey";

/**
 * 《漢字的旅程》阅读数据（public/data/reading/kanji-journey.json）的校验口径：
 * 它已从专题词汇闪卡迁出（topics index 里是 kind: "reading" 条目），
 * 这里接管原先由 topic 校验覆盖的注音/结构检查，并钉住与原稿一致的形态：
 * 正文 23 句分五节、问答 6 组、救命句 1 条、Q6 占位不许被填数字。
 */
const article: KanjiJourneyArticle = JSON.parse(readFileSync(join(process.cwd(), "public/data/reading/kanji-journey.json"), "utf8"));

describe("kanji-journey reading article", () => {
	it("passes the article validator (segments join to jp, kanji always carry readings)", () => {
		expect(validateKanjiJourneyArticle(article)).toEqual([]);
	});

	it("keeps the script shape: 5 sections, 23 sentences in original order kj-001..kj-023", () => {
		expect(article.sections.map((s) => s.zh)).toEqual(["开场", "最古老的汉字", "字形的变化", "来到日本", "结尾"]);
		expect(article.sections.map((s) => s.sentences.length)).toEqual([4, 5, 4, 6, 4]);
		const ids = article.sections.flatMap((s) => s.sentences.map((x) => x.id));
		expect(ids).toEqual(Array.from({ length: 23 }, (_, i) => `kj-${String(i + 1).padStart(3, "0")}`));
	});

	it("keeps 6 Q&A pairs kj-024..kj-029 and the rescue phrase kj-030", () => {
		expect(article.qa.map((p) => p.id)).toEqual(["kj-024", "kj-025", "kj-026", "kj-027", "kj-028", "kj-029"]);
		expect(article.rescue.id).toBe("kj-030");
		expect(article.rescue.jp).toBe("すみません、もう一度お願いします。");
	});

	it("keeps Q6's 〇週間 placeholder unfilled, with the 按实际回答 note", () => {
		const q6 = article.qa[5];
		expect(q6.answer.jp).toBe("〇週間ぐらいかかりました。");
		expect(q6.note_zh).toContain("按实际回答");
	});

	it("stays registered in the topics index as a reading entry whose count is the body sentence count", () => {
		const index = JSON.parse(readFileSync(join(process.cwd(), "public/data/topics/index.json"), "utf8")) as {
			topics: { slug: string; kind?: string; count: number }[];
		};
		const entry = index.topics.find((t) => t.slug === "kanji-journey");
		expect(entry?.kind).toBe("reading");
		expect(entry?.count).toBe(23);
	});
});
