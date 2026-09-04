import { access, cp, mkdir } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const sourceArgument = process.argv[2];
if (!sourceArgument) {
	console.error("Usage: node scripts/sync-study-assets.mjs <source-public-directory>");
	process.exit(1);
}

const sourcePublic = resolve(projectRoot, sourceArgument);
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
	console.error(`Study data source is unavailable: ${sourceData}`);
	process.exit(1);
}

await mkdir(dirname(targetData), { recursive: true });
await cp(sourceData, targetData, { recursive: true, force: true });

console.log("Synced legacy Japanese-learning data into public/.");
