import { useEffect, useMemo, useState } from "react";

import { MemoryCards, type MemoryCardItem } from "./memory-cards";
import { annotateText, kanaFromRuby } from "./memory-deck";
import {
	MAX_TRANSLATION_TEXTS,
	MISTAKE_TRANSLATION_ENDPOINT,
	mistakeStudyParts,
	mistakeTranslationSource,
	type TranslationMap,
} from "./mistake-translations";
import { lx, setMistakeStudy } from "./store";

export const MISTAKE_MASTERY_KEY = "mistake-book-mastery";
export const MISTAKE_DECK_ID = "mistakes";
export const MISTAKE_TRANSLATION_CACHE_KEY = "mistake-translations";

export { mistakeStudyParts, mistakeTranslationSource };

function kanaAnswer(cn: string): string | undefined {
	const kana = cn.replace(/[\s・]+/g, "");
	return kana && /^[\u3040-\u30ffー]+$/.test(kana) ? kana : undefined;
}

/** A short headword whose correct answer is its reading, not a sentence. */
function answerIsReading(jp: string, reading: string): boolean {
	if (!/[一-龯]/.test(jp) || jp.length > 18 || jp.length < 1) return false;
	if (/[のをにはがとでもへ。！？：:＝=\n（(]/.test(jp)) return false;
	return reading.length >= jp.replace(/[ぁ-んァ-ンー]/g, "").length;
}

function annotated(jp: string, reading?: string): { html?: string; reading?: string } {
	const html = reading ? annotateText(jp, { reading, readings: {} }) : annotateText(jp);
	if (!html) return {};
	const kana = kanaFromRuby(html, reading, jp);
	if (!kana || kana === reading) return { html };
	return { html, reading: kana };
}

export function cardsFromMistakes(
	list: { id: string; type?: string; text?: string }[],
	translations: TranslationMap = {},
): MemoryCardItem[] {
	return list.map((m) => {
		const { jp, cn } = mistakeStudyParts(m);
		const translation = translations[mistakeTranslationSource(m)];
		const spoken = kanaAnswer(cn);
		const asReading = spoken && answerIsReading(jp, spoken) ? spoken : undefined;
		const ruby = annotated(jp, asReading);
		const cnHtml = cn && /[ぁ-んァ-ン]/.test(cn) && /[一-龯]/.test(cn) ? annotateText(cn) : undefined;
		const reading = ruby.reading && ruby.reading !== spoken ? ruby.reading : undefined;
		return {
			id: m.id,
			jp,
			...(ruby.html ? { jpHtml: ruby.html } : {}),
			...(reading ? { reading } : {}),
			cn: cn || undefined,
			...(cnHtml ? { cnHtml } : {}),
			...(translation ? { translation } : {}),
			kind: m.type || "q",
		};
	});
}

function loadCache(): TranslationMap {
	try {
		const raw = localStorage.getItem(MISTAKE_TRANSLATION_CACHE_KEY);
		const parsed: unknown = raw ? JSON.parse(raw) : {};
		return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? (parsed as TranslationMap) : {};
	} catch {
		return {};
	}
}

function saveCache(cache: TranslationMap, keep: string[]) {
	const pruned: TranslationMap = {};
	for (const key of keep) if (cache[key]) pruned[key] = cache[key];
	try {
		localStorage.setItem(MISTAKE_TRANSLATION_CACHE_KEY, JSON.stringify(pruned));
	} catch {
		/* ignore quota / private mode */
	}
}

/** Chinese translations for the notebook, cached locally and in KV. */
export function useMistakeTranslations(list: { text?: string }[]) {
	const sources = useMemo(() => [...new Set(list.map(mistakeTranslationSource).filter(Boolean))], [list]);
	const sourceKey = sources.join("\u0000");
	const [translations, setTranslations] = useState<TranslationMap>(() => loadCache());
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const cache = loadCache();
		const missing = sources.filter((s) => !cache[s]).slice(0, MAX_TRANSLATION_TEXTS);
		if (!missing.length) {
			setTranslations(cache);
			return;
		}
		let cancelled = false;
		setLoading(true);
		fetch(MISTAKE_TRANSLATION_ENDPOINT, {
			method: "POST",
			headers: { "content-type": "application/json" },
			credentials: "same-origin",
			body: JSON.stringify({ texts: missing }),
		})
			.then((res) => (res.ok ? (res.json() as Promise<{ translations?: TranslationMap }>) : null))
			.then((data: { translations?: TranslationMap } | null) => {
				if (cancelled) return;
				const next = { ...cache, ...(data?.translations || {}) };
				saveCache(next, sources);
				setTranslations(next);
			})
			.catch(() => {
				/* offline: show cards without translations */
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});
		return () => {
			cancelled = true;
		};
		// sourceKey captures the list contents.
	}, [sourceKey]);

	return { translations, loading };
}

export function MistakesMemoryCards({
	list,
}: {
	list: { id: string; type?: string; text?: string }[];
}) {
	const { translations, loading } = useMistakeTranslations(list);
	const items = cardsFromMistakes(list, translations);
	return (
		<MemoryCards
			deckId={MISTAKE_DECK_ID}
			storageKey={MISTAKE_MASTERY_KEY}
			items={items}
			translationPending={loading}
			crumb={
				<div className="crumb">
					<button type="button" className="crumb-home" data-mstudy-back="1" onClick={() => setMistakeStudy(false)}>
						{lx("错题本", "Mistakes")}
					</button>
					<span className="crumb-sep">›</span>
					<span>{lx("背诵", "Recite")}</span>
				</div>
			}
			kindOptions={[
				{ value: "all", label: lx("全部", "All") },
				{ value: "word", label: lx("单词", "Words") },
				{ value: "grammar", label: lx("语法", "Grammar") },
				{ value: "q", label: lx("错题", "Mistakes") },
			]}
			hint={lx("回想读音和意思，点击翻面", "Recall the reading and meaning, then tap to flip")}
			emptyUnknown={lx("这些错题都记住了 🎉", "You've mastered these mistakes 🎉")}
			emptyAll={lx("还没有可刷的错题", "No mistakes to study yet")}
		/>
	);
}
