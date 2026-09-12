import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = join(root, "public/data");
const outPath = join(root, "app/data/lesson-review-kanji-readings.json");

const RUBY_RE = /<ruby>([^<]+)<rt>([^<]+)<\/rt><\/ruby>/g;
const KANJI_RE = /[一-龯々〆ヵヶ]/;
const KANA_RE = /^[\u3040-\u30ffー]+$/;

const FORCED = {
	朝型: "あさがた",
	夜型: "よるがた",
	呼び方: "よびかた",
};

const dict = new Map(Object.entries(FORCED));

function add(jp, reading) {
	if (!jp || !reading) return;
	const core = String(jp)
		.replace(/[（(][^）)]*[）)]?/g, "")
		.replace(/[\/／].*$/, "")
		.replace(/\(.*?\)/g, "")
		.replace(/[？！、。]/g, "")
		.trim();
	if (!KANJI_RE.test(core) || core.length < 2 || core.length > 12) return;
	const kana = String(reading)
		.replace(/<[^>]+>/g, "")
		.replace(/[\s・]+/g, "")
		.trim();
	if (!KANA_RE.test(kana)) return;
	if (!dict.has(core)) dict.set(core, kana);
}

function walk(value) {
	if (!value || typeof value !== "object") return;
	if (Array.isArray(value)) {
		value.forEach(walk);
		return;
	}
	if (typeof value.jp === "string") {
		if (typeof value.reading === "string") add(value.jp, value.reading);
		if (typeof value.jp_r === "string") {
			RUBY_RE.lastIndex = 0;
			let match;
			while ((match = RUBY_RE.exec(value.jp_r))) add(match[1], match[2]);
		}
	}
	for (const nested of Object.values(value)) walk(nested);
}

for (const name of readdirSync(dataDir)) {
	if (!name.endsWith(".json") || name === "lesson-review.json") continue;
	walk(JSON.parse(readFileSync(join(dataDir, name), "utf8")));
}

const sorted = Object.fromEntries([...dict.entries()].sort((a, b) => a[0].localeCompare(b[0], "ja")));
writeFileSync(outPath, JSON.stringify(sorted, null, "\t") + "\n");
console.log(`wrote ${outPath} (${dict.size} readings)`);
