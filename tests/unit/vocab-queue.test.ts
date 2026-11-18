import { readFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { isVocabQueuePayload } from "../../app/auth/study-payloads";
import { resetSyncPolicyForTests } from "../../app/study/kv-sync-policy";
import { isQueueSentenceType, isRubySubset, kanaSequence, rubyReading, stripRuby } from "../../app/study/topic-vocab";
import {
	addExtraBatch,
	addIsoDays,
	applyVocabAliases,
	applyVocabGrade,
	buildDailyPlan,
	buildExtraBatch,
	cleanVocabQueueData,
	countExtraCandidates,
	EXTRA_BATCH_SIZE,
	gradeWordState,
	hydrateVocabQueue,
	mergeVocabQueueData,
	PLAN_PV,
	planBatchProgress,
	pullVocabQueueFromServer,
	pushVocabQueueNow,
	reconcilePlanWithWordList,
	resetVocabQueueForTests,
	revertVocabGrade,
	shouldReshowToday,
	snapshotVocabGrade,
	todayPlan,
	upgradeSameDayPlan,
	VOCAB_QUEUE_STORAGE_KEY,
	vocabQueueCanMint,
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

describe("vocab queue daily plan (reviews all + 50 new)", () => {
	const words: VocabWord[] = [
		...Array.from({ length: 30 }, (_, i) => word(`due-${i}`, 3, i + 1)),
		...Array.from({ length: 80 }, (_, i) => word(`new-${i}`, i < 40 ? 1 : 5, i + 1)),
	];
	const states = Object.fromEntries(
		Array.from({ length: 30 }, (_, i) => [`due-${i}`, { s: 1, due: i < 10 ? "2026-11-09" : TODAY, ts: 1 }]),
	);

	it("serves ALL 30 due reviews, then 50 new words in priority order — two separate batches", () => {
		const plan = buildDailyPlan(words, states, TODAY);
		expect(plan.pv).toBe(PLAN_PV);
		expect(plan.review).toBe(30);
		expect(plan.fresh).toBe(50);
		expect(plan.ids).toHaveLength(80);
		// Review batch first, most overdue first.
		expect(plan.ids.slice(0, 10)).toEqual(Array.from({ length: 10 }, (_, i) => `due-${i}`));
		expect(plan.ids.slice(0, 30).every((id) => id.startsWith("due-"))).toBe(true);
		// New-word batch: 50 by tier — the 40 tier-1 words, then 10 tier-5, in source order.
		expect(plan.ids.slice(30)).toEqual(Array.from({ length: 50 }, (_, i) => `new-${i}`));
	});

	it("never caps the review batch: 70 due reviews are all served, new words still get their own 50", () => {
		const manyDue = Object.fromEntries(
			words.slice(0, 30).map((w) => [w.id, { s: 2, due: "2026-11-01", ts: 1 }]),
		);
		const extra = Array.from({ length: 40 }, (_, i) => word(`due2-${i}`, 2, i + 1));
		const allStates = {
			...manyDue,
			...Object.fromEntries(extra.map((w) => [w.id, { s: 1, due: "2026-11-05", ts: 1 }])),
		};
		const plan = buildDailyPlan([...words, ...extra], allStates, TODAY);
		expect(plan.review).toBe(70);
		expect(plan.fresh).toBe(50);
		expect(plan.ids).toHaveLength(120);
		// Oldest due dates first within the review batch: all 30 from 11-01, then the 11-05 batch.
		expect(plan.ids.slice(0, 30).every((id) => id.startsWith("due-"))).toBe(true);
		expect(plan.ids.slice(30, 70).every((id) => id.startsWith("due2-"))).toBe(true);
	});

	it("counts the two batches independently of each other", () => {
		const plan: VocabPlan = {
			pv: PLAN_PV,
			date: TODAY,
			ids: ["r-0", "r-1", "r-2", "f-0", "f-1"],
			done: ["r-0", "r-2", "f-1"],
			review: 3,
			fresh: 2,
		};
		expect(planBatchProgress(plan)).toEqual({ reviewDone: 2, reviewTotal: 3, freshDone: 1, freshTotal: 2 });
	});

	it("returns fewer than 50 new words when the queue runs out", () => {
		const plan = buildDailyPlan([word("a", 1, 1), word("b", 1, 2)], {}, TODAY);
		expect(plan.ids).toEqual(["a", "b"]);
		expect(plan.fresh).toBe(2);
	});

	it("does not re-plan words that are studied but not yet due", () => {
		const plan = buildDailyPlan([word("a", 1, 1)], { a: { s: 2, due: "2026-12-01", ts: 1 } }, TODAY);
		expect(plan.ids).toEqual([]);
	});
});

describe("vocab queue plan-regime migration (old shared-50 → reviews all + 50 new)", () => {
	// 30 words due today; the old regime's plan took 8 of them plus 42 new
	// words into a shared 50. Two reviews and three new words are already
	// graded (their states moved to 2026-11-14); one new word awaits re-show.
	const words: VocabWord[] = [
		...Array.from({ length: 30 }, (_, i) => word(`d-${i}`, 3, i + 1)),
		...Array.from({ length: 80 }, (_, i) => word(`f-${i}`, 1, i + 1)),
	];
	const states: Record<string, { s: number; due: string; ts: number }> = {
		...Object.fromEntries(Array.from({ length: 30 }, (_, i) => [`d-${i}`, { s: 1, due: "2026-11-09", ts: 1 }])),
		"d-0": { s: 1, due: "2026-11-14", ts: 100 },
		"d-1": { s: 1, due: "2026-11-14", ts: 100 },
		"f-0": { s: 1, due: "2026-11-14", ts: 100 },
		"f-1": { s: 1, due: "2026-11-14", ts: 100 },
		"f-2": { s: 1, due: "2026-11-14", ts: 100 },
		"f-3": { s: 0, due: "2026-11-12", ts: 100 },
	};
	const oldPlan: VocabPlan = {
		date: TODAY,
		ids: [
			...Array.from({ length: 8 }, (_, i) => `d-${i}`),
			...Array.from({ length: 42 }, (_, i) => `f-${i}`),
		],
		done: ["d-0", "d-1", "f-0", "f-1", "f-2"],
		review: 8,
		fresh: 42,
		grades: { "d-0": "know", "d-1": "know", "f-0": "know", "f-1": "know", "f-2": "know", "f-3": "fuzzy" },
		reshown: ["f-3"],
	};

	it("rebuilds the review batch to ALL due words and the new-word batch to a full 50, keeping today's progress", () => {
		const plan = upgradeSameDayPlan(words, states, oldPlan, TODAY);
		expect(plan.pv).toBe(PLAN_PV);
		expect(plan.date).toBe(TODAY);
		// Review batch: the 28 still-due words plus the 2 already graded today.
		expect(plan.review).toBe(30);
		expect(new Set(plan.ids.slice(0, 30))).toEqual(new Set(Array.from({ length: 30 }, (_, i) => `d-${i}`)));
		// New-word batch: the old 42 kept whole, topped up with the next 8.
		expect(plan.fresh).toBe(50);
		expect(plan.ids.slice(30)).toEqual(Array.from({ length: 50 }, (_, i) => `f-${i}`));
		expect(plan.ids).toHaveLength(80);
		// Nothing graded today is re-served or lost: done/grades/reshown carry.
		expect(plan.done).toEqual(["d-0", "d-1", "f-0", "f-1", "f-2"]);
		expect(plan.grades).toEqual(oldPlan.grades);
		expect(plan.reshown).toEqual(["f-3"]);
		// Per-batch progress carries: 2 reviews done, 3 new words done.
		expect(planBatchProgress(plan)).toEqual({ reviewDone: 2, reviewTotal: 30, freshDone: 3, freshTotal: 50 });
	});

	it("is a no-op for plans already on the current regime or for another day", () => {
		const current: VocabPlan = { pv: PLAN_PV, date: TODAY, ids: ["a"], done: [], review: 0, fresh: 1 };
		expect(upgradeSameDayPlan(words, states, current, TODAY)).toBe(current);
		const yesterday: VocabPlan = { date: "2026-11-10", ids: ["a"], done: [], review: 0, fresh: 1 };
		expect(upgradeSameDayPlan(words, states, yesterday, TODAY)).toBe(yesterday);
	});

	it("round-trips the regime marker through the cleaner and accepts it in payload validation", () => {
		const cleaned = cleanVocabQueueData({
			v: 1,
			states: {},
			plan: { pv: PLAN_PV, date: TODAY, ids: ["a"], done: [], review: 0, fresh: 1 },
		});
		expect(cleaned.plan?.pv).toBe(PLAN_PV);
		const legacy = cleanVocabQueueData({
			v: 1,
			states: {},
			plan: { date: TODAY, ids: ["a"], done: [], review: 0, fresh: 1 },
		});
		expect(legacy.plan?.pv).toBeUndefined();
		const base = { v: 1, states: {}, plan: { date: TODAY, ids: ["a"], done: [], review: 0, fresh: 1 } };
		expect(isVocabQueuePayload({ ...base, plan: { ...base.plan, pv: 2 } })).toBe(true);
		expect(isVocabQueuePayload(base)).toBe(true);
		expect(isVocabQueuePayload({ ...base, plan: { ...base.plan, pv: 1 } })).toBe(false);
		expect(isVocabQueuePayload({ ...base, plan: { ...base.plan, pv: 3 } })).toBe(false);
	});

	it("propagates the marker through the same-day merge from the server plan", () => {
		const local = {
			v: 1 as const,
			states: {},
			plan: { date: TODAY, ids: ["a", "b"], done: ["a"], review: 1, fresh: 1, grades: { a: "know" as const } },
		};
		const server = {
			v: 1 as const,
			states: {},
			plan: { pv: PLAN_PV, date: TODAY, ids: ["a", "b", "c"], done: ["b"], review: 1, fresh: 2 },
		};
		const merged = mergeVocabQueueData(local, server);
		expect(merged.plan?.pv).toBe(PLAN_PV);
		expect(merged.plan?.ids).toEqual(["a", "b", "c"]);
		expect(merged.plan?.done.sort()).toEqual(["a", "b"]);
		// And the reverse: an old-regime server plan stays unmarked after the
		// merge, so todayPlan migrates it (with the unioned progress) on sight.
		const reverse = mergeVocabQueueData(
			{ v: 1, states: {}, plan: { pv: PLAN_PV, date: TODAY, ids: ["a"], done: ["a"], review: 0, fresh: 1 } },
			{ v: 1, states: {}, plan: { date: TODAY, ids: ["a"], done: [] as string[], review: 0, fresh: 1 } },
		);
		expect(reverse.plan?.pv).toBeUndefined();
		expect(reverse.plan?.done).toEqual(["a"]);
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
		aliases?: Record<string, string>;
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

	it("has no notation twins: a kana-spelled entry never duplicates a kanji entry with the same reading", () => {
		const kataToHira = (s: string) => s.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
		const isKana = (s: string) => s.length > 0 && [...s].every((c) => {
			const code = c.codePointAt(0) ?? 0;
			return (code >= 0x3040 && code <= 0x30ff) || c === "・";
		});
		// Pairs that must stay separate: ambiguous headwords （なおす = 直す/治す）,
		// a known bad reading in the source docs （ドレス r=ね）, different words
		// as taught （のる vs 乗る=乘坐； あいます [事故に〜] = 遭う vs 合います
		// "to fit"; やかん "kettle" vs 夜間 "nighttime"), different forms
		// （やめた vs やめちゃった）,
		// and single-kanji study cards read ソウ vs the kana word そう.
		// つけます [醤油を] "dip" (Minna L34, taught in kana) vs 付けます
		// [丸を] "mark" are different senses as taught, like なおす.
		// とります "rob, steal" (taught in kana) vs 取ります [休みを] "take
		// (leave)" vs 撮ります "film" — three senses of とる as taught.
		// つきます [嘘を〜] "tell (a lie)" vs 付きます "be attached" and
		// おります (いる's humble) vs 折ります "fold" are different verbs.
		// へん and しろ are ambiguous headwords （変/辺, 白/城 share a reading).
		// たまに: the lesson-review source data mis-reads 雪合戦/チャーハン
		// as たまに (their jp_r carries たまに — a table misalignment in the
		// Preply doc data, pre-existing); たまに itself has no kanji twin.
		const allowed = new Set(["なおす", "ね", "のる", "やめた", "そう", "あいます", "やかん", "つけます", "とります", "つきます", "おります", "へん", "しろ", "たまに"]);
		const byReading = new Map<string, VocabWord[]>();
		for (const w of payload.words) {
			if (!w.r) continue;
			const key = kataToHira(w.r);
			byReading.set(key, [...(byReading.get(key) ?? []), w]);
		}
		for (const w of payload.words) {
			if (!isKana(w.w) || w.w.length < 2 || allowed.has(w.w)) continue;
			for (const other of byReading.get(kataToHira(w.w)) ?? []) {
				expect(other.w, `${w.w} duplicates ${other.w}`).toBe(w.w);
			}
		}
	});

	it("aliases every dropped id at a surviving word and never aliases a live word", () => {
		const ids = new Set(payload.words.map((w) => w.id));
		for (const [from, to] of Object.entries(payload.aliases ?? {})) {
			expect(ids.has(from), `alias source ${from} is still a live word`).toBe(false);
			expect(ids.has(to), `alias target ${to} is not a live word`).toBe(true);
		}
	});

	it("keeps every word glossed and tiered 1..5, quota 50", () => {
		expect(payload.quota).toBe(50);
		for (const w of payload.words) {
			expect(w.zh, w.w).toBeTruthy();
			expect(w.tier).toBeGreaterThanOrEqual(1);
			expect(w.tier).toBeLessThanOrEqual(5);
		}
	});

	it("excludes the sources Daniel removed (kanji-exam list, life topics, investing, minna/fitness/ki topics)", () => {
		const labels = new Set(payload.words.flatMap((w) => w.src.split("・")));
		for (const banned of ["汉字自测", "银行・ATM", "银行ATM", "衣服购物", "咖啡店菜单", "口语", "投资理财", "日本投资理财", "みんなの日本語专题", "健身专题", "「気」专题"]) {
			expect(labels.has(banned)).toBe(false);
		}
	});

	it("carries verified example ruby (exRuby) whose segments rebuild the example exactly", () => {
		const meta = (payload as { exRuby?: { exTotal: number; withKanji: number; covered: number; noKanji: number; missing: number } }).exRuby;
		expect(meta).toBeTruthy();
		const withEx = payload.words.filter((w) => w.ex);
		const covered = payload.words.filter((w) => w.exRuby);
		expect(meta!.exTotal).toBe(withEx.length);
		expect(meta!.covered).toBe(covered.length);
		expect(meta!.covered + meta!.missing).toBe(meta!.withKanji);
		expect(meta!.withKanji + meta!.noKanji).toBe(meta!.exTotal);
		const kanji = /[㐀-鿿々]/;
		for (const w of covered) {
			expect(w.exRuby!.map((s) => s.seg).join(""), w.w).toBe(w.ex);
			for (const s of w.exRuby!) {
				if (s.ruby) {
					// ruby markup stripped of readings must reproduce the segment
					expect(s.ruby.replace(/<ruby>(.*?)<rt>.*?<\/rt><\/ruby>/g, "$1"), w.w).toBe(s.seg);
				} else {
					expect(kanji.test(s.seg), `${w.w}: ${s.seg}`).toBe(false);
				}
			}
		}
		// Spot coverage across the three derivation sources: authored example
		// breakdowns, topic cards (interview topic), lesson-review markup
		// (classroom) and N2-kanji example words.
		for (const label of ["面试专题", "课堂复习", "N2汉字", "前端专题"]) {
			const hit = payload.words.find((w) => w.src.split("・")[0] === label && w.exRuby);
			expect(hit, label).toBeTruthy();
		}
	});
});

describe("vocab queue dedup guards", () => {
	const kanaTwin: VocabWord = { id: "kana", w: "わすれる", r: "わすれる", zh: "忘记", tier: 3, src: "课堂复习", ord: 1 };
	const kanjiTwin: VocabWord = { id: "kanji", w: "忘れる", r: "わすれる", zh: "忘记", tier: 3, src: "课堂复习・Preply", ord: 2 };

	it("never serves both spellings of a notation twin in one day's plan", () => {
		// kana twin is a due review, kanji twin is fresh — only one may be served.
		const states = { kana: { s: 1, due: "2026-11-10", ts: 1 } };
		const plan = buildDailyPlan([kanaTwin, kanjiTwin], states, TODAY);
		expect(plan.ids).toEqual(["kana"]);
		// and the other way round: kanji due, kana fresh.
		const states2 = { kanji: { s: 1, due: "2026-11-10", ts: 1 } };
		const plan2 = buildDailyPlan([kanaTwin, kanjiTwin], states2, TODAY);
		expect(plan2.ids).toEqual(["kanji"]);
	});

	it("does not block homophones: two kanji words sharing a reading can both be served", () => {
		const naosu1: VocabWord = { id: "naosu1", w: "直す", r: "なおす", zh: "修理", tier: 3, src: "课堂复习", ord: 1 };
		const naosu2: VocabWord = { id: "naosu2", w: "治す", r: "なおす", zh: "治好", tier: 3, src: "课堂复习", ord: 2 };
		const plan = buildDailyPlan([naosu1, naosu2], {}, TODAY);
		expect(plan.ids.sort()).toEqual(["naosu1", "naosu2"]);
	});

	it("an extra batch never adds the other spelling of a word already in today's plan", () => {
		const plan: VocabPlan = { date: TODAY, ids: ["kanji"], done: [], review: 0, fresh: 1 };
		expect(buildExtraBatch([kanaTwin, kanjiTwin], {}, plan)).toBeNull();
		expect(countExtraCandidates([kanaTwin, kanjiTwin], {}, plan).total).toBe(0);
	});

	it("cleans a stored plan with duplicate ids down to one serving per id", () => {
		const cleaned = cleanVocabQueueData({
			v: 1,
			states: {},
			plan: { date: TODAY, ids: ["a", "a", "b"], done: ["a", "a"], review: 1, fresh: 1 },
		});
		expect(cleaned.plan?.ids).toEqual(["a", "b"]);
		expect(cleaned.plan?.done).toEqual(["a"]);
	});

	it("folds SRS state from a dropped duplicate id into the survivor, keeping the most advanced progress", () => {
		const data = cleanVocabQueueData({
			v: 1,
			states: {
				kana: { s: 3, due: "2026-11-20", ts: 100 },
				kanji: { s: 1, due: "2026-11-12", ts: 200 },
				other: { s: 0, due: "2026-11-11", ts: 50 },
			},
			plan: { date: TODAY, ids: ["kana", "kanji"], done: ["kana"], review: 1, fresh: 1 },
		});
		const migrated = applyVocabAliases(data, { kana: "kanji" });
		expect(migrated.states.kana).toBeUndefined();
		expect(migrated.states.kanji).toEqual({ s: 3, due: "2026-11-20", ts: 100 });
		expect(migrated.states.other).toEqual({ s: 0, due: "2026-11-11", ts: 50 });
		expect(migrated.plan?.ids).toEqual(["kanji"]);
		expect(migrated.plan?.done).toEqual(["kanji"]);
		// No alias hits → the input is returned untouched.
		expect(applyVocabAliases(data, { ghost: "kanji" })).toBe(data);
	});
});

describe("vocab queue plan reconciliation with the word list (2026-11-18 phantom cards)", () => {
	const words = [word("a", 1, 0), word("b", 1, 1), word("c", 1, 2), word("d", 1, 3), word("e", 1, 4)];

	it("returns the input untouched when every plan id resolves, and for a null plan", () => {
		const data = cleanVocabQueueData({
			v: 1,
			states: {},
			plan: { date: TODAY, ids: ["a", "b"], done: ["a"], review: 1, fresh: 1 },
		});
		expect(reconcilePlanWithWordList(data, words)).toBe(data);
		const noPlan = cleanVocabQueueData({ v: 1, states: {}, plan: null });
		expect(reconcilePlanWithWordList(noPlan, words)).toBe(noPlan);
	});

	it("drops ids the list no longer carries and recomputes the review/fresh split", () => {
		const data = cleanVocabQueueData({
			v: 1,
			states: { ghost1: { s: 1, due: TODAY, ts: 10 }, a: { s: 1, due: TODAY, ts: 11 } },
			plan: {
				pv: PLAN_PV,
				date: TODAY,
				// Review batch = first 3 (a, ghost1, b); fresh batch = ghost2, c.
				ids: ["a", "ghost1", "b", "ghost2", "c"],
				done: ["a"],
				review: 3,
				fresh: 2,
				grades: { a: "know", ghost1: "fuzzy" },
				reshown: ["ghost1", "b"],
				extra: { ids: ["d", "ghost3"], done: ["ghost3"], review: 0, fresh: 2 },
			},
		});
		const next = reconcilePlanWithWordList(data, words);
		expect(next.plan?.ids).toEqual(["a", "b", "c"]);
		expect(next.plan?.review).toBe(2);
		expect(next.plan?.fresh).toBe(1);
		// Today's graded progress on surviving words carries over untouched.
		expect(next.plan?.done).toEqual(["a"]);
		expect(next.plan?.grades).toEqual({ a: "know" });
		expect(next.plan?.reshown).toEqual(["b"]);
		expect(next.plan?.extra).toEqual({ ids: ["d"], done: [], review: 0, fresh: 1 });
		// Batch progress counts only words that exist: 1/2 reviews, 0/1 new.
		expect(planBatchProgress(next.plan!)).toEqual({
			reviewDone: 1,
			reviewTotal: 2,
			freshDone: 0,
			freshTotal: 1,
		});
		// SRS states are NOT touched — a removed word's record survives.
		expect(next.states.ghost1).toEqual({ s: 1, due: TODAY, ts: 10 });
		expect(next).not.toBe(data);
	});

	it("drops the extra block when none of its ids survive", () => {
		const data = cleanVocabQueueData({
			v: 1,
			states: {},
			plan: {
				date: TODAY,
				ids: ["a"],
				done: [],
				review: 1,
				fresh: 0,
				extra: { ids: ["ghost9"], done: [], review: 0, fresh: 1 },
			},
		});
		const next = reconcilePlanWithWordList(data, words);
		expect(next.plan?.ids).toEqual(["a"]);
		expect(next.plan?.extra).toBeUndefined();
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

describe("vocab queue「上一个」grade annulment", () => {
	it("annuls a grade completely and the re-grade counts the word once", () => {
		resetVocabQueueForTests();
		todayPlan([word("a", 1, 1)], TODAY);
		const snap = snapshotVocabGrade("a");
		applyVocabGrade("a", "know", true, TODAY);
		expect(vocabQueueData().plan?.done).toEqual(["a"]);
		expect(planBatchProgress(vocabQueueData().plan!).freshDone).toBe(1);
		revertVocabGrade(snap, TODAY);
		let data = vocabQueueData();
		expect(data.states.a).toBeUndefined();
		expect(data.plan?.done).toEqual([]);
		expect(data.plan?.grades?.a).toBeUndefined();
		expect(planBatchProgress(data.plan!).freshDone).toBe(0);
		// Re-grade from the restored state: the new grade is the day's result,
		// the word still counts exactly once.
		applyVocabGrade("a", "again", true, TODAY);
		data = vocabQueueData();
		expect(data.plan?.done).toEqual(["a"]);
		expect(data.plan?.grades?.a).toBe("again");
		expect(data.states.a).toMatchObject({ s: 0, due: "2026-11-12" });
		expect(planBatchProgress(data.plan!).freshDone).toBe(1);
	});

	it("annuls a re-show grade: the re-show mark and intermediate state are rolled back", () => {
		resetVocabQueueForTests();
		todayPlan([word("a", 1, 1)], TODAY);
		const snap = snapshotVocabGrade("a");
		applyVocabGrade("a", "fuzzy", false, TODAY);
		expect(vocabQueueData().plan?.reshown).toEqual(["a"]);
		revertVocabGrade(snap, TODAY);
		const data = vocabQueueData();
		expect(data.states.a).toBeUndefined();
		expect(data.plan?.reshown ?? []).toEqual([]);
		expect(data.plan?.grades?.a).toBeUndefined();
		// The card can re-show again afterwards — the annulled grade never happened.
		applyVocabGrade("a", "fuzzy", false, TODAY);
		expect(vocabQueueData().plan?.reshown).toEqual(["a"]);
	});

	it("annuls the final grade of a re-shown card back to its intermediate state", () => {
		resetVocabQueueForTests();
		todayPlan([word("a", 1, 1)], TODAY);
		applyVocabGrade("a", "fuzzy", false, TODAY); // intermediate: step 0, due tomorrow, reshown
		const snap = snapshotVocabGrade("a");
		applyVocabGrade("a", "know", true, TODAY); // re-show grade counts
		expect(vocabQueueData().states.a).toMatchObject({ s: 1, due: "2026-11-14" });
		revertVocabGrade(snap, TODAY);
		const data = vocabQueueData();
		expect(data.states.a).toMatchObject({ s: 0, due: "2026-11-12" });
		expect(data.plan?.done).toEqual([]);
		expect(data.plan?.grades?.a).toBe("fuzzy");
		expect(data.plan?.reshown).toEqual(["a"]);
	});

	it("annuls a retest overwrite: the original grade and state come back, done untouched", () => {
		resetVocabQueueForTests();
		todayPlan([word("a", 1, 1)], TODAY);
		applyVocabGrade("a", "know", true, TODAY);
		const snap = snapshotVocabGrade("a");
		applyVocabGrade("a", "again", true, TODAY); // retest overwrite
		expect(vocabQueueData().states.a).toMatchObject({ s: 0, due: "2026-11-12" });
		revertVocabGrade(snap, TODAY);
		const data = vocabQueueData();
		expect(data.states.a).toMatchObject({ s: 1, due: "2026-11-14" });
		expect(data.plan?.done).toEqual(["a"]);
		expect(data.plan?.grades?.a).toBe("know");
	});

	it("supports consecutive step-backs across several cards", () => {
		resetVocabQueueForTests();
		todayPlan([word("a", 1, 1), word("b", 1, 2), word("c", 1, 3)], TODAY);
		const snaps = ["a", "b", "c"].map((id) => {
			const snap = snapshotVocabGrade(id);
			applyVocabGrade(id, "know", true, TODAY);
			return snap;
		});
		expect(vocabQueueData().plan?.done).toEqual(["a", "b", "c"]);
		revertVocabGrade(snaps[2], TODAY);
		revertVocabGrade(snaps[1], TODAY);
		let data = vocabQueueData();
		expect(data.plan?.done).toEqual(["a"]);
		expect(data.states.b).toBeUndefined();
		expect(data.states.c).toBeUndefined();
		expect(data.states.a).toMatchObject({ s: 1 });
		revertVocabGrade(snaps[0], TODAY);
		data = vocabQueueData();
		expect(data.plan?.done).toEqual([]);
		expect(Object.keys(data.states)).toEqual([]);
	});

	it("annuls an extra-batch grade into extra.done, leaving the baseline count untouched", () => {
		resetVocabQueueForTests();
		const words = Array.from({ length: 55 }, (_, i) => word(`w${i}`, 1, i + 1));
		todayPlan(words, TODAY);
		const added = addExtraBatch(words, TODAY);
		expect(added.length).toBe(5);
		const target = added[0];
		const snap = snapshotVocabGrade(target);
		applyVocabGrade(target, "know", true, TODAY);
		expect(vocabQueueData().plan?.extra?.done).toEqual([target]);
		revertVocabGrade(snap, TODAY);
		const data = vocabQueueData();
		expect(data.plan?.extra?.done).toEqual([]);
		expect(data.plan?.done).toEqual([]);
		expect(data.states[target]).toBeUndefined();
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

	it("takes the server plan's ids when same-day plans diverge, unioning progress onto them", () => {
		const local = {
			v: 1 as const,
			states: { ghost: { s: 1, due: "2026-11-14", ts: 200 } },
			plan: {
				date: TODAY,
				ids: ["ghost", "a"],
				done: ["ghost", "a"],
				review: 0,
				fresh: 2,
				grades: { ghost: "know" as const, a: "fuzzy" as const },
				reshown: ["ghost"],
			},
		};
		const server = {
			v: 1 as const,
			states: {},
			plan: { date: TODAY, ids: ["a", "b"], done: ["b"], review: 1, fresh: 1, grades: { b: "know" as const }, reshown: ["b"] },
		};
		const merged = mergeVocabQueueData(local, server);
		expect(merged.plan?.ids).toEqual(["a", "b"]);
		expect(merged.plan?.review).toBe(1);
		expect(merged.plan?.fresh).toBe(1);
		// Done unions, but only for ids the merged (server) plan serves.
		expect(merged.plan?.done.sort()).toEqual(["a", "b"]);
		expect(merged.plan?.grades).toEqual({ a: "fuzzy", b: "know" });
		expect(merged.plan?.reshown).toEqual(["b"]);
		// The local-only word leaves the plan, but its SRS state survives the merge.
		expect(merged.states.ghost).toMatchObject({ s: 1, due: "2026-11-14" });
	});

	it("converges a plan minted from an empty local snapshot to the server's plan", () => {
		const words = [word("a", 1, 1), word("b", 1, 2), word("c", 1, 3), word("d", 1, 4)];
		// Empty states mint the deterministic first batch — yesterday's words on a stale device.
		const minted = buildDailyPlan(words, {}, TODAY, 3);
		expect(minted.ids).toEqual(["a", "b", "c"]);
		const local = { v: 1 as const, states: {}, plan: { ...minted, done: ["a"] } };
		const server = {
			v: 1 as const,
			states: {},
			plan: { date: TODAY, ids: ["b", "c", "d"], done: ["b"], review: 1, fresh: 2 },
		};
		const merged = mergeVocabQueueData(local, server);
		expect(merged.plan?.ids).toEqual(["b", "c", "d"]);
		expect(merged.plan?.done).toEqual(["b"]);
		expect(merged.plan?.review).toBe(1);
		expect(merged.plan?.fresh).toBe(2);
	});

	it("keeps the later day's plan wholesale, whichever side holds it", () => {
		const older = { date: "2026-11-10", ids: ["a"], done: ["a"], review: 0, fresh: 1 };
		const newer = { date: TODAY, ids: ["b"], done: [] as string[], review: 0, fresh: 1 };
		expect(mergeVocabQueueData({ v: 1, states: {}, plan: older }, { v: 1, states: {}, plan: newer }).plan).toEqual(newer);
		expect(mergeVocabQueueData({ v: 1, states: {}, plan: newer }, { v: 1, states: {}, plan: older }).plan).toEqual(newer);
		expect(mergeVocabQueueData({ v: 1, states: {}, plan: newer }, { v: 1, states: {}, plan: null }).plan).toEqual(newer);
	});

	it("aligns a merged extra block to the server plan: extra ids never collide with the baseline", () => {
		const local = {
			v: 1 as const,
			states: {},
			plan: {
				date: TODAY,
				ids: ["a"],
				done: [] as string[],
				review: 0,
				fresh: 1,
				grades: { b: "know" as const, x: "fuzzy" as const },
				extra: { ids: ["b", "x"], done: ["b", "x"], review: 1, fresh: 1 },
			},
		};
		const server = {
			v: 1 as const,
			states: {},
			plan: { date: TODAY, ids: ["a", "b"], done: [] as string[], review: 1, fresh: 1 },
		};
		const merged = mergeVocabQueueData(local, server);
		// "b" is served by the server baseline, so it leaves the extra block;
		// its grade survives because grades cover baseline and extra ids alike.
		expect(merged.plan?.extra).toEqual({ ids: ["x"], done: ["x"], review: 1, fresh: 1 });
		expect(merged.plan?.grades).toEqual({ b: "know", x: "fuzzy" });
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

	it("takes new words only, in priority order — due reviews are never extra candidates", () => {
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
		const batch = buildExtraBatch(words, states, planOf(["in-plan"]));
		// Due and not-yet-due words are never candidates: reviews live in the
		// plan's own review batch, never deferred into extras.
		expect(batch).toEqual({ ids: ["fresh-early", "fresh-late"], review: 0, fresh: 2 });
		expect(EXTRA_BATCH_SIZE).toBe(20);
	});

	it("respects the batch size and never repeats earlier extra batches", () => {
		const words = Array.from({ length: 30 }, (_, i) => word(`w-${i}`, 1, i + 1));
		const plan = planOf([], { ids: ["w-0", "w-1"], done: ["w-0"], review: 0, fresh: 2 });
		const batch = buildExtraBatch(words, {}, plan, 5);
		expect(batch?.ids).toEqual(["w-2", "w-3", "w-4", "w-5", "w-6"]);
		expect(batch?.review).toBe(0);
		expect(batch?.fresh).toBe(5);
		expect(countExtraCandidates(words, {}, plan).total).toBe(28);
	});

	it("returns null when no new word is left, however many reviews are still due", () => {
		const words = [word("a", 1, 1), word("b", 1, 2), word("c", 1, 3), word("d", 1, 4)];
		const states = {
			a: { s: 1, due: TODAY, ts: 1 },
			b: { s: 1, due: "2026-11-05", ts: 1 },
			c: { s: 1, due: TODAY, ts: 1 },
			d: { s: 1, due: "2026-12-01", ts: 1 },
		};
		const plan = planOf(["a"], { ids: ["c"], done: [], review: 1, fresh: 0 });
		// b is due and untaken by the baseline, d is not due yet, nothing is new:
		// under the current regime there is simply nothing an extra batch can add.
		expect(buildExtraBatch(words, states, plan)).toBeNull();
		expect(countExtraCandidates(words, states, plan).total).toBe(0);
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

	it("the plan itself serves every due review now; extra batches then add only new words", () => {
		const dueWords = Array.from({ length: 55 }, (_, i) => word(`due-${i}`, 1, i + 1));
		const freshWords = Array.from({ length: 56 }, (_, i) => word(`new-${i}`, 1, 100 + i));
		const states = Object.fromEntries(dueWords.map((w) => [w.id, { s: 1, due: "2026-11-04", ts: 1 }]));
		const all = [...dueWords, ...freshWords];
		const plan = buildDailyPlan(all, states, TODAY);
		// No deferral anymore: all 55 reviews are in the plan's own review batch.
		expect(plan.review).toBe(55);
		expect(plan.fresh).toBe(50);
		const batch = buildExtraBatch(all, states, plan);
		// The 6 leftover NEW words — and nothing else — form the extra batch.
		expect(batch).toEqual({ ids: freshWords.slice(50).map((w) => w.id), review: 0, fresh: 6 });
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

describe("vocab queue sentence-type breakdowns", () => {
	it("classifies sentence-type entries apart from plain words", () => {
		// whole sentences (polite predicate tail)
		expect(isQueueSentenceType("これにて終了とさせていただきます")).toBe(true);
		expect(isQueueSentenceType("本日はよろしくお願いいたします")).toBe(true);
		expect(isQueueSentenceType("ご質問はございますか")).toBe(true);
		// 〜 patterns
		expect(isQueueSentenceType("〜てもよろしいでしょうか")).toBe(true);
		expect(isQueueSentenceType("〜に携わる")).toBe(true);
		// conditional / connective fragments
		expect(isQueueSentenceType("差し支えなければ")).toBe(true);
		expect(isQueueSentenceType("早速ですが")).toBe(true);
		expect(isQueueSentenceType("ご縁があれば")).toBe(true);
		// clause phrases (internal particle + plain predicate)
		expect(isQueueSentenceType("音声が途切れる")).toBe(true);
		expect(isQueueSentenceType("関係者と調整する")).toBe(true);
		expect(isQueueSentenceType("マニュアルに沿って対応する")).toBe(true);
		// plain words and word-like phrases stay out
		expect(isQueueSentenceType("仕様")).toBe(false);
		expect(isQueueSentenceType("履歴書")).toBe(false);
		expect(isQueueSentenceType("克服する")).toBe(false);
		expect(isQueueSentenceType("エスカレーションする")).toBe(false);
		expect(isQueueSentenceType("長所と短所")).toBe(false);
		expect(isQueueSentenceType("チームの雰囲気")).toBe(false);
		expect(isQueueSentenceType("")).toBe(false);
	});

	it("ships a valid breakdown on every tier-1 sentence-type entry and nowhere else in tier 1", () => {
		const root = process.cwd();
		const payload = JSON.parse(readFileSync(join(root, "public/data/vocab-queue.json"), "utf8")) as {
			words: VocabWord[];
			breakdowns?: { sentenceTypeTotal: number; covered: number };
		};
		const bySurface = new Map(payload.words.map((w) => [w.w, w]));
		// Coverage: every sentence-type card in the tier-1 topic files has a
		// breakdown on its queue entry (the build asserts this too; the shipped
		// artifact is re-checked here so a stale JSON cannot slip through).
		for (const file of ["frontend.json", "job-interview.json"]) {
			const topic = JSON.parse(readFileSync(join(root, "public/data/topics", file), "utf8")) as {
				cards: { jp: string }[];
			};
			for (const card of topic.cards) {
				if (!isQueueSentenceType(card.jp)) continue;
				const entry = bySurface.get(card.jp);
				expect(entry, `${file}: ${card.jp} missing from queue`).toBeTruthy();
				expect(entry?.breakdown, `${file}: ${card.jp} has no breakdown`).toBeTruthy();
			}
		}
		const covered = payload.words.filter((w) => w.breakdown);
		expect(covered.length).toBeGreaterThan(0);
		expect(payload.breakdowns?.covered).toBe(covered.length);
		expect(payload.breakdowns?.sentenceTypeTotal).toBe(payload.words.filter((w) => isQueueSentenceType(w.w)).length);
		// Round 2 (2026-11-13): coverage is complete — every sentence-type
		// entry in the whole queue ships a breakdown.
		expect(covered.length).toBe(payload.breakdowns?.sentenceTypeTotal);
		const kanji = /[\u3400-\u9fff\u3005々〆ヶ]/;
		for (const word of covered) {
			const bd = word.breakdown!;
			// Segments concatenate back to the exact headword, readings to the
			// entry reading (the topic jp_ruby concatenation discipline).
			// Entries whose stored reading is empty (a few lesson-review rows)
			// skip the reading check, mirroring the build's discipline.
			expect(bd.lines.map((l) => l.seg).join("")).toBe(word.w);
			if (kanaSequence(word.r)) {
				expect(bd.lines.map((l) => kanaSequence(l.reading)).join("")).toBe(kanaSequence(word.r));
			}
			for (const line of bd.lines) {
				expect(line.form.trim()).not.toBe("");
				expect(line.role.trim()).not.toBe("");
				if (line.ruby) {
					expect(isRubySubset(line.ruby)).toBe(true);
					expect(stripRuby(line.ruby)).toBe(line.seg);
					expect(rubyReading(line.ruby)).toBe(kanaSequence(line.reading));
				} else {
					expect(kanji.test(line.seg)).toBe(false);
				}
			}
			if (bd.keigo) {
				expect(word.w.includes(bd.keigo.seg)).toBe(true);
				expect(["尊敬語", "謙譲語", "丁寧語"]).toContain(bd.keigo.type);
				expect(bd.keigo.plain.trim()).not.toBe("");
			}
		}
		// The entry Daniel screenshotted on 2026-11-13 carries its breakdown.
		const trigger = bySurface.get("これにて終了とさせていただきます");
		expect(trigger?.breakdown?.keigo).toMatchObject({ type: "謙譲語", plain: "終了します" });
	});
});

describe("vocab queue stale-snapshot plan guard (2026-11-17 incident)", () => {
	// Yesterday Daniel completed his whole plan (reviews + 50 new) on the
	// server. This device's localStorage still held the snapshot from BEFORE
	// that session: yesterday's new words had no state, and a word graded
	// yesterday still carried its old due date. The home-page card minted
	// today's plan from that snapshot before the boot pull reached this
	// module, reproducing yesterday's batches verbatim.
	const YDAY = "2026-11-16";
	const DAY = "2026-11-17";
	const words: VocabWord[] = [
		word("graded-yday", 1, 1),
		word("fresh-yday-1", 1, 2),
		word("fresh-yday-2", 1, 3),
		word("fresh-yday-3", 1, 4),
		word("rev-old", 3, 1),
		...Array.from({ length: 60 }, (_, i) => word(`new-${i + 1}`, 5, i + 1)),
	];
	// The server's truth this morning: graded-yday was graded yesterday
	// (due next week), the fresh-yday words were learned yesterday, rev-old
	// is genuinely due today.
	const serverBlob = {
		v: 1,
		states: {
			"graded-yday": { s: 2, due: "2026-11-23", ts: 9000 },
			"fresh-yday-1": { s: 1, due: "2026-11-19", ts: 8000 },
			"fresh-yday-2": { s: 1, due: "2026-11-19", ts: 8000 },
			"fresh-yday-3": { s: 1, due: "2026-11-19", ts: 8000 },
			"rev-old": { s: 1, due: DAY, ts: 100 },
		},
		plan: { pv: PLAN_PV, date: YDAY, ids: ["graded-yday"], done: ["graded-yday"], review: 0, fresh: 1 },
	};
	// The stale local snapshot: graded-yday still due yesterday, the
	// fresh-yday words unknown, plan from the day before yesterday.
	const staleBlob = {
		v: 1,
		states: {
			"graded-yday": { s: 1, due: YDAY, ts: 100 },
			"rev-old": { s: 1, due: DAY, ts: 50 },
		},
		plan: { pv: PLAN_PV, date: "2026-11-15", ids: ["graded-yday"], done: [] as string[], review: 1, fresh: 0 },
	};

	beforeEach(() => {
		resetVocabQueueForTests();
		resetSyncPolicyForTests();
		localStorage.clear();
	});
	afterEach(() => {
		vi.unstubAllGlobals();
		resetVocabQueueForTests();
		resetSyncPolicyForTests();
		localStorage.clear();
	});

	it("never mints a new-day plan from an unverified stale snapshot; after a fresh pull the plan matches the server's states", async () => {
		localStorage.setItem(VOCAB_QUEUE_STORAGE_KEY, JSON.stringify(staleBlob));
		hydrateVocabQueue();
		expect(vocabQueueData().plan?.date).toBe("2026-11-15");

		// Signed in, but the pull fails (offline): minting must stay blocked —
		// a settled-but-failed pull is not a verified snapshot.
		vi.stubGlobal(
			"fetch",
			vi.fn(async () => {
				throw new Error("offline");
			}),
		);
		await pullVocabQueueFromServer("uid");
		expect(vocabQueueCanMint(DAY)).toBe(false);
		const refused = todayPlan(words, DAY);
		expect(refused.date).toBe("2026-11-15");
		expect(vocabQueueData().plan?.date).toBe("2026-11-15");
		// Nothing was persisted either: the stored plan is still the stale one.
		const stored = JSON.parse(localStorage.getItem(VOCAB_QUEUE_STORAGE_KEY)!) as { plan: { date: string } };
		expect(stored.plan.date).toBe("2026-11-15");

		// The pull lands: states converge to the server's truth, minting opens.
		vi.stubGlobal(
			"fetch",
			vi.fn(async () => new Response(JSON.stringify(serverBlob), { status: 200 })),
		);
		await pullVocabQueueFromServer("uid");
		expect(vocabQueueCanMint(DAY)).toBe(true);

		const plan = todayPlan(words, DAY);
		const states = vocabQueueData().states;
		expect(plan.date).toBe(DAY);
		// Review batch: only the word truly due today — the word graded
		// yesterday (due 2026-11-23) must NOT come back as a review.
		expect(plan.review).toBe(1);
		expect(plan.ids.slice(0, plan.review)).toEqual(["rev-old"]);
		// Fresh batch: 50 genuinely untouched words — yesterday's new words
		// (they have states now) must NOT be served again as "new".
		expect(plan.fresh).toBe(50);
		const freshIds = plan.ids.slice(plan.review);
		expect(freshIds).toEqual(Array.from({ length: 50 }, (_, i) => `new-${i + 1}`));
		for (const id of plan.ids.slice(0, plan.review)) expect(states[id].due <= DAY).toBe(true);
		for (const id of freshIds) expect(states[id]).toBeUndefined();
		expect(plan.ids).not.toContain("graded-yday");
		expect(plan.ids).not.toContain("fresh-yday-1");
	});

	it("push merges with the server blob first, so a stale client cannot roll back newer states", async () => {
		const planV = { pv: PLAN_PV, date: DAY, ids: ["x", "y"], done: [] as string[], review: 0, fresh: 2 };
		let serverNow: unknown = {
			v: 1,
			states: { x: { s: 1, due: "2026-11-19", ts: 1000 }, y: { s: 1, due: "2026-11-19", ts: 1000 } },
			plan: planV,
		};
		const putBodies: string[] = [];
		vi.stubGlobal(
			"fetch",
			vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
				if (init?.method === "PUT") {
					putBodies.push(String(init.body));
					return new Response(JSON.stringify({ ok: true }), { status: 200 });
				}
				return new Response(JSON.stringify(serverNow), { status: 200 });
			}),
		);
		await pullVocabQueueFromServer("uid");

		// A local grade lands (dirty), and meanwhile another device grades x
		// further — the server's x record is now newer than this client's.
		applyVocabGrade("y", "know", true, DAY);
		serverNow = {
			v: 1,
			states: { x: { s: 3, due: "2026-12-17", ts: 5000 }, y: { s: 1, due: "2026-11-19", ts: 1000 } },
			plan: planV,
		};

		expect(await pushVocabQueueNow()).toBe(true);
		expect(putBodies).toHaveLength(1);
		const sent = JSON.parse(putBodies[0]) as {
			states: Record<string, { s: number; due: string; ts: number }>;
			plan: { done: string[] } | null;
		};
		// No rollback: the other device's newer x state survives the push…
		expect(sent.states.x).toMatchObject({ s: 3, due: "2026-12-17", ts: 5000 });
		// …while this client's own grade of y (know from step 1 → step 2, +7d) is in.
		expect(sent.states.y).toMatchObject({ s: 2, due: "2026-11-24" });
		expect(sent.plan?.done).toEqual(["y"]);
		// And the merged blob is adopted locally.
		expect(vocabQueueData().states.x.ts).toBe(5000);
	});
});
