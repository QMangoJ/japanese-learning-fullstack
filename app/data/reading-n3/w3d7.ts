import type { ReadingDay } from "./types";

// 第3週 7日目 実戦問題 — printed pages 56–58
export const w3d7: ReadingDay = {
	week: 3,
	day: 7,
	label: "実戦問題",
	labelKana: "じっせんもんだい",
	labelEn: "Practice Exercise",
	printedPages: [56, 57, 58],
	answerSource: "book",

	practice: {
		timeLimitMinutes: 15,
		scoring: "1問25点×4問／100点",
		groups: [
			{
				label: "問題1",
				instruction:
					"つぎのE-メールの{文章|ぶんしょう}を{読|よ}んで、{下|した}の{質問|しつもん}に{答|こた}えなさい。{答|こた}えは、1・2・3・4から{最|もっと}もよいものを{一|ひと}つえらびなさい。",
				instructionCn: "阅读下面这封电子邮件，回答下面的问题。答案从 1・2・3・4 中选出最合适的一个。",
				instructionEn:
					"Read the e-mail below and answer the questions. Choose the best answer from 1, 2, 3, or 4.",
				blocks: [
					{ type: "line", jp: "{宛名|あてな}：s_nakamura@XXX.ne.jp", cn: "收件人：s_nakamura@XXX.ne.jp", en: "To: s_nakamura@XXX.ne.jp" },
					{ type: "line", jp: "{差出人|さしだしにん}：k-takeda@takaracity.jp", cn: "发件人：k-takeda@takaracity.jp", en: "From: k-takeda@takaracity.jp" },
					{ type: "line", jp: "{日時|にちじ}：20XX{年|ねん}3{月|がつ}10{日|か}", cn: "日期：20XX 年 3 月 10 日", en: "Date: March 10, 20XX" },
					{ type: "line", jp: "{件名|けんめい}：（　　　　　　）", cn: "主题：（　　　　　　）", en: "Subject: (　　　　　　)" },
					{ type: "line", jp: "{中村|なかむら}　{進|すすむ}　{先生|せんせい}", cn: "中村　进　老师", en: "Mr. Susumu Nakamura" },
					{
						type: "paragraph",
						jp: "ごぶさたしております。たから{市役所市民生活課|しやくしょしみんせいかつか}の{武田|たけだ}です。",
						cn: "好久不见。我是宝市市政府市民生活科的武田。",
						en: "It has been a long time. This is Takeda of the Takara City Hall Civic Life Division.",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "{昨年|さくねん}の{講演|こうえん}の{際|さい}には、{大変|たいへん}お{世話|せわ}になりました。{先生|せんせい}の{講演|こうえん}はとても{評判|ひょうばん}がよく、{次回|じかい}もぜひという{声|こえ}が{多|おお}く{上|あ}がっております。つきましては、{本年|ほんねん}もまたお{願|ねが}いいたしたく、ご{連絡申|れんらくもう}し{上|あ}げました。",
						cn: "去年的演讲承蒙您多方关照。老师的演讲广受好评，很多人都表示希望下次务必再请您来。因此，今年也想再次拜托您，特此与您联系。",
						en: "Thank you very much for the lecture last year. Your talk was very well received, and many people have said they would love to have you again. Therefore I am writing to ask if you would be willing to do so again this year.",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "{場所|ばしょ}は{昨年|さくねん}と{同|おな}じく、たから{市民会館|しみんかいかん}ホール、{日時|にちじ}は5{月|がつ}3{日午後|かごご}3{時|じ}よりを{予定|よてい}しておりますが、{先生|せんせい}のご{都合|つごう}はいかがでしょうか。{今回|こんかい}は「50{歳|さい}からの{生|い}き{方|かた}について」という{内容|ないよう}でお{願|ねが}いしたいと{思|おも}います。",
						cn: "地点与去年相同，为宝市民会馆礼堂，时间预定为 5 月 3 日下午 3 点开始，不知老师是否方便？这次想请您以「50 岁之后的人生」为主题演讲。",
						en: "The venue would be the same as last year, Takara Civic Hall, and we are planning 3:00 p.m. on May 3. Would that be convenient for you? This time we would like to ask you to speak on “How to live from age 50 on.”",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "よろしくご{検討|けんとう}くださいますよう（※）お{願|ねが}い{申|もう}し{上|あ}げます。",
						cn: "恳请您考虑。",
						en: "We would be grateful if you would kindly consider this.",
					},
					{ type: "line", jp: "たから{市役所市民生活課|しやくしょしみんせいかつか}", cn: "宝市市政府市民生活科", en: "Takara City Hall Civic Life Division" },
					{ type: "line", jp: "{武田健一|たけだけんいち}", cn: "武田健一", en: "Kenichi Takeda" },
					{ type: "line", jp: "k-takeda@takaracity.jp", cn: "k-takeda@takaracity.jp", en: "k-takeda@takaracity.jp" },
					{ type: "line", jp: "tel. 012-345-6789", cn: "电话 012-345-6789", en: "tel. 012-345-6789" },
				],
				footnotes: [
					{ marker: "※", term: "ご検討くださいますよう", jp: "考えていただくように", cn: "恳请您考虑（研究一下）", en: "so that you will kindly consider it" },
				],
				questions: [
					{
						label: "1",
						jp: "{件名|けんめい}の（　　）に{入|はい}る{言葉|ことば}として{最|もっと}も{適当|てきとう}なものはどれか。",
						cn: "填入主题栏（　　）中最恰当的词语是哪一个？",
						en: "Which wording is the most appropriate for the subject line?",
						choices: [
							{ jp: "{講演|こうえん}のお{願|ねが}い", cn: "演讲的请求", en: "Request for a lecture" },
							{ jp: "{講演|こうえん}のお{礼|れい}", cn: "演讲的致谢", en: "Thanks for a lecture" },
							{ jp: "{講演|こうえん}スケジュールの{変更|へんこう}", cn: "演讲日程的变更", en: "Change to the lecture schedule" },
							{ jp: "{講演内容|こうえんないよう}の{確認|かくにん}", cn: "演讲内容的确认", en: "Confirmation of the lecture topic" },
						],
						answer: 1,
						explanation:
							"整封邮件的落点是「本年もまたお願いいたしたく、ご連絡申し上げました」「よろしくご検討くださいますようお願い申し上げます」——请中村老师今年再来演讲。所以主题应该是「講演のお願い」，1 正确。邮件的「件名」通常概括全文的目的，做法和找中心句一样。",
						explanationEn:
							"The whole e-mail lands on “I am writing to ask if you would do so again this year” and “we would be grateful if you would kindly consider this” — asking Mr. Nakamura to lecture again this year. So the subject should be “Request for a lecture.” Choice 1 is correct. An e-mail subject usually sums up the purpose of the whole message, just like finding the main sentence.",
						choiceNotes: [
							"正确。全文的目的是邀请（请求）老师演讲。",
							"对去年的致谢只是开头的铺垫，不是这封邮件的目的。",
							"这是新的邀请，还没有确定过日程，谈不上变更。",
							"内容是这次才提出的（「50歳からの生き方について」），是提议而非确认。",
						],
						choiceNotesEn: [
							"Correct. The purpose of the whole message is to request a lecture.",
							"Thanks for last year is only the opening; it is not the purpose of this e-mail.",
							"This is a new invitation; no schedule has been set yet, so it is not a change.",
							"The topic is proposed this time (“How to live from age 50 on”); it is a proposal, not a confirmation.",
						],
					},
					{
						label: "2",
						jp: "この{文章|ぶんしょう}の{内容|ないよう}と{合|あ}っているものはどれか。",
						cn: "下列哪一项与这篇文章的内容相符？",
						en: "Which of the following matches the content of this text?",
						choices: [
							{ jp: "{中村先生|なかむらせんせい}は{武田|たけだ}さんに{会|あ}ったことがない。", cn: "中村老师没有见过武田。", en: "Mr. Nakamura has never met Takeda." },
							{ jp: "{中村先生|なかむらせんせい}は、{前|まえ}にたから{市|し}で{講演|こうえん}をしたことがある。", cn: "中村老师以前在宝市做过演讲。", en: "Mr. Nakamura has given a lecture in Takara City before." },
							{ jp: "{今回|こんかい}の{講演|こうえん}の{内容|ないよう}は、{前回|ぜんかい}と{同|おな}じである。", cn: "这次演讲的内容和上次相同。", en: "The topic of this lecture is the same as last time." },
							{
								jp: "{中村先生|なかむらせんせい}は、ぜひまた、たから{市|し}で{講演|こうえん}をしたいと{思|おも}っている。",
								cn: "中村老师很想再次在宝市演讲。",
								en: "Mr. Nakamura himself very much wants to lecture in Takara City again.",
							},
						],
						answer: 2,
						explanation:
							"邮件里写着「昨年の講演の際には、大変お世話になりました」「場所は昨年と同じく、たから市民会館ホール」——去年老师已经在宝市演讲过一次。所以 2 正确。",
						explanationEn:
							"The e-mail says “Thank you very much for the lecture last year” and “the venue would be the same as last year, Takara Civic Hall” — so he has already lectured in Takara City once. Choice 2 is correct.",
						choiceNotes: [
							"「ごぶさたしております」＝好久不见，说明以前见过面。",
							"正确。「昨年の講演」＋「場所は昨年と同じく」。",
							"「今回は『50歳からの生き方について』という内容でお願いしたい」——是这次新提出的主题。",
							"「次回もぜひという声が多く上がっております」是听众的呼声，不是中村老师本人的意愿。主语弄错了。",
						],
						choiceNotesEn: [
							"Gobusata shite orimasu means “it has been a long time,” so they have met before.",
							"Correct. “Last year’s lecture” + “the same venue as last year.”",
							"“This time we would like you to speak on ‘How to live from age 50 on’” — a newly proposed topic.",
							"“Many people have said they would love to have you again” is the audience’s wish, not Nakamura’s own. The subject is wrong.",
						],
					},
				],
			},
			{
				label: "問題2",
				instruction:
					"つぎの{文書|ぶんしょ}を{読|よ}んで、{質問|しつもん}に{答|こた}えなさい。{答|こた}えは、1・2・3・4から{最|もっと}もよいものを{一|ひと}つえらびなさい。",
				instructionCn: "阅读下面的文件，回答问题。答案从 1・2・3・4 中选出最合适的一个。",
				instructionEn: "Read the document below and answer the questions. Choose the best answer from 1, 2, 3, or 4.",
				blocks: [
					{ type: "line", jp: "20XX{年|ねん}8{月|がつ}3{日|か}", cn: "20XX 年 8 月 3 日", en: "August 3, 20XX", align: "right" },
					{ type: "line", jp: "{高橋|たかはし}　{光一様|こういちさま}", cn: "高桥　光一先生", en: "Mr. Koichi Takahashi" },
					{
						type: "line",
						jp: "{株式会社|かぶしきがいしゃ}ＧＴＳ　カスタマーサービス　{木村|きむら}　{健|けん}",
						cn: "GTS 股份有限公司　客户服务部　木村　健",
						en: "GTS Co., Ltd.  Customer Service  Ken Kimura",
						align: "right",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "{先日|せんじつ}お{買|か}い{上|あ}げいただいた{電子辞書|でんしじしょ}の{画面|がめん}（※1）に{問題|もんだい}がありご{迷惑|めいわく}をおかけいたしまして、{大変申|たいへんもう}し{訳|わけ}ございませんでした。ご{返品|へんぴん}（※2）いただいたものを{調|しら}べましたところ、ライトがうまく{作動|さどう}して（※3）いなかったことで{画面|がめん}が{暗|くら}く{見|み}にくかったということでした。{早速|さっそく}、{修理|しゅうり}いたしまして{別便|べつびん}でお{送|おく}りさせていただきます。{今後|こんご}は{二度|にど}とこのようなことが{起|お}きないよう{製品|せいひん}のチェックを{強化|きょうか}いたします。{本当|ほんとう}に{申|もう}し{訳|わけ}ございませんでした。なお、おわびの{印|しるし}（※4）として{商品割引券|しょうひんわりびきけん}を{同封|どうふう}させて（※5）いただきました。お{使|つか}いいただければ{幸|さいわ}いです。",
						cn: "前几日您购买的电子辞典屏幕出现问题，给您添了麻烦，我们深表歉意。经检查您退回的产品，发现是因为背光灯未能正常工作，导致屏幕昏暗、难以看清。我们已立即修好，并另行寄出。今后我们将加强产品检查，确保不再发生此类情况。实在非常抱歉。另外，作为致歉的一点心意，随信附上商品折扣券。若能为您所用，我们将不胜荣幸。",
						en: "We sincerely apologize for the trouble caused by a problem with the screen of the electronic dictionary you recently purchased. After examining the item you returned, we found that the backlight was not working properly, which made the screen dark and hard to read. We have repaired it promptly and will send it by separate mail. From now on we will strengthen our product checks so that this never happens again. We are truly sorry. As a token of our apology we have enclosed a product discount coupon. We would be grateful if you would use it.",
					},
				],
				footnotes: [
					{ marker: "※1", term: "画面", jp: "（この場合）文字が現れる部分", cn: "屏幕（此处指显示文字的部分）", en: "(here) the part where the text appears / the screen" },
					{ marker: "※2", term: "返品", jp: "買った品物を返すこと", cn: "退货、把买的东西退回", en: "returning a purchased item" },
					{ marker: "※3", term: "作動する", jp: "機械などが動く", cn: "（机器）运转、工作", en: "for a machine to operate" },
					{ marker: "※4", term: "おわびの印", jp: "「すみません」という気持ちを表した品物", cn: "表达歉意的小礼物、一点心意", en: "a small gift that expresses “we’re sorry”" },
					{ marker: "※5", term: "同封する", jp: "手紙の中にいっしょに入れる", cn: "随信附上", en: "to enclose with a letter" },
				],
				questions: [
					{
						label: "3",
						jp: "この{手紙|てがみ}は{何|なに}を{伝|つた}えるために{書|か}かれたか。",
						cn: "这封信是为了传达什么而写的？",
						en: "What was this letter written to convey?",
						choices: [
							{ jp: "おわびの{印|しるし}を{別|べつ}に{送|おく}ることを{知|し}らせるため。", cn: "为了通知另外寄送致歉的礼物。", en: "To say that a token of apology will be sent separately." },
							{ jp: "{製品|せいひん}のチェックをすることを{知|し}らせるため。", cn: "为了通知会进行产品检查。", en: "To say that they will check their products." },
							{ jp: "{電子辞書|でんしじしょ}の{画面|がめん}が{暗|くら}かったことを{伝|つた}えるため。", cn: "为了告知电子辞典屏幕曾经很暗。", en: "To inform the customer that the dictionary screen was dark." },
							{ jp: "{電子辞書|でんしじしょ}を{修理|しゅうり}して{送|おく}ったことを{伝|つた}えるため。", cn: "为了告知已修好电子辞典并寄出。", en: "To say that the electronic dictionary has been repaired and sent." },
						],
						answer: 4,
						explanation:
							"这封信是随修好的商品一起（或先行）寄给顾客的，核心信息是「早速、修理いたしまして別便でお送りさせていただきます」——已经修好并另行寄出。道歉、说明原因、附赠折扣券都是围绕这件事展开的，所以 4 正确。",
						explanationEn:
							"This letter is sent to the customer with (or just ahead of) the repaired product. The core message is “We have repaired it promptly and will send it by separate mail.” The apology, the explanation, and the coupon all revolve around that, so 4 is correct.",
						choiceNotes: [
							"折扣券是「同封させていただきました」——随这封信一起附上，不是另外寄。「別便で」寄的是修好的辞典。",
							"加强检查是今后的对策，属于道歉的一部分，不是写信的主要目的。",
							"屏幕暗是顾客本来就知道的事（是他退货的原因），不需要专门写信告知。",
							"正确。「修理いたしまして別便でお送りさせていただきます」是这封信的核心。",
						],
						choiceNotesEn: [
							"The coupon is “enclosed with this letter,” not sent separately. What is sent by separate mail is the repaired dictionary.",
							"Stronger checks are a future measure and part of the apology, not the main reason for writing.",
							"The customer already knew the screen was dark (that is why he returned it); there is no need to write just to say that.",
							"Correct. “We have repaired it and will send it by separate mail” is the core of the letter.",
						],
					},
					{
						label: "4",
						jp: "この{手紙|てがみ}を{読|よ}んでわかることはどれか。",
						cn: "读了这封信可以得知的是哪一项？",
						en: "Which of the following can we tell from this letter?",
						choices: [
							{
								jp: "{高橋|たかはし}さんは{株式会社|かぶしきがいしゃ}ＧＴＳの{電子辞書|でんしじしょ}を{買|か}ったことを{後悔|こうかい}している。",
								cn: "高桥后悔买了 GTS 公司的电子辞典。",
								en: "Takahashi regrets buying GTS’s electronic dictionary.",
							},
							{ jp: "{高橋|たかはし}さんの{電子辞書|でんしじしょ}は、ライトに{問題|もんだい}があった。", cn: "高桥的电子辞典是背光灯有问题。", en: "Takahashi’s electronic dictionary had a problem with the light." },
							{
								jp: "{電子辞書|でんしじしょ}は、{画面|がめん}が{暗|くら}くて{見|み}にくいという{問題|もんだい}がよく{起|お}きる。",
								cn: "电子辞典经常发生屏幕暗、难以看清的问题。",
								en: "This electronic dictionary often has the problem of a dark, hard-to-read screen.",
							},
							{
								jp: "{株式会社|かぶしきがいしゃ}ＧＴＳは{製品|せいひん}チェックをしないで{電子辞書|でんしじしょ}を{売|う}っていた。",
								cn: "GTS 公司没做产品检查就卖电子辞典。",
								en: "GTS was selling electronic dictionaries without checking the products.",
							},
						],
						answer: 2,
						explanation:
							"信中写着「ご返品いただいたものを調べましたところ、ライトがうまく作動していなかったことで画面が暗く見にくかった」——检查结果表明原因是背光灯没有正常工作。所以 2 正确。",
						explanationEn:
							"The letter says “after examining the item you returned, we found that the backlight was not working properly, which made the screen dark and hard to read.” The inspection result is that the light was the problem. Choice 2 is correct.",
						choiceNotes: [
							"信里完全没有写顾客的心情，属于凭空推测。",
							"正确。「ライトがうまく作動していなかった」。",
							"「二度とこのようなことが起きないよう」说明这是应当避免的个别事故，并不是「经常发生」。",
							"原文是「今後は…製品のチェックを強化いたします」——「強化（加强）」的前提是本来就有检查，只是不够充分。",
						],
						choiceNotesEn: [
							"The letter never mentions the customer’s feelings; that is pure speculation.",
							"Correct. “The light was not working properly.”",
							"“So that this never happens again” means this was a one-off accident that should be avoided, not something that “often happens.”",
							"The original says “from now on we will strengthen our product checks” — “strengthen” assumes there already were checks, just not enough.",
						],
					},
				],
			},
		],
	},

	vocab: [
		{ jp: "ごぶさたしております", cn: "好久不见（郑重说法）", en: "it has been a long time (formal)", pos: "表現" },
		{ jp: "講演", kana: "こうえん", cn: "演讲", en: "a lecture / talk", pos: "名詞・動詞" },
		{ jp: "際", kana: "さい", cn: "……的时候（书面语）", en: "at the time of (written style)", pos: "名詞" },
		{ jp: "評判", kana: "ひょうばん", cn: "评价、口碑", en: "reputation / reviews", pos: "名詞" },
		{ jp: "声が上がる", kana: "こえがあがる", cn: "有呼声、有人提出意见", en: "voices are raised / people request", pos: "表現" },
		{ jp: "本年", kana: "ほんねん", cn: "今年（书面语）", en: "this year (written style)", pos: "名詞" },
		{ jp: "検討する", kana: "けんとうする", cn: "研究、考虑", en: "to consider", pos: "動詞" },
		{ jp: "市役所", kana: "しやくしょ", cn: "市政府", en: "city hall", pos: "名詞" },
		{ jp: "電子辞書", kana: "でんしじしょ", cn: "电子辞典", en: "electronic dictionary", pos: "名詞" },
		{ jp: "画面", kana: "がめん", cn: "屏幕、画面", en: "screen", pos: "名詞" },
		{ jp: "迷惑をかける", kana: "めいわくをかける", cn: "添麻烦", en: "to cause trouble", pos: "表現" },
		{ jp: "作動する", kana: "さどうする", cn: "（机器）运转", en: "to operate (of a machine)", pos: "動詞" },
		{ jp: "早速", kana: "さっそく", cn: "立即、马上", en: "promptly / right away", pos: "副詞" },
		{ jp: "別便", kana: "べつびん", cn: "另行寄送", en: "separate mail", pos: "名詞" },
		{ jp: "二度と〜ない", kana: "にどと", cn: "再也不……", en: "never again", pos: "副詞" },
		{ jp: "強化する", kana: "きょうかする", cn: "加强", en: "to strengthen", pos: "動詞" },
		{ jp: "おわびの印", kana: "おわびのしるし", cn: "致歉的心意", en: "a token of apology", pos: "名詞" },
		{ jp: "割引券", kana: "わりびきけん", cn: "折扣券", en: "discount coupon", pos: "名詞" },
		{ jp: "同封する", kana: "どうふうする", cn: "随信附上", en: "to enclose", pos: "動詞" },
		{ jp: "幸いです", kana: "さいわいです", cn: "就太好了、不胜荣幸", en: "we would be grateful / it would be a pleasure", pos: "表現" },
		{ jp: "後悔する", kana: "こうかいする", cn: "后悔", en: "to regret", pos: "動詞" },
	],

	grammar: [
		{
			pattern: "〜（さ）せていただきました",
			meaning: "「〜しました」的谦让说法，非常郑重。商务文书中大量使用。",
			meaningEn: "A humble form of ~shimashita, very formal. Used constantly in business writing.",
			example: { jp: "{商品割引券|しょうひんわりびきけん}を{同封|どうふう}させていただきました。", cn: "随信附上了商品折扣券。", en: "We have enclosed a product discount coupon." },
			note: "别册特别指出的要点：「〜させていただきました」＝「〜しました」的谦让语。",
			noteEn: "A point the answer booklet highlights: ~sasete itadakimashita = humble ~shimashita.",
		},
		{
			pattern: "〜たところ",
			formation: "動詞た形 ＋ ところ",
			meaning: "……的结果（发现）。书面语，用于陈述调查、尝试之后得到的事实。",
			meaningEn: "When (I) did … (I found that). Written style for a fact learned after checking or trying.",
			example: {
				jp: "ご{返品|へんぴん}いただいたものを{調|しら}べましたところ、……",
				cn: "检查您退回的产品之后（发现）……",
				en: "After examining the item you returned, (we found that) …",
			},
		},
		{
			pattern: "〜{際|さい}には",
			formation: "名詞＋の／動詞辞書形・た形 ＋ 際には",
			meaning: "在……的时候。「とき」的书面郑重说法。",
			meaningEn: "At the time of …. A formal written equivalent of toki.",
			example: { jp: "{昨年|さくねん}の{講演|こうえん}の{際|さい}には", cn: "去年演讲的时候", en: "at the time of last year’s lecture" },
		},
		{
			pattern: "つきましては",
			meaning: "因此、于是。承接前文、引出请求的商务用语。",
			meaningEn: "Therefore. Business language that picks up what came before and leads into a request.",
			example: { jp: "つきましては、{本年|ほんねん}もまたお{願|ねが}いいたしたく", cn: "因此，今年也想再次拜托您", en: "therefore I would like to ask you again this year" },
		},
		{
			pattern: "〜ないよう（に）",
			meaning: "为了不……。书面语中常省略「に」。",
			meaningEn: "So that … does not happen. In written style ni is often dropped.",
			example: {
				jp: "{二度|にど}とこのようなことが{起|お}きないよう{製品|せいひん}のチェックを{強化|きょうか}いたします。",
				cn: "为了不再发生此类情况，我们将加强产品检查。",
				en: "We will strengthen our product checks so that this never happens again.",
			},
		},
		{
			pattern: "〜ば{幸|さいわ}いです",
			meaning: "如果……就太好了。表达希望的最委婉说法。",
			meaningEn: "We would be grateful if …. The most indirect way to express a wish.",
			example: { jp: "お{使|つか}いいただければ{幸|さいわ}いです。", cn: "若能为您所用，不胜荣幸。", en: "We would be grateful if you would use it." },
		},
		{
			pattern: "〜いたしたく",
			meaning: "想要……（书面语，「いたしたいので」的文语形式）。",
			meaningEn: "I would like to … (written style; a literary form of itashitai node).",
			example: { jp: "またお{願|ねが}いいたしたく、ご{連絡申|れんらくもう}し{上|あ}げました。", cn: "想再次拜托您，特此联系。", en: "I am writing because I would like to ask you again." },
		},
	],
};
