import type { ReactNode } from "react";

export function Hanamaru() {
	return (
		<svg className="hanamaru" viewBox="0 0 32 32" aria-hidden="true">
			<circle cx="16" cy="16" r="11" />
		</svg>
	);
}

/** Correct answers get a 花丸 stamp. The shake and underline live on the existing option classes. */
export function AnswerFeedback({ verdict, children }: { verdict: "correct" | "wrong" | "idle"; children: ReactNode }) {
	return (
		<>
			{children}
			{verdict === "correct" ? <Hanamaru /> : null}
		</>
	);
}
