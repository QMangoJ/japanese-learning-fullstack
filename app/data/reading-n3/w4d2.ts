import type { ReadingDay } from "./types";

// 第4週 2日目 グラフ① — printed pages 62–63

/** Redraws one of the four printed bar charts (単位：兆円, 0–12 scale). */
function tradeChart(
	label: string,
	rows: { country: string; imp: number; exp: number }[],
): string {
	const left = 44;
	const right = 288;
	const span = right - left;
	const scale = (value: number) => left + (value / 12) * span;
	const groupHeight = 34;
	const top = 16;
	const height = top + rows.length * groupHeight + 26;

	const bars = rows
		.map((row, index) => {
			const y = top + index * groupHeight;
			return `
    <text x="${left - 6}" y="${y + 17}" text-anchor="end" font-size="9">${row.country}</text>
    <rect x="${left}" y="${y + 2}" width="${scale(row.imp) - left}" height="10" fill="currentColor"/>
    <rect x="${left}" y="${y + 14}" width="${scale(row.exp) - left}" height="10" fill="none" stroke="currentColor" stroke-width="1"/>`;
		})
		.join("");

	const ticks = [0, 2, 4, 6, 8, 10, 12]
		.map((value) => {
			const x = scale(value);
			const y = top + rows.length * groupHeight;
			return `
    <line x1="${x}" y1="${y}" x2="${x}" y2="${y + 4}" stroke="currentColor" stroke-width="0.8"/>
    <text x="${x}" y="${y + 15}" text-anchor="middle" font-size="8">${value}</text>`;
		})
		.join("");

	const axisY = top + rows.length * groupHeight;
	return `<svg viewBox="0 0 300 ${height}" role="img" aria-label="グラフ${label}">
  <text x="4" y="11" font-size="11" font-weight="700">${label}</text>
  <g>${bars}</g>
  <line x1="${left}" y1="${axisY}" x2="${right}" y2="${axisY}" stroke="currentColor" stroke-width="1"/>
  <g>${ticks}</g>
  <text x="${right}" y="${axisY + 24}" text-anchor="end" font-size="8">（兆円）</text>
</svg>`;
}

const rowsCorrect = [
	{ country: "韓国", imp: 2.2, exp: 3.8 },
	{ country: "中国", imp: 11.4, exp: 10.2 },
	{ country: "EU", imp: 5.0, exp: 6.5 },
	{ country: "米国", imp: 5.9, exp: 8.7 },
];

// 2 — every partner shows imports above exports.
const rowsAllImport = [
	{ country: "韓国", imp: 3.8, exp: 2.2 },
	{ country: "中国", imp: 11.4, exp: 10.2 },
	{ country: "EU", imp: 6.5, exp: 5.0 },
	{ country: "米国", imp: 8.7, exp: 5.9 },
];

// 3 — the United States, not China, tops both columns.
const rowsUsTop = [
	{ country: "韓国", imp: 2.2, exp: 3.8 },
	{ country: "中国", imp: 7.0, exp: 8.5 },
	{ country: "EU", imp: 5.0, exp: 6.5 },
	{ country: "米国", imp: 11.4, exp: 10.2 },
];

// 4 — China's exports exceed its imports.
const rowsChinaExport = [
	{ country: "韓国", imp: 2.2, exp: 3.8 },
	{ country: "中国", imp: 10.2, exp: 11.4 },
	{ country: "EU", imp: 5.0, exp: 6.5 },
	{ country: "米国", imp: 5.9, exp: 8.7 },
];

export const w4d2: ReadingDay = {
	week: 4,
	day: 2,
	label: "グラフ①",
	labelEn: "Graph ①",
	printedPages: [62, 63],
	answerSource: "book",

	point: {
		title: "グラフの{説明|せつめい}によく{出|で}てくる{言葉|ことば}を{覚|おぼ}えよう！①",
		titleCn: "记住图表说明中经常出现的词汇！①",
		titleEn: "Let's learn some expressions that are commonly used as labels on graphs! ①",
		figure: {
			alt: "右上がりの線グラフに「体重が急激に増えました。」、右下がりの線グラフに「体重が徐々に減りました。」という説明がついたイラスト",
			cn: "向右上升的折线图配文「体重急剧增加了」；向右下降的折线图配文「体重渐渐减少了」。",
		},
		tips: [
			{
				jp: "「どう{変|か}わったか（{増|ふ}えた・{減|へ}った）」と「どのくらいの{速|はや}さで{変|か}わったか（{急激|きゅうげき}に・{徐々|じょじょ}に）」を{分|わ}けて{読|よ}み{取|と}ろう。",
				cn: "把「怎么变的（增加还是减少）」和「变化的速度（急剧还是渐渐）」分开来读——图表题基本就考这两点。",
			},
		],
		expressions: [
			{ jp: "増える／増加する", kana: "ふえる／ぞうかする", cn: "增加", en: "to increase" },
			{ jp: "減る／減少する", kana: "へる／げんしょうする", cn: "减少", en: "to decrease" },
			{ jp: "徐々に", kana: "じょじょに", cn: "渐渐地、慢慢地", en: "gradually" },
			{ jp: "急激に", kana: "きゅうげきに", cn: "急剧地", en: "suddenly / rapidly" },
			{ jp: "伸び", kana: "のび", cn: "增长、增幅", en: "an increase / growth" },
			{ jp: "（〜％／〜円など）に達する", kana: "たっする", cn: "达到（〜％／〜日元等）", en: "to reach … % / yen" },
			{ jp: "一定", kana: "いってい", cn: "一定、保持不变", en: "constant (remains the same)" },
			{ jp: "〜のみ", cn: "只有〜（＝だけ）", en: "only" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		blocks: [
			{
				type: "speech",
				speaker: "Aさん",
				speakerCn: "A",
				jp: "{日本|にほん}の{輸入額|ゆにゅうがく}（※1）、51{兆円|ちょうえん}（※2）もあるそうです。",
				cn: "听说日本的进口额高达 51 万亿日元呢。",
			},
			{
				type: "speech",
				speaker: "Bさん",
				speakerCn: "B",
				jp: "いろいろなものを{輸入|ゆにゅう}していますからね。やっぱり、アメリカからの{輸入|ゆにゅう}がいちばん{多|おお}いんでしょうね。",
				cn: "毕竟进口的东西五花八门嘛。果然还是从美国进口的最多吧。",
			},
			{
				type: "speech",
				speaker: "Aさん",
				speakerCn: "A",
				jp: "いえいえ、それが{最近|さいきん}では{中国|ちゅうごく}がトップですよ。2008{年|ねん}までは{輸入|ゆにゅう}はともかく{輸出|ゆしゅつ}（※3）はアメリカが{一番|いちばん}だったんですが、それも{中国|ちゅうごく}で。{我|わ}が{国|くに}は、{中国|ちゅうごく}については{輸出|ゆしゅつ}より{輸入|ゆにゅう}のほうが{多|おお}いんですよ。",
				cn: "不不，最近是中国排第一哦。到 2008 年为止，进口先不说，出口一直是美国第一，可现在出口也是中国了。我国对中国是进口比出口多呢。",
			},
		],
		footnotes: [
			{ marker: "※1", term: "輸入額", jp: "import (monetary value)", cn: "进口额" },
			{ marker: "※2", term: "51兆円", jp: "＝51,000,000,000,000円", cn: "＝51 万亿日元" },
			{ marker: "※3", term: "輸出", jp: "an export", cn: "出口" },
		],
		choices: [
			{ jp: "{日本|にほん}で{最|もっと}も{輸出額|ゆしゅつがく}が{多|おお}いのは、アメリカである。", cn: "日本出口额最多的对象国是美国。" },
			{ jp: "{日本|にほん}で{最|もっと}も{輸入額|ゆにゅうがく}が{多|おお}いのは、アメリカである。", cn: "日本进口额最多的对象国是美国。" },
			{ jp: "{日本|にほん}で{最|もっと}も{輸出額|ゆしゅつがく}が{多|おお}いのは、{中国|ちゅうごく}である。", cn: "日本出口额最多的对象国是中国。" },
			{ jp: "{日本|にほん}の{中国|ちゅうごく}への{輸出額|ゆしゅつがく}は{輸入額|ゆにゅうがく}より{多|おお}い。", cn: "日本对中国的出口额比进口额多。" },
			{ jp: "{日本|にほん}の{中国|ちゅうごく}への{輸出額|ゆしゅつがく}は{輸入額|ゆにゅうがく}より{少|すく}ない。", cn: "日本对中国的出口额比进口额少。" },
		],
		answers: [3, 5],
		hint: {
			jp: "「2008{年|ねん}までは……アメリカが{一番|いちばん}だった」＝{今|いま}は{違|ちが}う。「{輸出|ゆしゅつ}より{輸入|ゆにゅう}のほうが{多|おお}い」＝{輸出|ゆしゅつ}のほうが{少|すく}ない。",
			cn: "「到 2008 年为止是美国第一」意味着现在已经不是了；「輸出より輸入のほうが多い」换个说法就是「輸出は輸入より少ない」。",
		},
	},

	mondai: {
		instruction:
			"{次|つぎ}の{文章|ぶんしょう}は、{日本|にほん}の{輸出額|ゆしゅつがく}と{輸入額|ゆにゅうがく}について{述|の}べたものである。{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "下面这篇文章讲述的是日本的出口额与进口额。阅读后回答后面的问题。（答案在别册 p.5）",
		blocks: [
			{
				type: "paragraph",
				jp: "{日本|にほん}の{主|おも}な{貿易相手国|ぼうえきあいてこく}＊は、アメリカ{合衆国|がっしゅうこく}、EU（※）、{中国|ちゅうごく}、{韓国|かんこく}です。{輸入額|ゆにゅうがく}・{輸出額|ゆしゅつがく}とも{中国|ちゅうごく}がトップであり、{輸入額|ゆにゅうがく}は11.4{兆円|ちょうえん}に{達|たっ}しています＊＊。アメリカ・EUはその{約半分|やくはんぶん}です。{輸出額|ゆしゅつがく}では{中国|ちゅうごく}とアメリカの{差|さ}はさほど{大|おお}きくありませんが、EUは{中国|ちゅうごく}の{約|やく}3{分|ぶん}の2、{韓国|かんこく}は{半分以下|はんぶんいか}です。ほとんどの{国|くに}は{輸入額|ゆにゅうがく}より{輸出額|ゆしゅつがく}のほうが{多|おお}いですが、{中国|ちゅうごく}のみ{輸入額|ゆにゅうがく}のほうが{多|おお}くなっています。",
				cn: "日本主要的贸易伙伴国是美利坚合众国、欧盟（EU）、中国、韩国。进口额与出口额均以中国居首，进口额达到 11.4 万亿日元。美国和欧盟约为其一半。在出口额方面，中国与美国的差距并不算大，而欧盟约为中国的三分之二，韩国则在一半以下。大多数国家都是出口额多于进口额，只有中国是进口额更多。",
			},
			{ type: "line", jp: "（{資料|しりょう}：{財務省|ざいむしょう}「{貿易統計|ぼうえきとうけい}」）", cn: "（资料：财务省《贸易统计》）", align: "right" },
			{
				type: "figure",
				alt: "日本の相手先別輸出入額（2009年）を示す4つの棒グラフ。■＝輸入、□＝輸出。韓国・中国・EU・米国の4か国について、0〜12兆円の目盛りで示されている",
				cn: "四张柱状图，显示 2009 年日本按贸易对象国分类的进出口额。■＝进口（实心），□＝出口（空心）；对象为韩国、中国、欧盟、美国，刻度 0〜12 万亿日元。（本站按原书重绘）",
				svg: `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px">
  ${tradeChart("1", rowsCorrect)}
  ${tradeChart("2", rowsAllImport)}
  ${tradeChart("3", rowsUsTop)}
  ${tradeChart("4", rowsChinaExport)}
</div>`,
			},
		],
		footnotes: [{ marker: "※", term: "EU", jp: "European Union", cn: "欧盟" }],
		pageNotes: [
			{ jp: "＊ a country which imports (Japanese) goods", cn: "＊贸易伙伴国" },
			{ jp: "＊＊ the total imports amount to 11.4 trillion yen", cn: "＊＊进口额达到 11.4 万亿日元" },
			{ jp: "＊＊＊ Broken down by importing countries", cn: "＊＊＊按贸易对象国分类" },
		],
		questions: [
			{
				label: "問い",
				jp: "{次|つぎ}のグラフからこの{文章|ぶんしょう}に{合|あ}うものを{選|えら}びなさい。（■＝{輸入|ゆにゅう}　□＝{輸出|ゆしゅつ}／{日本|にほん}の{相手先別輸出入額|あいてさきべつゆしゅつにゅうがく}　2009{年|ねん}）",
				cn: "请从下面的图表中选出与本文相符的一个。（■＝进口　□＝出口／日本按贸易对象国分类的进出口额　2009 年）",
				choices: [
					{ jp: "グラフ 1", cn: "图表 1" },
					{ jp: "グラフ 2", cn: "图表 2" },
					{ jp: "グラフ 3", cn: "图表 3" },
					{ jp: "グラフ 4", cn: "图表 4" },
				],
				answer: 1,
				explanation:
					"用文章里的三个条件逐一筛选即可。①「輸入額・輸出額とも中国がトップ」→ 中国的两根柱子都必须最长，这就排除了 3（美国最长）。②「ほとんどの国は輸入額より輸出額のほうが多い」→ 大多数国家白柱（出口）要比黑柱（进口）长，这就排除了 2（所有国家都是进口多）。③「中国のみ輸入額のほうが多くなっています」→ 唯独中国黑柱要比白柱长，这就排除了 4（中国出口反而更多）。同时满足三条的只有 1。",
				choiceNotes: [
					"正确。中国进出口均居首；韩国・EU・美国都是出口＞进口；唯独中国进口＞出口。",
					"所有国家都是进口多于出口，与「ほとんどの国は輸入額より輸出額のほうが多い」矛盾。",
					"最长的柱子在美国，与「輸入額・輸出額とも中国がトップ」矛盾。",
					"中国的出口柱比进口柱长，与「中国のみ輸入額のほうが多くなっています」矛盾。",
				],
			},
		],
	},

	vocab: [
		{ jp: "輸入", kana: "ゆにゅう", cn: "进口", pos: "名詞・動詞" },
		{ jp: "輸出", kana: "ゆしゅつ", cn: "出口", pos: "名詞・動詞" },
		{ jp: "貿易", kana: "ぼうえき", cn: "贸易", pos: "名詞" },
		{ jp: "相手国", kana: "あいてこく", cn: "对象国、伙伴国", pos: "名詞" },
		{ jp: "兆", kana: "ちょう", cn: "万亿、兆", pos: "数詞" },
		{ jp: "達する", kana: "たっする", cn: "达到", pos: "動詞" },
		{ jp: "さほど〜ない", cn: "并不那么……", pos: "副詞" },
		{ jp: "差", kana: "さ", cn: "差距", pos: "名詞" },
		{ jp: "半分以下", kana: "はんぶんいか", cn: "一半以下", pos: "名詞" },
		{ jp: "ほとんど", cn: "大部分、几乎", pos: "名詞・副詞" },
		{ jp: "増加する", kana: "ぞうかする", cn: "增加", pos: "動詞" },
		{ jp: "減少する", kana: "げんしょうする", cn: "减少", pos: "動詞" },
		{ jp: "徐々に", kana: "じょじょに", cn: "渐渐地", pos: "副詞" },
		{ jp: "急激に", kana: "きゅうげきに", cn: "急剧地", pos: "副詞" },
		{ jp: "伸び", kana: "のび", cn: "增长、增幅", pos: "名詞" },
		{ jp: "一定", kana: "いってい", cn: "一定、不变", pos: "名詞・な形" },
		{ jp: "我が国", kana: "わがくに", cn: "我国", pos: "名詞" },
		{ jp: "統計", kana: "とうけい", cn: "统计", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜に{達|たっ}する",
			formation: "数量を表す名詞 ＋ に達する",
			meaning: "达到……（某个数值）。图表说明的常用表达。",
			example: { jp: "{輸入額|ゆにゅうがく}は11.4{兆円|ちょうえん}に{達|たっ}しています。", cn: "进口额达到 11.4 万亿日元。" },
		},
		{
			pattern: "〜とも",
			formation: "名詞A・名詞B ＋ とも",
			meaning: "……两者都。「輸入額・輸出額とも」＝进口额和出口额两方面都。",
			example: { jp: "{輸入額|ゆにゅうがく}・{輸出額|ゆしゅつがく}とも{中国|ちゅうごく}がトップ", cn: "进口额、出口额都是中国第一" },
		},
		{
			pattern: "〜のみ",
			meaning: "只有……（＝だけ）。书面语。",
			example: { jp: "{中国|ちゅうごく}のみ{輸入額|ゆにゅうがく}のほうが{多|おお}くなっています。", cn: "只有中国是进口额更多。" },
			note: "本题的决定性线索：「のみ」＝除中国以外的国家都相反。",
		},
		{
			pattern: "さほど〜ない",
			meaning: "并不那么……。比「あまり〜ない」更书面。",
			example: { jp: "{中国|ちゅうごく}とアメリカの{差|さ}はさほど{大|おお}きくありません。", cn: "中国与美国的差距并不算大。" },
		},
		{
			pattern: "AはBの約〜分の〜",
			meaning: "A 约为 B 的几分之几。比较数量的常用说法。",
			example: { jp: "EUは{中国|ちゅうごく}の{約|やく}3{分|ぶん}の2", cn: "欧盟约为中国的三分之二" },
		},
		{
			pattern: "〜はともかく",
			formation: "名詞 ＋ はともかく",
			meaning: "……姑且不论、先不说……。",
			example: { jp: "{輸入|ゆにゅう}はともかく{輸出|ゆしゅつ}はアメリカが{一番|いちばん}だった", cn: "进口先不说，出口一直是美国第一" },
		},
		{
			pattern: "〜そうです（伝聞）",
			meaning: "听说……。",
			example: { jp: "51{兆円|ちょうえん}もあるそうです。", cn: "听说高达 51 万亿日元。" },
		},
	],
};
