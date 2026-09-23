import glosses from "../data/lesson-review-glosses.json";
import examples from "../data/lesson-review-examples.json";
import kanjiReadings from "../data/lesson-review-kanji-readings.json";
import {
	buildReviewRuby,
	LESSON_REVIEW_SOURCE,
	shouldKeepReviewRuby,
	toHiragana,
	type LessonReviewDoc,
	type LessonReviewPayload,
	type ReviewDay,
	type ReviewItem,
	type ReviewKind,
} from "./lesson-review";

const HAS_JP = /[\u3040-\u30ff\u4e00-\u9fff]/;
const KANA_ONLY = /^[\u3040-\u309f\u30a0-\u30ffー\s]+$/;
const DATE_HEADING = /^(?:#{1,6}\s*)?(\d{4})[./年-](\d{1,2})[./月-](\d{1,2})日?(?:\s+(.+))?\s*$/;
const SHORT_DATE_HEADING = /^(?:#{1,6}\s*)?(\d{1,2})[./月-](\d{1,2})日?\s*$/;
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

export function parseLessonReview(
	markdown: string,
	opts?: { sourceName?: string; sourceSlug?: string },
): ReviewDay[] {
	const dated = new Map<string, ReviewItem[]>();
	const dateLabels = new Map<string, string>();
	const notes = new Map<string, { title: string; items: ReviewItem[] }>();
	let current: OpenGroup | null = null;
	let lastYear = new Date().getFullYear();

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
		const date = matchDateHeading(trimmed, lastYear);
		if (date) {
			current = { kind: "date", id: date.id };
			lastYear = date.year;
			if (!dated.has(date.id)) dated.set(date.id, []);
			if (date.label) dateLabels.set(date.id, date.label);
			continue;
		}

		const heading = matchHeading(trimmed);
		if (heading) {
			if (heading.level > 1) continue;
			if (SKIP_HEADINGS.has(heading.title)) {
				current = null;
				continue;
			}
			if (!HAS_JP.test(heading.title) && !NOTE_SLUGS[heading.title]) continue;
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
		if (isChineseProse(cleaned)) continue;

		const items = itemsOf(current);
		const last = items[items.length - 1];
		if (last && attachFollowUp(last, cleaned)) continue;

		if (isGlossOnly(cleaned)) {
			if (last && !last.cn && !last.en) Object.assign(last, classifyGloss(cleaned));
			continue;
		}

		for (const item of parseItems(cleaned)) pushItem(items, item);
	}

	const days: ReviewDay[] = [...dated.entries()]
		.filter(([, items]) => items.length > 0)
		.sort((a, b) => b[0].localeCompare(a[0]))
		.map(([date, items]) => ({
			id: date,
			date,
			title: date,
			label: dateLabels.get(date),
			items,
		}));

	for (const [id, note] of notes) {
		if (!note.items.length) continue;
		days.push({ id, title: note.title, items: note.items });
	}
	return applySource(days, opts);
}

export function mergeLessonReviewDays(groups: ReviewDay[][]): ReviewDay[] {
	const dated: ReviewDay[] = [];
	const notes: ReviewDay[] = [];
	const seen = new Set<string>();
	for (const group of groups) {
		for (const day of group) {
			let id = day.id;
			if (seen.has(id)) id = `${day.id}:${slugNote(day.source || "dup")}`;
			seen.add(id);
			const next = id === day.id ? day : { ...day, id };
			(next.date ? dated : notes).push(next);
		}
	}
	dated.sort((a, b) => {
		const byDate = (b.date || "").localeCompare(a.date || "");
		if (byDate) return byDate;
		return (a.source || "").localeCompare(b.source || "", "ja");
	});
	return [...dated, ...notes];
}

export function buildLessonReviewPayload(
	markdown: string,
	opts?: { source?: string; fetchedAt?: string; sourceName?: string; sourceSlug?: string },
): LessonReviewPayload {
	return {
		source: opts?.source || LESSON_REVIEW_SOURCE,
		fetchedAt: opts?.fetchedAt || new Date().toISOString(),
		days: enrichReviewDays(parseLessonReview(markdown, opts)),
	};
}

export function buildLessonReviewPayloadFromDocs(
	docs: Array<Pick<LessonReviewDoc, "id" | "name" | "slug"> & { markdown: string }>,
	opts?: { fetchedAt?: string; source?: string },
): LessonReviewPayload {
	const groups = docs.map((doc) =>
		parseLessonReview(doc.markdown, { sourceName: doc.name, sourceSlug: doc.slug }),
	);
	return {
		source: opts?.source || docs.map((doc) => `https://docs.google.com/document/d/${doc.id}/edit`).join("\n"),
		fetchedAt: opts?.fetchedAt || new Date().toISOString(),
		days: enrichReviewDays(mergeLessonReviewDays(groups)),
	};
}

export function enrichReviewDays(days: ReviewDay[]): ReviewDay[] {
	return days.map((day) => ({
		...day,
		items: day.items.map((item) => enrichReviewItem(item)),
	}));
}

type ReviewExtra = {
	cn?: string;
	en?: string;
	example?: string;
	exampleCn?: string;
	exampleEn?: string;
};

function enrichReviewItem(item: ReviewItem): ReviewItem {
	const gloss = (glosses as Record<string, ReviewExtra>)[item.jp];
	const extra = (examples as Record<string, ReviewExtra>)[item.jp];
	const next: ReviewItem = { ...item };
	for (const source of [gloss, extra]) {
		if (!source) continue;
		if (!next.cn && source.cn) next.cn = source.cn;
		if (!next.en && source.en) next.en = source.en;
	}
	// Authored examples are the source of truth, so a reading fix replaces the stored sentence.
	if (extra?.example) {
		next.example = extra.example;
		if (extra.exampleCn) next.exampleCn = extra.exampleCn;
		if (extra.exampleEn) next.exampleEn = extra.exampleEn;
	}
	const inline = splitInlineReading(next.jp);
	const reading = next.reading || inline.reading;
	const surface = inline.jp.replace(/\([A-Za-züÜ]+\d*\)/g, "");
	delete next.jp_r;
	delete next.example_r;
	const ruby = buildReviewRuby(surface, reading, kanjiReadings);
	if (ruby && shouldKeepReviewRuby(surface, ruby)) next.jp_r = ruby;
	if (reading && !next.reading) next.reading = reading;
	if (next.example && next.kind === "word") {
		const exampleRuby = buildReviewRuby(next.example, undefined, kanjiReadings);
		if (exampleRuby && shouldKeepReviewRuby(next.example, exampleRuby)) next.example_r = exampleRuby;
	}
	return compactItem(next);
}

function splitInlineReading(jp: string): { jp: string; reading?: string } {
	const match = jp.match(/^(.*?[一-龯々〆ヵヶ][^\s]*)\s+([ぁ-んァ-ンー]{2,24})$/);
	if (!match) return { jp };
	return { jp: match[1].trim(), reading: match[2] };
}

function matchDateHeading(line: string, lastYear: number): { id: string; label?: string; year: number } | null {
	const full = line.match(DATE_HEADING);
	if (full) {
		const year = +full[1];
		const month = +full[2];
		const day = +full[3];
		if (!validDate(year, month, day)) return null;
		const label = full[4]?.trim();
		return { id: `${year}-${pad(month)}-${pad(day)}`, label: label || undefined, year };
	}
	const short = line.match(SHORT_DATE_HEADING);
	if (!short) return null;
	const month = +short[1];
	const day = +short[2];
	if (!validDate(lastYear, month, day)) return null;
	return { id: `${lastYear}-${pad(month)}-${pad(day)}`, year: lastYear };
}

function validDate(year: number, month: number, day: number): boolean {
	if (year < 2000 || year > 2100 || month < 1 || month > 12 || day < 1 || day > 31) return false;
	const date = new Date(Date.UTC(year, month - 1, day));
	return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function applySource(days: ReviewDay[], opts?: { sourceName?: string; sourceSlug?: string }): ReviewDay[] {
	if (!opts?.sourceName && !opts?.sourceSlug) return days;
	const namespaced = Boolean(opts.sourceSlug && opts.sourceSlug !== "class");
	return days.map((day) => ({
		...day,
		id: namespaced ? `${day.id}:${opts.sourceSlug}` : day.id,
		source: opts.sourceName || day.source,
	}));
}

function attachFollowUp(last: ReviewItem, cleaned: string): boolean {
	if (KANA_ONLY.test(cleaned)) {
		const kana = cleaned.replace(/\s+/g, "");
		if (looksLikeReading(kana, last.jp)) {
			const prev = last.reading?.replace(/[・\s]/g, "") || "";
			if (!prev) {
				last.reading = kana;
				return true;
			}
			if (toHiragana(prev) === toHiragana(kana)) return true;
			if (kana.includes(prev) && kana.length > prev.length) {
				last.reading = kana;
				return true;
			}
		}
	}
	if (!last.cn && isChineseFollowUp(cleaned, last)) {
		Object.assign(last, classifyGloss(cleaned));
		return true;
	}
	const lastHead = last.jp.replace(/[（(][\s\S]*/, "").trim();
	if (lastHead && cleaned.startsWith(lastHead) && cleaned !== last.jp && !/[\u3040-\u30ff]/.test(cleaned.replace(/[（(][^）)]*[）)]?/g, ""))) {
		Object.assign(last, classifyGloss(cleaned));
		return true;
	}
	return false;
}

function looksLikeReading(kana: string, jp: string): boolean {
	const hira = (kana.match(/[\u3041-\u3096]/g) || []).length;
	const kata = (kana.match(/[\u30a1-\u30f6]/g) || []).length;
	if (kata > hira) return false;
	if (kana.length > 24 || kana.includes("／") || kana.includes("/")) return false;
	const core = jp.replace(/[（(][^）)]*[）)]?/g, "").replace(/\s+/g, "");
	if (/^[\u30a0-\u30ffー]+$/.test(core) && /^[\u3040-\u309fー]+$/.test(kana)) {
		return Math.abs(kana.length - core.length) <= 3;
	}
	if (!/[一-龯]/.test(jp)) return false;
	const jpHasCopula = /です|ます|でしょう|あります/.test(jp);
	if (!jpHasCopula && /です|でしょう/.test(kana)) return false;
	if (!jpHasCopula && /ます/.test(kana) && kana !== "ますます") return false;
	const shortWord = core.length <= 8 && !/[。！？!?]/.test(jp);
	if (shortWord) {
		if (kana.length > 12) return false;
		if (/^(きっと|それは|それなら|そうしよう|だって|でも|じゃあ|やっぱり|さらに|ますます)/.test(kana)) return false;
		if (/(?:よ|ね|かな)$/.test(kana) && kana.length >= 5) return false;
	} else if (kana.length < Math.min(8, Math.max(3, core.length - 2))) {
		return false;
	}
	return true;
}

function isChineseFollowUp(text: string, last?: ReviewItem): boolean {
	const stripped = text.replace(/[（(][^）)]*[）)]?/g, "");
	if (/[\u3040-\u30ff]/.test(stripped) || !/[\u4e00-\u9fff]/.test(stripped)) return false;
	if (/[，。；／]/.test(text)) return true;
	if (/^(自己|这个|那种|表示|用于)/.test(stripped)) return true;
	const lastCore = last?.jp.replace(/[（(][^）)]*[）)]?/g, "").trim() || "";
	if (last && /^[\u30a0-\u30ffー]+$/.test(lastCore)) return true;
	return /[时这从为对来过经现开关还没钱东车语门问间见贝页马齐气爱乐听读写买卖干后里汉儿吗吧您请谢们个很把让给跟头脑馆视剧电满条长发]|的|了/.test(stripped);
}

function isChineseProse(text: string): boolean {
	if (/[\u3040-\u30ff]/.test(text)) return false;
	if (!/[\u4e00-\u9fff]/.test(text)) return false;
	const han = (text.match(/[\u4e00-\u9fff]/g) || []).length;
	return han >= 8 && /[，。；]/.test(text);
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
	if (/^[\d.\s*x×+\-/=]+$/.test(cleaned)) return true;
	if (/^\d+\s*[A-Za-z]+$/.test(cleaned)) return true;
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

function parseItems(line: string): ReviewItem[] {
	if (/[|｜]/.test(line)) {
		const item = parseItem(line);
		return item ? [item] : [];
	}
	const fw = line.split("　").map((part) => part.trim()).filter(Boolean);
	if (
		fw.length >= 2 &&
		fw.every((part) => HAS_JP.test(part) && !isChineseFollowUp(part) && !isGlossOnly(part))
	) {
		return fw.flatMap((part) => {
			const item = parseItem(part);
			return item ? [item] : [];
		});
	}
	const tokens = line.split(/\s+/).filter(Boolean);
	if (
		tokens.length >= 2 &&
		tokens.every(
			(token) =>
				HAS_JP.test(token) &&
				/[一-龯]/.test(token) &&
				!/[ァ-ヶ]/.test(token) &&
				token.length <= 8 &&
				!/[。！？!?]/.test(token) &&
				!/=|＝/.test(token),
		)
	) {
		return tokens.flatMap((token) => {
			const item = parseItem(token);
			return item ? [item] : [];
		});
	}
	const item = parseItem(line);
	return item ? [item] : [];
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
	const piped = splitOnce(line.replace(/｜/g, "|"), /\s*\|\s*/);
	if (piped && HAS_JP.test(piped[0])) return { jp: piped[0], ...classifyGloss(piped[1]) };

	const eq = splitOnce(line, /＝|=/);
	if (eq) return { jp: eq[0], ...classifyGloss(eq[1]) };

	const fw = line.split("　").map((part) => part.trim()).filter(Boolean);
	if (fw.length >= 2) {
		const rest = fw.slice(1).join(" ");
		if (isGlossOnly(rest) || isChineseFollowUp(rest) || !HAS_JP.test(rest)) {
			return { jp: fw[0], ...classifyGloss(rest) };
		}
	}

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
	if (item.example) out.example = item.example;
	if (item.exampleCn) out.exampleCn = item.exampleCn;
	if (item.exampleEn) out.exampleEn = item.exampleEn;
	if (item.example_r) out.example_r = item.example_r;
	return out;
}

function unique(values: string[]): string[] {
	return [...new Set(values)];
}
