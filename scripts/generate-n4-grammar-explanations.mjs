import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");

function q(n, ans, trans, trans_en, opts, opts_en, point, point_en, link, extra = {}) {
	return {
		n,
		ans,
		trans,
		trans_en,
		option_translations: opts,
		option_translations_en: opts_en,
		why: ["", "", "", ""],
		why_en: ["", "", "", ""],
		point,
		point_en,
		link,
		...extra,
	};
}

const data = {
	w1: {
		mondai1: [
			q(1, 2, "我母亲在教外国人日语的学校工作。", "My mother works at a school that teaches Japanese to foreigners.", ["在（方向/对象）", "在（场所/地点）", "往", "直到"], ["at / to (destination)", "at (place of action)", "toward", "until"], "场所用「で」。", "Use で for the place where an action happens.", "#/day/1-1/p0"),
			q(2, 1, "写一张报告竟然花了三个小时，太累了。", "It took a whole three hours to write one page of the report. That was tough.", ["居然（数量之多）", "只（后面要否定）", "比", "只"], ["as much as (emphasis)", "only (needs a negative)", "than", "only"], "「3時間も」强调时间之多。", "も after an amount stresses how large it is.", "#/day/1-5/p1"),
			q(3, 4, "进这个房间的时候请脱掉拖鞋。", "Please take off your slippers when you enter this room.", ["刚要…的时候", "在…期间", "就那样", "在…的时候"], ["just as", "while / during", "as is", "when"], "表示时间点用「ときには」。", "ときには marks the time when something happens.", "#/day/1-2/p0"),
			q(4, 3, "昨天开着窗就睡着了。", "Yesterday I fell asleep with the window left open.", ["一边开一边", "开了又…", "开着的状态", "正在开的时候"], ["while opening", "opening and …", "left open", "while opening"], "「Vたまま」表示保持该状态。", "Vたまま means the resulting state is left unchanged.", "#/day/1-4/p2"),
			q(5, 2, "那就每人拿两个吧。", "Then let's take two each.", ["只", "各、每", "即使", "比"], ["only", "each / apiece", "even", "than"], "平均分配用「ずつ」。", "ずつ means an equal share each.", "#/day/1-5/p2"),
			q(6, 1, "不过，没有山田家那么大。", "But it isn't as big as Yamada's house.", ["有…那么（后接否定）", "啦…啦", "即使", "更…"], ["as … as (with a negative)", "and so on", "even", "more than"], "「Nほど〜ない」表示达不到那个程度。", "Nほど〜ない means not as … as N.", "#/day/1-6/p0"),
			q(7, 1, "下个月要搬家，有点忙…", "I'm moving next month, so I'm a bit busy…", ["已经定下来要…", "有…这件事", "刚…完", "…的时候"], ["it has been decided that", "there is the matter of", "just after", "when"], "「Vることになって」表示既定安排。", "Vることになって marks a set arrangement.", "#/day/2-4/p0"),
			q(8, 3, "因为担心母亲的病，最近睡不好。", "I've been sleeping poorly lately because I'm worried about my mother's illness.", ["因为（理由从句）", "又…又", "因为（原因名词）", "光是"], ["because (clause)", "and also", "because of (noun)", "nothing but"], "「心配で」用「で」表示心理原因。", "で after 心配 marks the cause of a state.", "#/day/1-1/p1"),
			q(9, 4, "发了邮件也没回，有点担心。", "I emailed him, but he hasn't replied, so I'm a bit worried.", ["一直没来", "不来就", "没来之类", "又不来"], ["still hasn't come", "without coming", "sometimes doesn't come", "and he doesn't reply"], "「来ないし」并列说明没回信。", "し adds another reason: he doesn't reply.", "#/day/3-5/p1"),
			q(10, 3, "我和汤姆没说过话，所以不太清楚。", "I've never talked with Tom, so I don't really know.", ["有时不说", "决定要说", "从来没说过", "没安排要说"], ["sometimes don't talk", "make a point of talking", "have never talked", "aren't scheduled to talk"], "「Vたことがない」表示没有过该经历。", "Vたことがない means you have never done it.", "#/day/3-2/p0"),
		],
		mondai2: [
			q(11, 1, "从没下过那么大的雨，吓了一跳。", "It had never rained that hard before, so I was shocked.", ["从没…过", "那么地", "没有", "下"], ["have never", "that much", "did not", "fell (rain)"], "「あんなに降ったことがなかった」。", "あんなに + Vたことがない = had never … that much.", "#/day/3-2/p0", { order: "2→4→1→3" }),
			q(12, 1, "啊，好像是我在洗澡的时候你来了。", "Ah, it seems you came while I was in the bath.", ["正当…的时候", "来了", "正在进", "洗澡"], ["just when", "came", "is entering", "the bath"], "「おふろに入っているところに来た」。", "Vているところに = just when someone is doing something.", "#/day/2-5/p1", { order: "4→3→1→2" }),
			q(13, 4, "田中站着的人后面那个高个子是谁？", "Who is the tall person standing behind Tanaka?", ["站着的", "在后面", "人", "个子高的"], ["standing", "behind", "person", "tall"], "「うしろに立っている背の高い人」。", "Relative clauses stack before 人.", "#/day/4-1/p0", { order: "2→1→4→3" }),
		],
		mondai3: [
			q(14, 3, "因为父亲工作而定下来要去日本的时候，我并不太高兴。", "When it was decided we would go to Japan because of my father's job, I wasn't very happy.", ["如果有", "有…的时候", "如果变成", "变成…的时候"], ["if there is", "when there was", "if it becomes", "when it became"], "「来ることになったら」表示情况成立之后。", "Vることになったら = when it has been decided that.", "#/day/2-4/p0"),
			q(15, 1, "和学校朋友分开既会寂寞，又觉得生活会不方便。", "Being apart from my school friends would be lonely, and I thought life would be inconvenient.", ["会寂寞，而且", "变寂寞了，而且", "不会寂寞，而且", "变得不寂寞了"], ["will be lonely, and", "became lonely, and", "won't be lonely, and", "stopped being lonely"], "对尚未发生的事用「さびしくなるし」。", "なる looks ahead; し adds another reason.", "#/day/3-5/p1"),
			q(16, 3, "现在住的房子没有美国的家那么大。", "The house I live in now isn't as big as our house in America.", ["有…那么小", "比…宽", "没有…那么大", "并不比…小"], ["as small as", "wider than", "not as big as", "not smaller than"], "「Nほど大きくない」。", "Nほど大きくない = not as big as N.", "#/day/1-6/p0"),
			q(17, 4, "经常一起去买东西、吃饭什么的。", "We often go shopping and out to eat together.", ["正要去的时候", "去过这件事", "去了就一直", "去…什么的"], ["just as we go", "the fact of having gone", "went and stayed", "go and …"], "「買い物や食事に行ったりする」。", "Vたりする lists typical activities.", "#/day/1-4/p1"),
			q(18, 1, "明年要回美国，但我很期待在日本的生活。", "I go back to America next year, but I'm looking forward to life in Japan.", ["感到期待", "快乐", "正在享受", "会快乐吧"], ["look forward to", "is fun", "am enjoying", "is probably fun"], "对尚未到来的事用「楽しみです」。", "楽しみです looks ahead to something you await.", "#/day/2-6/p2"),
		],
	},
	w2: {
		mondai1: [
			q(1, 2, "我不坐电梯和扶梯，尽量走楼梯。", "I try not to use elevators or escalators and take the stairs.", ["为了用", "尽量用", "先用着", "试试看用"], ["in order to use", "make a habit of using", "use in advance", "try using"], "「Vるようにしている」表示有意识地保持习惯。", "Vるようにしている = make a point of doing it.", "#/day/2-1/p1"),
			q(2, 3, "去那家餐厅的时候必须打领带。", "You have to wear a tie when you go to that restaurant.", ["不可以做", "做了也没关系", "必须做", "不做也可以"], ["must not", "may", "must", "needn't"], "「Vなければならない」表示义务。", "Vなければならない expresses obligation.", "#/day/2-2/p0"),
			q(3, 1, "下雨了。得赶快把衣服收进来。", "It's started raining. We have to bring the laundry in.", ["不…不行", "试试看", "不可以", "…的话就好"], ["have to", "try", "must not", "should"], "口语里「入れないと」后面省略了「いけない」。", "Vないと is a spoken must.", "#/day/2-2/p1"),
			q(4, 4, "怎么跑也来不及，今天别看电影了。", "No matter how much we run we won't make it, so let's skip the movie.", ["那样的", "那么地", "什么样的", "无论怎么"], ["that kind of", "that much", "what kind of", "no matter how"], "「どんなに〜ても」表示无论程度如何。", "どんなに Vても = no matter how much.", "#/day/2-3/p1"),
			q(5, 3, "对不起，我把饼干全吃掉了。", "Sorry — I ate all the cookies.", ["试着吃了", "先吃好了", "吃掉了（遗憾）", "必须吃"], ["tried eating", "ate in advance", "ended up eating", "have to eat"], "「食べちゃった」是「てしまう」的口语。", "Vちゃう marks an accidental or complete result.", "#/day/2-5/p0"),
			q(6, 2, "嗯，已经能骑得相当好了。", "Yeah, I've gotten pretty good at riding.", ["为了能骑而做了", "变得会骑了", "能骑就好了", "能骑更好"], ["did it so I could ride", "have become able to ride", "it would be good if I could", "better if I could"], "「Vるようになった」表示能力或状态的变化。", "Vるようになった = have become able to.", "#/day/2-1/p0"),
			q(7, 4, "这是两年前田中老师送给我的书。", "This is a book Tanaka-sensei gave me two years ago.", ["给我（现在）", "给我了（尊敬）", "领取（现在）", "领取了（谦让）"], ["give me (nonpast honorific)", "gave me (honorific)", "receive (nonpast humble)", "received (humble)"], "自己收下别人给的东西用「いただいた」。", "いただいた is the humble past of receive.", "#/day/2-6/p0"),
			q(8, 1, "那还是带着伞去比较好。", "Then you'd better take an umbrella.", ["最好带去", "不带也可以", "带去也行", "不带才好"], ["you'd better take", "needn't take", "may take", "better not take"], "「Vたほうがいい」表示建议。", "Vたほうがいい gives advice.", "#/day/2-7/p0"),
			q(9, 3, "这句话是什么意思？", "What does this sentence mean?", ["什么的", "说什么", "什么样的", "怎么了的"], ["of what", "say what", "what kind of", "what happened"], "问含义用「どういう意味」。", "どういう意味 asks for the meaning.", "#/day/2-3/p0"),
			q(10, 1, "山田，会议室你帮我订了吧。", "Yamada, you booked the meeting room for me, right?", ["给我做了", "我给别人做了", "曾经做过", "从没做过"], ["did it for me", "I did it for someone", "have done it", "have never done it"], "「してくれた」表示对方为自己做了。", "てくれた = someone did it for the speaker.", "#/day/2-6/p1"),
		],
		mondai2: [
			q(11, 3, "在公司干得久了，谁都能拿到的东西。", "If you work at the company long enough, anyone can get one.", ["在公司", "长时间", "工作的话", "虽然拿到了"], ["at the company", "for a long time", "if you work", "though I received it"], "「長くつとめているともらいました」。", "Vていると marks what follows from a continuing state.", "#/day/2-1/p0", { order: "1→2→3→4" }),
			q(12, 3, "我每月去一次牙医检查蛀牙。", "I make a point of going to the dentist once a month to check for cavities.", ["每月一次", "检查", "为了", "蛀牙的"], ["once a month", "check", "for / in order to", "of cavities"], "「虫歯のチェックのために」。", "Nのために = for the purpose of N.", "#/day/3-1/p0", { order: "4→2→3→1" }),
			q(13, 2, "刚才拜托的事，就算不马上做，也请先做好。", "About what I asked just now — even if you don't do it right away, please have it done.", ["马上", "也行", "因为", "即使不"], ["immediately", "fine", "because", "even if not"], "「すぐじゃなくてもいいから」。", "Vなくてもいい = it's all right not to.", "#/day/2-2/p2", { order: "1→4→2→3" }),
		],
		mondai3: [
			q(14, 4, "寄宿家庭去旅行了，所以我得去遛狗。", "My host family went on a trip, so I had to walk the dog.", ["也可以做，因为", "不可以做，所以", "必须做，因为", "必须做，所以"], ["was allowed to, because", "wasn't allowed to, so", "had to, because", "had to, so"], "「散歩をしなければならなかったので」。", "Vなければならなかったので = because I had to.", "#/day/2-2/p0"),
			q(15, 1, "妈妈说即使时间短也没关系。", "Mom said it was fine even if the walk was short.", ["即使短也", "如果短的话（否定条件）", "短这件事", "因为短"], ["even if short", "if it is short (negative)", "the fact it is short", "because it is short"], "「みじかくてもいい」。", "Vてもいい = it's all right even if.", "#/day/2-3/p1"),
			q(16, 3, "里奥叼着球来，像在说「扔！」", "Leo brought a ball, as if telling me “Throw it!”", ["扔（词典形）", "扔了", "扔！（命令）", "别扔"], ["throw (plain)", "threw", "throw! (command)", "don't throw"], "转述狗的要求用命令形「なげろ」。", "The imperative なげろ reports the dog's demand.", "#/day/3-6/p0"),
			q(17, 4, "为了赶上平时那班电车，一路跑到车站。", "I ran all the way to the station so I could catch my usual train.", ["乘坐期间", "乘坐的时候", "以便乘坐", "为了乘坐"], ["while riding", "when riding", "so as to ride", "in order to ride"], "「乗るために」表示目的。", "Vるために marks purpose.", "#/day/3-1/p0"),
			q(18, 1, "为了不忘掉学校教的内容，每天复习。", "I review every day so I don't forget what I learned at school.", ["以免忘记", "如果不忘记", "先忘掉", "试着忘掉"], ["so as not to forget", "if I don't forget", "forget in advance", "try forgetting"], "「わすれないように」表示目的。", "Vないように = so as not to.", "#/day/2-1/p1"),
		],
	},
	w3: {
		mondai1: [
			q(1, 4, "这是用来剪花的剪刀。", "These are scissors used for cutting flowers.", ["以便", "为了的", "因为", "用来…"], ["so that", "for the sake of", "because", "for the purpose of"], "「Vるのに使う」表示用途。", "Vるのに使う = used for doing.", "#/day/3-1/p1"),
			q(2, 1, "头疼睡不着。吃点药试试看？", "I have a headache and can't sleep. Why not try taking some medicine?", ["吃了看看怎么样", "先吃着", "如果吃掉的话", "如果一直吃"], ["how about trying", "take in advance", "if you end up taking", "if you keep taking"], "「Vてみたらどう」表示建议尝试。", "Vてみたらどう suggests trying it.", "#/day/3-3/p0"),
			q(3, 2, "对不起，有件事想请教您…", "Excuse me, there's something I'd like to ask you…", ["能请您（可能）", "想请您", "能让我得到", "想给我"], ["can receive (potential)", "would like you to", "can have someone", "want someone to give me"], "对听话人用「ていただきたい」。", "ていただきたい is a polite request.", "#/day/3-4/p0"),
			q(4, 2, "是听谁说的我记不清了，但这件事我也知道。", "I don't remember who I heard it from, but I know that too.", ["听（现在）", "听了", "听见了", "听得到"], ["hear (nonpast)", "heard", "was audible", "could hear"], "已经发生的事用「聞いた」。", "The past 聞いた matches かおぼえていない.", "#/day/3-2/p1"),
			q(5, 1, "虽然住在日本，却没什么用日语的机会。", "Even though I live in Japan, I don't get many chances to use Japanese.", ["虽然住着", "因为住着", "刚住着的时候", "住着的地方"], ["even though I live", "because I live", "just when I was living", "the place I live"], "「いるのに」表示逆接。", "のに marks an unexpected contrast.", "#/day/3-5/p0"),
			q(6, 4, "弟弟说不打算进公司，光弹吉他…", "My brother says he has no intention of joining a company and just plays guitar…", ["没有过", "不会变成", "不打算（不自然）", "不打算"], ["have never", "won't become", "unnatural form", "have no intention"], "「Vるつもりはない」表示没有该打算。", "Vるつもりはない = have no intention of.", "#/day/3-6/p1"),
			q(7, 3, "我也想胖一点，可怎么吃都胖不了。", "I'd like to gain weight too, but I can't no matter how much I eat.", ["吃这件事", "虽然吃", "即使吃", "想吃"], ["the act of eating", "although eating", "even if I eat", "trying to eat"], "「いくらVても」表示无论怎样都不行。", "いくら Vても = no matter how much.", "#/day/2-3/p1"),
			q(8, 2, "昨天想早点睡，却怎么也睡不着。", "Yesterday I meant to go to bed early, but I just couldn't sleep.", ["睡！", "想睡", "打算睡", "睡着了"], ["sleep! (command)", "let's / I'll sleep", "plan to sleep", "ended up sleeping"], "自己的意志用「Vようと思う」。", "Vようと思う marks the speaker's intention.", "#/day/3-6/p0"),
			q(9, 1, "别老问同样的事了。", "I don't want you to keep asking the same thing.", ["希望你别问", "不希望你别问", "必须问", "不问才好"], ["I don't want you to ask", "I don't want you not to ask", "must ask", "better not ask"], "「Vないでほしい」表示希望对方不要做。", "Vないでほしい = I want you not to.", "#/day/3-4/p1"),
			q(10, 1, "约翰说汤姆住院了。所以才没来学校啊。", "John said Tom was in the hospital. So that's why he hasn't been coming to school.", ["所以", "那么就", "可是", "然而"], ["that's why", "in that case", "but", "however"], "「だから」承接已知理由。", "だから draws the conclusion from the previous line.", "#/day/3-5/p1"),
		],
		mondai2: [
			q(11, 2, "本不想说，但觉得还是提醒一下比较好。", "I wasn't going to say anything, but I thought I'd better mention it after all.", ["打算", "来着但是", "不说", "还是"], ["intention", "was going to, but", "not say", "after all"], "「言わないつもりだったんですが」。", "Vるつもりだった = I had intended to.", "#/day/3-6/p1", { order: "3→1→2→4" }),
			q(12, 1, "那家人的狗平时那么吵，今天却很安静，我觉得奇怪。", "Their dog is usually noisy, so it seemed odd that it was quiet.", ["因为安静", "奇怪", "吵", "却"], ["because it's quiet", "odd", "noisy", "even though"], "「うるさいのにしずかなのでへんだ」。", "のに marks the contrast with the usual noise.", "#/day/3-5/p0", { order: "3→4→1→2" }),
			q(13, 2, "想赶上电车，一跑就摔倒了。", "I started running to catch the train and ended up falling.", ["想乘电车", "一跑", "摔倒", "想着"], ["trying to board", "when I ran", "fell", "thinking"], "「乗ろうと思って走ったらころんでしまった」。", "Vようと思って + Vたら = when I tried, … happened.", "#/day/3-6/p0", { order: "1→4→2→3" }),
		],
		mondai3: [
			q(14, 3, "记汉字对我这个澳大利亚人来说很难。", "Memorizing kanji is hard for me as an Australian.", ["记住这件事（宾语）", "决定记住", "记住这件事（主题）", "要记住的话"], ["memorizing (object)", "deciding to memorize", "memorizing (topic)", "for memorizing"], "「おぼえるのは〜たいへん」。", "Vるのは makes the action the topic.", "#/day/3-1/p1"),
			q(15, 4, "不过，汉字读法不懂的话，查起来就费时间。", "But if I don't know the reading, looking it up takes time.", ["然后", "所以", "那么", "不过"], ["and then", "so", "well then", "however"], "前后是转折，用「けれども」。", "けれども marks contrast.", "#/day/3-5/p0"),
			q(16, 3, "查那个要花时间。", "It takes time to look that up.", ["查还是", "是否查", "用于查", "把查作为宾语"], ["look up or", "whether to look up", "in order to look up / for looking up", "looking up (object)"], "「しらべるのに時間がかかる」。", "Vるのに時間がかかる = it takes time to.", "#/day/3-1/p1"),
			q(17, 1, "我想今后好好学日本文化。", "I intend to study Japanese culture from now on.", ["学吧（意志）", "希望你学", "咱们学吧", "打算学"], ["I'll study", "I want you to study", "let's study", "I plan to study"], "「勉強しようと思っています」。", "Vようと思う states the speaker's will.", "#/day/3-6/p0"),
			q(18, 3, "在电视上看到澳大利亚人在日本寄宿，我也想体验日本生活。", "Watching an Australian homestay in Japan on TV made me want to experience life there too.", ["能看见", "能被看见", "看了之后", "能看到"], ["is visible", "can be seen", "watching / having seen", "being able to see"], "「ホームステイしているのを見て」。", "のを見て = seeing that…", "#/day/3-2/p1"),
		],
	},
	w4: {
		mondai1: [
			q(1, 2, "到了春天，池子里的冰开始化了。", "When spring came, the ice on the pond started to melt.", ["融化（他动词）", "融化（自动词）", "被融化", "被化"], ["melt (transitive)", "melt (intransitive)", "be melted", "be dissolved"], "冰自己化用自动词「とける」。", "とける is intransitive: the ice melts by itself.", "#/day/4-1/p0"),
			q(2, 3, "这台吸尘器又大又重，不好用。", "This vacuum is big and heavy, so it's hard to use.", ["用得太多", "好用", "不好用", "用掉了"], ["use too much", "easy to use", "hard to use", "end up using"], "「Vにくい」表示难以做。", "Vにくい = hard to do.", "#/day/4-2/p1"),
			q(3, 1, "不过一摸马上就知道了。", "But if you touch it, you can tell right away.", ["摸了的话", "要摸的话", "被摸的话", "如果不摸"], ["if you touch it", "if you're going to touch", "if it is touched", "if you don't touch"], "「さわったら」表示一摸就…。", "Vたら marks what you find out when you do it.", "#/day/4-3/p0"),
			q(4, 3, "小时候忘带作业，常被罚站走廊。", "As a child I often forgot my homework and was made to stand in the hall.", ["被站", "让站", "被迫站", "站过来了"], ["was stood", "made someone stand", "was made to stand", "came standing"], "「立たされた」是使役被动。", "使役被动: someone forced the speaker to stand.", "#/day/4-3/p1"),
			q(5, 1, "你看起来挺高兴的，有什么好事吗？", "You look happy — did something good happen?", ["显得高兴", "听说高兴", "高兴地那样", "快要高兴"], ["looks happy", "I hear it's happy", "happily like that", "about to be happy"], "「Aそう」表示从外表判断。", "Aそうだ describes how someone looks.", "#/day/4-5/p0"),
			q(6, 1, "爸爸给猫吃了（香肠被猫吃了）。", "Dad was feeding them to the cat. / The cat ate them.", ["被吃", "让吃", "被迫吃", "让被吃"], ["was eaten", "let eat", "was made to eat", "was allowed to be eaten"], "「ネコに食べられていた」是受害被动。", "The sausage was eaten by the cat (adversative passive).", "#/day/4-3/p0"),
			q(7, 1, "好像进小偷了。", "It looks like a burglar got in.", ["好像进了", "好像被进了", "也许进了（时态不对）", "好像让进了"], ["seems it entered", "seems it was entered", "might have entered (awkward tense)", "seems they made it enter"], "「入ったみたいだ」表示推测。", "Vたみたいだ = it seems that happened.", "#/day/4-5/p1"),
			q(8, 4, "都十点了店还不开门。今天好像休息。", "It's 10 and the shop still isn't open. It seems they're closed today.", ["看样子要休息", "是休息（解释）", "休息了吧", "好像休息"], ["looks like they'll close", "it's that they're off", "they probably rested", "it appears they're closed"], "「休みのようだ」根据眼前情况推测。", "Nのようだ = it appears that.", "#/day/4-5/p1"),
			q(9, 3, "说是拿手，可写完全不行…", "Speaking is my strong point, but I really can't write…", ["吧", "变成", "是…（解释）", "决定"], ["probably", "become", "it is that", "decide"], "「とくいなんです」用「んです」解释说明。", "んです offers an explanation.", "#/day/4-6/p1"),
			q(10, 3, "名字没写，所以不知道是谁的。", "The name isn't written, so we don't know whose it is.", ["没被写", "一直不写", "没有写着", "写不出来"], ["isn't written (passive)", "is leaving it unwritten", "hasn't been written on it", "can't write"], "「書いてありません」表示结果状态。", "てありません = has not been written (on it).", "#/day/4-4/p1"),
		],
		mondai2: [
			q(11, 1, "这张图太小看不清，再放大一点。", "This graph is too small and hard to see — make it a bit bigger.", ["所以", "再稍微", "太小", "难看清"], ["so", "a little more", "too small", "hard to see"], "「小さすぎて見にくいから」。", "すぎて = too …, so ….", "#/day/4-2/p0", { order: "3→4→1→2" }),
			q(12, 2, "刚才还是晴天，天空一下子暗下来，突然下雨了。", "It had been clear, but the sky darkened and suddenly it started to rain.", ["却", "天空变暗", "渐渐变成", "一直晴着"], ["even though", "the sky dark", "coming to be", "had been clear"], "「はれていたのに空がくらくなってきて」。", "てきた marks a change coming on.", "#/day/4-4/p0", { order: "4→1→2→3" }),
			q(13, 3, "为什么不买正合适大小的呢？", "Why didn't you buy one that was just the right size?", ["的", "把…", "没买", "大小"], ["of", "the one that", "didn't buy", "size"], "「ちょうどいい大きさのを買わなかった」。", "の nominalizes 大きさ.", "#/day/4-1/p1", { order: "4→2→3→1" }),
		],
		mondai3: [
			q(14, 3, "有座位也不让我坐。", "Even when there was a seat, she wouldn't let me sit.", ["坐", "被坐", "让坐", "被迫坐"], ["sit", "be sat on", "let sit", "be made to sit"], "「すわらせてくれませんでした」是否定的使役授受。", "Vさせてくれない = would not let me.", "#/day/4-3/p1"),
			q(15, 2, "直到妈妈说可以，我被迫返工很多次。", "Until my mother said it was all right, I was made to redo it many times.", ["让做了", "被迫做了", "请对方做了", "对方为我做了"], ["made someone do", "was made to do", "had someone kindly do", "someone did it for me"], "「やりなおしをさせられました」。", "使役被动: was forced to redo it.", "#/day/4-3/p1"),
			q(16, 1, "一上大学，就能做不少自己想做的事了。", "Once I became a university student, I could do quite a lot of what I wanted.", ["一到…就", "如果是", "即使到了", "即使"], ["when one becomes", "if it is", "even after becoming", "even"], "「大学生になると」。", "Nになると = when you become N.", "#/day/4-4/p0"),
			q(17, 1, "母亲生病以后，好像连发脾气的力气都快没了。", "After my mother fell ill, it seemed she was even losing the energy to get angry.", ["眼看要没了", "听说会没", "好像会没", "好像已经没了"], ["looks about to disappear", "I hear it will disappear", "seems it will disappear", "seems it already disappeared"], "「なくなりそう」是眼前的迹象。", "Vそうだ here is a visual guess about the near future.", "#/day/4-5/p0"),
			q(18, 3, "我觉得被母亲严格带大是件好事。", "I think it was good that I was raised strictly by my mother.", ["为我长大", "为我养育", "被养育", "让养育"], ["grew up for me", "raised for me", "was raised", "was made to raise"], "「きびしくそだてられた」。", "Passive そだてられた = was brought up.", "#/day/4-3/p0"),
		],
	},
};

const out = resolve(root, "public/data/n4-grammar-explanations.json");
await writeFile(out, JSON.stringify(data, null, 2) + "\n");

let count = 0;
for (const week of Object.values(data)) {
	for (const section of Object.values(week)) count += section.length;
}
console.log(`Wrote ${count} N4 weekly-test explanations to ${out}`);
