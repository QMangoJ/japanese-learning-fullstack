import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

import { loadResumeScope, saveResume } from "./cards-resume";
import { CardsScopeFilter, MemoryCards, cardScopeSummary, type MemoryCardItem } from "./memory-cards";
import {
	cardsFromKanjiWeeks,
	cardsFromReadingWeeks,
	cardsFromVocabWeeks,
	loadListeningDeck,
} from "./memory-deck";
import { loadN2KanjiUsageLater, n2KanjiLaterLoaded, subscribeN2KanjiLater } from "./n2-kanji-word-usage";
import {
	MODULE,
	bootReadingSearch,
	cur,
	getVersion,
	homeScale,
	isKanji,
	isListening,
	isReading,
	isVocab,
	lx,
	moduleCardsScopeNow,
	readingSearchError,
	readingSearchLoaded,
	subscribe,
} from "./store";

/**
 * Week/day to open on. A lesson's own 「用记忆卡背这些词」 link (openModuleCards) wins;
 * otherwise reopen the scope remembered from last time, if it still exists.
 */
export function initialCardsScope(module: string, weeks: { n: number; days?: { day: number }[] }[]) {
	const explicit = moduleCardsScopeNow();
	if (explicit.week || explicit.day) return explicit;
	const saved = loadResumeScope(module);
	if (!saved || !saved.week) return { week: 0, day: 0 };
	const wk = weeks.find((item) => item.n === saved.week);
	if (!wk) return { week: 0, day: 0 };
	const day = saved.day && (wk.days || []).some((item) => item.day === saved.day) ? saved.day : 0;
	return { week: saved.week, day };
}

export function ModuleCardsPage() {
	useSyncExternalStore(subscribe, getVersion, () => 0);
	useSyncExternalStore(subscribeN2KanjiLater, n2KanjiLaterLoaded, () => false);
	const [scope] = useState(() => initialCardsScope(MODULE, cur().weeks || []));
	const [week, setWeek] = useState(scope.week);
	const [day, setDay] = useState(scope.day);

	useEffect(() => {
		saveResume(MODULE, week, day);
	}, [MODULE, week, day]);
	const [listeningItems, setListeningItems] = useState<MemoryCardItem[] | null>(null);
	const [listeningError, setListeningError] = useState("");

	useEffect(() => {
		if (MODULE === "n2kanji") void loadN2KanjiUsageLater();
	}, [MODULE]);

	useEffect(() => {
		if (isReading() && !readingSearchLoaded && !readingSearchError) void bootReadingSearch().catch(() => {});
	}, [MODULE, readingSearchLoaded, readingSearchError]);

	useEffect(() => {
		if (!isListening()) {
			setListeningItems(null);
			setListeningError("");
			return;
		}
		let cancelled = false;
		setListeningItems(null);
		setListeningError("");
		void loadListeningDeck(MODULE)
			.then((items) => {
				if (!cancelled) setListeningItems(items);
			})
			.catch(() => {
				if (!cancelled) setListeningError(lx("听解词汇加载失败，请稍后重试。", "Listening vocabulary failed to load. Please try again."));
			});
		return () => {
			cancelled = true;
		};
	}, [MODULE]);

	const laterReady = n2KanjiLaterLoaded();
	// Reading words arrive in a later bootReadingSearch() emit. Without readingSearchLoaded
	// the first render memoizes an empty catalog deck and the day row never appears.
	const allItems = useMemo(() => {
		if (isListening()) return listeningItems || [];
		const weeks = cur().weeks || [];
		if (isKanji()) return cardsFromKanjiWeeks(weeks, MODULE);
		if (isReading()) return cardsFromReadingWeeks(weeks, MODULE);
		if (isVocab()) return cardsFromVocabWeeks(weeks, MODULE);
		return [];
	}, [listeningItems, laterReady, MODULE, readingSearchLoaded]);

	const weeks = cur().weeks || [];
	const chapterScale = homeScale() === "chapter";
	const items = useMemo(
		() => allItems.filter((item) => (!week || item.week === week) && (!day || item.day === day)),
		[allItems, week, day],
	);

	if (isReading() && !readingSearchLoaded && !readingSearchError) {
		return <div className="empty">{lx("读解词汇加载中…", "Loading reading vocabulary…")}</div>;
	}
	if (isReading() && readingSearchError) {
		return <div className="empty">{lx("读解词汇加载失败，请返回后重试。", "Reading vocabulary failed to load. Please go back and try again.")}</div>;
	}
	if (isListening() && listeningError) return <div className="empty">{listeningError}</div>;
	if (isListening() && listeningItems == null) {
		return <div className="empty">{lx("听解词汇加载中…", "Loading listening vocabulary…")}</div>;
	}

	return (
		<MemoryCards
			key={`${MODULE}-${week}-${day}`}
			deckId={MODULE}
			items={items}
			resume={{ module: MODULE, week, day }}
			headerSummary={cardScopeSummary(weeks, week, day, chapterScale)}
			header={
				<CardsScopeFilter
					weeks={weeks}
					week={week}
					day={day}
					chapter={chapterScale}
					dayHasCards={(w, d) => allItems.some((item) => item.week === w && item.day === d)}
					onWeek={(next) => {
						setWeek(next);
						setDay(0);
					}}
					onDay={setDay}
				/>
			}
			emptyUnknown={lx("这些卡片都记住了 🎉", "You've mastered these cards 🎉")}
			emptyAll={
				day
					? lx("这一天还没有可刷的卡片", "No flashcards for this day yet")
					: lx("这个模块还没有可刷的卡片", "No flashcards in this module yet")
			}
		/>
	);
}
