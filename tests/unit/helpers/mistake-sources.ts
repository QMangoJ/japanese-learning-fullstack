import * as readingN2 from "../../../app/data/reading-n2";
import * as readingN3 from "../../../app/data/reading-n3";
import {
	N3_KANJI_EXAM_KEYS,
	answerMapFromKeys,
	numericExamAnswers,
	parseCircledAnswers,
	parseExamAnswerDetails,
	passageBlankPrompt,
	readingWrongNote,
	wrongAnswerNote,
} from "../../../app/study/exam-answers";
import type { loadStudyBooks } from "./study-books";

export type MistakeSource = {
	module: string;
	where: string;
	text: string;
	/** The Chinese the textbook prints for this question. */
	expected?: string;
};

const GRAMMAR = [
	["grammar", "G"],
	["n2grammar", "G2"],
	["n4grammar", "G4"],
	["n1grammar", "G1"],
] as const;
const VOCAB = [
	["vocab", "V"],
	["n2vocab", "V2"],
	["n4vocab", "V4"],
	["n1vocab", "V1"],
] as const;
const KANJI = [
	["kanji", "K"],
	["n2kanji", "K2"],
	["n4kanji", "K4"],
	["n1kanji", "K1"],
] as const;

/** One wrong pick per option for a quiz item, written exactly as the quiz page writes it. */
function wrongPicks(module: string, where: string, item: any, correct: number, expected?: string): MistakeSource[] {
	const out: MistakeSource[] = [];
	(item.opts || []).forEach((_: string, i: number) => {
		if (i + 1 !== correct) out.push({ module, where, text: wrongAnswerNote(item, i + 1, correct), expected });
	});
	return out;
}

/** Every quiz question whose wrong answer can be written into the 错题本. */
export function mistakeSources(books: ReturnType<typeof loadStudyBooks>): MistakeSource[] {
	const out: MistakeSource[] = [];
	for (const [module, key] of GRAMMAR) {
		const book = books[key];
		for (const week of book.weeks || []) {
			const day = (week.days || []).find((d: any) => d.day === 7);
			if (!day) continue;
			const bes = book.besatsu?.[`w${week.n}`] || {};
			for (const section of ["mondai1", "mondai2", "mondai3"]) {
				const answers = new Map<number, any>((bes[section] || []).map((a: any) => [a.n, a]));
				for (const it of day[section]?.items || []) {
					const a = answers.get(it.n);
					if (!it.opts || !a?.ans || a.order) continue;
					const q = it.q || passageBlankPrompt(day[section]?.passage, it.n);
					out.push(...wrongPicks(module, `w${week.n} ${section} #${it.n}`, { ...it, q }, a.ans, a.trans));
				}
			}
		}
		for (const [gi, group] of (book.contrast?.groups || []).entries()) {
			const answers = parseCircledAnswers(group.quiz?.answers);
			for (const it of group.quiz?.items || []) {
				const correct = answers[it.n];
				if (!it.opts || correct == null) continue;
				out.push(...wrongPicks(module, `辨析 ${gi + 1} #${it.n}`, it, correct, it.trans));
			}
		}
	}
	for (const [module, key] of [...VOCAB, ...KANJI]) {
		const book = books[key];
		const kanji = module.endsWith("kanji");
		for (const week of book.weeks || []) {
			const day = (week.days || []).find((d: any) => d.day === 7);
			if (!day) continue;
			const answers =
				kanji && !day.answers
					? answerMapFromKeys(N3_KANJI_EXAM_KEYS[week.n])
					: numericExamAnswers(parseExamAnswerDetails(day.answers));
			const kai = new Map<number, any>((day.kaisetsu || []).map((k: any) => [k.n, k]));
			for (const section of ["mondai1", "mondai2", "mondai3", "mondai4"]) {
				for (const it of day[section]?.items || []) {
					const correct = answers[it.n];
					if (!it.opts || correct == null) continue;
					out.push(...wrongPicks(module, `w${week.n} ${section} #${it.n}`, it, correct, kai.get(it.n)?.trans));
				}
			}
		}
	}
	for (const [module, book] of [
		["reading", readingN3],
		["n2reading", readingN2],
	] as const) {
		for (const day of book.readingDays) {
			const questions = [...(day.mondai?.questions || []), ...(day.practice?.groups || []).flatMap((g) => g.questions)];
			for (const q of questions) {
				q.choices.forEach((_, i) => {
					if (i + 1 !== q.answer) {
						out.push({ module, where: `w${day.week}d${day.day} ${q.label}`, text: readingWrongNote(q, i + 1), expected: q.cn });
					}
				});
			}
		}
	}
	return out;
}
