/** 「专题词汇」路由：#/topics（目录）与 #/topics/<slug>（某个专题）。 */
export function parseTopicsRoute(key: string): { slug: string | null } | null {
	if (key === "#/topics") return { slug: null };
	const match = /^#\/topics\/([a-z0-9]+(?:-[a-z0-9]+)*)$/.exec(key);
	return match ? { slug: match[1] } : null;
}
