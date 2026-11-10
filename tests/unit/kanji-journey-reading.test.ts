import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { validateKanjiJourneyArticle, type KanjiJourneyArticle } from "../../app/study/kanji-journey";

/**
 * 《漢字的旅程》阅读数据（public/data/reading/kanji-journey.json）：
 * 正文是 v8 暂停讲解备忘录的 7 段（开场、第 1–5 段、结尾），
 * 日文与备忘录逐字一致（读音括号换成 ruby，只给汉字注音）。
 * v8 去掉造字方法一段；留下的句子仍用原来的 id（kj-007..kj-009 空着）。
 * 来宾问答 6 组、救命句、Q6 的「〇週間」占位不在备忘录里，保持原样。
 */
const article: KanjiJourneyArticle = JSON.parse(readFileSync(join(process.cwd(), "public/data/reading/kanji-journey.json"), "utf8"));

/** 备忘录里的 20 句。括号里是读音，转成站点 ruby 后不应再出现在 jp 里。 */
const MEMO: { raw: string; zh: string }[] = [
		{
			"raw": "みなさん、こんにちは。中国(ちゅうごく)から 来(き)た ダニエルです。",
			"zh": "大家好。我是从中国来的 Daniel。"
		},
		{
			"raw": "今日(きょう)は、わたしが 作(つく)った 動画(どうが)「漢字(かんじ)の 旅程(りょてい)」を 見(み)ます。",
			"zh": "今天我们看我做的视频《汉字的旅程》。"
		},
		{
			"raw": "ときどき 止(と)めて、わたしの 言葉(ことば)で 説明(せつめい)します。",
			"zh": "我会时不时暂停，用我自己的话说明一下。"
		},
		{
			"raw": "三千年(さんぜんねん)ぐらい 前(まえ)、中国(ちゅうごく)の 王(おう)は、骨(ほね)を 火(ひ)で 焼(や)いて 占(うらな)いを しました。",
			"zh": "大约三千年前，中国的王把骨头用火烧，来做占卜。"
		},
		{
			"raw": "その 問(と)いと 答(こた)えを 骨(ほね)に 書(か)きました。これが いちばん 古(ふる)い 漢字(かんじ)です。",
			"zh": "再把问题和答案写在骨头上。这就是最古老的汉字。"
		},
		{
			"raw": "骨(ほね)は 硬(かた)いので、まるい 線(せん)は 難(むずか)しいです。だから「日(ひ)」は 四角(しかく)く なりました。",
			"zh": "骨头很硬，圆的线很难刻，所以「日」变成了方形。"
		},
		{
			"raw": "「馬(うま)」は、昔(むかし)は 馬(うま)の 絵(え)でした。",
			"zh": "「马」在从前就是一匹马的画。"
		},
		{
			"raw": "長(なが)い 時間(じかん)の あいだに、形(かたち)が 少(すこ)しずつ 変(か)わりました。",
			"zh": "经过很长的时间，字形一点点变了。"
		},
		{
			"raw": "日本(にほん)では 今(いま)も この 字(じ)を 使(つか)います。「バ」と「うま」と 読(よ)みます。",
			"zh": "日本现在还用这个字，读作「ba」，也读作「uma」。"
		},
		{
			"raw": "ほかの 字(じ)も、いちばん 古(ふる)い 形(かたち)を 見(み)ると、絵(え)だと わかります。",
			"zh": "其他字也一样，看最古老的形状，就能看出原来是画。"
		},
		{
			"raw": "むかしの 日本(にほん)には、まだ 文字(もじ)が ありませんでした。",
			"zh": "以前的日本还没有文字。"
		},
		{
			"raw": "漢字(かんじ)は、朝鮮半島(ちょうせんはんとう)を 通(とお)って、日本(にほん)に 来(き)ました。",
			"zh": "汉字经过朝鲜半岛，来到了日本。"
		},
		{
			"raw": "日本(にほん)の 人(ひと)は、漢字(かんじ)の 音(おと)だけ 借(か)りて、日本語(にほんご)を 書(か)きました。",
			"zh": "日本人只借用汉字的读音，来写日语。"
		},
		{
			"raw": "たとえば、「波(は)」と「流(る)」で、「はる」と 書(か)きます。春(はる)の ことです。",
			"zh": "比如用「波」和「流」写下「はる」，意思是春天。"
		},
		{
			"raw": "その 後(あと)、漢字(かんじ)から ひらがなと カタカナが 生(う)まれました。「安(あん)」から「あ」、「加(か)」から「カ」です。",
			"zh": "后来，从汉字里诞生了平假名和片假名。比如「安」变成「あ」，「加」变成「カ」。"
		},
		{
			"raw": "漢字(かんじ)は 中国(ちゅうごく)から 日本(にほん)へ 来(き)ました。",
			"zh": "汉字从中国来到了日本。"
		},
		{
			"raw": "でも、日本(にほん)で 生(う)まれた 言葉(ことば)が、また 中国(ちゅうごく)へ 帰(かえ)りました。",
			"zh": "但是在日本诞生的词，又回到了中国。"
		},
		{
			"raw": "わたしたちが 毎日(まいにち) 使(つか)う「経済(けいざい)」も「科学(かがく)」も、その 一(ひと)つです。本当(ほんとう)の「旅(たび)」ですね。",
			"zh": "我们每天用的「经济」「科学」也是其中之一。这真是一场「旅行」。"
		},
		{
			"raw": "動画(どうが)は 以上(いじょう)です。",
			"zh": "视频到这里就结束了。"
		},
		{
			"raw": "ご清聴(せいちょう)ありがとうございました。",
			"zh": "谢谢大家的聆听。"
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

	it("is the v8 pause-and-explain memo: 7 sections, 20 sentences, 6:01 video", () => {
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
			"开场",
			"第 1 段　甲骨文是怎样来的",
			"第 2 段　字形的变化，以「馬」为例",
			"第 3 段　汉字传到日本",
			"第 4 段　日本怎样写出自己的字",
			"第 5 段　日本自己造字，新词又传回中国",
			"结尾",
		]);
		expect(article.sections.map((s) => s.ja)).toEqual([
			"はじめに",
			"甲骨文字はどうやってできたか",
			"「馬」で見る字形の変化",
			"漢字が日本に伝わる",
			"日本が自分の文字を書く",
			"日本で生まれた言葉が中国へ戻る",
			"おわりに",
		]);
		expect(article.sections.map((s) => s.sentences.length)).toEqual([3, 3, 4, 2, 3, 3, 2]);
		const ids = article.sections.flatMap((s) => s.sentences.map((x) => x.id));
		expect(ids).toEqual([
			...Array.from({ length: 6 }, (_, i) => `kj-${String(i + 1).padStart(3, "0")}`),
			...Array.from({ length: 14 }, (_, i) => `kj-${String(i + 10).padStart(3, "0")}`),
		]);
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
		expect(article.sections[0].pause_zh).toBe("播放前 · 讲完后开始播放");
		expect(article.sections[0].cue_ja).toBeUndefined();
		expect(article.sections.slice(1, 6).map((s) => s.pause_zh)).toEqual([
			"约 1:31 · 讲完后继续播放",
			"约 3:20 · 讲完后继续播放",
			"约 3:55（万叶假名开始前） · 讲完后继续播放",
			"约 4:51 · 讲完后继续播放",
			"约 5:21（常用汉字开始前） · 讲完后继续播放到片尾",
		]);
		expect(article.sections.slice(1, 6).map((s) => s.cue_ja)).toEqual([
			"そこで甲骨文字の「日」は、四角く、まっすぐな線で刻まれました。",
			"一番古い形から、太陽や月、山や水の姿が、見えてきませんか。",
			"日本の人々は、漢字を借りて、自分たちの言葉を書き表すようになりました。",
			"「イ」。",
			"こうした言葉は、新しい意味で、中国にも伝わり、今も使われています。",
		]);
		expect(article.sections[6].pause_zh).toBe("片尾播完后");
		expect(article.sections[6].cue_ja).toBeUndefined();
		const pauses = article.sections.map((s) => `${s.pause_zh ?? ""}\n${s.cue_ja ?? ""}`).join("\n");
		expect(pauses).not.toMatch(/2:16|4:05|4:39|5:35|6:06/);
		expect(pauses).not.toContain("形声文字");
	});

	it("keeps 6 Q&A pairs kj-024..kj-029 and the rescue phrase kj-030", () => {
		expect(article.qa.map((p) => p.id)).toEqual(["kj-024", "kj-025", "kj-026", "kj-027", "kj-028", "kj-029"]);
		expect(article.rescue.id).toBe("kj-030");
		expect(article.rescue.jp).toBe("すみません、もう一度お願いします。");
	});

	it("keeps Q6's 〇週間 placeholder unfilled, with the 按实际回答 note", () => {
		const q6 = article.qa[5];
		expect(q6.answer.jp).toBe("〇週間ぐらいかかりました。");
		expect(q6.note_zh).toContain("按实际回答");
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
