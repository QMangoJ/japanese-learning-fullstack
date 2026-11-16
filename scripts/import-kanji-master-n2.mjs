// Import 《漢字マスター N2 改訂版》 data for the Kanji self-test.
//
// Usage: node scripts/import-kanji-master-n2.mjs [sourceDir]
// (default sourceDir: /workspace/study/kanji-master-n2)
//
// Format transform only: the source quiz.json / structure.json are re-serialized
// as compact JSON into public/data/kanji-master-n2/, fetched on demand by the
// Kanji self-test (never part of the initial bundle). Content is not edited:
// the script verifies the output deep-equals the source before writing.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { isDeepStrictEqual } from "node:util";

const sourceDir = process.argv[2] || "/workspace/study/kanji-master-n2";
const outDir = join(process.cwd(), "public/data/kanji-master-n2");
mkdirSync(outDir, { recursive: true });

for (const name of ["quiz.json", "structure.json"]) {
	const source = JSON.parse(readFileSync(join(sourceDir, name), "utf8"));
	const compact = JSON.stringify(source);
	if (!isDeepStrictEqual(JSON.parse(compact), source)) throw new Error(`${name}: round-trip mismatch`);
	writeFileSync(join(outDir, name), `${compact}\n`);
	console.log(`${name}: ${compact.length} chars`);
}
