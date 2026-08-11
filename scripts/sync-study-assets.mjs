import { access, cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const sourcePublic = resolve(projectRoot, "..", "日语学习", "public");
const sourceIndex = resolve(sourcePublic, "index.html");
const targetPublic = resolve(projectRoot, "public");
const targetData = resolve(targetPublic, "data");
const targetCss = resolve(targetPublic, "study-legacy.css");
const targetRuntime = resolve(targetPublic, "study-legacy.js");

async function exists(path) {
	try {
		await access(path, constants.R_OK);
		return true;
	} catch {
		return false;
	}
}

async function ensureCommittedAssets() {
	if (!(await exists(targetCss)) || !(await exists(targetRuntime))) {
		throw new Error(
			"Legacy study assets are missing. Run this script once next to the 日语学习 source project and commit public/data, public/study-legacy.css, and public/study-legacy.js.",
		);
	}
}

if (!(await exists(sourceIndex))) {
	await ensureCommittedAssets();
	console.log("Legacy source is unavailable; using committed study assets.");
	process.exit(0);
}

const source = await readFile(sourceIndex, "utf8");
const style = source.match(/<style>([\s\S]*?)<\/style>/i)?.[1];
const runtime = source.match(/<script>([\s\S]*?)<\/script>/i)?.[1];

if (!style || !runtime) {
	throw new Error("Could not extract the legacy study app style and runtime.");
}

await mkdir(dirname(targetCss), { recursive: true });
await Promise.all([
	writeFile(targetCss, style.trimStart(), "utf8"),
	writeFile(targetRuntime, runtime.trimStart(), "utf8"),
	cp(resolve(sourcePublic, "data"), targetData, { recursive: true, force: true }),
]);

console.log("Synced legacy Japanese-learning assets into public/.");
