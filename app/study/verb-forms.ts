export type VerbGroup = "I" | "II" | "III";

export type VerbForms = {
	masu: string;
	nai: string;
	te: string;
	ta: string;
	potential: string;
	volitional: string;
	ba: string;
	imperative: string;
	passive: string;
	causative: string;
};

type GodanRow = {
	a: string;
	i: string;
	e: string;
	o: string;
	te: string;
	ta: string;
};

const GODAN: Record<string, GodanRow> = {
	う: { a: "わ", i: "い", e: "え", o: "お", te: "って", ta: "った" },
	く: { a: "か", i: "き", e: "け", o: "こ", te: "いて", ta: "いた" },
	ぐ: { a: "が", i: "ぎ", e: "げ", o: "ご", te: "いで", ta: "いだ" },
	す: { a: "さ", i: "し", e: "せ", o: "そ", te: "して", ta: "した" },
	つ: { a: "た", i: "ち", e: "て", o: "と", te: "って", ta: "った" },
	ぬ: { a: "な", i: "に", e: "ね", o: "の", te: "んで", ta: "んだ" },
	ぶ: { a: "ば", i: "び", e: "べ", o: "ぼ", te: "んで", ta: "んだ" },
	む: { a: "ま", i: "み", e: "め", o: "も", te: "んで", ta: "んだ" },
	る: { a: "ら", i: "り", e: "れ", o: "ろ", te: "って", ta: "った" },
};

export const VERB_SUMMARY_GROUPS = {
	一类: "I",
	二类: "II",
	三类: "III",
} as const satisfies Record<string, VerbGroup>;

export const EXTRA_FORM_FIELDS = [
	{ key: "nai", label_cn: "ない形", label_en: "Nai" },
	{ key: "ta", label_cn: "た形", label_en: "Ta" },
	{ key: "ba", label_cn: "ば形", label_en: "Ba" },
	{ key: "imperative", label_cn: "命令形", label_en: "Imperative" },
	{ key: "passive", label_cn: "受身形", label_en: "Passive" },
	{ key: "causative", label_cn: "使役形", label_en: "Causative" },
] as const satisfies ReadonlyArray<{ key: keyof VerbForms; label_cn: string; label_en: string }>;

function godan(word: string, reading: string): VerbForms {
	const end = word.slice(-1);
	const row = GODAN[end];
	if (!row) throw new Error(`not a group I ending: ${word}`);
	const stem = word.slice(0, -1);
	const iku = reading === "いく" || word === "行く" || word === "いく";
	return {
		masu: stem + row.i + "ます",
		nai: stem + row.a + "ない",
		te: stem + (iku ? "って" : row.te),
		ta: stem + (iku ? "った" : row.ta),
		potential: stem + row.e + "る",
		volitional: stem + row.o + "う",
		ba: stem + row.e + "ば",
		imperative: stem + row.e,
		passive: stem + row.a + "れる",
		causative: stem + row.a + "せる",
	};
}

function ichidan(word: string): VerbForms {
	if (!word.endsWith("る")) throw new Error(`not a group II verb: ${word}`);
	const stem = word.slice(0, -1);
	return {
		masu: stem + "ます",
		nai: stem + "ない",
		te: stem + "て",
		ta: stem + "た",
		potential: stem + "られる",
		volitional: stem + "よう",
		ba: stem + "れば",
		imperative: stem + "ろ",
		passive: stem + "られる",
		causative: stem + "させる",
	};
}

function suru(dict: string): VerbForms {
	const prefix = dict.endsWith("する") ? dict.slice(0, -2) : "";
	return {
		masu: prefix + "します",
		nai: prefix + "しない",
		te: prefix + "して",
		ta: prefix + "した",
		potential: prefix + "できる",
		volitional: prefix + "しよう",
		ba: prefix + "すれば",
		imperative: prefix + "しろ",
		passive: prefix + "される",
		causative: prefix + "させる",
	};
}

function kuru(dict: string): VerbForms {
	const prefix = dict.endsWith("来る") || dict.endsWith("くる") ? dict.slice(0, -2) : "";
	return {
		masu: prefix + "きます",
		nai: prefix + "こない",
		te: prefix + "きて",
		ta: prefix + "きた",
		potential: prefix + "こられる",
		volitional: prefix === "" && dict === "来る" ? "来よう" : prefix + "こよう",
		ba: prefix + "くれば",
		imperative: prefix + "こい",
		passive: prefix + "こられる",
		causative: prefix + "こさせる",
	};
}

export function conjugateVerb(dict: string, reading: string, group: VerbGroup): VerbForms {
	if (group === "III") {
		if (reading.endsWith("くる")) return kuru(dict);
		if (reading.endsWith("する")) return suru(dict);
		throw new Error(`group III verb is not する or くる: ${dict}`);
	}
	if (group === "II") return ichidan(dict);
	return godan(dict, reading);
}

export function verbSummaryGroup(name: string): VerbGroup {
	if (name === "一类" || name === "二类" || name === "三类") return VERB_SUMMARY_GROUPS[name];
	throw new Error(`unknown verb group: ${name}`);
}
