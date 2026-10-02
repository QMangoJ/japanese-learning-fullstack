import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (path: string) => JSON.parse(readFileSync(resolve(process.cwd(), path), "utf8"));
const book = read("public/data/n2grammar.4e6157570a.json");
const data = read("public/data/n2-grammar-composition.json");
const HAN = /[\u4e00-\u9fff]/u;
const KANA = /[\u3040-\u30ff]/u;

describe("N2 grammar 造句练习", () => {
	it("covers every grammar point of weeks 1–8 with 1–2 prompts that use the target grammar", () => {
		expect(data.weeks).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
		const counts: Record<number, { points: number; prompts: number }> = {};
		for (const week of book.weeks.filter((w: any) => data.weeks.includes(w.n))) {
			const c = (counts[week.n] = { points: 0, prompts: 0 });
			for (const day of week.days)
				(day.points || []).forEach((point: any, i: number) => {
					const list = data.points[`w${week.n}d${day.day}`]?.[i];
					expect(list, `w${week.n}d${day.day}#${i} ${point.pattern}`).toBeTruthy();
					expect(list.length).toBeGreaterThanOrEqual(1);
					expect(list.length).toBeLessThanOrEqual(2);
					for (const p of list) {
						expect(p.cn).toMatch(HAN);
						expect(p.jp).toMatch(KANA);
						expect(p.use.length).toBeGreaterThan(0);
						expect(p.jp).toContain(p.use);
						for (const g of p.words) {
							expect(g.w && g.r && g.cn).toBeTruthy();
							expect(g.lv).toMatch(/^N[123]$/);
						}
					}
					c.points += 1;
					c.prompts += list.length;
				});
		}
		expect(counts).toEqual({
			1: { points: 24, prompts: 48 },
			2: { points: 24, prompts: 48 },
			3: { points: 23, prompts: 46 },
			4: { points: 24, prompts: 48 },
			5: { points: 24, prompts: 48 },
			6: { points: 24, prompts: 48 },
			7: { points: 24, prompts: 48 },
			8: { points: 24, prompts: 48 },
		});
	});
});
