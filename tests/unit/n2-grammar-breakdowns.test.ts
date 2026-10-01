import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (path: string) => JSON.parse(readFileSync(resolve(process.cwd(), path), "utf8"));
const book = read("public/data/n2grammar.4e6157570a.json");
const daily = read("public/data/n2-grammar-daily-explanations.json");
const data = read("public/data/n2-grammar-breakdowns.json");
const HAN = /[\u4e00-\u9fff]/u;
const QUESTIONS: Record<number, number> = { 1: 42, 2: 42, 3: 42, 4: 42, 5: 41, 6: 46, 7: 44, 8: 39 };

describe("N2 grammar れい translations", () => {
	it("translates every phrase of every れい note in weeks 1–8", () => {
		expect(data.weeks).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
		let phrases = 0;
		for (const week of book.weeks) {
			let weekPhrases = 0;
			for (const day of week.days)
				for (const point of day.points || [])
					for (const note of point.notes || []) {
						if (note.type !== "れい") continue;
						const parts = note.text.split("／").filter((x: string) => x.trim());
						const cn = data.rei[note.text];
						expect(cn, `w${week.n}d${day.day} ${point.pattern}`).toHaveLength(parts.length);
						expect(note.text_r.split("／").filter((x: string) => x.trim())).toHaveLength(parts.length);
						for (const line of cn) expect(line).toMatch(HAN);
						weekPhrases += parts.length;
					}
			if (week.n === 2) expect(weekPhrases).toBeGreaterThanOrEqual(20);
			phrases += weekPhrases;
		}
		expect(phrases).toBe(178);
	});
});

describe("N2 grammar sentence breakdowns", () => {
	it("gives every practice question a grammar breakdown and valid N3+ glosses", () => {
		for (const week of book.weeks) {
			let questions = 0;
			for (const day of week.days) {
				const key = `w${week.n}d${day.day}`;
				for (const item of daily[key]?.items || []) {
					questions += 1;
					const b = data.questions[key]?.[item.n];
					expect(b, `${key}#${item.n}`).toBeTruthy();
					expect(b.patterns.length).toBeGreaterThan(0);
					expect(b.patterns.length).toBeLessThanOrEqual(4);
					for (const p of b.patterns) {
						expect(p.p.trim()).not.toBe("");
						expect(p.cn).toMatch(HAN);
					}
					expect(b.structure).toMatch(HAN);
					for (const g of b.words) {
						expect(g.w.trim() && g.r.trim() && g.cn.trim(), `${key}#${item.n} ${g.w}`).toBeTruthy();
						expect(g.r).toMatch(/^[\u3040-\u30ffー]+$/u);
						expect(g.lv).toMatch(/^N[123]$/);
					}
				}
			}
			expect(questions, `week ${week.n}`).toBe(QUESTIONS[week.n]);
		}
	});
});
