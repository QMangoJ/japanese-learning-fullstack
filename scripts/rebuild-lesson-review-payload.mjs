import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outPath = resolve(root, "public/data/lesson-review.json");
const parseModule = await import(pathToFileURL(resolve(root, "app/study/lesson-review-parse.ts")).href);
const payload = JSON.parse(readFileSync(outPath, "utf8"));
payload.days = parseModule.enrichReviewDays(payload.days);
writeFileSync(outPath, JSON.stringify(payload, null, "\t") + "\n");
const items = payload.days.reduce((sum, day) => sum + day.items.length, 0);
const ruby = payload.days.reduce(
	(sum, day) => sum + day.items.filter((item) => item.jp_r).length,
	0,
);
console.log(`wrote ${outPath} (${payload.days.length} days, ${items} items, ${ruby} with ruby)`);
