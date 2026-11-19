import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { validateKanjiJourneyArticle, type KanjiJourneyArticle } from "../../app/study/kanji-journey";

/**
 * 《漢字的旅程》阅读数据（public/data/reading/kanji-journey.json）：
 * 正文是 Daniel 2026-11-19 的新讲稿：第 1–5 段 + 结尾，共 6 段 12 句（kj-041..kj-052），
 * 日文与讲稿逐字一致（读音括号换成 ruby，只给汉字注音）。旧稿的开场与 kj-001..kj-023 已整体替换。
 * 来宾问答原 6 组、救命句、Q6 的「〇週間」占位不在备忘录里，保持原样；
 * 其后追加 2 组补充问答（kj-031 国字「腺」「鱈」，kj-032「経済」「社会」旧词新义）。
 */
const article: KanjiJourneyArticle = JSON.parse(readFileSync(join(process.cwd(), "public/data/reading/kanji-journey.json"), "utf8"));

/** Daniel 2026-11-19 新讲稿的 12 句（按「。」分句，末句「旅です」照原文无句号）。括号里是读音，转成站点 ruby 后不应再出现在 jp 里。 */
const MEMO: { raw: string; zh: string }[] = [
	{
		"raw": "3000年(ねん)ぐらい前(まえ)、中国(ちゅうごく)の王(おう)は骨(ほね)に文字(もじ)を書(か)きました。",
		"zh": "大约三千年前，中国的王把文字写在骨头上。"
	},
	{
		"raw": "これが一番(いちばん)古(ふる)い漢字(かんじ)です。",
		"zh": "这就是最古老的汉字。"
	},
	{
		"raw": "馬(うま)は昔(むかし)は馬(うま)の絵(え)でした。",
		"zh": "「马」这个字，从前就是一匹马的画。"
	},
	{
		"raw": "長(なが)い時間(じかん)の間(あいだ)に姿形(すがたかたち)が少(すこ)し変(か)わりました。",
		"zh": "在漫长的时间里，它的样子一点点变了。"
	},
	{
		"raw": "昔(むかし)の日本(にほん)にはまだ文字(もじ)がありませんでした。",
		"zh": "从前的日本还没有文字。"
	},
	{
		"raw": "漢字(かんじ)は朝鮮半島(ちょうせんはんとう)を通(とお)って日本(にほん)に来(き)ました。",
		"zh": "汉字经过朝鲜半岛，来到了日本。"
	},
	{
		"raw": "その後(あと)、漢字(かんじ)からひらがなとカタカナが生(う)まれました。",
		"zh": "后来，从汉字里诞生了平假名和片假名。"
	},
	{
		"raw": "「安(あん)」という漢字(かんじ)から、あいうえおの「あ」です。",
		"zh": "比如从「安」这个汉字，变出了あいうえお里的「あ」。"
	},
	{
		"raw": "漢字(かんじ)は中国(ちゅうごく)から日本(にほん)へ来(き)ました。",
		"zh": "汉字从中国来到了日本。"
	},
	{
		"raw": "でも日本(にほん)で作(つく)った言葉(ことば)がまた中国(ちゅうごく)へ帰(かえ)りました。",
		"zh": "但是在日本造的词，又回到了中国。"
	},
	{
		"raw": "例(たと)えば経済(けいざい)、科学(かがく)もです。",
		"zh": "比如「经济」「科学」也是。"
	},
	{
		"raw": "旅(たび)です",
		"zh": "这是一场旅行。"
	}
];

const KANJI_RE = /[\u3400-\u9fff\u3005々〆ヶ]/;

function memoJp(raw: string): string {
	return raw.replace(/([\u3400-\u9fff\u3005々〆ヶ]+)\(([^)]+)\)/g, "$1");
}

function memoReadings(raw: string): { t: string; r: string }[] {
	return [...raw.matchAll(/([\u3400-\u9fff\u3005々〆ヶ]+)\(([^)]+)\)/g)].map((m) => ({ t: m[1], r: m[2] }));
}

describe("kanji-journey reading article", () => {
	it("passes the article validator (segments join to jp, kanji always carry readings)", () => {
		expect(validateKanjiJourneyArticle(article)).toEqual([]);
	});

	it("rejects a blank pause cue", () => {
		const broken = structuredClone(article);
		broken.sections[1].pause_zh = "  ";
		broken.sections[1].cue_ja = "";
		const errors = validateKanjiJourneyArticle(broken);
		expect(errors.some((e) => e.includes("pause_zh"))).toBe(true);
		expect(errors.some((e) => e.includes("cue_ja"))).toBe(true);
	});

	it("is the 2026-11-19 script for the v8 video: 6 sections, 12 sentences, 6:01", () => {
		expect(article.title_zh).toContain("v8");
		expect(article.title_zh).toContain("6:01");
		expect(article.description_zh).toContain("v8");
		expect(article.description_zh).toContain("6:01");
		expect(article.description_zh).toContain("full_ja_v8");
		expect(article.description_zh).toContain("暂停");
		expect(article.title_en).toContain("v8");
		expect(article.title_en).toContain("6:01");
		expect(article.description_en).toContain("v8");
		expect(article.description_en).toContain("6:01");
		expect(`${article.title_zh}${article.description_zh}${article.title_en ?? ""}${article.description_en ?? ""}`).not.toMatch(/金印|铁剑|鉄剣|v6|full_ja_v6/);
		expect(article.sections.map((s) => s.zh)).toEqual([
			"第 1 段　甲骨文是怎样来的",
			"第 2 段　字形的变化，以「馬」为例",
			"第 3 段　汉字传到日本",
			"第 4 段　日本怎样写出自己的字",
			"第 5 段　日本自己造字，新词又传回中国",
			"结尾",
		]);
		expect(article.sections.map((s) => s.ja)).toEqual([
			"甲骨文字はどうやってできたか",
			"「馬」で見る字形の変化",
			"漢字が日本に伝わる",
			"日本が自分の文字を書く",
			"日本で生まれた言葉が中国へ戻る",
			"おわりに",
		]);
		expect(article.sections.map((s) => s.sentences.length)).toEqual([2, 2, 2, 2, 3, 1]);
		const ids = article.sections.flatMap((s) => s.sentences.map((x) => x.id));
		expect(ids).toEqual(Array.from({ length: 12 }, (_, i) => `kj-${String(i + 41).padStart(3, "0")}`));
		// 末句照讲稿原文「旅です」（无句号），不擅自改成「漢字の旅です」。
		expect(article.sections[5].sentences.map((s) => s.jp)).toEqual(["旅です"]);
	});

	it("matches the memo once reading parentheses become kanji-only ruby", () => {
		const sentences = article.sections.flatMap((s) => s.sentences);
		expect(sentences.map((s) => s.jp)).toEqual(MEMO.map((line) => memoJp(line.raw)));
		expect(sentences.map((s) => s.zh)).toEqual(MEMO.map((line) => line.zh));
		sentences.forEach((s, i) => {
			const readings = (s.ruby ?? []).filter((seg) => seg.r).map((seg) => ({ t: seg.t, r: seg.r! }));
			expect(readings, s.id).toEqual(memoReadings(MEMO[i].raw));
			for (const seg of s.ruby ?? []) {
				if (seg.r) expect([...seg.t].every((ch) => KANJI_RE.test(ch)), `${s.id} ${seg.t}`).toBe(true);
			}
		});
		const body = sentences.map((s) => `${s.jp}\n${s.zh}`).join("\n");
		expect(body).not.toContain("紹介します");
		expect(body).not.toContain("ぜひ動画を見てください");
		expect(body).not.toContain("继续播放");
		expect(body).not.toContain("开始播放");
		expect(body).not.toContain("作り方");
		expect(body).not.toContain("汉字的造法");
		expect(body).not.toContain("形声");
	});

	it("marks each pause section with the v8 timecode and the narration's last line", () => {
		expect(article.sections.slice(0, 5).map((s) => s.pause_zh)).toEqual([
			"约 1:31 · 讲完后继续播放",
			"约 3:20 · 讲完后继续播放",
			"约 3:55（万叶假名开始前） · 讲完后继续播放",
			"约 4:51 · 讲完后继续播放",
			"约 5:21（常用汉字开始前） · 讲完后继续播放到片尾",
		]);
		expect(article.sections.slice(0, 5).map((s) => s.cue_ja)).toEqual([
			"そこで甲骨文字の「日」は、四角く、まっすぐな線で刻まれました。",
			"一番古い形から、太陽や月、山や水の姿が、見えてきませんか。",
			"日本の人々は、漢字を借りて、自分たちの言葉を書き表すようになりました。",
			"「イ」。",
			"こうした言葉は、新しい意味で、中国にも伝わり、今も使われています。",
		]);
		expect(article.sections[5].pause_zh).toBe("片尾播完后");
		expect(article.sections[5].cue_ja).toBeUndefined();
		const pauses = article.sections.map((s) => `${s.pause_zh ?? ""}\n${s.cue_ja ?? ""}`).join("\n");
		expect(pauses).not.toMatch(/2:16|4:05|4:39|5:35|6:06/);
		expect(pauses).not.toContain("形声文字");
	});

	it("keeps the 6 original Q&A pairs kj-024..kj-029, then the 2 added notes, and the rescue phrase kj-030", () => {
		expect(article.qa.map((p) => p.id)).toEqual(["kj-024", "kj-025", "kj-026", "kj-027", "kj-028", "kj-029", "kj-031", "kj-032"]);
		expect(article.rescue.id).toBe("kj-030");
		expect(article.rescue.jp).toBe("すみません、もう一度お願いします。");
	});

	it("keeps Q6's 〇週間 placeholder unfilled, with the 按实际回答 note", () => {
		const q6 = article.qa[5];
		expect(q6.answer.jp).toBe("〇週間ぐらいかかりました。");
		expect(q6.note_zh).toContain("按实际回答");
	});

	it("explains 腺 and 鱈 as kokuji with the attested dates, not a late-17th-century first use of 鱈", () => {
		const kokuji = article.qa.find((p) => p.id === "kj-031")!;
		expect(kokuji.answer.jp).toContain("国字");
		expect(kokuji.answer.jp).toContain("腺");
		expect(kokuji.answer.jp).toContain("鱈");
		const note = kokuji.note_zh ?? "";
		// 腺：宇田川玄真为译荷兰语 klier 所造，1805 年《医範提綱》。
		expect(note).toContain("宇田川玄真");
		expect(note).toContain("klier");
		expect(note).toContain("1805");
		expect(note).toContain("医範提綱");
		// 鱈：室町（15 世纪）已用；1697《本朝食鑑》是说明「日本所造」的文献，不是最早用例。
		expect(note).toContain("室町");
		expect(note).toContain("本朝食鑑");
		expect(note).toContain("鳕");
		expect(note).not.toMatch(/最早见于.{0,10}17/);
	});

	it("says 経済/社会 are old Chinese words given modern meanings in Japan, not words Japan coined from nothing", () => {
		const keizai = article.qa.find((p) => p.id === "kj-032")!;
		expect(keizai.question.jp).toContain("経済");
		const note = keizai.note_zh ?? "";
		expect(note).toContain("经世济民");
		expect(note).toContain("近思录");
		expect(note).toContain("economy");
		expect(note).toContain("society");
		expect(note).toContain("不是日本凭空造的词");
	});

	it("stays registered in the topics index as a reading entry whose count is the body sentence count", () => {
		const index = JSON.parse(readFileSync(join(process.cwd(), "public/data/topics/index.json"), "utf8")) as {
			topics: { slug: string; kind?: string; count: number; title_zh: string; subtopics?: string[] }[];
		};
		const entry = index.topics.find((t) => t.slug === "kanji-journey");
		expect(entry?.kind).toBe("reading");
		expect(entry?.count).toBe(article.sections.reduce((n, s) => n + s.sentences.length, 0));
		expect(entry?.title_zh).toContain("v8");
		expect(entry?.title_zh).toContain("6:01");
		expect(entry?.title_zh).not.toMatch(/v6|金印|铁剑/);
		expect(entry?.subtopics).toEqual([...article.sections.map((s) => s.zh), "来宾问答"]);
	});
});
