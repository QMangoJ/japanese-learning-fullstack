import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const grammar = JSON.parse(await readFile(resolve(root, "public/data/n4grammar.40e138ccdb.json"), "utf8"));
const explanations = JSON.parse(await readFile(resolve(root, "public/data/n4-grammar-explanations.json"), "utf8"));
const days = await readFile(resolve(root, "app/study/days.tsx"), "utf8");
const store = await readFile(resolve(root, "app/study/store.ts"), "utf8");

let itemCount = 0;
for (const week of grammar.weeks || []) {
	const day = (week.days || []).find((entry) => entry.day === 7);
	assert.ok(day, `week ${week.n}: missing exam day`);
	const pack = explanations[`w${week.n}`];
	assert.ok(pack, `w${week.n}: missing explanation pack`);
	for (const section of ["mondai1", "mondai2", "mondai3"]) {
		const source = day[section]?.items || [];
		const extra = pack[section] || [];
		assert.equal(extra.length, source.length, `w${week.n} ${section}: count mismatch`);
		extra.forEach((item, index) => {
			assert.equal(item.n, source[index].n, `w${week.n} ${section} #${source[index].n}: number mismatch`);
			assert.ok(item.ans, `w${week.n} #${item.n}: missing answer`);
			assert.ok(item.trans, `w${week.n} #${item.n}: missing Chinese gloss`);
			assert.ok(item.trans_en, `w${week.n} #${item.n}: missing English gloss`);
			assert.match(String(item.trans), /[\u3400-\u9fff]/, `w${week.n} #${item.n}: Chinese gloss is not Chinese`);
			assert.match(String(item.trans_en), /[A-Za-z]{3,}/, `w${week.n} #${item.n}: English gloss is too short`);
			assert.ok(item.point, `w${week.n} #${item.n}: missing point`);
			assert.ok(item.point_en, `w${week.n} #${item.n}: missing English point`);
		});
		itemCount += extra.length;
	}
}

assert.equal(itemCount, 72, "expected 18 questions × 4 weeks");
assert.match(store, /n4-grammar-explanations\.json/, "runtime must load N4 exam explanations");
assert.match(days, /MODULE === "n4grammar"/, "N4 exam pages must use the explanation overlay");

console.log(`Validated ${itemCount} N4 weekly-test explanations.`);
