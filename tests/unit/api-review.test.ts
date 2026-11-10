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

	it("keeps a newer auto-synced day and fills Chinese, English, and the example from the built snapshot", async () => {
		const kv = memoryKv({
			[LESSON_REVIEW_KV_KEY]: JSON.stringify({
				source: "kv",
				fetchedAt: "2026-12-01T00:00:00.000Z",
				days: [
					{
						id: "2026-11-02",
						date: "2026-11-02",
						title: "2026-11-02",
						source: "Danielさん",
						items: [{ jp: "げつ・すい・きん・にち", kind: "word" }],
					},
					{ id: "2026-09-14", date: "2026-09-14", title: "2026-09-14", items: [{ jp: "新しい", kind: "word" }] },
				],
			}),
		});
		const res = await loader({ context: routeContext(testEnv(kv)) });
		const body = await res.json();
		expect(body.source).toBe("kv");
		const november = body.days.find((day: { id: string }) => day.id === "2026-11-02");
		const weekdays = november.items.find((item: { jp: string }) => item.jp === "げつ・すい・きん・にち");
		expect(weekdays.cn).toContain("星期一");
		expect(weekdays.en).toContain("Mon, Wed, Fri");
		expect(weekdays.example).toContain("月・水・金・日");
		expect(november.items).toHaveLength(seed.days.find((day) => day.id === "2026-11-02")?.items.length);
		expect(body.days.find((day: { id: string }) => day.id === "2026-09-14").items[0].jp).toBe("新しい");
		expect(body.days.some((day: { id: string }) => day.id === "2026-11-20")).toBe(true);
	});
});
