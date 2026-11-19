import type { ReadingDay } from "../reading-n3/types";

// 第4週 3日目 意見文・感想 — printed pages 70–71
export const w4d3: ReadingDay = {
	week: 4,
	day: 3,
	label: "意見文・感想",
	labelKana: "いけんぶん・かんそう",
	labelEn: "Opinion pieces and impressions",
	printedPages: [70, 71],
	answerSource: "book",

	point: {
		title: "{肯定的|こうていてき}か{否定的|ひていてき}か{見分|みわ}けよう！",
		titleCn: "分清是肯定的还是否定的！",
		titleEn: "Tell whether it is positive or negative!",
		expressions: [
			{ jp: "〜ではないだろうか", cn: "难道不是……吗（＝我认为……）", en: "isn't it that ~ (i.e., I think ~)" },
			{ jp: "〜べきだ", cn: "应该……（＝最好……）", en: "should ~" },
			{ jp: "〜と思えない", kana: "おもえない", cn: "不认为……（＝不觉得……）", en: "cannot think that ~" },
			{ jp: "いかがなものか", cn: "恐怕不妥吧（＝不认为是好的）", en: "I question whether it is right" },
			{ jp: "どうかと思う", kana: "どうかとおもう", cn: "觉得有点不妥", en: "to have doubts about" },
			{ jp: "思っていたより…だ", kana: "おもっていたより", cn: "比想象中更……", en: "more … than I had thought" },
			{ jp: "予想より…だ", kana: "よそうより", cn: "比预想更……（令人吃惊）", en: "more … than expected (surprisingly)" },
			{ jp: "意外と…だ", kana: "いがいと", cn: "意外地……", en: "unexpectedly …" },
		],
		figure: {
			alt: "白猫の吹き出し（中国語）「表达意见或感想时，会用……」。先生猫「勉強しているのはいいが、その態度はいかがなものか。」",
			cn: "白猫的气泡（中文）“表达意见或感想时，会用……”。老师猫“学习是好的，但那个态度恐怕不妥吧。”",
			en: "The white cat's speech bubble (in Chinese) says: “When expressing an opinion or impression, you use…” The teacher cat says: “Studying is fine, but I question that attitude.”",
		},
		tips: [
			{
				jp: "{意見文|いけんぶん}では、{二重否定|にじゅうひてい}（ないこともない、ないわけではない）や{婉曲表現|えんきょくひょうげん}（いかがなものか、とは{思|おも}えない）の{向|む}きを{間違|まちが}えないこと。{肯定|こうてい}か{否定|ひてい}か、まず{立場|たちば}を{決|き}めてから{細部|さいぶ}を{読|よ}む。",
				cn: "意见文里不要弄错双重否定（ないこともない、ないわけではない）和委婉表达（いかがなものか、とは思えない）的方向。先定肯定還是否定的立场，再读细节。",
				en: "In opinion pieces, don't misread the direction of double negatives (nai koto mo nai, nai wake de wa nai) and euphemisms (ikaga na mono ka, to wa omoenai). Decide first whether the stance is positive or negative, then read the details.",
			},
		],
	},

	mondai: {
		instruction: "{次|つぎ}の{文|ぶん}を{読|よ}んで、{問|と}いに{答|こた}えなさい。",
		instructionCn: "阅读下面的文章，回答问题。",
		instructionEn: "Read each text below and answer its question(s). (Answers are in the separate booklet, p. 5.)",
		blocks: [
			{ type: "heading", jp: "1", cn: "第 1 题", en: "Exercise 1" },
			{
				type: "paragraph",
				jp: "{次|つぎ}の{文章|ぶんしょう}は、{帰国子女|きこくしじょ}（{海外在留期間|かいがいざいりゅうきかん}が1{年以上|ねんいじょう}で、{日本|にほん}に{帰国後|きこくご}3{年以内|ねんいない}の{児童生徒|じどうせいと}）である{高校生|こうこうせい}4{人|にん}の{帰国後|きこくご}の{学校生活|がっこうせいかつ}についての{感想|かんそう}である。",
				cn: "下面的文章是 4 名归国子女（在海外居住 1 年以上、回日本后 3 年以内的学生）高中生关于回国后学校生活的感想。",
				en: "The following are the impressions of four high-school students who are returnee children (students who lived abroad for over a year and have been back in Japan for under three years) about their school life after returning.",
			},
			{
				type: "paragraph",
				jp: "[Aさん] {長|なが}い{海外生活|かいがいせいかつ}のせいか、{違和感|いわかん}を{感|かん}じることがないこともないが、{帰国子女|きこくしじょ}を{特別視|とくべつし}しない{校風|こうふう}の{学校|がっこう}で、{帰国前|きこくまえ}に{思|おも}っていたよりものびのびふるまえる*。",
				cn: "[A] 也许是因为海外生活太久，要说完全没有不适感也不是，但在这所不会对归国子女另眼相看的学校里，我比回国前想象的要轻松自在得多。",
				en: "[A] Perhaps because of my long life abroad, it is not that I never feel out of place, but at this school, where returnees are treated the same as anyone else, I find myself much more relaxed than I expected before coming back.",
			},
			{
				type: "paragraph",
				jp: "[Bさん] {身|み}につけた{外国語|がいこくご}だけでなく、{帰国子女|きこくしじょ}としての{特性|とくせい}もいかされているとは{思|おも}えず、ほかの{学生|がくせい}と{同一化|どういつか}しようとする{学校教育|がっこうきょういく}を{物足|ものた}りなく{感|かん}じている**。",
				cn: "[B] 我觉得不光是学到的外语，连作为归国子女的特性也没有得到发挥，对这种试图把每个人都与其他学生相同化的学校教育，我感到有些不够满意。",
				en: "[B] I cannot feel that not only my acquired foreign language but also my characteristics as a returnee are being made use of, and I find it unsatisfying that the school expects us to assimilate with the other students.",
			},
			{
				type: "paragraph",
				jp: "[Cさん] {海外|かいがい}で{多様|たよう}な{文化|ぶんか}を{持|も}つ{人|ひと}たちと{交流|こうりゅう}した{経験|けいけん}は{素晴|すば}らしかったが、{日本|にほん}の{学校|がっこう}で{新|あら}たに{築|きず}いた{人間関係|にんげんかんけい}が{今後|こんご}の{人生|じんせい}にとって{大|おお}きな{意味|いみ}を{持|も}つと{思|おも}う。",
				cn: "[C] 在海外与拥有多样文化的人们交流的经验非常宝贵，不过我认为，在日本的学校里新建立的人际关系对今后的人生也有重大意义。",
				en: "[C] My experience of interacting with people of diverse cultures abroad was wonderful, but I believe the relationships I have newly built at school in Japan will hold great meaning for my life ahead.",
			},
			{
				type: "paragraph",
				jp: "[Dさん] {学業面|がくぎょうめん}においては、いまだに{追|お}いつけない{科目|かもく}もあるが、これは{個人的|こじんてき}な{努力|どりょく}の{問題|もんだい}である。{全員|ぜんいん}で{力|ちから}を{合|あ}わせて{取|と}り{組|く}む{行事|ぎょうじ}などは{海外|かいがい}の{学校|がっこう}では{得難|えがた}い{体験|たいけん}ではないだろうか。",
				cn: "[D] 在学业方面，有些科目至今还赶不上，但这是个人努力的问题。而大家齐心协力一起做的活动之类，难道不是在海外学校难以获得的体验吗？",
				en: "[D] Academically, there are still subjects I cannot catch up in, but that is a matter of personal effort. And surely events where everyone works together are an experience hard to come by at schools abroad, aren't they?",
			},
			{ type: "heading", jp: "2", cn: "第 2 题", en: "Exercise 2" },
			{
				type: "paragraph",
				jp: "{次|つぎ}のAとBは、{裁判員制度|さいばんいんせいど}に{関|かん}して{一般|いっぱん}の{人|ひと}が{述|の}べた{意見|いけん}である。",
				cn: "下面的 A 和 B 是普通人就裁判员制度发表的意见。",
				en: "The following A and B are opinions expressed by ordinary people about the lay judge (citizen judge) system.",
			},
			{
				type: "paragraph",
				jp: "A　{自分|じぶん}に{通知|つうち}が{来|き}たときには{気|き}が{重|おも}くてたまりませんでしたが、{実際|じっさい}にやってみると、とても{興味深|きょうみぶか}いものでした。{思|おも}っていたより、わかりやすい{言葉|ことば}で{審理|しんり}や{評議|ひょうぎ}が{行|おこな}われましたし*、{専門家|せんもんか}だけでなく、{国民|こくみん}の{代表|だいひょう}として{一般人|いっぱんじん}が{意見|いけん}を{述|の}べることは{大切|たいせつ}だと{感|かん}じました。{仕事|しごと}を{持|も}っているので、{精神的|せいしんてき}にも{実質的|じっしつてき}にも{負担|ふたん}がないわけではありませんでしたが、{裁判|さいばん}の{内容|ないよう}はもっと{国民|こくみん}に{知|し}らされるべきだし、{一人|ひとり}ひとりがもっと{関心|かんしん}を{持|も}つべきだと{思|おも}いました。",
				cn: "A　收到通知的时候，我心里沉重得受不了，但实际做过之后，觉得非常有意思。审理和评议都用比我想象中更浅显易懂的语言进行，而且我感到，不仅是专家，作为国民代表的普通人发表意见也很重要。因为我有工作，精神上和实际上都不是没有负担，不过我还是认为，审判的内容应该更多地让国民知道，每个人也应该更加关心。",
				en: "A: When the notice came to me, I felt unbearably heavy-hearted, but having actually done it, I found it very interesting. The trials and the discussions were carried out using language which was easy to understand, more so than I had thought, and I felt it is important for ordinary people, as representatives of the public, to state their opinions, not just the specialists. Since I have a job, it was not without mental and practical burdens, but I also thought that the content of trials should be made known to the public much more, and that each person should take more interest.",
			},
			{
				type: "paragraph",
				jp: "B　{裁判|さいばん}の{内容|ないよう}を{国民|こくみん}に{広|ひろ}く{開示|かいじ}すること{自体|じたい}は{悪|わる}いことではないが、そもそも（注1）{裁判|さいばん}の{審理|しんり}は、{裁判官|さいばんかん}にしても{検察官|けんさつかん}、{弁護士|べんごし}にしても、{専門|せんもん}の{勉強|べんきょう}をして、{難|むずか}しい{試験|しけん}を{受|う}けてきている{人|ひと}がやるべきもので、それを{一般人|いっぱんじん}にも{参加|さんか}させるというのは、{専門家|せんもんか}としての{責任逃|せきにんのが}れのような{気|き}がする。{専門家|せんもんか}はそれだけの{地位|ちい}や{報酬|ほうしゅう}（注2）ももらっているわけだから、そういう{人|ひと}たちがすべきで、{一般人|いっぱんじん}に{精神的|せいしんてき}、{物理的負担|ぶつりてきふたん}を{強|し}いるというのはいかがなものか**。",
				cn: "B　把审判内容向国民广泛公开，这件事本身不是坏事，但审判的审理本来就应该由法官也好、检察官、律师也好——学过专业知识、通过了高难度考试的人来做，让普通人也参与进来，我感觉像是专家在逃避责任。专家拿着相应的地位和报酬，就应该由那样的人来做，强迫普通人承担精神和物质上的负担，恐怕不妥吧。",
				en: "B: Disclosing the content of trials widely to the public is not in itself a bad thing, but the conduct of trials is fundamentally something to be done by people who have studied the specialty and passed difficult examinations — judges, prosecutors, lawyers — and making ordinary people participate as well feels like the specialists shirking their responsibility. Specialists receive the status and remuneration to match, so such people should do it; I wonder if it is reasonable to force people to experience psychological and physical burdens.",
			},
		],
		footnotes: [
			{ marker: "注1", term: "そもそも", jp: "そもそも", cn: "本来、原本", en: "fundamentally; in the first place" },
			{ marker: "注2", term: "報酬", jp: "ほうしゅう", cn: "报酬：工资或薪金", en: "remuneration: salary or wages" },
		],
		pageNotes: [
			{ jp: "* I find myself much more relaxed at this school than I expected because the returnees are treated the same as anyone else", cn: "在这所不会对归国子女另眼相看的学校里，比回国前想象的要轻松自在", en: "I find myself much more relaxed at this school than I expected because the returnees are treated the same as anyone else" },
			{ jp: "** I find it unsatisfying that the school expects us to assimilate with the other students", cn: "我对试图将每个人都与其他学生相同化的学校教育感到有些不够满意", en: "I find it unsatisfying that the school expects us to assimilate with the other students" },
			{ jp: "* the trials and the discussions were carried out using language which was easy to understand", cn: "审理和评议都是用浅显易懂的语言进行的", en: "the trials and the discussions were carried out using language which was easy to understand" },
			{ jp: "** I wonder if it is reasonable to force people to experience psychological and physical burdens", cn: "强迫人们承担精神及物质上的负担，这是否妥当", en: "I wonder if it is reasonable to force people to experience psychological and physical burdens" },
		],
