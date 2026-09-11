import { LESSON_REVIEW_DOC_ID, LESSON_REVIEW_KV_KEY, LESSON_REVIEW_SOURCE } from "./lesson-review";
import { buildLessonReviewPayload } from "./lesson-review-parse";

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

export async function syncLessonReview(env: ReviewEnv, fetcher: typeof fetch = fetch): Promise<LessonReviewSyncResult> {
	const fetchedAt = new Date().toISOString();
	const docId = env.LESSON_REVIEW_DOC_ID || LESSON_REVIEW_DOC_ID;
	try {
		const markdown = await fetchGoogleDocText(docId, fetcher);
		const payload = buildLessonReviewPayload(markdown, {
			source: LESSON_REVIEW_SOURCE,
			fetchedAt,
		});
		const items = payload.days.reduce((sum, day) => sum + day.items.length, 0);
		if (!payload.days.length || items === 0) throw new Error("parsed zero review items");
		await env.FAVORITES_KV.put(LESSON_REVIEW_KV_KEY, JSON.stringify(payload));
		return { ok: true, days: payload.days.length, items, fetchedAt };
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
