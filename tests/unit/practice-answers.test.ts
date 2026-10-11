import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { parsePracticeAnswers } from "../../app/study/practice-answers";

const dir = resolve(__dirname, "../../public/data");
const books = readdirSync(dir).filter((f) => /^(n[124])?(vocab|kanji)\.[0-9a-f]+\.json$/.test(f));

describe("vocab/kanji れんしゅう answers", () => {
	it("covers all levels", () => expect(books.length).toBe(8));
	for (const f of books) {
		it(`${f}: every practice question has an answer`, () => {
			const data = JSON.parse(readFileSync(resolve(dir, f), "utf8"));
			const missing: string[] = [];
			for (const w of data.weeks)
				for (const day of w.days || []) {
					const ex = day.exercises;
					if (!ex) continue;
					const map = parsePracticeAnswers(ex.answers, ex.sections);
					for (const s of ex.sections || [])
						for (const item of s.items || [])
							if (!map.get(String(item.n))) missing.push(`w${day.week}d${day.day}#${item.n}`);
				}
			expect(missing).toEqual([]);
		});
	}
	it("N2 W1D4 matches book key", () => {
		const data = JSON.parse(readFileSync(resolve(dir, books.find((b) => b.startsWith("n2vocab"))!), "utf8"));
		const ex = data.weeks[0].days[3].exercises;
		const m = parsePracticeAnswers(ex.answers, ex.sections);
		expect([1, 2, 3, 4].map((n) => m.get(String(n)))).toEqual(["b", "b", "a", "b"]);
	});
});
