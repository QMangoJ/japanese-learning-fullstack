import { Fragment, useEffect, useMemo, useState } from "react";

import { SayButton } from "../routes/study-common";
import { LANG, lx, navTo } from "./store";
import {
	formatReviewDate,
	isLessonReviewPayload,
	jstToday,
	reviewDayCounts,
	type LessonReviewPayload,
	type ReviewDay,
	type ReviewItem,
	type ReviewKind,
} from "./lesson-review";

type KindFilter = "all" | ReviewKind;

export function ReviewPage({ dateId }: { dateId: string | null }) {
	const [payload, setPayload] = useState<LessonReviewPayload | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;
		(async () => {
			try {
				const data = await loadReviewPayload();
				if (!cancelled) setPayload(data);
			} catch {
				if (!cancelled) setError(lx("课堂笔记加载失败，请稍后重试。", "Lesson notes failed to load. Please try again."));
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);

	if (error) return <div className="empty">{error}</div>;
	if (!payload) return <div className="empty">{lx("课堂笔记加载中…", "Loading lesson notes…")}</div>;

	const day = dateId ? payload.days.find((entry) => entry.id === dateId) : null;
	if (dateId && !day) {
		return (
			<div className="empty">
				{lx("这一天还没有复习内容", "No review items for this day")}
				<div style={{ marginTop: 12 }}>
					<button type="button" className="crumb-home" onClick={() => navTo("#/review")}>
						{lx("返回日期列表", "Back to dates")}
					</button>
				</div>
			</div>
		);
	}

	return day ? (
		<ReviewCards day={day} />
	) : (
		<ReviewCatalog days={payload.days} fetchedAt={payload.fetchedAt} />
	);
}

async function loadReviewPayload(): Promise<LessonReviewPayload> {
	const urls = ["/api/review", "/data/lesson-review.json"];
	let lastError: unknown;
	for (const url of urls) {
		try {
			const response = await fetch(url);
			if (!response.ok) throw new Error(`${url} ${response.status}`);
			const data: unknown = await response.json();
			if (!isLessonReviewPayload(data)) throw new Error(`${url} invalid payload`);
			return data;
		} catch (error) {
			lastError = error;
		}
	}
	throw lastError instanceof Error ? lastError : new Error("review payload missing");
}

function ReviewCatalog({ days, fetchedAt }: { days: ReviewDay[]; fetchedAt: string }) {
	const today = jstToday();
	const dated = days.filter((day) => day.date);
	const notes = days.filter((day) => !day.date);
	const todayDay = dated.find((day) => day.date === today);

	return (
		<div className="review-wrap">
			<p className="review-lead">
				{lx("按上课日期背单词和句子。点一天就开始记忆卡。", "Review words and sentences by class date. Open a day to start flashcards.")}
			</p>
			{fetchedAt ? (
				<div className="review-sync">
					{lx("内容每周自动更新", "Updated once a week")}
					{fetchedAt.slice(0, 10) ? ` · ${fetchedAt.slice(0, 10)}` : ""}
				</div>
			) : null}
			{todayDay ? (
				<section className="review-sec">
					<div className="side-h">{lx("今天", "Today")}</div>
					<DayButton day={todayDay} today />
				</section>
			) : null}
			<section className="review-sec">
				<div className="side-h">{lx("按日期", "By date")}</div>
				<div className="review-list">
					{dated.filter((day) => day !== todayDay).map((day) => (
						<DayButton key={day.id} day={day} today={day.date === today} />
					))}
				</div>
			</section>
			{notes.length ? (
				<section className="review-sec">
					<div className="side-h">{lx("其他笔记", "Other notes")}</div>
					<div className="review-list">
						{notes.map((day) => (
							<DayButton key={day.id} day={day} />
						))}
					</div>
				</section>
			) : null}
		</div>
	);
}

function DayButton({ day, today = false }: { day: ReviewDay; today?: boolean }) {
	const counts = reviewDayCounts(day);
	const title = day.date ? formatReviewDate(day.date, LANG === "en" ? "en" : "cn") : day.title;
	return (
		<button type="button" className={`review-day${today ? " today" : ""}`} onClick={() => navTo(`#/review/${day.id}`)}>
			<span>
				<span className="d">{title}</span>
				{today ? <span className="today-mark">{lx("今天", "Today")}</span> : null}
			</span>
			<span className="meta">
				{lx(`单词 ${counts.words} · 句子 ${counts.sentences}`, `${counts.words} words · ${counts.sentences} sentences`)}
			</span>
		</button>
	);
}

function ReviewCards({ day }: { day: ReviewDay }) {
	const [kind, setKind] = useState<KindFilter>("all");
	const [idx, setIdx] = useState(0);
	const [flipped, setFlipped] = useState(false);
	const [order, setOrder] = useState<number[] | null>(null);

	const filtered = useMemo(
		() => (kind === "all" ? day.items : day.items.filter((item) => item.kind === kind)),
		[day.items, kind],
	);
	const deck = useMemo(() => {
		if (!order) return filtered;
		return order.map((i) => filtered[i]).filter(Boolean);
	}, [filtered, order]);
	const cur: ReviewItem | undefined = deck[idx];
	const title = day.date ? formatReviewDate(day.date, LANG === "en" ? "en" : "cn") : day.title;

	const act = (fn: () => void) => () => fn();
	const resetDeck = (nextKind: KindFilter) => {
		setKind(nextKind);
		setIdx(0);
		setFlipped(false);
		setOrder(null);
	};

	let card;
	if (!deck.length) {
		card = (
			<div className="fcard">
				<div className="empty">{lx("这一天还没有可刷的卡片", "No flashcards for this day")}</div>
			</div>
		);
	} else if (!cur) {
		card = (
			<div className="fcard">
				<div className="empty">
					{lx("本组已完成 🎉", "Deck complete 🎉")}
					<br />
					{lx("点「重新洗牌」再来一轮", "Shuffle to start another round")}
				</div>
			</div>
		);
	} else if (!flipped) {
		card = (
			<div className="fcard" data-fcflip="1" onClick={act(() => setFlipped(true))}>
				<div className="review-k">{cur.kind === "sentence" ? lx("句子", "Sentence") : lx("单词", "Word")}</div>
				<div className="big jp">{cur.jp}</div>
				<div className="hint">{lx("回想中/英文，点击翻面", "Recall the meaning, then tap to flip")}</div>
			</div>
		);
	} else {
		card = (
			<div className="fcard" data-fcflip="1" onClick={act(() => setFlipped(false))}>
				<div className="backside" style={{ textAlign: "center" }}>
					<div className="review-k">{cur.kind === "sentence" ? lx("句子", "Sentence") : lx("单词", "Word")}</div>
					<div className="jp" style={{ fontWeight: 700, fontSize: "22px" }}>
						{cur.jp} <SayButton text={cur.jp} />
					</div>
					{cur.reading ? <div className="reading jp meta">{cur.reading}</div> : null}
					{cur.cn ? <div style={{ fontSize: "18px", marginTop: "10px" }}>{cur.cn}</div> : null}
					{cur.en ? (
						<div className="meta" style={{ fontSize: "14px" }}>
							{cur.en}
						</div>
					) : null}
					{!cur.cn && !cur.en ? (
						<div className="meta" style={{ marginTop: "10px" }}>
							{lx("这条笔记还没有释义，先记住日文。", "No gloss yet — remember the Japanese.")}
						</div>
					) : null}
				</div>
			</div>
		);
	}

	return (
		<div className="fc-wrap">
			<div className="crumb">
				<button type="button" className="crumb-home" onClick={() => navTo("#/review")}>
					{lx("课堂复习", "Lesson review")}
				</button>
				<span className="crumb-sep">›</span>
				<span>{title}</span>
			</div>
			<div className="fc-filter">
				{(
					[
						["all", lx("全部", "All")],
						["word", lx("单词", "Words")],
						["sentence", lx("句子", "Sentences")],
					] as const
				).map(([value, label]) => (
					<button key={value} type="button" className={kind === value ? "on" : ""} onClick={() => resetDeck(value)}>
						{label}
					</button>
				))}
			</div>
			<div className="fc-prog">{deck.length ? `${Math.min(idx + 1, deck.length)} / ${deck.length}` : ""}</div>
			<Fragment key={cur ? `${day.id}-${kind}-${idx}-${flipped}` : `${day.id}-done`}>{card}</Fragment>
			<div className="fc-btns">
				<button
					type="button"
					data-fc="prev"
					onClick={act(() => {
						setIdx((n) => Math.max(0, n - 1));
						setFlipped(false);
					})}
				>
					‹ {lx("上一张", "Prev")}
				</button>
				<button
					type="button"
					className="primary"
					data-fc="next"
					onClick={act(() => {
						setIdx((n) => n + 1);
						setFlipped(false);
					})}
				>
					{lx("下一张", "Next")} ›
				</button>
				<button
					type="button"
					data-fc="shuffle"
					onClick={act(() => {
						setOrder(shuffleOrder(filtered.length));
						setIdx(0);
						setFlipped(false);
					})}
				>
					{lx("重新洗牌", "Shuffle")}
				</button>
			</div>
		</div>
	);
}

function shuffleOrder(length: number): number[] {
	const order = Array.from({ length }, (_, i) => i);
	for (let i = order.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[order[i], order[j]] = [order[j], order[i]];
	}
	return order;
}
