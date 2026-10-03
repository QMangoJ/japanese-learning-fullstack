import { readFileSync } from "node:fs";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { N2_DAILY_SUMMARIES } from "../../app/data/n2-daily-summaries";
import { N2_SUMMARY_RELATED } from "../../app/data/n2-summary-related";
import { N3_RELATED_GRAMMAR } from "../../app/data/n3-related-grammar";
import { SIMILAR_FURIGANA, similarFurigana } from "../../app/data/similar-furigana";
import { translateOutsideRuby } from "../../app/data/similar-furigana-text";
import { GrammarSummary } from "../../app/study/grammar-summary";
import { N2GrammarSummary, type N2SimilarEntry } from "../../app/study/n2-grammar-summary";

const similar = JSON.parse(readFileSync("public/data/n2-grammar-similar.json", "utf8")) as { days: Record<string, N2SimilarEntry[]> };
const RUBY = /<ruby>([^<]*)<rt>([^<]*)<\/rt><\/ruby>/g;
const KANJI = /[一-龯々〆ヵヶ]/;
const plain = (html: string) => html.replace(RUBY, "$1");
// Kanji only inside （…） are Chinese labels such as （样态）, which stay without ruby.
const needsRuby = (text: string) => KANJI.test(text.replace(/（[^（）]*）/g, ""));

const strings = {
	N3: Object.values(N3_RELATED_GRAMMAR).flatMap((group) => group.rows.flatMap((row) => [row[0], row[6]])),
	N2: [
		...Object.values(N2_SUMMARY_RELATED).flatMap((row) => [row.form, row.example[0]]),
		...Object.values(similar.days).flat().flatMap((entry) => [entry.form, entry.against, entry.example.jp]),
	],
};

describe("相似表达 furigana", () => {
	it("annotates every N3/N2 相似表达 form and example containing kanji without changing the text", () => {
		for (const [level, list] of Object.entries(strings)) {
			const annotated = new Set(list.filter(needsRuby));
			expect(annotated.size, level).toBe(level === "N3" ? 118 : 236);
			for (const text of annotated) {
				const html = SIMILAR_FURIGANA[text];
				expect(html, `${level}: ${text}`).toMatch(RUBY);
				// The only allowed change: a parenthesised reading that now duplicates the ruby (～反面（はんめん）).
				expect(plain(html), text).toBe(text.replace(/（[ぁ-ゖ]+）/, (m) => (plain(html).includes(m) ? m : "")));
				for (const [, base, reading] of html.matchAll(RUBY)) {
					expect(base).toMatch(KANJI);
					expect(reading, `${base} in ${text}`).toMatch(/^[ぁ-ゖー]+$/);
				}
			}
		}
		expect(similarFurigana("ちょっとひと休み")).toBe("ちょっとひと休み");
		expect(similarFurigana("～わけがない")).toBe("～わけがない");
	});

	it("uses the context-correct readings that were reviewed by hand", () => {
		const cases: [string, string][] = [
			["九時から五時まで働きます。", "<ruby>九時<rt>くじ</rt></ruby>"],
			["外国人から見ると、日本の電車の静かさは不思議らしい。", "<ruby>外国人<rt>がいこくじん</rt></ruby>"],
			["一人で一日では終わりっこない。", "<ruby>一日<rt>いちにち</rt></ruby>"],
			["鍵を忘れたばかりに、家に入れなかった。", "<ruby>入<rt>はい</rt></ruby>れなかった"],
			["今週は寝不足で、少し疲れ気味だ。", "<ruby>気味<rt>ぎみ</rt></ruby>"],
			["～末（に）", "<ruby>末<rt>すえ</rt></ruby>"],
			["～間に", "<ruby>間<rt>あいだ</rt></ruby>"],
			["道を一本間違えたばかりに、30分も遅刻した。", "<ruby>30分<rt>さんじゅっぷん</rt></ruby>"],
		];
		for (const [text, part] of cases) expect(SIMILAR_FURIGANA[text], text).toContain(part);
		expect(SIMILAR_FURIGANA["～反面（はんめん）"]).toBe("～<ruby>反面<rt>はんめん</rt></ruby>");
		expect(SIMILAR_FURIGANA["～そうだ（样态）"]).toBeUndefined();
	});

	it("translates Chinese notes only outside the ruby markup", () => {
		expect(translateOutsideRuby("～<ruby>恐<rt>おそ</rt></ruby>れ（目的）", (text) => text.replace("目的", "purpose"))).toBe("～<ruby>恐<rt>おそ</rt></ruby>れ（purpose）");
	});

	it("renders ruby in the N2 相似表达 list, including same-level items", async () => {
		const key = Object.keys(similar.days).find((k) => N2_DAILY_SUMMARIES[k.replace(/^w(\d+)d(\d+)$/, "$1-$2")])!;
		const [, week, day] = /^w(\d+)d(\d+)$/.exec(key)!.map(Number);
		render(<N2GrammarSummary week={week} day={day} points={[]} language="zh" onReview={vi.fn()} similar={similar.days[key]} />);
		const related = screen.getByTestId("grammar-related");
		expect(related).not.toHaveTextContent("undefined");
		await waitFor(() => expect(related.querySelectorAll("ruby").length).toBeGreaterThan(3));
		const sameLevel = related.querySelector('article[data-level="N2"]')!;
		expect(sameLevel.querySelector(".jp ruby")).not.toBeNull();
	});

	it("renders ruby in the N3 cross-level list in both languages", async () => {
		const { rerender } = render(<GrammarSummary week={1} day={1} points={[]} language="zh" onReview={vi.fn()} />);
		const related = () => screen.getByTestId("grammar-related");
		await waitFor(() => expect(related().querySelectorAll(".jp ruby").length).toBeGreaterThan(3));
		expect(related()).toHaveTextContent("かせられた");
		rerender(<GrammarSummary week={1} day={1} points={[]} language="en" onReview={vi.fn()} />);
		expect(related().querySelectorAll(".jp ruby").length).toBeGreaterThan(3);
		expect(related()).not.toHaveTextContent("样态");
	});
});
