import { flushSync } from "react-dom";
import { useState } from "react";

export type EndingForm = { ending: string; label: string };

function reducedMotion() {
	return typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type ViewDocument = Document & { startViewTransition?: (callback: () => void) => void };

function swapEnding(update: () => void) {
	const doc = (typeof document === "undefined" ? null : document) as ViewDocument | null;
	if (doc?.startViewTransition && !reducedMotion()) {
		doc.startViewTransition(() => {
			flushSync(update);
		});
		return;
	}
	update();
}

/** One widget per page so `view-transition-name` stays unique. */
export function EndingSwap({
	title,
	stem,
	forms,
}: {
	title: string;
	stem: string;
	forms: readonly EndingForm[];
}) {
	const [index, setIndex] = useState(0);
	const form = forms[index] ?? forms[0];
	if (!form) return null;
	return (
		<div className="card ending-swap">
			<div className="ending-swap__title">{title}</div>
			<p className="ending-swap__word jp">
				<span className="ending-swap__stem">{stem}</span>
				<span className="ending-swap__end" style={{ viewTransitionName: "ending-swap" }}>
					{form.ending}
				</span>
			</p>
			<div className="ending-swap__forms">
				{forms.map((item, i) => (
					<button
						type="button"
						key={item.ending}
						className={i === index ? "on" : ""}
						aria-pressed={i === index}
						onClick={() => {
							if (i === index) return;
							swapEnding(() => setIndex(i));
						}}
					>
						{item.label}
					</button>
				))}
			</div>
		</div>
	);
}
