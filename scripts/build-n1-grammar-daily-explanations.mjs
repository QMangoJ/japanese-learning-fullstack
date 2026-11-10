// Builds public/data/n1-grammar-daily-explanations.json from the N1 grammar
// book plus scripts/n1-daily-gloss.jsonl (one JSON object per question).
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parsePracticeAnswers } from "../app/study/practice-answers.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const bookName = readdirSync(resolve(root, "public/data")).find((name) => /^n1grammar\.[0-9a-f]+\.json$/.test(name));
const book = JSON.parse(readFileSync(resolve(root, "public/data", bookName), "utf8"));
const gloss = new Map();
for (const line of readFileSync(resolve(root, "scripts/n1-daily-gloss.jsonl"), "utf8").split("\n")) {
	const trimmed = line.trim();
	if (!trimmed) continue;
	const row = JSON.parse(trimmed);
	gloss.set(row.k, row);
}

function fillChoice(q, answer) {
	const clean = String(answer).replace(/\s/g, "");
	const parts = clean.includes("、") ? clean.split("、") : null;
	let index = 0;
	return q.replace(/（\s*a[.．]\s*([^）]*?)\s+b[.．]\s*([^）]*?)\s*）/gu, (_match, a, b) => {
		const code = (parts ? parts[index++] : clean).replace(/[・·]/g, "");
		if (code === "ab" || code === "ba") return `${a.trim()}／${b.trim()}`;
		if (code === "a") return a.trim();
		if (code === "b") return b.trim();
		throw new Error(`unresolved choice ${code} in ${q}`);
	});
}

function fillOrder(q, options, answer) {
	const texts = (options || []).map((option) => String(option).replace(/^\s*[1-4]\s*/, "").trim());
	const order = String(answer).split("→").map((n) => texts[Number(n) - 1] || "");
	let index = 0;
	const done = q.replace(/(?:[ \u3000]*＿＿[ \u3000]*)+/g, (chunk) => {
		const count = (chunk.match(/＿＿/g) || []).length;
		const part = order.slice(index, index + count).join("");
		index += count;
		return part;
	});
	if (done.includes("＿") || order.some((part) => !part)) throw new Error(`unresolved order: ${q} / ${answer}`);
	return done;
}

function choicePairs(q) {
	return [...String(q).matchAll(/（\s*a[.．]\s*([^）]*?)\s+b[.．]\s*([^）]*?)\s*）/gu)].map((match) => ({
		a: match[1].trim(),
		b: match[2].trim(),
	}));
}

const out = {};
const missing = [];
for (const week of book.weeks) {
	for (const day of week.days) {
		if (day.day === 7) continue;
		const key = `w${week.n}d${day.day}`;
		const answers = parsePracticeAnswers(day.exercises.answers, day.exercises.sections);
		const items = [];
		for (const section of day.exercises.sections) {
			for (const item of section.items) {
				const id = `${key}#${item.n}`;
				const answer = answers.get(String(item.n));
				if (!answer) missing.push(`${id} no answer`);
				const glossRow = gloss.get(id);
				if (!glossRow?.cn || !glossRow.en || !glossRow.r || !glossRow.re) missing.push(`${id} gloss`);
				const completed = (section.type === "order" ? fillOrder(item.q, item.options, answer) : fillChoice(item.q, answer))
					.replace(/（※[^）]*）/g, "")
					.replace(/\s{2,}/g, " ")
					.trim();
				const row = {
					n: item.n,
					type: section.type,
					answer,
					completed,
					translation: glossRow?.cn || "",
					translation_en: glossRow?.en || "",
					reason: glossRow?.r || "",
					reason_en: glossRow?.re || "",
				};
				if (section.type === "choice") row.choices = choicePairs(item.q);
				items.push(row);
			}
		}
		out[key] = { items };
	}
}
if (missing.length) {
	console.error(missing.slice(0, 20).join("\n"));
	throw new Error(`${missing.length} N1 daily gloss problems`);
}
const target = resolve(root, "public/data/n1-grammar-daily-explanations.json");
writeFileSync(target, JSON.stringify(out, null, 1) + "\n");
console.log(`wrote ${target} (${Object.keys(out).length} days)`);
