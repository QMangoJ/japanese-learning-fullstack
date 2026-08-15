import { Fragment, useEffect, useMemo, useRef, useState } from "react";

import {
	dayOutline,
	findDay,
	readingDays,
	weekOutline,
	type Block,
	type Choice,
	type Footnote,
	type Question,
	type ReadingDay,
	type TableCell,
} from "../data/reading-n3";
import { addMistake, isFav, navTo, registerFavMeta, toggleFav } from "../study/store";
import "./reading-n3-book.css";

/* ------------------------------------------------------------------ *
 * Furigana
 * ------------------------------------------------------------------ */

const RUBY = /\{([^{}|]+)\|([^{}|]+)\}/g;

/** Renders `{漢字|かんじ}` as <ruby>漢字<rt>かんじ</rt></ruby>. */
function Jp({ text }: { text: string }) {
	const parts = useMemo(() => {
		const out: (string | { base: string; reading: string })[] = [];
		let cursor = 0;
		for (const match of text.matchAll(RUBY)) {
			if (match.index! > cursor) out.push(text.slice(cursor, match.index));
			out.push({ base: match[1], reading: match[2] });
			cursor = match.index! + match[0].length;
		}
		if (cursor < text.length) out.push(text.slice(cursor));
		return out;
	}, [text]);

	return (
		<>
			{parts.map((part, index) =>
				typeof part === "string" ? (
					<Fragment key={index}>{part}</Fragment>
				) : (
					<ruby key={index}>
						{part.base}
						<rt>{part.reading}</rt>
					</ruby>
				),
			)}
		</>
	);
}

/** Strips the furigana markup, for plain-text contexts such as aria labels. */
function plain(text: string) {
	return text.replace(RUBY, "$1");
}

/* ------------------------------------------------------------------ *
 * Shared bits
 * ------------------------------------------------------------------ */

function Cn({ text, block = false, show }: { text?: string; block?: boolean; show: boolean }) {
	if (!show || !text) return null;
	return <span className={block ? "rb-cn rb-cn--block" : "rb-cn"}>{text}</span>;
}

function Footnotes({ notes }: { notes?: Footnote[] }) {
	if (!notes?.length) return null;
	return (
		<div className="rb-footnotes">
			{notes.map((note) => (
				<div key={note.marker}>
					<b>
						（{note.marker}）{note.term}
					</b>
					：<Jp text={note.jp} />　<span style={{ opacity: 0.85 }}>{note.cn}</span>
				</div>
			))}
		</div>
	);
}

function MaterialTable({ rows, showCn }: { rows: TableCell[][]; showCn: boolean }) {
	return (
		<div className="rb-scroll">
			<table className="rb-table">
				<tbody>
					{rows.map((row, rowIndex) => (
						<tr key={rowIndex}>
							{row.map((cell, cellIndex) => (
								<td
									key={cellIndex}
									className={cell.header ? "is-header" : undefined}
									rowSpan={cell.rowSpan}
									colSpan={cell.colSpan}
									style={{ textAlign: cell.align ?? "left" }}
								>
									<Jp text={cell.jp} />
									<Cn text={cell.cn} show={showCn} />
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

function Blocks({ blocks, showCn }: { blocks: Block[]; showCn: boolean }) {
	return (
		<>
			{blocks.map((block, index) => {
				switch (block.type) {
					case "title":
						return (
							<div className="rb-b-title" key={index}>
								<b>
									<Jp text={block.jp} />
								</b>
								{block.sub && (
									<em>
										<Jp text={block.sub.jp} />
									</em>
								)}
								<Cn text={block.cn} show={showCn} />
								{block.sub && <Cn text={block.sub.cn} show={showCn} />}
							</div>
						);
					case "heading":
						return (
							<h4 className="rb-b-heading" key={index}>
								<Jp text={block.jp} />
								<Cn text={block.cn} show={showCn} />
							</h4>
						);
					case "paragraph":
						return (
							<p className={block.indent ? "rb-b-para rb-b-para--indent" : "rb-b-para"} key={index}>
								<Jp text={block.jp} />
								<Cn text={block.cn} show={showCn} block />
							</p>
						);
					case "line":
						return (
							<p className="rb-b-line" style={{ textAlign: block.align ?? "left" }} key={index}>
								<Jp text={block.jp} />
								<Cn text={block.cn} show={showCn} />
							</p>
						);
					case "speech":
						return (
							<p className="rb-b-speech" key={index}>
								<span className="rb-b-speech__who">
									<Jp text={block.speaker} />
								</span>
								<span>
									<Jp text={block.jp} />
									<Cn text={`${block.speakerCn}：${block.cn}`} show={showCn} />
								</span>
							</p>
						);
					case "list":
						return (
							<ul className="rb-b-list" key={index}>
								{block.items.map((item, itemIndex) => (
									<li key={itemIndex}>
										<span>{block.ordered ? `${itemIndex + 1}.` : (block.marker ?? "・")}</span>
										<span>
											<Jp text={item.jp} />
											<Cn text={item.cn} show={showCn} />
										</span>
									</li>
								))}
							</ul>
						);
					case "table":
						return <MaterialTable rows={block.rows} showCn={showCn} key={index} />;
					case "note":
						return (
							<p className="rb-b-note" key={index}>
								<Jp text={block.jp} />
								<Cn text={block.cn} show={showCn} />
							</p>
						);
					case "source":
						return (
							<p className="rb-b-source" key={index}>
								<Jp text={block.jp} />
								<Cn text={block.cn} show={showCn} />
							</p>
						);
					case "figure":
						return (
							<figure className="rb-figure" key={index}>
								{block.svg ? (
									<div dangerouslySetInnerHTML={{ __html: block.svg }} />
								) : null}
								<figcaption>{showCn ? block.cn : block.alt}</figcaption>
							</figure>
						);
					default:
						return null;
				}
			})}
		</>
	);
}

/* ------------------------------------------------------------------ *
 * Questions
 * ------------------------------------------------------------------ */

function QuestionCard({
	question,
	id,
	showCn,
	answerSource,
	week,
	day,
}: {
	question: Question;
	id: string;
	showCn: boolean;
	answerSource: ReadingDay["answerSource"];
	week: number;
	day: number;
}) {
	const [picked, setPicked] = useState<number | null>(null);
	const [revealed, setRevealed] = useState(false);
	const settled = revealed || picked !== null;
	const favId = `reading#${week}-${day}#${id}`;
	registerFavMeta(favId, {
		module: "reading",
		hash: `#/day/${week}-${day}`,
		w: week,
		d: day,
		jp: `${question.label} ${question.jp}`,
		cn: question.cn,
		kind: "exam-question",
	});

	return (
		<article className="rb-q">
			<div className="rb-q__head">
				<span className="rb-q__label">{question.label}</span>
				<span>
					<Jp text={question.jp} />
				</span>
			</div>
			<Cn text={question.cn} show={showCn} block />

			<ul className="rb-choices">
				{question.choices.map((choice, index) => {
					const number = index + 1;
					const isAnswer = number === question.answer;
					const classes = ["rb-choice"];
					if (picked === number) classes.push("is-picked");
					if (settled && isAnswer) classes.push("is-right");
					if (settled && picked === number && !isAnswer) classes.push("is-wrong");
					return (
						<li key={index}>
							<button
								type="button"
								className={classes.join(" ")}
								onClick={() => {
									setPicked(number);
									if (number !== question.answer) {
										const pickedText = question.choices[index]?.jp || String(number);
										const rightText = question.choices[question.answer - 1]?.jp || String(question.answer);
										addMistake("q", `${question.label} ${question.jp}\n你的答案：${pickedText}\n正确答案：${rightText}`);
									}
								}}
								aria-pressed={picked === number}
							>
								<span className="rb-choice__num">{number}</span>
								<span>
									<Jp text={choice.jp} />
									<Cn text={choice.cn} show={showCn} />
									{settled && question.choiceNotes?.[index] && (
										<span className="rb-choice__note">{question.choiceNotes[index]}</span>
									)}
								</span>
							</button>
						</li>
					);
				})}
			</ul>

			<div className="rb-q__actions">
				<button
					type="button"
					className={isFav(favId) ? "on" : ""}
					onClick={() => toggleFav(favId)}
					aria-pressed={isFav(favId)}
				>
					{isFav(favId) ? "★ 已收藏" : "☆ 收藏本题"}
				</button>
				<button type="button" onClick={() => setRevealed((value) => !value)}>
					{settled ? "隐藏解析" : "查看答案与解析"}
				</button>
				{picked !== null && (
					<button
						type="button"
						onClick={() => {
							setPicked(null);
							setRevealed(false);
						}}
					>
						重做
					</button>
				)}
			</div>

			{settled && (
				<div className="rb-answer" id={id}>
					<b>正确答案：{question.answer}</b>
					<p style={{ margin: "6px 0 0" }}>{question.explanation}</p>
					<span className="rb-answer__src">
						{answerSource === "book"
							? "答案出自原书别册《解答・解说》；解析为本站补充。"
							: "原书别册第 5〜6 週答案页不在扫描件中，此答案与解析由本站依据原文推导。"}
					</span>
				</div>
			)}
		</article>
	);
}

function RenshuChoices({ choices, answers, showCn }: { choices: Choice[]; answers: number[]; showCn: boolean }) {
	const [picked, setPicked] = useState<Set<number>>(new Set());
	const [revealed, setRevealed] = useState(false);

	const toggle = (number: number) =>
		setPicked((current) => {
			const next = new Set(current);
			if (next.has(number)) next.delete(number);
			else next.add(number);
			return next;
		});

	return (
		<>
			<ul className="rb-check">
				{choices.map((choice, index) => {
					const number = index + 1;
					const isAnswer = answers.includes(number);
					const classes: string[] = [];
					if (picked.has(number)) classes.push("is-picked");
					if (revealed && isAnswer) classes.push("is-right");
					return (
						<li key={index}>
							<button type="button" className={classes.join(" ")} onClick={() => toggle(number)}>
								<span className="rb-check__box">{picked.has(number) ? "✓" : ""}</span>
								<span>
									<Jp text={choice.jp} />
									<Cn text={choice.cn} show={showCn} />
								</span>
							</button>
						</li>
					);
				})}
			</ul>
			<div className="rb-q__actions">
				<button type="button" onClick={() => setRevealed((value) => !value)}>
					{revealed ? "隐藏答案" : "查看答案"}
				</button>
			</div>
			{revealed && (
				<div className="rb-answer">
					<b>正确答案：{answers.join(" ・ ")}</b>
				</div>
			)}
		</>
	);
}

/* ------------------------------------------------------------------ *
 * Catalog
 * ------------------------------------------------------------------ */

/** `open` lives in the parent so returning from a lesson keeps the week you
 *  expanded — the catalog unmounts while a lesson is showing. */
function Catalog({
	onOpen,
	open,
	setOpen,
}: {
	onOpen: (week: number, day: number) => void;
	open: Set<number>;
	setOpen: (update: (current: Set<number>) => Set<number>) => void;
}) {
	const ready = readingDays.length;

	return (
		<>
			<div className="rb-cover">
				<span>N3　読解　どっかい</span>
				<h1>新日语能力考试考前对策 · N3 读解</h1>
				<p>佐々木仁子・松本紀子　著　／　世界图书出版公司</p>
				<p className="rb-cover__meta">
					6 週 × 7 日＝全 42 課　·　已上线 {ready} / 42 課　·　原书 P.11–P.106
				</p>
			</div>

			{weekOutline.map((week) => {
				const days = dayOutline.filter((day) => day.week === week.week);
				const isOpen = open.has(week.week);
				const done = days.filter((day) => findDay(day.week, day.day)).length;
				return (
					<section className="rb-week" key={week.week}>
						<button
							type="button"
							className="rb-week__head"
							aria-expanded={isOpen}
							onClick={() =>
								setOpen((current) => {
									const next = new Set(current);
									if (next.has(week.week)) next.delete(week.week);
									else next.add(week.week);
									return next;
								})
							}
						>
							<b>第{week.week}週</b>
							<p>
								{week.title}
								<small>
									{week.titleCn}　/　{week.titleEn}
								</small>
							</p>
							<span className="rb-week__count">
								{done}/7　{isOpen ? "▾" : "▸"}
							</span>
						</button>
						{isOpen && (
							<div className="rb-days">
								{days.map((day) => {
									const data = findDay(day.week, day.day);
									return (
										<button
											type="button"
											className="rb-day"
											key={`${day.week}-${day.day}`}
											disabled={!data}
											onClick={() => data && onOpen(day.week, day.day)}
										>
											<span>
												{day.day}日目{day.day === 7 ? "　実戦" : ""}
											</span>
											<b>{day.label}</b>
											<small>
												{data ? `原书 P.${data.printedPages.join("–P.")}` : "整理中"}
											</small>
										</button>
									);
								})}
							</div>
						)}
					</section>
				);
			})}
		</>
	);
}

/* ------------------------------------------------------------------ *
 * Day view
 * ------------------------------------------------------------------ */

function DayView({
	data,
	showCn,
	showGrammar,
}: {
	data: ReadingDay;
	showCn: boolean;
	showGrammar: boolean;
}) {
	return (
		<>
			{data.point && (
				<section className="rb-sheet">
					<span className="rb-sheet__tag">ポイント</span>
					<h2 className="rb-point__title">
						<Jp text={data.point.title} />
					</h2>
					{data.point.titleEn && <p className="rb-point__title-en">{data.point.titleEn}</p>}
					<Cn text={data.point.titleCn} show={showCn} block />

					{data.point.figure && (
						<figure className="rb-figure">
							<figcaption>{showCn ? data.point.figure.cn : data.point.figure.alt}</figcaption>
						</figure>
					)}

					{data.point.tips.map((tip, index) => (
						<p className="rb-tip" key={index}>
							<span>
								<Jp text={tip.jp} />
								<Cn text={tip.cn} show={showCn} />
							</span>
						</p>
					))}

					{data.point.expressions.length > 0 && (
						<div className="rb-express">
							<p className="rb-express__label">よく使われる表現</p>
							<div className="rb-express__grid">
								{data.point.expressions.map((entry, index) => (
									<div className="rb-express__row" key={index}>
										<b>{entry.jp}</b>
										{entry.kana && <i>（{entry.kana}）</i>}
										{entry.en && <i>{entry.en}</i>}
										<span>{entry.cn}</span>
									</div>
								))}
							</div>
						</div>
					)}

					{data.point.notes?.map((note, index) => (
						<p className="rb-note-star" key={index}>
							<Jp text={note.jp} />
							<Cn text={note.cn} show={showCn} />
						</p>
					))}
				</section>
			)}

			{data.renshu && (
				<section className="rb-sheet">
					<span className="rb-sheet__tag">れんしゅう</span>
					<p className="rb-instruction">
						<Jp text={data.renshu.instruction} />
					</p>
					<Cn text={data.renshu.instructionCn} show={showCn} block />
					<div className="rb-material">
						<Blocks blocks={data.renshu.blocks} showCn={showCn} />
						<Footnotes notes={data.renshu.footnotes} />
					</div>
					<RenshuChoices choices={data.renshu.choices} answers={data.renshu.answers} showCn={showCn} />
					{data.renshu.hint && (
						<p className="rb-note-star" style={{ marginTop: 16 }}>
							<Jp text={data.renshu.hint.jp} />
							<Cn text={data.renshu.hint.cn} show={showCn} />
						</p>
					)}
					{data.renshu.pageNotes && data.renshu.pageNotes.length > 0 && (
						<div className="rb-pagenotes">
							{data.renshu.pageNotes.map((note, index) => (
								<p key={index} style={{ margin: "0 0 4px" }}>
									{note.jp}
									<Cn text={note.cn} show={showCn} />
								</p>
							))}
						</div>
					)}
				</section>
			)}

			{data.mondai && (
				<section className="rb-sheet">
					<span className="rb-sheet__tag">もんだい</span>
					<p className="rb-instruction">
						<Jp text={data.mondai.instruction} />
					</p>
					<Cn text={data.mondai.instructionCn} show={showCn} block />
					<div className="rb-material">
						<Blocks blocks={data.mondai.blocks} showCn={showCn} />
					</div>
					<Footnotes notes={data.mondai.footnotes} />
					{data.mondai.questions.map((question, index) => (
						<QuestionCard
							key={index}
							id={`w${data.week}d${data.day}q${index}`}
							question={question}
							showCn={showCn}
							answerSource={data.answerSource}
							week={data.week}
							day={data.day}
						/>
					))}
					{data.mondai.pageNotes && data.mondai.pageNotes.length > 0 && (
						<div className="rb-pagenotes">
							{data.mondai.pageNotes.map((note, index) => (
								<p key={index} style={{ margin: "0 0 4px" }}>
									{note.jp}
									<Cn text={note.cn} show={showCn} />
								</p>
							))}
						</div>
					)}
				</section>
			)}

			{data.practice && (
				<>
					<section className="rb-sheet">
						<span className="rb-sheet__tag">実戦問題</span>
						<p className="rb-instruction">
							制限時間：{data.practice.timeLimitMinutes}分　／　{data.practice.scoring}
						</p>
						<Cn
							text={`限时 ${data.practice.timeLimitMinutes} 分钟，${data.practice.scoring}。请按能力考试的形式作答。`}
							show={showCn}
							block
						/>
					</section>
					{data.practice.groups.map((group, groupIndex) => (
						<section className="rb-sheet" key={groupIndex}>
							<span className="rb-sheet__tag">{group.label}</span>
							<p className="rb-instruction">
								<Jp text={group.instruction} />
							</p>
							<Cn text={group.instructionCn} show={showCn} block />
							<div className="rb-material">
								<Blocks blocks={group.blocks} showCn={showCn} />
							</div>
							<Footnotes notes={group.footnotes} />
							{group.questions.map((question, index) => (
								<QuestionCard
									key={index}
									id={`w${data.week}d${data.day}g${groupIndex}q${index}`}
									question={question}
									showCn={showCn}
									answerSource={data.answerSource}
									week={data.week}
									day={data.day}
								/>
							))}
						</section>
					))}
				</>
			)}

			{data.vocab.length > 0 && (
				<section className="rb-sheet">
					<span className="rb-sheet__tag">ことば</span>
					<p className="rb-instruction">生词・读音</p>
					<div className="rb-vocab">
						{data.vocab.map((word, index) => {
							const favId = `reading#${data.week}-${data.day}#v${index}`;
							registerFavMeta(favId, {
								module: "reading",
								hash: `#/day/${data.week}-${data.day}`,
								w: data.week,
								d: data.day,
								jp: word.jp,
								cn: word.cn,
							});
							return (
								<article key={index}>
									<b>
										{word.jp}
										{word.pos && <span className="pos">{word.pos}</span>}
										<button type="button" className="starb" onClick={() => toggleFav(favId)} aria-label="收藏">
											{isFav(favId) ? "★" : "☆"}
										</button>
									</b>
									{word.kana && <span className="kana">{word.kana}</span>}
									<p>{word.cn}</p>
								</article>
							);
						})}
					</div>
				</section>
			)}

			{showGrammar && data.grammar.length > 0 && (
				<section className="rb-sheet">
					<span className="rb-sheet__tag">文法</span>
					<p className="rb-instruction">语法讲解</p>
					<div className="rb-grammar">
						{data.grammar.map((item, index) => (
							<article key={index}>
								<h4>
									<Jp text={item.pattern} />
								</h4>
								{item.formation && <p className="form">接续：{item.formation}</p>}
								<p className="meaning">{item.meaning}</p>
								{item.example && (
									<p className="example">
										<Jp text={item.example.jp} />
										<Cn text={item.example.cn} show={showCn} />
									</p>
								)}
								{item.note && <p className="note">※ {item.note}</p>}
							</article>
						))}
					</div>
				</section>
			)}

			<p className="rb-pageref">
				原书 P.{data.printedPages.join(" – P.")}　·　第{data.week}週 {data.day}日目
			</p>
		</>
	);
}

/* ------------------------------------------------------------------ *
 * Shell
 * ------------------------------------------------------------------ */

export function ReadingN3Content({
	week,
	day,
	embedded = false,
}: {
	week: number;
	day: number;
	embedded?: boolean;
}) {
	const [showCn, setShowCn] = useState(false);
	const [showGrammar, setShowGrammar] = useState(false);
	const [furigana, setFurigana] = useState(true);
	const [stuck, setStuck] = useState(false);
	const sentinelRef = useRef<HTMLDivElement | null>(null);

	const data = findDay(week, day);

	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel || typeof IntersectionObserver === "undefined") return;
		// Inside the study shell the toolbar parks under that shell's own sticky
		// topbar, so the sentinel has to clear the same height or `is-stuck`
		// would fire a topbar-height too late.
		const offset = embedded
			? Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue("--topbarh"), 10) || 88
			: 0;
		const observer = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting), {
			threshold: 1,
			rootMargin: `-${offset}px 0px 0px 0px`,
		});
		observer.observe(sentinel);
		return () => observer.disconnect();
	}, [embedded]);

	useEffect(() => {
		window.scrollTo({ top: 0 });
	}, [week, day, embedded]);

	const available = readingDays.map((item) => ({ week: item.week, day: item.day }));
	const position = data ? available.findIndex((item) => item.week === data.week && item.day === data.day) : -1;
	const previous = position > 0 ? available[position - 1] : undefined;
	const next = position >= 0 && position < available.length - 1 ? available[position + 1] : undefined;

	const outlineLabel = data
		? (dayOutline.find((item) => item.week === data.week && item.day === data.day)?.label ?? data.label)
		: "";

	return (
		<div className={`rb${furigana ? "" : " rb--no-furigana"}${embedded ? " rb--embedded" : ""}`}>
			<div className="rb-wrap">
				<div ref={sentinelRef} className="rb-bar-sentinel" aria-hidden="true" />
				<div className={`rb-bar${stuck ? " is-stuck" : ""}`}>
					<div className="rb-bar__id">
						{data ? (
							<>
								<span>
									第{data.week}週　{data.day}日目
								</span>
								<b>{plain(outlineLabel)}</b>
							</>
						) : (
							<>
								<span>N3　読解</span>
								<b>未找到这一课</b>
							</>
						)}
					</div>
					<div className="rb-toggles">
						<button type="button" className="rb-back" onClick={() => navTo("#/")}>
							‹ 返回目录
						</button>
						<button type="button" aria-pressed={furigana} onClick={() => setFurigana((value) => !value)}>
							振り仮名
						</button>
						<button type="button" aria-pressed={showCn} onClick={() => setShowCn((value) => !value)}>
							翻译
						</button>
						<button type="button" aria-pressed={showGrammar} onClick={() => setShowGrammar((value) => !value)}>
							语法讲解
						</button>
					</div>
				</div>

				{data ? (
					<>
						{/* Keyed by lesson: question cards hold their own picked/revealed
						    state, and without this React reuses them across lessons, so the
						    next lesson opens with the previous one's answers showing. */}
						<DayView key={`${data.week}-${data.day}`} data={data} showCn={showCn} showGrammar={showGrammar} />
						<nav className="rb-nav" aria-label="课程切换">
							<button type="button" disabled={!previous} onClick={() => previous && navTo(`#/day/${previous.week}-${previous.day}`)}>
								<small>上一课</small>
								<b>
									{previous
										? `第${previous.week}週 ${previous.day}日目 · ${
												dayOutline.find((item) => item.week === previous.week && item.day === previous.day)?.label
											}`
										: "已经是第一课"}
								</b>
							</button>
							<button type="button" disabled={!next} onClick={() => next && navTo(`#/day/${next.week}-${next.day}`)}>
								<small>下一课</small>
								<b>
									{next
										? `第${next.week}週 ${next.day}日目 · ${
												dayOutline.find((item) => item.week === next.week && item.day === next.day)?.label
											}`
										: "已经是最后一课"}
								</b>
							</button>
						</nav>
					</>
				) : (
					<div className="empty">未找到</div>
				)}
			</div>
		</div>
	);
}

export default ReadingN3Content;
