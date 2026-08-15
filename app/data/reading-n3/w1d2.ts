import type { ReadingDay } from "./types";

// 第1週 2日目 案内② — printed pages 14–15
const venueMap = `<svg viewBox="0 0 620 300" role="img" aria-label="会場の案内図">
  <rect x="0" y="0" width="620" height="300" fill="none"/>
  <g stroke="currentColor" stroke-width="1.2" fill="none" opacity="0.55">
    <path d="M0 150 H620 M0 176 H620"/>
    <path d="M70 0 V300 M150 0 V300 M235 0 V300 M330 0 V300 M430 0 V300 M520 0 V300"/>
    <path d="M0 70 H620 M0 245 H620"/>
  </g>
  <path d="M0 163 H620" stroke="currentColor" stroke-width="2.4" stroke-dasharray="9 7" opacity="0.8"/>
  <rect x="150" y="152" width="86" height="22" fill="var(--reader-paper, #fff)" stroke="currentColor" stroke-width="1.2"/>
  <text x="193" y="167" text-anchor="middle" font-size="13">さくら野</text>
  <text x="300" y="167" text-anchor="middle" font-size="11">地下鉄けやき線</text>
  <g font-size="11" text-anchor="middle">
    <circle cx="30" cy="176" r="9" fill="none" stroke="currentColor" stroke-width="1.2"/><text x="30" y="180">1</text>
    <circle cx="70" cy="150" r="9" fill="none" stroke="currentColor" stroke-width="1.2"/><text x="70" y="154">2</text>
    <circle cx="110" cy="150" r="9" fill="none" stroke="currentColor" stroke-width="1.2"/><text x="110" y="154">3</text>
    <circle cx="150" cy="176" r="9" fill="none" stroke="currentColor" stroke-width="1.2"/><text x="150" y="180">4</text>
    <circle cx="150" cy="150" r="11" fill="currentColor"/><text x="150" y="155" fill="var(--reader-paper, #fff)" font-weight="700">5</text>
  </g>
  <text x="150" y="128" text-anchor="middle" font-size="12">5番出口</text>
  <rect x="330" y="26" width="52" height="30" fill="currentColor"/>
  <rect x="322" y="6" width="70" height="22" fill="var(--reader-paper, #fff)" stroke="currentColor" stroke-width="1.4"/>
  <text x="357" y="21" text-anchor="middle" font-size="13" font-weight="700">会場</text>
  <text x="357" y="46" text-anchor="middle" font-size="10" fill="var(--reader-paper, #fff)">地下1階</text>
  <rect x="430" y="26" width="26" height="30" fill="currentColor"/>
  <text x="480" y="18" text-anchor="middle" font-size="11">有料駐車場</text>
  <rect x="360" y="88" width="60" height="20" fill="currentColor"/>
  <text x="330" y="82" text-anchor="end" font-size="11">ドラッグストア</text>
  <line x1="332" y1="86" x2="362" y2="95" stroke="currentColor" stroke-width="0.9"/>
  <circle cx="520" cy="150" r="13" fill="currentColor"/>
  <text x="556" y="205" text-anchor="middle" font-size="11">タワービル</text>
  <line x1="524" y1="163" x2="546" y2="196" stroke="currentColor" stroke-width="0.9"/>
</svg>`;

export const w1d2: ReadingDay = {
	week: 1,
	day: 2,
	label: "案内②",
	labelKana: "あんない",
	labelEn: "Notices ②",
	printedPages: [14, 15],
	answerSource: "book",

	point: {
		title: "{場所|ばしょ}や{方向|ほうこう}を{正|ただ}しく{読|よ}もう！",
		titleCn: "正确阅读地点和方向！",
		titleEn: "Try to read the places and directions correctly!",
		figure: {
			alt: "「四つ角」って四つ目の角のこと？──交差点そのものを1つ目として数える図と、その四つ角を入れて数えて四つ目の角になる図",
			cn: "「四つ角」是指第四个拐角吗？——图中说明：眼前这个十字路口本身就叫「四つ角」；而把这个路口算进去往下数，第四个拐角才是「四つ目の角」。",
		},
		tips: [
			{
				jp: "「{四|よ}つ{角|かど}」は{十字路|じゅうじろ}そのもの、「{四|よっ}つ{目|め}の{角|かど}」は{数|かぞ}えて4{番目|ばんめ}の{角|かど}。{数|かぞ}え{始|はじ}める{位置|いち}に{注意|ちゅうい}しよう。",
				cn: "「四つ角」指十字路口本身，「四つ目の角」是数到第 4 个的拐角。要特别注意从哪里开始数。",
			},
		],
		expressions: [
			{ jp: "向かい", kana: "むかい", cn: "对面", en: "across from / opposite" },
			{ jp: "ななめ向かい", kana: "ななめむかい", cn: "斜对面", en: "diagonally opposite" },
			{ jp: "向こう", kana: "むこう", cn: "那边、过去一点", en: "across from / opposite / beyond" },
			{ jp: "手前", kana: "てまえ", cn: "靠自己这一侧、还没到的位置", en: "before" },
			{ jp: "角", kana: "かど", cn: "拐角", en: "corner" },
			{ jp: "四つ角", kana: "よつかど", cn: "十字路口", en: "crossroads" },
			{ jp: "交差点", kana: "こうさてん", cn: "交叉路口", en: "intersection" },
			{ jp: "有料駐車場", kana: "ゆうりょうちゅうしゃじょう", cn: "收费停车场", en: "a pay parking lot" },
			{ jp: "つきあたり", cn: "路走到底的尽头", en: "the end of" },
			{ jp: "前方", kana: "ぜんぽう", cn: "前方", en: "ahead" },
			{ jp: "後方", kana: "こうほう", cn: "后方", en: "behind" },
			{ jp: "右折する", kana: "うせつする", cn: "右拐", en: "to turn right" },
			{ jp: "左折する", kana: "させつする", cn: "左拐", en: "to turn left" },
			{ jp: "徒歩", kana: "とほ", cn: "步行", en: "on foot" },
			{ jp: "面している", kana: "めんしている", cn: "面对着、临着", en: "facing" },
			{ jp: "一方通行", kana: "いっぽうつうこう", cn: "单向通行", en: "a one-way street" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		blocks: [
			{
				type: "speech",
				speaker: "{女子学生|じょしがくせい}",
				speakerCn: "女学生",
				jp: "ねえ、そろそろ{会場|かいじょう}に{着|つ}いてもいいころじゃない？",
				cn: "喂，差不多该到会场了吧？",
			},
			{
				type: "speech",
				speaker: "{男子学生|だんしがくせい}",
				speakerCn: "男学生",
				jp: "そうだね。ずいぶん{歩|ある}いたし、{変|へん}だよね。ドラッグストア（※）の{向|む}こうって{書|か}いてあるけれど、ドラッグストアなんてどこにもないよ。",
				cn: "是啊。走了这么久，真奇怪。上面写着在药店的那一边，可是哪里都没有药店啊。",
			},
			{
				type: "speech",
				speaker: "{女子学生|じょしがくせい}",
				speakerCn: "女学生",
				jp: "えーと、ちゃんと4つ{目|め}の{信号|しんごう}を{左|ひだり}に{曲|ま}がったよね。{変|へん}ねえ。",
				cn: "嗯……我们确实是在第 4 个红绿灯左拐的吧。真奇怪。",
			},
			{
				type: "speech",
				speaker: "{男子学生|だんしがくせい}",
				speakerCn: "男学生",
				jp: "あー、4つ{目|め}の{信号|しんごう}って、{地下鉄|ちかてつ}の{出口|でぐち}を{出|で}たところの{信号|しんごう}も{入|い}れて4つっていうことだったんだよ、きっと。さあ、{戻|もど}ろう。",
				cn: "啊——所谓第 4 个红绿灯，肯定是把出地铁口时那个红绿灯也算进去的第 4 个。走，回去吧。",
			},
			{
				type: "speech",
				speaker: "{女子学生|じょしがくせい}",
				speakerCn: "女学生",
				jp: "うん、もうすぐ{説明会|せつめいかい}が{始|はじ}まっちゃうから、{急|いそ}ごう。",
				cn: "嗯，说明会马上就要开始了，快点吧。",
			},
		],
		footnotes: [{ marker: "※", term: "ドラッグストア", jp: "a drugstore / pharmacy", cn: "药店（兼卖化妆品、日用品的药妆店）" }],
		choices: [
			{ jp: "この{学生|がくせい}たちは、{説明会|せつめいかい}に{行|い}くところである。", cn: "这些学生正要去参加说明会。" },
			{ jp: "この{学生|がくせい}たちは、{反対|はんたい}に{曲|ま}がってしまったようだ。", cn: "这些学生好像拐错了方向（拐反了）。" },
			{ jp: "ドラッグストアの{手前|てまえ}に{会場|かいじょう}がある。", cn: "会场在药店的这一侧（还没到药店的位置）。" },
			{ jp: "この{学生|がくせい}たちは、ドラッグストアを{通|とお}り{過|す}ぎてしまったようだ。", cn: "这些学生好像走过头，错过了药店。" },
			{ jp: "この{学生|がくせい}たちは、{曲|ま}がるところを{間違|まちが}えたようだ。", cn: "这些学生好像拐弯的地方弄错了。" },
		],
		answers: [1, 5],
		hint: {
			jp: "{数|かぞ}え{始|はじ}めの{信号|しんごう}をどこにするかで、{曲|ま}がる{場所|ばしょ}がずれてしまう。",
			cn: "从哪一个红绿灯开始数，会直接导致拐弯的地点整个错开。",
		},
	},

	mondai: {
		instruction: "{次|つぎ}の{案内|あんない}を{見|み}て、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "看下面的指南，回答后面的问题。（答案在别册 p.2）",
		blocks: [
			{
				type: "figure",
				alt: "会場の案内図：地下鉄けやき線さくら野駅、1〜5番出口、タワービル、ドラッグストア、会場（地下1階）、有料駐車場の位置関係を示す地図",
				cn: "会场路线图：地铁榉树线樱野站、1〜5 号出口、塔楼大厦、药店、会场（地下 1 层）、收费停车场的位置关系。",
				svg: venueMap,
			},
			{ type: "heading", jp: "{会場|かいじょう}の{案内図|あんないず}", cn: "会场路线图" },
			{
				type: "list",
				marker: "・",
				items: [
					{
						jp: "{地下鉄|ちかてつ}さくら{野駅|のえき}より{徒歩|とほ}10{分|ぷん}",
						cn: "从地铁樱野站步行 10 分钟",
					},
					{
						jp: "5{番出口|ばんでぐち}を{出|で}て、タワービル{方面|ほうめん}に{向|む}かって{歩|ある}き、4つ{目|め}の{信号|しんごう}で{左折|させつ}してください。そこから100メートルほど{行|い}ったところにドラッグストアがあります。その{角|かど}から4{軒|けん}{向|む}こうのビルの{地下|ちか}です＊。",
						cn: "出 5 号出口后朝塔楼大厦方向走，在第 4 个红绿灯处左拐。从那里再走约 100 米就有一家药店。会场就在那个拐角往前数第 4 栋楼的地下＊。",
					},
					{
						jp: "{会場|かいじょう}のななめ{向|む}かいに{有料駐車場|ゆうりょうちゅうしゃじょう}があります。",
						cn: "会场的斜对面有收费停车场。",
					},
				],
			},
			{
				type: "note",
				jp: "※ビルに{面|めん}した{道路|どうろ}は{一方通行|いっぽうつうこう}になっています＊＊。お{車|くるま}の{場合|ばあい}は、ご{注意|ちゅうい}ください。",
				cn: "※大楼所临的道路是单向通行＊＊。开车前来时请注意。",
			},
		],
		footnotes: [],
		pageNotes: [
			{ jp: "＊ You'll find it in the basement of the fourth building from the corner.", cn: "＊从那个拐角起往前数，第 4 栋楼的地下层就是会场。" },
			{ jp: "＊＊ The building is on a one-way street.", cn: "＊＊大楼前面的道路是单向通行。" },
		],
		questions: [
			{
				label: "問1",
				jp: "「タワービル{方面|ほうめん}に{向|む}かって{歩|ある}き」とはどういう{意味|いみ}か。",
				cn: "「朝塔楼大厦方向走」是什么意思？",
				choices: [
					{ jp: "タワービルに{着|つ}くまで{歩|ある}く", cn: "一直走到塔楼大厦为止" },
					{ jp: "タワービルを{前|まえ}のほうに{見|み}ながら{歩|ある}く", cn: "一边把塔楼大厦看在前方一边走" },
					{ jp: "タワービルに{向|む}かって{左|ひだり}のほうに{歩|ある}く", cn: "面朝塔楼大厦往左边走" },
					{ jp: "タワービルを{通|とお}り{過|す}ぎるまで{歩|ある}く", cn: "一直走到走过塔楼大厦为止" },
				],
				answer: 2,
				explanation:
					"「〜方面に向かって歩く」是「朝着那个方向走」的意思，只表示行进的方向，并不表示要走到那个目的地。地图上塔楼大厦位于 5 号出口的前方，所以是把它看在前方一直走，走到第 4 个红绿灯就左拐——根本没有走到塔楼大厦。因此 2 正确。",
				choiceNotes: [
					"「方面に向かって」只指方向，不是要抵达塔楼大厦；实际在第 4 个红绿灯就左拐了。",
					"正确。把塔楼大厦看作前进方向的目标物，朝那个方向走。",
					"文中没有提到向左走，左拐是到第 4 个红绿灯之后的事。",
					"同样，并没有走到经过塔楼大厦的位置。",
				],
			},
			{
				label: "問2",
				jp: "この{案内|あんない}の{内容|ないよう}と{合|あ}っているものはどれか。",
				cn: "下列哪一项与这份指南的内容相符？",
				choices: [
					{ jp: "ドラッグストアの4{軒|けん}となりに{有料駐車場|ゆうりょうちゅうしゃじょう}がある。", cn: "药店隔壁数第 4 家是收费停车场。" },
					{ jp: "ドラッグストアと{会場|かいじょう}は{約|やく}100メートル{離|はな}れている。", cn: "药店和会场相距约 100 米。" },
					{ jp: "ビルの{前|まえ}の{道|みち}は{一方通行|いっぽうつうこう}である。", cn: "大楼前面的道路是单向通行。" },
					{ jp: "{会場|かいじょう}へは{車|くるま}で{来|き}てはいけない。", cn: "不可以开车来会场。" },
				],
				answer: 3,
				explanation:
					"最后一条注意事项写着「ビルに面した道路は一方通行になっています」，「面した」＝「前面临着的」，所以「大楼前面的路是单向通行」与原文一致，3 正确。",
				choiceNotes: [
					"往前数第 4 栋楼是会场；停车场在会场的斜对面，不是药店旁第 4 家。",
					"「100 メートル」指的是从第 4 个红绿灯（左拐处）到药店的距离，不是药店到会场的距离。",
					"正确。「ビルに面した道路は一方通行になっています」。",
					"会场斜对面就有收费停车场，只是提醒开车的人注意单行道，并没有禁止开车。",
				],
			},
		],
	},

	vocab: [
		{ jp: "会場", kana: "かいじょう", cn: "会场", pos: "名詞" },
		{ jp: "案内図", kana: "あんないず", cn: "路线图、导览图", pos: "名詞" },
		{ jp: "徒歩", kana: "とほ", cn: "步行", pos: "名詞" },
		{ jp: "出口", kana: "でぐち", cn: "出口", pos: "名詞" },
		{ jp: "方面", kana: "ほうめん", cn: "方向、方面", pos: "名詞" },
		{ jp: "信号", kana: "しんごう", cn: "红绿灯、信号", pos: "名詞" },
		{ jp: "左折する", kana: "させつする", cn: "左拐", pos: "動詞" },
		{ jp: "右折する", kana: "うせつする", cn: "右拐", pos: "動詞" },
		{ jp: "軒", kana: "けん", cn: "（房屋量词）栋、家", pos: "助数詞" },
		{ jp: "地下", kana: "ちか", cn: "地下、地下层", pos: "名詞" },
		{ jp: "ななめ向かい", kana: "ななめむかい", cn: "斜对面", pos: "名詞" },
		{ jp: "手前", kana: "てまえ", cn: "跟前、这一侧", pos: "名詞" },
		{ jp: "向こう", kana: "むこう", cn: "对面、那一边", pos: "名詞" },
		{ jp: "一方通行", kana: "いっぽうつうこう", cn: "单向通行", pos: "名詞" },
		{ jp: "面する", kana: "めんする", cn: "面对、临", pos: "動詞" },
		{ jp: "通り過ぎる", kana: "とおりすぎる", cn: "走过、经过（错过）", pos: "動詞" },
		{ jp: "間違える", kana: "まちがえる", cn: "弄错", pos: "動詞" },
		{ jp: "説明会", kana: "せつめいかい", cn: "说明会", pos: "名詞" },
		{ jp: "ドラッグストア", cn: "药妆店、药店", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜に向かって",
			formation: "名詞 ＋ に向かって",
			meaning: "朝着……（方向）。只表示行进的方向，不含「到达」之意——本课 問1 的考点。",
			example: { jp: "タワービル{方面|ほうめん}に{向|む}かって{歩|ある}く。", cn: "朝塔楼大厦的方向走。" },
		},
		{
			pattern: "〜たところに／〜たところ",
			formation: "動詞た形 ＋ ところ",
			meaning: "在（做完某动作的）那个地点／那个时候。指路时表示「走到某处的位置」。",
			example: {
				jp: "100メートルほど{行|い}ったところにドラッグストアがあります。",
				cn: "走约 100 米的地方有一家药店。",
			},
		},
		{
			pattern: "〜てもいいころじゃない？",
			formation: "動詞て形 ＋ もいいころだ",
			meaning: "差不多该……了吧。表示按常理推算时间已经到了。",
			example: { jp: "そろそろ{会場|かいじょう}に{着|つ}いてもいいころじゃない？", cn: "差不多该到会场了吧？" },
		},
		{
			pattern: "〜ようだ",
			formation: "普通形 ＋ ようだ",
			meaning: "好像……。根据眼前的情况做出的推测。",
			example: { jp: "{曲|ま}がるところを{間違|まちが}えたようだ。", cn: "好像是拐弯的地方弄错了。" },
		},
		{
			pattern: "〜って書いてある",
			formation: "引用内容 ＋ って書いてある",
			meaning: "（上面）写着……。「って」是「と」的口语形式，指示牌、通知的内容常这样引用。",
			example: { jp: "ドラッグストアの{向|む}こうって{書|か}いてある。", cn: "上面写着在药店的那一边。" },
		},
		{
			pattern: "〜も入れて",
			formation: "名詞 ＋ も入れて",
			meaning: "把……也算进去。数数量、数顺序时交代计数的起点。",
			example: {
				jp: "{地下鉄|ちかてつ}の{出口|でぐち}を{出|で}たところの{信号|しんごう}も{入|い}れて4つ。",
				cn: "把出地铁口那个红绿灯也算进去，一共 4 个。",
			},
		},
	],
};
