/**
 * Pre-fill the 错题本 recitation translation cache (MISTAKES_KV "mistake-cn:v1:*")
 * for every saved mistake, using the same Gemini prompt as /api/mistake-translations.
 *
 *   GEMINI_API_KEY=... CLOUDFLARE_ACCOUNT_ID=... \
 *     node --experimental-strip-types scripts/backfill-mistake-translations.mts [--write]
 *
 * Without --write it only prints what would be cached.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
	geminiTranslate,
	mistakeTranslationSource,
	translationKey,
} from "../app/study/mistake-translations.ts";

const NAMESPACE = "dd867fe5aa004ac8b4b536f508a3530d";
const write = process.argv.includes("--write");
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("GEMINI_API_KEY is required");

function wrangler(args: string[]): string {
	return execFileSync("npx", ["wrangler", ...args, "--namespace-id", NAMESPACE, "--remote"], {
		encoding: "utf8",
		stdio: ["ignore", "pipe", "ignore"],
		maxBuffer: 64 * 1024 * 1024,
	});
}

const keys = JSON.parse(wrangler(["kv", "key", "list", "--prefix", "mistakes:"])) as { name: string }[];
const sources = new Set<string>();
for (const { name } of keys) {
	const list = JSON.parse(wrangler(["kv", "key", "get", name]) || "[]") as { text?: string; deleted?: boolean }[];
	for (const m of list) if (!m.deleted && m.text) sources.add(mistakeTranslationSource(m));
}
const all = [...sources].filter(Boolean);
const cached = new Set(
	(JSON.parse(wrangler(["kv", "key", "list", "--prefix", "mistake-cn:v1:"])) as { name: string }[]).map((k) => k.name),
);
const todo: { text: string; key: string }[] = [];
for (const text of all) {
	const key = await translationKey(text);
	if (!cached.has(key)) todo.push({ text, key });
}
console.log(`${all.length} unique mistakes, ${todo.length} without a cached translation`);

const out = await geminiTranslate(
	todo.map((t) => t.text),
	apiKey,
	{ model: process.env.GEMINI_MODEL || undefined },
);
const bulk: { key: string; value: string }[] = [];
todo.forEach((t, i) => {
	const value = out[i];
	console.log(`${JSON.stringify(t.text)} => ${value ?? "(failed)"}`);
	if (value) bulk.push({ key: t.key, value });
});
console.log(`${bulk.length} translated, ${todo.length - bulk.length} failed`);

if (write && bulk.length) {
	const file = join(mkdtempSync(join(tmpdir(), "mistake-cn-")), "bulk.json");
	writeFileSync(file, JSON.stringify(bulk));
	wrangler(["kv", "bulk", "put", file]);
	console.log(`wrote ${bulk.length} keys`);
}
