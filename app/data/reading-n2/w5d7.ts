import type { ReadingDay } from "../reading-n3/types";

// 第5週 7日目 実戦問題 — printed pages 90–93
export const w5d7: ReadingDay = {
	week: 5,
	day: 7,
	label: "実戦問題",
	labelKana: "じっせんもんだい",
	labelEn: "Practice Exercise",
	printedPages: [90, 91, 92, 93],
	answerSource: "book",

	practice: {
		timeLimitMinutes: 20,
		scoring: "問題1〜2：1問15点×4問／問題3：1問20点×2問／100点",
		groups: [
			{
				label: "問題1",
				instruction:
					"{次|つぎ}の{記事|きじ}はある{写真展|しゃしんてん}の{紹介記事|しょうかいきじ}である。{読|よ}んで、{後|あと}の{問|と}いに{対|たい}する{答|こた}えとして{最|もっと}もよいものを1・2・3・4から{一|ひと}つ{選|えら}びなさい。",
				instructionCn:
					"下面这篇报道是某摄影展的介绍。阅读后，从 1・2・3・4 中选出对后面问题最合适的一个答案。",
				instructionEn:
					"The following article introduces a photography exhibition. Read it and choose the best answer to each question from 1, 2, 3, or 4.",
				blocks: [
					{
						type: "paragraph",
						jp: "{現在|げんざい}、{古川市美術館|ふるかわしびじゅつかん}で{震災|しんさい}（{注|ちゅう}1）{後|ご}10{年|ねん}を{記念|きねん}した{写真展|しゃしんてん}が{開|ひら}かれている。カメラマン（{注|ちゅう}2）はプロではなく、{一般|いっぱん}の{人|ひと}たち。{地震直後|じしんちょくご}の{町|まち}のようすを{撮|と}った{写真|しゃしん}{約|やく}100{点|てん}が{展示|てんじ}されている（{注|ちゅう}3）。「この{家|いえ}は、{亡|な}くなった{主人|しゅじん}が{好|す}きだった{家|いえ}なんです。{壊|こわ}れたままの{形|かたち}でもいいから、とにかく{写真|しゃしん}に{撮|と}って{残|のこ}しておきたいと{思|おも}って。そしたら、お{隣|となり}の{家|いえ}も、その{隣|となり}の{家|いえ}も{残|のこ}したいと{思|おも}って、この{辺|あた}りを{夢中|むちゅう}で{撮|と}りました。」と{話|はな}すのは、60{代|だい}の{主婦|しゅふ}の{安川|やすかわ}さん。{復興|ふっこう}（{注|ちゅう}4）が{進|すす}み、{新|あたら}しい{町並|まちな}み（{注|ちゅう}5）が{広|ひろ}がる{古川|ふるかわ}。10{年前|ねんまえ}、{確|たし}かにここで{起|お}こった{出来事|できごと}が{昨日|きのう}のことのように{思|おも}い{出|だ}される。{今月|こんげつ}{末|まつ}まで{開催|かいさい}されている（{注|ちゅう}6）。",
						cn: "目前，古川市美术馆正在举办纪念震灾十年的摄影展。摄影师不是专业人士，而是普通人。展出约 100 张拍摄地震刚过之后城镇样子的照片。「这栋房子是过世的丈夫喜欢的家。就算保持倒塌的样子也没关系，只想先拍下来留下。结果隔壁的家、再隔壁的家也想留下，就把这一带拼命拍下来了。」说话的是 60 多岁的主妇安川。古川重建推进，新的街景铺展开来。十年前确实在这里发生的事情，宛如昨日。展览举办至本月底。",
						en: "A photography exhibition marking ten years after the disaster is now on at the Furukawa City Art Museum. The photographers are not professionals but ordinary people. About 100 photographs of the town just after the earthquake are on display. “This house is the one my late husband loved. Even in its ruined shape I just wanted to photograph it and keep it. Then I wanted to keep the neighbor’s house, and the next one, and I shot this whole area in a frenzy,” says Mrs. Yasukawa, a homemaker in her sixties. Reconstruction has moved on, and a new townscape is spreading in Furukawa. The event that certainly happened here ten years ago comes back as if it were yesterday. The show runs through the end of this month.",
						indent: true,
					},
				],
				footnotes: [
					{ marker: "（注1）", term: "震災", jp: "地震によって起こる災害", cn: "因地震引起的灾害", en: "a disaster caused by an earthquake" },
					{ marker: "（注2）", term: "カメラマン", jp: "写真を撮る人", cn: "拍照的人（和制英语）", en: "a person who takes photographs (wasei-eigo)" },
					{ marker: "（注3）", term: "展示する", jp: "並べて多くの人に見せる", cn: "陈列出来给许多人看", en: "to put on display for many people" },
					{ marker: "（注4）", term: "復興", jp: "再び盛んになること", cn: "重新兴盛、重建", en: "recovery; becoming prosperous again" },
					{ marker: "（注5）", term: "町並み", jp: "町でいろいろな建物が並んでいるようす", cn: "街上各种建筑排列的样子", en: "a row of buildings; the look of a street" },
					{ marker: "（注6）", term: "開催する", jp: "行う、開く", cn: "举办、召开", en: "to hold (an event)" },
				],
				questions: [
					{
						label: "1",
						jp: "ここで{起|お}こった{出来事|できごと}とは、どんな{出来事|できごと}か。",
						cn: "「在这里发生的事情」是什么样的事情？",
						en: "What is the “event that happened here”?",
						choices: [
							{ jp: "{地震|じしん}があったこと", cn: "发生了地震", en: "that there was an earthquake" },
							{ jp: "{安川|やすかわ}さんの{家|いえ}が{地震|じしん}で{壊|こわ}れたこと", cn: "安川的家被地震震塌了", en: "that Mrs. Yasukawa’s house was destroyed in the earthquake" },
							{ jp: "{安川|やすかわ}さんの{夫|おっと}が{亡|な}くなったこと", cn: "安川的丈夫去世了", en: "that Mrs. Yasukawa’s husband died" },
							{ jp: "{写真展|しゃしんてん}を{開|ひら}いたこと", cn: "举办了摄影展", en: "that a photography exhibition was opened" },
						],
						answer: 1,
						explanation:
							"画线句「10年前、確かにここで起こった出来事」承接开头「震災後10年を記念した写真展」和「地震直後の町のようす」。別册也引用第 6 行「復興が進み、新しい町並みが広がる古川。」——对照的是十年前的地震与如今的重建。所以「出来事」＝地震。选 1。2 安川拍的是亡夫喜欢的那栋房子，未必是她家，也没说一定震塌到不能住。3 亡夫是背景，不是「ここで起こった出来事」。4 摄影展是现在正在开的，不是十年前的事。",
						explanationEn:
							"The underlined “event that certainly happened here ten years ago” follows “an exhibition marking ten years after the disaster” and “the town just after the earthquake.” The booklet also quotes line 6, “reconstruction has moved on, and a new townscape is spreading in Furukawa”—set against the quake of ten years ago. So the 出来事 is the earthquake. Choose 1. 2: she photographed the house her late husband loved; it is not clearly hers, nor said to have been wrecked beyond use. 3: the husband’s death is background, not “what happened here.” 4: the exhibition is on now, not ten years ago.",
						choiceNotes: [
							"正确。十年前在这里发生的是地震／震灾。",
							"拍的是亡夫喜欢的房子，不能断定就是她家被毁。",
							"丈夫去世不是「ここで起こった出来事」的所指。",
							"摄影展是现在的活动，不是十年前的出来事。",
						],
						choiceNotesEn: [
							"Correct. What happened here ten years ago is the earthquake / disaster.",
							"She photographed the house her late husband loved; we cannot say it was her own house destroyed.",
							"The husband’s death is not the 出来事 referred to.",
							"The exhibition is happening now, not ten years ago.",
						],
					},
					{
						label: "2",
						jp: "この{文章|ぶんしょう}の{内容|ないよう}と{合|あ}っているものはどれか。",
						cn: "与这篇文章内容相符的是哪一项？",
						en: "Which of the following matches the content of this passage?",
						choices: [
							{ jp: "{安川|やすかわ}さんは、{地震|じしん}が{起|お}きているときに{写真|しゃしん}を{撮|と}った。", cn: "安川是在地震正在发生的时候拍照的。", en: "Mrs. Yasukawa took photographs while the earthquake was happening." },
							{ jp: "{安川|やすかわ}さんは、{地震|じしん}から10{年|ねん}たった{町|まち}の{写真|しゃしん}を{撮|と}った。", cn: "安川拍的是地震过去十年后的城镇照片。", en: "Mrs. Yasukawa took photographs of the town ten years after the earthquake." },
							{ jp: "{安川|やすかわ}さんは、{地震|じしん}の{直後|ちょくご}の{町|まち}を{写真|しゃしん}に{撮|と}った。", cn: "安川把地震刚过之后的城镇拍成了照片。", en: "Mrs. Yasukawa photographed the town immediately after the earthquake." },
							{ jp: "{安川|やすかわ}さんは、{地震|じしん}のあとプロのカメラマンになった。", cn: "安川在地震之后成了专业摄影师。", en: "Mrs. Yasukawa became a professional photographer after the earthquake." },
						],
						answer: 3,
						explanation:
							"展出的是「地震直後の町のようすを撮った写真」。安川说当时「壊れたままの形でもいいから撮って残しておきたい」「この辺りを夢中で撮りました」——是余震刚过、房屋还塌着的时候，不是地震正在摇的时候，也不是十年后的新街景。选 3。4 明确写「カメラマンはプロではなく、一般の人たち」，安川是 60 代主妇。",
						explanationEn:
							"The show is “photographs of the town just after the earthquake.” Yasukawa wanted to keep the houses “even in their ruined shape” and “shot this whole area in a frenzy”—right after the quake, with buildings still down, not during the shaking and not the new townscape ten years later. Choose 3. 4 is ruled out by “the photographers are not professionals but ordinary people”; she is a homemaker in her sixties.",
						choiceNotes: [
							"「直後」不是「正在发生的时候」。",
							"十年后的新街景是现在的古川；她拍的是当时塌着的房子。",
							"正确。地震直後の町を撮った。",
							"摄影师是普通人，不是专业。",
						],
						choiceNotesEn: [
							"“Immediately after” is not “while it was happening.”",
							"The townscape ten years on is Furukawa now; she shot the ruined houses then.",
							"Correct. She photographed the town right after the quake.",
							"The photographers are ordinary people, not pros.",
						],
					},
				],
			},
			{
				label: "問題2",
				instruction:
					"{次|つぎ}の{新聞記事|しんぶんきじ}を{読|よ}んで、{後|あと}の{問|と}いに{対|たい}する{答|こた}えとして{最|もっと}もよいものを1・2・3・4から{一|ひと}つ{選|えら}びなさい。",
				instructionCn:
					"阅读下面的新闻报道，从 1・2・3・4 中选出对后面问题最合适的一个答案。",
				instructionEn:
					"Read the newspaper article below and choose the best answer to each question from 1, 2, 3, or 4.",
				blocks: [
					{
						type: "title",
						jp: "{京都|きょうと}、{人身事故|じんしんじこ}（{注|ちゅう}1）で13{万|まん}{人|にん}{影響|えいきょう}　JR{東海道線|とうかいどうせん}",
						cn: "京都，人身事故影响 13 万人　JR 东海道线",
						en: "Kyoto: person-on-track accident affects 130,000 — JR Tokaido Line",
						sub: { jp: "― {裁判員|さいばんいん}も{遅刻|ちこく} ―", cn: "― 裁判员也迟到 ―", en: "— lay judges late as well —" },
					},
					{
						type: "paragraph",
						jp: "8{日午前|にちごぜん}7{時|じ}5{分|ふん}ごろ、{京都府|きょうとふ}○○{町|ちょう}のJR{東海道線|とうかいどうせん}◎{駅付近|えきふきん}の{踏切|ふみきり}で、{女性|じょせい}が{下|くだ}り{貨物列車|かもつれっしゃ}にはねられ（{注|ちゅう}2）{死亡|しぼう}した。JR{西日本|にしにほん}によると、{上|のぼ}り{線|せん}85{本|ほん}が{運休|うんきゅう}、103{本|ほん}が{遅|おく}れ、13{万|まん}{人|にん}に{影響|えいきょう}が{出|で}た。{神戸地裁|こうべちさい}で{開|ひら}かれた{大麻|たいま}{取|と}り{扱|あつか}い{法違反|ほういはん}などの{罪|つみ}に{問|と}われた{被告|ひこく}（{注|ちゅう}3）の{裁判|さいばん}に、{裁判員|さいばんいん}が{遅刻|ちこく}。25{分|ふん}{遅|おく}れて{開廷|かいてい}（{注|ちゅう}4）した。△{署|しょ}によると、{死亡|しぼう}したのは70{代|だい}ぐらいの{女性|じょせい}で、{身元確認|みもとかくにん}を{進|すす}めている。{目撃者|もくげきしゃ}（{注|ちゅう}5）の{話|はなし}では、{女性|じょせい}が{自|みずか}ら{遮断機|しゃだんき}（{注|ちゅう}6）を{持|も}ち{上|あ}げて{線路内|せんろない}に{入|はい}った。",
						cn: "8 日上午 7 点 5 分左右，在京都府 ○○ 町 JR 东海道线 ◎ 站附近的道口，一名女性被下行货车撞上死亡。据 JR 西日本称，上行线 85 趟停运、103 趟晚点，影响 13 万人。神户地方法院审理涉嫌违反大麻取缔法等罪的被告时，裁判员迟到，开庭推迟 25 分钟。据 △ 署称，死者是大约 70 多岁的女性，身份确认仍在进行。目击者说，该女性自己抬起道口栏杆走进了线路内。",
						en: "Around 7:05 a.m. on the 8th, at a crossing near ◎ Station on the JR Tokaido Line in ○○-chō, Kyoto Prefecture, a woman was struck by a down freight train and killed. According to JR West, 85 inbound trains were cancelled and 103 delayed, affecting 130,000 people. At a Kobe District Court trial of a defendant charged with violating marijuana-control law and other offenses, lay judges were late, and the court opened 25 minutes behind. △ Police say the dead woman appears to be in her seventies and identification is still under way. A witness said she herself lifted the crossing barrier and walked onto the tracks.",
						indent: true,
					},
				],
				footnotes: [
					{ marker: "（注1）", term: "人身事故", jp: "人がけがをしたり死んだりする事故", cn: "造成人员伤亡的事故", en: "an accident in which someone is injured or killed" },
					{ marker: "（注2）", term: "はねられる", jp: "ひかれる", cn: "被撞上", en: "to be hit (by a vehicle)" },
					{ marker: "（注3）", term: "被告", jp: "悪いことをして裁判にかけられる人", cn: "因做了坏事而受审的人", en: "a defendant (someone on trial for a wrong)" },
					{ marker: "（注4）", term: "開廷", jp: "裁判が始まること", cn: "开庭（审判开始）", en: "the court coming into session" },
					{ marker: "（注5）", term: "目撃者", jp: "事件や事故を見た人", cn: "看见事件或事故的人", en: "an eyewitness" },
					{ marker: "（注6）", term: "遮断機", jp: "電車が通る間、踏切に人や車が入らないようにするための棒", cn: "列车通过时拦住道口、不让人或车进入的杆", en: "a crossing barrier (the bar that keeps people and cars off the tracks while a train passes)" },
				],
				questions: [
					{
						label: "3",
						jp: "この{記事|きじ}からはっきりわかることはどれか。",
						cn: "从这篇报道可以清楚知道的是哪一项？",
						en: "Which of the following is clearly known from this article?",
						choices: [
							{ jp: "{事故|じこ}で{死亡|しぼう}した{人|ひと}は{自殺|じさつ}だった。", cn: "事故中死亡的人是自杀。", en: "The person who died in the accident committed suicide." },
							{ jp: "{人|ひと}をはねた{電車|でんしゃ}の{乗客|じょうきゃく}にけがはなかった。", cn: "撞人的那趟电车的乘客没有受伤。", en: "None of the passengers on the train that hit the person were injured." },
							{ jp: "{事故|じこ}による{開廷|かいてい}の{遅|おく}れは{裁判|さいばん}に{影響|えいきょう}した。", cn: "因事故造成的开庭推迟对审判产生了影响。", en: "The delay in opening court because of the accident affected the trial." },
							{ jp: "{死亡|しぼう}した{人|ひと}の{身元|みもと}はまだわかっていない。", cn: "死者的身份还不清楚。", en: "The identity of the person who died is not yet known." },
						],
						answer: 4,
						explanation:
							"「身元確認を進めている」＝现在还没确认完，身份还不清楚。这是正文写明的事实。选 4。1 目击者说她自己抬杆走进线路，那只是「話では」，不能「はっきり」断定自杀。2 乘客有没有受伤完全没写。3 开庭晚了 25 分钟，但没写对审判内容产生了什么影响。问「はっきりわかる」就要排除推测和没写的细节。",
						explanationEn:
							"“Identification is still under way” means it is not finished—her identity is not yet known. That is a stated fact. Choose 4. 1: a witness said she lifted the barrier herself; that is only “according to a witness,” not a clear finding of suicide. 2: passenger injuries are never mentioned. 3: the court opened 25 minutes late, but nothing says the trial itself was affected. For “clearly known,” drop guesses and unstated details.",
						choiceNotes: [
							"只是目击者的说法，不能清楚断定是自杀。",
							"乘客受伤与否原文没有。",
							"只写了开庭晚 25 分钟，没写对审判的影响。",
							"正确。身份确认仍在进行＝尚未判明。",
						],
						choiceNotesEn: [
							"Only a witness’s account; suicide is not clearly established.",
							"Passenger injuries are not mentioned.",
							"The court was 25 minutes late; no effect on the trial is stated.",
							"Correct. Identification still in progress = not yet known.",
						],
					},
					{
						label: "4",
						jp: "この{記事|きじ}からわからないことはどれか。",
						cn: "从这篇报道无法知道的是哪一项？",
						en: "Which of the following cannot be known from this article?",
						choices: [
							{ jp: "{裁判|さいばん}の{終|お}わった{時刻|じこく}", cn: "审判结束的时刻", en: "the time the trial ended" },
							{ jp: "{事故|じこ}の{起|お}こった{時刻|じこく}", cn: "事故发生的时刻", en: "the time the accident happened" },
							{ jp: "{運休|うんきゅう}した{電車|でんしゃ}の{本数|ほんすう}", cn: "停运电车的趟数", en: "the number of cancelled trains" },
							{ jp: "{亡|な}くなった{人|ひと}の{性別|せいべつ}", cn: "死者的性别", en: "the sex of the person who died" },
						],
						answer: 1,
						explanation:
							"事故时刻：8 日上午 7 时 5 分左右。停运本数：上行 85 本。性别：女性。开庭晚了 25 分钟，但结束时刻完全没写。选 1。",
						explanationEn:
							"Time of the accident: around 7:05 a.m. on the 8th. Cancelled trains: 85 inbound. Sex: female. The court opened 25 minutes late, but the time it ended is never given. Choose 1.",
						choiceNotes: [
							"正确（这是不知道的那一项）。只写了开庭推迟，没有结束时刻。",
							"开头就有「8日午前7時5分ごろ」。",
							"「上り線85本が運休」。",
							"多次写「女性」。",
						],
						choiceNotesEn: [
							"Correct as the unknown item. Opening was delayed; the end time is not given.",
							"The lead has “around 7:05 a.m. on the 8th.”",
							"“85 inbound trains were cancelled.”",
							"She is repeatedly called 女性.",
						],
					},
				],
			},
			{
				label: "問題3",
				instruction:
					"{次|つぎ}のAとBは、それぞれ「おさかなポスト」についてかかれた{記事|きじ}である。AとBの{両方|りょうほう}を{読|よ}んで、{後|あと}の{問|と}いに{対|たい}する{答|こた}えとして、{最|もっと}もよいものを1・2・3・4から{一|ひと}つ{選|えら}びなさい。",
				instructionCn:
					"下面的 A 和 B 分别是关于「鱼类邮筒」的报道。阅读 A 和 B 两边，从 1・2・3・4 中选出对后面问题最合适的一个答案。",
				instructionEn:
					"A and B below are each an article about “fish postboxes.” Read both A and B and choose the best answer to each question from 1, 2, 3, or 4.",
				blocks: [
					{ type: "heading", jp: "A", cn: "A", en: "A" },
					{
						type: "title",
						jp: "{川崎|かわさき}「おさかなポスト」に{捨|す}て{魚|うお}、{年|ねん}1{万匹|まんびき}",
						cn: "川崎「鱼类邮筒」弃鱼，一年一万条",
						en: "Kawasaki “fish post”: 10,000 fish dumped a year",
					},
					{
						type: "paragraph",
						jp: "{自宅|じたく}で{飼|か}えなくなった{魚|さかな}を{引|ひ}き{取|と}る{川崎市多摩区|かわさきしたまく}の「おさかなポスト」に、{年間|ねんかん}{約|やく}1{万匹|まんびき}ものペットが{捨|す}てられている。{外来魚|がいらいぎょ}（{注|ちゅう}1）が{川|かわ}に{捨|す}てられるのを{防|ふせ}ぐポスト{本来|ほんらい}の{目的|もくてき}は{実現|じつげん}しつつあるが、「{最後|さいご}まで{面倒|めんどう}を{見|み}るのが{飼|か}い{主|ぬし}の{責任|せきにん}なのに」と{管理者|かんりしゃ}は{残念|ざんねん}がっている。",
						cn: "川崎市多摩区回收家里养不了的鱼的「鱼类邮筒」，一年被丢进约一万条宠物鱼。防止外来鱼被扔进河里这一邮筒本来的目的正在逐步实现，但管理者遗憾地说：「负责到底本该是饲主的责任。」",
						en: "At the “fish post” in Tama Ward, Kawasaki, which takes in fish people can no longer keep at home, some 10,000 pets a year are being dumped. The box’s original purpose—stopping foreign fish being thrown into the river—is being achieved, but the manager is sorry: “Seeing it through to the end is the owner’s responsibility.”",
						indent: true,
					},
					{
						type: "paragraph",
						jp: "ポストは{縦|たて}{約|やく}60センチ、{横|よこ}{約|やく}120センチ、{深|ふか}さ{約|やく}100センチの{網|あみ}のかごで、{捨|す}てられた{魚|さかな}は{近|ちか}くの{小中学校|しょうちゅうがっこう}や{老人|ろうじん}ホームなどに{贈|おく}られる。",
						cn: "邮筒是约高 60 厘米、宽 120 厘米、深 100 厘米的网筐，被丢进来的鱼会赠给附近的中小学或养老院等。",
						en: "The post is a mesh cage about 60 cm high, 120 cm wide and 100 cm deep; dumped fish are given to nearby elementary and junior-high schools, nursing homes, and the like.",
						indent: true,
					},
					{
						type: "paragraph",
						jp: "{捨|す}てられる{魚|さかな}は{過去|かこ}3{年|ねん}、{年間|ねんかん}{約|やく}1{万匹|まんびき}。{飼|か}えなくなった{最近|さいきん}の{理由|りゆう}は、「マンションからアパートに{引|ひ}っ{越|こ}した」「えさ{代|だい}が{払|はら}えなくなった」など{不況|ふきょう}（{注|ちゅう}2）によるものが{多|おお}いという。",
						cn: "被丢弃的鱼在过去三年里每年约一万条。最近养不了的理由，多为「从公寓搬到了小公寓」「饲料费付不起」等不景气造成的。",
						en: "For the past three years about 10,000 fish a year have been dumped. Recent reasons for no longer keeping them are often recession-related, such as “we moved from a condominium to an apartment” or “we can no longer afford feed.”",
						indent: true,
					},
					{ type: "heading", jp: "B", cn: "B", en: "B" },
					{
						type: "title",
						jp: "{多摩川|たまがわ}の「タマゾン」{対策|たいさく}に「おさかなポスト」",
						cn: "针对多摩川「塔马逊」的对策：「鱼类邮筒」",
						en: "A “fish post” as a measure against the Tama River “Tamazon”",
					},
					{
						type: "paragraph",
						jp: "いま{多摩川|たまがわ}が「タマゾン」などと{呼|よ}ばれている。これは、アマゾン{川|がわ}にすむようなピラニアやアロワナ、グッピー、エンゼルフィッシュといった{様々|さまざま}な{外来種|がいらいしゅ}が{増|ふ}えたため、もともといた{魚|さかな}が{外来種|がいらいしゅ}に{食|た}べられて{少|すく}なくなってしまったからである。",
						cn: "现在多摩川被称为「塔马逊」。因为亚马逊河里才有的食人鱼、龙鱼、孔雀鱼、神仙鱼等各种外来种增加，原来就在的鱼被外来种吃掉、变少了。",
						en: "The Tama River is now nicknamed the “Tamazon.” All sorts of introduced species that belong in the Amazon—piranha, arowana, guppies, angelfish—have increased, and the fish that were originally there have been eaten and dwindled.",
						indent: true,
					},
					{
						type: "paragraph",
						jp: "この「タマゾン」{対策|たいさく}に、「おさかなポスト」というものが{効果|こうか}を{上|あ}げている。このポストは2005{年|ねん}に{設置|せっち}されたが、そのきっかけは2004{年|ねん}の{夏|なつ}のこと。「{世話|せわ}をしないなら{捨|す}てなさい」と{母親|ははおや}に{叱|しか}られて{泣|な}きながら{金魚|きんぎょ}を{捨|す}てに{来|き}た{男|おとこ}の{子|こ}に「{川|かわ}に{捨|す}てないで。ときどき{会|あ}いに{来|き}なさいよ。」と{言|い}って{金魚|きんぎょ}を{預|あず}かったのが{始|はじ}まりで、「{生|い}き{物|もの}の{命|いのち}を{大切|たいせつ}にすること」と「{生態系|せいたいけい}を{乱|みだ}すのを{防|ふせ}ぐこと」に{役立|やくだ}っていると{管理者|かんりしゃ}は{言|い}う。",
						cn: "作为「塔马逊」对策，「鱼类邮筒」正在见效。这个邮筒 2005 年设置，起因是 2004 年夏天。一个被母亲骂「不照料就扔掉」而哭着来扔金鱼的男孩，管理人说「别扔河里。偶尔来看看它」，把金鱼收下——由此开始。管理者说，这有助于「珍惜生命」和「防止扰乱生态系统」。",
						en: "As a measure against the “Tamazon,” the “fish post” is proving effective. It was installed in 2005; the trigger was the summer of 2004. A boy who had been scolded “If you won’t look after it, throw it away” came in tears to dump a goldfish; he was told “Don’t throw it in the river. Come visit it now and then,” and the goldfish was taken in—that is how it began. The manager says it helps both “to value the lives of living things” and “to keep the ecosystem from being disturbed.”",
						indent: true,
					},
				],
				footnotes: [
					{ marker: "（注1）", term: "外来魚", jp: "日本にはいなかった外国の魚", cn: "日本原本没有的外国鱼", en: "a foreign fish that was not originally in Japan" },
					{ marker: "（注2）", term: "不況", jp: "景気が悪いこと", cn: "不景气", en: "a recession; bad economic times" },
				],
				questions: [
					{
						label: "5",
						jp: "{両方|りょうほう}の{記事|きじ}に{書|か}かれている{内容|ないよう}はどれか。",
						cn: "两边报道都写到的内容是哪一项？",
						en: "Which content is written in both articles?",
						choices: [
							{ jp: "おさかなポストが{置|お}かれるようになったきっかけ", cn: "鱼类邮筒被设置起来的契机", en: "what led to the fish post being set up" },
							{ jp: "おさかなポストを{設置|せっち}している{目的|もくてき}", cn: "设置鱼类邮筒的目的", en: "the purpose of installing the fish post" },
							{ jp: "{外来魚|がいらいぎょ}が{川|かわ}に{捨|す}てられると{困|こま}る{理由|りゆう}", cn: "外来鱼被扔进河里会带来困扰的理由", en: "why it is a problem if foreign fish are dumped in the river" },
							{ jp: "おさかなポストに{捨|す}てられる{魚|さかな}の{数|かず}", cn: "丢进鱼类邮筒的鱼的数量", en: "the number of fish dumped in the fish post" },
						],
						answer: 2,
						explanation:
							"两边都写了设置的目的。A：「外来魚が川に捨てられるのを防ぐポスト本来の目的は実現しつつある」。B：「生き物の命を大切にすること」と「生態系を乱すのを防ぐこと」に役立っている。选 2。别册：1 只有 B（2004 年夏天男孩哭着来扔金鱼）。3 只有 B（外来种增加、原来的鱼被吃掉变少）。4 只有 A（年間約1万匹）。比较阅读要逐项问「A 有没有、B 有没有」。",
						explanationEn:
							"Both state the purpose. A: “the box’s original purpose—stopping foreign fish being thrown into the river—is being achieved.” B: it helps “to value the lives of living things” and “to keep the ecosystem from being disturbed.” Choose 2. Booklet: 1 is B only (summer 2004, the crying boy). 3 is B only (introduced species increased and native fish were eaten). 4 is A only (about 10,000 a year). In compare-and-contrast, check each option against A and against B.",
						choiceNotes: [
							"只有 B。设置契机（2004 年夏天）A 没写。",
							"正确。两边都写了防止往河里扔外来鱼／保护生态这一目的。",
							"只有 B。外来种吃掉原有鱼、所以困扰——A 没解释为什么困。",
							"只有 A。一年约一万条 B 没写。",
						],
						choiceNotesEn: [
							"B only. The 2004 origin story is not in A.",
							"Correct. Both give the purpose: keep foreign fish out of the river / protect the ecosystem.",
							"B only. Why dumping foreign fish is a problem (they eat natives) is not explained in A.",
							"A only. “About 10,000 a year” is not in B.",
						],
					},
					{
						label: "6",
						jp: "{両方|りょうほう}の{記事|きじ}から{判断|はんだん}して「おさかなポスト」に{関|かん}して{管理者|かんりしゃ}はどのように{思|おも}っていると{考|かんが}えられるか。",
						cn: "根据两边报道判断，关于「鱼类邮筒」，可以认为管理者是怎么想的？",
						en: "Judging from both articles, how does the manager appear to feel about the “fish post”?",
						choices: [
							{ jp: "おさかなポストに{捨|す}てられる{魚|さかな}の{数|かず}が{増|ふ}えているので{困|こま}っている。", cn: "丢进鱼类邮筒的鱼在增加，所以很困扰。", en: "They are troubled because the number of fish dumped in the post is rising." },
							{ jp: "ペットの{外来魚|がいらいぎょ}は{日本|にほん}の{川|かわ}に{捨|す}てられると{死|し}んでしまうので{捨|す}てないでほしい。", cn: "宠物外来鱼扔进日本的河里就会死，所以希望不要扔。", en: "They want people not to dump pet foreign fish because those fish die in Japanese rivers." },
							{ jp: "{近|ちか}くの{学校|がっこう}や{老人|ろうじん}ホームに{贈|おく}ると{喜|よろこ}ばれるのでもっと{集|あつ}めたい。", cn: "赠给附近学校和养老院会让人高兴，所以还想再多收集。", en: "They want to collect still more because schools and nursing homes are glad to receive them." },
							{ jp: "ペットの{魚|さかな}の{命|いのち}も、{川|かわ}にもともとすんでいる{魚|さかな}の{命|いのち}も{大切|たいせつ}にしてほしい。", cn: "希望宠物鱼的生命、河里原来就有的鱼的生命都得到珍惜。", en: "They want people to value both the lives of pet fish and the lives of the fish that originally live in the river." },
						],
						answer: 4,
						explanation:
							"A 的管理者「残念がっている」：饲主本该负责到底（宠物鱼的命），同时「外来魚が川に捨てられるのを防ぐ」这一本来目的正在实现（河里原有鱼的命）。B 的管理者明说有助于「生き物の命を大切にすること」和「生態系を乱すのを防ぐこと」。两边合起来：宠物的命和原住鱼的命都要珍惜。选 4。1 数量三年都是约一万，没有「在增加所以困」。2 外来鱼扔进河里不是「死掉」，而是繁殖、吃掉原有鱼。3 「もっと集めたい」没人说。",
						explanationEn:
							"A’s manager is “sorry”: owners should see pets through (the pet’s life), while the original aim—keeping foreign fish out of the river—is being achieved (the native fish’s life). B’s manager says it helps both “to value living things” and “to keep the ecosystem from being disturbed.” Together: value pet fish and the fish that were always in the river. Choose 4. 1: the number has been about 10,000 for three years, not “rising and causing trouble.” 2: dumped foreign fish do not simply die; they breed and eat natives. 3: nobody says they want to collect still more.",
						choiceNotes: [
							"过去三年都是约一万条，没有写「正在增加所以困扰」。",
							"扔进河里的外来鱼不是死掉，而是变成「塔马逊」、吃掉原有鱼。",
							"赠给学校是处理方式，管理者没有说想再多收集。",
							"正确。宠物的命和原住鱼的命都要珍惜。",
						],
						choiceNotesEn: [
							"The figure has been ~10,000 for three years; no “rising, so we are in trouble.”",
							"Foreign fish dumped in the river do not die; they become the “Tamazon” and eat natives.",
							"Giving fish to schools is how they are used; the manager does not say they want more.",
							"Correct. Value both pet fish and the fish that originally live in the river.",
						],
					},
				],
			},
		],
	},

	vocab: [
		{ jp: "震災", kana: "しんさい", cn: "震灾", en: "earthquake disaster", pos: "名詞" },
		{ jp: "写真展", kana: "しゃしんてん", cn: "摄影展", en: "photography exhibition", pos: "名詞" },
		{ jp: "直後", kana: "ちょくご", cn: "刚过之后", en: "immediately after", pos: "名詞" },
		{ jp: "展示", kana: "てんじ", cn: "展示", en: "display", pos: "名詞・動詞" },
		{ jp: "復興", kana: "ふっこう", cn: "重建、复兴", en: "reconstruction", pos: "名詞・動詞" },
		{ jp: "町並み", kana: "まちなみ", cn: "街景、街道两侧建筑", en: "townscape; row of buildings", pos: "名詞" },
		{ jp: "開催", kana: "かいさい", cn: "举办", en: "holding (an event)", pos: "名詞・動詞" },
		{ jp: "人身事故", kana: "じんしんじこ", cn: "人身事故、人员伤亡事故", en: "accident involving injury or death", pos: "名詞" },
		{ jp: "運休", kana: "うんきゅう", cn: "停运", en: "cancellation (of trains)", pos: "名詞・動詞" },
		{ jp: "開廷", kana: "かいてい", cn: "开庭", en: "the court opening", pos: "名詞・動詞" },
		{ jp: "目撃者", kana: "もくげきしゃ", cn: "目击者", en: "eyewitness", pos: "名詞" },
		{ jp: "遮断機", kana: "しゃだんき", cn: "道口栏杆", en: "crossing barrier", pos: "名詞" },
		{ jp: "外来魚", kana: "がいらいぎょ", cn: "外来鱼", en: "introduced / non-native fish", pos: "名詞" },
		{ jp: "外来種", kana: "がいらいしゅ", cn: "外来种", en: "introduced species", pos: "名詞" },
		{ jp: "生態系", kana: "せいたいけい", cn: "生态系统", en: "ecosystem", pos: "名詞" },
		{ jp: "不況", kana: "ふきょう", cn: "不景气", en: "recession", pos: "名詞" },
		{ jp: "設置", kana: "せっち", cn: "设置、安装", en: "installation", pos: "名詞・動詞" },
		{ jp: "飼い主", kana: "かいぬし", cn: "饲主", en: "pet owner", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜つつある",
			formation: "動詞ます形＋つつある",
			meaning: "正在逐步……。书面语，表示变化在进行中。",
			meaningEn: "to be in the process of …. Written style; a change underway.",
			example: {
				jp: "{本来|ほんらい}の{目的|もくてき}は{実現|じつげん}しつつある。",
				cn: "本来的目的正在逐步实现。",
				en: "The original purpose is in the process of being achieved.",
			},
		},
		{
			pattern: "〜によると／〜の話では",
			formation: "名詞＋によると／の話では",
			meaning: "据……称。新闻里标明信息来源；「話では」只是传闻／目击，不一定是确定事实。",
			meaningEn: "according to …. News marking of sources; 話では is a witness/hearsay line, not a confirmed fact.",
			example: {
				jp: "{目撃者|もくげきしゃ}の{話|はなし}では、{女性|じょせい}が{自|みずか}ら{遮断機|しゃだんき}を{持|も}ち{上|あ}げた。",
				cn: "据目击者说，该女性自己抬起了道口栏杆。",
				en: "According to a witness, the woman herself lifted the crossing barrier.",
			},
		},
		{
			pattern: "〜のが始まりで",
			formation: "動詞普通形／名詞＋が始まりで",
			meaning: "以……为开端。交代事物的起因。",
			meaningEn: "that was how it began / starting from …. Introduces an origin story.",
			example: {
				jp: "{金魚|きんぎょ}を{預|あず}かったのが{始|はじ}まりで、{生態系|せいたいけい}を{乱|みだ}すのを{防|ふせ}ぐことに{役立|やくだ}っている。",
				cn: "从收下金鱼开始，后来有助于防止扰乱生态系统。",
				en: "Taking in the goldfish is how it began, and it now helps keep the ecosystem from being disturbed.",
			},
		},
	],
};
