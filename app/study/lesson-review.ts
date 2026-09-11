export type ReviewKind = "word" | "sentence";

export type ReviewItem = {
	jp: string;
	reading?: string;
	cn?: string;
	en?: string;
	kind: ReviewKind;
};

export type ReviewDay = {
	id: string;
	date?: string;
	title: string;
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
	return day.items.every(isReviewItem);
}

function isReviewItem(value: unknown): value is ReviewItem {
	if (!value || typeof value !== "object") return false;
	const item = value as ReviewItem;
	if (typeof item.jp !== "string" || !item.jp.trim()) return false;
	if (item.kind !== "word" && item.kind !== "sentence") return false;
	if (item.reading != null && typeof item.reading !== "string") return false;
	if (item.cn != null && typeof item.cn !== "string") return false;
	if (item.en != null && typeof item.en !== "string") return false;
	return true;
}
