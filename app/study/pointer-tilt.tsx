import { useEffect } from "react";

import { fineHover, prefersReducedMotion } from "./motion-pref";

const TILT_SELECTOR = ".tilt-card";
const MAX_TILT = 3;

function closestCard(target: EventTarget | null) {
	return target instanceof Element ? (target.closest(TILT_SELECTOR) as HTMLElement | null) : null;
}

function clearTilt(el: HTMLElement) {
	el.style.removeProperty("--mx");
	el.style.removeProperty("--my");
	el.style.removeProperty("--tilt-x");
	el.style.removeProperty("--tilt-y");
}

/**
 * One document listener writes --mx/--my/--tilt-* on the card under the pointer.
 * Reads are batched to one animation frame so React never re-renders for the cursor.
 */
export function bindPointerTilt(scope: Document | HTMLElement = document) {
	const root = scope;
	const listenTarget = scope;
	let frame = 0;
	let current: HTMLElement | null = null;
	let px = 0;
	let py = 0;
	let down: { id: number; x: number; y: number } | null = null;
	let reduced = prefersReducedMotion();
	let fine = fineHover();

	const refresh = () => {
		reduced = prefersReducedMotion();
		fine = fineHover();
		if (reduced) clearLit();
	};

	const reducedQuery = typeof matchMedia === "function" ? matchMedia("(prefers-reduced-motion: reduce)") : null;
	const fineQuery = typeof matchMedia === "function" ? matchMedia("(hover: hover) and (pointer: fine)") : null;
	reducedQuery?.addEventListener?.("change", refresh);
	fineQuery?.addEventListener?.("change", refresh);

	const clearLit = () => {
		if (frame) cancelAnimationFrame(frame);
		frame = 0;
		if (current) clearTilt(current);
		current = null;
		root.querySelectorAll(`${TILT_SELECTOR}.is-lit`).forEach((el) => el.classList.remove("is-lit"));
	};

	const flush = () => {
		frame = 0;
		if (!current || reduced || !fine) return;
		const rect = current.getBoundingClientRect();
		const width = rect.width || 1;
		const height = rect.height || 1;
		const nx = (px - rect.left) / width;
		const ny = (py - rect.top) / height;
		const tiltY = Math.max(-MAX_TILT, Math.min(MAX_TILT, (nx - 0.5) * (MAX_TILT * 2)));
		const tiltX = Math.max(-MAX_TILT, Math.min(MAX_TILT, (0.5 - ny) * (MAX_TILT * 2)));
		current.style.setProperty("--mx", `${(nx * 100).toFixed(2)}%`);
		current.style.setProperty("--my", `${(ny * 100).toFixed(2)}%`);
		current.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
		current.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
	};

	const onMove = (event: PointerEvent) => {
		if (reduced || !fine || event.pointerType === "touch") return;
		const next = closestCard(event.target);
		if (current && current !== next) clearTilt(current);
		current = next;
		if (!current) return;
		px = event.clientX;
		py = event.clientY;
		if (!frame) frame = requestAnimationFrame(flush);
	};

	const onDown = (event: PointerEvent) => {
		down = { id: event.pointerId, x: event.clientX, y: event.clientY };
	};

	const onUp = (event: PointerEvent) => {
		const start = down;
		down = null;
		if (reduced) return;
		const touch = event.pointerType === "touch" || !fine;
		if (!touch) return;
		if (start && start.id === event.pointerId && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 8) return;
		const card = closestCard(event.target);
		if (!card) {
			clearLit();
			return;
		}
		if (event.target instanceof Element && event.target.closest("button, a, input, textarea, select")) return;
		const on = card.classList.contains("is-lit");
		root.querySelectorAll(`${TILT_SELECTOR}.is-lit`).forEach((el) => el.classList.remove("is-lit"));
		if (!on) card.classList.add("is-lit");
	};

	const onLeave = () => {
		if (current) clearTilt(current);
		current = null;
	};

	listenTarget.addEventListener("pointermove", onMove as EventListener, { passive: true });
	listenTarget.addEventListener("pointerdown", onDown as EventListener, { passive: true });
	listenTarget.addEventListener("pointerup", onUp as EventListener);
	listenTarget.addEventListener("pointercancel", onUp as EventListener);
	if (scope === document) document.documentElement.addEventListener("pointerleave", onLeave);

	return () => {
		clearLit();
		listenTarget.removeEventListener("pointermove", onMove as EventListener);
		listenTarget.removeEventListener("pointerdown", onDown as EventListener);
		listenTarget.removeEventListener("pointerup", onUp as EventListener);
		listenTarget.removeEventListener("pointercancel", onUp as EventListener);
		if (scope === document) document.documentElement.removeEventListener("pointerleave", onLeave);
		reducedQuery?.removeEventListener?.("change", refresh);
		fineQuery?.removeEventListener?.("change", refresh);
	};
}

export function PointerTiltRoot() {
	useEffect(() => bindPointerTilt(document), []);
	return null;
}
