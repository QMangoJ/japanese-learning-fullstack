import { describe, expect, it } from "vitest";

import { fixedViewportOffset } from "../../app/study/fixed-viewport";

describe("fixed visual viewport positioning", () => {
	it("does not move fixed controls when both viewports match", () => {
		expect(fixedViewportOffset(844, 0, 844, 844)).toBe(0);
	});

	it("corrects a real gap below the native fixed bottom edge", () => {
		expect(fixedViewportOffset(844, 0, 664, 844)).toBe(180);
		expect(fixedViewportOffset(844, 0, 844, 844)).toBe(0);
	});

	it("does not add an overscroll offset when native bottom positioning is already correct", () => {
		expect(fixedViewportOffset(844, 80, 844, 844)).toBe(0);
		expect(fixedViewportOffset(892, 0, 844, 844)).toBe(0);
		expect(fixedViewportOffset(844, -40, 844, 844)).toBe(0);
	});

	it("bounds corrections by the actual window rather than inflated viewport metrics", () => {
		expect(fixedViewportOffset(844, 80, 700, 844)).toBe(144);
		expect(fixedViewportOffset(900, 80, 700, 844)).toBe(144);
	});

	it("never lifts fixed controls when the visual viewport contracts during scrolling", () => {
		expect(fixedViewportOffset(500, 40, 800, 800)).toBe(0);
		expect(fixedViewportOffset(720, 0, 844, 844)).toBe(0);
		expect(fixedViewportOffset(500, 344, 844, 844)).toBe(0);
	});

	it("clears stale corrections as the browser catches up after resize or keyboard dismissal", () => {
		const sequence = [
			fixedViewportOffset(844, 0, 780, 844),
			fixedViewportOffset(844, 0, 844, 844),
			fixedViewportOffset(500, 0, 844, 844),
			fixedViewportOffset(844, 40, 844, 844),
		];
		expect(sequence).toEqual([64, 0, 0, 0]);
	});

	it("rejects invalid layout measurements", () => {
		expect(fixedViewportOffset(500, 0, 0, 800)).toBe(0);
		expect(fixedViewportOffset(Number.NaN, 0, 800, 800)).toBe(0);
		expect(fixedViewportOffset(844, Infinity, 800, 844)).toBe(0);
		expect(fixedViewportOffset(844, 0, 800, 0)).toBe(0);
		expect(fixedViewportOffset(-1, 0, 800, 844)).toBe(0);
	});
});
