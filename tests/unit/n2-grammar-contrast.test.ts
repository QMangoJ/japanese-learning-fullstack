import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { buildN2GrammarContrast, n2GrammarContrastGroupCount } from "../../app/data/n2-grammar-contrast";

const grammar = JSON.parse(
	readFileSync(resolve(process.cwd(), "public/data/n2grammar.4e6157570a.json"), "utf8"),
);

describe("N2 grammar contrast summary", () => {
	it("builds every curated family from real N2 lesson points", () => {
		const contrast = buildN2GrammarContrast(grammar);
		expect(contrast.groups).toHaveLength(n2GrammarContrastGroupCount);
		expect(n2GrammarContrastGroupCount).toBe(23);
		for (const group of contrast.groups) {
			expect(group.title).toBeTruthy();
			expect(group.tip).toBeTruthy();
			expect(group.rows.length).toBeGreaterThanOrEqual(4);
			for (const row of group.rows) {
				expect(row.form).toBeTruthy();
				expect(row.mean).toBeTruthy();
				expect(row.eg).toBeTruthy();
				expect(row.eg_cn).toBeTruthy();
				expect(row.locHash).toMatch(/^#\/day\/\d+-\d+\/p\d+$/);
			}
		}
	});

	it("provides answerable contrast quizzes for every family", () => {
		const contrast = buildN2GrammarContrast(grammar);
		for (const group of contrast.groups) {
			expect(group.quiz.items.length).toBeGreaterThanOrEqual(3);
			expect(group.quiz.answers).toMatch(/^①[1-4]/);
			for (const item of group.quiz.items) {
				expect(item.opts).toHaveLength(4);
				expect(item.note).toBeTruthy();
			}
		}
	});
});
