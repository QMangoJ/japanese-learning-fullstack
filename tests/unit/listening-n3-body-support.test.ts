import { describe, expect, it } from "vitest";

import { listeningBodySupport } from "../../app/data/listening-n3-body-support";
import { chapter3Sections } from "../../app/data/listening-n3-structured-ch3";
import { chapter4Sections } from "../../app/data/listening-n3-structured-ch45";

const RUBY = /\{([^{}|]+)\|([^{}|]+)\}/g;
const KANJI = /[一-龯々〆ヵヶ]/;

function teachingLines() {
	const lines: string[] = [];
	for (const sections of [chapter3Sections.slice(0, 5), chapter4Sections.slice(0, 4)]) {
		for (const section of sections) {
			for (const block of section.pages[0].blocks) {
				if (block.kind === "example" || block.kind === "paragraph") lines.push(block.text);
				if (block.kind === "list") lines.push(...block.items);
			}
		}
	}
	return lines;
}

describe("N3 listening teaching-page support", () => {
	it("adds lossless furigana and a Chinese translation to every chapter 3-4 teaching line", () => {
		const lines = [...new Set(teachingLines())];
		expect(lines).toHaveLength(155);
		for (const line of lines) {
			const support = listeningBodySupport(line);
			expect(support, line).toBeTruthy();
			expect(support!.jp.replace(RUBY, "$1"), line).toBe(line);
			if (KANJI.test(line)) expect(support!.jp, line).toMatch(RUBY);
			expect(support!.cn.trim(), line).not.toBe("");
		}
	});

	it("uses the irregular readings shown on the teaching pages", () => {
		expect(listeningBodySupport("③ 台風が近づいています。")?.jp).toContain("{台風|たいふう}");
		expect(listeningBodySupport("ぼくの好きな子の家は、角から3軒目だよ。／自分の家を入れて数えるんだよ。")?.jp).toContain("{3軒目|さんげんめ}");
		expect(listeningBodySupport("1日・2日・3日・4日・5日・6日・7日・8日・9日・10日")?.jp).toContain("{1日|ついたち}");
		expect(listeningBodySupport("・当日（＝その日のうちに返す）、１泊（＝次の日に返す）、２泊、３泊…")?.jp).toContain("{１泊|いっぱく}");
	});
});
