import { describe, expect, it } from "vitest";

import { fixedViewportOffset } from "../../app/study/fixed-viewport";

describe("fixed visual viewport positioning", () => {
	it("does not move fixed controls when both viewports match", () => {
		expect(fixedViewportOffset(844, 0, 844)).toBe(0);
	});

	it("moves controls down when the visible viewport grows beyond the fixed layout viewport", () => {
		expect(fixedViewportOffset(844, 0, 664)).toBe(180);
	});

	it("never lifts fixed controls when the visual viewport contracts during scrolling", () => {
		expect(fixedViewportOffset(500, 40, 800)).toBe(0);
		expect(fixedViewportOffset(720, 0, 844)).toBe(0);
	});

	it("rejects invalid layout measurements", () => {
		expect(fixedViewportOffset(500, 0, 0)).toBe(0);
		expect(fixedViewportOffset(Number.NaN, 0, 800)).toBe(0);
	});
});
