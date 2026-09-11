import glosses from "../data/lesson-review-glosses.json";
import {
	buildReviewRuby,
	LESSON_REVIEW_SOURCE,
	type LessonReviewPayload,
	type ReviewDay,
	type ReviewItem,
	type ReviewKind,
} from "./lesson-review";

const HAS_JP = /[\u3040-\u30ff\u4e00-\u9fff]/;
const KANA_ONLY = /^[\u3040-\u309f\u30a0-\u30ffー\s]+$/;
const DATE_HEADING = /^(?:#{1,6}\s*)?(\d{4})[./年-](\d{1,2})[./月-](\d{1,2})日?\s*$/;
const MD_HEADING = /^(#{1,6})\s+(.+?)\s*$/;
const SKIP_HEADINGS = new Set(["先生から", "自分のノート"]);
const NOTE_SLUGS: Record<string, string> = {
	職場で文: "workplace",
	レストランで文: "restaurant",
	銀行で: "bank",
};

type OpenGroup =
	| { kind: "date"; id: string }
	| { kind: "note"; id: string; title: string };

export function parseLessonReview(markdown: string): ReviewDay[] {
	const dated = new Map<string, ReviewItem[]>();
	const notes = new Map<string, { title: string; items: ReviewItem[] }>();
	let current: OpenGroup | null = null;

	const itemsOf = (group: OpenGroup): ReviewItem[] => {
		if (group.kind === "date") {
			const list = dated.get(group.id) || [];
			dated.set(group.id, list);
			return list;
		}
		const existing = notes.get(group.id) || { title: group.title, items: [] };
		notes.set(group.id, existing);
		return existing.items;
	};

	for (const raw of markdown.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").split("\n")) {
		const trimmed = raw.trim();
		const date = matchDateHeading(trimmed);
		if (date) {
			current = { kind: "date", id: date };
			if (!dated.has(date)) dated.set(date, []);
			continue;
		}

		const heading = matchHeading(trimmed);
		if (heading) {
			if (heading.level > 1) continue;
			if (SKIP_HEADINGS.has(heading.title)) {
				current = null;
				continue;
			}
			const id = "note-" + slugNote(heading.title);
			current = { kind: "note", id, title: heading.title };
			if (!notes.has(id)) notes.set(id, { title: heading.title, items: [] });
			continue;
		}

		if (!current) continue;

		if (trimmed.startsWith("|")) {
			const tableItem = parseTableRow(trimmed);
			if (tableItem) pushItem(itemsOf(current), tableItem);
			continue;
		}

		const cleaned = cleanLine(trimmed);
		if (shouldSkipLine(cleaned, trimmed)) continue;

		if (isGlossOnly(cleaned)) {
			const items = itemsOf(current);
			const last = items[items.length - 1];
			if (last && !last.cn && !last.en) Object.assign(last, classifyGloss(cleaned));
			continue;
		}

		const item = parseItem(cleaned);
		if (item) pushItem(itemsOf(current), item);
	}

	const days: ReviewDay[] = [...dated.entries()]
		.filter(([, items]) => items.length > 0)
		.sort((a, b) => b[0].localeCompare(a[0]))
		.map(([date, items]) => ({ id: date, date, title: date, items }));

	for (const [id, note] of notes) {
		if (!note.items.length) continue;
		days.push({ id, title: note.title, items: note.items });
	}
	return days;
}

export function buildLessonReviewPayload(
	markdown: string,
	opts?: { source?: string; fetchedAt?: string },
): LessonReviewPayload {
	return {
		source: opts?.source || LESSON_REVIEW_SOURCE,
		fetchedAt: opts?.fetchedAt || new Date().toISOString(),
		days: enrichReviewDays(parseLessonReview(markdown)),
	};
}

export function enrichReviewDays(days: ReviewDay[]): ReviewDay[] {
	return days.map((day) => ({
		...day,
		items: day.items.map((item) => enrichReviewItem(item)),
	}));
}

function enrichReviewItem(item: ReviewItem): ReviewItem {
	const gloss = (glosses as Record<string, { cn?: string; en?: string }>)[item.jp];
	const next: ReviewItem = { ...item };
	if (gloss) {
		if (!next.cn && gloss.cn) next.cn = gloss.cn;
		if (!next.en && gloss.en) next.en = gloss.en;
	}
	const ruby = buildReviewRuby(next.jp, next.reading);
	if (ruby) next.jp_r = ruby;
	return compactItem(next);
}

function matchDateHeading(line: string): string | null {
	const match = line.match(DATE_HEADING);
	if (!match) return null;
	return `${match[1]}-${pad(+match[2])}-${pad(+match[3])}`;
}

function matchHeading(line: string): { level: number; title: string } | null {
	const match = line.match(MD_HEADING);
	if (match) {
		const title = cleanLine(match[2]);
		if (!title || DATE_HEADING.test(title)) return null;
		return { level: match[1].length, title };
	}
	const title = cleanLine(line);
	if (SKIP_HEADINGS.has(title) || NOTE_SLUGS[title]) return { level: 1, title };
	return null;
}

function slugNote(title: string): string {
	if (NOTE_SLUGS[title]) return NOTE_SLUGS[title];
	const ascii = title
		.toLowerCase()
		.replace(/[^\w]+/g, "-")
		.replace(/^-+|-+$/g, "");
	if (ascii.length >= 2) return ascii;
	let hash = 0;
	for (const ch of title) hash = (Math.imul(hash, 33) + (ch.codePointAt(0) || 0)) >>> 0;
	return "n" + hash.toString(16);
}

function pad(n: number): string {
	return String(n).padStart(2, "0");
}

function cleanLine(raw: string): string {
	return unescapeMd(raw)
		.replace(/!\[[^\]]*\]\([^)]*\)/g, "")
		.replace(/!\[[^\]]*\]\[[^\]]*\]/g, "")
		.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
		.replace(/\*\*/g, "")
		.replace(/^[-*]\s+/, "")
		.replace(/[^\S\u3000]+/g, " ")
		.replace(/　+/g, "　")
		.trim();
}

function unescapeMd(raw: string): string {
	return raw
		.replace(/&nbsp;/gi, " ")
		.replace(/&amp;/g, "&")
		.replace(/\\([\\_~=*![\]()])/g, "$1");
}

function shouldSkipLine(cleaned: string, raw: string): boolean {
	if (!cleaned) return true;
	if (/^https?:\/\//i.test(cleaned)) return true;
	if (/^!?\[image\d+\]/i.test(cleaned)) return true;
	if (/^[-—–_*]{3,}$/.test(cleaned)) return true;
	if (/^:?-{3,}:?$/.test(cleaned)) return true;
	if (/^!\[/.test(raw.trim())) return true;
	if (HAS_JP.test(cleaned) && isMostlyLatinPrompt(cleaned)) return true;
	return false;
}

function isMostlyLatinPrompt(text: string): boolean {
	const jp = (text.match(/[\u3040-\u30ff\u4e00-\u9fff]/g) || []).length;
	if (jp >= 2) return false;
	const latin = (text.match(/[A-Za-z]/g) || []).length;
	return latin >= 12;
}

function isGlossOnly(text: string): boolean {
	return Boolean(text) && !HAS_JP.test(text);
}

function parseTableRow(line: string): ReviewItem | null {
	const cells = line
		.replace(/^\|/, "")
		.replace(/\|$/, "")
		.split("|")
		.map((cell) => cleanLine(cell));
	if (cells.length < 2) return null;
	if (cells.every((cell) => /^:?-{2,}:?$/.test(cell))) return null;
	const jp = cells[0];
	if (!jp || !HAS_JP.test(jp)) return null;
	if (/^(日文|读音|中文|英語|English)/i.test(jp)) return null;
	const second = cells[1] || "";
	const third = cells[2] || "";
	const reading = second && KANA_ONLY.test(second) ? second : undefined;
	const cn = (third || (!reading ? second : "")).trim() || undefined;
	return compactItem({ jp, reading, cn, kind: "word" });
}

function parseItem(line: string): ReviewItem | null {
	const split = splitJpGloss(line);
	if (!split.jp || !HAS_JP.test(split.jp)) return null;
	const extracted = extractReading(split.jp);
	const peeled = peelTrailingGloss(extracted.jp);
	let reading = extracted.reading;
	let cn = split.cn;
	let en = split.en;
	if (peeled.extra) {
		const extra = classifyGloss(peeled.extra);
		cn = cn || extra.cn;
		en = en || extra.en;
	}
	if (!reading && cn && KANA_ONLY.test(cn) && !en) {
		reading = cn.replace(/\s+/g, "");
		cn = undefined;
	}
	if (!reading && en && KANA_ONLY.test(en) && !cn) {
		reading = en.replace(/\s+/g, "");
		en = undefined;
	}
	return compactItem({
		jp: peeled.jp,
		reading,
		cn,
		en,
		kind: classifyKind(peeled.jp),
	});
}

function peelTrailingGloss(jp: string): { jp: string; extra?: string } {
	const fw = jp.split("　").map((part) => part.trim()).filter(Boolean);
	if (fw.length === 2 && !HAS_JP.test(fw[1])) return { jp: fw[0], extra: fw[1] };
	const glued = jp.match(/^(.*?[\u3040-\u30ff\u4e00-\u9fff）)])\s*([A-Za-z][A-Za-z\s'.,!?-]*)$/);
	if (glued && glued[1].trim() && glued[2].trim()) return { jp: glued[1].trim(), extra: glued[2].trim() };
	return { jp };
}

function splitJpGloss(line: string): { jp: string; cn?: string; en?: string } {
	const eq = splitOnce(line, /＝|=/);
	if (eq) return { jp: eq[0], ...classifyGloss(eq[1]) };

	const fw = line.split("　").map((part) => part.trim()).filter(Boolean);
	if (fw.length >= 2) return { jp: fw[0], ...classifyGloss(fw.slice(1).join(" ")) };

	const spaced = line.match(/^(.+?)\s{2,}(.+)$/);
	if (spaced) return { jp: spaced[1].trim(), ...classifyGloss(spaced[2].trim()) };

	const jaEn = line.match(/^([\u3040-\u30ff\u4e00-\u9fff\u3000-\u303fぁ-んァ-ンー、。！？]+)\s+([A-Za-z].+)$/);
	if (jaEn) return { jp: jaEn[1].trim(), ...classifyGloss(jaEn[2].trim()) };

	const jaCn = line.match(/^(.+?)\s+([\u4e00-\u9fff]{1,12})$/);
	if (jaCn && /[\u3040-\u30ff]/.test(jaCn[1])) return { jp: jaCn[1].trim(), cn: jaCn[2] };

	return { jp: line };
}

function splitOnce(text: string, sep: RegExp): [string, string] | null {
	const match = sep.exec(text);
	if (!match || match.index == null) return null;
	const left = text.slice(0, match.index).trim();
	const right = text.slice(match.index + match[0].length).trim();
	if (!left || !right) return null;
	return [left, right];
}

function classifyGloss(raw: string): { cn?: string; en?: string } {
	const text = raw.replace(/^[=\s]+/, "").trim();
	if (!text) return {};
	if (KANA_ONLY.test(text)) return { cn: text };
	const hasHan = /[\u4e00-\u9fff]/.test(text);
	const hasLatin = /[A-Za-z]{2,}/.test(text);
	if (hasHan && hasLatin) {
		const enMatch = text.match(/[A-Za-z][A-Za-z\s'.,!?-]{1,}/);
		const cnMatch = text.match(/[\u4e00-\u9fff][\u4e00-\u9fff\s0-9%％]*/);
		return {
			en: enMatch ? enMatch[0].trim() : undefined,
			cn: cnMatch ? cnMatch[0].trim() : text,
		};
	}
	if (hasHan) return { cn: text };
	if (hasLatin) return { en: text };
	return { cn: text };
}

function extractReading(jp: string): { jp: string; reading?: string } {
	const readings: string[] = [];
	const re = /[（(]([^）)]{1,40})[）)]?/g;
	let match: RegExpExecArray | null;
	while ((match = re.exec(jp))) {
		const inner = match[1].replace(/\s+/g, "").trim();
		if (inner && /[\u3040-\u30ff]/.test(inner) && inner.length <= 24) readings.push(inner);
	}
	return { jp: jp.trim(), reading: readings.length ? unique(readings).join("・") : undefined };
}

function classifyKind(jp: string): ReviewKind {
	if (/[。！？!?…]/.test(jp)) return "sentence";
	if (/(です|ます|ました|ません|でしょう|ください)($|。)/.test(jp)) return "sentence";
	const core = jp.replace(/[（(][^）)]*[）)]?/g, "").replace(/\s+/g, "");
	if (core.length >= 10 && /[、]|のは|のが|して|った/.test(core)) return "sentence";
	if (core.length >= 12 && /[はがをにでと]/.test(core)) return "sentence";
	if (core.length >= 22) return "sentence";
	return "word";
}

function pushItem(items: ReviewItem[], item: ReviewItem) {
	if (items.some((existing) => existing.jp === item.jp)) return;
	items.push(item);
}

function compactItem(item: ReviewItem): ReviewItem {
	const out: ReviewItem = { jp: item.jp, kind: item.kind };
	if (item.jp_r) out.jp_r = item.jp_r;
	if (item.reading) out.reading = item.reading;
	if (item.cn) out.cn = item.cn;
	if (item.en) out.en = item.en;
	return out;
}

function unique(values: string[]): string[] {
	return [...new Set(values)];
}
