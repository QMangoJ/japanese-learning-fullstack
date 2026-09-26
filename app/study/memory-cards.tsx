import { Fragment, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";

import { RubyHtml, SayButton } from "../routes/study-common";
import { getDisplayVersion, lx, navTo, subscribeDisplay, toggleDisplay, noRuby } from "./store";
import { isMastered, loadMastery, setMastered, type MasteryMap } from "./memory-mastery";

export const FLASHCARD_MASTERY_KEY = "flashcard-mastery";
export const REVIEW_MASTERY_KEY = "lesson-review-mastery";

export type MemoryCardKind = "word" | "kanji" | "expression" | "sentence" | "phrase";

export type MemoryCardItem = {
	id: string;
	jp: string;
	jpHtml?: string;
	reading?: string;
	cn?: string;
	en?: string;
	exampleJp?: string;
	exampleJpHtml?: string;
	exampleReading?: string;
	exampleCn?: string;
	exampleEn?: string;
	/** Chinese translation of the whole item (shown on the back). */
	translation?: string;
	kind?: MemoryCardKind | string;
	week?: number;
	day?: number;
};

export type MemoryKindOption = { value: string; label: string };

type SkillFilter = "all" | "unknown" | "known";

const KIND_LABELS: Record<string, [string, string]> = {
	word: ["单词", "Word"],
	kanji: ["汉字", "Kanji"],
	expression: ["表达", "Phrase"],
	phrase: ["短语", "Phrase"],
	sentence: ["句子", "Sentence"],
	grammar: ["语法", "Grammar"],
	q: ["错题", "Mistake"],
};

export function memoryKindLabel(kind?: string): string {
	if (!kind) return lx("单词", "Word");
	const pair = KIND_LABELS[kind];
	return pair ? lx(...pair) : kind;
}

export function CardsLaunch({ label }: { label?: string }) {
	return (
		<button type="button" className="cards-launch" onClick={() => navTo("#/cards")}>
			{label || lx("用记忆卡背诵 ›", "Study with flashcards ›")}
		</button>
	);
}

export type CardScopeWeek = { n: number; days?: { day: number }[] };

export function CardsScopeFilter({
	weeks,
	week,
	day,
	chapter,
	onWeek,
	onDay,
}: {
	weeks: CardScopeWeek[];
	week: number;
	day: number;
	chapter: boolean;
	onWeek: (week: number) => void;
	onDay: (day: number) => void;
}) {
	const dayWeekN = week || (weeks.length === 1 ? weeks[0]?.n : 0);
	const days = weeks.find((item) => item.n === dayWeekN)?.days || [];
	return (
		<>
			{weeks.length > 1 ? (
				<div className="fc-filter">
					<button type="button" className={week === 0 ? "on" : ""} data-fcweek={0} onClick={() => onWeek(0)}>
						{lx("全部", "All")}
					</button>
					{weeks.map((item) => (
						<button
							key={item.n}
							type="button"
							className={week === item.n ? "on" : ""}
							data-fcweek={item.n}
							onClick={() => onWeek(item.n)}
						>
							{chapter ? lx(`第${item.n}章`, `Ch. ${item.n}`) : lx(`第${item.n}週`, `Week ${item.n}`)}
						</button>
					))}
				</div>
			) : null}
			{days.length > 1 ? (
				<div className="fc-filter" data-fc-days="1">
					<button type="button" className={day === 0 ? "on" : ""} data-fcday={0} onClick={() => onDay(0)}>
						{chapter ? lx("本章全部", "Whole chapter") : lx("本周全部", "Whole week")}
					</button>
					{days.map((item) => (
						<button
							key={item.day}
							type="button"
							className={day === item.day ? "on" : ""}
							data-fcday={item.day}
							onClick={() => onDay(item.day)}
						>
							{chapter ? lx(`第${item.day}节`, `Sec. ${item.day}`) : lx(`${item.day}日目`, `Day ${item.day}`)}
						</button>
					))}
				</div>
			) : null}
		</>
	);
}

export function MemoryCards({
	deckId,
	items,
	storageKey = FLASHCARD_MASTERY_KEY,
	crumb,
	header,
	kindOptions,
	hint,
	emptyUnknown,
	emptyAll,
	defaultSkill = "unknown",
	translationPending = false,
}: {
	deckId: string;
	items: MemoryCardItem[];
	storageKey?: string;
	crumb?: ReactNode;
	header?: ReactNode;
	kindOptions?: MemoryKindOption[];
	hint?: string;
	emptyUnknown?: string;
	emptyAll?: string;
	defaultSkill?: SkillFilter;
	translationPending?: boolean;
}) {
	useSyncExternalStore(subscribeDisplay, getDisplayVersion, () => 0);
	const [mastery, setMastery] = useState<MasteryMap>(() => loadMastery(storageKey));
	const [kind, setKind] = useState("all");
	const [skill, setSkill] = useState<SkillFilter>(defaultSkill);
	const [idx, setIdx] = useState(0);
	const [flipped, setFlipped] = useState(false);
	const [order, setOrder] = useState<number[] | null>(null);

	const derivedKinds = useMemo(() => {
		if (kindOptions) return kindOptions;
		const seen = new Set<string>();
		for (const item of items) if (item.kind) seen.add(item.kind);
		if (seen.size <= 1) return [];
		return [
			{ value: "all", label: lx("全部", "All") },
			...[...seen].map((value) => ({ value, label: memoryKindLabel(value) })),
		];
	}, [items, kindOptions]);

	const filtered = useMemo(() => {
		return items.filter((item) => {
			if (kind !== "all" && item.kind !== kind) return false;
			const known = isMastered(mastery, deckId, item.id);
			if (skill === "known") return known;
			if (skill === "unknown") return !known;
			return true;
		});
	}, [items, kind, skill, mastery, deckId]);

	const deck = useMemo(() => {
		if (!order) return filtered;
		return order.map((i) => filtered[i]).filter(Boolean);
	}, [filtered, order]);

	const safeIdx = deck.length ? Math.min(idx, deck.length - 1) : 0;
	const cur = deck[safeIdx];
	const known = cur ? isMastered(mastery, deckId, cur.id) : false;
	const frontHint = hint || lx("回想读音和意思，点击翻面", "Recall the reading and meaning, then tap to flip");

	const resetDeck = (nextKind: string, nextSkill: SkillFilter) => {
		setKind(nextKind);
		setSkill(nextSkill);
		setIdx(0);
		setFlipped(false);
		setOrder(null);
	};

	const mark = (nextKnown: boolean) => {
		if (!cur) return;
		setMastery(setMastered(storageKey, mastery, deckId, cur.id, nextKnown));
		setFlipped(false);
	};

	let card: ReactNode;
	if (!deck.length) {
		card = (
			<div className="fcard">
				<div className="empty">
					{skill === "unknown"
						? emptyUnknown || lx("这些卡片都记住了 🎉", "You've mastered these cards 🎉")
						: emptyAll || lx("还没有可刷的卡片", "No flashcards yet")}
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
				{cur.kind ? <div className="review-k">{memoryKindLabel(cur.kind)}</div> : null}
				<div className="big jp" style={cur.jp.length > 22 ? { fontSize: 20 } : undefined}>
					{cur.jp}
				</div>
				<div className="hint">{frontHint}</div>
			</div>
		);
	} else {
		card = (
			<div className="fcard" data-fcflip="1" onClick={() => setFlipped(false)}>
				<div className="backside review-flip" style={{ textAlign: "center" }}>
					{cur.kind ? <div className="review-k">{memoryKindLabel(cur.kind)}</div> : null}
					<div className="jp review-flip-ruby" style={{ fontWeight: 700, fontSize: "22px" }}>
						{cur.jpHtml ? <RubyHtml html={cur.jpHtml} /> : cur.jp} <SayButton text={cur.jp} />
					</div>
					{cur.reading ? <div className="review-reading jp">{cur.reading}</div> : null}
					{cur.cn ? <div style={{ fontSize: "18px", marginTop: "10px" }}>{cur.cn}</div> : null}
					{cur.en ? (
						<div className="meta" style={{ fontSize: "14px" }}>
							{cur.en}
						</div>
					) : null}
					{cur.translation ? (
						<div className="ex fcard-ex fcard-trans" data-fc-translation="1">
							<div className="fcard-ex-label">{lx("翻译", "Translation")}</div>
							<div className="cn">{cur.translation}</div>
						</div>
					) : translationPending ? (
						<div className="ex fcard-ex fcard-trans">
							<div className="fcard-ex-label">{lx("翻译", "Translation")}</div>
							<div className="cn meta">{lx("翻译加载中…", "Loading translation…")}</div>
						</div>
					) : null}
					{cur.exampleJp ? (
						<div className="ex fcard-ex">
							<div className="fcard-ex-label">{lx("例句", "Example")}</div>
							<div className="jp">
								{cur.exampleJpHtml ? <RubyHtml html={cur.exampleJpHtml} /> : cur.exampleJp}{" "}
								<SayButton text={cur.exampleJp} />
							</div>
							{cur.exampleReading ? <div className="review-reading jp">{cur.exampleReading}</div> : null}
							{cur.exampleCn ? <div className="cn">{cur.exampleCn}</div> : null}
							{cur.exampleEn ? <div className="en">{cur.exampleEn}</div> : null}
						</div>
					) : null}
				</div>
			</div>
		);
	}

	return (
		<div className="fc-wrap">
			{crumb}
			{header}
			{derivedKinds.length ? (
				<div className="fc-filter">
					{derivedKinds.map((option) => (
						<button
							key={option.value}
							type="button"
							className={kind === option.value ? "on" : ""}
							onClick={() => resetDeck(option.value, skill)}
						>
							{option.label}
						</button>
					))}
				</div>
			) : null}
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
				<button type="button" className={!noRuby ? "on" : ""} aria-pressed={!noRuby} onClick={() => toggleDisplay("ruby")}>
					{lx("注音", "Readings")}
				</button>
			</div>
			<div className="fc-prog">{deck.length ? `${safeIdx + 1} / ${deck.length}` : ""}</div>
			<Fragment key={cur ? `${deckId}-${kind}-${skill}-${safeIdx}-${flipped}` : `${deckId}-done`}>{card}</Fragment>
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

function shuffleOrder(length: number): number[] {
	const order = Array.from({ length }, (_, i) => i);
	for (let i = order.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[order[i], order[j]] = [order[j], order[i]];
	}
	return order;
}
