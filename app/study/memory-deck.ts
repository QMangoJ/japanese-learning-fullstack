import { getKanjiWordUsage, getReviewedKanjiWordUsage, kanjiWordSurface, type KanjiWord } from "./kanji-word-usage";
import { getN2KanjiWordUsage } from "./n2-kanji-word-usage";
import type { MemoryCardItem } from "./memory-cards";
import type { ListeningLesson } from "../data/listening-n3-lesson-types";

export function kanaFromRuby(html?: string, reading?: string, jp?: string): string | undefined {
	if (reading && /^[\u3040-\u30ffー\s・]+$/.test(reading)) {
		const kana = reading.replace(/[\s・]+/g, "");
		if (jp && stripParens(jp) === kana) return undefined;
		return kana;
	}
	if (!html) return undefined;
	const kana = html
		.replace(/<ruby>[^<]*<rt>([^<]*)<\/rt><\/ruby>/g, "$1")
		.replace(/<[^>]+>/g, "")
		.replace(/[（(][^）)]*[）)]?/g, "")
		.trim();
	const surface = stripParens(jp || "");
	if (!kana || kana === surface || !/[\u3040-\u30ff]/.test(kana)) return undefined;
	return kana;
}

function stripParens(text: string): string {
	return text.replace(/[（(][^）)]*[）)]?/g, "").trim();
}

export function vocabNeedles(jp: string): string[] {
	return jp
		.split(/[／/]/)
		.map((part) => part.replace(/[（(][^）)]*[）)]/g, "").replace(/[〜～].*$/, "").trim())
		.filter((part) => part.length >= 2);
}

export function exampleFromVocabDay(jp: string, day: { exercises?: { sections?: { items?: { q?: string }[] }[] } }): { jp: string } | undefined {
	const needles = vocabNeedles(jp);
	if (!needles.length) return undefined;
	for (const sec of day.exercises?.sections || []) {
		for (const it of sec.items || []) {
			const q = String(it.q || "");
			if (!needles.some((n) => q.includes(n))) continue;
			const sentence = q
				.replace(/（[a-dA-Dａ-ｄ]\.\s*[^）]*）/g, (chunk) => needles.find((n) => chunk.includes(n)) || "")
				.replace(/（\s*）|\(\s*\)/g, needles[0] || "")
				.replace(/＿+/g, needles[0] || "")
				.replace(/\s+/g, "");
			if (sentence.length < 6 || sentence === jp) continue;
			return { jp: sentence };
		}
	}
	return undefined;
}

export function stripBraceRuby(text: string): string {
	return text.replace(/\{([^{}|]+)\|([^{}|]+)\}/g, "$1");
}

export function braceToRubyHtml(text: string): string {
	if (!text.includes("{")) return text;
	return text.replace(/\{([^{}|]+)\|([^{}|]+)\}/g, "<ruby>$1<rt>$2</rt></ruby>");
}

export function exampleFromReadingDay(
	jp: string,
	day: { grammar?: { example?: { jp?: string; cn?: string; en?: string } }[] },
): { jp: string; jpHtml?: string; cn?: string; en?: string } | undefined {
	for (const g of day.grammar || []) {
		const ex = g.example;
		if (!ex?.jp) continue;
		if (!stripBraceRuby(ex.jp).includes(jp)) continue;
		return {
			jp: stripBraceRuby(ex.jp),
			jpHtml: braceToRubyHtml(ex.jp),
			cn: ex.cn,
			en: ex.en,
		};
	}
	return undefined;
}

function kanjiExample(word: KanjiWord, module: string) {
	const usage =
		module === "n2kanji" ? getN2KanjiWordUsage(word) : module === "kanji" ? getKanjiWordUsage(word) : getReviewedKanjiWordUsage(word);
	if (!usage) return {};
	const focus = usage.focus || kanjiWordSurface(word);
	return {
		exampleJp: `${usage.before}${focus}${usage.after}`,
		exampleCn: usage.exampleCn,
		exampleEn: usage.exampleEn,
	};
}

export function cardsFromVocabWeeks(weeks: any[], module: string): MemoryCardItem[] {
	const items: MemoryCardItem[] = [];
	for (const w of weeks || []) {
		for (const day of w.days || []) {
			(day.sections || []).forEach((sec: any, si: number) => {
				(sec.items || []).forEach((it: any, ii: number) => {
					if (!it?.jp || !(it.cn || it.en)) return;
					const ex = exampleFromVocabDay(it.jp, day);
					items.push({
						id: `${module}:${w.n}-${day.day}:${si}-${ii}:${it.jp}`,
						jp: it.jp,
						jpHtml: it.jp_r,
						reading: kanaFromRuby(it.jp_r, it.reading, it.jp),
						cn: it.cn,
						en: it.en,
						kind: "word",
						week: w.n,
						day: day.day,
						exampleJp: ex?.jp,
					});
				});
			});
		}
	}
	return items;
}

export function cardsFromKanjiWeeks(weeks: any[], module: string): MemoryCardItem[] {
	const items: MemoryCardItem[] = [];
	for (const w of weeks || []) {
		for (const day of w.days || []) {
			(day.kanji || []).forEach((k: any, ki: number) => {
				(k.words || []).forEach((wd: any, wi: number) => {
					if (!wd?.jp || !(wd.cn || wd.en)) return;
					items.push({
						id: `${module}:${w.n}-${day.day}:${ki}-${wi}:${wd.jp}`,
						jp: wd.jp,
						jpHtml: wd.jp_r,
						reading: kanaFromRuby(wd.jp_r, wd.reading, wd.jp),
						cn: wd.cn,
						en: wd.en,
						kind: "word",
						week: w.n,
						day: day.day,
						...kanjiExample(wd, module),
					});
				});
			});
		}
	}
	return items;
}

export function cardsFromReadingWeeks(weeks: any[], module: string): MemoryCardItem[] {
	const items: MemoryCardItem[] = [];
	for (const w of weeks || []) {
		for (const day of w.days || []) {
			(day.vocab || []).forEach((it: any, ii: number) => {
				if (!it?.jp || !(it.cn || it.en)) return;
				const ex = exampleFromReadingDay(it.jp, day);
				items.push({
					id: `${module}:${w.n}-${day.day}:v${ii}:${it.jp}`,
					jp: it.jp,
					reading: it.kana,
					cn: it.cn,
					en: it.en,
					kind: "word",
					week: w.n,
					day: day.day,
					exampleJp: ex?.jp,
					exampleJpHtml: ex?.jpHtml,
					exampleCn: ex?.cn,
					exampleEn: ex?.en,
				});
			});
			(day.expressions || []).forEach((it: any, ii: number) => {
				if (!it?.jp || !(it.cn || it.en)) return;
				items.push({
					id: `${module}:${w.n}-${day.day}:e${ii}:${it.jp}`,
					jp: it.jp,
					reading: it.kana,
					cn: it.cn,
					en: it.en,
					kind: "expression",
					week: w.n,
					day: day.day,
				});
			});
		}
	}
	return items;
}

export function parseListeningHead(k: string): { jp: string; reading?: string } {
	const text = String(k || "")
		.replace(/\s+/g, "")
		.replace(/↔.*$/, "")
		.trim();
	const kanaThenKanji = text.match(/^([ぁ-んァ-ンー]+)[（(]([^）)]+)[）)]$/);
	if (kanaThenKanji && /[一-龯]/.test(kanaThenKanji[2])) {
		return { jp: kanaThenKanji[2], reading: kanaThenKanji[1] };
	}
	const kanjiThenKana = text.match(/^([^（(]+)[（(]([ぁ-んァ-ンー]+)[）)]$/);
	if (kanjiThenKana && /[一-龯]/.test(kanjiThenKana[1])) {
		return { jp: kanjiThenKana[1], reading: kanjiThenKana[2] };
	}
	return { jp: text };
}

export function splitListeningGloss(v: string): { en?: string; cn?: string } {
	const parts = String(v || "")
		.split(/[　]+/)
		.map((part) => part.trim())
		.filter(Boolean);
	if (parts.length >= 2) {
		const last = parts[parts.length - 1];
		if (/[\u4e00-\u9fff]/.test(last)) {
			return { en: parts.slice(0, -1).join(" "), cn: last };
		}
	}
	if (/[\u4e00-\u9fff]/.test(v) && !/[A-Za-z]{4,}/.test(v)) return { cn: v };
	return { en: v };
}

export function cardsFromListeningLesson(
	lesson: Pick<ListeningLesson, "blocks">,
	chapter: number,
	section: number,
	module: string,
): MemoryCardItem[] {
	const items: MemoryCardItem[] = [];
	let lastP: { jp: string; cn?: string; en?: string } | null = null;
	(lesson.blocks || []).forEach((block, bi) => {
		if (block.type === "p") lastP = { jp: block.jp, cn: block.cn, en: block.en };
		if (block.type === "example" && block.lines?.length) {
			lastP = { jp: block.lines[0], cn: block.title };
		}
		if (block.type !== "kv") return;
		block.rows.forEach((row, ri) => {
			const parsed = parseListeningHead(row.k);
			const gloss = splitListeningGloss(row.v);
			if (!parsed.jp || !(gloss.cn || gloss.en)) return;
			const ex = lastP && lastP.jp.includes(parsed.jp) ? lastP : undefined;
			items.push({
				id: `${module}:${chapter}-${section}:${bi}-${ri}:${parsed.jp}`,
				jp: parsed.jp,
				reading: parsed.reading,
				cn: gloss.cn,
				en: gloss.en,
				kind: "word",
				week: chapter,
				day: section,
				exampleJp: ex?.jp,
				exampleCn: ex?.cn,
				exampleEn: ex?.en,
			});
		});
	});
	return items;
}

export function dedupeMemoryCards(items: MemoryCardItem[]): MemoryCardItem[] {
	const seen = new Map<string, MemoryCardItem>();
	for (const item of items) {
		const prev = seen.get(item.jp);
		if (!prev) seen.set(item.jp, item);
		else if (!prev.exampleJp && item.exampleJp) seen.set(item.jp, item);
	}
	return [...seen.values()];
}

export async function loadListeningDeck(module: string): Promise<MemoryCardItem[]> {
	const items: MemoryCardItem[] = [];
	if (module === "n2listening") {
		const { listeningN2BookChapters } = await import("../data/listening-n2-book");
		const { getListeningN2Lesson } = await import("../data/listening-n2-lessons");
		for (const ch of listeningN2BookChapters()) {
			for (const sec of ch.sections) {
				const lesson = getListeningN2Lesson(ch.number, sec.number);
				if (lesson) items.push(...cardsFromListeningLesson(lesson, ch.number, sec.number, module));
			}
		}
	} else {
		const { listeningBookChapters } = await import("../data/listening-n3-book");
		const { getListeningLesson } = await import("../data/listening-n3-lessons");
		for (const ch of listeningBookChapters) {
			for (const sec of ch.sections) {
				const lesson = getListeningLesson(ch.number, sec.number);
				if (lesson) items.push(...cardsFromListeningLesson(lesson, ch.number, sec.number, module));
			}
		}
	}
	return dedupeMemoryCards(items);
}
