// 《漢字マスター N2 改訂版》 (school textbook) for the Kanji self-test.
//
// The question bank (6694 questions) and the book structure live as static JSON
// under public/data/kanji-master-n2/ and are fetched on demand, so they never
// enter the initial bundle. Content is imported as-is by
// scripts/import-kanji-master-n2.mjs; this module only types and slices it.
import type { KanjiExamQuestion, KanjiExamQuestionKind } from "./kanji-exam";

export const KANJI_MASTER_QUIZ_URL = "/data/kanji-master-n2/quiz.json";
export const KANJI_MASTER_STRUCTURE_URL = "/data/kanji-master-n2/structure.json";

/** Book-level numbers shown before the data is fetched (checked by unit tests). */
export const KANJI_MASTER_SUMMARY = { chapters: 19, lessons: 91, kanji: 539, questions: 6694 } as const;

export type KanjiMasterSource = "example" | "review" | "achievement" | "matome" | "quiz";

export type KanjiMasterQuestion = KanjiExamQuestion & {
	chapter: number;
	chapterTitle: string;
	lesson: number;
	lessonTitle: string;
	source: KanjiMasterSource;
	kanji?: string;
	zh?: string;
	completeWord?: string;
	completePhrase?: string;
	testChapters?: number[];
	testTitle?: string;
	section?: number;
	number?: number;
	format?: "choice";
	/** Four options; an unreadable option in the scan is null. */
	choices?: (string | null)[];
	/** 1-based index into `choices`. */
	correctChoice?: number;
	lessonMatch?: string;
};

export type KanjiMasterQuiz = {
	format?: string;
	stats?: Record<string, unknown>;
	questions: KanjiMasterQuestion[];
};

export type KanjiMasterExample = {
	phrase: string;
	special?: boolean;
	meaningZh?: string;
	words: { word: string; reading: string; readingAlt?: string[] }[];
};

export type KanjiMasterKanji = {
	kanji: string;
	strokes?: number;
	kun?: string[];
	on?: string[];
	meaningZh?: string;
	examples?: KanjiMasterExample[];
};

export type KanjiMasterLesson = {
	id: string;
	no: number;
	title: string;
	titleZh?: string;
	bookPage?: number;
	kanjiList: string[];
	kanji?: KanjiMasterKanji[];
};

export type KanjiMasterChapter = {
	id: string;
	no: number;
	part: string;
	title: string;
	titleZh?: string;
	lessons: KanjiMasterLesson[];
};

export type KanjiMasterStructure = {
	book: { title: string; publisher?: string; author?: string; isbn?: string; edition?: string };
	groupTitle: string;
	parts: { name: string; chapters: number[] }[];
	chapters: KanjiMasterChapter[];
};

export type KanjiMasterData = { structure: KanjiMasterStructure; questions: KanjiMasterQuestion[] };

export type KanjiMasterTest = {
	id: string;
	source: Exclude<KanjiMasterSource, "example" | "review">;
	title: string;
	page: number;
	chapters: number[];
	count: number;
};

export type KanjiMasterScope =
	| { type: "lesson"; lessonId: string }
	| { type: "chapter"; chapter: number }
	| { type: "test"; testId: string }
	| { type: "part"; part: string }
	| { type: "book" };

export type KanjiMasterKindFilter = KanjiExamQuestionKind | "mixed";

const TEST_SOURCES = new Set<KanjiMasterSource>(["achievement", "matome", "quiz"]);

export function kanjiMasterTestId(question: Pick<KanjiMasterQuestion, "source" | "page">): string {
	return `km-test-${question.source}-p${question.page}`;
}

/** アチーブメントテスト / まとめテスト / クイズ, one entry per printed test, in book order. */
export function kanjiMasterTests(questions: readonly KanjiMasterQuestion[]): KanjiMasterTest[] {
	const tests = new Map<string, KanjiMasterTest>();
	for (const question of questions) {
		if (!TEST_SOURCES.has(question.source)) continue;
		const id = kanjiMasterTestId(question);
		const existing = tests.get(id);
		if (existing) {
			existing.count += 1;
			continue;
		}
		tests.set(id, {
			id,
			source: question.source as KanjiMasterTest["source"],
			title: question.testTitle || question.source,
			page: question.page,
			chapters: question.testChapters || [question.chapter],
			count: 1,
		});
	}
	return [...tests.values()].sort((a, b) => a.page - b.page);
}

/** Questions in a practice scope (before kind / wrong-only filtering). */
export function kanjiMasterScopeQuestions(
	data: KanjiMasterData,
	scope: KanjiMasterScope,
): KanjiMasterQuestion[] {
	const { questions, structure } = data;
	switch (scope.type) {
		case "lesson":
			// 按课: the lesson's example-word reading/writing questions.
			return questions.filter((question) => question.source === "example" && question.lessonId === scope.lessonId);
		case "chapter":
			// 整章复习: every lesson in the chapter plus the chapter-end 復習 page.
			// 復習 questions are keyed by the 復習 page's chapter (testChapters), so
			// e.g. 6章復習⑩ 習慣 (a 5-1 kanji) stays in chapter 6's review.
			return questions.filter((question) =>
				question.source === "example"
					? question.chapter === scope.chapter
					: question.source === "review" && (question.testChapters || [question.chapter]).includes(scope.chapter),
			);
		case "test":
			return questions.filter((question) => TEST_SOURCES.has(question.source) && kanjiMasterTestId(question) === scope.testId);
		case "part": {
			const chapters = new Set(structure.parts.find((part) => part.name === scope.part)?.chapters || []);
			// Tests are attributed by the chapters they cover, everything else by its chapter.
			return questions.filter((question) => {
				const covered = question.source === "example" ? [question.chapter] : question.testChapters || [question.chapter];
				return covered.some((chapter) => chapters.has(chapter));
			});
		}
		case "book":
			return [...questions];
	}
}

export function filterKanjiMasterQuestions(
	questions: readonly KanjiMasterQuestion[],
	kind: KanjiMasterKindFilter,
	wrongOnlyIds?: ReadonlySet<string> | null,
): KanjiMasterQuestion[] {
	return questions.filter(
		(question) => (kind === "mixed" || question.kind === kind) && (!wrongOnlyIds || wrongOnlyIds.has(question.id)),
	);
}

/** Usable options of a choice question (null = unreadable in the scan, shown disabled). */
export function hasKanjiMasterChoices(question: KanjiMasterQuestion): boolean {
	return Array.isArray(question.choices) && question.choices.length > 0 && typeof question.correctChoice === "number";
}

// ---- 错题本 (wrong-question book) -------------------------------------------------

export const KANJI_MASTER_WRONG_KEY = "jp-kanji-master-n2-wrong-v1";
export const KANJI_MASTER_HISTORY_KEY = "jp-kanji-master-n2-history-v1";
/** A wrong question leaves the book after this many correct answers in a row. */
export const KANJI_MASTER_CLEAR_AFTER = 2;

export type KanjiMasterWrongEntry = { misses: number; streak: number; lastWrongAt: string };
export type KanjiMasterWrongBook = Record<string, KanjiMasterWrongEntry>;

export function readKanjiMasterWrongBook(): KanjiMasterWrongBook {
	if (typeof window === "undefined") return {};
	try {
		const value = JSON.parse(localStorage.getItem(KANJI_MASTER_WRONG_KEY) || "{}");
		return value && typeof value === "object" && !Array.isArray(value) ? (value as KanjiMasterWrongBook) : {};
	} catch {
		return {};
	}
}

export function storeKanjiMasterWrongBook(book: KanjiMasterWrongBook) {
	if (typeof window !== "undefined") localStorage.setItem(KANJI_MASTER_WRONG_KEY, JSON.stringify(book));
}

/**
 * Apply one submitted attempt: a wrong answer (re)enters the book with its streak
 * reset; a correct answer to a question already in the book counts towards
 * clearing it, and it is removed after KANJI_MASTER_CLEAR_AFTER correct answers.
 */
export function updateKanjiMasterWrongBook(
	book: KanjiMasterWrongBook,
	results: readonly { id: string; correct: boolean }[],
	now: Date = new Date(),
): KanjiMasterWrongBook {
	const next: KanjiMasterWrongBook = { ...book };
	for (const { id, correct } of results) {
		const entry = next[id];
		if (!correct) {
			next[id] = { misses: (entry?.misses || 0) + 1, streak: 0, lastWrongAt: now.toISOString() };
		} else if (entry) {
			const streak = entry.streak + 1;
			if (streak >= KANJI_MASTER_CLEAR_AFTER) delete next[id];
			else next[id] = { ...entry, streak };
		}
	}
	return next;
}

export type KanjiMasterAttempt = {
	id: string;
	scopeLabel: string;
	kind: KanjiMasterKindFilter;
	wrongOnly: boolean;
	correct: number;
	total: number;
	completedAt: string;
};

export function readKanjiMasterHistory(): KanjiMasterAttempt[] {
	if (typeof window === "undefined") return [];
	try {
		const value = JSON.parse(localStorage.getItem(KANJI_MASTER_HISTORY_KEY) || "[]");
		return Array.isArray(value) ? value.slice(0, 20) : [];
	} catch {
		return [];
	}
}

export function storeKanjiMasterHistory(history: KanjiMasterAttempt[]) {
	if (typeof window !== "undefined") localStorage.setItem(KANJI_MASTER_HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
}

// ---- loading -----------------------------------------------------------------------

let loading: Promise<KanjiMasterData> | null = null;

async function fetchJson(url: string): Promise<unknown> {
	const response = await fetch(url);
	if (!response.ok) throw new Error(`${url} ${response.status}`);
	return response.json();
}

/** Fetch structure + questions once per page load (retried after a failure). */
export function loadKanjiMasterData(): Promise<KanjiMasterData> {
	if (!loading) {
		loading = Promise.all([fetchJson(KANJI_MASTER_STRUCTURE_URL), fetchJson(KANJI_MASTER_QUIZ_URL)]).then(
			([structure, quiz]) => ({
				structure: structure as KanjiMasterStructure,
				questions: (quiz as KanjiMasterQuiz).questions,
			}),
		);
		loading.catch(() => {
			loading = null;
		});
	}
	return loading;
}

/** Test hook: forget the cached fetch. */
export function resetKanjiMasterDataCache() {
	loading = null;
}
