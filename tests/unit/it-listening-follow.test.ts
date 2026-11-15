import { describe, expect, it } from "vitest";

import { itlActiveIndex } from "../../app/study/ItListeningPage";
import unit1 from "../../public/data/it-listening/line-frontend-family-unit1.json";

describe("itlActiveIndex (follow-highlight current sentence)", () => {
	const starts = [3.0, 10.9, 11.7, 64.6, 74.2];

	it("returns -1 before the first sentence starts", () => {
		expect(itlActiveIndex(starts, 0)).toBe(-1);
		expect(itlActiveIndex(starts, 2.9)).toBe(-1);
	});

	it("returns the last sentence whose startSec <= t", () => {
		expect(itlActiveIndex(starts, 3.0)).toBe(0);
		expect(itlActiveIndex(starts, 10.8)).toBe(0);
		expect(itlActiveIndex(starts, 10.9)).toBe(1);
		expect(itlActiveIndex(starts, 70)).toBe(3);
		expect(itlActiveIndex(starts, 9999)).toBe(4);
	});

	it("skips sentences without timing data", () => {
		expect(itlActiveIndex([undefined, 5, undefined, 9], 7)).toBe(1);
		expect(itlActiveIndex([undefined, undefined], 7)).toBe(-1);
		expect(itlActiveIndex([], 7)).toBe(-1);
	});
});

describe("line-frontend-family-unit1 startSec data", () => {
	const secs = unit1.sentences.map((s) => (s as { startSec?: number }).startSec);

	it("every sentence carries a startSec", () => {
		expect(secs.every((v) => typeof v === "number")).toBe(true);
	});

	it("is monotonic non-decreasing and inside the video duration", () => {
		for (let i = 1; i < secs.length; i++) expect(secs[i]!).toBeGreaterThanOrEqual(secs[i - 1]!);
		expect(secs[0]!).toBeGreaterThanOrEqual(0);
		// source video _uaUAr42CkU runs 22:01 = 1321s; unit 1 covers its first ~6:40
		expect(secs[secs.length - 1]!).toBeLessThanOrEqual(1321);
	});
});
