import { useMemo, useState } from "react";

import { SayButton } from "../routes/study-common";
import { CARDS, CATS, CREDITS, FEAT, KINDS, PHRASES, cafeImage, type CafeCard, type Cat, type Kind, type Seg } from "./cafe-menu-board-data";

/** 照日语 bot 的 canvas「咖啡店菜单单词看板」做的专用页面，挂在 #/topics/cafe-menu 的「菜单看板」视图。 */

const KIND_NOTE: Record<Kind, string> = {
	外来语: "从外语借来，意思基本没变",
	"外来语（意思有变化）": "从外语借来，但在日本的意思或用法跟原词不一样",
	和制英语: "日本人用英语单词自己组合的说法，英语国家一般不这么说",
	日语固有词: "日语本来就有的词，包括音读汉字词",
	混合: "日语固有词和外来语拼在一起",
};

const KIND_CLASS: Record<Kind, string> = {
	外来语: "loan",
	"外来语（意思有变化）": "shifted",
	和制英语: "wasei",
	日语固有词: "native",
	混合: "mixed",
};

const plain = (segs: Seg[]) => segs.map((s) => s[0]).join("");

function Ruby({ segs }: { segs: Seg[] }) {
	return (
		<>
			{segs.map(([text, reading], i) =>
				reading ? (
					<ruby key={i}>
						{text}
						<rt>{reading}</rt>
					</ruby>
				) : (
					<span key={i}>{text}</span>
				),
			)}
		</>
	);
}

function KindTag({ kind }: { kind: Kind }) {
	return <span className={`cm-kind cm-kind--${KIND_CLASS[kind]}`}>{kind}</span>;
}

type CatFilter = "全部" | Cat;
type KindFilter = "全部" | Kind;

export function CafeMenuBoard() {
	const [cat, setCat] = useState<CatFilter>("全部");
	const [kind, setKind] = useState<KindFilter>("全部");
	const [quiz, setQuiz] = useState(false);
	const [hideRuby, setHideRuby] = useState(false);
	const [revealed, setRevealed] = useState<Set<string>>(() => new Set());

	const inCat = useMemo(() => CARDS.filter((c) => cat === "全部" || c.cat === cat), [cat]);
	const kindOptions = KINDS.filter((k) => inCat.some((c) => c.kind === k));
	const activeKind: KindFilter = kind !== "全部" && !kindOptions.includes(kind) ? "全部" : kind;
	const shown = inCat.filter((c) => activeKind === "全部" || c.kind === activeKind);
	const sections = CATS.map((c) => ({ cat: c, cards: shown.filter((card) => card.cat === c) })).filter((s) => s.cards.length);

	const toggle = (id: string) =>
		setRevealed((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});

	return (
		<div className={`cm-board${hideRuby ? " cm-noruby" : ""}`} data-testid="cafe-menu-board">
			<section className="cm-panel cm-filters" aria-label="筛选">
				<div className="cm-filter-row">
					<span className="cm-filter-label">分类</span>
					<div className="fc-filter cm-cats">
						{(["全部", ...CATS] as CatFilter[]).map((c) => (
							<button key={c} type="button" className={cat === c ? "on" : ""} data-cat={c} onClick={() => setCat(c)}>
								{c} <span className="n">{c === "全部" ? CARDS.length : CARDS.filter((card) => card.cat === c).length}</span>
							</button>
						))}
					</div>
				</div>
				<div className="cm-filter-row">
					<span className="cm-filter-label">词源类型</span>
					<div className="fc-filter cm-kinds">
						{(["全部", ...kindOptions] as KindFilter[]).map((k) => (
							<button key={k} type="button" className={activeKind === k ? "on" : ""} data-kind={k} onClick={() => setKind(k)}>
								{k} <span className="n">{k === "全部" ? inCat.length : inCat.filter((c) => c.kind === k).length}</span>
							</button>
						))}
					</div>
				</div>
				<div className="cm-filter-row cm-toggles">
					<label className="cm-switch">
						<input type="checkbox" checked={quiz} onChange={(e) => setQuiz(e.target.checked)} data-testid="cafe-quiz" />
						盖住意思（自测）
					</label>
					<label className="cm-switch">
						<input type="checkbox" checked={hideRuby} onChange={(e) => setHideRuby(e.target.checked)} />
						隐藏读音
					</label>
					{quiz ? (
						<button type="button" className="cm-reset" onClick={() => setRevealed(new Set())}>
							全部盖回去
						</button>
					) : null}
				</div>
				{quiz ? <p className="cm-hint">点一下卡片就能看意思和特点。</p> : null}
			</section>

			{sections.length ? (
				sections.map((s) => (
					<section key={s.cat} className="cm-section" data-section={s.cat}>
						<h3 className="cm-h">
							{s.cat}（{s.cards.length}）
						</h3>
						<ul className="cm-grid">
							{s.cards.map((card) => (
								<CafeCardView key={card.id} card={card} hidden={quiz && !revealed.has(card.id)} quiz={quiz} onToggle={() => toggle(card.id)} />
							))}
						</ul>
					</section>
				))
			) : (
				<div className="empty">这个分类里没有这种词源的词</div>
			)}

			<section className="cm-panel" data-testid="cafe-phrases">
				<h3 className="cm-h">点单会话</h3>
				<div className="cm-table-wrap">
					<table className="cm-table">
						<thead>
							<tr>
								<th>什么时候用</th>
								<th>日语</th>
								<th>意思</th>
							</tr>
						</thead>
						<tbody>
							{PHRASES.map((p) => (
								<tr key={p.when}>
									<td className="cm-when">{p.when}</td>
									<td className="jp cm-phrase">
										<Ruby segs={p.jp} /> <SayButton text={sayable(plain(p.jp))} />
									</td>
									<td>{p.zh}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			<section className="cm-panel">
				<h3 className="cm-h">词源标签说明</h3>
				<ul className="cm-legend">
					{KINDS.map((k) => (
						<li key={k}>
							<KindTag kind={k} />
							<span>{KIND_NOTE[k]}</span>
						</li>
					))}
				</ul>
			</section>

			<details className="cm-panel cm-credits">
				<summary>图片来源</summary>
				<p className="cm-hint">照片均来自 Wikimedia Commons，可自由使用；没有合适照片的词用表情符号代替。</p>
				<div className="cm-table-wrap">
					<table className="cm-table">
						<thead>
							<tr>
								<th>词</th>
								<th>作者</th>
								<th>许可</th>
								<th>来源</th>
							</tr>
						</thead>
						<tbody>
							{CREDITS.map(([word, author, license, url]) => (
								<tr key={word}>
									<td className="jp">{word}</td>
									<td>{author}</td>
									<td>{license}</td>
									<td>
										<a href={url} target="_blank" rel="noopener noreferrer">
											Commons
										</a>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</details>
		</div>
	);
}

/** 会话句里的「店員：「…」→ 你：「…」」只把日语部分读出来。 */
function sayable(text: string) {
	return text
		.replace(/店員：|→ 你：/g, " ")
		.replace(/[「」]/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

function CafeCardView({ card, hidden, quiz, onToggle }: { card: CafeCard; hidden: boolean; quiz: boolean; onToggle: () => void }) {
	const clickable = quiz
		? {
				role: "button" as const,
				tabIndex: 0,
				"aria-expanded": !hidden,
				onClick: onToggle,
				onKeyDown: (e: React.KeyboardEvent) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						onToggle();
					}
				},
			}
		: {};
	return (
		<li className={`cm-card${quiz ? " cm-card--quiz" : ""}`} data-card={card.id} {...clickable}>
			<div className="cm-jp jp">
				<Ruby segs={card.jp} /> <SayButton text={plain(card.jp)} />
			</div>
			{hidden ? (
				<div className="cm-cover">点一下看意思和特点</div>
			) : (
				<>
					<div className="cm-zh">{card.zh}</div>
					<div className="cm-origin">
						<span>
							<b>原词：</b>
							{card.origin}
						</span>
						<KindTag kind={card.kind} />
					</div>
					<div className="cm-feat">
						<b>特点：</b>
						{FEAT[card.id]}
					</div>
				</>
			)}
			<div className="cm-media">
				{card.img ? (
					<img src={cafeImage(card.img)} alt={card.alt} loading="lazy" decoding="async" width={500} height={375} />
				) : (
					<span className="cm-emoji" role="img" aria-label={card.alt}>
						{card.emoji}
					</span>
				)}
			</div>
		</li>
	);
}
