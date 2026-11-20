import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { N2_NATIVE_USAGE } from "../../app/data/n2-native-usage";
import { N2_DAILY_SUMMARIES } from "../../app/data/n2-daily-summaries";

const book = JSON.parse(readFileSync("public/data/n2grammar.4e6157570a.json", "utf8"));
const CODE: Record<string, string> = { everyday: "e", common: "c", situational: "s", formal: "f" };

describe("N2 native-usage markers", () => {
	it("covers every teaching day with one valid code per grammar point", () => {
		let total = 0;
		for (const w of book.weeks) {
			for (const day of w.days) {
				if (!day.points) continue;
				const codes = N2_NATIVE_USAGE[`${day.week}-${day.day}`];
				expect(codes, `w${day.week}d${day.day}`).toBeDefined();
				expect(codes).toHaveLength(day.points.length);
				expect(codes).toMatch(/^[ecsf]+$/);
				total += day.points.length;
			}
		}
		expect(total).toBe(191);
		expect(Object.keys(N2_NATIVE_USAGE)).toHaveLength(48);
	});

	it("matches the usage ratings authored in the daily summaries", () => {
		for (const [key, summary] of Object.entries(N2_DAILY_SUMMARIES)) {
			const expected = summary.rows.map((r) => CODE[r.usage]).join("");
			expect(N2_NATIVE_USAGE[key], key).toBe(expected);
		}
	});
});
