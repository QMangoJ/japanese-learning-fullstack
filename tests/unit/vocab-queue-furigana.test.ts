import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = join(__dirname, "..", "..");
const KANJI = /[\u4e00-\u9fff々]/;

type Line = { seg: string; reading: string; ruby?: string };
type Breakdown = { lines: Line[]; keigo?: Line };
type Word = { w: string; ex?: string; exRuby?: Line[]; breakdown?: Breakdown; exampleBreakdown?: Breakdown };

const words = (JSON.parse(readFileSync(join(ROOT, "public/data/vocab-queue.json"), "utf8")) as { words: Word[] }).words;

describe("背单词卡背注音", () => {
	it("keeps readings visible on the card back even when the global かな toggle is off", () => {
		const css = readFileSync(join(ROOT, "public/study.css"), "utf8");
		expect(css).toContain("body.no-ruby .vq-back rt{visibility:visible}");
		const page = readFileSync(join(ROOT, "app/study/VocabQueuePage.tsx"), "utf8");
		expect(page).toContain('className="backside vq-back"');
	});

	it("carries ruby on every kanji fragment of 语法拆解 / 例句解析 / 敬语", () => {
		const missing: string[] = [];
		for (const word of words) {
			for (const bd of [word.breakdown, word.exampleBreakdown]) {
				if (!bd) continue;
				for (const part of [...bd.lines, ...(bd.keigo ? [bd.keigo] : [])]) {
					if (KANJI.test(part.seg) && !part.ruby?.includes("<rt>")) missing.push(`${word.w}: ${part.seg}`);
				}
			}
		}
		expect(missing).toEqual([]);
	});

	it("annotates the 差し支えなければ example sentence", () => {
		const word = words.find((w) => w.w === "差し支えなければ");
		expect(word?.exRuby?.map((s) => s.seg).join("")).toBe(word?.ex);
		const html = word?.exRuby?.map((s) => s.ruby ?? s.seg).join("") ?? "";
		expect(html).toContain("<ruby>退職<rt>たいしょく</rt></ruby>");
		expect(html).toContain("お<ruby>伺<rt>うかが</rt></ruby>い");
	});
});
