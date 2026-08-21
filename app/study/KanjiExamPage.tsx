import { useEffect, useMemo, useRef, useState } from "react";

import {
	KANJI_EXAM_BATCHES,
	isKanjiExamAnswerCorrect,
	questionsForMode,
	shuffleKanjiExamQuestions,
	type KanjiExamBatch,
	type KanjiExamMode,
	type KanjiExamQuestion,
} from "../data/kanji-exam";
import { lx } from "./store";
import "../routes/kanji-exam.css";

const HISTORY_KEY = "jp-kanji-exam-history-v1";

type AttemptHistory = {
	id: string;
	batchId: string;
	batchTitle: string;
	mode: KanjiExamMode;
	correct: number;
	total: number;
	completedAt: string;
	wrongQuestions?: AttemptWrongQuestion[];
};

type AttemptWrongQuestion = {
	questionId: string;
	lessonTitle: string;
	kind: "reading" | "writing";
	prompt: string;
	target: string;
	answer: string;
	userAnswer: string;
};

const modeMeta: Record<KanjiExamMode, { icon: string; cn: string; en: string; descCn: string; descEn: string }> = {
	reading: { icon: "あ", cn: "只练读音", en: "Readings only", descCn: "看句中汉字，填写平假名读音", descEn: "Write the kana reading of the marked kanji" },
	writing: { icon: "漢", cn: "只练汉字", en: "Kanji only", descCn: "看假名提示，填写对应汉字", descEn: "Write the kanji for each kana prompt" },
	mixed: { icon: "混", cn: "汉字与读音", en: "Mixed practice", descCn: "按试卷形式完成全部两类题目", descEn: "Complete both sections like a school test" },
};

function readHistory(): AttemptHistory[] {
	if (typeof window === "undefined") return [];
	try {
		const value = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
		return Array.isArray(value) ? value.slice(0, 20) : [];
	} catch {
		return [];
	}
}

function storeHistory(history: AttemptHistory[]) {
	if (typeof window === "undefined") return;
	localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
}

function MarkedPrompt({ question }: { question: KanjiExamQuestion }) {
	const index = question.prompt.indexOf(question.target);
	if (index < 0) return <>{question.prompt}</>;
	return (
		<>
			{question.prompt.slice(0, index)}
			<mark>{question.target}</mark>
			{question.prompt.slice(index + question.target.length)}
		</>
	);
}

function scoreLabel(correct: number, total: number) {
	return total ? Math.round((correct / total) * 100) : 0;
}

function modeLabel(mode: KanjiExamMode) {
	return lx(modeMeta[mode].cn, modeMeta[mode].en);
}

export function KanjiExamPage() {
	const [batchId, setBatchId] = useState(KANJI_EXAM_BATCHES[0]?.id || "");
	const [mode, setMode] = useState<KanjiExamMode>("mixed");
	const [started, setStarted] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [answers, setAnswers] = useState<Record<string, string>>({});
	const [history, setHistory] = useState<AttemptHistory[]>([]);
	const [questionCount, setQuestionCount] = useState<number | "all">("all");
	const [activeQuestions, setActiveQuestions] = useState<KanjiExamQuestion[]>([]);
	const [retrying, setRetrying] = useState(false);
	const resultRef = useRef<HTMLDivElement>(null);

	useEffect(() => setHistory(readHistory()), []);

	const batch = KANJI_EXAM_BATCHES.find((item) => item.id === batchId) || KANJI_EXAM_BATCHES[0];
	const baseQuestions = useMemo(() => (batch ? questionsForMode(batch, mode) : []), [batch, mode]);
	const questions = started ? activeQuestions : baseQuestions;
	const correctIds = useMemo(
		() => submitted ? questions.filter((question) => isKanjiExamAnswerCorrect(question, answers[question.id] || "")).map((question) => question.id) : [],
		[answers, questions, submitted],
	);
	const correctSet = useMemo(() => new Set(correctIds), [correctIds]);
	const incorrectQuestions = submitted ? questions.filter((question) => !correctSet.has(question.id)) : [];
	const answeredCount = questions.filter((question) => (answers[question.id] || "").trim()).length;
	const remainingCount = questions.length - answeredCount;
	const lessonTitleById = useMemo(
		() => new Map(batch?.lessons.map((lesson) => [lesson.id, lesson.title]) || []),
		[batch],
	);

	const start = () => {
		const shuffled = shuffleKanjiExamQuestions(baseQuestions);
		const selected = questionCount === "all" ? shuffled : shuffled.slice(0, Math.min(questionCount, shuffled.length));
		setAnswers({});
		setActiveQuestions(selected);
		setRetrying(false);
		setSubmitted(false);
		setStarted(true);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const finish = () => {
		if (!batch || submitted || remainingCount > 0) return;
		const correct = questions.filter((question) => isKanjiExamAnswerCorrect(question, answers[question.id] || "")).length;
		const wrongQuestions: AttemptWrongQuestion[] = questions
			.filter((question) => !isKanjiExamAnswerCorrect(question, answers[question.id] || ""))
			.map((question) => ({
				questionId: question.id,
				lessonTitle: lessonTitleById.get(question.lessonId) || batch.title,
				kind: question.kind,
				prompt: question.prompt,
				target: question.target,
				answer: question.answer,
				userAnswer: answers[question.id] || "",
			}));
		const entry: AttemptHistory = {
			id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
			batchId: batch.id,
			batchTitle: batch.title,
			mode,
			correct,
			total: questions.length,
			completedAt: new Date().toISOString(),
			wrongQuestions,
		};
		const next = [entry, ...history];
		setHistory(next);
		storeHistory(next);
		setSubmitted(true);
		requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
	};

	const retryWrong = () => {
		setActiveQuestions(shuffleKanjiExamQuestions(incorrectQuestions));
		setRetrying(true);
		setAnswers({});
		setSubmitted(false);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	if (!batch) return <div className="empty">{lx("题库还没有内容。", "No questions have been imported yet.")}</div>;

	if (!started) {
		return (
			<div className="kanji-exam-page">
				<section className="kanji-exam-hero">
					<div>
						<span className="kanji-exam-eyebrow">KANJI SELF-TEST</span>
						<h1>{lx("汉字自测", "Kanji Self-test")}</h1>
					</div>
				</section>

				<section className="kanji-exam-panel">
					<div className="kanji-exam-section-title">
						<div><span>01</span><h2>{lx("选择题库", "Choose a question set")}</h2></div>
						<small>{lx("解析后永久保留，题库持续累积", "Imported sets stay in your library")}</small>
					</div>
					<div className="kanji-exam-batches">
						{KANJI_EXAM_BATCHES.map((item) => {
							const count = item.lessons.flatMap((lesson) => lesson.questions).length;
							return (
								<button key={item.id} className={item.id === batchId ? "on" : ""} onClick={() => { setBatchId(item.id); setQuestionCount("all"); }}>
									<span className="kanji-exam-batch-check">{item.id === batchId ? "✓" : ""}</span>
									<strong>{item.title}</strong>
									<span>{item.subtitle}</span>
									<small>{item.lessons.length}{lx("个单元", " units")} · {count}{lx("题", " questions")} · {item.importedAt}</small>
								</button>
							);
						})}
					</div>
				</section>

				<section className="kanji-exam-panel">
					<div className="kanji-exam-section-title">
						<div><span>02</span><h2>{lx("选择练习模式", "Choose a practice mode")}</h2></div>
					</div>
					<div className="kanji-exam-modes">
						{(Object.keys(modeMeta) as KanjiExamMode[]).map((key) => {
							const meta = modeMeta[key];
							const count = questionsForMode(batch, key).length;
							return (
								<button key={key} className={key === mode ? "on" : ""} onClick={() => { setMode(key); setQuestionCount("all"); }}>
									<i>{meta.icon}</i>
									<strong>{lx(meta.cn, meta.en)}</strong>
									<span>{lx(meta.descCn, meta.descEn)}</span>
									<small>{count}{lx("题", " questions")}</small>
								</button>
							);
						})}
					</div>
					<div className="kanji-exam-count-picker">
						<strong>{lx("随机抽题数量", "Random question count")}</strong>
						<div>
							{[10, 20, 30, 50].filter((count) => count <= baseQuestions.length).map((count) => (
								<button key={count} className={questionCount === count ? "on" : ""} onClick={() => setQuestionCount(count)}>{count}{lx("题", "")}</button>
							))}
							<button className={questionCount === "all" ? "on" : ""} onClick={() => setQuestionCount("all")}>
								{lx(`整章全部（${baseQuestions.length}题）`, `Entire chapter (${baseQuestions.length})`)}
							</button>
						</div>
						<small>{lx("每次开始都会重新随机排序", "Questions are reshuffled for every attempt")}</small>
					</div>
					<button className="kanji-exam-start" onClick={start}>
						{lx(
							`开始随机练习（${questionCount === "all" ? baseQuestions.length : Math.min(questionCount, baseQuestions.length)}题）`,
							`Start randomized practice (${questionCount === "all" ? baseQuestions.length : Math.min(questionCount, baseQuestions.length)})`,
						)} <span>→</span>
					</button>
				</section>

				<section className="kanji-exam-library">
					<div className="kanji-exam-section-title">
						<div><span>03</span><h2>{lx("本次汉字范围", "Kanji in this set")}</h2></div>
					</div>
					{batch.lessons.map((lesson) => (
						<div className="kanji-exam-library__row" key={lesson.id}>
							<div><strong>{lesson.title}</strong><small>p.{lesson.pages.join(" / ")}</small></div>
							<p>{lesson.kanji.map((kanji) => <span key={kanji}>{kanji}</span>)}</p>
						</div>
					))}
				</section>

				{history.length ? (
					<section className="kanji-exam-history">
						<h2>{lx("最近练习", "Recent attempts")}</h2>
						{history.slice(0, 5).map((item) => (
							<details key={item.id}>
								<summary>
									<span><strong>{scoreLabel(item.correct, item.total)}</strong>{lx("分", "")}</span>
									<p><b>{item.batchTitle}</b><small>{modeLabel(item.mode)} · {new Date(item.completedAt).toLocaleString()}</small></p>
									<em>{item.correct}/{item.total}</em>
								</summary>
								<div className="kanji-exam-history__wrong">
									{item.wrongQuestions?.length ? (
										<>
											<h3>{lx(`错题（${item.wrongQuestions.length}）`, `Incorrect (${item.wrongQuestions.length})`)}</h3>
											{item.wrongQuestions.map((wrong, index) => (
												<div key={`${wrong.questionId}-${index}`}>
													<small>{wrong.lessonTitle} · {wrong.kind === "reading" ? lx("读音", "Reading") : lx("汉字", "Kanji")}</small>
													<p><MarkedPrompt question={{ ...wrong, id: wrong.questionId, lessonId: "", page: 0 }} /></p>
													<span>{lx("你的答案", "Your answer")}: <del>{wrong.userAnswer || "—"}</del>　{lx("正确答案", "Answer")}: <b>{wrong.answer}</b></span>
												</div>
											))}
										</>
									) : <p>{item.correct === item.total ? lx("这次全部答对了。", "Everything was correct.") : lx("旧记录没有保存错题详情。", "Question details were not stored for this older attempt.")}</p>}
								</div>
							</details>
						))}
					</section>
				) : null}

				<details className="kanji-exam-import-note">
					<summary>{lx("以后如何加入新照片？", "How will new photos be added?")}</summary>
					<p>{lx("图片解析接口已经按服务商无关的格式预留。以后可以接 Gemini 等视觉 API 自动生成待校对题库，也可以继续把照片发给我，由我识别、校对后随版本发布。", "A provider-neutral image parsing endpoint is reserved. It can later connect to Gemini or another vision API, or the photos can be reviewed manually and published with the site.")}</p>
				</details>
			</div>
		);
	}

	return (
		<div className="kanji-exam-page kanji-exam-paper">
			<div className="kanji-exam-toolbar">
				<button onClick={() => { setStarted(false); setSubmitted(false); setRetrying(false); setActiveQuestions([]); }}>{lx("‹ 返回题库", "‹ Back to sets")}</button>
				<div><strong>{batch.title}</strong><span>{retrying ? lx("错题重练", "Retry incorrect") : modeLabel(mode)} · {questions.length}{lx("题", " questions")}</span></div>
				<em>{answeredCount}/{questions.length}</em>
			</div>

			<header className="kanji-exam-paper__head">
				<span>漢字テスト</span>
				<h1>{batch.title}</h1>
				<p>{batch.subtitle}</p>
			</header>

			{submitted ? (
				<div className="kanji-exam-result" ref={resultRef}>
					<div><strong>{scoreLabel(correctIds.length, questions.length)}</strong><span>/ 100</span></div>
					<p><b>{lx("本次得分", "Your score")}</b><span>{lx(`答对 ${correctIds.length} 题，答错 ${questions.length - correctIds.length} 题`, `${correctIds.length} correct, ${questions.length - correctIds.length} incorrect`)}</span></p>
					{incorrectQuestions.length ? <button onClick={retryWrong}>{lx(`只重练错题（${incorrectQuestions.length}）`, `Retry incorrect (${incorrectQuestions.length})`)}</button> : <span className="kanji-exam-perfect">✓ {lx("全部答对", "Perfect score")}</span>}
				</div>
			) : null}

			<section className="kanji-exam-question-group">
				<div className="kanji-exam-question-group__head"><h2>{lx("随机试题", "Randomized questions")}</h2></div>
				<div className="kanji-exam-question-section">
					<h3>{lx("请完成全部题目后交卷。读音题填写平假名，汉字题只填写标记假名对应的汉字。", "Answer every question before submitting. Use hiragana for readings and only the marked kanji for writing questions.")}</h3>
					{questions.map((question, index) => {
						const number = index + 1;
						const value = answers[question.id] || "";
						const correct = submitted && correctSet.has(question.id);
						return (
							<div className={`kanji-exam-question ${submitted ? correct ? "correct" : "wrong" : ""}`} key={question.id}>
								<span className="kanji-exam-question__number">{number}</span>
								<div className="kanji-exam-question__body">
									<small className="kanji-exam-question__meta">{lessonTitleById.get(question.lessonId)} · {question.kind === "reading" ? lx("读音", "Reading") : lx("汉字", "Kanji")}</small>
									<p><MarkedPrompt question={question} /></p>
									<label>
										<span>{question.kind === "reading" ? lx("读音", "Reading") : lx("汉字", "Kanji")}</span>
										<input
											value={value}
											disabled={submitted}
											onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))}
											autoComplete="off"
											autoCapitalize="off"
											spellCheck={false}
											aria-label={`${number}. ${question.prompt}`}
										/>
										{submitted ? <i>{correct ? "✓" : "×"}</i> : null}
									</label>
									{submitted && !correct ? <div className="kanji-exam-correction"><span>{lx("正确答案", "Answer")}</span><strong>{question.answer}</strong></div> : null}
								</div>
							</div>
						);
					})}
				</div>
			</section>

			<div className="kanji-exam-submitbar">
				{submitted ? (
					<button onClick={() => { setStarted(false); setSubmitted(false); setRetrying(false); setActiveQuestions([]); }}>{lx("完成并返回题库", "Finish and return")}</button>
				) : (
					<>
						<span>{remainingCount > 0 ? lx(`还需完成 ${remainingCount} 题`, `${remainingCount} remaining`) : lx("已完成全部题目，可以交卷", "All questions answered")}</span>
						<button onClick={finish} disabled={remainingCount > 0}>{lx("交卷并查看答案", "Submit and see answers")}</button>
					</>
				)}
			</div>
		</div>
	);
}
