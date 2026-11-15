import { describe, expect, it } from "vitest";

import { itlSeekTarget } from "../../app/study/ItListeningPage";

describe("itlSeekTarget (keyboard ←/→ seek ±2s)", () => {
	it("moves forward and backward by the delta", () => {
		expect(itlSeekTarget(10, 2)).toBe(12);
		expect(itlSeekTarget(10, -2)).toBe(8);
	});

	it("clamps at 0 when rewinding past the start", () => {
		expect(itlSeekTarget(1, -2)).toBe(0);
		expect(itlSeekTarget(0, -2)).toBe(0);
	});

	it("clamps at the duration when known", () => {
		expect(itlSeekTarget(99, 2, 100)).toBe(100);
		expect(itlSeekTarget(50, 2, 100)).toBe(52);
	});

	it("does not clamp above without a duration", () => {
		expect(itlSeekTarget(9999, 2)).toBe(10001);
	});
});
