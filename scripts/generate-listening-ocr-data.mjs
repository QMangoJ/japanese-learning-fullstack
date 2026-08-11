import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { promisify } from "node:util";
import { dirname, resolve } from "node:path";
import { tmpdir } from "node:os";

const run = promisify(execFile);
const root = resolve(import.meta.dirname, "..");
const sourceDir = resolve(root, "public/listening/n3/pages");
const outputFile = resolve(root, "app/data/listening-n3-ocr.ts");
const pages = Array.from({ length: 48 }, (_, index) => index + 27);

function clean(text) {
	const seen = new Set();
	return text.split(/\r?\n/).map((line) => line.replace(/\s+/g, " ").trim()).filter((line) => {
		if (line.length < 3 || seen.has(line)) return false;
		if (/[A-Za-z]{3,}|[\[\]@|]/.test(line)) return false;
		if (/[这这的了是和在有请选题译页项]/.test(line)) return false;
		const japanese = [...line].filter((character) => /[ぁ-んァ-ヶ一-龯々ー]/.test(character)).length;
		const kana = [...line].filter((character) => /[ぁ-んァ-ヶー]/.test(character)).length;
		if (kana < 1 || japanese / line.length < .42) return false;
		seen.add(line);
		return true;
	}).join("\n");
}

const tempDir = await mkdtemp(resolve(tmpdir(), "n3-listening-ocr-"));
try {
	const entries = [];
	for (const page of pages) {
		const id = String(page).padStart(3, "0");
		const target = resolve(tempDir, id);
		await run("/opt/homebrew/bin/tesseract", [resolve(sourceDir, `${id}.jpg`), target, "-l", "jpn", "--psm", "4"], { maxBuffer: 1024 * 1024 * 8 });
		const text = clean(await readFile(`${target}.txt`, "utf8"));
		entries.push([page, text]);
	}
	await mkdir(dirname(outputFile), { recursive: true });
	await writeFile(outputFile, `// OCR 初稿。每页均保留原页对照，供人工校对。\nexport const listeningN3OcrText: Record<number, string> = ${JSON.stringify(Object.fromEntries(entries), null, "\t")} as const;\n`);
} finally {
	await rm(tempDir, { recursive: true, force: true });
}
