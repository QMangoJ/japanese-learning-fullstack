import { listeningQuestionSupport } from "/workspace/wt-n1-listening/app/data/listening-n3-question-support.ts";
import { readFileSync } from "node:fs";
const getListeningN1Lesson=(c:number,s:number)=>JSON.parse(readFileSync(`/workspace/n1listen/lessons/${c}-${s}.json`,"utf8"));
import { writeFileSync } from "node:fs";
const out: Record<string, (string|null)[]> = {};
const counts=[5,7,5,5,5];
counts.forEach((n,i)=>{for(let s=1;s<=n;s++){const l=getListeningN1Lesson(i+1,s); if(!l) {console.log("missing",i+1,s);continue;}
 out[`${i+1}-${s}`]=[...listeningQuestionSupport(l)].map(([,x])=>x.transcript??null);}});
writeFileSync("/workspace/n1listen/qtrans.json", JSON.stringify(out,null,1));
for (const [k,v] of Object.entries(out)) console.log(k, v.length, v.filter(x=>!x).length);
