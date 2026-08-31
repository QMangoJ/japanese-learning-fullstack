import type { ReadingDay } from "../reading-n3/types";

// 第6週 2日目 化学に関する文章 — printed pages 98–99
export const w6d2: ReadingDay = {
	week: 6,
	day: 2,
	label: "化学に関する文章",
	labelKana: "かがくにかんするぶんしょう",
	labelEn: "Article on Chemistry",
	printedPages: [98, 99],
	answerSource: "book",

	point: {
		title: "キーワードを{見|み}つけよう！",
		titleCn: "找出关键词！",
		titleEn: "Try to find the key words!",
		figure: {
			alt: "左手の新聞記事では「キーワード」が何度も○で囲まれ、四択の答えも①キーワード。右では「女の子」が何度も出てくる文を○で囲みながら読むキャラクター",
			cn: "左边报纸短文里「キーワード」被反复圈出，选项也是①キーワード；右边角色一边读一边把反复出现的「女の子」圈起来。",
			en: "On the left, a newspaper snippet has キーワード circled again and again, and the multiple-choice answer is ① キーワード. On the right, a character reads while circling 女の子, which keeps appearing.",
		},
		tips: [
			{
				jp: "{例|たと}えばこんなふうにチェックします。",
				cn: "比如可以像这样做记号。",
				en: "Check the text in a way like this, for example.",
			},
			{
				jp: "★{何度|なんど}も{出|で}てくる{言葉|ことば}はキーワードです。○をつけながら{読|よ}みましょう。",
				cn: "反复出现的词就是关键词。一边圈一边读。",
				en: "Words that appear repeatedly are keywords. Mark them with ○ as you read.",
			},
			{
				jp: "どんな{文章|ぶんしょう}にもキーワードというものがあります。キーワードとは、かなり{重要|じゅうよう}な{言葉|ことば}です。{文章|ぶんしょう}にキーワードという{言葉|ことば}が{何度|なんど}も{出|で}てきたら、それがキーワードだという{可能性|かのうせい}が{高|たか}いです。",
				cn: "任何文章都有关键词。关键词是相当重要的词。如果「关键词」这个词在文章里反复出现，它本身是关键词的可能性就很高——这是书上那则短文的玩笑。",
				en: "Every passage has keywords — fairly important words. If the word “keyword” itself keeps appearing, it is very likely the keyword. That is the joke in the sample clipping.",
			},
		],
		expressions: [
			{ jp: "キーワード", cn: "关键词", en: "keyword" },
			{ jp: "シックハウス症候群", kana: "しっくはうすしょうこうぐん", cn: "室内空气污染综合征、病屋综合征", en: "sick-house syndrome" },
			{ jp: "接着剤", kana: "せっちゃくざい", cn: "粘合剂、胶水", en: "adhesive" },
			{ jp: "ホルムアルデヒド", cn: "甲醛", en: "formaldehyde" },
			{ jp: "たんぱく質", kana: "たんぱくしつ", cn: "蛋白质", en: "protein" },
			{ jp: "一概に〜ない", kana: "いちがいに", cn: "不能一概而论", en: "cannot generalize; not necessarily" },
			{ jp: "〜に満たない", kana: "みたない", cn: "达不到……、不足……", en: "falls short of…; is insufficient" },
			{ jp: "変質", kana: "へんしつ", cn: "变质", en: "denaturation; alteration of quality" },
		],
	},

	renshu: {
		instruction:
			"{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn:
			"Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "A",
				speakerCn: "A",
				speakerEn: "A",
				jp: "わあ、きれいなマンション。{新築|しんちく}なんだね。",
				cn: "哇，好漂亮的公寓。是新建的啊。",
				en: "Wow, what a nice apartment building. It’s newly built, isn’t it?",
			},
			{
				type: "speech",
				speaker: "B",
				speakerCn: "B",
				speakerEn: "B",
				jp: "うん。でもさ、なんか、この{部屋|へや}に{引|ひ}っ{越|こ}してから{調子|ちょうし}が{悪|わる}いんだ。",
				cn: "嗯。可是啊，搬进这间房之后身体就不太对劲。",
				en: "Yeah. But, you know, I’ve felt off ever since I moved into this room.",
			},
			{
				type: "speech",
				speaker: "A",
				speakerCn: "A",
				speakerEn: "A",
				jp: "え？　どんなふうに？",
				cn: "诶？怎么个不对劲法？",
				en: "Huh? In what way?",
			},
			{
				type: "speech",
				speaker: "B",
				speakerCn: "B",
				speakerEn: "B",
				jp: "よく{頭痛|ずつう}がするし、{目|め}がチカチカする（{注|ちゅう}1）んだよね。",
				cn: "经常头痛，眼睛还刺刺的（注1）。",
				en: "I get headaches a lot, and my eyes burn (note 1).",
			},
			{
				type: "speech",
				speaker: "A",
				speakerCn: "A",
				speakerEn: "A",
				jp: "あ、もしかしたら、シックハウス{症候群|しょうこうぐん}（{注|ちゅう}2）じゃない？　ほら、{壁紙|かべがみ}の{接着剤|せっちゃくざい}（{注|ちゅう}3）なんかでアレルギー{症状|しょうじょう}（{注|ちゅう}4）が{出|で}るっていうじゃない。",
				cn: "啊，会不会是病屋综合征（注2）？你看，不是说壁纸的粘合剂（注3）什么的会引发过敏症状（注4）吗。",
				en: "Oh, maybe it’s sick-house syndrome (note 2)? You know — they say wallpaper adhesive (note 3) and such can cause allergic symptoms (note 4).",
			},
			{
				type: "speech",
				speaker: "B",
				speakerCn: "B",
				speakerEn: "B",
				jp: "やっぱりそうかなぁ。{病院|びょういん}へ{行|い}って{調|しら}べてもらおうかな。",
				cn: "果然是那样吗。要不要去医院查一查。",
				en: "So that’s it, then? Maybe I should go to the hospital and have it checked.",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "チカチカする", jp: "(eyes) burning", cn: "刺眼", en: "(eyes) burning" },
			{
				marker: "（注2）",
				term: "シックハウス症候群",
				jp: "sick-house syndrome",
				cn: "室内空气污染综合征",
				en: "sick-house syndrome",
			},
			{ marker: "（注3）", term: "接着剤", jp: "adhesive", cn: "粘合剂", en: "adhesive" },
			{
				marker: "（注4）",
				term: "アレルギー症状",
				jp: "an allergic reaction",
				cn: "过敏症状",
				en: "an allergic reaction",
			},
		],
		choices: [
			{
				jp: "Bさんは{最近|さいきん}、{新築|しんちく}のマンションに{引|ひ}っ{越|こ}した。",
				cn: "B 最近搬进了新建的公寓。",
				en: "B recently moved into a newly built apartment.",
			},
			{
				jp: "Bさんの{体調|たいちょう}が{悪|わる}い{原因|げんいん}は、はっきりわかっている。",
				cn: "B 身体不适的原因已经清楚了。",
				en: "The cause of B’s feeling unwell is clearly known.",
			},
			{
				jp: "Bさんは{引|ひ}っ{越|こ}しする{前|まえ}から{接着剤|せっちゃくざい}に{対|たい}してアレルギー{症状|しょうじょう}が{出|で}ていた。",
				cn: "B 在搬家之前就对粘合剂出现过过敏症状。",
				en: "B already had allergic symptoms to adhesive before moving.",
			},
			{
				jp: "Aさんもシックハウス{症候群|しょうこうぐん}である。",
				cn: "A 也得了病屋综合征。",
				en: "A also has sick-house syndrome.",
			},
			{
				jp: "Bさんは{頭痛|ずつう}や{目|め}がチカチカする{原因|げんいん}を{病院|びょういん}で{調|しら}べてもらいたい。",
				cn: "B 想去医院查清头痛和眼睛刺痛的原因。",
				en: "B wants the hospital to check the cause of the headaches and burning eyes.",
			},
		],
		answers: [1, 5],
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的文章，回答后面的问题。（答案在别册 p.7）",
		instructionEn: "Read the following passage and answer the questions that follow. (Answers are in the separate booklet, p. 7.)",
		blocks: [
			{
				type: "paragraph",
				indent: true,
				jp: "{近年|きんねん}、「シックハウス{症候群|しょうこうぐん}」という{言葉|ことば}が{用|もち}いられるようになった。「シック」「ハウス」はともに{英語|えいご}の「sick（{病気|びょうき}）」「house（{家|いえ}）」から{来|き}ているが、{実際|じっさい}にはどういうものなのだろうか。",
				cn: "近年来，「病屋综合征」这个词开始被人使用。「シック」「ハウス」都来自英语的 sick（生病）和 house（房子），但实际上它究竟是怎样一种情况呢？",
				en: "In recent years the term “sick-house syndrome” has come into use. Both “sick” and “house” come from English, but what is it actually?",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{新築|しんちく}の{家|いえ}に{引|ひ}っ{越|こ}しをすると、{体調|たいちょう}が{悪|わる}くなる{人|ひと}がいる。これは{家|いえ}に{使|つか}われている{材料|ざいりょう}に{対|たい}して{人間|にんげん}の{体|からだ}がアレルギーのような{反応|はんのう}（{注|ちゅう}1）を{起|お}こすためである。この{症状|しょうじょう}が「シックハウス{症候群|しょうこうぐん}」で、{木材|もくざい}や{壁紙|かべがみ}に{使用|しよう}されている{接着剤|せっちゃくざい}の{原料|げんりょう}に{含|ふく}まれるホルムアルデヒド（{注|ちゅう}2）が{主|おも}な{原因|げんいん}だと{言|い}われている。",
				cn: "有人搬进新建的房子后身体就会变差。这是因为人体对房子里使用的材料产生了类似过敏的反应（注1）。这种症状就是「病屋综合征」，据说木材、壁纸所用粘合剂原料中含有的甲醛（注2）是主要原因。",
				en: "Some people feel unwell after moving into a newly built house. That is because the body has an allergy-like reaction (note 1) to the materials used in the house. This condition is “sick-house syndrome,” and formaldehyde (note 2) contained in the raw materials of adhesives used on wood and wallpaper is said to be the main cause.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "ホルムアルデヒドにはたんぱく{質|しつ}（{注|ちゅう}3）を{変化|へんか}させるという{特性|とくせい}がある。{人間|にんげん}の{体|からだ}は{水分|すいぶん}を{除|のぞ}くと{半分|はんぶん}{近|ちか}くがたんぱく{質|しつ}で{形成|けいせい}されて（{注|ちゅう}4）おり、これが{人体|じんたい}に{害|がい}を{与|あた}えるのは{当然|とうぜん}である。",
				cn: "甲醛有使蛋白质（注3）发生变化的特性。人体除去水分后将近一半由蛋白质构成（注4），它危害人体也就理所当然。",
				en: "Formaldehyde has the property of altering protein (note 3). With water removed, nearly half of the human body is formed of protein (note 4), so of course this harms the body.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "しかし、「シックハウス{症候群|しょうこうぐん}」が、このたんぱく{質|しつ}の{変質|へんしつ}によるものなのかと{言|い}われると、{一概|いちがい}にそうとも{言|い}えない（{注|ちゅう}5）。なぜならホルムアルデヒドを{含|ふく}む{接着剤|せっちゃくざい}を{使|つか}った{壁紙|かべがみ}を{貼|は}った{部屋|へや}であっても、{空気中|くうきちゅう}に{含|ふく}まれるホルムアルデヒドはほんのわずかで、たんぱく{質|しつ}を{変質|へんしつ}させる{量|りょう}には{満|み}たない（{注|ちゅう}6）からだ。",
				cn: "但是，若问病屋综合征是不是由这种蛋白质变质引起的，却不能一概而论（注5）。因为即便是贴了含甲醛粘合剂壁纸的房间，空气中的甲醛也只有一点点，达不到使蛋白质变质的量（注6）。",
				en: "But if one asks whether sick-house syndrome is due to this denaturation of protein, one cannot generalize (note 5). Even in a room papered with adhesive that contains formaldehyde, the formaldehyde in the air is only a trace, and it falls short of the amount that would denature protein (note 6).",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "反応", jp: "a reaction", cn: "反应", en: "a reaction" },
			{ marker: "（注2）", term: "ホルムアルデヒド", jp: "formaldehyde", cn: "甲醛", en: "formaldehyde" },
			{ marker: "（注3）", term: "たんぱく質", jp: "protein", cn: "蛋白质", en: "protein" },
			{ marker: "（注4）", term: "形成する", jp: "to form", cn: "形成", en: "to form" },
			{
				marker: "（注5）",
				term: "一概に〜ない",
				jp: "cannot generalize",
				cn: "不能一概而论",
				en: "cannot generalize",
			},
			{ marker: "（注6）", term: "〜に満たない", jp: "insufficient", cn: "没有达到", en: "insufficient; falls short of" },
		],
		questions: [
			{
				label: "問1",
				jp: "これは{何|なに}について{書|か}かれた{文章|ぶんしょう}か。",
				cn: "这是关于什么写的文章？",
				en: "What is this passage written about?",
				choices: [
					{
						jp: "シックハウス{症候群|しょうこうぐん}の{症状|しょうじょう}について",
						cn: "关于病屋综合征的症状",
						en: "about the symptoms of sick-house syndrome",
					},
					{
						jp: "シックハウス{症候群|しょうこうぐん}の{原因物質|げんいんぶっしつ}について",
						cn: "关于病屋综合征的致病物质",
						en: "about the causal substance of sick-house syndrome",
					},
					{
						jp: "シックハウス{症候群|しょうこうぐん}の{治療方法|ちりょうほうほう}について",
						cn: "关于病屋综合征的治疗方法",
						en: "about treatments for sick-house syndrome",
					},
					{
						jp: "シックハウス{症候群|しょうこうぐん}になりやすい{体質|たいしつ}について",
						cn: "关于容易得病屋综合征的体质",
						en: "about constitutions prone to sick-house syndrome",
					},
				],
				answer: 2,
				explanation:
					"别册指出本课关键词是「ホルムアルデヒド」。文章从病屋综合征的定义，讲到粘合剂里的甲醛是主要原因，再讨论甲醛能否使蛋白质变质——始终围绕原因物质。症状只在搬家后身体变差这一点带过，没有治疗方法或易感体质。所以 2 正确。",
				explanationEn:
					"The answer booklet says the keyword is formaldehyde. The passage defines sick-house syndrome, names formaldehyde in adhesives as the main cause, then asks whether it denatures protein — always around the causal substance. Symptoms are only “feeling unwell after moving”; there is no treatment or constitution. So 2 is correct.",
				choiceNotes: [
					"只提到搬家后身体变差，没有展开症状。",
					"正确。全文围绕甲醛这一原因物质。",
					"完全没有写治疗方法。",
					"没有写什么样的体质容易得。",
				],
				choiceNotesEn: [
					"It only mentions feeling unwell after moving; symptoms are not developed.",
					"Correct. The whole passage centers on formaldehyde as the cause.",
					"Treatment is not discussed at all.",
					"It does not discuss who is prone to it.",
				],
			},
			{
				label: "問2",
				jp: "なぜ{一概|いちがい}にそうとも{言|い}えないのか。",
				cn: "为什么不能一概而论？",
				en: "Why can one not generalize that way?",
				choices: [
					{
						jp: "ホルムアルデヒドがたんぱく{質|しつ}を{変質|へんしつ}させるとは{限|かぎ}らないから。",
						cn: "因为甲醛未必会使蛋白质变质。",
						en: "Because it is not necessarily the case that formaldehyde denatures protein.",
					},
					{
						jp: "{空気中|くうきちゅう}のホルムアルデヒドの{量|りょう}はたんぱく{質|しつ}を{変質|へんしつ}させるほどの{量|りょう}ではないから。",
						cn: "因为空气中的甲醛量还达不到使蛋白质变质的程度。",
						en: "Because the amount of formaldehyde in the air is not enough to denature protein.",
					},
					{
						jp: "{接着剤|せっちゃくざい}にホルムアルデヒドが{含|ふく}まれていない{場合|ばあい}があるから。",
						cn: "因为有的粘合剂不含甲醛。",
						en: "Because some adhesives do not contain formaldehyde.",
					},
					{
						jp: "{人|ひと}によってアレルギー{症状|しょうじょう}は{違|ちが}うから。",
						cn: "因为过敏症状因人而异。",
						en: "Because allergic symptoms differ from person to person.",
					},
				],
				answer: 2,
				explanation:
					"「一概にそうとも言えない」的「そう」指「たんぱく質の変質によるもの」。理由在「なぜなら」之后：空气中的甲醛「ほんのわずかで、たんぱく質を変質させる量には満たない」。量不够，所以不能断定就是蛋白质变质引起的。1 说的是「未必能使蛋白质变质」，但文中承认甲醛有这个特性，只是量不够。3、4 文中没有。",
				explanationEn:
					"“Cannot generalize that way” refers to “caused by denaturation of protein.” The reason follows なぜなら: formaldehyde in the air is only a trace and falls short of the amount that would denature protein. The quantity is insufficient, so one cannot conclude that protein change is the mechanism. 1 says formaldehyde may not denature protein at all, but the passage grants that property and only denies the amount. 3 and 4 are not in the text.",
				choiceNotes: [
					"文中承认甲醛有使蛋白质变化的特性，问题在于量。",
					"正确。空气中的量达不到使蛋白质变质的程度。",
					"没有说有的粘合剂不含甲醛。",
					"没有写过敏症状因人而异。",
				],
				choiceNotesEn: [
					"The passage grants that formaldehyde alters protein; the issue is the amount.",
					"Correct. The amount in the air is not enough to denature protein.",
					"It does not say some adhesives lack formaldehyde.",
					"It does not say allergic symptoms differ by person.",
				],
			},
		],
	},

	vocab: [
		{ jp: "キーワード", cn: "关键词", en: "keyword", pos: "名詞" },
		{ jp: "新築", kana: "しんちく", cn: "新建、新房", en: "newly built", pos: "名詞" },
		{ jp: "体調", kana: "たいちょう", cn: "身体状况", en: "physical condition", pos: "名詞" },
		{ jp: "頭痛", kana: "ずつう", cn: "头痛", en: "headache", pos: "名詞" },
		{ jp: "シックハウス症候群", kana: "しっくはうすしょうこうぐん", cn: "病屋综合征", en: "sick-house syndrome", pos: "名詞" },
		{ jp: "壁紙", kana: "かべがみ", cn: "壁纸", en: "wallpaper", pos: "名詞" },
		{ jp: "接着剤", kana: "せっちゃくざい", cn: "粘合剂", en: "adhesive", pos: "名詞" },
		{ jp: "アレルギー", cn: "过敏", en: "allergy", pos: "名詞" },
		{ jp: "症状", kana: "しょうじょう", cn: "症状", en: "symptom", pos: "名詞" },
		{ jp: "反応", kana: "はんのう", cn: "反应", en: "reaction", pos: "名詞" },
		{ jp: "ホルムアルデヒド", cn: "甲醛", en: "formaldehyde", pos: "名詞" },
		{ jp: "たんぱく質", kana: "たんぱくしつ", cn: "蛋白质", en: "protein", pos: "名詞" },
		{ jp: "特性", kana: "とくせい", cn: "特性", en: "property; characteristic", pos: "名詞" },
		{ jp: "形成する", kana: "けいせいする", cn: "形成", en: "to form", pos: "動詞" },
		{ jp: "変質", kana: "へんしつ", cn: "变质", en: "denaturation; change in quality", pos: "名詞・動詞" },
		{ jp: "一概に", kana: "いちがいに", cn: "一概地", en: "across the board; sweepingly", pos: "副詞" },
		{ jp: "満たない", kana: "みたない", cn: "不足、达不到", en: "to fall short of", pos: "動詞" },
	],

	grammar: [
		{
			pattern: "〜ようになる",
			formation: "動詞辞書形 ＋ ようになる",
			meaning: "变成……（以前不是这样）。表示变化的结果。",
			meaningEn: "to come to… (it was not so before). Marks a resulting change.",
			example: {
				jp: "「シックハウス{症候群|しょうこうぐん}」という{言葉|ことば}が{用|もち}いられるようになった。",
				cn: "「病屋综合征」这个词开始被人使用了。",
				en: "The term “sick-house syndrome” has come into use.",
			},
		},
		{
			pattern: "一概に〜ない",
			formation: "一概に ＋ そうとは言えない／〜ない",
			meaning: "不能一概而论。论说文里用来限定前面的说法。",
			meaningEn: "cannot generalize; not necessarily. Used in editorials to qualify what came before.",
			example: {
				jp: "{一概|いちがい}にそうとも{言|い}えない。",
				cn: "不能一概而论。",
				en: "One cannot generalize that way.",
			},
		},
		{
			pattern: "〜に満たない",
			formation: "名詞 ＋ に満たない",
			meaning: "达不到……的数量／程度。书面语。",
			meaningEn: "falls short of… (an amount or degree). Written style.",
			example: {
				jp: "たんぱく{質|しつ}を{変質|へんしつ}させる{量|りょう}には{満|み}たない。",
				cn: "达不到使蛋白质变质的量。",
				en: "It falls short of the amount that would denature protein.",
			},
		},
	],
};
