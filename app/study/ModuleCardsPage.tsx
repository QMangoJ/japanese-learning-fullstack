import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

import { CardsScopeFilter, MemoryCards, type MemoryCardItem } from "./memory-cards";
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
	readingSearchError,
	readingSearchLoaded,
	subscribe,
} from "./store";

export function ModuleCardsPage() {
	useSyncExternalStore(subscribe, getVersion, () => 0);
	useSyncExternalStore(subscribeN2KanjiLater, n2KanjiLaterLoaded, () => false);
	const [week, setWeek] = useState(0);
	const [day, setDay] = useState(0);
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
	const allItems = useMemo(() => {
		if (isListening()) return listeningItems || [];
		const weeks = cur().weeks || [];
		if (isKanji()) return cardsFromKanjiWeeks(weeks, MODULE);
		if (isReading()) return cardsFromReadingWeeks(weeks, MODULE);
		if (isVocab()) return cardsFromVocabWeeks(weeks, MODULE);
		return [];
	}, [listeningItems, laterReady, MODULE]);

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
			header={
				<CardsScopeFilter
					weeks={weeks}
					week={week}
					day={day}
					chapter={chapterScale}
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
