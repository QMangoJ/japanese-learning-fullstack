import { useEffect, useState } from "react";

/*
 * The 「相似表达」 furigana lookup (app/data/similar-furigana.ts, generated) is ~16 KiB gzip, so it is
 * loaded as its own chunk instead of growing the initial /study bundle. Until it arrives, the plain
 * Japanese text is shown; the module is cached after the first load.
 */
type Lookup = Readonly<Record<string, string>>;
let loaded: Lookup | null = null;
let pending: Promise<Lookup> | null = null;

export function loadSimilarFurigana() {
	pending ??= import("./similar-furigana").then((module) => (loaded = module.SIMILAR_FURIGANA));
	return pending;
}

/** Returns text → ruby HTML (or the text itself while loading / for kana-only text). */
export function useSimilarFurigana() {
	const [lookup, setLookup] = useState<Lookup | null>(loaded);
	useEffect(() => {
		if (lookup) return;
		let live = true;
		loadSimilarFurigana().then((value) => live && setLookup(value), () => {});
		return () => {
			live = false;
		};
	}, [lookup]);
	return (text: string) => lookup?.[text] ?? text;
}

/**
 * Runs `translate` only on the plain-text parts of ruby HTML, so English labels can replace
 * Chinese notes like （样态） without touching the <ruby> markup or its readings.
 */
export function translateOutsideRuby(html: string, translate: (text: string) => string) {
	return html.split(/(<ruby>[^<]*<rt>[^<]*<\/rt><\/ruby>)/).map((part, index) => (index % 2 ? part : translate(part))).join("");
}
