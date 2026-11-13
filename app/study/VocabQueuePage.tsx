import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

import { StudyFlip } from "./study-flip";
import { RubyHtml } from "../routes/study-common";
import type { SwipeGrade } from "./swipe-grade";
import { lx, navTo } from "./store";
import { jstToday } from "./lesson-review";
import {
	addExtraBatch,
	applyVocabGrade,
	countExtraCandidates,
	deferredDueCount,
	ensureVocabWords,
	EXTRA_BATCH_SIZE,
	getVocabQueueVersion,
	shouldReshowToday,
	subscribeVocabQueue,
	todayPlan,
	vocabQueueData,
	vocabQueueReady,
	vocabWordsCache,
	type VocabBreakdown,
	type VocabGrade,
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
								<div>{word.ex}</div>
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

function srcCounts(words: VocabWord[]): [string, number][] {
	const counts = new Map<string, number>();
	for (const word of words) {
		for (const label of word.src.split("・")) counts.set(label, (counts.get(label) ?? 0) + 1);
	}
	return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

export function VocabQueuePage() {
	useVocabTick();
	const [loaded, setLoaded] = useState(false);
	const [queue, setQueue] = useState<string[] | null>(null);
	const [flipped, setFlipped] = useState(false);
	const [retestId, setRetestId] = useState<string | null>(null);
	const [showPassed, setShowPassed] = useState(false);
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

	// Build (or reuse) today's plan once the word list is available AND the
	// initial server pull has settled — the server-side plan (progress, order,
	// re-show state) is restored as-is; only then may a fresh plan be minted.
	useEffect(() => {
		if (words && words.length && isReady) todayPlan(words, today);
	}, [words, today, isReady]);

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
	const extraDone = plan?.extra?.done.length ?? 0;
	const extraTotal = plan?.extra?.ids.length ?? 0;

	const onAddExtra = () => {
		if (!words) return;
		const added = addExtraBatch(words, today);
		if (added.length) setQueue((q) => [...(q ?? []), ...added]);
	};

	const grade = (vocabGrade: VocabGrade) => {
		if (!queue || !queue.length) return;
		const id = queue[0];
		setFlipped(false);
		if (shouldReshowToday(vocabGrade, reshownRef.current.has(id))) {
			// First "again"/"fuzzy" today: grade now (not done yet) and show the
			// card once more at the end of the session; the re-show grade counts.
			reshownRef.current.add(id);
			applyVocabGrade(id, vocabGrade, false, today);
			setQueue([...queue.slice(1), id]);
			return;
		}
		applyVocabGrade(id, vocabGrade, true, today);
		setQueue(queue.slice(1));
	};

	const retestWord = retestId ? byId.get(retestId) : undefined;
	const gradeRetest = (vocabGrade: VocabGrade) => {
		if (!retestId) return;
		setFlipped(false);
		// Retest overwrites today's grade/state; the word is already in done,
		// so the 今日 n/50 count does not change.
		applyVocabGrade(retestId, vocabGrade, true, today);
		setRetestId(null);
	};

	if (!loaded || !words) return <div className="empty">{lx("词表加载中…", "Loading word list…")}</div>;
	if (!words.length) return <div className="empty">{lx("词表是空的。", "The word list is empty.")}</div>;
	if (!isReady || !plan || queue === null) return <div className="empty">{lx("正在准备今日任务…", "Preparing today's session…")}</div>;

	const overdueExtra = deferredDueCount(words, data.states, plan, today);
	const extraAvail = countExtraCandidates(words, data.states, plan, today);
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
					<span className="vq-comp">
						{lx("到期复习", "Reviews")} {plan.review} · {lx("新词", "New")} {plan.fresh}
						{overdueExtra > 0 ? ` · ${lx("另有", "+")} ${overdueExtra} ${lx("个到期词顺延", "due words deferred")}` : ""}
						{extraTotal > 0 ? ` · ${lx("额外", "Extra")} +${extraDone}` : ""}
					</span>
				</div>
				<div className="vq-bar" role="progressbar" aria-valuenow={doneCount} aria-valuemax={total}>
					<div className="vq-bar-fill" style={{ width: total ? `${Math.round((doneCount / total) * 100)}%` : "0%" }} />
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
								<p className="vq-extra-none">{lx("没有更多词了——到期的和新词都已排完。", "No more words — every due and new word is scheduled.")}</p>
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
					{srcCounts(words).map(([label, n]) => (
						<span key={label} className="vq-src-count">
							{label} {n}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
