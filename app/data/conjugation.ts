// 動詞・形容詞・名詞の活用まとめ
//
// Source: 《N3文法 新日语能力考试考前对策》「接続の表示方法」printed pp.9–10
// (佐々木仁子・松本紀子, 世界图书出版公司). The three conjugation tables and the
// 「表示の例」note are transcribed from the book; the sections marked
// `supplement: true` are added here because a usable 動詞変形まとめ needs the
// actual formation rules, which the book's reference table does not spell out.

export interface ConjRow {
	/** How the book writes it in explanations, e.g. 「Vない」. */
	notation: string;
	/** Grammatical name, e.g. 「ナイ形」. */
	form: string;
	formJa: string;
	formEn: string;
	formCn: string;
	/** One cell per column of the table. */
	cells: string[];
}

export interface ConjTable {
	id: string;
	title: string;
	titleKana?: string;
	titleEn: string;
	titleCn: string;
	/** Column headers after the first two label columns. */
	columns: { label: string; sub?: string }[];
	rows: ConjRow[];
	/** The 普通形 line printed under each table. */
	plainForm: { note: string; example: string; cn: string };
	intro?: { jp: string; cn: string }[];
	notes?: { jp: string; cn: string }[];
}

export const conjugationTables: ConjTable[] = [
	{
		id: "verb",
		title: "動詞",
		titleKana: "どうし",
		titleEn: "Verbs",
		titleCn: "动词",
		intro: [
			{
				jp: "{五段動詞|ごだんどうし}　V-u　〈グループⅠ{動詞|どうし}／-u verb〉　ex. {行|い}く／{読|よ}む",
				cn: "五段动词（Ⅰ类动词）　例：行く／読む",
			},
			{
				jp: "{一段動詞|いちだんどうし}　V-ru　〈グループⅡ{動詞|どうし}／-ru verb〉　ex. {見|み}る／{寝|ね}る",
				cn: "一段动词（Ⅱ类动词）　例：見る／寝る",
			},
			{
				jp: "{不規則動詞|ふきそくどうし}　V-irr.　〈グループⅢ{動詞|どうし}／irregular verb〉　ex. する／{来|く}る",
				cn: "不规则动词（Ⅲ类动词）　例：する／来る",
			},
		],
		columns: [
			{ label: "V-u", sub: "いく" },
			{ label: "V-ru", sub: "みる" },
			{ label: "V-irr", sub: "する" },
			{ label: "V-irr", sub: "くる" },
		],
		rows: [
			{
				notation: "Vる",
				form: "基本形／辞書形",
				formJa: "きほんけい／じしょけい",
				formEn: "non-past / dictionary form",
				formCn: "基本形（现在形）／辞书形（终止形）",
				cells: ["いく", "みる", "する", "くる"],
			},
			{
				notation: "Vない",
				form: "ナイ形",
				formJa: "ないけい（未然形）",
				formEn: "negative form",
				formCn: "ない形（未然形）",
				cells: ["いかない", "みない", "しない", "こない"],
			},
			{
				notation: "Vな〈い〉",
				form: "ナイ形の語幹",
				formJa: "ないけいのごかん",
				formEn: "negative stem (drop ない)",
				formCn: "ない形去掉「ない」的部分",
				cells: ["いか", "み", "し", "こ"],
			},
			{
				notation: "Vま〈す〉",
				form: "マス形",
				formJa: "ますけい（連用形）",
				formEn: "masu form (stem)",
				formCn: "ます形（连用形）去掉「ます」",
				cells: ["いき", "み", "し", "き"],
			},
			{
				notation: "Vて",
				form: "テ形",
				formJa: "てけい",
				formEn: "te form",
				formCn: "て形",
				cells: ["いって", "みて", "して", "きて"],
			},
			{
				notation: "Vた",
				form: "タ形",
				formJa: "たけい（過去形）",
				formEn: "past",
				formCn: "た形（过去形）",
				cells: ["いった", "みた", "した", "きた"],
			},
			{
				notation: "Vている",
				form: "テイル形",
				formJa: "ているけい",
				formEn: "teiru form",
				formCn: "ている形",
				cells: ["いっている", "みている", "している", "きている"],
			},
			{
				notation: "Vば",
				form: "バ形",
				formJa: "ばけい（仮定形）",
				formEn: "ba form",
				formCn: "ば形（假定形）",
				cells: ["いけば", "みれば", "すれば", "くれば"],
			},
			{
				notation: "Vよう",
				form: "意向形",
				formJa: "いこうけい",
				formEn: "volitional / tentative",
				formCn: "意志形",
				cells: ["いこう", "みよう", "しよう", "こよう"],
			},
			{
				notation: "Vれる",
				form: "可能形",
				formJa: "かのうけい",
				formEn: "potential",
				formCn: "可能形",
				cells: ["いける", "みられる", "できる", "こられる"],
			},
			{
				notation: "Vられる",
				form: "受身形",
				formJa: "うけみけい",
				formEn: "passive",
				formCn: "被动形",
				cells: ["いかれる", "みられる", "される", "こられる"],
			},
			{
				notation: "Vさせる",
				form: "使役形",
				formJa: "しえきけい",
				formEn: "causative",
				formCn: "使役形",
				cells: ["いかせる", "みさせる", "させる", "こさせる"],
			},
			{
				notation: "命令形",
				form: "命令形",
				formJa: "めいれいけい",
				formEn: "imperative",
				formCn: "命令形",
				cells: ["いけ", "みろ", "しろ", "こい"],
			},
		],
		plainForm: {
			note: "普通形（上記の辞書形／ナイ形／タ形）",
			example: "いく／いかない／いった／いかなかった　など",
			cn: "简体形＝上表的辞书形／ない形／た形（及其过去否定）",
		},
	},
	{
		id: "i-adj",
		title: "い形容詞",
		titleKana: "いけいようし",
		titleEn: "-i adjectives",
		titleCn: "い形容词〈形容词〉",
		columns: [
			{ label: "い形容詞", sub: "たかい" },
			{ label: "い形容詞", sub: "うつくしい" },
		],
		rows: [
			{
				notation: "Aくない",
				form: "ナイ形",
				formJa: "ないけい（未然形）",
				formEn: "negative form",
				formCn: "ない形（否定形）",
				cells: ["たかくない", "うつくしくない"],
			},
			{
				notation: "Aくて",
				form: "テ形",
				formJa: "てけい",
				formEn: "te form",
				formCn: "て形",
				cells: ["たかくて", "うつくしくて"],
			},
			{
				notation: "Aい",
				form: "辞書形／基本形",
				formJa: "じしょけい／きほんけい",
				formEn: "dictionary form / non-past",
				formCn: "辞书形（终止形）／基本形（现在形）",
				cells: ["たかい", "うつくしい"],
			},
			{
				notation: "Aかった",
				form: "タ形",
				formJa: "たけい（過去形）",
				formEn: "past",
				formCn: "た形（过去形）",
				cells: ["たかかった", "うつくしかった"],
			},
			{
				notation: "Aければ",
				form: "バ形",
				formJa: "ばけい（仮定形）",
				formEn: "ba form",
				formCn: "ば形（假定形）",
				cells: ["たかければ", "うつくしければ"],
			},
		],
		plainForm: {
			note: "普通形（上記の辞書形／ナイ形／タ形）",
			example: "たかい、たかくない、たかかった、たかくなかった　など",
			cn: "简体形：たかい／たかくない／たかかった／たかくなかった 等",
		},
	},
	{
		id: "na-adj",
		title: "な形容詞",
		titleKana: "なけいようし",
		titleEn: "-na adjectives",
		titleCn: "な形容词〈形容动词〉",
		columns: [{ label: "な形容詞", sub: "ひま" }],
		rows: [
			{
				notation: "na／na〈だ〉",
				form: "語幹",
				formJa: "ごかん",
				formEn: "root / stem",
				formCn: "词干",
				cells: ["ひま"],
			},
			{
				notation: "naな",
				form: "基本形",
				formJa: "きほんけい（現在形）",
				formEn: "non-past",
				formCn: "基本形（现在形）",
				cells: ["ひまな"],
			},
			{
				notation: "naでない",
				form: "ナイ形",
				formJa: "ないけい（未然形）",
				formEn: "negative form",
				formCn: "ない形（否定形）",
				cells: ["ひまじゃない／ひまではない"],
			},
			{
				notation: "naで",
				form: "テ形",
				formJa: "てけい",
				formEn: "te form",
				formCn: "て形",
				cells: ["ひまで"],
			},
			{
				notation: "naだ",
				form: "辞書形",
				formJa: "じしょけい（終止形）",
				formEn: "dictionary form",
				formCn: "辞书形（终止形）",
				cells: ["ひまだ"],
			},
			{
				notation: "naだった",
				form: "タ形",
				formJa: "たけい（過去形）",
				formEn: "past",
				formCn: "た形（过去形）",
				cells: ["ひまだった"],
			},
			{
				notation: "naなら",
				form: "バ形",
				formJa: "ばけい（仮定形）",
				formEn: "ba form",
				formCn: "ば形（假定形）",
				cells: ["ひまなら"],
			},
		],
		plainForm: {
			note: "普通形（上記の辞書形／ナイ形／タ形）",
			example: "ひまじゃない、ひまだ、ひまだった、ひまじゃなかった　など",
			cn: "简体形：ひまだ／ひまじゃない／ひまだった／ひまじゃなかった 等",
		},
	},
	{
		id: "noun",
		title: "名詞",
		titleKana: "めいし",
		titleEn: "Nouns",
		titleCn: "名词",
		intro: [
			{
				jp: "※{接続|せつぞく}を{解説|かいせつ}するために、{名詞|めいし}は{名詞|めいし}に{助動詞|じょどうし}「だ」や{助詞|じょし}「の」を{付|つ}けた{形|かたち}で{示|しめ}しています。",
				cn: "※为了说明接续方式，名词以加上助动词「だ」或助词「の」的形式来标示。",
			},
		],
		columns: [{ label: "名詞", sub: "あめ" }],
		rows: [
			{
				notation: "N／N〈だ〉／N〈する〉",
				form: "語幹",
				formJa: "ごかん",
				formEn: "root / stem",
				formCn: "词干　※Nする＝サ变名词（例：勉強、説明）",
				cells: ["あめ"],
			},
			{
				notation: "Nの",
				form: "基本形",
				formJa: "きほんけい（現在形）",
				formEn: "non-past",
				formCn: "基本形（现在形）",
				cells: ["あめの"],
			},
			{
				notation: "Nでない",
				form: "ナイ形",
				formJa: "ないけい（未然形）",
				formEn: "negative form",
				formCn: "ない形（否定形）",
				cells: ["あめじゃない／あめではない"],
			},
			{
				notation: "Nで",
				form: "テ形",
				formJa: "てけい",
				formEn: "te form",
				formCn: "て形",
				cells: ["あめで"],
			},
			{
				notation: "Nだ",
				form: "辞書形",
				formJa: "じしょけい（終止形）",
				formEn: "dictionary form",
				formCn: "辞书形（终止形）",
				cells: ["あめだ"],
			},
			{
				notation: "Nだった",
				form: "タ形",
				formJa: "たけい（過去形）",
				formEn: "past",
				formCn: "た形（过去形）",
				cells: ["あめだった"],
			},
			{
				notation: "Nなら",
				form: "バ形",
				formJa: "ばけい（仮定形）",
				formEn: "ba form",
				formCn: "ば形（假定形）",
				cells: ["あめなら"],
			},
		],
		plainForm: {
			note: "普通形（上記の辞書形／ナイ形／タ形）",
			example: "あめだ、あめじゃない、あめだった、あめじゃなかった　など",
			cn: "简体形：あめだ／あめじゃない／あめだった／あめじゃなかった 等",
		},
	},
];

/** 「表示の例」— the book's worked example of how a pattern attaches to each word class. */
export const attachmentExample = {
	rule: "V／A／Na／N ＋ せいで",
	ruleNote: "Na〈だ〉なせいで／N〈だ〉のせいで",
	ok: [
		"するせいで／しないせいで／したせいで",
		"高いせいで／高くないせいで",
		"高かったせいで／高くなかったせいで",
		"ひまなせいで／ひまじゃないせいで",
		"ひまだったせいで／ひまじゃなかったせいで",
		"雨のせいで／雨じゃないせいで",
		"雨だったせいで／雨じゃなかったせいで　など",
	],
	ng: ["ひまだせいで", "雨だせいで"],
	explanation:
		"这类表达接在动词、い形容词、な形容词、名词的**简体形**之后；但名词不是「名詞＋だ」而是「名詞＋の」，な形容词不是「な形容詞語幹＋だ」而是「な形容詞語幹＋な」。",
	explanationEn:
		"These expressions come after the plain form of verbs, i-adjectives, na-adjectives and nouns. With nouns, it is preceded by の (not だ); with na-adjectives it is preceded by な (not だ).",
};

/* ------------------------------------------------------------------ *
 * Supplement — the formation rules the reference table assumes you know.
 * ------------------------------------------------------------------ */

export interface RuleGroup {
	id: string;
	title: string;
	titleCn: string;
	note?: string;
	rows: { pattern: string; result: string; examples: string }[];
	supplement: true;
}

export const formationRules: RuleGroup[] = [
	{
		id: "godan-te",
		title: "五段動詞のテ形・タ形（音便）",
		titleCn: "Ⅰ类动词的て形・た形（音便规则）",
		note: "テ形が作れれば、「て」を「た」に変えるだけでタ形になります。",
		supplement: true,
		rows: [
			{ pattern: "〜う／〜つ／〜る", result: "→ って／った", examples: "買う→買って　待つ→待って　取る→取って" },
			{ pattern: "〜む／〜ぶ／〜ぬ", result: "→ んで／んだ", examples: "読む→読んで　遊ぶ→遊んで　死ぬ→死んで" },
			{ pattern: "〜く", result: "→ いて／いた", examples: "書く→書いて　※行く→行って（例外）" },
			{ pattern: "〜ぐ", result: "→ いで／いだ", examples: "泳ぐ→泳いで　急ぐ→急いで" },
			{ pattern: "〜す", result: "→ して／した", examples: "話す→話して　貸す→貸して" },
		],
	},
	{
		id: "godan-stem",
		title: "五段動詞の語幹の変化（あ・い・う・え・お段）",
		titleCn: "Ⅰ类动词词尾在五段上的变化",
		note: "「書く」を例にすると、ない形＝か段、ます形＝き段、辞書形＝く段、ば形・可能形＝け段、意向形＝こ段。",
		supplement: true,
		rows: [
			{ pattern: "ア段 ＋ ない", result: "ナイ形・受身・使役の土台", examples: "書かない／書かれる／書かせる" },
			{ pattern: "イ段 ＋ ます", result: "マス形", examples: "書きます" },
			{ pattern: "ウ段", result: "辞書形", examples: "書く" },
			{ pattern: "エ段 ＋ ば／る", result: "バ形・可能形・命令形", examples: "書けば／書ける／書け" },
			{ pattern: "オ段 ＋ う", result: "意向形", examples: "書こう" },
		],
	},
	{
		id: "ichidan",
		title: "一段動詞・不規則動詞",
		titleCn: "Ⅱ类动词与Ⅲ类动词",
		note: "一段動詞は「る」を取って各形をつけるだけ。不規則動詞は2つしかないので丸暗記。",
		supplement: true,
		rows: [
			{ pattern: "一段：る を取る", result: "＋ない／ます／て／た／れば／よう／られる／させる", examples: "見る→見ない・見ます・見て・見た・見れば・見よう" },
			{ pattern: "する", result: "しない・します・して・した・すれば・しよう", examples: "可能：できる／受身：される／使役：させる／命令：しろ" },
			{ pattern: "来る", result: "こない・きます・きて・きた・くれば・こよう", examples: "可能：こられる／受身：こられる／使役：こさせる／命令：こい" },
		],
	},
	{
		id: "combined",
		title: "組み合わせ形（読解でよく出る）",
		titleCn: "复合形式（读解中的高频形）",
		note: "第5週で学んだ「〜させられる（使役受身）」もここに含まれます。",
		supplement: true,
		rows: [
			{ pattern: "使役 ＋ 受身", result: "〜（さ）せられる／〜される", examples: "おごらされる（被迫请客）　待たされる（被迫等）" },
			{ pattern: "受身 ＋ ている", result: "〜（ら）れている", examples: "書かれている（写着）" },
			{ pattern: "可能 ＋ ない", result: "〜えない／〜られない", examples: "行けない　見られない　できない　こられない" },
			{ pattern: "使役 ＋ てください", result: "〜（さ）せてください", examples: "帰らせてください（请让我回去）" },
			{ pattern: "使役 ＋ ていただけませんか", result: "〜（さ）せていただけませんか", examples: "使わせていただけませんか（第3週6日目）" },
		],
	},
];
