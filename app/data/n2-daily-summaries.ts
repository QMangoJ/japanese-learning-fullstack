import type { Bilingual, Usage } from "./n3-daily-summaries";

export type N2SummaryRow = { form: string; meaning: Bilingual; distinction: Bilingual; usage: Usage };
export type N2DailySummary = { title: Bilingual; rows: N2SummaryRow[]; related: string[] };
const r = (form: string, zh: string, en: string, contrastZh: string, contrastEn: string, usage: Usage = "common"): N2SummaryRow =>
	({ form, meaning: [zh, en], distinction: [contrastZh, contrastEn], usage });
const d = (zh: string, en: string, rows: N2SummaryRow[], related: string[]): N2DailySummary => ({ title: [zh, en], rows, related });

// Ordered exactly like the lesson points. Meanings describe the sense taught here.
export const N2_DAILY_SUMMARIES: Record<string, N2DailySummary> = {
	"1-1": d("样子、倾向与轻微状态", "Appearance, tendencies and mild states", [
		r("～げ", "显得……／看上去……", "Look / seem …", "从神情判断，如さびしげ；がち说反复倾向，不是眼前的表情。", "Infers a feeling from appearance; がち describes a recurring tendency, not a facial expression."),
		r("～がち", "容易……／常常……", "Tend to / often …", "病気がち指经常生病；病気気味只说目前有点不舒服。多用于不理想的倾向。", "病気がち means frequently ill; 気味 marks a mild current state. がち usually concerns undesirable tendencies."),
		r("～っぽい", "有……倾向／带有……感觉", "Prone to / …-ish", "忘れっぽい像性格特征；水っぽい则说成分或质感，并非都指反复动作。", "忘れっぽい is a characteristic; 水っぽい describes texture or composition, not repeated behavior.", "everyday"),
		r("～気味", "有点……／略微……", "Slightly / a little …", "着重程度轻微，如疲れ気味；不能把任意形容词都直接接気味。", "Emphasizes a mild degree, as in 疲れ気味; it cannot freely attach to every adjective."),
	], ["appearance", "tendency"]),
	"1-2": d("もの：假设、理由与转折", "もの: hypotheses, reasons and contrast", [
		r("～ものなら", "如果能……的话", "If one could …", "常接可能形，设想难实现的愿望；普通的现实条件用たら即可。", "Often follows a potential form for a hard-to-realize wish; たら also covers ordinary realistic conditions."),
		r("～ものだから", "因为……（解释、辩解）", "Because … (explanation or excuse)", "强调导致自己行为的缘由，比ので更带个人解释意味。", "Highlights an explanation for one's behavior, with more personal justification than ので."),
		r("～んだもの／～んだもん", "因为……嘛", "Because …, you see", "句尾表达情绪性理由；亲密口语可能显得撒娇或辩解，不宜用于正式说明。", "An emotional, intimate reason that may sound pleading or defensive; avoid it in formal explanations.", "everyday"),
		r("～ものの", "虽然……但是……", "Although …", "承认前项事实再指出未达预期；不是ものだから的因果。偏书面。", "Accepts a fact but notes an unmet expectation; unlike ものだから, it is not causal.", "formal"),
	], ["condition", "concession"]),
	"1-3": d("追加、搁置与排除", "Adding, setting aside and excluding", [
		r("～はもとより", "……自不必说，……也……", "Not only … but also …", "把前项视为理所当然再追加后项；不是暂且不讨论前项。", "Treats the first item as obvious and adds another; it does not set the first aside.", "formal"),
		r("～はともかく", "……暂且不论", "Leaving … aside", "不评价前项好坏，把关注点转到后项。", "Leaves the first issue unresolved and focuses on the second."),
		r("～はまだしも", "……还说得过去，但……", "… might be acceptable, but …", "前项勉强可接受，后项更难接受；ともかく没有这层容忍程度对比。", "The first is tolerable but the second is worse; ともかく need not rank acceptability."),
		r("～抜きにして／～抜きで", "省去……／不谈……", "Without / leaving out …", "明确排除某内容；ともかく只是讨论顺序上先搁置。", "Explicitly excludes something; ともかく merely sets it aside for the discussion."),
	], ["addition", "only"]),
	"1-4": d("“……得不得了”：感受与困扰", "Intense feelings versus intolerable conditions", [
		r("～てたまらない", "……得不得了", "Unbearably / extremely …", "强烈感情、欲望或感觉都可用，如会いたくてたまらない，不限于坏情绪。", "Covers strong feelings, desires and sensations, including positive ones such as longing to meet."),
		r("～てしょうがない", "……得不得了／……得没办法", "So … one cannot help it", "口语中强调程度，常与てしかたがない相通，不一定表示真的无法解决。", "Conversational intensity, close to てしかたがない; not necessarily literal impossibility of a solution.", "everyday"),
		r("～てかなわない", "……得受不了", "Cannot stand how …", "突出噪音、炎热等造成的难受；不用于うれしい这类喜悦的夸张。", "Stresses discomfort from heat, noise and similar conditions, not exaggerated happiness."),
		r("～てならない", "不由得非常……", "Cannot help feeling deeply …", "常说残念、心配、思えて等自然涌出的感受；比しょうがない偏郑重。", "Often marks involuntary feelings or impressions; more restrained/formal than しょうがない.", "formal"),
	], ["emotion", "cannotHelp"]),
	"1-5": d("不是不做，还是忍不住做？", "Qualified affirmation or irresistible action?", [
		r("～ないことはない", "也不是不……", "It is not that … not …", "双重否定保留肯定余地，常有条件或保留意见；不是强烈肯定。", "A qualified affirmation, often with reservations or conditions, not a strong yes."),
		r("～ないこともない", "倒也不是不能……", "It is not entirely impossible …", "与ないことはない接近，も常让语气更保留，不宜硬分成不同事实含义。", "Close to ないことはない; も can make the admission more tentative, not fundamentally different."),
		r("～ないではいられない", "忍不住要……", "Cannot help doing …", "控制不住情绪或生理反应而做；并非外部规则要求必须做。", "An urge or reaction one cannot suppress, rather than an externally imposed obligation."),
		r("～ずにはいられない", "忍不住要……", "Cannot help doing …", "与ないではいられない同义，偏书面；する变せず，不是しず。", "A more written equivalent of ないではいられない; する becomes せず.", "formal"),
	], ["partial", "forced"]),
	"1-6": d("必须、禁止与不能再继续", "Obligation, prohibition and no longer being able", [
		r("～ねばならない", "必须……", "Must …", "义务表达，较书面；する→せねばならない。与てはならない的禁止方向相反。", "Formal obligation; する becomes せねばならない. Opposite in direction to the prohibition てはならない.", "formal"),
		r("～てはならない", "不可以……／不得……", "Must not …", "要求不要发生该动作，常见于规则或郑重告诫。", "Prohibits the action, especially in rules or serious warnings.", "formal"),
		r("～ていられない", "不能再……下去", "Cannot keep …", "时间、处境等不允许维持某动作或状态，不一定是有人禁止。", "Circumstances prevent continuation; it need not be a ban imposed by someone."),
		r("～てばかりはいられない", "不能总是……／不能光……", "Cannot spend all one's time …", "否定一直只做某事，并不要求完全停止，如不能光玩但仍可适度休息。", "Rejects doing only that activity, not necessarily doing it at all."),
	], ["obligation", "forced"]),
	"2-1": d("付出是否值得，与做到何种程度", "Worthwhile effort and going to extremes", [
		r("～かいがある", "……没有白费／有效果", "… pays off / is worthwhile", "用实际成果肯定前面的努力；がい可单说某活动本身值得。", "Credits effort for a result; がい can describe the inherent value of an activity."),
		r("～かいもなく", "……也白费了", "Despite …, the effort was in vain", "付出努力仍未获得希望的结果；不是根本没有努力。", "Effort failed to deliver the hoped-for result, not that no effort was made."),
		r("Vます去ます＋がい", "……的价值／值得……", "Worth / satisfaction in doing …", "やりがい说值得做的价值或成就感，并不保证事情已经完成。", "やりがい is value or fulfillment in doing, not proof of completion."),
		r("～てまで／～までして", "甚至不惜……", "Even going so far as to …", "强调为目的付出的极端代价，常带质疑；不同于时间终点的まで。", "An extreme cost paid for a goal, often questioned by the speaker; not a time endpoint."),
	], ["thanks", "even"]),
	"2-2": d("开始、做尽、可能与坚持到底", "Starting, finishing, possibility and perseverance", [
		r("～かける／～かけ", "开始……／做到一半", "Begin / leave … unfinished", "読みかけの本尚未读完；文脉中也可表示动作即将发生，不等于完成。", "読みかけ marks unfinished reading; some contexts mean an action is starting or imminent."),
		r("～切る", "全部……完／彻底……", "Do completely / use up", "読み切る关注全部读完，抜く关注克服困难坚持到底。", "読み切る emphasizes entirety; 抜く emphasizes perseverance."),
		r("～得る／～得ない", "可能……／不可能……", "Can possibly / cannot possibly …", "讨论事情的可能性，不是个人技能；否定读えない，不读うない。", "Event possibility, not personal skill; the negative reading is えない, not うない.", "formal"),
		r("～抜く", "坚持……到底", "Persevere through / to the end", "突出艰难过程中的坚持；没有困难色彩的普通结束用終わる即可。", "Highlights perseverance through difficulty; 終わる suffices for a neutral ending."),
	], ["finish", "completion", "possible"]),
	"2-3": d("时机、瞬间与限定范围", "Time windows, immediacy and limits", [
		r("～うちに", "趁……／在……期间", "While / before a state changes", "忘れないうちに抓住尚未改变的状态；也可说期间内逐渐发生的变化。", "忘れないうちに uses a window before change; the form can also mark change during an interval."),
		r("～か～ないかのうちに", "刚一……就……", "Almost at the very moment …", "前后几乎同时，强调紧接；不是うちに的一段可利用时间。", "Events are nearly simultaneous, unlike the broader window in うちに."),
		r("～限り", "只要……／就……范围而言", "As long as / as far as …", "いる限り是条件持续；知る限り是知识范围。要按前接内容分义。", "いる限り sustains a condition; 知る限り limits knowledge. Interpret the preceding predicate."),
		r("～に限り／～に限らず", "仅限……／不限于……", "Limited to / not limited to …", "に限り限制对象资格；に限らず则明确扩大范围，方向相反。", "に限り restricts eligibility; に限らず explicitly broadens it.", "formal"),
	], ["deadline", "only"]),
	"2-4": d("充分条件、强调原因与单向变化", "Sufficient conditions, reasons and trends", [
		r("～さえ～ば", "只要……就……", "As long as …, that is enough", "提出最低充分条件；不能把さえ一律解释成‘连……都’。", "Presents a sufficient minimum condition; not simply the emphatic 'even' sense."),
		r("～からこそ", "正因为……才……", "Precisely because …", "强调已成立的原因；てこそ更常强调必要前提。", "Emphasizes an established reason; てこそ often highlights a necessary prerequisite."),
		r("～てこそ", "只有……才……", "Only by / only when …", "把前项作为实现后项价值或结果的关键条件，不只是事情先后顺序。", "Makes the first action a key prerequisite, not merely the earlier event."),
		r("～ばかりだ", "不断……／只剩下……", "Keep … / only … remains", "上がるばかりだ是单向变化；後は出発するばかりだ是准备好后只剩一事。", "上がるばかり marks a trend; 後は出発するばかり means only departure remains."),
	], ["condition", "trend"]),
	"2-5": d("立场不等于假设", "A viewpoint is not a hypothesis", [
		r("～にしたら／～にすれば", "站在……的立场", "From …'s standpoint", "子どもにしたら以孩子为评价者；だとしたら则假设某件事成立。", "にしたら identifies a person's viewpoint; だとしたら hypothesizes a proposition."),
		r("～としたら／～とすれば", "假如……的话", "If we suppose …", "暂时把前项设为事实，并不确认其真假。", "Provisionally assumes the premise without confirming its truth."),
		r("～としても", "即使……也……", "Even assuming …", "让步承认前项，但后项判断仍不改变。", "Concedes a premise while maintaining the following judgment."),
		r("NをNとして", "把……作为……", "Use / regard … as …", "目的として指定用途、身份；不表示‘即使’的让步。", "Specifies a purpose or capacity, not the concessive meaning 'even if'.", "formal"),
	], ["viewpoint", "role"]),
	"2-6": d("一起、伴随与逐步变化", "Togetherness and linked change", [
		r("～とともに", "与……一起／随着……", "Together with / as …", "家族とともに是共同参与；变化动词后可表示同时发展。", "家族とともに is joint participation; with change predicates it can mark parallel development.", "formal"),
		r("～にともなって", "伴随……／随着……", "Accompanying / as …", "强调一种变化带来相关变化；可包含制度调整等有意采取的措施。", "Links developments, including deliberate measures taken in response.", "formal"),
		r("～につれて", "随着……逐渐……", "As … gradually …", "常用于两种自然发生的渐进变化，不用来单纯下命令。", "Typically links gradual developments, not a simple instruction."),
		r("～にしたがって", "随着……／按照……", "As … / in accordance with …", "北へ行くにしたがって是比例变化；指示にしたがって是服从指示。", "Movement north can correlate with change; 指示にしたがって means following instructions."),
	], ["proportion", "while"]),
	"3-1": d("按照、任凭、感想与过度原因", "Following, yielding, reactions and excess", [
		r("～とおり／～どおり", "按照……／正如……", "As / exactly as …", "强调与标准、说明一致；不含ままに那种听任的意味。", "Matches a model or instruction without the yielding nuance of ままに."),
		r("～ままに", "任凭……／听任……", "As dictated by / freely as …", "言われるままに是听任别人指示；思うままに是随心，不只是保持状态。", "言われるままに yields to instructions; 思うままに follows one's wishes, not just an unchanged state."),
		r("～ことに", "令人……的是", "To one's …", "先给出说话人的感受，再说明事实；不是决定做某事的ことにする。", "Introduces the speaker's reaction before the fact, not a decision as in ことにする.", "formal"),
		r("～あまり", "由于过于……", "So … that …", "前项过强导致后项，常是不良结果；不能与‘不太’的あまり～ない混为一谈。", "An excessive state causes a result; distinct from あまり～ない, 'not very'."),
	], ["manner", "excess"]),
	"3-2": d("わけ：解释、部分否定、不可能与情理", "わけ: explanation, negation and constraints", [
		r("～わけだ", "难怪……／也就是说……", "No wonder / it follows that …", "知道原因后解释结果，或把事实换算成结论；不只是预测。", "Explains a result from its cause or derives a conclusion, not merely a prediction."),
		r("～わけではない", "并不是……／并非都……", "It is not that / not always …", "否定过度推论；ほしくないわけではない是并非不想要，注意双重否定。", "Rejects an overstatement; ほしくないわけではない admits some desire through double negation."),
		r("～わけがない", "绝不可能……", "There is no way …", "强烈否定事实可能性，不是受责任约束不能做。", "Rejects possibility, unlike a responsibility-based inability to act."),
		r("～わけにはいかない", "不能……（情理上不允许）", "Cannot … given one's obligations", "能力上可能，但责任或处境不允许；ないわけにはいかない反而是必须做。", "Possible in ability but blocked by obligations; ないわけにはいかない means one must do it."),
	], ["expected", "impossible"]),
	"3-3": d("瞬间发生与经过周折的结果", "Immediate events versus eventual outcomes", [
		r("～たとたん（に）", "刚一……就……", "The instant …", "常接突发结果；后项通常不接自己的请求、命令或计划。", "Usually introduces a sudden result, not the speaker's request, command or plan."),
		r("～あげく（に）", "折腾……之后，最终……", "After much …, end up …", "强调一番周折后不理想的结果；末に可用于好结果。", "Typically ends a troublesome process badly; 末に also allows favorable outcomes."),
		r("～末（に）", "经过……最终……", "After …, finally …", "突出长过程后的决定或结果，本身不限定好坏。", "Highlights a final decision or result after a process, without inherently judging it bad."),
		r("～かと思ったら", "刚……就……／本以为……却……", "No sooner … than / thought … but …", "本课强调两事快速接连、令人意外；不是普通有计划的动作顺序。", "Here marks a surprising rapid succession rather than an ordinary planned sequence."),
	], ["after", "immediate"]),
	"3-4": d("ところ与どころ：时点还是否定期待", "ところ versus どころ", [
		r("～ところ", "正当……的时候", "At a time when …", "お忙しいところ常用于致歉或致谢，把对方所处状态作为背景。", "お忙しいところ acknowledges someone's situation, often in apologies or thanks."),
		r("～たところ", "……之后发现……", "On doing …, found …", "后接调查、尝试所得结果；与句末たところだ的‘刚刚做完’不同。", "Reports a finding after an action, unlike sentence-final たところだ, 'just finished'."),
		r("～どころではない", "哪里顾得上……", "Not in a position to …", "因更紧迫事情而无法顾及，不是动作能力本身不会。", "A more pressing situation prevents attention, not a lack of skill."),
		r("～どころか", "别说……，反而／连……都……", "Far from … / let alone …", "可以反向推翻，也可用更极端事实修正预期；不一定是完全相反。", "Can reverse an expectation or replace it with a more extreme fact, not always a logical opposite."),
	], ["justFinished", "concession"]),
	"3-5": d("满是、此后一直与放着不管", "Covered in, ever since and left unchanged", [
		r("～だらけ", "满是……／尽是……", "Full of / covered in …", "错误、灰尘等大量存在，多为负面；不是持续做某动作。", "Many usually undesirable things such as errors or dust, not a continuing action."),
		r("～たきり", "……之后就一直没……", "Ever since …, without …", "行ったきり常省略戻らない；另有つきっきり等固定搭配，不能都按‘只有’理解。", "行ったきり often implies not returning; distinguish fixed expressions such as つきっきり."),
		r("～っぱなし", "一直……／……后放着不管", "Keep … / leave … as it is", "立ちっぱなし说连续站着；開けっぱなし常说该关却没关，两种侧重点不同。", "立ちっぱなし is continuous standing; 開けっぱなし often implies neglecting to close something."),
	], ["state", "continue"]),
	"3-6": d("对比两面，还是单向发展", "Contrasting aspects versus a one-way trend", [
		r("～に反して", "与……相反", "Contrary to …", "常以预想、意愿等为被违背的标准；不只是一般对象比较。", "Contradicts an expectation or wish, rather than merely comparing two objects."),
		r("～反面", "另一方面却……", "On the other hand …", "同一事物的两面形成对照，常见优点与缺点。", "Contrasts two aspects of the same thing, often a benefit and a drawback."),
		r("～一方（で）", "一方面……另一方面……", "While / on the other hand …", "可对比同一事物的两面，也可对比不同主体，比反面范围宽。", "Can contrast aspects or different subjects, broader than 反面."),
		r("～一方だ", "不断……／越来越……", "Keep … / increasingly …", "前接变化动词，表示单向发展；不是一方で的两面比较。", "Follows a change verb for a one-way trend, not the two-sided contrast of 一方で."),
	], ["whereas", "trend"]),
	"4-1": d("上：追加、先后、责任与视点", "上: addition, sequence, commitment and viewpoint", [
		r("～上に", "不仅……而且……", "Not only … but also …", "追加同方向的优点或缺点，不表示先完成一个动作。", "Adds another quality in the same evaluative direction, not an earlier action."),
		r("～た上で", "……之后再……", "After doing …, then …", "先做前项作为判断或行动的基础；Vる上で另表示‘在做……方面’。", "A prerequisite action before a decision; Vる上で instead concerns doing something."),
		r("～上は", "既然……就……", "Now that …, must / will …", "后项常为责任、决心或要求；不是单纯叙述时间先后。", "Leads to a commitment, duty or demand, not just a sequence.", "formal"),
		r("Nの上では", "从……来看／在……上", "On / in terms of …", "天気図の上では限定判断依据，不保证实际情况完全相同。", "Limits a judgment to the chart or basis stated, not necessarily reality."),
	], ["addition", "after"]),
	"4-2": d("面向谁，以及次第的三个意思", "Audience and three senses of 次第", [
		r("～向け／～向き", "面向……／适合……", "Designed for / suitable for …", "向け强调制作对象；向き强调适合程度，不必是专门设计。", "向け names the intended audience; 向き means suitable, even if not designed for it."),
		r("N次第で", "取决于……", "Depending on …", "天气等条件决定结果；不是动作一完成就做。", "A condition determines the outcome, not an immediate next action."),
		r("Vます去ます＋次第", "一……就马上……", "As soon as …", "常宣布接下来会采取的行动，不用来回忆已经发生的先后事件。", "Announces a prompt intended action, not a retrospective sequence.", "formal"),
		r("～次第です", "事情原委是……／故此……", "That is why / how …", "郑重解释经过或缘由，不是‘取决于’的条件。", "Formally explains circumstances or reasons, not a determining condition.", "formal"),
	], ["immediate", "reason"]),
	"4-3": d("回应、对象、依据与关联", "Responding, targeting, grounding and involvement", [
		r("～にこたえて", "回应……／满足……", "In response to …", "常接期待、要求，强调采取行动回应；に対して只标对象时不保证满足要求。", "Responds to expectations or requests; に対して alone does not imply meeting them."),
		r("～に対して", "对……／与……相对", "Toward / in contrast to …", "人物后常标态度对象；句子后也可对比。不能统一当‘关于’。", "Marks a target or contrast; it is not simply a topic marker."),
		r("～により／～によって", "依据……／由于……／通过……", "Under / due to / by means of …", "法律により是依据；原因、手段、因人而异等要看谓语，不能机械套一个译法。", "With laws it marks a basis; cause, means and variation depend on the predicate.", "formal"),
		r("～にかかわって", "涉及……／参与……", "Be involved in / concern …", "指实际关联或参与；不同于にかかわらず的‘不管’。", "Actual involvement or connection, unlike にかかわらず, 'regardless of'."),
	], ["topic", "basis"]),
	"4-4": d("明明却、一边与逐渐变化", "Concession, simultaneity and ongoing change", [
		r("～ながら（も）", "虽然……却……", "Although …", "知りながら是明知却做；聞きながら歩く才是一边听一边走。", "知りながら is concessive; 聞きながら歩く is simultaneous."),
		r("～つつ（も）", "虽然……却……／一边……", "Although / while …", "逆接常表现明知不该却仍做；同时义偏书面，接ます词干。", "Concessive use often contrasts knowledge with conduct; simultaneous use is written and takes the verb stem.", "formal"),
		r("～つつある", "正在逐渐……", "Be in the process of becoming …", "强调正在发展的变化，不是任意瞬间动作都能套用。", "An unfolding development, not any arbitrary momentary action.", "formal"),
		r("～くせして", "明明……却……", "Even though … (reproachfully)", "くせに的口语形式，有责怪或轻蔑，不宜中性评价别人。", "Colloquial くせに with blame or contempt, not a neutral evaluation.", "everyday"),
	], ["concession", "while"]),
	"4-5": d("应当、被迫、规定与仅仅", "Duty, compulsion, arrangements and limitation", [
		r("～べきだ／～べきではない", "应该……／不应该……", "Should / should not …", "根据道理提出评价，不是未来事实必然发生的预测。", "A judgment of what is right, not a prediction of what will happen."),
		r("～ざるを得ない", "不得不……", "Have no choice but to …", "外部条件迫使选择，未必愿意；不是忍不住的自发情绪。する→せざる。", "Circumstances force an unwanted choice, not an irresistible emotion; する becomes せざる.", "formal"),
		r("～ことになっている", "按规定／安排要……", "Be arranged / required to …", "既定安排或制度，不代表实际已经执行；个人习惯用ことにしている。", "An arrangement or rule, not proof of execution; personal rules use ことにしている."),
		r("～にすぎない", "只不过……而已", "Be nothing more than …", "压低评价或限定程度，比中性だけ更强调‘没那么大意义’。", "Downplays significance more explicitly than neutral だけ.", "formal"),
	], ["obligation", "only"]),
	"4-6": d("正式场合的时机、遵循与范围", "Formal occasions, guidance and extent", [
		r("～にあたり／～にあたって", "在……之际", "On embarking on / on the occasion of …", "多用于开始重要行动时的准备、决心或致辞；不是所有‘时候’都自然。", "Often introduces preparations or remarks for an important undertaking, not every ordinary 'when'.", "formal"),
		r("～に沿って", "沿着……／按照……", "Along / in line with …", "按计划、方针的方向推进；基づいて更突出作为判断或创作的根据。", "Follows the direction of a plan; 基づいて stresses a foundation or evidence.", "formal"),
		r("～に先立ち／～に先立って", "在……之前先……", "Prior to …", "先为后续重要事件做准备等；不同于同时发生的にあたり。", "An action prior to a significant event, often preparation, not simply at that occasion.", "formal"),
		r("～にわたって", "历时……／遍及……", "Over / throughout …", "强调整个时间或地域范围；から～にかけて只给较大致的起止。", "Stresses full extent; から～にかけて gives a broader approximate span.", "formal"),
	], ["occasion", "span"]),
	"5-1": d("不可能、恐怕会与难以做到", "Impossible, liable to happen, or difficult", [
		r("～っこない", "绝不可能……", "There is no way …", "口语强烈否定可能，接ます词干；不是普通否定意志‘不做’。", "Strong colloquial denial of possibility, not simply a decision not to act.", "everyday"),
		r("～かねない", "可能会……（不良结果）", "Might well … (undesirably)", "虽有ない却肯定风险存在；与かねる的‘难以做’方向不同。", "Despite ない, affirms a risk; it does not negate possibility as かねる does."),
		r("～かねる", "难以……／恕不能……", "Be unable / reluctant to …", "常因立场或规则婉拒，如お答えしかねます，不指日常技能不会。", "Often a polite refusal due to policy or position, not lack of an everyday skill.", "formal"),
		r("～がたい", "难以……", "Hard to …", "常接信じる、許す、理解する等，强调心理上难以接受；不是任意体力困难。", "Often used with believing, forgiving or understanding; not a general marker of physical difficulty.", "formal"),
	], ["possible", "difficulty"]),
	"5-2": d("事实根据、性格推断、不做与必要条件", "Evidence, character, omission and prerequisites", [
		r("～ことから", "由于……这一点", "From the fact that …", "事实可作为命名或推断的根据，不限于直接造成事件的原因。", "A fact can motivate a name or inference, not just directly cause an event.", "formal"),
		r("人のことだから", "因为是……那样的人", "Knowing … / given their character", "依据熟悉的性格推测行为，不用来泛说任何物理原因。", "Predicts behavior from a familiar person's character, not arbitrary physical causes."),
		r("～ことなく", "不……地／没有……地", "Without doing …", "休むことなく表示没休息，语气比ないで郑重；不等于没必要休息。", "States that resting did not occur, more formally than ないで; not that resting is unnecessary.", "formal"),
		r("～ないことには…ない", "不……就无法……", "Unless …, cannot …", "前项是必要条件，但满足前项不保证后项成功；如试过才知道。", "A necessary prerequisite, not a guarantee of success once met."),
	], ["reason", "without"]),
	"5-3": d("理所当然、情有可原、几乎相同与好歹", "Expected, understandable, equivalent or at least better", [
		r("～て当然だ", "……是当然的", "It is natural / expected that …", "按行为和结果判断合理；可以是不受欢迎但正常的结果。", "Judges an outcome expected or justified, even if undesirable."),
		r("～のももっともだ", "……也难怪／有道理", "It is understandable that …", "侧重理解对方反应的理由；不是连接词もっとも的‘不过’。", "Finds someone's reaction reasonable; distinct from connective もっとも, 'though'."),
		r("～も同然だ", "几乎等于……", "Be practically the same as …", "事实未必完全相同，但程度已可视同；不表示‘当然会发生’。", "Treats something as virtually equivalent, not as an inevitable event."),
		r("～だけましだ", "至少……还算好", "At least … is better", "与更差情况比较，仍可能不满意；不是全面称赞。", "Better than a worse alternative, not unqualified praise."),
	], ["expected", "rather"]),
	"5-4": d("だけ与ばかり：结果、追加、原因", "だけ and ばかり: credit, addition and blame", [
		r("～だけあって", "不愧是……／正因为……", "As expected of / precisely because …", "由身份或经验解释与之相称的结果；ばかりに专重不良原因。", "Explains a result fitting someone's status or experience; ばかりに blames a cause."),
		r("～ばかりか", "不仅……而且……", "Not only … but even …", "追加进一步的事实，通常同方向；不是因果关系。", "Adds a further fact, generally in the same direction, not a causal relation."),
		r("～ばかりに", "就因为……（造成坏结果）", "Just because … (unfortunately)", "将遗憾结果归于某原因，常带‘要不是这样就好了’的心情。", "Blames an unfortunate outcome on a cause, often with regret."),
		r("～のみならず", "不仅……而且……", "Not only … but also …", "书面追加，接续不同于のみに；意思接近だけでなく，不含责怪。", "Formal addition close to だけでなく; not the construction のみに and not blame.", "formal"),
	], ["addition", "becauseBad"]),
	"5-5": d("邀约、无方法、比喻与看来做不到", "Invitation, lack of means, simile and prospects", [
		r("意志形＋ではないか", "让我们一起……吧", "Let us …", "强烈号召，多见演说或郑重倡议；不是在否定动作。", "A rallying invitation, often in speeches; not a negation of the action.", "formal"),
		r("～ようがない", "没有办法……", "Have no way to …", "接ます词干，表示缺少手段，如住所不明で連絡しようがない。", "Takes the verb stem and marks missing means, such as no address for contacting someone."),
		r("～かのようだ", "仿佛……一样", "As if …", "把情形比作另一个情形，常暗示并非事实，但不强制断言为假。", "An as-if comparison often unlike reality, but not an obligatory assertion that it is false."),
		r("～そうにない", "看来不会……／似乎不能……", "Does not look likely to …", "根据当前迹象判断难以实现；不是绝对不可能。", "An unfavorable prospect based on current signs, not absolute impossibility."),
	], ["invitation", "appearance"]),
	"5-6": d("场合、依据、对应变化与条件之下", "Occasions, foundations, adaptation and circumstances", [
		r("～に際して", "在……之际", "On the occasion of …", "重要场合的正式说法，适用场景比侧重积极开始的にあたって更广。", "Formal significant occasions; broader in situations than にあたって's focus on undertaking something.", "formal"),
		r("～に基づいて", "基于……／依据……", "Based on …", "法律、事实、调查等作为根据；不只是沿着路线或顺序。", "Uses facts, rules or evidence as a foundation, not merely a route or sequence.", "formal"),
		r("～に応じて", "根据……相应地……", "In response / according to …", "配合需要或条件调整，不要求两者都自然渐变。", "Adapts to needs or conditions; neither side must be a gradual natural change."),
		r("～の下で／～の下に", "在……之下／在……条件下", "Under …", "青空の下是空间；指導の下是条件、影响或指导，不能都按位置翻译。", "Under a blue sky is spatial; under guidance is figurative, not a physical location."),
	], ["occasion", "basis"]),
	"6-1": d("自从、既然与某个时机", "Since, now that, and on an occasion", [
		r("～て以来", "自从……以来一直……", "Ever since …", "由过去某次事件起持续到参照时点；不是仅说先后顺序。", "Continuation from a past event to the reference time, not just sequence."),
		r("～以上（は）", "既然……就……", "Now that … / since …", "以前项为既定事实引出责任、决心或必要结论；此处不是数量以上。", "An established premise leads to commitment or necessity, not a numerical minimum."),
		r("～からには", "既然……就……", "Having …, must / will …", "与以上、上は意义接近，都强调承担后果；不必强行划出绝对界线。", "Close to 以上 and 上は in commitment; they do not have rigidly separate meanings."),
		r("～折（に）", "在……之际", "On the occasion of …", "用于来访、联系等郑重场景；普通生活的每个时刻不必改用折。", "A polite occasion such as visiting or contacting, not needed for every everyday moment.", "formal"),
	], ["after", "occasion"]),
	"6-2": d("谁的立场，还是哪条证据", "Whose viewpoint, or which evidence?", [
		r("～から言うと", "从……方面／立场说", "In terms of / from …'s standpoint", "限定评价角度，如立場、品質、値段，不是在转述某人说的话。", "Limits an evaluation to a standpoint or criterion; it does not quote someone."),
		r("～からすると", "从……判断", "Judging from …", "症状等是推断依据，也可说立场；注意不是必然因果。", "Symptoms can be evidence, or a person a viewpoint; not necessarily direct causation."),
		r("～からして", "单从……就……", "Even judging by …", "举一个有代表性的细节说明整体，常有‘连这一点都如此’的强调。", "Uses a representative detail to characterize the whole, often emphatically."),
		r("～から見ると", "在……看来／从……看", "From …'s point of view", "突出观察者或观察角度；与からすると有重叠，不必视为完全不同语法。", "Highlights an observer or perspective and overlaps with からすると."),
	], ["viewpoint", "evidence"]),
	"6-3": d("理由不充分、必要先后与范围评价", "Insufficient reasons, prerequisites and scope", [
		r("～からといって", "不能因为……就……", "Just because … does not mean …", "后项常否定过度结论；承认理由存在但认为不足以推出后项。", "Accepts a reason but rejects it as sufficient for a broad conclusion."),
		r("～てからでないと", "不先……就不能……", "Not until … / unless … first", "强调先完成必要手续等条件；てから只是普通先后。", "Requires a prerequisite to be completed; てから alone only orders actions."),
		r("～から～にかけて", "从……到……一带／期间", "From … through …", "起止界线常较大致，不强调毫无间断地覆盖全范围。", "Often approximate endpoints, without guaranteeing uninterrupted coverage."),
		r("～にかけては", "论……／在……方面", "When it comes to …", "常对某能力给予很高评价；不是时间范围的にかけて。", "Often praises ability in a particular field, not a time span."),
	], ["partial", "span"]),
	"6-4": d("传闻与まい的意志、推测", "Hearsay and two kinds of まい", [
		r("～とか", "听说……", "I hear …", "本课句末用法转述消息并留余地；NとかN是列举，不能混同。", "Sentence-final hearsay here leaves uncertainty; NとかN instead lists items."),
		r("～まい（意志）", "决不……／不打算……", "Will not / resolve not to …", "说话人有控制权时常表否定决心，如二度と行くまい。", "Often a negative resolve when the speaker controls the action.", "formal"),
		r("～まい（推测）", "大概不会……", "Probably will not …", "他人或非意志动作常为推测，近似ないだろう；不一定是禁止。", "Often conjecture about others or uncontrolled events, close to ないだろう, not prohibition.", "formal"),
		r("～ようか～まいか", "做还是不做……", "Whether to … or not", "两种选择之间犹豫；前面意志形，后面まい，接续并不对称。", "Hesitates between action and inaction; the affirmative is volitional, the negative uses まい.", "formal"),
	], ["hearsay", "intention"]),
	"6-5": d("确信、未必、唯一办法与本质", "Certainty, uncertainty, last resort and essence", [
		r("～に決まっている", "一定……／肯定……", "Be sure to / obviously …", "说话人强烈确信，未必有客观证据；并非已经正式作出决定。", "Strong subjective conviction, not necessarily objective proof or an official decision."),
		r("～とは限らない", "不一定……／未必……", "Not necessarily …", "否定无例外的概括，并非断言事情绝不会发生。", "Rejects a universal guarantee, not all possibility."),
		r("～よりほかない", "只能……／别无办法", "Have no option but …", "限定可采取的行动，与しかない接近；不是判断原因。", "Restricts available actions, close to しかない; it does not identify a cause.", "formal"),
		r("～にほかならない", "正是……／无非就是……", "Be nothing other than …", "强调原因或本质，结果にほかならない不是‘只好产生结果’。", "Identifies an essence or cause, not the lack of an alternative action.", "formal"),
	], ["evidence", "lastResort"]),
	"6-6": d("代表、讨论中心与正式地点", "Representative examples, debate and formal locations", [
		r("～をはじめ", "以……为代表", "Including … as a leading example", "列举典型成员，后面还有同类；不是只限于前项。", "Names a representative among others, not an exclusive limit."),
		r("～をめぐって", "围绕……", "Over / surrounding …", "常用于争论、纠纷或讨论中心；不宜替换所有普通について。", "Often centers a debate or dispute, not a universal replacement for について.", "formal"),
		r("～において", "在……（场所、领域）", "In / at …", "正式说明地点或领域，不作移动目的地，如不能以において代替学校に行く的に。", "A formal location or domain, not a destination marker for going somewhere.", "formal"),
		r("～にて", "在……／用……", "At / by means of …", "通知、书信等中对应で的郑重形式，按句子可标地点或手段。", "Formal で in notices or letters; location or means depends on context.", "formal"),
	], ["topic", "location"]),
	"7-1": d("不顾、尽管与不论", "Disregard, concession and irrelevance", [
		r("～もかまわず", "不顾……／不在乎……", "Without regard for …", "行为者不顾本应在意的情况；不是说明不同条件下结果都一样。", "Someone disregards a relevant concern, rather than an outcome being independent of conditions."),
		r("～にもかかわらず", "尽管……却……", "Despite …", "前项事实成立，后项与通常预期相反；にかかわらず不要求意外。", "An actual fact conflicts with the outcome expected from it; にかかわらず need not be surprising.", "formal"),
		r("～にかかわらず", "不管……／无论……", "Regardless of …", "排除条件的影响，不论来或不来都同样处理。", "Makes the result independent of the condition, whether someone comes or not.", "formal"),
		r("～を問わず", "不分……／不问……", "Irrespective of …", "常接年龄、国籍、经验等分类条件，强调资格不限。", "Commonly removes restrictions based on age, nationality or experience.", "formal"),
	], ["regardless", "concession"]),
	"7-2": d("列举、每逢、无论与既又", "Lists, recurring triggers, alternatives and addition", [
		r("～やら～やら", "……啦……啦", "… and … and so on", "不完全列举，常有杂多、忙乱或难以尽述的感觉。", "An incomplete list, often suggesting many things or a hectic mix."),
		r("～につけ～につけ", "每逢……或……就……", "Whenever … or …", "常引出自然产生的回忆或感情；不只是机械计算次数。", "Often triggers feelings or memories, not a mechanical count."),
		r("～にしろ～にしろ", "无论……还是……", "Whether … or …", "列出两种情况后给共同结论，不是建议从中任选一个。", "Gives a shared conclusion for both cases, not a suggestion to choose either."),
		r("～も～ば～も", "既……又……", "Both … and …", "这里ば连接并列优点或缺点，不是假设‘如果’。", "Here ば links parallel qualities, not a hypothetical condition."),
	], ["each", "addition"]),
	"7-3": d("もの：常理、劝告、评价与拒绝", "もの: norms, advice, evaluation and refusal", [
		r("～ものだ", "本来就是……／真想……", "It is natural that … / really wish to …", "一般谓语说常理；たいものだ说愿望。另有たものだ回忆习惯，先看接续。", "General predicates state norms; たいものだ expresses wishes; たものだ can recall past habits."),
		r("～ものではない", "不该……", "One should not …", "依据常理劝诫，不是单纯否定‘东西不是……’。", "Advises against conduct on general principles, not a literal statement about an object."),
		r("～というものだ", "才算是……／这就是……", "That is what … means / truly is", "表达说话人对事物性质的判断；不是介绍名称的というN。", "Evaluates the nature of something, not merely names it."),
		r("～ものか／～もんか", "绝不……／才不……", "As if I would / absolutely not …", "强烈反问式否定，常带抗拒；不是真诚询问会不会。", "An emphatic rhetorical denial or refusal, not a genuine question.", "situational"),
	], ["advice", "intention"]),
	"7-4": d("中心、心意、中介与依靠", "Centers, feelings, channels and reliance", [
		r("～を中心に", "以……为中心", "Centered on …", "范围围绕中心展开；をはじめ只是举典型，不保证它是中心。", "Organizes an area or activity around a center; をはじめ merely gives a leading example."),
		r("～をこめて", "怀着……／倾注……", "With … put into it", "把感谢、爱等心意注入动作或物品，不是单纯客观背景。", "Puts gratitude or feeling into an act or object, not merely a background condition."),
		r("～を通じて／～を通して", "通过……／在……期间一直", "Through / throughout …", "友人を通じて是中介；一年を通じて是时间全程，要分清名词类型。", "A friend is an intermediary; a year is a time span. The noun determines the sense."),
		r("～を頼りに", "依靠……／凭借……", "Relying on …", "以地图、记忆或帮助作为依靠；通じて只是渠道，不一定有依赖感。", "Relies on guidance or support; 通じて is a channel without necessarily implying dependence."),
	], ["means", "basis"]),
	"7-5": d("风险、深切感受、否定概括与愿望", "Risks, strong impressions, limits and wishes", [
		r("～おそれがある", "恐怕会……／有……风险", "There is a risk of …", "多用于客观提示坏结果，常见于报道；不是中性的所有可能性。", "Usually warns of undesirable outcomes, often in reports, not neutral possibility.", "formal"),
		r("～ものがある", "确实令人感到……", "There is something deeply … about it", "つらいものがある突出切实感受，不是抽象说‘有东西’。", "Emphasizes a felt quality, not the literal existence of an object.", "formal"),
		r("～というものではない", "并不是……就好／就……", "It is not simply a matter of …", "否定简单化的判断，如数量多不等于好；并不否定所有优点。", "Rejects an oversimplification, not every possible merit.", "formal"),
		r("～ないものか", "难道不能……吗／真希望……", "Is there no way to …?", "借否定疑问表达实现愿望；并非要求不要做。", "A negative question expressing hope for a solution, not a request not to act."),
	], ["possible", "wish"]),
	"7-6": d("素材、原因、契机与场合", "Source material, causes, triggers and occasions", [
		r("～をもとに", "以……为基础／素材", "Based on …", "常以事实、经验为素材作加工；基づいて更强调遵循根据。", "Often uses facts or experience as material for development; 基づいて emphasizes grounding."),
		r("～につき", "由于……", "Due to …", "本课是通知中的原因，如調整中につき；另有一人につき的‘每’，勿混用。", "Causal in notices here; distinguish 一人につき, 'per person'.", "formal"),
		r("～をきっかけに", "以……为契机", "Prompted by / taking … as a starting point", "触发改变的起点，不一定是直接或唯一原因。", "A trigger for change, not necessarily its sole or direct cause."),
		r("～際に", "在……时／之际", "When / on the occasion of …", "比とき正式，可用于说明手续；不是只限庆典或积极事件。", "More formal than とき, useful in procedures, not restricted to celebrations.", "formal"),
	], ["occasion", "reason"]),
	"8-1": d("それなのに、でも、なら、で", "Concession, persistence, premise and result", [
		r("それなのに", "尽管如此却……", "And yet …", "强调结果辜负前句预期，常带不满或惊讶。", "Stresses a result contrary to expectations, often with disappointment."),
		r("それでも", "即便如此仍……", "Even so …", "即使有前述障碍后项仍成立，常表达坚持；不必意外。", "Maintains the next point despite an obstacle, often persistence rather than surprise.", "everyday"),
		r("それなら", "如果这样的话……", "In that case …", "接受新信息作为判断或建议的前提。", "Takes new information as the premise for a decision or suggestion.", "everyday"),
		r("それで", "所以……／然后呢？", "So / and then?", "陈述时连原因与结果；单独追问时是询问后续，不一定表示因果。", "Links cause and result in statements; as a follow-up question it asks what happened next.", "everyday"),
	], ["concession", "reason"]),
	"8-2": d("意外回答、应对、联想与换话题", "Unexpected replies, responses and topic shifts", [
		r("それが", "可是没想到……", "Well, actually …", "接出与对方期待不同的回答；不是无条件替代所有‘但是’。", "Introduces a reply contrary to expectation, not a universal replacement for 'but'.", "everyday"),
		r("そこで", "于是／为此……", "So / in response …", "针对情况采取措施或提出方案；それで可以只叙述自然结果。", "Introduces a response or solution; それで also states unplanned consequences."),
		r("そういえば", "说起来／对了……", "Come to think of it …", "由当前话题联想到某件事，不是完全无关的转移。", "Recalls something associated with the topic, not a wholly unrelated shift.", "everyday"),
		r("それはそうと", "那且不说／话说回来", "Leaving that aside …", "先放下当前话题再换另一个；不要求联想关系。", "Sets aside the current topic for another without needing an association.", "everyday"),
	], ["topicShift", "extra"]),
	"8-3": d("换言、选择、转折与理由", "Restatement, alternatives, contrast and reasons", [
		r("すなわち", "即／也就是", "Namely / that is", "把同一内容换说法或具体说明；本课不把它当随意概括的万能‘总之’。", "Restates or specifies the same content; do not use it as a catch-all conversational summary.", "formal"),
		r("あるいは", "或者／也许", "Or / possibly", "本课列举选择；另可表示另一种可能，偏书面。", "Offers alternatives here; can also introduce a possibility, in a written register.", "formal"),
		r("だが", "但是／然而", "But / however", "转折偏书面、简洁，不比しかし在逻辑上多出特殊条件。", "A concise written contrast, not a logically different condition from しかし.", "formal"),
		r("だって", "因为……嘛", "Because …, after all", "句首解释或辩解常带个人情绪；不同于Nだって的‘连N也’。", "Sentence-initial personal justification; distinct from Nだって, 'even N'.", "everyday"),
	], ["summary", "reason"]),
	"8-4": d("推论、补理由、因果与例外", "Inference, explanation, consequence and exceptions", [
		r("ということは", "这么说来……", "That means …", "把前句信息当线索推出新结论；不是单纯重复定义。", "Infers a new conclusion from information, not merely repeats a definition."),
		r("というのは", "这是因为……", "The reason is …", "本课句首回头解释前句理由；Nというのは还可提出定义，位置决定功能。", "Explains the previous claim here; after a noun it can instead introduce a definition."),
		r("したがって", "因此／所以", "Therefore …", "偏书面逻辑结论，不用于闲聊追问‘后来呢’。", "A formal logical consequence, not a conversational 'what happened next?'.", "formal"),
		r("ただし／ただ", "但有条件……／只是……", "Provided that / but …", "ただし明确加限制或例外；ただ也能补一个不足，不必是严格规则。", "ただし adds a condition or exception; ただ can simply note a drawback."),
	], ["summary", "exception"]),
	"8-5": d("修正、补充、转场与紧接结果", "Qualifications, additions, transitions and results", [
		r("もっとも", "不过／话虽如此", "Though / admittedly …", "补充修正前述说法的例外；不同于形容动词もっともだ的‘有道理’。", "Qualifies the previous claim; distinct from もっともだ, 'reasonable'."),
		r("なお", "另外／此外", "Additionally / please also note …", "正式说明中补信息，与主事项通常仍有关联；不是任意闲聊换题。", "Adds information in formal communication, usually relevant to the main matter.", "formal"),
		r("さて", "那么／接下来", "Now / moving on …", "组织讲话顺序，转入下一议题，不说明因果。", "Moves to the next stage of a talk, not a cause-and-effect link."),
		r("すると", "于是／随后就……", "Then / thereupon …", "前项后发生或发现后项，也可引出推断；计划性应对更常用そこで。", "A following event or discovery, sometimes an inference; a deliberate response more often uses そこで."),
	], ["exception", "immediate"]),
	"8-6": d("概括、进一步追加与顺便补充", "Summarizing, reinforcing and adding a side note", [
		r("要するに", "总之／简而言之", "In short …", "提炼要点或总结判断，不是必须逐字同义的换说法。", "Distills a main point or judgment, not necessarily an exact restatement."),
		r("しかも", "而且／并且", "Moreover / what is more", "追加同方向且值得强调的信息，不是转折。", "Adds reinforcing information in the same direction, not a contrast."),
		r("おまけに", "再加上／更有甚者", "On top of that …", "更口语，常有额外加了一层好处或麻烦的感受。", "More conversational, often with a sense of an extra benefit or burden.", "everyday"),
		r("ちなみに", "顺便说一下", "Incidentally …", "补充相关旁支信息，不像しかも那样必须加强原判断。", "Adds a related side note without necessarily strengthening the main claim.", "everyday"),
	], ["summary", "extra"]),
};
