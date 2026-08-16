import { describe, expect, it } from "vitest";

import { audioDurationOf, seekRatioFromClientX } from "../../app/routes/listening-n3";

function fakeSeekable(end: number): TimeRanges {
	return {
		length: end > 0 ? 1 : 0,
		start: () => 0,
		end: () => end,
	} as TimeRanges;
}

describe("listening seek helpers", () => {
	it("maps a click on the bar to a 0–1 ratio", () => {
		expect(seekRatioFromClientX(25, { left: 0, width: 100 })).toBe(0.25);
		expect(seekRatioFromClientX(0, { left: 10, width: 80 })).toBe(0);
		expect(seekRatioFromClientX(200, { left: 10, width: 80 })).toBe(1);
		expect(seekRatioFromClientX(10, { left: 10, width: 0 })).toBe(0);
	});

	it("prefers a finite duration and falls back to seekable end", () => {
		expect(audioDurationOf({ duration: 32.5, seekable: fakeSeekable(0) })).toBe(32.5);
		expect(audioDurationOf({ duration: Number.POSITIVE_INFINITY, seekable: fakeSeekable(18) })).toBe(18);
		expect(audioDurationOf({ duration: Number.NaN, seekable: fakeSeekable(0) })).toBe(0);
	});
});
