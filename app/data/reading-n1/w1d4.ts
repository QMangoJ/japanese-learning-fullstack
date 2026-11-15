import type { ReadingDay } from "../reading-n3/types";

// 第1週 4日目 長文によく使われる表現 — printed pages 18–19
export const w1d4: ReadingDay = {
	week: 1,
	day: 4,
	label: "長文によく使われる表現",
	labelKana: "ちょうぶん",
	labelEn: "Expressions often used in long texts",
	printedPages: [18, 19],
	answerSource: "book",

	point: {
		title: "{句末|くまつ}の{表現|ひょうげん}に{注意|ちゅうい}！",
		titleCn: "注意句末表达方式！",
		titleEn: "Watch out for sentence-final expressions!",
		figure: {
			alt: "「『ない』がまたたくさんある……」と横になる黒猫と、眼鏡をかけた猫先生のイラスト",
			cn: "一只躺着说「『ない』又有一大堆……」的黑猫，和一只戴眼镜的猫老师的插图",
			en: "A black cat lying down saying “'Nai' again, so many of them…” and a teacher cat with glasses",
		},
		tips: [
			{
				jp: "{他|ほか}にも{句末表現|くまつひょうげん}はたくさんある。「ない」を{含|ふく}むものも{少|すく}なくない。",
				cn: "除了这些，句末表达方式还有很多。不少是带有“ない”的哦。",
				en: "There are many more sentence-final expressions besides these — quite a few of them contain “nai.”",
			},
		],
		expressions: [
			{ jp: "〜にすぎない", cn: "＝〜だけだ（只不过是……而已）", en: "= nothing more than ~" },
			{ jp: "〜（に）ほかならない", cn: "断定、强调「〜である」（正是……）", en: "asserts and emphasises “it is ~” — nothing other than ~" },
			{ jp: "〜ざるをえない", cn: "＝〜なければならない（不得不……）", en: "= have no choice but to ~" },
			{ jp: "〜ないではすまない", cn: "＝〜なければならない（不……就不行）", en: "= must ~; it won't do not to ~" },
			{ jp: "必ずしも〜とはかぎらない", cn: "＝全部が〜ではない（未必……）", en: "= not all ~; not necessarily ~" },
			{ jp: "一概に〜とは言えない", cn: "部分否定（不能一概而论）", en: "partial negation — cannot be said across the board" },
			{ jp: "多かれ少なかれ〜ある", cn: "强调「いる」「ある」（或多或少有……）", en: "emphasises existence — more or less ~" },
			{ jp: "少なからず〜いる／ある", cn: "强调「いる」「ある」（有不少……）", en: "emphasises existence — quite a few ~" },
			{ jp: "〜ずにはいられない", cn: "＝どうしても〜してしまう（忍不住……）", en: "= cannot help doing ~" },
			{ jp: "〜ずにはおかない", cn: "＝どうしても〜してしまう（非……不可）", en: "= will definitely ~; won't rest without ~" },
			{ jp: "〜は言うまでもない", cn: "＝〜は当然である（……是不言而喻的）", en: "= it goes without saying that ~" },
		],
		notes: [
			{
				jp: "「ない」がまたたくさんある……",
				cn: "“ない”又有一大堆……",
				en: "“Nai” again — so many of them…",
			},
		],
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的文章，回答问题。",
		instructionEn: "Read each text below and answer its question. (Answers are in the separate booklet, p. 2.)",
		blocks: [
			{ type: "heading", jp: "1", cn: "第 1 题", en: "Exercise 1" },
			{
				type: "paragraph",
				jp: "{実|じつ}に{嘆|なげ}かわしいことであるが*、そういう{人|ひと}が{少|すく}なからずいるのである。",
				cn: "虽然实在令人可叹，但那样的人不在少数。",
				en: "It is so deplorable that …, but there are quite a few people like that.",
				indent: true,
			},
			{ type: "heading", jp: "2", cn: "第 2 题", en: "Exercise 2" },
			{
				type: "paragraph",
				jp: "いくら{信号|しんごう}が{青|あお}だったとはいっても、そんなにスピードを{出|だ}していたのでは、{事故|じこ}の{責任|せきにん}は{君|きみ}にあると{言|い}わざるをえない。",
				cn: "不管信号灯是绿灯，你开得那么快，只能说事故的责任在你。",
				en: "Even if the light was green, driving at that speed, I have to say the responsibility for the accident lies with you.",
				indent: true,
			},
			{ type: "heading", jp: "3", cn: "第 3 题", en: "Exercise 3" },
			{
				type: "paragraph",
				jp: "ある{年齢|ねんれい}に{達|たっ}したときに、「{若|わか}いときと{同|おな}じように{活動的|かつどうてき}であり{続|つづ}けるべきだ。{若|わか}さを{保|たも}ち{健康|けんこう}でいるために{働|はたら}き{続|つづ}けることが{大切|たいせつ}だ。だから{現在|げんざい}の{状況|じょうきょう}をできるだけ{変|か}えないのがいい。*」と{主張|しゅちょう}する{人|ひと}がいる。しかし、これは{今現在健康|いまげんざいけんこう}である{人|ひと}の{言葉|ことば}にすぎない。",
				cn: "有人主张，到了某个年龄时，「应该像年轻时一样坚持活动。为了保持年轻和健康，不断工作是很重要的。所以最好尽量不要改变现在的状况。」但是，这只不过是现在健康的人说的话罢了。",
				en: "Some people argue that when you reach a certain age, “You should continue to be as active in your old age as you were young. In order to stay young and healthy, it is important to keep working and to maintain an active life style. That is why it is better not to change your current life style.” However, these are only the words of people who are healthy now.",
				indent: true,
			},
			{ type: "heading", jp: "4", cn: "第 4 题", en: "Exercise 4" },
			{
				type: "paragraph",
				jp: "むき{出|だ}しの{好奇心|こうきしん}にブレーキをかけて（注1）、はっきり「{知|し}らない」といえず、そして、それを{恥|はず}かしい、と{思|おも}うようになるのは、それだけ{自我意識|じがいしき}が{確立|かくりつ}した、ということにほかならない**わけだから、（　）。しかし、{知|し}りたいという{欲求|よっきゅう}をおさえて、{知|し}ったかぶりをする（注2）、というのは{人生|じんせい}の{生|い}きかたとして、{大|おお}きなマイナスなのではないか。{頭|あたま}のなかには、まだ、いくらでも{情報|じょうほう}は{入|はい}る{余裕|よゆう}がある。{好奇心|こうきしん}にブレーキをかけるのは、けっして{賢明|けんめい}なことではないのだ。",
				cn: "压抑外露的好奇心，不好意思说「不知道」，而且觉得难为情，这些都只能说明确立了自我意识，所以（ ）。然而，压抑想知道的欲望而装懂，作为一种活法，难道不是很大的负面因素吗。头脑里还有的是容纳信息的余地。给好奇心踩刹车，绝不是明智之举。",
				en: "If you put the brakes on your curiosity and you cannot say that you don't know and you feel embarrassed, it means that you have developed your self-control — so ( ). However, suppressing the desire to know and pretending to know is surely a big minus as a way of living. There is still plenty of room in our heads for information. Putting the brakes on curiosity is never a wise thing to do.",
				indent: true,
			},
			{
				type: "source",
				jp: "（{加藤秀俊|かとうひでとし}『{加藤秀俊著作集|かとうひでとしちょさくしゅう}6』{中央公論社|ちゅうおうこうろんしゃ}）",
				cn: "（加藤秀俊《加藤秀俊著作集6》中央公论社）",
				en: "(Katō Hidetoshi, Collected Works of Katō Hidetoshi 6, Chūōkōronsha)",
			},
		],
		footnotes: [
			{ marker: "注1", term: "ブレーキをかける", jp: "ぶれーきをかける", cn: "踩刹车：抑制事物的进行", en: "to put on the brakes: to hold back the progress of something" },
			{ marker: "注2", term: "知ったかぶりをする", jp: "しったかぶりをする", cn: "装懂：假装知道", en: "to pretend to know" },
		],
		questions: [
			{
				label: "問1",
				jp: "そういう{人|ひと}とあるが、それはどれぐらいいるか。",
				cn: "文中说「那样的人」，那是有多少人呢？",
				en: "The text mentions “people like that” — how many of them are there?",
				choices: [
					{ jp: "たくさんいる", cn: "有很多。", en: "There are many." },
					{ jp: "すこししかいない", cn: "只有一点点。", en: "There are only a few." },
				],
				answer: 1,
				explanation:
					"关键在「少なからず」：别册提示「少なからずいる」＝少なくない、多い——「少なからず」是「少なく＋ず（＝ない）」的双重否定，意思是「不在少数」。所以选 1。",
				explanationEn:
					"The key is “sukunakarazu”: the booklet glosses “sukunakarazu iru” as “sukunakunai, ōi” (not few — many). “Zu” is the classical negative, so the word is a double negative meaning “quite a few.” Answer 1.",
				choiceNotes: [
					"正确。「少なからず」＝不少。",
					"把「少なからず」误读成了「少」。",
				],
				choiceNotesEn: [
					"Correct. “Sukunakarazu” = quite a few.",
					"This misreads “sukunakarazu” as “few.”",
				],
			},
			{
				label: "問2",
				jp: "{事故|じこ}の{責任|せきにん}は{君|きみ}にあると{言|い}わざるをえないとはどのような{意味|いみ}か。",
				cn: "「只能说事故的责任在你」是什么意思？",
				en: "What does “I have to say the responsibility for the accident lies with you” mean?",
				choices: [
					{ jp: "{事故|じこ}の{責任|せきにん}は{君|きみ}にある", cn: "事故的责任在你。", en: "The responsibility for the accident lies with you." },
					{ jp: "{事故|じこ}の{責任|せきにん}は{君|きみ}にはない", cn: "事故的责任不在你。", en: "The responsibility for the accident does not lie with you." },
				],
				answer: 1,
				explanation:
					"「〜と言わざるをえない」＝「〜と言わないわけにはいかない」（别册提示）——形式上有否定，意思却是肯定的断定：不得不说、只能说。所以意思就是「事故的责任在你」，选 1。",
				explanationEn:
					"“~to iwazaru o enai” = “~to iwanai wake ni wa ikanai” (the booklet's gloss). It looks negative but asserts the positive: “I have no choice but to say….” So it means the responsibility does lie with you — answer 1.",
				choiceNotes: [
					"正确。「言わざるをえない」是肯定的断定。",
					"被句中的否定形式骗了。",
				],
				choiceNotesEn: [
					"Correct. “Iwazaru o enai” is a positive assertion.",
					"This is fooled by the negative form.",
				],
			},
			{
				label: "問3",
				jp: "{健康|けんこう}である{人|ひと}の{言葉|ことば}にすぎないとはどのような{意味|いみ}か。",
				cn: "「只不过是健康的人说的话」是什么意思？",
				en: "What does “they are only the words of people who are healthy” mean?",
				choices: [
					{ jp: "{健康|けんこう}な{人|ひと}が{言|い}う{言葉|ことば}ではない", cn: "不是健康的人说的话。", en: "They are not words that healthy people say." },
					{ jp: "{健康|けんこう}な{人|ひと}は{言|い}いすぎることがある", cn: "健康的人有时会说得过头。", en: "Healthy people sometimes say too much." },
					{ jp: "{健康|けんこう}な{人|ひと}だけが{言|い}う{言葉|ことば}だ", cn: "是只有健康的人才会说的话。", en: "They are words that only healthy people say." },
					{ jp: "{健康|けんこう}な{人|ひと}はその{言葉|ことば}を{言|い}わない", cn: "健康的人不说那种话。", en: "Healthy people do not say such things." },
				],
				answer: 3,
				explanation:
					"「〜にすぎない」＝「〜だけだ」（本课要点）：「健康である人の言葉にすぎない」＝只有现在健康的人才会说这种话——不健康的人说不出、也做不到。所以选 3。",
				explanationEn:
					"“~ni suginai” = “~dake da” (this day's point): “only the words of people who are healthy now” — people who are not healthy could not say or do this. Answer 3.",
				choiceNotes: [
					"与原文相反：原文说这正是健康的人的话。",
					"把「すぎない」误读成了「言いすぎる」。",
					"正确。「にすぎない」＝だけだ。",
					"与原文相反。",
				],
				choiceNotesEn: [
					"The opposite: the text says they are precisely healthy people's words.",
					"This confuses “suginai” with “iisugiru” (say too much).",
					"Correct. “Ni suginai” = nothing more than.",
					"The opposite of the text.",
				],
			},
			{
				label: "問4",
				jp: "（　）にはどんな{言葉|ことば}が{入|はい}るか。",
				cn: "（ ）里填入什么词语？",
				en: "What words go in the ( )?",
				choices: [
					{ jp: "{少|すく}なからず、それをわるいことではないと{思|おも}う", cn: "有不少，我认为那不是坏事。", en: "Quite a few — I think it is not a bad thing." },
					{ jp: "いちがいに、それをわるいことだ、とは{思|おも}わない", cn: "不能一概而论，我不认为那（全）是坏事。", en: "I don't unconditionally think it is a bad thing." },
					{ jp: "はたして、それをわるいというのは{疑問|ぎもん}になるだろう", cn: "那究竟是不是坏事，会成为疑问吧。", en: "Whether it is bad would become a question." },
					{ jp: "{必|かなら}ずしも、それがわるくないとは{限|かぎ}らない", cn: "那未必就不是坏事。", en: "It is not necessarily the case that it is not bad." },
				],
				answer: 2,
				explanation:
					"前文说这种变化是「自我意識が確立したことにほかならない」——即有其积极面；后面用「しかし」转折批评压抑好奇心。所以（ ）里需要一个「部分否定」的缓和判断：いちがいに悪いことだとは思わない（不能一概而论说是坏事）。别册的要点表里「一概に〜とは言えない」正是「部分的に否定している」。4 的「必ずしも〜とは限らない」逻辑上等于「有时是坏的」，与后文衔接不顺；1、3 也不合逻辑。",
				explanationEn:
					"The preceding text frames the change positively — it means self-awareness has been established — and then “shikashi” turns to criticising suppressed curiosity. So the ( ) needs a partial negation: “ichigai ni warui koto da to wa omowanai” (I don't think it is bad across the board). The day's table lists “ichigai ni ~to wa ienai” as a partial negation. 4's double negative does not connect as smoothly, and 1 and 3 do not fit the logic.",
				choiceNotes: [
					"「少なからず」用在句首指数量，这里不合。",
					"正确。部分否定，与前后逻辑衔接。",
					"「はたして…だろう」与「わけだから」的断定语气不合。",
					"逻辑绕了一层，衔接不如 2 自然。",
				],
				choiceNotesEn: [
					"“Sukunakarazu” concerns quantity; it does not fit at the head of this clause.",
					"Correct. A partial negation that connects with the logic.",
					"“Hatashite…darō” clashes with the assertive “wake da kara.”",
					"The logic is convoluted and connects less naturally than 2.",
				],
			},
		],
		pageNotes: [
			{
				jp: "* it is so deplorable that …",
				cn: "虽然令人可叹……",
				en: "it is so deplorable that …",
			},
			{
				jp: "* You should continue to be as active in your old age as you were young. In order to stay young and healthy, it is important to keep working and to maintain an active life style. That is why it is better not to change your current life style.",
				cn: "应该像年轻时一样坚持活动。为了保持年轻和健康，不断工作是很重要的。所以最好尽量不要改变现在的状况。",
				en: "You should continue to be as active in your old age as you were young. In order to stay young and healthy, it is important to keep working and to maintain an active life style. That is why it is better not to change your current life style.",
			},
			{
				jp: "** if you put the brakes on your curiosity and you cannot say that you don't know and you feel embarrassed, it means that you have developed your self-control",
				cn: "压抑好奇心，不好意思说“不知道”，而且觉得难为情，这些都只能说明确立了自我意识",
				en: "if you put the brakes on your curiosity and you cannot say that you don't know and you feel embarrassed, it means that you have developed your self-control",
			},
		],
	},

	vocab: [
		{ jp: "年齢", kana: "ねんれい", cn: "年龄", en: "age", pos: "名詞" },
		{ jp: "達する", kana: "たっする", cn: "达到", en: "to reach; to attain", pos: "動詞" },
		{ jp: "活動的", kana: "かつどうてき", cn: "活动性的、积极活动的", en: "active", pos: "な形" },
		{ jp: "保つ", kana: "たもつ", cn: "保持", en: "to keep; to maintain", pos: "動詞" },
		{ jp: "主張", kana: "しゅちょう", cn: "主张", en: "a claim; assertion", pos: "名詞・動詞" },
		{ jp: "状況", kana: "じょうきょう", cn: "状况", en: "a situation; circumstances", pos: "名詞" },
		{ jp: "好奇心", kana: "こうきしん", cn: "好奇心", en: "curiosity", pos: "名詞" },
		{ jp: "恥かしい", kana: "はずかしい", cn: "害羞的、难为情的", en: "embarrassing; ashamed", pos: "い形" },
		{ jp: "自我意識", kana: "じがいしき", cn: "自我意识", en: "self-awareness", pos: "名詞" },
		{ jp: "確立", kana: "かくりつ", cn: "确立", en: "establishment", pos: "名詞・動詞" },
		{ jp: "欲求", kana: "よっきゅう", cn: "欲望、需求", en: "a desire; a want", pos: "名詞" },
		{ jp: "賢明", kana: "けんめい", cn: "明智的", en: "wise; sensible", pos: "名詞・な形" },
		{ jp: "余裕", kana: "よゆう", cn: "余地、富余", en: "room to spare; leeway", pos: "名詞" },
		{ jp: "責任", kana: "せきにん", cn: "责任", en: "responsibility", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜にすぎない",
			formation: "普通形＋にすぎない",
			meaning: "只不过是……而已。＝〜だけだ。表示程度或范围仅止于此。",
			meaningEn: "nothing more than ~; only ~. (= ~dake da)",
			example: {
				jp: "これは{今現在健康|いまげんざいけんこう}である{人|ひと}の{言葉|ことば}にすぎない。",
				cn: "这只不过是现在健康的人说的话罢了。",
				en: "These are only the words of people who are healthy now.",
			},
		},
		{
			pattern: "必ずしも〜とは限らない",
			formation: "必ずしも＋普通形＋とは限らない",
			meaning: "未必……、不一定……。部分否定：不是全部都如此。",
			meaningEn: "not necessarily ~; not always the case that ~. A partial negation.",
			example: {
				jp: "{必|かなら}ずしも、それがわるくないとは{限|かぎ}らない。",
				cn: "那未必就不是坏事。",
				en: "It is not necessarily the case that it is not bad.",
			},
		},
		{
			pattern: "〜ざるをえない",
			formation: "動詞ない形（→ざる）＋をえない",
			meaning: "不得不……。＝〜なければならない。",
			meaningEn: "have no choice but to ~. (= ~nakereba naranai)",
			example: {
				jp: "{事故|じこ}の{責任|せきにん}は{君|きみ}にあると{言|い}わざるをえない。",
				cn: "只能说事故的责任在你。",
				en: "I have to say the responsibility for the accident lies with you.",
			},
		},
	],
};
