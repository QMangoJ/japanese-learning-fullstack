import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { redirect } from "react-router";

import { isFav, navTo, registerFavMeta, toggleFav } from "../study/store";

import type { Route } from "./+types/listening-n3";
import { chapter2Sections } from "../data/listening-n3-structured-ch2";
import { chapter3Sections } from "../data/listening-n3-structured-ch3";
import { chapter4Sections, chapter5Sections } from "../data/listening-n3-structured-ch45";
import { chapter2AnswerText } from "../data/listening-n3-answers-ch2";
import { chapter3AnswerText } from "../data/listening-n3-answers-ch3";
import { chapter4AnswerText, chapter5AnswerText } from "../data/listening-n3-answers-ch45";
import type { ListeningAnswerText, ListeningStructuredSection, ListeningTextBlock, ListeningTextPage } from "../data/listening-n3-structured-types";
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

const structuredSectionsByChapter: Record<number, readonly ListeningStructuredSection[]> = { 2: chapter2Sections, 3: chapter3Sections, 4: chapter4Sections, 5: chapter5Sections };
const answerTextByChapter: Partial<Record<number, readonly ListeningAnswerText[]>> = { 2: chapter2AnswerText, 3: chapter3AnswerText, 4: chapter4AnswerText, 5: chapter5AnswerText };

const audioLabel: Record<Disc, string> = { cd1: "CD 1", cd2: "CD 2" };

const chapters = [
	{
		number: 1,
		title: "準備をしましょう",
		cn: "准备训练",
		pages: "练习页 12–22",
		description: "从发音、语法到会话表达，完成基础听辨训练。",
		focus: ["発音について", "文法", "会話表現"],
		disc: "cd1" as const,
		answerPages: [77, 79, 81, 83, 85, 87],
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
		answerPages: [89, 91, 93, 95, 97, 99],
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
		answerPages: [101, 103, 105, 107, 109, 111],
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
		answerPages: [113, 115, 117, 119, 121, 123, 125, 127],
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
		answerPages: [129, 131, 133, 135, 137, 139, 141, 143, 145, 147, 149, 151],
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

function formatTime(seconds: number) {
	if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
	const minutes = Math.floor(seconds / 60);
	const remainder = Math.floor(seconds % 60);
	return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

function CueButton({ cue, active, playing, onToggle }: { cue: AudioCue; active: AudioCue; playing: boolean; onToggle: (cue: AudioCue) => void }) {
	const isActive = active.disc === cue.disc && active.track === cue.track;
	const isPlaying = isActive && playing;
	return <button className={`${isActive ? "on" : ""}${isPlaying ? " playing" : ""}`} onClick={() => onToggle(cue)} aria-label={`${cueLabel(cue)} ${isPlaying ? "暂停" : "播放"}`} aria-pressed={isPlaying}>{isPlaying ? "❚❚" : "▶"} {cueLabel(cue)}</button>;
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

	return <section className="reader-section listening-player" aria-label="音声プレーヤー">
		<div className="listening-player__top"><button className={`listening-player__toggle${isPlaying ? " playing" : ""}`} onClick={togglePlayback} aria-label="再生または一時停止">{isPlaying ? "❚❚" : "▶"}</button><div><span>音声</span><strong>{cueLabel(cue)}</strong></div><div className="listening-speed" aria-label="再生速度">{[0.75, 1, 1.25].map((value) => <button key={value} className={speed === value ? "on" : ""} onClick={() => setSpeed(value)}>{value}×</button>)}<button className={loop ? "on" : ""} onClick={() => setLoop((value) => !value)} aria-label="繰り返し再生">↻</button></div></div>
		<div className="listening-player__timeline"><span>{formatTime(currentTime)}</span><input aria-label="再生位置" type="range" min="0" max={duration || 0} step="0.1" value={Math.min(currentTime, duration || 0)} disabled={!duration} onChange={(event) => seek(Number(event.currentTarget.value))} /><span>{formatTime(duration)}</span></div>
		<audio ref={audioRef} preload="metadata" loop={loop} src={trackSource(cue)} onLoadedMetadata={(event) => { event.currentTarget.playbackRate = speed; setDuration(event.currentTarget.duration); }} onDurationChange={(event) => setDuration(event.currentTarget.duration)} onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)} onPlay={() => { setIsPlaying(true); onPlaybackChange(true); }} onPause={() => { setIsPlaying(false); onPlaybackChange(false); }} onEnded={() => { setIsPlaying(false); onPlaybackChange(false); }} />
	</section>;
}

function ExerciseCard({ exercise, disc, active, playing, onToggle }: { exercise: ExercisePage; disc: Disc; active: AudioCue; playing: boolean; onToggle: (cue: AudioCue) => void }) {
	return <article className="listening-exercise">
		<header><div><span>题面 · 练习页 {exercise.page - 3}</span><h3>本页听力练习</h3></div><div className="listening-exercise__tracks">{exercise.tracks.map((track) => <CueButton key={track} cue={{ disc, track }} active={active} playing={playing} onToggle={onToggle} />)}</div></header>
		<p>点击对应音轨即可播放；题干、选项、插图和日文注音按练习页原样呈现。</p>
		<figure><img loading="lazy" src={pageSource(exercise.page)} alt={`N3 听解练习页 ${exercise.page - 3}，对应 ${exercise.tracks.map((track) => cueLabel({ disc, track })).join("、")}`} /></figure>
	</article>;
}

function StructuredTextBlock({ block, disc, active, playing, onToggle }: { block: ListeningTextBlock; disc: Disc; active: AudioCue; playing: boolean; onToggle: (cue: AudioCue) => void }) {
	switch (block.kind) {
		case "heading":
			return <h3 className="listening-book-block__heading">{block.text}</h3>;
		case "tip":
			return <aside className="listening-book-block__tip">{block.text}</aside>;
		case "note":
			return <p className="listening-book-block__note">{block.text}</p>;
		case "example":
			return <p className="listening-book-block__example">{block.text}</p>;
		case "paragraph":
			return <p className="listening-book-block__paragraph">{block.text}</p>;
		case "list":
		case "options":
			return <ol className={`listening-book-block__${block.kind}`}>{block.items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ol>;
		case "question":
			return <section className="listening-book-question"><header><h4>{block.title}</h4>{block.tracks?.length ? <div className="listening-exercise__tracks">{block.tracks.map((track) => <CueButton key={track} cue={{ disc, track }} active={active} playing={playing} onToggle={onToggle} />)}</div> : null}</header>{block.options?.length ? <ol>{block.options.map((option, index) => <li key={`${option}-${index}`}>{option}</li>)}</ol> : null}</section>;
	}
}

function StructuredPageCard({ page, disc, active, playing, onToggle }: { page: ListeningTextPage; disc: Disc; active: AudioCue; playing: boolean; onToggle: (cue: AudioCue) => void }) {
	return <article className="listening-book-page" lang="ja"><header><span>第 {page.page - 3} ページ</span><b>本文・練習</b></header><div className="listening-book-page__body">{page.blocks.map((block, index) => <StructuredTextBlock key={`${page.page}-${index}`} block={block} disc={disc} active={active} playing={playing} onToggle={onToggle} />)}</div></article>;
}

function StructuredSectionLesson({ chapter, section, active, playing, onToggle }: { chapter: (typeof chapters)[number]; section: ListeningStructuredSection; active: AudioCue; playing: boolean; onToggle: (cue: AudioCue) => void }) {
	return <section className="listening-text-lesson listening-structured-lesson" aria-labelledby={`structured-section-${chapter.number}-${section.number}`}>
		<div className="reader-section-head"><span>第{chapter.number}章　第{section.number}節</span><h2 id={`structured-section-${chapter.number}-${section.number}`}>{section.title}</h2></div>
		<div className="listening-text-lesson__intro"><b>{section.subtitle}</b><p>本文・説明・練習問題を、原書の構成に沿ってテキストで表示しています。</p></div>
		<div className="listening-book-pages">{section.pages.map((page) => <StructuredPageCard key={page.page} page={page} disc={chapter.disc} active={active} playing={playing} onToggle={onToggle} />)}</div>
	</section>;
}

function TextAnswerPanels({ section }: { section: ListeningAnswerText }) {
	return <section className="listening-answer-panels listening-text-answers" aria-label="答えと聞き取り原文"><details><summary><span>答え</span><b>表示</b></summary><div className="listening-text-answers__body">{section.answer}</div></details><details><summary><span><ruby>聞<rt>き</rt></ruby>き<ruby>取<rt>と</rt></ruby>り<ruby>原文<rt>げんぶん</rt></ruby></span><b>表示</b></summary><div className="listening-text-answers__body" lang="ja">{section.transcript}</div></details></section>;
}

const pronunciationExercises = [
	{
		track: 2,
		title: <>1 <ruby>番<rt>ばん</rt></ruby>　<ruby>小<rt>ちい</rt></ruby>さい「っ（ッ）」があれば、__ に<ruby>書<rt>か</rt></ruby>いてください。</>,
		example: "例題）ま__ち　マ__チ",
		items: ["① レース__ン", "② ま__す__ぐ", "③ ポ__ケ__ト", "④ ゆ__く__り", "⑤ ス__ト__プ", "⑥ せ__け__ん", "⑦ ち__か__て__つ", "⑧ い__て__ら__しゃ__い"],
	},
	{
		track: 3,
		title: <>2 <ruby>番<rt>ばん</rt></ruby>　のばす<ruby>音<rt>おと</rt></ruby>「あ・い・う・え・お・ー」があれば __ に<ruby>書<rt>か</rt></ruby>いてください。</>,
		example: "例題）セ__タ__　しゅ__み　きの__う",
		items: ["① ゆ__び__ん__きょ__く__", "② バ__ス__デ__パ__ティ__", "③ ちゅ__しゃ__じょ__", "④ お__じ__さ__ん", "⑤ りゅ__が__く__せ__", "⑥ きょ__と__りょ__こ__", "⑦ じゅ__が__つ__と__か__", "⑧ き__れ__な__お__ね__さ__ん"],
	},
	{
		track: 4,
		title: <>3 <ruby>番<rt>ばん</rt></ruby>　<ruby>何<rt>なに</rt></ruby>と<ruby>言<rt>い</rt></ruby>いましたか。__ に<ruby>一<rt>ひと</rt></ruby>つずつひらがなを<ruby>書<rt>か</rt></ruby>いて、（　）にもとの<ruby>形<rt>かたち</rt></ruby>を<ruby>書<rt>か</rt></ruby>いてください。</>,
		example: <><ruby>例題<rt>れいだい</rt></ruby>）<ruby>早<rt>はや</rt></ruby>く<ruby>早<rt>はや</rt></ruby>く、バス いっちゃうよ。　（いってしまう）</>,
		items: [<>① <ruby>牛乳<rt>ぎゅうにゅう</rt></ruby><ruby>全部<rt>ぜんぶ</rt></ruby> ______________。また、<ruby>買<rt>か</rt></ruby>って ________。</>, <>② ______________ だめだよ。<ruby>危<rt>あぶ</rt></ruby>ないよ。</>, <>③ テレビ<ruby>見<rt>み</rt></ruby>る<ruby>前<rt>まえ</rt></ruby>に<ruby>宿題<rt>しゅくだい</rt></ruby> ______________。</>, <>④ あ、あの<ruby>人<rt>ひと</rt></ruby>、________ <ruby>見<rt>み</rt></ruby>て ________。</>],
	},
] as const satisfies readonly { track: number; title: ReactNode; example: ReactNode; items: readonly ReactNode[] }[];

function PronunciationLesson({ active, playing, onToggle }: { active: AudioCue; playing: boolean; onToggle: (cue: AudioCue) => void }) {
	return <section className="reader-section listening-text-lesson" aria-labelledby="pronunciation-lesson-title">
		<div className="reader-section-head"><span>第1章　準備をしましょう</span><h2 id="pronunciation-lesson-title"><ruby>発音<rt>はつおん</rt></ruby>について</h2></div>
		<div className="listening-text-lesson__intro"><b><ruby>発音<rt>はつおん</rt></ruby>と<ruby>表記<rt>ひょうき</rt></ruby>に<ruby>気<rt>き</rt></ruby>をつけましょう！</b></div>
		<div className="pronunciation-topics">
			<article className="pronunciation-topic"><h3>「ちょっと」「まって」</h3><p>「ちょとまてください」ではなく、「ちょっとまってください」。</p><p>「まち」と「マッチ」。</p></article>
			<article className="pronunciation-topic"><h3>「おとうさん」「おかあさん」</h3><p>カタカナ　→　「ー」　　コーヒー・スーパーマーケット</p><p>ひらがな　→　「あ」「い」「う」「え」「お」</p><div className="pronunciation-table" role="table" aria-label="長音の書き方"><div role="row"><b>—a：あ</b><span>おかあさん　おばあさん　まあ</span></div><div role="row"><b>—i：い</b><span>おにいさん　ちいさい　いいえ</span></div><div role="row"><b>—u：う</b><span>すうがく　れんしゅう　ちゅうい</span></div><div role="row"><b>—e：い</b><span>とけい　せんせい　がくせい</span></div><div role="row"><b>—o：う</b><span>おとうさん　がっこう　とうきょう　ようか</span></div></div><aside><b><ruby>例外<rt>れいがい</rt></ruby></b><span>おねえさん　　おおきい　　とうきょう</span></aside></article>
			<article className="pronunciation-topic"><h3>「なくなっちゃった」「<ruby>買<rt>か</rt></ruby>わなくちゃ」</h3><div className="pronunciation-table pronunciation-table--phrases" role="table" aria-label="会話の表現"><div role="row"><b>〜ちゃった・〜じゃった</b><span>（=〜てしまった・〜でしまった）　<ruby>食<rt>た</rt></ruby>べちゃった</span></div><div role="row"><b>〜ちゃう・〜じゃう</b><span>（=〜てしまう・〜でしまう）　<ruby>食<rt>た</rt></ruby>べちゃう</span></div><div role="row"><b>〜ちゃおう・〜じゃおう</b><span>（=〜てしまおう・〜でしまおう）　<ruby>食<rt>た</rt></ruby>べちゃおう</span></div><div role="row"><b>〜なくちゃ</b><span>（=〜なくてはいけない）　<ruby>食<rt>た</rt></ruby>べなくちゃ</span></div><div role="row"><b>〜なきゃ</b><span>（=〜なければならない）　<ruby>食<rt>た</rt></ruby>べなきゃ</span></div><div role="row"><b>〜ちゃ〜</b><span>（=〜ては〜）　<ruby>食<rt>た</rt></ruby>べちゃいけない</span></div><div role="row"><b>〜てる</b><span>（=〜ている）　<ruby>食<rt>た</rt></ruby>べてる</span></div></div><p>こっち・そっち・あっち・どっち（=こちら・そちら・あちら・どちら）</p><p>・そろそろ<ruby>学校<rt>がっこう</rt></ruby>（<del>へ</del>）<ruby>行<rt>い</rt></ruby>かなきゃ。</p></article>
		</div>
		<div className="listening-text-exercises"><div className="reader-section-head"><span>れんしゅう　（<ruby>答<rt>こた</rt></ruby>えは p.74）</span><h3>MP3 を<ruby>聞<rt>き</rt></ruby>いてください。</h3></div>{pronunciationExercises.map((exercise) => <article className="listening-text-exercise" key={exercise.track}><header><h4>{exercise.title}</h4><CueButton cue={{ disc: "cd1", track: exercise.track }} active={active} playing={playing} onToggle={onToggle} /></header><p className="listening-text-exercise__example">{exercise.example}</p><ol>{exercise.items.map((item, index) => <li key={index}>{item}</li>)}</ol></article>)}</div>
	</section>;
}

function GrammarOneLesson({ active, playing, onToggle }: { active: AudioCue; playing: boolean; onToggle: (cue: AudioCue) => void }) {
	return <section className="reader-section listening-text-lesson" aria-labelledby="grammar-one-lesson-title">
		<div className="reader-section-head"><span>第1章　準備をしましょう</span><h2 id="grammar-one-lesson-title"><ruby>文法<rt>ぶんぽう</rt></ruby>について①</h2></div>
		<div className="listening-text-lesson__intro"><b>だれがするのかに<ruby>注意<rt>ちゅうい</rt></ruby>しましょう！</b></div>
		<div className="pronunciation-topics">
			<article className="pronunciation-topic"><h3>もらう・くれる</h3><div className="pronunciation-table" role="table"><div role="row"><b>A が B にしてあげる</b><span>A がする</span></div><div role="row"><b>A が B にしてくれる</b><span>A がする</span></div><div role="row"><b>A が B にしてもらう</b><span>B がする</span></div></div><p>Aさん、Bさんにしてあげて。</p><p>Aさん、B（さん）にしてくれる？</p><p>Aさん、B（さん）にしてもらって。</p></article>
			<article className="pronunciation-topic"><h3>ほめられる・<ruby>注意<rt>ちゅうい</rt></ruby>される</h3><div className="pronunciation-table" role="table"><div role="row"><b>A が B を／に する</b><span>B が A に される</span></div></div><p><ruby>先生<rt>せんせい</rt></ruby>が<ruby>学生<rt>がくせい</rt></ruby>を<ruby>注意<rt>ちゅうい</rt></ruby>する　→　<ruby>学生<rt>がくせい</rt></ruby>が<ruby>先生<rt>せんせい</rt></ruby>に<ruby>注意<rt>ちゅうい</rt></ruby>される</p><p><ruby>友達<rt>ともだち</rt></ruby>が<ruby>私<rt>わたし</rt></ruby>を<ruby>笑<rt>わら</rt></ruby>う　→　<ruby>私<rt>わたし</rt></ruby>が<ruby>友達<rt>ともだち</rt></ruby>に<ruby>笑<rt>わら</rt></ruby>われる</p></article>
			<article className="pronunciation-topic"><h3>させる・させられる</h3><div className="pronunciation-table" role="table"><div role="row"><b>B：Aさん、してください</b><span>B が A にさせる</span></div><div role="row"><b>A がする</b><span>A が B にさせられる</span></div></div><p><ruby>母<rt>はは</rt></ruby>：<ruby>野菜<rt>やさい</rt></ruby>を<ruby>食<rt>た</rt></ruby>べて。　→　<ruby>私<rt>わたし</rt></ruby>が<ruby>野菜<rt>やさい</rt></ruby>を<ruby>食<rt>た</rt></ruby>べる</p><p><ruby>母<rt>はは</rt></ruby>が<ruby>私<rt>わたし</rt></ruby>に<ruby>野菜<rt>やさい</rt></ruby>を<ruby>食<rt>た</rt></ruby>べさせる</p><p><ruby>私<rt>わたし</rt></ruby>が<ruby>母<rt>はは</rt></ruby>に<ruby>野菜<rt>やさい</rt></ruby>を<ruby>食<rt>た</rt></ruby>べさせられる</p><aside><b><ruby>縮約形<rt>しゅくやくけい</rt></ruby></b><span><ruby>待<rt>ま</rt></ruby>たせられる＝<ruby>待<rt>ま</rt></ruby>たされる　／　<ruby>買<rt>か</rt></ruby>わせられる＝<ruby>買<rt>か</rt></ruby>わされる<br /><ruby>食<rt>た</rt></ruby>べる、<ruby>話<rt>はな</rt></ruby>す、する、<ruby>来<rt>く</rt></ruby>る、などは<ruby>縮約形<rt>しゅくやくけい</rt></ruby>にはできない。</span></aside></article>
		</div>
		<div className="listening-text-exercises"><div className="reader-section-head"><span>れんしゅう　（<ruby>答<rt>こた</rt></ruby>えは p.76）</span><h3>MP3 を<ruby>聞<rt>き</rt></ruby>いてください。</h3></div>
			<article className="listening-text-exercise"><header><h4>1 <ruby>番<rt>ばん</rt></ruby>　だれがしますか。<ruby>正<rt>ただ</rt></ruby>しいものを<ruby>選<rt>えら</rt></ruby>んでください。</h4><CueButton cue={{ disc: "cd1", track: 5 }} active={active} playing={playing} onToggle={onToggle} /></header><p className="listening-text-exercise__example"><ruby>例題<rt>れいだい</rt></ruby>）（<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>　<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>　<ruby>森<rt>もり</rt></ruby>さん）が<ruby>書<rt>か</rt></ruby>きます。</p><ol><li>（<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>　<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>　<ruby>森<rt>もり</rt></ruby>さん）が<ruby>持<rt>も</rt></ruby>ってきました。</li><li>（<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>　<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>　<ruby>森<rt>もり</rt></ruby>さん）が<ruby>写真<rt>しゃしん</rt></ruby>を<ruby>撮<rt>と</rt></ruby>ります。</li><li>（<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>　<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>　<ruby>森<rt>もり</rt></ruby>さん）が<ruby>行<rt>い</rt></ruby>きます。</li><li>（<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>　<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>　<ruby>森<rt>もり</rt></ruby>さん）が<ruby>仕事<rt>しごと</rt></ruby>を<ruby>手伝<rt>てつだ</rt></ruby>いました。</li><li>（<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>　<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>　<ruby>森<rt>もり</rt></ruby>さん）が<ruby>使<rt>つか</rt></ruby>います。</li></ol></article>
			<article className="listening-text-exercise"><header><h4>2 <ruby>番<rt>ばん</rt></ruby>　<ruby>会話<rt>かいわ</rt></ruby>の<ruby>内容<rt>ないよう</rt></ruby>と<ruby>合<rt>あ</rt></ruby>うものを<ruby>選<rt>えら</rt></ruby>んでください。</h4><CueButton cue={{ disc: "cd1", track: 6 }} active={active} playing={playing} onToggle={onToggle} /></header><ol className="listening-text-exercise__answers"><li>1　<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>にペンを<ruby>貸<rt>か</rt></ruby>してくれます。<br />2　<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>にペンを<ruby>借<rt>か</rt></ruby>りてあげます。<br />3　<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>にペンを<ruby>貸<rt>か</rt></ruby>してもらいます。</li><li>1　<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は<ruby>森<rt>もり</rt></ruby>さんにほめられました。<br />2　<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は<ruby>森<rt>もり</rt></ruby>さんにほめられました。<br />3　<ruby>森<rt>もり</rt></ruby>さんは<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>に<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>をほめさせました。</li><li>1　<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は<ruby>森<rt>もり</rt></ruby>さんに<ruby>書類<rt>しょるい</rt></ruby>を<ruby>作<rt>つく</rt></ruby>らせました。<br />2　<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>に<ruby>書類<rt>しょるい</rt></ruby>を<ruby>作<rt>つく</rt></ruby>ってあげます。<br />3　<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>に<ruby>書類<rt>しょるい</rt></ruby>を<ruby>作<rt>つく</rt></ruby>らせられます。</li><li>1　<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は<ruby>明日<rt>あした</rt></ruby><ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>を<ruby>病院<rt>びょういん</rt></ruby>に<ruby>行<rt>い</rt></ruby>かせてあげます。<br />2　<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は<ruby>明日<rt>あした</rt></ruby><ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>に<ruby>病院<rt>びょういん</rt></ruby>に<ruby>行<rt>い</rt></ruby>かせてもらいます。<br />3　<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は<ruby>明日<rt>あした</rt></ruby><ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>に<ruby>病院<rt>びょういん</rt></ruby>に<ruby>行<rt>い</rt></ruby>ってもらいます。</li><li>1　<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は<ruby>森<rt>もり</rt></ruby>さんにお<ruby>酒<rt>さけ</rt></ruby>をたくさん<ruby>飲<rt>の</rt></ruby>まされた。<br />2　<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は<ruby>森<rt>もり</rt></ruby>さんにお<ruby>酒<rt>さけ</rt></ruby>をたくさん<ruby>飲<rt>の</rt></ruby>ませた。<br />3　<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は<ruby>森<rt>もり</rt></ruby>さんにお<ruby>酒<rt>さけ</rt></ruby>をたくさん<ruby>飲<rt>の</rt></ruby>まれた。</li></ol></article>
		</div>
	</section>;
}

function GrammarTwoLesson({ active, playing, onToggle }: { active: AudioCue; playing: boolean; onToggle: (cue: AudioCue) => void }) {
	return <section className="reader-section listening-text-lesson" aria-labelledby="grammar-two-lesson-title">
		<div className="reader-section-head"><span>第1章　準備をしましょう</span><h2 id="grammar-two-lesson-title"><ruby>文法<rt>ぶんぽう</rt></ruby>について②</h2></div>
		<div className="listening-text-lesson__intro"><b><ruby>自分<rt>じぶん</rt></ruby>では<ruby>使<rt>つか</rt></ruby>えなくても、<ruby>敬語<rt>けいご</rt></ruby>の<ruby>意味<rt>いみ</rt></ruby>が<ruby>聞<rt>き</rt></ruby>き<ruby>取<rt>と</rt></ruby>れるようにしましょう！</b></div>
		<div className="pronunciation-topics"><article className="pronunciation-topic"><h3>「します」の<ruby>敬語<rt>けいご</rt></ruby></h3><p><ruby>尊敬語<rt>そんけいご</rt></ruby>は「なさいます」、<ruby>謙譲語<rt>けんじょうご</rt></ruby>は「いたします」です。</p></article><article className="pronunciation-topic"><h3>一つの<ruby>単語<rt>たんご</rt></ruby>にいろいろな<ruby>敬語<rt>けいご</rt></ruby></h3><div className="pronunciation-table" role="table"><div role="row"><b>うかがう（<ruby>伺<rt>うかが</rt></ruby>う）</b><span><ruby>尋<rt>たず</rt></ruby>ねる　／　<ruby>聞<rt>き</rt></ruby>く　／　<ruby>訪問<rt>ほうもん</rt></ruby>する</span></div><div role="row"><b>いらっしゃる</b><span><ruby>行<rt>い</rt></ruby>く　／　いる　／　<ruby>来<rt>く</rt></ruby>る</span></div><div role="row"><b>かける</b><span><ruby>椅子<rt>いす</rt></ruby>などに<ruby>座<rt>すわ</rt></ruby>る　／　<ruby>電話<rt>でんわ</rt></ruby>をかける</span></div></div><p>ちょっと<ruby>伺<rt>うかが</rt></ruby>いますが、<ruby>駅<rt>えき</rt></ruby>はどちらでしょうか。</p><p>その<ruby>話<rt>はなし</rt></ruby>は○○<ruby>先生<rt>せんせい</rt></ruby>から<ruby>伺<rt>うかが</rt></ruby>いました。</p><p>２<ruby>時<rt>じ</rt></ruby>にいらっしゃってください。</p></article><article className="pronunciation-topic"><h3><ruby>敬語表現<rt>けいごひょうげん</rt></ruby></h3><div className="pronunciation-table" role="table"><div role="row"><b><ruby>受身形<rt>うけみけい</rt></ruby></b><span>もうお<ruby>土産<rt>みやげ</rt></ruby>は<ruby>買<rt>か</rt></ruby>われましたか。　どうされましたか。</span></div><div role="row"><b>お／ご〜です</b><span>ご<ruby>注文<rt>ちゅうもん</rt></ruby>はお<ruby>決<rt>き</rt></ruby>まりですか。　ご<ruby>主人<rt>しゅじん</rt></ruby>はご<ruby>在宅<rt>ざいたく</rt></ruby>でしょうか。</span></div><div role="row"><b>お／ご〜になる</b><span>ご<ruby>利用<rt>りよう</rt></ruby>になれません。　７<ruby>番<rt>ばん</rt></ruby>でお<ruby>待<rt>ま</rt></ruby>ちのお<ruby>客<rt>きゃく</rt></ruby><ruby>様<rt>さま</rt></ruby>、どうぞ。</span></div><div role="row"><b>お／ご〜ください</b><span>つり<ruby>革<rt>かわ</rt></ruby>におつかまりください。　ご<ruby>注意<rt>ちゅうい</rt></ruby>ください。</span></div></div></article></div>
		<div className="listening-text-exercises"><div className="reader-section-head"><span>れんしゅう　（<ruby>答<rt>こた</rt></ruby>えは p.78）</span><h3>MP3 を<ruby>聞<rt>き</rt></ruby>いてください。</h3></div><article className="listening-text-exercise"><header><h4>1 <ruby>番<rt>ばん</rt></ruby>　<ruby>内容<rt>ないよう</rt></ruby>の<ruby>正<rt>ただ</rt></ruby>しいほうを<ruby>選<rt>えら</rt></ruby>んでください。</h4><CueButton cue={{ disc: "cd1", track: 7 }} active={active} playing={playing} onToggle={onToggle} /></header><ol><li>１　どこから<ruby>来<rt>き</rt></ruby>ましたか　　２　どこに<ruby>住<rt>す</rt></ruby>んでいますか</li><li>１　<ruby>仕事<rt>しごと</rt></ruby>は<ruby>何<rt>なに</rt></ruby>をしているか　　２　<ruby>注文<rt>ちゅうもん</rt></ruby>は<ruby>何<rt>なに</rt></ruby>にするか</li><li>１　<ruby>荷物<rt>にもつ</rt></ruby>を<ruby>預<rt>あず</rt></ruby>かります　　２　<ruby>荷物<rt>にもつ</rt></ruby>を<ruby>預<rt>あず</rt></ruby>かってください</li><li>１　<ruby>電話<rt>でんわ</rt></ruby>をかけてください　　２　<ruby>座<rt>すわ</rt></ruby>って<ruby>待<rt>ま</rt></ruby>ってください</li><li>１　メニューを<ruby>持<rt>も</rt></ruby>ってきました　　２　メニューを<ruby>持<rt>も</rt></ruby>ってきてください</li></ol></article><article className="listening-text-exercise"><header><h4>2 <ruby>番<rt>ばん</rt></ruby>　<ruby>会話<rt>かいわ</rt></ruby>の<ruby>内容<rt>ないよう</rt></ruby>と<ruby>合<rt>あ</rt></ruby>うものを<ruby>選<rt>えら</rt></ruby>んでください。</h4><CueButton cue={{ disc: "cd1", track: 8 }} active={active} playing={playing} onToggle={onToggle} /></header><ol className="listening-text-exercise__answers"><li>１　<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>に<ruby>聞<rt>き</rt></ruby>きたいことがある。<br />２　<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>を<ruby>訪問<rt>ほうもん</rt></ruby>する。<br />３　<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>にいつ<ruby>来<rt>く</rt></ruby>るか<ruby>聞<rt>き</rt></ruby>いた。</li><li>１　<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は<ruby>明日<rt>あした</rt></ruby>の10<ruby>時<rt>じ</rt></ruby>までここにいる。<br />２　<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は<ruby>明日<rt>あした</rt></ruby>10<ruby>時<rt>じ</rt></ruby>までにここに<ruby>来<rt>く</rt></ruby>る。<br />３　<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は<ruby>明日<rt>あした</rt></ruby>10<ruby>時<rt>じ</rt></ruby>までにここに<ruby>来<rt>く</rt></ruby>る。</li><li>１　<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>はだれかを<ruby>探<rt>さが</rt></ruby>しているようです。<br />２　<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は<ruby>道<rt>みち</rt></ruby>に<ruby>迷<rt>まよ</rt></ruby>ったようです。<br />３　<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は<ruby>店員<rt>てんいん</rt></ruby>のようです。</li></ol></article></div>
	</section>;
}

function ConversationLesson({ active, playing, onToggle }: { active: AudioCue; playing: boolean; onToggle: (cue: AudioCue) => void }) {
	return <section className="reader-section listening-text-lesson" aria-labelledby="conversation-lesson-title"><div className="reader-section-head"><span>第1章　準備をしましょう</span><h2 id="conversation-lesson-title"><ruby>会話表現<rt>かいわひょうげん</rt></ruby></h2></div><div className="listening-text-lesson__intro"><b><ruby>会話<rt>かいわ</rt></ruby>らしい<ruby>表現<rt>ひょうげん</rt></ruby>ややりとりに<ruby>慣<rt>な</rt></ruby>れましょう！</b></div><div className="pronunciation-topics"><article className="pronunciation-topic"><h3>「ない・わけ・こと」を<ruby>使<rt>つか</rt></ruby>う<ruby>表現<rt>ひょうげん</rt></ruby></h3><div className="pronunciation-table" role="table"><div role="row"><b>〜じゃない？</b><span><ruby>雨<rt>あめ</rt></ruby>、<ruby>降<rt>ふ</rt></ruby>るんじゃない？　<ruby>降<rt>ふ</rt></ruby>らないんじゃない？</span></div><div role="row"><b>〜てくれない？　〜てもらえない？</b><span><ruby>荷物<rt>にもつ</rt></ruby>、ここに<ruby>置<rt>お</rt></ruby>いてくれない？　<ruby>見<rt>み</rt></ruby>せてもらえない？</span></div><div role="row"><b>〜ないかな</b><span><ruby>早<rt>はや</rt></ruby>く<ruby>来<rt>こ</rt></ruby>ないかな。</span></div><div role="row"><b>〜ことになっている</b><span>この<ruby>日<rt>ひ</rt></ruby>を<ruby>過<rt>す</rt></ruby>ぎるとキャンセル<ruby>料<rt>りょう</rt></ruby>をいただくことになっています。</span></div><div role="row"><b>〜わけだ　／　〜わけじゃない</b><span><ruby>暑<rt>あつ</rt></ruby>いわけだ。30<ruby>度<rt>ど</rt></ruby>もある。　／　<ruby>嫌<rt>きら</rt></ruby>いなわけじゃないけど、<ruby>食<rt>た</rt></ruby>べないんです。</span></div></div></article><article className="pronunciation-topic"><h3><ruby>会話中<rt>かいわちゅう</rt></ruby>の<ruby>省略用法<rt>しょうりゃくようほう</rt></ruby></h3><p>A：あの<ruby>番組<rt>ばんぐみ</rt></ruby>おもしろいね。　B：でしょ？</p><p>A：おかげさまで、<ruby>試験<rt>しけん</rt></ruby>に…　B：<ruby>合格<rt>ごうかく</rt></ruby>したんですね、おめでとう。</p><p>やった！　／　さすが！　／　うそ！　／　へえー！　／　ぜひ！　／　もう！</p></article></div><div className="listening-text-exercises"><div className="reader-section-head"><span>れんしゅう　（<ruby>答<rt>こた</rt></ruby>えは p.80）</span><h3>MP3 を<ruby>聞<rt>き</rt></ruby>いてください。</h3></div><article className="listening-text-exercise"><header><h4>1 <ruby>番<rt>ばん</rt></ruby>　<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>の<ruby>答<rt>こた</rt></ruby>えはどちらの<ruby>意味<rt>いみ</rt></ruby>ですか。<ruby>正<rt>ただ</rt></ruby>しいほうを<ruby>選<rt>えら</rt></ruby>んでください。</h4><CueButton cue={{ disc: "cd1", track: 9 }} active={active} playing={playing} onToggle={onToggle} /></header><ol><li>１　よくない　　２　いい</li><li>１　<ruby>混<rt>こ</rt></ruby>んでいる<ruby>理由<rt>りゆう</rt></ruby>がわかった　　２　なぜ<ruby>混<rt>こ</rt></ruby>んでいるのかわからない</li><li>１　ダイエットはしていない　　２　ダイエットをしている</li><li>１　<ruby>早<rt>はや</rt></ruby>く<ruby>始<rt>はじ</rt></ruby>まってほしくない　　２　<ruby>早<rt>はや</rt></ruby>く<ruby>始<rt>はじ</rt></ruby>まってほしい</li><li>１　<ruby>話<rt>はな</rt></ruby>しかけてもらいたくない　　２　<ruby>話<rt>はな</rt></ruby>しかけてもらいたい</li><li>１　<ruby>大丈夫<rt>だいじょうぶ</rt></ruby>です、<ruby>受<rt>う</rt></ruby>け<ruby>付<rt>つ</rt></ruby>けましょう　　２　<ruby>受<rt>う</rt></ruby>け<ruby>付<rt>つ</rt></ruby>けをすることはできません</li></ol></article><article className="listening-text-exercise"><header><h4>2 <ruby>番<rt>ばん</rt></ruby>　<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>のあとに<ruby>続<rt>つづ</rt></ruby>くのはどちらですか。<ruby>正<rt>ただ</rt></ruby>しいほうを<ruby>選<rt>えら</rt></ruby>んでください。</h4><CueButton cue={{ disc: "cd1", track: 10 }} active={active} playing={playing} onToggle={onToggle} /></header><ol><li>１　<ruby>使<rt>つか</rt></ruby>えなくなりました。　２　<ruby>使<rt>つか</rt></ruby>えるようになりました。</li><li>１　わかりました。　２　わかりません。</li></ol></article><article className="listening-text-exercise"><header><h4><ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>の<ruby>気持<rt>きも</rt></ruby>ちはどちらですか。<ruby>正<rt>ただ</rt></ruby>しいほうを<ruby>選<rt>えら</rt></ruby>んでください。</h4><CueButton cue={{ disc: "cd1", track: 11 }} active={active} playing={playing} onToggle={onToggle} /></header><ol><li>１　<ruby>心配<rt>しんぱい</rt></ruby>している　　２　<ruby>感<rt>かん</rt></ruby>じしている</li><li>１　<ruby>行<rt>い</rt></ruby>きたい　　２　あまり<ruby>行<rt>い</rt></ruby>きたくない</li></ol></article></div></section>;
}

const chapterOneSections = [
	{ number: 1, title: <><ruby>発音<rt>はつおん</rt></ruby>について</>, subtitle: "発音と表記", firstTrack: 2, translationPages: [78], answer: <><p><b>1番</b>　例題：まち（町）／マッチ<br />①レッスン　②まっすぐ　③ポケット　④ゆっくり　⑤ストップ　⑥せっけん（石鹸）　⑦ちかてつ（地下鉄）　⑧いってらっしゃい</p><p><b>2番</b>　例題：セーター／しゅみ（趣味）／きのう（昨日）<br />①ゆうびんきょく（郵便局）　②バースデーパーティー　③ちゅうしゃじょう（駐車場）　④おじさん（伯父さん・叔父さん）　⑤りゅうがくせい（留学生）　⑥きょうとりょこう（京都旅行）　⑦じゅうがつとおか（十月十日）　⑧きれいなおねえさん（きれいなお姉さん）</p><p><b>3番</b>　①のんじゃった／こなきゃ　②そっちいっちゃだめだよ　③やっちゃおう　④こっち見てわらってる。</p></>, script: <><p><b>3番</b></p><p>① <ruby>牛乳<rt>ぎゅうにゅう</rt></ruby><ruby>全部<rt>ぜんぶ</rt></ruby>のんじゃった。また、<ruby>買<rt>か</rt></ruby>ってこなきゃ。</p><p>② そっちいっちゃだめだよ。<ruby>危<rt>あぶ</rt></ruby>ないよ。</p><p>③ テレビ<ruby>見<rt>み</rt></ruby>る<ruby>前<rt>まえ</rt></ruby>に、<ruby>宿題<rt>しゅくだい</rt></ruby>やっちゃおう。</p><p>④ あ、あの<ruby>人<rt>ひと</rt></ruby>、こっち<ruby>見<rt>み</rt></ruby>てわらってる。</p></> },
	{ number: 2, title: <><ruby>文法<rt>ぶんぽう</rt></ruby>について①</>, subtitle: "授受・受身・使役", firstTrack: 5, translationPages: [80], answer: <><p><b>1番</b>　例題：<ruby>森<rt>もり</rt></ruby>さん　①<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>　②<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>　③<ruby>森<rt>もり</rt></ruby>さん　④<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>　⑤<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby></p><p><b>2番</b>　①3　②1　③2　④2　⑤1</p></>, script: <><p><b>1番</b>　① <ruby>男<rt>おとこ</rt></ruby>：あ、<ruby>持<rt>も</rt></ruby>ってきてくれたの？　<ruby>女<rt>おんな</rt></ruby>：ええ。<br />② <ruby>男<rt>おとこ</rt></ruby>：<ruby>写真<rt>しゃしん</rt></ruby>を<ruby>撮<rt>と</rt></ruby>らせていただけないでしょうか。　<ruby>女<rt>おんな</rt></ruby>：あ、いいですよ。<br />③ <ruby>男<rt>おとこ</rt></ruby>：<ruby>森<rt>もり</rt></ruby>さんに<ruby>行<rt>い</rt></ruby>ってもらおうか。　<ruby>女<rt>おんな</rt></ruby>：そうですね。</p><p><b>2番</b>　① <ruby>男<rt>おとこ</rt></ruby>：このペン、<ruby>借<rt>か</rt></ruby>りてもいい？　<ruby>女<rt>おんな</rt></ruby>：いいですよ。<br />② <ruby>男<rt>おとこ</rt></ruby>：<ruby>森<rt>もり</rt></ruby>さんに、ほめられたんだって？　<ruby>女<rt>おんな</rt></ruby>：ええ、そうなの。<br />③ <ruby>男<rt>おとこ</rt></ruby>：<ruby>森<rt>もり</rt></ruby>さんに、<ruby>書類<rt>しょるい</rt></ruby>を<ruby>作<rt>つく</rt></ruby>ってもらおうと<ruby>思<rt>おも</rt></ruby>ったんですけど。<br /><ruby>女<rt>おんな</rt></ruby>：じゃ、<ruby>私<rt>わたし</rt></ruby>がいたしましょうか。　<ruby>男<rt>おとこ</rt></ruby>：そうしていただけますか。<ruby>助<rt>たす</rt></ruby>かります。</p></> },
	{ number: 3, title: <><ruby>文法<rt>ぶんぽう</rt></ruby>について②</>, subtitle: "敬語", firstTrack: 7, translationPages: [82], answer: <><p><b>1番</b>　例題：1　①2　②2　③1　④2　⑤1</p><p><b>2番</b>　①1　②2　③3　④3　⑤1</p></>, script: <><p><b>1番</b>　例題：ご<ruby>存<rt>ぞん</rt></ruby>じですか。　①どちらにお<ruby>住<rt>す</rt></ruby>まいですか。　②<ruby>何<rt>なに</rt></ruby>になさいますか。　③お<ruby>荷物<rt>にもつ</rt></ruby>、お<ruby>預<rt>あず</rt></ruby>かりいたします。　④おかけになってお<ruby>待<rt>ま</rt></ruby>ちください。　⑤メニューをお<ruby>持<rt>も</rt></ruby>ちしました。</p><p><b>2番</b>　① <ruby>男<rt>おとこ</rt></ruby>：ちょっと、<ruby>伺<rt>うかが</rt></ruby>いますが…。　<ruby>女<rt>おんな</rt></ruby>：はい、なんでしょう。<br />② <ruby>女<rt>おんな</rt></ruby>：では、<ruby>明日<rt>あした</rt></ruby>10<ruby>時<rt>じ</rt></ruby>までにこちらにいらしてください。　<ruby>男<rt>おとこ</rt></ruby>：わかりました。<br />③ <ruby>女<rt>おんな</rt></ruby>：<ruby>何<rt>なに</rt></ruby>か、お<ruby>探<rt>さが</rt></ruby>しですか。　<ruby>男<rt>おとこ</rt></ruby>：いいえ、<ruby>見<rt>み</rt></ruby>てるだけです。</p></> },
	{ number: 4, title: <><ruby>会話表現<rt>かいわひょうげん</rt></ruby></>, subtitle: "会話らしい表現", firstTrack: 9, translationPages: [84], answer: <><p><b>1番</b>　①2　②1　③1　④2　⑤1　⑥2</p><p><b>2番</b>　①1　②2　　<b>3番</b>　①2　②1</p></>, script: <><p><b>1番</b>　① <ruby>男<rt>おとこ</rt></ruby>：どう、このシャツ。　<ruby>女<rt>おんな</rt></ruby>：いいんじゃない？<br />② <ruby>男<rt>おとこ</rt></ruby>：あー、<ruby>事故<rt>じこ</rt></ruby>か、まったく。　<ruby>女<rt>おんな</rt></ruby>：<ruby>混<rt>こ</rt></ruby>んでるわけね。<br />③ <ruby>男<rt>おとこ</rt></ruby>：もう<ruby>食<rt>た</rt></ruby>べないの？ ダイエットしてるの？　<ruby>女<rt>おんな</rt></ruby>：そういうわけじゃないけど。<br />④ <ruby>男<rt>おとこ</rt></ruby>：<ruby>開演<rt>かいえん</rt></ruby>まで、あと10<ruby>分<rt>ぷん</rt></ruby>だね。　<ruby>女<rt>おんな</rt></ruby>：<ruby>早<rt>はや</rt></ruby>く<ruby>始<rt>はじ</rt></ruby>まらないかなあ。</p><p><b>2番</b>　① <ruby>男<rt>おとこ</rt></ruby>：この<ruby>自転車<rt>じてんしゃ</rt></ruby>、<ruby>修理<rt>しゅうり</rt></ruby>して<ruby>何年<rt>なんねん</rt></ruby>も<ruby>使<rt>つか</rt></ruby>ってきたけど、とうとう…。<br />② <ruby>男<rt>おとこ</rt></ruby>：この<ruby>絵<rt>え</rt></ruby>の<ruby>良<rt>よ</rt></ruby>さは、<ruby>私<rt>わたし</rt></ruby>にはさっぱり…。<br /><b>3番</b>　① <ruby>男<rt>おとこ</rt></ruby>：パソコン<ruby>直<rt>なお</rt></ruby>ったよ！　<ruby>女<rt>おんな</rt></ruby>：さすがね！　② <ruby>男<rt>おとこ</rt></ruby>：<ruby>今度<rt>こんど</rt></ruby><ruby>一緒<rt>いっしょ</rt></ruby>に、<ruby>映画<rt>えいが</rt></ruby>でも<ruby>行<rt>い</rt></ruby>きませんか。　<ruby>女<rt>おんな</rt></ruby>：ぜひ。</p></> },
	{ number: 5, title: <>まとめ<ruby>問題<rt>もんだい</rt></ruby></>, subtitle: "総合練習", firstTrack: 12, translationPages: [86, 88], answer: <><p><b>問題Ⅰ</b>　①4　②3　③2　④1　⑤1</p><p><b>問題Ⅱ</b>　1番：①2　②2　③1　④1　⑤2　／　2番：①1　②2　③2　④1　⑤1　／　3番：①2　②1　③2　④1　⑤2　／　4番：①2　②1　③1　④1　⑤2　／　5番：①1　②2　③2　④1　⑤2</p></>, script: <><p><b>問題Ⅰ</b>　①ふうとう（<ruby>封筒<rt>ふうとう</rt></ruby>）　②とけい（<ruby>時計<rt>とけい</rt></ruby>）　③オートマチック　④だいひょう（<ruby>代表<rt>だいひょう</rt></ruby>）　⑤さんぎょう（<ruby>産業<rt>さんぎょう</rt></ruby>）</p><p><b>問題Ⅱ 1番</b>　①<ruby>行<rt>い</rt></ruby>かなきゃ。　②<ruby>見<rt>み</rt></ruby>ちゃおう。　③こっち<ruby>来<rt>き</rt></ruby>て。　④<ruby>見<rt>み</rt></ruby>ないでくれないかなあ。　⑤ご<ruby>乗車<rt>じょうしゃ</rt></ruby>にはなれません。</p><p><b>問題Ⅱ 3番</b>　①30<ruby>分<rt>ぷん</rt></ruby><ruby>待<rt>ま</rt></ruby>っても<ruby>来<rt>こ</rt></ruby>なかったら、<ruby>帰<rt>かえ</rt></ruby>ってもいいことになっています。　②<ruby>給料<rt>きゅうりょう</rt></ruby>がいいわけじゃないけど、この<ruby>仕事<rt>しごと</rt></ruby>が<ruby>好<rt>す</rt></ruby>きなんです。　③<ruby>来週<rt>らいしゅう</rt></ruby>は<ruby>今週<rt>こんしゅう</rt></ruby>ほど<ruby>忙<rt>いそが</rt></ruby>しくないんじゃないかな。</p></> },
] as const;

function AnswerAndScript({ section }: { section: (typeof chapterOneSections)[number] }) {
	return <section className="listening-answer-panels" aria-label="答えと聞き取り原文"><details><summary><span>答え</span><b>表示</b></summary><div>{section.answer}</div></details><details><summary><span><ruby>聞<rt>き</rt></ruby>き<ruby>取<rt>と</rt></ruby>り<ruby>原文<rt>げんぶん</rt></ruby></span><b>表示</b></summary><div>{section.script}</div></details><details><summary><span><ruby>翻訳<rt>ほんやく</rt></ruby></span><b>表示</b></summary><div className="listening-translation-pages">{section.translationPages.map((page) => <img key={page} loading="lazy" src={pageSource(page)} alt={`第1章 第${section.number}節の翻訳`} />)}</div></details></section>;
}

function ChapterOneSectionPanel({ sectionIndex }: { sectionIndex: number }) {
	const section = chapterOneSections[sectionIndex];
	const [cue, setCue] = useState<AudioCue>({ disc: "cd1", track: section.firstTrack });
	const [playRequest, setPlayRequest] = useState(0);
	const [playing, setPlaying] = useState(false);
	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => { if (playRequest) void audioRef.current?.play().catch(() => undefined); }, [cue, playRequest]);
	function toggleCue(next: AudioCue) { const sameCue = cue.disc === next.disc && cue.track === next.track; if (sameCue && audioRef.current && !audioRef.current.paused) { audioRef.current.pause(); return; } setCue(next); setPlayRequest((value) => value + 1); }

	return <div className="listening-section-panel"><ListeningPlayer cue={cue} audioRef={audioRef} onPlaybackChange={setPlaying} />{section.number === 1 ? <PronunciationLesson active={cue} playing={playing} onToggle={toggleCue} /> : null}{section.number === 2 ? <GrammarOneLesson active={cue} playing={playing} onToggle={toggleCue} /> : null}{section.number === 3 ? <GrammarTwoLesson active={cue} playing={playing} onToggle={toggleCue} /> : null}{section.number === 4 ? <ConversationLesson active={cue} playing={playing} onToggle={toggleCue} /> : null}{section.number === 5 ? <section className="listening-exercises">{chapters[0].exercises.filter((exercise) => exercise.page >= 23).map((exercise) => <ExerciseCard key={exercise.page} exercise={exercise} disc="cd1" active={cue} playing={playing} onToggle={toggleCue} />)}</section> : null}<AnswerAndScript section={section} /></div>;
}

function ChapterOneOutline({ onBack }: { onBack: () => void }) {
	const [activeSection, setActiveSection] = useState<number | null>(null);
	return <div className="reader-page reader-page--embedded"><div className="reader-wrap reader-layout"><main className="reader-main listening-detail"><header className="listening-crumb"><button className="listening-crumb__back" onClick={onBack} aria-label="聴解目次へ戻る">‹</button><div className="listening-crumb__path"><span>N3 <ruby>聴解<rt>ちょうかい</rt></ruby></span><i>/</i><b>第 1 章</b></div><h1>準備をしましょう</h1></header><section className="listening-section-catalog"><div className="reader-section-head"><span>第1章</span><h2>5 つの<ruby>節<rt>せつ</rt></ruby></h2></div>{chapterOneSections.map((section, index) => <article key={section.number} className={activeSection === index ? "open" : ""}><button onClick={() => setActiveSection((value) => value === index ? null : index)} aria-expanded={activeSection === index}><span>{section.number}</span><div><b>{section.title}</b><small>{section.subtitle} · CD 1 · {String(section.firstTrack).padStart(2, "0")}〜</small></div><i>{activeSection === index ? "⌃" : "›"}</i></button>{activeSection === index ? <ChapterOneSectionPanel sectionIndex={index} /> : null}</article>)}</section></main></div></div>;
}

type ListeningSectionMenuItem = { number: number; title: ReactNode; subtitle: string; firstTrack: number };

function menuSectionsFor(chapterIndex: number): readonly ListeningSectionMenuItem[] {
	if (chapterIndex === 0) return chapterOneSections;
	return structuredSectionsByChapter[chapterIndex + 1] ?? [];
}

function ListeningCatalog({ onSelect, expandedChapter, onToggleChapter }: { onSelect: (index: number, sectionIndex: number) => void; expandedChapter: number | null; onToggleChapter: (index: number) => void }) {
	return <div className="reader-page reader-page--embedded"><div className="reader-wrap reader-layout"><main className="reader-main reader-catalog listening-catalog">
		<div className="reader-catalog-intro"><span>N3 聴解</span><h1>N3 听解训练</h1><p>5 个训练章节 · 逐题音频 · 点击进入练习</p></div>
		{chapters.map((chapter, index) => { const sections = menuSectionsFor(index); const expanded = expandedChapter === index; return <section className={`reader-week-card listening-chapter-card${expanded ? " expanded" : ""}`} key={chapter.number}><button className="reader-week-card__toggle" onClick={() => onToggleChapter(index)} aria-expanded={expanded}><div><span>第 {chapter.number} 章</span><h2>{chapter.title}</h2><p>{chapter.cn} · {chapter.description}</p></div><b>{expanded ? "收起　⌃" : `展开 ${sections.length} 节　⌄`}</b></button><div className="listening-chapter-card__meta"><span>{chapter.pages}</span><div>{chapter.focus.map((item) => <i key={item}>{item}</i>)}</div></div>{expanded ? <div className="listening-chapter-submenu">{sections.map((section, sectionIndex) => <button key={section.number} onClick={() => onSelect(index, sectionIndex)}><span>{section.number}</span><div><b>{section.title}</b><small>{section.subtitle} · {audioLabel[chapter.disc]} · {String(section.firstTrack).padStart(2, "0")}〜</small></div><i>›</i></button>)}</div> : null}</section>; })}
	</main></div></div>;
}

function ChapterDetail({ chapterIndex, sectionIndex, onBack, hideBack = false }: { chapterIndex: number; sectionIndex?: number; onBack: () => void; hideBack?: boolean }) {
	const chapter = chapters[chapterIndex];
	const chapterOneSection = chapter.number === 1 && sectionIndex !== undefined ? chapterOneSections[sectionIndex] : undefined;
	const structuredSection = chapter.number !== 1 && sectionIndex !== undefined ? structuredSectionsByChapter[chapter.number]?.[sectionIndex] : undefined;
	const answerText = chapter.number !== 1 && sectionIndex !== undefined ? answerTextByChapter[chapter.number]?.[sectionIndex] : undefined;
	const initialCue = useMemo<AudioCue>(() => ({ disc: chapter.disc, track: chapterOneSection?.firstTrack ?? structuredSection?.firstTrack ?? chapter.exercises[0].tracks[0] }), [chapter, chapterOneSection, structuredSection]);
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

	return <div className="reader-page reader-page--embedded"><div className="reader-wrap reader-layout"><main className="reader-main listening-detail">
		<header className="listening-crumb">{hideBack ? null : <button className="listening-crumb__back" onClick={onBack} aria-label="聴解目次へ戻る">‹</button>}<div className="listening-crumb__path"><span>N3 <ruby>聴解<rt>ちょうかい</rt></ruby></span><i>/</i><b>第 {chapter.number} 章{sectionIndex !== undefined ? ` / ${sectionIndex + 1}` : ""}</b></div><h1>{chapterOneSection?.title ?? structuredSection?.title ?? chapter.title}</h1></header>
		<ListeningPlayer cue={cue} audioRef={audioRef} onPlaybackChange={setPlaying} />
		{chapterOneSection ? <>{chapterOneSection.number === 1 ? <PronunciationLesson active={cue} playing={playing} onToggle={toggleCue} /> : null}{chapterOneSection.number === 2 ? <GrammarOneLesson active={cue} playing={playing} onToggle={toggleCue} /> : null}{chapterOneSection.number === 3 ? <GrammarTwoLesson active={cue} playing={playing} onToggle={toggleCue} /> : null}{chapterOneSection.number === 4 ? <ConversationLesson active={cue} playing={playing} onToggle={toggleCue} /> : null}{chapterOneSection.number === 5 ? <section className="listening-exercises">{chapter.exercises.filter((exercise) => exercise.page >= 23).map((exercise) => <ExerciseCard key={exercise.page} exercise={exercise} disc={chapter.disc} active={cue} playing={playing} onToggle={toggleCue} />)}</section> : null}<AnswerAndScript section={chapterOneSection} /></> : structuredSection ? <><StructuredSectionLesson chapter={chapter} section={structuredSection} active={cue} playing={playing} onToggle={toggleCue} />{answerText ? <TextAnswerPanels section={answerText} /> : null}</> : null}
	</main></div></div>;
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

	const chapterIndex = Math.max(0, chapter - 1);
	const sectionIndex = Math.max(0, section - 1);
	const favId = `listening#${chapter}-${section}`;
	const title = menuSectionsFor(chapterIndex)[sectionIndex]?.title;
	const subtitle = menuSectionsFor(chapterIndex)[sectionIndex]?.subtitle || "";
	const titleText = typeof title === "string" ? title : `第${chapter}章 ${section}节`;
	registerFavMeta(favId, {
		module: "listening",
		hash: `#/day/${chapter}-${section}`,
		w: chapter,
		d: section,
		jp: titleText,
		cn: subtitle,
	});
	return (
		<>
			<div style={{ display: "flex", justifyContent: "flex-end", maxWidth: 820, margin: "0 auto 8px", padding: "0 14px" }}>
				<button type="button" className="starb" onClick={() => toggleFav(favId)} aria-label="收藏本节">
					{isFav(favId) ? "★" : "☆"}
				</button>
			</div>
			<ChapterDetail
				key={`${chapterIndex}-${sectionIndex}`}
				chapterIndex={chapterIndex}
				sectionIndex={sectionIndex}
				onBack={() => navTo("#/")}
				hideBack={embedded}
			/>
		</>
	);
}

export default function ListeningN3() {
	return null;
}
