import type { ReadingDay } from "../reading-n3/types";

// 第3週 6日目 説明文② — printed pages 54–55
export const w3d6: ReadingDay = {
	week: 3,
	day: 6,
	label: "説明文②",
	labelKana: "せつめいぶん",
	labelEn: "Explanatory Notes ②",
	printedPages: [54, 55],
	answerSource: "book",

	point: {
		title: "「ない」が{入|はい}った{文末表現|ぶんまつひょうげん}に{注意|ちゅうい}！",
		titleCn: "注意句尾有「ない」的表达形式！",
		titleEn: "Pay attention to the sentences with “ない” at the end!",
		figure: {
			alt: "キャラクターが「ほかにもたくさんあるよ！」と説明しているイラスト",
			cn: "角色说「另外还有很多哦！」",
			en: "A character saying “There are lots of others too!”",
		},
		tips: [
			{
				jp: "{例|たと}えばこんな{表現|ひょうげん}があります。",
				cn: "比如下面这些表达。",
				en: "There are expressions like these, for example.",
			},
		],
		expressions: [
			{ jp: "〜とは{限|かぎ}らない", kana: "かぎらない", cn: "＝〜ないかもしれない。不一定……", en: "… is not necessarily the case" },
			{ jp: "〜にすぎない", cn: "＝〜だけだ。不过是……", en: "only…; nothing more than…" },
			{ jp: "〜に{違|ちが}いない／〜に{相違|そうい}ない", kana: "ちがいない／そういない", cn: "＝きっと〜だ。一定是……", en: "must be…" },
			{ jp: "〜にほかならない", cn: "＝確かに〜だ。正是……、无非是……", en: "is certainly…; is nothing other than…" },
			{ jp: "〜かねない", cn: "＝〜しそうだ。很可能会……（不好的事）", en: "could be… (literally: … is not impossible)" },
			{ jp: "〜わけにはいかない", cn: "＝〜できない。不能……", en: "cannot be…" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "A",
				speakerCn: "A",
				speakerEn: "A",
				jp: "あ、この{地球儀|ちきゅうぎ}（注1）、おもしろいね。でこぼこしている（注2）。",
				cn: "啊，这个地球仪真有意思。凹凸不平。",
				en: "Oh, this globe is interesting. It’s bumpy.",
			},
			{
				type: "speech",
				speaker: "B",
				speakerCn: "B",
				speakerEn: "B",
				jp: "そう、{山|やま}のところは{出|で}っ{張|ぱ}って（注3）いるんだ。でもね、これ{変|へん}だよ。だって、{地球|ちきゅう}の{大|おお}きさから{考|かんが}えると、{国際宇宙|こくさいうちゅう}ステーション（注4）だってこの{地球儀|ちきゅうぎ}の{表面|ひょうめん}から1センチぐらいしか{離|はな}れていないところを{回|まわ}っていることになるんだよ。この{山|やま}なんて1センチ{以上|いじょう}{出|で}ている。だから{変|へん}なんだよ。つまり、{正|ただ}しい{地球儀|ちきゅうぎ}はツルツルでなければいけないんだよ*。",
				cn: "对，山的地方是凸出来的。不过这个不对劲。因为从地球的大小来想，连国际空间站绕行的地方离这个地球仪表面也只有大约 1 厘米。这座山却高出 1 厘米以上。所以才奇怪。也就是说，正确的地球仪必须是光滑的。",
				en: "Right, the mountains stick out. But this is odd. Because if you think in terms of the size of the Earth, even the International Space Station would be going around only about a centimeter off the surface of this globe. And this mountain sticks out more than a centimeter. That’s why it’s odd. In other words, a proper globe has to be smooth.",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "地球儀", jp: "ちきゅうぎ", cn: "地球仪", en: "a globe" },
			{ marker: "（注2）", term: "でこぼこしている", jp: "でこぼこしている", cn: "凹凸不平", en: "to have an uneven surface" },
			{ marker: "（注3）", term: "出っ張る", jp: "でっぱる", cn: "突出", en: "to stick out" },
			{ marker: "（注4）", term: "国際宇宙ステーション", jp: "こくさいうちゅうステーション", cn: "国际宇宙空间站", en: "an international space station" },
		],
		hint: {
			jp: "2{行目|ぎょうめ}「だって」（＝なぜなら）",
			cn: "第 2 行的「だって」＝なぜなら（因为）。说明理由时的一种较随便的说法。",
			en: "Line 2 “だって” = なぜなら. A colloquial expression used when you provide a reason.",
		},
		pageNotes: [
			{
				jp: "＊{正|ただ}しい{地球儀|ちきゅうぎ}はツルツルでなければいけない",
				cn: "正确的地球仪应该是表面光滑的",
				en: "A good globe must have a very smooth surface",
			},
		],
		choices: [
			{ jp: "この{地球儀|ちきゅうぎ}は{丸|まる}くない。", cn: "这个地球仪不是圆的。", en: "This globe is not round." },
			{ jp: "この{地球儀|ちきゅうぎ}の{表面|ひょうめん}はツルツルしていない。", cn: "这个地球仪的表面不光滑。", en: "The surface of this globe is not smooth." },
			{ jp: "この{地球儀|ちきゅうぎ}は{山|やま}の{位置|いち}が{間違|まちが}っている。", cn: "这个地球仪山的位置是错的。", en: "The positions of the mountains on this globe are wrong." },
			{ jp: "この{地球儀|ちきゅうぎ}では{山|やま}は1センチでなければいけない。", cn: "这个地球仪上山必须是 1 厘米。", en: "On this globe the mountains must be one centimeter." },
			{ jp: "この{地球儀|ちきゅうぎ}は{実際|じっさい}の{山|やま}の{高|たか}さを{正|ただ}しく{表|あらわ}していない。", cn: "这个地球仪没有正确表示实际山的高度。", en: "This globe does not correctly show the actual height of the mountains." },
		],
		answers: [2, 5],
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的文章，回答后面的问题。（答案在别册 p.4）",
		instructionEn: "Read the following text and answer the questions that follow. (Answers are in the separate booklet, p. 4.)",
		blocks: [
			{
				type: "heading",
				jp: "ちきゅうサイエンス",
				cn: "地球科学",
				en: "Earth science",
			},
			{
				type: "title",
				jp: "でこぼこの{地球儀|ちきゅうぎ}",
				cn: "凹凸不平的地球仪",
				en: "A bumpy globe",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{先日|せんじつ}、{宇宙飛行士|うちゅうひこうし}を{乗|の}せたロシアの{宇宙船|うちゅうせん}ソユーズ（注1）が、また{国際宇宙|こくさいうちゅう}ステーションに{向|む}けて{飛|と}び{立|た}ちました。{国際宇宙|こくさいうちゅう}ステーションは{地表|ちひょう}（注2）から{約|やく}400キロ{上空|じょうくう}に{位置|いち}し、{地球|ちきゅう}の{周|まわ}りを{一周|いっしゅう}{約|やく}90{分|ふん}というスピードで{回|まわ}っています。そこから{青|あお}く{光|ひか}る{地球|ちきゅう}を{見|み}たとき、{人|ひと}はどんな{気持|きも}ちがするのでしょうか。{考|かんが}えただけでもわくわくします（注3）。",
				cn: "前几天，载着宇航员的俄罗斯宇宙飞船「联盟号」（注1）再次飞向国际空间站。国际空间站位于地表（注2）约 400 公里上空，以大约 90 分钟绕地球一周的速度运行。从那里看到发蓝光的地球时，人会是怎样的心情呢。光是想想就让人兴奋（注3）。",
				en: "The other day the Russian spacecraft Soyuz (note 1), carrying astronauts, lifted off again for the International Space Station. The ISS sits about 400 kilometers above the surface of the earth (note 2) and goes around the Earth at a speed of about 90 minutes per orbit. What must people feel when they see the Earth shining blue from there? Just thinking about it is exciting (note 3).",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "ところで、この{距離|きょり}は{地球|ちきゅう}の{大|おお}きさからいってどのぐらいでしょうか。{地球|ちきゅう}の{直径|ちょっけい}は、およそ12,700キロ。{地表|ちひょう}から400キロのところというのは1センチとちょっとということになります。これでは、ほとんど{地球|ちきゅう}の{表面|ひょうめん}と{変|か}わりません。つまり、{国際宇宙|こくさいうちゅう}ステーションへ{宇宙旅行|うちゅうりょこう}といっても、{地球|ちきゅう}の{規模|きぼ}（注4）から{見|み}ると、①{地上|ちじょう}と{変|か}わらないところを{回|まわ}っているにほかならないのです。",
				cn: "那么，这段距离从地球的大小来说有多大呢。地球的直径大约是 12,700 公里。离地表 400 公里的地方，相当于只有 1 厘米多一点。这样的话，几乎和地球表面没有差别。也就是说，所谓去国际空间站做宇宙旅行，从地球的规模（注4）来看，①无非是在和地上没什么两样的地方转圈而已。",
				en: "Now, how large is that distance in terms of the size of the Earth? The Earth’s diameter is about 12,700 kilometers. 400 kilometers from the surface comes to just a little over one centimeter. At that, it is almost no different from the Earth’s surface. In other words, even a space trip to the ISS is, on the scale (note 4) of the Earth, ①nothing other than going around somewhere no different from the ground.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "このことから{考|かんが}えると、{海|うみ}や{山|やま}を{表現|ひょうげん}したでこぼこした{地球儀|ちきゅうぎ}がありますが、これは{全|まった}く{正|ただ}しくないことがわかります。{地球|ちきゅう}でいちばん{高|たか}いエベレスト{山|さん}も30センチの{地球儀|ちきゅうぎ}では{高|たか}さはわずか0.2ミリにすぎません。つまり{正|ただ}しい{地球儀|ちきゅうぎ}は、②ツルツルでなければならないのです。",
				cn: "由此看来，有的地球仪把海和山做成凹凸，可以知道这是完全不正确的。地球上最高的珠穆朗玛峰，在 30 厘米的地球仪上高度也不过 0.2 毫米。也就是说，正确的地球仪②必须是光滑的。",
				en: "From this you can see that globes which show the sea and mountains as bumps and hollows are completely incorrect. Even Mount Everest, the highest on Earth, would be a mere 0.2 millimeters high on a 30-centimeter globe. In other words, a correct globe ②must be smooth.",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "ソユーズ", jp: "ソユーズ", cn: "联盟号（苏联的宇宙飞船）", en: "Soyuz: a Russian spacecraft" },
			{ marker: "（注2）", term: "地表", jp: "ちひょう", cn: "地表、地球表面", en: "the surface of the earth" },
			{ marker: "（注3）", term: "わくわくする", jp: "わくわくする", cn: "心情不平静、兴奋不安", en: "to be excited" },
			{ marker: "（注4）", term: "規模", jp: "きぼ", cn: "规模", en: "a scale" },
		],
		questions: [
			{
				label: "問1",
				jp: "①{地上|ちじょう}と{変|か}わらないところを{回|まわ}っているにほかならないとあるが、どういう{意味|いみ}か。",
				cn: "文中说①无非是在和地上没什么两样的地方转圈，是什么意思？",
				en: "It says ①it is nothing other than going around somewhere no different from the ground. What does that mean?",
				choices: [
					{ jp: "ほとんど{地表|ちひょう}といっていいところを{回|まわ}っているだけだ", cn: "只不过是在几乎可以称作地表的地方转圈而已", en: "it is only going around somewhere you might as well call the Earth’s surface" },
					{ jp: "{地球上|ちきゅうじょう}の{変化|へんか}のないところを{回|まわ}っているだけだ", cn: "只不过是在地球上没有变化的地方转圈而已", en: "it is only going around a place on Earth where nothing changes" },
					{ jp: "{地球|ちきゅう}の{表面|ひょうめん}を{回|まわ}っているわけではない", cn: "并不是在地球表面转圈", en: "it is not the case that it is going around the Earth’s surface" },
					{ jp: "{地面|じめん}と{同|おな}じ{場所|ばしょ}を{回|まわ}っているわけではない", cn: "并不是在和地面相同的地方转圈", en: "it is not the case that it is going around the same place as the ground" },
				],
				answer: 1,
				explanation:
					"「〜にほかならない」＝正是……、无非是……。前文换算：400 公里在地球仪上只有「1センチとちょっと」，「ほとんど地球の表面と変わりません」。别册也写：400 公里从地球规模看不算长距离。所以①＝几乎可以说就在地表附近转，选 1。2 把「変わらない」误读成「没有变化」。3、4 的「わけではない」把意思说反了。",
				explanationEn:
					"Ni hoka naranai = is nothing other than…. The conversion just before: 400 km is “just over a centimeter” on the globe, “almost no different from the Earth’s surface.” The answer key: 400 km is not a great distance on the scale of the globe. So ① = going around somewhere you might as well call the surface: 1. 2 misreads kawaranai as “unchanging.” 3 and 4 with wake de wa nai reverse the meaning.",
				choiceNotes: [
					"正确。「にほかならない」＝「だけだ／まさにそれだ」，对象是几乎等于地表的地方。",
					"「変わらない」是「和地上没差别」，不是「地球上没有变化的地方」。",
					"文意正是「几乎等于在表面转」，不是「并不是在表面转」。",
					"同样把肯定说成了否定。",
				],
				choiceNotesEn: [
					"Correct. Ni hoka naranai = “nothing other than / precisely that,” and the place is almost the surface.",
					"Kawaranai means “no different from the ground,” not “a place on Earth where nothing changes.”",
					"The sense is “almost going around the surface,” not “it is not going around the surface.”",
					"This likewise turns an affirmation into a negation.",
				],
			},
			{
				label: "問2",
				jp: "②ツルツルでなければならないとはどういう{意味|いみ}か。",
				cn: "②必须是光滑的，是什么意思？",
				en: "What does ②“must be smooth” mean?",
				choices: [
					{ jp: "でこぼこしていてはおかしい", cn: "凹凸不平就奇怪了", en: "it would be odd if it were bumpy" },
					{ jp: "よく{回転|かいてん}するようにしなければならない", cn: "必须让它能好好旋转", en: "it must be made to spin well" },
					{ jp: "でこぼこが{逆|ぎゃく}でないとおかしい", cn: "凹凸如果不反过来就奇怪了", en: "it would be odd if the bumps and hollows were not reversed" },
					{ jp: "きれいに{磨|みが}かなければならない", cn: "必须打磨得很光亮", en: "it must be polished until it is beautiful" },
				],
				answer: 1,
				explanation:
					"珠峰在 30 厘米地球仪上只有 0.2 毫米，「にすぎない」（不过如此）。所以把海和山做成凹凸是「全く正しくない」。②「ツルツルでなければならない」＝不能凹凸不平，选 1。2 把「光滑」理解成「转得顺」。4 把「ツルツル」理解成「要擦亮」，都不是比例上的问题。",
				explanationEn:
					"Everest on a 30 cm globe is a mere 0.2 mm, “nothing more than” that. So showing seas and mountains as bumps is “completely incorrect.” ②“must be smooth” = it must not be bumpy: 1. 2 takes tsurutsuru as spinning smoothly. 4 takes it as needing a polish. Neither is about scale.",
				choiceNotes: [
					"正确。和练习里「正しい地球儀はツルツルでなければいけない」同一意思。",
					"「ツルツル」在这里指表面平整，不是旋转。",
					"文中没有「凹凸要反过来」这种说法。",
					"不是要擦亮，而是按比例几乎没有凹凸。",
				],
				choiceNotesEn: [
					"Correct. Same sense as the practice line “a proper globe has to be smooth.”",
					"Tsurutsuru here is a flat surface, not spinning.",
					"The passage never says the bumps should be reversed.",
					"It is not about polishing; at this scale there are almost no bumps.",
				],
			},
		],
	},

	vocab: [
		{ jp: "地球儀", kana: "ちきゅうぎ", cn: "地球仪", en: "globe", pos: "名詞" },
		{ jp: "でこぼこ", cn: "凹凸不平", en: "bumpy; uneven", pos: "名詞・な形" },
		{ jp: "出っ張る", kana: "でっぱる", cn: "凸出", en: "to stick out", pos: "動詞" },
		{ jp: "ツルツル", cn: "光滑", en: "smooth; slippery", pos: "副詞・な形" },
		{ jp: "宇宙飛行士", kana: "うちゅうひこうし", cn: "宇航员", en: "astronaut", pos: "名詞" },
		{ jp: "宇宙船", kana: "うちゅうせん", cn: "宇宙飞船", en: "spacecraft", pos: "名詞" },
		{ jp: "飛び立つ", kana: "とびたつ", cn: "起飞、飞离", en: "to lift off; to fly away", pos: "動詞" },
		{ jp: "地表", kana: "ちひょう", cn: "地表", en: "the Earth’s surface", pos: "名詞" },
		{ jp: "上空", kana: "じょうくう", cn: "上空", en: "the sky above; aloft", pos: "名詞" },
		{ jp: "位置する", kana: "いちする", cn: "位于", en: "to be located", pos: "動詞" },
		{ jp: "直径", kana: "ちょっけい", cn: "直径", en: "diameter", pos: "名詞" },
		{ jp: "規模", kana: "きぼ", cn: "规模", en: "scale; scope", pos: "名詞" },
		{ jp: "わくわくする", cn: "兴奋、忐忑地期待", en: "to be excited", pos: "動詞" },
		{ jp: "だって", cn: "因为（口语）", en: "because (colloquial)", pos: "接続" },
	],

	grammar: [
		{
			pattern: "〜にほかならない",
			formation: "名詞／普通形＋にほかならない",
			meaning: "正是……、无非是……。强调「不是别的，就是这个」。",
			meaningEn: "is nothing other than…; is precisely…. Stresses “this and not something else.”",
			example: {
				jp: "{地上|ちじょう}と{変|か}わらないところを{回|まわ}っているにほかならない。",
				cn: "无非是在和地上没什么两样的地方转圈。",
				en: "It is nothing other than going around somewhere no different from the ground.",
			},
		},
		{
			pattern: "〜にすぎない",
			formation: "名詞／普通形＋にすぎない",
			meaning: "只不过是……。把程度往小里说。",
			meaningEn: "is nothing more than…; is only…. Plays the degree down.",
			example: {
				jp: "{高|たか}さはわずか0.2ミリにすぎません。",
				cn: "高度不过 0.2 毫米。",
				en: "The height is a mere 0.2 millimeters.",
			},
		},
		{
			pattern: "〜なければならない／〜なければいけない",
			formation: "動詞ない形＋なければならない",
			meaning: "必须……。这里「ツルツルでなければならない」＝不能凹凸。",
			meaningEn: "must…. Here “must be smooth” = must not be bumpy.",
			example: {
				jp: "{正|ただ}しい{地球儀|ちきゅうぎ}はツルツルでなければならない。",
				cn: "正确的地球仪必须是光滑的。",
				en: "A correct globe must be smooth.",
			},
		},
	],
};
