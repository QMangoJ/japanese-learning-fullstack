import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { dueEntries, getDueVersion, subscribeDue } from "./due-review";
import { jstToday } from "./lesson-review";
import { getMasteryVersion, masteryActivityStamps, subscribeMastery } from "./memory-mastery";
import { lx } from "./store";
import { ACTIVITY_DAYS, countsForDays, dayRange, mameMood, type MameMood } from "./study-activity";
import { StudyFlip } from "./study-flip";
import type { SwipeGrade } from "./swipe-grade";

const STEP = 360 / ACTIVITY_DAYS;
const CX = 100;
const CY = 100;

function clampTurn(turn: number) {
	return Math.min(ACTIVITY_DAYS - 1, Math.max(0, turn));
}

function shortDay(iso: string) {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return "";
	return `${Number(iso.slice(5, 7))}/${Number(iso.slice(8))}`;
}

function Mame({ mood }: { mood: MameMood }) {
	const label =
		mood === "sleepy"
			? lx("今天还没学", "No study yet today")
			: mood === "jump"
				? lx("连着在学", "On a streak")
				: lx("今天学过了", "Studied today");
	return (
		<div className="mame-wrap">
			<svg className={`mame is-${mood}`} width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
				<path className="mame-ear" d="M11 18 L14 7 L18 17" />
				<path className="mame-ear" d="M22 17 L26 7 L29 18" />
				<ellipse className="mame-body" cx="20" cy="24" rx="12" ry="10" />
				<g className="mame-eyes">
					<ellipse cx="15.5" cy="23" rx="1.5" ry="2" />
					<ellipse cx="24.5" cy="23" rx="1.5" ry="2" />
				</g>
				<path className="mame-mouth" d="M17 27.5 Q20 30 23 27.5" />
			</svg>
			<span className="mame-label">{label}</span>
		</div>
	);
}

function RadialTimeline({
	counts,
	days,
	turn,
	onTurn,
}: {
	counts: readonly number[];
	days: readonly string[];
	turn: number;
	onTurn: (turn: number) => void;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const drag = useRef<{ id: number; x: number; turn: number } | null>(null);
	const turnRef = useRef(turn);
	turnRef.current = turn;
	const selected = ACTIVITY_DAYS - 1 - turn;
	const count = counts[selected] ?? 0;
	const date = shortDay(days[selected] || "");
	const peak = counts.reduce((max, n) => (n > max ? n : max), 0);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;
		const onWheel = (event: WheelEvent) => {
			event.preventDefault();
			const delta = event.deltaY !== 0 ? event.deltaY : event.deltaX;
			if (delta === 0) return;
			onTurn(clampTurn(turnRef.current + (delta > 0 ? 1 : -1)));
		};
		node.addEventListener("wheel", onWheel, { passive: false });
		return () => node.removeEventListener("wheel", onWheel);
	}, [onTurn]);

	return (
		<div
			ref={ref}
			className="radial"
			role="slider"
			tabIndex={0}
			aria-label={lx("最近 60 天", "Last 60 days")}
			aria-valuemin={0}
			aria-valuemax={ACTIVITY_DAYS - 1}
			aria-valuenow={turn}
			aria-valuetext={lx(`${date || "今天"} ${count} 次`, `${date || "today"} ${count}`)}
			onKeyDown={(event) => {
				if (event.key === "ArrowLeft") {
					event.preventDefault();
					onTurn(clampTurn(turn + 1));
				} else if (event.key === "ArrowRight") {
					event.preventDefault();
					onTurn(clampTurn(turn - 1));
				} else if (event.key === "Home") {
					event.preventDefault();
					onTurn(0);
				}
			}}
			onPointerDown={(event) => {
				if (event.button !== 0) return;
				drag.current = { id: event.pointerId, x: event.clientX, turn };
				try {
					event.currentTarget.setPointerCapture(event.pointerId);
				} catch {
					/* jsdom */
				}
			}}
			onPointerMove={(event) => {
				const start = drag.current;
				if (!start || event.pointerId !== start.id) return;
				const steps = Math.round((start.x - event.clientX) / 28);
				onTurn(clampTurn(start.turn + steps));
			}}
			onPointerUp={() => {
				drag.current = null;
			}}
			onPointerCancel={() => {
				drag.current = null;
			}}
		>
			<svg viewBox="0 0 200 200" aria-hidden="true">
				<g transform={`rotate(${turn * STEP} ${CX} ${CY})`}>
					{counts.map((n, i) => {
						const length = peak > 0 && n > 0 ? 12 + (n / peak) * 26 : 10;
						const angle = ((i - (ACTIVITY_DAYS - 1)) / ACTIVITY_DAYS) * Math.PI * 2 - Math.PI / 2;
						const x1 = CX + Math.cos(angle) * 54;
						const y1 = CY + Math.sin(angle) * 54;
						const x2 = CX + Math.cos(angle) * (54 + length);
						const y2 = CY + Math.sin(angle) * (54 + length);
						const hot = n > 0 ? " is-hot" : "";
						const on = i === selected ? " is-on" : "";
						return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className={`${hot}${on}`} />;
					})}
				</g>
			</svg>
			<div className="radial-num">
				<span className="radial-num__n" key={`${selected}-${count}`}>
					{count}
				</span>
				<span className="radial-num__d">{date}</span>
			</div>
		</div>
	);
}

function DemoCard() {
	const [flipped, setFlipped] = useState(false);
	const [note, setNote] = useState("");
	const grade = (next: SwipeGrade) => {
		setNote(next === "pass" ? lx("记住了", "Got it") : next === "fail" ? lx("忘了", "Missed") : lx("模糊", "Unsure"));
		setFlipped(true);
	};
	return (
		<div className="study-demo__card">
			<StudyFlip
				flipped={flipped}
				onFlip={() => setFlipped((value) => !value)}
				onGrade={grade}
				onSwipe={grade}
				front={
					<>
						<div className="big jp">食べる</div>
						<div className="hint">{lx("点一下，或左右拖", "Tap, or drag left and right")}</div>
					</>
				}
				back={
					<div className="backside" style={{ textAlign: "center" }}>
						<div className="jp" style={{ fontWeight: 700, fontSize: 24 }}>
							食べる
						</div>
						<div className="review-reading jp">たべる</div>
						<div className="cn">{lx("吃", "to eat")}</div>
					</div>
				}
			/>
			<div className="ending-swap__forms">
				<button type="button" onClick={() => grade("fail")}>
					{lx("忘了", "Missed")}
				</button>
				<button type="button" onClick={() => grade("fuzzy")}>
					{lx("模糊", "Unsure")}
				</button>
				<button type="button" onClick={() => grade("pass")}>
					{lx("记住了", "Got it")}
				</button>
			</div>
			{note ? <div className="meta study-demo__note">{note}</div> : null}
		</div>
	);
}

export function StudyHomePlay() {
	const dueVersion = useSyncExternalStore(subscribeDue, getDueVersion, () => 0);
	const masteryVersion = useSyncExternalStore(subscribeMastery, getMasteryVersion, () => 0);
	const [counts, setCounts] = useState<number[]>(() => Array.from({ length: ACTIVITY_DAYS }, () => 0));
	const [days, setDays] = useState<string[]>(() => Array.from({ length: ACTIVITY_DAYS }, () => ""));
	const [turn, setTurn] = useState(0);
	const [demo, setDemo] = useState(false);
	const mood = mameMood(counts);

	useEffect(() => {
		const nextDays = dayRange(jstToday(), ACTIVITY_DAYS);
		const stamps = [...dueEntries().map((entry) => entry.ts), ...masteryActivityStamps()];
		setDays(nextDays);
		setCounts(countsForDays(stamps, nextDays));
	}, [dueVersion, masteryVersion]);

	return (
		<section className="study-play" aria-label={lx("学习记录", "Study log")}>
			<div className="study-play__row">
				<Mame mood={mood} />
				<RadialTimeline counts={counts} days={days} turn={turn} onTurn={setTurn} />
			</div>
			<details
				className="study-demo"
				onToggle={(event) => setDemo(event.currentTarget.open)}
			>
				<summary>{lx("试一张单词卡", "Try a flashcard")}</summary>
				{demo ? <DemoCard /> : null}
			</details>
		</section>
	);
}
