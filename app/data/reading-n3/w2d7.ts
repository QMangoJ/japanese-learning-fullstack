import type { ReadingDay } from "./types";

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
					"{右|みぎ}のページは、ある{地域|ちいき}のごみの{出|だ}し{方|かた}について{書|か}かれたものである。これを{読|よ}んで{下|した}の{質問|しつもん}に{答|こた}えなさい。{答|こた}えは、1・2・3・4から{最|もっと}もよいものを{一|ひと}つえらびなさい。",
				instructionCn:
					"右页是关于某地区垃圾投放方法的说明。阅读后回答下面的问题。答案从 1・2・3・4 中选出最合适的一个。",
				instructionEn:
					"The page on the right is about how to put out garbage in a certain area. Read it and answer the questions below. Choose the best answer from 1, 2, 3, or 4.",
				blocks: [
					{
						type: "title",
						jp: "みどり{市|し}「{資源|しげん}・ごみの{正|ただ}しい{分|わ}け{方|かた}・{出|だ}し{方|かた}」",
						cn: "绿市《资源・垃圾的正确分类与投放方法》",
						en: "Midori City “How to Sort and Put Out Recyclables and Garbage Correctly”",
						sub: { jp: "{山下町|やましたちょう}の{収集日|しゅうしゅうび}", cn: "山下町的收运日", en: "Collection days for Yamashita-chō" },
					},
					{
						type: "line",
						jp: "〜{指定曜日|していようび}（※1）の{朝|あさ}8{時|じ}までにお{出|だ}しください。〜",
						cn: "〜请在指定星期的早上 8 点之前投放。〜",
						en: "— Please put it out by 8:00 a.m. on the designated day of the week (※1). —",
						align: "center",
					},
					{
						type: "table",
						rows: [
							[
								{ jp: "{不燃|ふねん}ごみ", cn: "不可燃垃圾", en: "Non-burnable garbage", header: true, align: "center" },
								{
									jp: "{月|つき}2{回|かい}　{第|だい}2{土曜日|どようび}、{第|だい}4{土曜日|どようび}\n{金属|きんぞく}、{陶器|とうき}、ガラス、{小型家電製品|こがたかでんせいひん}など\n〔{皿|さら}、はさみ、アイロン、かさ、{蛍光灯|けいこうとう}、{電球|でんきゅう}、{使|つか}い{捨|す}てライター（※2）など〕\n＊{割|わ}れたガラス・{陶器|とうき}などは、{紙|かみ}で{包|つつ}み、「{危険|きけん}」と{表示|ひょうじ}してください。",
									cn: "每月 2 次　第 2 个星期六、第 4 个星期六\n金属、陶器、玻璃、小型家电产品等\n〔盘子、剪刀、熨斗、伞、荧光灯、灯泡、一次性打火机等〕\n＊碎玻璃、破陶器等请用纸包好并标注「危险」。",
									en: "Twice a month: the 2nd Saturday and the 4th Saturday\nMetal, ceramics, glass, small electrical appliances, etc.\n[plates, scissors, irons, umbrellas, fluorescent lamps, light bulbs, disposable lighters (※2), etc.]\n＊ Wrap broken glass, ceramics, and the like in paper and mark them “Danger.”",
								},
							],
							[
								{ jp: "{燃|も}やすごみ", cn: "可燃垃圾", en: "Burnable garbage", header: true, align: "center" },
								{
									jp: "{週|しゅう}2{回|かい}　{火曜日|かようび}・{金曜日|きんようび}\n{生|なま}ごみ、{紙|かみ}くず、{衣類|いるい}、{紙|かみ}おむつ、ゴム・{革製品|かわせいひん}、{容器包装|ようきほうそう}プラスチック{以外|いがい}のプラスチック{製品|せいひん}\n〔ボールペン、プラスチックのおもちゃ、{歯|は}ブラシ、CD、バッグ、{靴|くつ}など〕\n＊{生|なま}ごみは、{水|みず}を{切|き}って{出|だ}してください。\n＊{汚|よご}れている{容器包装|ようきほうそう}プラスチックは、「{燃|も}やすごみ」として{出|だ}してください。",
									cn: "每周 2 次　星期二・星期五\n厨余垃圾、废纸屑、衣物、纸尿裤、橡胶・皮革制品、容器包装塑料以外的塑料制品\n〔圆珠笔、塑料玩具、牙刷、CD、包、鞋等〕\n＊厨余垃圾请沥干水分后投放。\n＊已弄脏的容器包装塑料请作为「可燃垃圾」投放。",
									en: "Twice a week: Tuesday and Friday\nFood waste, scrap paper, clothing, paper diapers, rubber and leather goods, plastic products other than plastic containers and wrapping\n[ballpoint pens, plastic toys, toothbrushes, CDs, bags, shoes, etc.]\n＊ Drain food waste before putting it out.\n＊ Dirty plastic containers and wrapping should be put out as “burnable garbage.”",
								},
							],
							[
								{
									jp: "{容器包装|ようきほうそう}プラスチック\n【プラマーク】\n（{商品|しょうひん}を{入|い}れたり（{容器|ようき}）、つつんでいる（{包装|ほうそう}）プラスチックのことです）",
									cn: "容器包装塑料【塑料标识】\n（指用来盛装商品（容器）或包裹商品（包装）的塑料）",
									en: "Plastic containers and wrapping\n[Pla mark]\n(plastic used to hold a product (container) or wrap it (wrapping))",
									header: true,
									align: "center",
								},
								{
									jp: "{週|しゅう}1{回|かい}　{木曜日|もくようび}\nラップ、ポリ{袋|ぶくろ}、ボトル（シャンプーのボトルなど）、トレイ、カップ、ふた（ペットボトルのキャップも{含|ふく}む）など\n＊ペットボトルは{除|のぞ}きます。\n＊{洗|あら}って{汚|よご}れを{取|と}ってから{出|だ}してください。（{汚|よご}れがとれないものは、「{燃|も}やすごみ」として{出|だ}してください。）",
									cn: "每周 1 次　星期四\n保鲜膜、塑料袋、瓶子（洗发水瓶等）、托盘、杯子、盖子（也包括塑料瓶的瓶盖）等\n＊不包括塑料饮料瓶（ペットボトル）。\n＊请洗净污渍后投放。（洗不掉污渍的请作为「可燃垃圾」投放。）",
									en: "Once a week: Thursday\nPlastic wrap, plastic bags, bottles (shampoo bottles, etc.), trays, cups, lids (including PET-bottle caps), etc.\n＊ PET bottles are excluded.\n＊ Wash off dirt before putting them out. (Items whose dirt will not come off should be put out as “burnable garbage.”)",
								},
							],
							[
								{
									jp: "びん、{缶|かん}、ペットボトル、スプレー{缶|かん}、カセットボンベ",
									cn: "瓶、罐、塑料饮料瓶、喷雾罐、卡式气罐",
									en: "Bottles, cans, PET bottles, spray cans, cassette gas cylinders",
									header: true,
									align: "center",
								},
								{
									jp: "{週|しゅう}1{回|かい}　{木曜日|もくようび}\n＊びん、{缶|かん}、ペットボトルは、{軽|かる}く{洗|あら}ってから{出|だ}してください。よごれの{取|と}れないびん・{缶|かん}は「{不燃|ふねん}ごみ」として{出|だ}してください。\n＊ペットボトルのキャップとラベルは「{容器包装|ようきほうそう}プラスチックごみ」として{出|だ}してください。",
									cn: "每周 1 次　星期四\n＊瓶、罐、塑料饮料瓶请稍加清洗后投放。洗不掉污渍的瓶罐请作为「不可燃垃圾」投放。\n＊塑料饮料瓶的瓶盖和标签请作为「容器包装塑料垃圾」投放。",
									en: "Once a week: Thursday\n＊ Rinse bottles, cans, and PET bottles lightly before putting them out. Bottles and cans whose dirt will not come off should be put out as “non-burnable garbage.”\n＊ PET-bottle caps and labels should be put out as “plastic container and wrapping garbage.”",
								},
							],
							[
								{ jp: "{古紙|こし}", cn: "废纸", en: "Used paper", header: true, align: "center" },
								{
									jp: "{週|しゅう}1{回|かい}　{木曜日|もくようび}\n{新聞|しんぶん}・チラシ、{雑誌|ざっし}、ノート、{紙|かみ}パック、ダンボールなど\n＊{種類別|しゅるいべつ}にひもでしばって{出|だ}してください。",
									cn: "每周 1 次　星期四\n报纸・传单、杂志、笔记本、纸盒、瓦楞纸箱等\n＊请按种类分别用绳子捆好后投放。",
									en: "Once a week: Thursday\nNewspapers and flyers, magazines, notebooks, paper cartons, cardboard, etc.\n＊ Tie each type separately with string before putting it out.",
								},
							],
							[
								{
									jp: "{粗大|そだい}ごみ（{有料|ゆうりょう}）\n{粗大|そだい}ごみ{受付|うけつけ}センター\nTel.XXX-XXXX",
									cn: "大件垃圾（收费）\n大件垃圾受理中心\n电话 XXX-XXXX",
									en: "Oversized garbage (charged)\nOversized Garbage Reception Center\nTel. XXX-XXXX",
									header: true,
									align: "center",
								},
								{
									jp: "{粗大|そだい}ごみ{受付|うけつけ}センターにお{申|もう}し{込|こ}みください。\n{家庭|かてい}から{出|で}る{大型|おおがた}ごみで、{一辺|ひとへん}の{長|なが}さが{約|やく}30cm{以上|いじょう}の{家具|かぐ}、{電気製品|でんきせいひん}、{自転車|じてんしゃ}などが{粗大|そだい}ゴミです。\n＊エアコンや{冷蔵庫|れいぞうこ}、パソコンなど、{粗大|そだい}ごみの{対象|たいしょう}にならないものがあります。センターにお{問|と}い{合|あ}わせください。",
									cn: "请向大件垃圾受理中心申请。\n家庭产生的大型垃圾中，边长约 30cm 以上的家具、电器、自行车等属于大件垃圾。\n＊空调、冰箱、电脑等有些并不属于大件垃圾的受理范围。请咨询中心。",
									en: "Please apply to the Oversized Garbage Reception Center.\nLarge household items with one side about 30 cm or more — furniture, electrical appliances, bicycles, and the like — are oversized garbage.\n＊ Some items, such as air conditioners, refrigerators, and computers, are not accepted as oversized garbage. Please inquire at the center.",
								},
							],
						],
					},
				],
				footnotes: [
					{ marker: "※1", term: "指定曜日", jp: "決められた曜日", cn: "规定好的星期", en: "the designated day of the week" },
					{ marker: "※2", term: "使い捨てライター", jp: "使い終わったら捨てるライター", cn: "一次性打火机", en: "a lighter you throw away when it is used up" },
				],
				questions: [
					{
						label: "1",
						jp: "この{地域|ちいき}のごみの{出|だ}し{方|かた}で、{合|あ}っているものはどれか。",
						cn: "关于这个地区的垃圾投放方法，下列哪一项正确？",
						en: "Which of the following is correct about how to put out garbage in this area?",
						choices: [
							{ jp: "ペットボトルは、「{容器包装|ようきほうそう}プラスチックごみ」として{出|だ}す。", cn: "塑料饮料瓶作为「容器包装塑料垃圾」投放。", en: "PET bottles are put out as “plastic container and wrapping garbage.”" },
							{ jp: "{割|わ}れていないガラスのコップは、ペットボトルと{同|おな}じ{日|ひ}に{出|だ}す。", cn: "没破的玻璃杯和塑料饮料瓶在同一天投放。", en: "An unbroken glass cup is put out on the same day as PET bottles." },
							{ jp: "プラスチックでできているおもちゃは、「{燃|も}やすごみ」として{出|だ}す。", cn: "塑料做的玩具作为「可燃垃圾」投放。", en: "Toys made of plastic are put out as “burnable garbage.”" },
							{
								jp: "{小|ちい}さい{冷蔵庫|れいぞうこ}は、{第|だい}2{土曜日|どようび}か{第|だい}4{土曜日|どようび}に「{不燃|ふねん}ごみ」として{出|だ}す。",
								cn: "小冰箱在第 2 个或第 4 个星期六作为「不可燃垃圾」投放。",
								en: "A small refrigerator is put out as “non-burnable garbage” on the 2nd or 4th Saturday.",
							},
						],
						answer: 3,
						explanation:
							"「燃やすごみ」栏里明确列出了「容器包装プラスチック以外のプラスチック製品〔…プラスチックのおもちゃ…〕」——塑料玩具属于可燃垃圾。所以 3 正确。这类信息检索题要逐项回到表格里核对，注意每一栏的括号内举例和 ＊ 备注。",
						explanationEn:
							"The “burnable garbage” column clearly lists “plastic products other than plastic containers and wrapping […plastic toys…],” so plastic toys are burnable garbage. Choice 3 is correct. On this kind of information-search question, check each choice back against the table, and watch the examples in brackets and the ＊ notes in every column.",
						choiceNotes: [
							"「容器包装プラスチック」栏下明确写着「＊ペットボトルは除きます」，塑料饮料瓶要投到「びん、缶、ペットボトル」那一类。",
							"没破的玻璃杯属于「不燃ごみ」（玻璃），是每月第 2、第 4 个星期六；塑料饮料瓶是每周四。日子不同。",
							"正确。塑料玩具列在「燃やすごみ」的举例中。",
							"「粗大ごみ」栏的备注写着「エアコンや冷蔵庫、パソコンなど、粗大ごみの対象にならないものがあります」，冰箱要向中心咨询，不能当作不可燃垃圾投放。",
						],
						choiceNotesEn: [
							"The “plastic containers and wrapping” column clearly says “＊ PET bottles are excluded.” PET bottles go in the “bottles, cans, PET bottles” category.",
							"An unbroken glass cup is “non-burnable garbage” (glass), collected on the 2nd and 4th Saturdays; PET bottles are collected every Thursday. The days are different.",
							"Correct. Plastic toys are listed among the examples of “burnable garbage.”",
							"The “oversized garbage” note says “some items, such as air conditioners, refrigerators, and computers, are not accepted as oversized garbage.” A refrigerator must be checked with the center; it cannot be put out as non-burnable garbage.",
						],
					},
					{
						label: "2",
						jp: "{山下町|やましたちょう}の{住民|じゅうみん}はだれか。",
						cn: "谁是山下町的居民？",
						en: "Who is a resident of Yamashita-chō?",
						choices: [
							{
								jp: "【Aさん】{今日|きょう}は、{新聞|しんぶん}と{雑誌|ざっし}を{古紙|こし}としてたくさん{出|だ}しました。ビールの{缶|かん}もたくさんたまっているので、{明日忘|あしたわす}れないように{出|だ}すつもりです。",
								cn: "【A】今天把报纸和杂志作为废纸投放了很多。啤酒罐也积了不少，打算明天别忘了拿去投放。",
								en: "[A] Today I put out a lot of newspapers and magazines as used paper. I have also piled up a lot of beer cans, so I plan to put those out tomorrow without forgetting.",
							},
							{
								jp: "【Bさん】{私|わたし}の{地域|ちいき}では、プラスチックのごみは、{週|しゅう}に2{回捨|かいす}てることができますが、スプレー{缶|かん}は、{月|つき}に2{回|かい}しか{捨|す}てることができません。",
								cn: "【B】在我住的地区，塑料垃圾一周可以扔 2 次，但喷雾罐一个月只能扔 2 次。",
								en: "[B] In my area, plastic garbage can be thrown away twice a week, but spray cans can only be thrown away twice a month.",
							},
							{
								jp: "【Cさん】{昨日|きのう}、こわれたかさ、{割|わ}れた{花|か}びん、{革|かわ}のバッグをごみに{出|だ}しました。それから、{使|つか}わない{古|ふる}いアイロンも{捨|す}てました。",
								cn: "【C】昨天把坏掉的伞、破了的花瓶、皮包拿去扔了。另外，不用的旧熨斗也扔了。",
								en: "[C] Yesterday I put out a broken umbrella, a smashed vase, and a leather bag. I also threw away an old iron I no longer use.",
							},
							{
								jp: "【Dさん】{私|わたし}は、びん・{缶|かん}は{洗|あら}って、「びん・{缶|かん}の{日|ひ}」に{出|だ}していますが、コンビニのお{弁当|べんとう}の{容器|ようき}や{洗剤|せんざい}のボトルは、{洗|あら}わずに「{燃|も}やすごみ」として{出|だ}しています。",
								cn: "【D】我把瓶罐洗干净后在「瓶罐日」投放，但便利店便当的容器和洗涤剂的瓶子不洗，直接作为「可燃垃圾」投放。",
								en: "[D] I wash bottles and cans and put them out on “bottle-and-can day,” but I put out convenience-store bento containers and detergent bottles unwashed as “burnable garbage.”",
							},
						],
						answer: 4,
						explanation:
							"D 的做法和山下町的规则完全吻合：①「びん、缶」洗净后在周四（びん・缶の日）投放；②便当容器和洗涤剂瓶属于「容器包装プラスチック」，而备注写着「汚れている容器包装プラスチックは、『燃やすごみ』として出してください」——不洗（有污渍）就投可燃垃圾，正是这条规则。所以 4 正确。",
						explanationEn:
							"D’s habits match Yamashita-chō’s rules exactly: (1) bottles and cans are washed and put out on Thursday (“bottle-and-can day”); (2) bento containers and detergent bottles are “plastic containers and wrapping,” and the note says “dirty plastic containers and wrapping should be put out as ‘burnable garbage’” — putting them out unwashed (so they are dirty) as burnable garbage is exactly that rule. So 4 is correct.",
						choiceNotes: [
							"古紙和「びん・缶」都是每周四同一天收，不需要「明天」再去投放。所以 A 不是山下町的居民。",
							"山下町的容器包装塑料是每周 1 次（周四）、喷雾罐也是每周 1 次（周四），与 B 说的「一周 2 次／一月 2 次」不符。",
							"皮包（革製品）属于「燃やすごみ」，不能和伞、花瓶、熨斗（不燃ごみ）一起扔。C 弄错了。",
							"正确。两条做法都符合山下町的规则。",
						],
						choiceNotesEn: [
							"Used paper and “bottles and cans” are both collected on Thursday, the same day, so there is no need to put the cans out “tomorrow.” A is not a Yamashita-chō resident.",
							"In Yamashita-chō, plastic containers and wrapping are once a week (Thursday), and spray cans are also once a week (Thursday). That does not match B’s “twice a week / twice a month.”",
							"A leather bag (leather goods) is “burnable garbage” and cannot be thrown out together with an umbrella, a vase, and an iron (non-burnable). C has it wrong.",
							"Correct. Both of D’s habits match Yamashita-chō’s rules.",
						],
					},
				],
			},
			{
				label: "問題2",
				instruction:
					"つぎの{文章|ぶんしょ}は、{薬|くすり}の{注意書|ちゅういが}きである。{下|した}の{質問|しつもん}に{答|こた}えなさい。{答|こた}えは、1・2・3・4から{最|もっと}もよいものを{一|ひと}つえらびなさい。",
				instructionCn: "下面这篇文章是药品的注意事项。回答下面的问题。答案从 1・2・3・4 中选出最合适的一个。",
				instructionEn: "The following text is the caution label on a medicine. Answer the questions below. Choose the best answer from 1, 2, 3, or 4.",
				blocks: [
					{ type: "title", jp: "{胃腸薬|いちょうやく}「スッキリン」{使用上|しようじょう}（※1）の{注意|ちゅうい}", cn: "肠胃药「爽快灵」使用上的注意事项", en: "Cautions on use (※1) for the stomach-and-intestine medicine “Sukkirin”" },
					{ type: "heading", jp: "1．{次|つぎ}の{人|ひと}は{服用|ふくよう}（※2）しないでください。", cn: "1．以下人群请勿服用。", en: "1. The following people should not take (※2) this medicine." },
					{
						type: "list",
						marker: "・",
						items: [
							{ jp: "{妊婦|にんぷ}（※3）または{妊娠|にんしん}（※4）していると{思|おも}われる{人|ひと}", cn: "孕妇或被认为已怀孕的人", en: "Pregnant women (※3), or people who are thought to be pregnant (※4)" },
							{ jp: "11{歳未満|さいみまん}の{子|こ}ども", cn: "未满 11 岁的儿童", en: "Children under 11 years of age" },
						],
					},
					{ type: "heading", jp: "2．{次|つぎ}の{場合|ばあい}は、すぐに{服用|ふくよう}を{中止|ちゅうし}してください。", cn: "2．出现以下情况请立即停止服用。", en: "2. In the following cases, stop taking the medicine immediately." },
					{
						type: "list",
						marker: "・",
						items: [
							{ jp: "{服用後|ふくようご}、{皮膚|ひふ}にかゆみ（※5）などの{変化|へんか}があらわれた{場合|ばあい}", cn: "服用后皮肤出现瘙痒等变化时", en: "If, after taking it, a change such as itching (※5) appears on the skin" },
							{ jp: "2{週間以上服用|しゅうかんいじょうふくよう}してもよくならない{場合|ばあい}", cn: "服用 2 周以上仍不见好转时", en: "If it does not get better even after taking it for two weeks or more" },
						],
					},
					{
						type: "heading",
						jp: "3．{服用後|ふくようご}しばらくの{間|あいだ}は、{乗|の}り{物|もの}または{機械類|きかいるい}の{運転操作|うんてんそうさ}をしないでください。",
						cn: "3．服用后一段时间内，请勿驾驶车辆或操作机械。",
						en: "3. For a while after taking this medicine, do not drive a vehicle or operate machinery.",
					},
					{ type: "heading", jp: "4．{使用期限|しようきげん}を{過|す}ぎた{製品|せいひん}は{服用|ふくよう}しないでください。", cn: "4．请勿服用超过使用期限的产品。", en: "4. Do not take a product that is past its expiration date." },
				],
				footnotes: [
					{ marker: "※1", term: "使用上の", jp: "使用する場合の", cn: "使用时的", en: "when using (the product)" },
					{ marker: "※2", term: "服用", jp: "薬を飲むこと", cn: "服药", en: "taking a medicine" },
					{ marker: "※3", term: "妊婦", jp: "おなかの中に子どもがいる女性", cn: "孕妇", en: "a woman who has a child in her womb" },
					{ marker: "※4", term: "妊娠", jp: "おなかの中に子どもができること", cn: "怀孕", en: "becoming pregnant / having a child in the womb" },
					{ marker: "※5", term: "かゆみ", jp: "かゆい感覚", cn: "痒的感觉", en: "an itchy feeling" },
				],
				questions: [
					{
						label: "3",
						jp: "この{薬|くすり}はなんの{薬|くすり}か。",
						cn: "这是什么药？",
						en: "What kind of medicine is this?",
						choices: [
							{ jp: "{乗|の}り{物|もの}に{酔|よ}わないようにする{薬|くすり}", cn: "防晕车的药", en: "A medicine to keep you from getting carsick" },
							{ jp: "かゆみを{止|と}める{薬|くすり}", cn: "止痒的药", en: "A medicine to stop itching" },
							{ jp: "{頭|あたま}の{痛|いた}みをやわらげる{薬|くすり}", cn: "缓解头痛的药", en: "A medicine to ease a headache" },
							{ jp: "{胃|い}や{腸|ちょう}の{調子|ちょうし}をよくする{薬|くすり}", cn: "调理胃肠的药", en: "A medicine to improve the condition of the stomach and intestines" },
						],
						answer: 4,
						explanation:
							"标题就是「胃腸薬『スッキリン』」——「胃腸薬」＝调理胃肠的药，所以 4 正确。「乗り物」「かゆみ」虽然在正文里出现，但那是副作用和注意事项，不是药的用途。这是典型的干扰项设置。",
						explanationEn:
							"The title itself is “stomach-and-intestine medicine ‘Sukkirin’” — ichōyaku means a medicine that improves the stomach and intestines, so 4 is correct. “Vehicles” and “itching” do appear in the body, but they are a side effect and a caution, not the medicine’s purpose. That is a typical distractor setup.",
						choiceNotes: [
							"「乗り物」出现在注意事项 3（服药后别开车），不是药效。",
							"「かゆみ」出现在注意事项 2（出现瘙痒要停药），是副作用而非疗效。",
							"文中完全没有提到头痛。",
							"正确。标题的「胃腸薬」直接说明了用途。",
						],
						choiceNotesEn: [
							"“Vehicles” appears in caution 3 (do not drive after taking the medicine); it is not the effect of the drug.",
							"“Itching” appears in caution 2 (stop if itching appears); it is a side effect, not the intended effect.",
							"Headaches are never mentioned in the text.",
							"Correct. The title’s ichōyaku states the purpose directly.",
						],
					},
					{
						label: "4",
						jp: "この{注意書|ちゅういが}きと{内容|ないよう}が{合|あ}っているものはどれか。",
						cn: "下列哪一项与这份注意事项的内容相符？",
						en: "Which of the following matches the content of this caution label?",
						choices: [
							{ jp: "11{歳|さい}の{子|こ}どもは、この{薬|くすり}を{飲|の}んではいけない。", cn: "11 岁的儿童不可以服用这种药。", en: "An 11-year-old child must not take this medicine." },
							{ jp: "この{薬|くすり}は2{週間以上飲|しゅうかんいじょうの}まないと、よくならない。", cn: "这种药不服用 2 周以上就不会好。", en: "This medicine will not work unless you take it for two weeks or more." },
							{
								jp: "この{薬|くすり}を{飲|の}んでからしばらくの{間|あいだ}は、{車|くるま}の{運転|うんてん}をしてはいけない。",
								cn: "服用这种药后的一段时间内不可以开车。",
								en: "For a while after taking this medicine, you must not drive a car.",
							},
							{
								jp: "{使用期限|しようきげん}を{過|す}ぎていなければ、2{週間以上|しゅうかんいじょう}この{薬|くすり}を{飲|の}んでもよい。",
								cn: "只要没过使用期限，就可以服用这种药 2 周以上。",
								en: "As long as it is not past the expiration date, you may take this medicine for two weeks or more.",
							},
						],
						answer: 3,
						explanation:
							"注意事项 3 写着「服用後しばらくの間は、乗り物または機械類の運転操作をしないでください」。「乗り物の運転」当然包括开车，所以 3 与原文一致。",
						explanationEn:
							"Caution 3 says “for a while after taking this medicine, do not drive a vehicle or operate machinery.” Driving a vehicle of course includes driving a car, so 3 matches the original.",
						choiceNotes: [
							"原文是「11 歳未満の子ども」——「未満」不含 11 岁本身，所以 11 岁的孩子可以服用。这是第 1 週学过的「未満」考点。",
							"原文的意思正好相反：「2 週間以上服用してもよくならない場合」要立即停药。",
							"正确。「乗り物…の運転操作をしないでください」。",
							"服用 2 周仍不见效就要停药，与使用期限无关。两件事被混在一起了。",
						],
						choiceNotesEn: [
							"The original says “children under 11.” Miman does not include 11 itself, so an 11-year-old may take it. This is the miman point from Week 1.",
							"The original means the opposite: if it does not get better even after two weeks or more, stop immediately.",
							"Correct. “Do not drive a vehicle or operate machinery.”",
							"If it still does not work after two weeks you must stop, regardless of the expiration date. Two separate facts have been mixed together.",
						],
					},
				],
			},
		],
	},

	vocab: [
		{ jp: "資源", kana: "しげん", cn: "资源", en: "resources; recyclables", pos: "名詞" },
		{ jp: "収集日", kana: "しゅうしゅうび", cn: "收运日", en: "collection day", pos: "名詞" },
		{ jp: "指定", kana: "してい", cn: "指定", en: "designation; to designate", pos: "名詞・動詞" },
		{ jp: "不燃ごみ", kana: "ふねんごみ", cn: "不可燃垃圾", en: "non-burnable garbage", pos: "名詞" },
		{ jp: "陶器", kana: "とうき", cn: "陶器", en: "ceramics; pottery", pos: "名詞" },
		{ jp: "蛍光灯", kana: "けいこうとう", cn: "荧光灯", en: "fluorescent lamp", pos: "名詞" },
		{ jp: "生ごみ", kana: "なまごみ", cn: "厨余垃圾", en: "food waste; kitchen garbage", pos: "名詞" },
		{ jp: "衣類", kana: "いるい", cn: "衣物", en: "clothing", pos: "名詞" },
		{ jp: "革製品", kana: "かわせいひん", cn: "皮革制品", en: "leather goods", pos: "名詞" },
		{ jp: "容器包装", kana: "ようきほうそう", cn: "容器包装", en: "containers and wrapping", pos: "名詞" },
		{ jp: "除く", kana: "のぞく", cn: "除去、不包括", en: "to exclude; to leave out", pos: "動詞" },
		{ jp: "古紙", kana: "こし", cn: "废纸", en: "used paper; wastepaper", pos: "名詞" },
		{ jp: "粗大ごみ", kana: "そだいごみ", cn: "大件垃圾", en: "oversized garbage", pos: "名詞" },
		{ jp: "対象", kana: "たいしょう", cn: "对象、适用范围", en: "target; what is covered", pos: "名詞" },
		{ jp: "問い合わせる", kana: "といあわせる", cn: "咨询、询问", en: "to inquire; to contact (for information)", pos: "動詞" },
		{ jp: "住民", kana: "じゅうみん", cn: "居民", en: "resident", pos: "名詞" },
		{ jp: "胃腸薬", kana: "いちょうやく", cn: "肠胃药", en: "stomach-and-intestine medicine", pos: "名詞" },
		{ jp: "服用", kana: "ふくよう", cn: "服药", en: "taking (a medicine)", pos: "名詞・動詞" },
		{ jp: "妊婦", kana: "にんぷ", cn: "孕妇", en: "pregnant woman", pos: "名詞" },
		{ jp: "皮膚", kana: "ひふ", cn: "皮肤", en: "skin", pos: "名詞" },
		{ jp: "使用期限", kana: "しようきげん", cn: "使用期限", en: "expiration date", pos: "名詞" },
		{ jp: "運転操作", kana: "うんてんそうさ", cn: "驾驶操作", en: "driving / operating (a vehicle or machine)", pos: "名詞" },
	],

	grammar: [
		{
			pattern: "〜として",
			formation: "名詞 ＋ として",
			meaning: "作为……。垃圾分类、身份说明中常用。",
			meaningEn: "as…. Common when sorting garbage or stating a role.",
			example: { jp: "「{燃|も}やすごみ」として{出|だ}してください。", cn: "请作为「可燃垃圾」投放。", en: "Please put it out as “burnable garbage.”" },
		},
		{
			pattern: "〜{未満|みまん}",
			meaning: "未满……（不含本数）。",
			meaningEn: "under… / less than… (the number itself is not included).",
			example: { jp: "11{歳未満|さいみまん}の{子|こ}ども", cn: "未满 11 岁的儿童（11 岁不算在内）", en: "children under 11 (11 itself is not included)" },
			note: "本次实战题 [4] 的核心考点，与第 1 週 3日目 呼应。",
			noteEn: "The core test point of practice question [4]; it echoes Week 1, Day 3.",
		},
		{
			pattern: "〜てから",
			meaning: "……之后再……。强调动作的先后。",
			meaningEn: "after …-ing. Stresses the order of actions.",
			example: { jp: "{洗|あら}って{汚|よご}れを{取|と}ってから{出|だ}してください。", cn: "请洗净污渍后再投放。", en: "Please wash off the dirt and then put it out." },
		},
		{
			pattern: "〜ずに",
			formation: "動詞ない形（ない→ずに）※する→せずに",
			meaning: "不……就……。「〜ないで」的书面语形式。",
			meaningEn: "without …-ing. The written form of ~naide.",
			example: { jp: "{洗|あら}わずに「{燃|も}やすごみ」として{出|だ}しています。", cn: "不洗就作为「可燃垃圾」投放。", en: "I put them out as “burnable garbage” without washing them." },
		},
		{
			pattern: "〜しか〜ない",
			meaning: "只有……（含「太少」的语气）。",
			meaningEn: "only… (with the sense that it is too few).",
			example: { jp: "{月|つき}に2{回|かい}しか{捨|す}てることができません。", cn: "一个月只能扔 2 次。", en: "You can only throw it away twice a month." },
		},
		{
			pattern: "〜と{思|おも}われる",
			meaning: "被认为……、看起来像……。「思う」的被动形，客观表述。",
			meaningEn: "is thought to… / appears to…. Passive of omou; an objective wording.",
			example: { jp: "{妊娠|にんしん}していると{思|おも}われる{人|ひと}", cn: "被认为已经怀孕的人", en: "a person who is thought to be pregnant" },
		},
		{
			pattern: "〜ても",
			meaning: "即使……也……。",
			meaningEn: "even if… / even though….",
			example: { jp: "2{週間以上服用|しゅうかんいじょうふくよう}してもよくならない{場合|ばあい}", cn: "服用 2 周以上仍不见好转时", en: "if it does not get better even after taking it for two weeks or more" },
		},
		{
			pattern: "〜ないように",
			meaning: "为了不……、注意别……。",
			meaningEn: "so as not to… / so that … does not happen.",
			example: { jp: "{明日忘|あしたわす}れないように{出|だ}すつもりです。", cn: "打算明天别忘了拿去投放。", en: "I plan to put it out tomorrow so I don’t forget." },
		},
	],
};
