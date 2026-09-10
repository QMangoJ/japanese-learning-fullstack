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
			assert.equal(item.why?.length, source[index].opts.length, `w${week.n} #${item.n}: why count`);
			assert.equal(item.why_en?.length, source[index].opts.length, `w${week.n} #${item.n}: why_en count`);
			item.why.forEach((text, option) => {
				assert.match(String(text), /[\u3400-\u9fff]/, `w${week.n} #${item.n} why ${option + 1}: missing Chinese`);
				assert.doesNotMatch(String(text), /放入本句后，接续、活用形式或语义不符合题意|接续和句意都成立/, `w${week.n} #${item.n} why ${option + 1}: generic filler`);
			});
			item.why_en.forEach((text, option) => {
				assert.match(String(text), /[A-Za-z]{3,}/, `w${week.n} #${item.n} why_en ${option + 1}: missing English`);
				assert.doesNotMatch(String(text), /does not fit the sentence/i, `w${week.n} #${item.n} why_en ${option + 1}: generic filler`);
			});
		});
		examCount += extra.length;
	}
}

let dailyCount = 0;
for (const week of grammar.weeks || []) {
	for (const day of week.days || []) {
		if (day.day === 7) continue;
		const sourceItems = (day.exercises?.sections || []).flatMap((section) => section.items || []);
		const expected = sourceItems.length;
		const pack = daily[`w${week.n}d${day.day}`];
		assert.ok(pack, `missing daily pack w${week.n}d${day.day}`);
		assert.equal(pack.items.length, expected, `w${week.n}d${day.day}: count mismatch`);
		for (const [index, item] of pack.items.entries()) {
			assert.ok(item.answer, `w${week.n}d${day.day} #${item.n}: missing answer`);
			assert.ok(item.translation, `w${week.n}d${day.day} #${item.n}: missing Chinese`);
			assert.ok(item.translation_en, `w${week.n}d${day.day} #${item.n}: missing English`);
			if (sourceItems[index]?.options?.length) {
				assert.ok(!/[（(]\s*[　 ]*\s*[）)]/.test(item.completed), `w${week.n}d${day.day} #${item.n}: unresolved numbered-choice blank`);
			}
		}
		dailyCount += pack.items.length;
	}
}

const circled = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕";
for (const week of grammar.weeks || []) {
	const day = (week.days || []).find((entry) => entry.day === 7);
	const book = {};
	for (const match of String(day.answers || "").matchAll(/([①-㉕])\s*([1-4])/g)) {
		book[circled.indexOf(match[1]) + 1] = Number(match[2]);
	}
	const pack = explanations[`w${week.n}`];
	for (const section of ["mondai1", "mondai2", "mondai3"]) {
		for (const item of pack[section] || []) {
			if (book[item.n]) assert.equal(item.ans, book[item.n], `w${week.n} #${item.n}: explanation answer must match the book key`);
		}
	}
}

assert.equal(examCount, 200, "expected 25 questions × 8 weeks");
assert.equal(explanations.w2.mondai1[3].ans, 2, "w2 #4 悩みぬく is ぬいて");
assert.match(explanations.w2.mondai1[3].why[1], /ぬいて|极点|彻底/, "w2 #4 correct option explains ぬく");
assert.equal(explanations.w5.mondai3[3].ans, 3, "w5 #24 日本のみならず海外でも");
assert.match(explanations.w5.mondai3[3].why[2], /のみならず/, "w5 #24 correct option explains のみならず");
assert.equal(explanations.w7.mondai1[3].ans, 3, "w7 #4 も〜ば〜も is 聞こえなければ");
assert.match(explanations.w7.mondai1[3].why[2], /ば/, "w7 #4 correct option explains ば");
assert.equal(dailyCount, 338, "expected 338 daily items");
assert.match(daily.w4d2.items[0].translation, /会议.*书面/, "w4d2 #1 translation must match the meeting report sentence");
assert.match(daily.w4d3.items[0].translation, /人身事故/, "w4d3 #1 translation must match the train disruption sentence");
assert.match(daily.w4d4.items[0].translation, /作业/, "w4d4 #1 translation must match the homework sentence");
assert.match(daily.w4d5.items[0].translation, /承诺/, "w4d5 #1 translation must match the promise sentence");
assert.match(daily.w4d6.items[2].translation, /电影.*试映/, "w4d6 #3 translation must match the film preview sentence");
assert.match(daily.w5d1.items[0].translation, /驾驶.*事故/, "w5d1 #1 translation must match the driving sentence");
assert.match(daily.w5d2.items[0].translation, /会议/, "w5d2 #1 translation must match the meeting sentence");
assert.match(daily.w5d3.items[0].translation, /小偷/, "w5d3 #1 translation must match the burglar sentence");
assert.match(daily.w5d4.items[0].translation, /家具/, "w5d4 #1 translation must match the furniture sentence");
assert.match(daily.w5d5.items[0].translation, /交通.*公司/, "w5d5 #1 translation must match the transportation sentence");
assert.match(daily.w5d6.items[0].translation, /节目.*意见/, "w5d6 #1 translation must match the program sentence");
assert.match(daily.w6d1.items[0].translation, /入学.*毕业/, "w6d1 #1 translation must match the enrollment sentence");
assert.match(daily.w6d2.items[0].translation, /笑.*母亲/, "w6d2 #1 translation must match the resemblance sentence");
assert.match(store, /n2-grammar-explanations\.json/, "runtime must load N2 exam explanations");
assert.match(store, /n2-grammar-daily-explanations\.json/, "runtime must load N2 daily explanations");
assert.match(days, /MODULE === "n2grammar"/, "N2 pages must use the explanation overlay");

console.log(`Validated ${examCount} N2 weekly-test explanations and ${dailyCount} daily explanations.`);
