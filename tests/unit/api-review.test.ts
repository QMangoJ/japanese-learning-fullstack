import { describe, expect, it } from "vitest";

import { loader } from "../../app/routes/api.review";
import seed from "../../public/data/lesson-review.json";
import { LESSON_REVIEW_KV_KEY } from "../../app/study/lesson-review";
import { memoryKv, routeContext, testEnv } from "./auth-test-utils";

describe("/api/review", () => {
	it("falls back to the seeded snapshot when KV is empty", async () => {
		const res = await loader({ context: routeContext(testEnv(memoryKv())) });
		expect(res.status).toBe(200);
		const body = await res.json();
		expect(body.days.length).toBe(seed.days.length);
		expect(body.days[0].items.length).toBeGreaterThan(0);
		expect(new Set(body.days.map((day: { source?: string }) => day.source))).toEqual(
			new Set(["Danielさん", "Preply すみれ先生"]),
		);
		expect(body.days.filter((day: { date?: string }) => day.date === "2026-09-02")).toHaveLength(2);
	});

	it("prefers the weekly KV snapshot when it is valid", async () => {
		const kv = memoryKv({
			[LESSON_REVIEW_KV_KEY]: JSON.stringify({
				source: "kv",
				fetchedAt: "2026-09-14T00:00:00.000Z",
				days: [{ id: "2026-09-14", date: "2026-09-14", title: "2026-09-14", items: [{ jp: "新しい", kind: "word" }] }],
			}),
		});
		const res = await loader({ context: routeContext(testEnv(kv)) });
		const body = await res.json();
		expect(body.source).toBe("kv");
		expect(body.days[0].items[0].jp).toBe("新しい");
	});
});
