import type { ReactNode } from "react";

/** Replays a transform/opacity roll whenever the displayed value changes. */
export function TickText({ value }: { value: ReactNode }) {
	const text = value == null ? "" : String(value);
	return (
		<span className="tick-text" key={text}>
			{text}
		</span>
	);
}

/** One text node so "n / total" stays a single accessible string. */
export function CountPair({ current, total }: { current: number; total: number }) {
	return <TickText value={`${current} / ${total}`} />;
}
