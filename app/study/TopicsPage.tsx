import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

import { RubyHtml, SayButton } from "../routes/study-common";
import { dueEntry, getDueVersion, rememberFail, rememberKnown, subscribeDue, type DueDraft } from "./due-review";
import { jstToday } from "./lesson-review";
import { LANG, lx, navTo } from "./store";
import { isTopicFile, isTopicIndex, topicDueId, type TopicCard, type TopicFile, type TopicIndex } from "./topic-vocab";

type Status = "new" | "unknown" | "learning";
type OnlyFilter = "all" | "unknown" | "due";
type View = "list" | "cards";

const cache = new Map<string, Promise<unknown>>();

function loadJson(url: string): Promise<unknown> {
	let p = cache.get(url);
	if (!p) {
		p = fetch(url).then((r) => {
			if (!r.ok) throw new Error(`${url} ${r.status}`);
			return r.json();
		});
		p.catch(() => cache.delete(url));
		cache.set(url, p);
	}
	return p;
}

function useDueTick() {
	return useSyncExternalStore(subscribeDue, getDueVersion, () => 0);
}

/** 不会 = 最近一次标的是「不会」（复习队列 step 0）；学习中 = 之后答对过，正在间隔复习。 */
export function topicCardStatus(slug: string, cardId: string): { status: Status; due: boolean } {
	const entry = dueEntry(topicDueId(slug, cardId));
	if (!entry || entry.deleted) return { status: "new", due: false };
	return { status: entry.step === 0 ? "unknown" : "learning", due: entry.due <= jstToday() };
}

export function gradeTopicCard(topic: Pick<TopicFile, "slug">, card: TopicCard, pass: boolean) {
	const draft: DueDraft = {
		id: topicDueId(topic.slug, card.id),
		kind: "topic",
		jp: card.jp,
		reading: card.kana,
		cn: [card.zh, card.example_jp, card.example_zh].join("\n"),
		en: card.en || "",
	};
	if (pass) rememberKnown(draft);
	else rememberFail(draft);
}

export function TopicsPage({ slug }: { slug: string | null }) {
	return slug ? <TopicDetail slug={slug} /> : <TopicList />;
}

function TopicList() {
	useDueTick();
	const [index, setIndex] = useState<TopicIndex | null>(null);
	const [error, setError] = useState(false);
	useEffect(() => {
		let off = false;
		loadJson("/data/topics/index.json")
			.then((data) => {
				if (off) return;
				if (isTopicIndex(data)) setIndex(data);
				else setError(true);
			})
			.catch(() => !off && setError(true));
		return () => {
			off = true;
		};
	}, []);
	if (error) return <div className="empty">{lx("专题目录加载失败，请稍后重试。", "Topic list failed to load. Please try again.")}</div>;
	if (!index) return <div className="empty">{lx("专题加载中…", "Loading topics…")}</div>;
	return (
		<div className="review-wrap topic-wrap">
			<p className="review-lead">
				{lx(
					"按领域背单词和常用表达。标「不会」的词明天出现在专题里的「今天要复习」筛选；标「会了」的词之后按 3、7、14、30 天的间隔再确认。",
					"Study words and phrases by field. Cards marked “Don't know” come back tomorrow under the topic’s Due today filter; cards marked “Got it” return after 3, 7, 14, and 30 days.",
				)}
			</p>
			<div className="review-list">
				{index.topics.map((t) => (
					<button key={t.slug} type="button" className="review-day topic-card" data-topic={t.slug} onClick={() => navTo(`#/topics/${t.slug}`)}>
						<span className="d">
							{lx(`${t.count} 个词`, `${t.count} cards`)}
						</span>
						<span className="t">{lx(t.title_zh, t.title_en || t.title_zh)}</span>
						<span className="tc jp">{t.title_ja}</span>
						{t.subtopics?.length ? (
							<span className="review-day__stats">
								{t.subtopics.slice(0, 4).map((s) => (
									<span key={s} className="review-day__chip">
										{s}
									</span>
								))}
								{t.subtopics.length > 4 ? <span className="review-day__chip">+{t.subtopics.length - 4}</span> : null}
							</span>
						) : null}
					</button>
				))}
			</div>
		</div>
	);
}

function shuffle<T>(list: T[]): T[] {
	const out = [...list];
	for (let i = out.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[out[i], out[j]] = [out[j], out[i]];
	}
	return out;
}

function TopicDetail({ slug }: { slug: string }) {
	useDueTick();
	const [topic, setTopic] = useState<TopicFile | null>(null);
	const [error, setError] = useState(false);
	const [sub, setSub] = useState("all");
	const [only, setOnly] = useState<OnlyFilter>("all");
	const [view, setView] = useState<View>("list");
	const [deckIds, setDeckIds] = useState<string[]>([]);
	const [idx, setIdx] = useState(0);
	const [flipped, setFlipped] = useState(false);

	useEffect(() => {
		let off = false;
		setTopic(null);
		setError(false);
		loadJson(`/data/topics/${slug}.json`)
			.then((data) => {
				if (off) return;
				if (isTopicFile(data, slug)) setTopic(data);
				else setError(true);
			})
			.catch(() => !off && setError(true));
		return () => {
			off = true;
		};
	}, [slug]);

	const subLabel = useMemo(() => new Map((topic?.subtopics || []).map((s) => [s.zh, lx(s.zh, s.en || s.zh)])), [topic]);
	const status = (card: TopicCard) => topicCardStatus(slug, card.id);
	const filtered = (topic?.cards || []).filter((card) => {
		if (sub !== "all" && card.subtopic !== sub) return false;
		if (only === "unknown") return status(card).status === "unknown";
		if (only === "due") return status(card).due;
		return true;
	});
	const counts = (topic?.cards || []).reduce(
		(acc, card) => {
			const st = status(card);
			if (st.status === "unknown") acc.unknown++;
			if (st.due) acc.due++;
			return acc;
		},
		{ unknown: 0, due: 0 },
	);

	// 闪卡的牌组在切换筛选或进入闪卡时固定下来，标了「会了」也不会让当前这张从手里消失。
	const filterKey = `${slug}|${sub}|${only}|${view}|${topic ? 1 : 0}`;
	useEffect(() => {
		setDeckIds(filtered.map((c) => c.id));
		setIdx(0);
		setFlipped(false);
	}, [filterKey]);

	if (error)
		return (
			<div className="empty">
				{lx("这个专题加载失败或不存在。", "This topic failed to load or does not exist.")}
				<div style={{ marginTop: 12 }}>
					<button type="button" className="crumb-home" onClick={() => navTo("#/topics")}>
						{lx("返回专题列表", "Back to topics")}
					</button>
				</div>
			</div>
		);
	if (!topic) return <div className="empty">{lx("专题加载中…", "Loading topic…")}</div>;

	const byId = new Map(topic.cards.map((c) => [c.id, c]));
	const deck = deckIds.map((id) => byId.get(id)).filter((c): c is TopicCard => Boolean(c));
	const cur = deck[idx];

	const grade = (card: TopicCard, pass: boolean, advance: boolean) => {
		gradeTopicCard(topic, card, pass);
		if (advance) {
			setIdx((n) => n + 1);
			setFlipped(false);
		}
	};

	const chip = (card: TopicCard) => {
		const st = status(card);
		if (st.status === "unknown") return <span className="topic-st unknown">{lx("不会", "Don't know")}</span>;
		if (st.due) return <span className="topic-st due">{lx("今天复习", "Due")}</span>;
		if (st.status === "learning") return <span className="topic-st learning">{lx("复习中", "Learning")}</span>;
		return null;
	};

	return (
		<div className="topic-wrap">
			<div className="topic-head">
				<div className="topic-title">
					<b>{lx(topic.title_zh, topic.title_en || topic.title_zh)}</b>
					<span className="jp">{topic.title_ja}</span>
				</div>
				{topic.description_zh ? <p className="review-lead">{lx(topic.description_zh, topic.description_en || topic.description_zh)}</p> : null}
				<div className="topic-stats">
					<span>{lx(`共 ${topic.cards.length} 个`, `${topic.cards.length} cards`)}</span>
					<span>{lx(`不会 ${counts.unknown}`, `Don't know ${counts.unknown}`)}</span>
					<span>{lx(`今天复习 ${counts.due}`, `Due today ${counts.due}`)}</span>
				</div>
			</div>
			<div className="fc-filter topic-views" role="tablist">
				<button type="button" role="tab" aria-selected={view === "list"} className={view === "list" ? "on" : ""} onClick={() => setView("list")}>
					📋 {lx("单词表", "Word list")}
				</button>
				<button type="button" role="tab" aria-selected={view === "cards"} className={view === "cards" ? "on" : ""} onClick={() => setView("cards")}>
					🗂️ {lx("闪卡自测", "Flashcards")}
				</button>
			</div>
			<div className="fc-filter topic-subs" aria-label={lx("按主题筛选", "Filter by subtopic")}>
				<button type="button" className={sub === "all" ? "on" : ""} onClick={() => setSub("all")}>
					{lx("全部", "All")} <span className="n">{topic.cards.length}</span>
				</button>
				{topic.subtopics.map((s) => (
					<button key={s.zh} type="button" className={sub === s.zh ? "on" : ""} data-subtopic={s.zh} onClick={() => setSub(s.zh)}>
						{subLabel.get(s.zh)} <span className="n">{topic.cards.filter((c) => c.subtopic === s.zh).length}</span>
					</button>
				))}
			</div>
			<div className="fc-filter topic-only">
				<button type="button" className={only === "all" ? "on" : ""} onClick={() => setOnly("all")}>
					{lx("全部", "All")}
				</button>
				<button type="button" className={only === "unknown" ? "on" : ""} data-only="unknown" onClick={() => setOnly("unknown")}>
					{lx("只看不会的", "Only “don't know”")} {counts.unknown ? <span className="n">{counts.unknown}</span> : null}
				</button>
				<button type="button" className={only === "due" ? "on" : ""} onClick={() => setOnly("due")}>
					{lx("今天要复习", "Due today")} {counts.due ? <span className="n">{counts.due}</span> : null}
				</button>
			</div>

			{view === "list" ? (
				filtered.length ? (
					<ul className="topic-list">
						{filtered.map((card) => {
							const st = status(card);
							return (
								<li key={card.id} className="topic-item" data-card={card.id}>
									<div className="topic-item__top">
										<span className="topic-item__jp jp">{card.jp}</span>
										<span className="topic-item__kana jp">{card.kana}</span>
										<SayButton text={card.jp} />
										{chip(card)}
									</div>
									<div className="topic-item__zh">{LANG === "en" && card.en ? card.en : card.zh}</div>
									<div className="topic-item__ex">
										{card.scene ? <div className="topic-item__scene">🎬 {card.scene}</div> : null}
										<div className="jp">
											{card.example_ruby ? <RubyHtml html={card.example_ruby} /> : card.example_jp} <SayButton text={card.example_jp} />
										</div>
										{card.example_kana ? <div className="review-reading jp">{card.example_kana}</div> : null}
										<div className="cn">{card.example_zh}</div>
									</div>
									{card.note ? <div className="topic-item__note">💡 {card.note}</div> : null}
									<div className="topic-item__foot">
										<span className="topic-item__chips">
											<span className="review-day__chip">{subLabel.get(card.subtopic)}</span>
											{card.level ? <span className="review-day__chip">{card.level}</span> : null}
										</span>
										<span className="topic-item__grade">
											<button type="button" className={st.status === "unknown" ? "on" : ""} onClick={() => grade(card, false, false)}>
												{lx("不会", "Don't know")}
											</button>
											<button type="button" className={st.status === "learning" && !st.due ? "on known" : ""} onClick={() => grade(card, true, false)}>
												{lx("会了", "Got it")}
											</button>
										</span>
									</div>
								</li>
							);
						})}
					</ul>
				) : (
					<div className="empty">{emptyText(only)}</div>
				)
			) : (
				<div className="fc-wrap">
					<div className="fc-prog">{deck.length ? `${Math.min(idx + 1, deck.length)} / ${deck.length}` : ""}</div>
					{!deck.length ? (
						<div className="fcard">
							<div className="empty">{emptyText(only)}</div>
						</div>
					) : !cur ? (
						<div className="fcard">
							<div className="empty">
								{lx("这一组做完了 🎉", "Deck complete 🎉")}
								<br />
								{lx("点「重新洗牌」再来一轮，或切到「只看不会的」。", "Shuffle for another round, or switch to “don't know” only.")}
							</div>
						</div>
					) : !flipped ? (
						<div className="fcard" data-fcflip="1" onClick={() => setFlipped(true)}>
							<div className="review-k">{subLabel.get(cur.subtopic)}</div>
							<div className="big jp" style={cur.jp.length > 10 ? { fontSize: 22 } : undefined}>
								{cur.jp}
							</div>
							{chip(cur)}
							<div className="hint">{lx("先回想读音和意思，点击翻面", "Recall the reading and meaning, then tap to flip")}</div>
						</div>
					) : (
						<div className="fcard" data-fcflip="1" onClick={() => setFlipped(false)}>
							<div className="backside review-flip" style={{ textAlign: "center" }}>
								<div className="review-k">{subLabel.get(cur.subtopic)}</div>
								<div className="jp" style={{ fontWeight: 700, fontSize: "22px" }}>
									{cur.jp} <SayButton text={cur.jp} />
								</div>
								<div className="review-reading jp">{cur.kana}</div>
								<div style={{ fontSize: "18px", marginTop: "10px" }}>{cur.zh}</div>
								{cur.en ? <div className="meta" style={{ fontSize: "14px" }}>{cur.en}</div> : null}
								<div className="ex fcard-ex">
									<div className="fcard-ex-label">{lx("例句", "Example")}</div>
									{cur.scene ? <div className="topic-item__scene">🎬 {cur.scene}</div> : null}
									<div className="jp">
										{cur.example_ruby ? <RubyHtml html={cur.example_ruby} /> : cur.example_jp} <SayButton text={cur.example_jp} />
									</div>
									{cur.example_kana ? <div className="review-reading jp">{cur.example_kana}</div> : null}
									<div className="cn">{cur.example_zh}</div>
								</div>
								{cur.note ? <div className="topic-item__note">💡 {cur.note}</div> : null}
							</div>
						</div>
					)}
					{cur ? (
						<div className="review-skill">
							<button type="button" data-grade="fail" onClick={() => grade(cur, false, true)}>
								{lx("不会", "Don't know")}
							</button>
							<button type="button" data-grade="pass" onClick={() => grade(cur, true, true)}>
								{lx("会了", "Got it")}
							</button>
						</div>
					) : null}
					<div className="fc-btns">
						<button
							type="button"
							onClick={() => {
								setIdx((n) => Math.max(0, n - 1));
								setFlipped(false);
							}}
						>
							‹ {lx("上一张", "Prev")}
						</button>
						<button
							type="button"
							className="primary"
							onClick={() => {
								setIdx((n) => Math.min(n + 1, deck.length));
								setFlipped(false);
							}}
						>
							{lx("下一张", "Next")} ›
						</button>
						<button
							type="button"
							onClick={() => {
								setDeckIds(shuffle(filtered.map((c) => c.id)));
								setIdx(0);
								setFlipped(false);
							}}
						>
							{lx("重新洗牌", "Shuffle")}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

function emptyText(only: OnlyFilter) {
	if (only === "unknown") return lx("没有标成「不会」的词 🎉", "No cards marked “don't know” 🎉");
	if (only === "due") return lx("今天没有要复习的词", "Nothing due today");
	return lx("这个主题还没有词", "No cards in this subtopic yet");
}
