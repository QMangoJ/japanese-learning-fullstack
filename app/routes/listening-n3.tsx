import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { redirect } from "react-router";

import type { Route } from "./+types/listening-n3";
import "./reading-n3.css";
import "./listening-n3.css";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "N3 听解 · 日本語上手" },
		{ name: "description", content: "N3 听解训练：逐题题面、对应音频与变速播放器。" },
	];
}

export function loader() {
	return redirect("/study?module=listening");
}

type Disc = "cd1" | "cd2";
type AudioCue = { disc: Disc; track: number };
type ExercisePage = { readonly page: number; readonly tracks: readonly number[] };

const audioLabel: Record<Disc, string> = { cd1: "CD 1", cd2: "CD 2" };

const chapters = [
	{
		number: 1,
		title: "準備をしましょう",
		cn: "准备训练",
		pages: "练习页 8–23",
		description: "从发音、语法到会话表达，完成基础听辨训练。",
		focus: ["発音について", "文法", "会話表現"],
		disc: "cd1" as const,
		exercises: [
			{ page: 16, tracks: [2, 3, 4] }, { page: 18, tracks: [5, 6] }, { page: 20, tracks: [7, 8] },
			{ page: 22, tracks: [9, 10, 11] }, { page: 23, tracks: [12, 13] }, { page: 24, tracks: [14, 15] }, { page: 25, tracks: [16, 17] },
		],
	},
	{
		number: 2,
		title: "問題のパターンに慣れましょう",
		cn: "熟悉题目模式",
		pages: "练习页 24–37",
		description: "掌握提问方式、选项出现时机与不同题型的作答流程。",
		focus: ["何と言いますか", "要点理解", "概要理解", "即時応答"],
		disc: "cd1" as const,
		exercises: [
			{ page: 27, tracks: [19] }, { page: 28, tracks: [20, 21] }, { page: 29, tracks: [22] }, { page: 30, tracks: [23, 24, 25, 26] },
			{ page: 31, tracks: [27] }, { page: 32, tracks: [28, 29] }, { page: 33, tracks: [30, 31] }, { page: 34, tracks: [32, 33] },
			{ page: 35, tracks: [34] }, { page: 36, tracks: [35, 36] }, { page: 37, tracks: [37, 38, 39, 40, 41] }, { page: 38, tracks: [42, 43, 44] }, { page: 39, tracks: [45, 46, 47, 48] },
		],
	},
	{
		number: 3,
		title: "いろいろな場所で聞きましょう",
		cn: "在各种场所听",
		pages: "练习页 38–51",
		description: "通过街道、学校、职场等真实场景训练关键信息的捕捉。",
		focus: ["町で", "学校で", "職場で"],
		disc: "cd1" as const,
		exercises: [
			{ page: 42, tracks: [50, 51, 52] }, { page: 44, tracks: [53, 54, 55] }, { page: 46, tracks: [56, 57, 58] }, { page: 48, tracks: [59, 60, 61] },
			{ page: 50, tracks: [62, 63, 64] }, { page: 51, tracks: [65, 66, 67] }, { page: 52, tracks: [68, 69, 70] }, { page: 53, tracks: [71, 72] },
		],
	},
	{
		number: 4,
		title: "いろいろな内容を聞きましょう",
		cn: "听各种内容",
		pages: "练习页 52–63",
		description: "围绕人物、物品、数字与内容主旨进行综合理解。",
		focus: ["人・物", "数・数字・計算", "内容理解"],
		disc: "cd2" as const,
		exercises: [
			{ page: 56, tracks: [2, 3, 4] }, { page: 58, tracks: [5, 6, 7] }, { page: 60, tracks: [8, 9, 10] }, { page: 62, tracks: [11, 12, 13] },
			{ page: 63, tracks: [14, 15, 16] }, { page: 64, tracks: [17, 18, 19] }, { page: 65, tracks: [20, 21] },
		],
	},
	{
		number: 5,
		title: "総まとめ問題",
		cn: "综合练习",
		pages: "练习页 64–71",
		description: "以综合题回顾全部题型与解题顺序。",
		focus: ["内容理解", "要点理解", "概要理解", "即時応答"],
		disc: "cd2" as const,
		exercises: [
			{ page: 67, tracks: [22] }, { page: 68, tracks: [23, 24, 25] }, { page: 69, tracks: [26, 27] }, { page: 70, tracks: [28, 29, 30] },
			{ page: 71, tracks: [31, 32] }, { page: 72, tracks: [33, 34, 35] }, { page: 73, tracks: [36, 37, 38] }, { page: 74, tracks: [39, 40, 41, 42, 43, 44, 45] },
		],
	},
] as const;

function trackSource({ disc, track }: AudioCue) {
	const prefix = disc === "cd1" ? "CD01" : "CD02";
	return `/audio/n3/${disc}/${prefix}_${String(track).padStart(2, "0")}.mp3`;
}

function pageSource(page: number) {
	return `/listening/n3/pages/${String(page).padStart(3, "0")}.jpg`;
}

function cueLabel(cue: AudioCue) {
	return `${audioLabel[cue.disc]} · ${String(cue.track).padStart(2, "0")}`;
}

function ListeningPlayer({ cue, audioRef, onChange }: { cue: AudioCue; audioRef: RefObject<HTMLAudioElement | null>; onChange: (cue: AudioCue) => void }) {
	const [speed, setSpeed] = useState(1);
	const [loop, setLoop] = useState(false);

	useEffect(() => {
		if (audioRef.current) audioRef.current.playbackRate = speed;
	}, [audioRef, speed]);

	return <section className="reader-section listening-player" aria-label="音频播放器">
		<div className="reader-section-head"><span>当前音频</span><h2>{cueLabel(cue)}</h2><p>拖动进度条定位；可切换慢速、变速与单曲循环。</p></div>
		<div className="listening-player__controls"><div className="listening-speed" aria-label="播放速度">{[0.75, 1, 1.25].map((value) => <button key={value} className={speed === value ? "on" : ""} onClick={() => setSpeed(value)}>{value}×</button>)}<button className={loop ? "on" : ""} onClick={() => setLoop((value) => !value)}>{loop ? "单曲循环中" : "单曲循环"}</button></div><button className="listening-player__next" onClick={() => onChange({ disc: cue.disc, track: cue.track + 1 })}>下一音轨 ›</button></div>
		<audio ref={audioRef} controls preload="metadata" loop={loop} src={trackSource(cue)} onLoadedMetadata={(event) => { event.currentTarget.playbackRate = speed; }} />
	</section>;
}

function ExerciseCard({ exercise, disc, active, onPlay }: { exercise: ExercisePage; disc: Disc; active: AudioCue; onPlay: (cue: AudioCue) => void }) {
	return <article className="listening-exercise">
		<header><div><span>题面 · 练习页 {exercise.page - 3}</span><h3>本页听力练习</h3></div><div className="listening-exercise__tracks">{exercise.tracks.map((track) => {
			const cue = { disc, track };
			const isActive = active.disc === disc && active.track === track;
			return <button className={isActive ? "on" : ""} key={track} onClick={() => onPlay(cue)} aria-pressed={isActive}>▶ {cueLabel(cue)}</button>;
		})}</div></header>
		<p>点击对应音轨即可播放；题干、选项、插图和日文注音按练习页原样呈现。</p>
		<figure><img loading="lazy" src={pageSource(exercise.page)} alt={`N3 听解练习页 ${exercise.page - 3}，对应 ${exercise.tracks.map((track) => cueLabel({ disc, track })).join("、")}`} /></figure>
	</article>;
}

function ListeningCatalog({ onSelect }: { onSelect: (index: number) => void }) {
	return <div className="reader-page reader-page--embedded"><div className="reader-wrap reader-layout"><main className="reader-main reader-catalog listening-catalog">
		<div className="reader-catalog-intro"><span>N3 聴解</span><h1>N3 听解训练</h1><p>5 个训练章节 · 逐题音频 · 点击进入练习</p></div>
		{chapters.map((chapter, index) => <section className="reader-week-card listening-chapter-card" key={chapter.number}><button className="reader-week-card__toggle" onClick={() => onSelect(index)}><div><span>第 {chapter.number} 章</span><h2>{chapter.title}</h2><p>{chapter.cn} · {chapter.description}</p></div><b>进入练习　›</b></button><div className="listening-chapter-card__meta"><span>{chapter.pages}</span><div>{chapter.focus.map((item) => <i key={item}>{item}</i>)}</div></div></section>)}
	</main></div></div>;
}

function ChapterDetail({ chapterIndex, onBack }: { chapterIndex: number; onBack: () => void }) {
	const chapter = chapters[chapterIndex];
	const initialCue = useMemo<AudioCue>(() => ({ disc: chapter.disc, track: chapter.exercises[0].tracks[0] }), [chapter]);
	const [cue, setCue] = useState(initialCue);
	const [playRequest, setPlayRequest] = useState(0);
	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		if (!playRequest) return;
		void audioRef.current?.play().catch(() => undefined);
	}, [cue, playRequest]);

	function chooseCue(next: AudioCue) {
		setCue(next);
		setPlayRequest((value) => value + 1);
	}

	function nextCue(next: AudioCue) {
		const chapterTracks = chapter.exercises.flatMap((exercise) => exercise.tracks);
		const index = chapterTracks.indexOf(cue.track);
		const following = chapterTracks[index + 1] ?? chapterTracks[0];
		chooseCue({ disc: chapter.disc, track: next.disc === chapter.disc ? following : chapterTracks[0] });
	}

	return <div className="reader-page reader-page--embedded"><div className="reader-wrap reader-layout"><main className="reader-main listening-detail">
		<section className="reader-hero reader-studybar"><div className="reader-breadcrumb"><span>N3 聴解</span><span>/</span><b>第 {chapter.number} 章</b></div><div className="reader-studybar__body"><div><button className="reader-back" onClick={onBack}>‹ 听解目录</button><span>第 {chapter.number} 章</span><h1>{chapter.title}</h1><p>{chapter.cn}</p></div></div></section>
		<section className="reader-section listening-source"><div className="reader-section-head"><span>训练内容</span><h2>{chapter.cn}</h2><p>{chapter.description}</p></div><div className="listening-source__grid"><div><b>练习范围</b><p>{chapter.pages}</p></div><div><b>本章重点</b><p>{chapter.focus.join(" · ")}</p></div><div><b>学习顺序</b><p>阅读题面，点击就近音轨作答，再用播放器复听。</p></div></div></section>
		<ListeningPlayer cue={cue} audioRef={audioRef} onChange={nextCue} />
		<section className="listening-exercises"><div className="reader-section-head"><span>逐题练习</span><h2>题面与音频对应</h2><p>每个播放按钮均按照题面印刷的 CD 与音轨编号校对。</p></div>{chapter.exercises.map((exercise) => <ExerciseCard key={exercise.page} exercise={exercise} disc={chapter.disc} active={cue} onPlay={chooseCue} />)}</section>
	</main></div></div>;
}

export function ListeningN3Content({ embedded = false }: { embedded?: boolean }) {
	const [activeChapter, setActiveChapter] = useState<number | null>(null);
	if (!embedded) return <ListeningCatalog onSelect={setActiveChapter} />;
	return activeChapter === null ? <ListeningCatalog onSelect={setActiveChapter} /> : <ChapterDetail key={activeChapter} chapterIndex={activeChapter} onBack={() => setActiveChapter(null)} />;
}

export default function ListeningN3() {
	return <ListeningN3Content />;
}
