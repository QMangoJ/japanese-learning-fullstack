import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (path: string) => JSON.parse(readFileSync(resolve(process.cwd(), path), "utf8"));
const book = read("public/data/n2grammar.4e6157570a.json");
const data = read("public/data/n2-grammar-similar.json");
const source = read("scripts/n2-grammar-similar.json");
const HAN = /[\u4e00-\u9fff]/u;
const KANA = /[\u3040-\u30ff]/u;
const patternAt = (w: number, d: number, i: number) => book.weeks.find((x: any) => x.n === w)?.days.find((x: any) => x.day === d)?.points?.[i]?.pattern;

describe("N2 grammar same-level (N2) items in 相似表达", () => {
	it("links real N2 points from other days, at most 2 per grammar point, each with a distinction and example", () => {
		expect(data.weeks).toEqual([2, 3]);
		const perPoint: Record<string, number> = {};
		const counts: Record<number, number> = { 2: 0, 3: 0 };
		for (const [key, list] of Object.entries<any[]>(data.days)) {
			const [, w, d] = /^w(\d+)d(\d+)$/.exec(key)!.map(Number);
			for (const e of list) {
				expect(patternAt(w, d, e.point), `${key}#${e.point}`).toBeTruthy();
				expect(patternAt(e.ref[0], e.ref[1], e.ref[2])).toBeTruthy();
				expect(e.ref[0] === w && e.ref[1] === d).toBe(false);
				expect(e.form).toMatch(KANA);
				expect(e.against).toMatch(KANA);
				expect(e.meaning).toMatch(HAN);
				expect(e.diff).toMatch(HAN);
				expect(e.example.jp).toMatch(KANA);
				expect(e.example.cn).toMatch(HAN);
				const id = `${key}#${e.point}`;
				perPoint[id] = (perPoint[id] || 0) + 1;
				expect(perPoint[id]).toBeLessThanOrEqual(2);
				counts[w] += 1;
			}
		}
		expect(counts).toEqual({ 2: 11, 3: 11 });
	});

	it("has no duplicate pairs and shows cross-week pairs on both sides", () => {
		const keys = source.pairs.map((p: any) => [p.a, p.b].sort().join("|"));
		expect(new Set(keys).size).toBe(keys.length);
		for (const p of source.pairs)
			for (const [self, other] of [[p.a, p.b], [p.b, p.a]]) {
				const [w, d, i] = self.split("-").map(Number);
				if (!data.weeks.includes(w)) continue;
				expect(data.days[`w${w}d${d}`].some((e: any) => e.point === i && e.ref.join("-") === other)).toBe(true);
			}
	});
});
