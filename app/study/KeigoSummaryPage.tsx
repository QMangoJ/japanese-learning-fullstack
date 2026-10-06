import { RubyHtml } from "../routes/study-common";
import keigo from "../data/common-keigo.json";
import { lx, navTo } from "./store";

type Section = {
	id: string;
	title_html: string;
	title_cn: string;
	title_en: string;
	rule_cn: string;
	rule_en: string;
	heads: string[];
	rows: string[][];
	note_cn?: string;
	note_en?: string;
};

const data = keigo as {
	intro_cn: string;
	intro_en: string;
	sections: Section[];
	examples: {
		title_html: string;
		title_cn: string;
		title_en: string;
		rows: string[][];
	};
};

function jump(id: string) {
	document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Rich({ text }: { text: string }) {
	if (!text.includes("<ruby") && !text.includes("<u>")) return text;
	return <RubyHtml html={text} />;
}

function Grid({ heads, rows }: { heads: string[]; rows: string[][] }) {
	return (
		<div className="table-scroll">
			<table className="ref verb-sum-table">
				<thead>
					<tr>
						{heads.map((head) => (
							<th key={head}>{head}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row, index) => (
						<tr key={index}>
							{row.map((cell, cellIndex) => (
								<td key={cellIndex} className="jp">
									<Rich text={cell} />
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export function KeigoSummaryPage() {
	return (
		<div className="verb-sum">
			<p className="meta verb-sum-lead">{lx(data.intro_cn, data.intro_en)}</p>
			<p className="meta">
				<button type="button" className="side-item" style={{ display: "inline-flex", width: "auto", padding: "4px 10px" }} onClick={() => navTo("#/katsuyou")}>
					{lx("名词和形容词的敬语程度见「活用」", "Noun and adjective levels are on Conjugation")}
				</button>
			</p>
			<div className="verb-sum-nav">
				{data.sections.map((section) => (
					<button key={section.id} type="button" onClick={() => jump(`keigo-${section.id}`)}>
						<span className="jp verb-sum-form">
							<RubyHtml html={section.title_html} />
						</span>
					</button>
				))}
				<button type="button" onClick={() => jump("keigo-examples")}>
					<span className="jp verb-sum-form">
						<RubyHtml html={data.examples.title_html} />
					</span>
				</button>
			</div>
			{data.sections.map((section) => (
				<section className="card" id={`keigo-${section.id}`} key={section.id}>
					<h2 className="jp">
						<span className="verb-sum-form">
							<RubyHtml html={section.title_html} />
						</span>{" "}
						<span className="meta">{lx(section.title_cn, section.title_en)}</span>
					</h2>
					<p className="meta">{lx(section.rule_cn, section.rule_en)}</p>
					<Grid heads={section.heads} rows={section.rows} />
					{section.note_cn ? <p className="meta">{lx(section.note_cn, section.note_en || "")}</p> : null}
				</section>
			))}
			<section className="card" id="keigo-examples">
				<h2 className="jp">
					<span className="verb-sum-form">
						<RubyHtml html={data.examples.title_html} />
					</span>{" "}
					<span className="meta">{lx(data.examples.title_cn, data.examples.title_en)}</span>
				</h2>
				<Grid heads={[lx("场面", "Situation"), lx("说法", "What to say"), lx("原因", "Why")]} rows={data.examples.rows} />
			</section>
		</div>
	);
}
