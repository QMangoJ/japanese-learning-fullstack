/**
 * List manual 错题本 notes (word/grammar) that still need an assistant translation.
 *
 *   npm run mistakes:pending -- --user g_102093748195310724746
 *   npm run mistakes:pending -- --user g_… --out /tmp/pending.json
 *
 * Prints JSON to stdout (and optionally --out). Never prints secrets.
 */
import { writeFileSync } from "node:fs";

import { ASSISTANT_SOURCE, isManualMistakeType } from "../app/study/mistake-translations.ts";
import { loadUserMistakes, readCurrentAid, type PendingEntry } from "./mistake-kv.mts";

function arg(name: string): string | undefined {
	const i = process.argv.indexOf(name);
	return i >= 0 ? process.argv[i + 1] : undefined;
}

const userId = arg("--user");
if (!userId) {
	console.error("Usage: npm run mistakes:pending -- --user <userId> [--out file.json]");
	process.exit(1);
}

const list = loadUserMistakes(userId);
const pending: PendingEntry[] = [];
for (const m of list) {
	if (m.deleted) continue;
	if (!isManualMistakeType(m.type)) continue;
	const text = String(m.text || "").trim();
	if (!text) continue;
	const current = readCurrentAid(text);
	if (current?.source === ASSISTANT_SOURCE) continue;
	pending.push({ id: m.id, text, type: m.type, current });
}

const json = JSON.stringify(pending, null, 2);
const out = arg("--out");
if (out) writeFileSync(out, json + "\n");
process.stdout.write(json + "\n");
console.error(`pending ${pending.length} manual notes for ${userId}`);
