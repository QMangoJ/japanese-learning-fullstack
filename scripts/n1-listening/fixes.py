import json
def load(k): return json.load(open(f"lessons/{k}.json"))
def save(k,d): json.dump(d,open(f"lessons/{k}.json","w"),ensure_ascii=False,indent=1)
# 2-6: 質問1/質問2 -> 1番/2番 (same track), like N2 2-6
d=load("2-6")
for b in d["blocks"]:
    if b["type"]!="q": continue
    if b["label"]=="質問1": b["label"]="1番"
    elif b["label"]=="質問2": b["label"]="2番"; b["tracks"]=[40]
    elif b["label"]=="例 質問2": b["tracks"]=[39]
d["answer"]=d["answer"].replace("質問1：","1番：").replace("質問2：","2番：")
for f,lead in (("transcript","（1番と同じ話を聞いて答えます）"),("transcript_cn","（与1番听同一段对话作答）")):
    t=d[f]
    if t.startswith("質問1\n"):
        t="1番\n"+t[len("質問1\n"):]
        t=t.replace("\n\n質問2\n","\n\n2番\n"+lead+"\n",1)
    d[f]=t
save("2-6",d)
# 2-7: merge 問題Ⅴ 2番 質問1/質問2 into one question (like N2)
d=load("2-7")
qs=[b for b in d["blocks"] if b["type"]=="q"]
q1=next((b for b in qs if b["label"]=="問題Ⅴ 2番 質問1"),None)
q2=next((b for b in qs if b["label"]=="問題Ⅴ 2番 質問2"),None)
if q1 and q2:
    q1["label"]="問題Ⅴ 2番"
    q1["options"]=["質問1　"+o for o in q1.get("options",[])]+["質問2　"+o for o in q2.get("options",[])]
    if q2.get("note"): q1["note"]=(q1.get("note","")+"\n"+q2["note"]).strip()
    d["blocks"].remove(q2)
    d["answer"]=d["answer"].replace("2番 質問1：1\n2番 質問2：2","2番：質問1：1　質問2：2")
    for f in ("transcript","transcript_cn"):
        t=d[f].replace("問題Ⅴ 2番 質問1\n","問題Ⅴ 2番\n",1)
        t=t.replace("\n\n問題Ⅴ 2番 質問2\n","\n",1)
        d[f]=t
save("2-7",d)
