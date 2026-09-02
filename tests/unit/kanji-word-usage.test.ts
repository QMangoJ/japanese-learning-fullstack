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
		for (const word of words) {
			const usage = getKanjiWordUsage(word);
			const example = renderedExample(word);
			expect(usage.posCn, word.jp).toBeTruthy();
			expect(usage.posEn, word.jp).toBeTruthy();
			expect(example, word.jp).toMatch(/[。？！]$/);
			expect(example, word.jp).not.toMatch(/[〇〜]/);
		}
	});

	it("uses reviewed verb frames rather than a generic noun template", () => {
		const examples = new Map(words.map((word) => [word.jp, renderedExample(word)]));
		expect(examples.get("向かう")).toBe("これからえきに向かう。");
		expect(examples.get("無い")).toBe("いま、てもとにおかねが無い。");
		expect(examples.get("冷やす")).toBe("のみものをれいぞうこで冷やす。");
		expect(examples.get("申し込む")).toBe("インターネットでこうざに申し込む。");
		expect(examples.get("比べる")).toBe("ふたつのしょうひんを比べる。");
	});

	it("shows representative adjective, adverb, noun, and counter usage", () => {
		const byWord = new Map(words.map((word) => [word.jp, word]));
		for (const [word, expectedPos, expectedExample] of [
			["無理(な)", "な形容词", "これはとても無理です。"],
			["危ない", "い形容词", "このみちは危ない。"],
			["必ず", "副词", "やくそくは必ずまもります。"],
			["駐車場", "名词", "これから駐車場へいきます。"],
			["〜冊", "表达", "ほんをさん冊かりました。"],
		] as const) {
			const item = byWord.get(word)!;
			expect(getKanjiWordUsage(item).posCn).toBe(expectedPos);
			expect(renderedExample(item)).toBe(expectedExample);
		}
	});
});
