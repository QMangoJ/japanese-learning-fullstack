import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
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
		pages: "练习页 12–22",
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
		<section className="reader-hero reader-studybar"><div className="reader-breadcrumb"><span>N3 <ruby>聴解<rt>ちょうかい</rt></ruby></span><span>/</span><b>第 {chapter.number} 章</b></div><div className="reader-studybar__body"><div><button className="reader-back" onClick={onBack}>‹ <ruby>聴解<rt>ちょうかい</rt></ruby>目次</button><span>第 {chapter.number} 章</span><h1>{chapter.title}</h1></div></div></section>
		<ListeningPlayer cue={cue} audioRef={audioRef} onPlaybackChange={setPlaying} />
		{chapter.number === 1 ? <PronunciationLesson active={cue} playing={playing} onToggle={toggleCue} /> : <section className="listening-exercises">{chapter.exercises.map((exercise) => <ExerciseCard key={exercise.page} exercise={exercise} disc={chapter.disc} active={cue} playing={playing} onToggle={toggleCue} />)}</section>}
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
