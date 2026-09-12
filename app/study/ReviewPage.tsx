import { Fragment, useEffect, useMemo, useState, useSyncExternalStore } from "react";

import { RubyHtml, SayButton } from "../routes/study-common";
import {
	LANG,
	getDisplayVersion,
	lx,
	navTo,
	noRuby,
	subscribeDisplay,
	toggleDisplay,
} from "./store";
import {
	buildReviewRuby,
	formatReviewDate,
	formatReviewMonthDay,
	formatReviewWeekday,
	isLessonReviewPayload,
	jstToday,
	reviewDayCounts,
	type LessonReviewPayload,
	type ReviewDay,
	type ReviewItem,
	type ReviewKind,
} from "./lesson-review";
import {
	isReviewKnown,
	loadReviewMastery,
	reviewUnknownCount,
	setReviewKnown,
	type ReviewMasteryMap,
} from "./lesson-review-mastery";

type KindFilter = "all" | ReviewKind;
type SkillFilter = "all" | "unknown" | "known";

export function ReviewPage({ dateId }: { dateId: string | null }) {
	const [payload, setPayload] = useState<LessonReviewPayload | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [mastery, setMastery] = useState<ReviewMasteryMap>(() => loadReviewMastery());

	useEffect(() => {
		setMastery(loadReviewMastery());
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
		<ReviewCards day={day} mastery={mastery} setMastery={setMastery} />
	) : (
		<ReviewCatalog days={payload.days} fetchedAt={payload.fetchedAt} mastery={mastery} />
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

function ReviewCatalog({
	days,
	fetchedAt,
	mastery,
}: {
	days: ReviewDay[];
	fetchedAt: string;
	mastery: ReviewMasteryMap;
}) {
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
					<DayButton day={todayDay} today mastery={mastery} />
				</section>
			) : null}
			<section className="review-sec">
				<div className="side-h">{lx("按日期", "By date")}</div>
				<div className="review-list">
					{dated
						.filter((day) => day !== todayDay)
						.map((day) => (
							<DayButton key={day.id} day={day} today={day.date === today} mastery={mastery} />
						))}
				</div>
			</section>
			{notes.length ? (
				<section className="review-sec">
					<div className="side-h">{lx("其他笔记", "Other notes")}</div>
					<div className="review-list">
						{notes.map((day) => (
							<DayButton key={day.id} day={day} mastery={mastery} />
						))}
					</div>
				</section>
			) : null}
		</div>
	);
}

function DayButton({ day, today = false, mastery }: { day: ReviewDay; today?: boolean; mastery: ReviewMasteryMap }) {
	const counts = reviewDayCounts(day);
	const unknown = reviewUnknownCount(mastery, day.id, day.items);
	const lang = LANG === "en" ? "en" : "cn";
	const title = day.date ? formatReviewMonthDay(day.date, lang) : day.title;
	const weekday = day.date ? formatReviewWeekday(day.date, lang) : lx("笔记", "Notes");
	const preview = day.items
		.slice(0, 3)
		.map((item) => item.jp.replace(/[（(][^）)]*[）)]?/g, "").trim())
		.filter(Boolean);
	return (
		<button type="button" className={`review-day${today ? " today" : ""}`} onClick={() => navTo(`#/review/${day.id}`)}>
			<span className="d">
				{weekday}
				{today ? <span className="today-mark">{lx("今天", "Today")}</span> : null}
			</span>
			<span className="t">{title}</span>
			<span className="review-day__stats">
				<span className="review-day__chip">{lx(`单词 ${counts.words}`, `${counts.words} words`)}</span>
				<span className="review-day__chip">{lx(`句子 ${counts.sentences}`, `${counts.sentences} sentences`)}</span>
				<span className={`review-day__chip${unknown ? " todo" : ""}`}>
					{lx(`未掌握 ${unknown}`, `${unknown} to review`)}
				</span>
			</span>
			{preview.length ? (
				<span className="day-prev">
					{preview.map((text) => (
						<span className="dp jp" key={text}>
							{text}
						</span>
					))}
				</span>
			) : null}
		</button>
	);
}

function ReviewCards({
	day,
	mastery,
	setMastery,
}: {
	day: ReviewDay;
	mastery: ReviewMasteryMap;
	setMastery: (map: ReviewMasteryMap) => void;
}) {
	useSyncExternalStore(subscribeDisplay, getDisplayVersion, () => 0);
	const [kind, setKind] = useState<KindFilter>("all");
	const [skill, setSkill] = useState<SkillFilter>("unknown");
	const [idx, setIdx] = useState(0);
	const [flipped, setFlipped] = useState(false);
	const [order, setOrder] = useState<number[] | null>(null);

	const filtered = useMemo(() => {
		return day.items.filter((item) => {
			if (kind !== "all" && item.kind !== kind) return false;
			const known = isReviewKnown(mastery, day.id, item.jp);
			if (skill === "known") return known;
			if (skill === "unknown") return !known;
			return true;
		});
	}, [day.id, day.items, kind, skill, mastery]);
	const deck = useMemo(() => {
		if (!order) return filtered;
		return order.map((i) => filtered[i]).filter(Boolean);
	}, [filtered, order]);
	const safeIdx = Math.min(idx, Math.max(0, deck.length));
	const cur: ReviewItem | undefined = deck[safeIdx];
	const title = day.date ? formatReviewDate(day.date, LANG === "en" ? "en" : "cn") : day.title;
	const known = cur ? isReviewKnown(mastery, day.id, cur.jp) : false;

	const resetDeck = (nextKind: KindFilter, nextSkill: SkillFilter) => {
		setKind(nextKind);
		setSkill(nextSkill);
		setIdx(0);
		setFlipped(false);
		setOrder(null);
	};

	const mark = (nextKnown: boolean) => {
		if (!cur) return;
		setMastery(setReviewKnown(mastery, day.id, cur.jp, nextKnown));
		setFlipped(false);
		if (nextKnown && skill === "unknown") setIdx((n) => n);
		else if (!nextKnown && skill === "known") setIdx((n) => n);
	};

	let card;
	if (!deck.length) {
		card = (
			<div className="fcard">
				<div className="empty">
					{skill === "unknown"
						? lx("这一天的卡片都记住了 🎉", "You've mastered this day's cards 🎉")
						: lx("这一天还没有可刷的卡片", "No flashcards for this day")}
				</div>
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
			<div className="fcard" data-fcflip="1" onClick={() => setFlipped(true)}>
				<div className="review-k">{cur.kind === "sentence" ? lx("句子", "Sentence") : lx("单词", "Word")}</div>
				<div className="big jp">
					<ReviewRuby item={cur} />
				</div>
				<div className="hint">{lx("回想中/英文，点击翻面", "Recall the meaning, then tap to flip")}</div>
			</div>
		);
	} else {
		card = (
			<div className="fcard" data-fcflip="1" onClick={() => setFlipped(false)}>
				<div className="backside" style={{ textAlign: "center" }}>
					<div className="review-k">{cur.kind === "sentence" ? lx("句子", "Sentence") : lx("单词", "Word")}</div>
					<div className="jp" style={{ fontWeight: 700, fontSize: "22px" }}>
						<ReviewRuby item={cur} /> <SayButton text={cur.jp} />
					</div>
					{cur.reading ? <div className="reading jp meta">{cur.reading}</div> : null}
					{cur.cn ? <div style={{ fontSize: "18px", marginTop: "10px" }}>{cur.cn}</div> : null}
					{cur.en ? (
						<div className="meta" style={{ fontSize: "14px" }}>
							{cur.en}
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
					<button key={value} type="button" className={kind === value ? "on" : ""} onClick={() => resetDeck(value, skill)}>
						{label}
					</button>
				))}
			</div>
			<div className="fc-filter">
				{(
					[
						["unknown", lx("未掌握", "To review")],
						["known", lx("已掌握", "Mastered")],
						["all", lx("全部熟练度", "All progress")],
					] as const
				).map(([value, label]) => (
					<button key={value} type="button" className={skill === value ? "on" : ""} onClick={() => resetDeck(kind, value)}>
						{label}
					</button>
				))}
				<button
					type="button"
					className={!noRuby ? "on" : ""}
					aria-pressed={!noRuby}
					onClick={() => toggleDisplay("ruby")}
				>
					{lx("注音", "Readings")}
				</button>
			</div>
			<div className="fc-prog">{deck.length ? `${Math.min(safeIdx + 1, deck.length)} / ${deck.length}` : ""}</div>
			<Fragment key={cur ? `${day.id}-${kind}-${skill}-${safeIdx}-${flipped}` : `${day.id}-done`}>{card}</Fragment>
			{cur ? (
				<div className="review-skill">
					<button type="button" className={!known ? "on" : ""} onClick={() => mark(false)}>
						{lx("还没记住", "Still learning")}
					</button>
					<button type="button" className={known ? "on known" : ""} onClick={() => mark(true)}>
						{lx("已经记住", "Got it")}
					</button>
				</div>
			) : null}
			<div className="fc-btns">
				<button
					type="button"
					data-fc="prev"
					onClick={() => {
						setIdx((n) => Math.max(0, n - 1));
						setFlipped(false);
					}}
				>
					‹ {lx("上一张", "Prev")}
				</button>
				<button
					type="button"
					className="primary"
					data-fc="next"
					onClick={() => {
						setIdx((n) => n + 1);
						setFlipped(false);
					}}
				>
					{lx("下一张", "Next")} ›
				</button>
				<button
					type="button"
					data-fc="shuffle"
					onClick={() => {
						setOrder(shuffleOrder(filtered.length));
						setIdx(0);
						setFlipped(false);
					}}
				>
					{lx("重新洗牌", "Shuffle")}
				</button>
			</div>
		</div>
	);
}

function ReviewRuby({ item }: { item: ReviewItem }) {
	const html = item.jp_r || buildReviewRuby(item.jp, item.reading);
	if (html) return <RubyHtml html={html} />;
	return <>{item.jp}</>;
}

function shuffleOrder(length: number): number[] {
	const order = Array.from({ length }, (_, i) => i);
	for (let i = order.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[order[i], order[j]] = [order[j], order[i]];
	}
	return order;
}
