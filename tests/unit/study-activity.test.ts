import { describe, expect, it } from "vitest";

import { countsForDays, dayRange, mameMood, streakEndingToday } from "../../app/study/study-activity";
import { jstToday } from "../../app/study/lesson-review";

describe("study activity", () => {
	it("counts Tokyo days and ignores empty timestamps", () => {
		const today = "2026-10-13";
		const days = dayRange(today, 3);
		expect(days).toEqual(["2026-10-11", "2026-10-12", "2026-10-13"]);
		expect(dayRange("2026-03-01", 2)).toEqual(["2026-02-28", "2026-03-01"]);
		const onThe13th = Date.parse("2026-10-12T15:30:00.000Z");
		expect(jstToday(onThe13th)).toBe("2026-10-13");
		const beforeTheWindow = Date.parse("2026-10-09T12:00:00.000Z");
		expect(jstToday(beforeTheWindow)).toBe("2026-10-09");
		expect(countsForDays([0, Number.NaN, onThe13th, onThe13th, beforeTheWindow], days)).toEqual([0, 0, 2]);
	});

	it("picks sleepy, blink, and jump from the recent counts", () => {
		expect(streakEndingToday([1, 0, 2, 3])).toBe(2);
		expect(streakEndingToday([2, 2, 0])).toBe(0);
		expect(mameMood([0, 0, 0])).toBe("sleepy");
		expect(mameMood([0, 0, 1])).toBe("blink");
		expect(mameMood([0, 2, 1])).toBe("jump");
		expect(mameMood([4, 4, 0])).toBe("sleepy");
	});
});
