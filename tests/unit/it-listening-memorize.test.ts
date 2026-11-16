import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import {
	isItListeningMemorizeFile,
	parseItListeningRoute,
	type ItListeningArticle,
	type ItListeningMemorizeFile,
} from "../../app/study/it-listening";

/**
 * 背诵清单硬校验（Daniel 2026-11-16 口径）：清单内容只能逐字摘自文章定稿，不许改写/编造。
 * 每条 jp/zh 与文章对应句逐字一致；reading 去掉全部空格后与该句 ruby 分段拼出的
 * 整行读音逐字一致（两侧都去空格：原文 Latin 词内自带空格，如 "Front-end Dev5"）。
 */
const dir = join(process.cwd(), "public/data/it-listening");
const memoFiles = readdirSync(dir).filter((f) => f.startsWith("memorize-") && f.endsWith(".json"));

const strip = (s: string) => s.replace(/ /g, "");
const wholeReading = (a: ItListeningArticle, ref: number) =>
	(a.sentences[ref - 1].ruby ?? []).map((seg) => seg.r ?? seg.t).join("");

describe("it-listening memorize lists", () => {
	it("route parsing: memorize sub-route resolves, plain routes unchanged", () => {
		expect(parseItListeningRoute("#/it-listening/line-frontend-family-unit1/memorize")).toEqual({
			id: "line-frontend-family-unit1",
			memorize: true,
		});
		expect(parseItListeningRoute("#/it-listening/line-frontend-family-unit1")).toEqual({
			id: "line-frontend-family-unit1",
		});
		expect(parseItListeningRoute("#/it-listening")).toEqual({});
		expect(parseItListeningRoute("#/it-listening/mistakes")).toEqual({ id: "mistakes" });
	});

	it("at least the family unit1 list exists", () => {
		expect(memoFiles).toContain("memorize-line-frontend-family-unit1.json");
	});

	for (const file of memoFiles) {
		it(`${file}: every item is verbatim from its article`, () => {
			const memo = JSON.parse(readFileSync(join(dir, file), "utf8")) as ItListeningMemorizeFile;
			expect(isItListeningMemorizeFile(memo), "structure").toBe(true);
			expect(file).toBe(`memorize-${memo.articleId}.json`);
			const article = JSON.parse(readFileSync(join(dir, `${memo.articleId}.json`), "utf8")) as ItListeningArticle;
			const seen = new Set<number>();
			for (const g of memo.groups) {
				for (const it of g.items) {
					const tag = `${file}#${it.sentenceRef}`;
					expect(it.sentenceRef, `${tag} ref in range`).toBeGreaterThanOrEqual(1);
					expect(it.sentenceRef, `${tag} ref in range`).toBeLessThanOrEqual(article.sentences.length);
					expect(seen.has(it.sentenceRef), `${tag} no duplicate ref`).toBe(false);
					seen.add(it.sentenceRef);
					const s = article.sentences[it.sentenceRef - 1];
					expect(it.jp, `${tag} jp verbatim`).toBe(s.jp);
					expect(it.zh, `${tag} zh verbatim`).toBe(s.zh);
					expect(strip(it.reading), `${tag} reading == ruby concat`).toBe(strip(wholeReading(article, it.sentenceRef)));
					expect(it.use.length, `${tag} use present`).toBeGreaterThan(0);
				}
			}
		});
	}

	it("family unit1: 35 items in 6 groups (6/9/3/8/4/5)", () => {
		const memo = JSON.parse(readFileSync(join(dir, "memorize-line-frontend-family-unit1.json"), "utf8")) as ItListeningMemorizeFile;
		expect(memo.groups.map((g) => g.title)).toEqual([
			"一、开场与主持",
			"二、自我介绍",
			"三、补充说明与介绍服务",
			"四、描述日常工作流程",
			"五、向对方提问",
			"六、讨论协作与发表意见",
		]);
		expect(memo.groups.map((g) => g.items.length)).toEqual([6, 9, 3, 8, 4, 5]);
		expect(memo.groups.reduce((a, g) => a + g.items.length, 0)).toBe(35);
	});
});
