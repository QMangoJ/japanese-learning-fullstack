import type { ReadingDay } from "../reading-n3/types";

// 第5週 1日目 見出し① — printed pages 78–79
export const w5d1: ReadingDay = {
	week: 5,
	day: 1,
	label: "見出し①",
	labelKana: "みだし",
	labelEn: "Headlines ①",
	printedPages: [78, 79],
	answerSource: "book",

	point: {
		title: "{見出|みだ}しから{文|ぶん}を{作|つく}って{理解|りかい}しよう！",
		titleCn: "利用标题造句子，以此来帮助理解！",
		titleEn: "Make a sentence from the headline that demonstrates the main point!",
		figure: {
			alt: "新聞を読んで「見出しだけで新聞読めちゃうね。」と言うキャラクター",
			cn: "角色看着报纸说：「光看标题就能读报了呢。」",
			en: "A character looking at a newspaper and saying, “You can read the paper from the headlines alone!”",
		},
		tips: [
			{
				jp: "{例えば|たとえば}こんなふうに{見出|みだ}しを{文|ぶん}にします。",
				cn: "比如可以像下面这样把标题还原成句子。",
				en: "Turn headlines into sentences like this.",
			},
			{
				jp: "【{見出|みだ}し】A{鉄道|てつどう}{新線|しんせん} 2030{年|ねん}に{延期|えんき}　{収益悪化|しゅうえきあっか}のため\n→ A{鉄道|てつどう}は{新線|しんせん}の{開通|かいつう}を、{収益悪化|しゅうえきあっか}のため2030{年|ねん}に{延期|えんき}した。",
				cn: "【标题】A 铁道新线延期至 2030 年　因收益恶化\n→ A 铁道因收益恶化，将开通新线的计划延期至 2030 年。",
				en: "[Headline] “A” Railway new line postponed to 2030 — due to worsening profits\n→ “A” Railway postponed the opening of the new line to 2030 because of worsening profits.",
			},
			{
				jp: "【{見出|みだ}し】○○{劇場|げきじょう} さよなら{公演|こうえん}に {長蛇|ちょうだ}の{列|れつ}\n→ ○○{劇場|げきじょう}の{最後|さいご}の{公演|こうえん}（を{見|み}たい{人|ひと}たちが）とても{長|なが}い{列|れつ}を{作|つく}って{並|なら}んだ。",
				cn: "【标题】○○剧场 告别公演排起长龙\n→ 想看○○剧场最后一场公演的人排了很长的队。",
				en: "[Headline] Long line for ○○ Theater’s farewell performance\n→ People who wanted to see ○○ Theater’s last performance formed a very long line.",
			},
			{
				jp: "【{見出|みだ}し】{裁判員裁判|さいばんいんさいばん}　{判決|はんけつ}　{自宅放火|じたくほうか}{被告|ひこく}に{懲役|ちょうえき}1{年|ねん}6{ヵ|か}{月|げつ}\n→ {裁判員裁判|さいばんいんさいばん}で、{自宅|じたく}に{放火|ほうか}した{被告|ひこく}に{懲役|ちょうえき}1{年|ねん}6{ヵ|か}{月|げつ}の{判決|はんけつ}が{出|で}た。",
				cn: "【标题】裁判员审判　判决　对住宅纵火被告判处有期徒刑一年六个月\n→ 在裁判员审判中，对在自己家里放火的被告作出了有期徒刑一年六个月的判决。",
				en: "[Headline] Lay-judge trial — verdict: 1 year 6 months for home-arson defendant\n→ At the lay-judge trial, the defendant who set fire to his own home was sentenced to 1 year and 6 months in prison.",
			},
		],
		expressions: [
			{ jp: "延期する", kana: "えんきする", cn: "延期", en: "to postpone" },
			{ jp: "開通", kana: "かいつう", cn: "开通（线路）", en: "opening (of a line)" },
			{ jp: "収益悪化", kana: "しゅうえきあっか", cn: "收益恶化", en: "worsening profits / lack of revenue" },
			{ jp: "さよなら公演", kana: "さよならこうえん", cn: "告别公演、最后一场演出", en: "farewell performance" },
			{ jp: "長蛇の列", kana: "ちょうだのれつ", cn: "长龙、排长队", en: "a very long line" },
			{ jp: "裁判員裁判", kana: "さいばんいんさいばん", cn: "裁判员审判（陪审制）", en: "lay-judge trial" },
			{ jp: "判決", kana: "はんけつ", cn: "判决", en: "verdict; judgment" },
			{ jp: "放火", kana: "ほうか", cn: "放火、纵火", en: "arson; setting a fire" },
			{ jp: "被告", kana: "ひこく", cn: "被告", en: "defendant" },
			{ jp: "懲役", kana: "ちょうえき", cn: "有期徒刑", en: "prison sentence" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{女|おんな}",
				speakerCn: "女",
				speakerEn: "Woman",
				jp: "あ、あの{人|ひと}たちやっと{帰|かえ}れるのね。",
				cn: "啊，那些人终于能回家了呢。",
				en: "Oh, those people can finally go home.",
			},
			{
				type: "speech",
				speaker: "{男|おとこ}",
				speakerCn: "男",
				speakerEn: "Man",
				jp: "え？　ああ、ずっと{空港|くうこう}で{寝袋|ねぶくろ}にくるまって{飛行機|ひこうき}が{飛|と}ぶの{待|ま}ってた{人|ひと}たちか。",
				cn: "诶？啊，是那些一直裹着睡袋在机场等飞机起飞的人啊。",
				en: "Huh? Oh, those are the people who’ve been wrapped in sleeping bags at the airport waiting for planes to fly.",
			},
			{
				type: "speech",
				speaker: "{女|おんな}",
				speakerCn: "女",
				speakerEn: "Woman",
				jp: "1{週間|しゅうかん}よ。{気|き}の{毒|どく}に。でもしょうがないね、{自然災害|しぜんさいがい}じゃ。",
				cn: "都一周了。真可怜。不过也没办法，是自然灾害嘛。",
				en: "A whole week. Poor things. But it can’t be helped—it’s a natural disaster.",
			},
			{
				type: "speech",
				speaker: "{男|おとこ}",
				speakerCn: "男",
				speakerEn: "Man",
				jp: "よかったよ、{飛|と}べるようになって。{乗客|じょうきゃく}だけじゃなくて、{商品|しょうひん}も{足止|あしど}め（{注|ちゅう}1）されていたからビジネスにも{影響|えいきょう}があっただろうし、{航空業界|こうくうぎょうかい}の{損失|そんしつ}（{注|ちゅう}2）は2,000{億|おく}{円|えん}とか3,000{億|おく}{円|えん}とか、とにかく、すごい{額|がく}らしいから。",
				cn: "能飞了真是太好了。不只是乘客，货物也被困住了，生意大概也受了影响；航空业的损失据说有 2000 亿日元、3000 亿日元什么的，反正是个天文数字。",
				en: "Good that they can fly again. Not just passengers—goods were stranded too, so business must have been hit, and the airline industry’s losses are something like 200 billion or 300 billion yen; anyway, a huge amount.",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "足止め", jp: "being trapped", cn: "困住、动弹不得", en: "being trapped / stranded" },
			{ marker: "（注2）", term: "損失", jp: "a loss", cn: "损失", en: "a loss" },
		],
		choices: [
			{ jp: "{空港|くうこう}で{催|もよお}し{物|もの}があったので、{観光客|かんこうきゃく}は{出発|しゅっぱつ}を{遅|おく}らせた。", cn: "机场有活动，所以游客推迟了出发。", en: "There was an event at the airport, so tourists delayed their departure." },
			{ jp: "{自然災害|しぜんさいがい}の{影響|えいきょう}で{予定|よてい}の{飛行機|ひこうき}に{乗|の}れない{人|ひと}たちがいた。", cn: "受自然灾害影响，有人没能坐上预定的飞机。", en: "Because of a natural disaster, some people could not board their scheduled flights." },
			{ jp: "{乱|みだ}れていた{空|そら}のダイヤはまだもとに{戻|もど}らない。", cn: "被打乱的航班时刻表还没有恢复。", en: "The disrupted flight schedule has not yet returned to normal." },
			{ jp: "この{災害|さいがい}で{観光客|かんこうきゃく}だけでなく{輸出|ゆしゅつ}や{輸入|ゆにゅう}の{商品|しょうひん}も{影響|えいきょう}を{受|う}けた。", cn: "这场灾害不仅影响了游客，进出口货物也受到了影响。", en: "This disaster affected not only tourists but also exported and imported goods." },
			{ jp: "この{災害|さいがい}の{影響|えいきょう}でホテル{業界|ぎょうかい}は{多額|たがく}の{利益|りえき}を{得|え}た。", cn: "受这场灾害影响，酒店业获得了巨额利润。", en: "Because of this disaster the hotel industry made a large profit." },
		],
		answers: [2, 4],
	},

	mondai: {
		instruction: "{次|つぎ}の{新聞記事|しんぶんきじ}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的新闻报道，回答后面的问题。（答案在别册 p.6）",
		instructionEn: "Read the newspaper article below and answer the questions that follow. (Answers are in the separate booklet, p. 6.)",
		blocks: [
			{
				type: "title",
				jp: "A{国|こく} {火山噴火|かざんふんか}（{注|ちゅう}1） 「{空|そら}の{足|あし}」{正常化|せいじょうか}",
				cn: "A 国火山喷发　「空中交通」恢复正常",
				en: "Country A volcanic eruption: “air legs” back to normal",
			},
			{
				type: "paragraph",
				jp: "A{国|こく}{火山噴火|かざんふんか}による{影響|えいきょう}で、{大混乱|だいこんらん}となっていた{欧州|おうしゅう}の{航空輸送網|こうくうゆそうもう}（{注|ちゅう}2）が22{日中|にちじゅう}に{正常化|せいじょうか}する{見通|みとお}しを{発表|はっぴょう}した。15{日|にち}に{火山灰|かざんばい}（{注|ちゅう}3）が{拡散|かくさん}（{注|ちゅう}4）して、{以来|いらい}10{万便|まんびん}{以上|いじょう}が{欠航|けっこう}、{世界中|せかいじゅう}で700{万|まん}{人|にん}{以上|いじょう}が{足止|あしど}めされた。{航空業界|こうくうぎょうかい}の{受|う}けた{損失|そんしつ}は15{億|おく}〜25{億|おく}ユーロに{上|のぼ}るとみられ、{観光業|かんこうぎょう}を{含|ふく}めるとさらに{損失|そんしつ}は{拡大|かくだい}するとみられている。",
				cn: "因 A 国火山喷发，陷入大混乱的欧洲航空运输网发表了将于 22 日当天恢复正常的展望。15 日火山灰扩散以来，逾 10 万个航班停飞，全世界有 700 万人以上滞留。航空业蒙受的损失估计达 15 亿至 25 亿欧元，若把旅游业也算进去，损失还会进一步扩大。",
				en: "It was announced that Europe’s air-transport network, thrown into chaos by Country A’s volcanic eruption, is expected to return to normal during the 22nd. Since volcanic ash spread on the 15th, more than 100,000 flights have been cancelled and more than 7 million people worldwide have been stranded. Losses to the airline industry are put at 1.5 to 2.5 billion euros, and if tourism is included the damage is expected to grow still further.",
				indent: true,
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "火山噴火", jp: "a volcanic eruption", cn: "火山喷发", en: "a volcanic eruption" },
			{ marker: "（注2）", term: "航空輸送網", jp: "an air transportation network", cn: "航空运输网", en: "an air transportation network" },
			{ marker: "（注3）", term: "火山灰", jp: "volcanic ashes", cn: "火山灰", en: "volcanic ash" },
			{ marker: "（注4）", term: "拡散する", jp: "to diffuse", cn: "扩散", en: "to diffuse / spread" },
		],
		pageNotes: [
			{
				jp: "The financial damage to the airline industry may amount to between 15-25 billion euros, and more, if you include the tourist industry.",
				cn: "航空业蒙受的损失预计将超过 15 亿〜25 亿欧元，若加上旅游业则损失会更大。",
				en: "The financial damage to the airline industry may amount to between 15-25 billion euros, and more, if you include the tourist industry.",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "「{空|そら}の{足|あし}」とは{何|なに}か。",
				cn: "「空の足」指的是什么？",
				en: "What does “空の足” refer to?",
				choices: [
					{ jp: "{観光業|かんこうぎょう}", cn: "旅游业", en: "the tourist industry" },
					{ jp: "{空港|くうこう}の{構内|こうない}", cn: "机场场内", en: "the airport premises" },
					{ jp: "{航空業界|こうくうぎょうかい}", cn: "航空业", en: "the airline industry" },
					{ jp: "{飛行機|ひこうき}の{便|びん}", cn: "航班", en: "flights / air services" },
				],
				answer: 4,
				explanation:
					"标题「『空の足』正常化」对应正文「航空輸送網が22日中に正常化する」。报纸标题常把「航班／空中交通」说成「空の足」（空中的脚＝交通手段）。所以不是旅游业、不是机场场内、也不等于整个航空业界，而是「飛行機の便」。选 4。本课要点就是把省略助词的标题还原成完整句子。",
				explanationEn:
					"The headline “空の足 back to normal” matches the lead “the air-transport network is expected to return to normal during the 22nd.” Newspaper headlines often call flights “空の足” (legs in the sky = a means of travel). It is not tourism, not the airport grounds, and not the airline industry as a whole, but the flights themselves. Choose 4. The lesson is to expand a particle-dropped headline into a full sentence.",
				choiceNotes: [
					"旅游业只是损失会「さらに拡大」的附加行业，不是「空の足」。",
					"正文说的是欧洲的航空运输网恢复，不是机场建筑物内部。",
					"航空业是蒙受损失的主体；「空の足」指的是航班本身。",
					"正确。标题的「空の足」＝飞行／航班恢复正常。",
				],
				choiceNotesEn: [
					"Tourism is only mentioned as a further source of losses, not as “空の足.”",
					"The article is about Europe’s air network recovering, not the inside of an airport.",
					"The airline industry is who took the losses; “空の足” is the flights themselves.",
					"Correct. In the headline, “空の足” = flights returning to normal.",
				],
			},
			{
				label: "問2",
				jp: "この{記事|きじ}の{内容|ないよう}と{合|あ}っているものはどれか。",
				cn: "与这篇报道内容相符的是哪一项？",
				en: "Which of the following matches the content of this article?",
				choices: [
					{ jp: "この{災害|さいがい}による{航空|こうくう}、{観光業界|かんこうぎょうかい}の{損失|そんしつ}は25{億|おく}ユーロにとどまった。", cn: "这场灾害给航空、旅游业造成的损失止于 25 亿欧元。", en: "Losses to aviation and tourism from this disaster stopped at 2.5 billion euros." },
					{ jp: "{火山|かざん}が{噴火|ふんか}するといつも{飛行機|ひこうき}は{飛|と}べなくなる。", cn: "火山一喷发，飞机就总是飞不了。", en: "Whenever a volcano erupts, planes always become unable to fly." },
					{ jp: "{火山噴火|かざんふんか}の{影響|えいきょう}で{観光客|かんこうきゃく}は{欧州旅行|おうしゅうりょこう}を{中止|ちゅうし}し、{日本|にほん}などアジアへ{来|き}た。", cn: "受火山喷发影响，游客取消了欧洲旅行，改来日本等亚洲国家。", en: "Because of the eruption, tourists cancelled trips to Europe and came to Japan and the rest of Asia." },
					{ jp: "{混乱|こんらん}から{正常化|せいじょうか}まで1{週間|しゅうかん}かかった。", cn: "从混乱到恢复正常花了一周。", en: "It took one week from the chaos until things returned to normal." },
				],
				answer: 4,
				explanation:
					"15 日火山灰扩散、22 日当天可望恢复正常，正好约一周，与练习对话里的「1週間よ」也对应。选 4。1 的「とどまった」（仅仅止于）不对：损失是 15〜25 亿欧元的区间，加上旅游业还会再扩大。2 的「いつも」原文没有。3 完全没写。",
				explanationEn:
					"Ash spread on the 15th and recovery is expected during the 22nd—about one week—which also matches the practice dialogue (“a whole week”). Choose 4. 1’s todomatta (“stopped at / only”) is wrong: the figure is a 1.5–2.5 billion-euro range, and tourism would add still more. 2’s “always” is not in the text. 3 is not mentioned at all.",
				choiceNotes: [
					"损失是 15〜25 亿欧元，且含旅游业会「さらに拡大」，不是「止于 25 亿」。",
					"只写了这一次喷发造成停飞，没有「每次喷发都飞不了」。",
					"游客改去亚洲这一点原文没有。",
					"正确。15 日→22 日，约一周恢复。",
				],
				choiceNotesEn: [
					"Losses are a 15–25 億 euro range, and with tourism they “expand further”—not “capped at 25 億.”",
					"The article describes this eruption, not “planes can never fly whenever a volcano erupts.”",
					"Nothing says tourists redirected to Asia.",
					"Correct. From the 15th to the 22nd is about one week.",
				],
			},
		],
	},

	vocab: [
		{ jp: "見出し", kana: "みだし", cn: "标题、头条", en: "headline", pos: "名詞" },
		{ jp: "延期", kana: "えんき", cn: "延期", en: "postponement", pos: "名詞・動詞" },
		{ jp: "開通", kana: "かいつう", cn: "开通", en: "opening (of a line)", pos: "名詞・動詞" },
		{ jp: "収益", kana: "しゅうえき", cn: "收益", en: "revenue; profits", pos: "名詞" },
		{ jp: "悪化", kana: "あっか", cn: "恶化", en: "worsening", pos: "名詞・動詞" },
		{ jp: "公演", kana: "こうえん", cn: "公演、演出", en: "performance", pos: "名詞" },
		{ jp: "長蛇の列", kana: "ちょうだのれつ", cn: "长龙、长队", en: "a very long line", pos: "表現" },
		{ jp: "判決", kana: "はんけつ", cn: "判决", en: "verdict", pos: "名詞" },
		{ jp: "放火", kana: "ほうか", cn: "纵火", en: "arson", pos: "名詞・動詞" },
		{ jp: "被告", kana: "ひこく", cn: "被告", en: "defendant", pos: "名詞" },
		{ jp: "懲役", kana: "ちょうえき", cn: "有期徒刑", en: "prison term", pos: "名詞" },
		{ jp: "噴火", kana: "ふんか", cn: "喷发", en: "eruption", pos: "名詞・動詞" },
		{ jp: "正常化", kana: "せいじょうか", cn: "恢复正常", en: "returning to normal", pos: "名詞・動詞" },
		{ jp: "混乱", kana: "こんらん", cn: "混乱", en: "chaos; confusion", pos: "名詞・動詞" },
		{ jp: "欠航", kana: "けっこう", cn: "停飞、取消航班", en: "flight cancellation", pos: "名詞・動詞" },
		{ jp: "足止め", kana: "あしどめ", cn: "困住、滞留", en: "being stranded", pos: "名詞・動詞" },
		{ jp: "損失", kana: "そんしつ", cn: "损失", en: "loss (financial)", pos: "名詞" },
		{ jp: "拡散", kana: "かくさん", cn: "扩散", en: "diffusion; spreading", pos: "名詞・動詞" },
		{ jp: "見通し", kana: "みとおし", cn: "展望、预料", en: "outlook; prospect", pos: "名詞" },
		{ jp: "寝袋", kana: "ねぶくろ", cn: "睡袋", en: "sleeping bag", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜見通し",
			formation: "動詞辞書形／普通形＋見通し",
			meaning: "预计会……、有……的展望。新闻里常用来报今后的走势。",
			meaningEn: "the outlook is that… / … is expected. Common in news for a coming trend.",
			example: {
				jp: "22{日中|にちじゅう}に{正常化|せいじょうか}する{見通|みとお}しを{発表|はっぴょう}した。",
				cn: "发表了将于 22 日当天恢复正常的展望。",
				en: "They announced the outlook that it would return to normal during the 22nd.",
			},
		},
		{
			pattern: "〜とみられる／〜とみられている",
			formation: "普通形＋とみられる",
			meaning: "据估计……、一般认为……。报道对尚未完全确定的数字、判断常用。",
			meaningEn: "is seen as… / is estimated to…. Used in reporting for figures and judgments that are not fully confirmed.",
			example: {
				jp: "{損失|そんしつ}は15{億|おく}〜25{億|おく}ユーロに{上|のぼ}るとみられる。",
				cn: "损失估计高达 15 亿至 25 亿欧元。",
				en: "Losses are estimated to amount to 1.5 to 2.5 billion euros.",
			},
		},
		{
			pattern: "〜以来",
			formation: "名詞／動詞て形＋以来",
			meaning: "自从……以来（一直持续到现在）。",
			meaningEn: "since… (and continuing up to now).",
			example: {
				jp: "15{日|にち}に{火山灰|かざんばい}が{拡散|かくさん}して、{以来|いらい}10{万便|まんびん}{以上|いじょう}が{欠航|けっこう}。",
				cn: "自 15 日火山灰扩散以来，逾 10 万个航班停飞。",
				en: "Since the ash spread on the 15th, more than 100,000 flights have been cancelled.",
			},
		},
	],
};
