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
		titleCn: "注意用片假名写的词语！①",
		titleEn: "Pay attention to “katakana” words! ① — Japanese words derived from English.",
		figure: {
			alt: "キャラクターが「ベビーカー？」と考え、頭の中に「… baby car」と浮かべているイラスト",
			cn: "角色想着「婴儿车？」，脑海中浮现出「… baby car」的插图",
			en: "A character wondering “bebīkā?” with “… baby car” floating in thought",
		},
		tips: [
			{
				jp: "{例|たと}えばこんな{言葉|ことば}が{和製英語|わせいえいご}です。",
				cn: "例如，像这样的词语就是和制英语。",
				en: "Words like these, for example, are wasei-eigo (Japanese-made English).",
			},
		],
		expressions: [
			{ jp: "モーニングコール", cn: "叫醒服务", en: "a wake-up call" },
			{ jp: "ケアレスミス", cn: "粗心错误", en: "a careless mistake" },
			{ jp: "ペーパーテスト", cn: "笔试", en: "a written test" },
			{ jp: "ベビーカー", cn: "婴儿车", en: "a baby carriage, stroller, pram" },
			{ jp: "パソコン", cn: "个人电脑", en: "a personal computer" },
			{ jp: "リモコン", cn: "遥控器", en: "a remote-control device" },
			{ jp: "コンビニ", cn: "便利店", en: "a convenience store" },
			{ jp: "マナー", cn: "礼仪", en: "manners" },
		],
		notes: [
			{
				jp: "ほかにもたくさんありますが、これらは{外来語|がいらいご}ではなく、{日本語|にほんご}として{考|かんが}えましょう。",
				cn: "除此之外还有很多，不过让我们不要把这些当作外来语，而是当作日语来看吧。",
				en: "There are other similar words, but let’s consider them as Japanese words rather than words of foreign origin.",
			},
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的吧。",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "A",
				speakerCn: "A",
				speakerEn: "A",
				jp: "{最近|さいきん}の{若|わか}い{親|おや}は{頭|あたま}に{来|く}るんですよ。{電車|でんしゃ}の{中|なか}で{自分|じぶん}の{子|こ}どもが{走|はし}っていても{注意|ちゅうい}しないし、{靴|くつ}のまま{座席|ざせき}に{上|あ}がらせるし、まったく{子|こ}どものしつけがなっていません（注1）よ。",
				cn: "最近的年轻父母，真是让人火大啊。在电车里，哪怕自己的孩子在跑也不提醒，还让他们穿着鞋就上到座位上去，孩子简直毫无教养（注1）啊。",
				en: "Young parents these days make me so angry. They don’t even tell their kids off for running around on the train, they let them climb onto the seats with their shoes on — they just haven’t taught their children how to behave at all.",
			},
			{
				type: "speech",
				speaker: "B",
				speakerCn: "B",
				speakerEn: "B",
				jp: "いやー、{子|こ}どものしつけがなっていないどころか（注2）、{親|おや}{自身|じしん}のマナーがひどい。{子|こ}どもに{注意|ちゅうい}すると、{親|おや}がにらんでくるんですよ*。あのベビーカーもやめてほしいですよ。{混|こ}んだ{電車|でんしゃ}にそのまま{乗|の}ってくるし。",
				cn: "哎呀，岂止是孩子没有教养（注2），父母自身的礼仪糟糕得很。一提醒孩子，父母就朝你瞪过来啊*。那种婴儿车也希望他们别再用了啊。拥挤的电车里就那样上来。",
				en: "Oh, far from the children not having been taught how to behave, the parents’ own manners are awful. If you tell the child off, the parent starts glaring at you.* And I wish they’d stop with those strollers. They get on crowded trains with them still open.",
			},
			{
				type: "speech",
				speaker: "A",
				speakerCn: "A",
				speakerEn: "A",
				jp: "{親|おや}にも{子|こ}どもにも{注意|ちゅうい}してやらないといけないっていうことですよね。",
				cn: "也就是说，对父母和孩子都得提醒才行，对吧。",
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
				cn: "＊父母瞪过来",
				en: "The parent started glaring at me",
			},
		],
		choices: [
			{ jp: "Aさんは{自分|じぶん}の{子|こ}どものしつけができていない。", cn: "A没能把自己的孩子教养好。", en: "A has not taught their own child how to behave." },
			{ jp: "Bさんは{親|おや}より{子|こ}どものしつけが{大切|たいせつ}だと{言|い}っている。", cn: "B说，比起父母，孩子的教养更重要。", en: "B says teaching children how to behave is more important than the parents." },
			{ jp: "AさんもBさんも{親|おや}のマナーが{悪|わる}いと{思|おも}っている。", cn: "A和B都认为父母的礼仪很差。", en: "Both A and B think the parents’ manners are bad." },
			{ jp: "Bさんはベビーカーに{子|こ}どもを{乗|の}せたまま{電車|でんしゃ}に{乗|の}ってくる{親|おや}に{文句|もんく}がある。", cn: "B对让孩子坐在婴儿车里就上电车来的父母有怨言。", en: "B has a complaint about parents who get on the train with a child still in the stroller." },
			{ jp: "Aさんはにらまれるので{親|おや}には{注意|ちゅうい}したくない。", cn: "A因为会被瞪，所以不想提醒父母。", en: "A does not want to speak to the parents because they get glared at." },
		],
		answers: [3, 4],
	},

	mondai: {
		instruction: "{次|つぎ}の{文|ぶん}は{雑誌|ざっし}に{寄|よ}せられた{投書|とうしょ}である。{読|よ}んで{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "下面的文章是投给杂志的读者来信。请阅读并回答后面的问题。",
		instructionEn: "The following is a letter sent in to a magazine. Read it and answer the questions that follow. (Answers are in the separate booklet, p. 4.)",
		blocks: [
			{
				type: "title",
				jp: "チョット{一言|ひとこと}",
				cn: "就说一句",
				en: "A word",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{最近|さいきん}の{若|わか}い{母親|ははおや}に{言|い}いたい。{電車|でんしゃ}の{中|なか}では、ベビーカーをたたんでほしい。ベビーカーは{赤|あか}ちゃんを{乗|の}せるもの。たたんでしまえば{大|おお}きな{荷物|にもつ}になってしまう。{赤|あか}ちゃんのほかに{大|おお}きな{荷物|にもつ}を{抱|かか}えるのは{大変|たいへん}だ。それはわかる。しかし、{混|こ}んだ{電車|でんしゃ}の{中|なか}まで{平気|へいき}で（注1）{赤|あか}ちゃんを{乗|の}せたまま{乗|の}り{込|こ}んでくるのは、{迷惑|めいわく}である。まるで「{私|わたし}はこんな{小|ちい}さい{子|こ}を{連|つ}れていて{大変|たいへん}なんです。{場所|ばしょ}を{空|あ}けてくれるのは{当|あ}たり{前|まえ}でしょ。」と{言|い}っているような{顔|かお}をする。こちらがちょっと{迷惑|めいわく}そうな{顔|かお}をすると{反対|はんたい}に①にらみつけて（注2）くる。すいているときならともかく、{混|こ}んだ{車内|しゃない}では{絶対|ぜったい}に{折|お}りたたむ（注3）べきだ。{今|いま}のベビーカーは{昔|むかし}のとは{違|ちが}って{軽|かる}く、{簡単|かんたん}にたためるのだから。",
				cn: "想对最近的年轻母亲说。在电车里，希望把婴儿车折起来。婴儿车是用来让宝宝坐的。一旦折起来，就会变成一件大行李。除了宝宝还要抱着大行李，很辛苦。这一点我明白。但是，连拥挤的电车里也满不在乎地（注1）让宝宝坐着就挤进来，是添麻烦的。那神情简直像在说：「我带着这么小的孩子，很辛苦的。给我腾出地方不是理所当然的吗。」我这边稍微露出一点嫌麻烦的神色，对方反而①瞪视（注2）过来。不拥挤的时候倒也罢了，在拥挤的车厢里绝对应该折叠起来（注3）。毕竟现在的婴儿车和从前的不同，又轻，又很容易折叠。",
				en: "I have something to say to young mothers these days. On the train, I want them to fold the stroller. A stroller is for carrying a baby. Once you fold it, it becomes a bulky piece of luggage. Having to hold a baby and a bulky load as well is hard. I understand that. But boarding a crowded train without a care (note 1), baby still in the stroller, is a nuisance. They look as if they are saying, “I have a small child with me; it’s hard. Of course you should make space.” If I so much as look a little put out, they ①glare back at me instead. When the train is not crowded it might be another matter, but in a packed car you absolutely should fold it (note 3). Today’s strollers, unlike the old ones, are light and easy to fold.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{最近|さいきん}、{電車|でんしゃ}の{中|なか}でマナーの{悪|わる}い{子|こ}どもをよく{見|み}かけるが、{注意|ちゅうい}をしない{親|おや}に{問題|もんだい}がある。{子|こ}どもをしつける（注4）{以前|いぜん}に、まず{教育|きょういく}しなければならないのは{親|おや}のほうだ。{周|まわ}りの{人|ひと}も{黙|だま}らないで、{注意|ちゅうい}をするべきだろう。{今|いま}まで、{迷惑|めいわく}だと{思|おも}うだけで{何|なに}も{言|い}わずにきたが、{今度|こんど}からははっきり{言|い}わせてもらおう。「②」と。",
				cn: "最近，在电车里常能看到礼仪很差的孩子，但问题在于不提醒的父母。在管教孩子（注4）之前，首先必须受教育的是父母这一方。周围的人也不要沉默，应该出言提醒吧。迄今为止我只是觉得添麻烦，一直什么也没说，但从下次起，就请允许我把话说明白吧：「②」。",
				en: "Lately I often see children with bad manners on the train, and the problem is the parents who do not speak up. Before teaching the children how to behave (note 4), it is the parents who first need educating. People around them should not stay silent either; they should say something. Until now I have only thought it was a nuisance and said nothing, but from now on I will say it plainly: “②.”",
			},
			{
				type: "line",
				align: "right",
				jp: "（{東京都|とうきょうと}{主婦|しゅふ} {五十二歳|ごじゅうにさい}）",
				cn: "（东京都主妇 五十二岁）",
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
				cn: "＊不拥挤的时候倒也罢了",
				en: "When it is not crowded, it might be possible but …",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "①にらみつけてくるとあるが、そのときの{若|わか}い{母親|ははおや}の{気持|きも}ちに{最|もっと}も{近|ちか}いものはどれか。",
				cn: "文中说①瞪视过来，当时年轻母亲的心情最接近哪一个？",
				en: "The text says they ①glare. Which is closest to what the young mother is feeling then?",
				choices: [
					{ jp: "この{人|ひと}は、なんてしつけがなっていない{人|ひと}なんだろう。", cn: "这个人真是个多么没有教养的人啊。", en: "What an ill-mannered person this is." },
					{ jp: "この{人|ひと}は、なんてやさしくない{人|ひと}なんだろう。", cn: "这个人真是个多么不亲切的人啊。", en: "What an unkind person this is." },
					{ jp: "この{人|ひと}は、なんて{迷惑|めいわく}な{人|ひと}なんだろう。", cn: "这个人真是个多么给人添麻烦的人啊。", en: "What a nuisance this person is." },
					{ jp: "この{人|ひと}は、なんて{気|き}が{強|つよ}い{人|ひと}なんだろう。", cn: "这个人真是个多么好强的人啊。", en: "What a strong-willed person this is." },
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
				cn: "填入「②」中最恰当的话是哪一句？",
				en: "Which words fit best in “②”?",
				choices: [
					{ jp: "{混|こ}んだ{電車|でんしゃ}ではベビーカーをたたんでください", cn: "在拥挤的电车里请把婴儿车折起来", en: "Please fold the stroller on a crowded train" },
					{ jp: "{混|こ}んだ{電車|でんしゃ}に{乗|の}らないでください", cn: "请不要乘坐拥挤的电车", en: "Please do not board a crowded train" },
					{ jp: "{子|こ}どもの{前|まえ}に{親|おや}の{教育|きょういく}をしてください", cn: "请在孩子之前对父母进行教育", en: "Please educate the parents before the children" },
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
				cn: "岂止是孩子没有教养，父母自身的礼仪糟糕得很。",
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
				cn: "让宝宝坐着就挤进来。",
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
				cn: "不拥挤的时候倒也罢了，在拥挤的车厢里绝对应该折叠起来。",
				en: "When it isn’t crowded it might be another matter, but in a packed car you absolutely should fold it.",
			},
		},
	],
};
