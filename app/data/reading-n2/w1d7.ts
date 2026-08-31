import type { ReadingDay } from "../reading-n3/types";

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
					"{右|みぎ}のページは、「{森山駅|もりやまえき}」{周辺|しゅうへん}のホテル{情報|じょうほう}である。{下|した}の{文|ぶん}と{右|みぎ}ページを{読|よ}んで、{下|した}の{問|と}いに{対|たい}する{答|こた}えとして、{最|もっと}もよいものを1・2・3・4から{一|ひと}つ{選|えら}びなさい。",
				instructionCn:
					"右页是「森山站」周边的酒店信息。阅读下面的短文和右页，从 1・2・3・4 中选出最合适的一个作为下面问题的答案。",
				instructionEn:
					"The right-hand page is hotel information around Moriyama Station. Read the text below and the right-hand page, and choose the best answer to the questions from 1, 2, 3, or 4.",
				blocks: [
					{
						type: "paragraph",
						jp: "{田中|たなか}さん（{男性|だんせい}）は、{今週|こんしゅう}の{土曜日|どようび}（6{月|がつ}26{日|にち}）に{出張|しゅっちょう}で{一晩|ひとばん}{泊|と}まるホテルを{探|さが}しています。{夜|よる}7{時半|じはん}ごろに{森山駅|もりやまえき}に{着|つ}く{予定|よてい}なので、ホテルは{駅|えき}から{近|ちか}くて、できるだけ{安|やす}いのがいいと{考|かんが}えています。また、{朝|あさ}ごはんがついていることを{希望|きぼう}しています。",
						cn: "田中先生（男性）正在找本周六（6 月 26 日）出差住一晚的酒店。预计晚上 7 点半左右到达森山站，所以希望酒店离车站近、尽量便宜。另外希望含早餐。",
						en: "Mr. Tanaka (male) is looking for a hotel for a one-night business trip this Saturday (June 26). He is due at Moriyama Station around 7:30 p.m., so he wants somewhere close to the station and as cheap as possible. He also hopes breakfast is included.",
					},
					{
						type: "title",
						jp: "I　{森山駅周辺|もりやまえきしゅうへん} ホテル{情報|じょうほう}",
						cn: "I　森山站周边　酒店信息",
						en: "I  Hotel information around Moriyama Station",
						sub: {
							jp: "Ⓢ：シングル　Ⓣ：ツイン　※{料金|りょうきん}には{消費税|しょうひぜい}およびサービス{料金|りょうきん}が{含|ふく}まれています。",
							cn: "Ⓢ：单人房　Ⓣ：双床房　※价格含消费税及服务费。",
							en: "Ⓢ: single　Ⓣ: twin　* Rates include consumption tax and service charges.",
						},
					},
					{
						type: "table",
						rows: [
							[
								{ jp: "ホテル{名|めい}", cn: "酒店名", en: "Hotel", header: true, align: "center" },
								{ jp: "{部屋数|へやすう}", cn: "房间数", en: "Rooms", header: true, align: "center" },
								{ jp: "1{部屋|へや}ごとの{料金|りょうきん}＊", cn: "每间房价＊", en: "Rate per room*", header: true, align: "center" },
								{ jp: "チェック IN/OUT", cn: "入住/退房", en: "Check-in / out", header: true, align: "center" },
								{ jp: "{備考|びこう}（{注|ちゅう}1）", cn: "备注（注1）", en: "Notes (note 1)", header: true, align: "center" },
							],
							[
								{ jp: "A　セントラルホテルみどり{野|の}", cn: "A　中心酒店绿野", en: "A  Central Hotel Midorino", header: true },
								{ jp: "92{室|しつ}", cn: "92 间", en: "92 rooms", align: "center" },
								{ jp: "Ⓢ 5,600〜\nⓉ 9,800〜", cn: "单 5,600 起\n双 9,800 起", en: "S from 5,600\nT from 9,800", align: "center" },
								{ jp: "IN 15:00\nOUT 10:00", cn: "入住 15:00\n退房 10:00", en: "IN 15:00\nOUT 10:00", align: "center" },
								{ jp: "{森山駅徒歩|もりやまえきとほ}10{分|ふん}。ビジネス・{観光|かんこう}に{最適|さいてき}。", cn: "森山站步行 10 分钟。最适合商务・观光。", en: "10 min. on foot from Moriyama Stn. Ideal for business and sightseeing." },
							],
							[
								{ jp: "B　ホテルむらかわ", cn: "B　酒店村川", en: "B  Hotel Murakawa", header: true },
								{ jp: "46{室|しつ}", cn: "46 间", en: "46 rooms", align: "center" },
								{ jp: "Ⓢ 5,800〜\nⓉ 10,000〜", cn: "单 5,800 起\n双 10,000 起", en: "S from 5,800\nT from 10,000", align: "center" },
								{ jp: "IN 16:00\nOUT 10:00", cn: "入住 16:00\n退房 10:00", en: "IN 16:00\nOUT 10:00", align: "center" },
								{ jp: "{森山駅徒歩|もりやまえきとほ}1{分|ふん}。", cn: "森山站步行 1 分钟。", en: "1 min. on foot from Moriyama Stn." },
							],
							[
								{ jp: "C　ターミナルホテル{森山|もりやま}", cn: "C　总站酒店森山", en: "C  Terminal Hotel Moriyama", header: true },
								{ jp: "134{室|しつ}", cn: "134 间", en: "134 rooms", align: "center" },
								{ jp: "Ⓢ 6,900〜\nⓉ 12,600〜", cn: "单 6,900 起\n双 12,600 起", en: "S from 6,900\nT from 12,600", align: "center" },
								{ jp: "IN 15:00\nOUT 10:00", cn: "入住 15:00\n退房 10:00", en: "IN 15:00\nOUT 10:00", align: "center" },
								{
									jp: "{森山駅直結|もりやまえきちょっけつ}で{交通至便|こうつうしべん}。{全室無線|ぜんしつむせん}LAN{完備|かんび}。",
									cn: "与森山站直通，交通极便。全室配备无线局域网。",
									en: "Directly connected to the station with excellent access to transportation. Wi-Fi in all rooms.",
								},
							],
							[
								{ jp: "D　ホテルグリーンシティ", cn: "D　酒店绿城", en: "D  Hotel Green City", header: true },
								{ jp: "110{室|しつ}", cn: "110 间", en: "110 rooms", align: "center" },
								{ jp: "Ⓢ 7,200〜\nⓉ 13,000〜", cn: "单 7,200 起\n双 13,000 起", en: "S from 7,200\nT from 13,000", align: "center" },
								{ jp: "IN 15:00\nOUT 10:00", cn: "入住 15:00\n退房 10:00", en: "IN 15:00\nOUT 10:00", align: "center" },
								{ jp: "{森山駅徒歩|もりやまえきとほ}3{分|ふん}。ビジネスに{最適|さいてき}。", cn: "森山站步行 3 分钟。最适合商务。", en: "3 min. on foot from Moriyama Stn. Ideal for business." },
							],
						],
					},
					{
						type: "note",
						jp: "＊{宿泊施設|しゅくはくしせつ}ごとにお{得|とく}なプランもございます。{詳|くわ}しくは{各宿泊施設|かくしゅくはくしせつ}または{旅行代理店|りょこうだいりてん}にお{問|と}い{合|あ}わせください。",
						cn: "＊各住宿设施另有优惠方案。详情请向各住宿设施或旅行社咨询。",
						en: "* Each lodging also has bargain plans. For details, inquire at the lodging or a travel agency.",
					},
					{
						type: "title",
						jp: "II　{森山駅周辺|もりやまえきしゅうへん}の{宿泊情報|しゅくはくじょうほう}（プラン{別|べつ}）",
						cn: "II　森山站周边住宿信息（按方案）",
						en: "II  Lodging information around Moriyama Station (by plan)",
					},
					{
						type: "table",
						rows: [
							[
								{ jp: "ホテル{名|めい}", cn: "酒店名", en: "Hotel", header: true, align: "center" },
								{ jp: "プラン{名|めい}", cn: "方案名", en: "Plan", header: true, align: "center" },
								{ jp: "{部屋|へや}タイプ", cn: "房型", en: "Room type", header: true, align: "center" },
								{ jp: "{朝食|ちょうしょく}", cn: "早餐", en: "Breakfast", header: true, align: "center" },
								{ jp: "{料金|りょうきん}（1{泊|はく}・1{名|めい}あたり）", cn: "价格（1 晚・每人）", en: "Rate (per night, per person)", header: true, align: "center" },
							],
							[
								{ jp: "ターミナルホテル{森山|もりやま}", cn: "总站酒店森山", en: "Terminal Hotel Moriyama", header: true, rowSpan: 2 },
								{ jp: "3{連泊|れんぱく}（{注|ちゅう}2）{出張応援|しゅっちょうおうえん}プラン", cn: "连住 3 晚（注2）出差应援方案", en: "3-night (note 2) business-trip support plan" },
								{ jp: "シングル", cn: "单人", en: "Single", align: "center" },
								{ jp: "○", cn: "有", en: "Yes", align: "center" },
								{
									jp: "5,600{円|えん}\n※このプランは3{連泊以上|れんぱくいじょう}でお{申|もう}し{込|こ}みいただけます。",
									cn: "5,600 日元\n※本方案须连住 3 晚以上方可申请。",
									en: "5,600 yen\n* This plan can be booked for 3 consecutive nights or more.",
								},
							],
							[
								{ jp: "【お{日|ひ}にち{限定|げんてい}】{格安|かくやす}プラン", cn: "【限日期】超低价方案", en: "[Date-limited] budget plan" },
								{ jp: "シングル", cn: "单人", en: "Single", align: "center" },
								{ jp: "−", cn: "无", en: "No", align: "center" },
								{ jp: "4,800{円|えん}\n※6{月|がつ}22〜25{日|にち}", cn: "4,800 日元\n※6 月 22〜25 日", en: "4,800 yen\n* June 22–25" },
							],
							[
								{ jp: "セントラルホテルみどり{野|の}", cn: "中心酒店绿野", en: "Central Hotel Midorino", header: true, rowSpan: 3 },
								{ jp: "ベーシックプラン【{朝食|ちょうしょく}つき】", cn: "基础方案【含早餐】", en: "Basic plan [breakfast included]" },
								{ jp: "シングル", cn: "单人", en: "Single", align: "center" },
								{ jp: "○", cn: "有", en: "Yes", align: "center" },
								{ jp: "6,500{円|えん}", cn: "6,500 日元", en: "6,500 yen" },
							],
							[
								{ jp: "7{日前早割|にちまえばやわり}プラン", cn: "提前 7 天早鸟方案", en: "7-day-advance early-bird plan" },
								{ jp: "シングル", cn: "单人", en: "Single", align: "center" },
								{ jp: "○", cn: "有", en: "Yes", align: "center" },
								{ jp: "5,200{円|えん}", cn: "5,200 日元", en: "5,200 yen" },
							],
							[
								{ jp: "3{連泊|れんぱく}{出張応援|しゅっちょうおうえん}プラン", cn: "连住 3 晚出差应援方案", en: "3-night business-trip support plan" },
								{ jp: "シングル", cn: "单人", en: "Single", align: "center" },
								{ jp: "○", cn: "有", en: "Yes", align: "center" },
								{
									jp: "5,000{円|えん}\n※このプランは3{連泊以上|れんぱくいじょう}でお{申|もう}し{込|こ}みいただけます。",
									cn: "5,000 日元\n※本方案须连住 3 晚以上方可申请。",
									en: "5,000 yen\n* This plan can be booked for 3 consecutive nights or more.",
								},
							],
							[
								{ jp: "ホテルむらかわ", cn: "酒店村川", en: "Hotel Murakawa", header: true, rowSpan: 3 },
								{ jp: "{朝食|ちょうしょく}バイキング（{注|ちゅう}3）{付|つ}きプラン", cn: "含早餐自助（注3）方案", en: "Plan with breakfast buffet (note 3)" },
								{ jp: "シングル", cn: "单人", en: "Single", align: "center" },
								{ jp: "○", cn: "有", en: "Yes", align: "center" },
								{ jp: "5,800{円|えん}", cn: "5,800 日元", en: "5,800 yen" },
							],
							[
								{ jp: "{安|やす}さいちばん！{素泊|すど}まり（{注|ちゅう}4）プラン", cn: "最便宜！不含餐（注4）方案", en: "Cheapest! room-only (note 4) plan" },
								{ jp: "シングル", cn: "单人", en: "Single", align: "center" },
								{ jp: "−", cn: "无", en: "No", align: "center" },
								{ jp: "4,500{円|えん}", cn: "4,500 日元", en: "4,500 yen" },
							],
							[
								{ jp: "ビジネスプラン", cn: "商务方案", en: "Business plan" },
								{ jp: "シングル", cn: "单人", en: "Single", align: "center" },
								{ jp: "○", cn: "有", en: "Yes", align: "center" },
								{ jp: "5,500{円|えん}", cn: "5,500 日元", en: "5,500 yen" },
							],
							[
								{ jp: "ホテルグリーンシティ", cn: "酒店绿城", en: "Hotel Green City", header: true, rowSpan: 2 },
								{ jp: "レイトチェックインでオトクプラン", cn: "晚到入住超值方案", en: "Late-check-in bargain plan" },
								{ jp: "シングル", cn: "单人", en: "Single", align: "center" },
								{ jp: "○", cn: "有", en: "Yes", align: "center" },
								{
									jp: "5,300{円|えん}\n※18{時以降|じいこう}のチェックインの{場合|ばあい}に{限|かぎ}ります。",
									cn: "5,300 日元\n※仅限 18 点以后入住。",
									en: "5,300 yen\n* Only for check-in at 18:00 or later.",
								},
							],
							[
								{ jp: "{朝食|ちょうしょく}／マッサージサービス{付|つ}レディースプラン", cn: "含早餐／按摩服务的女士方案", en: "Ladies’ plan with breakfast / massage" },
								{ jp: "シングル", cn: "单人", en: "Single", align: "center" },
								{ jp: "○", cn: "有", en: "Yes", align: "center" },
								{ jp: "7,800{円|えん}\n※{女性限定|じょせいげんてい}です。", cn: "7,800 日元\n※仅限女性。", en: "7,800 yen\n* Women only." },
							],
						],
					},
				],
				footnotes: [
					{ marker: "（注1）", term: "備考", jp: "その他の情報", cn: "其他信息", en: "other information" },
					{ marker: "（注2）", term: "連泊", jp: "同じところに続けて泊まること", cn: "在同一处连续住宿", en: "staying several nights in a row at the same place" },
					{
						marker: "（注3）",
						term: "バイキング",
						jp: "食べ物を自分で好きなだけ皿に取ってきて食べる食事のスタイル",
						cn: "自己按喜好盛到盘子里吃的自助餐形式",
						en: "a meal style where you take as much food as you like onto your own plate",
					},
					{ marker: "（注4）", term: "素泊まり", jp: "食事なしで泊まること", cn: "不含餐住宿", en: "staying without meals" },
				],
				questions: [
					{
						label: "1",
						jp: "リストIだけを{見|み}た{場合|ばあい}、{田中|たなか}さんの{条件|じょうけん}に{最|もっと}も{合|あ}うものはどれか。",
						cn: "只看列表 I 时，最符合田中先生条件的是哪一个？",
						en: "If you look only at List I, which best matches Mr. Tanaka’s conditions?",
						choices: [
							{ jp: "A", cn: "A", en: "A" },
							{ jp: "B", cn: "B", en: "B" },
							{ jp: "C", cn: "C", en: "C" },
							{ jp: "D", cn: "D", en: "D" },
						],
						answer: 2,
						explanation:
							"列表 I 没有早餐信息，只能按「一人・单人房」「车站近」「尽量便宜」来选。7 点半到站晚于各店入住开始时间，四家都能住。A 最便宜（5,600）但步行 10 分钟；B 步行 1 分钟、5,800，只贵 200 日元；C 虽直通车站但 6,900；D 步行 3 分钟却最贵。距离和价格综合，B 最符合「駅から近くて、できるだけ安い」。别册补充 C 的备注：駅直結で交通至便＝因为直通车站，所以交通很方便；全室無線LAN完備＝所有房间均配置无线局域网。",
						explanationEn:
							"List I has no breakfast information, so choose by one person / single room, close to the station, and as cheap as possible. 7:30 p.m. is after every check-in start, so all four are possible. A is cheapest (5,600) but a 10-minute walk; B is 1 minute and 5,800, only 200 yen more; C is connected to the station but 6,900; D is 3 minutes but the most expensive. Balancing distance and price, B best matches “close and as cheap as possible.” The answer key glosses C’s notes: chokketsu de kōtsū shiben = directly connected, so access is excellent; zenshitsu musen LAN kanbi = Wi-Fi in all rooms.",
						choiceNotes: [
							"最便宜，但步行 10 分钟，不够「駅から近くて」。",
							"正确。步行 1 分钟，单人 5,800，距离和价格最平衡。",
							"直通车站但单人 6,900，明显更贵。",
							"步行 3 分钟尚可，但是四家里最贵。",
						],
						choiceNotesEn: [
							"Cheapest, but a 10-minute walk — not “close to the station.”",
							"Correct. 1 minute on foot, single from 5,800; best balance of distance and price.",
							"Connected to the station, but 6,900 for a single is clearly more expensive.",
							"3 minutes is acceptable, but it is the most expensive of the four.",
						],
					},
					{
						label: "2",
						jp: "リストIIも{見|み}た{場合|ばあい}、{田中|たなか}さんの{条件|じょうけん}に{合|あ}うものはどれか。",
						cn: "也看了列表 II 时，符合田中先生条件的是哪一个？",
						en: "If you also look at List II, which one matches Mr. Tanaka’s conditions?",
						choices: [
							{ jp: "ターミナルホテル{森山|もりやま}の「【お{日|ひ}にち{限定|げんてい}】{格安|かくやす}プラン」", cn: "总站酒店森山的「【限日期】超低价方案」", en: "Terminal Hotel Moriyama’s “[Date-limited] budget plan”" },
							{ jp: "セントラルホテルみどり{野|の}の「7{日前早割|にちまえばやわり}プラン」", cn: "中心酒店绿野的「提前 7 天早鸟方案」", en: "Central Hotel Midorino’s “7-day-advance early-bird plan”" },
							{ jp: "ホテルむらかわの「{安|やす}さいちばん！{素泊|すど}まりプラン」", cn: "酒店村川的「最便宜！不含餐方案」", en: "Hotel Murakawa’s “Cheapest! room-only plan”" },
							{ jp: "ホテルグリーンシティの「レイトチェックインでオトクプラン」", cn: "酒店绿城的「晚到入住超值方案」", en: "Hotel Green City’s “Late-check-in bargain plan”" },
						],
						answer: 4,
						explanation:
							"田中要：6 月 26 日（本周六）住 1 晚、约 19:30 到、尽量近且便宜、要早餐、男性 1 人。①格安プラン 4,800 虽便宜，但早餐「−」，且※6 月 22〜25 日，26 日不在范围内。②7 日前早割含早餐，但「今週の土曜日」已经到了这一周，提前 7 天（6 月 19 日）已经过了，而且绿野步行 10 分钟最远。③素泊まり没有早餐（注4）。④晚到入住 5,300、早餐○、※仅限 18 时以后入住——19:30 正好符合，步行 3 分钟。女士方案有女性限定，男性不能用。",
						explanationEn:
							"Tanaka needs: one night on Saturday June 26, arrival about 19:30, close and cheap, breakfast, one man. (1) The budget plan is 4,800 but breakfast is “−,” and the dates are June 22–25 — the 26th is out. (2) The 7-day early-bird includes breakfast, but “this Saturday” means it is already this week, so 7 days before (June 19) has passed, and Midorino is the farthest (10 minutes). (3) Room-only has no breakfast (note 4). (4) Late check-in 5,300, breakfast yes, only for check-in after 18:00 — 19:30 fits — and a 3-minute walk. The ladies’ plan is women-only, so he cannot use that.",
						choiceNotes: [
							"日期是 6 月 22〜25 日，26 日不能用；而且没有早餐。",
							"「7 日前」本周六已经来不及；绿野也最远。",
							"素泊まり＝不含餐，与希望早餐相反。",
							"正确。18 点以后入住、含早餐、6 月 26 日 1 晚可用。",
						],
						choiceNotesEn: [
							"Dates are June 22–25, so the 26th is invalid; and there is no breakfast.",
							"“7 days in advance” is already too late for this Saturday; Midorino is also the farthest.",
							"Sudomari = no meals, the opposite of wanting breakfast.",
							"Correct. Check-in after 18:00, breakfast included, usable for one night on June 26.",
						],
					},
				],
			},
			{
				label: "問題2",
				instruction:
					"{下|した}のハガキは、クリーニング{店|てん}からのダイレクトメールである。{読|よ}んで、{下|した}の{問|と}いに{対|たい}する{答|こた}えとして{最|もっと}もよいものを1・2・3・4から{一|ひと}つ{選|えら}びなさい。",
				instructionCn:
					"下面的明信片是洗衣店寄来的直邮广告。阅读后，从 1・2・3・4 中选出最合适的一个作为下面问题的答案。",
				instructionEn:
					"The postcard below is direct mail from a dry cleaner. Read it and choose the best answer to the questions from 1, 2, 3, or 4.",
				blocks: [
					{
						type: "title",
						jp: "{衣替|ころもが}え（{注|ちゅう}1）{応援|おうえん}セール！",
						cn: "换季（注1）应援促销！",
						en: "Change-of-season (note 1) support sale!",
						sub: { jp: "しろくまクリーニング", cn: "白熊洗衣店", en: "Shirokuma Cleaning" },
					},
					{
						type: "list",
						items: [
							{ jp: "5{点|てん}（{注|ちゅう}2）までなら　10% OFF", cn: "5 件（注2）以内　10% OFF", en: "Up to 5 items (note 2): 10% OFF" },
							{ jp: "6{点以上|てんいじょう}で　20% OFF", cn: "6 件以上　20% OFF", en: "6 items or more: 20% OFF" },
							{ jp: "10{点以上|てんいじょう}で　30% OFF", cn: "10 件以上　30% OFF", en: "10 items or more: 30% OFF" },
							{ jp: "ゆっくりクリーニング（{出来上がり|できあがり}は9{月|がつ}）はさらに5% OFF", cn: "慢洗（9 月取件）再减 5% OFF", en: "Slow cleaning (ready in September) is an extra 5% OFF" },
						],
					},
					{
						type: "heading",
						jp: "セール{期間|きかん}",
						cn: "促销期间",
						en: "Sale period",
					},
					{
						type: "paragraph",
						jp: "{本状|ほんじょう}が{届|とど}いた{日|ひ}から20XX{年|ねん}5{月|がつ}31{日|にち}（{日|にち}）まで",
						cn: "从本函寄到之日起至 20XX 年 5 月 31 日（周日）",
						en: "From the day this notice arrives through Sunday, May 31, 20XX",
					},
					{
						type: "note",
						jp: "※{本状|ほんじょう}をご{持参|じさん}ください。セール{中|ちゅう}ご{利用|りよう}の{方|かた}には{次回|じかい}の{割引券|わりびきけん}をプレゼント。",
						cn: "※请携带本函。促销期间光顾的顾客将获赠下次的折扣券。",
						en: "* Please bring this notice. Customers who use the service during the sale will receive a coupon for next time.",
					},
				],
				footnotes: [
					{ marker: "（注1）", term: "衣替え", jp: "洋服を季節に合わせて替えること", cn: "按季节更换衣服", en: "changing clothes to match the season" },
					{ marker: "（注2）", term: "〜点", jp: "クリーニングに出すものの数え方", cn: "送洗衣物的计数单位", en: "the counter for items you take to the cleaner" },
				],
				questions: [
					{
						label: "3",
						jp: "{正|ただ}しいのはどれか。",
						cn: "哪一项是正确的？",
						en: "Which of the following is correct?",
						choices: [
							{ jp: "9{月|がつ}はクリーニング{料金|りょうきん}が5% OFFになる。", cn: "9 月洗衣费会 5% OFF。", en: "In September, cleaning fees are 5% OFF." },
							{ jp: "このセールの{始|はじ}まりは{人|ひと}によって{違|ちが}う。", cn: "这次促销的开始日期因人而异。", en: "The start of this sale differs from person to person." },
							{ jp: "{受|う}け{取|と}りが3{カ月先|かげつさき}でもいい{人|ひと}は5{割引|わりびき}になる。", cn: "可以三个月后再取件的人打五折。", en: "People who can wait three months to pick up get 50% off." },
							{ jp: "{案内状|あんないじょう}を{見|み}せるだけで{割引券|わりびきけん}がもらえる。", cn: "只要出示通知函就能拿到折扣券。", en: "You get a coupon just by showing the notice." },
						],
						answer: 2,
						explanation:
							"促销期间是「本状が届いた日から〜5月31日まで」——开始日取决于每个人收到明信片的日子，所以 2 正确。1：额外 5% OFF 的是「出来上がりは9月」的慢洗，不是整个 9 月的洗衣费都 5% OFF。3：慢洗是「さらに5% OFF」，不是 5 割引（五折＝50% OFF）。4：折扣券是「セール中ご利用の方」才送，只出示案内状不够。",
						explanationEn:
							"The sale runs “from the day this notice arrives through May 31” — the start depends on when each person receives the postcard, so 2 is correct. 1: the extra 5% OFF is for slow cleaning ready in September, not all September cleaning. 3: slow cleaning is an extra 5% OFF, not 5-waribiki (50% off). 4: the next coupon is for “customers who use the service during the sale,” not for merely showing the notice.",
						choiceNotes: [
							"9 月取件的慢洗才再减 5%，不是 9 月一律 5% OFF。",
							"正确。从「本状が届いた日」开始，每个人的起始日不同。",
							"5% OFF ≠ 5 割引。慢洗只是再减 5%。",
							"必须在促销期间实际送洗，才送下次的折扣券。",
						],
						choiceNotesEn: [
							"Only slow cleaning ready in September gets the extra 5%, not all September jobs.",
							"Correct. It starts the day the notice arrives, so the start date differs by person.",
							"5% OFF is not 5-waribiki. Slow cleaning is only another 5% off.",
							"You must actually use the cleaner during the sale to get the next coupon.",
						],
					},
					{
						label: "4",
						jp: "ワイシャツを3{枚|まい}とズボンを2{本|ほん}とコート1{着|ちゃく}をクリーニングに{出|だ}した{場合|ばあい}、{何割引|なんわりびき}になるか。",
						cn: "送洗 3 件衬衫、2 条裤子和 1 件大衣时，打几折？",
						en: "If you take 3 dress shirts, 2 pairs of trousers, and 1 coat to the cleaner, what discount do you get?",
						choices: [
							{ jp: "1{割引|わりびき}", cn: "打九折", en: "10% off" },
							{ jp: "2{割引|わりびき}", cn: "打八折", en: "20% off" },
							{ jp: "3{割引|わりびき}", cn: "打七折", en: "30% off" },
							{ jp: "4{割引|わりびき}", cn: "打六折", en: "40% off" },
						],
						answer: 2,
						explanation:
							"别册：衬衫、裤子、大衣都按件数算，与种类无关。3＋2＋1＝6 点。表里「6点以上で20% OFF」＝2 割引。不到 10 点，所以不是 30% OFF。题目没说要慢洗，不能再加 5%。",
						explanationEn:
							"The answer key: shirts, trousers, and coats all count as items, regardless of type. 3 + 2 + 1 = 6 items. “6 or more: 20% OFF” = 2-waribiki. It is under 10 items, so not 30% OFF. The question does not mention slow cleaning, so do not add 5%.",
						choiceNotes: [
							"那是 5 点以内的 10% OFF；本题是 6 点。",
							"正确。6 点 → 20% OFF＝2 割引。",
							"那是 10 点以上。6 点不够。",
							"没有 40% OFF 这一档；也不是 20%+ 慢洗 5% 再换算。",
						],
						choiceNotesEn: [
							"That is 10% OFF for up to 5 items; this is 6.",
							"Correct. 6 items → 20% OFF = 2-waribiki.",
							"That is 10 items or more. 6 is not enough.",
							"There is no 40% OFF tier; and this is not 20% plus slow-cleaning 5%.",
						],
					},
				],
			},
		],
	},

	vocab: [
		{ jp: "周辺", kana: "しゅうへん", cn: "周边", en: "the area around", pos: "名詞" },
		{ jp: "出張", kana: "しゅっちょう", cn: "出差", en: "a business trip", pos: "名詞・動詞" },
		{ jp: "直結", kana: "ちょっけつ", cn: "直通、直接相连", en: "directly connected", pos: "名詞・動詞" },
		{ jp: "至便", kana: "しべん", cn: "极为方便", en: "extremely convenient", pos: "な形" },
		{ jp: "完備", kana: "かんび", cn: "配备齐全", en: "fully equipped", pos: "名詞・動詞" },
		{ jp: "備考", kana: "びこう", cn: "备注", en: "notes; remarks", pos: "名詞" },
		{ jp: "連泊", kana: "れんぱく", cn: "连住", en: "consecutive nights", pos: "名詞" },
		{ jp: "格安", kana: "かくやす", cn: "超低价", en: "bargain; very cheap", pos: "な形" },
		{ jp: "早割", kana: "はやわり", cn: "早鸟折扣", en: "early-bird discount", pos: "名詞" },
		{ jp: "素泊まり", kana: "すどまり", cn: "不含餐住宿", en: "room only (no meals)", pos: "名詞" },
		{ jp: "衣替え", kana: "ころもがえ", cn: "换季更衣", en: "changing clothes for the season", pos: "名詞" },
		{ jp: "応援", kana: "おうえん", cn: "应援、助威", en: "support", pos: "名詞・動詞" },
		{ jp: "本状", kana: "ほんじょう", cn: "本函", en: "this notice", pos: "名詞" },
		{ jp: "持参", kana: "じさん", cn: "携带、自带", en: "bringing (with you)", pos: "名詞・動詞" },
		{ jp: "出来上がり", kana: "できあがり", cn: "完成、取件（做好）", en: "when it is ready / finished", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜に限ります／〜限定",
			formation: "名詞・条件＋に限ります／限定",
			meaning: "仅限于……。方案、优惠的适用条件。",
			meaningEn: "limited to…. A restriction on who or when a plan applies.",
			example: {
				jp: "18{時以降|じいこう}のチェックインの{場合|ばあい}に{限|かぎ}ります。",
				cn: "仅限 18 点以后入住。",
				en: "Only for check-in at 18:00 or later.",
			},
		},
		{
			pattern: "〜以上でお申し込みいただけます",
			meaning: "达到……才可以申请。敬语＋条件，酒店方案里常见。",
			meaningEn: "you can book if it is … or more. Honorific + condition, common on hotel plans.",
			example: {
				jp: "3{連泊以上|れんぱくいじょう}でお{申|もう}し{込|こ}みいただけます。",
				cn: "须连住 3 晚以上方可申请。",
				en: "You may book this plan for 3 consecutive nights or more.",
			},
		},
		{
			pattern: "〜点／〜までなら／〜以上で",
			meaning: "按件数分档折扣。「までなら」含该数，「以上で」也含该数。5 点までなら 10%、6 点以上で 20%。",
			meaningEn: "Tiered discounts by item count. made nara includes that number; ijō de includes it too. Up to 5 = 10%; 6 or more = 20%.",
			example: {
				jp: "6{点以上|てんいじょう}で　20% OFF",
				cn: "6 件以上　20% OFF",
				en: "6 items or more: 20% OFF",
			},
		},
	],
};
