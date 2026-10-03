/**
 * 校验专题词汇数据：public/data/topics/index.json 与每个 <slug>.json。
 *
 *   node --experimental-strip-types scripts/check-topic-vocab.mts
 *
 * 规则见 app/study/topic-vocab.ts 与 public/data/topics/README.md。index 的 count / 标题 / 子主题必须和专题文件一致。
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { indexEntryFor, validateTopicFile, validateTopicIndex, type TopicFile, type TopicIndex } from "../app/study/topic-vocab.ts";

export function checkTopicDir(dir: string): string[] {
	const errors: string[] = [];
	let index: TopicIndex;
	try {
		index = JSON.parse(readFileSync(join(dir, "index.json"), "utf8"));
	} catch (error) {
		return [`index.json: ${(error as Error).message}`];
	}
	errors.push(...validateTopicIndex(index));
	if (!Array.isArray(index.topics)) return errors;
	const files = readdirSync(dir).filter((f) => f.endsWith(".json") && f !== "index.json");
	const listed = new Set(index.topics.map((t) => t.slug));
	for (const file of files) {
		const slug = file.replace(/\.json$/, "");
		if (!listed.has(slug)) errors.push(`${file}: not listed in index.json`);
	}
	for (const entry of index.topics) {
		let topic: TopicFile;
		try {
			topic = JSON.parse(readFileSync(join(dir, `${entry.slug}.json`), "utf8"));
		} catch (error) {
			errors.push(`${entry.slug}.json: ${(error as Error).message}`);
			continue;
		}
		const fileErrors = validateTopicFile(topic, entry.slug);
		errors.push(...fileErrors);
		if (fileErrors.length) continue;
		const expected = indexEntryFor(topic);
		if (JSON.stringify(expected) !== JSON.stringify(entry)) {
			errors.push(`index.json: entry for ${entry.slug} is out of date, expected ${JSON.stringify(expected)}`);
		}
	}
	return errors;
}

if (import.meta.url === `file://${process.argv[1]}`) {
	const dir = process.argv[2] || join(process.cwd(), "public/data/topics");
	const errors = checkTopicDir(dir);
	if (errors.length) {
		console.error(errors.map((e) => `✗ ${e}`).join("\n"));
		process.exit(1);
	}
	const index: TopicIndex = JSON.parse(readFileSync(join(dir, "index.json"), "utf8"));
	console.log(`✓ ${index.topics.length} topic(s): ${index.topics.map((t) => `${t.slug} (${t.count})`).join(", ")}`);
}
