import type { ReadingDay} from "../reading-n3/types";

// 第1週 7日目 実戦問題 — printed pages 24–28（コラム p.28 を含む）
export const w1d7: ReadingDay = {
week: 1,
day: 7,
label: "実戦問題",
labelKana: "じっせんもんだい",
labelEn: "Practice test",
printedPages: [24, 25, 26, 27, 28],
answerSource: "book",

practice: {
timeLimitMinutes: 15,
scoring: "1問10点×10問／100点",
groups: [
{
label: "問題1",
instruction:
"{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、からの{中|なか}に{入|はい}る{最|もっと}もよいものを、1・2・3・4から{一|ひと}つ{選|えら}びなさい。",
instructionCn: "阅读下面的文章，从 1・2・3・4 中选出填入到的最合适的一项。",
instructionEn: "Read the following text, and choose from 1–4 the best word for each of and.",
blocks: [
{
type: "paragraph",
jp: "アメリカから{日本|にほん}に{移|うつ}り{住|す}んで{五年|ごねん}あまり、{日本語|にほんご}はかなり{上手|じょうず}に{使|つか}えるが、「この{間|あいだ}はどうも……」ばかりは、いまだに{使|つか}いこなせなくて{困|こま}っているアメリカ{女性|じょせい}がいる。（{中略|ちゅうりゃく}）",
cn: "有一位从美国移居到日本五年多的美国女性，日语说得相当好，唯独「前些日子真是……」这句话，至今还是用不好，为此很苦恼。（中略）",
en: "There is an American woman who has lived in Japan for over five years and can use Japanese quite well, but the phrase “Kono aida wa dōmo…” is the one thing she still cannot use and is troubled by. (Passage abridged)",
indent: true,
},
{
type: "paragraph",
jp: "{日本人|にっぽんじん}は、{親切|しんせつ}を{受|う}けた{時|とき}と{次|つぎ}に{会|あ}った{時|とき}の、{最低二回|さいていにかい}は{謝意|しゃい}をあらわすということを、{彼女|かのじょ}は{頭|あたま}では{理解|りかい}していた。、{現実|げんじつ}の{場面|ばめん}で、{相手|あいて}が、そのことばを{今|いま}か{今|いま}かと{待|ま}ち{望|のぞ}んでいることまで、{見|み}ぬいている。それなのに、。{彼女|かのじょ}の{表現|ひょうげん}リストの{中|なか}には、「この{間|あいだ}はどうも……」は{入|はい}っていないので、{懸命|けんめい}に{努力|どりょく}しても{思|おも}い{出|だ}せないのである。{幼|おさな}い{頃|ころ}からの{言語習慣|げんごしゅうかん}からぬけ{出|だ}して、{外国語|がいこくご}を、{場面|ばめん}に{応|おう}じて{適切|てきせつ}に{使|つか}いこなすことはむずかしい。",
cn: "日本人在受到亲切款待时和下次见面时，至少要表达两次谢意——这一点，她在头脑里是理解的。，在实际场合中，她甚至能看穿对方正翘首以盼那句话。尽管如此，。因为她的表达清单里没有「前些日子真是……」这句话，所以再怎么努力也想不起来。要摆脱从小养成的语言习惯，根据场合恰当地运用外语，是很难的。",
en: "She understood in her head that Japanese people express gratitude at least twice — when they receive a kindness and when they meet the person next., in real situations she could even see that the other person was eagerly waiting for those words. And yet,. The phrase “Kono aida wa dōmo…” was not in her list of expressions, so no matter how hard she tried, she could not recall it. It is hard to break free of the language habits formed in childhood and use a foreign language appropriately for each situation.",
indent: true,
},
{
type: "source",
jp: "（{直塚玲子|なおつかれいこ}『{欧米人|おうべいじん}が{沈黙|ちんもく}するとき』{大修館書店|たいしゅうかんしょてん}）",
cn: "（直塚玲子《欧美人沉默时》大修馆书店）",
en: "(Naotsuka Reiko, When Westerners Fall Silent, Taishūkan Shoten)",
},
],
questions: [
{
label: "1",
jp: "に{入|はい}る{最|もっと}もよいものはどれか。",
cn: "填入的最合适的是哪一个？",
en: "What fits best in?",
choices: [
{ jp: "ただし", cn: "不过、只是", en: "however; provided that"},
{ jp: "つまり", cn: "也就是说", en: "in other words"},
{ jp: "その{上|うえ}", cn: "而且、再加上", en: "moreover; on top of that"},
{ jp: "それにしては", cn: "按那样来说", en: "for all that"},
],
answer: 3,
explanation:
"前文说她「頭では理解していた」，后文说她在实际场合甚至能看穿对方在等那句话——是递进追加：「その上」表示在理解之上还更进一步。所以选 3。",
explanationEn:
"Before the blank she “understood it in her head”; after it, she could even perceive the other person waiting. That is an addition going one step further — “sono ue” (moreover). Answer 3.",
choiceNotes: [
"「ただし」是补充限定，不合递进。",
"后文不是对前文的换言。",
"正确。在理解之上又进了一步。",
"「それにしては」表示与预想的落差，这里没有。",
],
choiceNotesEn: [
"“Tadashi” adds a qualification, not a step further.",
"What follows is not a restatement.",
"Correct. One step beyond understanding.",
"“Sore ni shite wa” marks a gap from expectation; there is none.",
],
},
{
label: "2",
jp: "に{入|はい}る{最|もっと}もよいものはどれか。",
cn: "填入的最合适的是哪一个？",
en: "What fits best in?",
choices: [
{ jp: "ことばが{自然|しぜん}には{出|で}てこない", cn: "话自然而然地说不出来。", en: "The words just don't come out naturally."},
{ jp: "ことばを{口|くち}にしていいかどうか{迷|まよ}う", cn: "犹豫该不该把话说出口。", en: "She hesitates over whether she may say the words."},
{ jp: "ことばの{意味|いみ}がよくわかっていない", cn: "没有很好地理解话的意思。", en: "She does not really understand what the words mean."},
{ jp: "ことばで{伝|つた}えたくないと{思|おも}う", cn: "觉得不想用言语表达。", en: "She feels she does not want to express it in words."},
],
answer: 1,
explanation:
"「それなのに」后面接的是与前文（理解、甚至看穿对方）相反的事实：话就是说不出来。后文也解释了原因——那句话不在她的表达清单里，再努力也想不起来。所以选 1。",
explanationEn:
"After “sore na no ni” (and yet) must come a fact contrary to the understanding described before: the words simply won't come out. The following text explains why — the phrase is not in her repertoire, so she cannot recall it however hard she tries. Answer 1.",
choiceNotes: [
"正确。与后文「思い出せない」呼应。",
"文中没有犹豫要不要说的描写。",
"她理解意思，问题在说不出来。",
"文中没有这种想法。",
],
choiceNotesEn: [
"Correct. It matches “she could not recall it” later.",
"There is no hesitation about whether to speak.",
"She understands the meaning; the problem is producing the words.",
"No such feeling appears in the text.",
],
},
],
},
{
label: "問題2",
instruction:
"{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、からの{中|なか}に{入|はい}る{最|もっと}もよいものを、1・2・3・4から{一|ひと}つ{選|えら}びなさい。",
instructionCn: "阅读下面的文章，从 1・2・3・4 中选出填入到的最合适的一项。",
instructionEn: "Read the following text, and choose from 1–4 the best word for each of to.",
blocks: [
{
type: "paragraph",
jp: "{世|よ}の{男性|だんせい}のなかには、“ぽっくり{願望|がんぼう}（注1）”を{抱|いだ}く{人|ひと}が{相当数|そうとうすう}いると{聞|き}く。{脳卒中|のうそっちゅう}か{心臓麻痺|しんぞうまひ}による{突然死|とつぜんし}のほうが、{長々|ながなが}とした{闘病|とうびょう}の{末|すえ}に{死|し}ぬよりは、{痛|いた}みも{苦|くる}しみもなくていい、というわけである。{私|わたし}の{意識|いしき}のなかにも、“ぽっくり{願望|がんぼう}”が。",
cn: "听说世上的男性中，有相当数量的人抱有「痛快死去的愿望」（注1）。他们觉得，与其在漫长的与疾病斗争之后死去，不如因脑卒中或心脏麻痹突然死去，没有痛苦也更轻松。我的意识里，也有「痛快死去的愿望」。",
en: "I hear that a considerable number of men in this world harbor a “wish to die quickly and painlessly” (Note 1). They feel that a sudden death from a stroke or heart failure is better — no pain and no suffering — than dying after a long battle with illness. In my own mind, too, that wish is.",
indent: true,
},
{
type: "paragraph",
jp: "しかし、{突然死|とつぜんし}では{自分|じぶん}の{人生|じんせい}のしめくくりができないではないかという{思|おも}いが、{私|わたし}には{強|つよ}い。（{中略|ちゅうりゃく}）",
cn: "但是，我强烈地觉得，突然死去就无法给自己的人生收尾。（中略）",
en: "However, I strongly feel that with a sudden death I could not bring my life to a proper close. (Passage abridged)",
indent: true,
},
{
type: "paragraph",
jp: "{突然死|とつぜんし}よりガン{死|し}を――という{生|い}き{方|かた}の{理念|りねん}を{教|おし}えてくれたのは、{日本|にほん}で{死|し}の{臨床|りんしょう}に{先駆的|せんくてき}に（注2）{取|と}り{組|く}んできた{神戸市|こうべし}の{河野博臣医師|かわのひろおみいし}と{東京大学医学部放射線科|とうきょうだいがくいがくぶほうしゃせんか}の{飯尾正宏教授|いいおまさひろきょうじゅ}である。{二人|ふたり}の{医師|いし}の{考|かんが}えは{一致|いっち}していて、ガンを{人間|にんげん}に{与|あた}えられた{自己完成|じこかんせい}あるいは{自己実現|じこじつげん}の{一|ひと}つの{機会|きかい}としてとらえようというのである。",
cn: "把「与其突然死去，不如死于癌症」这一生活理念教给我的是，在日本率先（注2）致力于死亡临床的神户市河野博臣医生和东京大学医学部放射线科的饭尾正宏教授。两位医生的想法一致：把癌症看作是赋予人类的自我完成或自我实现的一个机会。",
en: "The philosophy of “death by cancer rather than sudden death” was taught to me by Dr. Kawano Hiroomi of Kobe, who pioneered (Note 2) the clinical study of death in Japan, and Professor Iio Masahiro of the Department of Radiology at the University of Tokyo's Faculty of Medicine. The two doctors agree: cancer should be seen as an opportunity given to human beings for self-completion or self-realization.",
indent: true,
},
{
type: "paragraph",
jp: "ただ、{誰|だれ}しもがそこで{戸惑|とまど}うのは、ガン{死|し}となると、{痛|いた}みと{苦|くる}しみのなかでという{点|てん}であろう。{実際|じっさい}、{過去|かこ}においては、そういう{例|れい}が{少|すく}なくなかったし、{現在|げんざい}でも。（{中略|ちゅうりゃく}）",
cn: "只是，每个人在这一点上都会感到困惑：一旦死于癌症，恐怕要在疼痛和痛苦中。实际上，过去这样的例子并不少，现在也。",
en: "What makes everyone hesitate, though, is the point that dying of cancer might mean amid pain and suffering. In fact, there were not a few such cases in the past, and even now it is. (Passage abridged)",
indent: true,
},
{
type: "paragraph",
jp: "、（いまガンで{苦|くる}しんでいる{人々|ひとびと}には{申|もう}しわけないが）あえて{私|わたし}が{突然死|とつぜんし}よりガン{死|し}をという{考|かんが}えに{傾|かたむ}いているのは、{虚勢|きょせい}を{張|は}って（注3）のことではない。{残|のこ}された{時間|じかん}が、{一年|いちねん}とか{三年|さんねん}という{単位|たんい}であればベター（注4）だが、{仮|かり}に{一週間|いっしゅうかん}とか{一ヵ月|いっかげつ}であってもよいから、{人生|じんせい}を{総括|そうかつ}するだけの{時間|じかん}が{欲|ほ}しいのである。",
cn: "，（对现在正受癌症折磨的人们很抱歉）我之所以敢于倾向于「与其突然死去，不如死于癌症」的想法，并不是在逞强（注3）。剩下的时间如果以一年或三年为单位更好，但哪怕是一周或一个月也行，我想要的只是足以总结人生的时间。",
en: " — and I apologize to those now suffering from cancer — my leaning toward death by cancer rather than sudden death is not a matter of bravado (Note 3). Time remaining in units of a year or three years would be better (Note 4), but even a week or a month would do: I want just enough time to sum up my life.",
indent: true,
},
{
type: "source",
jp: "（{柳田邦男|やなぎだくにお}「{突然死|とつぜんし}よりガン{死|し}を」『{死|し}ぬための{生|い}き{方|かた}』{新潮45編|しんちょう45へん} {新潮社|しんちょうしゃ}）",
cn: "（柳田邦男《与其突然死去不如死于癌症》载《为了死亡的活法》新潮45编 新潮社）",
en: "(Yanagida Kunio, “Death by Cancer Rather than Sudden Death,” in Ways of Living for Dying, Shinchō 45 edition, Shinchōsha)",
},
{ type: "note", jp: "（注1）ぽっくり{願望|がんぼう}：{突然死|とつぜんし}にたいと{願|ねが}うこと", cn: "（注1）「ぽっくり愿望」：希望突然死去", en: "(Note 1) “pokkuri wish”: the wish to die suddenly"},
{ type: "note", jp: "（注2）{先駆的|せんくてき}に：だれよりも{先|さき}に", cn: "（注2）率先：比任何人都早", en: "(Note 2) pioneeringly: before anyone else"},
{ type: "note", jp: "（注3）{虚勢|きょせい}を{張|は}って：{強|つよ}いふりをして", cn: "（注3）逞强：装作坚强", en: "(Note 3) putting on a brave front"},
{ type: "note", jp: "（注4）ベター：よりよい", cn: "（注4）ベター：更好", en: "(Note 4) better: preferable"},
],
questions: [
{
label: "3",
jp: "に{入|はい}る{最|もっと}もよいものはどれか。",
cn: "填入的最合适的是哪一个？",
en: "What fits best in?",
choices: [
{ jp: "ないわけではない", cn: "并不是没有", en: "it is not that it doesn't exist"},
{ jp: "ないではいられない", cn: "忍不住不……", en: "cannot help but"},
{ jp: "ないにちがいない", cn: "一定没有", en: "there is certainly none"},
{ jp: "ないではすまない", cn: "不……不行", en: "it won't do without"},
],
answer: 1,
explanation:
"在文中出现两次：「私の意識のなかにも“ぽっくり願望”が」和「現在でも」。两处都需要一个弱肯定的表达：「ないわけではない」＝并不是没有——作者承认自己也有这种愿望，现在也还有那样的例子。所以选 1。",
explanationEn:
" appears twice: “in my own mind, too, that wish is” and “even now it is.” Both need a soft affirmative: “nai wake de wa nai” = “it is not that it doesn't exist.” The writer admits he has the wish too, and such cases still exist. Answer 1.",
choiceNotes: [
"正确。双重否定的弱肯定，两处都通。",
"「ないではいられない」表示忍不住要做某事，不合。",
"意思与两处语境都相反。",
"「ないではすまない」表示义务，不合。",
],
choiceNotesEn: [
"Correct. A double-negative soft affirmation that fits both places.",
"“Nai de wa irarenai” means being unable to resist doing something.",
"The opposite of what both contexts need.",
"“Nai de wa sumanai” expresses obligation; it does not fit.",
],
},
{
label: "4",
jp: "に{入|はい}る{最|もっと}もよいものはどれか。",
cn: "填入的最合适的是哪一个？",
en: "What fits best in?",
choices: [
{ jp: "{悲惨|ひさん}な{死|し}を{迎|むか}えるのではないか", cn: "会不会迎来悲惨的死亡", en: "might meet a miserable death"},
{ jp: "{死|し}ぬ{時期|じき}がわからないのではないか", cn: "会不会不知道死亡的时期", en: "might not know when death will come"},
{ jp: "{穏|おだ}やかな{死|し}を{迎|むか}えたい", cn: "想迎来平静的死亡", en: "want to meet a peaceful death"},
{ jp: "{突然|とつぜん}の{死|し}を{迎|むか}える{覚悟|かくご}がない", cn: "没有迎接突然死亡的心理准备", en: "are not prepared to meet a sudden death"},
],
answer: 1,
explanation:
"前文「痛みと苦しみのなかで」限定了的内容：人们怕的是在痛苦中迎来悲惨的死亡。后面「実際、過去においては、そういう例が少なくなかった」也印证了这一点。所以选 1。",
explanationEn:
"The phrase before the blank — “amid pain and suffering” — fixes its content: people fear meeting a miserable death in that suffering. The next sentence, “in fact, such cases were not few in the past,” confirms it. Answer 1.",
choiceNotes: [
"正确。与「痛みと苦しみ」呼应。",
"癌症的死期问题不是这里的焦点。",
"语气是愿望，与「戸惑う」的担忧不合。",
"话题是癌症死，不是突然死。",
],
choiceNotesEn: [
"Correct. It matches “pain and suffering.”",
"The timing of death is not the focus here.",
"A wish, not the worry that “makes everyone hesitate.”",
"The topic is death by cancer, not sudden death.",
],
},
{
label: "5",
jp: "に{入|はい}る{最|もっと}もよいものはどれか。",
cn: "填入的最合适的是哪一个？",
en: "What fits best in?",
choices: [
{ jp: "{要|よう}するに", cn: "总之", en: "in short"},
{ jp: "ゆえに", cn: "因此", en: "therefore"},
{ jp: "それどころか", cn: "别说……甚至……", en: "far from that"},
{ jp: "にもかかわらず", cn: "尽管如此", en: "nevertheless"},
],
answer: 4,
explanation:
"前文刚说了癌症死的痛苦与人们的困惑，作者却仍然坚持自己的倾向——逆着前文说，所以用「にもかかわらず」起句最合适。所以选 4。",
explanationEn:
"The preceding text has just described the pain of dying of cancer and everyone's hesitation, yet the writer still holds to his leaning — a move against the preceding current, opened by “ni mo kakawarazu” (nevertheless). Answer 4.",
choiceNotes: [
"「要するに」是总结，前文并没有要总结的内容。",
"因果关系不成立。",
"「それどころか」用于句中强调递进，位置与功能都不合。",
"正确。逆接前文，表明坚持。",
],
choiceNotesEn: [
"“Yōsuru ni” sums up; there is nothing to sum up here.",
"No causal relation.",
"“Sore dokoro ka” is a mid-sentence emphasis; neither position nor function fits.",
"Correct. It turns against the preceding text and holds his position.",
],
},
],
},
{
label: "問題3",
instruction:
"{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、からの{中|なか}に{入|はい}る{最|もっと}もよいものを、1・2・3・4から{一|ひと}つ{選|えら}びなさい。",
instructionCn: "阅读下面的文章，从 1・2・3・4 中选出填入到的最合适的一项。",
instructionEn: "Read the following text, and choose from 1–4 the best word for each of to.",
blocks: [
{
type: "paragraph",
jp: "、それを{直|なお}すために{整形|せいけい}をほどこす{必要|ひつよう}などはないだろう。“{蓼食|たでく}う{虫|むし}も{好|す}きずき”（注1）という{世|よ}のなかでは、むだなものはなに{一|ひと}つない。どんなに{顔|かお}が{醜|みにく}くても、またそれ{相応|そうおう}（注2）の{天職|てんしょく}もあるだろう。",
cn: "，也没有必要为了纠正它而去整容。在这个「萝卜青菜，各有所爱」（注1）的世界上，没有什么东西是多余的。无论脸多么丑，也会有与之相称（注2）的天职吧。",
en: ", there is surely no need to have plastic surgery to fix it. In a world where “some prefer nettles” (Note 1) — tastes differ — nothing is useless. However ugly a face may be, there will be a calling suited to it (Note 2).",
indent: true,
},
{
type: "paragraph",
jp: "しかも{人|ひと}の{容貌|ようぼう}というのは、{心|こころ}の{作用|さよう}によって{少|すく}なくともその{表情|ひょうじょう}を{変|か}えることができる。そして{人|ひと}の{顔色|かおいろ}を{読|よ}むには、{骨格|こっかく}や{肉|にく}づきがどうなっているかよりも、むしろその{表情|ひょうじょう}に{頼|たよ}ることのほうが{多|おお}い。{米国|べいこく}の{大統領|だいとうりょう}リンカーンは、{有名|ゆうめい}な{醜男|しゅうだん}であった。しかし、{親|した}しくこの{人|ひと}に{接|せっ}した{者|もの}は、{彼|かれ}の{青|あお}ざめた{顔|かお}や{大|おお}きな{口|くち}、くぼんだ{目|め}などは{忘|わす}れて、その{慈愛|じあい}に{富|と}んだ{表情|ひょうじょう}にのみ{魅了|みりょう}されたという。",
cn: "而且，人的容貌至少可以通过心灵的作用改变其表情。而要读懂一个人的脸色，与其看骨骼和肌肉如何，不如多看他的表情。美国总统林肯是有名的丑男。但是，亲近接触过他的人，都会忘记他苍白的脸、大嘴和凹陷的眼睛，只被他充满慈爱的表情所吸引。",
en: "Moreover, a person's looks can change at least in expression through the working of the heart. And to read someone's face, we rely more on expression than on bone structure or flesh. President Lincoln of the United States was a famously ugly man. Yet those who knew him closely forgot his pale face, large mouth, and sunken eyes, and were charmed only by his expression, full of benevolence.",
indent: true,
},
{
type: "paragraph",
jp: "の{改造|かいぞう}はできなくても、の{改良|かいりょう}はできる。もちろん、を{改良|かいりょう}したからといって、ただちにそれがにあらわれることはないかもしれない。また、{相手|あいて}が{容貌|ようぼう}と{心|こころ}との{見分|みわ}けのつかないような{人|ひと}なら、{結局|けっきょく}のところ{親|した}しく{接|せっ}してはくれないかもしれない。だが、「{外部|がいぶ}の{顔|かお}のためになにを{苦|くる}しんでいるのか。どうしてこんなもののために{進取|しんしゅ}の{気性|きしょう}（注3）を{奪|うば}われ、いたずらに（注4）{卑屈|ひくつ}で{引|ひ}っ{込|こ}み{思案|じあん}（注5）になっているのか」と{思|おも}えるくらいになれば、。",
cn: "无法改造，却可以改良。当然，即使改良了，也不会马上就表现在上。另外，如果对方是分不清容貌和心灵的人，最终可能不会亲近你。但是，如果你能想到「为什么要为外在的脸而烦恼呢。为什么要为了这种东西被夺走进取心（注3），白白地（注4）变得卑屈而退缩（注5）呢」，到了这个地步，。",
en: "Even if cannot be remodeled, can be improved. Of course, improving may not show immediately in. And if the other person cannot tell looks from heart, they may never become close to you in the end. But once you can think, “Why am I suffering over my outer face? Why let such a thing rob me of my enterprising spirit (Note 3) and make me pointlessly (Note 4) servile and withdrawn (Note 5)?” — then.",
indent: true,
},
{
type: "paragraph",
jp: "また、{外部|がいぶ}にあらわせない{秘密|ひみつ}をもっている{場合|ばあい}も{同|おな}じである。{道徳上恥|どうとくじょうは}じるにたりない{秘密|ひみつ}、{自分|じぶん}の{心|こころ}に{照|て}らして{恥|はず}かしくない{秘密|ひみつ}ならば、{暴露|ばくろ}したところで{一時|いちじ}の{笑|わら}い{話|ばなし}となるか、ちょっとしたご{愛嬌|あいきょう}ですむだろう。そのために{心|こころ}を{痛|いた}め、{胸|むね}を{苦|くる}しめ、{人|ひと}に{顔|かお}を{見|み}られるのを{恐|おそ}れるにはあたらない。",
cn: "另外，怀有不能对外人言的秘密时也是一样。在道德上不值得羞耻的秘密，问心无愧的秘密，即使暴露出来，也不过成为一时的笑谈，或者只是一点小小的可爱之处。为了那种事而伤心、痛苦、害怕被人看见脸，是不值得的。",
en: "The same holds when you have a secret you cannot show to the outside. A secret there is no moral reason to be ashamed of — a secret you are not ashamed of when you hold it up to your own heart — would, even if exposed, become only a momentary laughing matter, or pass as a charming foible. It is not worth grieving over it, suffering over it, or fearing to show your face to people.",
indent: true,
},
{
type: "paragraph",
jp: "{田舎|いなか}から{上京|じょうきょう}した{人|ひと}は、{東京|とうきょう}の{流儀|りゅうぎ}を{知|し}らないために、なにかにつけて{無礼|ぶれい}な{振舞|ふるま}いをするのではないかと{心配|しんぱい}する。だが{自分|じぶん}の{心|こころ}にたずねてみて、{人|ひと}に{無礼|ぶれい}を{働|はたら}く{念|ねん}が{少|すこ}しもなければ、{動作|どうさ}がぎこちなくても{人|ひと}は{許|ゆる}すだろう。また、。",
cn: "从乡下来到东京的人，因为不懂东京的规矩，担心自己动不动就会做出无礼的举动。但是，如果扪心自问，自己丝毫没有对人无礼的念头，那么即使动作笨拙，人们也会原谅吧。另外，。",
en: "People who come up to Tokyo from the countryside worry that, not knowing Tokyo ways, they may behave rudely at every turn. But if you ask your own heart and find not the slightest intention of rudeness toward others, people will forgive you even if your movements are awkward. And also,.",
indent: true,
},
{
type: "source",
jp: "（{新渡戸稲造|にとべいなぞう}『{現代語|げんだいご}で{読|よ}む{最高|さいこう}の{名著|めいちょ}「{自警|じけい}」{自分|じぶん}のための{生|い}きがい』{三笠書房|みかさしょぼう}）",
cn: "（新渡户稻造《用现代语读的最高名著〈自警〉——为了自己的人生意义》三笠书房）",
en: "(Nitobe Inazō, Reading the Greatest Classics in Modern Japanese: “Self-Warnings” — A Purpose in Life for Yourself, Mikasa Shobō)",
},
{ type: "note", jp: "（注1）{蓼食|たでく}う{虫|むし}も{好|す}きずき：{人|ひと}の{好|す}きはさまざまである", cn: "（注1）「蓼食う虫も好きずき」：人的喜好各不相同", en: "(Note 1) “Some bugs eat nettles and like them”: tastes differ from person to person"},
{ type: "note", jp: "（注2）それ{相応|そうおう}：それにふさわしい", cn: "（注2）相称：与之相符的", en: "(Note 2) suited to it; fitting"},
{ type: "note", jp: "（注3）{進取|しんしゅ}の{気性|きしょう}：{自分|じぶん}から{進|すす}んで{物事|ものごと}をしていこうとする{気持|きも}ち", cn: "（注3）进取心：自己主动去做事的心情", en: "(Note 3) an enterprising spirit: the will to take on things of one's own accord"},
{ type: "note", jp: "（注4）いたずらに：むだに、{意味|いみ}もなく", cn: "（注4）白白地：徒劳地、毫无意义地", en: "(Note 4) pointlessly; in vain"},
{ type: "note", jp: "（注5）{引|ひ}っ{込|こ}み{思案|じあん}：{進|すす}んで{物事|ものごと}をやろうとしないこと", cn: "（注5）退缩：不主动去做事", en: "(Note 5) withdrawn; not trying things of one's own accord"},
],
questions: [
{
label: "6",
jp: "に{入|はい}る{最|もっと}もよいものはどれか。",
cn: "填入的最合适的是哪一个？",
en: "What fits best in?",
choices: [
{ jp: "{顔|かお}が{醜|みにく}いとはいうものの", cn: "虽说脸丑，……", en: "although one's face is ugly"},
{ jp: "{顔|かお}が{醜|みにく}いのは{言|い}うまでもないが", cn: "脸丑是不言而喻的，不过……", en: "needless to say one's face is ugly, but"},
{ jp: "{顔|かお}が{醜|みにく}いにもかかわらず", cn: "尽管脸丑，……", en: "despite one's face being ugly"},
{ jp: "{顔|かお}が{醜|みにく}いからといって", cn: "不能因为脸丑就……", en: "just because one's face is ugly"},
],
answer: 4,
explanation:
"后文是「それを直すために整形をほどこす必要などはないだろう」——「顔が醜いからといって」（不能因为脸丑就……）正好引出「没有必要整容」的否定判断。所以选 4。",
explanationEn:
"What follows is “there is no need to have plastic surgery to fix it.” “Kao ga minikui kara to itte” (just because your face is ugly) leads exactly into that negative judgment. Answer 4.",
choiceNotes: [
"「とはいうものの」后面要接相反的内容，这里接不上否定判断。",
"「言うまでもない」与后文不呼应。",
"「にもかかわらず」后面应接意外的事实，这里是判断句。",
"正确。「からといって」＋否定判断是固定搭配。",
],
choiceNotesEn: [
"“To wa iu mono no” needs a contrary continuation; a negative judgment does not follow it.",
"“Iu made mo nai” does not connect with what follows.",
"“Ni mo kakawarazu” should be followed by an unexpected fact, not a judgment.",
"Correct. “Kara to itte” plus a negative judgment is the standard pairing.",
],
},
{
label: "7",
jp: "a・b・c に{入|はい}る{組|く}み{合|あ}わせとして{最|もっと}もよいものはどれか。",
cn: "填入a、b、c 的组合中，最合适的是哪一个？",
en: "Which combination fits best in a, b, and c?",
choices: [
{ jp: "a {心|こころ}　b {顔|かお}　c {心|こころ}", cn: "a 心　b 脸　c 心", en: "a heart, b face, c heart"},
{ jp: "a {顔|かお}　b {表情|ひょうじょう}　c {顔|かお}", cn: "a 脸　b 表情　c 脸", en: "a face, b expression, c face"},
{ jp: "a {顔|かお}　b {心|こころ}　c {顔|かお}", cn: "a 脸　b 心　c 脸", en: "a face, b heart, c face"},
{ jp: "a {表情|ひょうじょう}　b {顔|かお}　c {表情|ひょうじょう}", cn: "a 表情　b 脸　c 表情", en: "a expression, b face, c expression"},
],
answer: 3,
explanation:
"别册提示：「顔はふつう変えられないが、心は変えられる。」——脸（a）无法改造，心（b）可以改良；改良了心，也不会马上表现在脸（c）上。所以 a 顔、b 心、c 顔的 3 正确。",
explanationEn:
"The booklet sums it up: “The face normally cannot be changed, but the heart can.” So a is the face (cannot be remodeled), b is the heart (can be improved), and improving the heart does not show at once in the face (c). Answer 3.",
choiceNotes: [
"a、c 都错位：能改良的是心，不是脸。",
"b 的「表情」与「改良」的对象不合。",
"正确。脸不可改造，心可以改良，效果不马上见于脸。",
"a 的「表情」不是「改造」的对象。",
],
choiceNotesEn: [
"a and c are misplaced: what can be improved is the heart, not the face.",
"“Expression” is not the object of “improvement” here.",
"Correct. The face cannot be remodeled; the heart can be improved; the effect does not show on the face at once.",
"“Expression” is not what gets “remodeled.”",
],
},
{
label: "8",
jp: "に{入|はい}る{最|もっと}もよいものはどれか。",
cn: "填入的最合适的是哪一个？",
en: "What fits best in?",
choices: [
{ jp: "{一瞬|いっしゅん}だけ{心|こころ}がはればれしてくるにすぎない", cn: "心情只会开朗一瞬间而已。", en: "Your heart will feel clear only for a moment."},
{ jp: "{心|こころ}がはればれするとは{言|い}えないのではないか", cn: "难道不能说心情会开朗吗。", en: "Wouldn't you say your heart will feel clear?"},
{ jp: "{一概|いちがい}に{心|こころ}がはればれするとは{限|かぎ}らない", cn: "心情未必会一概地开朗。", en: "Your heart will not necessarily feel clear in all cases."},
{ jp: "{心|こころ}もはればれとしてくるにちがいない", cn: "心情也一定会开朗起来。", en: "Your heart is sure to feel clear too."},
],
answer: 4,
explanation:
"前文说「〜と思えるくらいになれば」——一旦能那样想，结果必然是积极的：心也会晴朗起来。「にちがいない」的断定与「なれば」的条件正好呼应。所以选 4。",
explanationEn:
"The preceding clause is “once you can think that way” — the outcome of reaching that point must be positive and assured: your heart is sure to feel clear. “Ni chigainai” matches the conditional “nareba.” Answer 4.",
choiceNotes: [
"「一瞬だけ…にすぎない」过于消极，与笔调不合。",
"疑问形式在这里没有依据。",
"「一概に…とは限らない」的保留判断与文脉不合。",
"正确。断定的积极结果。",
],
choiceNotesEn: [
"“Only for a moment” is too negative for the passage's tone.",
"The question form has no basis here.",
"The hedged “not necessarily” does not fit the flow.",
"Correct. An assured positive outcome.",
],
},
{
label: "9",
jp: "に{入|はい}る{最|もっと}もよいものはどれか。",
cn: "填入的最合适的是哪一个？",
en: "What fits best in?",
choices: [
{ jp: "{結局|けっきょく}", cn: "结果、归根结底", en: "after all"},
{ jp: "すなわち", cn: "即、也就是说", en: "that is to say"},
{ jp: "ただし", cn: "不过、只是", en: "however; provided that"},
{ jp: "いわゆる", cn: "所谓的", en: "so-called"},
],
answer: 2,
explanation:
"前后是同义换言：「道徳上恥じるにたりない秘密」＝「自分の心に照らして恥ずかしくない秘密」。用「すなわち」把前面的说法换成具体的说法。所以选 2。",
explanationEn:
"Before and after say the same thing in different words: “a secret there is no moral reason to be ashamed of” = “a secret you are not ashamed of before your own heart.” “Sunawachi” (that is) performs exactly that restatement. Answer 2.",
choiceNotes: [
"「結局」是归结，前后不是归结关系。",
"正确。同义换言。",
"「ただし」是补充限定，前后不是限定关系。",
"「いわゆる」用于引出俗称，不合。",
],
choiceNotesEn: [
"“Kekkyoku” draws a conclusion; the two sides are not in that relation.",
"Correct. A restatement in other words.",
"“Tadashi” adds a condition; the two sides are not in that relation.",
"“Iwayuru” introduces a common name; it does not fit.",
],
},
{
label: "10",
jp: "に{入|はい}る{最|もっと}もよいものはどれか。",
cn: "填入的最合适的是哪一个？",
en: "What fits best in?",
choices: [
{ jp: "{自分|じぶん}の{良心|りょうしん}も{必|かなら}ずそれを{許|ゆる}すものである", cn: "自己的良心也一定会原谅那件事。", en: "Your own conscience is also sure to forgive it."},
{ jp: "{自分|じぶん}の{良心|りょうしん}はそれを{許|ゆる}すはずがない", cn: "自己的良心不可能原谅那件事。", en: "Your own conscience could never forgive it."},
{ jp: "{自分|じぶん}の{良心|りょうしん}に{聞|き}いてみれば、わかることだ", cn: "问问自己的良心就知道了。", en: "Ask your own conscience and you will know."},
{ jp: "{自分|じぶん}の{良心|りょうしん}がそれを{許|ゆる}すまでもない", cn: "自己的良心谈不上原谅那件事。", en: "It does not go so far as your conscience forgiving it."},
],
answer: 1,
explanation:
"「また、」与前句并列：前句说「人は許すだろう」，那么并列的后句应是「自分の良心も必ずそれを許すものである」——别人会原谅，自己的良心也一定会原谅。所以选 1。",
explanationEn:
"“Mata” (and also) parallels the previous sentence: “people will forgive you.” The parallel continuation is “your own conscience is also sure to forgive it.” Answer 1.",
choiceNotes: [
"正确。与「人は許すだろう」并列。",
"意思与前句相反，不成并列。",
"前文刚说过「心にたずねてみて」，这里重复且不并列。",
"「許すまでもない」语义不通。",
],
choiceNotesEn: [
"Correct. It parallels “people will forgive you.”",
"The opposite meaning; it cannot be parallel.",
"“Ask your heart” was already used just before; it also breaks the parallel.",
"“Yurusu made mo nai” does not make sense here.",
],
},
],
},
{
label: "コラム",
instruction: "{女性用|じょせいよう}シャツのボタンはなぜ{左側|ひだりがわ}？",
instructionCn: "女性衬衣的纽扣为什么在左侧？",
instructionEn: "Why do women's shirts have buttons on the left side?",
blocks: [
{
type: "paragraph",
jp: "シャツのボタンは、{女性用|じょせいよう}は{左側|ひだりがわ}、{男性用|だんせいよう}は{右側|みぎがわ}についています。{多|おお}くの{人|ひと}は{右利|みぎき}きですから、ボタンは{右側|みぎがわ}にあるほうが{使|つか}いやすいはずです。それにもかかわらず、{女性用|じょせいよう}のシャツはなぜ{左側|ひだりがわ}にボタンがあるのでしょうか。",
cn: "衬衣的钮扣，女式在左侧，男式在右侧。大部分人都是右利手，钮扣在右侧才会得心应手。既然如此，女式衬衣钮扣又为何偏要安在左侧呢？",
en: "Traditionally women's shirts have buttons on the left side and men's shirts on the right side. Most people are right-handed so it is easier for them to wear ones with buttons on the right side. This being said, why do the female shirts have buttons on the left side?",
indent: true,
},
{
type: "paragraph",
jp: "ヨーロッパでは、{昔|むかし}、ボタン{付|つ}きのシャツを{着|き}ることができる{女性|じょせい}は{上流階級|じょうりゅうかいきゅう}の{人|ひと}だけでした。そのような{女性|じょせい}たちは、{洋服|ようふく}を{召使|めしつか}いに{着|き}せてもらっていました。そのため、{召使|めしつか}いがボタンをかけやすいように{向|む}かって{右側|みぎがわ}、つまり{左側|ひだりがわ}にボタンがあるのです。",
cn: "在欧洲，过去只有上流阶级的女性才能够穿带钮扣的衬衣。那些女性都是让仆人给自己穿衣服的，所以，为了让仆人便于系钮扣，就将钮扣安在从对面来看的右侧，从自己来看也就是左侧了。",
en: "Formerly, in Europe, only aristocratic women wore shirts with buttons and these women were usually dressed by their servants. Therefore to make it easier for the servants, the shirts had buttons on the right side, that is to say, the left side for the people wearing them.",
indent: true,
},
{
type: "paragraph",
jp: "☆{現代|げんだい}では、{召使|めしつか}いにシャツを{着|き}せてもらっている{女性|じょせい}はいませんが、やはりボタンは{左側|ひだりがわ}についています。これは{長年|ながねん}の{習慣|しゅうかん}のようです。{男性|だんせい}がボタンをはずしやすいように……という{説|せつ}もありますが？？",
cn: "现在虽然已经没有让仆人给穿衣服的女性了，但钮扣还是安在左侧，这好像是长年来的习惯做法而已。不过还有一种说法是，为了让男人便于解开钮扣……",
en: "Nowadays no women are dressed by their servants but their shirts still have buttons on the left side. It is the result of a former tradition. There is talk of it being because it is easier for men to unbutton them, though …",
indent: true,
},
],
questions: [],
},
],
},

vocab: [
{ jp: "謝意", kana: "しゃい", cn: "谢意", en: "gratitude; thanks", pos: "名詞"},
{ jp: "脳卒中", kana: "のうそっちゅう", cn: "脑卒中、中风", en: "a stroke", pos: "名詞"},
{ jp: "心臓麻痺", kana: "しんぞうまひ", cn: "心脏麻痹", en: "heart failure; cardiac paralysis", pos: "名詞"},
{ jp: "闘病", kana: "とうびょう", cn: "与疾病斗争", en: "fighting an illness", pos: "名詞・動詞"},
{ jp: "臨床", kana: "りんしょう", cn: "临床", en: "clinical practice", pos: "名詞"},
{ jp: "先駆的", kana: "せんくてき", cn: "率先的、先驱的", en: "pioneering", pos: "な形"},
{ jp: "総括", kana: "そうかつ", cn: "总结、概括", en: "summarizing; a summary", pos: "名詞・動詞"},
{ jp: "容貌", kana: "ようぼう", cn: "容貌", en: "looks; facial features", pos: "名詞"},
{ jp: "骨格", kana: "こっかく", cn: "骨骼、骨架", en: "bone structure; a frame", pos: "名詞"},
{ jp: "魅了", kana: "みりょう", cn: "魅惑、吸引", en: "fascination; charming", pos: "名詞・動詞"},
{ jp: "卑屈", kana: "ひくつ", cn: "卑屈、自卑退缩", en: "servile; self-deprecating", pos: "名詞・な形"},
{ jp: "道徳", kana: "どうとく", cn: "道德", en: "morals; morality", pos: "名詞"},
{ jp: "暴露", kana: "ばくろ", cn: "暴露、揭露", en: "exposure; disclosure", pos: "名詞・動詞"},
{ jp: "良心", kana: "りょうしん", cn: "良心", en: "conscience", pos: "名詞"},
],

grammar: [
{
pattern: "〜にちがいない",
formation: "普通形＋にちがいない",
meaning: "一定……、肯定……。表示强烈的断定。",
meaningEn: "must be ~; certainly ~. A strong assertion.",
example: {
jp: "{心|こころ}もはればれとしてくるにちがいない。",
cn: "心情也一定会开朗起来。",
en: "Your heart is sure to feel clear too.",
},
},
{
pattern: "〜にもかかわらず",
formation: "普通形＋にもかかわらず",
meaning: "尽管……仍然……。后文与前文的预想相反。",
meaningEn: "despite ~; nevertheless. What follows runs against the expectation set up before.",
example: {
jp: "それにもかかわらず、{女性用|じょせいよう}のシャツはなぜ{左側|ひだりがわ}にボタンがあるのでしょうか。",
cn: "尽管如此，女式衬衣的钮扣为什么在左侧呢？",
en: "This being said, why do women's shirts have buttons on the left side?",
},
},
{
pattern: "〜からといって",
formation: "普通形＋からといって＋否定文",
meaning: "不能因为……就……。常与否定判断搭配，表示不能仅凭那个理由下结论。",
meaningEn: "just because ~ (it does not follow that…). Usually paired with a negative judgment.",
example: {
jp: "{顔|かお}が{醜|みにく}いからといって、{整形|せいけい}をほどこす{必要|ひつよう}などはないだろう。",
cn: "不能因为脸丑，就有必要去整容吧。",
en: "Just because your face is ugly, there is no need to have plastic surgery.",
},
},
],
};
