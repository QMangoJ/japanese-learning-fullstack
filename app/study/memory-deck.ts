import kanjiReadings from "../data/lesson-review-kanji-readings.json";
import type { ListeningLesson } from "../data/listening-n3-lesson-types";
import {
	N3_KANJI_EXAM_KEYS,
	answerMapFromKeys,
	numericExamAnswers,
	parseCircledAnswers,
	parseExamAnswerDetails,
	passageBlankPrompt,
} from "./exam-answers";
import { applyKanjiReadings, buildReviewRuby, toHiragana } from "./lesson-review";
import { getKanjiWordUsage, getReviewedKanjiWordUsage, kanjiWordSurface, type KanjiWord } from "./kanji-word-usage";
import type { MemoryCardItem } from "./memory-cards";
import { getN2KanjiWordUsage } from "./n2-kanji-word-usage";
import { G, G1, G2, G4, K, K1, K2, K4, V, V1, V2, V4 } from "./store";

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
			for (const sec of day.exercises?.sections || []) {
				for (const it of sec.items || []) {
					if (it.q_r) harvestRubyReadings(String(it.q_r), into);
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
			for (const snippet of day.snippets || []) harvestBraceReadings(String(snippet.jp || ""), into);
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

export type ExampleHit = { jp: string; jpHtml?: string; cn?: string; en?: string };

export function cleanQuizSentence(q: string, needles: string[]): string {
	return q
		.replace(/（[a-dA-Dａ-ｄ]\.\s*[^）]*）/g, (chunk) => {
			const hit = needles.find((n) => chunk.includes(n));
			if (hit) return hit;
			const first = chunk.match(/[a-dA-Dａ-ｄ]\.\s*([^\s　）]+)/);
			return first?.[1] || "";
		})
		.replace(/（\s*）|\(\s*\)/g, needles[0] || "")
		.replace(/＿+/g, needles[0] || "")
		.replace(/\s+/g, "");
}

export function cleanQuizHtml(html: string, needles: string[]): string | undefined {
	if (!html || !html.includes("<ruby")) return undefined;
	const optionInner = (chunk: string, letter: string) => {
		const match = chunk.match(new RegExp(`${letter}\\.\\s*([\\s\\S]*?)(?=[a-dA-Dａ-ｄ]\\. |）|$)`));
		return match?.[1]?.replace(/[）)]/g, "").trim() || "";
	};
	const cleaned = html
		.replace(/（[a-dA-Dａ-ｄ]\.[\s\S]*?）/g, (chunk) => {
			const plain = chunk.replace(/<[^>]+>/g, "");
			const hit = needles.find((n) => plain.includes(n));
			if (hit) {
				for (const letter of ["a", "b", "c", "d", "A", "B", "C", "D", "ａ", "ｂ"]) {
					const inner = optionInner(chunk, letter);
					const innerPlain = inner.replace(/<[^>]+>/g, "");
					if (inner && (innerPlain.includes(hit) || hit.includes(innerPlain))) return inner;
				}
				return hit;
			}
			return optionInner(chunk, "a") || optionInner(chunk, "ａ");
		})
		.replace(/\s+/g, "");
	return cleaned.includes("<ruby") ? cleaned : undefined;
}

export function exampleFromCorpus(jp: string, corpus: ExampleHit[]): ExampleHit | undefined {
	const needles = vocabNeedles(jp);
	const core = stripParens(jp).split(/[／/]/)[0].trim();
	if (core.length >= 2 && !needles.includes(core)) needles.unshift(core);
	const sorted = [...needles].filter((n) => n.length >= 2).sort((a, b) => b.length - a.length);
	if (!sorted.length) return undefined;
	for (const item of corpus) {
		const plain = stripBraceRuby(item.jp);
		if (!sorted.some((n) => plain.includes(n))) continue;
		let sentence = plain;
		if (/（[a-dA-Dａ-ｄ]/.test(sentence) || /＿/.test(sentence)) sentence = cleanQuizSentence(sentence, sorted);
		if (sentence.length < 6 || sentence === jp) continue;
		const html = item.jp.includes("{")
			? braceToRubyHtml(item.jp)
			: /（[a-dA-Dａ-ｄ]/.test(item.jp) && item.jpHtml
				? cleanQuizHtml(item.jpHtml, sorted)
				: item.jpHtml?.includes("<ruby")
					? item.jpHtml
					: undefined;
		return { jp: sentence, jpHtml: html, cn: item.cn, en: item.en };
	}
	return undefined;
}

function translationByNumber(items: { n?: number; translation?: string }[] | undefined) {
	const map = new Map<number, string>();
	for (const item of items || []) {
		if (item.n != null && item.translation) map.set(item.n, item.translation);
	}
	return map;
}

export function exampleFromVocabDay(
	jp: string,
	day: { week?: number; day?: number; exercises?: { sections?: { items?: { n?: number; q?: string; q_r?: string }[] }[] } },
	daily?: { items?: { n?: number; translation?: string }[] },
): ExampleHit | undefined {
	const byN = translationByNumber(daily?.items);
	const corpus: ExampleHit[] = [];
	for (const sec of day.exercises?.sections || []) {
		for (const it of sec.items || []) {
			if (it.q) corpus.push({ jp: String(it.q), jpHtml: it.q_r, cn: byN.get(it.n!) });
		}
	}
	return exampleFromCorpus(jp, corpus);
}

function collectVocabQuizCorpus(
	weeks: any[],
	daily?: Record<string, { items?: { n?: number; translation?: string }[] }>,
): ExampleHit[] {
	const out: ExampleHit[] = [];
	for (const w of weeks || []) {
		for (const day of w.days || []) {
			const byN = translationByNumber(daily?.[`w${w.n}d${day.day}`]?.items);
			for (const sec of day.exercises?.sections || []) {
				for (const it of sec.items || []) {
					if (it.q) out.push({ jp: String(it.q), jpHtml: it.q_r, cn: byN.get(it.n) });
				}
			}
			for (const key of ["mondai1", "mondai2", "mondai3", "mondai4"] as const) {
				for (const it of day[key]?.items || []) {
					if (it.q) out.push({ jp: String(it.q), jpHtml: it.q_r, cn: byN.get(it.n) });
				}
			}
		}
	}
	return out;
}

function vocabBook(module: string) {
	if (module === "n2vocab") return V2;
	if (module === "n4vocab") return V4;
	if (module === "n1vocab") return V1;
	return V;
}

function fallbackVocabExample(jp: string, cn?: string, en?: string): ExampleHit {
	const word = vocabNeedles(jp)[0] || stripParens(jp).split(/[／/]/)[0] || jp;
	if (/する$/.test(word)) {
		return {
			jp: `来週${word}予定です。`,
			cn: cn ? `打算下周${cn}。` : undefined,
			en: en ? `I plan to ${en} next week.` : undefined,
		};
	}
	if (/\(な\)|（な）/.test(jp)) {
		const base = word.replace(/な$/, "");
		return {
			jp: `とても${base}な場所です。`,
			cn: cn ? `那是个很${cn}的地方。` : undefined,
			en: en ? `It's a very ${en} place.` : undefined,
		};
	}
	if (/い$/.test(word) && /[一-龯]/.test(word) && word.length <= 5) {
		return {
			jp: `今日は${word}です。`,
			cn: cn ? `今天很${cn}。` : undefined,
			en: en ? `It's ${en} today.` : undefined,
		};
	}
	return {
		jp: `今、${word}の話をしています。`,
		cn: cn ? `现在正在说「${cn}」。` : undefined,
		en: en ? `We're talking about "${en}" right now.` : undefined,
	};
}

let headwordCorpus: ExampleHit[] | null = null;
let headwordCorpusToken = "";

function bookDataToken(book: any): string {
	const weeks = book?.weeks?.length || 0;
	const daily = book?.daily_translations ? Object.keys(book.daily_translations).length : 0;
	return `${weeks}.${daily}`;
}

/** An example sentence already in a loaded vocab book, when the headword appears in it. */
export function lookupHeadwordExample(jp: string): ExampleHit | undefined {
	const token = [V, V2, V4, V1].map(bookDataToken).join(":");
	if (!headwordCorpus || headwordCorpusToken !== token) {
		headwordCorpusToken = token;
		headwordCorpus = [V, V2, V4, V1].flatMap((book) =>
			collectVocabQuizCorpus(book?.weeks || [], book?.daily_translations),
		);
	}
	return exampleFromCorpus(jp, headwordCorpus);
}

export type MistakeGloss = {
	cn?: string;
	en?: string;
	/** Matched a quiz question itself (not just a headword), so it is the translation of this exact prompt. */
	question?: boolean;
	/** The passage sentence for an old passage-blank note that was saved without one. */
	prompt?: string;
};

/** Compare a mistake prompt with a textbook headword or question. */
export function glossKey(text: string): string {
	return text
		.replace(/<[^>]+>/g, "")
		.replace(/\{([^{}|]+)\|[^{}|]+\}/g, "$1")
		.replace(/[（(][^）)]*[）)]?/g, "")
		.replace(/[〜～]/g, "")
		.replace(/[　\s]+/g, "")
		.trim();
}

/** A quiz prompt together with its correct answer. Exact even when the prompt is one kanji (用法 / 読み questions). */
function answerKey(prompt: string, answer: string): string {
	return `qa:${glossKey(prompt)}\u0000${glossKey(answer)}`;
}

export function addMistakeGloss(index: Map<string, MistakeGloss>, jp: string, gloss: MistakeGloss, answer?: string) {
	if (!gloss.cn && !gloss.en) return;
	const keys = new Set<string>();
	if (answer && glossKey(jp) && glossKey(answer)) keys.add(answerKey(jp, answer));
	const whole = glossKey(jp);
	if (whole.length >= 2) keys.add(whole);
	for (const part of jp.split(/[／/]/)) {
		const key = glossKey(part);
		if (key.length >= 2) keys.add(key);
	}
	for (const key of keys) if (!index.has(key)) index.set(key, gloss);
}

/**
 * Before passage blanks carried a prompt, their notes held only the two
 * answers. Key those by (wrong answer, correct answer) so old notes still
 * find their sentence and translation.
 */
function legacyBlankKey(picked: string, answer: string): string {
	return `blank:${glossKey(picked)}\u0000${glossKey(answer)}`;
}

function addLegacyBlankGloss(index: Map<string, MistakeGloss>, opts: string[], answer: string, gloss: MistakeGloss) {
	for (const opt of opts) {
		const key = legacyBlankKey(String(opt), answer);
		if (String(opt) !== answer && !index.has(key)) index.set(key, gloss);
	}
}

/** The learner's wrong answer, when a note has no prompt line (old passage-blank notes). */
export function legacyBlankPick(jp: string): string | undefined {
	const match = jp.match(/^(?:你的答案|Your answer)：\s*(.+)$/);
	return match ? match[1].trim() : undefined;
}

export function findMistakeGloss(index: Map<string, MistakeGloss>, jp: string, answer?: string): MistakeGloss | undefined {
	if (answer) {
		const exact = index.get(answerKey(jp, answer));
		if (exact) return exact;
		const picked = legacyBlankPick(jp);
		const legacy = picked ? index.get(legacyBlankKey(picked, answer)) : undefined;
		if (legacy) return legacy;
	}
	for (const text of [jp, jp.split("\n")[0] || ""]) {
		const key = glossKey(text);
		if (key.length >= 2 && index.has(key)) return index.get(key);
	}
	return undefined;
}

const QUESTION_BUCKETS = ["mondai1", "mondai2", "mondai3", "mondai4"] as const;
const GRAMMAR_EXAM_BUCKETS = ["mondai1", "mondai2", "mondai3"] as const;

type QuizItem = { n?: number; q?: string; opts?: string[] };

function questionGloss(cn?: string, en?: string): MistakeGloss | undefined {
	return cn || en ? { cn: cn || undefined, en: en || undefined, question: true } : undefined;
}

function addQuestionGloss(index: Map<string, MistakeGloss>, it: QuizItem, gloss: MistakeGloss | undefined, ans?: number) {
	if (!gloss || !it.q) return;
	const answer = ans != null ? it.opts?.[ans - 1] : undefined;
	addMistakeGloss(index, String(it.q), gloss, answer ? String(answer) : undefined);
}

/** Index headwords and quiz prompts from one loaded textbook. */
export function glossIndexFromBook(book: any, index: Map<string, MistakeGloss>) {
	for (const week of book?.weeks || []) {
		for (const day of week.days || []) {
			for (const sec of day.sections || []) {
				for (const it of sec.items || []) {
					if (it?.jp) addMistakeGloss(index, String(it.jp), { cn: it.cn, en: it.en });
				}
			}
			for (const kanji of day.kanji || []) {
				for (const word of kanji.words || []) {
					if (word?.jp) addMistakeGloss(index, String(word.jp), { cn: word.cn, en: word.en });
				}
			}
			for (const point of day.points || []) {
				if (point?.pattern) addMistakeGloss(index, String(point.pattern), { cn: point.usage_cn, en: point.usage_en });
				for (const ex of point.examples || []) {
					if (ex?.jp) addMistakeGloss(index, String(ex.jp), { cn: ex.cn, en: ex.en });
				}
			}
			// Quiz prompts also get a prompt+answer key, so a short 用法 prompt still finds its own sentence.
			const byN = new Map<number, { gloss: MistakeGloss; ans?: number }>();
			const daily = book.daily_translations?.[`w${week.n}d${day.day}`];
			for (const item of daily?.items || []) {
				const gloss = questionGloss(item?.translation);
				if (item?.n != null && gloss) byN.set(item.n, { gloss });
			}
			const keyed = day.answers
				? numericExamAnswers(parseExamAnswerDetails(day.answers))
				: day.kaisetsu?.length && book === K
					? answerMapFromKeys(N3_KANJI_EXAM_KEYS[week.n])
					: {};
			for (const item of day.kaisetsu || []) {
				const gloss = questionGloss(item?.trans, item?.trans_en);
				const ans = typeof item?.ans === "number" ? item.ans : keyed[item?.n];
				if (item?.n != null && gloss) byN.set(item.n, { gloss, ans });
			}
			const questions: QuizItem[] = [];
			for (const sec of day.exercises?.sections || []) {
				for (const it of sec.items || []) if (it?.q) questions.push(it);
			}
			for (const bucket of QUESTION_BUCKETS) {
				for (const it of day[bucket]?.items || []) if (it?.q) questions.push(it);
			}
			for (const it of questions) {
				const hit = it.n != null ? byN.get(it.n) : undefined;
				if (hit) addQuestionGloss(index, it, hit.gloss, hit.ans);
			}
			// Grammar weekly tests keep their answers and translations in the separate 別冊 (besatsu).
			const besatsu = book.besatsu?.[`w${week.n}`];
			if (besatsu && day.day === 7) {
				for (const bucket of GRAMMAR_EXAM_BUCKETS) {
					const answers = new Map<number, any>((besatsu[bucket] || []).map((a: any) => [a?.n, a]));
					for (const it of day[bucket]?.items || []) {
						const a = it?.n != null ? answers.get(it.n) : undefined;
						const gloss = a ? questionGloss(a.trans, a.trans_en) : undefined;
						if (!gloss) continue;
						const ans = typeof a.ans === "number" ? a.ans : undefined;
						if (it.q) {
							addQuestionGloss(index, it, gloss, ans);
							continue;
						}
						// 問題3 passage blanks: the note's prompt is the sentence holding【n】.
						const prompt = passageBlankPrompt(day[bucket]?.passage, it.n);
						if (prompt) addQuestionGloss(index, { ...it, q: prompt }, gloss, ans);
						const answer = ans != null ? it.opts?.[ans - 1] : undefined;
						if (prompt && answer) addLegacyBlankGloss(index, it.opts || [], String(answer), { ...gloss, prompt });
					}
				}
			}
		}
	}
	for (const group of book?.contrast?.groups || []) {
		const answers = parseCircledAnswers(group.quiz?.answers);
		for (const it of group.quiz?.items || []) {
			addQuestionGloss(index, it, questionGloss(it?.trans, it?.trans_en), it?.n != null ? answers[it.n] : undefined);
		}
	}
}

/** Reading-book questions, written into the 错题本 as「問1 question」. */
export function glossIndexFromReadingDays(
	days: readonly {
		mondai?: { questions: ReadingQuestion[] };
		practice?: { groups: { questions: ReadingQuestion[] }[] };
	}[],
	index: Map<string, MistakeGloss>,
) {
	for (const day of days) {
		const questions = [...(day.mondai?.questions || []), ...(day.practice?.groups || []).flatMap((g) => g.questions || [])];
		for (const q of questions) {
			const gloss = questionGloss(q.cn, q.en);
			if (!gloss) continue;
			const answer = q.choices?.[q.answer - 1]?.jp;
			addMistakeGloss(index, `${q.label} ${q.jp}`, gloss, answer);
			addMistakeGloss(index, q.jp, gloss, answer);
		}
	}
}

type ReadingQuestion = { label: string; jp: string; cn?: string; en?: string; answer: number; choices?: { jp: string }[] };

let glossIndex: Map<string, MistakeGloss> | null = null;
let glossToken = "";
const readingGlossIndex = new Map<string, MistakeGloss>();
let readingGlossLoad: Promise<void> | null = null;

function kaisetsuCount(book: any): number {
	let count = 0;
	for (const week of book?.weeks || []) {
		for (const day of week.days || []) count += day.kaisetsu?.length || 0;
	}
	return count;
}

function extraToken(book: any): string {
	return `${Object.keys(book?.besatsu || {}).length}.${book?.contrast?.groups?.length || 0}`;
}

const GLOSS_BOOKS = () => [V, V2, V4, V1, K, K2, K4, K1, G, G2, G4, G1];

/** A reading-book question note starts with its printed label: 問1 / 問い / 1. */
export function looksLikeReadingQuestion(jp: string): boolean {
	return /^(?:問[0-9０-９]*|問い|[0-9]{1,2})\s/.test(jp);
}

export function readingGlossesLoaded(): boolean {
	return readingGlossIndex.size > 0;
}

/** Load the N3 / N2 reading questions' Chinese into the lookup (they live in a lazy chunk). */
export function loadReadingGlosses(): Promise<void> {
	if (!readingGlossLoad) {
		readingGlossLoad = Promise.all([import("../data/reading-n3"), import("../data/reading-n2")])
			.then(([n3, n2]) => {
				glossIndexFromReadingDays(n3.readingDays, readingGlossIndex);
				glossIndexFromReadingDays(n2.readingDays, readingGlossIndex);
			})
			.catch(() => {
				readingGlossLoad = null;
			});
	}
	return readingGlossLoad;
}

/** Chinese and English already printed in a textbook for this mistake prompt (and its correct answer). */
export function lookupMistakeGloss(jp: string, answer?: string): MistakeGloss | undefined {
	const token = GLOSS_BOOKS()
		.map((book) => `${bookDataToken(book)}.${kaisetsuCount(book)}.${extraToken(book)}`)
		.join("|");
	if (!glossIndex || glossToken !== token) {
		glossToken = token;
		glossIndex = new Map();
		for (const book of GLOSS_BOOKS()) glossIndexFromBook(book, glossIndex);
	}
	if (looksLikeReadingQuestion(jp)) {
		const reading = findMistakeGloss(readingGlossIndex, jp, answer);
		if (reading) return reading;
	}
	return findMistakeGloss(glossIndex, jp, answer);
}

function collectListeningSnippets(lesson: Pick<ListeningLesson, "blocks">): ExampleHit[] {
	const out: ExampleHit[] = [];
	const add = (jp?: string, cn?: string, en?: string) => {
		if (jp && jp.replace(/\s/g, "").length >= 4) out.push({ jp, cn, en });
	};
	for (const block of lesson.blocks || []) {
		if (block.type === "p" || block.type === "tip" || block.type === "h" || block.type === "slogan") {
			add(block.jp, "cn" in block ? block.cn : undefined, "en" in block ? block.en : undefined);
		} else if (block.type === "example") {
			for (const line of block.lines || []) add(line);
		} else if (block.type === "q") {
			add(block.prompt);
			for (const opt of block.options || []) add(opt);
		} else if (block.type === "aside") {
			add(block.text);
		}
	}
	return out;
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
	day: {
		grammar?: { example?: { jp?: string; cn?: string; en?: string } }[];
		snippets?: ExampleHit[];
	},
): ExampleHit | undefined {
	const corpus: ExampleHit[] = [...(day.snippets || [])];
	for (const g of day.grammar || []) {
		if (g.example?.jp) corpus.push({ jp: g.example.jp, cn: g.example.cn, en: g.example.en });
	}
	return exampleFromCorpus(jp, corpus);
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

function attachExample(ex: ExampleHit | undefined, readings: Record<string, string>, wordCn?: string) {
	if (!ex?.jp) return {};
	const jpHtml = annotateText(ex.jp, { html: ex.jpHtml, readings }) || ex.jpHtml;
	return {
		exampleJp: ex.jp,
		exampleJpHtml: jpHtml,
		exampleReading: kanaFromRuby(jpHtml, undefined, ex.jp),
		exampleCn: ex.cn || (wordCn ? `（${wordCn}）` : undefined),
		exampleEn: ex.en,
	};
}

export function cardsFromVocabWeeks(weeks: any[], module: string): MemoryCardItem[] {
	const readings = mergedReadings(collectReadingsFromVocabWeeks(weeks));
	const daily = vocabBook(module).daily_translations;
	const bookCorpus = collectVocabQuizCorpus(weeks, daily);
	const items: MemoryCardItem[] = [];
	for (const w of weeks || []) {
		for (const day of w.days || []) {
			(day.sections || []).forEach((sec: any, si: number) => {
				(sec.items || []).forEach((it: any, ii: number) => {
					if (!it?.jp || !(it.cn || it.en)) return;
					const jpHtml = annotateText(it.jp, { html: it.jp_r, reading: it.reading, readings });
					const ex =
						exampleFromVocabDay(it.jp, day, daily?.[`w${w.n}d${day.day}`]) ||
						exampleFromCorpus(it.jp, bookCorpus) ||
						fallbackVocabExample(it.jp, it.cn, it.en);
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
						...attachExample(ex, readings, it.cn),
					});
				});
			});
		}
	}
	return items;
}

export function cardsFromKanjiWeeks(weeks: any[], module: string): MemoryCardItem[] {
	const readings = mergedReadings(
		collectReadingsFromKanjiWeeks(weeks),
		collectReadingsFromVocabWeeks(V2.weeks),
		collectReadingsFromVocabWeeks(V.weeks),
	);
	const quizCorpus = collectVocabQuizCorpus(weeks).concat(collectVocabQuizCorpus(V2.weeks), collectVocabQuizCorpus(V.weeks));
	const items: MemoryCardItem[] = [];
	for (const w of weeks || []) {
		for (const day of w.days || []) {
			(day.kanji || []).forEach((k: any, ki: number) => {
				(k.words || []).forEach((wd: any, wi: number) => {
					if (!wd?.jp || !(wd.cn || wd.en)) return;
					const jpHtml = annotateText(wd.jp, { html: wd.jp_r, reading: wd.reading, readings });
					const authored = kanjiExample(wd, module, readings);
					const mined = authored.exampleJp
						? undefined
						: exampleFromCorpus(kanjiWordSurface(wd), quizCorpus) || exampleFromCorpus(wd.jp, quizCorpus);
					const fallback = !authored.exampleJp && !mined ? kanjiExampleFromUsage(getKanjiWordUsage(wd), readings) : undefined;
					const example = authored.exampleJp
						? { jp: authored.exampleJp, jpHtml: authored.exampleJpHtml, cn: authored.exampleCn, en: authored.exampleEn }
						: mined ||
							(fallback
								? { jp: fallback.exampleJp, jpHtml: fallback.exampleJpHtml, cn: fallback.exampleCn, en: fallback.exampleEn }
								: undefined);
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
						...attachExample(example, readings, wd.cn),
					});
				});
			});
		}
	}
	return items;
}

function kanjiExampleFromUsage(
	usage: NonNullable<ReturnType<typeof getKanjiWordUsage>>,
	readings: Record<string, string>,
) {
	const focus = usage.focus || "";
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

export function cardsFromReadingWeeks(weeks: any[], module: string): MemoryCardItem[] {
	const readings = mergedReadings(collectReadingsFromReadingWeeks(weeks));
	const items: MemoryCardItem[] = [];
	for (const w of weeks || []) {
		for (const day of w.days || []) {
			(day.vocab || []).forEach((it: any, ii: number) => {
				if (!it?.jp || !(it.cn || it.en)) return;
				const ex = exampleFromReadingDay(it.jp, day) || fallbackVocabExample(it.jp, it.cn, it.en);
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
					...attachExample(ex, readings, it.cn),
				});
			});
			(day.expressions || []).forEach((it: any, ii: number) => {
				if (!it?.jp || !(it.cn || it.en)) return;
				const jpHtml = annotateText(it.jp, { reading: it.kana, readings });
				const ex = exampleFromReadingDay(it.jp, day) || fallbackVocabExample(it.jp, it.cn, it.en);
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
					...attachExample(ex?.jp === it.jp ? undefined : ex, readings, it.cn),
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

const PAIRED_WORD = /^([ぁ-んァ-ンー]+)[（(]([^）)]+)[）)]$/;

type ListeningDraft = {
	jp: string;
	reading?: string;
	cn?: string;
	en?: string;
	example?: string;
	kind: "word" | "expression";
};

function hasKana(text: string): boolean {
	return /[ぁ-んァ-ン]/.test(text);
}

function hasLatinWord(text: string): boolean {
	return /[A-Za-z]{3,}/.test(text);
}

function isMostlyChinese(text: string): boolean {
	if (!/[\u4e00-\u9fff]/.test(text) || hasKana(text)) return false;
	if (/[的了请是不在和与会要就也这那个吗呢吧把被让给从对很最说听做写看们啊哦嗯见问发过时样现门东车长马鱼贝页风飞书买卖习认论计话谢识议记讲读谁义儿么]/u.test(text)) return true;
	return /[，。！？]/.test(text);
}

function isJapanesePhrase(text: string): boolean {
	const value = text.trim();
	if (!value || value.length > 80) return false;
	if (hasLatinWord(value) && !/[一-龯]/.test(value)) return false;
	if (isMostlyChinese(value)) return false;
	return /[ぁ-んァ-ン一-龯]/.test(value);
}

function pairedWord(text: string): { jp: string; reading: string } | undefined {
	const match = text.trim().match(PAIRED_WORD);
	if (!match || !/[一-龯]/.test(match[2])) return undefined;
	return { reading: match[1], jp: match[2] };
}

function stripWrap(text: string): string {
	const value = text.trim();
	if ((value.startsWith("（") && value.endsWith("）")) || (value.startsWith("(") && value.endsWith(")"))) return value.slice(1, -1).trim();
	return value;
}

function parensBalanced(text: string): boolean {
	return (text.match(/[（(]/g) || []).length === (text.match(/[）)]/g) || []).length;
}

function cleanHead(text: string): string {
	const value = stripWrap(text.trim());
	const speaker = value.match(/^[A-Za-zＡ-Ｚ]「([^」]+)」$/);
	if (speaker) return speaker[1].trim();
	const embedded = value.match(/^([^「」]{0,6})「([^」]+)」$/);
	if (embedded) return embedded[2].trim();
	const pair = pairedWord(value);
	if (pair) return pair.jp;
	return value
		.replace(/^[①-⑳]\s*/, "")
		.replace(/\s*\*[^＊*]*$/, "")
		.replace(/\s+[A-Za-z]{3,}(?:\s+[A-Za-z]+)*/g, "")
		.trim();
}

function headKind(jp: string): "word" | "expression" {
	if (/[〜～。！？↔]/.test(jp) || jp.length > 12) return "expression";
	return "word";
}

function junkHead(jp: string): boolean {
	return /^(れんしゅう|練習|注意|例題|例|まとめ|問題)/.test(jp);
}

function cellIsGloss(text: string): boolean {
	return /[=＝→⇒]/.test(text) || hasLatinWord(text) || isMostlyChinese(text) || text.includes("　");
}

function classifyGloss(raw: string): { cn?: string; en?: string } {
	const text = raw
		.trim()
		.replace(/^[（(]\s*/, "")
		.replace(/[）)]$/, "")
		.replace(/^[=＝]\s*/, "")
		.trim();
	if (!text) return {};
	if (text.includes("/")) {
		const bits = text.split(/\s*\/\s*/).map((part) => part.trim()).filter(Boolean);
		const cn = bits.find((part) => isMostlyChinese(part));
		const en = bits.find((part) => hasLatinWord(part));
		if (cn || en) return { cn, en: en && en !== cn ? en : undefined };
	}
	const split = splitListeningGloss(text);
	if (split.cn || (split.en && hasLatinWord(split.en || ""))) return split;
	if (isJapanesePhrase(text) || isMostlyChinese(text)) return { cn: text };
	return split.en ? split : {};
}

function glossFromCell(raw: string): { cn?: string; en?: string; example?: string } {
	const chunks = raw.split(/[　]+/).map((part) => part.trim()).filter(Boolean);
	let example: string | undefined;
	const glossChunks: string[] = [];
	for (const chunk of chunks) {
		if (glossChunks.length && isJapanesePhrase(chunk) && !cellIsGloss(chunk) && chunk.length <= 40) {
			if (!example) example = cleanHead(chunk);
			continue;
		}
		glossChunks.push(chunk);
	}
	return { ...classifyGloss(glossChunks.join("　")), example };
}

function glossFromMultiline(raw: string): { cn?: string; en?: string; example?: string } {
	const cn: string[] = [];
	const en: string[] = [];
	let example: string | undefined;
	for (const line of raw.split(/\n+/).map((part) => part.trim()).filter(Boolean)) {
		if (isJapanesePhrase(line) && !cellIsGloss(line) && line.length >= 6) {
			if (!example) example = cleanHead(line);
			continue;
		}
		const found = glossFromCell(line);
		if (found.cn) cn.push(found.cn);
		if (found.en) en.push(found.en);
		if (!example && found.example) example = found.example;
	}
	return { cn: cn.join(" ") || undefined, en: en.join(" / ") || undefined, example };
}

function draftsFromGlossLine(line: string): ListeningDraft[] {
	const contrasts = line.split(/[　]{1,}|\s{2,}/).flatMap((part) => {
		const bits = part.split(/\s*[⇔↔]\s*/);
		if (bits.length !== 2 || !isJapanesePhrase(bits[0]) || !isJapanesePhrase(bits[1])) return [];
		return [{ jp: `${cleanHead(bits[0])} ↔ ${cleanHead(bits[1])}`, cn: "反义", kind: "word" as const }];
	});
	if (/[⇔↔]/.test(line)) return contrasts;
	const eq = stripWrap(line).split(/\s*[=＝]\s*/);
	if (eq.length >= 2 && parensBalanced(eq[0])) {
		const jp = cleanHead(eq[0]);
		const gloss = classifyGloss(eq.slice(1).join("＝"));
		if (!isJapanesePhrase(jp) || !(gloss.cn || gloss.en)) return [];
		return [{ jp, ...gloss, kind: headKind(jp) }];
	}
	const chunks = line.split(/[　]+/).map((part) => part.trim()).filter(Boolean);
	if (chunks.length >= 2 && isJapanesePhrase(chunks[0]) && cellIsGloss(chunks.slice(1).join(" "))) {
		const gloss = glossFromCell(chunks.slice(1).join("　"));
		const jp = cleanHead(chunks[0]);
		if (!(gloss.cn || gloss.en)) return [];
		return [{ jp, cn: gloss.cn, en: gloss.en, example: gloss.example, kind: headKind(jp) }];
	}
	return [];
}

function draftsFromTable(rows: readonly (readonly string[])[], title?: string): ListeningDraft[] {
	const out: ListeningDraft[] = [];
	for (const row of rows) {
		if (row[0]?.trim() === "場面" || row[1]?.trim() === "内容の例") continue;
		if (row.length >= 3 && isJapanesePhrase(row[0])) {
			const gloss = glossFromCell(row.slice(2).join("　"));
			const example = isJapanesePhrase(row[1]) ? row[1].trim() : gloss.example;
			const jp = cleanHead(row[0]);
			if (gloss.cn || gloss.en) out.push({ jp, cn: gloss.cn, en: gloss.en, example, kind: headKind(jp) });
			continue;
		}
		if (row.length < 2) continue;
		const left = row[0].trim();
		const right = row[1].trim();
		if (/^[—\-–]/.test(left)) continue;
		const pairL = pairedWord(left);
		const pairR = pairedWord(right);
		if (pairL && pairR) {
			out.push({
				jp: `${pairL.jp} ↔ ${pairR.jp}`,
				reading: `${pairL.reading} / ${pairR.reading}`,
				cn: title || "听辨对照",
				kind: "word",
			});
			continue;
		}
		if (isJapanesePhrase(left) && cellIsGloss(right)) {
			const gloss = glossFromCell(right);
			const jp = pairL?.jp || cleanHead(left);
			if (gloss.cn || gloss.en) {
				out.push({
					jp,
					reading: pairL?.reading,
					cn: gloss.cn,
					en: gloss.en,
					example: gloss.example,
					kind: headKind(jp),
				});
			}
			continue;
		}
		if (isJapanesePhrase(left) && isJapanesePhrase(right)) {
			const jp = cleanHead(left);
			out.push({ jp, cn: [title, cleanHead(right)].filter(Boolean).join("："), kind: "expression" });
		}
	}
	return out;
}

function draftsFromBox(items: readonly { readonly title: string; readonly lines: readonly string[]; readonly note?: string }[]): ListeningDraft[] {
	const out: ListeningDraft[] = [];
	for (const item of items) {
		const [head, star] = item.title.split("*");
		const pair = pairedWord(head.trim());
		const jp = pair?.jp || cleanHead(head);
		const body = [...item.lines, item.note].filter(Boolean).join("\n");
		const gloss = glossFromMultiline(body);
		const cn = [star?.trim(), gloss.cn].filter(Boolean).join(" ");
		if (!isJapanesePhrase(jp) || !(cn || gloss.en)) continue;
		out.push({ jp, reading: pair?.reading, cn: cn || undefined, en: gloss.en, example: gloss.example, kind: headKind(jp) });
	}
	return out;
}

function draftsFromExample(lines: readonly string[], title?: string): ListeningDraft[] {
	const out: ListeningDraft[] = [];
	const script = lines.some((line) => /答案|^男[:：]|^女[:：]/.test(line.trim()));
	if (!script && title && hasKana(title) && isJapanesePhrase(title) && title.trim().length <= 36) {
		const sample = lines.find((line) => isJapanesePhrase(line) && !line.includes("答案"));
		out.push({ jp: cleanHead(title), example: sample ? cleanHead(sample) : undefined, cn: "会话表达", kind: "expression" });
	}
	for (const line of lines) {
		if (script && !/[=＝⇔↔]|[A-Za-z]{3,}/.test(line)) continue;
		if (!script) {
			const quotes = [...line.matchAll(/「([^」]{2,40})」/g)]
				.map((match) => match[1].trim())
				.filter((quote) => isJapanesePhrase(quote));
			if (quotes.length) {
				for (const quote of quotes) out.push({ jp: quote, cn: "会话表达", kind: headKind(quote) });
				continue;
			}
		}
		out.push(...draftsFromGlossLine(line));
	}
	return out;
}

function listeningDraftItem(
	draft: ListeningDraft,
	id: string,
	chapter: number,
	section: number,
	readings: Record<string, string>,
	snippets: ExampleHit[],
): MemoryCardItem | undefined {
	const jp = draft.jp.trim();
	if (!jp || jp.length > 70 || junkHead(jp) || !parensBalanced(jp) || isMostlyChinese(jp) || !(draft.cn || draft.en)) return undefined;
	const cn = draft.cn && draft.cn.length > 90 ? `${draft.cn.slice(0, 90).replace(/[、，\s]+$/, "")}…` : draft.cn;
	const explicit = draft.example && draft.example !== jp ? { jp: draft.example, cn: draft.cn, en: draft.en } : undefined;
	const mined = explicit || exampleFromCorpus(jp, snippets);
	const patterned = /^[〜～]/.test(jp) || jp.includes("↔") || /[。！？]/.test(jp);
	const ex = mined || (patterned ? undefined : fallbackVocabExample(jp, draft.cn, draft.en));
	const jpHtml = annotateText(jp, { reading: draft.reading, readings });
	return {
		id,
		jp,
		jpHtml,
		reading: draft.reading || kanaFromRuby(jpHtml, draft.reading, jp),
		cn,
		en: draft.en,
		kind: draft.kind,
		week: chapter,
		day: section,
		...attachExample(ex && ex.jp !== jp ? ex : undefined, readings, cn),
	};
}

function preferListeningGloss(prev?: string, next?: string): string | undefined {
	const generic = new Set(["会话表达", "反义", "听辨对照"]);
	if (!next) return prev;
	if (!prev) return next;
	if (generic.has(next) && !generic.has(prev)) return prev;
	if (generic.has(prev) && !generic.has(next)) return next;
	if (prev.includes(next)) return prev;
	return `${prev}／${next}`;
}

function mergeListeningCards(items: MemoryCardItem[]): MemoryCardItem[] {
	const seen = new Map<string, MemoryCardItem>();
	for (const item of items) {
		const prev = seen.get(item.jp);
		if (!prev) {
			seen.set(item.jp, { ...item });
			continue;
		}
		prev.cn = preferListeningGloss(prev.cn, item.cn);
		if (item.en && prev.en && !prev.en.includes(item.en)) prev.en = `${prev.en} / ${item.en}`;
		else if (item.en && !prev.en) prev.en = item.en;
		if (!prev.exampleJp && item.exampleJp) {
			prev.exampleJp = item.exampleJp;
			prev.exampleJpHtml = item.exampleJpHtml;
			prev.exampleReading = item.exampleReading;
			prev.exampleCn = item.exampleCn;
			prev.exampleEn = item.exampleEn;
		}
	}
	return [...seen.values()];
}

export function cardsFromListeningLesson(
	lesson: Pick<ListeningLesson, "blocks">,
	chapter: number,
	section: number,
	module: string,
	readings: Record<string, string> = BASE_READINGS,
): MemoryCardItem[] {
	const items: MemoryCardItem[] = [];
	const snippets = collectListeningSnippets(lesson);
	(lesson.blocks || []).forEach((block, bi) => {
		const push = (draft: ListeningDraft, ri: number) => {
			const item = listeningDraftItem(draft, `${module}:${chapter}-${section}:${bi}-${ri}:${draft.jp}`, chapter, section, readings, snippets);
			if (item) items.push(item);
		};
		if (block.type === "kv") {
			block.rows.forEach((row, ri) => {
				const parsed = parseListeningHead(row.k);
				const gloss = splitListeningGloss(row.v);
				push({ jp: parsed.jp, reading: parsed.reading, cn: gloss.cn, en: gloss.en, kind: headKind(parsed.jp) }, ri);
			});
			return;
		}
		const drafts =
			block.type === "table"
				? draftsFromTable(block.rows, block.title)
				: block.type === "box"
					? draftsFromBox(block.items)
					: block.type === "aside" && isJapanesePhrase(cleanHead(block.title))
						? [{ jp: cleanHead(block.title), ...glossFromMultiline(block.text), kind: headKind(cleanHead(block.title)) }]
						: block.type === "example"
							? draftsFromExample(block.lines, block.title)
							: block.type === "q" && block.note
								? block.note.split(/[。\n]/).flatMap((line) => draftsFromGlossLine(line))
								: [];
		drafts.forEach((draft, ri) => push(draft, ri));
	});
	return mergeListeningCards(items);
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
	if (module === "n1listening") {
		const { listeningN1BookChapters } = await import("../data/listening-n1-book");
		const { getListeningN1Lesson } = await import("../data/listening-n1-lessons");
		for (const ch of listeningN1BookChapters()) {
			for (const sec of ch.sections) {
				const lesson = getListeningN1Lesson(ch.number, sec.number);
				if (lesson) items.push(...cardsFromListeningLesson(lesson, ch.number, sec.number, module, readings));
			}
		}
	} else if (module === "n2listening") {
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
