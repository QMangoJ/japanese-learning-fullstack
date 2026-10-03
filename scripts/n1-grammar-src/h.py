import json
HARD={"type":"硬","text":"改まった場面や文書で使われる硬い表現"}
NEG={"type":"(-)","text":"悪い意味でよく使われる表現"}
TALK=lambda s="会話でよく使われる表現":{"type":"tag","text":s}
FEM={"type":"▼","text":"女性がよく使う表現"}
IDIOM=lambda s:{"type":"慣用","text":s}
def N(t,s): return {"type":t,"text":s}
def E(jp,eq,en,cn):
    e={"jp":jp}
    if eq: e["eq"]=eq if eq.startswith("=") else "="+eq
    e["en"]=en; e["cn"]=cn; return e
def P(pattern,reading,conn,ucn,uen,exs,notes=()):
    return {"pattern":pattern,"reading":reading,"connection":conn,"usage_cn":ucn,"usage_en":uen,"examples":list(exs),"notes":list(notes)}
CH="正しいほうに〇をつけなさい。"
OR="下の語を並べ替えて正しい文を作りなさい。＿＿に数字を書きなさい。"
def day(w,d,title,cn,en,qline,qans,qcn,qen,points,choice,order,page,answers=""):
    obj={"week":w,"day":d,"title":title,"title_cn":cn,"title_en":en,
     "dialog":{"lines":["Q.（　）に入るのは？",qline],"cn":f"问：括号里该填什么？——{qcn}（答案：{qans}）","en":f"Q: What goes in the blank? — {qen} (Answer: {qans})"},
     "points":points,
     "exercises":{"answers_note":f"答えはp.{page}","sections":[
       {"type":"choice","instruction":CH,"items":[{"n":i+1,"q":s} for i,s in enumerate(choice)]},
       {"type":"order","instruction":OR,"items":[{"n":6+i,"q":s,"options":[f"{j+1} {o}" for j,o in enumerate(opts)]} for i,(s,opts) in enumerate(order)]}],
      "answers":answers},"hitokoto":""}
    json.dump(obj,open(f"w{w}d{d}.json","w"),ensure_ascii=False,indent=1)
def setans(w,d,a):
    f=f"w{w}d{d}.json"; o=json.load(open(f)); o["exercises"]["answers"]=a; json.dump(o,open(f,"w"),ensure_ascii=False,indent=1)
B4="＿＿ ＿＿ ＿＿ ＿＿"
I1="次の文の（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。"
I2="次の文の＿★＿に入る最もよいものを、1・2・3・4から一つ選びなさい。"
I3="次の文章を読んで、21から25の中に入る最もよいものを、1・2・3・4から一つ選びなさい。"
BS="＿＿ ＿＿ ＿★＿ ＿＿"
def q(n,t,o): return {"n":n,"q":t,"opts":o}
def exam(w,page,m1,m2,passage,m3,keigo,title=("実戦問題","实战问题"),time="15分",scoring="1問4点×25問／100"):
    o={"week":w,"day":7,"title":title[0],"title_cn":title[1],"time_limit":time,"scoring":scoring,"answers_note":f"答えは別冊p.{page}",
     "mondai1":{"instruction":I1,"items":[q(i+1,t,op) for i,(t,op) in enumerate(m1)]},
     "mondai2":{"instruction":I2,"items":[q(16+i,t,op) for i,(t,op) in enumerate(m2)]},
     "mondai3":{"instruction":I3,"passage":passage,"items":[{"n":21+i,"opts":op} for i,op in enumerate(m3)]},
     "answers":""}
    if keigo: o["keigo"]=keigo
    json.dump(o,open(f"w{w}d7.json","w"),ensure_ascii=False,indent=1)
def week(n,t,cn,en): json.dump({"n":n,"title":t,"title_cn":cn,"title_en":en},open(f"w{n}.json","w"),ensure_ascii=False)
