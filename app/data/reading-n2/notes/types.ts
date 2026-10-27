// Per-sentence explanations for the N2 読解 passages, modelled on the
// news-learning "Sakura" sentence breakdown: translation, structure,
// grammar (form / meaning / role in this sentence) and N3+ vocabulary.
//
// Source of truth: ./src/wXdY.txt (hand-written). Regenerate the .ts files
// with `npx -y tsx scripts/build-n2-reading-notes.mts`.

export type JlptLevel = "N5" | "N4" | "N3" | "N2" | "N1";

export interface SentenceWord {
	jp: string;
	kana?: string;
	cn: string;
	lv?: JlptLevel;
}

export interface SentenceGrammar {
	pattern: string;
	lv?: JlptLevel;
	/** 接续 */
	form: string;
	/** Chinese meaning of the pattern in general. */
	meaning: string;
	/** What the pattern does in this particular sentence. */
	here: string;
	/** Near-synonyms and how they differ (optional). */
	similar?: string;
}

export interface SentenceNote {
	/** The sentence with `{漢字|かな}` furigana markup. */
	jp: string;
	cn: string;
	/** Structure lines; `depth` indents sub-parts. */
	structure: { depth: number; text: string }[];
	grammar: SentenceGrammar[];
	words: SentenceWord[];
}

/** Keyed by the block's Japanese text with furigana markup stripped. */
export type DayNotes = Record<string, SentenceNote[]>;
