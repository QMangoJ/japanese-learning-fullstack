import { useEffect, useMemo, useRef, useState, type PointerEvent, type RefObject } from "react";
import { redirect } from "react-router";

import {
	findListeningN2Chapter,
	findListeningN2Section,
	listeningN2PageSrc,
	listeningN2SectionDisc,
	listeningN2TrackSrc,
	type ListeningDisc,
} from "../data/listening-n2-book";
import { dayNeighbors, isFav, LANG, lx, navTo, registerFavMeta, toggleFav } from "../study/store";
import type { Route } from "./+types/listening-n2";
import { audioDurationOf, forwardTime, rewindTime, seekRatioFromClientX } from "./listening-n3";
import "./reading-n3.css";
import "./listening-n3.css";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "N2 听解 · 日本語上手" },
		{ name: "description", content: "N2 听解训练：按原书扫描页还原练习、答案与听力原文，并配对应音频。" },
	];
}

export function loader() {
	return redirect("/study?module=n2listening");
}

type AudioCue = { disc: ListeningDisc; track: number };

const audioLabel: Record<ListeningDisc, string> = { cd1: "CD 1", cd2: "CD 2" };

function cueLabel(cue: AudioCue) {
	return `${audioLabel[cue.disc]} · ${String(cue.track).padStart(2, "0")}`;
}

function formatTime(seconds: number) {
	if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
	const minutes = Math.floor(seconds / 60);
	const remainder = Math.floor(seconds % 60);
	return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

function CueButton({ cue, active, playing, onToggle, label }: { cue: AudioCue; active: AudioCue; playing: boolean; onToggle: (cue: AudioCue) => void; label: string }) {
	const isActive = active.disc === cue.disc && active.track === cue.track;
	const isPlaying = isActive && playing;
	return (
		<button className={`${isActive ? "on" : ""}${isPlaying ? " playing" : ""}`} onClick={() => onToggle(cue)} aria-label={`${label} ${cueLabel(cue)} ${isPlaying ? "暂停" : "播放"}`} aria-pressed={isPlaying}>
			{isPlaying ? "❚❚" : "▶"} {label}
			<small> {cueLabel(cue)}</small>
		</button>
	);
}

function ListeningSeekBar({ currentTime, duration, onSeek }: { currentTime: number; duration: number; onSeek: (time: number) => void }) {
	const trackRef = useRef<HTMLDivElement>(null);
	const ready = duration > 0;
	const ratio = ready ? Math.min(1, Math.max(0, currentTime / duration)) : 0;

	function seekFromPointer(event: PointerEvent<HTMLDivElement>) {
		const el = trackRef.current;
		if (!el || !ready) return;
		onSeek(seekRatioFromClientX(event.clientX, el.getBoundingClientRect()) * duration);
	}

	return (
		<div
			ref={trackRef}
			className={`listening-seek${ready ? "" : " is-disabled"}`}
			role="slider"
			aria-label="再生位置"
			aria-valuemin={0}
			aria-valuemax={ready ? Math.round(duration) : 0}
			aria-valuenow={ready ? Math.round(currentTime) : 0}
			aria-disabled={!ready}
			tabIndex={ready ? 0 : -1}
			onPointerDown={(event) => {
				if (!ready) return;
				event.preventDefault();
				event.currentTarget.setPointerCapture(event.pointerId);
				seekFromPointer(event);
			}}
			onPointerMove={(event) => {
				if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
				seekFromPointer(event);
			}}
			onKeyDown={(event) => {
				if (!ready) return;
				if (event.key === "ArrowRight" || event.key === "ArrowUp") {
					event.preventDefault();
					onSeek(Math.min(duration, currentTime + 5));
				} else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
					event.preventDefault();
					onSeek(Math.max(0, currentTime - 5));
				} else if (event.key === "Home") {
					event.preventDefault();
					onSeek(0);
				} else if (event.key === "End") {
					event.preventDefault();
					onSeek(duration);
				}
			}}
		>
			<div className="listening-seek__rail" />
			<div className="listening-seek__fill" style={{ width: `${ratio * 100}%` }} />
			<div className="listening-seek__thumb" style={{ left: `${ratio * 100}%` }} />
		</div>
	);
}

function ListeningPlayer({ cue, audioRef, onPlaybackChange }: { cue: AudioCue; audioRef: RefObject<HTMLAudioElement | null>; onPlaybackChange: (playing: boolean) => void }) {
	const [speed, setSpeed] = useState(1);
	const [loop, setLoop] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		if (audioRef.current) audioRef.current.playbackRate = speed;
	}, [audioRef, speed]);

	useEffect(() => {
		setCurrentTime(0);
		setDuration(0);
		setIsPlaying(false);
	}, [cue]);

	function togglePlayback() {
		const audio = audioRef.current;
		if (!audio) return;
		if (audio.paused) void audio.play().catch(() => undefined);
		else audio.pause();
	}

	function seek(nextTime: number, play = false) {
		const audio = audioRef.current;
		const limit = duration || (audio ? audioDurationOf(audio) : 0);
		const clamped = Math.min(Math.max(nextTime, 0), limit || nextTime);
		if (audio) audio.currentTime = clamped;
		setCurrentTime(clamped);
		if (play && audio?.paused) void audio.play().catch(() => undefined);
	}

	function syncDuration(audio: HTMLAudioElement) {
		const next = audioDurationOf(audio);
		if (next > 0) setDuration(next);
	}

	return (
		<section className="reader-section listening-player" aria-label="音声プレーヤー">
			<div className="listening-player__top">
				<button className={`listening-player__toggle${isPlaying ? " playing" : ""}`} onClick={togglePlayback} aria-label="再生または一時停止">
					{isPlaying ? "❚❚" : "▶"}
				</button>
				<button
					className="listening-player__rewind"
					onClick={() => seek(rewindTime(audioRef.current?.currentTime ?? currentTime))}
					aria-label="往前 3 秒"
				>
					<span aria-hidden="true">↶</span>
					<small aria-hidden="true">3</small>
				</button>
				<div>
					<span>音声</span>
					<strong>{cueLabel(cue)}</strong>
				</div>
				<div className="listening-speed" aria-label="再生速度">
					{[0.75, 1, 1.25].map((value) => (
						<button key={value} className={speed === value ? "on" : ""} onClick={() => setSpeed(value)}>
							{value}×
						</button>
					))}
					<button className={loop ? "on" : ""} onClick={() => setLoop((value) => !value)} aria-label="繰り返し再生">
						↻
					</button>
				</div>
			</div>
			<div className="listening-player__timeline">
				<span>{formatTime(currentTime)}</span>
				<ListeningSeekBar currentTime={currentTime} duration={duration} onSeek={(time) => seek(time, true)} />
				<span>{formatTime(duration)}</span>
			</div>
			<audio
				ref={audioRef}
				preload="metadata"
				loop={loop}
				src={listeningN2TrackSrc(cue.disc, cue.track)}
				onLoadedMetadata={(event) => {
					event.currentTarget.playbackRate = speed;
					syncDuration(event.currentTarget);
				}}
				onDurationChange={(event) => syncDuration(event.currentTarget)}
				onCanPlay={(event) => syncDuration(event.currentTarget)}
				onTimeUpdate={(event) => {
					syncDuration(event.currentTarget);
					setCurrentTime(event.currentTarget.currentTime);
				}}
				onPlay={() => {
					setIsPlaying(true);
					onPlaybackChange(true);
				}}
				onPause={() => {
					setIsPlaying(false);
					onPlaybackChange(false);
				}}
				onEnded={() => {
					setIsPlaying(false);
					onPlaybackChange(false);
				}}
			/>
		</section>
	);
}

function PageScan({ pages, heading, sub }: { pages: readonly number[]; heading: string; sub: string }) {
	const [open, setOpen] = useState<number | null>(null);
	useEffect(() => {
		if (open == null) return;
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(null);
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open]);
	if (!pages.length) return null;
	return (
		<section className="listening-scans">
			<p className="listening-scan-note">{sub}</p>
			{pages.map((page) => (
				<article className="listening-scan" key={page}>
					<header>
						<div>
							<span>原书 p.{page}</span>
							<h3>{heading}</h3>
						</div>
					</header>
					<figure>
						<button type="button" className="listening-scan__open" onClick={() => setOpen(page)} aria-label={`放大第 ${page} 页`}>
							<img src={listeningN2PageSrc(page)} alt={`N2 听解 p.${page}`} />
						</button>
					</figure>
				</article>
			))}
			{open != null ? (
				<div
					className="listening-scan-lightbox"
					role="dialog"
					aria-modal="true"
					aria-label="原书放大"
					onClick={(event) => {
						if (event.target === event.currentTarget) setOpen(null);
					}}
				>
					<button type="button" className="listening-scan-lightbox__close" onClick={() => setOpen(null)}>
						关闭放大页
					</button>
					{pages.map((page) => (
						<img key={page} src={listeningN2PageSrc(page)} alt={`N2 听解 p.${page}`} />
					))}
				</div>
			) : null}
		</section>
	);
}

function ChapterDetail({ chapterNumber, sectionNumber, hideBack = false }: { chapterNumber: number; sectionNumber: number; hideBack?: boolean }) {
	const chapter = findListeningN2Chapter(chapterNumber);
	const section = findListeningN2Section(chapterNumber, sectionNumber);
	const disc = listeningN2SectionDisc(chapterNumber, sectionNumber);
	const initialCue = useMemo<AudioCue>(() => ({ disc, track: section?.firstTrack ?? 1 }), [disc, section]);
	const [cue, setCue] = useState(initialCue);
	const [playRequest, setPlayRequest] = useState(0);
	const [playing, setPlaying] = useState(false);
	const [panel, setPanel] = useState<"lesson" | "script" | "translation">("lesson");
	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		setCue(initialCue);
		setPanel("lesson");
	}, [initialCue, chapterNumber, sectionNumber]);

	useEffect(() => {
		if (!playRequest) return;
		void audioRef.current?.play().catch(() => undefined);
	}, [cue, playRequest]);

	function toggleCue(next: AudioCue) {
		const sameCue = cue.disc === next.disc && cue.track === next.track;
		if (sameCue && audioRef.current && !audioRef.current.paused) {
			audioRef.current.pause();
			return;
		}
		setCue(next);
		setPlayRequest((value) => value + 1);
	}

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
			if (document.querySelector('[role="dialog"][aria-modal="true"]')) return;
			const target = event.target as HTMLElement | null;
			const tag = target?.tagName;
			if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || tag === "BUTTON" || tag === "A" || target?.isContentEditable || target?.getAttribute("role") === "slider") return;
			const audio = audioRef.current;
			if (!audio) return;
			const isToggleKey = event.key === "Enter" || event.code === "Space" || event.key === " ";
			const isSeekKey = event.key === "ArrowLeft" || event.key === "ArrowRight";
			if (!isToggleKey && !isSeekKey) return;
			event.preventDefault();
			event.stopImmediatePropagation();
			if (isToggleKey) {
				if (event.repeat) return;
				if (audio.paused) void audio.play().catch(() => undefined);
				else audio.pause();
				return;
			}
			const duration = audioDurationOf(audio);
			audio.currentTime = event.key === "ArrowLeft" ? rewindTime(audio.currentTime) : forwardTime(audio.currentTime, duration);
		};
		document.addEventListener("keydown", onKeyDown, true);
		return () => document.removeEventListener("keydown", onKeyDown, true);
	}, []);

	if (!chapter || !section) {
		return (
			<div className="reader-page reader-page--embedded">
				<div className="reader-wrap reader-layout">
					<main className="reader-main listening-detail">
						<p>未找到这一节听解内容。</p>
					</main>
				</div>
			</div>
		);
	}

	const lessonPages = section.pages.map((item) => item.page);
	const scriptNote = lx("练习、答案和听力原文都直接用原书页，避免转写出错。", "Exercises, answers and scripts are the original book pages.");

	return (
		<div className="reader-page reader-page--embedded">
			<div className="reader-wrap reader-layout">
				<main className="reader-main listening-detail">
					<header className="listening-crumb">
						{hideBack ? null : (
							<button className="listening-crumb__back" onClick={() => navTo("#/")} aria-label="聴解目次へ戻る">
								‹
							</button>
						)}
						<div className="listening-crumb__path">
							<span>
								N2 <ruby>聴解<rt>ちょうかい</rt></ruby>
							</span>
							<i>/</i>
							<b>
								第 {chapter.number} 章 / {section.number}
							</b>
						</div>
						<h1>{section.title}</h1>
					</header>
					<ListeningPlayer cue={cue} audioRef={audioRef} onPlaybackChange={setPlaying} />
					<div className="listening-exercise__tracks" style={{ margin: "0 0 14px" }}>
						{section.questions.map((question) =>
							question.tracks.map((track) => (
								<CueButton
									key={`${question.label}-${track}`}
									cue={{ disc, track }}
									active={cue}
									playing={playing}
									onToggle={toggleCue}
									label={question.label}
								/>
							)),
						)}
					</div>
					<div className="typebar" style={{ justifyContent: "flex-start", padding: "0 0 12px" }}>
						<button className={panel === "lesson" ? "on" : ""} onClick={() => setPanel("lesson")}>
							{lx("练习页", "Exercises")}
						</button>
						<button className={panel === "script" ? "on" : ""} onClick={() => setPanel("script")}>
							{lx("答案・原文", "Answers & script")}
						</button>
						<button className={panel === "translation" ? "on" : ""} onClick={() => setPanel("translation")}>
							{lx("译文", "Translation")}
						</button>
					</div>
					{panel === "lesson" ? <PageScan pages={lessonPages} heading={lx("练习 / 讲解", "Exercises")} sub={scriptNote} /> : null}
					{panel === "script" ? <PageScan pages={section.answerPages} heading={lx("答え・スクリプト", "Answers & script")} sub={lx("日文答案和听力原文，按原书扫描。", "Japanese answers and transcripts from the book.")} /> : null}
					{panel === "translation" ? (
						<PageScan
							pages={section.translationPages}
							heading={lx("译文", "Translation")}
							sub={lx("原书中文译文页。", "Chinese translation pages from the book.")}
						/>
					) : null}
					<ListeningSectionNav chapter={chapterNumber} section={sectionNumber} />
				</main>
			</div>
		</div>
	);
}

export function ListeningN2Content({
	chapter,
	section,
	embedded = false,
}: {
	chapter: number;
	section: number;
	embedded?: boolean;
}) {
	const found = findListeningN2Section(chapter, section);
	const titleText = found?.title ?? `第${chapter}章 ${section}节`;
	const favId = `n2listening#${chapter}-${section}`;
	registerFavMeta(favId, {
		module: "n2listening",
		hash: `#/day/${chapter}-${section}`,
		w: chapter,
		d: section,
		jp: titleText,
		cn: found?.title_cn || found?.subtitle || "",
	});
	return (
		<>
			<div style={{ display: "flex", justifyContent: "flex-end", maxWidth: 820, margin: "0 auto 8px", padding: "0 14px" }}>
				<button type="button" className="starb" onClick={() => toggleFav(favId)} aria-label="收藏本节">
					{isFav(favId) ? "★" : "☆"}
				</button>
			</div>
			<ChapterDetail key={`${chapter}-${section}`} chapterNumber={chapter} sectionNumber={section} hideBack={embedded} />
		</>
	);
}

function ListeningSectionNav({ chapter, section }: { chapter: number; section: number }) {
	const { prev, next } = dayNeighbors(chapter, section, "n2listening");
	const label = (item: [number, number, any]) =>
		lx(`第${item[0]}章 ${item[1]}节 · ${item[2].title || ""}`, `Ch. ${item[0]} §${item[1]} · ${item[2].title_en || item[2].title || ""}`);
	return (
		<nav className="listening-nav" aria-label={lx("章节切换", "Section navigation")}>
			<button type="button" disabled={!prev} onClick={() => prev && navTo(`#/day/${prev[0]}-${prev[1]}`)}>
				<small>{lx("上一节", "Previous")}</small>
				<b>{prev ? label(prev) : lx("已经是第一节", "First section")}</b>
			</button>
			<button type="button" disabled={!next} onClick={() => next && navTo(`#/day/${next[0]}-${next[1]}`)}>
				<small>{lx("下一节", "Next")}</small>
				<b>{next ? label(next) : lx("已经是最后一节", "Last section")}</b>
			</button>
		</nav>
	);
}

export default function ListeningN2() {
	return null;
}

void LANG;
