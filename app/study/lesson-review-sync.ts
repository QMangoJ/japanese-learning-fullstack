import seedJson from "../../public/data/lesson-review.json";
import {
	isLessonReviewPayload,
	LESSON_REVIEW_DOCS,
	LESSON_REVIEW_DOC_ID,
	LESSON_REVIEW_KV_KEY,
	LESSON_REVIEW_SOURCE,
	type LessonReviewPayload,
	type ReviewDay,
} from "./lesson-review";
import { buildLessonReviewPayloadFromDocs, mergeLessonReviewDays } from "./lesson-review-parse";

type ReviewEnv = {
	FAVORITES_KV: KVNamespace;
	LESSON_REVIEW_DOC_ID?: string;
};

export type LessonReviewSyncResult = {
	ok: boolean;
	days: number;
	items: number;
	fetchedAt: string;
	error?: string;
};

export async function fetchGoogleDocText(docId: string, fetcher: typeof fetch = fetch): Promise<string> {
	const url = `https://docs.google.com/document/d/${encodeURIComponent(docId)}/export?format=txt`;
	const response = await fetcher(url, {
		headers: {
			"user-agent": "Mozilla/5.0 (compatible; nihongo-lesson-review/1.0)",
			accept: "text/plain,text/html;q=0.9,*/*;q=0.8",
		},
		redirect: "follow",
	});
	if (!response.ok) throw new Error(`google doc export ${response.status}`);
	const text = await response.text();
	const head = text.slice(0, 400).toLowerCase();
	if (head.includes("<html") && (head.includes("sign in") || head.includes("accounts.google") || head.includes("servicelogin"))) {
		throw new Error("google doc export requires login");
	}
	if (!text.trim()) throw new Error("google doc export was empty");
	return text;
}

const PREPLY_SOURCE = "Preply すみれ先生";

/**
 * Keep saved cards. Append only new Japanese lines, and never rewrite an existing Preply day.
 * Days in `curated` (the hand-written seed shipped with the build) are left exactly as they are.
 */
export function mergeFreshLessonDays(
	baseline: ReviewDay[],
	fresh: ReviewDay[],
	curated: ReadonlySet<string> = new Set(),
): ReviewDay[] {
	const byId = new Map<string, ReviewDay>();
	for (const day of baseline) byId.set(day.id, day);
	for (const day of fresh) {
		const prev = byId.get(day.id);
		if (!prev) {
			byId.set(day.id, day);
			continue;
		}
		if (curated.has(day.id)) continue;
		if (day.source === PREPLY_SOURCE || day.id.endsWith(":preply")) continue;
		const known = new Set(prev.items.map((item) => item.jp));
		const extra = day.items.filter((item) => item.jp && !known.has(item.jp));
		if (!extra.length) continue;
		byId.set(day.id, { ...prev, items: [...prev.items, ...extra] });
	}
	return mergeLessonReviewDays([[...byId.values()]]);
}

const SEED: LessonReviewPayload | null = isLessonReviewPayload(seedJson) ? seedJson : null;
const CURATED_IDS: ReadonlySet<string> = new Set(SEED?.days.map((day) => day.id) || []);

/** Hand-written seed days win over whatever an earlier sync stored; KV only adds days the seed lacks. */
function reviewBaseline(stored: unknown): ReviewDay[] {
	const kv = isLessonReviewPayload(stored) ? stored : null;
	const seedDays = SEED?.days || [];
	return [...seedDays, ...(kv?.days || []).filter((day) => !CURATED_IDS.has(day.id))];
}

async function readStoredPayload(env: ReviewEnv): Promise<unknown> {
	const raw = await env.FAVORITES_KV.get(LESSON_REVIEW_KV_KEY);
	if (!raw) return null;
	try {
		return JSON.parse(raw) as unknown;
	} catch {
		return null;
	}
}

function syncResult(payload: LessonReviewPayload): LessonReviewSyncResult {
	const items = payload.days.reduce((sum, day) => sum + day.items.length, 0);
	return { ok: true, days: payload.days.length, items, fetchedAt: payload.fetchedAt };
}

export async function syncLessonReview(env: ReviewEnv, fetcher: typeof fetch = fetch): Promise<LessonReviewSyncResult> {
	const fetchedAt = new Date().toISOString();
	const docs = LESSON_REVIEW_DOCS.map((doc, index) => ({
		...doc,
		id: index === 0 ? env.LESSON_REVIEW_DOC_ID || LESSON_REVIEW_DOC_ID : doc.id,
	}));
	const settled = await Promise.allSettled(
		docs.map(async (doc) => ({
			...doc,
			markdown: await fetchGoogleDocText(doc.id, fetcher),
		})),
	);
	const fetched = settled.flatMap((result) => (result.status === "fulfilled" ? [result.value] : []));
	const errors = settled.flatMap((result) =>
		result.status === "rejected" ? [result.reason instanceof Error ? result.reason.message : String(result.reason)] : [],
	);
	if (!fetched.length) {
		return { ok: false, days: 0, items: 0, fetchedAt, error: errors[0] || "google doc export failed" };
	}
	try {
		const fresh = buildLessonReviewPayloadFromDocs(fetched, { fetchedAt });
		const freshItems = fresh.days.reduce((sum, day) => sum + day.items.length, 0);
		if (!fresh.days.length || freshItems === 0) throw new Error("parsed zero review items");
		const days = mergeFreshLessonDays(reviewBaseline(await readStoredPayload(env)), fresh.days, CURATED_IDS);
		const payload: LessonReviewPayload = {
			source: LESSON_REVIEW_SOURCE,
			fetchedAt,
			days,
		};
		const items = days.reduce((sum, day) => sum + day.items.length, 0);
		if (!days.length || items === 0) throw new Error("parsed zero review items");
		await env.FAVORITES_KV.put(LESSON_REVIEW_KV_KEY, JSON.stringify(payload));
		return syncResult(payload);
	} catch (error) {
		return {
			ok: false,
			days: 0,
			items: 0,
			fetchedAt,
			error: error instanceof Error ? error.message : String(error),
		};
	}
}
