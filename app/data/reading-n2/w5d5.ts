import type { ReadingDay } from "../reading-n3/types";

// 第5週 5日目 グラフ② — printed pages 86–87
export const w5d5: ReadingDay = {
	week: 5,
	day: 5,
	label: "グラフ②",
	labelKana: "ぐらふ",
	labelEn: "Graphs ②",
	printedPages: [86, 87],
	answerSource: "book",

	point: {
		title: "グラフでよく{使|つか}われる{表現|ひょうげん}を{覚|おぼ}えよう！",
		titleCn: "来记住图表中常用的表达吧！",
		titleEn: "Let’s learn the expressions often used in graphs!",
		figure: {
			alt: "点数表を見せ合う2人のキャラクター。「ボクの点数はキミよりはるかにいい！」「これでも前回よりわずかにいい。」",
			cn: "互相亮出分数表的两个角色。「我的分数比你好得远！」「就这也比上次略微好一点。」",
			en: "Two characters comparing score sheets. “My score is far better than yours!” “Even this is slightly better than last time.”",
		},
		tips: [
			{
				jp: "{例えば|たとえば}こんな{表現|ひょうげん}がよく{使|つか}われます。",
				cn: "例如，经常会用到这样的表达。",
				en: "Expressions like these are often used.",
			},
		],
		expressions: [
			{ jp: "〜割（%）を占める", kana: "わりをしめる", cn: "占……成（%）", en: "to make up ~% of" },
			{ jp: "大半を占める", kana: "たいはんをしめる", cn: "占一大半", en: "to occupy the majority" },
			{ jp: "（〜%／〜円 など）に達する", kana: "たっする", cn: "达到（……%／……日元等）", en: "comes to …% / yen" },
			{ jp: "AはBを上回る", kana: "うわまわる", cn: "A 超过 B", en: "A exceeds B" },
			{ jp: "AはBを下回る", kana: "したまわる", cn: "A 低于 B", en: "A falls short of B" },
			{ jp: "わずかに／やや", cn: "略微／稍许", en: "slightly / somewhat" },
			{ jp: "はるかに／大きく", cn: "远远地／大幅度地", en: "by far / a lot" },
			{ jp: "割合", kana: "わりあい", cn: "比率", en: "a ratio" },
			{ jp: "○○率", kana: "りつ", cn: "○○率", en: "rate" },
			{ jp: "総○数", kana: "そうすう", cn: "○ 的总数", en: "gross number of ○" },
		],
		notes: [
			{
				jp: "「はるかに上回る」は差が大きいとき。「わずかに上回る」は53%対47%のようなわずかな差。数字を{見|み}て{副詞|ふくし}が{合|あ}うかを{確|たし}かめる。",
				cn: "「远远超过」用于差距大的时候。「略微超过」是像53%对47%这样的细微差距。看着数字，确认副词是否相符。",
				en: "Haruka ni uwamawaru is for a large gap. Wazuka ni uwamawaru is for a slim one such as 53% vs 47%. Check that the adverb matches the numbers.",
			},
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的会话文，从后面的句子中选出正确的吧。",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{妻|つま}",
				speakerCn: "妻子",
				speakerEn: "Wife",
				jp: "え？　またライターの{火事|かじ}？　また、{子|こ}どもたちが{犠牲|ぎせい}になったって。かわいそうに。{親|おや}がよく{管理|かんり}しないとね、{子|こ}どもがいじらないように。",
				cn: "诶？又是打火机火灾？说是孩子们又成了牺牲品。真可怜。家长得好好管理才行呢，让孩子不去摆弄。",
				en: "What? Another lighter fire? Children were the victims again. How sad. Parents have to keep a closer watch so kids don’t fiddle with them.",
			},
			{
				type: "speech",
				speaker: "{夫|おっと}",
				speakerCn: "丈夫",
				speakerEn: "Husband",
				jp: "{昔|むかし}はこんなにライターの{火事|かじ}ってなかったような{気|き}がするな。{車|くるま}の{中|なか}の{火事|かじ}が……。{車|くるま}の{中|なか}は{火|ひ}の{回|まわ}りが{速|はや}いし、{今|いま}は{燃|も}えやすい{素材|そざい}が{身|み}の{回|まわ}りに{多|おお}いんだろうなあ。",
				cn: "感觉以前好像没有这么多打火机火灾啊。车里的火灾……。车里火势蔓延得快，而且现在身边的易燃材料大概很多吧。",
				en: "I feel there weren’t this many lighter fires in the old days. Fires in cars… Fire spreads fast inside a car, and these days there are a lot of flammable materials around us.",
			},
			{
				type: "speech",
				speaker: "{妻|つま}",
				speakerCn: "妻子",
				speakerEn: "Wife",
				jp: "{簡単|かんたん}に{火|ひ}がつかないようなライターにすべきよね。",
				cn: "应该做成那种不容易点着火的打火机才对吧。",
				en: "They ought to make lighters that don’t light so easily.",
			},
			{
				type: "speech",
				speaker: "{夫|おっと}",
				speakerCn: "丈夫",
				speakerEn: "Husband",
				jp: "そういう{製品|せいひん}もあったんだけど、コストが{高|たか}くつくし、{使|つか}いにくくて{売|う}れなかったんだって。{今|いま}また{子|こ}どもが{簡単|かんたん}に{操作|そうさ}できないような{安全基準|あんぜんきじゅん}を{設|もう}けようという{声|こえ}が{上|あ}がってるよ。",
				cn: "那样的产品以前也有过，不过听说成本很高，而且不好用，没卖出去。现在又响起了要制定让孩子无法轻易操作的安全标准的呼声哦。",
				en: "There were products like that, but they cost a lot and were hard to use, so they didn’t sell. Now voices are being raised again to set safety standards so children can’t operate them easily.",
			},
		],
		choices: [
			{ jp: "{子|こ}どもがライターをいじって{起|お}きる{火事|かじ}が{続|つづ}いている。", cn: "孩子摆弄打火机引起的火灾仍在持续发生。", en: "Fires started by children fiddling with lighters are continuing." },
			{ jp: "{車|くるま}の{中|なか}は{物|もの}が{燃|も}えやすく、{火|ひ}が{広|ひろ}がりやすい。", cn: "车里东西容易燃烧，火容易蔓延。", en: "Inside a car, things catch fire easily and the fire spreads easily." },
			{ jp: "{昔|むかし}に{比|くら}べて{今|いま}は、{車|くるま}の{中|なか}にライターを{置|お}く{人|ひと}が{多|おお}い。", cn: "与过去相比，现在把打火机放在车里的人更多。", en: "Compared with the past, more people now leave lighters in the car." },
			{ jp: "{子|こ}どもが{簡単|かんたん}に{使|つか}えないようなライターが{値上|ねあ}がりしている。", cn: "那种孩子无法轻易使用的打火机正在涨价。", en: "Lighters that children cannot use easily are going up in price." },
			{ jp: "{子|こ}どもが{簡単|かんたん}に{操作|そうさ}できないような{安全基準|あんぜんきじゅん}が{設|もう}けられた。", cn: "让孩子无法轻易操作的安全标准已被制定。", en: "Safety standards have been set so that children cannot operate them easily." },
		],
		answers: [1, 2],
	},

	mondai: {
		instruction: "{次|つぎ}のグラフと{表|ひょう}を{見|み}て、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "请看下面的图和表，回答后面的问题。",
		instructionEn: "Look at the graph and table below and answer the questions that follow. (Answers are in the separate booklet, p. 6.)",
		blocks: [
			{
				type: "heading",
				jp: "【{図|ず}】{火遊|ひあそ}びによる{火災|かさい}のうち{発火源|はっかげん}（{注|ちゅう}1）がライターであるものの{占|し}める{割合|わりあい}＊",
				cn: "【图】玩火引起的火灾中，起火源（注1）为打火机的所占比例＊",
				en: "[Figure] Share of play-related fires whose source of ignition is a lighter",
			},
			{
				type: "line",
				jp: "（{平成|へいせい}11〜20{年|ねん} {全国|ぜんこく}（{全年齢|ぜんねんれい}））",
				cn: "（平成11〜20年 全国（全年龄））",
				en: "(FY 1999–2008, nationwide, all ages)",
			},
			{
				type: "figure",
				alt: "円グラフ。発火源がライター：17,160件（53%）。その他：14,948件（47%）。ライターがわずかに過半数。",
				cn: "饼图。起火源为打火机：17,160件（53%）。其他：14,948件（47%）。打火机略微超过半数。",
				en: "Pie chart. Source of ignition = lighter: 17,160 cases (53%). Other: 14,948 cases (47%). Lighters are a slim majority.",
			},
			{
				type: "heading",
				jp: "【{表|ひょう}】{火遊|ひあそ}びによる{火災|かさい}のうち{発火源|はっかげん}がライターの{火災|かさい}の{死傷者|ししょうしゃ}（{注|ちゅう}2）{発生率|はっせいりつ}",
				cn: "【表】玩火引起的火灾中，起火源为打火机的火灾的伤亡者（注2）发生率",
				en: "[Table] Casualty rate in play-related fires whose source of ignition is a lighter",
			},
			{
				type: "line",
				jp: "（{平成|へいせい}16〜20{年|ねん} {政令指定都市|せいれいししていとし}（12{歳以下|さいいか}））",
				cn: "（平成16〜20年 政令指定城市（12岁以下））",
				en: "(FY 2004–2008, ordinance-designated cities, age 12 and under)",
			},
			{
				type: "table",
				rows: [
					[
						{ jp: "{行為者|こういしゃ}（{注|ちゅう}3）の{年齢|ねんれい}", cn: "行为人（注3）的年龄", en: "Age of the person who started it", header: true, align: "center" },
						{ jp: "{件数|けんすう}［{件|けん}］", cn: "件数［件］", en: "Cases", header: true, align: "center" },
						{ jp: "{総件数|そうけんすう}（{全年齢|ぜんねんれい}）に{占|し}める{割合|わりあい}", cn: "占总件数（全年龄）的比例", en: "Share of all-age total", header: true, align: "center" },
						{ jp: "{死者数|ししゃすう}［{人|にん}］", cn: "死者数［人］", en: "Deaths", header: true, align: "center" },
						{ jp: "{負傷者|ふしょうしゃ}（{注|ちゅう}4）{数|すう}［{人|にん}］", cn: "受伤者（注4）数［人］", en: "Injured", header: true, align: "center" },
						{ jp: "{死傷者|ししょうしゃ}の{発生率|はっせいりつ}", cn: "伤亡者的发生率", en: "Casualty rate", header: true, align: "center" },
					],
					[
						{ jp: "5{歳未満|さいみまん}", cn: "未满5岁", en: "Under 5", align: "center" },
						{ jp: "107", cn: "107", en: "107", align: "center" },
						{ jp: "8.1%", cn: "8.1%", en: "8.1%", align: "center" },
						{ jp: "1", cn: "1", en: "1", align: "center" },
						{ jp: "73", cn: "73", en: "73", align: "center" },
						{ jp: "69.2%", cn: "69.2%", en: "69.2%", align: "center" },
					],
					[
						{ jp: "5{歳以上|さいいじょう}12{歳以下|さいいか}", cn: "5岁以上12岁以下", en: "Age 5–12", align: "center" },
						{ jp: "419", cn: "419", en: "419", align: "center" },
						{ jp: "31.8%", cn: "31.8%", en: "31.8%", align: "center" },
						{ jp: "7", cn: "7", en: "7", align: "center" },
						{ jp: "72", cn: "72", en: "72", align: "center" },
						{ jp: "18.9%", cn: "18.9%", en: "18.9%", align: "center" },
					],
					[
						{ jp: "{合計|ごうけい}", cn: "合计", en: "Total", header: true, align: "center" },
						{ jp: "526※1", cn: "526※1", en: "526", align: "center" },
						{ jp: "39.9%", cn: "39.9%", en: "39.9%", align: "center" },
						{ jp: "8", cn: "8", en: "8", align: "center" },
						{ jp: "145", cn: "145", en: "145", align: "center" },
						{ jp: "29.1%", cn: "29.1%", en: "29.1%", align: "center" },
					],
				],
			},
			{
				type: "note",
				jp: "※1 {全年齢|ぜんねんれい}での{総件数|そうけんすう}は1,319{件|けん}",
				cn: "※1 全年龄的总件数为1,319件",
				en: "※1 All-age total: 1,319 cases",
			},
			{
				type: "note",
				jp: "※2 「{死傷者|ししょうしゃ}の{発生率|はっせいりつ}」＝（{死者数|ししゃすう}＋{負傷者数|ふしょうしゃすう}）÷{件数|けんすう}×100",
				cn: "※2 「伤亡者的发生率」＝（死者数＋受伤者数）÷件数×100",
				en: "※2 Casualty rate = (deaths + injured) ÷ cases × 100",
			},
			{
				type: "source",
				jp: "（{資料|しりょう}：{消費者庁|しょうひしゃちょう}「{子供|こども}のライターの{使用|しよう}に{関|かん}する{注意喚起|ちゅういかんき}について」）",
				cn: "（资料：消费者厅「关于提请注意儿童使用打火机」）",
				en: "(Source: Consumer Affairs Agency, “Alert on children’s use of lighters”)",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "発火源", jp: "the cause of the fire", cn: "火源、起火原因", en: "source of ignition" },
			{ marker: "（注2）", term: "死傷者", jp: "casualties", cn: "死伤者", en: "casualties" },
			{ marker: "（注3）", term: "行為者", jp: "a doer", cn: "行为人", en: "the person who did it" },
			{ marker: "（注4）", term: "負傷者", jp: "an injured person", cn: "伤者", en: "an injured person" },
		],
		pageNotes: [
			{
				jp: "The percentage of fires set with lighters while people are at play",
				cn: "人们在玩耍时用打火机引发的火灾所占的百分比",
				en: "The percentage of fires set with lighters while people are at play",
			},
		],
		questions: [
			{
				label: "問い",
				jp: "グラフの{説明|せつめい}として{正|ただ}しいものはどれか。",
				cn: "作为图表的说明，正确的是哪一项？",
				en: "Which of the following is a correct description of the graphs?",
				choices: [
					{
						jp: "{平成|へいせい}16{年|ねん}から20{年|ねん}にかけて{政令指定都市|せいれいしいていとし}では{火遊|ひあそ}びによる{火災|かさい}のうち{発火源|はっかげん}がライターであるものが{約|やく}1300{件|けん}{発生|はっせい}し、その{約|やく}4{割|わり}が12{歳以下|さいいか}によるものである。",
						cn: "从平成16年到20年期间，在政令指定城市，玩火引起的火灾中，起火源为打火机的约发生了1300件，其中约4成是12岁以下的人所为。",
						en: "From FY 2004 to 2008, in ordinance-designated cities, about 1,300 play-related fires whose source was a lighter occurred, and about 40% of those were caused by children 12 and under.",
					},
					{
						jp: "{平成|へいせい}16{年|ねん}から20{年|ねん}にかけて{政令指定都市|せいれいしいていとし}では{火遊|ひあそ}びによる{火災|かさい}のうち{発火源|はっかげん}がライターであるものの5{歳未満|さいみまん}の{死傷者発生率|ししょうしゃはっせいりつ}は{約半数|やくはんすう}を{占|し}めている。",
						cn: "从平成16年到20年期间，在政令指定城市，玩火引起的火灾中，起火源为打火机的火灾里，未满5岁的伤亡者发生率约占半数。",
						en: "From FY 2004 to 2008, in ordinance-designated cities, the casualty rate among under-fives in play-related lighter fires accounts for about half.",
					},
					{
						jp: "{平成|へいせい}11{年|ねん}から20{年|ねん}にかけて{全国|ぜんこく}では{火遊|ひあそ}びによる{火災|かさい}のうち{発火源|はっかげん}がライターであるものは{約|やく}7{割|わり}を{占|し}めている。",
						cn: "从平成11年到20年期间，在全国，玩火引起的火灾中，起火源为打火机的约占7成。",
						en: "From FY 1999 to 2008, nationwide, about 70% of play-related fires had a lighter as the source of ignition.",
					},
					{
						jp: "{平成|へいせい}11{年|ねん}から20{年|ねん}にかけて{全国|ぜんこく}では{火遊|ひあそ}びによる{火災|かさい}のうち{発火源|はっかげん}がライターであるものはその{他|た}であるものをはるかに{上回|うわまわ}っている。",
						cn: "从平成11年到20年期间，在全国，玩火引起的火灾中，起火源为打火机的远远超过起火源为其他的。",
						en: "From FY 1999 to 2008, nationwide, play-related fires whose source was a lighter far exceed those from other sources.",
					},
				],
				answer: 1,
				explanation:
					"表注※1：全年龄总件数 1,319 件≈约 1300 件。12 岁以下合计 526 件，占 39.9%≈约四成。年分、范围（政令指定都市）都对。选 1。别册提醒「選択肢をひとつひとつゆっくり読もう」。2 不满 5 岁的伤亡发生率是 69.2%，是约七成不是约半数。3 饼图是 53%，是约半数不是约七成。4 53% 对 47% 只是「わずかに上回る」，不是「はるかに」。",
				explanationEn:
					"Table note ※1: all-age total 1,319 ≈ about 1,300. Age 12 and under: 526 cases, 39.9% ≈ about 40%. Years and scope (ordinance-designated cities) match. Choose 1. The booklet says to read each option slowly. 2: the under-five casualty rate is 69.2% — about 70%, not about half. 3: the pie is 53% — about half, not about 70%. 4: 53% vs 47% only “slightly exceeds,” not “far exceeds.”",
				choiceNotes: [
					"正确。1,319 件≈1300 件，12 岁以下 39.9%≈四成。",
					"69.2% 是约七成，不是约半数。",
					"饼图 53% 是约半数，不是约七成。",
					"53%：47% 只是略高，说「远远超过」语气过重。",
				],
				choiceNotesEn: [
					"Correct. 1,319 ≈ 1,300; 12-and-under is 39.9% ≈ 40%.",
					"69.2% is about 70%, not about half.",
					"The pie is 53% — about half, not about 70%.",
					"53% vs 47% is a slight edge, not “far exceeds.”",
				],
			},
		],
	},

	vocab: [
		{ jp: "占める", kana: "しめる", cn: "占", en: "to account for; to occupy", pos: "動詞" },
		{ jp: "大半", kana: "たいはん", cn: "一大半、过半", en: "the greater part", pos: "名詞" },
		{ jp: "達する", kana: "たっする", cn: "达到", en: "to reach; to amount to", pos: "動詞" },
		{ jp: "上回る", kana: "うわまわる", cn: "超过", en: "to exceed", pos: "動詞" },
		{ jp: "下回る", kana: "したまわる", cn: "低于", en: "to fall short of", pos: "動詞" },
		{ jp: "わずかに", cn: "仅仅、略微", en: "slightly", pos: "副詞" },
		{ jp: "はるかに", cn: "远远地", en: "by far; far", pos: "副詞" },
		{ jp: "割合", kana: "わりあい", cn: "比例", en: "ratio; proportion", pos: "名詞" },
		{ jp: "発火源", kana: "はっかげん", cn: "火源", en: "source of ignition", pos: "名詞" },
		{ jp: "火遊び", kana: "ひあそび", cn: "玩火", en: "playing with fire", pos: "名詞" },
		{ jp: "死傷者", kana: "ししょうしゃ", cn: "死伤者", en: "casualties", pos: "名詞" },
		{ jp: "発生率", kana: "はっせいりつ", cn: "发生率", en: "incidence rate", pos: "名詞" },
		{ jp: "政令指定都市", kana: "せいれいしいていとし", cn: "政令指定城市", en: "ordinance-designated city", pos: "名詞" },
		{ jp: "行為者", kana: "こういしゃ", cn: "行为人", en: "the person who did it", pos: "名詞" },
		{ jp: "負傷者", kana: "ふしょうしゃ", cn: "伤者", en: "the injured", pos: "名詞" },
		{ jp: "犠牲", kana: "ぎせい", cn: "牺牲", en: "a victim; a sacrifice", pos: "名詞" },
		{ jp: "安全基準", kana: "あんぜんきじゅん", cn: "安全标准", en: "safety standard", pos: "名詞" },
		{ jp: "設ける", kana: "もうける", cn: "设立、制定", en: "to establish; to set up", pos: "動詞" },
	],

	grammar: [
		{
			pattern: "〜を占める",
			formation: "数量／割合＋を占める",
			meaning: "占……（比例）。读图表的基本句。",
			meaningEn: "to account for… (a share). Basic graph language.",
			example: {
				jp: "{発火源|はっかげん}がライターであるものは53%を{占|し}めている。",
				cn: "起火源为打火机的占53%。",
				en: "Those whose source of ignition is a lighter account for 53%.",
			},
		},
		{
			pattern: "AはBを上回る／下回る",
			formation: "AはBを上回る／下回る",
			meaning: "A 高于／低于 B。前面加「わずかに」「はるかに」表示差的大小，必须和数字一致。",
			meaningEn: "A exceeds / falls short of B. Adverbs wazuka ni / haruka ni mark how big the gap is—and must match the numbers.",
			example: {
				jp: "53%は47%をわずかに{上回|うわまわ}っている（はるかに、ではない）。",
				cn: "53%略微超过47%（并不是远远地）。",
				en: "53% slightly exceeds 47% (it does not far exceed it).",
			},
		},
		{
			pattern: "〜にかけて",
			formation: "時・場所＋から＋時・場所＋にかけて",
			meaning: "从……到……（一段期间）。图表说明里标时间范围。",
			meaningEn: "from … through …. Marks a time span in graph captions.",
			example: {
				jp: "{平成|へいせい}16{年|ねん}から20{年|ねん}にかけて",
				cn: "从平成16年到20年期间",
				en: "from FY 2004 through 2008",
			},
		},
	],
};
