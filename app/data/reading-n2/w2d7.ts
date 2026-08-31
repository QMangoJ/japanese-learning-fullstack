import type { ReadingDay } from "../reading-n3/types";

// 第2週 7日目 実戦問題 — printed pages 40–42
export const w2d7: ReadingDay = {
	week: 2,
	day: 7,
	label: "実戦問題",
	labelKana: "じっせんもんだい",
	labelEn: "Practice Exercise",
	printedPages: [40, 41, 42],
	answerSource: "book",

	practice: {
		timeLimitMinutes: 15,
		scoring: "1問25点×4問／100点",
		groups: [
			{
				label: "問題1",
				instruction:
					"{次|つぎ}の2つの{文書|ぶんしょ}はどちらも{市民講座|しみんこうざ}の{案内|あんない}である。{読|よ}んで、{下|した}の{問|と}いに{対|たい}する{答|こた}えとして{最|もっと}もよいものを1・2・3・4から{一|ひと}つ{選|えら}びなさい。",
				instructionCn:
					"下面两份文书都是市民讲座的介绍。阅读后，从 1・2・3・4 中选出对下面问题最合适的一个答案。",
				instructionEn:
					"The two documents below are both information about civic courses. Read them and choose the best answer to the questions from 1, 2, 3, or 4.",
				blocks: [
					{
						type: "title",
						jp: "{空手教室|からてきょうしつ}のご{案内|あんない}",
						cn: "空手道教室介绍",
						en: "Information on the karate class",
					},
					{
						type: "figure",
						alt: "空手着の子どもと、突きのポーズをしている人のイラスト",
						cn: "穿着空手道服的孩子和摆出击打姿势的人的插图",
						en: "Illustrations of a child in a karate gi and a person in a punching pose",
					},
					{
						type: "paragraph",
						jp: "{子|こ}どもから{大人|おとな}まで、{礼儀|れいぎ}を{身|み}に{付|つ}け、{仲間|なかま}づくりをしながら{心|こころ}と{体|からだ}を{強|つよ}くします。お{年寄|としよ}りの{健康維持|けんこういじ}、{女性|じょせい}の{護身術|ごしんじゅつ}（{注|ちゅう}）としてもお{勧|すす}めします。{皆|みな}で{楽|たの}しみながら{一生懸命|いっしょうけんめい}{稽古|けいこ}しています！　{私達|わたしたち}といっしょに{汗|あせ}を{流|なが}しませんか？",
						cn: "从孩子到大人，在养成礼仪、结交伙伴的同时强健身心。也推荐作为老人的健康维持、女性的防身术（注）。大家一边享受一边拼命练习！要不要和我们一起流汗？",
						en: "From children to adults, we build manners and friendships while strengthening mind and body. We also recommend it for older people’s health and as self-defense for women (note). We train hard and have fun! Won’t you sweat with us?",
					},
					{
						type: "list",
						marker: "❖",
						items: [
							{
								jp: "{稽古日時|けいこにちじ}……　（{小学生|しょうがくせい}）{毎週|まいしゅう}{火|か}・{木曜日|もくようび}　16:00〜17:15　※{稽古|けいこ}には{何回|なんかい}でも{参加|さんか}できます。（{中学生以上|ちゅうがくせいいじょう}）{毎週水曜日|まいしゅうすいようび}　19:00〜20:30",
								cn: "练习时间……（小学生）每周二、周四 16:00〜17:15　※练习来几次都可以。（中学生以上）每周三 19:00〜20:30",
								en: "Practice times… (elementary) every Tuesday and Thursday 16:00–17:15. ※ You may attend as many sessions as you like. (junior high and up) every Wednesday 19:00–20:30",
							},
							{
								jp: "{稽古場所|けいこばしょ}……　みどり{市|し}{体育館|たいいくかん}　トレーニングルーム",
								cn: "练习地点……绿市体育馆　训练室",
								en: "Place… Midori City Gymnasium, training room",
							},
							{
								jp: "{参加資格|さんかしかく}……　{小学生以上|しょうがくせいいじょう}",
								cn: "参加资格……小学生以上",
								en: "Eligibility… elementary-school age and above",
							},
						],
					},
					{
						type: "table",
						caption: { jp: "{会費|かいひ}", cn: "会费", en: "Fees" },
						rows: [
							[
								{ jp: "{入会金|にゅうかいきん}", cn: "入会费", en: "Enrollment fee", header: true },
								{ jp: "{無料|むりょう}", cn: "免费", en: "free", colSpan: 2 },
							],
							[
								{ jp: "{月会費|つきかいひ}（スポーツ{保険料|ほけんりょう}{含|ふく}む）", cn: "月会费（含运动保险费）", en: "Monthly fee (sports insurance included)", header: true, rowSpan: 3 },
								{ jp: "{小学生|しょうがくせい}", cn: "小学生", en: "elementary" },
								{ jp: "2,000{円|えん}", cn: "2,000 日元", en: "¥2,000" },
							],
							[
								{ jp: "{中学|ちゅうがく}・{高校生|こうこうせい}", cn: "初中・高中生", en: "junior / senior high" },
								{ jp: "2,500{円|えん}", cn: "2,500 日元", en: "¥2,500" },
							],
							[
								{ jp: "{大学生|だいがくせい}・{一般|いっぱん}", cn: "大学生・一般", en: "university / adult" },
								{ jp: "3,000{円|えん}", cn: "3,000 日元", en: "¥3,000" },
							],
						],
					},
					{
						type: "note",
						jp: "※{必要|ひつよう}な{用具|ようぐ}は{貸|か}し{出|だ}します。{購入|こうにゅう}も{実費|じっぴ}で{可能|かのう}です。",
						cn: "※所需用具可以出借。也可以按成本价购买。",
						en: "※ Needed equipment can be borrowed. Purchase at cost is also possible.",
					},
					{
						type: "note",
						jp: "※{見学|けんがく}はいつでもOKです。ぜひ{一度|いちど}{見学|けんがく}にいらしてください。",
						cn: "※随时可以观摩。请务必来观摩一次。",
						en: "※ Observation is always welcome. Please come and watch a session.",
					},
					{
						type: "line",
						jp: "{指導員|しどういん}：{大友|おおとも}　{修三|しゅうぞう}",
						cn: "指导员：大友　修三",
						en: "Instructor: Ōtomo Shūzō",
						align: "right",
					},
					{
						type: "title",
						jp: "やさしいヨガ{講座|こうざ}",
						cn: "轻松瑜伽讲座",
						en: "Easy yoga course",
						sub: { jp: "— {開講|かいこう}のご{案内|あんない} —", cn: "— 开课介绍 —", en: "— Course opening information —" },
					},
					{
						type: "figure",
						alt: "あぐらをかいて両手を合わせている女性のイラスト",
						cn: "盘腿双手合十的女性插图",
						en: "Illustration of a woman sitting cross-legged with her palms together",
					},
					{
						type: "paragraph",
						jp: "ヨガのゆったりとした{呼吸|こきゅう}で{心|こころ}と{体|からだ}をリフレッシュ！",
						cn: "用瑜伽舒缓的呼吸给身心充电！",
						en: "Refresh mind and body with yoga’s easy breathing!",
					},
					{
						type: "paragraph",
						jp: "{忙|いそが}しい{毎日|まいにち}の{中|なか}で{心|こころ}や{体|からだ}が{疲|つか}れていませんか？",
						cn: "忙碌的每一天里，身心是不是累了？",
						en: "Are your mind and body tired from busy days?",
					},
					{
						type: "paragraph",
						jp: "{生活習慣|せいかつしゅうかん}で{体|からだ}が{曲|ま}がったり、ずれたりしていませんか？",
						cn: "生活习惯是不是让身体歪了、错位了？",
						en: "Has daily habit left your body bent or out of line?",
					},
					{
						type: "paragraph",
						jp: "そんな{体|からだ}のゆがみを{直|なお}して、{体調|たいちょう}をよくする{効果|こうか}もあります。",
						cn: "纠正这种身体的歪斜，也有改善身体状况的效果。",
						en: "Straightening that distortion can also improve how you feel.",
					},
					{
						type: "paragraph",
						jp: "もちろんシェイプアップ{効果|こうか}も{期待|きたい}できます。",
						cn: "当然也可以期待塑形效果。",
						en: "You can of course also expect a slimming effect.",
					},
					{
						type: "paragraph",
						jp: "あなたも{楽|たの}しみながらヨガを{始|はじ}めてみませんか？",
						cn: "您也来一边享受一边开始瑜伽吧？",
						en: "Won’t you start yoga too, and enjoy it?",
					},
					{
						type: "list",
						marker: "●",
						items: [
							{
								jp: "{日時|にちじ}　20XX{年|ねん}5{月|がつ}・6{月|がつ}の{毎週木曜日|まいしゅうもくようび}（{計|けい}8{回|かい}）　PM6:30〜7:30",
								cn: "日期时间　20XX 年 5 月・6 月每周四（共 8 次）　下午 6:30〜7:30",
								en: "When  every Thursday in May and June 20XX (8 sessions in all)  6:30–7:30 p.m.",
							},
							{
								jp: "{会場|かいじょう}　みどり{市|し}　{寺下公民館|てらしたこうみんかん}",
								cn: "会场　绿市　寺下公民馆",
								en: "Venue  Terashita Civic Hall, Midori City",
							},
							{
								jp: "{受講料|じゅこうりょう}　1{人|にん}あたり 3,000{円|えん}（{全|ぜん}8{回分|かいぶん}、{初回全額納入|しょかいぜんがくのうにゅう}）",
								cn: "听讲费　每人 3,000 日元（8 次全部，第一次全额缴纳）",
								en: "Fee  ¥3,000 per person (for all 8 sessions; paid in full at the first meeting)",
							},
							{
								jp: "{参加資格|さんかしかく}　みどり{市|し}にお{住|す}まい・またはお{勤|つと}めの18{歳以上|さいいじょう}の{方|かた}",
								cn: "参加资格　在绿市居住或上班、18 岁以上的人",
								en: "Eligibility  residents of, or people who work in, Midori City, aged 18 or over",
							},
							{
								jp: "{募集人数|ぼしゅうにんずう}　20{人|にん}（{応募者多数|おうぼしゃたすう}の{場合|ばあい}、{先着順|せんちゃくじゅん}）",
								cn: "招募人数　20 人（报名过多时按先到先得）",
								en: "Places  20 (first come, first served if there are many applicants)",
							},
							{
								jp: "{講師|こうし}　ビバシャ・シェラワト{先生|せんせい}",
								cn: "讲师　比瓦夏・谢拉瓦托老师",
								en: "Instructor  Ms. Vivasha Sherawat",
							},
							{
								jp: "{申込締切|もうしこみしめきり}　4{月|がつ}20{日|にち}（{火|か}）",
								cn: "报名截止　4 月 20 日（周二）",
								en: "Application deadline  April 20 (Tue)",
							},
						],
					},
					{
						type: "line",
						jp: "お{申|もう}し{込|こ}みは{寺下公民館|てらしたこうみんかん}（XX-XXXX）まで。",
						cn: "请到寺下公民馆（XX-XXXX）报名。",
						en: "Apply at Terashita Civic Hall (XX-XXXX).",
					},
				],
				footnotes: [
					{
						marker: "（注）",
						term: "護身術",
						jp: "ごしんじゅつ",
						cn: "防身术：保护身体和生命免受危险的技术",
						en: "self-defense: techniques for protecting body and life from danger",
					},
				],
				questions: [
					{
						label: "1",
						jp: "{小学生|しょうがくせい}が{週|しゅう}に2{回|かい}ずつ{空手|からて}の{稽古|けいこ}に{通|かよ}う{場合|ばあい}、{毎月|まいつき}{払|はら}うお{金|かね}はいくらになるか。",
						cn: "小学生每周去练两次空手道时，每月要付多少钱？",
						en: "If an elementary-school child goes to karate practice twice a week, how much is paid each month?",
						choices: [
							{ jp: "1,000{円|えん}", cn: "1,000 日元", en: "¥1,000" },
							{ jp: "2,000{円|えん}", cn: "2,000 日元", en: "¥2,000" },
							{ jp: "3,000{円|えん}", cn: "3,000 日元", en: "¥3,000" },
							{ jp: "4,000{円|えん}", cn: "4,000 日元", en: "¥4,000" },
						],
						answer: 2,
						explanation:
							"入会金免费。小学生月会费是 2,000 日元（含保险），并且写着「稽古には何回でも参加できます」——一周去两次也不另外加钱。所以每月仍是 2,000 日元。选 2。若把两次课各算 2,000 就会误选 4,000；3,000 是大学生・一般的月费。",
						explanationEn:
							"Enrollment is free. The elementary monthly fee is ¥2,000 (insurance included), and the notice says you may attend as many sessions as you like—so twice a week still costs ¥2,000 a month. 2 is correct. Doubling 2,000 for two sessions a week would wrongly give 4,000; 3,000 is the university/adult rate.",
						choiceNotes: [
							"没有半价或减半的规定。",
							"正确。小学生月会费定额 2,000 日元，来几次都一样。",
							"3,000 是大学生・一般的月费，不是小学生。",
							"误把「一周两次」乘成两份月费。月费是定额，入会金又免费。",
						],
						choiceNotesEn: [
							"There is no half-price rule.",
							"Correct. The elementary monthly fee is a flat ¥2,000 no matter how often you come.",
							"¥3,000 is the university/adult monthly fee, not elementary.",
							"A trap if you multiply by two sessions a week. The monthly fee is flat, and enrollment is free.",
						],
					},
					{
						label: "2",
						jp: "みどり{市|し}のスーパーで{働|はたら}いている62{歳|さい}の{女性|じょせい}が{習|なら}うことができるのはどれか。",
						cn: "在绿市超市工作的 62 岁女性能够学的是哪一项？",
						en: "Which can a 62-year-old woman who works at a supermarket in Midori City take up?",
						choices: [
							{ jp: "{空手|からて}だけ", cn: "只有空手道", en: "karate only" },
							{ jp: "ヨガだけ", cn: "只有瑜伽", en: "yoga only" },
							{ jp: "{空手|からて}とヨガ", cn: "空手道和瑜伽", en: "karate and yoga" },
							{ jp: "どちらも{習|なら}えない", cn: "两个都不能学", en: "neither" },
						],
						answer: 3,
						explanation:
							"空手：参加资格「小学生以上」，并写着推荐给老人保健和女性防身，中学生以上的课在每周三晚上，62 岁女性可以。瑜伽：资格是「みどり市にお住まい・またはお勤めの18歳以上の方」。她在绿市超市上班＝お勤め，且已满 18 岁。两边都能学，选 3。",
						explanationEn:
							"Karate: eligibility is elementary age and up, and it is recommended for older people’s health and women’s self-defense; the adult class is Wednesday evening, so a 62-year-old woman can join. Yoga: eligibility is residents of, or people who work in, Midori City, aged 18+. She works at a supermarket in Midori City, so she is employed there, and she is over 18. She can do both. 3 is correct.",
						choiceNotes: [
							"空手可以，但瑜伽也符合「绿市上班、18 岁以上」。",
							"瑜伽可以，但空手也不限年龄上限。",
							"正确。两门的资格她都满足。",
							"两门都没有把 62 岁或超市职员排除在外。",
						],
						choiceNotesEn: [
							"Karate is possible, but yoga also fits “works in Midori City, 18+.”",
							"Yoga is possible, but karate has no upper age limit.",
							"Correct. She meets the conditions for both.",
							"Neither class bars a 62-year-old supermarket worker.",
						],
					},
				],
			},
			{
				label: "問題2",
				instruction:
					"{次|つぎ}の{文書|ぶんしょ}を{読|よ}んで、{後|あと}の{問|と}いに{対|たい}する{答|こた}えとして{最|もっと}もよいものを1・2・3・4から{一|ひと}つ{選|えら}びなさい。",
				instructionCn: "阅读下面的文书，从 1・2・3・4 中选出对后面问题最合适的一个答案。",
				instructionEn: "Read the following document and choose the best answer to the questions from 1, 2, 3, or 4.",
				blocks: [
					{
						type: "line",
						jp: "{平成|へいせい}XX{年|ねん}10{月|がつ}10{日|にち}",
						cn: "平成 XX 年 10 月 10 日",
						en: "October 10, Heisei XX",
						align: "right",
					},
					{
						type: "line",
						jp: "{会員|かいいん} No. 1003412",
						cn: "会员编号 1003412",
						en: "Member No. 1003412",
					},
					{
						type: "line",
						jp: "{田中|たなか}まき　{様|さま}",
						cn: "田中真希 女士",
						en: "Ms. Tanaka Maki",
					},
					{
						type: "line",
						jp: "グリーンサポートクラブ",
						cn: "绿色支持俱乐部",
						en: "Green Support Club",
						align: "right",
					},
					{
						type: "line",
						jp: "{会計|かいけい}　{山下|やました}　{太郎|たろう}（{印|いん}）",
						cn: "会计　山下　太郎（印）",
						en: "Treasurer  Yamashita Tarō (seal)",
						align: "right",
					},
					{
						type: "line",
						jp: "{電話|でんわ} ***-****-****",
						cn: "电话 ***-****-****",
						en: "Tel. ***-****-****",
						align: "right",
					},
					{
						type: "title",
						jp: "{会費納入|かいひのうにゅう}のお願い",
						cn: "请缴纳会费",
						en: "Request for payment of membership dues",
					},
					{
						type: "line",
						jp: "{前略|ぜんりゃく}",
						cn: "前略",
						en: "I omit the usual greetings",
					},
					{
						type: "paragraph",
						jp: "{早速|さっそく}ですが、{以前|いぜん}より{数回|すうかい}にわたりご{通知|つうち}しておりますとおり、{平成|へいせい}2X{年度|ねんど}の{会費|かいひ}が{期限|きげん}の3{月末|がつまつ}から6{ヵ月|かげつ}も{未納|みのう}のままとなっております。",
						cn: "恕我直入正题：正如此前已多次通知，平成 2X 年度会费自期限 3 月底起已有 6 个月未缴。",
						en: "To come straight to the point: as we have notified you several times already, the Heisei 2X membership dues have now been unpaid for six months since the deadline at the end of March.",
					},
					{
						type: "paragraph",
						jp: "つきましては、{今月|こんげつ}{末日|まつじつ}までにお{振|ふ}り{込|こ}みいただきますようお{願|ねが}いいたします。",
						cn: "因此，请于本月月底之前汇入。",
						en: "We therefore ask that you transfer the payment by the last day of this month.",
					},
					{
						type: "paragraph",
						jp: "{期限|きげん}までにお{支払|しはら}いがない{場合|ばあい}、{会員規約|かいいんきやく}（{注|ちゅう}1）9{条|じょう}に{基|もと}づき、{除名|じょめい}の{措置|そち}を{取|と}らせていただきます（{注|ちゅう}2）ので、ご{了承|りょうしょう}ください。",
						cn: "若期限前仍未支付，将根据会员章程（注1）第 9 条采取除名措施（注2），敬请谅解。",
						en: "If payment is not made by the deadline, we will take steps to remove you from membership (note 2) in accordance with Article 9 of the membership regulations (note 1). Please understand.",
					},
					{
						type: "paragraph",
						jp: "{万一|まんいち}{本状|ほんじょう}と{行|い}き{違|ちが}いでお{支払|しはら}いの{場合|ばあい}、{失礼|しつれい}をお{詫|わ}び{申|もう}し{上|あ}げます。",
						cn: "万一此信与您的付款交错，失礼之处敬请见谅。",
						en: "If this letter has crossed with a payment, we apologize for the discourtesy.",
					},
				],
				footnotes: [
					{ marker: "（注1）", term: "規約", jp: "きやく", cn: "章程、规定、约定事项", en: "rules; an agreement" },
					{ marker: "（注2）", term: "除名の措置を取る", jp: "じょめいのそちをとる", cn: "采取除名措施＝让其退会、开除会籍", en: "to take steps to remove someone from the association" },
				],
				questions: [
					{
						label: "3",
						jp: "この{文書|ぶんしょ}について{正|ただ}しいものはどれか。",
						cn: "关于这份文书，正确的是哪一项？",
						en: "Which of the following is true of this document?",
						choices: [
							{ jp: "{会費納入|かいひのうにゅう}のお願いという{通知|つうち}は{初|はじ}めて{来|き}た。", cn: "「请缴纳会费」这种通知是第一次寄来。", en: "This is the first time a request to pay dues has been sent." },
							{ jp: "この{人|ひと}は3{ヵ月分|かげつぶん}の{会費|かいひ}が{未納|みのう}になっている。", cn: "这个人有 3 个月的会费未缴。", en: "This person is three months behind on dues." },
							{ jp: "このまま{会費|かいひ}を{払|はら}わなければ{会員|かいいん}ではなくなる。", cn: "如果继续不缴会费，就会失去会员资格。", en: "If the dues are not paid, this person will cease to be a member." },
							{ jp: "{会員|かいいん}は{会費|かいひ}を{毎月|まいつき}{払|はら}わなければならない。", cn: "会员必须每月缴会费。", en: "Members must pay dues every month." },
						],
						answer: 3,
						explanation:
							"「除名の措置を取る」注解说「会をやめさせる」。期限前再不付就会被除名，不再是会员。3 正确。1：开头写「以前より数回にわたりご通知しております」——不是第一次。2：是「3月末から6ヵ月も未納」，不是 3 个月。4：写的是「平成2X年度の会費」「期限の3月末」，是年度会费，不是每月缴纳。别册还提示「早速ですが」表示马上进入正题，以及「会員規約9条に基づき」。",
						explanationEn:
							"The note on “take steps to remove you from membership” is “make them leave the association.” If they still do not pay by the deadline they will no longer be members. 3 is correct. 1: the opening says “as we have notified you several times already”—not the first time. 2: it is six months unpaid since the end of March, not three. 4: it is “Heisei 2X annual dues” with a deadline at the end of March, not a monthly fee. The booklet also flags “to come straight to the point” and “in accordance with Article 9.”",
						choiceNotes: [
							"「数回にわたりご通知しております」——已经通知过多次，不是第一次。",
							"未缴是 6 个月，不是 3 个月。",
							"正确。不付就会按章程除名，不再是会员。",
							"这是年度会费，期限在 3 月底，不是每月都要付。",
						],
						choiceNotesEn: [
							"“We have notified you several times already”—this is not the first notice.",
							"The arrears are six months, not three.",
							"Correct. Non-payment leads to removal from membership under the rules.",
							"These are annual dues due at the end of March, not a monthly charge.",
						],
					},
					{
						label: "4",
						jp: "この{文書|ぶんしょ}を{受|う}け{取|と}った{後|あと}、{会費|かいひ}はいつまでに{払|はら}わなければならないか。",
						cn: "收到这份文书之后，会费必须在什么时候以前付清？",
						en: "After receiving this document, by when must the dues be paid?",
						choices: [
							{ jp: "10{月|がつ}10{日|にち}", cn: "10 月 10 日", en: "October 10" },
							{ jp: "10{月|がつ}31{日|にち}", cn: "10 月 31 日", en: "October 31" },
							{ jp: "11{月|がつ}10{日|にち}", cn: "11 月 10 日", en: "November 10" },
							{ jp: "11{月|がつ}30{日|にち}", cn: "11 月 30 日", en: "November 30" },
						],
						answer: 2,
						explanation:
							"正文写「今月末日までにお振込みください」。信的右上是平成 XX 年 10 月 10 日，所以「今月」是 10 月，月末日是 10 月 31 日。选 2。别册：*「今月末日」までとある。「今月」は10月。右上に書いてある。",
						explanationEn:
							"The body says “please transfer the payment by the last day of this month.” The letter is dated October 10, Heisei XX at top right, so “this month” is October, and the last day is October 31. 2 is correct. The booklet: it says “by the last day of this month”; “this month” is October, written at top right.",
						choiceNotes: [
							"10 月 10 日是这封信的日期，不是付款期限。",
							"正确。今月末日＝10 月 31 日。",
							"没有从收信日起再算一个月的规定。",
							"今月是 10 月，不是 11 月。",
						],
						choiceNotesEn: [
							"October 10 is the date of the letter, not the payment deadline.",
							"Correct. The last day of this month = October 31.",
							"Nothing says “one month from receipt.”",
							"“This month” is October, not November.",
						],
					},
				],
			},
		],
	},

	vocab: [
		{ jp: "市民講座", kana: "しみんこうざ", cn: "市民讲座", en: "a civic course", pos: "名詞" },
		{ jp: "空手", kana: "からて", cn: "空手道", en: "karate", pos: "名詞" },
		{ jp: "稽古", kana: "けいこ", cn: "练习、练功", en: "practice; training", pos: "名詞・動詞" },
		{ jp: "礼儀", kana: "れいぎ", cn: "礼仪", en: "manners; etiquette", pos: "名詞" },
		{ jp: "護身術", kana: "ごしんじゅつ", cn: "防身术", en: "self-defense", pos: "名詞" },
		{ jp: "入会金", kana: "にゅうかいきん", cn: "入会费", en: "an enrollment fee", pos: "名詞" },
		{ jp: "月会費", kana: "つきかいひ", cn: "月会费", en: "a monthly fee", pos: "名詞" },
		{ jp: "実費", kana: "じっぴ", cn: "成本价、实际费用", en: "actual cost", pos: "名詞" },
		{ jp: "見学", kana: "けんがく", cn: "参观、观摩", en: "observing a class", pos: "名詞・動詞" },
		{ jp: "受講料", kana: "じゅこうりょう", cn: "听讲费", en: "a course fee", pos: "名詞" },
		{ jp: "先着順", kana: "せんちゃくじゅん", cn: "先到先得", en: "first come, first served", pos: "名詞" },
		{ jp: "納入", kana: "のうにゅう", cn: "缴纳", en: "payment (of dues, fees)", pos: "名詞・動詞" },
		{ jp: "未納", kana: "みのう", cn: "未缴", en: "unpaid; in arrears", pos: "名詞" },
		{ jp: "振込み", kana: "ふりこみ", cn: "汇款、转账", en: "a bank transfer", pos: "名詞" },
		{ jp: "規約", kana: "きやく", cn: "章程、规定", en: "regulations; rules", pos: "名詞" },
		{ jp: "除名", kana: "じょめい", cn: "除名、开除会籍", en: "expulsion from membership", pos: "名詞・動詞" },
		{ jp: "措置", kana: "そち", cn: "措施", en: "a measure; a step", pos: "名詞" },
		{ jp: "了承", kana: "りょうしょう", cn: "谅解、同意", en: "understanding; consent", pos: "名詞・動詞" },
		{ jp: "末日", kana: "まつじつ", cn: "最后一天、月底", en: "the last day (of the month)", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜以上",
			formation: "名詞＋以上",
			meaning: "含本数。「小学生以上」「18歳以上」都包含该基准。",
			meaningEn: "… or above. Includes the number itself: shōgakusei ijō includes elementary pupils; 18-sai ijō includes age 18.",
			example: {
				jp: "{参加資格|さんかしかく}……{小学生以上|しょうがくせいいじょう}",
				cn: "参加资格……小学生以上",
				en: "Eligibility… elementary-school age and above",
			},
		},
		{
			pattern: "〜に基づき",
			formation: "名詞＋に基づき／に基づいて",
			meaning: "根据……。书面语，通知、规章里引用条款时常用。",
			meaningEn: "on the basis of… / in accordance with…. Written style; common when citing a rule.",
			example: {
				jp: "{会員規約|かいいんきやく}9{条|じょう}に{基|もと}づき、{除名|じょめい}の{措置|そち}を{取|と}らせていただきます。",
				cn: "根据会员章程第 9 条，将采取除名措施。",
				en: "We will take steps to remove you from membership in accordance with Article 9 of the membership regulations.",
			},
		},
		{
			pattern: "早速ですが",
			meaning: "恕我直入正题。前略之后马上进入用件，省去寒暄。",
			meaningEn: "To come straight to the point. After zenryaku, the letter goes straight to business.",
			example: {
				jp: "{早速|さっそく}ですが、{以前|いぜん}より{数回|すうかい}にわたりご{通知|つうち}しておりますとおり……",
				cn: "恕我直入正题：正如此前已多次通知……",
				en: "To come straight to the point: as we have notified you several times already…",
			},
		},
		{
			pattern: "万一〜",
			formation: "万一＋の場合／万一＋普通形",
			meaning: "万一……。催款信末尾常用来照顾「其实已经付过」的情况。",
			meaningEn: "if by any chance…. Common at the end of a reminder in case payment has already been made.",
			example: {
				jp: "{万一|まんいち}{本状|ほんじょう}と{行|い}き{違|ちが}いでお{支払|しはら}いの{場合|ばあい}、{失礼|しつれい}をお{詫|わ}び{申|もう}し{上|あ}げます。",
				cn: "万一此信与您的付款交错，失礼之处敬请见谅。",
				en: "If this letter has crossed with a payment, we apologize for the discourtesy.",
			},
		},
	],
};
