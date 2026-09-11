import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = process.argv[2] || resolve(root, "tmp/lesson-review-source.md");
const outPath = process.argv[3] || resolve(root, "public/data/lesson-review.json");

const parseModule = await import(pathToFileURL(resolve(root, "app/study/lesson-review-parse.ts")).href);
const markdown = readFileSync(sourcePath, "utf8");
const payload = parseModule.buildLessonReviewPayload(markdown, {
	fetchedAt: new Date().toISOString(),
});
writeFileSync(outPath, JSON.stringify(payload, null, "\t") + "\n");
const items = payload.days.reduce((sum, day) => sum + day.items.length, 0);
console.log(`wrote ${outPath} (${payload.days.length} days, ${items} items)`);
