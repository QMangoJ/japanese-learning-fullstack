import { useEffect } from "react";

import { prefersReducedMotion } from "./motion-pref";

/**
 * Motion Prompt #166 "Like button animation" (pack lp2), mapped onto the
 * app's favorite buttons (.starb / .exam-fav-btn — every one of them renders
 * ☆ when unsaved and ★ when saved, so a capture-phase click listener can
 * read the pre-click state without touching any call site).
 *
 * Spec mapping (https://showheyohtaki.github.io/motion-prompt/api/v1/en/e/166.txt):
 * - press anticipation: squeeze to 0.78x (the :active rule in public/study.css)
 * - on save: pop 0.78 -> 1.45 in 0.12 s (cubic ease-out), then settle with the
 *   spec's damped spring 1 + 0.45 * e^(-7t) * cos(15t), sampled into keyframes
 * - 0.08-0.58 s: a ring grows from ~1.0x to ~2.3x the glyph size, opacity
 *   0.5 -> 0, and six particles fly out in six directions (red/yellow/orange)
 *   from ~0.85x to ~1.3x the glyph size while fading
 * - on unsave: a plain dip to 0.84x and back over 0.4 s, no particles
 * The spec's count roll does not apply (favorites show no count here).
 * Reduced motion: nothing plays.
 */
const PARTICLE_COLORS = ["#f23d5c", "#ffb020", "#ff8a3d"];

function popAnimation(el: HTMLElement) {
	const frames: Keyframe[] = [
		{ transform: "scale(0.78)", offset: 0 },
		{ transform: "scale(1.31)", offset: 0.057 },
		{ transform: "scale(1.45)", offset: 0.114 },
	];
	const springSeconds = 0.93;
	const steps = 28;
	for (let i = 1; i <= steps; i++) {
		const t = (i / steps) * springSeconds;
		const v = 1 + 0.45 * Math.exp(-7 * t) * Math.cos(15 * t);
		frames.push({ transform: `scale(${v.toFixed(4)})`, offset: 0.114 + (t / (springSeconds + 0.12)) * 0.886 });
	}
	el.animate(frames, { duration: 1050, easing: "linear" });
}

function dipAnimation(el: HTMLElement) {
	const frames: Keyframe[] = [];
	const steps = 12;
	for (let i = 0; i <= steps; i++) {
		const q = i / steps;
		frames.push({ transform: `scale(${(1 - 0.16 * Math.sin(Math.PI * q)).toFixed(4)})`, offset: q });
	}
	el.animate(frames, { duration: 400, easing: "linear" });
}

function burst(el: HTMLElement) {
	// Overlay nodes live on <body> with viewport (fixed) coordinates: nodes
	// appended inside the button itself are wiped when React re-renders the
	// button's children on the favorite toggle.
	const size = parseFloat(getComputedStyle(el).fontSize) || 19;
	const rect = el.getBoundingClientRect();
	const cx = `${(rect.left + rect.width / 2).toFixed(1)}px`;
	const cy = `${(rect.top + rect.height / 2).toFixed(1)}px`;
	const ring = document.createElement("span");
	ring.className = "fav-burst-ring";
	ring.style.width = ring.style.height = `${(size * 1.05).toFixed(1)}px`;
	ring.style.left = cx;
	ring.style.top = cy;
	document.body.appendChild(ring);
	ring
		.animate(
			[
				{ transform: "translate(-50%, -50%) scale(1)", opacity: 0.5 },
				{ transform: "translate(-50%, -50%) scale(2.3)", opacity: 0 },
			],
			{ duration: 500, delay: 80, easing: "ease-out", fill: "backwards" },
		)
		.finished.catch(() => {})
		.finally(() => ring.remove());
	for (let i = 0; i < 6; i++) {
		const angle = -Math.PI / 2 + (i * Math.PI) / 3;
		const dot = document.createElement("span");
		dot.className = "fav-burst-dot";
		dot.style.backgroundColor = PARTICLE_COLORS[i % PARTICLE_COLORS.length];
		dot.style.left = cx;
		dot.style.top = cy;
		document.body.appendChild(dot);
		const r0 = size * 0.85;
		const r1 = size * 1.3;
		dot.animate(
			[
				{ transform: `translate(-50%, -50%) translate(${Math.cos(angle) * r0}px, ${Math.sin(angle) * r0}px) scale(1)`, opacity: 1 },
				{ transform: `translate(-50%, -50%) translate(${Math.cos(angle) * r1}px, ${Math.sin(angle) * r1}px) scale(0.5)`, opacity: 0 },
			],
			{ duration: 500, delay: 80, easing: "ease-out", fill: "backwards" },
		)
			.finished.catch(() => {})
			.finally(() => dot.remove());
	}
}

export function FavBurstRoot() {
	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement | null;
			const btn = target?.closest?.(".starb, .exam-fav-btn") as HTMLElement | null;
			if (!btn || btn.hasAttribute("disabled") || prefersReducedMotion()) return;
			// Capture phase: the DOM still shows the pre-click ☆/★ state.
			if ((btn.textContent || "").includes("☆")) {
				popAnimation(btn);
				burst(btn);
			} else {
				dipAnimation(btn);
			}
		};
		document.addEventListener("click", onClick, true);
		return () => document.removeEventListener("click", onClick, true);
	}, []);
	return null;
}
