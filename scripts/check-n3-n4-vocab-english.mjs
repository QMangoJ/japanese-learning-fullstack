import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");

function missing(book) {
	const holes = [];
	for (const week of book.weeks || []) {
		for (const day of week.days || []) {
			for (const section of day.sections || []) {
				for (const item of section.items || []) {
					if (item.jp && !item.en) holes.push(`${week.n}-${day.day} ${item.jp}`);
				}
			}
		}
	}
	return holes;
}

const n3 = JSON.parse(await readFile(resolve(root, "public/data/vocab.856eb48e32.json"), "utf8"));
const n4 = JSON.parse(await readFile(resolve(root, "public/data/n4vocab.026f711eb7.json"), "utf8"));
const n3Holes = missing(n3);
const n4Holes = missing(n4);
assert.equal(n3Holes.length, 0, `N3 vocab missing English: ${n3Holes.slice(0, 5).join("; ")}`);
assert.equal(n4Holes.length, 0, `N4 vocab missing English: ${n4Holes.slice(0, 5).join("; ")}`);
console.log("N3 and N4 vocabulary English coverage passed.");
