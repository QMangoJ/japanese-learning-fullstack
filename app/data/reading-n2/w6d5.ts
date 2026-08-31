import type { ReadingDay } from "../reading-n3/types";

// 第6週 5日目 医学に関する文章 — printed pages 104–105
export const w6d5: ReadingDay = {
	week: 6,
	day: 5,
	label: "医学に関する文章",
	labelKana: "いがくにかんするぶんしょう",
	labelEn: "Article on Medicine",
	printedPages: [104, 105],
	answerSource: "book",

	point: {
		title: "{複雑|ふくざつ}な{文章|ぶんしょう}を{整理|せいり}して{理解|りかい}しよう！②",
		titleCn: "整理并理解复杂的文章内容！②",
		titleEn: "Try to understand the complicated sentences by reorganizing them! ②",
		figure: {
			alt: "駅などに置かれた AED の機械の前で「これ何？」と首をかしげるキャラクター",
			cn: "角色对着放在车站等地的 AED 机器歪头问：「这是什么？」",
			en: "A character tilts its head at an AED machine: “What’s this?”",
		},
		tips: [
			{
				jp: "{例|たと}えば、{右|みぎ}の{文章|ぶんしょう}はこんな{構成|こうせい}になっています。",
				cn: "比如，右页的文章就是这样的结构。",
				en: "For example, the passage on the right is organized like this.",
			},
			{
				jp: "【{何|なに}について{話|はな}すか】「AED」という{装置|そうち}……ご{存|ぞん}じですか？　【それは{何|なに}なのか】「AED」とは……です。　【{詳|くわ}しい{説明|せつめい}】2004{年|ねん}から……　【{意見|いけん}の{根拠|こんきょ}】{少|すこ}しでも{早|はや}く……「AED」を{使|つか}って……{行|おこな}うことが{重要|じゅうよう}　【{筆者|ひっしゃ}の{意見|いけん}】「AED」が{使|つか}えるようにしましょう！",
				cn: "【谈什么】「AED」这种装置……各位知道吗？　【那是什么】「AED」是……。　【详细说明】从 2004 年起……　【意见的根据】哪怕早一秒……用「AED」……去做很重要　【笔者的意见】让我们也能使用「AED」吧！",
				en: "[What is this about?] Do you know of a device called “AED”…?  [What is it?] An AED is….  [Detailed explanation] Since 2004….  [Grounds for the opinion] Even a little sooner… using an AED… is important.  [The writer’s opinion] Let’s make it so AEDs can be used!",
			},
		],
		expressions: [
			{ jp: "装置", kana: "そうち", cn: "装置、设备", en: "device; apparatus" },
			{ jp: "ご存じですか", kana: "ごぞんじ", cn: "您知道吗（尊敬语）", en: "do you know? (honorific)" },
			{ jp: "心室細動", kana: "しんしつさいどう", cn: "心室纤颤", en: "ventricular fibrillation" },
			{ jp: "電気ショック", kana: "でんきしょっく", cn: "电击、电除颤", en: "electric shock (defibrillation)" },
			{ jp: "時間との勝負", kana: "じかんとのしょうぶ", cn: "与时间赛跑", en: "a race against time" },
			{ jp: "救命", kana: "きゅうめい", cn: "救命", en: "lifesaving" },
			{ jp: "応急処置", kana: "おうきゅうしょち", cn: "应急处理、急救", en: "first aid; emergency treatment" },
			{ jp: "講習会", kana: "こうしゅうかい", cn: "讲习班、培训会", en: "training session; workshop" },
		],
	},

	renshu: {
		instruction:
			"{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn:
			"Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{子|こ}ども",
				speakerCn: "孩子",
				speakerEn: "Child",
				jp: "お{母|かあ}さん、あれ{何|なに}？",
				cn: "妈妈，那是什么？",
				en: "Mom, what’s that?",
			},
			{
				type: "speech",
				speaker: "{母親|ははおや}",
				speakerCn: "母亲",
				speakerEn: "Mother",
				jp: "ああ、AEDっていうのよ。{急|きゅう}に{病気|びょうき}になって{倒|たお}れた{人|ひと}を{助|たす}ける{機械|きかい}なの。",
				cn: "啊，那叫 AED。是用来救助突然发病倒下的人的机器。",
				en: "Oh, that’s called an AED. It’s a machine that helps people who suddenly fall ill and collapse.",
			},
			{
				type: "speech",
				speaker: "{子|こ}ども",
				speakerCn: "孩子",
				speakerEn: "Child",
				jp: "{駅|えき}の{人|ひと}が{使|つか}うの？",
				cn: "是车站的人用的吗？",
				en: "Do the station staff use it?",
			},
			{
				type: "speech",
				speaker: "{母親|ははおや}",
				speakerCn: "母亲",
				speakerEn: "Mother",
				jp: "だれでも{使|つか}っていいの。{使|つか}い{方|かた}は{機械|きかい}がしゃべって{教|おし}えてくれるんだって。",
				cn: "谁都可以用。用法机器会开口教你。",
				en: "Anyone can use it. I hear the machine talks you through how to use it.",
			},
			{
				type: "speech",
				speaker: "{子|こ}ども",
				speakerCn: "孩子",
				speakerEn: "Child",
				jp: "へー、なんでも{治|なお}してくれるの？",
				cn: "诶——什么病都能治好吗？",
				en: "Huh — does it cure everything?",
			},
			{
				type: "speech",
				speaker: "{母親|ははおや}",
				speakerCn: "母亲",
				speakerEn: "Mother",
				jp: "ううん、{心臓|しんぞう}がおかしくなった{人|ひと}に{使|つか}うみたいよ。ほら、よくテレビドラマの{救急病院|きゅうきゅうびょういん}で{心臓|しんぞう}に{電気|でんき}ショックをしてるの{見|み}たことあるでしょ。あんなのらしいんだけど、お{母|かあ}さんもよくわからないから、{使|つか}えないと{思|おも}うなあ。",
				cn: "不是，好像是给心脏出问题的人用的。你看，电视剧里急救医院给心脏做电击，你见过的吧。好像就是那种，可妈妈也不太懂，觉得自己用不了。",
				en: "No, it seems to be for people whose heart has gone wrong. You know, on TV hospital dramas they give the heart an electric shock — you’ve seen that, right? It’s apparently like that, but I don’t really understand it either, so I don’t think I could use it.",
			},
			{
				type: "speech",
				speaker: "{子|こ}ども",
				speakerCn: "孩子",
				speakerEn: "Child",
				jp: "え！　じゃ、ぼくの{心臓|しんぞう}が{急|きゅう}に{止|と}まったらどうするの？",
				cn: "诶！那要是我的心脏突然停了怎么办？",
				en: "What? Then what if my heart suddenly stopped?",
			},
			{
				type: "speech",
				speaker: "{母親|ははおや}",
				speakerCn: "母亲",
				speakerEn: "Mother",
				jp: "そっか、そしたら、{使|つか}うかも。でも、ちゃんと{使|つか}えるのか{心配|しんぱい}。{練習|れんしゅう}させてほしいよね。{市役所|しやくしょ}に{聞|き}いたら、そういう{講習会|こうしゅうかい}があるかもね。{聞|き}いてみよう。",
				cn: "这样啊，那也许会用。可是能不能用对还挺担心的。真希望能让人练一练。去市政厅问问，也许有那种讲习班。去问一下吧。",
				en: "I see — then maybe I would use it. But I worry whether I could use it properly. I’d like to be allowed to practice. If we ask at city hall, there might be a training session like that. Let’s ask.",
			},
		],
		choices: [
			{
				jp: "AEDは{緊急時|きんきゅうじ}に{助|たす}けを{呼|よ}ぶ{機械|きかい}である。",
				cn: "AED 是紧急时呼叫救援的机器。",
				en: "An AED is a machine that calls for help in an emergency.",
			},
			{
				jp: "AEDは{急病人|きゅうびょうにん}に{使|つか}われる{医療機器|いりょうきき}である。",
				cn: "AED 是给急病人使用的医疗器械。",
				en: "An AED is a medical device used on people who suddenly fall ill.",
			},
			{
				jp: "AEDを{使|つか}うには{資格|しかく}が{必要|ひつよう}だ。",
				cn: "使用 AED 需要资格。",
				en: "You need a qualification to use an AED.",
			},
			{
				jp: "この{母親|ははおや}はAEDの{使|つか}い{方|かた}を{知|し}っている。",
				cn: "这位母亲知道 AED 的用法。",
				en: "This mother knows how to use an AED.",
			},
			{
				jp: "この{母親|ははおや}はAEDに{関心|かんしん}を{持|も}った。",
				cn: "这位母亲对 AED 产生了关心。",
				en: "This mother has taken an interest in AEDs.",
			},
		],
		answers: [2, 5],
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的文章，回答后面的问题。（答案在别册 p.7）",
		instructionEn: "Read the following passage and answer the questions that follow. (Answers are in the separate booklet, p. 7.)",
		blocks: [
			{
				type: "paragraph",
				indent: true,
				jp: "{近年|きんねん}、{学校|がっこう}やスポーツクラブ、{駅|えき}、デパートなどの{公共施設|こうきょうしせつ}で「AED」という{装置|そうち}を{見|み}かけるようになりました。みなさんはこのAEDとは{何|なに}か、またどのように{使|つか}ったらいいかをご{存|ぞん}じでしょうか。",
				cn: "近年来，在学校、体育俱乐部、车站、百货店等公共设施里，开始能看到名为「AED」的装置。各位知道这种 AED 是什么、以及该怎么用吗？",
				en: "In recent years a device called an “AED” has come to be seen at schools, sports clubs, stations, department stores, and other public facilities. Do you know what this AED is, and how it should be used?",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "AED（{自動体外式除細動器|じどうたいがいしきじょさいどうき}）とは、{心室細動|しんしつさいどう}（けいれん（{注|ちゅう}）して{血液|けつえき}を{流|なが}すポンプの{機能|きのう}を{失|うしな}った{状態|じょうたい}）になった{心臓|しんぞう}に{電気|でんき}ショックを{与|あた}え、{正常|せいじょう}なリズムに{戻|もど}すための{医療機器|いりょうきき}です。2004{年|ねん}から{医療関係者|いりょうかんけいしゃ}{以外|いがい}でも{使用|しよう}できるようになり、{人|ひと}が{多|おお}く{集|あつ}まる{場所|ばしょ}に{設置|せっち}されるようになりました。AEDは、{音声|おんせい}で{操作方法|そうさほうほう}をガイドしてくれるので、{専門的|せんもんてき}な{知識|ちしき}のない{人|ひと}でも{簡単|かんたん}に{使用|しよう}することができます。また、{心臓|しんぞう}の{動|うご}き（{心電図|しんでんず}）を{測定|そくてい}・{分析|ぶんせき}し、{電気|でんき}ショックが{必要|ひつよう}な{人|ひと}にのみ{電気|でんき}ショックを{流|なが}す{仕組|しく}みになっているので、{安心|あんしん}です。",
				cn: "AED（自动体外除颤器）是给陷入心室纤颤（抽搐（注）、失去泵血功能的状态）的心脏施加电击、使其恢复正常节律的医疗器械。从 2004 年起，医疗相关人员以外也可以使用，并开始被安装在人多聚集的地方。AED 会用语音指导操作方法，所以没有专业知识的人也能简单使用。而且它会测定、分析心脏的活动（心电图），只对需要电击的人放电，因此很安全。",
				en: "An AED (automated external defibrillator) is a medical device that delivers an electric shock to a heart in ventricular fibrillation (a state of convulsing (note) and having lost its function as a blood-pumping pump) and restores a normal rhythm. Since 2004 it has become usable by people other than medical personnel, and it has come to be installed in places where many people gather. The AED guides you through the operation by voice, so even someone without specialized knowledge can use it easily. It also measures and analyzes the heart’s movement (the electrocardiogram) and is designed to deliver a shock only to people who need one, so it is safe.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "AEDによる{処置|しょち}は{時間|じかん}との{勝負|しょうぶ}です*。{心室細動|しんしつさいどう}に{対|たい}しては、{一秒|いちびょう}でも{早|はや}く、{電気|でんき}ショックを{行|おこな}う{必要|ひつよう}があります。{成功|せいこう}の{可能性|かのうせい}は、1{分|ふん}ごとに10%{近|ちか}く{低下|ていか}すると{言|い}われています。{日本|にほん}では、{救急車|きゅうきゅうしゃ}が{到着|とうちゃく}するまでに{平均|へいきん}{約|やく}7{分|ふん}かかります。つまり、{成功率|せいこうりつ}は（　）{程度|ていど}に{下|さ}がってしまうわけです。ですから、{救急車|きゅうきゅうしゃ}が{到着|とうちゃく}する{前|まえ}に、{少|すこ}しでも{早|はや}く、{患者|かんじゃ}の{近|ちか}くにいる{人|ひと}がAEDを{使用|しよう}して{電気|でんき}ショックを{行|おこな}うことが{重要|じゅうよう}なのです。",
				cn: "用 AED 做处置是在与时间赛跑*。对心室纤颤，哪怕早一秒也必须尽快电击。据说成功的可能性每过 1 分钟就会下降近 10%。在日本，救护车到达平均大约要 7 分钟。也就是说，成功率会降到（　）左右。所以，在救护车到达之前，由患者身边的人尽快使用 AED 进行电击，才是重要的。",
				en: "AED treatment is a race against time*. For ventricular fibrillation, an electric shock must be given even one second sooner. The chance of success is said to fall by nearly 10% with each passing minute. In Japan it takes an average of about seven minutes for an ambulance to arrive. That means the success rate drops to around (　). So it is important that someone near the patient use an AED and deliver a shock as soon as possible, before the ambulance arrives.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{最近|さいきん}では、{一般市民|いっぱんしみん}がAEDを{使用|しよう}して{救命|きゅうめい}した{事例|じれい}も{増|ふ}えてきました。AEDだけでなく{人工呼吸|じんこうこきゅう}などの{救命法|きゅうめいほう}を{学|まな}んでおくことで、{救|すく}える{命|いのち}があります。これらの{救命法|きゅうめいほう}の{講習会|こうしゅうかい}は{各地|かくち}の{消防署|しょうぼうしょ}などで{行|おこな}われています。ぜひ{積極的|せっきょくてき}に{参加|さんか}してください。{私|わたし}たちの{行動|こうどう}で、{大切|たいせつ}な{命|いのち}を{救|すく}うことができるのです。",
				cn: "最近，一般市民使用 AED 救命的事例也在增加。不仅是 AED，事先学会人工呼吸等救命方法，就能救下生命。这些救命法的讲习会在各地消防署等地举办。请务必积极参加。靠我们的行动，是可以救下宝贵生命的。",
				en: "Recently there have also been more cases of ordinary citizens using an AED and saving a life. By learning not only AED use but also rescue methods such as artificial respiration, there are lives that can be saved. Workshops on these methods are held at fire stations and elsewhere around the country. Please take part actively. Through our own actions, we can save precious lives.",
			},
		],
		footnotes: [
			{ marker: "（注）", term: "けいれん", jp: "convulsions", cn: "抽搐", en: "convulsions" },
		],
		pageNotes: [
			{
				jp: "Time is so crucial in the AED treatment.",
				cn: "使用 AED 救治必须争分夺秒。",
				en: "Time is so crucial in the AED treatment.",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "（　）に{入|はい}る{最|もっと}も{適当|てきとう}なものはどれか。",
				cn: "填入（　）最合适的是哪一项？",
				en: "Which is the most appropriate item to fill in (　)?",
				choices: [
					{ jp: "10%", cn: "10%", en: "10%" },
					{ jp: "30%", cn: "30%", en: "30%" },
					{ jp: "50%", cn: "50%", en: "50%" },
					{ jp: "70%", cn: "70%", en: "70%" },
				],
				answer: 2,
				explanation:
					"成功的可能性每分钟下降近 10%，救护车平均约 7 分钟才到。7×10%＝70%，成功率从 100% 降到约 30%。「下がってしまう」是降到剩余的三成，不是降幅 70% 本身。所以填 30%，选 2。",
				explanationEn:
					"The chance of success falls by nearly 10% a minute, and an ambulance takes about seven minutes. 7 × 10% = 70%, so the success rate drops from 100% to about 30%. 下がってしまう means it falls to the remaining 30%, not that the blank is the 70% drop itself. So 30%, choice 2.",
				choiceNotes: [
					"那是每一分钟下降的幅度，不是 7 分钟后的成功率。",
					"正确。100% − 10%×7 分 ≈ 30%。",
					"没有 50% 的计算依据。",
					"70% 是下降的幅度，不是剩下的成功率。",
				],
				choiceNotesEn: [
					"That is the drop per minute, not the success rate after seven minutes.",
					"Correct. 100% − 10% × 7 minutes ≈ 30%.",
					"There is no calculation that yields 50%.",
					"70% is the amount of the drop, not the remaining success rate.",
				],
			},
			{
				label: "問2",
				jp: "この{文章|ぶんしょう}の{内容|ないよう}と{合|あ}うものはどれか。",
				cn: "与这篇文章内容相符的是哪一项？",
				en: "Which of the following matches the content of this passage?",
				choices: [
					{
						jp: "AEDはまだまだ{数|かず}が{少|すく}ないのでもっと{設置場所|せっちばしょ}を{増|ふ}やす{必要|ひつよう}がある。",
						cn: "AED 数量还很少，有必要再增加设置地点。",
						en: "There are still too few AEDs, so more installation sites are needed.",
					},
					{
						jp: "AEDよりも{人工呼吸|じんこうこきゅう}などの{応急処置|おうきゅうしょち}のほうが{一般市民|いっぱんしみん}には{簡単|かんたん}にできる。",
						cn: "比起 AED，人工呼吸等应急处理对一般市民来说更容易做。",
						en: "First aid such as artificial respiration is easier for ordinary citizens than using an AED.",
					},
					{
						jp: "AEDは{設置|せっち}されていても{一般市民|いっぱんしみん}には{難|むずか}しくて{使|つか}えないのが{現状|げんじょう}だ。",
						cn: "现状是即使安装了 AED，一般市民也因为太难而用不了。",
						en: "The current situation is that even where AEDs are installed, they are too hard for ordinary citizens to use.",
					},
					{
						jp: "AEDなどの{応急処置|おうきゅうしょち}を{学|まな}んでおけば{一般市民|いっぱんしみん}でも{人|ひと}の{命|いのち}が{救|すく}える。",
						cn: "事先学会 AED 等应急处理，一般市民也能救人一命。",
						en: "If ordinary citizens learn first aid such as AED use in advance, they too can save a life.",
					},
				],
				answer: 4,
				explanation:
					"结尾说：一般市民用 AED 救命的事例在增加；事先学会 AED 和人工呼吸等，就能救下生命；请积极参加讲习会。这正是 4。1 文中只说公共设施已能看到 AED，没有说数量不够。2 没有比较谁更容易。3 与「専門的な知識のない人でも簡単に使用できる」相反。",
				explanationEn:
					"The ending says cases of ordinary citizens saving lives with AEDs are increasing; learning AED use and artificial respiration in advance can save lives; please join the workshops. That is 4. 1 never says there are too few AEDs. 2 never compares which is easier. 3 contradicts “even someone without specialized knowledge can use it easily.”",
				choiceNotes: [
					"没有写 AED 数量不够、要增加设置点。",
					"没有比较 AED 和人工呼吸谁更容易。",
					"文中强调没有专业知识也能简单使用，与「太难用不了」相反。",
					"正确。学会应急处理，一般市民也能救命。",
				],
				choiceNotesEn: [
					"It does not say AEDs are too few or that more sites are needed.",
					"It does not compare how easy AEDs and artificial respiration are.",
					"The passage stresses that even non-specialists can use it easily, the opposite of “too hard.”",
					"Correct. If they learn first aid, ordinary citizens can save a life.",
				],
			},
		],
	},

	vocab: [
		{ jp: "装置", kana: "そうち", cn: "装置", en: "device", pos: "名詞" },
		{ jp: "公共施設", kana: "こうきょうしせつ", cn: "公共设施", en: "public facility", pos: "名詞" },
		{ jp: "心室細動", kana: "しんしつさいどう", cn: "心室纤颤", en: "ventricular fibrillation", pos: "名詞" },
		{ jp: "けいれん", cn: "抽搐、痉挛", en: "convulsion", pos: "名詞" },
		{ jp: "医療機器", kana: "いりょうきき", cn: "医疗器械", en: "medical device", pos: "名詞" },
		{ jp: "設置する", kana: "せっちする", cn: "设置、安装", en: "to install", pos: "動詞" },
		{ jp: "心電図", kana: "しんでんず", cn: "心电图", en: "electrocardiogram", pos: "名詞" },
		{ jp: "仕組み", kana: "しくみ", cn: "机制、构造", en: "mechanism", pos: "名詞" },
		{ jp: "処置", kana: "しょち", cn: "处置、处理", en: "treatment; measures", pos: "名詞" },
		{ jp: "低下する", kana: "ていかする", cn: "下降", en: "to decline", pos: "動詞" },
		{ jp: "成功率", kana: "せいこうりつ", cn: "成功率", en: "success rate", pos: "名詞" },
		{ jp: "一般市民", kana: "いっぱんしみん", cn: "一般市民", en: "ordinary citizens", pos: "名詞" },
		{ jp: "救命", kana: "きゅうめい", cn: "救命", en: "lifesaving", pos: "名詞" },
		{ jp: "人工呼吸", kana: "じんこうこきゅう", cn: "人工呼吸", en: "artificial respiration", pos: "名詞" },
		{ jp: "講習会", kana: "こうしゅうかい", cn: "讲习会", en: "workshop; training session", pos: "名詞" },
		{ jp: "消防署", kana: "しょうぼうしょ", cn: "消防署", en: "fire station", pos: "名詞" },
		{ jp: "積極的", kana: "せっきょくてき", cn: "积极的", en: "active; proactive", pos: "な形" },
		{ jp: "応急処置", kana: "おうきゅうしょち", cn: "应急处理", en: "first aid", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜ようになる／〜ようになりました",
			formation: "動詞辞書形 ＋ ようになる",
			meaning: "变得……（表示变化）。说明文里常用来介绍近年的新情况。",
			meaningEn: "to come to…. Common in explanations of a recent change.",
			example: {
				jp: "{公共施設|こうきょうしせつ}で「AED」という{装置|そうち}を{見|み}かけるようになりました。",
				cn: "在公共设施里开始能看到名为 AED 的装置。",
				en: "A device called an AED has come to be seen at public facilities.",
			},
		},
		{
			pattern: "〜との勝負",
			formation: "名詞 ＋ との勝負",
			meaning: "与……较量／赛跑。",
			meaningEn: "a contest / race against….",
			example: {
				jp: "{時間|じかん}との{勝負|しょうぶ}です。",
				cn: "这是与时间的赛跑。",
				en: "It is a race against time.",
			},
		},
		{
			pattern: "〜ておく",
			formation: "動詞て形 ＋ おく",
			meaning: "事先做好……。这里指事先学会救命法。",
			meaningEn: "to do … in advance. Here: learn rescue methods beforehand.",
			example: {
				jp: "{人工呼吸|じんこうこきゅう}などの{救命法|きゅうめいほう}を{学|まな}んでおく。",
				cn: "事先学会人工呼吸等救命方法。",
				en: "to learn rescue methods such as artificial respiration in advance",
			},
		},
	],
};
