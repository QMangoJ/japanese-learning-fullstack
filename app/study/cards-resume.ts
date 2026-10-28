/**
 * 记忆卡「上次看到哪里」: per module, the last week/day scope and, per scope, the card
 * position (index, current card id, shuffle order, filters). Device-local (localStorage),
 * like lastVisit / lastDay; mastery marks keep their own server sync.
 */
export const CARDS_RESUME_KEY = "fc-resume";

const MAX_SCOPES = 24;
const MAX_ORDER = 5_000;

export type ResumePos = {
	idx: number;
	cardId?: string;
	order?: string[];
	kind?: string;
	skill?: string;
	prompt?: string;
	ts?: number;
};

type ModuleResume = { week: number; day: number; ts: number; scopes: Record<string, ResumePos> };
type ResumeStore = Record<string, ModuleResume>;

function readStore(): ResumeStore {
	try {
		const raw = localStorage.getItem(CARDS_RESUME_KEY);
		const parsed = raw ? JSON.parse(raw) : null;
		return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
	} catch {
		return {};
	}
}

function writeStore(store: ResumeStore) {
	try {
		localStorage.setItem(CARDS_RESUME_KEY, JSON.stringify(store));
	} catch {
		/* quota / private mode */
	}
}

const num = (value: unknown) => (typeof value === "number" && Number.isFinite(value) && value >= 0 ? Math.floor(value) : 0);

function moduleEntry(store: ResumeStore, module: string): ModuleResume {
	const raw = store[module];
	if (raw && typeof raw === "object") {
		return {
			week: num(raw.week),
			day: num(raw.day),
			ts: num(raw.ts),
			scopes: raw.scopes && typeof raw.scopes === "object" ? raw.scopes : {},
		};
	}
	return { week: 0, day: 0, ts: 0, scopes: {} };
}

export const resumeScopeKey = (week: number, day: number) => `${week}-${day}`;

/** Last week/day opened in this module's 记忆卡, or null if never opened. */
export function loadResumeScope(module: string): { week: number; day: number } | null {
	const store = readStore();
	if (!store[module]) return null;
	const entry = moduleEntry(store, module);
	return { week: entry.week, day: entry.day };
}

export function loadResumePos(module: string, week: number, day: number): ResumePos | null {
	const pos = moduleEntry(readStore(), module).scopes[resumeScopeKey(week, day)];
	if (!pos || typeof pos !== "object") return null;
	return {
		idx: num(pos.idx),
		cardId: typeof pos.cardId === "string" ? pos.cardId : undefined,
		order: Array.isArray(pos.order) ? pos.order.filter((id): id is string => typeof id === "string") : undefined,
		kind: typeof pos.kind === "string" ? pos.kind : undefined,
		skill: typeof pos.skill === "string" ? pos.skill : undefined,
		prompt: typeof pos.prompt === "string" ? pos.prompt : undefined,
	};
}

/** Remember the selected scope; `pos` (when given) is the position inside it. */
export function saveResume(module: string, week: number, day: number, pos?: ResumePos) {
	const store = readStore();
	const entry = moduleEntry(store, module);
	const now = Date.now();
	entry.week = num(week);
	entry.day = num(day);
	entry.ts = now;
	if (pos) {
		const clean: ResumePos = { idx: num(pos.idx), ts: now };
		if (pos.cardId) clean.cardId = pos.cardId;
		if (pos.order?.length && pos.order.length <= MAX_ORDER) clean.order = pos.order;
		if (pos.kind && pos.kind !== "all") clean.kind = pos.kind;
		if (pos.skill && pos.skill !== "all") clean.skill = pos.skill;
		if (pos.prompt && pos.prompt !== "jp") clean.prompt = pos.prompt;
		entry.scopes[resumeScopeKey(week, day)] = clean;
		const keys = Object.keys(entry.scopes);
		if (keys.length > MAX_SCOPES) {
			keys
				.sort((a, b) => num(entry.scopes[b]?.ts) - num(entry.scopes[a]?.ts))
				.slice(MAX_SCOPES)
				.forEach((key) => delete entry.scopes[key]);
		}
	}
	store[module] = entry;
	writeStore(store);
}

/** Put items back in a saved order; items the order does not know go after, in their own order. */
export function applyResumeOrder<T>(items: T[], order: string[] | undefined, idOf: (item: T) => string): T[] {
	if (!order?.length) return items;
	const byId = new Map<string, T>();
	for (const item of items) byId.set(idOf(item), item);
	const seen = new Set<string>();
	const out: T[] = [];
	for (const id of order) {
		const item = byId.get(id);
		if (item !== undefined && !seen.has(id)) {
			out.push(item);
			seen.add(id);
		}
	}
	for (const item of items) if (!seen.has(idOf(item))) out.push(item);
	return out;
}

/** Index to reopen: the saved card if it is still in the deck, else the saved index clamped. */
export function resumeIndex<T>(deck: T[], pos: ResumePos | null, idOf: (item: T) => string): number {
	if (!pos || !deck.length) return 0;
	if (pos.cardId) {
		const found = deck.findIndex((item) => idOf(item) === pos.cardId);
		if (found >= 0) return found;
		return Math.min(pos.idx, deck.length - 1);
	}
	// No current card was saved: the deck had been finished, so keep it finished.
	return Math.min(pos.idx, deck.length);
}
