import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import {
	filledKanjiExamForm,
	isKanjiExamAnswerCorrect,
	shuffleKanjiExamQuestions,
} from "../data/kanji-exam";
import {
	KANJI_MASTER_CLEAR_AFTER,
	filterKanjiMasterQuestions,
	hasKanjiMasterChoices,
	kanjiMasterScopeQuestions,
	kanjiMasterTests,
	loadKanjiMasterData,
	readKanjiMasterHistory,
	readKanjiMasterWrongBook,
	storeKanjiMasterHistory,
	storeKanjiMasterWrongBook,
	updateKanjiMasterWrongBook,
	type KanjiMasterAttempt,
	type KanjiMasterData,
	type KanjiMasterKindFilter,
	type KanjiMasterQuestion,
	type KanjiMasterScope,
	type KanjiMasterTest,
	type KanjiMasterWrongBook,
} from "../data/kanji-master-n2";
import { Hanamaru } from "./answer-feedback";
import { MarkedPrompt } from "./kanji-exam-marked";
import { TickText } from "./tick-text";
import { lx } from "./store";
import "../routes/kanji-exam.css";

type ScopeType = "lesson" | "chapter" | "test" | "part" | "book" | "wrong";

const scopeMeta: Record<ScopeType, { icon: string; cn: string; en: string; descCn: string; descEn: string }> = {
	lesson: { icon: "課", cn: "按课", en: "By lesson", descCn: "選 編 → 章 → 课，练这一课的例词读写", descEn: "Pick part → chapter → lesson and drill its words" },
	chapter: { icon: "章", cn: "整章复习", en: "Chapter review", descCn: "整章 5 课 ＋ 章末「復習」", descEn: "All lessons of a chapter plus its 復習 page" },
	test: { icon: "試", cn: "按测验", en: "By test", descCn: "アチーブメント／まとめ／クイズ，可做选择题", descEn: "Achievement / まとめ / quiz tests, with multiple choice" },
	part: { icon: "編", cn: "按編", en: "By part", descCn: "基本編（1–10章）或 挑戦編（11–19章）随机抽题", descEn: "Random questions from 基本編 (1–10) or 挑戦編 (11–19)" },
	book: { icon: "本", cn: "整本随机", en: "Whole book", descCn: "全书随机抽题，可只抽读音或只抽汉字", descEn: "Random questions from the whole book" },
	wrong: { icon: "错", cn: "错题重练", en: "Wrong answers", descCn: `全书错题；连续答对 ${KANJI_MASTER_CLEAR_AFTER} 次后移出`, descEn: `All saved mistakes; cleared after ${KANJI_MASTER_CLEAR_AFTER} correct answers in a row` },
};

const kindMeta: Record<KanjiMasterKindFilter, { cn: string; en: string }> = {
	mixed: { cn: "读音＋汉字", en: "Both" },
	reading: { cn: "只练读音", en: "Readings only" },
	writing: { cn: "只练汉字", en: "Kanji only" },
};

/** Above this many questions the "all" option is hidden (too long for one paper). */
const ALL_LIMIT = 400;
const COUNT_OPTIONS = [10, 20, 30, 50, 100];

function scoreLabel(correct: number, total: number) {
	return total ? Math.round((correct / total) * 100) : 0;
}

function sourceLabel(question: KanjiMasterQuestion) {
	if (question.source === "example") return `${question.chapter}-${question.lesson} ${question.lessonTitle}`;
	const where = question.section ? ` [${question.section}]${question.number ?? ""}` : "";
	return `${question.testTitle || question.source}${where}`;
}

function testLabel(test: KanjiMasterTest) {
	return `${test.title}（${test.chapters.join("・")}${lx("章", "")}）`;
}

function completeWord(question: KanjiMasterQuestion) {
	if (question.kind === "reading") return question.target;
	return question.completeWord || filledKanjiExamForm(question);
}

function FullWord({ question }: { question: KanjiMasterQuestion }) {
	const word = completeWord(question);
	if (!word || word === question.answer) return null;
	const index = question.kind === "writing" ? word.indexOf(question.answer) : -1;
	if (index < 0) return <b className="kanji-exam-full-kanji">{word}</b>;
	return (
		<b className="kanji-exam-full-kanji">
			{word.slice(0, index)}
			<mark>{question.answer}</mark>
			{word.slice(index + question.answer.length)}
		</b>
	);
}

function AnswerReveal({ question, answerKey }: { question: KanjiMasterQuestion; answerKey: boolean }) {
	return (
		<div className={`kanji-exam-correction${answerKey ? " answer-key" : ""}`}>
			<span>{lx("正确答案", "Answer")}</span>
			<strong>{question.answer}</strong>
			<FullWord question={question} />
			{question.zh ? (
				<span className="kanji-exam-answer-gloss">
					<i lang="zh-Hans">{question.zh}</i>
				</span>
			) : null}
		</div>
	);
}

function ChoiceInput({
	question,
	value,
	disabled,
	onChange,
	number,
}: {
	question: KanjiMasterQuestion;
	value: string;
	disabled: boolean;
	onChange: (value: string) => void;
	number: number;
}) {
	return (
		<div className="kanji-master-choices" role="radiogroup" aria-label={`${number}. ${question.prompt}`}>
			{(question.choices || []).map((choice, index) => (
				<button
					key={index}
					type="button"
					role="radio"
					aria-checked={choice !== null && value === choice}
					className={choice !== null && value === choice ? "on" : ""}
					disabled={disabled || choice === null}
					onClick={() => choice !== null && onChange(choice)}
				>
					<b>{"①②③④"[index] || index + 1}</b>
					{choice ?? lx("（扫描不清）", "(illegible in scan)")}
				</button>
			))}
		</div>
	);
}

function KanjiCards({ data, lessonId }: { data: KanjiMasterData; lessonId: string }) {
	const lesson = data.structure.chapters.flatMap((chapter) => chapter.lessons).find((item) => item.id === lessonId);
	if (!lesson?.kanji?.length) return null;
	return (
		<section className="kanji-exam-library kanji-exam-vocab">
			<div className="kanji-exam-section-title">
				<div><span>04</span><h2>{lx("本课汉字", "Kanji in this lesson")}</h2></div>
				<small>p.{lesson.bookPage}</small>
			</div>
			<div className="kanji-exam-vocab__grid">
				{lesson.kanji.map((card) => (
					<div className="kanji-exam-vocab__entry" key={card.kanji}>
						<strong lang="ja">{card.kanji}</strong>
						<ul>
							<li lang="ja">
								<small>
									{card.on?.length ? `音 ${card.on.join("・")}` : ""}
									{card.on?.length && card.kun?.length ? "　" : ""}
									{card.kun?.length ? `訓 ${card.kun.join("・")}` : ""}
									{card.strokes ? `　${card.strokes}${lx("画", " strokes")}` : ""}
								</small>
								{card.meaningZh ? <span className="kanji-exam-vocab__gloss" lang="zh">{card.meaningZh}</span> : null}
							</li>
							{(card.examples || []).map((example) => (
								<li key={example.phrase} lang="ja">
									<span>{example.special ? "△" : ""}{example.phrase}</span>
									<small>{example.words.map((word) => word.reading).join("・")}</small>
									{example.meaningZh ? <span className="kanji-exam-vocab__gloss" lang="zh">{example.meaningZh}</span> : null}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</section>
	);
}

export function KanjiMasterExam({ groupPicker }: { groupPicker?: ReactNode }) {
	const [data, setData] = useState<KanjiMasterData | null>(null);
	const [loadError, setLoadError] = useState(false);
	const [scopeType, setScopeType] = useState<ScopeType>("lesson");
	const [part, setPart] = useState("基本編");
	const [chapterNo, setChapterNo] = useState(1);
	const [lessonId, setLessonId] = useState("km-ch1-1");
	const [testId, setTestId] = useState("");
	const [kind, setKind] = useState<KanjiMasterKindFilter>("mixed");
	const [wrongOnly, setWrongOnly] = useState(false);
	const [choiceStyle, setChoiceStyle] = useState(true);
	const [questionCount, setQuestionCount] = useState<number | "all" | null>(null);
	const [started, setStarted] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [retrying, setRetrying] = useState(false);
	const [showAllAnswers, setShowAllAnswers] = useState(false);
	const [answers, setAnswers] = useState<Record<string, string>>({});
	const [activeQuestions, setActiveQuestions] = useState<KanjiMasterQuestion[]>([]);
	const [activeLabel, setActiveLabel] = useState("");
	const [wrongBook, setWrongBook] = useState<KanjiMasterWrongBook>({});
	const [history, setHistory] = useState<KanjiMasterAttempt[]>([]);
	const resultRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let alive = true;
		setWrongBook(readKanjiMasterWrongBook());
		setHistory(readKanjiMasterHistory());
		loadKanjiMasterData().then(
			(loaded) => {
				if (!alive) return;
				if (!Array.isArray(loaded.questions) || !Array.isArray(loaded.structure?.chapters)) {
					setLoadError(true);
					return;
				}
				setData(loaded);
			},
			() => alive && setLoadError(true),
		);
		return () => {
			alive = false;
		};
	}, []);

	const tests = useMemo(() => (data ? kanjiMasterTests(data.questions) : []), [data]);
	const activeTestId = testId || tests[0]?.id || "";
	const chapters = data?.structure.chapters || [];
	const partChapters = chapters.filter((chapter) => chapter.part === part);
	const chapter = chapters.find((item) => item.no === chapterNo) || chapters[0];
	const wrongIds = useMemo(() => new Set(Object.keys(wrongBook)), [wrongBook]);

	const scope: KanjiMasterScope = useMemo(() => {
		switch (scopeType) {
			case "lesson": return { type: "lesson", lessonId };
			case "chapter": return { type: "chapter", chapter: chapterNo };
			case "test": return { type: "test", testId: activeTestId };
			case "part": return { type: "part", part };
			default: return { type: "book" };
		}
	}, [scopeType, lessonId, chapterNo, activeTestId, part]);
	const onlyWrong = scopeType === "wrong" || wrongOnly;
	const scopeQuestions = useMemo(() => (data ? kanjiMasterScopeQuestions(data, scope) : []), [data, scope]);
	const baseQuestions = useMemo(
		() => filterKanjiMasterQuestions(scopeQuestions, kind, onlyWrong ? wrongIds : null),
		[scopeQuestions, kind, onlyWrong, wrongIds],
	);
	const countOptions = COUNT_OPTIONS.filter((count) => count < baseQuestions.length);
	const allowAll = baseQuestions.length <= ALL_LIMIT;
	// Short sets default to the whole set; long ones to 20 random questions.
	const autoCount: number | "all" = baseQuestions.length <= 100 ? "all" : 20;
	const countValid =
		questionCount !== null && (questionCount === "all" ? allowAll : questionCount < baseQuestions.length);
	const effectiveCount: number | "all" = countValid && questionCount !== null ? questionCount : autoCount;
	const startCount = effectiveCount === "all" ? baseQuestions.length : Math.min(effectiveCount, baseQuestions.length);

	const scopeLabel = (() => {
		if (scopeType === "wrong") return lx("错题重练", "Wrong answers");
		if (scopeType === "book") return lx("整本随机", "Whole book");
		if (scopeType === "part") return part;
		if (scopeType === "test") {
			const test = tests.find((item) => item.id === activeTestId);
			return test ? `${testLabel(test)} p.${test.page}` : "";
		}
		if (!chapter) return "";
		const chapterLabel = lx(`第${chapter.no}章 ${chapter.title}`, `Ch.${chapter.no} ${chapter.title}`);
		if (scopeType === "chapter") return `${chapterLabel} · ${lx("整章复习", "review")}`;
		const lesson = chapter.lessons.find((item) => item.id === lessonId);
		return lesson ? `${chapterLabel} · ${lesson.no} ${lesson.title}` : chapterLabel;
	})();

	const correctSet = useMemo(
		() => new Set(submitted ? activeQuestions.filter((question) => isKanjiExamAnswerCorrect(question, answers[question.id] || "")).map((question) => question.id) : []),
		[submitted, activeQuestions, answers],
	);
	const incorrectQuestions = submitted ? activeQuestions.filter((question) => !correctSet.has(question.id)) : [];
	const answeredCount = activeQuestions.filter((question) => (answers[question.id] || "").trim()).length;
	const remainingCount = activeQuestions.length - answeredCount;

	const chooseScope = (next: ScopeType) => {
		setScopeType(next);
		setQuestionCount(null);
	};
	const chooseChapter = (no: number) => {
		setChapterNo(no);
		const first = chapters.find((item) => item.no === no)?.lessons[0];
		if (first) setLessonId(first.id);
		setQuestionCount(null);
	};
	const choosePart = (name: string) => {
		setPart(name);
		const first = chapters.find((item) => item.part === name);
		if (first && scopeType !== "part") chooseChapter(first.no);
		setQuestionCount(null);
	};

	const resetPaper = () => {
		setStarted(false);
		setSubmitted(false);
		setRetrying(false);
		setShowAllAnswers(false);
		setActiveQuestions([]);
	};

	const start = () => {
		if (!baseQuestions.length) return;
		const shuffled = shuffleKanjiExamQuestions(baseQuestions);
		setActiveQuestions(effectiveCount === "all" ? shuffled : shuffled.slice(0, startCount));
		setActiveLabel(scopeLabel);
		setAnswers({});
		setRetrying(false);
		setSubmitted(false);
		setShowAllAnswers(false);
		setStarted(true);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const finish = () => {
		if (submitted || remainingCount > 0) return;
		const results = activeQuestions.map((question) => ({ id: question.id, correct: isKanjiExamAnswerCorrect(question, answers[question.id] || "") }));
		const correct = results.filter((item) => item.correct).length;
		const nextBook = updateKanjiMasterWrongBook(wrongBook, results);
		setWrongBook(nextBook);
		storeKanjiMasterWrongBook(nextBook);
		const entry: KanjiMasterAttempt = {
			id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
			scopeLabel: activeLabel,
			kind,
			wrongOnly: onlyWrong || retrying,
			correct,
			total: activeQuestions.length,
			completedAt: new Date().toISOString(),
		};
		const nextHistory = [entry, ...history];
		setHistory(nextHistory);
		storeKanjiMasterHistory(nextHistory);
		setSubmitted(true);
		setShowAllAnswers(true);
		requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
	};

	const retryWrong = () => {
		setActiveQuestions(shuffleKanjiExamQuestions(incorrectQuestions));
		setRetrying(true);
		setAnswers({});
		setSubmitted(false);
		setShowAllAnswers(false);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const hero = (
		<section className="kanji-exam-hero">
			<div>
				<span className="kanji-exam-eyebrow">KANJI SELF-TEST</span>
				<h1>{lx("汉字自测", "Kanji Self-test")}</h1>
			</div>
		</section>
	);

	if (!data) {
		return (
			<div className="kanji-exam-page">
				{hero}
				{groupPicker}
				<section className="kanji-exam-panel">
					<p className="kanji-master-status">
						{loadError
							? lx("题库加载失败，请检查网络后重新进入。", "Could not load the question bank. Check your connection and reopen this page.")
							: lx("正在加载漢字マスター N2 题库…", "Loading the Kanji Master N2 question bank…")}
					</p>
				</section>
			</div>
		);
	}

	if (!started) {
		return (
			<div className="kanji-exam-page">
				{hero}
				{groupPicker}

				<section className="kanji-exam-panel">
					<div className="kanji-exam-section-title">
						<div><span>01</span><h2>{lx("选择练习方式", "Choose how to practise")}</h2></div>
						<small>{data.structure.book.title}</small>
					</div>
					<div className="kanji-exam-modes kanji-master-scopes">
						{(Object.keys(scopeMeta) as ScopeType[]).map((key) => {
							const meta = scopeMeta[key];
							return (
								<button key={key} className={key === scopeType ? "on" : ""} onClick={() => chooseScope(key)}>
									<i>{meta.icon}</i>
									<strong>{lx(meta.cn, meta.en)}</strong>
									<span>{lx(meta.descCn, meta.descEn)}</span>
									{key === "wrong" ? <small>{wrongIds.size}{lx("题", " questions")}</small> : null}
								</button>
							);
						})}
					</div>
				</section>

				<section className="kanji-exam-panel">
					<div className="kanji-exam-section-title">
						<div><span>02</span><h2>{lx("选择范围", "Choose the range")}</h2></div>
						<small>{scopeLabel}</small>
					</div>

					{scopeType === "lesson" || scopeType === "chapter" || scopeType === "part" ? (
						<div className="kanji-exam-count-picker kanji-master-picker">
							<strong>{lx("編", "Part")}</strong>
							<div>
								{data.structure.parts.map((item) => (
									<button key={item.name} className={item.name === part ? "on" : ""} onClick={() => choosePart(item.name)}>
										{item.name}（{item.chapters[0]}–{item.chapters[item.chapters.length - 1]}{lx("章", "")}）
									</button>
								))}
							</div>
						</div>
					) : null}

					{scopeType === "lesson" || scopeType === "chapter" ? (
						<div className="kanji-exam-count-picker kanji-master-picker">
							<strong>{lx("章", "Chapter")}</strong>
							<div>
								{partChapters.map((item) => (
									<button key={item.id} className={item.no === chapterNo ? "on" : ""} onClick={() => chooseChapter(item.no)}>
										{item.no} {item.title}
									</button>
								))}
							</div>
						</div>
					) : null}

					{scopeType === "lesson" && chapter ? (
						<div className="kanji-exam-count-picker kanji-master-picker">
							<strong>{lx("课", "Lesson")}</strong>
							<div>
								{chapter.lessons.map((lesson) => (
									<button key={lesson.id} className={lesson.id === lessonId ? "on" : ""} onClick={() => { setLessonId(lesson.id); setQuestionCount(null); }}>
										{lesson.no} {lesson.title}{lesson.titleZh ? `（${lesson.titleZh}）` : ""}
									</button>
								))}
							</div>
						</div>
					) : null}

					{scopeType === "test" ? (
						<div className="kanji-exam-batches">
							{tests.map((test) => (
								<button key={test.id} className={test.id === activeTestId ? "on" : ""} onClick={() => { setTestId(test.id); setQuestionCount(null); }}>
									<span className="kanji-exam-batch-check">{test.id === activeTestId ? "✓" : ""}</span>
									<strong>{testLabel(test)}</strong>
									<span>p.{test.page}</span>
									<small>{test.count}{lx("题", " questions")}</small>
								</button>
							))}
						</div>
					) : null}

					{scopeType === "book" || scopeType === "wrong" ? (
						<p className="kanji-master-status">
							{scopeType === "book"
								? lx(`全书 ${data.questions.length} 题中随机抽题`, `Random questions from all ${data.questions.length}`)
								: wrongIds.size
									? lx(`错题本里共有 ${wrongIds.size} 题`, `${wrongIds.size} saved mistakes`)
									: lx("错题本是空的。做题答错后会自动加入。", "No saved mistakes yet. Wrong answers are added automatically.")}
						</p>
					) : null}
				</section>

				<section className="kanji-exam-panel">
					<div className="kanji-exam-section-title">
						<div><span>03</span><h2>{lx("题型与数量", "Question type and count")}</h2></div>
					</div>
					<div className="kanji-exam-count-picker kanji-master-picker">
						<strong>{lx("题型", "Type")}</strong>
						<div>
							{(Object.keys(kindMeta) as KanjiMasterKindFilter[]).map((key) => (
								<button key={key} className={key === kind ? "on" : ""} onClick={() => { setKind(key); setQuestionCount(null); }}>
									{lx(kindMeta[key].cn, kindMeta[key].en)}
								</button>
							))}
						</div>
					</div>
					{scopeType !== "wrong" ? (
						<div className="kanji-exam-count-picker kanji-master-picker">
							<strong>{lx("只练错题", "Mistakes only")}</strong>
							<div>
								<button type="button" role="switch" aria-checked={wrongOnly} className={wrongOnly ? "on" : ""} onClick={() => { setWrongOnly((current) => !current); setQuestionCount(null); }}>
									{wrongOnly ? lx("已开启", "On") : lx("已关闭", "Off")}
								</button>
							</div>
							<small>{lx(`本范围内的错题：${filterKanjiMasterQuestions(scopeQuestions, kind, wrongIds).length} 题`, `Mistakes in this range: ${filterKanjiMasterQuestions(scopeQuestions, kind, wrongIds).length}`)}</small>
						</div>
					) : null}
					{scopeType === "test" ? (
						<div className="kanji-exam-count-picker kanji-master-picker">
							<strong>{lx("选择题", "Multiple choice")}</strong>
							<div>
								<button type="button" role="switch" aria-checked={choiceStyle} className={choiceStyle ? "on" : ""} onClick={() => setChoiceStyle((current) => !current)}>
									{choiceStyle ? lx("四选一", "Choose 1 of 4") : lx("改成填写", "Type the answer")}
								</button>
							</div>
							<small>{lx("书中 [1][2] 是四选一；关闭后改为直接填写", "Sections [1][2] are multiple choice in the book; switch off to type answers")}</small>
						</div>
					) : null}
					<div className="kanji-exam-count-picker">
						<strong>{lx("随机抽题数量", "Random question count")}</strong>
						<div>
							{countOptions.map((count) => (
								<button key={count} className={effectiveCount === count ? "on" : ""} onClick={() => setQuestionCount(count)}>{count}{lx("题", " questions")}</button>
							))}
							{allowAll ? (
								<button className={effectiveCount === "all" ? "on" : ""} onClick={() => setQuestionCount("all")}>
									{lx(`全部（${baseQuestions.length}题）`, `All (${baseQuestions.length})`)}
								</button>
							) : null}
						</div>
						<small>{lx("每次开始都会重新随机排序", "Questions are reshuffled for every attempt")}</small>
					</div>
					<button className="kanji-exam-start" onClick={start} disabled={!baseQuestions.length}>
						{lx(`开始随机练习（${startCount}题）`, `Start randomized practice (${startCount})`)} <span>→</span>
					</button>
				</section>

				{scopeType === "lesson" ? <KanjiCards data={data} lessonId={lessonId} /> : null}

				{history.length ? (
					<section className="kanji-exam-history">
						<h2>{lx("最近练习", "Recent attempts")}</h2>
						{history.slice(0, 5).map((item) => (
							<details key={item.id}>
								<summary>
									<span><strong><TickText value={scoreLabel(item.correct, item.total)} /></strong>{lx("分", " pts")}</span>
									<p><b>{item.scopeLabel}</b><small>{lx(kindMeta[item.kind].cn, kindMeta[item.kind].en)}{item.wrongOnly ? ` · ${lx("错题", "mistakes")}` : ""} · {new Date(item.completedAt).toLocaleString()}</small></p>
									<em>{item.correct}/{item.total}</em>
								</summary>
								<div className="kanji-exam-history__wrong">
									<p>{lx("这次的错题已记入错题本，可用「错题重练」再练。", "Mistakes from this attempt are in the wrong-answer book.")}</p>
								</div>
							</details>
						))}
					</section>
				) : null}
			</div>
		);
	}

	return (
		<div className="kanji-exam-page kanji-exam-paper">
			<div className="kanji-exam-toolbar">
				<button onClick={resetPaper}>{lx("‹ 返回题库", "‹ Back to sets")}</button>
				<div><strong>{activeLabel}</strong><span>{retrying ? lx("错题重练", "Retry incorrect") : lx(kindMeta[kind].cn, kindMeta[kind].en)} · {activeQuestions.length}{lx("题", " questions")}</span></div>
				<em><TickText value={`${answeredCount}/${activeQuestions.length}`} /></em>
			</div>

			<header className="kanji-exam-paper__head">
				<span>漢字テスト</span>
				<h1>{activeLabel}</h1>
				<p>{data.structure.book.title}</p>
			</header>

			{submitted ? (
				<div className="kanji-exam-result" ref={resultRef}>
					<div><strong><TickText value={scoreLabel(correctSet.size, activeQuestions.length)} /></strong><span>/ 100</span></div>
					<p><b>{lx("本次得分", "Your score")}</b><span>{lx(`答对 ${correctSet.size} 题，答错 ${activeQuestions.length - correctSet.size} 题`, `${correctSet.size} correct, ${activeQuestions.length - correctSet.size} incorrect`)}</span></p>
					{incorrectQuestions.length ? <button onClick={retryWrong}>{lx(`只重练错题（${incorrectQuestions.length}）`, `Retry incorrect (${incorrectQuestions.length})`)}</button> : <span className="kanji-exam-perfect">✓ {lx("全部答对", "Perfect score")}</span>}
				</div>
			) : null}

			<section className="kanji-exam-question-group">
				<div className="kanji-exam-question-group__head">
					<h2>{lx("随机试题", "Randomized questions")}</h2>
					<button
						type="button"
						className={`kanji-exam-answers-fab${showAllAnswers ? " on" : ""}`}
						aria-pressed={showAllAnswers}
						onClick={() => setShowAllAnswers((current) => !current)}
					>
						{showAllAnswers ? lx("隐藏全部答案", "Hide all answers") : lx("显示全部答案", "Show all answers")}
					</button>
				</div>
				<div className="kanji-exam-question-section">
					<h3>{lx("请完成全部题目后交卷。读音题填写平假名，汉字题只填写标记假名对应的汉字。", "Answer every question before submitting. Use hiragana for readings and only the marked kanji for writing questions.")}</h3>
					{activeQuestions.map((question, index) => {
						const number = index + 1;
						const value = answers[question.id] || "";
						const correct = submitted && correctSet.has(question.id);
						const setValue = (next: string) => setAnswers((current) => ({ ...current, [question.id]: next }));
						const asChoice = choiceStyle && hasKanjiMasterChoices(question);
						return (
							<div className={`kanji-exam-question ${submitted ? correct ? "correct" : "wrong" : ""}`} key={question.id} data-question-id={question.id}>
								{submitted && correct ? <Hanamaru /> : null}
								<span className="kanji-exam-question__number">{number}</span>
								<div className="kanji-exam-question__body">
									<small className="kanji-exam-question__meta">{sourceLabel(question)} · {question.kind === "reading" ? lx("读音", "Reading") : lx("汉字", "Kanji")} · p.{question.page}</small>
									<p><MarkedPrompt question={question} /></p>
									{asChoice ? (
										<ChoiceInput question={question} value={value} disabled={submitted} onChange={setValue} number={number} />
									) : (
										<label>
											<span>{question.kind === "reading" ? lx("读音", "Reading") : lx("汉字", "Kanji")}</span>
											<input
												value={value}
												disabled={submitted}
												onChange={(event) => setValue(event.target.value)}
												autoComplete="off"
												autoCapitalize="off"
												spellCheck={false}
												aria-label={`${number}. ${question.prompt}`}
											/>
											{submitted ? <i>{correct ? "✓" : "×"}</i> : null}
										</label>
									)}
									{showAllAnswers || (submitted && !correct) ? <AnswerReveal question={question} answerKey={!submitted || correct} /> : null}
								</div>
							</div>
						);
					})}
				</div>
			</section>

			<div className="kanji-exam-submitbar">
				{submitted ? (
					<button onClick={resetPaper}>{lx("完成并返回题库", "Finish and return")}</button>
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
