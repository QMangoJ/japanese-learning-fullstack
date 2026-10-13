import { useEffect, useRef, type ReactNode, type RefObject } from "react";

import { prefersReducedMotion } from "./motion-pref";

/** Press ripple anchored with --rx/--ry. Reduced motion and answered buttons stay still. */
export function attachOptRipple(button: HTMLElement) {
	let frame = 0;
	const onDown = (event: PointerEvent) => {
		if (event.button !== 0 || prefersReducedMotion()) return;
		if (button.closest(".qz.answered")) return;
		const host = button.querySelector(".opt-ripples");
		if (!(host instanceof HTMLElement)) return;
		const rect = button.getBoundingClientRect();
		const existing = host.querySelector(".opt-ripple");
		const ripple = existing instanceof HTMLElement ? existing : document.createElement("span");
		if (ripple.parentElement !== host) {
			ripple.className = "opt-ripple";
			ripple.setAttribute("aria-hidden", "true");
			host.appendChild(ripple);
		}
		ripple.style.setProperty("--rx", `${event.clientX - rect.left}px`);
		ripple.style.setProperty("--ry", `${event.clientY - rect.top}px`);
		ripple.classList.remove("is-on");
		if (frame) cancelAnimationFrame(frame);
		frame = requestAnimationFrame(() => {
			frame = 0;
			ripple.classList.add("is-on");
		});
	};
	button.addEventListener("pointerdown", onDown);
	return () => {
		if (frame) cancelAnimationFrame(frame);
		button.removeEventListener("pointerdown", onDown);
	};
}

export function useOptRipple(ref: RefObject<HTMLElement | null>) {
	useEffect(() => {
		const button = ref.current;
		if (!button) return;
		return attachOptRipple(button);
	}, [ref]);
}

export function OptButton({
	className,
	idx,
	pressed,
	onPick,
	children,
}: {
	className: string;
	idx: number;
	pressed: boolean;
	onPick: () => void;
	children: ReactNode;
}) {
	const ref = useRef<HTMLButtonElement>(null);
	useOptRipple(ref);
	return (
		<button ref={ref} type="button" className={className} data-optidx={idx} aria-pressed={pressed} onClick={onPick}>
			<span className="opt-ripples" aria-hidden="true" />
			<span className="opt-label">{children}</span>
		</button>
	);
}
