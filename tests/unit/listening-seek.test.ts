import { describe, expect, it } from "vitest";

import { audioDurationOf, forwardTime, rewindTime, seekRatioFromClientX } from "../../app/routes/listening-n3";

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

	it("rewinds three seconds without passing the beginning", () => {
		expect(rewindTime(18)).toBe(15);
		expect(rewindTime(2)).toBe(0);
		expect(rewindTime(10, 5)).toBe(5);
	});

	it("moves forward three seconds without passing the end", () => {
		expect(forwardTime(18, 30)).toBe(21);
		expect(forwardTime(29, 30)).toBe(30);
		expect(forwardTime(10, 0)).toBe(13);
	});
});
