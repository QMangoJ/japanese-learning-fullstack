import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const readJson = async (name) => JSON.parse(await readFile(resolve(root, "public/data", name), "utf8"));
const grammar = await readJson("grammar.d15be04258.json");
const daily = await readJson("n3-grammar-daily-explanations.json");
const weekly = await readJson("n3-grammar-explanations.json");
const runtime = await readFile(resolve(root, "app/study/days.tsx"), "utf8");

const regularDays = grammar.weeks.flatMap((week) => week.days.filter((day) => day.day < 7));
const points = regularDays.flatMap((day) => day.points || []);
const examples = points.flatMap((point) => point.examples || []);
const dailyItems = Object.values(daily).flatMap((day) => day.items || []);
const weeklyItems = Object.values(weekly).flatMap((week) =>
  ["mondai1", "mondai2", "mondai3"].flatMap((section) => week[section] || []),
);
const hasEnglish = (value) => typeof value === "string" && /[A-Za-z]/.test(value);

assert.equal(grammar.weeks.length, 6, "N3 grammar must have six weeks");
assert.equal(regularDays.length, 36, "N3 grammar must have 36 regular study days");
assert.equal(points.length, 132, "N3 grammar must have 132 grammar points");
assert.equal(examples.length, 297, "N3 grammar must have 297 examples");
assert.equal(dailyItems.length, 250, "N3 grammar must have 250 daily exercise explanations");
assert.equal(weeklyItems.length, 150, "N3 grammar must have 150 weekly-test explanations");

for (const [index, week] of grammar.weeks.entries()) {
  assert.ok(hasEnglish(week.title_en), `Week ${index + 1} is missing an English title`);
  assert.equal(week.days.find((day) => day.day === 7)?.title_en, "Weekly test");
}
for (const [index, day] of regularDays.entries()) {
  assert.ok(hasEnglish(day.title_en), `Regular day ${index + 1} is missing an English title`);
  assert.ok(hasEnglish(day.dialog?.en), `Regular day ${index + 1} is missing English dialogue`);
}
for (const [index, point] of points.entries()) {
  assert.ok(hasEnglish(point.usage_en), `Grammar point ${index + 1} is missing English usage`);
}
for (const [index, example] of examples.entries()) {
  assert.ok(hasEnglish(example.en), `Example ${index + 1} is missing English text`);
}
for (const [index, item] of dailyItems.entries()) {
  assert.ok(hasEnglish(item.translation_en), `Daily exercise ${index + 1} is missing English translation`);
}
for (const [index, item] of weeklyItems.entries()) {
  assert.ok(hasEnglish(item.trans_en), `Weekly test item ${index + 1} is missing English translation`);
  for (const reason of item.why || []) {
    assert.doesNotMatch(
      reason,
      /放入本句后，接续、活用形式或语义不符合题意|接续和句意都成立/,
      `Weekly test item ${index + 1} still contains a generic option explanation`,
    );
  }
}

assert.match(runtime, /p\.usage_en/, "grammar points must render English usage");
assert.match(runtime, /ex\.en/, "grammar examples must render English translations");
assert.match(runtime, /Grammar point tested/, "daily explanation labels must have an English form");
assert.match(runtime, /Detailed explanation/, "weekly explanation labels must have an English form");

console.log("N3 grammar English coverage passed: 6 weeks, 36 days, 132 points, 297 examples, 250 daily exercises, and 150 weekly-test items.");
