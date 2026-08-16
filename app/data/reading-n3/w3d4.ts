import type { ReadingDay } from "./types";

// 第3週 4日目 手紙・はがき② — printed pages 50–51
export const w3d4: ReadingDay = {
	week: 3,
	day: 4,
	label: "手紙・はがき②",
	labelKana: "てがみ・はがき",
	labelEn: "Letters / Postcards ②",
	printedPages: [50, 51],
	answerSource: "book",

	point: {
		title: "{特別|とくべつ}な{敬語|けいご}を{覚|おぼ}えよう！ －「{行|い}く」「{来|く}る」「いる」",
		titleCn: "记住特殊的敬语！——「行く」「来る」「いる」",
		titleEn: "Let's learn some special polite language! — 'iku' (to go), 'kuru' (to come), 'iru' (to be)",
		figure: {
			alt: "「……ご家族で、どうぞお越しください。」と書かれた案内を見て、「じゃ、みんなで行こう！」と喜ぶ人々のイラスト",
			cn: "看到写着「……请携家人一同光临」的邀请函，大家高兴地说「那我们一起去吧！」",
			en: "Seeing an invitation that says “Please come with your family,” people happily say, “Then let’s all go!”",
		},
		tips: [
			{
				jp: "{不特定多数|ふとくていたすう}の{社会人|しゃかいじん}に{出|だ}す{手紙|てがみ}やはがきは、ふつう{敬語|けいご}で{書|か}きます。",
				cn: "寄给多数不特定成年人的信件、明信片，通常都用敬语书写。",
				en: "Letters and postcards sent to a large number of unspecified adults are usually written in keigo.",
			},
		],
		expressions: [
			{ jp: "行きます → いらっしゃいます／おいでになります", cn: "【尊敬语】您去", en: "to go (honorific)" },
			{ jp: "行きます → 参ります", kana: "まいります", cn: "【谦让语】我去", en: "to go (humble)" },
			{ jp: "来ます → いらっしゃいます／おいでになります", cn: "【尊敬语】您来", en: "to come (honorific)" },
			{ jp: "来ます → お越しになります／見えます", kana: "おこしになります／みえます", cn: "【尊敬语】您来（另两种说法）", en: "to come (honorific)" },
			{ jp: "来ます → 参ります", kana: "まいります", cn: "【谦让语】我来", en: "to come (humble)" },
			{ jp: "います → いらっしゃいます／おいでになります", cn: "【尊敬语】您在", en: "to be (honorific)" },
			{ jp: "います → おります", cn: "【谦让语】我在", en: "to be (humble)" },
		],
		notes: [
			{
				jp: "「いらっしゃいます」と「おいでになります」は「{行|い}く・{来|く}る・いる」の3つとも{使|つか}えるので、{前後|ぜんご}の{文|ぶん}でどの{意味|いみ}か{判断|はんだん}しよう。",
				cn: "「いらっしゃいます」和「おいでになります」这两个词「去・来・在」三个意思都能表示，具体是哪一个要看上下文判断。",
				en: "Irasshaimasu and oide ni narimasu can all mean “go,” “come,” or “be,” so decide which meaning it is from the surrounding sentences.",
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
				speaker: "{夫|おっと}",
				speakerCn: "丈夫",
				speakerEn: "Husband",
				jp: "{桜|さくら}、あと2{週間|しゅうかん}くらいかかるかな。うちは{庭|にわ}が{狭|せま}くて{木|き}なんて{植|う}えられないけど、{裏|うら}が{立派|りっぱ}な{公園|こうえん}で{本当|ほんとう}によかったね。この{窓|まど}からの{眺|なが}めは{最高|さいこう}だし。",
				cn: "樱花大概还要两周左右吧。我们家院子小，种不了树，不过后面就是这么漂亮的公园，真是太好了。从这扇窗户看出去的景色也是一流的。",
				en: "The cherry blossoms will take about two more weeks, I guess. Our yard is too small to plant trees, but it’s really lucky that there’s such a fine park behind us. The view from this window is the best.",
			},
			{
				type: "speech",
				speaker: "{妻|つま}",
				speakerCn: "妻子",
				speakerEn: "Wife",
				jp: "そうだ。{大学時代|だいがくじだい}の{友|とも}だちに{家|いえ}に{来|き}てもらったらどう？　{転居通知|てんきょつうち}（※1）{出|だ}すときに、{誘|さそ}ったらいいんじゃない？",
				cn: "对了。请大学时代的朋友来家里怎么样？寄搬家通知的时候顺便邀请他们不就好了？",
				en: "I know. Why don’t we have our college friends over? When we send the change-of-address notice, we could invite them, couldn’t we?",
			},
			{
				type: "speech",
				speaker: "{夫|おっと}",
				speakerCn: "丈夫",
				speakerEn: "Husband",
				jp: "そうだね。{家|いえ}は{新築|しんちく}（※2）といっても{大|たい}したことはない（※3）けど、ここから{花見|はなみ}ができるしね。じゃあ、10{人|にん}くらいの{食事|しょくじ}、{頼|たの}むよ。",
				cn: "说得也是。虽说是新房子，也没什么了不起的，但在这里能赏樱花嘛。那么，10 个人左右的餐食就拜托你了。",
				en: "True. The house is new, but it’s nothing special — still, we can view the blossoms from here. All right, I’ll leave a meal for about ten people to you.",
			},
		],
		footnotes: [
			{ marker: "※1", term: "転居通知", jp: "a notification of a change of address", cn: "搬家通知", en: "a notification of a change of address" },
			{ marker: "※2", term: "新築", jp: "a new house", cn: "新建（的房子）", en: "a new house" },
			{ marker: "※3", term: "大したことはない", jp: "nothing special", cn: "没什么了不起", en: "nothing special" },
		],
		choices: [
			{ jp: "この{夫婦|ふうふ}の{庭|にわ}に{桜|さくら}の{木|き}がある。", cn: "这对夫妻的院子里有樱花树。", en: "There is a cherry tree in this couple’s yard." },
			{ jp: "{今|いま}、この{夫婦|ふうふ}は{公園|こうえん}を{散歩|さんぽ}している。", cn: "现在这对夫妻正在公园里散步。", en: "The couple is walking in the park right now." },
			{ jp: "この{夫婦|ふうふ}は、{最近|さいきん}この{家|いえ}に{引|ひ}っ{越|こ}した。", cn: "这对夫妻最近搬到了这个家。", en: "This couple recently moved into this house." },
			{ jp: "この{夫婦|ふうふ}は{引|ひ}っ{越|こ}しを{知|し}らせるはがきを{出|だ}す{予定|よてい}である。", cn: "这对夫妻打算寄明信片通知搬家的事。", en: "This couple plans to send a postcard announcing their move." },
			{ jp: "{桜|さくら}は2{週間前|しゅうかんまえ}に{咲|さ}き{始|はじ}めた。", cn: "樱花两周前开始开了。", en: "The cherry blossoms started blooming two weeks ago." },
		],
		answers: [3, 4],
		hint: {
			jp: "「あと2{週間|しゅうかん}くらいかかる」＝{桜|さくら}はまだ{咲|さ}いていない。「{窓|まど}からの{眺|なが}め」なので{家|いえ}の{中|なか}にいる。",
			cn: "「还要两周左右」说明樱花还没开；说「从这扇窗户看出去」，可见两人在家里而不是在公园；院子里种不了树，樱花是公园的。",
			en: "“It will take about two more weeks” means the blossoms are not out yet. “The view from this window” means they are inside the house, not in the park. They cannot plant trees in the yard, so the cherries are in the park.",
		},
	},

	mondai: {
		instruction: "{次|つぎ}のはがきを{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的明信片，回答后面的问题。（答案在别册 p.4）",
		instructionEn: "Read the postcard below and answer the questions that follow. (Answers are in the separate booklet, p. 4.)",
		blocks: [
			{
				type: "paragraph",
				jp: "{拝啓|はいけい}　このところ、{毎日暖|まいにちあたた}かい{日|ひ}が{続|つづ}いていますが、{皆様|みなさま}、いかがお{過|す}ごしでしょうか。",
				cn: "敬启者　近来每天都是暖和的日子，各位过得怎么样呢？",
				en: "Dear friends, these warm days have continued lately — I hope you are all well.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "さて、このたび、{去年|きょねん}より{建築中|けんちくちゅう}だった{家|いえ}がやっと{完成|かんせい}し、{下記|かき}の{住所|じゅうしょ}へ{引|ひ}っ{越|こ}しました。{平凡|へいぼん}な{家|いえ}ですが、すぐ{裏|うら}が{桜|さくら}で{有名|ゆうめい}な{野川公園|のがわこうえん}で、{窓|まど}からの{眺|なが}めはかなり{気|き}に{入|い}っております。つきましては（※1）、{皆様|みなさま}にもぜひ{見|み}ていただきたく、わが{家|や}で{花見|はなみ}の{会|かい}を{開|ひら}くことにいたしました＊。これを{機会|きかい}に（※2）{東都大学野球部同期生|とうとだいがくやきゅうぶどうきせい}（※3）で{集|あつ}まりませんか。3{月|がつ}30{日|にち}（{日|にち}）のお{昼|ひる}ごろお{待|ま}ちしておりますので、ぜひお{越|こ}しください。",
				cn: "话说，此次去年以来一直在建的房子终于完工，我已搬至下述地址。虽是很普通的房子，但屋后就是以樱花闻名的野川公园，从窗户望出去的景色我相当中意。因此，很想请各位也来看一看，决定在寒舍举办赏花会＊。借此机会，东都大学棒球部的同届同学要不要聚一聚？3 月 30 日（周日）中午前后恭候各位光临，敬请务必前来。",
				en: "Now then, the house that has been under construction since last year is finally finished, and I have moved to the address below. It is an ordinary house, but right behind it is Nogawa Park, famous for its cherry blossoms, and I am quite fond of the view from the window. Therefore I would very much like you all to see it, and I have decided to hold a blossom-viewing party at our house＊. Why don’t we classmates from the Toto University baseball team get together while we have the chance? I will be waiting around midday on Sunday, March 30, so please do come.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "なお、{電車|でんしゃ}でいらっしゃる{場合|ばあい}には{駅|えき}まで{迎|むか}えに{参|まい}ります。お{車|くるま}でおいでになる{場合|ばあい}は{公園|こうえん}の{駐車場|ちゅうしゃじょう}をご{利用|りよう}ください。",
				cn: "另外，如果您乘电车前来，我会到车站迎接。如果开车前来，请利用公园的停车场。",
				en: "Also, if you come by train I will meet you at the station. If you come by car, please use the park parking lot.",
			},
			{ type: "line", jp: "{敬具|けいぐ}", cn: "敬上", en: "Yours sincerely", align: "right" },
			{ type: "line", jp: "〒155-XXXX　{三鷹市|みたかし}○{町|ちょう}3-32-20", cn: "邮编 155-XXXX　三鹰市○町 3-32-20", en: "〒155-XXXX  Mitaka-shi ○-cho 3-32-20" },
			{ type: "line", jp: "TEL&FAX：042-333-XXXX", cn: "电话&传真：042-333-XXXX", en: "TEL & FAX: 042-333-XXXX" },
			{ type: "line", jp: "E-mail：masaotani@XXXX.ne.jp", cn: "电子邮箱：masaotani@XXXX.ne.jp", en: "E-mail: masaotani@XXXX.ne.jp" },
			{ type: "line", jp: "{谷|たに}　{正雄|まさお}", cn: "谷　正雄", en: "Masao Tani", align: "right" },
		],
		footnotes: [
			{ marker: "※1", term: "つきましては", jp: "therefore", cn: "因此、于是", en: "therefore" },
			{ marker: "※2", term: "これを機会に", jp: "take this opportunity", cn: "借此机会", en: "take this opportunity" },
			{
				marker: "※3",
				term: "同期生",
				jp: "those who entered a school / company in the same year",
				cn: "同届同学、同期进公司的人",
				en: "those who entered a school / company in the same year",
			},
		],
		pageNotes: [
			{
				jp: "＊ since we'd love to share this wonderful view of the blossoms with you, we've decided to have a hanami party at our house",
				cn: "＊我非常想让大家也来看一看，所以决定在我家举办赏花会。",
				en: "＊ since we'd love to share this wonderful view of the blossoms with you, we've decided to have a hanami party at our house",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "{谷|たに}さんはなぜこのはがきを{出|だ}したのか。",
				cn: "谷先生为什么寄出这张明信片？",
				en: "Why did Tani send this postcard?",
				choices: [
					{ jp: "{新|あたら}しい{家|いえ}が{気|き}に{入|い}っていることを{知|し}らせたいから。", cn: "因为想告诉大家自己很喜欢新家。", en: "Because he wants to tell everyone he likes the new house." },
					{ jp: "もうすぐ{家|いえ}が{完成|かんせい}するということを{知|し}らせたいから。", cn: "因为想通知大家房子快要完工了。", en: "Because he wants to announce that the house is about to be finished." },
					{ jp: "{野川公園|のがわこうえん}を{一緒|いっしょ}に{散歩|さんぽ}したいから。", cn: "因为想一起在野川公园散步。", en: "Because he wants to walk together in Nogawa Park." },
					{ jp: "{新|あたら}しい{家|いえ}に{招待|しょうたい}したいから。", cn: "因为想邀请大家到新家做客。", en: "Because he wants to invite everyone to the new house." },
				],
				answer: 4,
				explanation:
					"正文（「さて」之后）的落点是「わが家で花見の会を開くことにいたしました」「東都大学野球部同期生で集まりませんか」「ぜひお越しください」——邀请大家来新家参加赏花会。搬家、喜欢景色都是铺垫，最终目的是邀请，所以 4 正确。",
				explanationEn:
					"The main body (after sate) lands on “I have decided to hold a blossom-viewing party at our house,” “Why don’t we classmates get together,” and “please do come” — he is inviting everyone to the new house for hanami. The move and liking the view are only setup. The real purpose is the invitation, so 4 is correct.",
				choiceNotes: [
					"「窓からの眺めはかなり気に入っております」只是说明为什么想请大家来看，不是目的本身。",
					"房子已经「やっと完成し」——完工了，不是「快要完工」。",
					"是在自己家开赏花会，不是去公园散步。",
					"正确。「花見の会を開く」「集まりませんか」「ぜひお越しください」都是邀请。",
				],
				choiceNotesEn: [
					"“I’m quite fond of the view from the window” only explains why he wants them to see it — it is not the purpose itself.",
					"The house has already “finally been finished,” not “is about to be finished.”",
					"The party is at his house, not a walk in the park.",
					"Correct. “Hold a hanami party,” “shall we get together,” and “please do come” are all invitations.",
				],
			},
			{
				label: "問2",
				jp: "「おいでになる」のは、だれか。",
				cn: "「おいでになる（前来）」的人是谁？",
				en: "Who is it that “oide ni naru” (comes)?",
				choices: [
					{ jp: "{谷|たに}さんの{先生|せんせい}", cn: "谷先生的老师", en: "Tani’s teacher" },
					{ jp: "{谷|たに}さんの{上司|じょうし}", cn: "谷先生的上司", en: "Tani’s boss" },
					{ jp: "{谷|たに}さんの{友人|ゆうじん}", cn: "谷先生的朋友", en: "Tani’s friends" },
					{ jp: "{谷|たに}さんの{親|しん}せき", cn: "谷先生的亲戚", en: "Tani’s relatives" },
				],
				answer: 3,
				explanation:
					"这张明信片的收信人在正文里写得很清楚：「東都大学野球部同期生で集まりませんか」——大学棒球部的同届同学，也就是朋友。「おいでになる」是尊敬语「来る」，指的正是这些收信人。所以 3 正确。对同学用敬语，是因为本课要点说的「不特定多数の社会人に出す手紙は敬語で書く」。",
				explanationEn:
					"The addressees are stated clearly in the body: “Why don’t we classmates from the Toto University baseball team get together” — college teammates, i.e. friends. Oide ni naru is the honorific of kuru and refers to those addressees. So 3 is correct. Keigo is used toward classmates because, as this lesson’s point says, letters sent to a large number of unspecified adults are written in polite language.",
				choiceNotes: [
					"文中没有提到老师。",
					"是大学时期的同届同学，不是公司上司。",
					"正确。「東都大学野球部同期生」＝大学时代的朋友。",
					"文中没有提到亲戚。",
				],
				choiceNotesEn: [
					"The text never mentions a teacher.",
					"They are college classmates, not company bosses.",
					"Correct. “Classmates from the Toto University baseball team” = college friends.",
					"The text never mentions relatives.",
				],
			},
		],
	},

	vocab: [
		{ jp: "このところ", cn: "近来、最近", en: "lately / these days", pos: "副詞" },
		{ jp: "このたび", cn: "此次、这回", en: "this time / on this occasion", pos: "名詞" },
		{ jp: "建築中", kana: "けんちくちゅう", cn: "施工中、建造中", en: "under construction", pos: "名詞" },
		{ jp: "完成する", kana: "かんせいする", cn: "完工、完成", en: "to be completed", pos: "動詞" },
		{ jp: "下記", kana: "かき", cn: "下述、下列", en: "the following / below", pos: "名詞" },
		{ jp: "引っ越す", kana: "ひっこす", cn: "搬家", en: "to move (house)", pos: "動詞" },
		{ jp: "平凡", kana: "へいぼん", cn: "平凡、普通", en: "ordinary / unremarkable", pos: "な形" },
		{ jp: "眺め", kana: "ながめ", cn: "景色、眺望", en: "view / scenery", pos: "名詞" },
		{ jp: "つきましては", cn: "因此（书面语）", en: "therefore (written style)", pos: "接続詞" },
		{ jp: "わが家", kana: "わがや", cn: "寒舍、我家", en: "our house / my home", pos: "名詞" },
		{ jp: "花見", kana: "はなみ", cn: "赏樱、赏花", en: "blossom viewing", pos: "名詞" },
		{ jp: "機会", kana: "きかい", cn: "机会", en: "opportunity", pos: "名詞" },
		{ jp: "同期生", kana: "どうきせい", cn: "同届同学", en: "classmate of the same year", pos: "名詞" },
		{ jp: "駐車場", kana: "ちゅうしゃじょう", cn: "停车场", en: "parking lot", pos: "名詞" },
		{ jp: "転居通知", kana: "てんきょつうち", cn: "搬家通知", en: "change-of-address notice", pos: "名詞" },
		{ jp: "新築", kana: "しんちく", cn: "新建（的房子）", en: "newly built house", pos: "名詞" },
		{ jp: "誘う", kana: "さそう", cn: "邀请", en: "to invite", pos: "動詞" },
		{ jp: "招待する", kana: "しょうたいする", cn: "招待、邀请", en: "to invite (as a guest)", pos: "動詞" },
		{ jp: "上司", kana: "じょうし", cn: "上司", en: "one’s boss / superior", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "いらっしゃる／おいでになる（尊敬語）",
			meaning: "「行く・来る・いる」三个动词共通的尊敬语。具体是哪个意思要看上下文。",
			meaningEn: "A shared honorific for iku, kuru, and iru. Which meaning it has depends on the context.",
			example: { jp: "お{車|くるま}でおいでになる{場合|ばあい}", cn: "开车前来的情况", en: "if you come by car" },
			note: "本课要点。这里的「おいでになる」＝「来る」。",
			noteEn: "This lesson’s key point. Here oide ni naru = kuru (“to come”).",
		},
		{
			pattern: "{参|まい}る（謙譲語）",
			meaning: "「行く・来る」的谦让语，用于自己一方。",
			meaningEn: "Humble form of iku / kuru, used for one’s own side.",
			example: { jp: "{駅|えき}まで{迎|むか}えに{参|まい}ります。", cn: "我会到车站迎接。", en: "I will come to meet you at the station." },
		},
		{
			pattern: "お{越|こ}しになる／お{越|こ}しください（尊敬語）",
			meaning: "「来る」的尊敬语。「ぜひお越しください」是邀请函的固定说法。",
			meaningEn: "Honorific of kuru. “Please do come” is a set phrase on invitations.",
			example: { jp: "ぜひお{越|こ}しください。", cn: "敬请务必光临。", en: "Please do come." },
		},
		{
			pattern: "〜ことにいたしました",
			formation: "動詞辞書形 ＋ ことにする（いたす＝する的谦让语）",
			meaning: "（我）决定……。自谦地宣布自己的决定。",
			meaningEn: "I have decided to …. A humble way to announce one’s own decision.",
			example: { jp: "{花見|はなみ}の{会|かい}を{開|ひら}くことにいたしました。", cn: "我决定举办赏花会。", en: "I have decided to hold a blossom-viewing party." },
		},
		{
			pattern: "〜ませんか",
			meaning: "要不要……？表示邀请。",
			meaningEn: "Won’t you …? / Shall we …? Used to invite.",
			example: { jp: "{同期生|どうきせい}で{集|あつ}まりませんか。", cn: "同届同学要不要聚一聚？", en: "Why don’t we classmates get together?" },
		},
		{
			pattern: "〜ていただきたく",
			meaning: "想请您……（书面语，「〜ていただきたいので」的文语形式）。",
			meaningEn: "I would like you to … (written style; a literary form of ~te itadakitai node).",
			example: { jp: "{皆様|みなさま}にもぜひ{見|み}ていただきたく", cn: "很想请各位也来看一看", en: "I would very much like you all to see it" },
		},
		{
			pattern: "なお",
			meaning: "另外、此外。补充说明时使用，第 1 週学过的信号词。",
			meaningEn: "Also / furthermore. Used to add information; a signal word from Week 1.",
			example: { jp: "なお、{電車|でんしゃ}でいらっしゃる{場合|ばあい}には……", cn: "另外，乘电车前来的话……", en: "Also, if you come by train …" },
		},
	],
};
