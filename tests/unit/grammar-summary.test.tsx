import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { COMPLETION_COMPARISON, N3_DAILY_SUMMARIES } from "../../app/data/n3-daily-summaries";
import { N3_RELATED_GRAMMAR } from "../../app/data/n3-related-grammar";
import { GrammarSummary } from "../../app/study/grammar-summary";
import { DayPage } from "../../app/study/days";
import { G, G2, G4, resetStudyStateForTests, setModule } from "../../app/study/store";

const grammar = JSON.parse(readFileSync(resolve("public/data/grammar.d15be04258.json"), "utf8"));
const lesson = (w: number, d: number) => grammar.weeks.find((week: any) => week.n === w).days.find((day: any) => day.day === d);

describe("N3 daily grammar summaries", () => {
	beforeEach(() => resetStudyStateForTests());
	it("adds bilingual, graded comparisons with examples to every daily lesson only", () => {
		expect(Object.keys(N3_RELATED_GRAMMAR).sort()).toEqual(Object.keys(N3_DAILY_SUMMARIES).sort());
		const levels = new Set<string>();
		for (const group of Object.values(N3_RELATED_GRAMMAR)) {
			expect(group.title.every(Boolean)).toBe(true);
			expect(group.tip.every(Boolean)).toBe(true);
			expect(group.rows.length).toBeGreaterThanOrEqual(2);
			expect(new Set(group.rows.map(row => row[0])).size).toBe(group.rows.length);
			for (const row of group.rows) {
				expect(row).toHaveLength(9);
				expect(row.every(Boolean)).toBe(true);
				expect(row[1]).toMatch(/^N[1-5]$/);
				expect(row[4].length).toBeLessThan(125);
				expect(row[5]).toMatch(/[a-zA-Z]/);
				expect(row[6]).toMatch(/[ぁ-んァ-ヶ]/);
				expect(row[8]).toMatch(/[a-zA-Z]/);
				levels.add(row[1]);
			}
		}
		expect([...levels].sort()).toEqual(["N1", "N2", "N3", "N4", "N5"]);
	});
	it("shows non-textbook scope, deadline and location comparisons fully expanded in both languages", () => {
		const props = { week: 5, day: 4, points: lesson(5, 4).points, onReview: vi.fn() };
		const { rerender } = render(<GrammarSummary {...props} language="zh" />);
		const related = screen.getByTestId("grammar-related");
		expect(related.querySelectorAll("article")).toHaveLength(6);
		expect(related.querySelector("details")).toBeNull();
		expect(related).toHaveTextContent("～にわたって");
		expect(related).toHaveTextContent("N2 · 参考");
		expect(related).toHaveTextContent("请最迟在星期五提交。");
		rerender(<GrammarSummary {...props} language="en" />);
		expect(related).toHaveTextContent("Please submit it by Friday.");
		expect(related).not.toHaveTextContent("请最迟在星期五提交。");
		expect(related).not.toHaveTextContent("时间");
		expect(related).not.toHaveTextContent("普通形");
	});
	it("covers all 36 daily lessons and each source point, without week-end summaries", () => {
		expect(Object.keys(N3_DAILY_SUMMARIES)).toHaveLength(36);
		for (let w = 1; w <= 6; w++) {
			for (let d = 1; d <= 6; d++) {
				const summary = N3_DAILY_SUMMARIES[`${w}-${d}`];
				expect(summary.title.every(Boolean)).toBe(true);
				expect(summary.tip.every(Boolean)).toBe(true);
				expect(summary.rows).toHaveLength(lesson(w, d).points.length);
				for (const [index, row] of summary.rows.entries()) {
					expect(row.every(Boolean)).toBe(true);
					expect(row[2].length).toBeLessThan(125);
					expect(row[3]).toMatch(/[a-zA-Z]/);
					const ex = lesson(w, d).points[index].examples[0];
					expect(ex.jp).toBeTruthy();
					expect(ex.cn).toBeTruthy();
					expect(ex.en).toBeTruthy();
				}
			}
			expect(N3_DAILY_SUMMARIES[`${w}-7`]).toBeUndefined();
		}
	});
	it("renders concise comparisons, source examples and exact review targets", () => {
		const onReview = vi.fn();
		render(<GrammarSummary week={5} day={2} points={lesson(5, 2).points} language="zh" onReview={onReview} />);
		expect(screen.getByRole("heading", { name: "语法总结" })).toBeInTheDocument();
		expect(screen.getAllByText("N3 · 本课")).toHaveLength(4);
		const example = screen.getByTestId("grammar-summary").querySelector(".grammar-summary__example-body")!;
		expect(example).toBeVisible();
		expect(screen.getByTestId("grammar-summary").querySelector("details")).toBeNull();
		expect(example.querySelector("ruby")).not.toBeNull();
		expect(example).toHaveTextContent(lesson(5, 2).points[0].examples[0].cn);
		fireEvent.click(screen.getAllByRole("button", { name: /回看语法/ })[2]);
		expect(onReview).toHaveBeenCalledWith(2);
		expect(COMPLETION_COMPARISON).toHaveLength(6);
		expect(screen.getByText("横向对比：其他“完成”表达")).toBeInTheDocument();
	});
	it("switches summary prose and examples to English without duplicating Chinese", () => {
		const props = { week: 2, day: 5, points: lesson(2, 5).points, onReview: vi.fn() };
		const { rerender } = render(<GrammarSummary {...props} language="zh" />);
		rerender(<GrammarSummary {...props} language="en" />);
		expect(screen.getByRole("heading", { name: "Grammar summary" })).toBeInTheDocument();
		expect(screen.queryByText(N3_DAILY_SUMMARIES["2-5"].tip[0])).not.toBeInTheDocument();
		expect(screen.getByText(N3_DAILY_SUMMARIES["2-5"].tip[1])).toBeInTheDocument();
		expect(screen.getByText(lesson(2, 5).points[0].examples[0].en)).toBeInTheDocument();
		expect(screen.queryByText("横向对比：其他“完成”表达")).not.toBeInTheDocument();
	});
	it("renders nothing on test days or unknown lessons", () => {
		const { container, rerender } = render(<GrammarSummary week={1} day={7} points={[]} language="en" onReview={vi.fn()} />);
		expect(container).toBeEmptyDOMElement();
		rerender(<GrammarSummary week={99} day={1} points={[]} language="en" onReview={vi.fn()} />);
		expect(container).toBeEmptyDOMElement();
	});
	it.each(["grammar", "n2grammar", "n4grammar"] as const)("restricts the day-page integration correctly for %s", (module) => {
		G.weeks = grammar.weeks;
		G2.weeks = JSON.parse(readFileSync(resolve("public/data/n2grammar.4e6157570a.json"), "utf8")).weeks;
		G4.weeks = grammar.weeks;
		setModule(module);
		render(<DayPage w={5} d={2} token={null} />);
		expect(screen.queryAllByTestId("grammar-summary")).toHaveLength(module === "n4grammar" ? 0 : 1);
	});
});
