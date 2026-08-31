import type { ReadingDay } from "../reading-n3/types";

// 第3週 2日目 意見文② — printed pages 46–47
export const w3d2: ReadingDay = {
	week: 3,
	day: 2,
	label: "意見文②",
	labelKana: "いけんぶん",
	labelEn: "Opinions ②",
	printedPages: [46, 47],
	answerSource: "book",

	point: {
		title: "カタカナで{書|か}かれた{言葉|ことば}に{注意|ちゅうい}！①",
		titleCn: "注意用片假名写的词汇！①——日式英语的情况",
		titleEn: "Pay attention to “katakana” words! ① — Japanese words derived from English.",
		figure: {
			alt: "キャラクターが「ベビーカー？」と考え、頭の中に「… baby car」と浮かべているイラスト",
			cn: "角色想着「ベビーカー？」，脑子里浮现「… baby car」",
			en: "A character wondering “bebīkā?” with “… baby car” floating in thought",
		},
		tips: [
			{
				jp: "{例|たと}えばこんな{言葉|ことば}が{和製英語|わせいえいご}です。",
				cn: "比如下面这些就是和制英语。",
				en: "Words like these, for example, are wasei-eigo (Japanese-made English).",
			},
		],
		expressions: [
			{ jp: "モーニングコール", cn: "叫醒服务", en: "a wake-up call" },
			{ jp: "ケアレスミス", cn: "疏忽失误", en: "a careless mistake" },
			{ jp: "ペーパーテスト", cn: "笔试", en: "a written test" },
			{ jp: "ベビーカー", cn: "婴儿车", en: "a baby carriage, stroller, pram" },
			{ jp: "パソコン", cn: "个人电脑", en: "a personal computer" },
			{ jp: "リモコン", cn: "遥控器", en: "a remote-control device" },
			{ jp: "コンビニ", cn: "便利店", en: "a convenience store" },
			{ jp: "マナー", cn: "礼貌、规矩", en: "manners" },
		],
		notes: [
			{
				jp: "ほかにもたくさんありますが、これらは{外来語|がいらいご}ではなく、{日本語|にほんご}として{考|かんが}えましょう。",
				cn: "除此之外还有许多词汇是用片假名标记的，但这些词汇不应该视为外来语，而应看作是日语。",
				en: "There are other similar words, but let’s consider them as Japanese words rather than words of foreign origin.",
			},
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "A",
				speakerCn: "A",
				speakerEn: "A",
				jp: "{最近|さいきん}の{若|わか}い{親|おや}は{頭|あたま}に{来|く}るんですよ。{電車|でんしゃ}の{中|なか}で{自分|じぶん}の{子|こ}どもが{走|はし}っていても{注意|ちゅうい}しないし、{靴|くつ}のまま{座席|ざせき}に{上|あ}がらせるし、まったく{子|こ}どものしつけがなっていません（注1）よ。",
				cn: "最近的年轻父母真让人生气。电车里自己的孩子跑来跑去也不管，还让孩子穿着鞋爬上座位，孩子完全没教养。",
				en: "Young parents these days make me so angry. They don’t even tell their kids off for running around on the train, they let them climb onto the seats with their shoes on — they just haven’t taught their children how to behave at all.",
			},
			{
				type: "speech",
				speaker: "B",
				speakerCn: "B",
				speakerEn: "B",
				jp: "いやー、{子|こ}どものしつけがなっていないどころか（注2）、{親|おや}{自身|じしん}のマナーがひどい。{子|こ}どもに{注意|ちゅうい}すると、{親|おや}がにらんでくるんですよ*。あのベビーカーもやめてほしいですよ。{混|こ}んだ{電車|でんしゃ}にそのまま{乗|の}ってくるし。",
				cn: "哎呀，岂止是孩子没教养，父母自己的规矩就很差。一提醒孩子，家长就朝你瞪眼。婴儿车也希望他们别那样用了，拥挤的电车里也不折起来就上来。",
				en: "Oh, far from the children not having been taught how to behave, the parents’ own manners are awful. If you tell the child off, the parent starts glaring at you.* And I wish they’d stop with those strollers. They get on crowded trains with them still open.",
			},
			{
				type: "speech",
				speaker: "A",
				speakerCn: "A",
				speakerEn: "A",
				jp: "{親|おや}にも{子|こ}どもにも{注意|ちゅうい}してやらないといけないっていうことですよね。",
				cn: "就是说对家长和孩子都得提醒才行，对吧。",
				en: "So we have to speak up to the parents as well as the children, don’t we.",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "しつけがなっていない", jp: "しつけがなっていない", cn: "缺乏家教、没教养", en: "haven’t been taught how to behave" },
			{ marker: "（注2）", term: "〜どころか", jp: "どころか", cn: "岂止是〜", en: "rather; far from…" },
		],
		pageNotes: [
			{
				jp: "＊{親|おや}がにらんでくる",
				cn: "家长对我怒目而视",
				en: "The parent started glaring at me",
			},
		],
		choices: [
			{ jp: "Aさんは{自分|じぶん}の{子|こ}どものしつけができていない。", cn: "A 没能教育好自己的孩子。", en: "A has not taught their own child how to behave." },
			{ jp: "Bさんは{親|おや}より{子|こ}どものしつけが{大切|たいせつ}だと{言|い}っている。", cn: "B 说教育孩子比教育父母更重要。", en: "B says teaching children how to behave is more important than the parents." },
			{ jp: "AさんもBさんも{親|おや}のマナーが{悪|わる}いと{思|おも}っている。", cn: "A 和 B 都认为父母的规矩很差。", en: "Both A and B think the parents’ manners are bad." },
			{ jp: "Bさんはベビーカーに{子|こ}どもを{乗|の}せたまま{電車|でんしゃ}に{乗|の}ってくる{親|おや}に{文句|もんく}がある。", cn: "B 对把孩子放在婴儿车里就上电车的家长有意见。", en: "B has a complaint about parents who get on the train with a child still in the stroller." },
			{ jp: "Aさんはにらまれるので{親|おや}には{注意|ちゅうい}したくない。", cn: "A 因为会被瞪，所以不想提醒家长。", en: "A does not want to speak to the parents because they get glared at." },
		],
		answers: [3, 4],
	},

	mondai: {
		instruction: "{次|つぎ}の{文|ぶん}は{雑誌|ざっし}に{寄|よ}せられた{投書|とうしょ}である。{読|よ}んで{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "下面是一封投给杂志的读者来信。阅读后回答后面的问题。（答案在别册 p.4）",
		instructionEn: "The following is a letter sent in to a magazine. Read it and answer the questions that follow. (Answers are in the separate booklet, p. 4.)",
		blocks: [
			{
				type: "title",
				jp: "チョット{一言|ひとこと}",
				cn: "说一句",
				en: "A word",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{最近|さいきん}の{若|わか}い{母親|ははおや}に{言|い}いたい。{電車|でんしゃ}の{中|なか}では、ベビーカーをたたんでほしい。ベビーカーは{赤|あか}ちゃんを{乗|の}せるもの。たたんでしまえば{大|おお}きな{荷物|にもつ}になってしまう。{赤|あか}ちゃんのほかに{大|おお}きな{荷物|にもつ}を{抱|かか}えるのは{大変|たいへん}だ。それはわかる。しかし、{混|こ}んだ{電車|でんしゃ}の{中|なか}まで{平気|へいき}で（注1）{赤|あか}ちゃんを{乗|の}せたまま{乗|の}り{込|こ}んでくるのは、{迷惑|めいわく}である。まるで「{私|わたし}はこんな{小|ちい}さい{子|こ}を{連|つ}れていて{大変|たいへん}なんです。{場所|ばしょ}を{空|あ}けてくれるのは{当|あ}たり{前|まえ}でしょ。」と{言|い}っているような{顔|かお}をする。こちらがちょっと{迷惑|めいわく}そうな{顔|かお}をすると{反対|はんたい}に①にらみつけて（注2）くる。すいているときならともかく、{混|こ}んだ{車内|しゃない}では{絶対|ぜったい}に{折|お}りたたむ（注3）べきだ。{今|いま}のベビーカーは{昔|むかし}のとは{違|ちが}って{軽|かる}く、{簡単|かんたん}にたためるのだから。",
				cn: "想对最近的年轻母亲说一句。在电车里，希望把婴儿车折起来。婴儿车是用来载宝宝的。一折起来就成了一件大行李。除了宝宝还要抱着大行李，确实很辛苦。这我明白。可是，连拥挤的电车里也满不在乎地（注1）不把宝宝抱下来就挤上来，实在是添麻烦。那神情简直像在说：「我带着这么小的孩子很不容易。给让个地方不是理所当然的吗。」我这边稍露出一点嫌麻烦的脸色，对方反而①瞪过来。车不挤也就罢了，拥挤的车厢里绝对应该把车折起来（注3）。现在的婴儿车和以前不同，又轻又容易折。",
				en: "I have something to say to young mothers these days. On the train, I want them to fold the stroller. A stroller is for carrying a baby. Once you fold it, it becomes a bulky piece of luggage. Having to hold a baby and a bulky load as well is hard. I understand that. But boarding a crowded train without a care (note 1), baby still in the stroller, is a nuisance. They look as if they are saying, “I have a small child with me; it’s hard. Of course you should make space.” If I so much as look a little put out, they ①glare back at me instead. When the train is not crowded it might be another matter, but in a packed car you absolutely should fold it (note 3). Today’s strollers, unlike the old ones, are light and easy to fold.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{最近|さいきん}、{電車|でんしゃ}の{中|なか}でマナーの{悪|わる}い{子|こ}どもをよく{見|み}かけるが、{注意|ちゅうい}をしない{親|おや}に{問題|もんだい}がある。{子|こ}どもをしつける（注4）{以前|いぜん}に、まず{教育|きょういく}しなければならないのは{親|おや}のほうだ。{周|まわ}りの{人|ひと}も{黙|だま}らないで、{注意|ちゅうい}をするべきだろう。{今|いま}まで、{迷惑|めいわく}だと{思|おも}うだけで{何|なに}も{言|い}わずにきたが、{今度|こんど}からははっきり{言|い}わせてもらおう。「②」と。",
				cn: "最近在电车里常看到不懂规矩的孩子，问题出在不管的父母。在管教孩子（注4）之前，首先必须受教育的是父母。周围的人也不该沉默，应该提醒。以前我只是觉得麻烦却什么也不说，今后我要说清楚了：「②」。",
				en: "Lately I often see children with bad manners on the train, and the problem is the parents who do not speak up. Before teaching the children how to behave (note 4), it is the parents who first need educating. People around them should not stay silent either; they should say something. Until now I have only thought it was a nuisance and said nothing, but from now on I will say it plainly: “②.”",
			},
			{
				type: "line",
				align: "right",
				jp: "（{東京都|とうきょうと}{主婦|しゅふ} {五十二歳|ごじゅうにさい}）",
				cn: "（东京都 家庭主妇 五十二岁）",
				en: "(Housewife, Tokyo, age 52)",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "平気で", jp: "へいきで", cn: "满不在乎", en: "to be very insensitive" },
			{ marker: "（注2）", term: "にらみつける", jp: "にらみつける", cn: "怒目而视", en: "to glare at" },
			{ marker: "（注3）", term: "折りたたむ", jp: "おりたたむ", cn: "折叠", en: "to fold it" },
			{ marker: "（注4）", term: "しつける", jp: "しつける", cn: "教育、管教", en: "to teach how to behave" },
		],
		pageNotes: [
			{
				jp: "＊すいているときならともかく",
				cn: "不拥挤的时候也就罢了",
				en: "When it is not crowded, it might be possible but …",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "①にらみつけてくるとあるが、そのときの{若|わか}い{母親|ははおや}の{気持|きも}ちに{最|もっと}も{近|ちか}いものはどれか。",
				cn: "文中说①「瞪过来」，当时年轻母亲的心情最接近哪一项？",
				en: "The text says they ①glare. Which is closest to what the young mother is feeling then?",
				choices: [
					{ jp: "この{人|ひと}は、なんてしつけがなっていない{人|ひと}なんだろう。", cn: "这个人真是没教养啊。", en: "What an ill-mannered person this is." },
					{ jp: "この{人|ひと}は、なんてやさしくない{人|ひと}なんだろう。", cn: "这个人真是不善良啊。", en: "What an unkind person this is." },
					{ jp: "この{人|ひと}は、なんて{迷惑|めいわく}な{人|ひと}なんだろう。", cn: "这个人真是添麻烦啊。", en: "What a nuisance this person is." },
					{ jp: "この{人|ひと}は、なんて{気|き}が{強|つよ}い{人|ひと}なんだろう。", cn: "这个人真是好强啊。", en: "What a strong-willed person this is." },
				],
				answer: 2,
				explanation:
					"投书人稍露出「麻烦」的脸色，母亲反而瞪回来。前文写母亲一脸「带着这么小的孩子，让地方不是理所当然的吗」。在她看来，对带小孩的人不客气就是「不善良」。所以 2 最接近当时母亲的心情。1、3 是投书人对母亲的评价，方向反了。4 「气が強い」只描写瞪人的态度，不是她心里在想什么。",
				explanationEn:
					"The writer looks a little put out, and the mother glares back. Just before that, the mother looks as if making space for someone with a small child were only natural. To her, someone who is not kind to a parent with a baby is “unkind.” So 2 is closest to her feeling. 1 and 3 are the writer’s view of the mother, the wrong direction. 4 “strong-willed” describes the glare, not what she is thinking.",
				choiceNotes: [
					"这是投书人觉得母亲没教养，不是母亲看投书人的心情。",
					"正确。母亲认为对方对带小孩的人不近人情。",
					"「添麻烦」是投书人的立场，不是母亲的心情。",
					"只说明瞪人的样子，没有点出「你怎么对带着小孩的人这么冷」这一层。",
				],
				choiceNotesEn: [
					"That is the writer’s view of the mother, not what the mother thinks of the writer.",
					"Correct. The mother sees the other person as unkind to someone with a small child.",
					"“A nuisance” is the writer’s stance, not the mother’s feeling.",
					"It describes the glare, not the thought “how can you be so cold to someone with a baby?”",
				],
			},
			{
				label: "問2",
				jp: "「②」の{中|なか}に{入|はい}る{最|もっと}も{適当|てきとう}な{言葉|ことば}はどれか。",
				cn: "填入「②」最合适的是哪一句？",
				en: "Which words fit best in “②”?",
				choices: [
					{ jp: "{混|こ}んだ{電車|でんしゃ}ではベビーカーをたたんでください", cn: "拥挤的电车上请把婴儿车折起来", en: "Please fold the stroller on a crowded train" },
					{ jp: "{混|こ}んだ{電車|でんしゃ}に{乗|の}らないでください", cn: "请不要乘坐拥挤的电车", en: "Please do not board a crowded train" },
					{ jp: "{子|こ}どもの{前|まえ}に{親|おや}の{教育|きょういく}をしてください", cn: "请先教育父母再教育孩子", en: "Please educate the parents before the children" },
					{ jp: "だまっていないで{注意|ちゅうい}をしてください", cn: "请不要沉默，请出言提醒", en: "Please don’t stay silent; please speak up" },
				],
				answer: 1,
				explanation:
					"别册提示：最初的段落里已经写出想说的话。开头就是「電車の中では、ベビーカーをたたんでほしい」，后文又强调「混んだ車内では絶対に折りたたむべきだ」。所以她要「はっきり言う」的就是 1。2 把「请折起来」换成「请不要坐」，过火了。3、4 是她对家长和周围人的评论，不是她要对当事母亲当面说的那一句。",
				explanationEn:
					"The answer key notes that what she wants to say is already in the first paragraph. It opens with “fold the stroller on the train,” and later “in a packed car you absolutely should fold it.” So the line she will say plainly is 1. 2 swaps “please fold it” for “please don’t ride,” which goes too far. 3 and 4 are comments about parents and bystanders, not the sentence she will say to the mother.",
				choiceNotes: [
					"正确。与第一段「たたんでほしい」「折りたたむべきだ」一致。",
					"投书人接受「空いているときならともかく」，并不是禁止乘坐拥挤电车。",
					"这是对「谁该先受教育」的议论，不是要对母亲说的那句话。",
					"这是在呼吁周围人，不是「②」里要对当事者说的内容。",
				],
				choiceNotesEn: [
					"Correct. It matches “please fold it” and “you absolutely should fold it” in the first paragraph.",
					"The writer allows “when it isn’t crowded it might be another matter”; she is not banning crowded trains.",
					"That is a comment on who needs educating, not the line she will say to the mother.",
					"That is an appeal to bystanders, not what goes in ② as spoken to the person concerned.",
				],
			},
		],
	},

	vocab: [
		{ jp: "和製英語", kana: "わせいえいご", cn: "和制英语", en: "Japanese-made English", pos: "名詞" },
		{ jp: "外来語", kana: "がいらいご", cn: "外来语", en: "loanword", pos: "名詞" },
		{ jp: "ベビーカー", cn: "婴儿车", en: "stroller; baby carriage", pos: "名詞" },
		{ jp: "マナー", cn: "礼貌、规矩", en: "manners", pos: "名詞" },
		{ jp: "しつけ", cn: "教养、管教", en: "discipline; teaching how to behave", pos: "名詞" },
		{ jp: "座席", kana: "ざせき", cn: "座位", en: "seat", pos: "名詞" },
		{ jp: "にらみつける", cn: "瞪、怒视", en: "to glare at", pos: "動詞" },
		{ jp: "投書", kana: "とうしょ", cn: "读者来信", en: "a letter to a magazine/newspaper", pos: "名詞" },
		{ jp: "たたむ", cn: "折叠", en: "to fold", pos: "動詞" },
		{ jp: "折りたたむ", kana: "おりたたむ", cn: "折叠起来", en: "to fold up", pos: "動詞" },
		{ jp: "平気", kana: "へいき", cn: "满不在乎", en: "unconcerned; without a care", pos: "な形" },
		{ jp: "乗り込む", kana: "のりこむ", cn: "挤上、乘入", en: "to board; to get in", pos: "動詞" },
		{ jp: "車内", kana: "しゃない", cn: "车厢内", en: "inside the train/car", pos: "名詞" },
		{ jp: "ともかく", cn: "暂且不说、……另当别论", en: "at any rate; leaving … aside", pos: "副詞" },
		{ jp: "主婦", kana: "しゅふ", cn: "家庭主妇", en: "housewife", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜どころか",
			formation: "名詞／普通形＋どころか",
			meaning: "岂止……，反而是……。先否定前项，再提出程度更甚的后项。",
			meaningEn: "far from…; on the contrary…. Rejects the first idea and puts a stronger one after it.",
			example: {
				jp: "{子|こ}どものしつけがなっていないどころか、{親|おや}{自身|じしん}のマナーがひどい。",
				cn: "岂止是孩子没教养，父母自己的规矩就很差。",
				en: "Far from the children not having been taught how to behave, the parents’ own manners are awful.",
			},
		},
		{
			pattern: "〜たまま",
			formation: "動詞た形＋まま",
			meaning: "保持着……的状态（去做另一件事）。",
			meaningEn: "still in the state of… (while doing something else).",
			example: {
				jp: "{赤|あか}ちゃんを{乗|の}せたまま{乗|の}り{込|こ}んでくる。",
				cn: "不把宝宝抱下来就挤上车。",
				en: "They board with the baby still in the stroller.",
			},
		},
		{
			pattern: "〜ならともかく",
			formation: "普通形＋ならともかく",
			meaning: "若是……倒还罢了（后面的情况就不能接受）。",
			meaningEn: "… would be another matter, but…. The following case is not acceptable.",
			example: {
				jp: "すいているときならともかく、{混|こ}んだ{車内|しゃない}では{絶対|ぜったい}に{折|お}りたたむべきだ。",
				cn: "车不挤也就罢了，拥挤的车厢里绝对应该折起来。",
				en: "When it isn’t crowded it might be another matter, but in a packed car you absolutely should fold it.",
			},
		},
	],
};
