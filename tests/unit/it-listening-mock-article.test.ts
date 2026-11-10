import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import type { ItListeningArticle } from "../../app/study/it-listening";

/**
 * real-wp-online-mock 样板篇的数据口径（2026-11-10 五件套 + 文末小结）：
 * ① 第 14 句改文（いただいております）；②③ 讲解深化（全句 structure、grammar 详解）；
 * ⑤ 18 个面试官问题句挂 modelAnswer；⑥ 文末「面试官话术模式」小结（patterns）。
 * 其它文章不适用本口径，不在此断言。
 */
const article = JSON.parse(
	readFileSync(join(process.cwd(), "public/data/it-listening/real-wp-online-mock.json"), "utf8"),
) as ItListeningArticle;

const MODEL_ANSWER_IDX = [10, 13, 15, 17, 20, 23, 24, 26, 29, 30, 32, 35, 37, 38, 40, 43, 46, 48];
const KANJI = /[一-鿿]/;

describe("it-listening real-wp-online-mock (sample article)", () => {
	it("has 53 sentences, all with a structure line and consistent ruby", () => {
		expect(article.sentences).toHaveLength(53);
		for (const s of article.sentences) {
			expect(s.structure && s.structure.length).toBeTruthy();
			if (s.ruby) expect(s.ruby.map((g) => g.t).join("")).toBe(s.jp);
		}
	});

	it("sentence 14 uses いただいております; 頂戴 survives only in that sentence's note about the original video", () => {
		const s14 = article.sentences[13];
		expect(s14.jp).toContain("事前にいただいております");
		const all = JSON.stringify(article);
		expect(all.split("頂戴").length - 1).toBe(1);
		expect(s14.grammarPoints?.[0].explanationZh).toContain("原视频此处说的是「頂戴しております」");
	});

	it("grammar explanations follow the detailed standard (>= 60 chars each)", () => {
		for (const s of article.sentences) {
			for (const g of s.grammarPoints ?? []) {
				expect(g.explanationZh.length).toBeGreaterThanOrEqual(60);
			}
		}
	});

	it("carries model answers on exactly the 18 question sentences, with full ruby coverage", () => {
		article.sentences.forEach((s, i) => {
			if (!MODEL_ANSWER_IDX.includes(i)) {
				expect(s.modelAnswer).toBeUndefined();
				return;
			}
			const ma = s.modelAnswer;
			expect(ma, `sentence ${i + 1}`).toBeTruthy();
			if (!ma) return;
			expect(ma.zh.length).toBeGreaterThan(0);
			// 口语可说长度：1–5 个句读
			const sentences = ma.jp.split("。").filter(Boolean);
			expect(sentences.length).toBeGreaterThanOrEqual(1);
			expect(sentences.length).toBeLessThanOrEqual(5);
			// 答题要点三段齐全（面试官在看什么 / 推荐结构 / 雷区）
			expect(ma.points, `points on sentence ${i + 1}`).toBeTruthy();
			if (ma.points) {
				for (const v of [ma.points.intent, ma.points.structure, ma.points.pitfalls]) {
					expect(typeof v).toBe("string");
					expect(v.length).toBeGreaterThanOrEqual(20);
				}
			}
			// ruby 分段拼接 == jp，且每个汉字都落在带注音的片段里
			const segs = ma.ruby ?? [];
			expect(segs.map((g) => g.t).join("")).toBe(ma.jp);
			const covered = new Map<string, number>();
			for (const g of segs) if (g.r) for (const c of g.t) covered.set(c, (covered.get(c) ?? 0) + 1);
			for (const c of ma.jp) {
				if (!KANJI.test(c)) continue;
				expect(covered.get(c) ?? 0, `kanji ${c} in sentence ${i + 1} answer`).toBeGreaterThan(0);
				covered.set(c, (covered.get(c) ?? 0) - 1);
			}
		});
	});

	it("ends with the interviewer-patterns summary: real quotes for group 1, marked general examples where the article lacks a usage", () => {
		const p = article.patterns;
		expect(p?.title).toBe("面试官话术模式");
		expect(p?.groups).toHaveLength(2);
		if (!p) return;
		const [g1, g2] = p.groups;
		// 第一组：复述确认句型——骨架/四作用在 body 里、借用提示在 tip 里，例句必须全是本篇原句
		expect(g1.body.join("")).toContain("ということですね");
		expect(g1.tip && g1.tip.length).toBeTruthy();
		expect(g1.examples?.length).toBeGreaterThanOrEqual(3);
		// 第二组：ということ 家族四成员齐全
		expect(g2.entries?.map((e) => e.form)).toEqual(["〜ということですね", "〜ということでしょうか", "〜ということは", "〜というのも"]);

		const allExamples = [
			...(g1.examples ?? []),
			...(g2.entries ?? []).flatMap((e) => e.examples),
		];
		expect(allExamples.length).toBeGreaterThanOrEqual(7);
		for (const e of allExamples) {
			expect(e.zh.length).toBeGreaterThan(0);
			// ruby 分段拼接 == 例句原文，汉字全覆盖（同 modelAnswer 口径）
			const segs = e.ruby ?? [];
			expect(segs.map((g) => g.t).join("")).toBe(e.jp);
			const covered = new Map<string, number>();
			for (const g of segs) if (g.r) for (const c of g.t) covered.set(c, (covered.get(c) ?? 0) + 1);
			for (const c of e.jp) {
				if (!KANJI.test(c)) continue;
				expect(covered.get(c) ?? 0, `kanji ${c} in pattern example`).toBeGreaterThan(0);
				covered.set(c, (covered.get(c) ?? 0) - 1);
			}
			if (e.origin === "article") {
				// 本篇原句：必须是某句原文的子串，不许伪造
				expect(article.sentences.some((s) => s.jp.includes(e.jp)), `quoted as article original: ${e.jp}`).toBe(true);
				expect(e.ref.startsWith("本篇原句")).toBe(true);
			} else {
				// 通用例句：必须明确标注，不许伪装成本篇原句
				expect(e.ref).toContain("通用例句");
				expect(article.sentences.some((s) => s.jp.includes(e.jp))).toBe(false);
			}
		}
		for (const ent of g2.entries ?? []) {
			expect(ent.usage.length).toBeGreaterThanOrEqual(20);
			expect(ent.examples.length).toBeGreaterThanOrEqual(1);
		}
	});
});
