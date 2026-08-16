// Data model for《N3読解 新日语能力考试考前对策》(世界图书出版公司, 2011).
//
// Japanese text carries inline furigana using the form `{漢字|かんじ}`.
// Example: "{中央|ちゅうおう}{図書館|としょかん}へ{行|い}くつもりなんだ。"
// The renderer turns each `{base|reading}` pair into a <ruby> element, so the
// data stays readable as plain text and degrades gracefully if unparsed.

/** A furigana-annotated Japanese string plus its Chinese translation. */
export interface Bilingual {
	jp: string;
	cn: string;
	en?: string;
}

export interface TableCell {
	jp: string;
	cn?: string;
	en?: string;
	rowSpan?: number;
	colSpan?: number;
	/** Rendered as a shaded header cell. */
	header?: boolean;
	align?: "left" | "center" | "right";
}

/** One visual chunk of a reading document, mirroring the printed layout. */
export type Block =
	/** Centred title of the printed material (e.g. the sign board headline). */
	| { type: "title"; jp: string; cn: string; en?: string; sub?: Bilingual }
	/** A sub-heading inside the material. */
	| { type: "heading"; jp: string; cn: string; en?: string }
	/** Ordinary running paragraph; `indent` reproduces the 1-character indent. */
	| { type: "paragraph"; jp: string; cn: string; en?: string; indent?: boolean }
	/** A single standalone line (address line, date line, signature…). */
	| { type: "line"; jp: string; cn: string; en?: string; align?: "left" | "center" | "right" }
	/** Dialogue line with a speaker label. */
	| { type: "speech"; speaker: string; speakerCn: string; speakerEn?: string; jp: string; cn: string; en?: string }
	/** Bulleted / numbered list as printed. */
	| { type: "list"; ordered?: boolean; marker?: string; items: Bilingual[] }
	/** Grid such as the library opening-hours chart. */
	| { type: "table"; caption?: Bilingual; rows: TableCell[][] }
	/** Boxed remark inside the material (e.g. ※ notice under a table). */
	| { type: "note"; jp: string; cn: string; en?: string }
	/** Source credit printed under the passage, e.g. （竹内均『…』同文書院）. */
	| { type: "source"; jp: string; cn: string; en?: string }
	/** Diagram/photo that cannot be reproduced as text; described for the reader. */
	| { type: "figure"; alt: string; cn: string; en?: string; svg?: string };

/** ※1 / （注1） style glossary printed with the passage. */
export interface Footnote {
	marker: string;
	term: string;
	jp: string;
	cn: string;
	en?: string;
}

export interface Choice {
	jp: string;
	cn: string;
	en?: string;
}

export interface Question {
	/** Printed label: 問1, 問い, 1, 2 … */
	label: string;
	jp: string;
	cn: string;
	en?: string;
	choices: Choice[];
	/** 1-based index of the correct choice. */
	answer: number;
	/** Chinese explanation of why that choice is right. */
	explanation: string;
	explanationEn?: string;
	/** Why each wrong choice fails, indexed like `choices`. */
	choiceNotes?: string[];
	choiceNotesEn?: string[];
}

/** The ★ skill point taught on the left-hand page. */
export interface PointSection {
	title: string;
	titleCn: string;
	titleEn?: string;
	tips: Bilingual[];
	/** よく使われる表現 vocabulary strip. */
	expressions: { jp: string; kana?: string; cn: string; en?: string }[];
	notes?: Bilingual[];
	figure?: { alt: string; cn: string; en?: string };
}

/** The れんしゅう warm-up on the left-hand page. */
export interface RenshuSection {
	instruction: string;
	instructionCn: string;
	instructionEn?: string;
	blocks: Block[];
	choices: Choice[];
	/** 1-based indexes; the warm-up often has more than one correct statement. */
	answers: number[];
	footnotes?: Footnote[];
	hint?: Bilingual;
	/** Grey-text translations printed at the foot of the left-hand page. */
	pageNotes?: Bilingual[];
}

/** The もんだい exercise on the right-hand page. */
export interface MondaiSection {
	instruction: string;
	instructionCn: string;
	instructionEn?: string;
	/** Printed heading of the exercise, when the material has one. */
	blocks: Block[];
	footnotes?: Footnote[];
	questions: Question[];
	/** Grey-text translations printed at the foot of the page. */
	pageNotes?: Bilingual[];
}

export interface VocabEntry {
	jp: string;
	/** Omitted for words already written in kana (チラシ, ただし …). */
	kana?: string;
	cn: string;
	en?: string;
	/** 名詞 / 動詞 / い形 / な形 / 副詞 / 表現 … */
	pos?: string;
}

export interface GrammarEntry {
	pattern: string;
	/** Connection rule, e.g. 「動詞ない形＋といけない」. */
	formation?: string;
	meaning: string;
	meaningEn?: string;
	/** Example lifted from this day's text. */
	example?: Bilingual;
	note?: string;
	noteEn?: string;
}

export interface ReadingDay {
	week: number;
	day: number;
	/** 案内①, カタログ①, 実戦問題 … */
	label: string;
	labelKana?: string;
	labelEn?: string;
	/** Printed page numbers this day occupies. */
	printedPages: number[];
	point?: PointSection;
	renshu?: RenshuSection;
	mondai?: MondaiSection;
	/** 実戦問題 days carry several numbered 問題 groups instead. */
	practice?: {
		timeLimitMinutes: number;
		scoring: string;
		groups: {
			label: string;
			instruction: string;
			instructionCn: string;
			instructionEn?: string;
			blocks: Block[];
			footnotes?: Footnote[];
			questions: Question[];
		}[];
	};
	vocab: VocabEntry[];
	grammar: GrammarEntry[];
	/** "book" = printed 別冊 answers; "derived" = worked out here (別冊 p.6–7 missing from the scan). */
	answerSource: "book" | "derived";
}

export interface ReadingWeek {
	week: number;
	title: string;
	titleKana: string;
	titleCn: string;
	titleEn: string;
	printedStart: number;
	days: ReadingDay[];
}
