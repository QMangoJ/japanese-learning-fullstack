import { readFileSync } from "node:fs";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { N2_DAILY_SUMMARIES } from "../../app/data/n2-daily-summaries";
import { N2_SUMMARY_RELATED } from "../../app/data/n2-summary-related";
import { N2_SUMMARY_EXAMPLE_EN, N2_SUMMARY_EXAMPLE_ZH, n2SummaryExample } from "../../app/data/n2-summary-examples";
import { N2GrammarSummary } from "../../app/study/n2-grammar-summary";

const book = JSON.parse(readFileSync("public/data/n2grammar.4e6157570a.json", "utf8"));
const lesson = (week: number, day: number) => book.weeks.find((w: any) => w.n === week).days.find((d: any) => d.day === day);

describe("N2 daily grammar summaries", () => {
	it("anchors corrected translations to exact Japanese rather than a positional English list", () => {
		const sentences = new Set(book.weeks.flatMap((w: any) => w.days.flatMap((d: any) => (d.points || []).map((p: any) => p.examples[0].jp))));
		for (const key of [...Object.keys(N2_SUMMARY_EXAMPLE_EN), ...Object.keys(N2_SUMMARY_EXAMPLE_ZH)]) expect(sentences.has(key), key).toBe(true);
		expect(n2SummaryExample(lesson(2, 5).points[1].examples[0]).en).toBe("If that were true, it would be like a dream.");
		expect(n2SummaryExample(lesson(1, 1).points[3].examples[0]).jp_r).toContain("気味<rt>ぎみ</rt>");
		expect(n2SummaryExample(lesson(2, 2).points[1].examples[0]).jp_r).toContain("1日<rt>いちにち</rt>");
	});
	it("covers all 48 lessons and 191 source points, with bilingual meanings and specific distinctions", () => {
		expect(Object.keys(N2_DAILY_SUMMARIES)).toHaveLength(48);
		let total = 0;
		for (let w = 1; w <= 8; w++) {
			for (let day = 1; day <= 6; day++) {
				const summary = N2_DAILY_SUMMARIES[`${w}-${day}`];
				const points = lesson(w, day).points;
				expect(summary.rows).toHaveLength(points.length);
				expect(summary.related.length).toBeGreaterThanOrEqual(2);
				expect(new Set(summary.related).size).toBe(summary.related.length);
				for (const key of summary.related) expect(N2_SUMMARY_RELATED[key], key).toBeTruthy();
				for (const [i, row] of summary.rows.entries()) {
					expect(row.form).toBeTruthy();
					for (const value of [...row.meaning, ...row.distinction]) expect(value.length).toBeGreaterThan(2);
					expect(row.distinction[0].length).toBeLessThan(110);
					expect(row.distinction[0]).not.toContain("不符合本题语境");
					const ex = points[i].examples[0];
					expect(ex.jp).toBeTruthy(); expect(ex.cn).toBeTruthy(); expect(ex.en).toBeTruthy();
					total++;
				}
			}
			expect(N2_DAILY_SUMMARIES[`${w}-7`]).toBeUndefined();
		}
		expect(total).toBe(191);
		for (const row of Object.values(N2_SUMMARY_RELATED)) {
			expect(row.level).toMatch(/^N[1-5]$/);
			for (const value of [...row.meaning, ...row.distinction, ...row.example]) expect(value).toBeTruthy();
		}
	});
	it.each(Array.from({ length: 48 }, (_, i) => [Math.floor(i / 6) + 1, i % 6 + 1]))("renders week %i day %i fully expanded in both languages without source links", (week, day) => {
		const points = lesson(week, day).points;
		const props = { week, day, points, onReview: vi.fn() };
		const { container, rerender } = render(<N2GrammarSummary {...props} language="zh" />);
		const summary = N2_DAILY_SUMMARIES[`${week}-${day}`];
		expect(container.querySelectorAll(".grammar-summary__rows article")).toHaveLength(points.length);
		expect(container.querySelectorAll(".grammar-summary__meaning")).toHaveLength(points.length + summary.related.length);
		expect(container.querySelector("details, a[href], .grammar-summary__sources")).toBeNull();
		expect(screen.getByTestId("grammar-summary")).toHaveAttribute("data-level", "N2");
		expect(container).toHaveTextContent(summary.rows[0].meaning[0]);
		fireEvent.click(screen.getAllByRole("button", { name: /回看语法/ })[points.length - 1]);
		expect(props.onReview).toHaveBeenCalledWith(points.length - 1);
		rerender(<N2GrammarSummary {...props} language="en" />);
		expect(container).toHaveTextContent(summary.rows[0].meaning[1]);
		expect(container).toHaveTextContent(n2SummaryExample(points[0].examples[0]).en!);
		expect(container).not.toHaveTextContent("意思：");
		expect(container).not.toHaveTextContent(summary.rows[0].distinction[0]);
	});
	it("omits weekends and unknown days", () => {
		const { container, rerender } = render(<N2GrammarSummary week={8} day={7} points={[]} language="zh" onReview={vi.fn()} />);
		expect(container).toBeEmptyDOMElement();
		rerender(<N2GrammarSummary week={9} day={1} points={[]} language="zh" onReview={vi.fn()} />);
		expect(container).toBeEmptyDOMElement();
	});
});
