export type ReviewKind = "word" | "sentence";

export type ReviewItem = {
	jp: string;
	jp_r?: string;
	reading?: string;
	cn?: string;
	en?: string;
	kind: ReviewKind;
};

export type ReviewDay = {
	id: string;
	date?: string;
	title: string;
	label?: string;
	items: ReviewItem[];
};

export type LessonReviewPayload = {
	source: string;
	fetchedAt: string;
	days: ReviewDay[];
};

export const LESSON_REVIEW_KV_KEY = "lesson-review:v1";
export const LESSON_REVIEW_DOC_ID = "12NwKtAV_HFUeOheYvXGMsJl5G2xIcdb4WG_axC23xrU";
export const LESSON_REVIEW_SOURCE = `https://docs.google.com/document/d/${LESSON_REVIEW_DOC_ID}/edit`;

export function parseReviewRoute(key: string): { id: string | null } | null {
	if (key === "#/review") return { id: null };
	const match = key.match(/^#\/review\/([A-Za-z0-9][A-Za-z0-9:_-]*)$/);
	if (!match) return null;
	return { id: match[1] };
}

export function jstToday(now = Date.now()): string {
	return new Intl.DateTimeFormat("en-CA", {
		timeZone: "Asia/Tokyo",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(new Date(now));
}

export function formatReviewDate(iso: string, lang: "cn" | "en"): string {
	const parts = iso.split("-").map(Number);
	const year = parts[0];
	const month = parts[1];
	const day = parts[2];
	if (!year || !month || !day) return iso;
	if (lang === "en") {
		const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		return `${months[month - 1]} ${day}, ${year}`;
	}
	return `${year}年${month}月${day}日`;
}

export function formatReviewMonthDay(iso: string, lang: "cn" | "en"): string {
	const parts = iso.split("-").map(Number);
	const month = parts[1];
	const day = parts[2];
	if (!month || !day) return iso;
	if (lang === "en") {
		const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		return `${months[month - 1]} ${day}`;
	}
	return `${month}月${day}日`;
}

export function formatReviewMonth(iso: string, lang: "cn" | "en"): string {
	const month = Number(iso.split("-")[1]);
	if (!month) return "";
	if (lang === "en") {
		const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		return months[month - 1] ?? "";
	}
	return `${month}月`;
}

export function formatReviewDayNum(iso: string): string {
	const day = Number(iso.split("-")[2]);
	if (!day) return "";
	return String(day);
}

export function reviewDayCounts(day: ReviewDay): { words: number; sentences: number } {
	let words = 0;
	let sentences = 0;
	for (const item of day.items) {
		if (item.kind === "sentence") sentences += 1;
		else words += 1;
	}
	return { words, sentences };
}

export function isLessonReviewPayload(value: unknown): value is LessonReviewPayload {
	if (!value || typeof value !== "object") return false;
	const payload = value as LessonReviewPayload;
	if (typeof payload.fetchedAt !== "string" || !Array.isArray(payload.days)) return false;
	return payload.days.every(isReviewDay);
}

function isReviewDay(value: unknown): value is ReviewDay {
	if (!value || typeof value !== "object") return false;
	const day = value as ReviewDay;
	if (typeof day.id !== "string" || typeof day.title !== "string" || !Array.isArray(day.items)) return false;
	if (day.date != null && typeof day.date !== "string") return false;
	if (day.label != null && typeof day.label !== "string") return false;
	return day.items.every(isReviewItem);
}

function isReviewItem(value: unknown): value is ReviewItem {
	if (!value || typeof value !== "object") return false;
	const item = value as ReviewItem;
	if (typeof item.jp !== "string" || !item.jp.trim()) return false;
	if (item.kind !== "word" && item.kind !== "sentence") return false;
	if (item.reading != null && typeof item.reading !== "string") return false;
	if (item.jp_r != null && typeof item.jp_r !== "string") return false;
	if (item.cn != null && typeof item.cn !== "string") return false;
	if (item.en != null && typeof item.en !== "string") return false;
	return true;
}

export function reviewItemKey(dayId: string, jp: string): string {
	return `${dayId}::${jp}`;
}

export function formatReviewWeekday(iso: string, lang: "cn" | "en"): string {
	const parts = iso.split("-").map(Number);
	const year = parts[0];
	const month = parts[1];
	const day = parts[2];
	if (!year || !month || !day) return "";
	const date = new Date(Date.UTC(year, month - 1, day));
	if (lang === "en") return date.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });
	return "星期" + "日一二三四五六"[date.getUTCDay()];
}

export function toKatakana(text: string): string {
	return text.replace(/[\u3041-\u3096]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) + 0x60));
}

export function toHiragana(text: string): string {
	return text.replace(/[\u30a1-\u30f6]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60));
}

function rubyRt(reading: string): string {
	return escapeXml(toHiragana(reading.replace(/[\s・]+/g, "")));
}

const PARTICLE_KANA = /^(?:は|が|を|に|の|へ|と|や|も|で)+$/;

function takeWordBefore(jp: string, end: number): { start: number; word: string } | null {
	let i = end;
	let j = i;
	while (j > 0 && /[ぁ-んァ-ンー]/.test(jp[j - 1] || "")) j -= 1;
	const trailing = jp.slice(j, i);
	if (trailing && !PARTICLE_KANA.test(trailing)) i = j;
	let seenKanji = false;
	while (i > 0) {
		const ch = jp[i - 1] || "";
		if (/[一-龯々〆ヵヶ]/.test(ch)) {
			seenKanji = true;
			i -= 1;
			continue;
		}
		if (seenKanji && /[ぁ-んァ-ンー]/.test(ch)) {
			let k = i;
			while (k > 0 && /[ぁ-んァ-ンー]/.test(jp[k - 1] || "")) k -= 1;
			const kanaRun = jp.slice(k, i);
			const leftKanji = k > 0 && /[一-龯々〆ヵヶ]/.test(jp[k - 1] || "");
			if (!leftKanji || PARTICLE_KANA.test(kanaRun)) break;
			i = k;
			continue;
		}
		break;
	}
	const word = jp.slice(i, end);
	if (!seenKanji || !word) return null;
	return { start: i, word };
}

function wrapPlainWithReadings(plain: string, readings?: Record<string, string>): string {
	if (!plain) return "";
	if (readings) {
		const filled = applyKanjiReadings(plain, readings);
		if (filled) return filled;
	}
	return escapeXml(plain);
}

export function buildReviewRuby(jp: string, reading?: string, readings?: Record<string, string>): string | undefined {
	if (!jp || !/[一-龯]/.test(jp)) return undefined;
	const re = /[（(]([^）)]{1,24})[）)]?/g;
	let html = "";
	let last = 0;
	let found = false;
	let match: RegExpExecArray | null;
	while ((match = re.exec(jp))) {
		let parenAt = match.index;
		while (parenAt > last && /\s/.test(jp[parenAt - 1] || "")) parenAt -= 1;
		const inner = match[1].trim();
		if (/^[ぁ-んァ-ンー][ぁ-んァ-ンー\s]{0,23}$/.test(inner)) {
			const wordInfo = takeWordBefore(jp, parenAt);
			const plainEnd = wordInfo ? wordInfo.start : parenAt;
			html += wrapPlainWithReadings(jp.slice(last, plainEnd), readings);
			if (wordInfo) {
				found = true;
				html += `<ruby>${escapeXml(wordInfo.word)}<rt>${rubyRt(inner)}</rt></ruby>`;
				last = match.index + match[0].length;
				continue;
			}
		} else if (/^[一-龯々〆ヵヶ]+$/.test(inner)) {
			let kanaStart = parenAt;
			while (kanaStart > last && /[ぁ-んァ-ンー]/.test(jp[kanaStart - 1] || "")) kanaStart -= 1;
			const kana = jp.slice(kanaStart, parenAt);
			if (kana) {
				html += wrapPlainWithReadings(jp.slice(last, kanaStart), readings);
				found = true;
				html += `<ruby>${escapeXml(inner)}<rt>${rubyRt(kana)}</rt></ruby>`;
				last = match.index + match[0].length;
				continue;
			}
		}
		html += wrapPlainWithReadings(jp.slice(last, match.index + match[0].length), readings);
		last = match.index + match[0].length;
	}
	html += wrapPlainWithReadings(jp.slice(last), readings);
	if (found || html.includes("<ruby>")) return html;
	if (reading && /^[\u3040-\u30ffー\s・]+$/.test(reading) && jp.length <= 18) {
		const core = jp.replace(/[（(][^）)]*[）)]?/g, "").trim();
		if (core && /[一-龯]/.test(core) && !/[（(]/.test(core)) {
			return `<ruby>${escapeXml(core)}<rt>${rubyRt(reading)}</rt></ruby>`;
		}
	}
	return undefined;
}

const KANA_LETTER = /[\u3041-\u3096\u30a1-\u30f6ー]/;

function insideChineseParen(jp: string, index: number): boolean {
	const before = jp.slice(0, index);
	const lastOpen = Math.max(before.lastIndexOf("（"), before.lastIndexOf("("));
	if (lastOpen < 0) return false;
	const closeJa = jp.indexOf("）", lastOpen + 1);
	const closeEn = jp.indexOf(")", lastOpen + 1);
	const close = [closeJa, closeEn].filter((n) => n >= 0);
	const end = close.length ? Math.min(...close) : jp.length;
	if (index > end) return false;
	const inner = jp.slice(lastOpen + 1, end);
	if (KANA_LETTER.test(inner)) return false;
	if (!/[一-龯]/.test(inner)) return false;
	const prev = before.trimEnd().slice(-1);
	const innerCore = inner.replace(/[\s）)]/g, "");
	if (KANA_LETTER.test(prev) && /^[一-龯々〆ヵヶ]+$/.test(innerCore) && innerCore.length <= 6) return false;
	return true;
}

export function applyKanjiReadings(jp: string, readings: Record<string, string>): string | undefined {
	if (!jp || !/[一-龯]/.test(jp)) return undefined;
	let html = "";
	let used = false;
	for (let i = 0; i < jp.length; ) {
		const ch = jp[i] || "";
		if (insideChineseParen(jp, i)) {
			html += escapeXml(ch);
			i += 1;
			continue;
		}
		let found: { word: string; reading: string } | null = null;
		const max = Math.min(12, jp.length - i);
		for (let len = max; len >= 1; len -= 1) {
			const word = jp.slice(i, i + len);
			if (!/[一-龯]/.test(word)) continue;
			const reading = readings[word];
			if (reading) {
				found = { word, reading };
				break;
			}
		}
		if (found) {
			used = true;
			html += `<ruby>${escapeXml(found.word)}<rt>${rubyRt(found.reading)}</rt></ruby>`;
			i += found.word.length;
		} else {
			html += escapeXml(ch);
			i += 1;
		}
	}
	return used ? html : undefined;
}

export function rubyHasUncoveredKanji(html: string): boolean {
	return /[一-龯]/.test(html.replace(/<ruby>[\s\S]*?<\/ruby>/g, ""));
}

export function shouldKeepReviewRuby(jp: string, html: string): boolean {
	if (!html) return false;
	if (KANA_LETTER.test(jp)) return true;
	return !rubyHasUncoveredKanji(html);
}

const KANA_READING = /^[\u3040-\u30ffー\s]+$/;
const ROMAJI_READING = /^[A-Za-züÜ]+$/;

/** Hide document-annotated pronunciations so the card front is just the word. */
export function reviewSurfaceText(jp: string): string {
	if (!jp) return jp;
	let text = jp;
	text = text.replace(/[（(]([^）)]*)[）)]?/g, (full, inner: string, offset: number) => {
		const reading = inner.trim();
		if (!reading) return full;
		const isKana = KANA_READING.test(reading) && /[\u3040-\u30ff]/.test(reading);
		const prev = text.slice(0, offset).trimEnd().slice(-1);
		const afterKanji = /[一-龯々〆ヵヶ]/.test(prev);
		const isRomaji = afterKanji && ROMAJI_READING.test(reading) && reading.length <= 12;
		if (!isKana && !isRomaji) return full;
		if (offset === 0 && !text.slice(offset + full.length).trim()) return reading.replace(/\s+/g, "");
		return "";
	});
	text = text.replace(/^(.*?[一-龯々〆ヵヶ][^\s]*)\s+([\u3040-\u30ffー]{2,24})$/u, "$1");
	return text.replace(/[^\S\u3000]+/g, " ").replace(/[ \u3000]+([。、！？!?])/g, "$1").trim();
}

export function reviewKanaLine(item: ReviewItem): string | undefined {
	if (item.reading && /^[\u3040-\u30ffー\s・]+$/.test(item.reading)) {
		return toHiragana(item.reading.replace(/[\s・]+/g, ""));
	}
	const html = item.jp_r || buildReviewRuby(item.jp, item.reading);
	if (!html) return undefined;
	const kana = html
		.replace(/<ruby>[^<]*<rt>([^<]*)<\/rt><\/ruby>/g, "$1")
		.replace(/<[^>]+>/g, "")
		.replace(/[（(][^）)]*[）)]?/g, "")
		.trim();
	const surface = item.jp.replace(/[（(][^）)]*[）)]?/g, "").trim();
	if (!kana || kana === surface || !/[\u3040-\u30ff]/.test(kana)) return undefined;
	return kana;
}

function escapeXml(text: string): string {
	return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
