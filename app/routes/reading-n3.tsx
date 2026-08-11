import { useState } from "react";
import { Link, redirect } from "react-router";

import type { Route } from "./+types/reading-n3";
import "./reading-n3.css";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "N3 读解 · 第 1 周第 1 日 · 日本語上手" },
		{ name: "description", content: "N3 读解训练：阅读、题目、翻译与逐句语法拆解。" },
	];
}

// Keep old direct links working, while the lesson itself lives in the study shell.
export function loader() {
	return redirect("/study?module=reading");
}

const outline = [
	{ week: "第1週", title: "お知らせや案内を読もう", days: ["案内①", "案内②", "案内③", "試験要項", "日程募集①", "日程募集②", "実戦問題"] },
	{ week: "第2週", title: "身のまわりの文章を読もう", days: ["カタログ①", "カタログ②", "お知らせ", "説明書①", "説明書②", "保証書", "実戦問題"] },
	{ week: "第3週", title: "通信文を読もう", days: ["メール①", "メール②", "手紙・はがき①", "手紙・はがき②", "手紙・はがき③", "FAX", "実戦問題"] },
];

const dialogue = [
	{ jp: "女子学生：これからどうするの？", cn: "女学生：接下来怎么办？" },
	{ jp: "男子学生：レポート書かないといけないから、中央図書館へ行くつもりなんだ。", cn: "男学生：因为得写报告，我打算去中央图书馆。", grammar: ["〜ないといけない", "〜つもりだ"] },
	{ jp: "女子学生：え？ 今日は第３月曜日だから休みなんじゃないの？", cn: "女学生：咦？今天是第三个星期一，不是休馆吗？", grammar: ["〜んじゃないの？"] },
	{ jp: "男子学生：ううん、開いてるよ。第３月曜日が祝日の場合は次の日が休みになるんだ。", cn: "男学生：不是，开着呢。第三个星期一如果是节假日，第二天才休馆。", grammar: ["〜場合", "〜ことになる"] },
	{ jp: "女子学生：あ、そう。知らなかった。じゃ、明日が休みということね。私も調べたいことがあるから、一緒に行こう。", cn: "女学生：啊，原来如此。我不知道。也就是说，明天休馆。我也有想查的东西，一起去吧。", grammar: ["〜ということ", "〜たい", "〜から"] },
];

const grammarNotes: Record<string, string> = {
	"〜ないといけない": "动词ない形 + といけない，表示“必须……”。书面和口语里也常见 〜なければならない。",
	"〜つもりだ": "动词基本形 + つもりだ，表示已经有的打算或意图。这里的 行くつもり 表示“打算去”。",
	"〜んじゃないの？": "〜のではないか 的口语形式。这里不是否定，而是在确认“不是应该休馆吗？”。",
	"〜場合": "名词 + の場合 / 普通形 + 場合，表示“在……情况下”。",
	"〜ことになる": "表示由规定、规则或外部安排导致的结果。这里是“会变成第二天休馆”。",
	"〜ということ": "用于归纳、转述已经得知的信息，相当于“也就是说……”。",
	"〜たい": "动词ます形去掉ます + たい，表达说话人自己的愿望。",
	"〜から": "连接原因与结果，表示“因为……所以……”。",
};

const questions = [
	{ id: "dialogue-1", prompt: "次の会話文を読んで、後の文から正しいものを選ぼう。", cnPrompt: "根据对话，哪一项正确？", options: [{ jp: "今日は祝日である。", cn: "今天是节假日。" }, { jp: "今日、図書館は休みである。", cn: "今天图书馆休馆。" }, { jp: "男子学生は今日が第3月曜日だということを知らなかった。", cn: "男学生不知道今天是第三个星期一。" }, { jp: "女子学生は最初、今日は図書館が休みだと思っていた。", cn: "女学生一开始以为今天图书馆休馆。" }, { jp: "明日は火曜日で図書館は開いている。", cn: "明天是星期二，图书馆开放。" }], answer: 3, explanation: "女学生看到“第三个星期一”便以为休馆；男学生说明，第三个星期一恰逢节假日时，休馆日改到次日。" },
	{ id: "guide-1", prompt: "この図書館で、使用できないのはどの場合か。", cnPrompt: "在这所图书馆，哪种情况不能使用？", options: [{ jp: "児童室を午前中に使用する場合", cn: "上午使用儿童室" }, { jp: "10月の第3金曜日に20時まで使用する場合", cn: "10 月第三个星期五使用到 20 点" }, { jp: "第3月曜日が祝日の場合", cn: "第三个星期一是节假日" }, { jp: "10月10日の正午から午後2時", cn: "10 月 10 日中午到下午 2 点" }], answer: 3, explanation: "通知写明 10 月 1 日至 10 日因电气工程临时休馆，因此 10 月 10 日无法使用。" },
	{ id: "guide-2", prompt: "この案内の内容と合っているものはどれか。", cnPrompt: "下列哪项符合利用指南？", options: [{ jp: "この図書館は、第3月曜日とその翌日は閉まっている。", cn: "第三个星期一及次日都闭馆" }, { jp: "この図書館は、第3月曜日と年末年始以外は開いている。", cn: "除第三个星期一和年末年初外都开馆" }, { jp: "この図書館では、児童室を毎日図書館の閉館まで使用できる。", cn: "儿童室每天可使用至闭馆" }, { jp: "この図書館は、休館日以外にも臨時で休む日がある。", cn: "除休馆日外有临时休馆日" }], answer: 3, explanation: "儿童室只开放到 18 点；第三个星期一遇节假日时次日休馆；并且有 10 月临时休馆日。因此第 4 项正确。" },
];

type LessonSeed = {
	passage: string;
	translation: string;
	grammar: [string, string][];
	question: string;
	options: string[];
	answer: number;
	explanation: string;
};

const lessonSeeds: LessonSeed[] = [
	{ passage: "説明会の会場は、地下鉄さくら園駅の5番出口からタワービル方面へ歩き、4つ目の信号で左に曲がった先にあります。", translation: "说明会会场从地铁樱园站 5 号出口朝塔楼方向走，在第四个红绿灯左转后即可到达。", grammar: [["〜方面へ", "表示移动的方向，意为“朝着……方向”。"], ["〜た先に", "表示完成某动作之后，前方或后续的位置。"]], question: "会場へ行くには、どこで左に曲がりますか。", options: ["5番出口", "4つ目の信号", "タワービルの前"], answer: 1, explanation: "案内明确写着“4つ目の信号で左折”。" },
	{ passage: "美術館では、特別展の期間中は入口が東側に変わります。チケット売り場は通常どおり1階です。", translation: "美术馆在特别展览期间入口改到东侧，售票处仍在一楼。", grammar: [["〜期間中", "表示“在……期间”。"], ["通常どおり", "表示“和往常一样、照常”。"]], question: "特別展の期間中、変わるものは何ですか。", options: ["入口", "チケット売り場", "1階"], answer: 0, explanation: "发生变化的是入口的位置，售票处不变。" },
	{ passage: "受験票は試験日の一週間前までに郵送します。届かない場合は、試験日の三日前までに事務局へ連絡してください。", translation: "准考证会在考试日前一周前邮寄。如未收到，请在考试日前三天联系事务局。", grammar: [["〜までに", "表示动作完成的截止时间。"], ["届かない場合", "表示“如果没有收到”的条件。"]], question: "受験票が届かないとき、いつまでに連絡しますか。", options: ["試験日の一週間前", "試験日の三日前", "試験日の後"], answer: 1, explanation: "试验要项规定最晚在考试日前三天联系。" },
	{ passage: "日本語講座の申込期間は5月10日から20日までです。定員を超えた場合は、抽選で受講者を決めます。", translation: "日语课程申请期为 5 月 10 日至 20 日。超过名额时将抽签决定学员。", grammar: [["定員を超えた場合", "表示“超过名额时”的条件。"], ["抽選で", "表示以抽签这种方式进行。"]], question: "申込者が多い場合、どうなりますか。", options: ["講座が中止になる", "抽選になる", "期間が延びる"], answer: 1, explanation: "超过定员时通过抽签决定。" },
	{ passage: "地域イベントのスタッフを募集しています。参加できるのは、土曜日の午前9時から午後3時までです。", translation: "正在招募地区活动工作人员。活动时间为周六上午 9 点至下午 3 点。", grammar: [["〜している", "表示正在进行的状态，这里是“正在招募”。"], ["〜できる", "表示能力或可能性，这里是“可以参加”。"]], question: "スタッフはいつ参加しますか。", options: ["土曜日の午前から午後", "日曜日の午後", "平日の夜"], answer: 0, explanation: "募集说明指定了周六 9 点到 15 点。" },
	{ passage: "次の案内を読んで、日時・場所・例外条件を一つずつ確認しましょう。", translation: "阅读以下指南，分别确认日期、地点和例外条件。", grammar: [["〜ずつ", "表示逐一、每一个都要做。"], ["確認する", "表示核对或确认信息。"]], question: "案内を読むとき、特に何を確認しますか。", options: ["日時・場所・例外", "作者の名前", "文章の長さ"], answer: 0, explanation: "实战题的重点是定位日期、地点及例外条件。" },
	{ passage: "このカタログの商品は、注文から三日以内に発送します。ただし、在庫がない場合はメールでお知らせします。", translation: "本目录商品会在下单后三日内发货。但若无库存，会通过邮件通知。", grammar: [["〜以内に", "表示在某个时间范围以内。"], ["在庫がない場合", "表示“没有库存时”的条件。"]], question: "在庫がない場合、店はどうしますか。", options: ["メールで知らせる", "すぐ発送する", "電話をしない"], answer: 0, explanation: "目录中写明缺货时会用邮件通知。" },
	{ passage: "新しいカメラは防水機能付きで、旅行やスポーツのときにも使えます。充電には専用のケーブルが必要です。", translation: "新相机带防水功能，旅行和运动时也能使用。充电需要专用线缆。", grammar: [["〜付き", "表示附带某种功能或物品。"], ["〜にも", "表示在某种情况下也同样适用。"]], question: "カメラの充電に必要なものは何ですか。", options: ["専用のケーブル", "防水ケース", "新しい電池"], answer: 0, explanation: "说明中明确要求使用专用线缆充电。" },
	{ passage: "館内では携帯電話をマナーモードにしてください。通話はロビーでお願いします。", translation: "馆内请将手机调成静音模式。通话请到大厅进行。", grammar: [["〜にしてください", "礼貌地要求对方做某事。"], ["〜でお願いします", "表示请求在某个地点或方式下进行。"]], question: "電話で話すとき、どこへ行きますか。", options: ["ロビー", "館内の席", "入口の外だけ"], answer: 0, explanation: "通知要求通话在大厅进行。" },
	{ passage: "この機械を使う前に、電源コードがぬれていないことを確認してください。異常があるときは使用を中止します。", translation: "使用本机器前请确认电源线没有受潮。发现异常时停止使用。", grammar: [["〜前に", "表示动作之前的时间点。"], ["〜ことを確認する", "表示确认某一事实。"]], question: "異常がある場合、どうしますか。", options: ["使用を中止する", "水で洗う", "そのまま使う"], answer: 0, explanation: "说明书要求遇到异常立即停止使用。" },
	{ passage: "フィルターは一か月に一度、取り外して水洗いしてください。洗った後は、完全に乾いてから取り付けます。", translation: "滤网请每月取下清洗一次。洗后完全干燥再装回。", grammar: [["〜てから", "表示一个动作完成后再进行下一个动作。"], ["完全に", "表示“完全地、充分地”。"]], question: "フィルターはいつ取り付けますか。", options: ["完全に乾いてから", "洗う前", "毎日"], answer: 0, explanation: "顺序是清洗、完全干燥、再安装。" },
	{ passage: "保証期間は購入日から一年間です。修理を依頼するときは、保証書とレシートを一緒に持ってきてください。", translation: "保修期自购买日起一年。申请维修时，请同时带上保修卡和收据。", grammar: [["〜から一年間", "表示从某一日期起持续一年的期间。"], ["〜ときは", "表示“在……的时候”的条件。"]], question: "修理を頼むとき、何が必要ですか。", options: ["保証書とレシート", "カタログだけ", "写真だけ"], answer: 0, explanation: "保修卡和收据是维修时需要携带的材料。" },
	{ passage: "身のまわりの文章では、使える時間・注意事項・問い合わせ先を探す練習をします。", translation: "日常生活中的文章练习，要找出可使用的时间、注意事项和咨询方式。", grammar: [["〜では", "表示在某个范围或场合中。"], ["〜を探す", "表示主动寻找目标信息。"]], question: "この週で探す情報はどれですか。", options: ["時間・注意・連絡先", "作者の趣味", "漢字の数"], answer: 0, explanation: "这些是日常说明文的核心信息。" },
	{ passage: "会議の日程を変更したい場合は、今日の午後5時までに返信してください。都合が悪い人は別の日を提案できます。", translation: "如想修改会议日程，请在今天下午 5 点前回复。不方便的人可以提出其他日期。", grammar: [["〜たい場合", "表示“想要……时”的条件。"], ["〜までに返信する", "表示在截止时间前回复。"]], question: "日程を変えたい人は、いつまでに返信しますか。", options: ["今日の午後5時", "明日の朝", "来週"], answer: 0, explanation: "邮件明确指定今天下午 5 点为截止。" },
	{ passage: "資料を添付しましたので、ご確認ください。分からない点があれば、遠慮なく質問してください。", translation: "已附上资料，请确认。如有不明之处，请不要客气地提问。", grammar: [["〜ので", "较礼貌地连接原因与后续请求。"], ["〜があれば", "表示“如果有……的话”。"]], question: "分からない点がある場合、どうしますか。", options: ["質問する", "資料を捨てる", "返信しない"], answer: 0, explanation: "邮件鼓励对不明白的部分提出问题。" },
	{ passage: "先日はお世話になりました。来週の説明会に参加したいと思っていますので、よろしくお願いいたします。", translation: "前些日子承蒙关照。我想参加下周说明会，敬请关照。", grammar: [["お世話になりました", "用于感谢过去得到的关照。"], ["〜たいと思っています", "较柔和地表达持续的意愿。"]], question: "書き手は何をしたいですか。", options: ["説明会に参加したい", "引っ越したい", "商品を返したい"], answer: 0, explanation: "信中说明想参加下周的说明会。" },
	{ passage: "荷物は不在の場合、管理人室でお預かりします。受け取る際は身分証明書をお持ちください。", translation: "若收件人不在，包裹由管理室代为保管。领取时请携带身份证明。", grammar: [["不在の場合", "表示“人不在时”的条件。"], ["〜際は", "书面语，表示“在……之际”。"]], question: "荷物を受け取るとき、何を持っていきますか。", options: ["身分証明書", "招待状", "保証書"], answer: 0, explanation: "领取包裹需要出示身份证明。" },
	{ passage: "同窓会は11月3日に駅前ホテルで行います。出席できない場合も、10月15日までにご返事ください。", translation: "同学会于 11 月 3 日在车站前酒店举行。即使不能出席，也请在 10 月 15 日前回复。", grammar: [["〜場合も", "表示即使在某种情况下也同样成立。"], ["ご返事ください", "礼貌地要求回复。"]], question: "出席できない人も何をしますか。", options: ["10月15日までに返事する", "ホテルへ行く", "何もしない"], answer: 0, explanation: "不能出席也必须在截止日前回复。" },
	{ passage: "資料の送付先を変更しました。今後は新しい住所へFAXを送ってください。", translation: "资料寄送地址已变更。今后请将传真发往新地址。", grammar: [["今後は", "表示从现在开始、以后。"], ["〜へ送る", "表示寄送或发送的对象、目的地。"]], question: "今後、資料はどこへ送りますか。", options: ["新しい住所", "前の住所", "駅前ホテル"], answer: 0, explanation: "传真通知要求今后发送到新地址。" },
	{ passage: "通信文では、差出人・宛先・日時・依頼内容を結び付けて読むことが大切です。", translation: "阅读通信文时，把发件人、收件人、日期和请求内容联系起来理解很重要。", grammar: [["〜ことが大切", "表示做某事很重要。"], ["結び付けて", "表示把多个信息关联起来。"]], question: "通信文を読むとき、何を結び付けますか。", options: ["差出人・宛先・日時・依頼", "写真・色・値段", "漢字・音楽・地図"], answer: 0, explanation: "实战题考查把通信文关键信息关联起来的能力。" },
];

const readingLessons = outline.flatMap((week, weekIndex) => week.days.map((title, dayIndex) => {
	const index = weekIndex * 7 + dayIndex;
	const seed = index === 0 ? null : lessonSeeds[index - 1];
	return { index, week: weekIndex + 1, day: dayIndex + 1, title, subtitle: week.title, seed };
}));

function FuriganaTitle() {
	return <ruby>案内<rt>あんない</rt></ruby>;
}

function LessonNavigator({ index, onSelect }: { index: number; onSelect: (index: number) => void }) {
	const previous = readingLessons[index - 1];
	const next = readingLessons[index + 1];
	return <nav className="reader-day-nav" aria-label="读解日程切换">
		<button disabled={!previous} onClick={() => previous && onSelect(previous.index)}>{previous ? <><small>上一日</small><b>第{previous.week}週 {previous.day}日目 · {previous.title}</b></> : "已经是第一日"}</button>
		<button disabled={!next} onClick={() => next && onSelect(next.index)}>{next ? <><small>下一日</small><b>第{next.week}週 {next.day}日目 · {next.title}</b></> : "已经是最后一日"}</button>
	</nav>;
}

function ReadingCatalog({ embedded, onSelect }: { embedded: boolean; onSelect: (index: number) => void }) {
	return <div className={embedded ? "reader-page reader-page--embedded" : "reader-page"}><div className="reader-wrap reader-layout"><main className="reader-main reader-catalog">
		<section className="reader-catalog-intro"><span>N3 読解</span><h1>読解練習</h1><p>新日语能力考试考前对策 · 3 周 · 共 21 日。点击进入每日读解训练。</p></section>
		{outline.map((week, weekIndex) => <section className="reader-week-card" key={week.week}><header><div><span>{week.week}</span><h2>{week.title}</h2><p>{weekIndex === 0 ? "阅读各种启事和指南" : weekIndex === 1 ? "阅读身边常见的说明文字" : "阅读邮件、书信等通信文"}</p></div><b>7 天</b></header><div className="reader-day-list">{readingLessons.filter((lesson) => lesson.week === weekIndex + 1).map((lesson) => <button key={lesson.index} onClick={() => onSelect(lesson.index)}><span>{lesson.day}日目{lesson.day === 7 ? " · 实战" : ""}</span><b>{lesson.title}</b><small>进入练习　›</small></button>)}</div></section>)}
	</main></div></div>;
}

function GenericLessonDetail({ lesson, embedded, onBack, onSelect }: { lesson: typeof readingLessons[number]; embedded: boolean; onBack: () => void; onSelect: (index: number) => void }) {
	const [showTranslation, setShowTranslation] = useState(true);
	const [showGrammar, setShowGrammar] = useState(false);
	const [selected, setSelected] = useState<number | null>(null);
	const [revealed, setRevealed] = useState(false);
	const seed = lesson.seed!;
	return <div className={embedded ? "reader-page reader-page--embedded" : "reader-page"}><div className="reader-wrap reader-layout"><main className="reader-main">
		<section className="reader-hero reader-studybar"><div className="reader-breadcrumb"><span>N3 読解</span><span>/</span><b>第{lesson.week}週 {lesson.day}日目</b></div><div className="reader-studybar__body"><div><button className="reader-back" onClick={onBack}>‹ 读解目录</button><span>第{lesson.week}週 ／ {lesson.day}日目</span><h1>{lesson.title}</h1><p>{lesson.subtitle}</p></div><div className="reader-controls"><button className={showTranslation ? "on" : ""} onClick={() => setShowTranslation((value) => !value)}>翻译 {showTranslation ? "显示中" : "已隐藏"}</button><button className={showGrammar ? "on" : ""} onClick={() => setShowGrammar((value) => !value)}>语法拆解 {showGrammar ? "显示中" : "已隐藏"}</button></div></div></section>
		<section className="reader-section"><div className="reader-section-head"><span>読解ポイント</span><h2>{lesson.title}を読もう</h2>{showTranslation && <p>先定位关键信息，再用选项回到原文验证。</p>}</div><article className="reading-passage"><p className="jp">{seed.passage}</p>{showTranslation && <p className="translation">{seed.translation}</p>}{showGrammar && <div className="grammar-pills grammar-pills--detail">{seed.grammar.map(([pattern, explanation]) => <details key={pattern} open><summary>{pattern}</summary><p>{explanation}</p></details>)}</div>}</article></section>
		<section className="reader-section quiz-section"><div className="reader-section-head"><span>チェック</span><h2>問題</h2>{showTranslation && <p>选择后展开依据与解析。</p>}</div><article className="reading-question"><h3>{seed.question}</h3><div className="question-options">{seed.options.map((option, optionIndex) => <button key={option} className={selected === optionIndex ? "selected" : ""} onClick={() => setSelected(optionIndex)}><span>{optionIndex + 1}</span><span className="question-option-text">{option}</span></button>)}</div><div className="answer-row"><button onClick={() => setRevealed((value) => !value)}>{revealed ? "隐藏解析" : "显示答案与解析"}</button>{revealed && <p><b>正确答案：{seed.answer + 1}</b>{seed.explanation}<br />阅读依据：先找题干对应的时间、对象或条件词，再排除没有被原文支持的选项。</p>}</div></article></section>
		<LessonNavigator index={lesson.index} onSelect={onSelect} />
	</main></div></div>;
}

export function ReadingN3Content({ embedded = false }: { embedded?: boolean }) {
	const [activeLesson, setActiveLesson] = useState<number | null>(null);
	const [showTranslation, setShowTranslation] = useState(true);
	const [showGrammar, setShowGrammar] = useState(false);
	const [selected, setSelected] = useState<Record<string, number>>({});
	const [revealed, setRevealed] = useState<Record<string, boolean>>({});

	if (activeLesson === null) return <ReadingCatalog embedded={embedded} onSelect={setActiveLesson} />;
	if (activeLesson !== 0) return <GenericLessonDetail lesson={readingLessons[activeLesson]} embedded={embedded} onBack={() => setActiveLesson(null)} onSelect={setActiveLesson} />;

	return (
		<div className={embedded ? "reader-page reader-page--embedded" : "reader-page"}>
			<header className="reader-header"><div className="reader-wrap"><Link to="/" className="reader-brand">日本語上手</Link><nav><Link to="/study">知识库</Link><Link to="/reading/n3" aria-current="page">N3 读解</Link></nav><Link className="reader-try" to="/study">进入学习区</Link></div></header>
			<div className="reader-wrap reader-layout">
				<aside className="reader-outline" aria-label="N3读解课程目录">
					<div className="outline-top"><span>N3 読解</span><h2>読解練習</h2><p>文章を読んで、根拠を見つけよう。</p></div>
					{outline.map((item, index) => <section key={item.week}><div className="outline-week"><b>{item.week}</b></div><p className="outline-title">{item.title}</p><ol>{item.days.map((day, dayIndex) => <li className={index === 0 && dayIndex === 0 ? "current" : "locked"} key={day}><span>{dayIndex + 1}</span>{day}{index === 0 && dayIndex === 0 ? <em>学習中</em> : <i>準備中</i>}</li>)}</ol></section>)}
				</aside>

				<main className="reader-main">
					<section className="reader-hero reader-studybar"><div className="reader-breadcrumb"><span>N3 読解</span><span>/</span><b>第1週 1日目</b></div><div className="reader-studybar__body"><div><button className="reader-back" onClick={() => setActiveLesson(null)}>‹ 读解目录</button><span>第1週 ／ 1日目</span><h1><FuriganaTitle /> ①</h1><p>お知らせや案内を読もう</p></div><div className="reader-controls"><button className={showTranslation ? "on" : ""} onClick={() => setShowTranslation((value) => !value)}>翻译 {showTranslation ? "显示中" : "已隐藏"}</button><button className={showGrammar ? "on" : ""} onClick={() => setShowGrammar((value) => !value)}>语法拆解 {showGrammar ? "显示中" : "已隐藏"}</button></div></div></section>

					<section className="reader-section reading-dialogue"><div className="reader-section-head"><span>れんしゅう</span><h2>日時を正しく読もう！</h2>{showTranslation && <p>日期和时间要读准确。</p>}</div><div className="dialogue-list">{dialogue.map((line) => <article key={line.jp}><p className="jp">{line.jp}</p>{showTranslation && <p className="translation">{line.cn}</p>}{showGrammar && line.grammar && <div className="grammar-pills">{line.grammar.map((grammar) => <details key={grammar}><summary>{grammar}</summary><p>{grammarNotes[grammar]}</p></details>)}</div>}</article>)}</div></section>

					<section className="reader-section notice-section"><div className="reader-section-head"><span>もんだい</span><h2>次の案内を見て、後の問いに答えなさい。</h2>{showTranslation && <p>阅读下面的使用指南，再回答问题。</p>}</div><div className="notice-card"><h3>たから市　中央図書館 <small>利用案内</small></h3><div className="notice-table"><div><b>開館時間</b><p>平日</p><strong>午前10時から午後8時</strong><p>土曜日・日曜日・祝日</p><strong>午前10時から午後6時</strong></div><div><b>休館日</b><p>第3月曜日</p><strong>ただし祝日と重なった場合は次の日が休館</strong><p>年末年始</p><strong>12月28日から1月4日</strong></div></div><aside>なお、10月1日より10日まで電気工事のために臨時で休館します。</aside></div>{showTranslation && <div className="reader-translation-card"><b>中央图书馆利用指南</b><div><section><span>开放时间</span><p>工作日：上午 10 点至晚上 8 点。<br />周六、周日及节假日：上午 10 点至傍晚 6 点。</p></section><section><span>休馆日</span><p>每月第三个星期一；但若该日为节假日，则次日休馆。<br />年末年初：12 月 28 日至 1 月 4 日。</p></section></div><p className="reader-translation-card__note">注意：10 月 1 日至 10 日因电气工程临时休馆。</p></div>}{showGrammar && <div className="grammar-callout"><b>句子拆解</b><p><mark>祝日と重なった場合</mark> = “与节假日重合的情况下”；<mark>次の日が休館</mark> = “次日休馆”。先抓条件，再读结论。</p></div>}</section>

					<section className="reader-section quiz-section"><div className="reader-section-head"><span>チェック</span><h2>問題</h2>{showTranslation && <p>选择答案后，再展开中文解析。</p>}</div>{questions.map((question, index) => <article className="reading-question" key={question.id}><h3>問 {index + 1}　{question.prompt}</h3>{showTranslation && <p className="question-translation">{question.cnPrompt}</p>}<div className="question-options">{question.options.map((option, optionIndex) => <button className={selected[question.id] === optionIndex ? "selected" : ""} onClick={() => setSelected((value) => ({ ...value, [question.id]: optionIndex }))} key={option.jp}><span>{optionIndex + 1}</span><span className="question-option-text">{option.jp}{showTranslation && <small>{option.cn}</small>}</span></button>)}</div><div className="answer-row"><button onClick={() => setRevealed((value) => ({ ...value, [question.id]: !value[question.id] }))}>{revealed[question.id] ? "隐藏解析" : "显示答案与解析"}</button>{revealed[question.id] && <p><b>正确答案：{question.answer + 1}</b>{question.explanation}</p>}</div></article>)}</section>

					<LessonNavigator index={0} onSelect={setActiveLesson} />
				</main>
			</div>
		</div>
	);
}

export default function ReadingN3() {
	return <ReadingN3Content />;
}
