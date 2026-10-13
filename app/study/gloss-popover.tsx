import { useEffect, useId, useRef, useState, type ReactNode, type PointerEvent as ReactPointerEvent, type FocusEvent as ReactFocusEvent } from "react";

import { fineHover } from "./motion-pref";

/** Readings already stored as ruby, with the kana standing in for each kanji run. */
export function rubyReading(html?: string) {
	if (!html || !html.includes("<rt")) return "";
	return html
		.replace(/<ruby>([^<]*)<rt>([^<]*)<\/rt><\/ruby>/gi, (_match, base: string, rt: string) => (rt || base || "").trim())
		.replace(/<[^>]+>/g, "")
		.trim();
}

function plain(value?: string) {
	return String(value || "")
		.replace(/<[^>]+>/g, "")
		.trim();
}

/**
 * Peek at a reading, meaning, or example that already lives on the item.
 * Hover opens it for fine pointers. Tap toggles it on touch. Esc and an outside
 * press close it. The bubble itself ignores hits so star/speak buttons stay clickable.
 */
export function GlossPopover({
	reading,
	meaning,
	example,
	children,
}: {
	reading?: string;
	meaning?: string;
	example?: string;
	children: ReactNode;
}) {
	const read = plain(reading);
	const mean = plain(meaning);
	const ex = plain(example);
	const id = useId();
	const anchorRef = useRef<HTMLSpanElement>(null);
	const fromPointer = useRef(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!open) return;
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};
		const onPointerDown = (event: PointerEvent) => {
			const anchor = anchorRef.current;
			if (anchor && event.target instanceof Node && anchor.contains(event.target)) return;
			setOpen(false);
		};
		document.addEventListener("keydown", onKey);
		document.addEventListener("pointerdown", onPointerDown, true);
		return () => {
			document.removeEventListener("keydown", onKey);
			document.removeEventListener("pointerdown", onPointerDown, true);
		};
	}, [open]);

	if (!read && !mean && !ex) return <>{children}</>;

	const toggleFromTap = () => {
		// A mouse on a hovering device already opened the bubble. Touch toggles.
		const last = anchorRef.current?.dataset.pointer || "";
		if (fineHover() && last !== "touch") return;
		setOpen((value) => !value);
	};

	const onPointerEnter = (event: ReactPointerEvent<HTMLSpanElement>) => {
		if (event.pointerType === "touch" || !fineHover()) return;
		setOpen(true);
	};

	const onPointerLeave = (event: ReactPointerEvent<HTMLSpanElement>) => {
		if (event.pointerType === "touch" || !fineHover()) return;
		const next = event.relatedTarget;
		if (next instanceof Node && event.currentTarget.contains(next)) return;
		setOpen(false);
	};

	const onFocus = () => {
		if (fromPointer.current) return;
		setOpen(true);
	};

	const onBlur = (event: ReactFocusEvent<HTMLSpanElement>) => {
		fromPointer.current = false;
		const next = event.relatedTarget;
		if (next instanceof Node && event.currentTarget.contains(next)) return;
		setOpen(false);
	};

	return (
		<span
			ref={anchorRef}
			className="gloss-anchor"
			tabIndex={0}
			aria-expanded={open}
			aria-describedby={open ? id : undefined}
			onPointerEnter={onPointerEnter}
			onPointerLeave={onPointerLeave}
			onPointerDown={(event) => {
				fromPointer.current = true;
				event.currentTarget.dataset.pointer = event.pointerType || "";
			}}
			onFocus={onFocus}
			onBlur={onBlur}
			onClick={(event) => {
				if (event.target instanceof Element && event.target.closest("button, a, input, textarea, select")) return;
				toggleFromTap();
			}}
			onKeyDown={(event) => {
				if (event.key !== "Enter" && event.key !== " ") return;
				event.preventDefault();
				setOpen((value) => !value);
			}}
		>
			{children}
			{open ? (
				<span className="gloss-pop" id={id} role="tooltip">
					{read ? <span className="gloss-pop__read jp">{read}</span> : null}
					{mean ? <span className="gloss-pop__mean">{mean}</span> : null}
					{ex ? <span className="gloss-pop__ex">{ex}</span> : null}
				</span>
			) : null}
		</span>
	);
}
