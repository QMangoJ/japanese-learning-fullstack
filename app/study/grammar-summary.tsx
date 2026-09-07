import { COMPLETION_COMPARISON, N3_DAILY_SUMMARIES, SUMMARY_SOURCES, type Usage } from "../data/n3-daily-summaries";
import { RubyHtml } from "../routes/study-common";
import "./grammar-summary.css";

type Point = {
	pattern: string;
	examples?: { jp: string; jp_r?: string; cn?: string; en?: string }[];
};
const USAGE_LABELS: Record<Usage, readonly [string, string]> = {
	everyday: ["口语 · 很常用", "Conversation · very common"],
	common: ["日常 · 常用", "Everyday · common"],
	situational: ["特定场景常用", "Common in specific contexts"],
	formal: ["偏正式／书面", "More formal / written"],
};

export function GrammarSummary({ week, day, points, language, onReview }: {
	week: number;
	day: number;
	points: Point[];
	language: string;
	onReview: (index: number) => void;
}) {
	const summary = N3_DAILY_SUMMARIES[`${week}-${day}`];
	// Week-end tests and other unknown lessons deliberately have no summary.
	if (!summary) return null;
	const lang = language === "en" ? 1 : 0;
	const label = (cn: string, en: string) => lang ? en : cn;
	const headingId = `grammar-summary-${week}-${day}`;
	return (
		<section className="grammar-summary" aria-labelledby={headingId} data-testid="grammar-summary">
			<h2 id={headingId} className="sec-title">{label("语法总结", "Grammar summary")}</h2>
			<div className="card grammar-summary__card">
				<h3>{summary.title[lang]}</h3>
				<p className="grammar-summary__tip">{summary.tip[lang]}</p>
				<div className="grammar-summary__columns" aria-hidden="true"><span>{label("表达 · 常用度", "Pattern · usage")}</span><span>{label("关键区别", "Key distinction")}</span><span>{label("本课例句", "Lesson example")}</span></div>
				<div className="grammar-summary__rows">
					{summary.rows.map(([form, usage, cn, en], index) => {
						const point = points[index];
						const example = point?.examples?.[0];
						return (
							<article className="grammar-summary__row" key={form}>
								<header>
									<h4 lang="ja">{form}</h4>
									<div className="grammar-summary__badges">
										<span>{label("N3 · 本课", "N3 · this course")}</span>
										<span>{USAGE_LABELS[usage][lang]}</span>
									</div>
									{point ? <button type="button" onClick={() => onReview(index)} aria-label={`${label("回看语法", "Review pattern")}: ${form}`}>
										{label("回看语法", "Review pattern")} ↑
									</button> : null}
								</header>
								<p>{lang ? en : cn}</p>
									{example ? <div className="grammar-summary__example-body">
											<p className="jp" lang="ja"><RubyHtml html={example.jp_r || example.jp} /></p>
											<p className={lang ? "en" : "cn"}>{lang ? example.en : example.cn}</p>
									</div> : null}
							</article>
							);
						})}
				</div>
				{week === 5 && day === 2 ? <div className="grammar-summary__related">
					<h3>{label("横向对比：其他“完成”表达", "Compare other completion expressions")}</h3>
					<p className="grammar-summary__tip">{label("这些表达侧重点不同，并非互斥：食べ切ってしまった同时强调全部吃完，以及事情已发生的语气。", "The emphases can combine: 食べ切ってしまった marks both entirety and the speaker's stance toward the completed event.")}</p>
					{COMPLETION_COMPARISON.map(([form, level, usage, cn, en]) => <article className="grammar-summary__row" key={form}>
						<header><h4 lang="ja">{form}</h4><div className="grammar-summary__badges"><span>{lang && level.includes("／") ? "Around N3" : level.split("／")[0]} · {label("参考", "reference")}</span><span>{USAGE_LABELS[usage][lang]}</span></div></header>
						<p>{lang ? en : cn}</p>
					</article>)}
					<div className="grammar-summary__sources"><span>{label("等级参考来源", "Level references")}</span>
						<ul>{SUMMARY_SOURCES.map(([name, url]) => <li key={url}><a href={url} target="_blank" rel="noreferrer">{lang && name.includes(" / ") ? name.split(" / ")[1] : name.split(" / ")[0]}</a></li>)}</ul>
					</div>
				</div> : null}
				<p className="grammar-summary__note">{label(
					"N3·本课标记学习位置，不代表该表达只在 N3 出现；扩展等级为备考参考，并非官方逐条认定。常用度是按日常场景的定性判断，不是统计排名。",
					"N3 · this course identifies the lesson level, not an exclusive JLPT classification. Additional levels are study references, not official item-by-item assignments. Usage labels are qualitative, not corpus frequency rankings.",
				)}</p>
			</div>
		</section>
	);
}
