import { N2_DAILY_SUMMARIES } from "../data/n2-daily-summaries";
import { N2_SUMMARY_RELATED } from "../data/n2-summary-related";
import { n2SummaryExample } from "../data/n2-summary-examples";
import type { Usage } from "../data/n3-daily-summaries";
import { RubyHtml } from "../routes/study-common";
import { translateOutsideRuby, useSimilarFurigana } from "../data/similar-furigana-text";
import "./grammar-summary.css";

type Point = { examples?: { jp: string; jp_r?: string; cn?: string; en?: string }[] };
const USAGE: Record<Usage, readonly [string, string]> = {
	everyday: ["口语 · 很常用", "Conversation · very common"],
	common: ["日常 · 常用", "Everyday · common"],
	situational: ["特定场景常用", "Common in specific contexts"],
	formal: ["偏正式／书面", "More formal / written"],
};
function englishForm(form: string) {
	const words: Record<string, string> = { "样态": "appearance", "传闻": "hearsay", "方式": "manner", "同时": "simultaneous", "场所": "location", "手段": "means", "意志": "intention", "推测": "conjecture", "意志形": "volitional", "去": " minus " };
	return form.replace(/意志形|样态|传闻|方式|同时|场所|手段|意志|推测|去/g, word => words[word]);
}

/** public/data/n2-grammar-similar.json 的 days[wXdY]：同为 N2、容易与本课某语法点混淆的表达，和跨等级条目放在同一列表里。 */
export type N2SimilarEntry = { ref: [number, number, number]; point: number; form: string; meaning: string; against: string; diff: string; example: { jp: string; cn: string } };

export function N2GrammarSummary({ week, day, points, language, onReview, similar, onOpenPoint }: {
	week: number; day: number; points: Point[]; language: string; onReview: (index: number) => void;
	similar?: N2SimilarEntry[]; onOpenPoint?: (ref: [number, number, number]) => void;
}) {
	const similarFurigana = useSimilarFurigana();
	const summary = N2_DAILY_SUMMARIES[`${week}-${day}`];
	if (!summary) return null;
	const lang = language === "en" ? 1 : 0;
	const t = (zh: string, en: string) => lang ? en : zh;
	const id = `grammar-summary-n2-${week}-${day}`;
	const sameLevel = lang ? [] : similar || [];
	return <section className="grammar-summary" data-testid="grammar-summary" data-level="N2" aria-labelledby={id}>
		<h2 className="sec-title" id={id}>{t("语法总结", "Grammar summary")}</h2>
		<div className="card grammar-summary__card">
			<h3>{summary.title[lang]}</h3>
			<div className="grammar-summary__columns" aria-hidden="true"><span>{t("表达 · 意思 · 常用度", "Pattern · meaning · usage")}</span><span>{t("关键区别", "Key distinction")}</span><span>{t("本课例句", "Lesson example")}</span></div>
			<div className="grammar-summary__rows">
				{summary.rows.map((row, index) => {
					const original = points[index]?.examples?.[0];
					const example = original && n2SummaryExample(original);
					return <article className="grammar-summary__row" key={row.form}>
						<header>
							<h4 lang="ja">{lang ? englishForm(row.form) : row.form}</h4>
							<p className="grammar-summary__meaning">{t("意思：", "Meaning: ")}{row.meaning[lang]}</p>
							<div className="grammar-summary__badges"><span>{t("N2 · 本课", "N2 · this course")}</span><span>{USAGE[row.usage][lang]}</span></div>
							{points[index] && <button type="button" onClick={() => onReview(index)} aria-label={`${t("回看语法", "Review pattern")}: ${row.form}`}>{t("回看语法", "Review pattern")} ↑</button>}
						</header>
						<p>{row.distinction[lang]}</p>
						{example && <div className="grammar-summary__example-body"><p className="jp" lang="ja"><RubyHtml html={example.jp_r || example.jp} /></p><p className={lang ? "en" : "cn"}>{lang ? example.en : example.cn}</p></div>}
					</article>;
				})}
			</div>
			<section className="grammar-summary__cross-level" data-testid="grammar-related" aria-labelledby={`${id}-related`}>
				<h3 id={`${id}-related`}>{sameLevel.length ? "相似表达" : t("相似表达 · 跨等级对比", "Similar expressions · across levels")}</h3>
				<div className="grammar-summary__columns" aria-hidden="true"><span>{t("表达 · 意思 · 等级", "Pattern · meaning · level")}</span><span>{t("怎么区分", "Key distinction")}</span><span>{t("对比例句", "Comparison example")}</span></div>
				{summary.related.map(key => {
					const row = N2_SUMMARY_RELATED[key];
					return <article className="grammar-summary__row" key={key}>
						<header><h4 lang="ja"><RubyHtml html={translateOutsideRuby(similarFurigana(row.form), text => (lang ? englishForm(text) : text))} /></h4>
							<p className="grammar-summary__meaning">{t("意思：", "Meaning: ")}{row.meaning[lang]}</p>
							<div className="grammar-summary__badges"><span>{row.level} · {t("参考等级", "reference level")}</span><span>{USAGE[row.usage][lang]}</span></div>
						</header>
						<p>{row.distinction[lang]}</p>
						<div className="grammar-summary__example-body"><p className="jp" lang="ja"><RubyHtml html={similarFurigana(row.example[0])} /></p><p className={lang ? "en" : "cn"}>{row.example[lang + 1]}</p></div>
					</article>;
				})}
				{sameLevel.map(entry => {
					const here = entry.ref[0] === week && entry.ref[1] === day;
					return <article className="grammar-summary__row" key={`n2-${entry.point}-${entry.ref.join("-")}`} data-level="N2">
						<header><h4 lang="ja"><RubyHtml html={similarFurigana(entry.form)} /></h4>
							<p className="grammar-summary__meaning">意思：{entry.meaning}</p>
							<div className="grammar-summary__badges"><span>N2</span>
								<button type="button" className="grammar-summary__where" onClick={() => (here ? onReview(entry.ref[2]) : onOpenPoint?.(entry.ref))}>第{entry.ref[0]}週 第{entry.ref[1]}天 ›</button></div>
						</header>
						<p><span className="grammar-summary__against" lang="ja">对比本课<RubyHtml html={similarFurigana(entry.against)} />：</span>{entry.diff}</p>
						<div className="grammar-summary__example-body"><p className="jp" lang="ja"><RubyHtml html={similarFurigana(entry.example.jp)} /></p><p className="cn">{entry.example.cn}</p></div>
					</article>;
				})}
			</section>
			<p className="grammar-summary__note">{t("“N2 · 本课”标记学习位置；扩展表达等级按当前义项作备考参考，并非官方逐项分级。常用度表示使用场景，不是统计排名。", "N2 · this course marks the lesson location. Extension levels are study guides for the stated sense, not official item-by-item classifications. Usage labels describe contexts, not statistical rankings.")}</p>
		</div>
	</section>;
}

