import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const book = JSON.parse(await readFile(resolve(root, "public/data/n2grammar.4e6157570a.json"), "utf8"));

let points = 0;
let missingUsage = 0;
let examples = 0;
let missingEx = 0;
const holes = [];
for (const week of book.weeks || []) {
	for (const day of week.days || []) {
		for (const point of day.points || []) {
			points += 1;
			if (!point.usage_en) {
				missingUsage += 1;
				holes.push(`w${week.n}d${day.day} ${point.pattern}`);
			}
			for (const ex of point.examples || []) {
				examples += 1;
				if (!ex.en) {
					missingEx += 1;
					if (holes.length < 20) holes.push(`w${week.n}d${day.day} ex ${ex.jp}`);
				}
			}
		}
	}
}

assert.equal(points, 191, "expected 191 N2 grammar points");
assert.equal(examples, 417, "expected 417 N2 examples");
assert.equal(missingUsage, 0, `missing usage_en: ${holes.join("; ")}`);
assert.equal(missingEx, 0, `missing example en: ${holes.join("; ")}`);

console.log(`N2 grammar English coverage passed: ${points} points, ${examples} examples.`);
