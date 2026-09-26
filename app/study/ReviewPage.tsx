import { useEffect, useState } from "react";

import { lx, navTo, LANG } from "./store";
import {
	buildReviewRuby,
	formatReviewDate,
	formatReviewMonthDay,
	formatReviewWeekday,
	isLessonReviewPayload,
	reviewKanaLine,
	reviewSurfaceText,
	jstToday,
	reviewDayCounts,
	type LessonReviewPayload,
	type ReviewDay,
	LESSON_REVIEW_DOCS,
} from "./lesson-review";
import {
	loadReviewMastery,
	reviewUnknownCount,
	type ReviewMasteryMap,
} from "./lesson-review-mastery";
import { MemoryCards, REVIEW_MASTERY_KEY, type MemoryCardItem } from "./memory-cards";

export function ReviewPage({ dateId }: { dateId: string | null }) {
	const [payload, setPayload] = useState<LessonReviewPayload | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [mastery, setMastery] = useState<ReviewMasteryMap>(() => loadReviewMastery());

	useEffect(() => {
		setMastery(loadReviewMastery());
	}, [dateId]);

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
	const tabNames = LESSON_REVIEW_DOCS.map((doc) => doc.name);
	const today = jstToday();
	const defaultTab =
		tabNames.find((name) => days.some((day) => day.source === name && day.date === today)) ||
		tabNames.find((name) => days.some((day) => day.source === name)) ||
		tabNames[0];
	const [tab, setTab] = useState(defaultTab);
	const activeTab = tabNames.includes(tab) ? tab : defaultTab;
	const scoped = days.filter((day) =>
		day.source ? day.source === activeTab : activeTab === tabNames[0],
	);
	const dated = scoped.filter((day) => day.date);
	const notes = scoped.filter((day) => !day.date);
	const todayDays = dated.filter((day) => day.date === today);
	const todayIds = new Set(todayDays.map((day) => day.id));

	return (
		<div className="review-wrap">
			<p className="review-lead">
				{lx("按上课日期背单词和句子。点一天就开始记忆卡。", "Review words and sentences by class date. Open a day to start flashcards.")}
			</p>
			{fetchedAt ? (
				<div className="review-sync">
					{lx("内容每周一自动更新", "Updated every Monday")}
					{fetchedAt.slice(0, 10) ? ` · ${fetchedAt.slice(0, 10)}` : ""}
				</div>
			) : null}
			<div className="review-tabs" role="tablist" aria-label={lx("课堂文档", "Lesson documents")}>
				{tabNames.map((name) => (
					<button
						key={name}
						type="button"
						role="tab"
						aria-selected={name === activeTab}
						className={`review-tab${name === activeTab ? " on" : ""}`}
						onClick={() => setTab(name)}
					>
						{name}
					</button>
				))}
			</div>
			{todayDays.length ? (
				<section className="review-sec">
					<div className="side-h">{lx("今天", "Today")}</div>
					<div className="review-list">
						{todayDays.map((day) => (
							<DayButton key={day.id} day={day} today mastery={mastery} />
						))}
					</div>
				</section>
			) : null}
			<section className="review-sec">
				<div className="side-h">{lx("按日期", "By date")}</div>
				<div className="review-list">
					{dated
						.filter((day) => !todayIds.has(day.id))
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
	const caption = [day.source, day.label].filter(Boolean).join(" · ");
	const preview = day.items
		.slice(0, 3)
		.map((item) => reviewPreviewText(item.jp))
		.filter(Boolean);
	return (
		<button type="button" className={`review-day${today ? " today" : ""}`} onClick={() => navTo(`#/review/${day.id}`)}>
			<span className="d">
				{weekday}
				{today ? <span className="today-mark">{lx("今天", "Today")}</span> : null}
			</span>
			<span className="t">{title}</span>
			{caption ? <span className="tc">{caption}</span> : null}
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

function ReviewCards({ day }: { day: ReviewDay }) {
	const title = [
		day.date ? formatReviewDate(day.date, LANG === "en" ? "en" : "cn") : day.title,
		day.source,
	]
		.filter(Boolean)
		.join(" · ");
	const items: MemoryCardItem[] = day.items.map((item) => ({
		id: item.jp,
		jp: reviewSurfaceText(item.jp),
		jpHtml: item.jp_r || buildReviewRuby(item.jp, item.reading),
		reading: reviewKanaLine(item),
		cn: item.cn,
		en: item.en,
		exampleJp: item.kind === "word" ? item.example : undefined,
		exampleJpHtml: item.kind === "word" ? item.example_r : undefined,
		exampleCn: item.kind === "word" ? item.exampleCn : undefined,
		exampleEn: item.kind === "word" ? item.exampleEn : undefined,
		kind: item.kind,
	}));
	return (
		<MemoryCards
			deckId={day.id}
			storageKey={REVIEW_MASTERY_KEY}
			items={items}
			crumb={
				<div className="crumb">
					<button type="button" className="crumb-home" onClick={() => navTo("#/review")}>
						{lx("课堂复习", "Lesson review")}
					</button>
					<span className="crumb-sep">›</span>
					<span>{title}</span>
				</div>
			}
			kindOptions={[
				{ value: "all", label: lx("全部", "All") },
				{ value: "word", label: lx("单词", "Words") },
				{ value: "sentence", label: lx("句子", "Sentences") },
			]}
			hint={lx("回想中/英文，点击翻面", "Recall the meaning, then tap to flip")}
			emptyUnknown={lx("这一天的卡片都记住了 🎉", "You've mastered this day's cards 🎉")}
			emptyAll={lx("这一天还没有可刷的卡片", "No flashcards for this day")}
		/>
	);
}

function reviewPreviewText(jp: string): string {
	const text = reviewSurfaceText(jp);
	if (text.length <= 18) return text;
	return `${text.slice(0, 18)}…`;
}


