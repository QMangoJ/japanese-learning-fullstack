import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outPath = process.argv.includes("--out")
	? resolve(process.argv[process.argv.indexOf("--out") + 1])
	: resolve(root, "public/data/lesson-review.json");

const parseModule = await import(pathToFileURL(resolve(root, "app/study/lesson-review-parse.ts")).href);
const reviewModule = await import(pathToFileURL(resolve(root, "app/study/lesson-review.ts")).href);
const syncModule = await import(pathToFileURL(resolve(root, "app/study/lesson-review-sync.ts")).href);

const files = process.argv.slice(2).filter((arg, index, all) => arg !== "--out" && all[index - 1] !== "--out");
let payload;
if (files.length) {
	const docs = reviewModule.LESSON_REVIEW_DOCS.map((doc, index) => ({
		...doc,
		markdown: readFileSync(resolve(files[index] || files[0]), "utf8"),
	}));
	payload = parseModule.buildLessonReviewPayloadFromDocs(docs, {
		fetchedAt: new Date().toISOString(),
	});
} else {
	const fetched = await Promise.all(
		reviewModule.LESSON_REVIEW_DOCS.map(async (doc) => ({
			...doc,
			markdown: await syncModule.fetchGoogleDocText(doc.id),
		})),
	);
	payload = parseModule.buildLessonReviewPayloadFromDocs(fetched, {
		fetchedAt: new Date().toISOString(),
	});
}
writeFileSync(outPath, JSON.stringify(payload, null, "\t") + "\n");
const items = payload.days.reduce((sum, day) => sum + day.items.length, 0);
console.log(`wrote ${outPath} (${payload.days.length} days, ${items} items)`);
