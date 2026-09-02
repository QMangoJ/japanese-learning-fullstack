import { describe, expect, it } from "vitest";

import kanji from "../../public/data/kanji.e43232869e.json";
import { getKanjiWordUsage, kanjiWordSurface } from "../../app/study/kanji-word-usage";

const words = kanji.weeks.flatMap((week) =>
	week.days.flatMap((day) => (day.kanji || []).flatMap((entry) => entry.words || [])),
);

function renderedExample(word: (typeof words)[number]) {
	const usage = getKanjiWordUsage(word);
	return `${usage.before}${usage.focus || kanjiWordSurface(word)}${usage.after}`;
}

describe("N3 kanji word usage examples", () => {
	it("adds a compact example and part of speech to every kanji word", () => {
		expect(words).toHaveLength(739);
		const fallbackTranslations: string[] = [];
		for (const word of words) {
			const usage = getKanjiWordUsage(word);
			const example = renderedExample(word);
			expect(usage.posCn, word.jp).toBeTruthy();
			expect(usage.posEn, word.jp).toBeTruthy();
			expect(usage.exampleCn, word.jp).toBeTruthy();
			expect(usage.exampleEn, word.jp).toBeTruthy();
			if (usage.exampleCn.includes("例句中使用了") || usage.exampleEn.includes("The example uses")) fallbackTranslations.push(word.jp);
			expect(example, word.jp).toMatch(/[。？！]$/);
			expect(example, word.jp).not.toContain("〇");
		}
		expect([...new Set(fallbackTranslations)]).toEqual([]);
	});

	it("uses reviewed, word-specific frames rather than one repeated template", () => {
		const examples = new Map(words.map((word) => [word.jp, renderedExample(word)]));
		expect(examples.get("向かう")).toBe("これからえきに向かう。");
		expect(examples.get("無い")).toBe("いま、てもとにおかねが無い。");
		expect(examples.get("冷やす")).toBe("のみものをれいぞうこで冷やす。");
		expect(examples.get("申し込む")).toBe("インターネットでこうざに申し込む。");
		expect(examples.get("比べる")).toBe("回数券の合計金額を比べる。");
		expect(examples.get("無理(な)")).toBe("無理なおねがいはしないでください。");
		expect(examples.get("確か(な)")).toBe("確かなじょうほうかどうかかくにんします。");
		expect(new Set(examples.values()).size).toBeGreaterThan(650);
	});

	it("shows representative adjective, adverb, noun, and counter usage with translations", () => {
		const byWord = new Map(words.map((word) => [word.jp, word]));
		for (const [word, expectedPos, expectedExample, expectedCn, expectedEn] of [
			["無理(な)", "な形容词", "無理なおねがいはしないでください。", "请不要提出难以做到的要求。", "Please do not make an unreasonable request."],
			["危ない", "い形容词", "このみちは危ない。", "这条路很危险。", "This road is dangerous."],
			["必ず", "副词", "やくそくは必ずまもります。", "一定会遵守约定。", "I will always keep my promise."],
			["駐車場", "名词", "会場のななめ向かいに有料駐車場があります。", "会场的斜对面有收费停车场。", "There is a pay parking lot diagonally across from the venue."],
			["〜冊", "表达", "ほんをさん冊かりました。", "借了三本书。", "I borrowed three books."],
		] as const) {
			const item = byWord.get(word)!;
			const usage = getKanjiWordUsage(item);
			expect(usage.posCn).toBe(expectedPos);
			expect(renderedExample(item)).toBe(expectedExample);
			expect(usage.exampleCn).toBe(expectedCn);
			expect(usage.exampleEn).toBe(expectedEn);
		}
	});

	it("uses source-backed examples when a short, trusted bilingual sentence exists", () => {
		const usages = words.map((word) => getKanjiWordUsage(word));
		expect(usages.filter((usage) => usage.source).length).toBeGreaterThan(200);
		for (const usage of usages.filter((item) => item.source)) {
			expect(usage.source).toMatch(/reading-n3|listening-n3|common-jita|grammar\.d15|n4grammar/);
		}
	});
});
