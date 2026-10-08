/**
 * Write assistant translations into MISTAKES_KV (mistake-cn + mistake-study),
 * marked source=assistant so on-demand AI never overwrites them.
 *
 *   npm run mistakes:write -- --file /tmp/translations.json
 *
 * File: JSON array of { text, cn, reading?, example?, exampleCn?, type?, id? }
 */
import { readFileSync } from "node:fs";

import { buildAssistantRecords, kvBulkPut, type WriteEntry } from "./mistake-kv.mts";

function arg(name: string): string | undefined {
	const i = process.argv.indexOf(name);
	return i >= 0 ? process.argv[i + 1] : undefined;
}

const file = arg("--file");
if (!file) {
	console.error("Usage: npm run mistakes:write -- --file <translations.json>");
	process.exit(1);
}

const parsed: unknown = JSON.parse(readFileSync(file, "utf8"));
if (!Array.isArray(parsed) || !parsed.length) {
	console.error("file must be a non-empty JSON array");
	process.exit(1);
}

const bulk: { key: string; value: string }[] = [];
const seen = new Set<string>();
for (const row of parsed as WriteEntry[]) {
	const records = buildAssistantRecords(row);
	for (const rec of records) {
		if (seen.has(rec.key)) continue;
		seen.add(rec.key);
		bulk.push(rec);
	}
}

kvBulkPut(bulk);
console.log(`wrote ${parsed.length} notes (${bulk.length} KV keys) from ${file}`);
