import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import type { InterviewQaFile, InterviewQaSide } from "../../app/study/it-listening";

/**
 * 面试问答背诵区（interview-qa.json）的数据口径：
 * 模拟面试 18 问（与 real-wp-online-mock 的 modelAnswer 对应，自我介绍/职历/短所工夫三题为修正版）
 * +「为什么来日本」1 题（带追问）。全部问答带 ruby，分段拼接必须与 jp 逐字一致、
 * 含汉字的分段必须带读音（与全站注音口径一致）。
 */
const file = JSON.parse(
	readFileSync(join(process.cwd(), "public/data/it-listening/interview-qa.json"), "utf8"),
) as InterviewQaFile;

const KANJI = /[一-鿿]/;

function expectSide(side: InterviewQaSide) {
	expect(side.jp.length).toBeGreaterThan(0);
	if (!side.ruby || !side.ruby.length) throw new Error(`missing ruby for: ${side.jp.slice(0, 20)}`);
	expect(side.ruby.map((g) => g.t).join("")).toBe(side.jp);
	for (const seg of side.ruby) if (KANJI.test(seg.t)) expect(seg.r).toBeTruthy();
}

describe("it-listening interview-qa （背诵区）", () => {
	it("has 7 groups and 19 items with the expected status mix", () => {
		expect(file.groups).toHaveLength(7);
		const items = file.groups.flatMap((g) => g.items);
		expect(items).toHaveLength(19);
		const counts: Record<string, number> = {};
		for (const it of items) counts[it.status] = (counts[it.status] ?? 0) + 1;
		expect(counts).toEqual({ final: 9, template: 5, draft: 4, undecided: 1 });
	});

	it("every question and answer carries consistent ruby and a Chinese gloss", () => {
		for (const g of file.groups)
			for (const it of g.items) {
				expectSide(it.q);
				expectSide(it.a);
				expect(it.a.zh.length).toBeGreaterThan(0);
				if (it.followUp) {
					expectSide(it.followUp.q);
					expectSide(it.followUp.a);
					expect(it.followUp.a.zh.length).toBeGreaterThan(0);
				}
			}
	});

	it("only the why-Japan item has a follow-up; the transfer item stays undecided", () => {
		const items = file.groups.flatMap((g) => g.items);
		expect(items.filter((i) => i.followUp)).toHaveLength(1);
		expect(items.find((i) => i.status === "undecided")?.label).toContain("転勤");
	});
});
