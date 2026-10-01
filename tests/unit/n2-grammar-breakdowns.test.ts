import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (path: string) => JSON.parse(readFileSync(resolve(process.cwd(), path), "utf8"));
const book = read("public/data/n2grammar.4e6157570a.json");
const daily = read("public/data/n2-grammar-daily-explanations.json");
const data = read("public/data/n2-grammar-breakdowns.json");
const HAN = /[\u4e00-\u9fff]/u;
const week2 = book.weeks.find((w: { n: number }) => w.n === 2).days;

describe("N2 grammar week 2 れい translations", () => {
	it("translates every phrase of every れい note", () => {
		let phrases = 0;
		for (const day of week2)
			for (const point of day.points || [])
				for (const note of point.notes || []) {
					if (note.type !== "れい") continue;
					const parts = note.text.split("／").filter((x: string) => x.trim());
					const cn = data.rei[note.text];
					expect(cn, `${day.day} ${point.pattern}`).toHaveLength(parts.length);
					expect(note.text_r.split("／").filter((x: string) => x.trim())).toHaveLength(parts.length);
					for (const line of cn) expect(line).toMatch(HAN);
					phrases += parts.length;
				}
		expect(phrases).toBeGreaterThanOrEqual(20);
	});
});

describe("N2 grammar week 2 sentence breakdowns", () => {
	it("gives every practice question a grammar breakdown and valid N3+ glosses", () => {
		let questions = 0;
		for (const day of week2) {
			const key = `w2d${day.day}`;
			for (const item of daily[key]?.items || []) {
				questions += 1;
				const b = data.questions[key]?.[item.n];
				expect(b, `${key}#${item.n}`).toBeTruthy();
				expect(b.patterns.length).toBeGreaterThan(0);
				for (const p of b.patterns) {
					expect(p.p.trim()).not.toBe("");
					expect(p.cn).toMatch(HAN);
				}
				expect(b.structure).toMatch(HAN);
				for (const g of b.words) {
					expect(g.w.trim() && g.r.trim() && g.cn.trim(), `${key}#${item.n} ${g.w}`).toBeTruthy();
					expect(g.lv).toMatch(/^N[123]$/);
				}
			}
		}
		expect(questions).toBe(42);
	});
});
