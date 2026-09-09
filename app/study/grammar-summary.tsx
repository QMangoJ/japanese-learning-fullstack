import { COMPLETION_COMPARISON, N3_DAILY_SUMMARIES, SUMMARY_SOURCES, type Usage } from "../data/n3-daily-summaries";
import { N3_RELATED_GRAMMAR, RELATED_LEVEL_SOURCES } from "../data/n3-related-grammar";
import { DAILY_MEANINGS, RELATED_MEANINGS } from "../data/n3-summary-meanings";
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

// Keep the formula itself in Japanese; translate only its explanatory notation.
function connectionLabel(connection: string, english: boolean) {
	if (!english) return connection;
	const notation: Record<string, string> = {
		"不加": "without ", "也可": "also ", "去": " minus ", "也": "also ",
		"普通形": "plain form", "使役": "causative", "受身": "passive",
		"他動詞": "transitive V", "動詞": "verb", "否定": "negative",
		"イ形": "i-adj", "ナ形": "na-adj", "部分": "selected ",
		"助詞": "particle", "时间": "time", "场所": "place", "期间": "period",
		"地域": "area", "等": " etc. ", "句子": "sentence", "结果": "result",
	};
	return connection.replace(/不加|也可|去|也|普通形|使役|受身|他動詞|動詞|否定|イ形|ナ形|部分|助詞|时间|场所|期间|地域|等|句子|结果/g, token => notation[token]);
}

function formLabel(form: string, english: boolean) {
	if (!english) return form;
	const senses: Record<string, string> = { "样态": "appearance", "传闻": "hearsay", "举例": "examples", "定义": "definition", "目的": "purpose", "方式": "manner", "原因": "cause", "场所": "location", "发现": "discovery" };
	return form.replace(/样态|传闻|举例|定义|目的|方式|原因|场所|发现/g, token => senses[token]);
}

export function GrammarSummary({ week, day, points, language, onReview }: {
	week: number;
	day: number;
	points: Point[];
	language: string;
	onReview: (index: number) => void;
}) {
	const summary = N3_DAILY_SUMMARIES[`${week}-${day}`];
	const related = N3_RELATED_GRAMMAR[`${week}-${day}`];
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
									{!lang && <p className="grammar-summary__meaning">意思：{DAILY_MEANINGS[`${week}-${day}`]?.[index]}</p>}
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
				{related ? <section className="grammar-summary__cross-level" aria-labelledby={`${headingId}-related`} data-testid="grammar-related">
					<h3 id={`${headingId}-related`}>{label("相似表达 · 跨等级对比", "Similar expressions · across levels")}</h3>
					<p className="grammar-summary__group-title">{related.title[lang]}</p>
					<p className="grammar-summary__tip">{related.tip[lang]}</p>
					<div className="grammar-summary__columns" aria-hidden="true"><span>{label("表达 · 参考等级 · 接续", "Pattern · reference level · form")}</span><span>{label("与本课怎么区分", "How it differs from this lesson")}</span><span>{label("对比例句", "Comparison example")}</span></div>
					{related.rows.map(([form, level, usage, connection, zh, en, jp, translationZh, translationEn]) => <article className="grammar-summary__row" key={form}>
						<header><h4 lang="ja">{formLabel(form, !!lang)}</h4>
							{!lang && <p className="grammar-summary__meaning">意思：{RELATED_MEANINGS[form]}</p>}
							<div className="grammar-summary__badges"><span>{level} · {label("参考", "reference")}</span><span>{USAGE_LABELS[usage][lang]}</span></div>
							<p className="grammar-summary__connection">{connectionLabel(connection, !!lang)}</p>
						</header>
						<p>{lang ? en : zh}</p>
						<div className="grammar-summary__example-body"><p className="jp" lang="ja">{jp}</p><p className={lang ? "en" : "cn"}>{lang ? translationEn : translationZh}</p></div>
					</article>)}
				</section> : null}
				{week === 5 && day === 2 ? <div className="grammar-summary__related">
					<h3>{label("横向对比：其他“完成”表达", "Compare other completion expressions")}</h3>
					<p className="grammar-summary__tip">{label("这些表达侧重点不同，并非互斥：食べ切ってしまった同时强调全部吃完，以及事情已发生的语气。", "The emphases can combine: 食べ切ってしまった marks both entirety and the speaker's stance toward the completed event.")}</p>
					{COMPLETION_COMPARISON.map(([form, level, usage, cn, en]) => <article className="grammar-summary__row" key={form}>
						<header><h4 lang="ja">{form}</h4>{!lang && <p className="grammar-summary__meaning">意思：{RELATED_MEANINGS[form]}</p>}<div className="grammar-summary__badges"><span>{lang && level.includes("／") ? "Around N3" : level.split("／")[0]} · {label("参考", "reference")}</span><span>{USAGE_LABELS[usage][lang]}</span></div></header>
						<p>{lang ? en : cn}</p>
					</article>)}
					<div className="grammar-summary__sources"><span>{label("等级参考来源", "Level references")}</span>
						<ul>{SUMMARY_SOURCES.map(([name, url]) => <li key={url}><a href={url} target="_blank" rel="noreferrer">{lang && name.includes(" / ") ? name.split(" / ")[1] : name.split(" / ")[0]}</a></li>)}</ul>
					</div>
				</div> : null}
				{related ? <div className="grammar-summary__sources">
					<span>{label("参考来源（非官方分级）", "References (unofficial classifications)")}</span>
					<ul>{RELATED_LEVEL_SOURCES.map(([name, url]) => <li key={url}><a href={url} target="_blank" rel="noreferrer">{name.split(" / ")[lang]}</a></li>)}</ul>
				</div> : null}
				<p className="grammar-summary__note">{label(
					"N3·本课标记学习位置；扩展不限于本教材，选取常见、易混表达，不是全部日语表达的穷尽清单。等级按所列义项作备考参考，不同教材可能归类不同，并非官方逐条认定。常用度是场景性判断，不是统计排名。",
					"N3 · this course identifies the lesson location. Comparisons extend beyond this textbook to common or easily confused expressions, not an exhaustive inventory of Japanese. Reference levels concern the stated sense and may vary by teaching source; they are not official assignments. Usage is qualitative, not a statistical ranking.",
				)}</p>
			</div>
		</section>
	);
}
