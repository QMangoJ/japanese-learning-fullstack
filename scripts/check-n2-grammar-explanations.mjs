import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const grammar = JSON.parse(await readFile(resolve(root, "public/data/n2grammar.4e6157570a.json"), "utf8"));
const explanations = JSON.parse(await readFile(resolve(root, "public/data/n2-grammar-explanations.json"), "utf8"));
const daily = JSON.parse(await readFile(resolve(root, "public/data/n2-grammar-daily-explanations.json"), "utf8"));
const days = await readFile(resolve(root, "app/study/days.tsx"), "utf8");
const store = await readFile(resolve(root, "app/study/store.ts"), "utf8");

let examCount = 0;
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
		examCount += extra.length;
	}
}

let dailyCount = 0;
for (const week of grammar.weeks || []) {
	for (const day of week.days || []) {
		if (day.day === 7) continue;
		const expected = (day.exercises?.sections || []).reduce((sum, section) => sum + (section.items || []).length, 0);
		const pack = daily[`w${week.n}d${day.day}`];
		assert.ok(pack, `missing daily pack w${week.n}d${day.day}`);
		assert.equal(pack.items.length, expected, `w${week.n}d${day.day}: count mismatch`);
		for (const item of pack.items) {
			assert.ok(item.answer, `w${week.n}d${day.day} #${item.n}: missing answer`);
			assert.ok(item.translation, `w${week.n}d${day.day} #${item.n}: missing Chinese`);
			assert.ok(item.translation_en, `w${week.n}d${day.day} #${item.n}: missing English`);
		}
		dailyCount += pack.items.length;
	}
}

assert.equal(examCount, 200, "expected 25 questions × 8 weeks");
assert.equal(dailyCount, 338, "expected 338 daily items");
assert.match(store, /n2-grammar-explanations\.json/, "runtime must load N2 exam explanations");
assert.match(store, /n2-grammar-daily-explanations\.json/, "runtime must load N2 daily explanations");
assert.match(days, /MODULE === "n2grammar"/, "N2 pages must use the explanation overlay");

console.log(`Validated ${examCount} N2 weekly-test explanations and ${dailyCount} daily explanations.`);
