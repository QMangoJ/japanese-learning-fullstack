import { readFileSync, readdirSync } from "node:fs";
import { listeningQuestionSupport } from "/workspace/wt-n1-listening/app/data/listening-n3-question-support.ts";
const dir = "/workspace/n1listen/lessons";
const keys = process.argv.slice(2).length ? process.argv.slice(2) : readdirSync(dir).map((f) => f.replace(".json", "")).sort();
for (const key of keys) {
	const lesson = JSON.parse(readFileSync(`${dir}/${key}.json`, "utf8"));
	const sup = [...listeningQuestionSupport(lesson).entries()];
	const qs = lesson.blocks.filter((b: any) => b.type === "q");
	const problems: string[] = [];
	for (const [i, s] of sup) {
		const label = lesson.blocks[i].label;
		if (!s.answer) problems.push(`${label}: no answer`);
		if (!s.transcript) problems.push(`${label}: no transcript`);
		if (!s.transcript_cn) problems.push(`${label}: no cn`);
		const head = (t?: string) => t?.split("\n")[0].normalize("NFKC").replace(/\s+/g, "");
		const lab = label.normalize("NFKC").replace(/\s+/g, "");
		if (s.transcript && !head(s.transcript)!.startsWith(lab)) problems.push(`${label}: transcript head "${head(s.transcript)?.slice(0, 20)}"`);
		if (s.transcript_cn && !head(s.transcript_cn)!.startsWith(lab)) problems.push(`${label}: cn head "${head(s.transcript_cn)?.slice(0, 20)}"`);
		if (s.answer && !s.answer.normalize("NFKC").replace(/\s+/g, "").startsWith(lab)) problems.push(`${label}: answer head "${s.answer.slice(0, 20)}"`);
	}
	const tracks = qs.flatMap((q: any) => q.tracks || []);
	console.log(`${key}: q=${qs.length} scored=${sup.length} labels=[${qs.map((q: any) => q.label + ":" + (q.tracks || []).join("/")).join(", ")}]${problems.length ? "\n   ! " + problems.join("\n   ! ") : ""}`);
}
