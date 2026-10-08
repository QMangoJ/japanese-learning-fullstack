/**
 * Pre-fill the 错题本 recitation caches in MISTAKES_KV for saved notes:
 *   - "mistake-cn:v1:*"    Chinese meaning (same prompt as /api/mistake-translations)
 *   - "mistake-study:v1:*" reading / meaning / example for self-typed word & grammar notes (--study)
 * Uses the same provider chain as the Worker: Gemini (GEMINI_API_KEY), the lite model, then
 * Workers AI over the REST API (CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID).
 *
 *   CLOUDFLARE_ACCOUNT_ID=... [GEMINI_API_KEY=...] \
 *     node --experimental-strip-types scripts/backfill-mistake-translations.mts [--user g_123] [--study] [--write]
 *
 * Without --write it only prints what would be cached.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
	type AiRunner,
	generateStudyAids,
	generateTranslations,
	mistakeTranslationSource,
	studyAidKey,
	translationKey,
} from "../app/study/mistake-translations.ts";

const NAMESPACE = "dd867fe5aa004ac8b4b536f508a3530d";
const args = process.argv.slice(2);
const write = args.includes("--write");
const study = args.includes("--study");
const userIndex = args.indexOf("--user");
const onlyUser = userIndex >= 0 ? args[userIndex + 1] : "";

const apiKey = process.env.GEMINI_API_KEY || undefined;
const token = process.env.CLOUDFLARE_API_TOKEN;
const account = process.env.CLOUDFLARE_ACCOUNT_ID;
const ai: AiRunner | null =
	token && account
		? {
				async run(model, input) {
					const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/ai/run/${model}`, {
						method: "POST",
						headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
						body: JSON.stringify(input),
					});
					const data = (await res.json()) as { success?: boolean; result?: unknown; errors?: unknown };
					if (!res.ok || !data.success) throw new Error(`Workers AI HTTP ${res.status}: ${JSON.stringify(data.errors)}`);
					return data.result;
				},
			}
		: null;
if (!apiKey && !ai) throw new Error("Set GEMINI_API_KEY or CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID");

function wrangler(cmd: string[]): string {
	return execFileSync("npx", ["wrangler", ...cmd, "--namespace-id", NAMESPACE, "--remote"], {
		encoding: "utf8",
		stdio: ["ignore", "pipe", "ignore"],
		maxBuffer: 64 * 1024 * 1024,
	});
}

function listKeys(prefix: string): Set<string> {
	return new Set((JSON.parse(wrangler(["kv", "key", "list", "--prefix", prefix])) as { name: string }[]).map((k) => k.name));
}

const noteKeys = onlyUser ? [`mistakes:${onlyUser}`] : [...listKeys("mistakes:")];
const sources = new Set<string>();
const typed = new Set<string>();
for (const name of noteKeys) {
	const list = JSON.parse(wrangler(["kv", "key", "get", name]) || "[]") as { text?: string; type?: string; deleted?: boolean }[];
	for (const m of list) {
		if (m.deleted || !m.text) continue;
		const source = mistakeTranslationSource(m);
		if (!source) continue;
		sources.add(source);
		if (m.type === "word" || m.type === "grammar") typed.add(source);
	}
}

async function fill<T>(
	label: string,
	texts: string[],
	keyOf: (text: string) => Promise<string>,
	cached: Set<string>,
	generate: (texts: string[]) => Promise<(T | null)[]>,
	serialize: (value: T) => string,
) {
	const todo: { text: string; key: string }[] = [];
	for (const text of texts) {
		const key = await keyOf(text);
		if (!cached.has(key)) todo.push({ text, key });
	}
	console.log(`[${label}] ${texts.length} notes, ${todo.length} not cached yet`);
	if (!todo.length) return;
	const out = await generate(todo.map((t) => t.text));
	const bulk: { key: string; value: string }[] = [];
	todo.forEach((t, i) => {
		const value = out[i];
		console.log(`${JSON.stringify(t.text)} => ${value ? serialize(value) : "(failed)"}`);
		if (value) bulk.push({ key: t.key, value: serialize(value) });
	});
	console.log(`[${label}] ${bulk.length} generated, ${todo.length - bulk.length} failed`);
	if (write && bulk.length) {
		const file = join(mkdtempSync(join(tmpdir(), "mistake-backfill-")), "bulk.json");
		writeFileSync(file, JSON.stringify(bulk));
		wrangler(["kv", "bulk", "put", file]);
		console.log(`[${label}] wrote ${bulk.length} keys`);
	}
}

const opts = { apiKey, ai, log: (m: string) => console.warn(m) };
await fill("translations", [...sources], translationKey, listKeys("mistake-cn:v1:"), (t) => generateTranslations(t, opts), (v) => v);
if (study) {
	await fill("study", [...typed], studyAidKey, listKeys("mistake-study:v1:"), (t) => generateStudyAids(t, opts), (v) => JSON.stringify(v));
}
