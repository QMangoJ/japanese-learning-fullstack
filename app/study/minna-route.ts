/** 「大家的日本语」语法页。
 *
 * `#/minna` 课表；`#/minna/<bookId>` 某一册；
 * `#/minna/<bookId>/<课号>` 展开该课；再加 `/p<序号>` 落到某一个文型。
 * bookId 用 `shokyu-2` 这类 slug，中級以后可以并列新的一册，不必改课号规则。
 */
export type MinnaRoute = {
	bookId: string | null;
	lesson: number | null;
	point: number | null;
};

const BOOK = "[a-z0-9]+(?:-[a-z0-9]+)*";

export function parseMinnaRoute(key: string): MinnaRoute | null {
	if (key === "#/minna") return { bookId: null, lesson: null, point: null };
	const bookOnly = new RegExp(`^#\\/minna\\/(${BOOK})$`).exec(key);
	if (bookOnly) return { bookId: bookOnly[1], lesson: null, point: null };
	const full = new RegExp(`^#\\/minna\\/(${BOOK})\\/(\\d+)(?:\\/p(\\d+))?$`).exec(key);
	if (!full) return null;
	const lesson = Number(full[2]);
	const point = full[3] == null ? null : Number(full[3]);
	if (!Number.isInteger(lesson) || lesson < 1) return null;
	if (point != null && (!Number.isInteger(point) || point < 0)) return null;
	return { bookId: full[1], lesson, point };
}

export function minnaHash(bookId?: string | null, lesson?: number | null, point?: number | null) {
	if (!bookId) return "#/minna";
	if (lesson == null) return `#/minna/${bookId}`;
	if (point == null) return `#/minna/${bookId}/${lesson}`;
	return `#/minna/${bookId}/${lesson}/p${point}`;
}
