import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import "./exercise-progress.css";

type QuestionProgress = { picked?: number; expanded?: boolean };
type Progress = Record<string, QuestionProgress>;
const PREFIX = "jl-exercise-progress-v1:";
// Used only on the client, when browser storage is unavailable or full.
const fallback = new Map<string, Progress>();
const unsaved = new Set<string>();

function readProgress(scope: string): Progress {
	if (unsaved.has(scope)) return fallback.get(scope) || {};
	try {
		const raw = JSON.parse(window.sessionStorage.getItem(PREFIX + scope) || "{}");
		if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
		return Object.fromEntries(Object.entries(raw).filter(([, value]) => {
			if (!value || typeof value !== "object" || Array.isArray(value)) return false;
			const { picked, expanded } = value as QuestionProgress;
			return (picked === undefined || (Number.isInteger(picked) && picked > 0)) &&
				(expanded === undefined || typeof expanded === "boolean");
		})) as Progress;
	} catch {
		return fallback.get(scope) || {};
	}
}

function saveProgress(scope: string, progress: Progress) {
	fallback.set(scope, progress);
	try {
		if (Object.keys(progress).length) window.sessionStorage.setItem(PREFIX + scope, JSON.stringify(progress));
		else window.sessionStorage.removeItem(PREFIX + scope);
		unsaved.delete(scope);
	} catch {
		unsaved.add(scope);
		// Navigation still preserves the attempt through the in-memory fallback.
	}
}

const ExerciseContext = createContext<{
	progress: Progress;
	update: (id: string, patch: QuestionProgress) => void;
	reset: () => void;
} | null>(null);

/** Mount with key={scope} so different modules/days never share React state. */
export function ExerciseSession({ scope, children }: { scope: string; children: ReactNode }) {
	const [progress, setProgress] = useState<Progress>({});
	const current = useRef<Progress>({});
	useEffect(() => {
		current.current = readProgress(scope);
		setProgress(current.current);
	}, [scope]);
	const commit = (next: Progress) => {
		current.current = next;
		// Save during the interaction, before a following route change can unmount us.
		saveProgress(scope, next);
		setProgress(next);
	};
	return (
		<ExerciseContext.Provider value={{
			progress,
			update: (id, patch) => commit({ ...current.current, [id]: { ...current.current[id], ...patch } }),
			reset: () => commit({}),
		}}>
			{children}
		</ExerciseContext.Provider>
	);
}

export function useQuestionProgress(id: string) {
	const session = useContext(ExerciseContext);
	const [local, setLocal] = useState<QuestionProgress>({});
	const update = (patch: QuestionProgress) => {
		if (session) session.update(id, patch);
		else setLocal((previous) => ({ ...previous, ...patch }));
	};
	return [session ? session.progress[id] || {} : local, update] as const;
}

export function ExerciseReset({ label }: { label: string }) {
	const session = useContext(ExerciseContext);
	return (
		<div className="exercise-session-toolbar">
			<button type="button" className="ansbtn" disabled={!session || !Object.keys(session.progress).length} onClick={() => session?.reset()}>
				{label}
			</button>
		</div>
	);
}
