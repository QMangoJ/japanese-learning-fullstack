import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";

import { swipeDecision, type SwipeGrade } from "./swipe-grade";

const FLY_MS = 240;

function reducedMotion() {
	return typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function editableTarget(target: EventTarget | null) {
	return target instanceof Element && Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
}

function nestedControl(target: EventTarget | null, current: EventTarget | null) {
	if (!(target instanceof Element) || target === current) return false;
	return Boolean(target.closest("button, a, input, textarea, select, .plink"));
}

export function KanaStagger({ text }: { text: string }) {
	const chars = Array.from(text);
	if (!chars.length) return null;
	return (
		<span className="kana-stagger-wrap">
			<span className="kana-plain">{text}</span>
			<span className="kana-stagger" aria-hidden="true">
				{chars.map((ch, index) => (
					<span key={`${ch}-${index}`} style={{ ["--ch" as string]: JSON.stringify(ch), animationDelay: `${index * 30}ms` }} />
				))}
			</span>
		</span>
	);
}

function stampOf(dx: number, dy: number): SwipeGrade | null {
	const ax = Math.abs(dx);
	const ay = Math.abs(dy);
	if (ax < 24 && ay < 24) return null;
	if (dy < 0 && ay > ax) return "fuzzy";
	if (dx > 0 && ax >= ay) return "pass";
	if (dx < 0 && ax >= ay) return "fail";
	return null;
}

const STAMP: Record<SwipeGrade, string> = { pass: "○", fail: "×", fuzzy: "模糊" };

export function StudyFlip({
	flipped,
	onFlip,
	front,
	back,
	onGrade,
	onSwipe,
	fav = false,
	instant = false,
}: {
	flipped: boolean;
	onFlip: () => void;
	front: ReactNode;
	back: ReactNode;
	/** Button-equivalent grades. Keys use this and do not advance the deck. */
	onGrade?: (grade: SwipeGrade) => void;
	/** Completed drag. Falls back to onGrade. */
	onSwipe?: (grade: SwipeGrade) => void;
	fav?: boolean;
	/** Swap faces immediately. Lesson review uses this; other decks keep the 3D turn. */
	instant?: boolean;
}) {
	const [holdBack, setHoldBack] = useState(false);
	const [drag, setDrag] = useState<{ dx: number; dy: number } | null>(null);
	const [fly, setFly] = useState<SwipeGrade | null>(null);
	const pointer = useRef<{ id: number; x: number; y: number; t: number; moved: boolean } | null>(null);
	const suppressClick = useRef(false);
	const cardRef = useRef<HTMLDivElement>(null);
	const flyTimer = useRef<number | null>(null);
	const gradeKeys = onGrade ?? onSwipe;
	const swipeTo = onSwipe ?? onGrade;
	const showBack = instant ? flipped : flipped || holdBack;

	useEffect(() => {
		if (instant) return;
		if (flipped) {
			setHoldBack(true);
			return;
		}
		if (!holdBack) return;
		const delay = reducedMotion() ? 0 : 260;
		const id = window.setTimeout(() => setHoldBack(false), delay);
		return () => window.clearTimeout(id);
	}, [flipped, holdBack, instant]);

	useEffect(() => {
		return () => {
			if (flyTimer.current != null) window.clearTimeout(flyTimer.current);
		};
	}, []);

	useEffect(() => {
		if (!gradeKeys) return;
		const onKey = (event: KeyboardEvent) => {
			if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
			if (editableTarget(event.target)) return;
			const grade = event.key === "1" ? "fail" : event.key === "2" ? "fuzzy" : event.key === "3" ? "pass" : null;
			if (!grade) return;
			event.preventDefault();
			gradeKeys(grade);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [gradeKeys]);

	const release = (grade: SwipeGrade) => {
		if (!swipeTo) return;
		if (reducedMotion()) {
			setDrag(null);
			swipeTo(grade);
			return;
		}
		setFly(grade);
		setDrag(null);
		if (flyTimer.current != null) window.clearTimeout(flyTimer.current);
		flyTimer.current = window.setTimeout(() => {
			flyTimer.current = null;
			setFly(null);
			swipeTo(grade);
		}, FLY_MS);
	};

	const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
		if (!swipeTo || fly || event.button !== 0) return;
		if (nestedControl(event.target, event.currentTarget)) return;
		pointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY, t: performance.now(), moved: false };
		try {
			event.currentTarget.setPointerCapture(event.pointerId);
		} catch {
			/* jsdom may not implement capture */
		}
	};

	const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
		const start = pointer.current;
		if (!start || event.pointerId !== start.id || fly) return;
		const dx = event.clientX - start.x;
		const dy = event.clientY - start.y;
		if (Math.hypot(dx, dy) > 8) start.moved = true;
		setDrag({ dx, dy });
	};

	const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
		const start = pointer.current;
		if (!start || event.pointerId !== start.id) return;
		pointer.current = null;
		const dx = event.clientX - start.x;
		const dy = event.clientY - start.y;
		if (start.moved) suppressClick.current = true;
		const grade = swipeTo ? swipeDecision(dx, dy, performance.now() - start.t) : null;
		if (grade) {
			suppressClick.current = true;
			release(grade);
			return;
		}
		setDrag(null);
	};

	const flipTurn = instant ? 0 : flipped ? 180 : 0;
	const rot = drag ? Math.max(-12, Math.min(12, drag.dx / 8)) : 0;
	const turn = instant ? "" : ` rotateY(${flipTurn}deg)`;
	let transform = instant ? "none" : `rotateY(${flipTurn}deg)`;
	if (fly === "pass") transform = `translate(120%, -8%) rotate(12deg)${turn}`;
	else if (fly === "fail") transform = `translate(-120%, -8%) rotate(-12deg)${turn}`;
	else if (fly === "fuzzy") transform = `translateY(-120%)${turn}`;
	else if (drag) transform = `translate(${drag.dx}px, ${drag.dy}px) rotate(${rot}deg)${turn}`;
	const rotorStyle: CSSProperties = { transform };
	const hint = fly || (drag ? stampOf(drag.dx, drag.dy) : null);

	return (
		<div
			className={`fcard-slot${instant ? " is-instant" : ""}${hint ? ` is-${hint}` : ""}${fly ? " is-flying" : ""}`}
		>
			<div
				ref={cardRef}
				className={`fcard${instant ? " is-instant" : ""}${flipped ? " is-flipped" : ""}${swipeTo ? " is-swipeable" : ""}`}
				tabIndex={0}
				{...(fav ? { "data-favflip": "" } : { "data-fcflip": "1" })}
				onClick={(event) => {
					if (suppressClick.current) {
						suppressClick.current = false;
						return;
					}
					if (nestedControl(event.target, event.currentTarget)) return;
					onFlip();
				}}
				onKeyDown={(event) => {
					if (nestedControl(event.target, event.currentTarget)) return;
					if (event.key !== " " && event.key !== "Enter") return;
					event.preventDefault();
					onFlip();
				}}
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={onPointerUp}
				onPointerCancel={onPointerUp}
			>
				<div className={`fcard-rotor${drag ? " is-dragging" : ""}${fly ? " is-flying" : ""}`} style={rotorStyle}>
					<div className="fcard-face fcard-front">{front}</div>
					{showBack ? <div className="fcard-face fcard-back">{back}</div> : null}
				</div>
				{hint ? (
					<div className={`swipe-stamp is-${hint}`} aria-hidden="true">
						{STAMP[hint]}
					</div>
				) : null}
			</div>
		</div>
	);
}
