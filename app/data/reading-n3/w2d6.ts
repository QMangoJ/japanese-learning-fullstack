import type { ReadingDay } from "./types";

// 第2週 6日目 保証書 — printed pages 38–39
export const w2d6: ReadingDay = {
	week: 2,
	day: 6,
	label: "保証書",
	labelKana: "ほしょうしょ",
	labelEn: "Warranties",
	printedPages: [38, 39],
	answerSource: "book",

	point: {
		title: "{重要|じゅうよう}な{部分|ぶぶん}だけ{読|よ}もう！",
		titleCn: "只读重要的部分！",
		titleEn: "Just read the important points!",
		figure: {
			alt: "「こんな小さな字、読みたくない！」と嫌がる人と、虫めがねで保証書を見ながら「そこに大事なことが書いてあったりするよ！」と言う人",
			cn: "一个人嫌弃地说「这么小的字，我才不想读！」，另一个人拿着放大镜看保修单说「重要的事情往往就写在那里哦！」",
			en: "One person complains, “I don’t want to read such tiny print!” while another looks at the warranty with a magnifying glass and says, “That’s often where the important information is written!”",
		},
		tips: [
			{
				jp: "{保証書|ほしょうしょ}は{小|ちい}さい{字|じ}が{多|おお}いが、「{有料|ゆうりょう}になる{場合|ばあい}」「{記入|きにゅう}が{必要|ひつよう}な{欄|らん}」など、{大事|だいじ}なところだけを{探|さが}して{読|よ}めばよい。",
				cn: "保修单上小字很多，但只要找出「什么情况要收费」「哪些栏必须填写」这些关键处来读就够了。",
				en: "Warranties are full of tiny print, but you only need to find and read the key parts, such as “cases that will cost money” and “fields that must be filled in.”",
			},
		],
		expressions: [
			{ jp: "保証期間内", kana: "ほしょうきかんない", cn: "保修期间内", en: "within the term of the warranty" },
			{ jp: "販売店名", kana: "はんばいてんめい", cn: "销售店名", en: "name of the store at which the goods were purchased" },
			{ jp: "お買い上げ日", kana: "おかいあげび", cn: "购买日", en: "the date of purchase" },
			{ jp: "はんこ／印", kana: "しるし", cn: "印章／印", en: "a seal / stamp" },
			{ jp: "たとえ〜でも", cn: "即使……也……", en: "even if" },
			{ jp: "空欄", kana: "くうらん", cn: "空白栏（没有填写）", en: "empty (not filled in)" },
			{ jp: "記載", kana: "きさい", cn: "记载（本文件上写明的内容）", en: "written (in this document)" },
			{ jp: "サイン", cn: "签名", en: "signature" },
			{ jp: "万が一〜でも", kana: "まんがいち", cn: "万一……也……", en: "if by any chance" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{妻|つま}",
				speakerCn: "妻子",
				speakerEn: "Wife",
				jp: "やっぱり、このコーヒーメーカー（※）{壊|こわ}れてる。",
				cn: "果然，这台咖啡机坏了。",
				en: "Just as I thought — this coffee maker (※) is broken.",
			},
			{
				type: "speech",
				speaker: "{夫|おっと}",
				speakerCn: "丈夫",
				speakerEn: "Husband",
				jp: "{修理|しゅうり}に{出|だ}そう。{保証書|ほしょうしょ}あるよね？",
				cn: "拿去修吧。保修单还在吧？",
				en: "Let’s send it in for repair. We have the warranty, right?",
			},
			{
				type: "speech",
				speaker: "{妻|つま}",
				speakerCn: "妻子",
				speakerEn: "Wife",
				jp: "うん、たしか{買|か}ったのは{今年|ことし}だから、まだ{保証期間内|ほしょうきかんない}だよね。えーと……、{保証書|ほしょうしょ}、これだよね？",
				cn: "嗯，记得是今年买的，应该还在保修期内吧。我看看……保修单，是这张吧？",
				en: "Yeah, I’m pretty sure we bought it this year, so it should still be under warranty. Let’s see… this is the warranty, right?",
			},
			{
				type: "speech",
				speaker: "{夫|おっと}",
				speakerCn: "丈夫",
				speakerEn: "Husband",
				jp: "ちょっと{見|み}せて。あー、お{買|か}い{上|あ}げ{日|び}も{販売店名|はんばいてんめい}のところも{空欄|くうらん}だ。これだと{役|やく}に{立|た}たないよ。{修理代|しゅうりだい}かかっちゃうけれど、しかたがないね。",
				cn: "给我看看。啊——购买日和销售店名那栏都是空的。这样就没用了。虽然要花修理费，但也没办法了。",
				en: "Let me see. Ah — both the date of purchase and the store name are blank. That means this is no use. We’ll have to pay for the repair, but there’s nothing we can do.",
			},
		],
		footnotes: [{ marker: "※", term: "コーヒーメーカー", jp: "a coffee maker", cn: "咖啡机", en: "a coffee maker" }],
		choices: [
			{ jp: "{夫婦|ふうふ}は、このコーヒーメーカーの{保証書|ほしょうしょ}を{持|も}っている。", cn: "这对夫妻持有这台咖啡机的保修单。", en: "The couple have the warranty for this coffee maker." },
			{ jp: "{保証書|ほしょうしょ}にはこのコーヒーメーカーを{買|か}った{店|みせ}のはんこが{押|お}してある。", cn: "保修单上盖有购买这台咖啡机的店家的印章。", en: "The warranty has the seal of the store where they bought this coffee maker." },
			{ jp: "このコーヒーメーカーの{保証書|ほしょうしょ}は{有効|ゆうこう}である。", cn: "这台咖啡机的保修单是有效的。", en: "The warranty for this coffee maker is valid." },
			{ jp: "このコーヒーメーカーの{修理|しゅうり}は{有料|ゆうりょう}になるだろう。", cn: "这台咖啡机的修理大概要收费。", en: "Repairing this coffee maker will probably cost money." },
			{ jp: "{夫婦|ふうふ}はこのコーヒーメーカーを{修理|しゅうり}に{出|だ}さないことにした。", cn: "这对夫妻决定不把这台咖啡机送修。", en: "The couple decided not to send this coffee maker in for repair." },
		],
		answers: [1, 4],
		hint: {
			jp: "{保証書|ほしょうしょ}は{持|も}っているが、お{買|か}い{上|あ}げ{日|び}も{販売店名|はんばいてんめい}も{空欄|くうらん}。だから「{役|やく}に{立|た}たない」＝{無料修理|むりょうしゅうり}が{受|う}けられない。",
			cn: "保修单虽然有，但购买日和店名都是空白，所以「派不上用场」＝享受不到免费修理，要自己付修理费。他们并没有说不修。",
			en: "They do have the warranty, but both the date of purchase and the store name are blank. So “it’s no use” means they cannot get a free repair. They never said they would not have it repaired.",
		},
	},

	mondai: {
		instruction: "{下|した}の{保証書|ほしょうしょ}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的保修单，回答后面的问题。（答案在别册 p.3）",
		instructionEn: "Read the warranty below and answer the questions that follow. (Answers are in the separate booklet, p. 3.)",
		blocks: [
			{ type: "title", jp: "ヤマノ　コーヒーメーカー{保証書|ほしょうしょ}", cn: "山野　咖啡机保修单", en: "Yamano Coffee Maker Warranty" },
			{
				type: "table",
				rows: [
					[
						{ jp: "{型名|かためい}", cn: "型号", en: "Model name", header: true, align: "center" },
						{ jp: "DJ-B330", cn: "", en: "DJ-B330", align: "center" },
						{ jp: "{製造番号|せいぞうばんごう}", cn: "生产编号", en: "Serial number", header: true, align: "center" },
						{ jp: "0125K", cn: "", en: "0125K", align: "center" },
					],
					[
						{ jp: "お{客様|きゃくさま}", cn: "顾客", en: "Customer", header: true, rowSpan: 2, align: "center" },
						{ jp: "お{名前|なまえ}　　　　　　　{様|さま}", cn: "姓名", en: "Name　　　　　　　", colSpan: 2 },
						{ jp: "{電話番号|でんわばんごう}", cn: "电话号码", en: "Telephone number" },
					],
					[{ jp: "ご{住所|じゅうしょ}", cn: "住址", en: "Address", colSpan: 3 }],
					[
						{ jp: "お{買|か}い{上|あ}げ{日|び}＊", cn: "购买日", en: "Date of purchase ＊", header: true, align: "center" },
						{ jp: "　　　{年|ねん}　　　{月|がつ}　　　{日|にち}", cn: "　　年　　月　　日", en: "　　year　　month　　day" },
						{ jp: "{販売店|はんばいてん}★", cn: "销售店", en: "Store ★", header: true, rowSpan: 2, align: "center" },
						{
							jp: "{店名|てんめい}／{住所|じゅうしょ}／{電話番号|でんわばんごう}　　㊞またはサイン",
							cn: "店名／地址／电话号码　　盖章或签名",
							en: "Store name / address / telephone number　　seal or signature",
							rowSpan: 2,
						},
					],
					[
						{ jp: "{保証期間|ほしょうきかん}", cn: "保修期间", en: "Warranty period", header: true, align: "center" },
						{ jp: "お{買|か}い{上|あ}げ{日|び}より1{年間|ねんかん}", cn: "自购买日起 1 年", en: "1 year from the date of purchase" },
					],
				],
			},
			{
				type: "list",
				marker: "●",
				items: [
					{
						jp: "この{保証書|ほしょうしょ}は、{記載|きさい}の{内容|ないよう}で{無料修理|むりょうしゅうり}を{行|おこな}うことをお{約束|やくそく}するものです＊。",
						cn: "本保修单承诺按所记载的内容提供免费修理＊。",
						en: "This warranty promises free repairs as described herein.＊",
					},
					{ jp: "★はお{買|か}い{上|あ}げいただいた{販売店|はんばいてん}が{記入|きにゅう}する{欄|らん}です＊＊。", cn: "★是由您购买产品的销售店填写的栏目＊＊。", en: "★ is the section to be filled in by the store where you purchased the product.＊＊" },
					{ jp: "（　　　　　　）{次|つぎ}の{場合|ばあい}には{有料修理|ゆうりょうしゅうり}になります。", cn: "（　　　　　　）以下情况将收费修理。", en: "(　　　　　　) In the following cases, repairs will be charged." },
				],
			},
			{
				type: "list",
				marker: "・",
				items: [
					{ jp: "{不適切|ふてきせつ}なご{使用|しよう}による{故障|こしょう}＊＊＊", cn: "因使用不当造成的故障＊＊＊", en: "Breakdowns resulting from improper use ＊＊＊" },
					{ jp: "{一般家庭|いっぱんかてい}（{国内|こくない}）{用以外|よういがい}に{使用|しよう}された{場合|ばあい}の{故障|こしょう}", cn: "在一般家庭（国内）用途以外使用而造成的故障", en: "Breakdowns when the product is used for purposes other than ordinary household use (in Japan)" },
					{ jp: "★{欄|らん}に{記入|きにゅう}のない{場合|ばあい}", cn: "★栏未填写的情况", en: "When the ★ section has not been filled in" },
				],
			},
		],
		pageNotes: [
			{
				jp: "＊ This warranty assures you free repairs of the product as described within.",
				cn: "＊本保修单保证对所记载的商品进行免费修理。",
				en: "This warranty assures you free repairs of the product as described within.",
			},
			{
				jp: "＊＊ ★ is the section to be filled in by the store where you purchased the product.",
				cn: "＊＊★栏是由您购买产品的销售店填写的部分。",
				en: "★ is the section to be filled in by the store where you purchased the product.",
			},
			{ jp: "＊＊＊ trouble resulting from the improper use of the product", cn: "＊＊＊因使用不当而发生的故障", en: "trouble resulting from the improper use of the product" },
		],
		questions: [
			{
				label: "問1",
				jp: "（　　）の{中|なか}に{入|はい}る{言葉|ことば}として{最|もっと}も{適当|てきとう}なものはどれか。",
				cn: "填入（　　）中最恰当的词语是哪一个？",
				en: "Which wording is the most appropriate to fill in the parentheses?",
				choices: [
					{ jp: "たとえ{保証期間以降|ほしょうきかんいこう}でも", cn: "即使在保修期以后", en: "Even after the warranty period" },
					{ jp: "たとえ{保証期間以上|ほしょうきかんいじょう}でも", cn: "即使超过保修期", en: "Even if it is more than the warranty period" },
					{ jp: "たとえ{保証期間内|ほしょうきかんない}でも", cn: "即使在保修期内", en: "Even within the warranty period" },
					{ jp: "たとえ{保証期間外|ほしょうきかんがい}でも", cn: "即使在保修期外", en: "Even outside the warranty period" },
				],
				answer: 3,
				explanation:
					"保修期过了本来就要收费，这是当然的事，用「たとえ〜でも」就没有意义了。「たとえ〜でも」表示的是「即使在一般认为可以免费的情况下也……」，所以后面接的必须是「保証期間内」——即使还在保修期内，只要属于下面三种情况（使用不当、非家用、★栏空白）也要收费。因此 3 正确。",
				explanationEn:
					"Once the warranty period is over, a charge is only natural, so tatoe…demo (“even if”) would be pointless. Tatoe…demo is used for “even in a situation where you would normally expect a free repair,” so what follows must be “within the warranty period”: even if you are still under warranty, the three cases below (improper use, non-household use, a blank ★ section) will still be charged. So 3 is correct.",
				choiceNotes: [
					"保修期以后收费是理所当然的，不需要用「たとえ〜でも」来强调。",
					"「保証期間以上」这种说法本身不自然，期间不用「以上」来表达。",
					"正确。即使在保修期内，符合下列情况也要收费。",
					"与 1 同理，期外收费本来就是常识，语气上不成立。",
				],
				choiceNotesEn: [
					"A charge after the warranty period is only to be expected, so there is no need to stress it with tatoe…demo.",
					"Hoshō kikan ijō is not a natural way to say this; ijō is not used of a time period here.",
					"Correct. Even within the warranty period, the cases listed below will still be charged.",
					"Same as 1: a charge outside the period is common sense, so the wording does not work.",
				],
			},
			{
				label: "問2",
				jp: "{無料|むりょう}で{修理|しゅうり}をしてくれるのはどの{場合|ばあい}か。",
				cn: "在哪种情况下可以免费修理？",
				en: "In which of the following cases will the product be repaired free of charge?",
				choices: [
					{
						jp: "{保証書|ほしょうしょ}に{全部記入|ぜんぶきにゅう}されていて、{買|か}って1{年以内|ねんいない}に{故障|こしょう}した{場合|ばあい}",
						cn: "保修单全部填写完整，且购买后 1 年以内发生故障的情况",
						en: "When the warranty is completely filled in and the product breaks down within one year of purchase",
					},
					{
						jp: "{保証書|ほしょうしょ}に{全部記入|ぜんぶきにゅう}されていて、{海外|かいがい}で3ヵ{月間使用|げつかんしよう}した{場合|ばあい}",
						cn: "保修单全部填写完整，但在海外使用了 3 个月的情况",
						en: "When the warranty is completely filled in, but the product was used overseas for three months",
					},
					{ jp: "{保証期間|ほしょうきかん}を{過|す}ぎているが、{正|ただ}しく{使用|しよう}していた{場合|ばあい}", cn: "已超过保修期，但一直正确使用的情况", en: "When the warranty period has already passed, but the product was used correctly" },
					{ jp: "★{欄|らん}を{含|ふく}めて{保証書|ほしょうしょ}を{全部自分|ぜんぶじぶん}で{記入|きにゅう}した{場合|ばあい}", cn: "包括★栏在内，保修单全部由自己填写的情况", en: "When you filled in the entire warranty yourself, including the ★ section" },
				],
				answer: 1,
				explanation:
					"免费修理需要同时满足：①在保修期内（お買い上げ日より1年間）②不属于列出的三种收费情况。选项 1 中保修单填写完整（★栏也填了）、且在 1 年以内故障，两个条件都满足，所以可以免费修理。",
				explanationEn:
					"A free repair requires both: (1) you are still within the warranty period (one year from the date of purchase), and (2) none of the three charged cases apply. In choice 1 the warranty is completely filled in (including the ★ section) and the breakdown is within one year, so both conditions are met and the repair is free.",
				choiceNotes: [
					"正确。保修期内 ＋ 保修单填写完整。",
					"「一般家庭（国内）用以外に使用された場合」属于收费项目，海外使用不能免费。",
					"超过保修期就不在免费范围内，即使使用正确也要收费。",
					"★栏规定是「お買い上げいただいた販売店が記入する欄」，由自己填写等于该栏无效，属于「★欄に記入のない場合」，要收费。",
				],
				choiceNotesEn: [
					"Correct. Within the warranty period + the warranty is completely filled in.",
					"“Used for purposes other than ordinary household use (in Japan)” is a charged case, so overseas use is not free.",
					"Once the warranty period has passed, the repair is no longer free, even if the product was used correctly.",
					"The ★ section is “to be filled in by the store where you purchased the product.” Filling it in yourself makes that section invalid, which counts as “the ★ section has not been filled in,” so it is charged.",
				],
			},
		],
	},

	vocab: [
		{ jp: "保証書", kana: "ほしょうしょ", cn: "保修单、保证书", en: "warranty; guarantee", pos: "名詞" },
		{ jp: "保証期間", kana: "ほしょうきかん", cn: "保修期间", en: "warranty period", pos: "名詞" },
		{ jp: "型名", kana: "かためい", cn: "型号名", en: "model name", pos: "名詞" },
		{ jp: "製造番号", kana: "せいぞうばんごう", cn: "生产编号", en: "serial number", pos: "名詞" },
		{ jp: "お買い上げ日", kana: "おかいあげび", cn: "购买日", en: "date of purchase", pos: "名詞" },
		{ jp: "販売店", kana: "はんばいてん", cn: "销售店", en: "store (where the product was sold)", pos: "名詞" },
		{ jp: "空欄", kana: "くうらん", cn: "空白栏", en: "blank field; empty box", pos: "名詞" },
		{ jp: "欄", kana: "らん", cn: "栏", en: "column; field (on a form)", pos: "名詞" },
		{ jp: "記載", kana: "きさい", cn: "记载", en: "what is written (in a document)", pos: "名詞・動詞" },
		{ jp: "記入する", kana: "きにゅうする", cn: "填写", en: "to fill in", pos: "動詞" },
		{ jp: "無料修理", kana: "むりょうしゅうり", cn: "免费修理", en: "free repair", pos: "名詞" },
		{ jp: "有料", kana: "ゆうりょう", cn: "收费", en: "charged; not free", pos: "名詞" },
		{ jp: "不適切", kana: "ふてきせつ", cn: "不恰当、不当", en: "improper; inappropriate", pos: "な形" },
		{ jp: "故障", kana: "こしょう", cn: "故障", en: "breakdown; malfunction", pos: "名詞・動詞" },
		{ jp: "一般家庭", kana: "いっぱんかてい", cn: "一般家庭", en: "ordinary household", pos: "名詞" },
		{ jp: "有効", kana: "ゆうこう", cn: "有效", en: "valid; in effect", pos: "な形" },
		{ jp: "役に立つ", kana: "やくにたつ", cn: "有用、派上用场", en: "to be of use; to be useful", pos: "表現" },
		{ jp: "壊れる", kana: "こわれる", cn: "坏、损坏", en: "to break; to stop working", pos: "動詞" },
		{ jp: "しかたがない", cn: "没办法", en: "it can’t be helped; there’s nothing we can do", pos: "表現" },
		{ jp: "含める", kana: "ふくめる", cn: "包括", en: "to include", pos: "動詞" },
	],

	grammar: [
		{
			pattern: "たとえ〜でも",
			formation: "たとえ ＋ 名詞＋でも／動詞て形＋も",
			meaning: "即使……也……。用于强调「连一般认为例外的情况也不例外」。",
			meaningEn: "even if…. Used to stress that something still applies even in a case you would normally treat as an exception.",
			example: { jp: "たとえ{保証期間内|ほしょうきかんない}でも{有料修理|ゆうりょうしゅうり}になります。", cn: "即使在保修期内也要收费修理。", en: "Even within the warranty period, the repair will be charged." },
			note: "本课要点。后面接的一定是「按常理应该没问题的情况」。",
			noteEn: "The key point of this lesson. What follows must be a situation that would normally be fine.",
		},
		{
			pattern: "{万|まん}が{一|いち}〜でも",
			meaning: "万一……也……。表示极低概率的假设。",
			meaningEn: "even if by any chance…. Used for a very unlikely hypothetical.",
			example: { jp: "{万|まん}が{一故障|いちこしょう}しても{無料|むりょう}で{修理|しゅうり}します。", cn: "万一发生故障也免费修理。", en: "Even if it should break down, we will repair it free of charge." },
		},
		{
			pattern: "〜による",
			formation: "名詞 ＋ による",
			meaning: "由……引起的、因……造成的。",
			meaningEn: "caused by… / resulting from….",
			example: { jp: "{不適切|ふてきせつ}なご{使用|しよう}による{故障|こしょう}", cn: "因使用不当造成的故障", en: "a breakdown resulting from improper use" },
		},
		{
			pattern: "〜{以外|いがい}に",
			formation: "名詞 ＋ 以外に",
			meaning: "除……以外。用来划定范围。",
			meaningEn: "other than… / besides…. Used to draw a boundary.",
			example: { jp: "{一般家庭|いっぱんかてい}（{国内|こくない}）{用以外|よういがい}に{使用|しよう}された{場合|ばあい}", cn: "在一般家庭（国内）用途以外使用的情况", en: "when it is used for purposes other than ordinary household use (in Japan)" },
		},
		{
			pattern: "〜ものです",
			formation: "動詞辞書形／名詞＋の ＋ ものです",
			meaning: "是……的东西、表示……。用于下定义、作说明。",
			meaningEn: "is something that…. Used to define or explain.",
			example: {
				jp: "{無料修理|むりょうしゅうり}を{行|おこな}うことをお{約束|やくそく}するものです。",
				cn: "本单是承诺提供免费修理的凭证。",
				en: "This is a document that promises free repairs.",
			},
		},
		{
			pattern: "〜と（条件）",
			meaning: "一……就……、这样的话就……。表示必然的结果。",
			meaningEn: "if… / when… (then). Used for a necessary result.",
			example: { jp: "これだと{役|やく}に{立|た}たないよ。", cn: "这样的话就派不上用场了。", en: "If it’s like this, it won’t be of any use." },
		},
		{
			pattern: "〜ちゃう（＝〜てしまう）",
			meaning: "……掉了、（不情愿地）……了。口语缩略形。",
			meaningEn: "end up …-ing / (unfortunately) …. Spoken contraction of ~te shimau.",
			example: { jp: "{修理代|しゅうりだい}かかっちゃうけれど", cn: "虽然要花修理费", en: "it’ll end up costing us a repair fee, but…" },
		},
	],
};
