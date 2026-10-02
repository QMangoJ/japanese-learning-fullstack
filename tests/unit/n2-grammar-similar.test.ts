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

describe("N2 grammar 同级相似（N2）", () => {
	it("only links real N2 points, with a Chinese distinction and an example on each side", () => {
		expect(data.weeks).toEqual([2, 3]);
		const counts: Record<number, { points: number; entries: number }> = { 2: { points: 0, entries: 0 }, 3: { points: 0, entries: 0 } };
		for (const [key, byPoint] of Object.entries<Record<string, any[]>>(data.points)) {
			const [, w, d] = /^w(\d+)d(\d+)$/.exec(key)!.map(Number);
			for (const [index, list] of Object.entries(byPoint)) {
				expect(patternAt(w, d, +index), `${key}#${index}`).toBeTruthy();
				counts[w].points += 1;
				for (const e of list) {
					expect(patternAt(e.ref[0], e.ref[1], e.ref[2])).toBe(e.pattern);
					expect(e.ref.join("-")).not.toBe(`${w}-${d}-${index}`);
					expect(e.diff).toMatch(HAN);
					for (const ex of [e.self, e.other]) {
						expect(ex.jp).toMatch(KANA);
						expect(ex.cn).toMatch(HAN);
					}
					counts[w].entries += 1;
				}
			}
		}
		expect(counts).toEqual({ 2: { points: 23, entries: 40 }, 3: { points: 23, entries: 32 } });
	});

	it("shows every pair on both sides when both points are in weeks 2–3, with no duplicates", () => {
		const keys = source.pairs.map((p: any) => [p.a, p.b].sort().join("|"));
		expect(new Set(keys).size).toBe(keys.length);
		for (const p of source.pairs) {
			const [w, d, i] = p.a.split("-").map(Number);
			expect(data.points[`w${w}d${d}`][i].some((e: any) => e.ref.join("-") === p.b)).toBe(true);
			const [bw, bd, bi] = p.b.split("-").map(Number);
			if (data.weeks.includes(bw)) expect(data.points[`w${bw}d${bd}`][bi].some((e: any) => e.ref.join("-") === p.a)).toBe(true);
		}
	});
});
