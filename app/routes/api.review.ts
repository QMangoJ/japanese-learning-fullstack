import type { AppLoadContext } from "react-router";

import seed from "../../public/data/lesson-review.json";
import { isLessonReviewPayload, LESSON_REVIEW_KV_KEY } from "../study/lesson-review";

const headers = {
	"content-type": "application/json; charset=utf-8",
	"cache-control": "public, max-age=600",
};

type Args = { context: AppLoadContext };

export async function loader({ context }: Args) {
	const raw = await context.cloudflare.env.FAVORITES_KV.get(LESSON_REVIEW_KV_KEY);
	if (raw) {
		try {
			const parsed: unknown = JSON.parse(raw);
			if (isLessonReviewPayload(parsed)) {
				return new Response(JSON.stringify(parsed), { headers });
			}
		} catch {
			/* fall through to the seeded snapshot */
		}
	}
	return new Response(JSON.stringify(seed), { headers });
}
