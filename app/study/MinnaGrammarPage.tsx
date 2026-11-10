import { useEffect } from "react";

import { Theme } from "@astryxdesign/core/theme";
import { Tab, TabList } from "@astryxdesign/core/TabList";
import { Card } from "@astryxdesign/core/Card";
import { Popover } from "@astryxdesign/core/Popover";
import { neutralTheme } from "@astryxdesign/theme-neutral/built";

import { MINNA_BOOKS, minnaBook, plainMinna, type MinnaExample, type MinnaGloss } from "../data/minna-grammar";
import { parseRubyMarkup } from "./it-listening";
import { minnaHash } from "./minna-route";
import { lx, navTo, THEME } from "./store";
import "./astryx.css";

function RubyLine({ text, glosses }: { text: string; glosses?: MinnaGloss[] }) {
	const bySurface = new Map((glosses ?? []).map((gloss) => [gloss.surface, gloss]));
	return (
		<>
			{parseRubyMarkup(text).map((seg, index) => {
				const gloss = bySurface.get(seg.t);
				const body = seg.r ? (
					<ruby>
						{seg.t}
						<rt>{seg.r}</rt>
					</ruby>
				) : (
					seg.t
				);
				if (!gloss) return <span key={index}>{body}</span>;
				return (
					<Popover
						key={index}
						placement="below"
						alignment="start"
						label={`${gloss.reading} ${gloss.zh}`}
						content={
							<span className="minna-gloss-pop">
								<b lang="ja">{gloss.reading}</b>
								<span>{gloss.zh}</span>
							</span>
						}
					>
						<button type="button" className="minna-gloss" lang="ja">
							{body}
						</button>
					</Popover>
				);
			})}
		</>
	);
}

function ExampleBlock({ example }: { example: MinnaExample }) {
	return (
		<div className="minna-ex">
			<div className="jp" lang="ja">
				<RubyLine text={example.jp} glosses={example.glosses} />
			</div>
			<p className="cn">{lx(example.zh, example.en)}</p>
		</div>
	);
}

export function MinnaGrammarPage({
	bookId,
	lesson,
	point,
}: {
	bookId: string | null;
	lesson: number | null;
	point: number | null;
}) {
	const book = minnaBook(bookId) ?? MINNA_BOOKS[0];
	const unknownBook = bookId != null && !minnaBook(bookId);
	const open = book?.lessons.some((item) => item.number === lesson) ? lesson : null;

	useEffect(() => {
		if (open == null) return;
		const id = point != null ? `minna-p-${open}-${point}` : `minna-l-${open}`;
		const node = document.getElementById(id);
		if (typeof node?.scrollIntoView === "function") node.scrollIntoView({ block: "start" });
	}, [book?.id, open, point]);

	if (!book) return <div className="empty">{lx("还没有收录课次。", "No lessons yet.")}</div>;

	return (
		<div className="minna-page" data-testid="minna-page">
			<p className="minna-lead">
				{lx(
					"按课列出文型，方便预习或复习时查看这一课讲了什么。例句是另写的，不是教材原文。带下划线的词可点开，看读音和中文。注音开关对这里的振假名同样有效。",
					"Grammar by lesson, for preview or review. Examples are original, not the textbook's. Underlined words open a reading and a Chinese gloss. The reading toggle applies here too.",
				)}
			</p>
			{unknownBook ? (
				<p className="minna-lead">{lx("这一册还没有收录，先显示已有的课。", "That volume is not in yet. Showing the volumes we have.")}</p>
			) : null}
			<Theme theme={neutralTheme} mode={THEME === "dark" ? "dark" : "light"}>
				<div className="astryx-scope minna-tabs">
					<TabList value={book.id} onChange={(id) => navTo(minnaHash(id))} aria-label={lx("教材分册", "Volume")}>
						{MINNA_BOOKS.map((item) => (
							<Tab key={item.id} value={item.id} label={lx(item.titleZh, item.titleEn)} />
						))}
					</TabList>
				</div>
			</Theme>
			<p className="minna-lead">
				{lx(
					`${book.titleJa} 第${book.edition}版。初級到第50课为止；中級可以按同一结构往后加。`,
					`${book.titleEn}, edition ${book.edition}. Shokyu ends at lesson 50. A chukyu volume can be added in the same shape.`,
				)}
			</p>
			{lesson != null && open == null ? (
				<p className="minna-lead">{lx(`第${lesson}课还没有收录。`, `Lesson ${lesson} is not in this volume.`)}</p>
			) : null}
			<div className="minna-lessons">
				{book.lessons.map((item) => {
					const expanded = open === item.number;
					return (
						<section key={item.number} id={`minna-l-${item.number}`}>
							<button
								type="button"
								className={expanded ? "minna-lesson on" : "minna-lesson"}
								aria-expanded={expanded}
								onClick={() => navTo(expanded ? minnaHash(book.id) : minnaHash(book.id, item.number))}
							>
								<b>{lx(`第${item.number}课`, `Lesson ${item.number}`)} · {lx(item.titleZh, item.titleEn)}</b>
								<small>{item.points.map((entry) => plainMinna(entry.pattern)).join(" · ")}</small>
							</button>
							{expanded ? (
								<div className="minna-body">
									<p className="minna-goal">{lx(item.goalZh, item.goalEn)}</p>
									<Theme theme={neutralTheme} mode={THEME === "dark" ? "dark" : "light"}>
										<div className="astryx-scope minna-points">
											{item.points.map((entry, index) => (
												<article key={entry.id} id={`minna-p-${item.number}-${index}`} className={point === index ? "minna-point current" : "minna-point"}>
													<Card padding={3}>
														<p className="minna-kicker">{lx("文型", "Pattern")}</p>
														<h3 className="minna-pattern" lang="ja">
															<RubyLine text={entry.pattern} />
														</h3>
														<p className="minna-connection">
															<span className="minna-kicker">{lx("接续", "Connection")}</span>
															{entry.connection}
														</p>
														<p className="minna-explain">{lx(entry.zh, entry.en)}</p>
														{entry.examples.map((example) => (
															<ExampleBlock key={example.jp} example={example} />
														))}
													</Card>
												</article>
											))}
										</div>
									</Theme>
								</div>
							) : null}
						</section>
					);
				})}
			</div>
			<p className="minna-note">
				{lx(
					"课次按《大家的日本语》初級II第2版的文型。等级只作读音提示的参考，不是官方分级。",
					"Lessons follow Minna no Nihongo Shokyu II, 2nd edition. Level notes on glosses are a study aid, not an official ranking.",
				)}
			</p>
		</div>
	);
}
