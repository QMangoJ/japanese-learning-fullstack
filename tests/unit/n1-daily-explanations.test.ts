import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { vocabReadingText } from "../../app/study/days";

describe("vocab reading line", () => {
	it("reads kana out of ruby so it stays available when furigana is hidden", () => {
		expect(vocabReadingText({ jp: "電車", jp_r: "<ruby>電車<rt>でんしゃ</rt></ruby>" })).toBe("でんしゃ");
		expect(vocabReadingText({ jp: "⇔（～を）遠ざける", jp_r: "⇔（～を）<ruby>遠<rt>とお</rt></ruby>ざける" })).toBe("とおざける");
		expect(vocabReadingText({ jp: "チラシ", jp_r: "チラシ" })).toBe("");
	});
});

describe("N1 daily grammar explanations", () => {
	const book = JSON.parse(readFileSync("public/data/n1grammar.c2d6c00681.json", "utf8"));
	const explanations = JSON.parse(readFileSync("public/data/n1-grammar-daily-explanations.json", "utf8"));

	it("covers every practice item on days 1–6 with a Chinese sentence and a specific reason", () => {
		let count = 0;
		for (const week of book.weeks) {
			for (const day of week.days) {
				if (day.day === 7) continue;
				const key = `w${week.n}d${day.day}`;
				const items = explanations[key]?.items;
				const source = day.exercises.sections.flatMap((section: { type: string; items: { n: number }[] }) =>
					section.items.map((item) => ({ n: item.n, type: section.type })),
				);
				expect(items, key).toHaveLength(source.length);
				items.forEach((item: { n: number; type: string; translation: string; reason: string; completed: string; answer: string }, index: number) => {
					expect(item.n).toBe(source[index].n);
					expect(item.type).toBe(source[index].type);
					expect(item.answer).toBeTruthy();
					expect(item.completed).not.toMatch(/＿|（\s*a[.．]/);
					expect(item.translation).toMatch(/[\u3400-\u9fff]/);
					expect(item.reason).toMatch(/[\u3400-\u9fff]/);
					count += 1;
				});
			}
		}
		expect(count).toBe(336);
	});
});
