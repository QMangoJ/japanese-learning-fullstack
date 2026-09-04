import { readFileSync, readdirSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { join } from "node:path";

const assetsDir = join(process.cwd(), "build/client/assets");
const manifestName = readdirSync(assetsDir).find((name) => /^manifest-.*\.js$/.test(name));
if (!manifestName) throw new Error("React Router client manifest was not found; run the production build first.");

const source = readFileSync(join(assetsDir, manifestName), "utf8");
const assignment = source.indexOf("=");
const manifest = JSON.parse(source.slice(assignment + 1).replace(/;\s*$/, ""));
const study = manifest.routes?.["routes/home"];
const root = manifest.routes?.root;
if (!study || !root || !manifest.entry) throw new Error("The expected root and study routes are missing from the client manifest.");

const initialAssets = new Set([
	manifest.entry.module,
	...(manifest.entry.imports || []),
	root.module,
	...(root.imports || []),
	study.module,
	...(study.imports || []),
]);

let rawBytes = 0;
let gzipBytes = 0;
for (const asset of initialAssets) {
	const bytes = readFileSync(join(process.cwd(), "build/client", asset));
	rawBytes += bytes.byteLength;
	gzipBytes += gzipSync(bytes).byteLength;
}

const budget = 300 * 1024;
console.log(`Initial /study JavaScript: ${(rawBytes / 1024).toFixed(1)} KiB raw, ${(gzipBytes / 1024).toFixed(1)} KiB gzip`);
if (gzipBytes > budget) {
	throw new Error(`Initial /study JavaScript exceeds the ${(budget / 1024).toFixed(0)} KiB gzip budget.`);
}
