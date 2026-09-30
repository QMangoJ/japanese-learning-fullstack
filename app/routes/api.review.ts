import type { AppLoadContext } from "react-router";

import seed from "../../public/data/lesson-review.json";
import { chooseLessonReviewPayload, isLessonReviewPayload, LESSON_REVIEW_KV_KEY } from "../study/lesson-review";

const headers = {
	"content-type": "application/json; charset=utf-8",
	"cache-control": "public, max-age=600",
};

type Args = { context: AppLoadContext };

export async function loader({ context }: Args) {
	let stored: unknown;
	const raw = await context.cloudflare.env.FAVORITES_KV.get(LESSON_REVIEW_KV_KEY);
	if (raw) {
		try {
			stored = JSON.parse(raw);
		} catch {
			stored = undefined;
		}
	}
	const payload = isLessonReviewPayload(seed) ? chooseLessonReviewPayload(stored, seed) : seed;
	return new Response(JSON.stringify(payload), { headers });
}
