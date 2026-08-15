import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const grammar = JSON.parse(await readFile(resolve(root, "public/data/grammar.d15be04258.json"), "utf8"));
const explanations = JSON.parse(await readFile(resolve(root, "public/data/n3-grammar-daily-explanations.json"), "utf8"));
const store = await readFile(resolve(root, "app/study/store.ts"), "utf8");
const days = await readFile(resolve(root, "app/study/days.tsx"), "utf8");

let dayCount = 0;
let itemCount = 0;
for (const week of grammar.weeks || []) {
	for (const day of (week.days || []).filter((entry) => entry.day < 7)) {
		dayCount += 1;
		const key = `w${week.n}d${day.day}`;
		const sourceItems = (day.exercises?.sections || []).flatMap((section) =>
			(section.items || []).map((item) => ({ n: item.n, type: section.type })),
		);
		const generatedItems = explanations[key]?.items;
		assert.ok(Array.isArray(generatedItems), `${key}: missing explanation group`);
		assert.equal(generatedItems.length, sourceItems.length, `${key}: item count mismatch`);
		generatedItems.forEach((item, index) => {
			const source = sourceItems[index];
			assert.equal(item.n, source.n, `${key} #${source.n}: number mismatch`);
			assert.equal(item.type, source.type, `${key} #${source.n}: type mismatch`);
			assert.ok(item.answer, `${key} #${source.n}: missing answer`);
			assert.ok(item.completed, `${key} #${source.n}: missing completed sentence`);
			assert.ok(item.translation, `${key} #${source.n}: missing translation`);
			assert.match(item.translation, /[\u3400-\u9fff]/, `${key} #${source.n}: translation is not Chinese`);
			assert.ok(!item.completed.includes("＿＿"), `${key} #${source.n}: unresolved blank`);
			assert.ok(!/[（(]a\./.test(item.completed), `${key} #${source.n}: unresolved choice`);
			if (item.type === "choice") {
				assert.match(item.answer, /^(?:a|b|ab)(?:、(?:a|b|ab))*$/, `${key} #${source.n}: invalid choice answer`);
				assert.ok(Array.isArray(item.choices) && item.choices.length, `${key} #${source.n}: missing choice alternatives`);
			} else {
				assert.match(item.answer, /^[1-4](?:→[1-4]){3}$/, `${key} #${source.n}: invalid order answer`);
			}
			assert.ok(Array.isArray(item.pointIndexes) && item.pointIndexes.length, `${key} #${source.n}: missing point link`);
			for (const pointIndex of item.pointIndexes) {
				assert.ok(day.points?.[pointIndex], `${key} #${source.n}: invalid point link ${pointIndex}`);
			}
		});
		itemCount += generatedItems.length;
	}
}

assert.equal(dayCount, 36, "expected all 36 N3 daily grammar exercise pages");
assert.equal(itemCount, 250, "expected all 250 N3 daily grammar questions");
assert.match(explanations.w2d1.items[3].translation, /^林同学/, "リンさん must not be mistranslated as 小林");
assert.match(explanations.w6d6.items[0].translation, /ID 编号/, "ID番号 must stay generic");
assert.match(store, /n3-grammar-daily-explanations\.json/, "runtime must load the generated explanations");
assert.match(days, /DailyExercisePanels/, "runtime must render the daily translation and analysis controls");
assert.match(days, /MODULE === "grammar" && G\.daily_explanations/, "N3 explanations must not leak into N2 or N4 pages");

console.log(`Validated ${dayCount} days and ${itemCount} daily grammar explanations.`);
