import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { isVocabQueuePayload } from "../../app/auth/study-payloads";
import {
	addExtraBatch,
	addIsoDays,
	applyVocabGrade,
	buildDailyPlan,
	buildExtraBatch,
	cleanVocabQueueData,
	countExtraCandidates,
	deferredDueCount,
	EXTRA_BATCH_SIZE,
	gradeWordState,
	mergeVocabQueueData,
	resetVocabQueueForTests,
	shouldReshowToday,
	todayPlan,
	vocabQueueData,
	type VocabPlan,
	type VocabWord,
} from "../../app/study/vocab-queue";

const TODAY = "2026-11-11";

function word(id: string, tier: number, ord: number): VocabWord {
	return { id, w: id, r: "", zh: "义", tier, src: "测试", ord };
}

describe("vocab queue SRS ladder", () => {
	it("advances a new word through the know ladder 3/7/14/30/60 days", () => {
		let state = gradeWordState(undefined, "know", TODAY, 1);
		expect(state).toMatchObject({ s: 1, due: "2026-11-14" });
		state = gradeWordState(state, "know", "2026-11-14", 2);
		expect(state).toMatchObject({ s: 2, due: "2026-11-21" });
		state = gradeWordState(state, "know", "2026-11-21", 3);
		expect(state).toMatchObject({ s: 3, due: "2026-12-05" });
		state = gradeWordState(state, "know", "2026-12-05", 4);
		expect(state).toMatchObject({ s: 4, due: "2027-01-04" });
		state = gradeWordState(state, "know", "2027-01-04", 5);
		expect(state).toMatchObject({ s: 5, due: "2027-03-05" });
		// Step is capped at 5.
		state = gradeWordState(state, "know", "2027-03-05", 6);
		expect(state).toMatchObject({ s: 5, due: "2027-05-04" });
	});

	it("resets to step 0 and tomorrow on again; fuzzy keeps the step with a shorter interval", () => {
		const mid = { s: 3, due: TODAY, ts: 1 };
		expect(gradeWordState(mid, "again", TODAY, 2)).toMatchObject({ s: 0, due: "2026-11-12" });
		expect(gradeWordState(mid, "fuzzy", TODAY, 2)).toMatchObject({ s: 3, due: "2026-11-18" });
		expect(gradeWordState(undefined, "fuzzy", TODAY, 2)).toMatchObject({ s: 0, due: "2026-11-12" });
		expect(gradeWordState(undefined, "again", TODAY, 2)).toMatchObject({ s: 0, due: "2026-11-12" });
	});

	it("adds days across month boundaries", () => {
		expect(addIsoDays("2026-11-30", 3)).toBe("2026-12-03");
		expect(addIsoDays("2026-12-31", 1)).toBe("2027-01-01");
	});
});

describe("vocab queue daily plan (50, reviews first)", () => {
	const words: VocabWord[] = [
		...Array.from({ length: 30 }, (_, i) => word(`due-${i}`, 3, i + 1)),
		...Array.from({ length: 80 }, (_, i) => word(`new-${i}`, i < 40 ? 1 : 5, i + 1)),
	];
	const states = Object.fromEntries(
		Array.from({ length: 30 }, (_, i) => [`due-${i}`, { s: 1, due: i < 10 ? "2026-11-09" : TODAY, ts: 1 }]),
	);

	it("fills the plan with all 30 due reviews, then new words in priority order up to 50", () => {
		const plan = buildDailyPlan(words, states, TODAY);
		expect(plan.ids).toHaveLength(50);
		expect(plan.review).toBe(30);
		expect(plan.fresh).toBe(20);
		// Most overdue first.
		expect(plan.ids.slice(0, 10)).toEqual(Array.from({ length: 10 }, (_, i) => `due-${i}`));
		// Fresh words fill by tier: the 20 fresh slots are tier-1 words, in source order.
		expect(plan.ids.slice(30)).toEqual(Array.from({ length: 20 }, (_, i) => `new-${i}`));
	});

	it("caps the plan at 50 when more than 50 reviews are due; the rest stay due", () => {
		const manyDue = Object.fromEntries(
			words.slice(0, 30).map((w) => [w.id, { s: 2, due: "2026-11-01", ts: 1 }]),
		);
		const extra = Array.from({ length: 40 }, (_, i) => word(`due2-${i}`, 2, i + 1));
		const allStates = {
			...manyDue,
			...Object.fromEntries(extra.map((w) => [w.id, { s: 1, due: "2026-11-05", ts: 1 }])),
		};
		const plan = buildDailyPlan([...words, ...extra], allStates, TODAY);
		expect(plan.ids).toHaveLength(50);
		expect(plan.review).toBe(50);
		expect(plan.fresh).toBe(0);
		// Oldest due dates come first: all 30 from 11-01, then 20 of the 11-05 batch.
		expect(plan.ids.filter((id) => id.startsWith("due2-"))).toHaveLength(20);
	});

	it("returns fewer than 50 when the queue runs out", () => {
		const plan = buildDailyPlan([word("a", 1, 1), word("b", 1, 2)], {}, TODAY);
		expect(plan.ids).toEqual(["a", "b"]);
		expect(plan.fresh).toBe(2);
	});

	it("does not re-plan words that are studied but not yet due", () => {
		const plan = buildDailyPlan([word("a", 1, 1)], { a: { s: 2, due: "2026-12-01", ts: 1 } }, TODAY);
		expect(plan.ids).toEqual([]);
	});
});

describe("vocab queue data hygiene", () => {
	it("cleans malformed states and plans", () => {
		const cleaned = cleanVocabQueueData({
			v: 1,
			states: {
				good: { s: 2, due: "2026-11-12", ts: 5 },
				badStep: { s: 9, due: "2026-11-12", ts: 5 },
				badDate: { s: 1, due: "12/11/2026", ts: 5 },
				__proto__: { s: 1, due: "2026-11-12", ts: 5 },
			},
			plan: { date: TODAY, ids: ["a", "b"], done: ["a", "nope"], review: 1, fresh: 1 },
		});
		expect(Object.keys(cleaned.states)).toEqual(["good"]);
		expect(cleaned.plan?.done).toEqual(["a"]);
		expect(cleanVocabQueueData(null)).toEqual({ v: 1, states: {}, plan: null });
	});

	it("merges snapshots: newer per-word state wins, same-day plans union their done sets", () => {
		const local = {
			v: 1 as const,
			states: { a: { s: 2, due: "2026-11-20", ts: 100 }, b: { s: 0, due: "2026-11-12", ts: 50 } },
			plan: { date: TODAY, ids: ["a", "b"], done: ["a"], review: 1, fresh: 1 },
		};
		const server = {
			v: 1 as const,
			states: { a: { s: 1, due: "2026-11-15", ts: 90 }, c: { s: 3, due: "2026-12-01", ts: 10 } },
			plan: { date: TODAY, ids: ["a", "b"], done: ["b"], review: 1, fresh: 1 },
		};
		const merged = mergeVocabQueueData(local, server);
		expect(merged.states.a.s).toBe(2);
		expect(merged.states.b.s).toBe(0);
		expect(merged.states.c.s).toBe(3);
		expect(merged.plan?.done.sort()).toEqual(["a", "b"]);
	});
});

describe("built word list (public/data/vocab-queue.json)", () => {
	const payload = JSON.parse(readFileSync("public/data/vocab-queue.json", "utf8")) as {
		quota: number;
		words: VocabWord[];
	};
	const norm = (w: string) =>
		w
			.replace(/\s+/g, " ")
			.trim()
			.split(/[／/]/)[0]
			.trim()
			.replace(/^[〜～・]+/, "")
			.replace(/[（(]な[）)]$/, "");

	it("has unique ids and no cross-source duplicate words", () => {
		const ids = new Set(payload.words.map((w) => w.id));
		expect(ids.size).toBe(payload.words.length);
		const keys = new Set(payload.words.map((w) => norm(w.w)));
		expect(keys.size).toBe(payload.words.length);
	});

	it("keeps every word glossed and tiered 1..5, quota 50", () => {
		expect(payload.quota).toBe(50);
		for (const w of payload.words) {
			expect(w.zh, w.w).toBeTruthy();
			expect(w.tier).toBeGreaterThanOrEqual(1);
			expect(w.tier).toBeLessThanOrEqual(5);
		}
	});

	it("excludes the sources Daniel removed (kanji-exam list, life topics, investing)", () => {
		const labels = new Set(payload.words.flatMap((w) => w.src.split("・")));
		for (const banned of ["汉字自测", "银行・ATM", "银行ATM", "衣服购物", "咖啡店菜单", "口语", "投资理财", "日本投资理财"]) {
			expect(labels.has(banned)).toBe(false);
		}
	});
});

describe("vocab queue same-day re-show (again + fuzzy, once per day)", () => {
	it("decides re-shows: again/fuzzy once, know never, never twice", () => {
		expect(shouldReshowToday("again", false)).toBe(true);
		expect(shouldReshowToday("fuzzy", false)).toBe(true);
		expect(shouldReshowToday("know", false)).toBe(false);
		expect(shouldReshowToday("again", true)).toBe(false);
		expect(shouldReshowToday("fuzzy", true)).toBe(false);
	});

	it("fuzzy first grade is not done yet, records the re-show, and the re-show grade is the day's final result", () => {
		resetVocabQueueForTests();
		const plan = todayPlan([word("a", 1, 1)], TODAY);
		expect(plan.ids).toEqual(["a"]);
		applyVocabGrade("a", "fuzzy", false, TODAY);
		let data = vocabQueueData();
		expect(data.plan?.done).toEqual([]);
		expect(data.plan?.reshown).toEqual(["a"]);
		expect(data.plan?.grades?.a).toBe("fuzzy");
		expect(data.states.a).toMatchObject({ s: 0, due: "2026-11-12" });
		// Re-show graded know: overwrites today's result; done contains the word once.
		applyVocabGrade("a", "know", true, TODAY);
		data = vocabQueueData();
		expect(data.plan?.done).toEqual(["a"]);
		expect(data.plan?.grades?.a).toBe("know");
		expect(data.states.a).toMatchObject({ s: 1, due: "2026-11-14" });
	});

	it("fuzzy re-show graded again resets to step 0; again's own re-show path is unchanged", () => {
		resetVocabQueueForTests();
		todayPlan([word("a", 1, 1), word("b", 1, 2)], TODAY);
		applyVocabGrade("a", "fuzzy", false, TODAY);
		applyVocabGrade("a", "again", true, TODAY);
		expect(vocabQueueData().states.a).toMatchObject({ s: 0, due: "2026-11-12" });
		applyVocabGrade("b", "again", false, TODAY);
		expect(vocabQueueData().plan?.done).toEqual(["a"]);
		expect(vocabQueueData().plan?.reshown).toEqual(["a", "b"]);
		applyVocabGrade("b", "fuzzy", true, TODAY);
		const data = vocabQueueData();
		expect(data.plan?.done).toEqual(["a", "b"]);
		expect(data.plan?.grades?.b).toBe("fuzzy");
		expect(data.states.b).toMatchObject({ s: 0, due: "2026-11-12" });
	});
});

describe("vocab queue retest of today's graded words", () => {
	it("overwrites the day's grade and SRS state without double-counting done", () => {
		resetVocabQueueForTests();
		todayPlan([word("a", 1, 1)], TODAY);
		applyVocabGrade("a", "know", true, TODAY);
		expect(vocabQueueData().states.a).toMatchObject({ s: 1, due: "2026-11-14" });
		// Retest later the same day: the retest grade is the day's final result.
		applyVocabGrade("a", "again", true, TODAY);
		const data = vocabQueueData();
		expect(data.plan?.done).toEqual(["a"]);
		expect(data.plan?.grades?.a).toBe("again");
		expect(data.states.a).toMatchObject({ s: 0, due: "2026-11-12" });
	});
});

describe("vocab queue server-side plan recovery", () => {
	it("restores the server's plan untouched when local has none", () => {
		const serverPlan: VocabPlan = {
			date: TODAY,
			ids: ["a", "b", "c"],
			done: ["a"],
			review: 1,
			fresh: 2,
			grades: { a: "know" },
			reshown: ["b"],
		};
		const merged = mergeVocabQueueData({ v: 1, states: {}, plan: null }, { v: 1, states: {}, plan: serverPlan });
		expect(merged.plan).toEqual(serverPlan);
	});

	it("unions same-day progress from both sides: done, grades and reshown", () => {
		const local = {
			v: 1 as const,
			states: {},
			plan: { date: TODAY, ids: ["a", "b"], done: ["a"], review: 0, fresh: 2, grades: { a: "fuzzy" as const }, reshown: ["a"] },
		};
		const server = {
			v: 1 as const,
			states: {},
			plan: { date: TODAY, ids: ["a", "b"], done: ["b"], review: 0, fresh: 2, grades: { b: "know" as const }, reshown: ["b"] },
		};
		const merged = mergeVocabQueueData(local, server);
		expect(merged.plan?.done.sort()).toEqual(["a", "b"]);
		expect(merged.plan?.grades).toEqual({ a: "fuzzy", b: "know" });
		expect(merged.plan?.reshown?.sort()).toEqual(["a", "b"]);
	});

	it("round-trips grades/reshown through the cleaner and drops junk entries", () => {
		const cleaned = cleanVocabQueueData({
			v: 1,
			states: {},
			plan: {
				date: TODAY,
				ids: ["a", "b"],
				done: ["a"],
				review: 0,
				fresh: 2,
				grades: { a: "know", b: "nope", ghost: "fuzzy" },
				reshown: ["b", "ghost", "b"],
			},
		});
		expect(cleaned.plan?.grades).toEqual({ a: "know" });
		expect(cleaned.plan?.reshown).toEqual(["b"]);
	});
});

describe("vocab queue「再来 20」extra batches", () => {
	const planOf = (ids: string[], extra?: VocabPlan["extra"]): VocabPlan => ({
		date: TODAY,
		ids,
		done: [],
		review: 0,
		fresh: ids.length,
		...(extra ? { extra } : {}),
	});

	it("takes deferred due reviews first (most overdue), then new words in priority order", () => {
		const words = [
			word("in-plan", 1, 1),
			word("due-newer", 3, 2),
			word("due-older", 5, 3),
			word("not-due", 1, 4),
			word("fresh-late", 5, 5),
			word("fresh-early", 1, 6),
		];
		const states = {
			"in-plan": { s: 1, due: TODAY, ts: 1 },
			"due-newer": { s: 1, due: "2026-11-10", ts: 1 },
			"due-older": { s: 2, due: "2026-11-01", ts: 1 },
			"not-due": { s: 2, due: "2026-12-01", ts: 1 },
		};
		const batch = buildExtraBatch(words, states, planOf(["in-plan"]), TODAY);
		// In-plan and not-yet-due words are never candidates.
		expect(batch).toEqual({ ids: ["due-older", "due-newer", "fresh-early", "fresh-late"], review: 2, fresh: 2 });
		expect(EXTRA_BATCH_SIZE).toBe(20);
	});

	it("respects the batch size and never repeats earlier extra batches", () => {
		const words = Array.from({ length: 30 }, (_, i) => word(`w-${i}`, 1, i + 1));
		const states = Object.fromEntries(words.map((w) => [w.id, { s: 1, due: "2026-11-09", ts: 1 }]));
		const plan = planOf([], { ids: ["w-0", "w-1"], done: ["w-0"], review: 2, fresh: 0 });
		const batch = buildExtraBatch(words, states, plan, TODAY, 5);
		expect(batch?.ids).toEqual(["w-2", "w-3", "w-4", "w-5", "w-6"]);
		expect(batch?.review).toBe(5);
		expect(countExtraCandidates(words, states, plan, TODAY).total).toBe(28);
	});

	it("returns null when exhausted, and counts deferred due words exactly", () => {
		const words = [word("a", 1, 1), word("b", 1, 2), word("c", 1, 3), word("d", 1, 4)];
		const states = {
			a: { s: 1, due: TODAY, ts: 1 },
			b: { s: 1, due: "2026-11-05", ts: 1 },
			c: { s: 1, due: TODAY, ts: 1 },
			d: { s: 1, due: "2026-12-01", ts: 1 },
		};
		const plan = planOf(["a"], { ids: ["c"], done: [], review: 1, fresh: 0 });
		// Only b is due and untaken; d is not due yet, nothing is new.
		expect(deferredDueCount(words, states, plan, TODAY)).toBe(1);
		expect(buildExtraBatch(words, states, plan, TODAY)?.ids).toEqual(["b"]);
		expect(buildExtraBatch(words, states, { ...plan, extra: { ids: ["c", "b"], done: [], review: 2, fresh: 0 } }, TODAY)).toBeNull();
		expect(countExtraCandidates(words, states, { ...plan, extra: { ids: ["c", "b"], done: [], review: 2, fresh: 0 } }, TODAY).total).toBe(0);
	});

	it("appends batches to plan.extra without touching the baseline 50-count, and stops at exhaustion", () => {
		resetVocabQueueForTests();
		const words = Array.from({ length: 60 }, (_, i) => word(`w-${i}`, 1, i + 1));
		const plan = todayPlan(words, TODAY);
		expect(plan.ids).toHaveLength(50);
		const first = addExtraBatch(words, TODAY);
		expect(first).toEqual(plan.ids.length ? words.slice(50).map((w) => w.id) : []);
		const data = vocabQueueData();
		// Baseline untouched — the 50/50 口径 is exactly the plan's own fields.
		expect(data.plan?.ids).toEqual(plan.ids);
		expect(data.plan?.done).toEqual([]);
		expect(data.plan?.review).toBe(0);
		expect(data.plan?.fresh).toBe(50);
		expect(data.plan?.extra).toMatchObject({ ids: first, done: [], review: 0, fresh: 10 });
		// Nothing left: repeated clicks add nothing.
		expect(addExtraBatch(words, TODAY)).toEqual([]);
		expect(vocabQueueData().plan?.extra?.ids).toEqual(first);
	});

	it("picks up the due reviews the daily 50 deferred, before any new word", () => {
		resetVocabQueueForTests();
		const dueWords = Array.from({ length: 55 }, (_, i) => word(`due-${i}`, 1, i + 1));
		const freshWords = [word("new-0", 1, 100)];
		// Grade all 55 on 2026-11-01 (know → due 2026-11-04): all overdue today.
		for (const w of dueWords) applyVocabGrade(w.id, "know", true, "2026-11-01");
		const plan = todayPlan([...dueWords, ...freshWords], TODAY);
		expect(plan.review).toBe(50);
		expect(plan.fresh).toBe(0);
		const added = addExtraBatch([...dueWords, ...freshWords], TODAY);
		// The 5 deferred reviews come first; the batch then fills up with new words.
		expect(added).toEqual([...dueWords.map((w) => w.id).filter((id) => !plan.ids.includes(id)), "new-0"]);
		expect(vocabQueueData().plan?.extra).toMatchObject({ review: 5, fresh: 1 });
		// Nothing remains afterwards.
		expect(addExtraBatch([...dueWords, ...freshWords], TODAY)).toEqual([]);
	});

	it("grades extra words with full SRS weight into extra.done; re-show-once applies to extras too", () => {
		resetVocabQueueForTests();
		const words = Array.from({ length: 55 }, (_, i) => word(`w-${i}`, 1, i + 1));
		todayPlan(words, TODAY);
		const added = addExtraBatch(words, TODAY);
		expect(added).toHaveLength(5);
		applyVocabGrade(added[0], "know", true, TODAY);
		let data = vocabQueueData();
		expect(data.plan?.extra?.done).toEqual([added[0]]);
		expect(data.plan?.done).toEqual([]); // baseline count not polluted
		expect(data.states[added[0]]).toMatchObject({ s: 1, due: "2026-11-14" });
		// Fuzzy on an extra word: not done yet, re-show recorded once (plan-global).
		applyVocabGrade(added[1], "fuzzy", false, TODAY);
		data = vocabQueueData();
		expect(data.plan?.extra?.done).toEqual([added[0]]);
		expect(data.plan?.reshown).toEqual([added[1]]);
		expect(shouldReshowToday("fuzzy", (data.plan?.reshown ?? []).includes(added[1]))).toBe(false);
		applyVocabGrade(added[1], "know", true, TODAY);
		data = vocabQueueData();
		expect(data.plan?.extra?.done).toEqual([added[0], added[1]]);
		expect(data.plan?.grades?.[added[1]]).toBe("know");
	});

	it("round-trips extra batches through the cleaner and the server merge (reload restores them)", () => {
		const raw = {
			v: 1,
			states: {},
			plan: {
				date: TODAY,
				ids: ["a"],
				done: ["a"],
				review: 0,
				fresh: 1,
				grades: { a: "know", x: "fuzzy" },
				reshown: ["x"],
				extra: { ids: ["x", "y"], done: ["x"], review: 1, fresh: 1 },
			},
		};
		const cleaned = cleanVocabQueueData(JSON.parse(JSON.stringify(raw)));
		expect(cleaned.plan?.extra).toEqual({ ids: ["x", "y"], done: ["x"], review: 1, fresh: 1 });
		// Grades/reshown for extra ids survive cleaning.
		expect(cleaned.plan?.grades).toEqual({ a: "know", x: "fuzzy" });
		expect(cleaned.plan?.reshown).toEqual(["x"]);
		// A fresh client pulling this snapshot restores the plan — extras included — untouched.
		const restored = mergeVocabQueueData({ v: 1, states: {}, plan: null }, cleaned);
		expect(restored.plan).toEqual(cleaned.plan);
	});

	it("drops junk extra blocks and extra ids that collide with the baseline", () => {
		const cleaned = cleanVocabQueueData({
			v: 1,
			states: {},
			plan: { date: TODAY, ids: ["a"], done: [], review: 0, fresh: 1, extra: { ids: ["a", "x"], done: ["a"], review: 0, fresh: 2 } },
		});
		expect(cleaned.plan?.extra).toEqual({ ids: ["x"], done: [], review: 0, fresh: 2 });
		const broken = cleanVocabQueueData({
			v: 1,
			states: {},
			plan: { date: TODAY, ids: ["a"], done: [], review: 0, fresh: 1, extra: { ids: ["x"], done: [] } },
		});
		expect(broken.plan?.extra).toBeUndefined();
		expect(broken.plan?.ids).toEqual(["a"]);
	});

	it("merges same-day extra blocks: one-sided extras survive, two-sided keep the longer block and union done", () => {
		const base = { date: TODAY, ids: ["a"], done: [] as string[], review: 0, fresh: 1 };
		const withExtra = { ...base, extra: { ids: ["x", "y"], done: ["x"], review: 1, fresh: 1 } };
		const oneSided = mergeVocabQueueData(
			{ v: 1, states: {}, plan: { ...base } },
			{ v: 1, states: {}, plan: { ...withExtra } },
		);
		expect(oneSided.plan?.extra).toEqual({ ids: ["x", "y"], done: ["x"], review: 1, fresh: 1 });
		const twoSided = mergeVocabQueueData(
			{ v: 1, states: {}, plan: { ...base, extra: { ids: ["x", "y"], done: ["x"], review: 1, fresh: 1 } } },
			{ v: 1, states: {}, plan: { ...base, extra: { ids: ["x", "y"], done: ["y"], review: 1, fresh: 1 } } },
		);
		expect(twoSided.plan?.extra?.ids).toEqual(["x", "y"]);
		expect(twoSided.plan?.extra?.done.sort()).toEqual(["x", "y"]);
	});

	it("validates payloads carrying extra batches", () => {
		const ok = {
			v: 1,
			states: {},
			plan: { date: TODAY, ids: ["a"], done: [], review: 0, fresh: 1, extra: { ids: ["x"], done: ["x"], review: 1, fresh: 0 } },
		};
		expect(isVocabQueuePayload(ok)).toBe(true);
		expect(
			isVocabQueuePayload({ ...ok, plan: { ...ok.plan, extra: { ids: ["x"], done: ["ghost"], review: 1, fresh: 0 } } }),
		).toBe(false);
		expect(isVocabQueuePayload({ ...ok, plan: { ...ok.plan, extra: { ids: ["x"], done: [], review: -1, fresh: 0 } } })).toBe(false);
		expect(isVocabQueuePayload({ ...ok, plan: { ...ok.plan, extra: "nope" } })).toBe(false);
	});
});

describe("vocab queue payload validator", () => {
	it("accepts a well-formed payload and rejects junk", () => {
		expect(
			isVocabQueuePayload({
				v: 1,
				states: { "w:abc": { s: 0, due: "2026-11-12", ts: 1 } },
				plan: { date: TODAY, ids: ["w:abc"], done: [], review: 0, fresh: 1 },
			}),
		).toBe(true);
		expect(isVocabQueuePayload({ v: 2, states: {}, plan: null })).toBe(false);
		expect(isVocabQueuePayload({ v: 1, states: { "w:abc": { s: 7, due: "2026-11-12", ts: 1 } }, plan: null })).toBe(false);
		expect(isVocabQueuePayload({ v: 1, states: {}, plan: { date: TODAY, ids: ["a"], done: ["b"], review: 0, fresh: 1 } })).toBe(false);
		expect(isVocabQueuePayload("nope")).toBe(false);
	});
});
