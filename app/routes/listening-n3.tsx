import { Fragment, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { redirect } from "react-router";

import { findListeningChapter, findListeningSection, type ListeningDisc } from "../data/listening-n3-book";
import { getListeningLesson } from "../data/listening-n3-lessons";
import type { ListeningLesson, ListeningLessonBlock } from "../data/listening-n3-lesson-types";
import { isFav, LANG, navTo, registerFavMeta, toggleFav } from "../study/store";
import type { Route } from "./+types/listening-n3";
import "./reading-n3.css";
import "./listening-n3.css";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "N3 听解 · 日本語上手" },
		{ name: "description", content: "N3 听解训练：按原书结构还原说明、插图与练习，并配对应音频。" },
	];
}

export function loader() {
	return redirect("/study?module=listening");
}

type AudioCue = { disc: ListeningDisc; track: number };

const audioLabel: Record<ListeningDisc, string> = { cd1: "CD 1", cd2: "CD 2" };

function trackSource({ disc, track }: AudioCue) {
	const prefix = disc === "cd1" ? "CD01" : "CD02";
	return `/audio/n3/${disc}/${prefix}_${String(track).padStart(2, "0")}.mp3`;
}

function cueLabel(cue: AudioCue) {
	return `${audioLabel[cue.disc]} · ${String(cue.track).padStart(2, "0")}`;
}

function formatTime(seconds: number) {
	if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
	const minutes = Math.floor(seconds / 60);
	const remainder = Math.floor(seconds % 60);
	return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

function CueButton({ cue, active, playing, onToggle }: { cue: AudioCue; active: AudioCue; playing: boolean; onToggle: (cue: AudioCue) => void }) {
	const isActive = active.disc === cue.disc && active.track === cue.track;
	const isPlaying = isActive && playing;
	return (
		<button className={`${isActive ? "on" : ""}${isPlaying ? " playing" : ""}`} onClick={() => onToggle(cue)} aria-label={`${cueLabel(cue)} ${isPlaying ? "暂停" : "播放"}`} aria-pressed={isPlaying}>
			{isPlaying ? "❚❚" : "▶"} {cueLabel(cue)}
		</button>
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

	function seek(nextTime: number) {
		if (audioRef.current) audioRef.current.currentTime = nextTime;
		setCurrentTime(nextTime);
	}

	return (
		<section className="reader-section listening-player" aria-label="音声プレーヤー">
			<div className="listening-player__top">
				<button className={`listening-player__toggle${isPlaying ? " playing" : ""}`} onClick={togglePlayback} aria-label="再生または一時停止">
					{isPlaying ? "❚❚" : "▶"}
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
				<input aria-label="再生位置" type="range" min="0" max={duration || 0} step="0.1" value={Math.min(currentTime, duration || 0)} disabled={!duration} onChange={(event) => seek(Number(event.currentTarget.value))} />
				<span>{formatTime(duration)}</span>
			</div>
			<audio
				ref={audioRef}
				preload="metadata"
				loop={loop}
				src={trackSource(cue)}
				onLoadedMetadata={(event) => {
					event.currentTarget.playbackRate = speed;
					setDuration(event.currentTarget.duration);
				}}
				onDurationChange={(event) => setDuration(event.currentTarget.duration)}
				onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
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

const RUBY = /\{([^{}|]+)\|([^{}|]+)\}/g;

function Jp({ text }: { text: string }) {
	const parts: (string | { base: string; reading: string })[] = [];
	let cursor = 0;
	for (const match of text.matchAll(RUBY)) {
		if (match.index! > cursor) parts.push(text.slice(cursor, match.index));
		parts.push({ base: match[1], reading: match[2] });
		cursor = match.index! + match[0].length;
	}
	if (cursor < text.length) parts.push(text.slice(cursor));
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

function Line({ text }: { text: string }) {
	return (
		<>
			{text.split("\n").map((line, index) => (
				<Fragment key={index}>
					{index ? <br /> : null}
					<Jp text={line} />
				</Fragment>
			))}
		</>
	);
}

function LessonBlocks({
	blocks,
	disc,
	active,
	playing,
	onToggle,
}: {
	blocks: readonly ListeningLessonBlock[];
	disc: ListeningDisc;
	active: AudioCue;
	playing: boolean;
	onToggle: (cue: AudioCue) => void;
}) {
	const showCn = LANG !== "en";
	return (
		<section className="listening-lesson">
			{blocks.map((block, index) => {
				switch (block.type) {
					case "hero":
						return (
							<header className="listening-lesson__hero" key={index}>
								<span>第 {block.no} 節</span>
								<h2>
									<Jp text={block.title} />
									{block.kana ? <small>{block.kana}</small> : null}
								</h2>
								<p>
									{[block.en, showCn ? block.cn : null, block.kr].filter(Boolean).join(" · ")}
								</p>
							</header>
						);
					case "slogan":
						return (
							<div className="listening-lesson__slogan" key={index}>
								<b>
									<Jp text={block.jp} />
								</b>
								{block.en ? <p>{block.en}</p> : null}
								{showCn && block.cn ? <p>{block.cn}</p> : null}
								{block.kr ? <p>{block.kr}</p> : null}
							</div>
						);
					case "h":
						return (
							<h3 className="listening-lesson__h" key={index}>
								<Jp text={block.jp} />
								{showCn && block.cn ? <small>{block.cn}</small> : null}
							</h3>
						);
					case "p":
						return (
							<p className="listening-lesson__p" key={index}>
								<Line text={block.jp} />
								{showCn && block.cn ? <span className="listening-lesson__cn">{block.cn}</span> : null}
								{block.en ? <span className="listening-lesson__en">{block.en}</span> : null}
							</p>
						);
					case "tip":
						return (
							<aside className="listening-lesson__tip" key={index}>
								<b>
									<Jp text={block.jp} />
								</b>
								{block.en ? <p>{block.en}</p> : null}
								{showCn && block.cn ? <p>{block.cn}</p> : null}
								{block.kr ? <p>{block.kr}</p> : null}
							</aside>
						);
					case "steps":
						return (
							<div className="listening-lesson__steps" key={index}>
								<span>{block.label}</span>
								<ol>
									{block.items.map((item) => (
										<li key={item}>
											<Jp text={item} />
										</li>
									))}
								</ol>
							</div>
						);
					case "table":
						return (
							<div className="listening-lesson__table" key={index}>
								{block.title ? <b>{block.title}</b> : null}
								<table>
									<tbody>
										{block.rows.map((row, rowIndex) => (
											<tr key={rowIndex}>
												{row.map((cell, cellIndex) => (
													<td key={cellIndex}>
														<Line text={cell} />
													</td>
												))}
											</tr>
										))}
									</tbody>
								</table>
							</div>
						);
					case "kv":
						return (
							<div className="listening-lesson__table" key={index}>
								{block.title ? <b>{block.title}</b> : null}
								<table>
									<tbody>
										{block.rows.map((row) => (
											<tr key={row.k}>
												<th>
													<Jp text={row.k} />
												</th>
												<td>
													<Line text={row.v} />
													{row.extra ? <small>{row.extra}</small> : null}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						);
					case "box":
						return (
							<div className="listening-lesson__boxes" key={index}>
								{block.title ? <h3 className="listening-lesson__h">{block.title}</h3> : null}
								{block.items.map((item) => (
									<article key={item.title}>
										<b>
											<Jp text={item.title} />
										</b>
										{item.lines.map((line) => (
											<p key={line}>
												<Line text={line} />
											</p>
										))}
										{item.note ? <small>{item.note}</small> : null}
									</article>
								))}
							</div>
						);
					case "figure":
						return (
							<figure className="listening-lesson__figure" key={index}>
								<img src={block.src} alt={block.alt} onError={(event) => { event.currentTarget.parentElement?.setAttribute("hidden", ""); }} />
								{block.caption ? <figcaption>{block.caption}</figcaption> : null}
							</figure>
						);
					case "example":
						return (
							<div className="listening-lesson__example" key={index}>
								{block.title ? (
									<b>
										<Jp text={block.title} />
									</b>
								) : null}
								{block.lines.map((line) => (
									<p key={line}>
										<Line text={line} />
									</p>
								))}
							</div>
						);
					case "aside":
						return (
							<aside className="listening-lesson__aside" key={index}>
								<b>{block.title}</b>
								<p>
									<Line text={block.text} />
								</p>
							</aside>
						);
					case "note":
						return (
							<p className="listening-lesson__note" key={index}>
								<Line text={block.text} />
							</p>
						);
					case "q":
						return (
							<article className="listening-lesson__q" key={index}>
								<header>
									<h4>
										<Jp text={block.label} />
									</h4>
									{block.tracks?.length ? (
										<div className="listening-exercise__tracks">
											{block.tracks.map((track) => (
												<CueButton key={track} cue={{ disc, track }} active={active} playing={playing} onToggle={onToggle} />
											))}
										</div>
									) : null}
								</header>
								{block.prompt ? (
									<p>
										<Jp text={block.prompt} />
									</p>
								) : null}
								{block.example ? <p className="listening-lesson__example-line">{block.example}</p> : null}
								{block.figure ? (
									<figure className="listening-lesson__figure">
										<img src={block.figure} alt={block.figureAlt || block.label} onError={(event) => { event.currentTarget.parentElement?.setAttribute("hidden", ""); }} />
									</figure>
								) : null}
								{block.options?.length ? (
									<ol>
										{block.options.map((option) => (
											<li key={option}>
												<Line text={option} />
											</li>
										))}
									</ol>
								) : null}
								{block.note ? <p className="listening-lesson__note">{block.note}</p> : null}
							</article>
						);
				}
			})}
		</section>
	);
}

function AnswerTextPanels({ lesson }: { lesson: ListeningLesson }) {
	return (
		<section className="listening-answer-panels" aria-label="答えと聞き取り原文">
			<details>
				<summary>
					<span>答え</span>
					<b>表示</b>
				</summary>
				<div className="listening-text-answers__body">{lesson.answer}</div>
			</details>
			<details>
				<summary>
					<span>聞き取り原文</span>
					<b>表示</b>
				</summary>
				<div className="listening-text-answers__body" lang="ja">
					{lesson.transcript}
				</div>
			</details>
		</section>
	);
}

function ChapterDetail({ chapterNumber, sectionNumber, onBack, hideBack = false }: { chapterNumber: number; sectionNumber: number; onBack: () => void; hideBack?: boolean }) {
	const chapter = findListeningChapter(chapterNumber);
	const section = findListeningSection(chapterNumber, sectionNumber);
	const lesson = getListeningLesson(chapterNumber, sectionNumber);

	const initialCue = useMemo<AudioCue>(() => {
		const disc = chapter?.disc ?? "cd1";
		const track = section?.firstTrack ?? 1;
		return { disc, track };
	}, [chapter, section]);

	const [cue, setCue] = useState(initialCue);
	const [playRequest, setPlayRequest] = useState(0);
	const [playing, setPlaying] = useState(false);
	const audioRef = useRef<HTMLAudioElement>(null);

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

	if (!chapter || !section || !lesson) {
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

	return (
		<div className="reader-page reader-page--embedded">
			<div className="reader-wrap reader-layout">
				<main className="reader-main listening-detail">
					<header className="listening-crumb">
						{hideBack ? null : (
							<button className="listening-crumb__back" onClick={onBack} aria-label="聴解目次へ戻る">
								‹
							</button>
						)}
						<div className="listening-crumb__path">
							<span>
								N3 <ruby>聴解<rt>ちょうかい</rt></ruby>
							</span>
							<i>/</i>
							<b>
								第 {chapter.number} 章 / {section.number}
							</b>
						</div>
						<h1>{section.title}</h1>
					</header>
					<ListeningPlayer cue={cue} audioRef={audioRef} onPlaybackChange={setPlaying} />
					<LessonBlocks blocks={lesson.blocks} disc={chapter.disc} active={cue} playing={playing} onToggle={toggleCue} />
					<AnswerTextPanels lesson={lesson} />
				</main>
			</div>
		</div>
	);
}

export function ListeningN3Content({
	chapter,
	section,
	embedded = false,
}: {
	chapter: number;
	section: number;
	embedded?: boolean;
}) {
	const found = findListeningSection(chapter, section);
	const titleText = found?.title ?? `第${chapter}章 ${section}节`;
	const favId = `listening#${chapter}-${section}`;
	registerFavMeta(favId, {
		module: "listening",
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
			<ChapterDetail key={`${chapter}-${section}`} chapterNumber={chapter} sectionNumber={section} onBack={() => navTo("#/")} hideBack={embedded} />
		</>
	);
}

export default function ListeningN3() {
	return null;
}
