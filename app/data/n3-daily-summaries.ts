/** Editorial comparisons, not an official JLPT list or corpus frequency ranking.
 * Rows follow the source lesson's point order; examples remain source-backed.
 * N3 labels refer to this course. Expanded patterns have separate reference levels.
 */
export type Bilingual = readonly [string, string];
export type Usage = "everyday" | "common" | "situational" | "formal";
export type SummaryRow = readonly [form: string, usage: Usage, zh: string, en: string];
export type DailySummary = { title: Bilingual; tip: Bilingual; rows: readonly SummaryRow[] };

export const N3_DAILY_SUMMARIES: Record<string, DailySummary> = {
	"1-1": {
		title: ["被动与使役：谁受到影响，谁获得许可？", "Passive and causative: who is affected, who gets permission?"],
		tip: ["先判断角色：被动是主语承受动作或影响；使役请求是请别人允许自己行动。", "Identify the roles: a passive subject receives an action or its effects; a causative request asks permission to act."],
		rows: [
			["～れる／られる", "common", "客观叙述可省略动作执行者；書かれている描述已经写着的状态。", "An objective passive can omit the actor; 書かれている describes the resulting written state."],
			["人に～れる／られる", "common", "受害被动强调主语受到困扰；赤ちゃんに泣かれた不是‘被婴儿哭’，而是婴儿哭让自己为难。", "Adversative passives highlight trouble for the subject: 赤ちゃんに泣かれた means the baby's crying caused the speaker difficulty."],
			["～させてください／～させてもらえますか", "common", "请求让我做，不是请对方做。帰らせてください＝请允许我回去；帰ってください＝请你回去。", "Ask to do something yourself, not for the listener to do it. 帰らせてください: let me leave; 帰ってください: please leave."],
		],
	},
	"1-2": {
		title: ["口语缩略：必须、做掉、预先做", "Contractions: obligation, completion, preparation"],
		tip: ["先还原完整形式再判断意思：ないと→なければならない；ちゃう→てしまう；とく→ておく。", "Expand first: ないと → なければならない; ちゃう → てしまう; とく → ておく."],
		rows: [
			["～ないと／～なくちゃ", "everyday", "句尾省略‘不行’，表示必须做；句中接后项时，也可能只是‘如果不……’。", "At sentence end, an omitted 'that won't do' gives obligation; with a following clause, it may simply mean 'if not'."],
			["～ちゃう／～じゃう", "everyday", "把事情做完或发生了令人遗憾的事，取决于上下文；并不必然表示不小心。", "Completion or an unwanted outcome, depending on context; it does not automatically mean 'accidentally'."],
			["～とく／～どく", "everyday", "为以后预先做，或让状态保持着。読んどく来自読んでおく，不是読んでしまう。", "Prepare for later or leave a state unchanged. 読んどく comes from 読んでおく, not 読んでしまう."],
		],
	},
	"1-3": {
		title: ["みたい・らしい・っぽい：像在哪里？", "みたい, らしい, っぽい: three kinds of resemblance"],
		tip: ["像另一个东西→みたい；符合典型特征→らしい；带某种感觉或倾向→っぽい。", "Resemblance → みたい; typical qualities → らしい; a quality or tendency → っぽい."],
		rows: [
			["～みたいだ／に／な", "everyday", "比喻‘像……’；句尾用だ，修饰动作用に，修饰名词用な。书面较常用ようだ。", "A comparison: だ ends a predicate, に modifies an action, な modifies a noun. ようだ is more neutral in writing."],
			["Nらしい", "common", "子どもらしい＝有孩子应有的天真。这里是典型特征，不是传闻‘听说’的らしい。", "子どもらしい means having typical childlike qualities. This is not the hearsay use of らしい."],
			["～っぽい", "common", "子どもっぽい常指幼稚；也有中性用法如白っぽい。不是所有っぽい都带贬义。", "子どもっぽい often means childish; 白っぽい is neutral ('whitish'). The suffix is not always negative."],
		],
	},
	"1-4": {
		title: ["ように：努力、目的、变化", "ように: effort, purpose, change"],
		tip: ["する看人为努力；なる看变化结果；ように后接另一个动作时，看它是否表达目的。", "する highlights deliberate effort; なる a change; ように before another action may mark its purpose."],
		rows: [
			["～ようにする", "common", "有意识地努力做到或养成习惯，不保证已经实现；毎日歩くようにしている＝坚持尽量每天走路。", "Make a deliberate effort or habit; success is not guaranteed. 毎日歩くようにしている: make a habit of walking daily."],
			["～ように＋动作", "common", "为达到某状态而行动，常接可能形、ない形。聞こえるように話す＝为了让人听见而说。", "Act to achieve a state, often with a potential or negative form. 聞こえるように話す: speak so people can hear."],
			["～ようになる", "common", "强调以前与现在不同；話せるようになった＝变得会说了，不是决定要说。", "A change from before: 話せるようになった means becoming able to speak, not deciding to speak."],
		],
	},
	"1-5": {
		title: ["同样的ように：照着做、要求、祈愿", "ように: following a model, instructions, wishes"],
		tip: ["不要只看ように；看前面是‘已知内容’、辞书形／ない形，还是ます形祈愿。", "Read the whole construction: known information, a plain-form instruction, or a polite-form wish."],
		rows: [
			["Nの／普通形＋ように", "common", "正如、按照：説明したように强调和说明一致，不是‘为了说明’。", "'As' or 'in the way that': 説明したように refers back to an explanation, not a purpose."],
			["Vる／Vない＋ように", "situational", "句末可作指示：遅れないように＝注意别迟到。虽比直接命令缓和，仍不宜当成对长辈的礼貌请求。", "Sentence-final instructions: 遅れないように means 'make sure you are not late'. Softer than an imperative, but not a polite request to a superior."],
			["～ます／～ません＋ように", "common", "祈愿某事实现：合格しますように＝希望能考上；不是让听者执行命令。", "A wish: 合格しますように means 'I hope I pass', not an instruction to the listener."],
		],
	},
	"1-6": {
		title: ["意志形＋と思う／とする：计划还是行动？", "Volitional + と思う / とする: plans versus attempts"],
		tip: ["心里的计划→と思う；准备行动或尝试→とする；不愿尝试→としない。", "An intention → と思う; an attempt or imminent action → とする; unwillingness to try → としない."],
		rows: [
			["意志形＋と思う", "common", "表达打算；と思っている表示已有、持续的打算，也可描述他人的意向。", "Express an intention; と思っている presents an established intention and can report someone else's plans."],
			["意志形＋とする", "common", "既可表示‘试图’，也可表示‘正要’。乗ろうとしたとき是正要上车的时点。", "Either 'try to' or 'be about to'. 乗ろうとしたとき identifies the moment just before boarding."],
			["意志形＋としない", "common", "强调看不出做的意愿，不等于能力不足；聞こうとしない是不肯听，聞けない是不能听。", "A lack of willingness, not inability: 聞こうとしない means refusing to listen; 聞けない means being unable to."],
		],
	},
	"2-1": {
		title: ["限制与强调：ばかり・しか・さえ・こそ", "Restriction and emphasis: ばかり, しか, さえ, こそ"],
		tip: ["净是某类→ばかり；范围只有这些→しかない；极端例子→さえ；突出这一项→こそ。", "Predominantly one kind → ばかり; only this much → しかない; an extreme case → さえ; emphatic focus → こそ."],
		rows: [
			["Nばかり／Vてばかりいる", "common", "强调偏向同一类或反复做同一事，未必数学上百分之百；てばかりいる常带不满。", "A predominance or repeated activity, not necessarily a mathematical 100%; てばかりいる often conveys disapproval."],
			["～だけ／～しかない／～だけしかない", "everyday", "だけ可接肯定；しか必须呼应否定。だけしかない把范围限定得更强，不能漏掉ない。", "だけ allows an affirmative predicate; しか requires a negative. だけしかない reinforces the restriction."],
			["～さえ", "common", "‘连……都……’，举出极端例子；不固定接否定，如名前さえ知らない、子どもさえできる。", "'Even': an extreme example. It can accompany negatives or affirmatives, not just negatives."],
			["～こそ", "common", "突出‘正是这个’；今度こそ常带这次一定要成功的决心，不表示只有这一次。", "Emphasizes 'this very one'; 今度こそ often expresses determination to succeed this time, not 'only this time'."],
		],
	},
	"2-2": {
		title: ["关于、据说、由于：先找句子的关系", "Topic, source, cause: identify the relationship"],
		tip: ["讨论什么→について／に関して；消息来自哪里→によると；原因、手段或差异→によって。", "Topic → について / に関して; information source → によると; cause, means or variation → によって."],
		rows: [
			["～に関して／～に関するN", "formal", "与について都可表示‘关于’，但更偏正式讨论；修饰名词用に関する。", "Like について, marks a topic, but is more formal. Use に関する before a noun."],
			["～について／～についてのN", "common", "一般的话题对象，口语书面都自然；修饰名词要加の：日本語についての本。", "A neutral topic marker in speech and writing; add の before a noun: 日本語についての本."],
			["～によると／～によれば", "common", "引出消息来源，后面常接そうだ、ということだ等；不是动作使用的工具。", "Introduces an information source, often followed by reported information; it does not mark a tool here."],
			["～によって", "formal", "看后项区分：地震によって壊れた是原因；人によって違う是因人而异。不要统一翻成‘根据’。", "Interpret from the predicate: 地震によって壊れた gives a cause; 人によって違う means varying by person."],
		],
	},
	"2-3": {
		title: ["名词化：さ・み，与こと・の", "Nominalization: さ / み and こと / の"],
		tip: ["形容词变名词先分程度与感受；句子变名词还要看后面的动词搭配，不能总把こと和の互换。", "For adjectives, distinguish degree from felt quality; for clauses, the following predicate can restrict こと versus の."],
		rows: [
			["形容词＋さ", "common", "大きさ、重さ把性质作为可谈论的程度；构词较广，但よい变よさ。", "大きさ and 重さ name a degree or property. This suffix is productive; よい becomes よさ."],
			["形容词＋み", "common", "痛み、悲しみ等常表达感受到的状态；搭配有限，不可任意替换さ，例如不说大きみ。", "痛み and 悲しみ name felt states. Formation is restricted: み cannot freely replace さ (not 大きみ)."],
			["～こと", "common", "把内容当作一件事；能力表达固定用Vることができる，不换成のができる。", "Treats content as a matter or fact; the ability construction is Vることができる, not のができる."],
			["～の", "everyday", "看到、听到具体动作常用の：走っているのを見た。電話するのを忘れた中也可用こと。", "の is natural for perceived actions: 走っているのを見た. With forgetting to phone, either の or こと is possible."],
		],
	},
	"2-4": {
		title: ["という：名称、定义，还是一件事？", "という: naming, defining, or reporting a fact?"],
		tip: ["先看という前后：名称＋人／物；词语＋のは＋解释；完整消息＋こと／の。", "Check both sides: a name + person/thing; a term + のは + definition; a whole statement + こと/の."],
		rows: [
			["NというN", "common", "为听者介绍名称：木村さんという人＝一个叫木村的人，不表示‘木村说的人’。", "Introduces a name: 木村さんという人 is a person called Kimura, not someone Kimura mentioned."],
			["～というのは", "common", "提出一个词或概念来解释；口语常用って（いうの）は。", "Introduces a term or concept for explanation; conversationally, って（いうの）は is common."],
			["句子＋ということ／というの", "common", "把消息整体当作名词：帰国するというのは本当ですか是在确认回国这件事，不是在定义帰国。", "Nominalizes reported content: 帰国するというのは本当ですか checks whether someone is returning, rather than defining 帰国."],
		],
	},
	"2-5": {
		title: ["というより・というと・といっても", "Rephrasing, association, and qualification"],
		tip: ["改称呼→というより；引联想→というと；给前面的话降温、加限制→といっても。", "Reclassify → というより; associate → というと; qualify or limit a claim → といっても."],
		rows: [
			["AというよりB", "common", "B比A更贴切：部屋というよりゴミ箱だ，是把房间夸张地改称垃圾箱。", "B is a better description than A: 部屋というよりゴミ箱だ reclassifies the room, hyperbolically, as a rubbish bin."],
			["～というと／といえば", "common", "提到一个话题，自然联想到代表事物；日本料理というと、すし是举联想，不是否定日本料理这个称呼。", "A topic brings a representative example to mind: Japanese food suggests sushi; the original label is not being rejected."],
			["～といっても", "common", "承认称呼，再修正听者预期：旅行といっても日帰りです＝虽说旅行，也就是当天往返。", "Accepts the label but narrows expectations: 旅行といっても日帰りです means it is only a day trip."],
		],
	},
	"2-6": {
		title: ["建议与转述要求：谁让谁做？", "Suggestions and reported requests: who asks whom?"],
		tip: ["转述时先找原说话人和动作执行者；ように转述内容，と可以保留原话的命令形式。", "Track the original speaker and the person acting; ように paraphrases an instruction, while と can quote its imperative form."],
		rows: [
			["～てごらん", "situational", "温和地让晚辈或孩子试试；不能当作对老师、上司的通用礼貌建议。", "A gentle invitation to a child or junior to try; not a general polite suggestion to a teacher or boss."],
			["～ように言う／頼む", "common", "用Vる／Vない转述要求，不必照抄命令语气：来るように言った＝叫对方来。", "Report an instruction with Vる/Vない without reproducing its force: 来るように言った means telling someone to come."],
			["命令形／Vるな＋と言われた", "situational", "引用别人发出的命令；粗硬语气属于引语，叙述者不一定在粗暴地命令听者。", "Quotes someone else's command; the force belongs to the quotation, not necessarily the narrator's attitude to the listener."],
			["～てくれと頼まれた", "common", "对方请求我为其做事；注意くれ是原请求者的视角，不是叙述者正在向听者索取。", "Someone asked me to do something for them; くれ preserves the original requester's viewpoint."],
		],
	},
	"3-1": {
		title: ["即使、无论怎么，与不做就……", "Even if, no matter how, and without doing"],
		tip: ["ても表示结果不随条件改变；ずに表示没做前项就做后项，不是让步。", "ても leaves the outcome unchanged despite a condition; ずに links an omitted action to another action."],
		rows: [
			["～ても／～でも", "everyday", "可以是真实让步，也可以是假设：調べてもわからなかった说已经查过，雨でも行く可说未来打算。", "Can be factual or hypothetical: 調べてもわからなかった reports actual checking; 雨でも行く can concern a future plan."],
			["いくら／どんなに～ても", "common", "强调程度再高也不改变结果；いくら練習しても＝无论练多少，不是询问价格。", "The outcome holds regardless of degree: いくら練習しても means however much one practises, not a price question."],
			["～ずに／～ないで", "common", "都可表达不做某事就……；ずに稍偏书面。する→せずに，不是しずに。", "Both can mean 'without doing'; ずに is somewhat more written. する becomes せずに, not しずに."],
		],
	},
	"3-2": {
		title: ["として・にしては・にしても・としたら", "Role, unexpected evaluation, concession, hypothesis"],
		tip: ["身份→として；按标准却意外→にしては；即便承认→にしても；如果成立→としたら。", "Role → として; unexpected for a standard → にしては; concession → にしても; hypothesis → としたら."],
		rows: [
			["Nとして", "common", "说明以什么身份或资格行动：代表として出席する。不是‘对代表来说’的评价立场。", "States a role or capacity: attend as a representative, rather than evaluate something from a representative's viewpoint."],
			["～にしては", "common", "把前项当既定标准，结果不符合通常预期；初めてにしては上手だ＝第一次就这么好，出乎意料。", "Takes a known standard and notes an unexpected result: 初めてにしては上手だ means surprisingly good for a first attempt."],
			["～にしても", "common", "先让一步承认前项，再说后项；安いにしても買いすぎだ＝就算便宜，也买太多了。", "Concedes a point before the main claim: 安いにしても買いすぎだ means even if it is cheap, you bought too much."],
			["～としたら／～とすれば", "common", "把前项暂作假设，不表示已经确认；本当だとしたら＝如果是真的。", "Assumes something temporarily without confirming it: 本当だとしたら means if it is true."],
		],
	},
	"3-3": {
		title: ["打算、推断、应该与回忆", "Intention, expectation, obligation, recollection"],
		tip: ["自己的计划用つもり；根据事实推断用はず；谈应当怎么做用べき。‘应该’不能一律互换。", "つもり is intention, はず is an evidence-based expectation, べき is what ought to be done. English 'should' can hide the difference."],
		rows: [
			["～つもりだった", "common", "表示过去的打算；本课常接未实现的转折，但单凭つもりだった不能断言最终没做。", "A past intention; often followed here by a change of plan, but the form alone does not prove non-fulfilment."],
			["～はずだ／～はずがない", "common", "基于理由判断应该如此／不可能如此；不是要求别人履行义务。", "A reason-based expectation or impossibility, not an instruction about someone's duty."],
			["～べきだ／～べきではない", "situational", "依据责任或道理提出应当／不应当，语气较强；不是预测事实会怎样。", "A fairly strong judgement of duty or propriety, not a prediction of what will happen."],
			["～たものだ", "situational", "带感慨地回忆过去反复做的事；不宜套到单次完成的事件上。", "Recalls repeated past behaviour with feeling; not the normal choice for a single completed event."],
		],
	},
	"3-4": {
		title: ["时间关系：顺便、每次、刚一、正在", "Timing: incidentally, every time, just as, in the middle"],
		tip: ["ついで看主次；たび看重复；とたん看紧接；最中看进行中。", "ついで: main versus incidental task; たび: repetition; とたん: immediate sequence; 最中: ongoing action."],
		rows: [
			["～ついでに", "common", "本来要做A，利用机会顺便做B；不是两个同等目的的动作简单并列。", "B is an incidental task done while taking the opportunity provided by the main task A."],
			["～たびに", "common", "每次A都伴随B，强调重复对应；一次性的‘……时’不用它。", "Each occurrence of A brings B; this describes a repeated relationship, not a one-off 'when'."],
			["Vた＋とたん（に）", "common", "A刚发生，B紧接着发生，常带突发感；后面通常不是自己的计划或请求。", "B happens immediately upon A, often unexpectedly; B is normally not the speaker's plan or request."],
			["～最中に／～最中だ", "common", "A正进行时发生B；食事の最中不是吃完后，和食べたとたん的时间点不同。", "During A: 食事の最中 is in the middle of a meal, unlike the immediate-after timing of 食べたとたん."],
		],
	},
	"3-5": {
		title: ["保持状态：まま与っぱなし", "Leaving a state unchanged: まま versus っぱなし"],
		tip: ["まま只说状态没变；っぱなし常强调持续或该处理却没处理。とおり与きり是另外两种关系，不强行当同义词。", "まま states no change; っぱなし often suggests continuation or neglect. とおり and きり express different relationships."],
		rows: [
			["～とおり／Nどおり", "common", "按照说明、预期等；説明のとおり／説明どおり都可，接名词时注意の与浊音形式。", "Following an explanation or expectation: both 説明のとおり and 説明どおり work; note の versus voiced どおり."],
			["～まま", "common", "保留状态，不必带责备；靴のまま入る＝鞋没脱就进去。", "An unchanged state, without necessarily implying blame: 靴のまま入る means entering with shoes still on."],
			["～っぱなし", "common", "開けっぱなし常暗示该关没关；立ちっぱなし则表示一直站着，不一定是疏忽。", "開けっぱなし often implies failing to close something; 立ちっぱなし simply means standing continuously, not necessarily neglect."],
			["Nきり／Nっきり", "common", "二人きり强调只有两人、没有别人；本课这一义不等于Vたきり的‘此后一直没……’。", "二人きり means just two people, with no one else. Distinguish this from Vたきり, 'ever since doing'."],
		],
	},
	"3-6": {
		title: ["愿望与外在表现：たい・がる・ほしい・ふり", "Desire and outward behaviour"],
		tip: ["自己想做→たい；希望别人做→てほしい；观察别人表现→がる；明知不是真的却装出来→ふり。", "My desire → たい; wanting another's action → てほしい; observed feelings → がる; pretending → ふり."],
		rows: [
			["～がる／～たがる", "common", "从外部表现描述感情或愿望；がっている常说当前表现，不是直接读取别人的内心。", "Describes observable signs of feelings or desires; がっている often describes current behaviour rather than direct access to someone's mind."],
			["～てほしい／～ないでほしい", "common", "希望别人做／不要做；希望对方告诉我用教えてほしい，教えたい是我想教。", "Want someone to do/not do something. 教えてほしい: I want you to tell me; 教えたい: I want to teach/tell."],
			["～ふりをする", "common", "有意识装作某种状态；知っているふり是不懂装懂，不是单纯‘看起来知道’。", "Deliberate pretence: 知っているふり means pretending to know, not merely appearing to know."],
		],
	},
	"4-1": {
		title: ["评价的立场、预期与责怪", "Evaluation: viewpoint, expectations, blame"],
		tip: ["にとって标评价者；わりに比较预期；くせに再加责怪。说相似意思时，先考虑语气会不会冒犯。", "にとって marks a viewpoint, わりに an expectation gap, くせに blame. Consider the interpersonal effect."],
		rows: [
			["Nにとって", "common", "‘对……来说’的评价立场；不同于に対して标动作对象、について标话题。", "An evaluative viewpoint ('for someone'), unlike に対して for a target or について for a topic."],
			["～わりに", "common", "结果与程度、条件不相称；値段のわりにおいしい可以赞扬，不必带责备。", "A mismatch with a degree or condition; 値段のわりにおいしい can be praise, not blame."],
			["～くせに", "situational", "明明……却……，常含不满、轻视；のに更中性，不能只当两个同义词。", "A reproachful 'even though', often with contempt; のに is more neutral, so they are not tone-equivalent."],
			["～なんか／～なんて", "common", "可表轻视、自谦或惊讶，语气看上下文；合格するなんてすごい是惊喜，并非负面。", "Can convey dismissal, modesty, or surprise. 合格するなんてすごい expresses positive surprise."],
		],
	},
	"4-2": {
		title: ["原因：おかげ・せい；替代：かわり", "Causes and substitutes"],
		tip: ["好结果常用おかげ，坏结果常用せい；かわり要再分替代对象和交换条件。", "おかげ usually credits a good outcome, せい blames a bad one; かわり may express substitution or a trade-off."],
		rows: [
			["～おかげで／～おかげだ", "common", "带感谢或肯定的原因；中性说明原因用から、ので更稳妥。讽刺时也可能接坏结果。", "Credits a cause with gratitude or approval; から/ので are safer for neutral causes. Sarcasm can reverse the positive tone."],
			["～せいで／～せいか", "common", "せいで把坏结果归因于前项；せいか表示不确定是否因此，不能翻成肯定的‘都怪’。", "せいで attributes a bad result to a cause; せいか hedges that attribution ('perhaps because')."],
			["～かわりに", "common", "コーヒーのかわりにお茶是替代；手伝うかわりに教えて是交换条件，不是帮忙造成的结果。", "Coffee replaced by tea is substitution; 手伝うかわりに教えて is a trade-off, not cause and effect."],
			["Nにかわって", "situational", "代替某人履行其行动或职责：部長にかわって出席する；不能拿来泛指任意交换条件。", "Acting in someone's place, e.g. attending for the manager; not a general marker of a trade-off."],
		],
	},
	"4-3": {
		title: ["くらい与ほど：哪里能换，哪里不能？", "くらい versus ほど: where can they alternate?"],
		tip: ["单纯程度常可互换；‘越……越……’的ほど不能换成くらい。", "They often alternate for degree; in 'the more…, the more…', ほど cannot be replaced by くらい."],
		rows: [
			["～くらい／～ほど", "common", "用某事物衡量程度时常可换，如泣きたいくらい／ほど；但不是所有固定句型都通用。", "Often interchangeable as degree benchmarks, as in 泣きたいくらい/ほど, but not in every fixed construction."],
			["N／形容词＋ほど", "common", "若い人ほどよく食べる表示越年轻越能吃，是随程度变化，不是‘像年轻人那么’。", "若い人ほどよく食べる expresses a correlation with youth, not simply 'as much as young people'."],
			["～ば～ほど", "common", "同一动词或形容词反复：読めば読むほど；后项随前项程度增加而变化。", "Repeat the same verb/adjective: 読めば読むほど; the latter outcome varies with the former degree."],
			["～ほど／くらい…はない", "common", "用否定表达最高程度：彼女ほど親切な人はいない＝没有人像她这么亲切，不是否定她亲切。", "Negation expresses a superlative: no one is as kind as her, not that she is unkind."],
		],
	},
	"4-4": {
		title: ["こと后面的成分决定意思", "What follows こと determines the meaning"],
		tip: ["ことはない＝不必；ことだ＝建议；ということだ＝传闻或结论；ことか＝感叹。", "ことはない: no need; ことだ: advice; ということだ: report or conclusion; ことか: exclamation."],
		rows: [
			["Vることはない", "common", "没必要做，不是禁止做；謝ることはない是不用道歉，謝ってはいけない才是不许道歉。", "No need, not prohibition: 謝ることはない means no need to apologize; 謝ってはいけない forbids it."],
			["～ということだ", "formal", "本课讲传闻：听说……；也可表示推导出的意思。要看信息来自他人还是前文事实。", "This lesson uses it for reported information; it can also introduce an inferred meaning. Check the source of the claim."],
			["Vる／Vない＋ことだ", "situational", "作为建议，告诉对方该做／不该做什么；有指导口吻，不是对长辈的万能礼貌建议。", "Advice on what to do/not do, with an instructive tone; not a universally polite way to advise a superior."],
			["どんなに～ことか", "formal", "感叹程度之深，通常不是真正提问；どんなにうれしいことか＝多么高兴啊。", "An emphatic exclamation of degree, normally not a genuine question: 'How happy I am!'"],
		],
	},
	"4-5": {
		title: ["口语句尾：确认、传闻、解释理由", "Conversational endings: recall, hearsay, reasons"],
		tip: ["っけ向记忆求确认；って转述听来的话；もん解释理由。しかない另表没有其他办法。", "っけ checks memory, って reports information, もん offers a reason; しかない expresses lack of alternatives."],
		rows: [
			["～っけ", "everyday", "询问曾知道但记不清的事；でしたっけ／ましたっけ较礼貌，不是第一次询问的默认句尾。", "Checks something once known but forgotten; でしたっけ/ましたっけ are politer, not default endings for first-time questions."],
			["Vるしかない", "common", "没有其他办法，只能做；Vることはない则是没必要做，意思不能混。", "No option but to do it; Vることはない instead means there is no need to do it."],
			["～（んだ）って", "everyday", "句尾可表示听说；って还可引用或提示话题，不能见到って都翻成听说。", "Sentence-final hearsay is one use; って also quotes and marks topics, so not every occurrence means 'I hear'."],
			["～（んだ）もん", "situational", "带情绪说明理由，可能像辩解、撒娇；正式场合改用ので／から较合适。", "An emotional reason, sometimes defensive or childlike; ので/から are generally more suitable in formal settings."],
		],
	},
	"4-6": {
		title: ["连接句子：换句话说、因此、结果、因为", "Linking sentences: restatement, cause, outcome, reason"],
		tip: ["つまり是同一内容换说法；そのため／その結果连接因果；なぜなら从结论回头解释原因。", "つまり restates; そのため/その結果 link causes and outcomes; なぜなら looks back from a conclusion to its reason."],
		rows: [
			["つまり", "common", "归纳或换句话说，不必有因果；父の兄、つまり伯父是同一个人的两种说法。", "Summarizes or rephrases, without requiring causality: father's elder brother and uncle identify the same person."],
			["そのため（に）", "formal", "承接前面的原因，也可承接目的‘为此’；要看后项是结果还是为实现目的采取的行动。", "Refers back to a cause, or to a purpose ('to that end'); distinguish a result from a purposeful action."],
			["その結果", "formal", "突出某行动或事件实际带来的结果；不是简单重说前一句。", "Highlights the resulting outcome of an action or event, rather than restating the previous sentence."],
			["なぜなら～からだ", "common", "先说结论，再补理由；だから通常先有理由，再往下推出结果，顺序不同。", "Conclusion first, reason second; だから typically moves from a preceding reason to a result."],
		],
	},
	"5-1": {
		title: ["递进与比较：不仅、相比、相反", "Addition and comparison"],
		tip: ["はもちろん／ばかりか往上加信息；に比べて比较程度；に対して可对照差异，也可标动作对象。", "はもちろん/ばかりか add information; に比べて compares degree; に対して contrasts or marks a target."],
		rows: [
			["～はもちろん…も", "common", "把A当作理所当然，再补B也成立；与ばかりか相比，A的‘不用说’更突出。", "Takes A for granted and adds B; more explicit about A being obvious than ばかりか."],
			["～ばかりか／～ばかりでなく", "formal", "不仅A，连B也……，常有递进；不同于Nばかり‘净是’，也不同于Vたばかり‘刚刚’。", "Not only A but also B; distinct from Nばかり ('nothing but') and Vたばかり ('just did')."],
			["～に比べて", "common", "选一个参照物比较高低、多少等；不要求两者完全相反。", "Compares against a reference in degree, quantity, etc.; the two need not be opposites."],
			["～に対して", "formal", "学生に対して説明する标说明对象；兄は静かなのに対して弟は活発だ标对照。", "学生に対して説明する marks the audience; contrasting a quiet elder brother with an active younger one marks contrast."],
		],
	},
	"5-2": {
		title: ["动作进度：做成、做尽、没做完、刚做好", "Action stages: finished product, entirety, unfinished, fresh"],
		tip: ["上げる看成果，切る看全部，かけ看未完成，たて看刚完成。‘做完’还可用終わる、しまう，区别见下方横向对比。", "上げる: a finished result; 切る: entirety; かけ: incomplete; たて: freshly completed. Compare 終わる and しまう below."],
		rows: [
			["～上げる／～上がる", "common", "母がケーキを焼き上げた：人把它做好；ケーキが焼き上がった：东西做好了。不是所有动词都可自由搭配。", "母がケーキを焼き上げた: someone completes it; ケーキが焼き上がった: it is ready. These endings do not combine freely with every verb."],
			["～切る／～切れる／～切れない", "common", "食べ切る＝全部吃完；食べ切れる＝能吃完；食べ切れない＝吃不完。疲れ切る另表筋疲力尽。", "食べ切る: finish all; 食べ切れる: can finish all; 食べ切れない: cannot finish all. 疲れ切る expresses total exhaustion."],
			["～かける／～かけの／～かけだ", "common", "読みかけの本修饰名词，この本は読みかけだ作谓语；かけ也可表刚要发生，如落ちかけた＝差点掉下去。", "読みかけの本 modifies a noun; この本は読みかけだ is a predicate. かけ also marks imminence: 落ちかけた means nearly fell."],
			["～たての／～たてだ", "common", "焼きたてのパン与パンは焼きたてだ都突出刚出炉；入社したて＝入社し＋たて。搭配有限，刚读过通常说読んだばかり。", "Both 焼きたてのパン and パンは焼きたてだ emphasize freshness. 入社したて = 入社し + たて. For 'just read', normally use 読んだばかり."],
		],
	},
	"5-3": {
		title: ["愿望与后悔：还没发生，还是已经错过？", "Wishes versus regrets: still possible or already missed?"],
		tip: ["希望接下来实现→といい／ないかな；回头后悔→ばよかった；のに可以再加未实现的遗憾。", "Future hopes → といい/ないかな; hindsight regret → ばよかった; のに can add disappointment at non-fulfilment."],
		rows: [
			["～といい／～たらいい／～ばいい", "common", "可表希望，也可给建议；合格するといいね是祝愿，わからなければ聞けばいい是建议。", "Can express hope or advice: 合格するといいね is a wish; わからなければ聞けばいい is advice."],
			["～ば／～たら＋よかった", "common", "在后悔用法中，实际没做或做法不好：早く出ればよかった＝当初该早点出门。", "In the regret use, an action was missed or unwise: 早く出ればよかった means I should have left earlier."],
			["～ば／～たら…のに", "common", "表达与现实有落差的愿望或遗憾，也可能暗含责备；不能看到たら就一律当过去式。", "An unrealized wish or regret, sometimes reproachful; たら alone does not force past-time reference."],
			["～ないかな（あ）", "everyday", "可委婉期待事情发生：早く来ないかな＝怎么还不快来呢／真希望快来，并非希望别来。", "Can hope for something to happen: 早く来ないかな hopes someone comes soon, not that they stay away."],
		],
	},
	"5-4": {
		title: ["范围与终点：まで・までに・にかけて", "Ranges, endpoints, and deadlines"],
		tip: ["まで持续到终点；までに在期限前完成；から～にかけて给较宽泛的范围。", "まで continues up to an endpoint; までに sets a deadline; から～にかけて gives a broader span."],
		rows: [
			["～まで／～までに", "everyday", "5時まで待つ＝等到五点；5時までに来る＝最迟五点来。一个是持续终点，一个是完成期限。", "5時まで待つ: wait until five; 5時までに来る: come by five. Endpoint versus deadline."],
			["Nまで", "common", "骨まで食べる的まで是‘连骨头都’，不是时间终点；与さえ都能突出极端例子。", "骨まで食べる means even eating the bones, not a time endpoint; like さえ, it can highlight an extreme case."],
			["～から～にかけて", "common", "时间或地点的大致范围，边界通常不如から～まで明确；不适合替代精确截止时间。", "A rough time or geographical span, typically less sharply bounded than から～まで; not a precise deadline marker."],
			["Nにおいて", "formal", "正式说明事件发生的场所或领域；日常说大阪で开会即可，不必把所有で换成において。", "A formal location or domain of an event; ordinary speech can use 大阪で, without replacing every で."],
		],
	},
	"5-5": {
		title: ["假设、可能性与部分否定", "Concession, possibility, and partial negation"],
		tip: ["たとえ强调条件再怎样也不变；かもしれない保留可能性；とは限らない否定‘一定’，不是否定全部。", "たとえ keeps the outcome unchanged; かもしれない leaves a possibility open; とは限らない denies certainty, not everything."],
		rows: [
			["たとえ～ても", "common", "即便作出极端假设，后项仍成立；不是原因，也不表示该假设一定会发生。", "The outcome holds even under an extreme hypothesis; this neither gives a cause nor predicts that the condition will occur."],
			["もしかすると～かもしれない", "common", "不确定的可能性；与はずだ的有根据预期相比，说话人保留更多余地，不对应固定概率。", "An uncertain possibility, less committed than an evidence-based はずだ; no fixed percentage is encoded."],
			["必ずしも～とは限らない", "common", "不一定都成立：高い物がいいとは限らない不等于高的都不好。", "Not invariably true: expensive things are not necessarily good does not mean all expensive things are bad."],
			["まるで～よう／～みたい", "common", "强调比喻‘简直像’，不是说两者真的相同；みたい更口语。", "An emphatic resemblance, not literal identity; みたい is more conversational."],
		],
	},
	"5-6": {
		title: ["だけど・ところが・ところで：别看混", "Contrast, unexpected results, and topic changes"],
		tip: ["普通转折→だけど；意外结果→ところが；另起话题→ところで；推出结果→ですから。", "Ordinary contrast → だけど; unexpected result → ところが; topic change → ところで; consequence → ですから."],
		rows: [
			["だけど／しかし", "everyday", "一般转折；だけど偏口语，しかし偏正式，不一定有超出预期的事实。", "General contrast; だけど is conversational, しかし more formal. An unexpected fact is not required."],
			["ですから／だから", "common", "承接理由推出结果或判断；ですから较礼貌，但礼貌形式不保证语气不会强硬。", "A consequence or judgement based on a reason; ですから is polite in form but can still sound forceful."],
			["ところが", "common", "后面揭示和计划、预期不同的事实；比普通‘但是’更强调出乎意料。", "Introduces a fact contrary to plans or expectations, with more surprise than a general 'but'."],
			["ところで", "everyday", "转到另一个话题，相当于‘对了／话说’；没有ところが的意外转折义。", "Changes topic ('by the way'); not the unexpected contrast expressed by ところが."],
		],
	},
	"6-1": {
		title: ["もし・もしも・としても：假设不等于反事实", "Hypotheses are not automatically counterfactual"],
		tip: ["是否与事实相反要结合上下文；もし本身只提示假设，ても／としても才引出让步。", "Context determines counterfactuality; もし signals a hypothesis, while ても/としても adds concession."],
		rows: [
			["もし～たら／～なら", "common", "既能说未来可能情况，也能说与事实相反的情况；もし雨が降ったら仍可谈明天，不是已经下雨。", "Can concern future possibilities or unreal alternatives; もし雨が降ったら can refer to tomorrow, not past rain."],
			["～としても／～としたって", "common", "即使假设A成立，B仍然如此；不必强行判断A概率很低。したって更口语。", "Even supposing A, B still holds; A need not have a low probability. したって is more colloquial."],
			["もしも", "common", "比もし更突出‘假如真的’，不是独立的新条件接续，仍与なら、たら等配合。", "Emphasizes the supposition more than もし; it still needs a conditional construction such as なら or たら."],
		],
	},
	"6-2": {
		title: ["决定与有限承认：こと后面要读完", "Decisions and qualified admission"],
		tip: ["ことになる侧重安排结果；ことにする侧重自己决定；ことは重复承认，ないことはない是弱肯定。", "ことになる focuses on an arrangement; ことにする on one's decision; ことは repeats a concession; ないことはない gives a weak affirmative."],
		rows: [
			["～ことになる／～ことになっている", "common", "前者说决定或事态发展，后者说已有安排、规定；不必推断本人绝对没参与决定。", "The former presents a decision or development; the latter an existing arrangement or rule. Personal involvement is not ruled out."],
			["～ことにする／～ことにしている", "common", "自己决定做；している常指坚持某习惯。与ようにしている相比，更突出明确的自定规则。", "A personal decision; している often describes a maintained practice. More explicitly self-imposed than ようにしている."],
			["～ことは～が", "common", "先承认，再加限制：話せることは話せるが…＝会说是会说，不过……；不是完全否认。", "Admits the claim before qualifying it: 話せることは話せるが… means I can speak it, but…, not complete denial."],
			["～ないことはない", "common", "并非不……，留下条件或保留；食べないことはない比积极的食べたい弱得多。", "'It is not that I don't…', with reservations; 食べないことはない is far weaker than an eager 食べたい."],
		],
	},
	"6-3": {
		title: ["ところ・はじめて・うちに：看动作发生在哪一段", "ところ, はじめて, うちに: locate the event"],
		tip: ["Vたところ可说尝试后的发现；Vるところだった可说险些发生；てはじめて突出‘直到这时才’。", "Vたところ can introduce a discovery; Vるところだった a near miss; てはじめて highlights 'only after'."],
		rows: [
			["Vたところ", "common", "本课是做了A后发现B，不同于Vたところだ‘刚做完’；有没有句尾だ会影响结构。", "Here it introduces what was found after doing A; distinguish Vたところだ, 'have just done'. The structure matters."],
			["Vるところだった", "common", "在もう少しで等险些语境中，实际没发生；单独这个形式也可能只描述当时正要做。", "In a near-miss context such as もう少しで, it did not happen; the form alone can also mean one was about to act."],
			["Vてはじめて", "common", "经历A后才首次做到或意识到B；比普通Vて更突出此前一直没有。", "Only after A does B first happen or become understood; emphasizes that B had not happened before."],
			["～うちに", "common", "趁状态未变做事；Vているうちに也可说过程中自然发生变化，不一定都是主动抓机会。", "Act before a state changes; Vているうちに can also describe a change arising naturally during an activity."],
		],
	},
	"6-4": {
		title: ["わけ的四种形式：难怪、并非、不可能、不能", "Four わけ constructions"],
		tip: ["わけではない是否定一种解释；わけがない是否定可能性；わけにはいかない是受责任或情况约束。", "わけではない rejects an interpretation; わけがない rejects possibility; わけにはいかない expresses a practical or moral constraint."],
		rows: [
			["～わけだ", "common", "有了理由，理解结果为何如此：暖房がついている。暑いわけだ＝开着暖气，难怪热。", "A reason makes the result understandable: the heater is on, so no wonder it is hot."],
			["～わけではない", "common", "否定某个解释或概括；嫌いなわけではない只否认讨厌，不等于热烈喜欢。", "Rejects an interpretation or generalization; denying dislike does not mean enthusiastic liking."],
			["～わけがない", "common", "凭判断强烈否定可能性，语气比单纯ない强；并非外部禁止。", "Strongly rejects a possibility on the speaker's judgement; not an external prohibition."],
			["～わけにはいかない", "common", "能力上可能能做，但责任或情况不允许；Vないわけにはいかない反过来表示不得不做。", "Possible in ability, but ruled out by obligations or circumstances; Vないわけにはいかない means one must do it."],
		],
	},
	"6-5": {
		title: ["否定副词：绝不、完全不、很少、一点也不", "Negation: never, not at all, rarely"],
		tip: ["めったに只说频率低，不等于零；決して强调坚决否定；まったく与少しも常强调程度为零。", "めったに means low frequency, not zero; 決して emphatic negation; まったく/少しも often indicate zero degree."],
		rows: [
			["決して～ない", "common", "坚决否定，可表决心也可表判断；決して忘れない＝绝不会忘，不是‘不常忘’。", "Emphatic negation, whether resolve or judgement: 決して忘れない means never forget, not rarely forget."],
			["まったく～ない", "common", "完全不、毫无；注意まったく也能用于肯定如まったく同じ，不是永远只能配ない。", "Not at all; note that まったく can also modify affirmatives, as in まったく同じ ('exactly the same')."],
			["めったに～ない", "common", "很少发生但仍可能发生；めったに行かない不能翻成从来不去。", "Rare but possible; めったに行かない does not mean never go."],
			["少しも／ちっとも～ない", "common", "连一点也不，强调零程度；ちっとも较口语，抱怨时常见。", "Not even a little; ちっとも is more conversational and frequent in complaints."],
		],
	},
	"6-6": {
		title: ["追加还是选择：それと・それとも・その上", "Addition or choice: それと, それとも, その上"],
		tip: ["再加一项用それと；两者选一问对方用それとも；继续增加同方向理由用その上。", "Add an item with それと; ask between alternatives with それとも; add a further supporting point with その上."],
		rows: [
			["それと／あと／それから", "everyday", "补充另一项；それから还可表之后的时间顺序，不能所有场合都译成‘另外’。", "Adds another item; それから can also mark chronological sequence, not just addition."],
			["それとも", "everyday", "在疑问中提出另一选项：コーヒー、それとも紅茶？不是要求两样都要。", "Presents another option in a question: coffee or tea? It does not request both."],
			["その上／それに", "common", "再加一个同方向的理由或特点；その上递进感较强，和ところが的意外转折相反。", "Adds a point in the same direction; その上 is more emphatically additive, unlike the unexpected contrast of ところが."],
		],
	},
};

export const COMPLETION_COMPARISON = [
	["～終わる", "N4", "everyday", "单纯说动作结束：読み終わった＝读完了。", "Neutral completion: 読み終わった = finished reading."],
	["～終える", "N3前后／around N3", "formal", "意思近終わる，偏正式，突出主动完成；読み終わる也能表示主动动作。", "Similar to 終わる, but more formal and agentive; 読み終わる can also describe a deliberate action."],
	["～てしまう", "N4", "everyday", "做完、了结，或带遗憾：先做完作业可用やってしまう，不必有后悔。口语常缩成ちゃう／じゃう。", "Finish/get something done, or express an unwanted outcome; finishing homework need not imply regret. Often contracted to ちゃう/じゃう."],
	["～抜く", "N2", "situational", "突出克服困难坚持到底：走り抜いた＝坚持跑到了最后。", "Persevere to the end despite difficulty: 走り抜いた = ran all the way through."],
	["～尽くす", "N1", "situational", "彻底做尽或耗尽：使い尽くした＝用尽了；比普通完成更强调毫无保留。", "Do exhaustively or exhaust a resource: 使い尽くした = used it all up."],
	["～済み", "N2", "formal", "已办妥的状态：支払い済み＝已付款；生活界面和工作文字常见，不宜给所有动词随意接。", "An already-completed status: 支払い済み = paid. Common in interfaces and work documents; not freely attachable to every verb."],
] as const;

export const SUMMARY_SOURCES = [
	["JLPT：等级清单说明 / Level-list policy", "https://www.jlpt.jp/e/faq/"],
	["終わる・N4", "https://jp.ikuchannel.com/grammar/pattern-owaru-finish"],
	["終える・N3", "https://mainichi-nonbiri.com/grammar/n3-owaru/"],
	["てしまう・N4", "https://mhw-enjoy.com/2021/05/26/n4-017/"],
	["抜く・N2", "https://j-nihongo.com/n2-index-d4f9150899/"],
	["済み・N2", "https://mainichi-nonbiri.com/grammar/n2-zumi/"],
	["尽くす・N1", "https://nihon5-bunka.net/japanese-grammar-advanced-tsukusu/"],
] as const;
