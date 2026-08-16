import type { ReadingDay } from "./types";

// 第5週 1日目 日記① — printed pages 76–77
// 別冊 p.6（第5週の解答）は今回のスキャンに含まれていないため、答えは本文から導出。
export const w5d1: ReadingDay = {
	week: 5,
	day: 1,
	label: "日記①",
	labelKana: "にっき",
	labelEn: "Diaries ①",
	printedPages: [76, 77],
	answerSource: "derived",

	point: {
		title: "「だれがするか」に{注意|ちゅうい}しよう！",
		titleCn: "注意「是谁做的」！",
		titleEn: "Pay attention to the subject of each clause!",
		figure: {
			alt: "「久しぶりに子どもと遊んでやったら、大喜びだった。」という文に、「遊んでやった」＝私が、「大喜びだった」＝子どもが、という吹き出しがついている。横で「だれが遊んでやったの？　だれが大喜びだったの？」と首をかしげるキャラクター",
			cn: "例句「久しぶりに子どもと遊んでやったら、大喜びだった。」上标注：「遊んでやった」的主语是「私」，「大喜びだった」的主语是「子ども」。旁边有角色歪着头问：「是谁陪着玩？是谁高兴坏了？」",
			en: "The sample sentence “久しぶりに子どもと遊んでやったら、大喜びだった。” is labeled: the subject of “遊んでやった” is “I,” and the subject of “大喜びだった” is “the child.” A character nearby tilts their head and asks, “Who played with them? Who was overjoyed?”",
		},
		tips: [
			{
				jp: "{日本語|にほんご}では、「だれが」の{部分|ぶぶん}がよく{省略|しょうりゃく}されます。{一|ひと}つの{文|ぶん}の{中|なか}でも{前半|ぜんはん}と{後半|こうはん}で{主語|しゅご}が{変|か}わることがあるので{注意|ちゅうい}しよう。",
				cn: "日语里「谁」这一部分经常被省略。**同一个句子里前半句和后半句的主语还可能不同**，读日记、小说时一定要随时问自己「这是谁做的？」。",
				en: "In Japanese, the “who” part is often left out. Even within a single sentence, the subject of the first half and the second half can be different, so when you read diaries or stories, keep asking yourself, “Who is doing this?”",
			},
			{
				jp: "「〜てあげる」＝{私|わたし}→{人|ひと}、「〜てくれる」＝{人|ひと}→{私|わたし}、「〜てもらう」＝{私|わたし}が{人|ひと}から。{授受|じゅじゅ}の{動詞|どうし}が{主語|しゅご}を{教|おし}えてくれる。",
				cn: "「〜てあげる」＝我给别人；「〜てくれる」＝别人给我；「〜てもらう」＝我从别人那里得到。**授受动词本身就在告诉你主语是谁**。",
				en: "“〜てあげる” = I do it for someone else; “〜てくれる” = someone does it for me; “〜てもらう” = I have someone do it for me. Giving-and-receiving verbs themselves tell you who the subject is.",
			},
		],
		expressions: [
			{ jp: "〜てあげる", cn: "（我）为别人做〜", en: "(I) do … for someone else" },
			{ jp: "〜てくれる", cn: "（别人）为我做〜", en: "(someone) does … for me" },
			{ jp: "〜てもらう", cn: "（我）请别人为我做〜", en: "(I) have someone do … for me" },
			{ jp: "〜らしい", cn: "好像〜（根据听到、看到的情况推测）", en: "it seems … (inference from what you saw or heard)" },
			{ jp: "〜そうだ", cn: "听说〜（传闻）", en: "I hear that … (hearsay)" },
			{ jp: "とっくに", cn: "早就……", en: "long ago; already well past" },
			{ jp: "しかも", cn: "而且、再加上", en: "what's more; besides" },
			{ jp: "お年玉", kana: "おとしだま", cn: "压岁钱", en: "gift money given to children at New Year's" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{ type: "speech", speaker: "{有希|ゆき}", speakerCn: "有希", speakerEn: "Yuki", jp: "ねえ、{愛|あい}ちゃん、{誕生日|たんじょうび}いつ？", cn: "喂，小爱，你生日是什么时候？", en: "Hey, Ai, when’s your birthday?" },
			{
				type: "speech",
				speaker: "{愛|あい}",
				speakerCn: "爱",
				speakerEn: "Ai",
				jp: "{私|わたし}は8{月|がつ}5{日|いつか}。あと2{週間|しゅうかん}で15{歳|さい}。",
				cn: "我是 8 月 5 日。再过两周就 15 岁了。",
				en: "Mine is August 5th. In two weeks I’ll be 15.",
			},
			{
				type: "speech",
				speaker: "{有希|ゆき}",
				speakerCn: "有希",
				speakerEn: "Yuki",
				jp: "あ、{私|わたし}は10{月|がつ}5{日|いつか}だから、ちょうど2ヵ{月違|げつちが}いだね。ね、{舞|まい}ちゃんはいつ？",
				cn: "啊，我是 10 月 5 日，正好差两个月呢。那小舞你呢？",
				en: "Oh, mine is October 5th, so we’re exactly two months apart. Hey, Mai, when’s yours?",
			},
			{ type: "speech", speaker: "{舞|まい}", speakerCn: "舞", speakerEn: "Mai", jp: "1{月|がつ}1{日|ついたち}。", cn: "1 月 1 日。", en: "January 1st." },
			{ type: "speech", speaker: "{愛|あい}", speakerCn: "爱", speakerEn: "Ai", jp: "えー！　お{正月|しょうがつ}なんだ。おめでたいね。", cn: "咦——！是新年那天啊。真吉利呢。", en: "What? That’s New Year’s Day! How lucky." },
			{
				type: "speech",
				speaker: "{舞|まい}",
				speakerCn: "舞",
				speakerEn: "Mai",
				jp: "うん、でも、あんまりよくない。だって、{誕生日|たんじょうび}プレゼントなんてもらったことないもん（※1）。{親|おや}も、お{年玉|としだま}（※2）でいいでしょ、って{言|い}うしね。",
				cn: "嗯，不过其实不太好。因为我从来没收到过生日礼物嘛。爸妈也说「有压岁钱就够了吧」。",
				en: "Yeah, but it’s not that great. I’ve never gotten a birthday present. My parents just say, “New Year’s money is enough, right?”",
			},
		],
		footnotes: [
			{ marker: "※1", term: "〜もん。", jp: "〜から。", cn: "因为〜嘛（口语，多为女性、儿童使用）", en: "because … (casual; often used by women and children)" },
			{ marker: "※2", term: "お年玉", jp: "gift money given to children at New Year's", cn: "压岁钱", en: "gift money given to children at New Year's" },
		],
		choices: [
			{ jp: "みんなで{誕生日|たんじょうび}パーティーの{計画|けいかく}を{立|た}てている。", cn: "大家正在计划生日聚会。", en: "They are all planning a birthday party together." },
			{ jp: "2{週間後|しゅうかんご}に{愛|あい}の{誕生日|たんじょうび}が{来|く}る。", cn: "两周后就是爱的生日。", en: "Ai’s birthday is in two weeks." },
			{ jp: "{愛|あい}は{有希|ゆき}より2ヵ{月早|げつはや}く{生|う}まれた。", cn: "爱比有希早出生两个月。", en: "Ai was born two months earlier than Yuki." },
			{ jp: "{舞|まい}は{自分|じぶん}の{誕生日|たんじょうび}にお{年玉|としだま}をもらえるのでうれしい。", cn: "舞因为生日那天能拿到压岁钱而高兴。", en: "Mai is happy because she gets New Year’s money on her birthday." },
			{ jp: "{舞|まい}はいつも{親|おや}から{誕生日|たんじょうび}プレゼントをもらう。", cn: "舞总是能从父母那里得到生日礼物。", en: "Mai always gets a birthday present from her parents." },
		],
		answers: [2, 3],
		hint: {
			jp: "「だって、〜もん」という{形|かたち}でよく{女性|じょせい}や{子|こ}どもが{使|つか}う。{愛|あい}は8{月|がつ}5{日|いつか}、{有希|ゆき}は10{月|がつ}5{日|いつか}。",
			cn: "「だって、〜もん」是女性和儿童常用的说法。爱是 8 月 5 日、有希是 10 月 5 日，所以爱早两个月出生；舞说的是「生日礼物一次都没收到过」，并不高兴。",
			en: "“だって、〜もん” is a form often used by women and children. Ai’s birthday is August 5th and Yuki’s is October 5th, so Ai was born two months earlier. Mai says she has never received a birthday present, so she is not happy about it.",
		},
	},

	mondai: {
		instruction: "{次|つぎ}の{日記|にっき}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的日记，回答后面的问题。（原书答案在别册 p.6）",
		instructionEn: "Read the diary below and answer the questions that follow. (Answers are in the supplement, p. 6.)",
		blocks: [
			{ type: "heading", jp: "9{月|がつ}2{日|か}（{月|げつ}）　{晴|は}れ", cn: "9 月 2 日（星期一）　晴", en: "September 2 (Monday)　Sunny" },
			{
				type: "paragraph",
				indent: true,
				jp: "{今日|きょう}はうれしいことがあった。{舞|まい}ちゃんから{誕生日|たんじょうび}のプレゼントをもらったのだ。{最初|さいしょ}、なぜ{私|わたし}にくれるのかわからなかった。あまり{話|はな}したことがないのに。しかも（※1）{誕生日|たんじょうび}はとっくに（※2）{過|す}ぎているのに＊。",
				cn: "今天有件开心的事。我收到了小舞送的生日礼物。一开始我不明白她为什么要送我。我们平时也没怎么说过话。而且我的生日早就过去了＊。",
				en: "Something nice happened today. I got a birthday present from Mai. At first I couldn’t figure out why she was giving it to me. We hardly ever talk. And besides, my birthday was already long past＊.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "1{学期|がっき}、{舞|まい}ちゃん{学校|がっこう}を{休|やす}んだとき、{授業|じゅぎょう}のノートを{貸|か}してあげたことがあった。そのときにすごく①うれしかったらしく、いつかお{礼|れい}をしたいと{思|おも}っていたそうだ。それから、{自分|じぶん}の{誕生日|たんじょうび}が1{月|がつ}1{日|ついたち}で、お{正月|しょうがつ}だし、{友|とも}だちからプレゼントをもらうことがないから、②{私|わたし}の{気持|きも}ちがわかると{言|い}っていた。",
				cn: "第一学期小舞请假没来学校时，我把上课的笔记借给了她。听说她当时非常①开心，一直想着什么时候要回报我。还有，她说自己的生日是 1 月 1 日、正好是新年，从来收不到朋友的礼物，所以②能理解我的心情。",
				en: "In the first term, when Mai missed school, I lent her my class notes. Apparently she was really ① happy about that and had been wanting to thank me someday. She also said that her own birthday is January 1st — New Year’s — so she never gets presents from friends, and that’s why she ② understands how I feel.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "そういえば、いつだったか、みんなで{誕生日|たんじょうび}の{話|はなし}をしたことがあった＊＊。",
				cn: "这么说来，不知什么时候，大家好像确实聊过生日的事＊＊。",
				en: "Come to think of it, we did once talk about our birthdays＊＊.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{私|わたし}の{誕生日|たんじょうび}は{夏休|なつやす}み{中|ちゅう}に{来|く}るから、{友|とも}だちに{会|あ}うことも{少|すく}なくて、あんまりプレゼントをもらえない。それでいつもつまらないなあ、と{思|おも}っていたのだ。",
				cn: "我的生日在暑假期间，很少能见到朋友，所以基本收不到礼物。因此一直觉得挺没意思的。",
				en: "My birthday falls during summer vacation, so I hardly see my friends and don’t really get any presents. That’s why I always felt it was kind of a letdown.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{今年|ことし}も{有希|ゆき}がカードをくれただけだった。かわいい{写真|しゃしん}たて（※3）もうれしかったけれど、それより、{黙|だま}って（※4）プレゼントを{用意|ようい}してくれていたことに③{感激|かんげき}した。",
				cn: "今年也只有有希送了张卡片。可爱的相框固然让我高兴，但比起礼物本身，她默默地为我准备了礼物这件事更让我③感动。",
				en: "This year, too, I only got a card from Yuki. The cute photo frame made me happy, but more than the gift itself, I was ③ moved that she had quietly prepared a present for me.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{舞|まい}ちゃんの{誕生日|たんじょうび}には{忘|わす}れずにプレゼントをあげなくちゃ。ありがとう、{舞|まい}ちゃん！",
				cn: "小舞生日的时候我一定不能忘了送她礼物。谢谢你，小舞！",
				en: "I mustn’t forget to give Mai a present on her birthday. Thank you, Mai!",
			},
		],
		footnotes: [
			{ marker: "※1", term: "しかも", jp: "what's more / furthermore", cn: "而且、再加上", en: "what's more / furthermore" },
			{ marker: "※2", term: "とっくに", jp: "long time ago", cn: "早就……", en: "long time ago" },
			{ marker: "※3", term: "写真たて", jp: "a photo frame", cn: "相框", en: "a photo frame" },
			{ marker: "※4", term: "黙って", jp: "secretly; without revealing anything", cn: "默默地、不声张地", en: "secretly; without revealing anything" },
		],
		pageNotes: [
			{ jp: "＊ Besides that, it was already well past my birthday.", cn: "＊而且我的生日早就过了。", en: "＊ Besides that, it was already well past my birthday." },
			{ jp: "＊＊ When I think of it, we once talked about our birthdays.", cn: "＊＊这么说来，以前大家确实聊过生日的事。", en: "＊＊ When I think of it, we once talked about our birthdays." },
		],
		questions: [
			{
				label: "問1",
				jp: "①「うれしかった」のはだれか。また③「{感激|かんげき}した」のはだれか。{組|く}み{合|あ}わせとして{正|ただ}しいものを{選|えら}びなさい。",
				cn: "①「开心」的是谁？③「感动」的又是谁？请选出正确的组合。",
				en: "Who was ① “happy”? And who was ③ “moved”? Choose the correct pair.",
				choices: [
					{ jp: "①{私|わたし}　③{私|わたし}", cn: "①我　③我", en: "① I　③ I" },
					{ jp: "①{私|わたし}　③{舞|まい}", cn: "①我　③舞", en: "① I　③ Mai" },
					{ jp: "①{舞|まい}　③{舞|まい}", cn: "①舞　③舞", en: "① Mai　③ Mai" },
					{ jp: "①{舞|まい}　③{私|わたし}", cn: "①舞　③我", en: "① Mai　③ I" },
				],
				answer: 4,
				explanation:
					"①所在的句子是「（舞ちゃんに）ノートを貸してあげたことがあった。そのときにすごくうれしかったらしく、いつかお礼をしたいと思っていたそうだ」。「貸してあげた」是我做的，但「うれしかった」的是**收到帮助的舞**——后面「お礼をしたい（想报答）」的也只能是舞。③所在的句子是「黙ってプレゼントを用意してくれていたことに感激した」，「〜てくれる」表示别人为我做，所以感动的是**写日记的「私」**。因此答案是 ①舞 ③私，选 4。这一题正是本课要点：主语被省略时，靠「〜てあげる／〜てくれる」和「らしい／そうだ」来判断。",
				explanationEn:
					"The sentence around ① is: “I had lent her my class notes. Apparently she was really happy then and had been wanting to thank me someday.” “貸してあげた” is what I did, but the one who was “うれしかった” is Mai, who received the help — and the one who “wanted to thank me” can only be Mai. The sentence around ③ is “I was moved that she had quietly prepared a present for me.” “〜てくれる” means someone did it for me, so the one who was moved is the diary writer, “I.” So the answer is ① Mai, ③ I — choice 4. This is exactly the day’s key point: when the subject is omitted, use “〜てあげる／〜てくれる” and “らしい／そうだ” to figure out who did what.",
				choiceNotes: [
					"①的主语不是我——借出笔记的是我，但为此高兴、想报答的是舞。",
					"①③都判断反了。",
					"③错。「用意してくれていた」用了「くれる」，受益者是我，所以感动的是我。",
					"正确。①＝舞（受到帮助而开心）、③＝私（因为对方默默准备礼物而感动）。",
				],
				choiceNotesEn: [
					"The subject of ① is not “I.” I was the one who lent the notes, but the one who was happy and wanted to thank me is Mai.",
					"Both ① and ③ are the wrong way around.",
					"③ is wrong. “用意してくれていた” uses “くれる,” so the beneficiary is “I,” and the one who was moved is “I.”",
					"Correct. ① = Mai (happy because she was helped); ③ = I (moved because she quietly prepared a present).",
				],
			},
			{
				label: "問2",
				jp: "②「{私|わたし}の{気持|きも}ち」とはどういう{気持|きも}ちか。",
				cn: "②「我的心情」指的是什么样的心情？",
				en: "What kind of feeling is ② “how I feel”?",
				choices: [
					{ jp: "{誕生日|たんじょうび}が{過|す}ぎてしまって{残念|ざんねん}だ。", cn: "生日过去了，觉得遗憾。", en: "Disappointed that her birthday has already passed." },
					{ jp: "{誕生日|たんじょうび}にかわいいプレゼントがほしい。", cn: "希望生日时收到可爱的礼物。", en: "Wanting a cute present on her birthday." },
					{ jp: "{休|やす}み{中|ちゅう}に{誕生日|たんじょうび}パーティーをしたい。", cn: "想在假期里办生日聚会。", en: "Wanting to have a birthday party during the vacation." },
					{ jp: "{休|やす}み{中|ちゅう}でプレゼントがもらえなくてつまらない。", cn: "因为生日在假期里收不到礼物，觉得没意思。", en: "Feeling it’s a letdown that she gets no presents because her birthday falls during vacation." },
				],
				answer: 4,
				explanation:
					"舞说「自分の誕生日が1月1日で、お正月だし、友だちからプレゼントをもらうことがないから、私の気持ちがわかる」——她的生日碰上新年假期，收不到朋友的礼物。而后文写道「私の誕生日は夏休み中に来るから、友だちに会うことも少なくて、あんまりプレゼントをもらえない。それでいつもつまらないなあ、と思っていた」。两人共同的处境就是「生日落在假期里、收不到礼物、觉得没意思」，所以 4 正确。",
				explanationEn:
					"Mai says, “My birthday is January 1st, New Year’s, so I never get presents from friends, and that’s why I understand how you feel.” Her birthday falls on a holiday, so she doesn’t get presents from friends. Later the writer says, “My birthday comes during summer vacation, so I hardly see my friends and don’t really get any presents. That’s why I always felt it was kind of a letdown.” What they share is “birthday during a vacation → no presents → it feels dull,” so 4 is correct.",
				choiceNotes: [
					"「誕生日はとっくに過ぎている」只是说明礼物来得晚，不是「我的心情」的内容。",
					"日记里强调的是「もらえない」这件事本身，而不是想要「可爱的」礼物。",
					"文中完全没有提到想办生日聚会。",
					"正确。「休み中に誕生日が来る → 友だちに会えない → プレゼントがもらえない → つまらない」，这正是两人共同的心情。",
				],
				choiceNotesEn: [
					"“My birthday was already long past” only explains that the gift came late; it is not the content of “how I feel.”",
					"The diary stresses not getting presents at all, not wanting a “cute” present.",
					"There is no mention of wanting a birthday party.",
					"Correct. “Birthday during vacation → can’t see friends → no presents → a letdown” is the feeling they share.",
				],
			},
		],
	},

	vocab: [
		{ jp: "日記", kana: "にっき", cn: "日记", en: "diary", pos: "名詞" },
		{ jp: "誕生日", kana: "たんじょうび", cn: "生日", en: "birthday", pos: "名詞" },
		{ jp: "お年玉", kana: "おとしだま", cn: "压岁钱", en: "New Year's gift money", pos: "名詞" },
		{ jp: "おめでたい", cn: "可喜可贺、吉利", en: "auspicious; a happy occasion", pos: "い形" },
		{ jp: "学期", kana: "がっき", cn: "学期", en: "school term", pos: "名詞" },
		{ jp: "お礼", kana: "おれい", cn: "谢意、回礼", en: "thanks; a token of gratitude", pos: "名詞" },
		{ jp: "とっくに", cn: "早就", en: "long ago; already", pos: "副詞" },
		{ jp: "しかも", cn: "而且", en: "what's more; besides", pos: "接続詞" },
		{ jp: "そういえば", cn: "这么说来", en: "come to think of it", pos: "接続詞" },
		{ jp: "写真たて", kana: "しゃしんたて", cn: "相框", en: "photo frame", pos: "名詞" },
		{ jp: "黙る", kana: "だまる", cn: "沉默、不说", en: "to stay silent; to say nothing", pos: "動詞" },
		{ jp: "感激する", kana: "かんげきする", cn: "感动", en: "to be deeply moved", pos: "動詞" },
		{ jp: "用意する", kana: "よういする", cn: "准备", en: "to prepare; to get ready", pos: "動詞" },
		{ jp: "つまらない", cn: "无聊、没意思", en: "dull; no fun; a letdown", pos: "い形" },
		{ jp: "計画を立てる", kana: "けいかくをたてる", cn: "制定计划", en: "to make a plan", pos: "表現" },
	],

	grammar: [
		{
			pattern: "〜てあげる／〜てくれる／〜てもらう",
			meaning: "授受表达。「あげる」＝我给别人；「くれる」＝别人给我；「もらう」＝我请别人做。**主语被省略时，靠这三个词判断谁是施动者**。",
			meaningEn: "Giving-and-receiving expressions. “あげる” = I do it for someone else; “くれる” = someone does it for me; “もらう” = I have someone do it. When the subject is omitted, use these three to tell who is doing the action.",
			example: {
				jp: "{授業|じゅぎょう}のノートを{貸|か}してあげた／プレゼントを{用意|ようい}してくれていた",
				cn: "（我）把上课笔记借给了她／（她）为我准备了礼物",
				en: "I lent her my class notes / she had prepared a present for me",
			},
			note: "本课要点，也是問1 的解题钥匙。",
			noteEn: "This is the key point of the lesson, and the key to Question 1.",
		},
		{
			pattern: "〜らしい",
			formation: "普通形 ＋ らしい",
			meaning: "好像……。根据看到、听到的情况做出的推测，主语通常是别人。",
			meaningEn: "It seems … / apparently …. An inference based on what you saw or heard; the subject is usually someone else.",
			example: { jp: "そのときにすごくうれしかったらしく", cn: "听说她当时非常开心", en: "apparently she was really happy then" },
		},
		{
			pattern: "〜そうだ（伝聞）",
			meaning: "听说……。转述别人的话，主语是别人。",
			meaningEn: "I hear that … / they say …. Reports what someone else said; the subject is someone else.",
			example: { jp: "いつかお{礼|れい}をしたいと{思|おも}っていたそうだ。", cn: "听说她一直想着什么时候要报答我。", en: "I hear she had been wanting to thank me someday." },
		},
		{
			pattern: "〜のに",
			meaning: "明明……却……。表示意外或不满。日记中常用来表达惊讶。",
			meaningEn: "Even though … / and yet …. Expresses surprise or dissatisfaction. Diaries often use it to show astonishment.",
			example: { jp: "あまり{話|はな}したことがないのに。", cn: "明明我们没怎么说过话。", en: "Even though we hardly ever talked." },
		},
		{
			pattern: "〜{忘|わす}れずに",
			formation: "動詞ない形（ない→ずに）",
			meaning: "别忘了……。「〜ないで」的书面形式。",
			meaningEn: "Without forgetting … / be sure to …. The written form of “〜ないで.”",
			example: { jp: "{忘|わす}れずにプレゼントをあげなくちゃ。", cn: "一定不能忘了送礼物。", en: "I mustn’t forget to give her a present." },
		},
		{
			pattern: "〜なくちゃ（＝〜なくてはいけない）",
			meaning: "必须……。口语省略形，后半句省略。",
			meaningEn: "Have to … / must …. A casual shortened form; the rest of the sentence is left out.",
			example: { jp: "プレゼントをあげなくちゃ。", cn: "得送她礼物才行。", en: "I’ve got to give her a present." },
		},
		{
			pattern: "〜もん（＝〜もの）",
			meaning: "因为……嘛。带撒娇、辩解语气的口语，多为女性和儿童使用。",
			meaningEn: "Because … (you see). Casual speech with a slightly pleading or justifying tone, often used by women and children.",
			example: { jp: "だって、もらったことないもん。", cn: "因为我根本没收到过嘛。", en: "Because I’ve never gotten one, you know." },
		},
	],
};
