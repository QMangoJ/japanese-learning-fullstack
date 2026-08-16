import type { ReadingDay } from "./types";

// 第1週 7日目 実戦問題 — printed pages 24–26
export const w1d7: ReadingDay = {
	week: 1,
	day: 7,
	label: "実戦問題",
	labelKana: "じっせんもんだい",
	labelEn: "Practice Exercise",
	printedPages: [24, 25, 26],
	answerSource: "book",

	practice: {
		timeLimitMinutes: 15,
		scoring: "1問25点×4問／100点",
		groups: [
			{
				label: "問題1",
				instruction:
					"{右|みぎ}のページはビジネスホテルの{案内|あんない}である。これを{読|よ}んで、{下|した}の{質問|しつもん}に{答|こた}えなさい。{答|こた}えは、1・2・3・4から{最|もっと}もよいものを{一|ひと}つえらびなさい。",
				instructionCn:
					"右页是一家商务酒店的介绍。阅读后回答下面的问题。答案从 1・2・3・4 中选出最合适的一个。",
				instructionEn:
					"The right-hand page is information about a business hotel. Read it and answer the questions below. Choose the best answer from 1, 2, 3, or 4.",
				blocks: [
					{ type: "title", jp: "〜インターネット{予約限定|よやくげんてい}（※1）〜", cn: "〜仅限网络预订（※1）〜", en: "— Internet reservations only (※1) —" },
					{
						type: "heading",
						jp: "◎チェックイン18:00からのお{得|とく}なプラン",
						cn: "◎ 18:00 之后办理入住的超值方案",
						en: "◎ Bargain plan for check-in from 18:00",
					},
					{
						type: "line",
						jp: "【{期間|きかん}】201X{年|ねん}01{月|がつ}10{日|にち}〜201X{年|ねん}03{月|がつ}31{日|にち}",
						cn: "【期间】201X 年 01 月 10 日〜201X 年 03 月 31 日",
						en: "[Period] January 10, 201X – March 31, 201X",
					},
					{
						type: "list",
						marker: "★",
						items: [
							{
								jp: "チェックインタイムが18:00からだから{安|やす}いお{得|とく}なプラン！",
								cn: "因为入住时间从 18:00 开始，所以价格便宜、非常划算！",
								en: "Because check-in starts at 18:00, this plan is cheap and a great deal!",
							},
							{
								jp: "お{荷物|にもつ}をフロントに{預|あず}け、ご{飯|はん}を{食|た}べたり、お{酒|さけ}を{飲|の}んでからのチェックインにも{最適|さいてき}！！",
								cn: "把行李寄存在前台，先去吃饭喝酒之后再来办理入住也非常合适！！",
								en: "Perfect if you leave your bags at the front desk, eat or have a drink, and then check in!!",
							},
							{ jp: "チェックアウトタイムは12:00なので、のんびりできます！", cn: "退房时间是 12:00，可以悠闲地休息！", en: "Check-out is at 12:00, so you can take it easy!" },
							{ jp: "{週末|しゅうまつ}も{同料金|どうりょうきん}！", cn: "周末也是同样的价格！", en: "The same rate on weekends too!" },
						],
					},
					{
						type: "paragraph",
						jp: "{部屋|へや}のタイプ：140センチのセミダブルベッド、バス・トイレ{付|つき}、{禁煙|きんえん}ルーム",
						cn: "房型：140 厘米的小双人床、带浴室卫生间、无烟房",
						en: "Room type: 140 cm semi-double bed, bath and toilet included, non-smoking",
					},
					{
						type: "paragraph",
						jp: "{料金|りょうきん}：1{名|めい}4000{円|えん}（2{名|めい}1{室利用|しつりよう}）　{食事|しょくじ}なし、インターネット{接続無料|せつぞくむりょう}（※2）",
						cn: "价格：每人 4000 日元（2 人 1 间）　不含餐，免费上网（※2）",
						en: "Rate: 4,000 yen per person (two people, one room). No meals. Free internet (※2)",
					},
					{
						type: "list",
						marker: "＊",
						items: [
							{ jp: "1{名|めい}で1{室利用|しつりよう}の{場合|ばあい}…7000{円|えん}", cn: "1 人使用 1 间的情况…7000 日元", en: "One person using one room… 7,000 yen" },
							{ jp: "{子|こ}ども{料金|りょうきん}…6{歳以下|さいいか}のみ10%{割引|わりびき}", cn: "儿童价…仅限 6 岁以下打 9 折", en: "Child rate… 10% off for ages 6 and under only" },
						],
					},
					{
						type: "list",
						marker: "○",
						items: [
							{
								jp: "18{時以前|じいぜん}のチェックインはできませんので、お{早|はや}めにご{到着|とうちゃく}のお{客様|きゃくさま}は{手荷物|てにもつ}をフロントにてお{預|あず}かりいたします。",
								cn: "18 点之前无法办理入住，提前抵达的客人可将随身行李寄存在前台。",
								en: "Check-in before 18:00 is not possible. Guests who arrive early may leave their hand luggage at the front desk.",
							},
							{
								jp: "チェックイン{予定時間|よていじかん}を{過|す}ぎるとキャンセルとして{取|と}り{扱|あつか}われることがございますので、{遅|おく}れる{場合|ばあい}は{必|かなら}ず{連絡|れんらく}してください。",
								cn: "超过预定入住时间有可能被视为取消预订，如会迟到请务必联系我们。",
								en: "If you miss your scheduled check-in time, the booking may be treated as cancelled, so please contact us if you will be late.",
							},
						],
					},
					{ type: "title", jp: "ビジネスホテル・ニュー{東京|とうきょう}イン", cn: "商务酒店・新东京 INN", en: "Business Hotel New Tokyo Inn" },
					{
						type: "line",
						jp: "{東京都中央区|とうきょうとちゅうおうく}○○2−1　＜{東京駅|とうきょうえき}より{徒歩|とほ}7{分|ふん}＞",
						cn: "东京都中央区○○ 2−1　＜从东京站步行 7 分钟＞",
						en: "2-1 ○○, Chuo-ku, Tokyo  <7 minutes on foot from Tokyo Station>",
					},
					{ type: "line", jp: "TEL　03−○○○○−○○○○", cn: "电话　03−○○○○−○○○○", en: "Tel. 03-○○○○-○○○○" },
					{ type: "line", jp: "URL: http://www.newtokyo-inn.co.jp/", cn: "网址：http://www.newtokyo-inn.co.jp/", en: "URL: http://www.newtokyo-inn.co.jp/" },
				],
				footnotes: [
					{ marker: "※1", term: "インターネット予約限定", jp: "インターネットでの予約だけ", cn: "只接受网络预订", en: "Internet reservations only" },
					{ marker: "※2", term: "インターネット接続無料", jp: "インターネットに無料でつなぐことができる", cn: "可以免费连接互联网", en: "You can connect to the internet free of charge" },
				],
				questions: [
					{
						label: "1",
						jp: "この{案内|あんない}の{内容|ないよう}と{合|あ}っているものはどれか。",
						cn: "下列哪一项与这份介绍的内容相符？",
						en: "Which of the following matches the content of this information?",
						choices: [
							{ jp: "この{料金|りょうきん}で{泊|と}まることができるのは、{期間中|きかんちゅう}の{平日|へいじつ}である。", cn: "能以这个价格入住的只有活动期间的平日。", en: "You can stay at this rate only on weekdays during the period." },
							{ jp: "{大人|おとな}1{名|めい}と8{歳|さい}の{子|こ}どもと{二人|ふたり}で{泊|と}まる{場合|ばあい}は、8000{円|えん}である。", cn: "1 名大人和 1 名 8 岁儿童两人入住时，共 8000 日元。", en: "One adult and one 8-year-old child staying together pay 8,000 yen." },
							{ jp: "{前|まえ}もって{連絡|れんらく}を{入|い}れていれば、17:00にチェックインすることができる。", cn: "只要事先联系，就可以在 17:00 办理入住。", en: "If you contact them in advance, you can check in at 17:00." },
							{ jp: "{一人|ひとり}でこの{部屋|へや}に{泊|と}まる{場合|ばあい}は、{二人|ふたり}で{泊|と}まる{場合|ばあい}の10%{割引|わりびき}になる。", cn: "1 人入住此房间时，可享受 2 人入住价格的 9 折。", en: "One person staying in this room gets 10% off the two-person rate." },
						],
						answer: 2,
						explanation:
							"价格是「1名4000円（2名1室利用）」，儿童折扣「6歳以下のみ10%割引」。8 岁已经超过 6 岁，享受不到折扣，所以按大人同价计算：4000 ＋ 4000 ＝ 8000 日元。2 正确。这题考的是「以下」的范围和折扣条件的适用对象。",
						explanationEn:
							"The rate is “4,000 yen per person (two people, one room),” and the child discount is “10% off for ages 6 and under only.” An 8-year-old is over 6, so there is no discount: 4,000 + 4,000 = 8,000 yen. 2 is correct. This tests the range of ika and who the discount applies to.",
						choiceNotes: [
							"介绍里明确写着「週末も同料金！」，周末也是同一价格，不限平日。",
							"正确。8 岁不满足「6 歳以下」，所以两人都按 4000 日元计算。",
							"「18時以前のチェックインはできません」——18 点之前一律无法入住，事先联系也不行。事先联系是针对「迟到」的情况。",
							"1 人使用 1 间是 7000 日元。2 人时每人 4000 日元、合计 8000 日元，7000 并不是 8000 的 9 折（8000 的 9 折是 7200）。",
						],
						choiceNotesEn: [
							"The information clearly says “the same rate on weekends too,” so it is not limited to weekdays.",
							"Correct. Age 8 is not “6 or under,” so both people pay 4,000 yen.",
							"“Check-in before 18:00 is not possible”—you cannot check in before 18:00 even if you call ahead. Calling ahead is for being late.",
							"One person using one room is 7,000 yen. Two people pay 4,000 each, 8,000 in total; 7,000 is not 10% off 8,000 (that would be 7,200).",
						],
					},
					{
						label: "2",
						jp: "{山下|やました}さんは{妻|つま}と{二人|ふたり}で{東京|とうきょう}への{旅行|りょこう}を{計画|けいかく}している。201X{年|ねん}2{月|がつ}4{日|か}（{金|きん}）から2{泊|はく}でこのプランの{予約|よやく}をしたいと{思|おも}っている。18{時|じ}10{分東京着|ぷんとうきょうちゃく}の{新幹線|しんかんせん}に{乗|の}り、{東京駅|とうきょうえき}に{着|つ}いてから{近|ちか}くのレストランで{食事|しょくじ}をし、ホテルに{向|む}かうつもりだ。{正|ただ}しく{申|もう}し{込|こ}みをしているのはどれか。",
						cn: "山下先生计划和妻子两人去东京旅行。他想预订 201X 年 2 月 4 日（周五）起住 2 晚的这个方案。他将乘坐 18 点 10 分抵达东京的新干线，到东京站后先在附近的餐厅吃饭，然后前往酒店。正确填写申请的是哪一个？",
						en: "Mr. Yamashita is planning a trip to Tokyo with his wife. He wants to book this plan for 2 nights starting Friday, February 4, 201X. They will take a shinkansen that arrives in Tokyo at 18:10, eat at a restaurant near Tokyo Station, then go to the hotel. Which booking is filled in correctly?",
						choices: [
							{
								jp: "チェックイン{日|び}：2{月|がつ}4{日|か}（{金|きん}）／チェックアウト{日|び}：2{月|がつ}5{日|か}（{土|ど}）／{大人|おとな}2{名|めい}／チェックイン{予定時間|よていじかん}：20{時|じ}ごろ",
								cn: "入住日：2 月 4 日（五）／退房日：2 月 5 日（六）／大人 2 名／预定入住时间：20 点左右",
								en: "Check-in: Feb. 4 (Fri) / Check-out: Feb. 5 (Sat) / 2 adults / Scheduled check-in: around 20:00",
							},
							{
								jp: "チェックイン{日|び}：2{月|がつ}4{日|か}（{金|きん}）／チェックアウト{日|び}：2{月|がつ}5{日|か}（{土|ど}）／{大人|おとな}2{名|めい}／チェックイン{予定時間|よていじかん}：18{時半|じはん}ごろ",
								cn: "入住日：2 月 4 日（五）／退房日：2 月 5 日（六）／大人 2 名／预定入住时间：18 点半左右",
								en: "Check-in: Feb. 4 (Fri) / Check-out: Feb. 5 (Sat) / 2 adults / Scheduled check-in: around 18:30",
							},
							{
								jp: "チェックイン{日|び}：2{月|がつ}4{日|か}（{金|きん}）／チェックアウト{日|び}：2{月|がつ}6{日|か}（{日|にち}）／{大人|おとな}2{名|めい}／チェックイン{予定時間|よていじかん}：20{時|じ}ごろ",
								cn: "入住日：2 月 4 日（五）／退房日：2 月 6 日（日）／大人 2 名／预定入住时间：20 点左右",
								en: "Check-in: Feb. 4 (Fri) / Check-out: Feb. 6 (Sun) / 2 adults / Scheduled check-in: around 20:00",
							},
							{
								jp: "チェックイン{日|び}：2{月|がつ}4{日|か}（{金|きん}）／チェックアウト{日|び}：2{月|がつ}6{日|か}（{日|にち}）／{大人|おとな}2{名|めい}／チェックイン{予定時間|よていじかん}：18{時半|じはん}ごろ",
								cn: "入住日：2 月 4 日（五）／退房日：2 月 6 日（日）／大人 2 名／预定入住时间：18 点半左右",
								en: "Check-in: Feb. 4 (Fri) / Check-out: Feb. 6 (Sun) / 2 adults / Scheduled check-in: around 18:30",
							},
						],
						answer: 3,
						explanation:
							"要同时满足两个条件。①「2泊」＝住 2 晚：4 日入住、5 日再住一晚，所以退房日是 6 日（周日）——排除 1、2。②时间：新干线 18:10 到东京站，先在附近餐厅吃饭再去酒店，18 点半根本来不及吃完饭，20 点左右才合理——排除 4。因此 3 正确。",
						explanationEn:
							"Two conditions must both be met. (1) 2-haku = two nights: check in on the 4th, stay the 5th as well, so check-out is the 6th (Sunday)—that eliminates 1 and 2. (2) Time: the shinkansen arrives at Tokyo Station at 18:10, then they eat nearby before going to the hotel. 18:30 is too soon to finish dinner; around 20:00 is realistic—that eliminates 4. So 3 is correct.",
						choiceNotes: [
							"退房日写成 5 日，只住了 1 晚，不符合「2 泊」。",
							"住宿天数和时间都不对。",
							"正确。2 泊 → 6 日退房；18:10 到站后吃饭再过去 → 20 点左右。",
							"住宿天数正确，但 18:10 到东京站后还要吃饭，18 点半到不了酒店。",
						],
						choiceNotesEn: [
							"Check-out on the 5th is only one night, so it is not “2 nights.”",
							"Both the length of stay and the time are wrong.",
							"Correct. 2 nights → check-out on the 6th; after arriving at 18:10 they eat, so around 20:00.",
							"The length of stay is right, but after arriving at Tokyo Station at 18:10 they still have dinner, so they cannot reach the hotel by 18:30.",
						],
					},
				],
			},
			{
				label: "問題2",
				instruction:
					"つぎの{文書|ぶんしょ}は、{老人|ろうじん}が{暮|く}らす{施設|しせつ}のボランティア（※1）を{募集|ぼしゅう}するための{案内|あんない}である。{読|よ}んで、{下|した}の{質問|しつもん}に{答|こた}えなさい。{答|こた}えは1・2・3・4から{最|もっと}もよいものを{一|ひと}つえらびなさい。",
				instructionCn:
					"下面这篇文章是一家养老院为招募志愿者（※1）而发布的启事。阅读后回答下面的问题。答案从 1・2・3・4 中选出最合适的一个。",
				instructionEn:
					"The following text is a notice from a facility for older people, calling for volunteers (※1). Read it and answer the questions below. Choose the best answer from 1, 2, 3, or 4.",
				blocks: [
					{ type: "title", jp: "ボランティア{募集|ぼしゅう}", cn: "招募志愿者", en: "Volunteers wanted" },
					{
						type: "paragraph",
						jp: "「やすらぎホーム」ではお{年寄|としよ}りと{一緒|いっしょ}に{遊|あそ}んだり、{歌|うた}を{歌|うた}って{下|くだ}さるボランティアを{募集|ぼしゅう}しています。",
						cn: "「安逸之家」正在招募能陪老人一起玩耍、唱歌的志愿者。",
						en: "Yasuragi Home is looking for volunteers who will play with the older residents and sing with them.",
					},
					{
						type: "paragraph",
						jp: "ピアノやバイオリンなどの{楽器|がっき}ができる{方|かた}は{特|とく}に{大歓迎|だいかんげい}です。{楽器|がっき}でなくても、なにか{特技|とくぎ}（※2）があれば、ぜひそれを{活用|かつよう}してください。",
						cn: "会弹钢琴、拉小提琴等乐器的人尤其欢迎。即使不是乐器，只要有什么拿手本领，也请一定发挥出来。",
						en: "People who play the piano, violin, or another instrument are especially welcome. Even if it is not an instrument, if you have a special skill (※2), please put it to use.",
					},
					{
						type: "paragraph",
						jp: "お{年寄|としよ}りとの{話|はなし}は、{興味深|きょうみぶか}く、{人生|じんせい}の{勉強|べんきょう}になることも{多|おお}いです。きっとあなたにとっていい{体験|たいけん}（※3）になるでしょう。たくさんのご{応募|おうぼ}をお{待|ま}ちしています。",
						cn: "与老人的交谈很有意思，往往还能成为人生的学习。这对您来说一定会是一次很好的体验。期待大家踊跃报名。",
						en: "Talking with older people is fascinating, and often becomes a lesson in life. It will surely be a good experience (※3) for you. We look forward to many applications.",
					},
					{
						type: "list",
						marker: "・",
						items: [
							{ jp: "{高校生以上|こうこうせいいじょう}ならどなたでもOK", cn: "高中生以上任何人均可", en: "Anyone of high-school age or older is welcome" },
							{ jp: "{月曜日|げつようび}から{金曜日|きんようび}（{週|しゅう}に{何日|なんにち}でもかまいません。）", cn: "周一至周五（一周来几天都可以。）", en: "Monday through Friday (any number of days a week is fine)" },
							{ jp: "{午後|ごご}1{時|じ}から5{時|じ}までの{間|あいだ}の{可能|かのう}な2{時間|じかん}ほど", cn: "下午 1 点到 5 点之间，方便的时段约 2 小时", en: "About two hours at a time that works for you, between 1:00 p.m. and 5:00 p.m." },
						],
					},
					{ type: "line", jp: "やすらぎホーム（たから{市民病院|しみんびょういん}となり）", cn: "安逸之家（宝市民医院隔壁）", en: "Yasuragi Home (next to Takara Municipal Hospital)", align: "right" },
					{ type: "line", jp: "0220−38−××××", cn: "0220−38−××××", en: "0220-38-××××", align: "right" },
				],
				footnotes: [
					{
						marker: "※1",
						term: "ボランティア",
						jp: "社会事業などにお礼の品やお金をもらわずに働く人、volunteer",
						cn: "志愿者（不收取报酬或谢礼而从事社会公益工作的人）",
						en: "a volunteer (someone who works for a social cause without pay or gifts)",
					},
					{ marker: "※2", term: "特技", jp: "得意なこと", cn: "拿手本领、特长", en: "a special skill; something you are good at" },
					{ marker: "※3", term: "体験", jp: "実際に自分が経験すること", cn: "亲身经历、体验", en: "an experience you have yourself" },
				],
				questions: [
					{
						label: "3",
						jp: "この{募集|ぼしゅう}の{内容|ないよう}と{合|あ}っているものはどれか。",
						cn: "下列哪一项与这则招募启事的内容相符？",
						en: "Which of the following matches the content of this call for volunteers?",
						choices: [
							{ jp: "{歌|うた}だけでなく、{楽器|がっき}もできる{音楽家|おんがくか}だけを{募集|ぼしゅう}している。", cn: "只招募既会唱歌又会乐器的音乐家。", en: "They are only looking for musicians who can both sing and play an instrument." },
							{ jp: "{高校生|こうこうせい}のボランティアは{受|う}け{付|つ}けていない。", cn: "不接受高中生做志愿者。", en: "They do not accept high-school volunteers." },
							{ jp: "{老人|ろうじん}たちによる{講演会|こうえんかい}に{参加|さんか}する{人|ひと}を{募集|ぼしゅう}している。", cn: "招募参加由老人们举办的演讲会的人。", en: "They are looking for people to attend a lecture given by the older residents." },
							{ jp: "{曜日|ようび}や{時間|じかん}は、{決|き}まった{範囲内|はんいない}で{相談|そうだん}して{決|き}めることができる。", cn: "星期几和时间可以在规定范围内商量决定。", en: "The day of the week and the hours can be decided by discussion within a set range." },
						],
						answer: 4,
						explanation:
							"启事最后三条写着「月曜日から金曜日（週に何日でもかまいません。）」「午後1時から5時までの間の可能な2時間ほど」——星期在周一到周五之间、时间在 13 点到 17 点之间，具体来几天、来哪两个小时可以自己安排。这正是「决まった範囲内で相談して決める」，4 正确。",
						explanationEn:
							"The last three lines say “Monday through Friday (any number of days a week is fine)” and “about two hours at a time that works for you, between 1:00 p.m. and 5:00 p.m.” The day is within Mon–Fri and the time is within 13:00–17:00; how many days and which two hours you choose can be arranged. That is “decided by discussion within a set range,” so 4 is correct.",
						choiceNotes: [
							"「楽器でなくても、なにか特技があれば」——不会乐器也可以，并不限于音乐家。",
							"「高校生以上ならどなたでもOK」——高中生是可以的。",
							"招募的是陪老人玩、唱歌的志愿者，不是参加演讲会的人。",
							"正确。周一〜周五、13:00〜17:00 这个范围内可自行安排。",
						],
						choiceNotesEn: [
							"“Even if it is not an instrument, if you have a special skill” — you don’t need to play an instrument, and they are not limited to musicians.",
							"“Anyone of high-school age or older is welcome” — high school students are accepted.",
							"They want volunteers to play and sing with the residents, not people to attend a lecture.",
							"Correct. You can arrange days and times within Mon–Fri, 13:00–17:00.",
						],
					},
					{
						label: "4",
						jp: "{何|なに}が「いい{体験|たいけん}」になるか。",
						cn: "什么会成为「很好的体验」？",
						en: "What will be a “good experience”?",
						choices: [
							{ jp: "ボランティアを{募集|ぼしゅう}すること", cn: "招募志愿者这件事", en: "Calling for volunteers" },
							{ jp: "やすらぎホームに{応募|おうぼ}すること", cn: "向安逸之家报名这件事", en: "Applying to Yasuragi Home" },
							{ jp: "やすらぎホームでボランティアをすること", cn: "在安逸之家做志愿者这件事", en: "Volunteering at Yasuragi Home" },
							{ jp: "お{年寄|としよ}りと{人生|じんせい}の{勉強|べんきょう}をすること", cn: "和老人一起学习人生这件事", en: "Studying life together with the older people" },
						],
						answer: 3,
						explanation:
							"「きっとあなたにとっていい体験になるでしょう」的「あなた」指的是读启事的应募者。前一句说「お年寄りとの話は、興味深く、人生の勉強になることも多いです」，也就是说在这里做志愿者、和老人交流的整个过程会成为好体验。所以 3 正确。指示词、代词指的是什么，是读解的常考点。",
						explanationEn:
							"In “it will surely be a good experience for you,” anata is the person reading the notice and thinking of applying. The sentence before says talking with older people is fascinating and often becomes a lesson in life—so the whole process of volunteering here and talking with the residents is the good experience. 3 is correct. What a pronoun refers to is a common reading-test point.",
						choiceNotes: [
							"招募的是养老院一方，不是「あなた」做的事。",
							"报名只是第一步，成为好体验的是实际做志愿者的经历。",
							"正确。在安逸之家做志愿者、和老人相处的经历。",
							"「人生の勉強になる」是结果，不是和老人一起去学习人生；选项的意思与原文不符。",
						],
						choiceNotesEn: [
							"Recruiting is what the home does, not what “you” do.",
							"Applying is only the first step; the good experience is actually volunteering.",
							"Correct. The experience of volunteering at Yasuragi Home and spending time with the older residents.",
							"“Becomes a lesson in life” is a result, not “studying life together with the older people”; the option does not match the original.",
						],
					},
				],
			},
		],
	},

	vocab: [
		{ jp: "予約限定", kana: "よやくげんてい", cn: "仅限预订", en: "reservations only", pos: "名詞" },
		{ jp: "お得", kana: "おとく", cn: "划算、优惠", en: "a good deal; a bargain", pos: "な形" },
		{ jp: "預ける", kana: "あずける", cn: "寄存、托付", en: "to leave (luggage) in someone’s care", pos: "動詞" },
		{ jp: "最適", kana: "さいてき", cn: "最合适", en: "ideal; most suitable", pos: "な形" },
		{ jp: "禁煙", kana: "きんえん", cn: "禁烟、无烟", en: "no smoking; non-smoking", pos: "名詞" },
		{ jp: "接続", kana: "せつぞく", cn: "连接", en: "connection; to connect", pos: "名詞・動詞" },
		{ jp: "到着", kana: "とうちゃく", cn: "到达", en: "arrival", pos: "名詞・動詞" },
		{ jp: "手荷物", kana: "てにもつ", cn: "随身行李", en: "hand luggage", pos: "名詞" },
		{ jp: "取り扱う", kana: "とりあつかう", cn: "处理、对待", en: "to handle; to treat as", pos: "動詞" },
		{ jp: "泊まる", kana: "とまる", cn: "住宿、过夜", en: "to stay (overnight)", pos: "動詞" },
		{ jp: "〜泊", kana: "はく", cn: "住……晚", en: "… nights (stay)", pos: "助数詞" },
		{ jp: "申し込む", kana: "もうしこむ", cn: "申请、报名", en: "to apply; to book", pos: "動詞" },
		{ jp: "施設", kana: "しせつ", cn: "设施、机构", en: "facility; institution", pos: "名詞" },
		{ jp: "お年寄り", kana: "おとしより", cn: "老人", en: "older people; the elderly", pos: "名詞" },
		{ jp: "楽器", kana: "がっき", cn: "乐器", en: "musical instrument", pos: "名詞" },
		{ jp: "特技", kana: "とくぎ", cn: "特长、拿手本领", en: "a special skill", pos: "名詞" },
		{ jp: "活用する", kana: "かつようする", cn: "灵活运用", en: "to make use of; to put to use", pos: "動詞" },
		{ jp: "興味深い", kana: "きょうみぶかい", cn: "很有意思、耐人寻味", en: "fascinating; of great interest", pos: "い形" },
		{ jp: "体験", kana: "たいけん", cn: "体验、亲身经历", en: "experience", pos: "名詞・動詞" },
		{ jp: "範囲", kana: "はんい", cn: "范围", en: "range; scope", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜以下（いか）／〜以上（いじょう）",
			meaning: "含本数。「6 歳以下」包含 6 岁，「高校生以上」包含高中生。本次实战题两处都考到了。",
			meaningEn: "Includes the number itself. 6-sai ika includes age 6; kōkōsei ijō includes high school students. Both appear in this practice set.",
			example: { jp: "{子|こ}ども{料金|りょうきん}…6{歳以下|さいいか}のみ10%{割引|わりびき}", cn: "儿童价…仅限 6 岁以下打 9 折", en: "Child rate… 10% off for ages 6 and under only" },
		},
		{
			pattern: "〜のみ",
			formation: "名詞 ＋ のみ",
			meaning: "只、仅。「だけ」的书面语形式。",
			meaningEn: "only. The written form of dake.",
			example: { jp: "6{歳以下|さいいか}のみ10%{割引|わりびき}", cn: "仅限 6 岁以下打 9 折", en: "10% off for ages 6 and under only" },
		},
		{
			pattern: "〜として{取|と}り{扱|あつか}われる",
			meaning: "被当作……处理。被动＋书面语，通知、条款里常见。",
			meaningEn: "to be treated as…. Passive + written style, common in notices and terms.",
			example: {
				jp: "キャンセルとして{取|と}り{扱|あつか}われることがございます。",
				cn: "有可能被视为取消预订。",
				en: "It may be treated as a cancellation.",
			},
		},
		{
			pattern: "〜ことがございます",
			meaning: "「〜ことがあります」的郑重说法，表示有时会发生某种情况。",
			meaningEn: "A polite form of koto ga arimasu. It means a situation may sometimes occur.",
			example: { jp: "{取|と}り{扱|あつか}われることがございます。", cn: "有时会被那样处理。", en: "It may sometimes be handled that way." },
		},
		{
			pattern: "お〜いたします／お〜する（謙譲語）",
			meaning: "自谦语，服务业对顾客说话时使用。",
			meaningEn: "Humble language, used by service staff when speaking to customers.",
			example: { jp: "{手荷物|てにもつ}をフロントにてお{預|あず}かりいたします。", cn: "我们会在前台为您保管随身行李。", en: "We will look after your hand luggage at the front desk." },
		},
		{
			pattern: "〜てくださる",
			meaning: "「〜てくれる」的尊敬语，表示对方为我方做某事。",
			meaningEn: "The honorific of te kureru. The other person does something for us.",
			example: { jp: "{歌|うた}を{歌|うた}って{下|くだ}さるボランティア", cn: "愿意（为我们）唱歌的志愿者", en: "volunteers who will (kindly) sing for us" },
		},
		{
			pattern: "〜でもかまいません",
			meaning: "……也没关系、都可以。表示宽松的条件。",
			meaningEn: "… is also fine / it doesn’t matter. A loose condition.",
			example: { jp: "{週|しゅう}に{何日|なんにち}でもかまいません。", cn: "一周来几天都可以。", en: "Any number of days a week is fine." },
		},
		{
			pattern: "〜にとって",
			formation: "名詞 ＋ にとって",
			meaning: "对……来说。表示评价的立场。",
			meaningEn: "for… / from the standpoint of…. Marks whose evaluation it is.",
			example: { jp: "あなたにとっていい{体験|たいけん}になるでしょう。", cn: "对您来说一定会是很好的体验。", en: "It will surely be a good experience for you." },
		},
	],
};
