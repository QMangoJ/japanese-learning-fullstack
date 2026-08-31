import type { ReadingDay } from "../reading-n3/types";

// 第2週 2日目 お知らせ② — printed pages 30–31
export const w2d2: ReadingDay = {
	week: 2,
	day: 2,
	label: "お知らせ②",
	labelKana: "おしらせ",
	labelEn: "Notice ②",
	printedPages: [30, 31],
	answerSource: "book",

	point: {
		title: "{決|き}まったパターンに{慣|な}れよう！②",
		titleCn: "熟悉固定句式吧！②",
		titleEn: "Try to get used to the sentence patterns! ②",
		figure: {
			alt: "断水のお知らせを見て「あれ、水、出ない？」と言う人と、蛇口から水が出ていないイラスト",
			cn: "有人看着停水通知说「咦，不出水了？」；水龙头也不出水。",
			en: "A person looking at a water-cutoff notice and saying “Huh? No water?”; a tap with nothing coming out.",
		},
		tips: [
			{
				jp: "{例えば|たとえば}{断水|だんすい}（{水道|すいどう}が{使|つか}えなくなること）のお{知|し}らせなら、こんな{内容|ないよう}が{書|か}いてあります。",
				cn: "比如停水（自来水不能用）的通知里，会写下面这些内容。",
				en: "A notice about a water cutoff (when the tap water cannot be used), for example, will include content like this.",
			},
			{
				jp: "・いつ？　→　{日時|にちじ}を{読|よ}みましょう！",
				cn: "・什么时候？　→　要看清日期和时间！",
				en: "When? → Read the date and time!",
			},
			{
				jp: "・どうすればいい？　→　{飲|の}み{水|みず}とか、{洗|あら}い{物|もの}をする{水|みず}をくんでおきましょう！",
				cn: "・该怎么办？　→　先把饮用水、洗碗用水舀好备用！",
				en: "What should I do? → Draw drinking water and water for washing in advance!",
			},
			{
				jp: "・どうして？　→　{普通|ふつう}は{水道|すいどう}の{工事|こうじ}のため。{災害|さいがい}や{水不足|みずぶそく}の{場合|ばあい}もある。",
				cn: "・为什么？　→　一般是因为自来水管施工。有时也因灾害或缺水。",
				en: "Why? → Usually because of water-pipe work. It can also be due to a disaster or a water shortage.",
			},
			{
				jp: "・なぜ{工事|こうじ}をするの？　→　{水道管|すいどうかん}を{直|なお}したり{新|あたら}しいのと{取|と}り{替|か}えたり。",
				cn: "・为什么要施工？　→　修理水管，或换成新的。",
				en: "Why the construction? → To repair the water pipes or replace them with new ones.",
			},
			{
				jp: "・{工事|こうじ}のあとで……　→　{赤|あか}く{濁|にご}った{水|みず}が{出|で}る{場合|ばあい}は、{水道課|すいどうか}まで{連絡|れんらく}する。",
				cn: "・施工之后……　→　如果流出混浊发红的水，请联系自来水科。",
				en: "After the work… → If red, cloudy water comes out, contact the waterworks section.",
			},
		],
		expressions: [
			{ jp: "断水", kana: "だんすい", cn: "停水", en: "a cutoff of the water supply" },
			{ jp: "水道管", kana: "すいどうかん", cn: "自来水管", en: "a water pipe" },
			{ jp: "くむ／くみ置き", kana: "くみおき", cn: "舀水／预先舀好存放", en: "to draw water / water stored in advance" },
			{ jp: "濁る", kana: "にごる", cn: "变浑浊", en: "to become cloudy / muddy" },
			{ jp: "水道課", kana: "すいどうか", cn: "自来水科", en: "the waterworks section (of city hall)" },
			{ jp: "災害", kana: "さいがい", cn: "灾害", en: "a natural disaster" },
			{ jp: "水不足", kana: "みずぶそく", cn: "缺水", en: "a water shortage" },
			{ jp: "節水", kana: "せっすい", cn: "节水", en: "saving water" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{母親|ははおや}",
				speakerCn: "母亲",
				speakerEn: "Mother",
				jp: "あ、もう10{時|じ}だ。あと1{時間半|じかんはん}だからね。みんなお{風呂|ふろ}{入|はい}ったわね？　{今日|きょう}はお{風呂|ふろ}のお{湯|ゆ}、{捨|す}てないでそのままにしておくから。{夜中|よなか}にトイレに{行|い}きたくなったら、バケツにお{風呂|ふろ}のお{湯|ゆ}をくんで{使|つか}ってね。{飲|の}み{水|みず}は{冷蔵庫|れいぞうこ}にもやかんにも、それから、お{鍋|なべ}にも{入|はい}ってるし、ペットボトルにも{水道|すいどう}の{水|みず}{入|い}れてたくさん{置|お}いてあるから。それから……。",
				cn: "啊，已经 10 点了。还剩一个半小时哦。大家都洗过澡了吧？今天浴缸里的水不要放掉，就那样留着。夜里想上厕所的话，用桶舀浴缸里的水来用。饮用水冰箱里、水壶里都有，锅里也装着，塑料瓶里也灌了很多自来水放着。还有……",
				en: "Oh, it’s already 10:00. An hour and a half left, all right? You’ve all had your baths? Don’t drain the bathwater today—leave it as it is. If you need the toilet in the night, scoop some bathwater into a bucket and use that. Drinking water is in the fridge and the kettle, and in a pot too, and I’ve filled lots of plastic bottles with tap water. And also…",
			},
			{
				type: "speech",
				speaker: "{息子|むすこ}",
				speakerCn: "儿子",
				speakerEn: "Son",
				jp: "もうわかったよ。{今夜|こんや}は{早|はや}く{寝|ね}るし、{朝|あさ}4{時前|じまえ}になんて{起|お}きないし。",
				cn: "知道了啦。今晚早点睡，早上 4 点前才不会起来呢。",
				en: "I already get it. I’ll go to bed early tonight, and I’m not getting up before 4:00 in the morning.",
			},
			{
				type: "speech",
				speaker: "{父親|ちちおや}",
				speakerCn: "父亲",
				speakerEn: "Father",
				jp: "ははは、{家中|うちじゅう}{水|みず}だらけだな。{断水|だんすい}は{一晩|ひとばん}だけだっていうのに、{災害時|さいがいじ}みたいだ。",
				cn: "哈哈哈，家里到处都是水啊。说是只停一晚，搞得跟受灾时一样。",
				en: "Haha, the whole house is full of water. They say the cutoff is only overnight, but it looks like a disaster.",
			},
		],
		choices: [
			{ jp: "{母親|ははおや}は{節水|せっすい}をしている。", cn: "母亲在节水。", en: "The mother is conserving water." },
			{ jp: "{母親|ははおや}は{断水|だんすい}をしている。", cn: "母亲在停水。", en: "The mother is cutting off the water." },
			{ jp: "{母親|ははおや}は{断水|だんすい}に{備|そな}えて{準備|じゅんび}をしている。", cn: "母亲在为停水做准备。", en: "The mother is preparing for the water cutoff." },
			{ jp: "{災害|さいがい}のため、{水|みず}が{止|と}まってしまった。", cn: "因为灾害，水已经停了。", en: "The water has already stopped because of a disaster." },
			{ jp: "{断水|だんすい}は{今夜|こんや}11{時半|じはん}から{翌朝|よくあさ}4{時|じ}までらしい。", cn: "停水好像是今晚 11 点半到次日早上 4 点。", en: "The cutoff seems to run from 11:30 tonight until 4:00 the next morning." },
		],
		answers: [3, 5],
	},

	mondai: {
		instruction: "{次|つぎ}のお{知|し}らせを{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的启事，回答后面的问题。（答案在别册 p.3）",
		instructionEn: "Read the following notice and answer the questions that follow. (Answers are in the separate booklet, p. 3.)",
		blocks: [
			{
				type: "line",
				jp: "A",
				cn: "A",
				en: "A",
			},
			{
				type: "title",
				jp: "{断水|だんすい}のお{知|し}らせ",
				cn: "停水通知",
				en: "Notice of water cutoff",
				sub: { jp: "（{緑が丘地区|みどりがおかちく}）", cn: "（绿丘地区）", en: "(Midorigaoka district)" },
			},
			{
				type: "line",
				jp: "お{問|と}い{合|あ}わせ{先|さき}：みどり{市|し}{水道課|すいどうか}（TEL：XXX-123-4567）",
				cn: "咨询处：绿市自来水科（TEL：XXX-123-4567）",
				en: "Inquiries: Midori City Waterworks Section (TEL: XXX-123-4567)",
				align: "right",
			},
			{
				type: "paragraph",
				jp: "{下記|かき}の{通|とお}り、{水道管|すいどうかん}の{修理工事|しゅうりこうじ}を{行|おこな}います。{工事|こうじ}に{伴|ともな}い（{注|ちゅう}1）{断水|だんすい}となりますので、{水道水|すいどうすい}のくみ{置|お}き（{注|ちゅう}2）など、お{願|ねが}いします。{工事中|こうじちゅう}はご{迷惑|めいわく}をおかけすることと{思|おも}いますが、ご{理解|りかい}とご{協力|きょうりょく}をお{願|ねが}い{申|もう}し{上|あ}げます。",
				cn: "将按如下安排进行自来水管修理施工。因施工（注1）将停水，请预先储存自来水（注2）等。施工期间会给您添麻烦，敬请理解与配合。",
				en: "We will carry out repair work on the water pipes as stated below. Because of the work (note 1) there will be a water cutoff, so please store tap water in advance (note 2) and so on. The work will cause inconvenience; we ask for your understanding and cooperation.",
			},
			{
				type: "paragraph",
				jp: "なお、{工事終了後|こうじしゅうりょうご}、{赤|あか}く{濁|にご}った{水|みず}が{出|で}る{場合|ばあい}は{市水道課|しすいどうか}までご{連絡|れんらく}をお{願|ねが}いします。",
				cn: "另外，施工结束后如果流出混浊发红的水，请与市自来水科联系。",
				en: "Also, if red, cloudy water comes out after the work is finished, please contact the city waterworks section.",
			},
			{
				type: "heading",
				jp: "{記|き}",
				cn: "记",
				en: "Particulars",
			},
			{
				type: "list",
				marker: "○",
				items: [
					{ jp: "{工事場所|こうじばしょ}：みどり{市|し}{緑が丘|みどりがおか}1{丁目|ちょうめ}{大山神社|おおやまじんじゃ}{付近|ふきん}", cn: "施工地点：绿市绿丘一丁目大山神社附近", en: "Work site: near Ōyama Shrine, 1-chōme Midorigaoka, Midori City" },
					{ jp: "{断水地域|だんすいちいき}：みどり{市|し}{緑が丘地区|みどりがおかちく}", cn: "停水区域：绿市绿丘地区", en: "Cutoff area: Midorigaoka district, Midori City" },
					{ jp: "{施工業者|せこうぎょうしゃ}（{注|ちゅう}3）：（{株|かぶ}）グリーン{建設|けんせつ}（{電話|でんわ} 123-4567）", cn: "施工单位（注3）：绿色建设股份有限公司（电话 123-4567）", en: "Contractor (note 3): Green Construction Co., Ltd. (tel. 123-4567)" },
					{ jp: "{作業時間|さぎょうじかん}：2{月|がつ}20{日|にち}（{木|もく}）23{時|じ}30{分|ぷん}〜2{月|がつ}21{日|にち}（{金|きん}）4{時|じ}", cn: "作业时间：2 月 20 日（周四）23:30〜2 月 21 日（周五）4:00", en: "Work hours: Thursday, February 20, 23:30 – Friday, February 21, 4:00" },
				],
			},
			{
				type: "line",
				jp: "B",
				cn: "B",
				en: "B",
			},
			{
				type: "title",
				jp: "{節水|せっすい}のお願い",
				cn: "节水的请求",
				en: "A request to save water",
			},
			{
				type: "paragraph",
				jp: "{雨不足|あめぶそく}により、{水源|すいげん}（{注|ちゅう}4）の{水位|すいい}（{注|ちゅう}5）が{低下|ていか}しています。{最悪|さいあく}の{場合|ばあい}は{断水|だんすい}となる{恐|おそ}れがあります。",
				cn: "由于雨水不足，水源（注4）水位（注5）正在下降。最坏的情况下有停水的可能。",
				en: "Because of a lack of rain, the water level (note 5) at the water source (note 4) is falling. In the worst case there is a risk of a cutoff.",
			},
			{
				type: "paragraph",
				jp: "{住民|じゅうみん}の{皆|みな}さんには、{節水|せっすい}にご{協力|きょうりょく}くださいますようお{願|ねが}いします。",
				cn: "请各位居民协助节水。",
				en: "We ask all residents to kindly cooperate in saving water.",
			},
			{
				type: "line",
				jp: "みどり{市|し}{水道課|すいどうか}（TEL：XXX-123-4567）",
				cn: "绿市自来水科（TEL：XXX-123-4567）",
				en: "Midori City Waterworks Section (TEL: XXX-123-4567)",
				align: "right",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "工事に伴い", jp: "こうじにともない", cn: "因施工", en: "due to construction" },
			{ marker: "（注2）", term: "くみ置き", jp: "くみおき", cn: "预先舀好存放的水", en: "emergency water stored in advance" },
			{ marker: "（注3）", term: "施工業者", jp: "せこうぎょうしゃ", cn: "施工单位、施工人员", en: "the construction company in charge" },
			{ marker: "（注4）", term: "水源", jp: "すいげん", cn: "水源", en: "the source of a river / a water source" },
			{ marker: "（注5）", term: "水位", jp: "すいい", cn: "水位", en: "water level" },
		],
		questions: [
			{
				label: "問1",
				jp: "Aの{内容|ないよう}と{合|あ}っていないものはどれか。",
				cn: "哪一项与 A 的内容不符？",
				en: "Which of the following does not match the content of A?",
				choices: [
					{ jp: "{水道|すいどう}の{工事|こうじ}があるので、{必要|ひつよう}な{水|みず}は{用意|ようい}しておいたほうがいい。", cn: "因为有自来水施工，最好预先准备好需要的水。", en: "Because of waterworks, it is better to prepare the water you will need." },
					{ jp: "{水道|すいどう}の{工事|こうじ}があるのは{一晩|ひとばん}だけだ。", cn: "自来水施工只进行一个晚上。", en: "The waterworks last only overnight." },
					{ jp: "{水道|すいどう}の{工事中|こうじちゅう}は{赤|あか}く{濁|にご}った{水|みず}が{出|で}るかもしれない。", cn: "自来水施工期间可能会流出混浊发红的水。", en: "Red, cloudy water may come out during the waterworks." },
					{ jp: "{水道|すいどう}の{工事|こうじ}のため4{時間半|じかんはん}ぐらい{水|みず}が{出|で}ない。", cn: "因为自来水施工，大约四个半小时不出水。", en: "Because of the waterworks, there will be no water for about four and a half hours." },
				],
				answer: 3,
				explanation:
					"A 写的是「工事終了後、赤く濁った水が出る場合は市水道課までご連絡」——浑水是施工结束之后可能出现的现象，不是「工事中」。所以 3 与 A 不符。1 对应「くみ置きなど、お願いします」。2 对应 23:30〜翌朝 4:00，确实是一晚。4：23:30 到 4:00 正好约 4 小时半。",
				explanationEn:
					"A says to contact the waterworks section “if red, cloudy water comes out after the work is finished.” Cloudy water is an after-the-work possibility, not something “during the construction.” So 3 does not match A. 1 matches the request to store water. 2 matches 23:30–4:00, which is overnight. 4: 23:30 to 4:00 is about four and a half hours.",
				choiceNotes: [
					"A 请居民预先舀水存放，与「准备好需要的水」相符。",
					"作业时间是 20 日 23:30 到 21 日 4:00，确实只停一晚。",
					"正确（这是不符的一项）。浑水写的是「工事終了後」，不是施工当中。",
					"23:30〜4:00 约为 4 小时半，相符。",
				],
				choiceNotesEn: [
					"A asks residents to store water, matching “prepare the water you will need.”",
					"The hours are the 20th 23:30 to the 21st 4:00, so it really is only overnight.",
					"Correct as the mismatch: cloudy water is “after the work is finished,” not during it.",
					"23:30–4:00 is about four and a half hours, so this matches.",
				],
			},
			{
				label: "問2",
				jp: "{次|つぎ}の①②に{入|はい}る{正|ただ}しい{組|く}み{合|あ}わせはどれか。Aは（①）、Bは（②）と{言|い}っている。",
				cn: "填入①②的正确组合是哪一项？A 说的是（①），B 说的是（②）。",
				en: "Which is the correct pair to fill in ① and ②? A is saying (①), and B is saying (②).",
				choices: [
					{ jp: "①{水|みず}が{一時的|いちじてき}に{出|で}なくなる　②{水|みず}を{大切|たいせつ}に{使|つか}ってほしい", cn: "①水会暂时不出　②希望大家珍惜用水", en: "① water will temporarily stop  ② please use water carefully" },
					{ jp: "①{水|みず}が{一時的|いちじてき}に{濁|にご}る　②{水|みず}が{出|で}なくなるかもしれない", cn: "①水会暂时变浑　②水有可能不出", en: "① water will temporarily become cloudy  ② water may stop coming out" },
					{ jp: "①{水|みず}を{大切|たいせつ}に{使|つか}ってほしい　②{水|みず}をくんでおいてほしい", cn: "①希望大家珍惜用水　②希望预先把水舀好", en: "① please use water carefully  ② please draw water in advance" },
					{ jp: "①{水|みず}が{濁|にご}るかもしれない　②{水源|すいげん}の{水位|すいい}に{注意|ちゅうい}してほしい", cn: "①水可能会变浑　②希望注意水源水位", en: "① water may become cloudy  ② please watch the water-source level" },
				],
				answer: 1,
				explanation:
					"A 的标题是「断水のお知らせ」，正文写明因修理施工将断水，请预先舀水——核心是「水会暂时停」。B 的标题是「節水のお願い」，请居民节水；虽然提到「最悪の場合は断水となる恐れ」，但 B 在说的是「请珍惜用水」。所以 ①＝水が一時的に出なくなる、②＝水を大切に使ってほしい。选 1。",
				explanationEn:
					"A is titled “Notice of water cutoff” and asks people to store water because of repair work—so the point is that water will temporarily stop. B is titled “A request to save water”; it mentions a possible cutoff in the worst case, but what B is saying is “please use water carefully.” So ① = water will temporarily stop, ② = please use water carefully. 1 is correct.",
				choiceNotes: [
					"正确。A＝暂时停水，B＝请节水。",
					"A 的浑水是施工结束后的可能现象，不是 A 的主旨；B 的主旨是节水，不是「可能会停水」。",
					"①②对调了：节水是 B，预先舀水是 A。",
					"A 不是以「可能变浑」为主；B 也没有请居民自己去看水位。",
				],
				choiceNotesEn: [
					"Correct. A = a temporary cutoff; B = please save water.",
					"Cloudy water in A is only a possible after-effect, not A’s main point; B’s main point is saving water, not “there may be a cutoff.”",
					"① and ② are swapped: saving water is B; drawing water in advance is A.",
					"A is not mainly “it may become cloudy,” and B does not ask residents to watch the water level themselves.",
				],
			},
		],
	},

	vocab: [
		{ jp: "断水", kana: "だんすい", cn: "停水", en: "a water cutoff", pos: "名詞" },
		{ jp: "節水", kana: "せっすい", cn: "节水", en: "saving water", pos: "名詞" },
		{ jp: "水道管", kana: "すいどうかん", cn: "自来水管", en: "a water pipe", pos: "名詞" },
		{ jp: "修理", kana: "しゅうり", cn: "修理", en: "repair", pos: "名詞・動詞" },
		{ jp: "くむ", cn: "舀（水）", en: "to draw / scoop (water)", pos: "動詞" },
		{ jp: "くみ置き", kana: "くみおき", cn: "预先舀好存放的水", en: "water stored in advance", pos: "名詞" },
		{ jp: "濁る", kana: "にごる", cn: "变浑浊", en: "to become cloudy", pos: "動詞" },
		{ jp: "水道課", kana: "すいどうか", cn: "自来水科", en: "waterworks section", pos: "名詞" },
		{ jp: "施工業者", kana: "せこうぎょうしゃ", cn: "施工单位", en: "the contractor", pos: "名詞" },
		{ jp: "水源", kana: "すいげん", cn: "水源", en: "a water source", pos: "名詞" },
		{ jp: "水位", kana: "すいい", cn: "水位", en: "water level", pos: "名詞" },
		{ jp: "低下", kana: "ていか", cn: "下降", en: "a fall / decline", pos: "名詞・動詞" },
		{ jp: "雨不足", kana: "あめぶそく", cn: "雨水不足", en: "a lack of rain", pos: "名詞" },
		{ jp: "備える", kana: "そなえる", cn: "防备、准备", en: "to prepare for", pos: "動詞" },
		{ jp: "一晩", kana: "ひとばん", cn: "一个晚上", en: "overnight; one night", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜に伴い",
			formation: "名詞＋に伴い",
			meaning: "随着……、因……。书面语，通知里说明原因常用。",
			meaningEn: "along with… / due to…. Written style; common on notices when giving a reason.",
			example: {
				jp: "{工事|こうじ}に{伴|ともな}い{断水|だんすい}となります。",
				cn: "因施工将停水。",
				en: "There will be a water cutoff due to the construction.",
			},
		},
		{
			pattern: "〜恐れがある",
			formation: "辞書形／名詞＋の＋恐れがある",
			meaning: "有……的危险、恐怕会……。用于不好的可能性。",
			meaningEn: "there is a risk that… / it may…. Used for undesirable possibilities.",
			example: {
				jp: "{断水|だんすい}となる{恐|おそ}れがあります。",
				cn: "有停水的可能。",
				en: "There is a risk of a water cutoff.",
			},
		},
		{
			pattern: "〜ておく",
			formation: "て形＋おく",
			meaning: "事先做好准备。断水通知里的「くんでおきましょう」就是提前把水舀好。",
			meaningEn: "to do something in advance. Kunde okimashō on a cutoff notice means draw the water beforehand.",
			example: {
				jp: "{飲|の}み{水|みず}とか、{洗|あら}い{物|もの}をする{水|みず}をくんでおきましょう。",
				cn: "先把饮用水、洗碗用水舀好备用。",
				en: "Let’s draw drinking water and water for washing in advance.",
			},
		},
	],
};
