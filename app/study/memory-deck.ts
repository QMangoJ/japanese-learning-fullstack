import kanjiReadings from "../data/lesson-review-kanji-readings.json";
import type { ListeningLesson } from "../data/listening-n3-lesson-types";
import { applyKanjiReadings, buildReviewRuby, toHiragana } from "./lesson-review";
import { getKanjiWordUsage, getReviewedKanjiWordUsage, kanjiWordSurface, type KanjiWord } from "./kanji-word-usage";
import type { MemoryCardItem } from "./memory-cards";
import { getN2KanjiWordUsage } from "./n2-kanji-word-usage";
import { K, K2, V, V2 } from "./store";

const BASE_READINGS = kanjiReadings as Record<string, string>;

function escapeXml(text: string): string {
	return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function harvestRubyReadings(html: string, into: Record<string, string>) {
	const re = /<ruby>([^<]*)<rt>([^<]*)<\/rt><\/ruby>/g;
	let match: RegExpExecArray | null;
	while ((match = re.exec(html))) {
		const word = match[1].replace(/[（(][^）)]*[）)]?/g, "").trim();
		const reading = toHiragana(match[2].replace(/[\s・]+/g, ""));
		if (word && reading && /[一-龯]/.test(word)) into[word] = reading;
	}
}

function harvestBraceReadings(text: string, into: Record<string, string>) {
	const re = /\{([^{}|]+)\|([^{}|]+)\}/g;
	let match: RegExpExecArray | null;
	while ((match = re.exec(text))) {
		const word = match[1].trim();
		const reading = toHiragana(match[2].replace(/[\s・]+/g, ""));
		if (word && reading && /[一-龯]/.test(word)) into[word] = reading;
	}
}

function addHeadwordReading(into: Record<string, string>, jp: string, reading?: string) {
	if (!reading || !/^[\u3040-\u30ffー\s・]+$/.test(reading)) return;
	const core = stripParens(jp)
		.split(/[／/]/)[0]
		.replace(/[：:].*$/, "")
		.trim();
	if (!core || !/[一-龯]/.test(core) || core.length > 16) return;
	into[core] = toHiragana(reading.replace(/[\s・]+/g, ""));
}

export function collectReadingsFromVocabWeeks(weeks: any[]): Record<string, string> {
	const into: Record<string, string> = {};
	for (const w of weeks || []) {
		for (const day of w.days || []) {
			for (const sec of day.sections || []) {
				for (const it of sec.items || []) {
					if (it.jp_r) harvestRubyReadings(String(it.jp_r), into);
					addHeadwordReading(into, String(it.jp || ""), it.reading || kanaFromRuby(it.jp_r, it.reading, it.jp));
				}
			}
		}
	}
	return into;
}

export function collectReadingsFromKanjiWeeks(weeks: any[]): Record<string, string> {
	const into: Record<string, string> = {};
	for (const w of weeks || []) {
		for (const day of w.days || []) {
			for (const k of day.kanji || []) {
				for (const wd of k.words || []) {
					if (wd.jp_r) harvestRubyReadings(String(wd.jp_r), into);
					addHeadwordReading(into, String(wd.jp || ""), wd.reading);
				}
			}
		}
	}
	return into;
}

export function collectReadingsFromReadingWeeks(weeks: any[]): Record<string, string> {
	const into: Record<string, string> = {};
	for (const w of weeks || []) {
		for (const day of w.days || []) {
			for (const it of day.vocab || []) {
				addHeadwordReading(into, String(it.jp || ""), it.kana);
			}
			for (const it of day.expressions || []) {
				addHeadwordReading(into, String(it.jp || ""), it.kana);
			}
			for (const g of day.grammar || []) {
				if (g.example?.jp) harvestBraceReadings(String(g.example.jp), into);
			}
		}
	}
	return into;
}

function mergedReadings(...extra: Record<string, string>[]): Record<string, string> {
	return Object.assign({}, BASE_READINGS, ...extra);
}

function headwordReading(jp: string, reading?: string): string | undefined {
	if (!reading || !/^[\u3040-\u30ffー\s・]+$/.test(reading)) return undefined;
	if (/[。！？：:＝=（(\n]/.test(jp) || jp.length > 12) return undefined;
	if (/[のをにはがとでもへ]/.test(jp) && jp.length > 4) return undefined;
	return reading;
}

export function annotateText(
	jp: string,
	opts: { reading?: string; html?: string; readings?: Record<string, string> } = {},
): string | undefined {
	if (!jp) return undefined;
	if (opts.html?.includes("<ruby")) return opts.html;
	if (jp.includes("{") && /\{[^{}|]+\|[^{}|]+\}/.test(jp)) {
		const html = braceToRubyHtml(jp);
		if (html.includes("<ruby")) return html;
	}
	const readings = opts.readings || BASE_READINGS;
	const built = buildReviewRuby(jp, headwordReading(jp, opts.reading), readings);
	if (built) return built;
	if (headwordReading(jp, opts.reading) && /[一-龯]/.test(jp)) {
		return `<ruby>${escapeXml(jp)}<rt>${toHiragana(opts.reading!.replace(/[\s・]+/g, ""))}</rt></ruby>`;
	}
	return undefined;
}

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

function kanjiExample(word: KanjiWord, module: string, readings: Record<string, string>) {
	const usage =
		module === "n2kanji" ? getN2KanjiWordUsage(word) : module === "kanji" ? getKanjiWordUsage(word) : getReviewedKanjiWordUsage(word);
	if (!usage) return {};
	const focus = usage.focus || kanjiWordSurface(word);
	const sentence = `${usage.before}${focus}${usage.after}`;
	const beforeHtml = annotateText(usage.before, { readings }) || escapeXml(usage.before);
	const afterHtml = annotateText(usage.after, { readings }) || escapeXml(usage.after);
	const focusHtml = usage.focusReading
		? `<ruby>${escapeXml(focus)}<rt>${toHiragana(usage.focusReading)}</rt></ruby>`
		: annotateText(focus, { readings }) || escapeXml(focus);
	return {
		exampleJp: sentence,
		exampleJpHtml: `${beforeHtml}${focusHtml}${afterHtml}`,
		exampleCn: usage.exampleCn,
		exampleEn: usage.exampleEn,
	};
}

export function cardsFromVocabWeeks(weeks: any[], module: string): MemoryCardItem[] {
	const readings = mergedReadings(collectReadingsFromVocabWeeks(weeks));
	const items: MemoryCardItem[] = [];
	for (const w of weeks || []) {
		for (const day of w.days || []) {
			(day.sections || []).forEach((sec: any, si: number) => {
				(sec.items || []).forEach((it: any, ii: number) => {
					if (!it?.jp || !(it.cn || it.en)) return;
					const jpHtml = annotateText(it.jp, { html: it.jp_r, reading: it.reading, readings });
					const ex = exampleFromVocabDay(it.jp, day);
					items.push({
						id: `${module}:${w.n}-${day.day}:${si}-${ii}:${it.jp}`,
						jp: it.jp,
						jpHtml,
						reading: kanaFromRuby(jpHtml, it.reading, it.jp),
						cn: it.cn,
						en: it.en,
						kind: "word",
						week: w.n,
						day: day.day,
						exampleJp: ex?.jp,
						exampleJpHtml: ex?.jp ? annotateText(ex.jp, { readings }) : undefined,
					});
				});
			});
		}
	}
	return items;
}

export function cardsFromKanjiWeeks(weeks: any[], module: string): MemoryCardItem[] {
	const readings = mergedReadings(collectReadingsFromKanjiWeeks(weeks));
	const items: MemoryCardItem[] = [];
	for (const w of weeks || []) {
		for (const day of w.days || []) {
			(day.kanji || []).forEach((k: any, ki: number) => {
				(k.words || []).forEach((wd: any, wi: number) => {
					if (!wd?.jp || !(wd.cn || wd.en)) return;
					const jpHtml = annotateText(wd.jp, { html: wd.jp_r, reading: wd.reading, readings });
					items.push({
						id: `${module}:${w.n}-${day.day}:${ki}-${wi}:${wd.jp}`,
						jp: wd.jp,
						jpHtml,
						reading: kanaFromRuby(jpHtml, wd.reading, wd.jp),
						cn: wd.cn,
						en: wd.en,
						kind: "word",
						week: w.n,
						day: day.day,
						...kanjiExample(wd, module, readings),
					});
				});
			});
		}
	}
	return items;
}

export function cardsFromReadingWeeks(weeks: any[], module: string): MemoryCardItem[] {
	const readings = mergedReadings(collectReadingsFromReadingWeeks(weeks));
	const items: MemoryCardItem[] = [];
	for (const w of weeks || []) {
		for (const day of w.days || []) {
			(day.vocab || []).forEach((it: any, ii: number) => {
				if (!it?.jp || !(it.cn || it.en)) return;
				const ex = exampleFromReadingDay(it.jp, day);
				const jpHtml = annotateText(it.jp, { reading: it.kana, readings });
				items.push({
					id: `${module}:${w.n}-${day.day}:v${ii}:${it.jp}`,
					jp: it.jp,
					jpHtml,
					reading: it.kana || kanaFromRuby(jpHtml, it.kana, it.jp),
					cn: it.cn,
					en: it.en,
					kind: "word",
					week: w.n,
					day: day.day,
					exampleJp: ex?.jp,
					exampleJpHtml: ex?.jpHtml || (ex?.jp ? annotateText(ex.jp, { readings }) : undefined),
					exampleCn: ex?.cn,
					exampleEn: ex?.en,
				});
			});
			(day.expressions || []).forEach((it: any, ii: number) => {
				if (!it?.jp || !(it.cn || it.en)) return;
				const jpHtml = annotateText(it.jp, { reading: it.kana, readings });
				items.push({
					id: `${module}:${w.n}-${day.day}:e${ii}:${it.jp}`,
					jp: it.jp,
					jpHtml,
					reading: headwordReading(it.jp, it.kana) || kanaFromRuby(jpHtml, it.kana, it.jp),
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
	readings: Record<string, string> = BASE_READINGS,
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
			const jpHtml = annotateText(parsed.jp, { reading: parsed.reading, readings });
			items.push({
				id: `${module}:${chapter}-${section}:${bi}-${ri}:${parsed.jp}`,
				jp: parsed.jp,
				jpHtml,
				reading: parsed.reading || kanaFromRuby(jpHtml, parsed.reading, parsed.jp),
				cn: gloss.cn,
				en: gloss.en,
				kind: "word",
				week: chapter,
				day: section,
				exampleJp: ex?.jp,
				exampleJpHtml: ex?.jp ? annotateText(ex.jp, { readings }) : undefined,
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
	const readings = mergedReadings(
		collectReadingsFromVocabWeeks(V.weeks),
		collectReadingsFromVocabWeeks(V2.weeks),
		collectReadingsFromKanjiWeeks(K.weeks),
		collectReadingsFromKanjiWeeks(K2.weeks),
	);
	const items: MemoryCardItem[] = [];
	if (module === "n2listening") {
		const { listeningN2BookChapters } = await import("../data/listening-n2-book");
		const { getListeningN2Lesson } = await import("../data/listening-n2-lessons");
		for (const ch of listeningN2BookChapters()) {
			for (const sec of ch.sections) {
				const lesson = getListeningN2Lesson(ch.number, sec.number);
				if (lesson) items.push(...cardsFromListeningLesson(lesson, ch.number, sec.number, module, readings));
			}
		}
	} else {
		const { listeningBookChapters } = await import("../data/listening-n3-book");
		const { getListeningLesson } = await import("../data/listening-n3-lessons");
		for (const ch of listeningBookChapters) {
			for (const sec of ch.sections) {
				const lesson = getListeningLesson(ch.number, sec.number);
				if (lesson) items.push(...cardsFromListeningLesson(lesson, ch.number, sec.number, module, readings));
			}
		}
	}
	return dedupeMemoryCards(items);
}
