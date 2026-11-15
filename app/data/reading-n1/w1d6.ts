import type { ReadingDay} from "../reading-n3/types";

// 第1週 6日目 文と文とをつなぐ言葉 接続詞・接続詞的表現② — printed pages 22–23
export const w1d6: ReadingDay = {
week: 1,
day: 6,
label: "文と文とをつなぐ言葉 接続詞・接続詞的表現②",
labelEn: "Words that connect sentences — conjunctions and conjunctive expressions (2)",
printedPages: [22, 23],
answerSource: "book",

point: {
title: "{話題|わだい}を{変|か}える{言葉|ことば}などに{注意|ちゅうい}！",
titleCn: "注意转换话题等用词！",
titleEn: "Watch out for topic-shifting words and the like!",
figure: {
alt: "「ボクは、女の子には優しいよ。ただし、かわいい子にだけ。」と言う黒猫と、女の子の猫たちのイラスト",
cn: "一只说「我对女孩子很温柔哦。不过，只对可爱的女孩子。」的黑猫，和几只母猫的插图",
en: "A black cat saying “I'm nice to girls. But only to cute ones,” with girl cats nearby",
},
tips: [
{
jp: "「つまり・{要|よう}するに」の{後|あと}には、{筆者|ひっしゃ}の{意見|いけん}やまとめが{来|く}ることが{多|おお}い。",
cn: "前文是事实或具体内容时，「つまり・要するに」后面多是阐述笔者的意见或总结。",
en: "When the preceding text is facts or specifics, what follows “tsumari / yōsuru ni” is mostly the writer's opinion or summary. [Memorize this!]",
},
],
expressions: [
{ jp: "つまり・結局・言いかえれば・要するに・すなわち", cn: "后文多是笔者的意见或总结", en: "what follows is mostly the writer's opinion or summary"},
{ jp: "いわゆる・いわば", cn: "采用一般常见的说法，多使用比喻等表达方式", en: "a commonly used way of putting it; often figurative"},
{ jp: "たとえば", cn: "前文是抽象内容时，后文多是具体的举例或说明", en: "after abstract content, a concrete example or explanation follows"},
{ jp: "ただし・もっとも", cn: "添加对前文内容的说明（补充、限定）", en: "adds a supplement or qualification to what precedes"},
],
notes: [
{
jp: "ボクは、{女|おんな}の{子|こ}には{優|やさ}しいよ。ただし、かわいい{子|こ}にだけ。",
cn: "我对女孩子很温柔哦。不过，只对可爱的女孩子。",
en: "I'm nice to girls. But (tadashi) only to cute ones.",
},
],
},

mondai: {
instruction: "{次|つぎ}の{文章|ぶんしょう}を{読|よ}んで、{問|と}いに{答|こた}えなさい。",
instructionCn: "阅读下面的文章，回答问题。",
instructionEn: "Read each text below and answer its question. (Answers are in the separate booklet, p. 2.)",
blocks: [
{ type: "heading", jp: "1", cn: "第 1 题", en: "Exercise 1"},
{
type: "paragraph",
jp: "{彼|かれ}は{君|きみ}の{教|おし}えを{守|まも}ろうとして、{結局|けっきょく}、{失敗|しっぱい}してしまった。（　）{君|きみ}に{責任|せきにん}がある。",
cn: "他想遵守你的教导，结果还是失败了。（ ）责任在你。",
en: "He tried to follow your teaching and ended up failing. () The responsibility lies with you.",
indent: true,
},
{ type: "heading", jp: "2", cn: "第 2 题", en: "Exercise 2"},
{
type: "paragraph",
jp: "{彼|かれ}が{読書家|どくしょか}であることは{聞|き}いていたが、{彼|かれ}の{家|いえ}に{行|い}って、その{本|ほん}の{多|おお}さに{驚|おどろ}いた。（　）。",
cn: "我听说过他是个读书家，但去了他家，还是被书的数量吓了一跳。（ ）。",
en: "I had heard that he was a great reader, but when I visited his house I was amazed at how many books he had. ().",
indent: true,
},
{ type: "heading", jp: "3", cn: "第 3 题", en: "Exercise 3"},
{
type: "paragraph",
jp: "テレビの{料理番組|りょうりばんぐみ}などを{見|み}てしっかり{覚|おぼ}えたつもりが、うろ{覚|おぼ}え（注1）なので{材料|ざいりょう}や{手順|てじゅん}も{実際|じっさい}とは{違|ちが}うらしく、{最初|さいしょ}の{思惑|おもわく}（注2）とは{違|ちが}うものになることが{多々|たた}あった。あるいは、{料理|りょうり}の{本|ほん}を{見|み}ながらなのに、{入|い}れる{調味料|ちょうみりょう}を{間違|まちが}えたりして、{見本|みほん}とは{違|ちが}う{味|あじ}になることもあった。ところが、それが{好評|こうひょう}を{得|え}て、このような{本|ほん}にまでなったのである*。{言|い}いかえれば、{私|わたし}の{料理|りょうり}は、（　）。",
cn: "看电视的烹饪节目以为自己记牢了，但其实记了个大概，材料和步骤好像都和实际的不一样，做出来的东西常常和最初的设想不同。有时明明看着菜谱书，却把要放的调味料搞错，做出的味道也和样品不一样。可是，这些菜却受到好评，于是就编成了这样的书。换句话说，我的菜，（ ）。",
en: "I thought I had memorized the recipes from TV cooking shows, but my memory was vague, so the ingredients and steps seemed to differ from the real ones, and the results often turned out different from what I had first intended. Or, even while looking at a cookbook, I would put in the wrong seasonings and end up with a different taste from the sample. However, because they were very well received, they have been published in this book. In other words, my cooking is ().",
indent: true,
},
{ type: "heading", jp: "4", cn: "第 4 题", en: "Exercise 4"},
{
type: "paragraph",
jp: "〈とまどう〉という{言葉|ことば}は、もともと〈{戸惑|とまど}う〉と{書|か}いて、{夜中|よなか}に{目|め}をさまし、ねぼけて（注1）{方角|ほうがく}を{失|うしな}い{惑|まど}うこと、{入|はい}るべき{部屋|へや}、{戸|と}を{忘|わす}れて{迷|まよ}うことの{意味|いみ}があります。{人|ひと}は、{刻一刻|こくいっこく}（注2）、{新|あたら}しい{扉|とびら}を、{自分|じぶん}で{開|あ}けながら、（　）、なにかを{捨|す}て、なにかを{選|えら}びながら{生|い}きているわけだけれど、{普段|ふだん}は、それを{無意識|むいしき}におこなっているので、あまり{迷|まよ}わない。しかし、{夜中|よなか}とか、{旅先|たびさき}とか、{日常|にちじょう}の{時間|じかん}の{流|なが}れが{変|か}わったとき、〈とまどう〉〈{惑|まど}う〉という{感|かん}じを{強|つよ}くもつのですね**。",
cn: "「とまどう」这个词，原本写作「戸惑う」，意思是半夜醒来，迷迷糊糊地（注1）失去方向而困惑，忘了该进的房间和门而迷路。人们时刻（注2）一边亲手打开新的大门，（ ），一边舍弃一些东西、选择一些东西地活着，但平时都是无意识地这样做，所以不太会迷茫。可是，在夜里或旅途中等等日常时间流向改变的时候，就会更强烈地感觉到「犹豫、困惑」。",
en: "The word “tomadou” was originally written with characters meaning to wake in the middle of the night, lose your bearings while half asleep (Note 1), and wander, forgetting which room and door you should enter. Moment by moment (Note 2), we open new doors ourselves and live discarding some things and choosing others — () — but normally we do this unconsciously, so we rarely feel lost. However, we tend to feel lost when we find ourselves in unfamiliar circumstances such as in the middle of the night or while travelling, when the flow of everyday time changes.",
indent: true,
},
{
type: "source",
jp: "（{五木寛之|いつきひろゆき}『{生|い}きるヒント ―{自分|じぶん}の{人生|じんせい}を{愛|あい}するための12{章|しょう}』{角川書店|かどかわしょてん}）",
cn: "（五木宽之《生存的启示——为了热爱自己人生的12章》角川书店）",
en: "(Itsuki Hiroyuki, Hints for Living — 12 Chapters for Loving Your Own Life, Kadokawa Shoten)",
},
],
footnotes: [
{ marker: "注1", term: "うろ覚え", jp: "うろおぼえ", cn: "记了个大概：不确切的记忆", en: "a vague memory"},
{ marker: "注2", term: "思惑", jp: "おもわく", cn: "设想、盘算：在想的事情、想法", en: "what one has in mind; an expectation"},
{ marker: "注1", term: "ねぼける", jp: "ねぼける", cn: "睡迷糊：醒了也迷迷糊糊的", en: "to be half asleep"},
{ marker: "注2", term: "刻一刻", jp: "こくいっこく", cn: "时刻、渐渐：随着时间流逝逐渐地", en: "moment by moment; gradually"},
],
questions: [
{
label: "問1",
jp: "（　）に{入|はい}る{適当|てきとう}な{言葉|ことば}はどちらか。",
cn: "填入（ ）的合适词语是哪一个？",
en: "Which word fits in the ()?",
choices: [
{ jp: "いわゆる", cn: "所谓的", en: "so-called"},
{ jp: "{要|よう}するに", cn: "总之、简而言之", en: "in short; in a word"},
],
answer: 2,
explanation:
"后文「君に責任がある」是把前文内容总结成笔者的意见。本课要点表：「つまり・結局・言いかえれば・要するに・すなわち」的后面多是笔者的意见或总结。所以选 2「要するに」。",
explanationEn:
"What follows — “the responsibility lies with you” — sums the preceding facts up as the writer's conclusion. In the day's table, “yōsuru ni” and its group are followed by the writer's opinion or summary. Answer 2.",
choiceNotes: [
"「いわゆる」用于引出一般常见的说法，后面不接这种断定。",
"正确。是对前文的总结。",
],
choiceNotesEn: [
"“Iwayuru” introduces a commonly used expression, not this kind of verdict.",
"Correct. It sums up what precedes.",
],
},
{
label: "問2",
jp: "（　）に{入|はい}る{適当|てきとう}な{文|ぶん}はどちらか。",
cn: "填入（ ）的合适句子是哪一个？",
en: "Which sentence fits in the ()?",
choices: [
{ jp: "もっとも{読|よ}んでいない{本|ほん}も{多|おお}くあるそうだが", cn: "不过，听说没读过的书也有很多。", en: "Mind you, I hear many of the books are unread."},
{ jp: "すなわち{読|よ}んでいない{本|ほん}が{多|おお}いのではないだろうか", cn: "也就是说，没读过的书恐怕有很多吧。", en: "In other words, perhaps many of the books are unread."},
],
answer: 1,
explanation:
"（ ）在文末，是对前文的补充说明。本课要点表：「ただし・もっとも」是「添加对前文内容的说明」。1 用「もっとも」补充「不过也有很多没读的书」，自然衔接；2 的「すなわち」是换言总结，把「书多」换说成「没读的多」，逻辑跳跃。所以选 1。别册提示：（ ）前面在给前文的文章补充说明。",
explanationEn:
"The blank sits at the end and supplements what precedes. In the day's table, “tadashi / mottomo” add a qualification to the preceding content. 1 uses “mottomo” to add “mind you, many are unread,” which connects naturally. 2's “sunawachi” would restate “many books” as “many unread,” a logical leap. The booklet notes that what precedes the blank adds an explanation to the earlier text. Answer 1.",
choiceNotes: [
"正确。「もっとも」的补充说明。",
"「すなわち」的换言总结在这里逻辑不通。",
],
choiceNotesEn: [
"Correct. A “mottomo” supplement.",
"A “sunawachi” restatement does not work logically here.",
],
},
{
label: "問3",
jp: "（　）に{入|はい}る{最|もっと}も{適当|てきとう}なものはどれか。",
cn: "填入（ ）的最合适的是哪一个？",
en: "Which fits best in the ()?",
choices: [
{ jp: "ごくありふれたものばかりである", cn: "全是非常普通的东西。", en: "It is all perfectly ordinary stuff."},
{ jp: "{不評|ふひょう}なものばかりである", cn: "全是评价不好的东西。", en: "It is all badly received stuff."},
{ jp: "{覚|おぼ}えにくいものばかりである", cn: "全是很难记住的东西。", en: "It is all hard-to-memorize stuff."},
{ jp: "{失敗作|しっぱいさく}ばかりなのである", cn: "全是失败之作。", en: "It is all failures."},
],
answer: 4,
explanation:
"「言いかえれば」后面是对前文的换言总结。前文说：本想照着样品做，却总是记错、放错调味料——别册提示：「見本と同じように作るつもりが、間違ったのである」（本想做得和样品一样，结果做错了）。换句话说，她的菜全是「失敗作」，却意外地受好评。所以选 4。",
explanationEn:
"After “iikaereba” comes a restatement of what precedes. The booklet puts it plainly: she meant to make it just like the sample, but got it wrong. In other words, her dishes are all “failures” — which were, surprisingly, well received. Answer 4.",
choiceNotes: [
"前文并没有说她的菜普通。",
"与「好評を得て」相反。",
"「覚えにくい」不是对整段的总结。",
"正确。是对「間違えた」内容的换言总结。",
],
choiceNotesEn: [
"The text never calls her cooking ordinary.",
"The opposite of “they were well received.”",
"“Hard to memorize” does not sum up the passage.",
"Correct. It restates the “got it wrong” content.",
],
},
{
label: "問4",
jp: "（　）に{入|はい}る{最|もっと}も{適当|てきとう}な{言葉|ことば}はどれか。",
cn: "填入（ ）的最合适的词语是哪一个？",
en: "Which word fits best in the ()?",
choices: [
{ jp: "つまり", cn: "也就是说", en: "in other words"},
{ jp: "たとえば", cn: "例如", en: "for example"},
{ jp: "ただし", cn: "不过、只是", en: "however; provided that"},
{ jp: "もっとも", cn: "不过、话虽如此", en: "mind you; although"},
],
answer: 1,
explanation:
"别册提示：（ ）后面的「なにかを捨て、なにかを選びながら」是对前面「新しい扉を、自分で開ける」的换言说明。「つまり」正是把前文换一种说法再讲一遍的接续词。所以选 1。",
explanationEn:
"The booklet points out that what follows the blank — “discarding some things and choosing others” — restates “opening new doors by yourself” in other words. “Tsumari” is exactly the connector for restating. Answer 1.",
choiceNotes: [
"正确。后文是前文的换言说明。",
"后文不是举例。",
"「ただし」是补充限定，这里不是。",
"「もっとも」也是补充限定，与换言关系不合。",
],
choiceNotesEn: [
"Correct. What follows restates what precedes.",
"What follows is not an example.",
"“Tadashi” adds a condition; that is not the relation here.",
"“Mottomo” is also a qualifier; it does not mark a restatement.",
],
},
],
pageNotes: [
{
jp: "* because they were very well received, they have been published in this book",
cn: "这些菜受到好评，于是就编成了这样的书",
en: "because they were very well received, they have been published in this book",
},
{
jp: "** we tend to feel lost when we find ourselves in unfamiliar circumstances such as in the middle of the night or while travelling",
cn: "在夜里或外出之地等日常作息规律发生改变的时候，就会更强烈感觉到“犹豫、困惑”",
en: "we tend to feel lost when we find ourselves in unfamiliar circumstances such as in the middle of the night or while travelling",
},
],
},

vocab: [
{ jp: "読書家", kana: "どくしょか", cn: "读书家、爱读书的人", en: "a great reader; a book lover", pos: "名詞"},
{ jp: "番組", kana: "ばんぐみ", cn: "（电视/广播）节目", en: "a program (TV, radio)", pos: "名詞"},
{ jp: "材料", kana: "ざいりょう", cn: "材料", en: "ingredients; materials", pos: "名詞"},
{ jp: "手順", kana: "てじゅん", cn: "步骤、顺序", en: "steps; procedure", pos: "名詞"},
{ jp: "実際", kana: "じっさい", cn: "实际", en: "actuality; in fact", pos: "名詞・副詞"},
{ jp: "思惑", kana: "おもわく", cn: "设想、盘算", en: "what one has in mind; an expectation", pos: "名詞"},
{ jp: "調味料", kana: "ちょうみりょう", cn: "调味料", en: "seasoning", pos: "名詞"},
{ jp: "見本", kana: "みほん", cn: "样品、范本", en: "a sample; a model", pos: "名詞"},
{ jp: "好評", kana: "こうひょう", cn: "好评", en: "a good reputation; favorable reviews", pos: "名詞"},
{ jp: "扉", kana: "とびら", cn: "门、扉页", en: "a door; a title page", pos: "名詞"},
{ jp: "無意識", kana: "むいしき", cn: "无意识", en: "unconsciousness", pos: "名詞・副詞"},
{ jp: "普段", kana: "ふだん", cn: "平时、日常", en: "usually; ordinarily", pos: "名詞・副詞"},
{ jp: "旅先", kana: "たびさき", cn: "旅途中、外出地", en: "a travel destination; while travelling", pos: "名詞"},
{ jp: "うろ覚え", kana: "うろおぼえ", cn: "记了个大概", en: "a vague memory", pos: "名詞"},
],

grammar: [
{
pattern: "つまり",
formation: "文＋つまり＋まとめの文",
meaning: "也就是说、总之。把前文换一种说法，或总结成笔者的意见。",
meaningEn: "in other words; in short. Restates what precedes or sums it up as the writer's conclusion.",
example: {
jp: "つまり、{生|い}き{方|かた}は{千差万別|せんさばんべつ}である。",
cn: "也就是说，生活方式是千差万别的。",
en: "In other words, ways of living differ from person to person.",
},
},
{
pattern: "もっとも",
formation: "文＋もっとも＋補足の文",
meaning: "不过、话虽如此。对前文添加补充或限定说明。",
meaningEn: "mind you; although. Adds a supplement or qualification to what precedes.",
example: {
jp: "もっとも{読|よ}んでいない{本|ほん}も{多|おお}くあるそうだが",
cn: "不过，听说没读过的书也有很多。",
en: "Mind you, I hear many of the books are unread.",
},
},
{
pattern: "言いかえれば",
formation: "文＋言いかえれば＋言いかえの文",
meaning: "换句话说。用别的说法重述前文的内容。",
meaningEn: "in other words. Restates the preceding content in different words.",
example: {
jp: "{言|い}いかえれば、{私|わたし}の{料理|りょうり}は、{失敗作|しっぱいさく}ばかりなのである。",
cn: "换句话说，我的菜全是失败之作。",
en: "In other words, my cooking is all failures.",
},
},
],
};
