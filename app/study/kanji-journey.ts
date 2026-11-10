/**
 * 《漢字的旅程》阅读文章（会話発表②发表稿）。
 *
 * 2026-11-10 按 Daniel 的要求从「专题词汇」闪卡改成 IT 听力式的阅读文章：
 * 一篇稿子按原稿顺序读下来——正文 23 句分五节、每句带注音分段 + 中文译文 + 逐句朗读，
 * 之后是「来宾问答」6 组问答对，文末一条救命句小注。
 *
 * 数据：public/data/reading/kanji-journey.json（结构见 public/data/reading/README.md）。
 * 它仍挂在专题目录里（public/data/topics/index.json 中 kind: "reading" 的条目），
 * 路由沿用 #/topics/kanji-journey，由 TopicsPage 分流到 KanjiJourneyPage 渲染。
 * 日文原句与原稿 ~/workspace/user/kanji-journey-script.md 逐字一致（迁移时逐句核对过），
 * Q6 回答里的「〇週間」是留给 Daniel 按实际填的占位，不要替他编数字。
 */

import type { ItListeningRubySegment } from "./it-listening";

export type { ItListeningRubySegment as KjRubySegment };

export type KjSentence = {
	/** 稳定 id（沿用旧卡片 id，如 kj-001）；可选，问答里的问/答句不单独编号时省略。 */
	id?: string;
	jp: string;
	/** 注音分段（可选）：各片段 t 依次拼接应与 jp 完全一致；带 r 的片段应是汉字串。 */
	ruby?: ItListeningRubySegment[];
	zh: string;
	en?: string;
};

export type KjSection = {
	zh: string;
	ja?: string;
	en?: string;
	sentences: (KjSentence & { id: string })[];
};

export type KjQaPair = {
	id: string;
	question: KjSentence;
	answer: KjSentence;
	/** 回答下方的补充说明（如 Q6 的「按实际回答」提示）。 */
	note_zh?: string;
};

export type KanjiJourneyArticle = {
	version: 1;
	slug: "kanji-journey";
	title_zh: string;
	title_ja: string;
	title_en?: string;
	description_zh?: string;
	description_en?: string;
	sections: KjSection[];
	qa: KjQaPair[];
	rescue: KjSentence & { id: string; label_zh?: string };
};

const KANJI_RE = /[\u3400-\u9fff\u3005々〆ヶ]/;

/**
 * 阅读数据校验（与 tests/unit/kanji-journey-reading.test.ts 共用口径）：
 * 结构完整；每句注音分段拼接 == 原句；带读音的片段必须是汉字串、
 * 含汉字的片段必须有读音（站内注音规矩：只给汉字注音、读音不许漏）。
 */
export function validateKanjiJourneyArticle(data: unknown): string[] {
	const errors: string[] = [];
	const isRec = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
	if (!isRec(data)) return ["article must be an object"];
	if (data.version !== 1) errors.push("version must be 1");
	if (data.slug !== "kanji-journey") errors.push("slug must be kanji-journey");
	for (const key of ["title_zh", "title_ja"] as const) {
		if (typeof data[key] !== "string" || !(data[key] as string).trim()) errors.push(`${key} is required`);
	}
	const checkSentence = (s: unknown, where: string) => {
		if (!isRec(s)) {
			errors.push(`${where}: sentence must be an object`);
			return;
		}
		if (typeof s.jp !== "string" || !s.jp || s.jp !== s.jp.trim()) errors.push(`${where}: jp must be a non-empty trimmed string`);
		if (typeof s.zh !== "string" || !s.zh.trim()) errors.push(`${where}: zh is required`);
		if (!Array.isArray(s.ruby) || !s.ruby.length) {
			errors.push(`${where}: ruby segments are required`);
			return;
		}
		if (typeof s.jp !== "string") return;
		let joined = "";
		for (const seg of s.ruby as { t?: unknown; r?: unknown }[]) {
			if (!isRec(seg) || typeof seg.t !== "string" || !seg.t) {
				errors.push(`${where}: every ruby segment needs non-empty t`);
				continue;
			}
			joined += seg.t;
			if (seg.r !== undefined) {
				if (typeof seg.r !== "string" || !seg.r) errors.push(`${where}: segment "${seg.t}" has an empty reading`);
				else if (!KANJI_RE.test(seg.t)) errors.push(`${where}: segment "${seg.t}" has a reading but contains no kanji`);
			} else if (KANJI_RE.test(seg.t)) {
				errors.push(`${where}: segment "${seg.t}" contains kanji but has no reading`);
			}
		}
		if (joined !== s.jp) errors.push(`${where}: ruby segments join to "${joined}", not jp "${s.jp}"`);
	};
	if (!Array.isArray(data.sections) || !data.sections.length) errors.push("sections must be a non-empty array");
	else
		data.sections.forEach((sec, i) => {
			if (!isRec(sec) || typeof sec.zh !== "string" || !sec.zh) {
				errors.push(`sections[${i}]: zh is required`);
				return;
			}
			if (!Array.isArray(sec.sentences) || !sec.sentences.length) {
				errors.push(`sections[${i}]: sentences must be a non-empty array`);
				return;
			}
			sec.sentences.forEach((s, j) => checkSentence(s, `sections[${i}].sentences[${j}]`));
		});
	if (!Array.isArray(data.qa) || !data.qa.length) errors.push("qa must be a non-empty array");
	else
		data.qa.forEach((pair, i) => {
			if (!isRec(pair)) {
				errors.push(`qa[${i}]: must be an object`);
				return;
			}
			checkSentence(pair.question, `qa[${i}].question`);
			checkSentence(pair.answer, `qa[${i}].answer`);
		});
	checkSentence(data.rescue, "rescue");
	return errors;
}

export function isKanjiJourneyArticle(v: unknown): v is KanjiJourneyArticle {
	return validateKanjiJourneyArticle(v).length === 0;
}
