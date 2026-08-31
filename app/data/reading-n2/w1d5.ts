import type { ReadingDay } from "../reading-n3/types";

// 第1週 5日目 利用案内 — printed pages 20–21
export const w1d5: ReadingDay = {
	week: 1,
	day: 5,
	label: "利用案内",
	labelKana: "りようあんない",
	labelEn: "User Guides",
	printedPages: [20, 21],
	answerSource: "book",

	point: {
		title: "{施設|しせつ}などの{利用|りよう}に{関|かん}する{注意事項|ちゅういじこう}をよく{読|よ}もう！",
		titleCn: "仔细阅读与使用设施等相关的注意事项！",
		titleEn: "Read the notices for the users of the facility carefully!",
		figure: {
			alt: "自転車がなくて困っている人「ボクの自転車がない……」と、「ちゃんと駐輪場に止めないからだよ。」と指摘する人",
			cn: "一个人找不到自行车：「我的自行车没了……」；另一个人说：「因为你没好好停在停车场啊。」",
			en: "One character has lost a bike—“My bicycle is gone…”—and the other says, “That’s because you didn’t park it properly in the bike lot.”",
		},
		tips: [
			{
				jp: "{例えば|たとえば}{駐輪場|ちゅうりんじょう}の{利用案内|りようあんない}にはこんな{言葉|ことば}が{出|で}てきます。",
				cn: "比如自行车停车场的使用指南里会出现下面这些词语。",
				en: "A bicycle-parking guide, for example, uses words like these.",
			},
		],
		expressions: [
			{ jp: "駐輪", kana: "ちゅうりん", cn: "停放自行车", en: "bicycle parking" },
			{ jp: "原付 ＝ 原動機付自転車", kana: "げんつき", cn: "轻便摩托车（50cc 以下）", en: "a moped" },
			{ jp: "月極", kana: "つきぎめ", cn: "包月、按月租赁", en: "a monthly lease" },
			{ jp: "盗難", kana: "とうなん", cn: "被盗", en: "a theft" },
			{ jp: "防止", kana: "ぼうし", cn: "防止", en: "prevention" },
			{ jp: "破損", kana: "はそん", cn: "损坏", en: "damage" },
			{ jp: "責任を負う", kana: "せきにんをおう", cn: "负责", en: "be responsible for" },
			{ jp: "放置", kana: "ほうち", cn: "放置（超过允许时间仍停着）", en: "parked beyond the allowable time limit" },
			{ jp: "撤去", kana: "てっきょ", cn: "撤除、拖走", en: "removal" },
			{ jp: "定期契約", kana: "ていきけいやく", cn: "定期合同", en: "a fixed period lease" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{妹|いもうと}",
				speakerCn: "妹妹",
				speakerEn: "Younger sister",
				jp: "お{兄|にい}ちゃん、いつも{自転車|じてんしゃ}どこに{止|と}めてる？",
				cn: "哥，你自行车一般都停哪儿？",
				en: "Where do you always park your bike, brother?",
			},
			{
				type: "speech",
				speaker: "{兄|あに}",
				speakerCn: "哥哥",
				speakerEn: "Older brother",
				jp: "たいてい{駅前|えきまえ}の{無料|むりょう}のとこ。いっぱいのときは、{北口|きたぐち}。",
				cn: "多半在车站前免费的地方。满了就停北口。",
				en: "Usually the free place in front of the station. When that’s full, the north exit.",
			},
			{
				type: "speech",
				speaker: "{妹|いもうと}",
				speakerCn: "妹妹",
				speakerEn: "Younger sister",
				jp: "{北口|きたぐち}って{有料|ゆうりょう}でしょう？　いくらかかる？",
				cn: "北口是收费的吧？要多少钱？",
				en: "The north exit is paid, right? How much is it?",
			},
			{
				type: "speech",
				speaker: "{兄|あに}",
				speakerCn: "哥哥",
				speakerEn: "Older brother",
				jp: "100{円|えん}で6{時間|じかん}だけど、{最初|さいしょ}の2{時間|じかん}は{無料|むりょう}だし、{近|ちか}くて、{便利|べんり}だよ。",
				cn: "100 日元停 6 小时，不过开头 2 小时免费，又近又方便。",
				en: "It’s 100 yen for 6 hours, but the first 2 hours are free, and it’s close and convenient.",
			},
			{
				type: "speech",
				speaker: "{妹|いもうと}",
				speakerCn: "妹妹",
				speakerEn: "Younger sister",
				jp: "そうなんだ、{知|し}らなかった。{私|わたし}、{駅前|えきまえ}が{満車|まんしゃ}だったから{公園|こうえん}の{無料駐輪場|むりょうちゅうりんじょう}まで{戻|もど}って{遅刻|ちこく}しそうになっちゃった。",
				cn: "这样啊，我都不知道。我因为站前停满了，又折回公园的免费停车场，差点迟到。",
				en: "I didn’t know that. The station-front lot was full, so I went back as far as the free park lot and almost ended up late.",
			},
			{
				type: "speech",
				speaker: "{兄|あに}",
				speakerCn: "哥哥",
				speakerEn: "Older brother",
				jp: "{要領|ようりょう}{悪|わる}いからなあ、お前は。{月極|つきぎめ}にすれば？　{学割|がくわり}も{利|き}くんだし。",
				cn: "你就是不机灵。办包月啊？学生优惠也适用。",
				en: "You’re just not practical. Why not get a monthly space? The student discount applies too.",
			},
			{
				type: "speech",
				speaker: "{妹|いもうと}",
				speakerCn: "妹妹",
				speakerEn: "Younger sister",
				jp: "ほとんど{毎日行|まいにちい}くんだから、そうだね……。",
				cn: "我几乎每天都去，也是……。",
				en: "I go almost every day, so yeah…",
			},
		],
		choices: [
			{ jp: "{妹|いもうと}は{北口|きたぐち}の{駐輪場|ちゅうりんじょう}を{利用|りよう}したことがない。", cn: "妹妹没用过北口的停车场。", en: "The sister has never used the north-exit bike lot." },
			{ jp: "{兄|あに}はいつでも{無料駐輪場|むりょうちゅうりんじょう}を{利用|りよう}している。", cn: "哥哥无论何时都在用免费停车场。", en: "The brother always uses a free bike lot." },
			{ jp: "{兄|あに}も{妹|いもうと}も{駅前|えきまえ}の{無料駐輪場|むりょうちゅうりんじょう}を{利用|りよう}したことがある。", cn: "哥哥和妹妹都用过站前的免费停车场。", en: "Both brother and sister have used the free lot in front of the station." },
			{ jp: "{兄|あに}は{妹|いもうと}に{学生割引|がくせいわりびき}の{使|つか}える{駐輪場|ちゅうりんじょう}をすすめている。", cn: "哥哥在向妹妹推荐能用学生优惠的停车场。", en: "The brother is recommending a bike lot where a student discount can be used." },
			{ jp: "{北口|きたぐち}の{駐輪場|ちゅうりんじょう}は、{駅ビル|えきびる}で{買|か}い{物|もの}をすれば8{時間|じかん}100{円|えん}で{止|と}められる。", cn: "北口停车场如果在车站大楼购物，8 小时 100 日元就能停。", en: "At the north-exit lot you can park for 8 hours at 100 yen if you shop in the station building." },
		],
		answers: [1, 3, 4],
		hint: {
			jp: "「{無料|むりょう}のとこ」＝{無料|むりょう}のところ　／　「{学割|がくわり}が{利|き}く」＝{学割|がくわり}が{使|つか}える",
			cn: "「免费的とこ」＝免费的地方。　「学割が利く」＝能用学生优惠。",
			en: "muryō no toko = muryō no tokoro (the free place). gakuwari ga kiku = the student discount can be used.",
		},
	},

	mondai: {
		instruction: "{次|つぎ}の{駐輪場|ちゅうりんじょう}の{利用案内|りようあんない}を{見|み}て、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "看下面的自行车停车场使用指南，回答后面的问题。（答案在别册 p.2）",
		instructionEn: "Look at the bicycle-parking guide below and answer the questions that follow. (Answers are in the separate booklet, p. 2.)",
		blocks: [
			{
				type: "title",
				jp: "みどり{駅北口駐輪場|えききたぐちちゅうりんじょう}",
				cn: "绿站北口自行车停车场",
				en: "Midori Station North Exit Bicycle Parking",
			},
			{
				type: "paragraph",
				jp: "ご{利用時間|りようじかん}：5{時|じ}〜{翌|よく}1{時|じ}（1〜5{時|じ}の{間|あいだ}は{自転車|じてんしゃ}の{出|だ}し{入|い}れができません。）",
				cn: "使用时间：5 点〜次日 1 点（1 点〜5 点之间不能存取自行车。）",
				en: "Hours: 5:00 to 1:00 the next day (bicycles cannot be taken in or out between 1:00 and 5:00).",
			},
			{
				type: "paragraph",
				jp: "{定期利用|ていきりよう}〔{月極|つきぎめ}〕の{場合|ばあい}は{前|まえ}の{月|つき}の25{日|にち}までに{申込書|もうしこみしょ}を{駐輪場窓口|ちゅうりんじょうまどぐち}に{提出|ていしゅつ}してください。",
				cn: "定期使用〔包月〕时，请在前一个月的 25 日之前把申请书交到停车场窗口。",
				en: "For regular (monthly) use, submit the application form at the parking window by the 25th of the previous month.",
			},
			{
				type: "note",
				jp: "＊お{申|もう}し{込|こ}みの{際|さい}は{料金|りょうきん}（{契約月数分|けいやくげっすうぶん}）および（{注|ちゅう}）{身分証明書|みぶんしょうめいしょ}（{学割|がくわり}を{受|う}ける{場合|ばあい}は{学生証|がくせいしょう}）・{印鑑|いんかん}が{必要|ひつよう}です。",
				cn: "＊申请时需要费用（按合同月数）、以及（注）身份证明（享受学生优惠时为学生证）和印章。",
				en: "* When you apply you need the fee (for the number of contracted months) and (note) identification (a student ID if you want the student discount) and a seal.",
			},
			{
				type: "table",
				rows: [
					[
						{ jp: "{料金|りょうきん}", cn: "费用", en: "Fees", header: true, align: "center" },
						{ jp: "{定期利用|ていきりよう}〔{月極|つきぎめ}〕", cn: "定期使用〔包月〕", en: "Regular use (monthly)", header: true, align: "center" },
						{ jp: "{一時利用|いちじりよう}〔{時間貸|じかんがし}〕", cn: "临时使用〔计时〕", en: "Short-term use (hourly)", header: true, align: "center" },
					],
					[
						{ jp: "{自転車|じてんしゃ}", cn: "自行车", en: "Bicycle", header: true, align: "center" },
						{
							jp: "2,000{円|えん}\n（{学割|がくわり} 1,500{円|えん}）",
							cn: "2,000 日元\n（学生优惠 1,500 日元）",
							en: "2,000 yen\n(student rate 1,500 yen)",
							align: "center",
						},
						{
							jp: "{最初|さいしょ}の2{時間|じかん}は{無料|むりょう}\n{以降|いこう}6{時間|じかん}あたり100{円|えん}",
							cn: "开头 2 小时免费\n之后每 6 小时 100 日元",
							en: "First 2 hours free\nthen 100 yen per 6 hours",
							align: "center",
						},
					],
					[
						{ jp: "{原付|げんつき}（50cc{以下|いか}）", cn: "轻便摩托（50cc 以下）", en: "Moped (50 cc or under)", header: true, align: "center" },
						{
							jp: "2,600{円|えん}\n（{学割|がくわり} 2,000{円|えん}）",
							cn: "2,600 日元\n（学生优惠 2,000 日元）",
							en: "2,600 yen\n(student rate 2,000 yen)",
							align: "center",
						},
						{
							jp: "{最初|さいしょ}の2{時間|じかん}は{無料|むりょう}\n{以降|いこう}6{時間|じかん}あたり200{円|えん}",
							cn: "开头 2 小时免费\n之后每 6 小时 200 日元",
							en: "First 2 hours free\nthen 200 yen per 6 hours",
							align: "center",
						},
					],
				],
			},
			{
				type: "heading",
				jp: "{駐輪場|ちゅうりんじょう}はルールを{守|まも}ってご{利用|りよう}しましょう。",
				cn: "请遵守规则使用停车场。",
				en: "Please follow the rules when using the bicycle parking.",
			},
			{
				type: "list",
				marker: "●",
				items: [
					{ jp: "ゴミなどは{捨|す}てないでください。", cn: "请不要扔垃圾等。", en: "Please do not throw away garbage or the like." },
					{ jp: "{盗難防止|とうなんぼうし}のため、カギは{必|かなら}ずおかけください。", cn: "为防止被盗，请务必上锁。", en: "Always lock your bicycle to prevent theft." },
					{ jp: "{駐輪場|ちゅうりんじょう}での{事故|じこ}・{盗難|とうなん}・{破損|はそん}{等|とう}については、{一切責任|いっさいせきにん}を{負|お}いません。", cn: "对于停车场内的事故、被盗、损坏等，概不负责。", en: "We assume no responsibility whatsoever for accidents, theft, damage, etc. in the lot." },
					{
						jp: "{無断|むだん}で{駐輪|ちゅうりん}している{場合|ばあい}や、{一時利用|いちじりよう}{置|お}き{場|ば}に2{日以上|にちいじょう}{放置|ほうち}されている{場合|ばあい}は{撤去|てっきょ}の{対象|たいしょう}となります＊のでご{注意|ちゅうい}ください。",
						cn: "擅自停放，或在临时停车区放置 2 天以上的，将成为拖走对象＊，请注意。",
						en: "Unauthorized parking, or bikes left in the short-term area for 2 days or more, are subject to removal＊.",
					},
				],
			},
			{
				type: "line",
				jp: "みどり{市役所|しやくしょ}　{都市計画課|としけいかくか}〈XXX-XXXX〉",
				cn: "绿市市政府　城市规划课〈XXX-XXXX〉",
				en: "Midori City Hall, City Planning Division <XXX-XXXX>",
				align: "right",
			},
		],
		footnotes: [{ marker: "（注）", term: "AおよびB", jp: "AとB", cn: "A 以及 B（＝A 和 B）", en: "A and B" }],
		pageNotes: [
			{
				jp: "＊ Bicycles parked illegally or in temporary parking areas for more than 2 days will be subject to removal",
				cn: "＊擅自停放的自行车或者在临时停车处放置两天以上的自行车会予以撤除",
				en: "Bicycles parked illegally or in temporary parking areas for more than 2 days will be subject to removal",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "{正|ただ}しいものはどれか。",
				cn: "哪一项是正确的？",
				en: "Which of the following is correct?",
				choices: [
					{ jp: "{月極|つきぎめ}で{利用|りよう}したい{場合|ばあい}には、{市役所|しやくしょ}に{申|もう}し{込|こ}まなければならない。", cn: "想包月使用时，必须向市政府申请。", en: "If you want monthly use, you must apply at city hall." },
					{ jp: "4{月|がつ}から{定期利用|ていきりよう}したい{場合|ばあい}は3{月末|がつまつ}までに{申|もう}し{込|こ}まなければならない。", cn: "想从 4 月开始定期使用时，必须在 3 月底之前申请。", en: "To start regular use in April, you must apply by the end of March." },
					{ jp: "{一時利用|いちじりよう}で1{時間|じかん}{止|と}めた{場合|ばあい}は{無料|むりょう}である。", cn: "临时使用停 1 小时的话是免费的。", en: "If you park for 1 hour on short-term use, it is free." },
					{ jp: "{時間貸|じかんがし}で24{時間|じかん}{止|と}めた{場合|ばあい}、{自転車|じてんしゃ}が{別|べつ}の{場所|ばしょ}に{移動|いどう}される。", cn: "计时停 24 小时的话，自行车会被移到别的地方。", en: "If you park 24 hours on the hourly rate, the bicycle is moved to another place." },
				],
				answer: 3,
				explanation:
					"临时使用「最初の2時間は無料」，停 1 小时在免费范围内，3 正确。1：申请交到「駐輪場窓口」，不是市役所（市役所只是发布单位）。2：定期是「前の月の25日まで」，4 月开始要在 3 月 25 日之前，不是 3 月末。4：撤去对象是「一時利用置き場に2日以上放置」，24 小时还不到 2 天，也不是「移到别处」而是可能被撤去。",
				explanationEn:
					"Short-term use is “first 2 hours free,” so 1 hour is free — 3 is correct. 1: you apply at the parking window, not city hall (city hall only issues the notice). 2: regular use must be applied for by the 25th of the previous month, so April starts need March 25, not the end of March. 4: removal is for bikes left in the short-term area for 2 days or more; 24 hours is not yet 2 days, and it is removal, not merely being moved.",
				choiceNotes: [
					"要交到驻轮场窗口，不是市政府。",
					"截止日期是上个月 25 日，不是月末。",
					"正确。开头 2 小时免费，1 小时在范围内。",
					"2 日以上才可能撤去；24 小时不够，且不是「移动」而是「撤去」。",
				],
				choiceNotesEn: [
					"You submit at the parking window, not city hall.",
					"The deadline is the 25th of the previous month, not month-end.",
					"Correct. The first 2 hours are free, so 1 hour is free.",
					"Removal is after 2 days or more; 24 hours is not enough, and it is removal, not “moved.”",
				],
			},
			{
				label: "問2",
				jp: "{学生|がくせい}がバイク（{原付|げんつき}）を3{カ月|かげつ}{定期利用|ていきりよう}する{場合|ばあい}、{申|もう}し{込|こ}みの{際|さい}いくら{必要|ひつよう}か。",
				cn: "学生把轻便摩托定期使用 3 个月时，申请时需要多少钱？",
				en: "If a student uses a moped on a 3-month regular contract, how much is needed at the time of application?",
				choices: [
					{ jp: "2,000{円|えん}", cn: "2,000 日元", en: "2,000 yen" },
					{ jp: "2,600{円|えん}", cn: "2,600 日元", en: "2,600 yen" },
					{ jp: "6,000{円|えん}", cn: "6,000 日元", en: "6,000 yen" },
					{ jp: "7,800{円|えん}", cn: "7,800 日元", en: "7,800 yen" },
				],
				answer: 3,
				explanation:
					"别册：学割 2,000 円×3 カ月分。お申し込みの際は料金（契約する月数分）が必要と書いてある。学生所以用原付的学割月额 2,000 日元，一次交 3 个月：2,000×3＝6,000 円。陷阱：2,000 是一个月学割；2,600 是没有学割的月额；7,800 是 2,600×3（没算学割）。",
				explanationEn:
					"The answer key: student rate 2,000 yen × 3 months. The notice says the fee for the number of contracted months is due when you apply. A student pays the moped student rate of 2,000 yen, three months at once: 2,000 × 3 = 6,000 yen. Traps: 2,000 is one month at the student rate; 2,600 is one month without the discount; 7,800 is 2,600 × 3 (no student rate).",
				choiceNotes: [
					"这只是原付学割的一个月金额，题目是 3 个月，且申请时要交合同月数的全额。",
					"这是原付没有学割的月额；申请的是学生，应用学割，且是 3 个月。",
					"正确。学割 2,000×3 个月＝6,000。",
					"这是 2,600×3，没有用学割。",
				],
				choiceNotesEn: [
					"That is one month at the moped student rate; the question is 3 months, paid in full up front.",
					"That is one month without the student discount; the applicant is a student, and it is 3 months.",
					"Correct. Student rate 2,000 × 3 months = 6,000.",
					"That is 2,600 × 3, without the student discount.",
				],
			},
		],
	},

	vocab: [
		{ jp: "駐輪場", kana: "ちゅうりんじょう", cn: "自行车停车场", en: "bicycle parking lot", pos: "名詞" },
		{ jp: "原付", kana: "げんつき", cn: "轻便摩托车", en: "moped", pos: "名詞" },
		{ jp: "月極", kana: "つきぎめ", cn: "包月", en: "monthly (lease)", pos: "名詞" },
		{ jp: "定期利用", kana: "ていきりよう", cn: "定期使用", en: "regular / contracted use", pos: "名詞" },
		{ jp: "一時利用", kana: "いちじりよう", cn: "临时使用", en: "short-term use", pos: "名詞" },
		{ jp: "時間貸", kana: "じかんがし", cn: "计时出租", en: "hourly rental", pos: "名詞" },
		{ jp: "学割", kana: "がくわり", cn: "学生优惠", en: "student discount", pos: "名詞" },
		{ jp: "盗難", kana: "とうなん", cn: "被盗", en: "theft", pos: "名詞" },
		{ jp: "破損", kana: "はそん", cn: "损坏", en: "damage", pos: "名詞" },
		{ jp: "放置", kana: "ほうち", cn: "放置不管", en: "leaving (a vehicle) unattended", pos: "名詞・動詞" },
		{ jp: "撤去", kana: "てっきょ", cn: "撤除、拖走", en: "removal", pos: "名詞・動詞" },
		{ jp: "無断", kana: "むだん", cn: "擅自、未经许可", en: "without permission", pos: "名詞" },
		{ jp: "身分証明書", kana: "みぶんしょうめいしょ", cn: "身份证明", en: "identification", pos: "名詞" },
		{ jp: "印鑑", kana: "いんかん", cn: "印章", en: "a personal seal", pos: "名詞" },
		{ jp: "満車", kana: "まんしゃ", cn: "车位已满", en: "full (no spaces)", pos: "名詞" },
		{ jp: "要領が悪い", kana: "ようりょうがわるい", cn: "不机灵、不得要领", en: "not practical; bad at handling things", pos: "表現" },
	],

	grammar: [
		{
			pattern: "AおよびB",
			formation: "名詞および名詞",
			meaning: "A 以及 B。书面语，等于「AとB」。本课注解说および＝と。",
			meaningEn: "A and B. Written style, equal to A to B. The note on this page: oyobi = to.",
			example: {
				jp: "{料金|りょうきん}（{契約月数分|けいやくげっすうぶん}）および{身分証明書|みぶんしょうめいしょ}・{印鑑|いんかん}が{必要|ひつよう}です。",
				cn: "需要费用（按合同月数）以及身份证明和印章。",
				en: "You need the fee (for the contracted months) and identification and a seal.",
			},
		},
		{
			pattern: "一切〜ない",
			formation: "一切＋責任を負いません　等",
			meaning: "完全不……。告示里用来彻底免责。",
			meaningEn: "not … at all. Used on notices to refuse all liability.",
			example: {
				jp: "{一切責任|いっさいせきにん}を{負|お}いません。",
				cn: "概不负责。",
				en: "We assume no responsibility whatsoever.",
			},
		},
		{
			pattern: "〜の対象となる",
			formation: "名詞＋の対象となる",
			meaning: "成为……的对象。条款里表示会被怎样处理。",
			meaningEn: "to be subject to…. Used in terms to say how something will be treated.",
			example: {
				jp: "{撤去|てっきょ}の{対象|たいしょう}となります。",
				cn: "将成为拖走对象。",
				en: "It will be subject to removal.",
			},
		},
	],
};
