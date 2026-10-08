/**
 * Shared wrangler KV helpers for mistakes:pending / mistakes:write.
 * Never prints secrets. Uses remote MISTAKES_KV (same id as wrangler.json).
 */
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
	ASSISTANT_SOURCE,
	MISTAKE_STUDY_KV_PREFIX,
	MISTAKE_TRANSLATION_KV_PREFIX,
	normalizeTranslationSource,
	parseStoredStudyAid,
	parseStoredTranslation,
	serializeStudyAid,
	serializeTranslation,
	type StudyAid,
} from "../app/study/mistake-translations.ts";

export const MISTAKES_KV_NAMESPACE_ID = "dd867fe5aa004ac8b4b536f508a3530d";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

function wranglerBin(): string {
	const local = join(root, "node_modules", ".bin", "wrangler");
	if (existsSync(local)) return local;
	return "npx";
}

export function wranglerKv(args: string[]): string {
	const bin = wranglerBin();
	const base = bin.endsWith("wrangler")
		? [bin, ...args, "--namespace-id", MISTAKES_KV_NAMESPACE_ID, "--remote"]
		: ["npx", "wrangler", ...args, "--namespace-id", MISTAKES_KV_NAMESPACE_ID, "--remote"];
	const env = { ...process.env, XDG_CACHE_HOME: process.env.XDG_CACHE_HOME || "/tmp/wrangler-cache" };
	return execFileSync(base[0], base.slice(1), {
		encoding: "utf8",
		stdio: ["ignore", "pipe", "pipe"],
		maxBuffer: 64 * 1024 * 1024,
		env,
		cwd: root,
	});
}

export function sha256Hex(text: string): string {
	return createHash("sha256").update(text).digest("hex");
}

export function translationKeySync(text: string): string {
	return MISTAKE_TRANSLATION_KV_PREFIX + sha256Hex(normalizeTranslationSource(text));
}

export function studyAidKeySync(text: string): string {
	return MISTAKE_STUDY_KV_PREFIX + sha256Hex(normalizeTranslationSource(text));
}

export type MistakeRow = {
	id: string;
	type: string;
	text: string;
	ts?: number;
	level?: string;
	deleted?: boolean;
};

export function loadUserMistakes(userId: string): MistakeRow[] {
	const raw = wranglerKv(["kv", "key", "get", `mistakes:${userId}`]).trim();
	if (!raw) return [];
	const parsed: unknown = JSON.parse(raw);
	if (!Array.isArray(parsed)) return [];
	return parsed as MistakeRow[];
}

export function kvGet(key: string): string | null {
	try {
		const value = wranglerKv(["kv", "key", "get", key]).trim();
		return value || null;
	} catch {
		return null;
	}
}

export function kvPut(key: string, value: string): void {
	wranglerKv(["kv", "key", "put", key, value]);
}

export function kvBulkPut(entries: { key: string; value: string }[]): void {
	if (!entries.length) return;
	const dir = mkdtempSync(join(tmpdir(), "mistake-kv-"));
	const file = join(dir, "bulk.json");
	writeFileSync(file, JSON.stringify(entries));
	try {
		wranglerKv(["kv", "bulk", "put", file]);
	} finally {
		rmSync(dir, { recursive: true, force: true });
	}
}

export type PendingEntry = {
	id: string;
	text: string;
	type: string;
	current?: {
		cn?: string | null;
		reading?: string | null;
		example?: string | null;
		exampleCn?: string | null;
		source?: string | null;
	};
};

export function isAssistantReviewed(text: string): boolean {
	const study = parseStoredStudyAid(kvGet(studyAidKeySync(text)));
	if (study?.source === ASSISTANT_SOURCE) return true;
	const cn = parseStoredTranslation(kvGet(translationKeySync(text)));
	return cn?.source === ASSISTANT_SOURCE;
}

export function readCurrentAid(text: string): PendingEntry["current"] {
	const study = parseStoredStudyAid(kvGet(studyAidKeySync(text)));
	const cn = parseStoredTranslation(kvGet(translationKeySync(text)));
	if (!study && !cn) return undefined;
	return {
		cn: cn?.cn ?? study?.cn ?? null,
		reading: study?.reading ?? null,
		example: study?.example ?? null,
		exampleCn: study?.exampleCn ?? null,
		source: study?.source ?? cn?.source ?? null,
	};
}

export type WriteEntry = {
	id?: string;
	text: string;
	type?: string;
	reading?: string;
	cn: string;
	example?: string;
	exampleCn?: string;
};

export function buildAssistantRecords(entry: WriteEntry): { key: string; value: string }[] {
	const text = normalizeTranslationSource(entry.text);
	if (!text) throw new Error("entry.text is required");
	const cn = String(entry.cn || "").trim();
	if (!cn) throw new Error(`missing cn for ${JSON.stringify(text)}`);
	const aid: StudyAid = {
		cn,
		source: ASSISTANT_SOURCE,
	};
	if (entry.reading) {
		const reading = entry.reading.replace(/[\s・]+/g, "");
		if (reading && /^[\u3040-\u30ffー]+$/.test(reading)) aid.reading = reading;
	}
	if (entry.example?.trim()) aid.example = entry.example.trim();
	if (entry.exampleCn?.trim()) aid.exampleCn = entry.exampleCn.trim();
	return [
		{ key: translationKeySync(text), value: serializeTranslation(cn, ASSISTANT_SOURCE) },
		{ key: studyAidKeySync(text), value: serializeStudyAid(aid) },
	];
}
