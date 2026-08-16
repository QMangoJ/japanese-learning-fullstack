import type { ReadingDay } from "./types";

// 第4週 1日目 見出し — printed pages 60–61
export const w4d1: ReadingDay = {
	week: 4,
	day: 1,
	label: "見出し",
	labelKana: "みだし",
	labelEn: "Headlines",
	printedPages: [60, 61],
	answerSource: "book",

	point: {
		title: "{見出|みだ}しによく{使|つか}われる{省略形|しょうりゃくけい}に{注意|ちゅうい}しよう！",
		titleCn: "注意标题中经常出现的省略形式！",
		titleEn: "Pay attention to the ways in which the headline sentences are commonly shortened!",
		figure: {
			alt: "新聞を読んでいるキャラクター。見出しの例「今夏最多73地点で猛暑日」「ゴルフ　全英オープン　米無名選手優勝」が大きく示されている",
			cn: "一个角色在读报纸。旁边是两个标题范例：「今夏最多 73 地点で猛暑日」「ゴルフ　全英オープン　米無名選手優勝」。",
			en: "A character reading a newspaper. Two sample headlines are shown large: “Record 73 sites hit extreme heat this summer” and “Golf: The Open — unknown U.S. player wins.”",
		},
		tips: [
			{
				jp: "{新聞|しんぶん}の{見出|みだ}しは、{短|みじか}く、{完全|かんぜん}な{文章|ぶんしょう}の{形|かたち}をしていないことが{多|おお}いです。{見出|みだ}しを{読|よ}んだだけで{記事|きじ}の{内容|ないよう}がだいたいわかります。",
				cn: "报纸标题很短，往往不是完整的句子。光读标题就能大致明白报道的内容——所以先把标题在心里还原成完整的句子。",
				en: "Newspaper headlines are short and often not complete sentences. Just reading the headline usually tells you the gist of the article — so first restore it in your head as a full sentence.",
			},
			{
				jp: "「{今夏最多|こんかさいた}73{地点|ちてん}で{猛暑日|もうしょび}」＝{今年|ことし}の{夏|なつ}、{最多|さいた}の73{地点|ちてん}で{猛暑日|もうしょび}（{最高気温|さいこうきおん}が35℃{以上|いじょう}の{暑|あつ}い{日|ひ}）になった。",
				cn: "「今夏最多 73 地点で猛暑日」＝今年夏天，有创纪录的 73 个观测点出现了酷暑日（最高气温 35℃ 以上的炎热天气）。",
				en: "“Record 73 sites hit extreme-heat day this summer” = this summer, a record 73 observation points had an extreme-heat day (a day when the high is 35°C or above).",
			},
			{
				jp: "「ゴルフ　{全英|ぜんえい}オープン　{米無名選手優勝|べいむめいせんしゅゆうしょう}」＝ゴルフの{全英|ぜんえい}オープン（The Open Championship）でアメリカの{有名|ゆうめい}ではない{選手|せんしゅ}が{優勝|ゆうしょう}した。",
				cn: "「ゴルフ　全英オープン　米無名選手優勝」＝高尔夫英国公开赛上，一位并不出名的美国选手夺冠。",
				en: "“Golf: The Open — unknown U.S. player wins” = at golf’s Open Championship, an American player who is not well known won.",
			},
		],
		expressions: [
			{ jp: "今夏／今冬", kana: "こんか／こんとう", cn: "今年夏天／今年冬天", en: "this summer / this winter" },
			{ jp: "米／英／中／韓／独／仏", kana: "べい／えい／ちゅう／かん／どく／ふつ", cn: "美／英／中／韩／德／法（国名的一字缩写）", en: "U.S. / U.K. / China / Korea / Germany / France (one-character country names)" },
			{ jp: "猛暑日", kana: "もうしょび", cn: "酷暑日（最高气温 35℃ 以上）", en: "extreme-heat day (high of 35°C or above)" },
			{ jp: "無名", kana: "むめい", cn: "无名、不出名", en: "unknown / little-known" },
			{ jp: "優勝", kana: "ゆうしょう", cn: "夺冠、冠军", en: "to win the championship" },
			{ jp: "〜ぬ（＝〜ない）", cn: "文语否定形，标题中常代替「ない」（眠れぬ＝眠れない）", en: "classical negative, often used in headlines instead of nai (nemurenu = nemurenai)" },
			{ jp: "助詞の省略", kana: "じょしのしょうりゃく", cn: "标题中「は・が・を・に」等助词常被省略", en: "particles such as wa / ga / o / ni are often dropped in headlines" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the dialogue below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{ type: "speech", speaker: "Aさん", speakerCn: "A", speakerEn: "A", jp: "ねえ、この{体育館|たいいくかん}、{暑|あつ}くない？", cn: "喂，这个体育馆，不觉得热吗？", en: "Hey, isn’t this gym hot?" },
			{
				type: "speech",
				speaker: "Bさん",
				speakerCn: "B",
				speakerEn: "B",
				jp: "うん、{暑|あつ}い。{窓|まど}を{閉|し}め{切|き}って（※1）いるし、こんなに{人|ひと}が{多|おお}いから{仕方|しかた}ないよね。{窓|まど}を{開|あ}けたら{臭|くさ}くって{息|いき}できないよ。だって、あの{大|おお}きいタイヤ{工場|こうじょう}が{焼|や}けたんだから。ほかの{避難所|ひなんじょ}（※2）はもっと{混|こ}んでいるらしいよ。",
				cn: "嗯，好热。窗户全关着，人又这么多，也没办法。可要是开窗，臭得没法呼吸啊。因为那家大轮胎工厂烧起来了嘛。听说其他避难所更挤呢。",
				en: "Yeah, it’s hot. The windows are all shut, and there are so many people, so it can’t be helped. If we opened the windows it would stink so much we couldn’t breathe. That big tire factory burned, after all. I hear the other shelters are even more crowded.",
			},
			{ type: "speech", speaker: "Aさん", speakerCn: "A", speakerEn: "A", jp: "{早|はや}く{家|いえ}に{帰|かえ}りたい。", cn: "真想快点回家。", en: "I want to go home soon." },
			{
				type: "speech",
				speaker: "Bさん",
				speakerCn: "B",
				speakerEn: "B",
				jp: "{火事|かじ}もおさまってきている（※3）みたいだし、{明日|あした}になったら{帰|かえ}れるよ。",
				cn: "火势好像也控制住了，到明天就能回去了。",
				en: "The fire seems to be coming under control, so we should be able to go home tomorrow.",
			},
		],
		footnotes: [
			{ marker: "※1", term: "閉め切る", jp: "to keep shut", cn: "紧闭、一直关着", en: "to keep shut" },
			{ marker: "※2", term: "避難所", jp: "an emergency shelter / refuge", cn: "避难所", en: "an emergency shelter / refuge" },
			{ marker: "※3", term: "火事がおさまってきている", jp: "the fire is under control", cn: "火势正在被控制住", en: "the fire is under control" },
		],
		choices: [
			{ jp: "AさんとBさんは{今自宅|いまじたく}にいない。", cn: "A 和 B 现在不在自己家里。", en: "A and B are not at home right now." },
			{ jp: "{体育館|たいいくかん}は{寒|さむ}いので、{窓|まど}を{閉|し}め{切|き}っている。", cn: "因为体育馆冷，所以窗户紧闭。", en: "The gym is cold, so the windows are kept shut." },
			{ jp: "{臭|くさ}いのは、タイヤが{焼|や}けたせいである。", cn: "臭味是因为轮胎烧了。", en: "The smell is because the tires burned." },
			{ jp: "{体育館|たいいくかん}に{避難|ひなん}している{人|ひと}は{少|すく}ない。", cn: "在体育馆避难的人很少。", en: "Few people are sheltering in the gym." },
			{ jp: "{火事|かじ}はどんどん{広|ひろ}がりそうである。", cn: "火势看起来会不断蔓延。", en: "The fire looks as if it will keep spreading." },
		],
		answers: [1, 3],
		hint: {
			jp: "「{早|はや}く{家|いえ}に{帰|かえ}りたい」＝{今|いま}は{家|いえ}にいない。{窓|まど}を{閉|し}めているのは{臭|くさ}いから。",
			cn: "「想快点回家」说明现在不在家；关窗是因为外面臭，不是因为冷；「こんなに人が多い」说明人不少；火势已经在被控制。",
			en: "“I want to go home soon” means they are not home now. The windows are shut because of the smell, not the cold. “So many people” means it is crowded. The fire is already coming under control.",
		},
	},

	mondai: {
		instruction: "{次|つぎ}の{新聞記事|しんぶんきじ}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的新闻报道，回答后面的问题。（答案在别册 p.5）※原书为竖排书写。",
		instructionEn: "Read the newspaper article below and answer the questions that follow. (Answers are in the separate booklet, p. 5.) ※ The original is written vertically.",
		blocks: [
			{ type: "line", jp: "{避難場所|ひなんばしょ}", cn: "避难场所", en: "Evacuation site" },
			{ type: "title", jp: "{窓閉|まどし}め{切|き}り{眠|ねむ}れぬ{一夜|いちや}", cn: "紧闭门窗　无眠一夜", en: "Windows shut tight — a sleepless night" },
			{ type: "line", jp: "タイヤ{工場火災|こうじょうかさい}", cn: "轮胎工厂火灾", en: "Tire-factory fire", align: "right" },
			{
				type: "paragraph",
				indent: true,
				jp: "{八日|ようか}に{起|お}きた{栃木県|とちぎけん}のタイヤ{工場|こうじょう}の{火災|かさい}は、{九日朝|ここのかあさ}になって、ようやく{鎮火|ちんか}した（※1）。{避難指示解除|ひなんしじかいじょ}（※2）が{伝|つた}えられ、{避難場所|ひなんばしょ}の{体育館|たいいくかん}から{自宅|じたく}に{戻|もど}った{付近|ふきん}の{住民|じゅうみん}は、{一様|いちよう}に（※3）「ほっとした」と{話|はな}していたが、{一晩眠|ひとばんねむ}れなかったようで{疲|つか}れた{表情|ひょうじょう}をしていた。……",
				cn: "8 日发生的栃木县轮胎工厂火灾，直到 9 日早晨才终于扑灭。随着解除避难指示的通知传来，从避难场所体育馆返回家中的附近居民都异口同声地说「总算放心了」，但看上去一夜未眠，神情疲惫。……",
				en: "The fire at a tire factory in Tochigi Prefecture that started on the 8th was finally extinguished on the morning of the 9th. After word came that the evacuation order had been lifted, nearby residents who returned home from the gym used as a shelter all said they were “relieved,” but they looked exhausted, as if they had not slept all night. …",
			},
		],
		footnotes: [
			{ marker: "※1", term: "鎮火する", jp: "to be extinguished", cn: "火被扑灭", en: "to be extinguished" },
			{ marker: "※2", term: "避難指示解除", jp: "lift of the evacuation order", cn: "解除避难指示", en: "lift of the evacuation order" },
			{ marker: "※3", term: "一様に", jp: "all", cn: "全都、异口同声地", en: "all" },
		],
		questions: [
			{
				label: "問1",
				jp: "この{記事|きじ}からわからないことはどれか。",
				cn: "从这则报道中无法得知的是哪一项？",
				en: "Which of the following cannot be learned from this article?",
				choices: [
					{ jp: "{火事|かじ}の{起|お}きた{時間|じかん}", cn: "起火的时间", en: "the time the fire started" },
					{ jp: "{火事|かじ}の{場所|ばしょ}", cn: "起火的地点", en: "the place of the fire" },
					{ jp: "{避難場所|ひなんばしょ}", cn: "避难场所", en: "the evacuation site" },
					{ jp: "{付近住民|ふきんじゅうみん}のようす", cn: "附近居民的情况", en: "how nearby residents were" },
				],
				answer: 1,
				explanation:
					"报道只写了「八日に起きた」——是 8 日发生的，但具体几点起火完全没有提到。其余三项都写得很清楚。这类「わからないことはどれか」的题，要逐项在原文里找依据，找不到的那个就是答案。",
				explanationEn:
					"The article only says it “started on the 8th” — the exact time of day is never given. The other three points are stated clearly. On “which cannot be known” questions, check each choice against the text; the one you cannot find is the answer.",
				choiceNotes: [
					"正确（＝无法得知）。只知道是「八日」，没有具体时刻。",
					"「栃木県のタイヤ工場」——写明了地点。",
					"「避難場所の体育館」——写明了是体育馆。",
					"「一様に『ほっとした』と話していた」「疲れた表情をしていた」——写得很具体。",
				],
				choiceNotesEn: [
					"Correct (= cannot be known). We only know “the 8th,” not the exact time.",
					"“A tire factory in Tochigi Prefecture” — the place is stated.",
					"“The gym used as a shelter” — the site is stated.",
					"“They all said they were relieved” and “they looked exhausted” — quite specific.",
				],
			},
			{
				label: "問2",
				jp: "この{記事|きじ}の{内容|ないよう}と{合|あ}っているものはどれか。",
				cn: "下列哪一项与这则报道的内容相符？",
				en: "Which of the following matches the content of this article?",
				choices: [
					{
						jp: "タイヤ{工場|こうじょう}の{火事|かじ}の{音|おと}がうるさく、{住民|じゅうみん}は{眠|ねむ}れなかった。",
						cn: "轮胎工厂火灾的声音很吵，居民睡不着。",
						en: "The noise of the tire-factory fire was so loud that residents could not sleep.",
					},
					{ jp: "タイヤ{工場|こうじょう}の{火事|かじ}のせいで、{窓|まど}を{閉|し}めなければならなかった。", cn: "因为轮胎工厂的火灾，不得不关上窗户。", en: "Because of the tire-factory fire, they had to keep the windows shut." },
					{
						jp: "{避難|ひなん}していた{住民|じゅうみん}は、{体育館|たいいくかん}で{寝|ね}ることができて{安心|あんしん}した。",
						cn: "避难的居民能在体育馆睡觉，所以放心了。",
						en: "The evacuated residents were relieved because they could sleep in the gym.",
					},
					{ jp: "{避難|ひなん}していた{住民|じゅうみん}は、{夜|よる}のうちに{自宅|じたく}に{帰|かえ}ることができた。", cn: "避难的居民在夜里就回到了家中。", en: "The evacuated residents were able to go home during the night." },
				],
				answer: 2,
				explanation:
					"关键在标题「窓閉め切り眠れぬ一夜」。把它还原成完整的句子就是「（タイヤ工場の火事のために）窓を閉め切って、（住民は）その夜眠ることができなかった」——因为工厂火灾（烟和臭味），只好紧闭窗户。所以 2 正确。这正是本课要点：标题里藏着报道的核心。",
				explanationEn:
					"The key is the headline “Windows shut tight — a sleepless night.” Restored as a full sentence it is “(Because of the tire-factory fire) they kept the windows shut, and (residents) could not sleep that night.” So 2 is correct. That is this lesson’s point: the headline hides the core of the article.",
				choiceNotes: [
					"睡不着的原因是火灾本身和紧闭门窗，报道没有提到「声音吵」。",
					"正确。标题「窓閉め切り」＝因火灾而紧闭窗户。",
					"「一晩眠れなかったようで疲れた表情」——他们在体育馆并没有睡好；放心是在回家之后。",
					"「九日朝になって、ようやく鎮火した」——是第二天早上才解除避难，不是夜里回家。",
				],
				choiceNotesEn: [
					"They could not sleep because of the fire itself and the shut windows; the article never mentions “noise.”",
					"Correct. The headline “windows shut tight” = they had to keep the windows closed because of the fire.",
					"“They looked exhausted, as if they had not slept all night” — they did not sleep well in the gym; they were relieved after going home.",
					"“Finally extinguished on the morning of the 9th” — they went home the next morning, not during the night.",
				],
			},
		],
	},

	vocab: [
		{ jp: "見出し", kana: "みだし", cn: "标题", en: "headline", pos: "名詞" },
		{ jp: "省略形", kana: "しょうりゃくけい", cn: "省略形式", en: "shortened / abbreviated form", pos: "名詞" },
		{ jp: "記事", kana: "きじ", cn: "报道、文章", en: "article / news story", pos: "名詞" },
		{ jp: "火災", kana: "かさい", cn: "火灾", en: "a fire (disaster)", pos: "名詞" },
		{ jp: "鎮火する", kana: "ちんかする", cn: "扑灭（火）", en: "to be extinguished", pos: "動詞" },
		{ jp: "避難", kana: "ひなん", cn: "避难", en: "evacuation / taking shelter", pos: "名詞・動詞" },
		{ jp: "避難所／避難場所", kana: "ひなんじょ／ひなんばしょ", cn: "避难所、避难场所", en: "shelter / evacuation site", pos: "名詞" },
		{ jp: "指示", kana: "しじ", cn: "指示", en: "order / instruction", pos: "名詞・動詞" },
		{ jp: "解除", kana: "かいじょ", cn: "解除", en: "lifting / cancellation", pos: "名詞・動詞" },
		{ jp: "住民", kana: "じゅうみん", cn: "居民", en: "residents", pos: "名詞" },
		{ jp: "付近", kana: "ふきん", cn: "附近", en: "the area nearby", pos: "名詞" },
		{ jp: "一様に", kana: "いちように", cn: "全都、异口同声地", en: "all / uniformly", pos: "副詞" },
		{ jp: "表情", kana: "ひょうじょう", cn: "神情、表情", en: "expression (on one’s face)", pos: "名詞" },
		{ jp: "閉め切る", kana: "しめきる", cn: "紧闭", en: "to keep (windows) shut", pos: "動詞" },
		{ jp: "体育館", kana: "たいいくかん", cn: "体育馆", en: "gymnasium", pos: "名詞" },
		{ jp: "自宅", kana: "じたく", cn: "自己家", en: "one’s own home", pos: "名詞" },
		{ jp: "ほっとする", cn: "松一口气", en: "to feel relieved", pos: "動詞" },
		{ jp: "猛暑日", kana: "もうしょび", cn: "酷暑日（35℃ 以上）", en: "extreme-heat day (35°C+)", pos: "名詞" },
		{ jp: "優勝", kana: "ゆうしょう", cn: "夺冠", en: "to win the championship", pos: "名詞・動詞" },
	],

	grammar: [
		{
			pattern: "〜ぬ（＝〜ない）",
			meaning: "文语的否定形，报纸标题、书面语中常用来代替「ない」以缩短字数。",
			meaningEn: "The classical negative, often used in headlines and written style instead of nai to save space.",
			example: { jp: "{眠|ねむ}れぬ{一夜|いちや}（＝{眠|ねむ}れない{一夜|いちや}）", cn: "无法入睡的一夜", en: "a night one cannot sleep" },
			note: "本课要点。标题里看到「〜ぬ」，先换成「〜ない」再理解。",
			noteEn: "This lesson’s key point. When you see ~nu in a headline, swap it for ~nai first.",
		},
		{
			pattern: "{見出|みだ}しの{助詞省略|じょししょうりゃく}",
			meaning: "标题中「は・が・を・に・で」等助词常被省略，需要自己补回去。",
			meaningEn: "Particles such as wa, ga, o, ni, and de are often dropped in headlines; you have to put them back yourself.",
			example: {
				jp: "{窓閉|まどし}め{切|き}り{眠|ねむ}れぬ{一夜|いちや}（＝{窓|まど}を{閉|し}め{切|き}って、{眠|ねむ}れない{一夜|いちや}を{過|す}ごした）",
				cn: "紧闭门窗，度过了无法入睡的一夜",
				en: "keeping the windows shut, they spent a sleepless night",
			},
		},
		{
			pattern: "ようやく",
			meaning: "终于、好不容易才。含有「等了很久」的语气。",
			meaningEn: "At last / finally. Carries the feeling that one has waited a long time.",
			example: { jp: "{九日朝|ここのかあさ}になって、ようやく{鎮火|ちんか}した。", cn: "到 9 日早上才终于扑灭。", en: "It was finally extinguished on the morning of the 9th." },
		},
		{
			pattern: "〜せいで",
			formation: "名詞＋の／普通形 ＋ せいで",
			meaning: "由于……（不好的原因）。",
			meaningEn: "Because of … (a bad cause).",
			example: { jp: "タイヤ{工場|こうじょう}の{火事|かじ}のせいで", cn: "因为轮胎工厂的火灾", en: "because of the tire-factory fire" },
		},
		{
			pattern: "〜ようで／〜ようだ",
			meaning: "看起来……、好像……。根据外表做出的判断。",
			meaningEn: "It seems / looks as if …. A judgment based on appearance.",
			example: { jp: "{一晩眠|ひとばんねむ}れなかったようで{疲|つか}れた{表情|ひょうじょう}をしていた。", cn: "看上去一夜未眠，神情疲惫。", en: "They looked exhausted, as if they had not slept all night." },
		},
		{
			pattern: "〜のうちに",
			formation: "名詞＋の ＋ うちに",
			meaning: "趁着……的时候、在……期间内。",
			meaningEn: "While / during … (before that period ends).",
			example: { jp: "{夜|よる}のうちに{自宅|じたく}に{帰|かえ}る", cn: "在夜里回到家中", en: "to go home during the night" },
		},
		{
			pattern: "〜てくる",
			meaning: "逐渐……起来。表示变化的趋势。",
			meaningEn: "To start to … / to come to …. Shows a change under way.",
			example: { jp: "{火事|かじ}もおさまってきている", cn: "火势也渐渐平息下来了", en: "the fire is also coming under control" },
		},
	],
};
