/**
 * Lists every Japanese string shown in the grammar summary 「相似表达」 section
 * (N3 cross-level rows, N2 cross-level rows, N2 same-level items) as JSON on stdout.
 * Used by scripts/generate-similar-furigana.py.
 */
import { readFileSync } from "node:fs";
const root = new URL("../", import.meta.url).href;
const { N3_RELATED_GRAMMAR } = await import(new URL("app/data/n3-related-grammar.ts", root).href);
const { N2_SUMMARY_RELATED } = await import(new URL("app/data/n2-summary-related.ts", root).href);
const sim = JSON.parse(readFileSync(new URL("public/data/n2-grammar-similar.json", root), "utf8"));
const out: Record<string, { level: string; kind: string }[]> = {};
const add = (s: string, level: string, kind: string) => { (out[s] ??= []).push({ level, kind }); };
for (const g of Object.values<any>(N3_RELATED_GRAMMAR)) for (const r of g.rows) { add(r[0], "N3", "form"); add(r[6], "N3", "example"); }
for (const r of Object.values<any>(N2_SUMMARY_RELATED)) { add(r.form, "N2", "form"); add(r.example[0], "N2", "example"); }
for (const list of Object.values<any[]>(sim.days)) for (const e of list) { add(e.form, "N2", "form"); add(e.against, "N2", "against"); add(e.example.jp, "N2", "example"); }
process.stdout.write(JSON.stringify(out));
