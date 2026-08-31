import type { ReadingDay } from "../reading-n3/types";

// 第6週 3日目 生物に関する文章 — printed pages 100–101
export const w6d3: ReadingDay = {
	week: 6,
	day: 3,
	label: "生物に関する文章",
	labelKana: "せいぶつにかんするぶんしょう",
	labelEn: "Article on Biology",
	printedPages: [100, 101],
	answerSource: "book",

	point: {
		title: "{段落|だんらく}ごとに{意味|いみ}を{理解|りかい}しよう！",
		titleCn: "按段落理解意思！",
		titleEn: "Try to understand it paragraph by paragraph!",
		figure: {
			alt: "「ボクが言いたいことは…」と話すキャラクターと、「あなたのことなんか聞いてない！」と耳をふさぐキャラクター",
			cn: "一个角色说「我想说的是……」，另一个捂着耳朵说「你的事我才不听呢！」",
			en: "One character says “What I want to say is…,” and another covers its ears: “I’m not listening to anything about you!”",
		},
		tips: [
			{
				jp: "こんな{段落構成|だんらくこうせい}になっていることが{多|おお}いです。",
				cn: "常常是这样的段落结构。",
				en: "Passages are often organized in paragraphs like this.",
			},
			{
				jp: "{第|だい}1{段落|だんらく}：{事実|じじつ}や{説明|せつめい}（{生物|せいぶつ}の{特性|とくせい}など）　→　{第|だい}2{段落|だんらく}：{筆者|ひっしゃ}が{言|い}いたいこと",
				cn: "第 1 段：事实或说明（生物的特性等）→ 第 2 段：笔者想说的话",
				en: "Paragraph 1: facts or explanation (e.g. traits of living things) → Paragraph 2: what the writer wants to say",
			},
			{
				jp: "★{生物|せいぶつ}に{関|かん}する{文章|ぶんしょう}は、{左|ひだり}のように{段落|だんらく}によってはっきりと{内容|ないよう}が{分|わ}かれていることが{多|おお}いです。",
				cn: "与生物有关的文章，往往像左边这样，各段内容划分得很清楚。",
				en: "Articles about biology tend to be clearly divided by paragraph, as in the example on the left.",
			},
		],
		expressions: [
			{ jp: "段落", kana: "だんらく", cn: "段落", en: "paragraph" },
			{ jp: "習性", kana: "しゅうせい", cn: "习性", en: "behavior pattern; habit (of an animal)" },
			{ jp: "毒性", kana: "どくせい", cn: "毒性", en: "toxicity; venomousness" },
			{ jp: "抗体", kana: "こうたい", cn: "抗体", en: "antibody" },
			{ jp: "ショック症状", kana: "しょっくしょうじょう", cn: "休克症状", en: "shock symptoms" },
			{ jp: "アレルギー体質", kana: "アレルギーたいしつ", cn: "过敏体质", en: "allergic constitution" },
			{ jp: "呼吸困難", kana: "こきゅうこんなん", cn: "呼吸困难", en: "difficulty breathing" },
			{ jp: "〜に限らず", kana: "かぎらず", cn: "不限于……", en: "not limited to…" },
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
				speaker: "{女|おんな}の{人|ひと}",
				speakerCn: "女人",
				speakerEn: "Woman",
				jp: "ハチ（{注|ちゅう}1）に{刺|さ}されたことある？",
				cn: "你被蜂（注1）蜇过吗？",
				en: "Have you ever been stung by a bee (note 1)?",
			},
			{
				type: "speech",
				speaker: "{男|おとこ}の{人|ひと}",
				speakerCn: "男人",
				speakerEn: "Man",
				jp: "うん、スズメバチ（{注|ちゅう}2）に{刺|さ}されたことがあるけど、ものすごく{痛|いた}かったよ。こんなにはれた（{注|ちゅう}3）し。",
				cn: "嗯，被马蜂（注2）蜇过，疼得要命。还肿成这样（注3）。",
				en: "Yeah, I’ve been stung by a hornet (note 2), and it hurt like crazy. It swelled up this much (note 3).",
			},
			{
				type: "speech",
				speaker: "{女|おんな}の{人|ひと}",
				speakerCn: "女人",
				speakerEn: "Woman",
				jp: "{私|わたし}も{一度|いちど}{刺|さ}されたんだけど、{次|つぎ}は{気|き}をつけろってお{医者|いしゃ}さんに{言|い}われたの。{私|わたし}、アレルギー{体質|たいしつ}（{注|ちゅう}4）だから、{次|つぎ}に{刺|さ}されたらアレルギー{反応|はんのう}を{起|お}こすかもしれないんだって。{死|し}ぬ{場合|ばあい}だってあるらしいよ。",
				cn: "我也被蜇过一次，医生让我下次千万小心。说我是过敏体质（注4），再被蜇可能会引起过敏反应。好像还有死掉的情况呢。",
				en: "I’ve been stung once too, and the doctor told me to be careful next time. I’m allergic (note 4), so if I’m stung again I might have an allergic reaction. Apparently it can even be fatal.",
			},
			{
				type: "speech",
				speaker: "{男|おとこ}の{人|ひと}",
				speakerCn: "男人",
				speakerEn: "Man",
				jp: "へー、{怖|こわ}いんだね。{刺|さ}されないように{気|き}をつけなきゃ。",
				cn: "诶——好吓人啊。可得小心别被蜇到。",
				en: "Wow, that’s scary. We’ll have to be careful not to get stung.",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "ハチ", jp: "a bee", cn: "蜂", en: "a bee" },
			{ marker: "（注2）", term: "スズメバチ", jp: "a hornet", cn: "马蜂", en: "a hornet" },
			{ marker: "（注3）", term: "はれる", jp: "to swell", cn: "肿", en: "to swell" },
			{ marker: "（注4）", term: "アレルギー体質", jp: "allergic", cn: "过敏性体质", en: "allergic (constitution)" },
		],
		choices: [
			{
				jp: "2{人|にん}はハチの{種類|しゅるい}について{話|はな}している。",
				cn: "两个人在谈论蜂的种类。",
				en: "The two are talking about kinds of bees.",
			},
			{
				jp: "2{人|にん}ともハチに{刺|さ}されたことがある。",
				cn: "两个人都曾被蜂蜇过。",
				en: "Both of them have been stung by a bee.",
			},
			{
				jp: "{男|おとこ}の{人|ひと}はアレルギー{体質|たいしつ}である。",
				cn: "男人是过敏体质。",
				en: "The man has an allergic constitution.",
			},
			{
				jp: "{女|おんな}の{人|ひと}はハチに{刺|さ}されたときにアレルギー{反応|はんのう}を{起|お}こした。",
				cn: "女人被蜂蜇的时候引起了过敏反应。",
				en: "The woman had an allergic reaction when she was stung.",
			},
			{
				jp: "{女|おんな}の{人|ひと}はハチに{刺|さ}されないように{特|とく}に{注意|ちゅうい}が{必要|ひつよう}だ。",
				cn: "女人需要特别注意不要被蜂蜇。",
				en: "The woman especially needs to be careful not to be stung.",
			},
		],
		answers: [2, 5],
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的文章，回答后面的问题。（答案在别册 p.7）",
		instructionEn: "Read the following passage and answer the questions that follow. (Answers are in the separate booklet, p. 7.)",
		blocks: [
			{
				type: "paragraph",
				indent: true,
				jp: "ハチに{刺|さ}されると、はれてとても{痛|いた}い。{中|なか}でも{怖|こわ}いのはスズメバチである。スズメバチの{針|はり}（{注|ちゅう}1）はミツバチ（{注|ちゅう}2）などと{違|ちが}い、{何度|なんど}でも{刺|さ}せる。{毒性|どくせい}が{強|つよ}い（{注|ちゅう}3）ので1{匹|ぴき}だけでもひどくはれたりして{大変|たいへん}だが、ほとんどの{場合|ばあい}、{集団|しゅうだん}で{襲|おそ}って（{注|ちゅう}4）くるのでさらに{恐|おそ}ろしい。また、スズメバチに{限|かぎ}らず、ハチに{刺|さ}されて{怖|こわ}いのはそれだけではない。アレルギーによるショック{症状|しょうじょう}（{注|ちゅう}5）だ。もし、アレルギー{体質|たいしつ}の{人|ひと}が{刺|さ}されると、1{回目|かいめ}は{痛|いた}みだけですむが、2{回目|かいめ}に{刺|さ}されると、{抗体|こうたい}（{注|ちゅう}6）によりアレルギー{反応|はんのう}を{起|お}こし、{吐|は}き{気|け}やめまいが{起|お}こり、{場合|ばあい}によっては{呼吸困難|こきゅうこんなん}で{死|し}んでしまうこともあるのだ*。",
				cn: "被蜂蜇会肿、会非常痛。其中最可怕的是马蜂。马蜂的刺（注1）和蜜蜂（注2）等不同，可以反复蜇。毒性很强（注3），哪怕一只要也会肿得很厉害，够受的；而且多数情况下会成群袭击（注4），更加可怕。另外，不限于马蜂，被蜂蜇的可怕之处还不止这些：还有过敏引起的休克症状（注5）。过敏体质的人如果被蜇，第一次往往只是疼一疼就过去了，但第二次被蜇时，会因抗体（注6）引起过敏反应，出现恶心、头晕，有时还会因呼吸困难而死亡*。",
				en: "If you are stung by a bee, it swells and hurts a great deal. The scariest of all is the hornet. Unlike a honeybee (note 2), a hornet’s stinger (note 1) can sting again and again. The venom is strong (note 3), so even one insect can cause severe swelling and real trouble, and in most cases they attack in a group (note 4), which is still more frightening. And it is not only hornets: being stung is scary for more than that. There are allergic shock symptoms (note 5). If a person with an allergic constitution is stung, the first time may end with pain alone, but a second sting brings an allergic reaction via antibodies (note 6), with nausea and dizziness, and in some cases death from difficulty breathing*.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "ハチに{刺|さ}されないようにするためには、{服装|ふくそう}や{帽子|ぼうし}はできるだけ{白|しろ}っぽいものにしたほうがよい。ハチは{黒|くろ}いものを{攻撃|こうげき}する{習性|しゅうせい}（{注|ちゅう}7）があるからである。それから、スズメバチなどは{巣|す}に{近|ちか}づいた{人|ひと}に{対|たい}してカチカチと{音|おと}を{出|だ}すので、そういう{音|おと}が{聞|き}こえたら、そっと、すぐにそこから{逃|に}げるのが{一番|いちばん}である。",
				cn: "为了不被蜂蜇，衣服和帽子尽量选偏白的为好。因为蜂有攻击黑色物体的习性（注7）。另外，马蜂等对靠近巢穴的人会发出咔嚓咔嚓的声音，一旦听到那种声音，悄悄地马上离开那里才是上策。",
				en: "To avoid being stung, it is better to make clothing and hats as whitish as possible. Bees have a habit of attacking dark things (note 7). Also, hornets and the like click at people who approach the nest, so if you hear that sound, the best thing is to slip away from there at once.",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "（ハチの）針", jp: "a bee sting", cn: "（蜜蜂的）刺", en: "a bee sting / stinger" },
			{ marker: "（注2）", term: "ミツバチ", jp: "a bee", cn: "蜜蜂", en: "a honeybee" },
			{ marker: "（注3）", term: "毒性が強い", jp: "very poisonous", cn: "毒性强", en: "very poisonous" },
			{ marker: "（注4）", term: "襲う", jp: "to attack", cn: "袭击", en: "to attack" },
			{ marker: "（注5）", term: "ショック症状", jp: "shock", cn: "休克症状", en: "shock (symptoms)" },
			{ marker: "（注6）", term: "抗体", jp: "antibody", cn: "抗体", en: "antibody" },
			{ marker: "（注7）", term: "習性", jp: "behavior patterns", cn: "习性", en: "behavior patterns" },
		],
		pageNotes: [
			{
				jp: "in some cases, you could die from breathing difficulties",
				cn: "有时可能会因呼吸困难而死",
				en: "in some cases, you could die from breathing difficulties",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "{怖|こわ}いのはそれだけではないとあるが、ほかに{何|なに}が{怖|こわ}いのか。",
				cn: "文中说可怕的还不止这些，另外还有什么可怕？",
				en: "The passage says that is not the only scary thing. What else is scary?",
				choices: [
					{ jp: "スズメバチに{刺|さ}されること", cn: "被马蜂蜇", en: "being stung by a hornet" },
					{ jp: "{痛|いた}くてはれること", cn: "又疼又肿", en: "hurting and swelling" },
					{ jp: "アレルギー{体質|たいしつ}になること", cn: "变成过敏体质", en: "becoming allergic" },
					{ jp: "アレルギー{反応|はんのう}を{起|お}こすこと", cn: "引起过敏反应", en: "having an allergic reaction" },
				],
				answer: 4,
				explanation:
					"「ハチに刺されて怖いのはそれだけではない。アレルギーによるショック症状だ。」——「それだけ」指前面马蜂毒性强、成群袭击等；另外可怕的是过敏休克，也就是引起过敏反应。1、2 是前面已经说的「それ」。3 是「变成过敏体质」，文中说的是本来就是过敏体质的人第二次被蜇会反应。所以 4 正确。",
				explanationEn:
					"“Being stung is scary for more than that. There are allergic shock symptoms.” “That” is the hornet’s venom and group attacks already described; the further fear is allergic shock — having an allergic reaction. 1 and 2 are the earlier “that.” 3 is becoming allergic; the passage is about people who already are allergic reacting on a second sting. So 4 is correct.",
				choiceNotes: [
					"这是前面已经说的「それ」，不是「除此之外」。",
					"肿痛也是开头就有的内容，属于「それ」。",
					"不是「变成」过敏体质，而是过敏体质者第二次被蜇会反应。",
					"正确。另外可怕的是过敏反应／休克。",
				],
				choiceNotesEn: [
					"This is the earlier “that,” not the further fear.",
					"Pain and swelling are in the opening, so they belong to “that.”",
					"It is not becoming allergic; people who already are allergic react on a second sting.",
					"Correct. The further fear is an allergic reaction / shock.",
				],
			},
			{
				label: "問2",
				jp: "ハチに{攻撃|こうげき}されないようにするためには、どうすればいいか。",
				cn: "为了不被蜂攻击，应该怎么做？",
				en: "What should you do to avoid being attacked by bees?",
				choices: [
					{ jp: "{帽子|ぼうし}をかぶらないようにする。", cn: "不戴帽子。", en: "Avoid wearing a hat." },
					{ jp: "{黒|くろ}っぽい{服|ふく}を{着|き}ないようにする。", cn: "不穿偏黑的衣服。", en: "Avoid wearing darkish clothes." },
					{ jp: "カチカチと{音|おと}をたてて{逃|に}げる。", cn: "发出咔嚓声然后逃跑。", en: "Make a clicking sound and run." },
					{ jp: "{集団行動|しゅうだんこうどう}をしないようにする。", cn: "不要集体行动。", en: "Avoid acting in a group." },
				],
				answer: 2,
				explanation:
					"第二段（笔者想说的对策）：服装和帽子尽量偏白，因为蜂会攻击黑色物体。所以「不穿偏黑的衣服」正确。帽子不是不要戴，而是戴白的。咔嚓声是马蜂发出的警告，人要悄悄离开，不是自己弄出声音。集体行动是马蜂的习性，不是对人的要求。",
				explanationEn:
					"Paragraph 2 (the writer’s advice): make clothes and hats as whitish as possible, because bees attack dark things. So “don’t wear darkish clothes” is right. Hats are not forbidden — wear white ones. The clicking is the hornet’s warning; people should slip away, not make the sound themselves. Group attack is the hornets’ habit, not advice to humans.",
				choiceNotes: [
					"帽子要选白的，不是不戴。",
					"正确。蜂攻击黑色，所以不要穿偏黑的衣服。",
					"咔嚓声是马蜂发出的，人要悄悄逃走，不是自己弄出声音。",
					"成群袭击的是马蜂，不是让人不要集体行动。",
				],
				choiceNotesEn: [
					"Hats should be whitish, not avoided.",
					"Correct. Bees attack dark colors, so don’t wear darkish clothes.",
					"The clicking is from the hornet; people should slip away, not make the sound.",
					"Attacking in a group is what hornets do, not advice for people.",
				],
			},
		],
	},

	vocab: [
		{ jp: "段落", kana: "だんらく", cn: "段落", en: "paragraph", pos: "名詞" },
		{ jp: "刺す", kana: "さす", cn: "蜇、刺", en: "to sting; to pierce", pos: "動詞" },
		{ jp: "はれる", cn: "肿", en: "to swell", pos: "動詞" },
		{ jp: "スズメバチ", cn: "马蜂、胡蜂", en: "hornet", pos: "名詞" },
		{ jp: "ミツバチ", cn: "蜜蜂", en: "honeybee", pos: "名詞" },
		{ jp: "針", kana: "はり", cn: "刺、针", en: "stinger; needle", pos: "名詞" },
		{ jp: "毒性", kana: "どくせい", cn: "毒性", en: "toxicity", pos: "名詞" },
		{ jp: "襲う", kana: "おそう", cn: "袭击", en: "to attack", pos: "動詞" },
		{ jp: "ショック症状", kana: "しょっくしょうじょう", cn: "休克症状", en: "shock symptoms", pos: "名詞" },
		{ jp: "抗体", kana: "こうたい", cn: "抗体", en: "antibody", pos: "名詞" },
		{ jp: "吐き気", kana: "はきけ", cn: "恶心", en: "nausea", pos: "名詞" },
		{ jp: "めまい", cn: "头晕", en: "dizziness", pos: "名詞" },
		{ jp: "呼吸困難", kana: "こきゅうこんなん", cn: "呼吸困难", en: "difficulty breathing", pos: "名詞" },
		{ jp: "習性", kana: "しゅうせい", cn: "习性", en: "habit; behavior pattern", pos: "名詞" },
		{ jp: "攻撃する", kana: "こうげきする", cn: "攻击", en: "to attack", pos: "動詞" },
		{ jp: "巣", kana: "す", cn: "巢", en: "nest", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜に限らず",
			formation: "名詞 ＋ に限らず",
			meaning: "不限于……，……也一样。",
			meaningEn: "not limited to…; not only….",
			example: {
				jp: "スズメバチに{限|かぎ}らず、ハチに{刺|さ}されて{怖|こわ}いのはそれだけではない。",
				cn: "不限于马蜂，被蜂蜇的可怕之处还不止这些。",
				en: "Not only with hornets: being stung is scary for more than that.",
			},
		},
		{
			pattern: "〜たほうがよい",
			formation: "動詞た形 ＋ ほうがよい",
			meaning: "最好……。提出建议。",
			meaningEn: "it is better to…. Offers advice.",
			example: {
				jp: "{服装|ふくそう}や{帽子|ぼうし}はできるだけ{白|しろ}っぽいものにしたほうがよい。",
				cn: "衣服和帽子尽量选偏白的为好。",
				en: "It is better to make clothing and hats as whitish as possible.",
			},
		},
		{
			pattern: "〜ようにする",
			formation: "動詞辞書形／ない形 ＋ ようにする",
			meaning: "设法做到……／设法不……。表示有意识的努力。",
			meaningEn: "to make a point of doing / not doing…. Conscious effort.",
			example: {
				jp: "ハチに{刺|さ}されないようにする。",
				cn: "设法不被蜂蜇。",
				en: "to make sure one is not stung by a bee",
			},
		},
	],
};
