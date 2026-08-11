import { useState } from "react";
import { Link } from "react-router";

import type { Route } from "./+types/reading-n3";
import "./reading-n3.css";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "N3 读解 · 第 1 周第 1 日 · 日本語上手" },
		{ name: "description", content: "N3 读解训练：阅读、题目、翻译与逐句语法拆解。" },
	];
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

function FuriganaTitle() {
	return <ruby>案内<rt>あんない</rt></ruby>;
}

export default function ReadingN3() {
	const [showTranslation, setShowTranslation] = useState(true);
	const [showGrammar, setShowGrammar] = useState(false);
	const [selected, setSelected] = useState<Record<string, number>>({});
	const [revealed, setRevealed] = useState<Record<string, boolean>>({});

	return (
		<div className="reader-page">
			<header className="reader-header"><div className="reader-wrap"><Link to="/" className="reader-brand">日本語上手</Link><nav><Link to="/study">知识库</Link><Link to="/reading/n3" aria-current="page">N3 读解</Link></nav><Link className="reader-try" to="/study">进入学习区</Link></div></header>
			<div className="reader-wrap reader-layout">
				<aside className="reader-outline" aria-label="N3读解课程目录">
					<div className="outline-top"><span>N3 読解</span><h2>読解練習</h2><p>文章を読んで、根拠を見つけよう。</p></div>
					{outline.map((item, index) => <section key={item.week}><div className="outline-week"><b>{item.week}</b></div><p className="outline-title">{item.title}</p><ol>{item.days.map((day, dayIndex) => <li className={index === 0 && dayIndex === 0 ? "current" : "locked"} key={day}><span>{dayIndex + 1}</span>{day}{index === 0 && dayIndex === 0 ? <em>学習中</em> : <i>準備中</i>}</li>)}</ol></section>)}
				</aside>

				<main className="reader-main">
					<section className="reader-hero reader-studybar"><div className="reader-breadcrumb"><Link to="/">ホーム</Link><span>/</span><span>N3 読解</span><span>/</span><b>第1週 1日目</b></div><div className="reader-studybar__body"><div><span>第1週 ／ 1日目</span><h1><FuriganaTitle /> ①</h1><p>お知らせや案内を読もう</p></div><div className="reader-controls"><button className={showTranslation ? "on" : ""} onClick={() => setShowTranslation((value) => !value)}>翻译 {showTranslation ? "显示中" : "已隐藏"}</button><button className={showGrammar ? "on" : ""} onClick={() => setShowGrammar((value) => !value)}>语法拆解 {showGrammar ? "显示中" : "已隐藏"}</button></div></div></section>

					<section className="reader-section reading-dialogue"><div className="reader-section-head"><span>れんしゅう</span><h2>日時を正しく読もう！</h2>{showTranslation && <p>日期和时间要读准确。</p>}</div><div className="dialogue-list">{dialogue.map((line) => <article key={line.jp}><p className="jp">{line.jp}</p>{showTranslation && <p className="translation">{line.cn}</p>}{showGrammar && line.grammar && <div className="grammar-pills">{line.grammar.map((grammar) => <details key={grammar}><summary>{grammar}</summary><p>{grammarNotes[grammar]}</p></details>)}</div>}</article>)}</div></section>

					<section className="reader-section notice-section"><div className="reader-section-head"><span>もんだい</span><h2>次の案内を見て、後の問いに答えなさい。</h2>{showTranslation && <p>阅读下面的使用指南，再回答问题。</p>}</div><div className="notice-card"><h3>たから市　中央図書館 <small>利用案内</small></h3><div className="notice-table"><div><b>開館時間</b><p>平日</p><strong>午前10時から午後8時</strong><p>土曜日・日曜日・祝日</p><strong>午前10時から午後6時</strong></div><div><b>休館日</b><p>第3月曜日</p><strong>ただし祝日と重なった場合は次の日が休館</strong><p>年末年始</p><strong>12月28日から1月4日</strong></div></div><aside>なお、10月1日より10日まで電気工事のために臨時で休館します。</aside></div>{showTranslation && <p className="reader-translation-note">中文提示：这里的“ただし”表示例外；遇到第三个星期一恰逢节假日时，休馆日移到下一个工作日。</p>}{showGrammar && <div className="grammar-callout"><b>句子拆解</b><p><mark>祝日と重なった場合</mark> = “与节假日重合的情况下”；<mark>次の日が休館</mark> = “次日休馆”。先抓条件，再读结论。</p></div>}</section>

					<section className="reader-section quiz-section"><div className="reader-section-head"><span>チェック</span><h2>問題</h2>{showTranslation && <p>选择答案后，再展开中文解析。</p>}</div>{questions.map((question, index) => <article className="reading-question" key={question.id}><h3>問 {index + 1}　{question.prompt}</h3>{showTranslation && <p className="question-translation">{question.cnPrompt}</p>}<div className="question-options">{question.options.map((option, optionIndex) => <button className={selected[question.id] === optionIndex ? "selected" : ""} onClick={() => setSelected((value) => ({ ...value, [question.id]: optionIndex }))} key={option.jp}><span>{optionIndex + 1}</span><span className="question-option-text">{option.jp}{showTranslation && <small>{option.cn}</small>}</span></button>)}</div><div className="answer-row"><button onClick={() => setRevealed((value) => ({ ...value, [question.id]: !value[question.id] }))}>{revealed[question.id] ? "隐藏解析" : "显示答案与解析"}</button>{revealed[question.id] && <p><b>正确答案：{question.answer + 1}</b>{question.explanation}</p>}</div></article>)}</section>

					<section className="reader-next"><div><span>次へ</span><h2>案内②</h2>{showTranslation && <p>继续练习从通知中定位日期、时间和例外条件。</p>}</div><button disabled>準備中</button></section>
				</main>
			</div>
		</div>
	);
}
