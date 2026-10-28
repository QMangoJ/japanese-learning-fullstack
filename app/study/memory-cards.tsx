import { Fragment, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

import { RubyHtml, SayButton } from "../routes/study-common";
import { KanaStagger, StudyFlip } from "./study-flip";
import { CountPair } from "./tick-text";
import type { SwipeGrade } from "./swipe-grade";
import { applyResumeOrder, loadResumePos, resumeIndex, saveResume, type ResumePos } from "./cards-resume";
import { getDisplayVersion, lx, navTo, noRuby, openModuleCards, subscribeDisplay, toggleDisplay } from "./store";
import {
	FLASHCARD_MASTERY_KEY,
	getMasteryVersion,
	cardLevel,
	loadMastery,
	setCardLevel,
	subscribeMastery,
	type CardLevel,
	type MasteryMap,
} from "./memory-mastery";

export { FLASHCARD_MASTERY_KEY };
export const REVIEW_MASTERY_KEY = "lesson-review-mastery";

/** Left and right arrows step through a deck. Grades stay on 1, 2, and 3. */
export function useDeckArrowKeys(onPrev: () => void, onNext: () => void) {
	const move = useRef({ onPrev, onNext });
	move.current = { onPrev, onNext };
	useEffect(() => {
		const onKey = (event: KeyboardEvent) => {
			if (event.metaKey || event.ctrlKey || event.altKey) return;
			if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
			const target = event.target;
			if (target instanceof Element && target.closest("input, textarea, select, [contenteditable='true']")) return;
			event.preventDefault();
			if (event.key === "ArrowLeft") move.current.onPrev();
			else move.current.onNext();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
}

const EMPTY_MASTERY: MasteryMap = {};

function subscribeNothing(_listener: () => void) {
	return () => {};
}

function masteryVersionZero() {
	return 0;
}

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
	/** Manual note waiting for an assistant translation (show 「翻译中…」). */
	awaitingTranslation?: boolean;
	cnHtml?: string;
	kind?: MemoryCardKind | string;
	week?: number;
	day?: number;
};

export type MemoryKindOption = { value: string; label: string };

type SkillFilter = "all" | CardLevel;

const LEVEL_LABEL: Record<CardLevel, [string, string]> = {
	known: ["记住了", "Remembered"],
	fuzzy: ["模糊", "Unsure"],
	blank: ["完全没印象", "No memory"],
};

function levelLabel(level: CardLevel) {
	return lx(...LEVEL_LABEL[level]);
}
type PromptSide = "jp" | "cn" | "en";

function recallFace(item: MemoryCardItem, side: PromptSide): { text: string; missing: boolean } {
	if (side === "cn") {
		const text = item.cn?.trim() || item.translation?.trim() || "";
		if (text) return { text, missing: false };
		return { text: lx("这张没有中文", "No Chinese for this card"), missing: true };
	}
	if (side === "en") {
		const text = item.en?.trim() || "";
		if (text) return { text, missing: false };
		return { text: lx("这张没有英文", "No English for this card"), missing: true };
	}
	return { text: item.jp, missing: false };
}

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

function MemoryCardFront({
	cur,
	hint,
	face,
	level,
}: {
	cur: MemoryCardItem;
	hint: string;
	face?: { text: string; missing: boolean; side: PromptSide };
	level: CardLevel;
}) {
	const text = face?.text ?? cur.jp;
	const japanese = !face || face.side === "jp";
	return (
		<>
			{cur.kind ? <div className="review-k">{memoryKindLabel(cur.kind)}</div> : null}
			<div
				className={japanese ? "big jp" : face?.missing ? "meta" : "big"}
				data-fc-face={face?.side ?? "jp"}
				style={!face?.missing && text.length > 22 ? { fontSize: 22.5 } : undefined}
			>
				{text}
			</div>
			<div className="hint">{hint}</div>
		</>
	);
}

function MemoryCardBack({
	cur,
	translationPending,
	staggerReading = false,
}: {
	cur: MemoryCardItem;
	translationPending: boolean;
	staggerReading?: boolean;
}) {
	return (
		<div className="backside review-flip" style={{ textAlign: "center" }}>
			{cur.kind ? <div className="review-k">{memoryKindLabel(cur.kind)}</div> : null}
			<div className="jp review-flip-ruby" style={{ fontWeight: 700, fontSize: "24px" }}>
				{cur.jpHtml ? <RubyHtml html={cur.jpHtml} /> : cur.jp} <SayButton text={cur.jp} />
			</div>
			{cur.reading ? (
				<div className="review-reading jp">{staggerReading ? <KanaStagger text={cur.reading} /> : cur.reading}</div>
			) : null}
			{cur.cn ? (
				<div className="jp review-flip-ruby" style={{ fontSize: "20px", marginTop: "10px" }}>
					{cur.cnHtml ? <RubyHtml html={cur.cnHtml} /> : cur.cn}
				</div>
			) : null}
			{cur.en ? (
				<div className="meta" style={{ fontSize: "16px" }}>
					{cur.en}
				</div>
			) : null}
			{cur.translation ? (
				<div className="ex fcard-ex fcard-trans" data-fc-translation="1">
					<div className="fcard-ex-label">{lx("翻译", "Translation")}</div>
					<div className="cn">{cur.translation}</div>
				</div>
			) : translationPending || cur.awaitingTranslation ? (
				<div className="ex fcard-ex fcard-trans" data-fc-translation-pending="1">
					<div className="fcard-ex-label">{lx("翻译", "Translation")}</div>
					<div className="cn meta">{lx("翻译中…", "Translating…")}</div>
				</div>
			) : null}
			{cur.exampleJp ? (
				<div className="ex fcard-ex">
					<div className="fcard-ex-label">{lx("例句", "Example")}</div>
					<div className="jp">
						{cur.exampleJpHtml ? <RubyHtml html={cur.exampleJpHtml} /> : cur.exampleJp} <SayButton text={cur.exampleJp} />
					</div>
					{cur.exampleReading ? <div className="review-reading jp">{cur.exampleReading}</div> : null}
					{cur.exampleCn ? <div className="cn">{cur.exampleCn}</div> : null}
					{cur.exampleEn ? <div className="en">{cur.exampleEn}</div> : null}
				</div>
			) : null}
		</div>
	);
}

export function CardsLaunch({ label, week, day }: { label?: string; week?: number; day?: number }) {
	return (
		<button
			type="button"
			className="cards-launch"
			onClick={() => (week && day ? openModuleCards(week, day) : navTo("#/cards"))}
		>
			{label || lx("用记忆卡背诵 ›", "Study with flashcards ›")}
		</button>
	);
}

export type CardScopeWeek = { n: number; days?: { day: number }[] };

/** Short labels for the current week/day scope, shown in the collapsed filter row. */
export function cardScopeSummary(weeks: CardScopeWeek[], week: number, day: number, chapter: boolean): string[] {
	const parts: string[] = [];
	if (week) parts.push(chapter ? lx(`第${week}章`, `Ch. ${week}`) : lx(`第${week}週`, `Week ${week}`));
	else if (weeks.length > 1) parts.push(chapter ? lx("全部章", "All chapters") : lx("全部周", "All weeks"));
	if (day) parts.push(chapter ? lx(`第${day}节`, `Sec. ${day}`) : lx(`${day}日目`, `Day ${day}`));
	return parts;
}

/** 「上次看到」: shown once after reopening 记忆卡 on a remembered card; gone after the next move. */
export function ResumeHint({ scope, n }: { scope: string[]; n: number }) {
	const where = scope.filter(Boolean).join(" · ") || lx("全部", "All");
	return (
		<div className="meta fc-resume" data-fc-resume="1" style={{ fontSize: 13, textAlign: "center", margin: "2px 0 6px" }}>
			{lx(`上次看到：${where} 第 ${n} 张`, `Last time: ${where}, card ${n}`)}
		</div>
	);
}

/** Survives deck remounts (week/day changes remount MemoryCards) for this page session. */
let fcFiltersOpen = false;

/**
 * Filter chips plus the card counter. On phones the chips fold into one summary row
 * that expands on tap; on wide screens the wrapper is display:contents, so the layout is unchanged.
 */
export function FcFilters({ summary, progress, children }: { summary: string[]; progress: ReactNode; children: ReactNode }) {
	const [open, setOpen] = useState(() => fcFiltersOpen);
	const label = summary.filter(Boolean).join(" · ") || lx("筛选", "Filters");
	return (
		<div className={open ? "fc-filters is-open" : "fc-filters"} data-fc-filters={open ? "open" : "closed"}>
			<div className="fc-filters-body">{children}</div>
			<div className="fc-filters-bar">
				<button
					type="button"
					className="fc-filters-toggle"
					data-fc-filters-toggle="1"
					aria-expanded={open}
					aria-label={open ? lx("收起筛选", "Hide filters") : lx("展开筛选", "Show filters")}
					onClick={() => {
						fcFiltersOpen = !open;
						setOpen(!open);
					}}
				>
					<span className="fc-filters-sum">{label}</span>
					<span className="fc-filters-caret" aria-hidden="true">
						▾
					</span>
				</button>
				<div className="fc-prog">{progress}</div>
			</div>
		</div>
	);
}

export function CardsScopeFilter({
	weeks,
	week,
	day,
	chapter,
	onWeek,
	onDay,
	dayHasCards,
}: {
	weeks: CardScopeWeek[];
	week: number;
	day: number;
	chapter: boolean;
	onWeek: (week: number) => void;
	onDay: (day: number) => void;
	/** When given, days without any card (such as the weekly test on day 7) are left out. */
	dayHasCards?: (week: number, day: number) => boolean;
}) {
	const dayWeekN = week || (weeks.length === 1 ? weeks[0]?.n : 0);
	const days = (weeks.find((item) => item.n === dayWeekN)?.days || []).filter(
		(item) => !dayHasCards || item.day === day || dayHasCards(dayWeekN, item.day),
	);
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
	headerSummary,
	kindOptions,
	hint,
	emptyUnknown,
	emptyAll,
	defaultSkill = "all",
	translationPending = false,
	plainFlip = false,
	recallPrompt = true,
	resume,
}: {
	deckId: string;
	items: MemoryCardItem[];
	storageKey?: string;
	crumb?: ReactNode;
	header?: ReactNode;
	/** Labels for what `header` selects (week/day), for the collapsed filter row. */
	headerSummary?: string[];
	kindOptions?: MemoryKindOption[];
	hint?: string;
	emptyUnknown?: string;
	emptyAll?: string;
	defaultSkill?: SkillFilter;
	translationPending?: boolean;
	/** 错题本: one static face, with no flip transition or swipe grade. */
	plainFlip?: boolean;
	/** Front can show Chinese or English so the flip reveals the Japanese. On unless a deck opts out. */
	recallPrompt?: boolean;
	/** Remember and restore the position (index, order, filters) for this module/week/day. */
	resume?: { module: string; week: number; day: number };
}) {
	useSyncExternalStore(subscribeDisplay, getDisplayVersion, () => 0);
	const syncFlashcards = storageKey === FLASHCARD_MASTERY_KEY;
	const masteryVersion = useSyncExternalStore(
		syncFlashcards ? subscribeMastery : subscribeNothing,
		syncFlashcards ? getMasteryVersion : masteryVersionZero,
		masteryVersionZero,
	);
	const [localMastery, setLocalMastery] = useState<MasteryMap>(() =>
		syncFlashcards ? EMPTY_MASTERY : loadMastery(storageKey),
	);
	const flashMastery = useMemo(
		() => (syncFlashcards ? loadMastery(storageKey) : EMPTY_MASTERY),
		[syncFlashcards, storageKey, masteryVersion],
	);
	const mastery = syncFlashcards ? flashMastery : localMastery;
	const [saved] = useState<ResumePos | null>(() => (resume ? loadResumePos(resume.module, resume.week, resume.day) : null));
	const [kind, setKind] = useState(() => saved?.kind || "all");
	const [skill, setSkill] = useState<SkillFilter>(() =>
		saved?.skill === "known" || saved?.skill === "fuzzy" || saved?.skill === "blank" ? saved.skill : defaultSkill,
	);
	const [idx, setIdx] = useState(() => saved?.idx || 0);
	const [flipped, setFlipped] = useState(false);
	/** Shuffled card ids (null = book order). Ids, not indices, so a saved order survives data changes. */
	const [order, setOrder] = useState<string[] | null>(() => saved?.order || null);
	const [prompt, setPrompt] = useState<PromptSide>(() =>
		saved?.prompt === "cn" || saved?.prompt === "en" ? saved.prompt : "jp",
	);
	/** Until the deck first has cards, the saved position is not resolved and nothing is written. */
	const [restored, setRestored] = useState(!saved);
	const [hintIdx, setHintIdx] = useState<number | null>(null);

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

	const levelOf = (item: MemoryCardItem) => cardLevel(mastery, deckId, item.id);
	const filtered = useMemo(() => {
		return items.filter((item) => {
			if (kind !== "all" && item.kind !== kind) return false;
			if (skill !== "all" && levelOf(item) !== skill) return false;
			return true;
		});
	}, [items, kind, skill, mastery, deckId]);
	const levelCounts = useMemo(() => {
		const counts: Record<CardLevel, number> = { known: 0, fuzzy: 0, blank: 0 };
		for (const item of items) {
			if (kind !== "all" && item.kind !== kind) continue;
			counts[levelOf(item)] += 1;
		}
		return counts;
	}, [items, kind, mastery, deckId]);

	const deck = useMemo(() => (order ? applyResumeOrder(filtered, order, (item) => item.id) : filtered), [filtered, order]);

	const safeIdx = deck.length ? Math.min(idx, deck.length - 1) : 0;
	const cur = deck[safeIdx];

	useEffect(() => {
		if (restored || !deck.length) return;
		const next = resumeIndex(deck, saved, (item) => item.id);
		setIdx(next);
		setRestored(true);
		if (next > 0) setHintIdx(Math.min(next, deck.length - 1));
	}, [restored, deck, saved]);

	useEffect(() => {
		if (!resume || !restored) return;
		saveResume(resume.module, resume.week, resume.day, {
			idx: safeIdx,
			cardId: cur?.id,
			order: order || undefined,
			kind,
			skill,
			prompt,
		});
	}, [resume?.module, resume?.week, resume?.day, restored, safeIdx, cur?.id, order, kind, skill, prompt]);
	const level = cur ? levelOf(cur) : "known";
	const hasCn = useMemo(
		() => items.some((item) => Boolean(item.cn?.trim() || item.translation?.trim())),
		[items],
	);
	const hasEn = useMemo(() => items.some((item) => Boolean(item.en?.trim())), [items]);
	const promptSide: PromptSide = prompt === "cn" && hasCn ? "cn" : prompt === "en" && hasEn ? "en" : "jp";
	useDeckArrowKeys(
		() => {
			setIdx((n) => Math.max(0, n - 1));
			setFlipped(false);
		},
		() => {
			setIdx((n) => n + 1);
			setFlipped(false);
		},
	);
	const showPrompt = recallPrompt && (hasCn || hasEn);
	const promptOptions: { value: PromptSide; label: string }[] = [
		{ value: "jp", label: lx("看日语", "See Japanese") },
	];
	if (hasCn) promptOptions.push({ value: "cn", label: lx("看中文", "See Chinese") });
	if (hasEn) promptOptions.push({ value: "en", label: lx("看英文", "See English") });
	const face = cur ? recallFace(cur, promptSide) : null;
	const frontHint =
		promptSide === "jp"
			? hint || lx("回想读音和意思，点击翻面", "Recall the reading and meaning, then tap to flip")
			: lx("回想日语，点击翻面", "Recall the Japanese, then tap to flip");

	const resetDeck = (nextKind: string, nextSkill: SkillFilter) => {
		setKind(nextKind);
		setSkill(nextSkill);
		setIdx(0);
		setFlipped(false);
		setOrder(null);
	};

	const applyLevel = (nextLevel: CardLevel) => {
		if (!cur) return false;
		const next = setCardLevel(storageKey, mastery, deckId, cur.id, nextLevel);
		if (storageKey !== FLASHCARD_MASTERY_KEY) setLocalMastery(next);
		setFlipped(false);
		return skill !== "all" && nextLevel !== skill;
	};

	const swipe = (grade: SwipeGrade) => {
		if (!cur) return;
		const nextLevel: CardLevel = grade === "pass" ? "known" : grade === "fuzzy" ? "fuzzy" : "blank";
		const leaves = applyLevel(nextLevel);
		if (!leaves) setIdx((n) => n + 1);
	};

	let card: ReactNode;
	if (!deck.length) {
		card = (
			<div className="fcard">
				<div className="empty">
					{skill !== "all"
						? emptyUnknown || lx("这一档还没有卡片", "No cards at this level")
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
	} else {
		const front = (
			<MemoryCardFront
				cur={cur}
				hint={frontHint}
				level={level}
				face={face ? { text: face.text, missing: face.missing, side: promptSide } : undefined}
			/>
		);
		card = plainFlip ? (
			<div
				className="fcard is-instant"
				data-fcflip="1"
				tabIndex={0}
				onClick={() => setFlipped((value) => !value)}
				onKeyDown={(event) => {
					if (event.target !== event.currentTarget) return;
					if (event.key !== " " && event.key !== "Enter") return;
					event.preventDefault();
					setFlipped((value) => !value);
				}}
			>
				{flipped ? (
					<MemoryCardBack cur={cur} translationPending={translationPending} />
				) : (
					front
				)}
			</div>
		) : (
			<StudyFlip
				flipped={flipped}
				onFlip={() => setFlipped((value) => !value)}
				onGrade={(grade) => {
					const nextLevel: CardLevel = grade === "pass" ? "known" : grade === "fuzzy" ? "fuzzy" : "blank";
					applyLevel(nextLevel);
				}}
				onSwipe={swipe}
				front={front}
				back={<MemoryCardBack cur={cur} translationPending={translationPending} staggerReading />}
			/>
		);
	}

	return (
		<div className="fc-wrap">
			{crumb}
			<FcFilters
				summary={[
					...(headerSummary || []),
					derivedKinds.length && kind !== "all"
						? derivedKinds.find((option) => option.value === kind)?.label || ""
						: "",
					skill !== "all" ? levelLabel(skill) : "",
					noRuby ? lx("无注音", "No readings") : "",
					showPrompt ? promptOptions.find((option) => option.value === promptSide)?.label || "" : "",
				]}
				progress={deck.length ? <CountPair current={safeIdx + 1} total={deck.length} /> : ""}
			>
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
				<div className="fc-filter" data-fc-levels="1">
					{(
						[
							["all", lx("全部熟练度", "All levels"), levelCounts.known + levelCounts.fuzzy + levelCounts.blank],
							["known", levelLabel("known"), levelCounts.known],
							["fuzzy", levelLabel("fuzzy"), levelCounts.fuzzy],
							["blank", levelLabel("blank"), levelCounts.blank],
						] as const
					).map(([value, label, count]) => (
						<button key={value} type="button" className={skill === value ? "on" : ""} onClick={() => resetDeck(kind, value)}>
							{label} {count}
						</button>
					))}
					<button type="button" className={!noRuby ? "on" : ""} aria-pressed={!noRuby} onClick={() => toggleDisplay("ruby")}>
						{lx("注音", "Readings")}
					</button>
				</div>
				{showPrompt ? (
					<div className="fc-filter" data-fc-prompt="1">
						{promptOptions.map((option) => (
							<button
								key={option.value}
								type="button"
								className={promptSide === option.value ? "on" : ""}
								aria-pressed={promptSide === option.value}
								onClick={() => {
									if (option.value === prompt) return;
									setPrompt(option.value);
									setFlipped(false);
								}}
							>
								{option.label}
							</button>
						))}
					</div>
				) : null}
			</FcFilters>
			{hintIdx != null && hintIdx === safeIdx ? <ResumeHint scope={headerSummary || []} n={safeIdx + 1} /> : null}
			<Fragment key={cur ? (plainFlip ? `${deckId}-${kind}-${skill}-${safeIdx}` : `${deckId}-${kind}-${skill}-${cur.id}`) : `${deckId}-done`}>{card}</Fragment>
			<div className="fc-actions" data-fc-actions="1">
				{cur ? (
					<div className="review-skill">
						<button type="button" className={level === "blank" ? "on" : ""} onClick={() => applyLevel("blank")}>
							{levelLabel("blank")}
						</button>
						<button type="button" className={level === "fuzzy" ? "on" : ""} onClick={() => applyLevel("fuzzy")}>
							{levelLabel("fuzzy")}
						</button>
						<button type="button" className={level === "known" ? "on known" : ""} onClick={() => applyLevel("known")}>
							{levelLabel("known")}
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
							setOrder(shuffleOrder(filtered.length).map((i) => filtered[i].id));
							setIdx(0);
							setFlipped(false);
						}}
					>
						{lx("重新洗牌", "Shuffle")}
					</button>
				</div>
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
