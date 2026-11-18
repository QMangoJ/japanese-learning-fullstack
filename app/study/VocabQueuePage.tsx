import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

import { StudyFlip } from "./study-flip";
import { RubyHtml } from "../routes/study-common";
import type { SwipeGrade } from "./swipe-grade";
import { lx, navTo } from "./store";
import { trackFeature } from "./feature-usage";
import { jstToday } from "./lesson-review";
import {
	addExtraBatch,
	applyVocabGrade,
	countExtraCandidates,
	ensureVocabWords,
	EXTRA_BATCH_SIZE,
	getVocabQueueVersion,
	planBatchProgress,
	revertVocabGrade,
	shouldReshowToday,
	snapshotVocabGrade,
	subscribeVocabQueue,
	todayPlan,
	vocabQueueCanMint,
	vocabQueueData,
	vocabQueueReady,
	vocabWordsCache,
	type VocabBreakdown,
	type VocabGrade,
	type VocabGradeSnapshot,
	type VocabWord,
} from "./vocab-queue";

function useVocabTick() {
	return useSyncExternalStore(subscribeVocabQueue, getVocabQueueVersion, () => 0);
}

const GRADE_LABEL: Record<VocabGrade, [string, string]> = {
	again: ["不认识", "Don't know"],
	fuzzy: ["模糊", "Fuzzy"],
	know: ["认识", "Know"],
};

function toVocabGrade(grade: SwipeGrade): VocabGrade {
	return grade === "pass" ? "know" : grade === "fail" ? "again" : "fuzzy";
}

/** Fragment lines + optional keigo point of a grammar breakdown — shared by
 * the headword「语法拆解」block and the example「例句解析」block. */
function BreakdownLines({ bd }: { bd: VocabBreakdown }) {
	return (
		<>
			<div className="vq-bd-lines">
				{bd.lines.map((line, i) => (
					<div key={i} className="vq-bd-line">
						<span className="vq-bd-seg jp">{line.ruby ? <RubyHtml html={line.ruby} /> : line.seg}</span>
						<span className="vq-bd-form">{line.form}</span>
						<span className="vq-bd-role">{line.role}</span>
					</div>
				))}
			</div>
			{bd.keigo ? (
				<div className="vq-bd-keigo">
					<span className="vq-bd-keigo-label">🎩 {lx("敬语", "Keigo")}</span>
					<span className="vq-bd-seg jp">{bd.keigo.ruby ? <RubyHtml html={bd.keigo.ruby} /> : bd.keigo.seg}</span>
					<span className="vq-bd-keigo-type">{bd.keigo.type}</span>
					<span className="vq-bd-keigo-plain">← {bd.keigo.plain}</span>
				</div>
			) : null}
		</>
	);
}

/** Example sentence with segmented ruby when the built word list carries it
 * (word.exRuby): ruby segments render through RubyHtml so the reading sits
 * above the kanji only; plain segments render as text. Falls back to the
 * plain sentence when no verified segmentation exists. */
function ExampleSentence({ word }: { word: VocabWord }) {
	if (!word.exRuby || word.exRuby.length === 0) return <div>{word.ex}</div>;
	return (
		<div>
			{word.exRuby.map((s, i) =>
				s.ruby ? <RubyHtml key={i} html={s.ruby} /> : <span key={i}>{s.seg}</span>,
			)}
		</div>
	);
}

function VocabFlipCard({
	word,
	flipped,
	onFlip,
	onGrade,
}: {
	word: VocabWord;
	flipped: boolean;
	onFlip: () => void;
	onGrade: (grade: VocabGrade) => void;
}) {
	return (
		<>
			<StudyFlip
				key={word.id}
				flipped={flipped}
				onFlip={onFlip}
				onGrade={(g: SwipeGrade) => onGrade(toVocabGrade(g))}
				onSwipe={(g: SwipeGrade) => onGrade(toVocabGrade(g))}
				front={
					<>
						<span className="vq-chip">{word.src.split("・")[0]}</span>
						<div className="big vq-word">{word.w}</div>
						<div className="hint">{lx("点按翻面 · 右滑认识 / 左滑不认识 / 上滑模糊", "Tap to flip · swipe right = know, left = again, up = fuzzy")}</div>
					</>
				}
				back={
					<div className="backside">
						<span className="vq-chip">{word.src}</span>
						{word.r ? <div className="vq-reading">{word.r}</div> : null}
						<div className="vq-zh">{word.zh}</div>
						{word.en ? <div className="vq-en">{word.en}</div> : null}
						{word.ex ? (
							<div className="fcard-ex">
								<div className="fcard-ex-label">{lx("例句", "Example")}</div>
								<ExampleSentence word={word} />
								{word.exZh ? <div className="vq-ex-zh">{word.exZh}</div> : null}
								{word.exampleBreakdown ? (
									<div className="vq-ex-breakdown">
										<div className="fcard-ex-label">{lx("例句解析", "Example breakdown")}</div>
										<BreakdownLines bd={word.exampleBreakdown} />
									</div>
								) : null}
							</div>
						) : null}
						{word.breakdown ? (
							<div className="fcard-ex vq-breakdown">
								<div className="fcard-ex-label">{lx("语法拆解", "Breakdown")}</div>
								<BreakdownLines bd={word.breakdown} />
							</div>
						) : null}
					</div>
				}
			/>
			<div className="fc-actions">
				<div className="review-skill">
					{(Object.keys(GRADE_LABEL) as VocabGrade[]).map((g) => (
						<button key={g} type="button" className={g === "know" ? "known" : ""} onClick={() => onGrade(g)}>
							{lx(...GRADE_LABEL[g])}
						</button>
					))}
				</div>
			</div>
		</>
	);
}

/** Display order for the queue overview: queue priority (the five source
 * groups in build order; Preply rides right after its parent 课堂复习）. */
const SRC_PRIORITY = ["前端专题", "面试专题", "IT听力错词本", "课堂复习", "Preply", "收藏", "错词本", "番番词书", "N2词汇", "N2汉字"];

/** Per-source progress for the queue overview. Counting follows the same
 * rule the overview has always used — a merged word counts once under EACH
 * of its source labels — and adds, per label, how many of those words have
 * an SRS state (已学） and how many sit at ladder step 4+ (熟练）, the same
 * definitions as the overview header line. Rows are ordered by queue
 * priority; any label outside the known list falls to the end by size. */
function srcProgress(
	words: VocabWord[],
	states: Record<string, VocabWordState>,
): { label: string; total: number; studied: number; mastered: number }[] {
	const rows = new Map<string, { label: string; total: number; studied: number; mastered: number }>();
	for (const word of words) {
		const state = states[word.id];
		for (const label of word.src.split("・")) {
			const row = rows.get(label) ?? { label, total: 0, studied: 0, mastered: 0 };
			row.total += 1;
			if (state) {
				row.studied += 1;
				if (state.s >= 4) row.mastered += 1;
			}
			rows.set(label, row);
		}
	}
	const rank = (label: string) => {
		const i = SRC_PRIORITY.indexOf(label);
		return i === -1 ? SRC_PRIORITY.length : i;
	};
	return [...rows.values()].sort((a, b) => rank(a.label) - rank(b.label) || b.total - a.total);
}

/** One graded card the「上一个」button can step back to: the pre-grade snapshot
 * (annulled in the store on step-back) plus, for session grades, the session
 * queue as it was just before the grade — restoring it puts the card back in
 * front. Retest grades leave the session queue alone, so theirs is null and
 * stepping back simply re-opens the card in the retest view. */
type PrevEntry = { snap: VocabGradeSnapshot; queueBefore: string[] | null };

export function VocabQueuePage() {
	useVocabTick();
	const [loaded, setLoaded] = useState(false);
	const [queue, setQueue] = useState<string[] | null>(null);
	const [flipped, setFlipped] = useState(false);
	const [retestId, setRetestId] = useState<string | null>(null);
	const [showPassed, setShowPassed] = useState(false);
	const [history, setHistory] = useState<PrevEntry[]>([]);
	const reshownRef = useRef<Set<string>>(new Set());
	const planDateRef = useRef<string | null>(null);

	useEffect(() => {
		let alive = true;
		void ensureVocabWords().then(() => {
			if (alive) setLoaded(true);
		});
		return () => {
			alive = false;
		};
	}, []);

	const words = vocabWordsCache();
	const today = jstToday();
	const isReady = vocabQueueReady();
	const canMint = vocabQueueCanMint(today);

	// Build (or reuse) today's plan once the word list is available AND the
	// server pull has settled — the server-side plan (progress, order,
	// re-show state) is restored as-is; only then may a fresh plan be minted.
	// canMint additionally requires that pull to have SUCCEEDED today: a
	// failed pull leaves ready set but the local snapshot unverified, and
	// todayPlan would refuse to mint from it anyway.
	useEffect(() => {
		if (words && words.length && isReady && canMint) todayPlan(words, today);
	}, [words, today, isReady, canMint]);

	const data = vocabQueueData();
	const plan = data.plan && data.plan.date === today ? data.plan : null;

	// Session queue = today's plan (baseline + extra batches) minus what's
	// already done (per stored plan). Cards still awaiting their same-day
	// re-show (again/fuzzy, not yet done) go to the end again, so a reload
	// mid-session — extra batches included — continues seamlessly.
	useEffect(() => {
		if (!plan || !isReady) return;
		if (planDateRef.current === plan.date && queue !== null) return;
		planDateRef.current = plan.date;
		for (const id of plan.reshown ?? []) reshownRef.current.add(id);
		const doneSet = new Set([...plan.done, ...(plan.extra?.done ?? [])]);
		const pending = [...plan.ids, ...(plan.extra?.ids ?? [])].filter((id) => !doneSet.has(id));
		const awaitingReshow = pending.filter((id) => (plan.reshown ?? []).includes(id));
		setQueue([...pending.filter((id) => !awaitingReshow.includes(id)), ...awaitingReshow]);
	}, [plan, queue, isReady]);

	const byId = useMemo(() => new Map((words ?? []).map((word) => [word.id, word])), [words]);
	const current = queue && queue.length ? byId.get(queue[0]) : undefined;
	const doneCount = plan ? plan.done.length : 0;
	const total = plan ? plan.ids.length : 0;
	// The two batches are counted apart: 复习 x/N and 新词 y/50.
	const batch = plan
		? planBatchProgress(plan)
		: { reviewDone: 0, reviewTotal: 0, freshDone: 0, freshTotal: 0 };
	const extraDone = plan?.extra?.done.length ?? 0;
	const extraTotal = plan?.extra?.ids.length ?? 0;

	const onAddExtra = () => {
		if (!words) return;
		const added = addExtraBatch(words, today);
		if (added.length) {
			trackFeature("vocab-queue", "extra");
			setQueue((q) => [...(q ?? []), ...added]);
		}
	};

	// 功能埋点： a session counts once per plan day, when its queue first exists.
	const startTrackedRef = useRef<string | null>(null);
	useEffect(() => {
		if (!plan || queue === null) return;
		if (startTrackedRef.current === plan.date) return;
		startTrackedRef.current = plan.date;
		trackFeature("vocab-queue", "start");
	}, [plan, queue]);

	const grade = (vocabGrade: VocabGrade) => {
		if (!queue || !queue.length) return;
		trackFeature("vocab-queue", "grade");
		const id = queue[0];
		setFlipped(false);
		// Record the pre-grade snapshot + queue before anything changes, so
		// 「上一个」 can annul this grade exactly and bring the card back.
		const entry: PrevEntry = { snap: snapshotVocabGrade(id), queueBefore: [...queue] };
		if (shouldReshowToday(vocabGrade, reshownRef.current.has(id))) {
			// First "again"/"fuzzy" today: grade now (not done yet) and show the
			// card once more at the end of the session; the re-show grade counts.
			reshownRef.current.add(id);
			applyVocabGrade(id, vocabGrade, false, today);
			setQueue([...queue.slice(1), id]);
		} else {
			applyVocabGrade(id, vocabGrade, true, today);
			setQueue(queue.slice(1));
		}
		setHistory((h) => [...h, entry]);
	};

	const retestWord = retestId ? byId.get(retestId) : undefined;
	const gradeRetest = (vocabGrade: VocabGrade) => {
		if (!retestId) return;
		trackFeature("vocab-queue", "grade");
		setFlipped(false);
		const entry: PrevEntry = { snap: snapshotVocabGrade(retestId), queueBefore: null };
		// Retest overwrites today's grade/state; the word is already in done,
		// so the 今日 n/50 count does not change.
		applyVocabGrade(retestId, vocabGrade, true, today);
		setRetestId(null);
		setHistory((h) => [...h, entry]);
	};

	/** Step back to the most recently graded card: annul its grade in the
	 * store (state + today's marks restored, so re-grading replaces it and
	 * never double-counts) and put the card back in front of the user. */
	const goPrev = () => {
		const entry = history[history.length - 1];
		if (!entry) return;
		setHistory(history.slice(0, -1));
		setFlipped(false);
		revertVocabGrade(entry.snap, today);
		reshownRef.current = new Set(vocabQueueData().plan?.reshown ?? []);
		if (entry.queueBefore) {
			setRetestId(null);
			setQueue(entry.queueBefore);
		} else {
			setRetestId(entry.snap.id);
		}
	};

	if (!loaded || !words) return <div className="empty">{lx("词表加载中…", "Loading word list…")}</div>;
	if (!words.length) return <div className="empty">{lx("词表是空的。", "The word list is empty.")}</div>;
	if (!isReady || !plan || queue === null) return <div className="empty">{lx("正在准备今日任务…", "Preparing today's session…")}</div>;

	const extraAvail = countExtraCandidates(words, data.states, plan);
	const studied = Object.keys(data.states).length;
	const mastered = Object.values(data.states).filter((s) => s.s >= 4).length;
	const finished = queue.length === 0;

	return (
		<div className="fc-wrap vq-wrap">
			<div className="vq-head">
				<div className="vq-progress-row">
					<b>
						{lx("今日进度", "Today")} {doneCount}/{total}
					</b>
					{extraTotal > 0 ? (
						<span className="vq-comp">
							{lx("额外", "Extra")} +{extraDone}/{extraTotal}
						</span>
					) : null}
				</div>
				<div className="vq-batch-progress">
					<span className="vq-batch-label">
						{lx("到期复习", "Reviews")} {batch.reviewDone}/{batch.reviewTotal}
					</span>
					<div
						className="vq-bar vq-bar-batch"
						role="progressbar"
						aria-valuenow={batch.reviewDone}
						aria-valuemax={batch.reviewTotal}
					>
						<div
							className="vq-bar-fill"
							style={{ width: batch.reviewTotal ? `${Math.round((batch.reviewDone / batch.reviewTotal) * 100)}%` : "0%" }}
						/>
					</div>
				</div>
				<div className="vq-batch-progress">
					<span className="vq-batch-label">
						{lx("新词", "New words")} {batch.freshDone}/{batch.freshTotal}
					</span>
					<div
						className="vq-bar vq-bar-batch"
						role="progressbar"
						aria-valuenow={batch.freshDone}
						aria-valuemax={batch.freshTotal}
					>
						<div
							className="vq-bar-fill"
							style={{ width: batch.freshTotal ? `${Math.round((batch.freshDone / batch.freshTotal) * 100)}%` : "0%" }}
						/>
					</div>
				</div>
				{extraTotal > 0 ? (
					<div className="vq-extra-progress">
						<span>
							{lx("额外进度", "Extra")} +{extraDone}/{extraTotal}
						</span>
						<div className="vq-bar vq-bar-extra" role="progressbar" aria-valuenow={extraDone} aria-valuemax={extraTotal}>
							<div className="vq-bar-fill" style={{ width: `${Math.round((extraDone / extraTotal) * 100)}%` }} />
						</div>
					</div>
				) : null}
			</div>

			{retestWord ? (
				<>
					<div className="vq-retest-head">
						<b>{lx("重测", "Retest")}</b>
						<button
							type="button"
							className="vq-retest-cancel"
							onClick={() => {
								setFlipped(false);
								setRetestId(null);
							}}
						>
							{lx("取消", "Cancel")}
						</button>
					</div>
					<VocabFlipCard
						word={retestWord}
						flipped={flipped}
						onFlip={() => setFlipped((value) => !value)}
						onGrade={gradeRetest}
					/>
				</>
			) : finished ? (
				<div className="vq-done">
					<div className="vq-done-emoji">🎉</div>
					<h2>{lx("今日达标", "Done for today")}</h2>
					<p>
						{lx(`今天的 ${total} 个词已全部过完：到期复习 ${plan.review} 个、新词 ${plan.fresh} 个。`, `All ${total} words finished: ${plan.review} reviews and ${plan.fresh} new words.`)}
						{extraTotal > 0
							? lx(` 额外批次已完成 +${extraDone} 个。`, ` Extra batches done: +${extraDone}.`)
							: ""}
					</p>
					{extraAvail.total > 0 ? (
						<div className="vq-done-actions">
							<button type="button" className="vq-home-btn" onClick={onAddExtra}>
								{lx(`再来 ${Math.min(EXTRA_BATCH_SIZE, extraAvail.total)}`, `${Math.min(EXTRA_BATCH_SIZE, extraAvail.total)} more`)}
							</button>
							<button type="button" className="vq-home-btn ghost" onClick={() => navTo("#/")}>
								{lx("回到首页", "Back to home")}
							</button>
						</div>
					) : (
						<>
							{extraTotal > 0 ? (
								<p className="vq-extra-none">{lx("没有更多词了——新词都已排完。", "No more words — every new word is scheduled.")}</p>
							) : null}
							<button type="button" className="vq-home-btn" onClick={() => navTo("#/")}>
								{lx("回到首页", "Back to home")}
							</button>
						</>
					)}
				</div>
			) : current ? (
				<VocabFlipCard
					word={current}
					flipped={flipped}
					onFlip={() => setFlipped((value) => !value)}
					onGrade={grade}
				/>
			) : (
				<div className="empty">
					<p>{lx("这张卡已不在词表里。", "This card is no longer in the word list.")}</p>
					<button type="button" className="vq-home-btn" onClick={() => setQueue(queue.slice(1))}>
						{lx("跳过", "Skip")}
					</button>
				</div>
			)}

			{history.length ? (
				<div className="vq-prev-row">
					<button type="button" className="vq-prev-btn" onClick={goPrev}>
						← {lx("上一个", "Previous")}
					</button>
				</div>
			) : null}

			{doneCount + extraDone > 0 ? (
				<div className="vq-passed">
					<button type="button" className="vq-passed-toggle" onClick={() => setShowPassed((value) => !value)}>
						{lx(`今天已过 ${doneCount + extraDone} 词`, `${doneCount + extraDone} graded today`)}
						<span>{showPassed ? "▾" : "▸"}</span>
					</button>
					{showPassed ? (
						<div className="vq-passed-list">
							{[...plan.done, ...(plan.extra?.done ?? [])].map((id) => {
								const word = byId.get(id);
								if (!word) return null;
								const g = plan.grades?.[id];
								const isExtra = plan.extra?.done.includes(id) ?? false;
								return (
									<button
										key={id}
										type="button"
										className="vq-passed-row"
										onClick={() => {
											setFlipped(false);
											setRetestId(id);
										}}
									>
										<span className="vq-passed-word">{word.w}</span>
										{isExtra ? <span className="vq-extra-tag">{lx("额外", "Extra")}</span> : null}
										{g ? <span className={`vq-grade-chip vq-grade-${g}`}>{lx(...GRADE_LABEL[g])}</span> : null}
										<span className="vq-passed-retest">{lx("重测", "Retest")}</span>
									</button>
								);
							})}
						</div>
					) : null}
				</div>
			) : null}

			<div className="vq-overview">
				<h3>{lx("队列总览", "Queue overview")}</h3>
				<p>
					{lx(`全队列 ${words.length} 词 · 已学 ${studied} · 熟练（阶梯 4+）${mastered}`, `${words.length} words in queue · ${studied} studied · ${mastered} mastered (step 4+)`)}
				</p>
				<div className="vq-sources">
					{srcProgress(words, data.states).map(({ label, total, studied, mastered }) => (
						<div key={label} className="vq-src-row">
							<div className="vq-src-line">
								<span className="vq-src-label">{label}</span>
								<span className="vq-src-nums">
									{lx(`已学 ${studied} / 共 ${total}`, `Studied ${studied} / ${total}`)}
									{mastered > 0 ? lx(` · 熟练 ${mastered}`, ` · mastered ${mastered}`) : ""}
								</span>
							</div>
							<div className="vq-bar vq-src-bar" role="progressbar" aria-valuenow={studied} aria-valuemax={total}>
								<div className="vq-bar-fill" style={{ width: `${total ? Math.round((studied / total) * 100) : 0}%` }} />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
