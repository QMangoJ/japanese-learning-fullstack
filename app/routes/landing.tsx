import { Link, redirect } from "react-router";

import type { Route } from "./+types/landing";
import "./landing.css";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "日本語上手 · 有计划地学日语" },
		{
			name: "description",
			content: "N4、N3、N2 日语学习计划：语法、词汇、汉字、练习与详细解析。",
		},
	];
}

// 个人使用阶段直接进入学习区；门户页保留，待登录/公开展示启用后再恢复。
export function loader() {
	return redirect("/study");
}

const levels = [
	{ level: "N4", label: "入门", grammar: "4 周 28 天", vocab: "6 周", kanji: "3 周" },
	{ level: "N3", label: "主线", grammar: "6 周 42 天", vocab: "6 周", kanji: "6 周", featured: true },
	{ level: "N2", label: "进阶", grammar: "8 周 56 天", vocab: "8 周", kanji: "8 周" },
];

const features = [
	["ふ", "假名注音", "汉字上方自动标假名，一键开关。"],
	["🔊", "日语朗读", "例句和单词点着就能听。"],
	["🗂", "记忆卡", "任意模块或收藏都能变成闪卡。"],
	["☆", "收藏 · 生词本", "点个星就进本子，可跨设备同步。"],
	["✎", "错题本", "自己录入错题和记不住的词。"],
	["⌕", "跨模块搜索", "语法和词汇可以一起查。"],
	["中 / EN", "双语学习", "按需要显示中文或英文解释。"],
	["☾", "深色模式", "跟随系统，地铁上也好读。"],
];

const steps = [
	["01", "选级别与模块", "从 N4、N3、N2 中选择当前目标，再选语法、词汇或汉字。"],
	["02", "按「周—天」往下走", "每天都是一节完整内容；看完直接进入下一天，不用自己排计划。"],
	["03", "做题，再看答案", "答案默认折叠。先独立作答，再看翻译和详细解法。"],
	["04", "不会的点收进生词本", "点星标或划词收藏；错题与易忘内容也可以自己记录。"],
	["05", "第二天先刷闪卡", "用收藏快速复习昨天，再开始今天的学习。"],
];

function StudyLink({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<Link className={className} to="/study">
			{children}
		</Link>
	);
}

export default function Landing() {
	return (
		<div className="landing">
			<header className="landing-header">
				<div className="landing-wrap landing-nav">
					<Link className="landing-brand" to="/">日本語上手</Link>
					<nav aria-label="首页导航">
						<a href="#preface">前言</a>
						<a href="#contents">内容与功能</a>
						<a href="#howto">使用指南</a>
						<a href="#faq">常见问题</a>
					</nav>
					<StudyLink className="nav-cta">进入学习区</StudyLink>
				</div>
			</header>

			<main>
				<section className="hero">
					<div className="landing-wrap hero-grid">
						<div className="hero-rule" />
						<div className="hero-copy">
							<div className="eyebrow">JLPT N4 · N3 · N2 ／ 语法・词汇・汉字</div>
							<h1>学日语没有捷径，<br />但可以不用自己排计划。</h1>
							<p>一个日语学习者，把自己每天学的东西做成了一套系统：每天学什么、每个级别学到哪、每道题怎么解，全都写好了。</p>
							<div className="hero-actions">
								<StudyLink className="button button-primary">进入知识库 <span>→</span></StudyLink>
								<a className="button button-quiet" href="#howto">先看使用指南</a>
							</div>
						<div className="hero-stats"><span>55 周课程</span><span>9 个模块</span><Link to="/reading/n3">N3 读解训练</Link><span>手机 / 电脑都能用</span></div>
						</div>
						<div className="hero-japanese" aria-label="継続は力なり">
							<span>坚持，就是力量</span><strong>継続は力なり</strong>
						</div>
					</div>
				</section>

				<section className="landing-wrap preface" id="preface">
					<div className="prose">
						<div className="section-label"><h2>前言</h2><span>PREFACE</span></div>
						<p>我是一个日语学习者。这里的内容是我一边学习一边积累的学习材料，并根据自己的学习需求，衍生出了这一套学习系统。系统里的功能都是我亲自使用过、觉得非常实用的。</p>
						<p>关于学习语言，我总结的经验就是要坚持。没有每一种方法都完美，但你一定要让自己持续学习。</p>
						<blockquote>语言学习是复利，不是加法。今天记住的十个词，会让明天的句子少查两次词典，让下周的阅读快一点。</blockquote>
					</div>
					<div className="planned-card">
						<p className="micro-heading">已经替你规划好的四件事</p>
						{["每天都分配好了具体的学习内容", "明确每一个级别需要学习哪些东西", "规定了各个模块的学习方向", "配备练习、答案、翻译与详细解法"].map((item, index) => (
							<div className="planned-item" key={item}><span>{"一二三四"[index]}</span><p>{item}</p></div>
						))}
					</div>
				</section>

				<section className="contents" id="contents">
					<div className="landing-wrap">
						<div className="section-label section-label-dark"><h2>内容与功能</h2><span>WHAT&apos;S INSIDE</span></div>
						<p className="section-lead">三个级别 × 语法、词汇、汉字，共九个模块，按「周—天」排好；再配上收藏、闪卡、错题本和搜索。</p>
						<h3 className="subsection-heading">一 ／ 内容 <small>CURRICULUM</small></h3>
						<div className="level-list">
							{levels.map((item) => (
								<article className={`level-card ${item.featured ? "featured" : ""}`} key={item.level}>
									{item.featured && <span className="featured-label">内容最全</span>}
									<div><b>{item.level}</b><span>{item.label}</span></div>
									<ul><li><strong>📘 语法</strong> · {item.grammar}</li><li><strong>📗 词汇</strong> · {item.vocab}</li><li><strong>📙 汉字</strong> · {item.kanji}</li></ul>
								</article>
							))}
						</div>
						<div className="common-preview">
							<h3 className="subsection-heading">通用知识 <small>GENERAL REFERENCE</small></h3>
							<div className="reference-grid">
								{[["活用一覧", "普通形・丁寧形・尊敬語", "学生だ ／ 学生です ／ 学生でいらっしゃいます"], ["数の表現", "数字表达速查", "は行量词：1・6・8・10 → ぱ行"], ["接続の表示方法", "接续符号对照表", "Vる ＝ 基本形〈辞书形〉"]].map(([label, title, example]) => <div className="reference-card" key={label}><span>{label}</span><h4>{title}</h4><p>把学习时最常用、又不属于某一周的知识整理成随时可查的参考页。</p><code>{example}</code></div>)}
							</div>
						</div>
					</div>
				</section>

				<section className="landing-wrap howto" id="howto">
					<div className="section-label"><h2>如何使用</h2><span>HOW TO USE</span></div>
					<p className="section-lead light">建议每天一次，一次一「天」的量。打开知识库后，从你的当前目标开始即可。</p>
					<div className="steps">{steps.map(([number, title, description]) => <article key={number}><span>STEP {number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
					<div className="howto-cta"><div>每天二十分钟，<br />比周末补三小时管用。</div><StudyLink>现在开始 →</StudyLink></div>
				</section>

				<section className="features">
					<div className="landing-wrap"><div className="section-label section-label-dark"><h2>功能</h2><span>FEATURES</span></div><p className="section-lead">每一个都是为了更顺畅地坚持学习，而不是为了凑数。</p><div className="feature-grid">{features.map(([icon, title, text]) => <article key={title}><span>{icon}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div>
				</section>

				<section className="landing-wrap faq" id="faq">
					<div className="section-label"><h2>常见问题</h2><span>FAQ</span></div>
					<details open><summary>现在可以学到什么？</summary><p>目前知识库中的 N4、N3、N2 课程均可直接使用，包含课程内容、练习、答案、收藏与错题本。</p></details>
					<details><summary>每天需要花多长时间？</summary><p>一「天」的量大约二十到三十分钟，包含阅读、做题和对答案。</p></details>
					<details><summary>需要注册吗？</summary><p>不用也可以学，课程和进度都在这台设备上。想跨设备同步收藏和错题，用 Google 登录即可。</p></details>
				</section>
			</main>
			<footer className="landing-footer"><div className="landing-wrap"><span>日本語上手</span><StudyLink>开始学习 →</StudyLink></div></footer>
		</div>
	);
}
