import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import type { ItListeningArticle } from "../../app/study/it-listening";

/**
 * IT 听力全量升级口径（2026-11-10，样板篇 real-wp-online-mock 推广到全部文章）：
 * 每句必有 structure；grammarPoints 逐条深化（explanationZh ≥60 字、带 level）；
 * vocab 条目 w/r/zh 齐全；ruby 分段拼接 == jp。
 * modelAnswer / patterns 是面试篇专属，本口径不要求其它文章具备。
 */
const dir = join(process.cwd(), "public/data/it-listening");
const files = readdirSync(dir).filter(
	(f) => f.endsWith(".json") && f !== "index.json" && f !== "mistake-words.json",
);
const LEVELS = new Set(["N1", "N2", "N3", "N4", "N5"]);

describe("it-listening enrichment (all articles)", () => {
	it("covers every article file", () => {
		expect(files.length).toBeGreaterThanOrEqual(43);
	});

	for (const file of files) {
		it(`${file}: every sentence carries structure, deep grammar points and complete vocab`, () => {
			const article = JSON.parse(readFileSync(join(dir, file), "utf8")) as ItListeningArticle;
			expect(article.sentences.length).toBeGreaterThan(0);
			for (const [i, s] of article.sentences.entries()) {
				const tag = `${file}#${i + 1}`;
				expect(s.structure && s.structure.length > 0, `${tag} structure`).toBeTruthy();
				if (s.ruby) expect(s.ruby.map((g) => g.t).join(""), `${tag} ruby`).toBe(s.jp);
				for (const g of s.grammarPoints ?? []) {
					expect(g.name.length, `${tag} grammar name`).toBeGreaterThan(0);
					expect(LEVELS.has(g.level ?? ""), `${tag} grammar level ${g.level}`).toBe(true);
					expect(g.explanationZh.length, `${tag} explanation depth`).toBeGreaterThanOrEqual(60);
				}
				for (const v of s.vocab ?? []) {
					expect(v.w.length, `${tag} vocab w`).toBeGreaterThan(0);
					expect(v.r.length, `${tag} vocab r`).toBeGreaterThan(0);
					expect(v.zh.length, `${tag} vocab zh`).toBeGreaterThan(0);
				}
			}
		});
	}
});
