import { N2_KANJI_USAGE, type UsageSpec } from "../data/n2-kanji-usage";
import { getReviewedKanjiWordUsage, type KanjiWord, type KanjiWordUsage } from "./kanji-word-usage";

const POS = {
	v: ["动词", "Verb"], i: ["い形容词", "い-adjective"], na: ["な形容词", "な-adjective"],
	adv: ["副词", "Adverb"], expr: ["表达", "Expression"], suru: ["名词・する动词", "Noun / する verb"],
} as const;

let later: Record<string, UsageSpec> | undefined;
let laterPromise: Promise<Record<string, UsageSpec>> | undefined;
const listeners = new Set<() => void>();

export function n2KanjiLaterLoaded() {
	return Boolean(later);
}

export function subscribeN2KanjiLater(onStoreChange: () => void) {
	listeners.add(onStoreChange);
	return () => { listeners.delete(onStoreChange); };
}

export function loadN2KanjiUsageLater() {
	laterPromise ??= import("../data/n2-kanji-usage-later").then((module) => {
		later = module.N2_KANJI_USAGE_LATER;
		for (const listener of listeners) listener();
		return later;
	});
	return laterPromise;
}

export function getN2KanjiWordUsage(word: KanjiWord): KanjiWordUsage | null {
	const spec = later?.[`${word.jp}|${word.reading}`] || later?.[word.jp]
		|| N2_KANJI_USAGE[`${word.jp}|${word.reading}`] || N2_KANJI_USAGE[word.jp];
	if (!spec) return getReviewedKanjiWordUsage(word);
	const [jp, exampleCn, exampleEn, pos, reading] = spec;
	const match = /^(.*?)【([^【】]+)】([^【】]*)$/.exec(jp);
	if (!match) return null;
	const [posCn, posEn] = pos ? POS[pos] : ["名词", "Noun"];
	return { before: match[1], focus: match[2], after: match[3], focusReading: reading || word.reading, exampleCn, exampleEn, posCn, posEn };
}
