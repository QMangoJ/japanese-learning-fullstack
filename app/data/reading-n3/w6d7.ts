import type { ReadingDay } from "./types";

// 第6週 7日目 実戦問題 — printed pages 104–106
// 別冊 p.7（第6週の解答）は今回のスキャンに含まれていないため、答えは本文から導出。
export const w6d7: ReadingDay = {
	week: 6,
	day: 7,
	label: "実戦問題",
	labelKana: "じっせんもんだい",
	labelEn: "Practice Exercise",
	printedPages: [104, 105, 106],
	answerSource: "derived",

	practice: {
		timeLimitMinutes: 15,
		scoring: "1問20点×5問／100点",
		groups: [
			{
				label: "問題1",
				instruction:
					"つぎの{文章|ぶんしょう}を{読|よ}んで、あとの{質問|しつもん}に{答|こた}えなさい。{答|こた}えは、1・2・3・4から{最|もっと}もよいものを{一|ひと}つ{選|えら}びなさい。",
				instructionCn: "阅读下面的文章，回答后面的问题。答案从 1・2・3・4 中选出最合适的一个。",
				instructionEn: "Read the passage below and answer the questions that follow. Choose the best answer from 1, 2, 3, or 4.",
				blocks: [
					{
						type: "paragraph",
						indent: true,
						jp: "（{前略|ぜんりゃく}）{人|ひと}は{睡眠中|すいみんちゅう}に、{極|ごく}（※1）{浅|あさ}い{眠|ねむ}り、{浅|あさ}い{眠|ねむ}り、{中|ちゅう}くらいの{眠|ねむ}り、{深|ふか}い{眠|ねむ}りの{四段階|よんだんかい}の{眠|ねむ}りをします。この{眠|ねむ}りをノンレム{睡眠|すいみん}といいますが、ノンレム{睡眠|すいみん}の{次|つぎ}にもう{一|ひと}つの{眠|ねむ}りがきます。これが、レム{睡眠|すいみん}です。（{中略|ちゅうりゃく}）{七|なな}〜{八時間|はちじかん}の{睡眠|すいみん}のうち、ノンレム{睡眠|すいみん}とレム{睡眠|すいみん}を{何回|なんかい}か{繰|く}り{返|かえ}しますが、①{夢|ゆめ}を{見|み}るのはレム{睡眠|すいみん}のときだけです。",
						cn: "（前略）人在睡眠中会经历极浅睡眠、浅睡眠、中度睡眠、深睡眠这四个阶段。这样的睡眠称为非快速眼动睡眠（非 REM 睡眠），而在它之后还会出现另一种睡眠，这就是快速眼动睡眠（REM 睡眠）。（中略）在七到八小时的睡眠中，非 REM 睡眠和 REM 睡眠会反复交替数次，而①做梦只发生在 REM 睡眠的时候。",
						en: "(earlier part omitted) While we sleep, we go through four stages: very light sleep, light sleep, medium sleep, and deep sleep. This sleep is called non-REM sleep, and after non-REM sleep another kind of sleep comes. This is REM sleep. (passage omitted) In seven to eight hours of sleep, non-REM and REM sleep repeat several times, but ① we dream only during REM sleep.",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "（　②　）のときにはいつでも{夢|ゆめ}を{見|み}ていますが、その{夢|ゆめ}を{覚|おぼ}えているのは、{夢|ゆめ}を{見|み}た{後約八分|あとやくはっぷん}だけだそうです。この{間|あいだ}に{目|め}が{覚|さ}めれば{覚|おぼ}えているのですが、そのまま{眠|ねむ}り{続|つづ}けてしまえば、{夢|ゆめ}を{見|み}たことすら（※2）{忘|わす}れてしまいます。だから、ぐっすり{熟睡|じゅくすい}（※3）して{浅|あさ}い{眠|ねむ}りから{深|ふか}い{眠|ねむ}りへすぐ{移行|いこう}して（※4）しまうと、{夢|ゆめ}はあまり{見|み}ません。",
						cn: "在（　②　）的时候人始终在做梦，但据说能记住那个梦的时间，只有做梦之后约八分钟。如果在这段时间里醒来就还记得，若是就那样继续睡下去，连做过梦这件事本身都会忘掉。所以，如果睡得很沉、从浅睡眠很快过渡到深睡眠，就不太会做梦。",
						en: "During (　②　) we are always dreaming, but it is said that we only remember that dream for about eight minutes after we have it. If we wake up in that window we remember it; if we just keep sleeping, we forget even that we dreamed at all. So if we sleep soundly and move quickly from light sleep to deep sleep, we do not dream much.",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "また、（　③　）が{長|なが}くなると{夢|ゆめ}を{見|み}ている{時間|じかん}が{長|なが}くなります。{眠|ねむ}る{時間|じかん}が{長|なが}ければレム{睡眠|すいみん}の{長|なが}さも{延|の}びますが、{同|おな}じ{時間寝|じかんね}ていても、{強|つよ}いストレス（※5）を{受|う}けているときのほうがレム{睡眠|すいみん}が{長|なが}くなるそうです。それに、ストレスを{受|う}けているときにはウツウツとして（※6）よく{眠|ねむ}れず、{目|め}が{覚|さ}めやすいということもあります。そういえば、テストの{前|まえ}とか{仕事|しごと}がうまくいかないときとか、ふられた（※7）ときとか、イヤーなことがあったときによく{夢|ゆめ}を{見|み}たなと、{思|おも}い{当|あ}たりませんか。",
						cn: "另外，（　③　）一变长，做梦的时间也会变长。睡眠时间越长，REM 睡眠的长度也会延长；但据说即使睡同样长的时间，承受强烈压力时 REM 睡眠会更长。而且，承受压力时人会郁郁不安、睡不踏实，也更容易醒来。这么一说，考试前、工作不顺时、被人拒绝时，或是遇到讨厌的事时常常做梦——你是不是也有同感呢？",
						en: "Also, when (　③　) gets longer, the time spent dreaming gets longer. If you sleep longer, REM sleep also lengthens; but even if you sleep the same amount of time, REM sleep is said to be longer when you are under strong stress. On top of that, when you are under stress you feel gloomy, cannot sleep well, and wake more easily. Come to think of it — before a test, when work isn’t going well, when you’ve been turned down, or when something unpleasant has happened — don’t you recall dreaming a lot then?",
					},
					{
						type: "paragraph",
						indent: true,
						jp: "アメリカで{行|おこ}なわれた{実験|じっけん}でも、④{夢|ゆめ}をあまり{見|み}ない{人|ひと}というのは、{楽天的|らくてんてき}（※8）で{自我|じが}があまり{強|つよ}くない{人|ひと}（※9）という{結果|けっか}が{出|で}ているそうです。{何|なに}も{考|かんが}えず、バタンキュー（※10）と{眠|ねむ}ってしまうのが、{最上|さいじょう}の{眠|ねむ}りのようです。",
						cn: "在美国进行的实验也得出结论：④不太做梦的人，是那种乐天、自我意识不太强的人。什么都不想、倒头就睡，看来才是最好的睡眠。",
						en: "An experiment done in America is also said to have found that ④ people who do not dream much are optimistic people whose sense of self is not very strong. Falling asleep in a heap without thinking about anything seems to be the best kind of sleep.",
					},
					{
						type: "source",
						jp: "（{竹内均|たけうちひとし}『{頭|あたま}にやさしい{雑学読本|ざつがくどくほん}⑦ ちょっと{意外|いがい}なお{茶|ちゃ}の{間|ま}の{科学|かがく}』{同文書院|どうぶんしょいん}）",
						cn: "（竹内均《对头脑友好的杂学读本⑦ 有点意外的居家科学》同文书院）",
						en: "(Hitoshi Takeuchi, A Brain-Friendly Miscellany ⑦: Slightly Surprising Living-Room Science, Dobun Shoin)",
					},
				],
				footnotes: [
					{ marker: "※1", term: "極", jp: "とても", cn: "极、非常", en: "extremely; very" },
					{ marker: "※2", term: "〜すら", jp: "〜さえ", cn: "连……都", en: "even … (＝さえ)" },
					{ marker: "※3", term: "熟睡", jp: "ぐっすり眠ること", cn: "熟睡", en: "sleeping soundly" },
					{ marker: "※4", term: "移行する", jp: "うつっていく", cn: "过渡、转移", en: "to move over; to shift" },
					{ marker: "※5", term: "ストレス", jp: "肉体的、精神的緊張", cn: "压力（肉体、精神上的紧张）", en: "stress (physical or mental tension)" },
					{ marker: "※6", term: "ウツウツとする", jp: "よく眠れないようす", cn: "郁郁不安、睡不踏实", en: "to feel gloomy and not sleep well" },
					{
						marker: "※7",
						term: "ふられる",
						jp: "（好きな相手に）嫌われる、あるいは、何かを断られること",
						cn: "被（喜欢的人）甩了，或者被拒绝",
						en: "to be dumped (by someone you like), or to have something turned down",
					},
					{ marker: "※8", term: "楽天的", jp: "何事にも明るくいい方向に考えるようす", cn: "乐天的、凡事往好处想", en: "optimistic; looking on the bright side of everything" },
					{ marker: "※9", term: "自我が強くない人", jp: "自分というものを強く出さない人", cn: "不强烈表现自我的人", en: "someone who does not push their own self strongly" },
					{ marker: "※10", term: "バタンキュー", jp: "すぐに眠ってしまうようす", cn: "倒头就睡的样子", en: "the look of falling asleep at once" },
				],
				questions: [
					{
						label: "1",
						jp: "①「{夢|ゆめ}を{見|み}る」のはどんなときか。",
						cn: "①「做梦」是在什么时候？",
						en: "When do we ① “dream”?",
						choices: [
							{ jp: "レム{睡眠|すいみん}のとき", cn: "REM 睡眠的时候", en: "during REM sleep" },
							{ jp: "ノンレム{睡眠|すいみん}のとき", cn: "非 REM 睡眠的时候", en: "during non-REM sleep" },
							{ jp: "{深|ふか}い{眠|ねむ}りのとき", cn: "深睡眠的时候", en: "during deep sleep" },
							{ jp: "7〜8{時間寝|じかんね}たとき", cn: "睡了 7〜8 小时的时候", en: "when you have slept 7–8 hours" },
						],
						answer: 1,
						explanation:
							"原文直接给出了答案：「夢を見るのはレム睡眠のときだけです」。所以 1 正确。这类题只要在文中找到同样的表述即可。",
						explanationEn:
							"The text gives the answer directly: “we dream only during REM sleep.” So 1 is correct. For this kind of question you only need to find the same wording in the passage.",
						choiceNotes: [
							"正确。原文明说「レム睡眠のときだけ」。",
							"非 REM 睡眠是浅到深的四个阶段，做梦不在这里。",
							"深睡眠属于非 REM 睡眠；文中还说「深い眠りへすぐ移行してしまうと、夢はあまり見ません」。",
							"7〜8 小时是整段睡眠的长度，不是做梦的时机。",
						],
						choiceNotesEn: [
							"Correct. The text says clearly “only during REM sleep.”",
							"Non-REM sleep is the four stages from light to deep; dreaming does not happen there.",
							"Deep sleep is part of non-REM sleep; the text also says “if you move quickly into deep sleep, you do not dream much.”",
							"7–8 hours is the length of a whole night’s sleep, not the moment when you dream.",
						],
					},
					{
						label: "2",
						jp: "（　②　）（　③　）に{入|はい}る{言葉|ことば}として{適当|てきとう}な{組|く}み{合|あ}わせのものはどれか。",
						cn: "填入（　②　）（　③　）的词语组合，恰当的是哪一个？",
						en: "Which pair of words fits (　②　) and (　③　)?",
						choices: [
							{ jp: "②ノンレム{睡眠|すいみん}　③レム{睡眠|すいみん}", cn: "②非 REM 睡眠　③REM 睡眠", en: "② non-REM sleep　③ REM sleep" },
							{ jp: "②ノンレム{睡眠|すいみん}　③ノンレム{睡眠|すいみん}", cn: "②非 REM 睡眠　③非 REM 睡眠", en: "② non-REM sleep　③ non-REM sleep" },
							{ jp: "②レム{睡眠|すいみん}　③レム{睡眠|すいみん}", cn: "②REM 睡眠　③REM 睡眠", en: "② REM sleep　③ REM sleep" },
							{ jp: "②レム{睡眠|すいみん}　③ノンレム{睡眠|すいみん}", cn: "②REM 睡眠　③非 REM 睡眠", en: "② REM sleep　③ non-REM sleep" },
						],
						answer: 3,
						explanation:
							"②：紧接前一段的结论「夢を見るのはレム睡眠のときだけ」，所以「（　）のときにはいつでも夢を見ています」里填 REM 睡眠。③：后一句写「眠る時間が長ければ**レム睡眠**の長さも延びます」，可见变长会导致做梦时间变长的正是 REM 睡眠。两处都是 REM 睡眠，所以 3 正确。",
						explanationEn:
							"②: It follows the previous paragraph’s conclusion “we dream only during REM sleep,” so “during (　) we are always dreaming” is REM sleep. ③: The next sentence says “if you sleep longer, **REM sleep** also lengthens,” so what getting longer makes dreaming last longer is REM sleep. Both blanks are REM sleep, so 3 is correct.",
						choiceNotes: [
							"②错。做梦只发生在 REM 睡眠。",
							"②③都错。",
							"正确。②③都是 REM 睡眠。",
							"③错。后文明确提到「レム睡眠の長さも延びます」。",
						],
						choiceNotesEn: [
							"② is wrong. Dreaming happens only in REM sleep.",
							"Both ② and ③ are wrong.",
							"Correct. Both ② and ③ are REM sleep.",
							"③ is wrong. The later text clearly says “REM sleep also lengthens.”",
						],
					},
					{
						label: "3",
						jp: "{筆者|ひっしゃ}によれば、④「{夢|ゆめ}をあまり{見|み}ない{人|ひと}」はどんな{人|ひと}か。",
						cn: "根据笔者的说法，④「不太做梦的人」是什么样的人？",
						en: "According to the writer, what kind of person is ④ “someone who does not dream much”?",
						choices: [
							{ jp: "{睡眠時間|すいみんじかん}が{長|なが}い{人|ひと}", cn: "睡眠时间长的人", en: "someone who sleeps a long time" },
							{ jp: "{睡眠時間|すいみんじかん}が{短|みじか}い{人|ひと}", cn: "睡眠时间短的人", en: "someone who sleeps a short time" },
							{ jp: "いろいろなことに{悩|なや}む{人|ひと}", cn: "为各种事烦恼的人", en: "someone who worries about all kinds of things" },
							{ jp: "いろいろなことに{悩|なや}まない{人|ひと}", cn: "不为各种事烦恼的人", en: "someone who does not worry about all kinds of things" },
						],
						answer: 4,
						explanation:
							"原文说不太做梦的人是「楽天的で自我があまり強くない人」。注释里解释「楽天的＝何事にも明るくいい方向に考えるようす」——凡事往好处想，也就是**不为各种事烦恼**的人。所以 4 正确。这题需要把原文的词换成选项里的说法。",
						explanationEn:
							"The text says people who do not dream much are “optimistic people whose sense of self is not very strong.” The note explains “楽観的 = looking on the bright side of everything” — that is, people who do not worry about all kinds of things. So 4 is correct. This question asks you to swap the wording of the text for the wording of the choices.",
						choiceNotes: [
							"睡得越久 REM 睡眠越长、做梦时间反而越长，方向相反。",
							"文中没有把睡眠时长与「不做梦的人」直接挂钩。",
							"爱烦恼＝压力大 → REM 睡眠变长 → 更常做梦，正好相反。",
							"正确。「楽天的（凡事往好处想）」＝不为各种事烦恼。",
						],
						choiceNotesEn: [
							"The longer you sleep, the longer REM sleep is, so you dream more — the opposite direction.",
							"The text never ties sleep length directly to “people who do not dream.”",
							"Worrying a lot = more stress → longer REM sleep → more dreaming, the opposite.",
							"Correct. “Optimistic (looking on the bright side)” = not worrying about all kinds of things.",
						],
					},
					{
						label: "4",
						jp: "ストレスの{多|おお}い{人|ひと}について、{正|ただ}しいものはどれか。",
						cn: "关于压力大的人，下列哪一项正确？",
						en: "Which of the following is true of people under a lot of stress?",
						choices: [
							{ jp: "ストレスの{多|おお}い{人|ひと}ほどレム{睡眠|すいみん}が{短|みじか}い。", cn: "压力越大的人，REM 睡眠越短。", en: "The more stress someone has, the shorter their REM sleep." },
							{ jp: "ストレスの{多|おお}い{人|ひと}ほど{睡眠時間|すいみんじかん}が{長|なが}い。", cn: "压力越大的人，睡眠时间越长。", en: "The more stress someone has, the longer they sleep." },
							{ jp: "ストレスの{多|おお}い{人|ひと}ほど{睡眠時間|すいみんじかん}が{短|みじか}い。", cn: "压力越大的人，睡眠时间越短。", en: "The more stress someone has, the shorter they sleep." },
							{ jp: "ストレスの{多|おお}い{人|ひと}ほどよく{夢|ゆめ}を{見|み}る。", cn: "压力越大的人，越常做梦。", en: "The more stress someone has, the more they dream." },
						],
						answer: 4,
						explanation:
							"把两条信息连起来：①「レム睡眠が長くなると夢を見ている時間が長くなる」；②「同じ時間寝ていても、強いストレスを受けているときのほうがレム睡眠が長くなる」。压力大 → REM 睡眠长 → 做梦多。所以 4 正确。",
						explanationEn:
							"Join the two pieces of information: ① “when REM sleep gets longer, the time spent dreaming gets longer”; ② “even if you sleep the same amount of time, REM sleep is longer when you are under strong stress.” More stress → longer REM sleep → more dreaming. So 4 is correct.",
						choiceNotes: [
							"原文是「レム睡眠が長くなる」，与此相反。",
							"文中说的是「同じ時間寝ていても」，即在睡眠时长相同的前提下比较，没有说压力大就睡得久。",
							"「よく眠れず、目が覚めやすい」确实提到了，但那是睡眠质量的问题，文中并未断言睡眠时间更短。",
							"正确。压力大 → REM 睡眠变长 → 做梦时间变长。",
						],
						choiceNotesEn: [
							"The text says “REM sleep gets longer,” the opposite of this.",
							"The text says “even if you sleep the same amount of time,” so it compares on equal sleep length; it does not say more stress means you sleep longer.",
							"“Cannot sleep well and wake more easily” is mentioned, but that is about sleep quality; the text never claims the sleep is shorter.",
							"Correct. More stress → longer REM sleep → longer time dreaming.",
						],
					},
				],
			},
			{
				label: "問題2",
				instruction:
					"つぎの{文章|ぶんしょう}を{読|よ}んで、あとの{質問|しつもん}に{答|こた}えなさい。{答|こた}えは、1・2・3・4から{最|もっと}もよいものを{一|ひと}つ{選|えら}びなさい。",
				instructionCn: "阅读下面的文章，回答后面的问题。答案从 1・2・3・4 中选出最合适的一个。",
				instructionEn: "Read the passage below and answer the questions that follow. Choose the best answer from 1, 2, 3, or 4.",
				blocks: [
					{
						type: "paragraph",
						indent: true,
						jp: "{人間|にんげん}はだれでも{本当|ほんとう}は{死|し}と{隣|とな}りあわせで{生|い}きている。{自殺|じさつ}、などというものも、{特別|とくべつ}に{異常|いじょう}なことではなく、{手|て}をのばせばすぐとどくところにある{世界|せかい}なのではあるまいか。ひょいと{気軽|きがる}に（{注|ちゅう}1）{道路|どうろ}の{白線|はくせん}をまたぐように、{人|ひと}は{日常生活|にちじょうせいかつ}を{投|な}げだす（{注|ちゅう}2）こともありえないことではない。ああ、もう{面倒|めんどう}くさい、と、{特別|とくべつ}な{理由|りゆう}もなく{死|し}に{向|む}かって{歩|あゆ}みだす（{注|ちゅう}3）こともあるだろう。{私|わたし}たちはいつもすれすれの（{注|ちゅう}4）ところできわどく（{注|ちゅう}5）{生|い}きているのだ。",
						cn: "其实每个人都是与死亡比邻而生的。所谓自杀，也并不是什么特别异常的事，而是一个只要一伸手就能够到的世界，不是吗？就像随随便便地跨过马路上的白线一样，人抛下日常生活这种事，也并非不可能发生。「啊，真是烦透了」——没有什么特别的理由，就朝着死亡迈出脚步的情形大概也是有的。我们始终都是在那条边缘线上、惊险地活着的。",
						en: "The truth is that every human being lives next door to death. Suicide, too, is not something especially abnormal, but a world that is right there if you just stretch out your hand, is it not? Just as you might casually step over a white line on the road, it is not impossible for a person to throw everyday life away. “Ah, I’ve had enough” — there are probably times when, with no special reason, someone starts walking toward death. We are always living on the edge, just barely.",
					},
					{ type: "source", jp: "（{五木寛之|いつきひろゆき}『{大河|たいが}の{一滴|いってき}』{幻冬舎|げんとうしゃ}）", cn: "（五木宽之《大河一滴》幻冬舍）", en: "(Hiroyuki Itsuki, A Drop in the Great River, Gentosha)" },
				],
				footnotes: [
					{ marker: "注1", term: "ひょいと気軽に", jp: "何気なくかんたんに", cn: "不经意地、轻易地", en: "casually; without thinking much about it" },
					{ marker: "注2", term: "投げ出す", jp: "あきらめて、やめてしまう", cn: "抛下、放弃", en: "to throw away; to give up on" },
					{ marker: "注3", term: "歩みだす", jp: "歩き出す", cn: "迈步走出", en: "to start walking" },
					{ marker: "注4", term: "すれすれの", jp: "なんとか危険を避けて", cn: "勉强避开危险的、擦边的", en: "just barely avoiding danger; on the edge" },
					{ marker: "注5", term: "きわどく", jp: "ぎりぎりの危ない状態で", cn: "在千钧一发的危险状态下", en: "in a barely-safe, dangerous state" },
				],
				questions: [
					{
						label: "5",
						jp: "「すれすれのところできわどく{生|い}きている」とは、どういう{意味|いみ}か。",
						cn: "「在边缘处惊险地活着」是什么意思？",
						en: "What does “living on the edge, just barely” mean?",
						choices: [
							{ jp: "{自殺|じさつ}してもおかしくない{状況|じょうきょう}の{中|なか}で{生活|せいかつ}している。", cn: "生活在随时自杀也不奇怪的状况之中。", en: "Living in a situation where suicide would not be surprising." },
							{ jp: "{危険|きけん}なものに{囲|かこ}まれた{状況|じょうきょう}の{中|なか}で{生活|せいかつ}している。", cn: "生活在被危险事物包围的状况之中。", en: "Living in a situation surrounded by dangerous things." },
							{
								jp: "{簡単|かんたん}に{死|し}を{選|えら}べないという{状況|じょうきょう}の{中|なか}で{生活|せいかつ}している。",
								cn: "生活在无法轻易选择死亡的状况之中。",
								en: "Living in a situation where you cannot easily choose death.",
							},
							{ jp: "だれでもいつかは{死|し}ぬという{状況|じょうきょう}の{中|なか}で{生活|せいかつ}している。", cn: "生活在人终有一死的状况之中。", en: "Living in the situation that everyone dies someday." },
						],
						answer: 1,
						explanation:
							"通读全段，作者反复说的是：自杀「手をのばせばすぐとどくところにある」、抛下日常生活「ありえないことではない」、没有理由也可能「死に向かって歩みだす」。也就是说，死亡随时都近在咫尺。结尾的「すれすれのところできわどく生きている」正是对这些的总结——我们其实一直走在随时可能跨过去的边缘上。所以 1 正确。",
						explanationEn:
							"Read through the whole paragraph and the writer keeps saying: suicide is “right there if you just stretch out your hand,” throwing everyday life away “is not impossible,” and with no special reason someone may “start walking toward death.” In other words, death is always close. The last line, “we are always living on the edge, just barely,” sums that up — we are always walking on an edge we could step over at any time. So 1 is correct.",
						choiceNotes: [
							"正确。全段都在说「死离我们只有一步之遥」。",
							"文中说的不是外部的危险物，而是「死」这一可能性就在身边。",
							"与原文完全相反——作者强调的正是死可以被「轻易」选择。",
							"「人终有一死」是自然规律，而作者说的是「随时可能跨过去」这种惊险感，注释「きわどく＝ぎりぎりの危ない状態で」也支持这一点。",
						],
						choiceNotesEn: [
							"Correct. The whole paragraph is about death being only a step away.",
							"The text is not about dangerous things around us, but about the possibility of death being close at hand.",
							"The opposite of the text — the writer stresses that death can be chosen “casually.”",
							"“Everyone dies someday” is a natural law; what the writer means is the dangerous feeling that you could step over at any time. The note “きわどく = in a barely-safe, dangerous state” supports this.",
						],
					},
				],
			},
		],
	},

	vocab: [
		{ jp: "睡眠", kana: "すいみん", cn: "睡眠", en: "sleep", pos: "名詞" },
		{ jp: "段階", kana: "だんかい", cn: "阶段", en: "a stage", pos: "名詞" },
		{ jp: "繰り返す", kana: "くりかえす", cn: "反复", en: "to repeat", pos: "動詞" },
		{ jp: "熟睡", kana: "じゅくすい", cn: "熟睡", en: "sound sleep", pos: "名詞・動詞" },
		{ jp: "移行する", kana: "いこうする", cn: "过渡、转移", en: "to shift; to move over", pos: "動詞" },
		{ jp: "延びる", kana: "のびる", cn: "延长", en: "to lengthen", pos: "動詞" },
		{ jp: "ストレス", cn: "压力", en: "stress", pos: "名詞" },
		{ jp: "思い当たる", kana: "おもいあたる", cn: "想起来、有同感", en: "to recall; to recognize in oneself", pos: "動詞" },
		{ jp: "実験", kana: "じっけん", cn: "实验", en: "an experiment", pos: "名詞・動詞" },
		{ jp: "楽天的", kana: "らくてんてき", cn: "乐天的", en: "optimistic", pos: "な形" },
		{ jp: "自我", kana: "じが", cn: "自我", en: "the self; ego", pos: "名詞" },
		{ jp: "最上", kana: "さいじょう", cn: "最好的", en: "the best", pos: "名詞" },
		{ jp: "隣りあわせ", kana: "となりあわせ", cn: "毗邻、紧挨着", en: "next door to; side by side with", pos: "名詞" },
		{ jp: "自殺", kana: "じさつ", cn: "自杀", en: "suicide", pos: "名詞・動詞" },
		{ jp: "異常", kana: "いじょう", cn: "异常", en: "abnormal", pos: "な形" },
		{ jp: "投げ出す", kana: "なげだす", cn: "抛下、放弃", en: "to throw away; to give up on", pos: "動詞" },
		{ jp: "面倒くさい", kana: "めんどうくさい", cn: "麻烦、烦人", en: "a pain; too much trouble", pos: "い形" },
		{ jp: "すれすれ", cn: "擦边、几乎相碰", en: "just barely; on the edge", pos: "名詞" },
		{ jp: "きわどい", cn: "千钧一发的、危险的", en: "narrow; dangerous; close", pos: "い形" },
		{ jp: "悩む", kana: "なやむ", cn: "烦恼", en: "to worry; to be troubled", pos: "動詞" },
	],

	grammar: [
		{
			pattern: "〜すら（＝〜さえ）",
			formation: "名詞 ＋ すら",
			meaning: "连……都。书面语，强调极端的例子。",
			meaningEn: "Even …. Written style; emphasizes an extreme case.",
			example: { jp: "{夢|ゆめ}を{見|み}たことすら{忘|わす}れてしまいます。", cn: "连做过梦这件事都会忘掉。", en: "You even forget that you dreamed at all." },
		},
		{
			pattern: "〜ほど〜",
			formation: "普通形 ＋ ほど",
			meaning: "越……越……。用于表示比例关系。",
			meaningEn: "The more …, the more …. Used for a proportional relationship.",
			example: { jp: "ストレスの{多|おお}い{人|ひと}ほどよく{夢|ゆめ}を{見|み}る。", cn: "压力越大的人越常做梦。", en: "The more stress someone has, the more they dream." },
		},
		{
			pattern: "〜のではあるまいか",
			meaning: "难道不是……吗？「〜のではないだろうか」的书面、文语说法，用反问强调主张。",
			meaningEn: "Is it not …? A written, slightly classical form of “〜のではないだろうか,” using a rhetorical question to stress a claim.",
			example: {
				jp: "{手|て}をのばせばすぐとどくところにある{世界|せかい}なのではあるまいか。",
				cn: "难道不是一伸手就能够到的世界吗？",
				en: "Is it not a world that is right there if you just stretch out your hand?",
			},
			note: "与第 3 日学的「〜のではないだろうか」同类，都是用疑问形式表达断定。",
			noteEn: "The same family as “〜のではないだろうか” from Day 3: a question form that states a conclusion.",
		},
		{
			pattern: "〜ありえないことではない",
			meaning: "并非不可能。双重否定，实际是「有可能」。",
			meaningEn: "It is not impossible. A double negative that really means “it is possible.”",
			example: {
				jp: "{人|ひと}は{日常生活|にちじょうせいかつ}を{投|な}げだすこともありえないことではない。",
				cn: "人抛下日常生活这种事也并非不可能。",
				en: "It is not impossible for a person to throw everyday life away.",
			},
			note: "双重否定要还原成肯定来理解——这是读解常考点。",
			noteEn: "Turn a double negative back into a positive — a common reading-comprehension point.",
		},
		{
			pattern: "〜ば〜ほど／〜ば〜も",
			meaning: "如果……就……。表示条件与结果的连动。",
			meaningEn: "If …, then also …. Marks a condition and the result that goes with it.",
			example: { jp: "{眠|ねむ}る{時間|じかん}が{長|なが}ければレム{睡眠|すいみん}の{長|なが}さも{延|の}びます。", cn: "睡眠时间越长，REM 睡眠也会延长。", en: "If you sleep longer, REM sleep also lengthens." },
		},
		{
			pattern: "〜ように",
			formation: "動詞辞書形 ＋ ように",
			meaning: "像……一样。表示比喻。",
			meaningEn: "As if … / the way …. Marks a comparison.",
			example: { jp: "{道路|どうろ}の{白線|はくせん}をまたぐように", cn: "就像跨过马路上的白线一样", en: "the way you step over a white line on the road" },
		},
		{
			pattern: "〜そうです（伝聞）",
			meaning: "据说……。本文多处引用研究结果时使用。",
			meaningEn: "It is said that …. Used here in several places when citing research.",
			example: { jp: "レム{睡眠|すいみん}が{長|なが}くなるそうです。", cn: "据说 REM 睡眠会变长。", en: "REM sleep is said to get longer." },
		},
		{
			pattern: "〜ず（に）",
			meaning: "不……（就）。书面否定形。",
			meaningEn: "Without …-ing. Written negative.",
			example: { jp: "{何|なに}も{考|かんが}えず、バタンキューと{眠|ねむ}ってしまう", cn: "什么都不想，倒头就睡", en: "falling asleep in a heap without thinking about anything" },
		},
	],
};
