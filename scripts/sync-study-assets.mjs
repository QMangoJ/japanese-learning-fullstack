import { access, cp, mkdir } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const sourcePublic = resolve(projectRoot, "..", "日语学习", "public");
const targetPublic = resolve(projectRoot, "public");
const targetData = resolve(targetPublic, "data");

async function exists(path) {
	try {
		await access(path, constants.R_OK);
		return true;
	} catch {
		return false;
	}
}

const sourceData = resolve(sourcePublic, "data");
if (!(await exists(sourceData))) {
	console.log("Legacy source data is unavailable; using committed study data.");
	process.exit(0);
}

await mkdir(dirname(targetData), { recursive: true });
await cp(sourceData, targetData, { recursive: true, force: true });

console.log("Synced legacy Japanese-learning data into public/.");
