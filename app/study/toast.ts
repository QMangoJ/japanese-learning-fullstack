export type StudyToast = { id: number; text: string };

const EMPTY: StudyToast[] = [];
const listeners = new Set<() => void>();
const timers = new Map<number, number>();

let items: StudyToast[] = EMPTY;
let seq = 0;

function emit() {
	for (const listener of listeners) listener();
}

export function getToasts() {
	return items;
}

export function getServerToasts() {
	return EMPTY;
}

export function subscribeToasts(listener: () => void) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

export function dismissToast(id: number) {
	const timer = timers.get(id);
	if (timer != null && typeof window !== "undefined") window.clearTimeout(timer);
	timers.delete(id);
	if (!items.some((item) => item.id === id)) return;
	items = items.filter((item) => item.id !== id);
	if (!items.length) items = EMPTY;
	emit();
}

export function pushToast(text: string) {
	const id = ++seq;
	const next = [...items, { id, text }].slice(-3);
	const keep = new Set(next.map((item) => item.id));
	for (const [old, timer] of timers) {
		if (keep.has(old) || typeof window === "undefined") continue;
		window.clearTimeout(timer);
		timers.delete(old);
	}
	items = next;
	emit();
	if (typeof window !== "undefined") {
		timers.set(id, window.setTimeout(() => dismissToast(id), 3200));
	}
	return id;
}

export function resetToastsForTests() {
	if (typeof window !== "undefined") {
		for (const timer of timers.values()) window.clearTimeout(timer);
	}
	timers.clear();
	items = EMPTY;
	seq = 0;
	emit();
}
