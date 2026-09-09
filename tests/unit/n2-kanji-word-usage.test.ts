import { describe, expect, it } from "vitest";
import kanji from "../../public/data/n2kanji.d9739ca8d4.json";
import { N2_KANJI_USAGE } from "../../app/data/n2-kanji-usage";
import { getN2KanjiWordUsage } from "../../app/study/n2-kanji-word-usage";
import { kanjiWordSurface } from "../../app/study/kanji-word-usage";
const words = kanji.weeks.flatMap(w => w.days.flatMap(d => (d.kanji || []).flatMap(k => k.words || [])));
describe("N2 kanji usage", () => {
	it("covers every word in the first two weeks, including prefixes, suffixes and annotated headwords", () => {
		const firstWeek = kanji.weeks.slice(0, 2).flatMap(w => w.days.flatMap(d => (d.kanji || []).flatMap(k => k.words || [])));
		expect(firstWeek.filter(w => !getN2KanjiWordUsage(w)).map(w => w.jp)).toEqual([]);
	});
	it("all authored entries belong to the N2 word list and have complete sentence translations", () => {
		const names = new Set(words.flatMap(w => [w.jp, `${w.jp}|${w.reading}`]));
		for (const [key, spec] of Object.entries(N2_KANJI_USAGE)) {
			expect(names.has(key), key).toBe(true);
			expect(spec[0], key).toMatch(/^[^【】]*【[^【】]+】[^【】]*[。？！]$/);
			expect(spec[1]).toBeTruthy(); expect(spec[2]).toBeTruthy();
		}
		for (const word of words) {
			const usage = getN2KanjiWordUsage(word);
			if (!usage) continue;
			expect(usage.exampleCn).not.toContain("例句中使用了");
			expect(usage.exampleEn).not.toContain("The example uses");
			expect(`${usage.before}${usage.focus || kanjiWordSurface(word)}${usage.after}`).toMatch(/[。？！]$/);
		}
	});
	it("does not synthesize unreviewed examples for unknown words", () => {
		expect(getN2KanjiWordUsage({ jp: "未収録の単語", cn: "未收录" })).toBeNull();
	});
	it("keeps the two readings and senses of 表 separate", () => {
		expect(getN2KanjiWordUsage({ jp: "表", reading: "ひょう" })?.exampleCn).toContain("表格");
		expect(getN2KanjiWordUsage({ jp: "表", reading: "おもて" })?.exampleCn).toContain("正面");
	});
	it("uses actual example readings for compounds rather than the affix reading", () => {
		expect(getN2KanjiWordUsage({ jp: "両〜", reading: "りょう" })?.focusReading).toBe("りょうて");
		expect(getN2KanjiWordUsage({ jp: "1万円札", reading: "まんえんさつ" })?.focusReading).toBe("いちまんえんさつ");
	});
});
