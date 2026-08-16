import type { ReadingDay } from "./types";

// 第3週 1日目 メール① — printed pages 44–45
export const w3d1: ReadingDay = {
	week: 3,
	day: 1,
	label: "メール①",
	labelEn: "E-mail ①",
	printedPages: [44, 45],
	answerSource: "book",

	point: {
		title: "「あげる」「くれる」「もらう」を{表|あらわ}す{敬語|けいご}に{注意|ちゅうい}しよう！",
		titleCn: "注意「あげる」「くれる」「もらう」的敬语表达方式！",
		titleEn: "Pay attention to polite language meaning 'to give', 'to give it to me', or 'to receive'!",
		figure: {
			alt: "ハートのついた封筒「From Hanako」を手に、うれしそうにしているキャラクターのイラスト",
			cn: "一个角色拿着贴着爱心、写着「From Hanako」的信封，一脸开心。",
			en: "A character happily holding an envelope decorated with a heart and labeled “From Hanako.”",
		},
		tips: [
			{
				jp: "{尊敬語|そんけいご}は{聞|き}き{手|て}や{話題|わだい}の{人|ひと}、{謙譲語|けんじょうご}は{話|はな}し{手|て}の{行為|こうい}などに{対|たい}して{使|つか}います。{丁寧語|ていねいご}は{聞|き}き{手|て}に{対|たい}して{敬意|けいい}を{表|あらわ}して{使|つか}います。",
				cn: "尊敬语用于听话人或话题中的人物的行为；谦让语用于说话人自己的行为；礼貌语则是对听话人表示敬意。判断「谁给谁」时，敬语的方向就是最大的线索。",
				en: "Honorific language is used for the listener or the person being talked about; humble language is used for the speaker’s own actions; polite language shows respect toward the listener. When deciding “who gave what to whom,” the direction of the keigo is the biggest clue.",
			},
		],
		expressions: [
			{ jp: "あげる／〜てあげる", cn: "→ さしあげる／〜てさしあげる（谦让语）我给别人", en: "to give (humble)" },
			{ jp: "くれる／〜てくれる", cn: "→ くださる／〜てくださる（尊敬语）别人给我", en: "to give it to me (honorific)" },
			{ jp: "もらう／〜てもらう", cn: "→ いただく／〜ていただく（谦让语）我从别人处得到", en: "to receive (humble)" },
			{ jp: "召し上がる", kana: "めしあがる", cn: "「食べる・飲む」的尊敬语", en: "to eat (honorific)" },
			{ jp: "いただく", cn: "「もらう」的谦让语，也有「吃、喝」的意思", en: "to receive / to eat (humble)" },
			{ jp: "まいる", cn: "「行く・来る」的谦让语", en: "to go / to come (humble)" },
			{ jp: "おっしゃる", cn: "「言う」的尊敬语", en: "to say (honorific)" },
		],
		notes: [
			{
				jp: "＊「いただく」には「{食|た}べる」という{意味|いみ}もある。",
				cn: "＊「いただく」除了「得到」以外，还有「吃、喝」的意思，要看上下文判断。",
				en: "＊ Itadaku also means “to eat / drink,” not only “to receive.” Use the context to decide which meaning it has.",
			},
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the dialogue below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{和子|かずこ}",
				speakerCn: "和子",
				speakerEn: "Kazuko",
				jp: "お{母様|かあさま}、お{友達|ともだち}がりんごを{送|おく}ってくれたので{少|すこ}し{持|も}ってまいりました。",
				cn: "妈妈（婆婆），朋友寄了苹果给我，我带了一些过来。",
				en: "Mother, a friend sent me some apples, so I brought a few over.",
			},
			{
				type: "speech",
				speaker: "{夫|おっと}の{母|はは}",
				speakerCn: "婆婆",
				speakerEn: "Mother-in-law",
				jp: "あら、ピカピカ（※1）していてりっぱなりんごねえ。あの{青森|あおもり}の{方|かた}でしょ？　{台風|たいふう}はどうだったのかしら。",
				cn: "哎呀，亮晶晶的，好漂亮的苹果呢。是青森那位吧？台风那边怎么样了呢。",
				en: "My, what splendid shiny apples. That’s the person in Aomori, isn’t it? I wonder how the typhoon was there.",
			},
			{
				type: "speech",
				speaker: "{和子|かずこ}",
				speakerCn: "和子",
				speakerEn: "Kazuko",
				jp: "ええ、{私|わたし}も{心配|しんぱい}していたんですけれど、{大丈夫|だいじょうぶ}だったみたいですよ。あの、これ、すごくおいしいですよ。お{母様|かあさま}、もっと{召|め}し{上|あ}がれる（※2）ようならまた{持|も}ってきますので、おっしゃってくださいね。",
				cn: "是啊，我也一直担心，不过好像没事。那个，这个非常好吃哦。妈妈，如果您还想吃我再带过来，请跟我说一声。",
				en: "Yes, I was worried too, but it seems they were all right. These are really delicious. Mother, if you’d like more, I’ll bring some again, so please just say so.",
			},
			{
				type: "speech",
				speaker: "{夫|おっと}の{母|はは}",
				speakerCn: "婆婆",
				speakerEn: "Mother-in-law",
				jp: "そうねえ、お{隣|となり}にも{差|さ}し{上|あ}げようかしら。お{世話|せわ}になっているから。",
				cn: "是啊，要不也送一些给隔壁吧。平时承蒙人家照顾。",
				en: "Well, perhaps I should give some to the neighbors, too. They’ve been so kind to us.",
			},
		],
		footnotes: [
			{ marker: "※1", term: "ピカピカ", jp: "indicates that something is shiny", cn: "亮晶晶、闪闪发光的样子", en: "indicates that something is shiny" },
			{ marker: "※2", term: "召し上がる", jp: "to eat (honorific form)", cn: "吃（尊敬语）", en: "to eat (honorific form)" },
		],
		choices: [
			{ jp: "{和子|かずこ}は{夫|おっと}の{母|はは}と{一緒|いっしょ}に{住|す}んでいる。", cn: "和子和婆婆住在一起。", en: "Kazuko lives with her mother-in-law." },
			{ jp: "{和子|かずこ}の{友達|ともだち}は{青森|あおもり}に{住|す}んでいる。", cn: "和子的朋友住在青森。", en: "Kazuko’s friend lives in Aomori." },
			{ jp: "{青森|あおもり}に{今台風|いまたいふう}が{来|き}ている。", cn: "青森现在正有台风。", en: "A typhoon is hitting Aomori right now." },
			{ jp: "{和子|かずこ}の{友|とも}だちは{病気|びょうき}だった。", cn: "和子的朋友生病了。", en: "Kazuko’s friend was ill." },
			{ jp: "{夫|おっと}の{母|はは}はりんごを{隣|となり}の{人|ひと}にあげたい。", cn: "婆婆想把苹果送给隔壁的人。", en: "The mother-in-law wants to give some apples to the neighbors." },
		],
		answers: [2, 5],
		hint: {
			jp: "「{持|も}ってまいりました」と{言|い}っているので、{別|べつ}の{家|いえ}から{来|き}ている。{台風|たいふう}は「どうだった」と{過去|かこ}のこと。",
			cn: "说「持ってまいりました（带过来了）」，说明是从别的家过来的，不是同住；台风用的是「どうだった」，是过去的事，不是现在正刮台风。",
			en: "She says motte mairimashita (“I brought them over”), so she came from another house — they do not live together. The typhoon is referred to with dō datta, so it is already in the past, not happening now.",
		},
	},

	mondai: {
		instruction: "{次|つぎ}のメールを{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的邮件，回答后面的问题。（答案在别册 p.4）",
		instructionEn: "Read the e-mail below and answer the questions that follow. (Answers are in the separate booklet, p. 4.)",
		blocks: [
			{ type: "line", jp: "{宛先|あてさき}：kyoko_ta@lemon.ask-net.ne.jp", cn: "收件人：kyoko_ta@lemon.ask-net.ne.jp", en: "To: kyoko_ta@lemon.ask-net.ne.jp" },
			{ type: "line", jp: "{送信者|そうしんしゃ}：kazuko@black.abc-net.com", cn: "发件人：kazuko@black.abc-net.com", en: "From: kazuko@black.abc-net.com" },
			{ type: "line", jp: "{件名|けんめい}：ありがとうございました。", cn: "主题：谢谢您。", en: "Subject: Thank you." },
			{ type: "line", jp: "{田中|たなか}　{京子様|きょうこさま}", cn: "田中　京子女士", en: "Ms. Kyoko Tanaka" },
			{
				type: "paragraph",
				jp: "お{久|ひさ}しぶりです。{先|さき}ほど、{宅配便|たくはいびん}（※1）を{受|う}け{取|と}りました。りんごをたくさん{送|おく}ってくださってありがとうございました。",
				cn: "好久不见。刚才收到了快递。谢谢您寄来这么多苹果。",
				en: "It’s been a long time. I just received the courier delivery. Thank you for sending so many apples.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{実|じつ}は{先日|せんじつ}、{台風|たいふう}が{青森|あおもり}に{上陸|じょうりく}した（※2）というニュースを{見|み}て、「{田中|たなか}さんの{家|いえ}のほうは{大丈夫|だいじょうぶ}かしら」と{家族|かぞく}で{話|はな}していたのです＊。でも、①{安心|あんしん}しました。",
				cn: "其实前几天看到台风在青森登陆的新闻，我们全家还在说「田中家那边不知道有没有事」＊。不过，①我放心了。",
				en: "Actually, the other day we saw the news that a typhoon had made landfall in Aomori, and the family here was saying, “I wonder if the Tanakas are all right”＊. But ① I was relieved.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{大|おお}きくてピカピカしたりっぱなりんごですね。{箱|はこ}を{開|あ}ける{前|まえ}から、とてもいいにおいがしていました。さっそく、ひとつ（　②　）のですが、{本当|ほんとう}においしくて、{田中|たなか}さんの「{元気|げんき}ですよ」という{声|こえ}が{伝|つた}わってくるようでした。{真紀|まき}も{明日|あした}の{遠足|えんそく}に{持|も}っていって{友|とも}だちにもあげるんだ、と{大喜|おおよろこ}びです。",
				cn: "又大又亮、非常漂亮的苹果呢。还没打开箱子就闻到很香的味道了。我马上（　②　）了一个，真的很好吃，仿佛能听到田中女士「我很好哦」的声音。真纪也高兴得不得了，说明天要带去远足分给朋友们。",
				en: "They are large, shiny, splendid apples. Even before I opened the box, they smelled wonderful. I immediately (　②　) one, and it was truly delicious — it was as if Ms. Tanaka’s voice saying “I’m fine” came through with it. Maki is delighted too, and says she’ll take some on tomorrow’s field trip to share with her friends.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{主人|しゅじん}の{母|はは}や{妹|いもうと}の{家|いえ}にも{分|わ}けて、みんなで{楽|たの}しもうと{思|おも}っています＊＊。{本当|ほんとう}にありがとうございました。",
				cn: "还打算分一些给我先生的母亲和妹妹家，大家一起享用＊＊。真的非常感谢。",
				en: "I plan to share some with my husband’s mother and my younger sister’s family so we can all enjoy them＊＊. Thank you so very much.",
			},
			{ type: "line", jp: "{高橋|たかはし}　{和子|かずこ}", cn: "高桥　和子", en: "Kazuko Takahashi", align: "right" },
		],
		footnotes: [
			{ marker: "※1", term: "宅配便", jp: "a courier service", cn: "宅急送、快递", en: "a courier service" },
			{ marker: "※2", term: "上陸する", jp: "to land", cn: "登陆", en: "to land" },
		],
		pageNotes: [
			{
				jp: "＊ The other day we saw the news that the typhoon had hit Aomori, so our family here was wondering if the Tanaka family was all right.",
				cn: "＊前几天在电视上看到台风登陆青森的新闻后，我们全家还在说「不知道田中家那边有没有事」。",
				en: "＊ The other day we saw the news that the typhoon had hit Aomori, so our family here was wondering if the Tanaka family was all right.",
			},
			{
				jp: "＊＊ We will enjoy them with my mother-in-law and my younger sister's family.",
				cn: "＊＊我还打算分一些给婆婆和妹妹家，大家一起享用。",
				en: "＊＊ We will enjoy them with my mother-in-law and my younger sister's family.",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "①「{安心|あんしん}しました」とあるが、なぜか。",
				cn: "文中说①「我放心了」，这是为什么？",
				en: "The text says ① “I was relieved.” Why?",
				choices: [
					{ jp: "{台風|たいふう}が{青森|あおもり}には{来|こ}なかったから。", cn: "因为台风没有来青森。", en: "Because the typhoon did not come to Aomori." },
					{ jp: "{田中|たなか}さんは{台風|たいふう}の{被害|ひがい}を{受|う}けなかったようだから。", cn: "因为田中女士看来没有受到台风的灾害。", en: "Because Ms. Tanaka does not seem to have suffered damage from the typhoon." },
					{ jp: "りんごが{多|おお}かったから。", cn: "因为苹果很多。", en: "Because there were a lot of apples." },
					{ jp: "りんごがりっぱでおいしかったから。", cn: "因为苹果又好又好吃。", en: "Because the apples were splendid and delicious." },
				],
				answer: 2,
				explanation:
					"前一句写道：看到台风在青森登陆的新闻，全家都在担心「田中さんの家のほうは大丈夫かしら」。而现在收到了田中寄来的苹果，说明对方平安无事、还有余力寄东西——所以「安心しました」。因果关系在「でも」前后，2 正确。",
				explanationEn:
					"The previous sentence says that after seeing news of a typhoon making landfall in Aomori, the whole family was worrying, “I wonder if the Tanakas are all right.” Now that apples have arrived from Tanaka, it is clear they are safe and even well enough to send a gift — hence “I was relieved.” The cause and effect sit on either side of demo. Choice 2 is correct.",
				choiceNotes: [
					"新闻明确说了「台風が青森に上陸した」，台风确实来了青森。",
					"正确。收到苹果＝田中家平安，所以放心了。",
					"苹果多少与担心台风无关；「安心」是在开箱夸苹果之前就写下的。",
					"苹果好吃是后文的内容，「安心しました」出现在那之前。",
				],
				choiceNotesEn: [
					"The news clearly says the typhoon made landfall in Aomori, so it did come.",
					"Correct. Receiving the apples means the Tanakas are safe, so she was relieved.",
					"How many apples there are has nothing to do with worrying about the typhoon; “relieved” is written before she even opens the box and praises them.",
					"That the apples taste good comes later; “I was relieved” appears before that.",
				],
			},
			{
				label: "問2",
				jp: "（　②　）に{入|はい}る{言葉|ことば}として{最|もっと}も{適当|てきとう}なものはどれか。",
				cn: "填入（　②　）中最恰当的词语是哪一个？",
				en: "Which word is the most appropriate to fill in (　②　)?",
				choices: [
					{ jp: "くださった", cn: "くださった（对方给我，尊敬语）", en: "kudasatta (they gave it to me; honorific)" },
					{ jp: "めしあがった", cn: "めしあがった（吃，尊敬语）", en: "meshiagatta (ate; honorific)" },
					{ jp: "さしあげた", cn: "さしあげた（我给对方，谦让语）", en: "sashiageta (I gave it to them; humble)" },
					{ jp: "いただいた", cn: "いただいた（我吃／我收下，谦让语）", en: "itadaita (I ate / I received; humble)" },
				],
				answer: 4,
				explanation:
					"「さっそく、ひとつ（　）のですが、本当においしくて」——吃苹果的是写信人高桥和子自己。对自己的动作要用谦让语，「食べる」的谦让语正是「いただく」，所以填「いただいた」，4 正确。这一题考的就是本课要点：敬语的方向。",
				explanationEn:
					"In “I immediately (　) one, and it was truly delicious,” the person eating the apple is the writer, Kazuko Takahashi, herself. For her own action she needs humble language, and the humble form of taberu is itadaku, so the blank is itadaita. Choice 4 is correct. This question tests this lesson’s key point: the direction of keigo.",
				choiceNotes: [
					"「くださる」是对方给我，主语必须是田中，接不上「ひとつ〜のですが、おいしくて」。",
					"「めしあがる」是尊敬语，只能用于对方的动作，不能用于自己吃。",
					"「さしあげる」是我给对方，这里不是给东西而是吃。",
					"正确。自己吃 → 谦让语「いただいた」。",
				],
				choiceNotesEn: [
					"Kudasaru means the other person gave something to me, so the subject would have to be Tanaka — it does not fit “I (　) one, and it was delicious.”",
					"Meshiagaru is honorific and can only be used for the other person’s action, not for eating something yourself.",
					"Sashiageru means I give something to the other person; here she is eating, not giving.",
					"Correct. She herself ate it → humble itadaita.",
				],
			},
		],
	},

	vocab: [
		{ jp: "宛先", kana: "あてさき", cn: "收件人、收件地址", en: "addressee / recipient", pos: "名詞" },
		{ jp: "送信者", kana: "そうしんしゃ", cn: "发件人", en: "sender", pos: "名詞" },
		{ jp: "件名", kana: "けんめい", cn: "主题、标题", en: "subject (line)", pos: "名詞" },
		{ jp: "宅配便", kana: "たくはいびん", cn: "快递、宅急送", en: "courier / parcel delivery", pos: "名詞" },
		{ jp: "受け取る", kana: "うけとる", cn: "收到、领取", en: "to receive / to pick up", pos: "動詞" },
		{ jp: "上陸する", kana: "じょうりくする", cn: "登陆", en: "to make landfall", pos: "動詞" },
		{ jp: "台風", kana: "たいふう", cn: "台风", en: "typhoon", pos: "名詞" },
		{ jp: "被害", kana: "ひがい", cn: "灾害、损失", en: "damage / harm", pos: "名詞" },
		{ jp: "安心する", kana: "あんしんする", cn: "放心", en: "to feel relieved", pos: "動詞" },
		{ jp: "さっそく", cn: "立刻、马上", en: "right away / immediately", pos: "副詞" },
		{ jp: "伝わる", kana: "つたわる", cn: "传达过来", en: "to come across / to be conveyed", pos: "動詞" },
		{ jp: "遠足", kana: "えんそく", cn: "远足、郊游", en: "field trip / excursion", pos: "名詞" },
		{ jp: "大喜び", kana: "おおよろこび", cn: "非常高兴", en: "great joy / to be delighted", pos: "名詞" },
		{ jp: "主人", kana: "しゅじん", cn: "（我）丈夫", en: "(my) husband", pos: "名詞" },
		{ jp: "分ける", kana: "わける", cn: "分、分给", en: "to share / to divide", pos: "動詞" },
		{ jp: "召し上がる", kana: "めしあがる", cn: "吃、喝（尊敬语）", en: "to eat / drink (honorific)", pos: "動詞" },
		{ jp: "差し上げる", kana: "さしあげる", cn: "给（谦让语）", en: "to give (humble)", pos: "動詞" },
		{ jp: "まいる", cn: "去、来（谦让语）", en: "to go / come (humble)", pos: "動詞" },
		{ jp: "世話になる", kana: "せわになる", cn: "受到照顾", en: "to be looked after / to be indebted to", pos: "表現" },
	],

	grammar: [
		{
			pattern: "〜てくださる（尊敬語）",
			meaning: "（对方）为我做……。「〜てくれる」的尊敬形式，主语是对方。",
			meaningEn: "(The other person) does … for me. Honorific form of ~te kureru; the subject is the other person.",
			example: { jp: "りんごをたくさん{送|おく}ってくださってありがとうございました。", cn: "谢谢您寄来这么多苹果。", en: "Thank you for sending so many apples." },
		},
		{
			pattern: "〜ていただく（謙譲語）",
			meaning: "请（对方）为我做……／我承蒙……。主语是自己一方。",
			meaningEn: "To have (someone) do … for me / I humbly receive …. The subject is one’s own side.",
			example: { jp: "ひとついただいたのですが", cn: "我吃了一个", en: "I had one (ate one)" },
			note: "本课要点。「いただく」既是「もらう」的谦让语，也是「食べる・飲む」的谦让语。",
			noteEn: "This lesson’s key point. Itadaku is the humble form of both morau (“to receive”) and taberu / nomu (“to eat / drink”).",
		},
		{
			pattern: "〜てさしあげる（謙譲語）",
			meaning: "（我）为（对方）做……。要注意直接对长辈使用会显得失礼。",
			meaningEn: "I do … for (the other person). Using it directly toward a senior can sound rude.",
			example: { jp: "お{隣|となり}にも{差|さ}し{上|あ}げようかしら。", cn: "要不也送一些给隔壁吧。", en: "Perhaps I should give some to the neighbors, too." },
		},
		{
			pattern: "〜ようだ／〜ようでした",
			meaning: "好像……、仿佛……。表示比喻或推测。",
			meaningEn: "It seems / it is as if …. Used for metaphor or conjecture.",
			example: {
				jp: "「{元気|げんき}ですよ」という{声|こえ}が{伝|つた}わってくるようでした。",
				cn: "仿佛能听到「我很好哦」的声音。",
				en: "It was as if her voice saying “I’m fine” came through.",
			},
		},
		{
			pattern: "〜かしら",
			meaning: "……吧、……呢（女性用语，表示疑问或自言自语）。",
			meaningEn: "I wonder … (used mainly by women; a question or thinking aloud).",
			example: { jp: "{田中|たなか}さんの{家|いえ}のほうは{大丈夫|だいじょうぶ}かしら", cn: "田中家那边不知道有没有事呢", en: "I wonder if the Tanakas are all right" },
		},
		{
			pattern: "〜ようなら",
			formation: "動詞辞書形／可能形 ＋ ようなら",
			meaning: "如果（看起来）……的话。比「〜なら」更委婉的条件。",
			meaningEn: "If it seems that … / if you (would like to) …. A softer condition than ~nara.",
			example: { jp: "もっと{召|め}し{上|あ}がれるようならまた{持|も}ってきます。", cn: "如果您还想吃，我再带过来。", en: "If you’d like more, I’ll bring some again." },
		},
		{
			pattern: "〜（よ）うと{思|おも}っています",
			meaning: "打算……。「思う」用「思っています」表示这个打算已经持续了一段时间。",
			meaningEn: "I plan to …. Using omotte imasu shows the intention has already been in mind for a while.",
			example: { jp: "みんなで{楽|たの}しもうと{思|おも}っています。", cn: "打算大家一起享用。", en: "I plan for us all to enjoy them together." },
		},
	],
};
