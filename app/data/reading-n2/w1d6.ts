import type { ReadingDay } from "../reading-n3/types";

// 第1週 6日目 レシピ — printed pages 22–23
export const w1d6: ReadingDay = {
	week: 1,
	day: 6,
	label: "レシピ",
	labelKana: "れしぴ",
	labelEn: "Recipes",
	printedPages: [22, 23],
	answerSource: "book",

	point: {
		title: "{順番|じゅんばん}や{程度|ていど}を{表|あらわ}す{表現|ひょうげん}に{注意|ちゅうい}！",
		titleCn: "注意表示顺序和程度的表达！",
		titleEn: "Pay attention to the expressions for showing the order and the degree!",
		tips: [
			{
				jp: "{例えば|たとえば}グラタンの{作|つく}り{方|かた}にはこんな{言葉|ことば}が{出|で}てきます。",
				cn: "比如奶汁烤菜的做法里会出现下面这些词语。",
				en: "A gratin recipe, for example, uses words like these.",
			},
		],
		expressions: [
			{ jp: "ルー", cn: "奶油面糊粉、酱料糊", en: "roux (sauce)" },
			{ jp: "○○の素", kana: "もと", cn: "○○的调味料／速成料", en: "instant mix for making …" },
			{ jp: "ソースミックス", cn: "调味酱料", en: "sauce base" },
			{ jp: "薄切り", kana: "うすぎり", cn: "切成薄片", en: "thinly sliced" },
			{ jp: "角切り", kana: "かくぎり", cn: "切成方块", en: "diced / cubed" },
			{ jp: "一口大に切る", kana: "ひとくちだいにきる", cn: "切成一口大的块", en: "to cut it into bite-size pieces" },
			{ jp: "厚手の鍋", kana: "あつでのなべ", cn: "厚底锅", en: "a heavy pan" },
			{ jp: "ボウル", cn: "碗（搅拌用）", en: "a mixing bowl" },
			{ jp: "耐熱皿", kana: "たいねつざら", cn: "耐热盘", en: "a Pyrex pan" },
			{ jp: "煮込む", kana: "にこむ", cn: "炖、煨", en: "to simmer" },
			{ jp: "沸騰する", kana: "ふっとうする", cn: "沸腾", en: "to boil" },
			{ jp: "かき混ぜる", kana: "かきまぜる", cn: "搅拌", en: "to mix" },
			{ jp: "煮立つ", kana: "にたつ", cn: "煮开", en: "to start to boil" },
			{ jp: "アクをとる", cn: "撇去浮沫", en: "to skim" },
			{ jp: "すくう", cn: "舀出", en: "to scoop out" },
			{ jp: "焦がさないように", kana: "こがさないように", cn: "以免炒糊", en: "not to burn" },
			{ jp: "焦げ目がつくように", kana: "こげめがつくように", cn: "烤到焦黄", en: "to brown" },
			{ jp: "いったん", cn: "一旦、暂时", en: "temporarily" },
			{ jp: "仕上げに", kana: "しあげに", cn: "最后（收尾时）", en: "as a garnish / as a finishing touch" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{母|はは}",
				speakerCn: "母亲",
				speakerEn: "Mother",
				jp: "あ、{玉ねぎ|たまねぎ}も{薄|うす}く{切|き}らないのよ。みんな{同|おな}じくらいの{大|おお}きさに{切|き}るの。",
				cn: "啊，洋葱也别切太薄。大家都切成差不多的大小。",
				en: "Ah, don’t slice the onion thin either. Cut everything about the same size.",
			},
			{
				type: "speech",
				speaker: "{娘|むすめ}",
				speakerCn: "女儿",
				speakerEn: "Daughter",
				jp: "わかってる。あれ、バターもお{肉|にく}もないよ。",
				cn: "知道了。咦，黄油也没有，肉也没有。",
				en: "I know. Hey, there’s no butter and no meat either.",
			},
			{
				type: "speech",
				speaker: "{母|はは}",
				speakerCn: "母亲",
				speakerEn: "Mother",
				jp: "いいのよ。あるもの{使|つか}えば。{切|き}ったら{油|あぶら}で{炒|いた}めて。エビ{入|い}れる？",
				cn: "没关系。有什么用什么。切完用油炒。放虾吗？",
				en: "That’s fine. Just use what we have. After you cut them, fry them in oil. Want to put shrimp in?",
			},
			{
				type: "speech",
				speaker: "{娘|むすめ}",
				speakerCn: "女儿",
				speakerEn: "Daughter",
				jp: "えー、エビはいやだ。……{炒|いた}めたら{牛乳|ぎゅうにゅう}{入|い}れるの？",
				cn: "诶，我不要虾。……炒完放牛奶吗？",
				en: "Ehh, I don’t want shrimp. …After frying, do we add the milk?",
			},
			{
				type: "speech",
				speaker: "{母|はは}",
				speakerCn: "母亲",
				speakerEn: "Mother",
				jp: "それはいちばん{最後|さいご}。お{水入|みずい}れて。",
				cn: "那个要放到最后。先加水。",
				en: "That’s last of all. Put the water in.",
			},
			{
				type: "speech",
				speaker: "{娘|むすめ}",
				speakerCn: "女儿",
				speakerEn: "Daughter",
				jp: "……あ、{煮立|にた}ったら、なんか{浮|う}いてきた＊。",
				cn: "……啊，煮开了，有东西浮上来了＊。",
				en: "…Oh, when it came to a boil, something floated up.*",
			},
			{
				type: "speech",
				speaker: "{母|はは}",
				speakerCn: "母亲",
				speakerEn: "Mother",
				jp: "ん、それ、すくって{捨|す}てて。あ、{火|ひ}は{弱|よわ}くして……ルーは{軟|やわ}らかくなってからよ。",
				cn: "嗯，那个舀掉扔掉。啊，火要调小……面糊要等软了再放。",
				en: "Mm, scoop that off and throw it away. Ah, turn the heat down… the roux is after it has gone soft.",
			},
		],
		choices: [
			{ jp: "{母|はは}が{料理|りょうり}をして{娘|むすめ}に{見|み}せている。", cn: "母亲在做饭给女儿看。", en: "The mother is cooking and showing the daughter." },
			{ jp: "{母|はは}が{娘|むすめ}に{料理|りょうり}をさせて{教|おし}えている。", cn: "母亲让女儿做饭并在教她。", en: "The mother is having the daughter cook and teaching her." },
			{ jp: "{娘|むすめ}は{玉ねぎ|たまねぎ}を{薄切|うすぎ}りにしてしまった。", cn: "女儿已经把洋葱切成薄片了。", en: "The daughter has already sliced the onion thin." },
			{ jp: "{母|はは}は{肉|にく}の{代|か}わりにエビを{使|つか}おうと{思|おも}った。", cn: "母亲想用虾来代替肉。", en: "The mother thought of using shrimp instead of meat." },
			{ jp: "{母|はは}は{娘|むすめ}にアクの{取|と}り{方|かた}を{指示|しじ}した。", cn: "母亲向女儿指示了撇浮沫的方法。", en: "The mother instructed the daughter how to skim the scum." },
		],
		answers: [2, 4, 5],
		pageNotes: [
			{
				jp: "＊ something is boiling to the surface",
				cn: "＊煮开之后，有东西浮上来了",
				en: "something is boiling to the surface",
			},
		],
	},

	mondai: {
		instruction: "{次|つぎ}のAとBを{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的 A 和 B，回答后面的问题。（答案在别册 p.2）",
		instructionEn: "Read A and B below and answer the questions that follow. (Answers are in the separate booklet, p. 2.)",
		blocks: [
			{
				type: "title",
				jp: "A　■ シチュー（8{皿分|さらぶん}）",
				cn: "A　■ 炖菜（8 人份）",
				en: "A  ■ Stew (8 servings)",
			},
			{
				type: "heading",
				jp: "{材料|ざいりょう}",
				cn: "材料",
				en: "Ingredients",
			},
			{
				type: "table",
				rows: [
					[
						{ jp: "クリームシチューの{素|もと}", cn: "奶油炖菜速成料", en: "Cream-stew mix" },
						{ jp: "1{箱|はこ}", cn: "1 盒", en: "1 box", align: "right" },
					],
					[
						{ jp: "{肉|にく}（{鶏肉|とりにく}か{豚肉|ぶたにく}）", cn: "肉（鸡肉或猪肉）", en: "Meat (chicken or pork)" },
						{ jp: "300g", cn: "300g", en: "300 g", align: "right" },
					],
					[
						{ jp: "タマネギ", cn: "洋葱", en: "Onion" },
						{ jp: "{中|なか}2{個|こ}（500g）", cn: "中等 2 个（500g）", en: "2 medium (500 g)", align: "right" },
					],
					[
						{ jp: "にんじん", cn: "胡萝卜", en: "Carrot" },
						{ jp: "1/2{本|ほん}（150g）", cn: "半根（150g）", en: "1/2 (150 g)", align: "right" },
					],
					[
						{ jp: "じゃがいも", cn: "土豆", en: "Potato" },
						{ jp: "{中|なか}2{個|こ}（300g）", cn: "中等 2 个（300g）", en: "2 medium (300 g)", align: "right" },
					],
					[
						{ jp: "バター", cn: "黄油", en: "Butter" },
						{ jp: "{大さじ|おおさじ}1", cn: "1 大勺", en: "1 tablespoon", align: "right" },
					],
					[
						{ jp: "{水|みず}", cn: "水", en: "Water" },
						{ jp: "900ml（カップ3 1/2{杯|はい}）", cn: "900ml（3 又 1/2 杯）", en: "900 ml (3½ cups)", align: "right" },
					],
					[
						{ jp: "{牛乳|ぎゅうにゅう}", cn: "牛奶", en: "Milk" },
						{ jp: "200ml（カップ2{杯|はい}）", cn: "200ml（2 杯）", en: "200 ml (2 cups)", align: "right" },
					],
				],
			},
			{
				type: "heading",
				jp: "おいしい{作|つく}り{方|かた}",
				cn: "好吃的做法",
				en: "How to make it well",
			},
			{
				type: "list",
				ordered: true,
				items: [
					{
						jp: "{厚手|あつで}の{鍋|なべ}を{熱|あっ}してバターを{溶|と}かし、{一口大|ひとくちだい}に{切|き}った{肉|にく}・{野菜|やさい}を{焦|こ}がさないように{炒|いた}めます。\n※バターのかわりにサラダ{油|あぶら}で{炒|いた}めてもかまいません。",
						cn: "加热厚底锅融化黄油，把切成一口大的肉和蔬菜炒到不要焦。\n※用色拉油代替黄油炒也可以。",
						en: "Heat a heavy pan, melt the butter, and fry the bite-size meat and vegetables without burning them.\n※ You may fry them in salad oil instead of butter.",
					},
					{ jp: "{水|みず}を{加|くわ}え、{沸騰|ふっとう}したらアクをとります。", cn: "加水，煮沸后撇去浮沫。", en: "Add water; when it boils, skim off the scum." },
					{ jp: "{材料|ざいりょう}が{柔|やわ}らかくなるまで{弱火|よわび}で{約|やく}20{分間煮込|ぷんかんにこ}みます。", cn: "用小火炖约 20 分钟，直到材料变软。", en: "Simmer on low heat about 20 minutes until the ingredients are soft." },
					{ jp: "いったん{火|ひ}を{止|と}めてルーを{割|わ}り{入|い}れ、よく{溶|と}かします。", cn: "先关火，掰开面糊放进去，充分化开。", en: "Turn off the heat for a moment, break in the roux, and dissolve it well." },
					{ jp: "{再び|ふたたび}{弱火|よわび}で{煮込|にこ}み、{仕上げ|しあげ}に{牛乳|ぎゅうにゅう}を{加|くわ}えてさらに{軽|かる}く{煮込|にこ}みます。", cn: "再以小火炖，最后加入牛奶再轻轻炖一下。", en: "Simmer again on low heat; to finish, add the milk and simmer lightly a little more." },
				],
			},
			{
				type: "title",
				jp: "B　エビマカロニグラタン",
				cn: "B　虾仁通心粉奶汁烤",
				en: "B  Shrimp macaroni gratin",
			},
			{
				type: "heading",
				jp: "■ {材料|ざいりょう}（4{皿分|さらぶん}）",
				cn: "■ 材料（4 人份）",
				en: "■ Ingredients (4 servings)",
			},
			{
				type: "table",
				rows: [
					[
						{ jp: "ホワイトソースミックス", cn: "白酱料", en: "White-sauce mix" },
						{ jp: "1{袋|ふくろ}", cn: "1 袋", en: "1 packet", align: "right" },
					],
					[
						{ jp: "マカロニ", cn: "通心粉", en: "Macaroni" },
						{ jp: "1{袋|ふくろ}", cn: "1 袋", en: "1 packet", align: "right" },
					],
					[
						{ jp: "{冷凍|れいとう}エビ（{解凍|かいとう}しておく）", cn: "冷冻虾（先解冻）", en: "Frozen shrimp (thaw first)" },
						{ jp: "150g", cn: "150g", en: "150 g", align: "right" },
					],
					[
						{ jp: "タマネギ（{薄切|うすぎ}り）", cn: "洋葱（薄片）", en: "Onion (thinly sliced)" },
						{ jp: "{小|しょう}1{個|こ}（150g）", cn: "小 1 个（150g）", en: "1 small (150 g)", align: "right" },
					],
					[
						{ jp: "サラダ{油|あぶら}", cn: "色拉油", en: "Salad oil" },
						{ jp: "{大さじ|おおさじ}2", cn: "2 大勺", en: "2 tablespoons", align: "right" },
					],
					[
						{ jp: "{水|みず}", cn: "水", en: "Water" },
						{ jp: "400ml（2カップ）", cn: "400ml（2 杯）", en: "400 ml (2 cups)", align: "right" },
					],
					[
						{ jp: "{牛乳|ぎゅうにゅう}", cn: "牛奶", en: "Milk" },
						{ jp: "300ml（1 1/2カップ）", cn: "300ml（1 又 1/2 杯）", en: "300 ml (1½ cups)", align: "right" },
					],
					[
						{ jp: "とろけるチーズ", cn: "即溶芝士", en: "Melting cheese" },
						{ jp: "{適量|てきりょう}", cn: "适量", en: "to taste", align: "right" },
					],
				],
			},
			{
				type: "heading",
				jp: "■{調理方法|ちょうりほうほう}■",
				cn: "■烹饪方法■",
				en: "■ Method ■",
			},
			{
				type: "list",
				ordered: true,
				items: [
					{ jp: "{厚手|あつで}のなべにサラダ{油|あぶら}を{熱|あっ}し、タマネギとエビを{焦|こ}がさないように{炒|いた}めます。", cn: "厚底锅里热色拉油，把洋葱和虾炒到不要焦。", en: "Heat salad oil in a heavy pan and fry the onion and shrimp without burning them." },
					{ jp: "いったん{火|ひ}を{止|と}め、ソースミックス・{水|みず}・{牛乳|ぎゅうにゅう}の{順|じゅん}に{入|い}れてよく{混|ま}ぜます。", cn: "先关火，按酱料、水、牛奶的顺序放进去并拌匀。", en: "Turn off the heat for a moment; add the sauce mix, water, then milk, and mix well." },
					{
						jp: "マカロニを{加|くわ}えて{中火|ちゅうび}にかけ、かき{混|ま}ぜながら{煮|に}ます。{沸騰|ふっとう}したら{火|ひ}を{弱|よわ}めて、さらにかき{混|ま}ぜながら{約|やく}5{分煮|ふんに}ます。\n＊マカロニは{別|べつ}にゆでる{必要|ひつよう}のないよう{加工|かこう}してあります。",
						cn: "加入通心粉用中火边搅拌边煮。沸腾后把火调小，再边搅拌边煮约 5 分钟。\n＊通心粉已经加工过，不必另外煮。",
						en: "Add the macaroni, put on medium heat, and simmer while stirring. When it boils, lower the heat and simmer about 5 more minutes, still stirring.\n＊ The macaroni is processed so you do not need to boil it separately.",
					},
					{ jp: "{耐熱皿|たいねつざら}に{移|うつ}し、チーズをのせてオーブントースターで5〜6{分|ふん}、{焦|こ}げ{目|め}がつくまで{焼|や}きます。", cn: "移到耐热盘，铺上芝士，用烤箱吐司机烤 5〜6 分钟，直到出现焦色。", en: "Transfer to a heatproof dish, top with cheese, and bake in a toaster oven 5–6 minutes until browned." },
				],
			},
		],
		questions: [
			{
				label: "問1",
				jp: "{左|ひだり}ページの「{練習|れんしゅう}」の{会話|かいわ}について、{正|ただ}しいものはどれか。",
				cn: "关于左页「练习」的对话，哪一项是正确的？",
				en: "About the “Practice” conversation on the left-hand page, which is correct?",
				choices: [
					{ jp: "{肉|にく}の{代|か}わりにエビでAを{作|つく}っている。", cn: "用虾代替肉在做 A。", en: "They are making A with shrimp instead of meat." },
					{ jp: "{野菜|やさい}だけでAを{作|つく}っている。", cn: "只用蔬菜在做 A。", en: "They are making A with vegetables only." },
					{ jp: "エビを{使|つか}わずにBを{作|つく}っている。", cn: "不放虾在做 B。", en: "They are making B without shrimp." },
					{ jp: "バターを{使|つか}わずにBを{作|つく}っている。", cn: "不用黄油在做 B。", en: "They are making B without butter." },
				],
				answer: 2,
				explanation:
					"对话里没有黄油也没有肉（「バターもお肉もないよ」），母亲说「あるもの使えば」「油で炒めて」。女儿拒绝放虾。顺序是：切蔬菜→油炒→加水→煮开撇浮沫（アク）→小火、软了再放ルー→牛奶放最后。这正是 A 炖菜的做法（A 的备注也允许用色拉油代替黄油），而且没放肉、没放虾，所以是「野菜だけでAを作っている」。B 用ソースミックス和虾、最后要烤出焦色，对话对不上。",
				explanationEn:
					"There is no butter and no meat; the mother says to use what they have and fry in oil. The daughter refuses shrimp. The order is: cut vegetables → fry in oil → add water → skim when it boils → low heat, roux after it is soft → milk last. That is recipe A (A even allows salad oil instead of butter), with no meat and no shrimp — “making A with vegetables only.” B uses sauce mix and shrimp and finishes by browning; the dialogue does not match B.",
				choiceNotes: [
					"母亲问过「エビ入れる？」但女儿说不要，并没有用虾代替肉。",
					"正确。没有肉、没有虾，按 A 的步骤（ルー、アク、牛奶放最后）在做炖菜。",
					"他们做的是 A 不是 B；B 的材料本身就要虾。",
					"B 的配方本来就用色拉油不用黄油，但对话是在做 A。",
				],
				choiceNotesEn: [
					"The mother asked about shrimp; the daughter said no, so they are not substituting shrimp for meat.",
					"Correct. No meat, no shrimp; they are following A’s steps (roux, scum, milk last).",
					"They are making A, not B; B’s ingredients include shrimp.",
					"B’s recipe already uses salad oil, not butter, but the conversation is making A.",
				],
			},
			{
				label: "問2",
				jp: "AとBについて{正|ただ}しいものはどれか。",
				cn: "关于 A 和 B，哪一项是正确的？",
				en: "Which of the following is correct about A and B?",
				choices: [
					{ jp: "AもBも{野菜|やさい}などをまず{炒|いた}める。", cn: "A 和 B 都先炒蔬菜等。", en: "Both A and B fry the vegetables and so on first." },
					{ jp: "AもBも{焦|こ}げ{目|め}をつけないようにする。", cn: "A 和 B 都注意不要出现焦色。", en: "Both A and B avoid browning." },
					{ jp: "AもBもいろいろな{野菜|やさい}を{煮込|にこ}む。", cn: "A 和 B 都把各种蔬菜炖进去。", en: "Both A and B simmer various vegetables." },
					{ jp: "AもBも{仕上げ|しあげ}に{牛乳|ぎゅうにゅう}を{使|つか}う。", cn: "A 和 B 都在最后用牛奶。", en: "Both A and B use milk as a finishing touch." },
				],
				answer: 1,
				explanation:
					"A①「肉・野菜を焦がさないように炒めます」、B①「タマネギとエビを焦がさないように炒めます」——都是先炒。2：B④要「焦げ目がつくまで焼きます」，不是两边都避免焦色。3：B 的蔬菜只有薄切洋葱，而且是炒，不是「いろいろな野菜を煮込む」。4：A 是「仕上げに牛乳」；B 在②就把牛奶和酱料、水一起放进去，不是收尾才用。",
				explanationEn:
					"A① fries meat and vegetables without burning; B① fries onion and shrimp without burning — both fry first. 2: B④ bakes “until browned,” so both do not avoid browning. 3: B’s only vegetable is sliced onion, fried, not “various vegetables simmered.” 4: A adds milk “to finish”; B puts milk in at step ② with the sauce mix and water, not at the end.",
				choiceNotes: [
					"正确。两边第一步都是炒。",
					"A 炒的时候不要焦；B 最后要烤出焦色。",
					"只有 A 炖多种蔬菜；B 主要是洋葱和虾。",
					"只有 A 把牛奶放在仕上げ；B 中途就加牛奶。",
				],
				choiceNotesEn: [
					"Correct. Both start by frying.",
					"A avoids burning while frying; B wants a browned finish.",
					"Only A simmers several vegetables; B is mainly onion and shrimp.",
					"Only A uses milk as a finishing touch; B adds milk mid-recipe.",
				],
			},
		],
	},

	vocab: [
		{ jp: "レシピ", cn: "食谱", en: "recipe", pos: "名詞" },
		{ jp: "ルー", cn: "面糊粉、酱料糊", en: "roux", pos: "名詞" },
		{ jp: "素", kana: "もと", cn: "速成料、调味料", en: "instant mix", pos: "名詞" },
		{ jp: "薄切り", kana: "うすぎり", cn: "薄片", en: "thin slices", pos: "名詞" },
		{ jp: "一口大", kana: "ひとくちだい", cn: "一口大小", en: "bite-size", pos: "名詞" },
		{ jp: "厚手", kana: "あつで", cn: "厚的（锅、布等）", en: "heavy; thick", pos: "な形" },
		{ jp: "耐熱皿", kana: "たいねつざら", cn: "耐热盘", en: "heatproof dish", pos: "名詞" },
		{ jp: "煮込む", kana: "にこむ", cn: "炖", en: "to simmer", pos: "動詞" },
		{ jp: "沸騰する", kana: "ふっとうする", cn: "沸腾", en: "to come to a boil", pos: "動詞" },
		{ jp: "煮立つ", kana: "にたつ", cn: "煮开", en: "to start to boil", pos: "動詞" },
		{ jp: "アク", cn: "浮沫、腥沫", en: "scum", pos: "名詞" },
		{ jp: "すくう", cn: "舀", en: "to scoop", pos: "動詞" },
		{ jp: "炒める", kana: "いためる", cn: "炒", en: "to stir-fry", pos: "動詞" },
		{ jp: "焦がす", kana: "こがす", cn: "炒糊、烤焦", en: "to burn; to scorch", pos: "動詞" },
		{ jp: "焦げ目", kana: "こげめ", cn: "焦色、烤色", en: "browning", pos: "名詞" },
		{ jp: "いったん", cn: "一旦、先（停一下）", en: "for a moment; temporarily", pos: "副詞" },
		{ jp: "仕上げ", kana: "しあげ", cn: "收尾、最后一步", en: "the finishing touch", pos: "名詞" },
		{ jp: "解凍", kana: "かいとう", cn: "解冻", en: "thawing", pos: "名詞・動詞" },
		{ jp: "適量", kana: "てきりょう", cn: "适量", en: "a suitable amount", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜ないように",
			formation: "動詞ない形＋ように",
			meaning: "以免……、不要……。菜谱里常与「焦がす」搭配。",
			meaningEn: "so as not to…. Common in recipes with kogasu (burn).",
			example: {
				jp: "{肉|にく}・{野菜|やさい}を{焦|こ}がさないように{炒|いた}めます。",
				cn: "把肉和蔬菜炒到不要焦。",
				en: "Fry the meat and vegetables without burning them.",
			},
		},
		{
			pattern: "いったん〜",
			meaning: "先……一下、暂时。表示中途停一下再继续。",
			meaningEn: "for a moment / temporarily. Pause mid-process, then continue.",
			example: {
				jp: "いったん{火|ひ}を{止|と}めてルーを{割|わ}り{入|い}れ、よく{溶|と}かします。",
				cn: "先关火，掰开面糊放进去，充分化开。",
				en: "Turn off the heat for a moment, break in the roux, and dissolve it well.",
			},
		},
		{
			pattern: "仕上げに",
			meaning: "最后、作为收尾。注意和「いちばん最後」一样，都是顺序表达。",
			meaningEn: "as a finishing touch / last of all. Same family of order expressions as ichiban saigo.",
			example: {
				jp: "{仕上げ|しあげ}に{牛乳|ぎゅうにゅう}を{加|くわ}えてさらに{軽|かる}く{煮込|にこ}みます。",
				cn: "最后加入牛奶再轻轻炖一下。",
				en: "To finish, add the milk and simmer lightly a little more.",
			},
		},
	],
};
