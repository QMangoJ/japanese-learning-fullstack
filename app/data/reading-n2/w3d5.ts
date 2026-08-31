import type { ReadingDay } from "../reading-n3/types";

// 第3週 5日目 説明文① — printed pages 52–53
export const w3d5: ReadingDay = {
	week: 3,
	day: 5,
	label: "説明文①",
	labelKana: "せつめいぶん",
	labelEn: "Explanatory Notes ①",
	printedPages: [52, 53],
	answerSource: "book",

	point: {
		title: "{指示語|しじご}に{注意|ちゅうい}！①",
		titleCn: "注意指示词！①",
		titleEn: "Pay attention to demonstratives! ①",
		figure: {
			alt: "桜の木の下でビールを持ったキャラクターが花見をしており、別のキャラクターが「前じゃない場合もあるよ。それはまたあとで。（第4週5日目）」と言っているイラスト",
			cn: "樱花树下角色拿着啤酒赏花，另一个角色说「也有不是指前面的情况。那个以后再讲。（第4周第5天）」",
			en: "A character with a beer under a cherry tree; another says “Sometimes it does not point backward. That’s for later. (Week 4, Day 5)”",
		},
		tips: [
			{
				jp: "{前|まえ}の{内容|ないよう}を{指|さ}す{場合|ばあい}が{多|おお}いです。{例|たと}えば……",
				cn: "多数情况是指前面的内容。例如……",
				en: "In many cases they point to what came before. For example…",
			},
			{
				jp: "もうすぐサクラが{咲|さ}く。これを{楽|たの}しみにしている{人|ひと}は{多|おお}い。",
				cn: "樱花马上要开了。以此为乐的人很多。（「これ」＝樱花要开这件事）",
				en: "The cherry blossoms will be out soon. Many people are looking forward to this. (“This” = the blossoms coming out.)",
			},
			{
				jp: "{内容|ないよう}が{一文|いちぶん}だけでなく{長|なが}い{場合|ばあい}もある。",
				cn: "有时所指的内容不只一句，而是更长的部分。",
				en: "Sometimes what they point to is longer than a single sentence.",
			},
			{
				jp: "サクラが{咲|さ}くと{酒|さけ}が{飲|の}める。ぼくには{花|はな}の{美|うつく}しさよりそれのほうが{楽|たの}しみなのだ。",
				cn: "樱花一开就可以喝酒。对我来说，比起花的美丽，那个才更开心。（「それ」＝喝酒，不是「花的美丽」）",
				en: "When the cherries bloom you can drink. For me, that is more of a pleasure than the beauty of the flowers. (“That” = drinking, not “the beauty of the flowers.”)",
			},
			{
				jp: "すぐ{前|まえ}といっても、「{花|はな}の{美|うつく}しさ」ではないことは{内容|ないよう}から{考|かんが}える。",
				cn: "虽说就在紧前面，从内容判断并不是「花的美丽」。",
				en: "Even if it is immediately before, you can tell from the content that it is not “the beauty of the flowers.”",
			},
		],
		expressions: [
			{ jp: "これ／それ／あれ／どれ", cn: "指事物。多数回指前文。", en: "this / that / that over there / which — often point back" },
			{ jp: "こんな／そんな／あんな", cn: "这样的／那样的", en: "this kind of / that kind of" },
		],
	},

	renshu: {
		instruction: "{次|つぎ}の{会話文|かいわぶん}を{読|よ}んで、{後|あと}の{文|ぶん}から{正|ただ}しいものを{選|えら}ぼう。",
		instructionCn: "阅读下面的对话，从后面的句子中选出正确的。（答案在下一页）",
		instructionEn: "Read the conversation below and choose the correct statements from the sentences that follow. (Answers are on the next page.)",
		blocks: [
			{
				type: "speech",
				speaker: "{男|おとこ}の{人|ひと}",
				speakerCn: "男士",
				speakerEn: "Man",
				jp: "あれ、ここも{禁煙|きんえん}？　この{会社|かいしゃ}も{吸|す}えるところがどんどん{減|へ}っちゃって、{居|い}{心地|ごこち}{悪|わる}く（注1）なったよな。{道路|どうろ}でも{吸|す}ったら{罰金|ばっきん}（注2）{取|と}られるっていうし。{喫煙者|きつえんしゃ}（注3）はつらいよ。",
				cn: "咦，这里也禁烟？这家公司能抽的地方越来越少，待着真不舒服。听说在路上抽也要被罚。吸烟的人可真难熬。",
				en: "Huh, no smoking here either? The places you can smoke at this company keep shrinking; it’s gotten uncomfortable. And they say you get fined for smoking even on the street. It’s tough being a smoker.",
			},
			{
				type: "speech",
				speaker: "{女|おんな}の{人|ひと}",
				speakerCn: "女士",
				speakerEn: "Woman",
				jp: "じゃ、やめちゃえばいいじゃない。どんどん{値上|ねあ}がりしているんでしょ。{体|からだ}に{悪|わる}いし、それに、{周|まわ}りの{人|ひと}にとっても{迷惑|めいわく}だし。",
				cn: "那就戒掉不就行了。价格也在一个劲儿涨吧。对身体不好，而且对周围的人也添麻烦。",
				en: "Then why not just quit? The price keeps going up, doesn’t it. It’s bad for you, and it’s a nuisance to the people around you too.",
			},
			{
				type: "speech",
				speaker: "{男|おとこ}の{人|ひと}",
				speakerCn: "男士",
				speakerEn: "Man",
				jp: "……。でも、だったら、{酔|よ}っ{払|ぱら}いだって{迷惑|めいわく}だと{思|おも}うんだけどなあ。",
				cn: "……可是那样的话，醉汉也够添麻烦的吧。",
				en: "…But then, drunks are a nuisance too, I’d have thought.",
			},
			{
				type: "speech",
				speaker: "{女|おんな}の{人|ひと}",
				speakerCn: "女士",
				speakerEn: "Woman",
				jp: "いえ、お{酒|さけ}より{絶対|ぜったい}に{迷惑|めいわく}よ。{煙|けむり}はいやでもわたしたちの{体|からだ}に{入|はい}ってくるんだから。",
				cn: "不，绝对比酒更添麻烦。烟就算不愿意也会进到我们身体里。",
				en: "No, it’s definitely more of a nuisance than alcohol. The smoke gets into our bodies whether we like it or not.",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "居心地が悪い", jp: "いごこちがわるい", cn: "感觉不舒服", en: "to feel uncomfortable" },
			{ marker: "（注2）", term: "罰金", jp: "ばっきん", cn: "罚款", en: "a fine" },
			{ marker: "（注3）", term: "喫煙者", jp: "きつえんしゃ", cn: "吸烟者", en: "a smoker" },
		],
		choices: [
			{ jp: "この{会社|かいしゃ}では、タバコを{吸|す}う{場所|ばしょ}がない。", cn: "这家公司没有吸烟的地方。", en: "There is nowhere to smoke at this company." },
			{ jp: "{男|おとこ}の{人|ひと}は{道路|どうろ}でタバコを{吸|す}って{罰金|ばっきん}を{払|はら}った。", cn: "男士在路上吸烟被罚了款。", en: "The man smoked on the street and paid a fine." },
			{ jp: "{女|おんな}の{人|ひと}は{男|おとこ}の{人|ひと}にタバコをやめるように{勧|すす}めている。", cn: "女士在劝男士戒烟。", en: "The woman is urging the man to quit smoking." },
			{ jp: "{男|おとこ}の{人|ひと}は、{喫煙者|きつえんしゃ}は{酔|よ}っ{払|ぱら}いほど{迷惑|めいわく}をかけていないと{言|い}っている。", cn: "男士说吸烟者没有醉汉那么添麻烦。", en: "The man says smokers are not as much of a nuisance as drunks." },
			{ jp: "{女|おんな}の{人|ひと}は、{酔|よ}っ{払|ぱら}いより{喫煙者|きつえんしゃ}のほうが{迷惑|めいわく}だと{思|おも}っている。", cn: "女士认为吸烟者比醉汉更添麻烦。", en: "The woman thinks smokers are more of a nuisance than drunks." },
		],
		answers: [3, 5],
	},

	mondai: {
		instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{後|あと}の{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的文章，回答后面的问题。（答案在别册 p.4）",
		instructionEn: "Read the following text and answer the questions that follow. (Answers are in the separate booklet, p. 4.)",
		blocks: [
			{
				type: "paragraph",
				indent: true,
				jp: "{近年|きんねん}（注1）、{日本|にほん}では「{分煙|ぶんえん}（注2）」「{終日禁煙|しゅうじつきんえん}」が{当|あ}たり{前|まえ}になりつつある。{電車|でんしゃ}やホテル、{公共施設|こうきょうしせつ}（注3）などでも{禁煙|きんえん}になっているところがほとんどである。{会社|かいしゃ}でも{喫煙|きつえん}できるスペースは{年々|ねんねん}{狭|せま}くなっているようだ。また、{路上|ろじょう}でタバコを{吸|す}えば{罰金|ばっきん}を{払|はら}わなければならない{地域|ちいき}もある。",
				cn: "近年来（注1），在日本「分隔吸烟区」（注2）、「全天禁烟」正逐渐成为理所当然。电车、酒店、公共设施（注3）等几乎也都禁烟了。公司里能吸烟的空间似乎也一年年变窄。还有些地区在路上吸烟就必须交罚款。",
				en: "In recent years (note 1), “separated smoking areas” (note 2) and “no smoking all day” have been becoming the norm in Japan. Trains, hotels, public facilities (note 3) and the like are non-smoking in almost every case. At companies, too, the space where you can smoke seems to be getting narrower year by year. And in some districts, if you smoke on the street you have to pay a fine.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "{喫煙者|きつえんしゃ}はこれをかなり{不満|ふまん}に{思|おも}っていて、なぜ{酒|さけ}はよくてタバコはダメなのかと{反論|はんろん}（注4）をする。しかし、よく{考|かんが}えればやはり①その{違|ちが}いは{明|あき}らかである。{酔|よ}っ{払|ぱら}いが{周|まわ}りに{迷惑|めいわく}をかけることはあっても、{酒|さけ}そのものが{周囲|しゅうい}の{人|ひと}の{体|からだ}に{直接|ちょくせつ}{影響|えいきょう}を{与|あた}えることはない*。それに{対|たい}して{喫煙|きつえん}にはやっかいな（注5）{煙|けむり}が{付|つ}き{物|もの}（注6）だ。タバコの{先|さき}から{出|で}る{煙|けむり}は{空気中|くうきちゅう}に{広|ひろ}がる。つまり、{煙|けむり}は{周囲|しゅうい}の{人々|ひとびと}の{肺|はい}（注7）にも{入|はい}るのである。",
				cn: "吸烟者对此相当不满，反驳（注4）说：为什么酒可以、烟就不行。可是仔细一想，①那个差别其实很明显。醉汉固然会给周围添麻烦，酒本身却不会直接影响周围人的身体*。与此相对，吸烟总带着讨厌的（注5）烟这个附属物（注6）。从烟头冒出的烟在空气中扩散。也就是说，烟也会进入周围人的肺（注7）里。",
				en: "Smokers are quite unhappy about this, and they object (note 4): why is alcohol all right and tobacco not? But if you think it through, ①that difference is obvious after all. A drunk may be a nuisance to people around, but the drink itself does not directly affect their bodies.* Smoking, on the other hand, always comes with troublesome (note 5) smoke as a companion (note 6). The smoke from the tip of the cigarette spreads through the air. In other words, the smoke goes into the lungs (note 7) of the people around as well.",
			},
			{
				type: "paragraph",
				indent: true,
				jp: "「タバコ{臭|くさ}い」とか「{煙|けむ}い」ということより、②これが{喫煙者|きつえんしゃ}が{嫌|きら}われる{大|おお}きな{理由|りゆう}である。",
				cn: "比起「有烟味」或「熏人」，②这才是吸烟者被人讨厌的很大理由。",
				en: "More than “it smells of tobacco” or “it’s smoky,” ②this is a big reason smokers are disliked.",
			},
		],
		footnotes: [
			{ marker: "（注1）", term: "近年", jp: "きんねん", cn: "近几年、最近", en: "recently" },
			{ marker: "（注2）", term: "分煙", jp: "ぶんえん", cn: "隔离吸烟区", en: "separation of smoking areas" },
			{ marker: "（注3）", term: "公共施設", jp: "こうきょうしせつ", cn: "公共设施", en: "a public place" },
			{ marker: "（注4）", term: "反論", jp: "はんろん", cn: "反驳", en: "to refute; object" },
			{ marker: "（注5）", term: "やっかいな", jp: "やっかいな", cn: "麻烦的", en: "cumbersome" },
			{ marker: "（注6）", term: "付き物", jp: "つきもの", cn: "附属物", en: "something which comes with it" },
			{ marker: "（注7）", term: "肺", jp: "はい", cn: "肺", en: "a lung" },
		],
		pageNotes: [
			{
				jp: "＊{酒|さけ}そのものが{周囲|しゅうい}の{人|ひと}の{体|からだ}に{直接|ちょくせつ}{影響|えいきょう}を{与|あた}えることはない",
				cn: "喝醉酒的人虽然可能会给周围的人添麻烦，但酒本身并不会对周围人的身体带来直接的影响。",
				en: "Although drinkers disturb other people, they don’t harm their health.",
			},
		],
		questions: [
			{
				label: "問1",
				jp: "①その{違|ちが}いとは{何|なに}の{違|ちが}いか。",
				cn: "①「那个差别」是什么和什么的差别？",
				en: "①“That difference” is a difference between what and what?",
				choices: [
					{ jp: "{禁煙|きんえん}と{罰金|ばっきん}", cn: "禁烟和罚款", en: "no smoking and fines" },
					{ jp: "{煙|けむり}と{臭|にお}い", cn: "烟和气味", en: "smoke and smell" },
					{ jp: "{酒|さけ}とタバコ", cn: "酒和烟", en: "alcohol and tobacco" },
					{ jp: "{酔|よ}っ{払|ぱら}いと{喫煙家|きつえんか}", cn: "醉汉和烟民", en: "drunks and smokers" },
				],
				answer: 3,
				explanation:
					"指示词「その」要回看紧挨着的前句：「なぜ酒はよくてタバコはダメなのか」。所以「その違い」＝酒和烟的差别，选 3。本课要点：指示词多数指前面的内容，而且不一定只指紧挨着的一个词，要从意思判断。4 把对比对象换成了「人」，文章对比的是酒和烟这两种东西。",
				explanationEn:
					"For the demonstrative sono, look at the sentence just before: “why is alcohol all right and tobacco not?” So “that difference” is the difference between alcohol and tobacco: 3. This lesson’s point: demonstratives usually point back, and you decide from the meaning, not just the nearest noun. 4 swaps the things being compared for the people; the passage compares drink and tobacco.",
				choiceNotes: [
					"禁烟和罚款是第一段的措施，不是「酒可以、烟不行」的那个差别。",
					"烟和气味是后文在分析吸烟的害处，不是①所指的对比。",
					"正确。前句就是「酒はよくてタバコはダメ」。",
					"对比的是酒和烟，不是醉汉和吸烟者这两种人。",
				],
				choiceNotesEn: [
					"No-smoking rules and fines are measures in paragraph 1, not the “alcohol vs tobacco” difference.",
					"Smoke and smell come later, when the harm of smoking is explained; they are not what ① points to.",
					"Correct. The previous sentence is “why is alcohol all right and tobacco not?”",
					"The comparison is drink vs tobacco, not drunks vs smokers as people.",
				],
			},
			{
				label: "問2",
				jp: "②これとは{何|なに}を{指|さ}しているか。",
				cn: "②「这」指的是什么？",
				en: "What does ②“this” refer to?",
				choices: [
					{ jp: "タバコを{吸|す}うこと", cn: "吸烟这件事", en: "the fact of smoking" },
					{ jp: "タバコが{臭|くさ}く、{煙|けむ}いこと", cn: "烟有味、熏人这件事", en: "tobacco smelling and being smoky" },
					{ jp: "タバコの{煙|けむり}が{周|まわ}りの{人|ひと}の{健康|けんこう}を{害|がい}すること", cn: "烟损害周围人的健康这件事", en: "tobacco smoke harming the health of people around" },
					{ jp: "タバコを{吸|す}える{場所|ばしょ}が{狭|せま}くなっていること", cn: "能吸烟的地方变窄这件事", en: "places where you can smoke getting narrower" },
				],
				answer: 3,
				explanation:
					"「これ」前面刚写完：烟会进入周围人的肺。紧接着「『タバコ臭い』とか『煙い』ということより、②これが……」——明确把「气味熏人」降为次要，真正的理由是烟进到别人肺里、损害健康。选 3。指示词不一定等于紧前面的名词，要从「より」的对比来判断。",
				explanationEn:
					"Just before “this,” the smoke goes into the lungs of people around. Then: “more than ‘it smells’ or ‘it’s smoky,’ ②this is…” — the smell is put second; the real reason is that smoke enters other people’s lungs and harms their health. Choose 3. A demonstrative is not always the nearest noun; the comparison with yori tells you.",
				choiceNotes: [
					"「吸烟」范围太大，没有落到「对周围人身体的影响」。",
					"文中用「より」把「臭い・煙い」说成次要，正是要排除的。",
					"正确。「煙は周囲の人々の肺にも入る」才是②。",
					"那是第一段的背景，不是被讨厌的「大きな理由」。",
				],
				choiceNotesEn: [
					"“Smoking” is too broad; it misses the effect on other people’s bodies.",
					"Yori puts “smells / smoky” in second place — that is what to rule out.",
					"Correct. “The smoke goes into the lungs of people around” is ②.",
					"That is background from paragraph 1, not the “big reason” they are disliked.",
				],
			},
		],
	},

	vocab: [
		{ jp: "指示語", kana: "しじご", cn: "指示词", en: "demonstrative", pos: "名詞" },
		{ jp: "禁煙", kana: "きんえん", cn: "禁烟", en: "no smoking", pos: "名詞" },
		{ jp: "分煙", kana: "ぶんえん", cn: "分隔吸烟区", en: "separated smoking areas", pos: "名詞" },
		{ jp: "終日禁煙", kana: "しゅうじつきんえん", cn: "全天禁烟", en: "no smoking all day", pos: "名詞" },
		{ jp: "公共施設", kana: "こうきょうしせつ", cn: "公共设施", en: "public facility", pos: "名詞" },
		{ jp: "喫煙者", kana: "きつえんしゃ", cn: "吸烟者", en: "smoker", pos: "名詞" },
		{ jp: "居心地", kana: "いごこち", cn: "（待着的）感觉", en: "how comfortable a place feels", pos: "名詞" },
		{ jp: "罰金", kana: "ばっきん", cn: "罚款", en: "a fine", pos: "名詞" },
		{ jp: "路上", kana: "ろじょう", cn: "路上", en: "on the street", pos: "名詞" },
		{ jp: "値上がり", kana: "ねあがり", cn: "涨价", en: "a price rise", pos: "名詞・動詞" },
		{ jp: "酔っ払い", kana: "よっぱらい", cn: "醉汉", en: "a drunk", pos: "名詞" },
		{ jp: "反論", kana: "はんろん", cn: "反驳", en: "objection", pos: "名詞・動詞" },
		{ jp: "影響", kana: "えいきょう", cn: "影响", en: "influence; effect", pos: "名詞・動詞" },
		{ jp: "やっかい", cn: "麻烦的", en: "troublesome", pos: "な形" },
		{ jp: "付き物", kana: "つきもの", cn: "附属物、少不了的东西", en: "something that comes with it", pos: "名詞" },
		{ jp: "肺", kana: "はい", cn: "肺", en: "lung", pos: "名詞" },
		{ jp: "煙い", kana: "けむい", cn: "烟熏人的", en: "smoky; filled with smoke", pos: "い形" },
	],

	grammar: [
		{
			pattern: "〜つつある",
			formation: "動詞ます形＋つつある",
			meaning: "正在逐渐……。书面语。",
			meaningEn: "to be in the process of…. Written style.",
			example: {
				jp: "{当|あ}たり{前|まえ}になりつつある。",
				cn: "正逐渐成为理所当然。",
				en: "It has been becoming the norm.",
			},
		},
		{
			pattern: "それに対して",
			meaning: "与此相对。用来对比前后两项。",
			meaningEn: "in contrast to that. Sets two things against each other.",
			example: {
				jp: "それに{対|たい}して{喫煙|きつえん}にはやっかいな{煙|けむり}が{付|つ}き{物|もの}だ。",
				cn: "与此相对，吸烟总带着讨厌的烟。",
				en: "Smoking, on the other hand, always comes with troublesome smoke.",
			},
		},
		{
			pattern: "〜ものだ（付き物だ）",
			formation: "名詞＋は／が＋付き物だ",
			meaning: "……是少不了的、总伴随着……。",
			meaningEn: "always comes with…; is an inevitable companion of….",
			example: {
				jp: "{煙|けむり}が{付|つ}き{物|もの}だ。",
				cn: "烟是少不了的附属物。",
				en: "Smoke is something that always comes with it.",
			},
		},
	],
};
