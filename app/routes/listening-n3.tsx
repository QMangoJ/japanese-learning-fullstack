import { useMemo, useRef, useState } from "react";
import { redirect } from "react-router";

import type { Route } from "./+types/listening-n3";
import "./reading-n3.css";
import "./listening-n3.css";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "N3 听解 · 日本語上手" },
		{ name: "description", content: "《新日语能力考试考前对策 N3 听力》：原书五章结构与 117 条原版音轨。" },
	];
}

// Keep a direct URL useful while the learning experience itself lives in the study shell.
export function loader() {
	return redirect("/study?module=listening");
}

const chapters = [
	{ number: 1, title: "準備をしましょう", cn: "准备训练", pages: "原书第 8–23 页", pdfStart: 11, pdfEnd: 26, description: "先完成发音、语法和会话表达的基础听辨训练。", focus: ["発音について", "文法", "会話表現"] },
	{ number: 2, title: "問題のパターンに慣れましょう", cn: "熟悉题目模式", pages: "原书第 24–37 页", pdfStart: 27, pdfEnd: 40, description: "按考试题型掌握提问方式、选项出现时机与作答流程。", focus: ["何と言いますか", "要点理解", "概要理解", "即時応答"] },
	{ number: 3, title: "いろいろな場所で聞きましょう", cn: "在各种场所听", pages: "原书第 38–51 页", pdfStart: 41, pdfEnd: 54, description: "通过街道、学校、职场等真实场景训练抓取关键信息。", focus: ["町で", "学校で", "職場で"] },
	{ number: 4, title: "いろいろな内容を聞きましょう", cn: "听各种内容", pages: "原书第 52–63 页", pdfStart: 55, pdfEnd: 66, description: "围绕人物、物品、数字与内容主旨进行综合理解。", focus: ["人・物", "数・数字・計算", "内容理解"] },
	{ number: 5, title: "総まとめ問題", cn: "综合练习", pages: "原书第 64–74 页", pdfStart: 67, pdfEnd: 77, description: "以综合题回顾全部题型与解题顺序。", focus: ["内容理解", "要点理解", "概要理解", "即時応答"] },
] as const;

type Disc = "cd1" | "cd2";
const discs: { id: Disc; label: string; count: number; prefix: string }[] = [
	{ id: "cd1", label: "CD 1", count: 72, prefix: "CD01" },
	{ id: "cd2", label: "CD 2", count: 45, prefix: "CD02" },
];

function trackSource(disc: Disc, number: number) {
	const item = discs.find((value) => value.id === disc)!;
	return `/audio/n3/${disc}/${item.prefix}_${String(number).padStart(2, "0")}.mp3`;
}

function pageSource(page: number) {
	return `/listening/n3/pages/${String(page).padStart(3, "0")}.jpg`;
}

function AudioDeck() {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [disc, setDisc] = useState<Disc>("cd1");
	const [track, setTrack] = useState(1);
	const [speed, setSpeed] = useState(1);
	const [loop, setLoop] = useState(false);
	const currentDisc = discs.find((value) => value.id === disc)!;
	const tracks = useMemo(() => Array.from({ length: currentDisc.count }, (_, index) => index + 1), [currentDisc.count]);

	function selectDisc(next: Disc) {
		setDisc(next);
		setTrack(1);
	}

	function selectTrack(next: number) {
		setTrack(next);
		window.setTimeout(() => void audioRef.current?.play().catch(() => undefined), 0);
	}

	return <section className="reader-section listening-deck">
		<div className="reader-section-head"><span>音声資料</span><h2>原版 CD 音轨</h2><p>按原光盘顺序播放。Track 名称不被改写为题目，避免未经校对的错配。</p></div>
		<div className="listening-disc-tabs" role="tablist" aria-label="听力光盘选择">{discs.map((item) => <button key={item.id} role="tab" aria-selected={disc === item.id} className={disc === item.id ? "on" : ""} onClick={() => selectDisc(item.id)}>{item.label}<small>{item.count} tracks</small></button>)}</div>
		<div className="listening-now"><div><span>{currentDisc.label} · Track {String(track).padStart(2, "0")}</span><p>《新日语能力考试考前对策 N3 听力》原版音频</p></div><div className="listening-speed" aria-label="播放速度">{[0.75, 1, 1.25].map((value) => <button key={value} className={speed === value ? "on" : ""} onClick={() => { setSpeed(value); if (audioRef.current) audioRef.current.playbackRate = value; }}>{value}×</button>)}<button className={loop ? "on" : ""} onClick={() => setLoop((value) => !value)}>{loop ? "单曲循环中" : "单曲循环"}</button></div></div>
		<audio ref={audioRef} controls preload="metadata" loop={loop} src={trackSource(disc, track)} onLoadedMetadata={(event) => { event.currentTarget.playbackRate = speed; }} />
		<div className="listening-track-grid" aria-label={`${currentDisc.label} 音轨`}>{tracks.map((item) => <button key={item} className={track === item ? "on" : ""} onClick={() => selectTrack(item)} aria-label={`播放 ${currentDisc.label} Track ${item}`}><span>{String(item).padStart(2, "0")}</span>{track === item && <b>播放中</b>}</button>)}</div>
	</section>;
}

function ListeningCatalog({ onSelect }: { onSelect: (index: number) => void }) {
	return <div className="reader-page reader-page--embedded"><div className="reader-wrap reader-layout"><main className="reader-main reader-catalog listening-catalog">
		<div className="reader-catalog-intro"><span>N3 聴解</span><h1>《新日语能力考试考前对策》</h1><p>原书 5 章 · 117 条原版 CD 音轨 · 按章节进入训练</p></div>
		{chapters.map((chapter, index) => <section className="reader-week-card listening-chapter-card" key={chapter.number}><button className="reader-week-card__toggle" onClick={() => onSelect(index)}><div><span>第 {chapter.number} 章</span><h2>{chapter.title}</h2><p>{chapter.cn} · {chapter.description}</p></div><b>进入学习　›</b></button><div className="listening-chapter-card__meta"><span>{chapter.pages}</span><div>{chapter.focus.map((item) => <i key={item}>{item}</i>)}</div></div></section>)}
	</main></div></div>;
}

function ChapterDetail({ chapterIndex, onBack }: { chapterIndex: number; onBack: () => void }) {
	const chapter = chapters[chapterIndex];
	return <div className="reader-page reader-page--embedded"><div className="reader-wrap reader-layout"><main className="reader-main listening-detail">
		<section className="reader-hero reader-studybar"><div className="reader-breadcrumb"><span>N3 聴解</span><span>/</span><b>第 {chapter.number} 章</b></div><div className="reader-studybar__body"><div><button className="reader-back" onClick={onBack}>‹ 听解目录</button><span>第 {chapter.number} 章</span><h1>{chapter.title}</h1><p>{chapter.cn}</p></div></div></section>
		<section className="reader-section listening-source"><div className="reader-section-head"><span>教材结构</span><h2>{chapter.cn}</h2><p>{chapter.description}</p></div><div className="listening-source__grid"><div><b>原书位置</b><p>{chapter.pages}</p></div><div><b>本章重点</b><p>{chapter.focus.join(" · ")}</p></div><div><b>学习顺序</b><p>先听音频作答，再对照原书题面、答案与脚本复盘。</p></div></div></section>
		<AudioDeck />
		<section className="reader-section listening-integrity"><div className="reader-section-head"><span>原书题面</span><h2>PDF 内容原样保留</h2><p>题干、选项、插图与日文注音以原书扫描页呈现，不改写、不补造。答案、听力原文与译文仍保留在原书附录，待按题号完成音轨对应后再拆分展示。</p></div><details className="listening-pages"><summary>展开第 {chapter.number} 章原书题面（{chapter.pdfEnd - chapter.pdfStart + 1} 页）</summary><div>{Array.from({ length: chapter.pdfEnd - chapter.pdfStart + 1 }, (_, index) => chapter.pdfStart + index).map((page) => <figure key={page}><img loading="lazy" src={pageSource(page)} alt={`N3 听力第 ${chapter.number} 章原书第 ${page} 页`} /><figcaption>原书第 {page - 3} 页</figcaption></figure>)}</div></details></section>
	</main></div></div>;
}

export function ListeningN3Content({ embedded = false }: { embedded?: boolean }) {
	const [activeChapter, setActiveChapter] = useState<number | null>(null);
	if (!embedded) return <ListeningCatalog onSelect={setActiveChapter} />;
	return activeChapter === null ? <ListeningCatalog onSelect={setActiveChapter} /> : <ChapterDetail chapterIndex={activeChapter} onBack={() => setActiveChapter(null)} />;
}

export default function ListeningN3() {
	return <ListeningN3Content />;
}
