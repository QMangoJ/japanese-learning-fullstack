import type { Bilingual, Usage } from "./n3-daily-summaries";

// Authored comparisons, not replacements for the textbook. Levels are study
// references for the stated sense, not official JLPT assignments or frequencies.
export type RelatedRow = readonly [
	form: string, level: "N5" | "N4" | "N3" | "N2" | "N1", usage: Usage,
	connection: string, zh: string, en: string, jp: string, translationZh: string, translationEn: string,
];
export type RelatedGroup = { title: Bilingual; tip: Bilingual; rows: readonly RelatedRow[] };

export const N3_RELATED_GRAMMAR: Record<string, RelatedGroup> = {
	"1-1": {
		title: ["被动、使役与许可", "Passive, causative and permission"],
		tip: ["受身看谁受影响；使役看谁让别人做；请求许可看谁要亲自做。", "Separate the person affected, the person making someone act, and the person asking to act."],
		rows: [
			["～させられる", "N4", "common", "使役＋受身", "比普通受身多一层‘被要求做’；弟に起こされた是被弟弟叫醒，弟を起こさせられた是被要求叫醒弟弟。", "Adds being made to act: 弟に起こされた means my brother woke me; 弟を起こさせられた means I was made to wake him.", "私は先生に作文を書かせられた。", "老师让我写了作文（非我本意）。", "I was made to write an essay by my teacher."],
			["～てもいい", "N5", "everyday", "Vて＋もいい", "与させてください都能请求许可；てもいいですか询问是否允许，させてください直接请求让自己做。", "Both can request permission. てもいいですか asks whether an action is allowed; させてください asks to be allowed to do it.", "ここに座ってもいいですか。", "我可以坐在这里吗？", "May I sit here?"],
			["～てもらう", "N4", "everyday", "人に＋Vて＋もらう", "强调别人替我做、我接受帮助，不是我被迫做；与迷惑受身的受害视角不同。", "Presents another person's action as help received, rather than an imposition or an adverse passive event.", "友達に作文を直してもらった。", "我请朋友帮忙修改了作文。", "I had a friend correct my essay."],
		],
	},
	"1-2": {
		title: ["义务、事先准备与结果", "Obligation, preparation and result"],
		tip: ["ないと／なくちゃ是口语省略；ちゃう是しまう；とく是ておく。缩约前先看原形。", "First expand the contractions: ないと／なくちゃ express obligation, ちゃう is しまう, and とく is ておく."],
		rows: [
			["～なければならない", "N4", "common", "Vない去ない＋なければならない", "与なくちゃ表达同类义务；句子完整、较郑重。なくちゃ更像日常自言自语或随口提醒。", "The full, more deliberate obligation form behind casual なくちゃ. The contraction suits informal reminders and self-talk.", "明日までに申し込まなければならない。", "必须在明天之前报名。", "I must apply by tomorrow."],
			["～てある", "N4", "common", "他動詞て＋ある", "ておく强调事先采取动作；てある强调有人有意做过后，准备好的状态仍在。", "ておく focuses on preparing in advance; てある describes the resulting state left by an intentional action.", "資料は印刷してある。", "资料已经打印好了。", "The handouts have been printed and are ready."],
			["～てみる", "N4", "everyday", "Vて＋みる", "不是‘提前做’，而是‘试着做，看结果’。予約しておく是先预约，予約してみる是试试看能否预约。", "Means trying an action to see what happens, not doing it in advance. 予約しておく prepares; 予約してみる tries making a reservation.", "別の方法で調べてみる。", "我试着换一种方法查查。", "I'll try looking it up another way."],
		],
	},
	"1-3": {
		title: ["像、看起来与容易出现的倾向", "Resemblance, appearance and tendencies"],
		tip: ["不要只背‘好像’：分清观察到的样子、间接判断、典型特征和反复发生的倾向。", "Distinguish immediate appearance, indirect inference, typical qualities and recurring tendencies."],
		rows: [
			["～ようだ", "N4", "common", "普通形／Nの／ナ形な＋ようだ", "与みたいだ都能比喻或推测；ようだ较中性、可用于书面，みたいだ更口语。名词前接法不同：子供のよう／子供みたい。", "Like みたいだ, expresses resemblance or inference, but suits neutral writing as well as speech. Note 子供のよう versus 子供みたい.", "この雲は猫のようだ。", "这朵云像一只猫。", "This cloud looks like a cat."],
			["～そうだ（样态）", "N4", "everyday", "Vます去ます／イ形去い／ナ形＋そうだ", "主要说眼前印象或即将发生的迹象；与根据多种线索推测的ようだ、みたいだ不同。おいしそう是看着好吃，还没尝。", "Describes an immediate impression or signs of an impending event. おいしそう means it looks tasty, not that you have tasted it.", "このケーキはおいしそうだ。", "这块蛋糕看起来很好吃。", "This cake looks delicious."],
			["～がち", "N3", "common", "Vます去ます／N＋がち", "强调某事经常出现，常带不理想评价；っぽい多说性质或容易如此的特征。忘れがち偏频率，忘れっぽい偏人的性格。", "Focuses on a recurring, often undesirable tendency. 忘れがち stresses frequently forgetting; 忘れっぽい describes a forgetful disposition.", "冬は運動不足になりがちだ。", "冬天容易缺乏运动。", "In winter, we tend not to get enough exercise."],
			["～気味", "N3", "situational", "Vます去ます／N＋気味", "表示稍微出现某种状态，常指疲劳、感冒等；不是っぽい的‘像某物’或がち的反复倾向。", "Marks a slight degree of a condition, often fatigue or illness, rather than resemblance or a recurring habit.", "今日は少し疲れ気味だ。", "今天有点疲惫。", "I'm feeling a little tired today."],
		],
	},
	"1-4": {
		title: ["目的、决定与变化", "Purpose, decisions and change"],
		tip: ["为了做到＝目的；主动决定＝意志；终于能做到＝能力或习惯变化。", "Separate a goal, a deliberate decision, and a change in ability or habit."],
		rows: [
			["～ために（目的）", "N4", "common", "Vる／Nの＋ために", "通常前后是同一行动者，为实现可控制的目标而行动；ように常接可能形、ない形或非意志结果。", "Usually links the same actor's action to a controllable goal. ように often introduces ability, avoidance or a non-volitional outcome.", "留学するために、お金を貯めている。", "为了留学，我正在存钱。", "I'm saving money in order to study abroad."],
			["～ことにする", "N4", "everyday", "Vる／Vない＋ことにする", "明确作出决定；ようにする强调努力做到、注意做到。毎日歩くことにした侧重决定，歩くようにしている侧重坚持。", "Marks a decision, whereas ようにする stresses making an effort. ことにした decides on daily walks; ようにしている keeps up the practice.", "毎朝歩くことにした。", "我决定每天早晨散步。", "I've decided to walk every morning."],
			["～ことになる", "N4", "common", "Vる／Vない＋ことになる", "指安排、商议等形成的结果，不等于ようになる的能力或习惯变化。", "Describes an arrangement or decision reached, not the change in ability or habit expressed by ようになる.", "来月から大阪で働くことになった。", "已经定下来，我下个月开始在大阪工作。", "It has been arranged that I'll work in Osaka from next month."],
		],
	},
	"1-5": {
		title: ["照着做、直接要求与愿望", "Following a model, requesting and wishing"],
		tip: ["本日的ように有多个功能，不能把它们都替换成同一个表达。", "Today's ように has several functions; no single alternative replaces them all."],
		rows: [
			["～とおりに", "N3", "common", "Vる・Vた／Nの＋とおりに", "与‘先生が言ったように’接近，但更强调按原样、不偏离；ように可以只是大致照那样。", "Close to 先生が言ったように, but stresses following the model exactly; ように may allow a looser resemblance.", "説明書に書いてあるとおりに組み立ててください。", "请按照说明书上写的步骤组装。", "Please assemble it exactly as the instructions say."],
			["～てください", "N5", "everyday", "Vて＋ください", "直接向对方请求动作；文末ように常用于指示、叮嘱，省略了してください等，不一定更礼貌。", "Directly requests an action. Sentence-final ように often gives an instruction or reminder and is not automatically more polite.", "明日は早めに来てください。", "明天请早点来。", "Please come a little early tomorrow."],
			["～といい", "N3", "everyday", "普通形＋といい", "与祈愿的ますように都可表达希望；といいな像说‘要是这样就好了’，ますように更像祈祷。", "Both can express hopes. といいな says it would be nice if something happened; ますように has a prayer-like tone.", "明日は晴れるといいな。", "明天要是晴天就好了。", "I hope it's sunny tomorrow."],
		],
	},
	"1-6": {
		title: ["打算、尝试与临近动作", "Plans, attempts and imminent actions"],
		tip: ["意志形＋と思う是意向；＋とする是尝试或正要；计划不能与尝试混为一谈。", "Volitional + と思う expresses intention; + とする can describe an attempt or an imminent act."],
		rows: [
			["～つもりだ", "N4", "everyday", "Vる／Vない＋つもりだ", "通常已有较明确的计划；意志形＋と思う也能表示当下刚产生的意向。两者都不保证真的实行。", "Usually indicates a more settled plan; volitional + と思う can express a newly formed intention. Neither guarantees action.", "夏休みに北海道へ行くつもりだ。", "我打算暑假去北海道。", "I intend to go to Hokkaido during summer break."],
			["～てみる", "N4", "everyday", "Vて＋みる", "强调实际试做以观察效果；開けようとした只表示尝试打开，可能连开都没打开。", "Means trying an action to see the result. 開けようとした can describe an attempt that never succeeded in opening anything.", "この鍵で開けてみよう。", "用这把钥匙试着开一下吧。", "Let's try opening it with this key."],
			["～ところだ", "N4", "everyday", "Vる＋ところだ", "表示正处在即将开始的阶段，不强调努力尝试；ようとしている还可用于非意志变化，如春が来ようとしている。", "Locates an action just before its start without emphasizing an attempt. ようとしている also allows impending non-volitional changes.", "今から出かけるところだ。", "我现在正准备出门。", "I'm just about to go out."],
		],
	},
	"2-1": {
		title: ["限定范围与举极端例子", "Restriction and extreme examples"],
		tip: ["だけ／しか限制范围；さえ／すら强调极端例子；でも还可以提出随意的一个选择。", "だけ／しか restrict a set; さえ／すら highlight an extreme case; でも can also offer a casual option."],
		rows: [
			["～だけ", "N5", "everyday", "N／普通形＋だけ", "中性地说只有这些；しか必须搭配否定，常更突出‘除此之外没有’；ばかり常表示几乎清一色，并非精确数量限定。", "Neutrally limits the set. しか requires a negative and excludes other possibilities; ばかり often means overwhelmingly one kind rather than an exact limit.", "参加者は三人だけだった。", "参加者只有三个人。", "There were only three participants."],
			["～すら", "N1", "formal", "N（＋助詞）＋すら", "与さえ都能举极端例子，但更书面、强调更强；初学时用さえ通常更自然。", "Like さえ, selects an extreme case, but is more literary and emphatic. さえ is usually the more natural conversational choice.", "忙しくて、昼食を取る時間すらない。", "忙得连吃午饭的时间都没有。", "I'm so busy I don't even have time for lunch."],
			["～でも（举例）", "N4", "everyday", "N＋でも", "可表示‘连……也’，也可表示‘……之类’。お茶でもどう不强调极端，不能直接换成さえ。", "Can mean even, but also something like. お茶でもどう offers tea as one option and cannot simply use さえ.", "お茶でも飲みませんか。", "要不要喝杯茶什么的？", "Would you like some tea or something?"],
		],
	},
	"2-2": {
		title: ["讨论对象与消息来源", "Topic and information source"],
		tip: ["について／に関して引出主题；によると引出信息来源。主题相近不代表句法相同。", "について／に関して introduce a topic; によると introduces a source."],
		rows: [
			["～をめぐって", "N2", "formal", "N＋をめぐって", "比について多了围绕问题进行讨论、争议等的含义，不适合只做简单介绍的句子。", "Adds discussion or competing positions surrounding an issue; it is not a neutral substitute in every simple introduction.", "新しい制度をめぐって議論が続いている。", "围绕新制度的讨论仍在继续。", "Debate over the new system is continuing."],
			["～そうだ（传闻）", "N4", "everyday", "普通形＋そうだ", "传递听到的信息；によると只是标明来源，常与そうだ搭配。注意传闻是降るそうだ，样态是降りそうだ。", "Reports received information; によると names its source and can be used with it. Contrast hearsay 降るそうだ with impending 降りそうだ.", "予報によると、明日は雪が降るそうだ。", "据天气预报说，明天会下雪。", "According to the forecast, it will snow tomorrow."],
			["～とのことだ", "N2", "formal", "普通形＋とのことだ", "也是转述，但更像通知、邮件中的‘据告知’；不表达样态そうだ那种眼前判断。", "A more report-like way to relay information, common in notices and messages, not an immediate visual impression.", "会議は中止とのことです。", "据通知，会议取消了。", "We have been informed that the meeting is cancelled."],
		],
	},
	"2-3": {
		title: ["名词化：事实、感受与特征", "Nominalization: facts, sensations and qualities"],
		tip: ["こと／の不能处处互换；さ多表示可衡量的程度，み常是词汇化的性质或感受。", "こと and の are not universally interchangeable; さ often expresses degree, while み forms established quality or sensation nouns."],
		rows: [
			["～ということ", "N4", "common", "普通形＋ということ", "把一句话的内容当作事实、消息来谈；直接感知动作通常用の，如走っているのを見た，不说ことを見た。", "Packages a proposition as a fact or message. Directly perceiving an action normally takes の, as in 走っているのを見た.", "彼が来ないということを今知った。", "我刚知道他不来的消息。", "I've just learned that he isn't coming."],
			["～のは～だ", "N4", "everyday", "普通形／ナ形な＋のは～だ", "把前半句名词化，再把后项作为要强调的答案；不同于こと单纯把动作当作事情来谈。", "Nominalizes the first clause and puts the focused answer after は, rather than merely naming an activity with こと.", "私が買ったのは、この辞書です。", "我买的是这本词典。", "What I bought was this dictionary."],
		],
	},
	"2-4": {
		title: ["命名、定义与口语引用", "Naming, definitions and casual quotation"],
		tip: ["名字用という；解释概念用というのは／とは；って省略了什么，要看后半句。", "という names; というのは／とは define; the role of casual って depends on what follows."],
		rows: [
			["～とは（定义）", "N2", "formal", "N＋とは", "相当于较凝练的というのは，用于解释概念；不是所有という都能替换，如田中という人不能写成田中とは人。", "A concise definition marker like というのは. It cannot replace the naming construction in 田中という人.", "敬語とは、相手への敬意を表す言葉遣いです。", "所谓敬语，就是表达对对方敬意的措辞方式。", "Honorific language is a way of speaking that expresses respect for others."],
			["～って", "N3", "everyday", "N／普通形＋って", "口语中可代引用的と，也可代话题的というのは；写正式文章时要还原其具体功能。", "In speech it can replace quotative と or introduce a topic like というのは. Formal writing should make the intended function explicit.", "リモートワークって、どういう意味？", "‘远程办公’是什么意思？", "What does remote work mean?"],
		],
	},
	"2-5": {
		title: ["改说法、让步与联想", "Rephrasing, concession and association"],
		tip: ["というより是改用更准确的描述；といっても是缩小听者预期；というと是由话题联想到例子。", "というより replaces a description; といっても lowers an expectation; というと introduces an association."],
		rows: [
			["むしろ", "N3", "common", "むしろ＋句子", "强调后项更贴切或更值得选择，可与というより搭配；它本身是副词，不负责连接两个名词。", "Highlights a more fitting description or preference, and can accompany というより. As an adverb it does not itself link two nouns.", "彼は先生というより、むしろ友達に近い。", "与其说他是老师，不如说更像朋友。", "He's closer to a friend than a teacher."],
			["～とはいえ", "N1", "formal", "普通形＋とはいえ", "承认前项仍提出限制或相反判断，比といっても更书面；并不表示改正前项名称。", "Concedes the first point before adding a limitation or contrary judgment. More written than といっても, not a correction of a label.", "春とはいえ、朝はまだ寒い。", "虽说是春天，早晨仍然很冷。", "Although it's spring, mornings are still cold."],
		],
	},
	"2-6": {
		title: ["建议试做、命令与委婉请求", "Invitations to try, commands and polite requests"],
		tip: ["てごらん不是对谁都能用；长辈对晚辈的提示，不能直接当作礼貌请求。", "てごらん often addresses someone junior; it is not a universally polite request."],
		rows: [
			["～てみてください", "N4", "everyday", "Vて＋みてください", "邀请对方试着做，比てごらん适用对象更广；仍是请求试做，不是传达第三人的命令。", "Invites someone to try and works with a wider range of listeners than てごらん. It does not report a third person's command.", "この辞書を使ってみてください。", "请试着用一下这本词典。", "Please try using this dictionary."],
			["～なさい", "N4", "common", "Vます去ます＋なさい", "常见于家长、老师的指令，比てごらん更有要求性；不是对上级使用的敬语。", "Often a parent's or teacher's instruction, more directive than てごらん; it is not respectful language for addressing a superior.", "宿題を先に終わらせなさい。", "先把作业做完。", "Finish your homework first."],
			["～ていただけませんか", "N4", "situational", "Vて＋いただけませんか", "请求对方帮忙，比てくれ礼貌得多；てくれと頼まれた是引用别人提出的请求，不是在礼貌地请求眼前的人。", "Politely asks for help. てくれと頼まれた reports someone else's request; it does not politely request the current listener's help.", "もう一度説明していただけませんか。", "能请您再解释一遍吗？", "Could you please explain it once more?"],
		],
	},
	"3-1": {
		title: ["让步、意外与‘不做而做’", "Concession, surprise and doing without"],
		tip: ["ても可设假设；のに通常谈已经成立的事实；ずに表示伴随方式，不是转折。", "ても can be hypothetical; のに normally presents an established fact; ずに describes an accompanying absence, not a contrast."],
		rows: [
			["～のに", "N4", "everyday", "普通形／Nな／ナ形な＋のに", "常对已知事实后的反常结果表达意外或不满；ても不一定承认前项已发生。", "Often conveys surprise or dissatisfaction at an unexpected result of an established fact; ても need not assert that the first event occurred.", "何度も説明したのに、伝わらなかった。", "明明解释了好多遍，却没能让对方明白。", "Even though I explained it many times, I couldn't get the point across."],
			["～ものの", "N2", "formal", "普通形／ナ形な＋ものの", "承认前项事实但后项未如预期，较书面、克制；可近似のに，但没有那么强的抱怨口气。", "Acknowledges a fact before an unmet expectation, in a restrained written style; often less openly complaining than のに.", "申し込んだものの、まだ返事がない。", "虽然已经报名，但还没有收到回复。", "Although I've applied, I haven't received a reply yet."],
			["～ないで", "N4", "everyday", "Vない＋で", "表示不做A而做B时，与ずに接近且更口语；请求‘请不要’用ないでください，不能直接换成ずにください。", "Close to ずに when doing B without A, but more conversational. Requests use ないでください, not ずにください.", "朝ご飯を食べないで出かけた。", "没吃早饭就出门了。", "I went out without eating breakfast."],
		],
	},
	"3-2": {
		title: ["身份、评价标准与假设让步", "Role, evaluation standards and hypothetical concession"],
		tip: ["として看身份；にしては看预期标准；としたら设条件；としても不让结论随条件改变。", "として marks a role; にしては a standard; としたら a condition; としても keeps a conclusion despite that condition."],
		rows: [
			["～わりに", "N3", "common", "普通形／Nの／ナ形な＋わりに", "与にしては都说超出预期；わりに常比较程度与结果，にしては常按某个身份、年龄等作评价。", "Both indicate a mismatch with expectations. わりに often compares degree with outcome; にしては often evaluates against a category or status.", "この店は値段のわりに量が多い。", "这家店按这个价位来说分量很足。", "This restaurant gives large portions for the price."],
			["～としても", "N3", "common", "普通形＋としても", "即使假定前项成立，结论仍然如此；としたら只建立假设，后项可能随它改变。", "Even granting the premise, the conclusion remains. としたら simply sets up a hypothesis whose consequences are then considered.", "雨が降るとしても、試合は行われる。", "即使下雨，比赛也会举行。", "Even if it rains, the match will take place."],
			["～にとって", "N3", "common", "N＋にとって", "从某人立场作价值判断；として说以什么身份行动。学生にとって大切与学生として学ぶ不能交换。", "Gives a viewpoint for evaluation, whereas として gives the role in which one acts. Compare 学生にとって大切 and 学生として学ぶ.", "私にとって、この経験は大切だ。", "对我而言，这段经历很重要。", "This experience matters to me."],
		],
	},
	"3-3": {
		title: ["推断、劝告与过去习惯", "Inference, advice and past habits"],
		tip: ["应该会是推断；应该做是建议。中文都叫‘应该’，日语不能混用。", "An expected event and a recommended action require different Japanese patterns."],
		rows: [
			["～に違いない", "N3", "common", "普通形（N・ナ形不加だ）＋に違いない", "表示说话人很确信的判断；はず强调根据计划、规则或已知信息推导出的预期。", "Expresses a strongly held conclusion; はず emphasizes what is expected from plans, rules or known information.", "電気がついている。誰かいるに違いない。", "灯亮着，肯定有人在。", "The light is on. Someone must be there."],
			["～たほうがいい", "N5", "everyday", "Vた／Vない＋ほうがいい", "比べき更像针对当前情况的建议；べき带义务、原则或理所应当的判断，直接对人说可能显得强硬。", "More situational advice than べき, which invokes duty or principle and can sound forceful when directed at someone.", "今日は早く寝たほうがいい。", "今天最好早点睡。", "You should go to bed early today."],
			["～ていた", "N4", "everyday", "Vて＋いた", "可中性叙述过去习惯；たものだ多了一层回忆感，并不是过去发生一次就能使用。", "Can neutrally describe a past habit; たものだ adds a recollective tone and is not used just for a single past occurrence.", "学生のころ、毎朝走っていた。", "学生时代，我每天早晨都跑步。", "When I was a student, I used to run every morning."],
		],
	},
	"3-4": {
		title: ["顺便、每次与紧接着", "Along the way, every time and immediately after"],
		tip: ["先分‘同时做’与‘顺便做’，再分规律性重复和某一次突然发生。", "Distinguish simultaneous actions from an extra errand, and repetition from a single sudden event."],
		rows: [
			["～ながら", "N4", "everyday", "Vます去ます＋ながら", "两件事同时进行；ついでに是借主要事情的机会顺便做另一件，不要求动作在同一时刻发生。", "Two actions overlap in time. ついでに uses the opportunity of a main activity for another task, without requiring simultaneity.", "音楽を聞きながら料理する。", "一边听音乐一边做饭。", "I cook while listening to music."],
			["～ごとに", "N3", "common", "N／Vる＋ごとに", "与たびに都能表示每次；ごとに还可按固定单位划分。三日ごとに是每隔三天一次，たびに不能直接这样接数量。", "Like たびに, can mean each time, but also divides fixed units. 三日ごとに means every three days; たびに cannot directly take that quantity.", "一ページ読むごとにメモを取る。", "每读一页就做笔记。", "I take notes after each page I read."],
			["～次第", "N2", "formal", "Vます去ます＋次第", "表示前项完成后立即采取后项行动，常用于安排；たとたん常说意外变化，不适合表达自己的计划。", "Promises or schedules an action as soon as another is complete. たとたん typically reports an unexpected event rather than a plan.", "結果が分かり次第、ご連絡します。", "结果一出来，我就联系您。", "I'll contact you as soon as I know the result."],
		],
	},
	"3-5": {
		title: ["保持状态、故意准备与照原样", "Unchanged states, deliberate preparation and models"],
		tip: ["まま中性描述不变；っぱなし常突出一直持续或放着不管。", "まま neutrally describes an unchanged state; っぱなし often stresses prolonged action or neglect."],
		rows: [
			["～てある", "N4", "common", "他動詞て＋ある", "故意做过并留下结果；開けっぱなし常暗示该关却没关，開けてある可能是为了通风特意留着。", "Describes an intentional resulting state. 開けっぱなし can imply neglect; 開けてある may mean deliberately left open for ventilation.", "窓は少し開けてある。", "窗户特意留了一条缝。", "The window has been left slightly open on purpose."],
			["～続ける", "N4", "common", "Vます去ます＋続ける", "中性说动作持续；立ちっぱなし还突出一直站着、没有停歇，常伴随疲劳等评价。", "Neutrally marks continued action; 立ちっぱなし emphasizes standing without a break and often suggests fatigue.", "彼は二時間話し続けた。", "他连续讲了两个小时。", "He kept talking for two hours."],
			["～ように（方式）", "N4", "common", "Vる・Vた／Nの＋ように", "像某种方式那样做；とおりに更强调一致、按原样执行。画家のように描く不意味着精确临摹某张画。", "Means doing something in a similar manner; とおりに stresses exact correspondence. Painting 画家のように need not mean copying a picture.", "先生がやったように折ってください。", "请像老师刚才那样折。", "Please fold it the way the teacher did."],
		],
	},
	"3-6": {
		title: ["愿望、外在表现与装作", "Desire, outward signs and pretending"],
		tip: ["たい直接说愿望；たがる描写愿望表现；ふり是明知不符却装出样子。", "たい states desire; たがる describes signs of desire; ふり means knowingly pretending."],
		rows: [
			["～てもらいたい", "N4", "common", "人に＋Vて＋もらいたい", "与てほしい接近，但突出希望接受对方的帮助。晴れてほしい可以，晴れてもらいたい在普通天气描述中不自然。", "Like てほしい, but frames the desired action as help received. 晴れてほしい works; weather is not normally framed with てもらいたい.", "先生に作文を見てもらいたい。", "我希望老师帮我看看作文。", "I'd like my teacher to look over my essay."],
			["～げ", "N2", "situational", "部分イ形去い／ナ形＋げ", "描述显露出的神情，接续有词汇限制，如不安げ、悲しげ；不像ふり那样断定对方在假装。", "Describes an apparent look or manner, with lexical restrictions, as in 不安げ and 悲しげ. It does not assert deliberate pretense.", "彼女は不安げに時計を見た。", "她神情不安地看了看钟。", "She glanced at the clock with an anxious look."],
		],
	},
	"4-1": {
		title: ["立场、反预期与评价语气", "Viewpoint, expectations and evaluative tone"],
		tip: ["にとって不是动作对象；わりに可褒可贬，くせに通常带指责。", "にとって is not an action's target; わりに allows praise or criticism, while くせに usually blames."],
		rows: [
			["～に対して", "N3", "common", "N＋に対して", "标明态度或行为针对谁；にとって标明谁来评价。先生に対して失礼是对老师失礼，不是从老师的立场比较价值。", "Marks the target of an action or attitude, not the evaluator's viewpoint as にとって does.", "店員は客に対して丁寧に話す。", "店员对顾客说话很有礼貌。", "The staff speak politely to customers."],
			["～だけあって", "N2", "common", "普通形（N・ナ形不加だ）＋だけあって", "结果符合身份、经验等带来的期待，常用于称赞；わりに、にしては则突出和预期不一致。", "Often praises an outcome that lives up to status or experience, unlike the expectation mismatch in わりに or にしては.", "長年教えているだけあって、説明が分かりやすい。", "不愧是教了多年书，讲解很易懂。", "As you'd expect from years of teaching, the explanations are clear."],
			["～のに", "N4", "everyday", "普通形／Nな／ナ形な＋のに", "也能表达不满，但不必像くせに那样贬责某人。雨なのに出かけた可中性说意外，不能机械换くせに。", "Can express dissatisfaction without the personal reproach typical of くせに. Neutral surprise about rain does not call for くせに.", "よく練習したのに、緊張してしまった。", "明明认真练习了，还是紧张了。", "Even though I practiced well, I got nervous."],
		],
	},
	"4-2": {
		title: ["原因、代替与两面性", "Causes, substitution and trade-offs"],
		tip: ["原因先看结果评价：おかげ偏好，せい偏坏；かわりに还可能是补偿交换，而不是真人代替。", "おかげ favors beneficial results and せい unfavorable ones; かわりに may express a trade-off rather than replacing a person."],
		rows: [
			["～ために（原因）", "N4", "formal", "普通形／Nの／ナ形な＋ために", "较客观地说明原因，多见于公告；没有おかげ的感谢，也不必有せい的责怪。和目的用法要靠前后语义区分。", "Gives a relatively impersonal cause, common in notices, without gratitude or blame. Context distinguishes it from purpose ために.", "大雨のために、電車が遅れています。", "由于大雨，电车正在晚点。", "Trains are delayed due to heavy rain."],
			["～ばかりに", "N2", "situational", "普通形／Nである／ナ形な＋ばかりに", "强调就因为这个原因导致不幸结果，常有后悔；比せい更突出单一原因酿成后果。", "Highlights one cause leading to an unfortunate outcome, often with regret; stronger causal focus than simply blaming with せい.", "鍵を忘れたばかりに、家に入れなかった。", "就因为忘带钥匙，我进不了家。", "Just because I'd forgotten my key, I couldn't get into my home."],
			["～一方で", "N3", "common", "普通形／Nである／ナ形な＋一方で", "并列两方面，不要求交换或补偿；かわりに的代替义不能用它替换。", "Contrasts two aspects without requiring compensation or exchange. It cannot replace the substitution sense of かわりに.", "この町は便利な一方で、家賃が高い。", "这座城市很便利，但另一方面房租也高。", "This town is convenient, but rents are high."],
		],
	},
	"4-3": {
		title: ["程度、极端结果与同步变化", "Degree, extreme results and linked change"],
		tip: ["ほど／くらい描写程度；ば～ほど表达越A越B；并非所有同步变化都需要ば。", "ほど／くらい express degree; ば～ほど correlates increasing degrees; other patterns track simultaneous change."],
		rows: [
			["～くらい", "N3", "everyday", "普通形／N＋くらい", "程度义与ほど常可互换；没有Nほど～ない、ば～ほど这类固定比较格式，不能把这些ほど都换掉。", "Often interchangeable with ほど for degree, but not in fixed comparisons such as Nほど～ない or ば～ほど.", "声が出ないくらい驚いた。", "我惊讶得说不出话。", "I was so surprised I couldn't speak."],
			["～につれて", "N3", "common", "Vる／N＋につれて", "随着A变化，B也逐渐变化；ば～ほど着重两个程度的对应关系，不一定叙述实际时间变化。", "Tracks B changing as A changes; ば～ほど emphasizes a degree-to-degree relationship, not necessarily an actual progression over time.", "暗くなるにつれて、気温が下がった。", "随着天色变暗，气温下降了。", "As it grew dark, the temperature fell."],
			["～にしたがって", "N3", "common", "Vる／N＋にしたがって", "同步变化义接近につれて；另有遵从指示、规则的意思，那时不能换成につれて。", "Can track change like につれて, but also means following instructions or rules, a sense that につれて does not have.", "案内にしたがって、順番に入場してください。", "请按照指引依次入场。", "Please follow the instructions and enter in order."],
		],
	},
	"4-4": {
		title: ["无需、劝告与转述", "No need, advice and reported information"],
		tip: ["ことはない＝不必；ことだ＝劝告；ということだ＝转述或归纳，不能只凭こと来记。", "ことはない removes a need; ことだ advises; ということだ reports or concludes."],
		rows: [
			["～なくてもいい", "N4", "everyday", "Vない去ない＋なくてもいい", "表示不做也可以；ことはない常在对方担心或过度反应时说‘不必那样’。", "Allows an action to be omitted; ことはない often reassures someone that a worried or excessive response is unnecessary.", "明日は来なくてもいいです。", "明天不来也可以。", "You don't have to come tomorrow."],
			["～には及ばない", "N1", "formal", "Vる＋には及ばない", "‘不必’的正式说法，适合说明、郑重回应；日常安慰用ことはない更自然。", "A formal way of saying there is no need. ことはない is more natural for everyday reassurance.", "詳しく説明するには及びません。", "不必详细说明。", "There is no need to explain in detail."],
			["～べきだ", "N3", "common", "Vる＋べきだ（する也可すべき）", "比劝告的ことだ更强调应尽的责任、规范；不是预测将发生什么的はずだ。", "Stresses responsibility or norms more than advisory ことだ, and is not the expectation expressed by はずだ.", "間違いに気づいたら、訂正すべきだ。", "发现错误就应该更正。", "If you notice a mistake, you should correct it."],
		],
	},
	"4-5": {
		title: ["回想、不得已与解释理由", "Recollection, lack of choice and explanations"],
		tip: ["っけ在找回记忆；しかない在排除其他办法；もん带感情，不是正式理由说明。", "っけ retrieves a memory; しかない rules out alternatives; もん gives an emotional rather than formal justification."],
		rows: [
			["～かな", "N4", "everyday", "普通形＋かな", "表示不确定或自问，不要求以前知道；っけ通常是在回想或确认原本知道的信息。", "Expresses wondering without requiring prior knowledge; っけ usually recalls or confirms something previously known.", "明日は晴れるかな。", "不知道明天会不会晴。", "I wonder whether it'll be sunny tomorrow."],
			["～ざるを得ない", "N2", "formal", "Vない去ない＋ざるを得ない（する→せざる）", "与しかない都可表示别无选择，但更强调违背本意、不得不做；しかない也可中性指出唯一办法。", "Like しかない, can indicate no alternative, but more strongly suggests an unwanted necessity and is more formal.", "台風のため、旅行を中止せざるを得ない。", "因为台风，不得不取消旅行。", "Because of the typhoon, we have no choice but to cancel the trip."],
			["～ので", "N5", "everyday", "普通形／Nな／ナ形な＋ので", "较平和地交代理由；んだもん常含辩解、撒娇或强调情绪，不适合正式邮件。", "Gives a comparatively neutral reason; んだもん can sound defensive, pleading or emotional and is unsuitable for formal email.", "体調が悪いので、今日は休みます。", "身体不舒服，所以今天请假。", "I'm not feeling well, so I'll take today off."],
		],
	},
	"4-6": {
		title: ["换句话说与因果方向", "Reformulation and the direction of causality"],
		tip: ["つまり把内容归纳；そのため从原因走到结果；なぜなら回头解释理由。", "つまり summarizes; そのため moves from cause to effect; なぜなら looks back to give the reason."],
		rows: [
			["要するに", "N2", "common", "要するに＋句子", "与つまり都能概括，但更有‘省掉细节，重点是’的语感；不负责表达因果。", "Like つまり, summarizes, but more explicitly sets details aside to state the main point; it does not itself mark causation.", "要するに、準備が足りなかった。", "总之，就是准备不够。", "In short, we weren't prepared enough."],
			["したがって", "N2", "formal", "句子。したがって、句子", "从前提推出结论，常见于论证；その結果侧重实际发生的结果，不一定是逻辑推导。", "Introduces a conclusion drawn from a premise, common in reasoning. その結果 focuses on what actually resulted.", "全員が賛成した。したがって、この案を採用する。", "全员赞成，因此采用这个方案。", "Everyone agreed. Therefore, we will adopt this plan."],
		],
	},
	"5-1": {
		title: ["递进、比较与对照", "Addition, comparison and contrast"],
		tip: ["不仅A还B可中性追加，也可强调出乎意料的递进；比較与对照不完全相同。", "Not only A but B can be neutral addition or surprising escalation; comparison differs from contrast."],
		rows: [
			["～だけでなく", "N3", "everyday", "普通形（N・ナ形不加だ）＋だけでなく", "中性追加信息；ばかりか常强调进一步、甚至意外的程度，はもちろん把前项当作理所当然。", "Adds information neutrally. ばかりか often escalates, sometimes surprisingly; はもちろん takes the first item for granted.", "この店は安いだけでなく、おいしい。", "这家店不仅便宜，而且好吃。", "This restaurant is not only inexpensive but also good."],
			["～のみならず", "N2", "formal", "普通形／N＋のみならず", "‘不仅……而且……’的书面形式；口语通常用だけでなく，不必为了显得高级而替换。", "A written not only…but also construction. だけでなく is generally more natural in conversation.", "この問題は国内のみならず、海外でも注目されている。", "这个问题不仅在国内，在海外也受到关注。", "This issue is attracting attention abroad as well as at home."],
			["～一方で", "N3", "common", "普通形／Nである／ナ形な＋一方で", "并列不同方面或不同主体的对照；に比べて通常按同一维度比较大小、多少、程度。", "Contrasts different aspects or subjects; に比べて normally compares along a shared scale such as size or amount.", "兄は静かな一方で、弟はよく話す。", "哥哥很安静，而弟弟很健谈。", "The older brother is quiet, whereas the younger one is talkative."],
		],
	},
	"5-2": {
		title: ["刚完成与做到一半", "Just completed versus partly underway"],
		tip: ["完成表达看下方专组；这里分清たて的新鲜、たばかり的主观‘不久’和かける的未完成。", "See the completion group below; here distinguish freshness, a subjectively recent event and unfinished progress."],
		rows: [
			["～たばかり", "N4", "everyday", "Vた＋ばかり", "表示说话人觉得距发生还不久，甚至可以是几个月前；たて更强调新鲜状态，不能所有动词都自由接。", "The speaker regards the event as recent, possibly even months ago. たて emphasizes freshness and combines with a more restricted set of verbs.", "去年この会社に入ったばかりです。", "我去年才刚进这家公司。", "I only joined this company last year."],
			["～たところ", "N4", "everyday", "Vた＋ところ", "指眼下刚完成的时间点；たばかり是主观不久，たて强调做完后的新鲜品质。", "Marks an action completed just now; たばかり expresses subjective recency, while たて highlights freshness.", "今、メールを送ったところです。", "我刚刚把邮件发出去了。", "I've just sent the email."],
			["～ているところ", "N4", "everyday", "Vている＋ところ", "强调此刻正在做；かけ强调还没做完，动作可能已经停下。読みかけの本可能放了一个星期。", "Focuses on an action currently underway. かけ marks incompleteness even if the action has stopped; a half-read book may have sat untouched for a week.", "今、資料を読んでいるところです。", "我现在正在读资料。", "I'm reading the materials right now."],
		],
	},
	"5-3": {
		title: ["愿望、后悔与过去该做的事", "Hopes, regret and past obligations"],
		tip: ["未来希望用といい等；回看过去用ばよかった；べきだった还带‘本来就应当’的判断。", "Use といい and related forms for hopes, ばよかった for regret, and べきだった for an unfulfilled obligation."],
		rows: [
			["～ますように", "N3", "situational", "Vます／Vません＋ように", "像祈愿，希望不能完全由自己控制的结果；といいな更像日常感叹‘这样就好了’。", "Prayer-like hope, often for an outcome outside one's full control; といいな is a more conversational wish.", "試験に合格できますように。", "希望能通过考试。", "May I pass the exam."],
			["～べきだった", "N3", "common", "Vる＋べきだった", "不只是后悔结果不好，还认为当时理应这样做；ばよかった可只表达个人偏好的落空。", "Says the action was the right or required thing to do, not merely a missed preference as ばよかった can.", "約束を守るべきだった。", "当时应该遵守约定的。", "I should have kept my promise."],
			["～てよかった", "N4", "everyday", "Vて＋よかった", "庆幸实际做过的事；ばよかった通常遗憾没有做。撮ってよかった是拍了真好，撮ればよかった是早知道就拍了。", "Expresses relief about an action actually taken. 撮ってよかった means glad I took it; 撮ればよかった means I wish I had taken it.", "写真を撮ってよかった。", "幸好当时拍了照片。", "I'm glad I took a photo."],
		],
	},
	"5-4": {
		title: ["终点、期限、范围与‘连……也’", "Endpoints, deadlines, scope and even"],
		tip: ["まで有两个本课义项：持续到终点、连极端例子也。时间表达先问：一直持续，还是限时完成？", "Today's まで has two senses: continuation to an endpoint and an extreme example. For time, ask whether something continues or must be completed."],
		rows: [
			["～までに", "N4", "everyday", "时间／Vる＋までに", "在期限前完成某个动作；まで则动作持续到终点。五時まで働く＝工作到五点；五時までに出す＝最迟五点交。", "Sets a deadline for completion, not duration: 五時まで働く means work until five; 五時までに出す means submit by five.", "金曜日までに提出してください。", "请最迟在星期五提交。", "Please submit it by Friday."],
			["～うちに", "N3", "everyday", "普通形／Nの／ナ形な＋うちに", "趁某状态尚未改变就行动，边界常不是准确钟点；までに明确以某一终点为期限。", "Uses an opportunity before a state changes, often without an exact clock boundary; までに identifies a deadline.", "温かいうちに食べてください。", "请趁热吃。", "Please eat it while it's warm."],
			["～間に", "N4", "common", "Vる・Vている／Nの＋間に", "在某段期间内发生或完成；間强调贯穿期间的持续，間に不要求持续整段时间。", "Locates an occurrence or completion within an interval; 間 without に instead emphasizes continuation throughout it.", "留守の間に、荷物が届いた。", "我不在家时，包裹送到了。", "A parcel arrived while I was out."],
			["～にわたって", "N2", "formal", "期间・地域等N＋にわたって", "强调覆盖整个时间或地域范围；から～にかけて常给大致起止范围，不保证均匀覆盖每一点。", "Stresses extent across a whole period or area; から～にかけて gives a broad span without promising uniform coverage of every point.", "会議は三日間にわたって開かれた。", "会议历时三天举行。", "The conference was held over a three-day period."],
			["～さえ", "N3", "common", "N（＋助詞）＋さえ", "与‘连……也’的まで接近；まで常有范围扩大到意外终点的感觉，さえ把极端例子作为强调。", "Close to even-まで; まで often suggests the set extending to an unexpected endpoint, while さえ highlights an extreme case.", "忙しくて、水を飲む時間さえない。", "忙得连喝水的时间都没有。", "I'm so busy I don't even have time to drink water."],
			["～で（场所）", "N5", "everyday", "场所N＋で", "与地点用法的において意思接近，但更日常；において多用于典礼、报告等，不是普通会话的必要替换。", "The everyday counterpart of location において, which is more typical of ceremonies and reports than ordinary conversation.", "発表会は講堂で行います。", "发表会将在礼堂举行。", "The presentations will take place in the auditorium."],
		],
	},
	"5-5": {
		title: ["即使、可能与不完全肯定", "Even if, possibility and qualified claims"],
		tip: ["可能性低不等于不可能；不总是如此也不等于完全相反。", "Low possibility is not impossibility; not always true is not the same as wholly false."],
		rows: [
			["～たところで", "N2", "situational", "Vた＋ところで", "即使做了也未必有好结果，常带徒劳感；たとえ～ても可以表达积极坚持，没有这种限制。", "Often suggests that even doing something will not help. たとえ～ても can instead express positive determination.", "今から急いだところで、間に合わない。", "现在再怎么赶，也来不及了。", "Even if we hurry now, we won't make it in time."],
			["～わけではない", "N3", "common", "普通形／Nな／ナ形な＋わけではない", "否定对方可能推导出的判断；とは限らない强调不能一概断定，总有例外。二者有重叠，但否定焦点不同。", "Rejects a possible inference; とは限らない says a generalization is not guaranteed. They overlap but target different claims.", "嫌いなわけではないが、今日は食べたくない。", "并不是讨厌，只是今天不想吃。", "It's not that I dislike it; I just don't want to eat it today."],
			["～かのようだ", "N2", "formal", "普通形／Nである＋かのようだ", "表示仿佛如此，常暗示实际并非如此；まるで是加强比喻感的副词，可以和它同用。", "Presents an as-if impression, often unlike reality. まるで is an adverb that can intensify this comparison.", "まるで時間が止まったかのようだった。", "仿佛时间停止了一样。", "It was as if time had stopped."],
		],
	},
	"5-6": {
		title: ["逆接、意外、因果与换话题", "Contrast, surprise, consequence and topic shifts"],
		tip: ["だけど是转折；ところが常强调出乎意料；ところで直接换话题。", "だけど contrasts; ところが often introduces a surprise; ところで changes the subject."],
		rows: [
			["それでも", "N4", "everyday", "句子。それでも、句子", "承认前面的困难后仍坚持后项；ところが着重事态出乎预料，不一定有人坚持做事。", "Maintains the next claim despite a preceding difficulty; ところが focuses on an unexpected development, not necessarily persistence.", "雨は強かった。それでも、試合は続いた。", "雨下得很大，尽管如此比赛仍在继续。", "The rain was heavy. Even so, the match continued."],
			["ちなみに", "N2", "everyday", "ちなみに＋句子", "补充与当前话题相关的信息；ところで可以把话题明显转向另一件事。", "Adds a side note related to the current topic; ところで can move to a distinctly different subject.", "明日は休館です。ちなみに、月曜日も休みです。", "明天闭馆。顺便说一下，星期一也不开放。", "It's closed tomorrow. Incidentally, it's also closed on Mondays."],
		],
	},
	"6-1": {
		title: ["条件成立与让步后仍不变", "Conditional consequences versus concession"],
		tip: ["もし／もしも是加强假设的副词，本身不是句尾条件形式；条件成立后是否改变结论才是关键。", "もし／もしも are adverbs emphasizing a hypothesis, not clause-ending conditional forms; ask whether the conclusion changes."],
		rows: [
			["～たら", "N4", "everyday", "Vた／イ形かった／N・ナ形だった＋ら", "广泛用于假设或某事完成后；もし可以加强假设，但回忆实际先后发生的たら不必是假设。", "Broadly introduces a hypothesis or an event after completion. もし emphasizes hypothetical use, but a past sequence with たら need not be hypothetical.", "もし時間があったら、手伝ってください。", "如果有时间，请帮忙。", "If you have time, please help."],
			["～なら", "N4", "everyday", "普通形（N・ナ形不加だ）＋なら", "把话题或对方提供的信息当作前提；后项可先于前项行动，不像完成后顺接的たら。", "Takes a topic or supplied information as a premise; the recommended action can precede the event in that premise.", "京都へ行くなら、先に宿を予約したほうがいい。", "如果要去京都，最好先订好住宿。", "If you're going to Kyoto, you should book accommodation first."],
			["～たところで", "N2", "situational", "Vた＋ところで", "与としても都可表示即使，但通常预告无益或难以改变的结果；としても不限定为消极结果。", "Like としても, grants a hypothesis, but usually predicts futility or an unchanged unfavorable result; としても is not limited this way.", "今さら謝ったところで、失った信頼はすぐには戻らない。", "事到如今就算道歉，失去的信任也不会立刻恢复。", "Even an apology now won't immediately restore the lost trust."],
		],
	},
	"6-2": {
		title: ["决定、变化与有保留的肯定", "Decisions, change and qualified affirmation"],
		tip: ["ことにする是主动决定；ことになる把重点放在安排结果；双重否定通常是有限度的肯定。", "ことにする foregrounds a decision; ことになる its arrangement or outcome; double negatives often give only qualified affirmation."],
		rows: [
			["～ようになる", "N4", "everyday", "Vる／Vない＋ようになる", "能力、习惯或状态实际发生变化，不是公布安排。読めるようになった表示能读了，読むことになった只是安排要读。", "Marks a change in ability, habit or state, not an arrangement: 読めるようになった gains ability; 読むことになった schedules reading.", "新聞が読めるようになった。", "我已经能读报纸了。", "I've become able to read newspapers."],
			["～わけではない", "N3", "common", "普通形／Nな／ナ形な＋わけではない", "‘并不是……’是否定过度推论；ないことはない则是‘并非不能／完全不’，含蓄承认可行或存在。", "Rejects an overstatement. ないことはない instead tentatively acknowledges that something is possible or does exist.", "いつも忙しいわけではない。", "我并不是一直都很忙。", "I'm not always busy."],
			["～ことにしている", "N3", "common", "Vる／Vない＋ことにしている", "维持自己定下的规则；ようにしている偏努力保持，不一定已形成明确规则。", "Maintains a self-imposed rule; ようにしている emphasizes an effort that need not be a firm rule.", "夜九時以降は仕事をしないことにしている。", "我给自己定了规矩，晚上九点以后不工作。", "I make it a rule not to work after nine at night."],
		],
	},
	"6-3": {
		title: ["做后发现、差点发生与趁现在", "Discoveries, near misses and timely action"],
		tip: ["たところ后接发现的结果，与たところだ的‘刚做完’不同；ところだった要结合上下文判断是否差点。", "たところ introducing a discovery differs from just-completed たところだ; context determines a near-miss reading of ところだった."],
		rows: [
			["～たら（发现）", "N4", "everyday", "Vたら＋结果", "叙述做了之后发现什么，可与结果用法的たところ接近；たところ较书面，常用于调查、询问后的结果报告。", "Can report what was discovered after an action, like result-reporting たところ, which is more written and common after inquiries or checks.", "窓を開けたら、雪が積もっていた。", "打开窗户一看，外面已经积雪了。", "When I opened the window, I found snow on the ground."],
			["もう少しで～そうになった", "N2", "common", "もう少しで＋Vます去ます＋そうになった", "表示差一点发生而通常未发生；接续不同于Vるところだった。そうになった常着重危险或失控的迹象。", "Typically describes something that nearly happened but did not, often an involuntary or dangerous event; its verb form differs from Vるところだった.", "もう少しで階段から落ちそうになった。", "差一点从楼梯上摔下去。", "I nearly fell down the stairs."],
			["～てから", "N5", "everyday", "Vて＋から", "只说明先后顺序；てはじめて强调直到前项发生，才第一次获得后项认识、能力等。", "Only specifies sequence; てはじめて stresses that a realization or ability became possible only after the first event.", "日本に来てから、日本語の勉強を始めた。", "来日本后，我开始学习日语。", "I started studying Japanese after coming to Japan."],
		],
	},
	"6-4": {
		title: ["合乎道理、不可能与不能这样做", "Logical conclusions, impossibility and constraints"],
		tip: ["わけがない是否定可能；わけにはいかない是情理、责任上不允许，常常并非能力做不到。", "わけがない denies possibility; わけにはいかない invokes social or moral constraints, often despite practical ability."],
		rows: [
			["～はずだ", "N4", "everyday", "普通形／Nの／ナ形な＋はずだ", "根据已知条件推测理应如此；わけだ常在得知原因后说‘难怪’，用于解释已观察到的结果。", "Predicts what should be true from known conditions; わけだ often explains an observed result after learning the reason.", "もう出発したので、そろそろ着くはずだ。", "已经出发了，所以应该快到了。", "They've already left, so they should arrive soon."],
			["～っこない", "N2", "everyday", "Vます去ます＋っこない", "口语中强烈否定可能，接近わけがない；不能表示因为责任而不能做的わけにはいかない。", "A strong conversational denial of possibility, close to わけがない, not a duty-based restriction like わけにはいかない.", "一人で一日では終わりっこない。", "一个人一天之内绝对做不完。", "There's no way one person can finish it in a day."],
			["～かねる", "N2", "formal", "Vます去ます＋かねる", "因立场、规则或心理障碍而难以做，常用于礼貌拒绝；并非身体能力上的不会。", "A formal inability due to position, policy or reluctance, often used for polite refusals rather than physical inability.", "そのご質問にはお答えしかねます。", "您的这个问题，恕我无法回答。", "I'm afraid I cannot answer that question."],
		],
	},
	"6-5": {
		title: ["否定的程度、频率与决心", "Negative degree, frequency and determination"],
		tip: ["少しも／全然看程度；めったに看频率；決して常带坚决否定或承诺。", "少しも／全然 concern degree; めったに concerns frequency; 決して often adds firm denial or resolve."],
		rows: [
			["全然～ない", "N4", "everyday", "全然＋否定", "口语中表示一点也不，与まったく～ない接近；不是めったに～ない的‘偶尔还是会’。", "A conversational not at all, close to まったく～ない; unlike めったに～ない, it does not mean something occasionally occurs.", "この説明は全然分からない。", "这个解释我完全不懂。", "I don't understand this explanation at all."],
			["あまり～ない", "N4", "everyday", "あまり＋否定", "表示不太、不是很多，保留一定程度；少しも～ない是一点也没有，否定更彻底。", "Leaves some degree or amount: not very or not much. 少しも～ない is a stronger not at all.", "最近はあまりテレビを見ない。", "最近不怎么看电视。", "I don't watch much television these days."],
			["二度と～ない", "N3", "common", "二度と＋否定", "重点是一次之后不再发生；決して～ない可针对任何一次，不要求以前发生过。", "Means never again after a prior event; 決して～ない can deny any occurrence without requiring a previous one.", "同じ失敗は二度としない。", "不会再犯同样的错误。", "I won't make the same mistake again."],
		],
	},
	"6-6": {
		title: ["补充理由与提供选项", "Adding reasons and offering alternatives"],
		tip: ["それに／その上追加同方向的信息；それとも提出另一选项，通常在问句中。", "それに／その上 add information in the same direction; それとも offers another option, usually in questions."],
		rows: [
			["～し～し", "N4", "everyday", "普通形＋し", "列举多个理由或特点，并常暗示还有其他；それと偏补充项目，不一定在说理由。", "Lists reasons or qualities, often suggesting more exist; それと can simply add an item without presenting reasons.", "この部屋は明るいし、駅にも近い。", "这个房间很明亮，而且离车站也近。", "This room is bright, and it's close to the station too."],
			["または", "N4", "formal", "A＋または＋B", "中性连接可选项目，说明、规则中常见；それとも更像对话中追问‘还是另一个？’。", "Neutrally joins alternatives, common in instructions and rules; それとも more often asks conversationally whether the other option applies.", "鉛筆またはシャープペンシルを使ってください。", "请使用铅笔或自动铅笔。", "Please use a pencil or mechanical pencil."],
			["あるいは", "N2", "formal", "A＋あるいは＋B", "可列举选择，也可提出另一种可能，较书面；不是表示递进追加的その上。", "Offers an alternative or another possibility in a more written register; it does not add information cumulatively like その上.", "電話、あるいはメールでお知らせください。", "请通过电话或电子邮件告知。", "Please let us know by phone or email."],
		],
	},
};

export const RELATED_LEVEL_SOURCES = [
	["JLPT：不发布逐项清单 / No official itemized list", "https://www.jlpt.jp/e/faq/"],
	...[5, 4, 3, 2, 1].map(n => [`N${n}：教学分级 / N${n} · Teaching reference`, `https://jlptsensei.com/jlpt-n${n}-grammar-list/`] as const),
	["てある・N4 / てある · N4", "https://nihongokyoshi-net.com/2020/01/02/jlptn4-grammar-tearu/"],
	["ために・N4 / ために · N4", "https://nihongokyoshi-net.com/2019/03/05/jlptn4-grammar-tameni/"],
	["一方で・N3 / 一方で · N3", "https://bunpro.jp/grammar_points/292"],
	["には及ばない・N1 / には及ばない · N1", "https://nihongokyoshi-net.com/2019/07/07/jlptn1-grammar-niwaoyobanai/"],
	["要するに・N2 / 要するに · N2", "https://bunpro.jp/grammar_points/要するに"],
	["としても・N3 / としても · N3", "https://www.benri.jp/jlpt/n3/grammar/toshite-mo"],
	["二度と～ない・N3 / 二度と～ない · N3", "https://mainichi-nonbiri.com/grammar/n3-nidotonai/"],
] as const;
