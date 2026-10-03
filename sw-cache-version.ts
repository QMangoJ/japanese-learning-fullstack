import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Plugin } from "vite";

/**
 * public/sw.js keeps this placeholder in source. Every production build replaces
 * it in build/client/sw.js with a unique value, so no one edits CACHE_VERSION by
 * hand and parallel pull requests cannot collide on it.
 */
export const SW_CACHE_VERSION_PLACEHOLDER = "__SW_CACHE_VERSION__";

/** Format: `<UTC build time>-<short commit>`, e.g. `20261004T071200Z-abc1234`. */
export const SW_CACHE_VERSION_PATTERN = /^\d{8}T\d{6}Z-(?:[0-9a-f]{7}|nogit)$/;

type Env = Record<string, string | undefined>;

function shortSha(value: string | undefined): string | undefined {
	const sha = value?.trim().toLowerCase();
	return sha && /^[0-9a-f]{7,40}$/.test(sha) ? sha.slice(0, 7) : undefined;
}

function gitHeadSha(): string | undefined {
	try {
		return execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
	} catch {
		return undefined;
	}
}

export function buildTimestamp(now: Date): string {
	return now.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

export function resolveSwCacheVersion({
	env = process.env as Env,
	now = new Date(),
	gitSha = gitHeadSha,
}: { env?: Env; now?: Date; gitSha?: () => string | undefined } = {}): string {
	const sha =
		shortSha(env.WORKERS_CI_COMMIT_SHA) ?? // Cloudflare Workers Builds
		shortSha(env.GITHUB_SHA) ?? // GitHub Actions
		shortSha(gitSha()) ??
		"nogit";
	return `${buildTimestamp(now)}-${sha}`;
}

export function injectSwCacheVersion(source: string, version: string): string {
	if (!source.includes(SW_CACHE_VERSION_PLACEHOLDER)) {
		throw new Error(`sw.js is missing the ${SW_CACHE_VERSION_PLACEHOLDER} placeholder`);
	}
	return source.replaceAll(SW_CACHE_VERSION_PLACEHOLDER, version);
}

/** Writes the generated cache version into the client build's sw.js. */
export function swCacheVersionPlugin(version = resolveSwCacheVersion()): Plugin {
	return {
		name: "jl-sw-cache-version",
		apply: "build",
		applyToEnvironment: (environment) => environment.name === "client",
		writeBundle(options) {
			if (!options.dir) return;
			const file = join(options.dir, "sw.js");
			if (!existsSync(file)) throw new Error(`Expected ${file} in the client build`);
			writeFileSync(file, injectSwCacheVersion(readFileSync(file, "utf8"), version));
			this.info(`sw.js CACHE_VERSION = ${version}`);
		},
	};
}
