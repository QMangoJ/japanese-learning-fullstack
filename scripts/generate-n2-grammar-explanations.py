#!/usr/bin/env python3
"""N2 週末実戦の逐題解説。N3/N4 と同じ besatsu 形。"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public/data/n2-grammar-explanations.json"


def q(n, ans, trans, trans_en, opts, opts_en, point, point_en, link, extra=None):
    item = {
        "n": n,
        "ans": ans,
        "trans": trans,
        "trans_en": trans_en,
        "option_translations": opts,
        "option_translations_en": opts_en,
        "why": ["", "", "", ""],
        "why_en": ["", "", "", ""],
        "point": point,
        "point_en": point_en,
        "link": link,
    }
    if extra:
        item.update(extra)
    return item


data = {
    "w1": {
        "mondai1": [
            q(1, 2, "在外吃饭容易蔬菜不足。", "Eating out tends to leave you short on vegetables.", ["显得…的样子", "容易／常常…", "因为…嘛", "有…的倾向（性质）"], ["looks ~", "tends to ~", "because (explanatory)", "has a ~ quality"], "「〜がち」表示容易陷入某种不良倾向。", "がち marks an undesirable tendency.", "#/day/1-1/p1"),
            q(2, 1, "虽然在读，内容却一点也进不了脑子。", "I am reading, but none of it is sinking in.", ["虽然…但是", "要是能…的话", "就因为…", "因为…嘛"], ["although", "if only one could", "precisely because", "because (casual)"], "「ものの」表示逆接，多用于书面。", "ものの is a written-style contrast.", "#/day/1-2/p3"),
            q(3, 2, "最近有点发胖，所以决定走到车站，不坐公交。", "I've been putting on a bit of weight, so I decided to walk to the station.", ["显得…", "略微有点…", "带有…色彩", "去掉…"], ["looks ~", "a little ~", "has a ~ tinge", "without ~"], "「気味」表示略微偏向某种状态。", "気味 means slightly / a touch of.", "#/day/1-1/p3"),
            q(4, 4, "一向自信满满的他，今天却一脸没自信。", "He is usually full of confidence, but today he looks unsure.", ["な（接续不对）", "ない（接续不对）", "なし（接续不对）", "なさ（自信なさげ）"], ["wrong connective", "wrong connective", "wrong connective", "なさげ = looking unsure"], "「自信なさげ」是固定说法。", "自信なさげ is the set form.", "#/day/1-1/p0"),
            q(5, 3, "看着生病的孩子，真希望能替他生病。", "Watching a sick child, I wish I could take their place if I could.", ["哪会…", "虽然…", "如果能…的话", "就因为…"], ["as if I would", "although", "if only I could", "because"], "可能形＋ものなら表示难以实现的愿望。", "Potential + ものなら is a hard-to-realize wish.", "#/day/1-2/p0"),
            q(6, 3, "总觉得部长最近爱发脾气了。", "I feel the manager has gotten rather short-tempered lately.", ["辞書形（接续不对）", "て形（接续不对）", "ます語幹＋っぽい", "た形（接续不对）"], ["dictionary form (wrong)", "te-form (wrong)", "masu-stem + っぽい", "ta-form (wrong)"], "「怒りっぽい」用ます形词干。", "っぽい attaches to the masu stem.", "#/day/1-1/p2"),
            q(7, 2, "因为太安静了，我还以为没人在。", "It was so quiet I thought nobody was there.", ["静か（缺な）", "静かな＋もんだから", "静かだ（接续不对）", "静かの（不对）"], ["missing な", "na-adjective + もんだから", "wrong form", "wrong form"], "な形容词后接「な＋ものだから」。", "na-adjectives take な before ものだから.", "#/day/1-2/p1"),
            q(8, 3, "忘把伞带来也就罢了，连重要的包都忘了。", "Forgetting an umbrella is one thing, but leaving your important bag behind?", ["去掉…", "不用说…", "…还算可以", "如果能…"], ["leaving out", "needless to say", "X is still acceptable", "if only"], "「まだしも」表示相比之下前者还勉强可以接受。", "まだしも: the first thing is still tolerable.", "#/day/1-3/p2"),
            q(9, 3, "村上这个名字在国内自不必说，在国外也广为人知。", "Murakami's name is known overseas, let alone at home.", ["暂且不论", "虽然", "自不必说", "去掉"], ["leaving aside", "although", "let alone / not to mention", "without"], "「もとより」表示前者当然成立，后者也成立。", "もとより = not to mention the first item.", "#/day/1-3/p0"),
            q(10, 4, "修一修也不是不能用，但太旧了，还是扔了吧。", "It's not that it couldn't be used if repaired, but it's old, so let's throw it out.", ["不该用", "不准用", "必须用", "也不是不能用"], ["must not use", "must not", "must", "it's not that one cannot"], "「ないこともない」表示并非完全不可能。", "ないこともない = it's not impossible.", "#/day/1-5/p1"),
            q(11, 1, "最近身体不好，但不能老请假。", "I've been unwell, but I can't keep taking time off.", ["也不能光是…", "受不了请假", "也不是不请假", "不能不请假"], ["can't just keep doing", "can't stand taking off", "it's not that I don't", "can't help taking off"], "「〜てばかりもいられない」表示不能只顾着那样。", "てばかりもいられない = can't keep doing only that.", "#/day/1-6/p3"),
            q(12, 2, "“为什么不带手机？”“因为用不着嘛。”", "“Why don't you have a cell phone?” “Because I don't need one.”", ["因为有嘛", "因为不需要嘛", "也不是不需要", "不能不带"], ["because I have one", "because I don't need one", "not that I don't need it", "can't help carrying one"], "「んだもの」用来申明理由，口语。", "んだもの gives a casual reason.", "#/day/1-2/p2"),
            q(13, 3, "十多年没去电影院了。也不是不想去，只是在家看录像更轻松。", "I haven't been to a cinema in over ten years. It's not that I don't want to; watching at home is easier.", ["去（缺たくない）", "想去（意思反了）", "不想去＋こともない", "去过"], ["go (incomplete)", "want to go (wrong sense)", "it's not that I don't want to", "went"], "「行きたくないこともない」＝也不是不想去。", "行きたくないこともない = it's not that I don't want to.", "#/day/1-5/p0"),
            q(14, 2, "今晚得熬夜干活，可喝了浓茶咖啡还是困得受不了。", "I have to work through the night, yet I'm unbearably sleepy even after strong tea and coffee.", ["睡不着", "困得受不了", "也不是不睡", "不困得受不了"], ["can't sleep", "so sleepy I can't stand it", "it's not that I don't sleep", "not unbearably sleepy"], "「〜てたまらない」表示程度高到受不了。", "てたまらない = so … I can't stand it.", "#/day/1-4/p0"),
            q(15, 1, "这游戏规矩很多，但今天是第一次，先不谈难的，总之先试试吧。", "The game has lots of little rules, but since it's your first time, never mind the hard part — let's just try.", ["先试试看", "不能做", "不能不做", "也不是不做"], ["let's try it", "cannot do it", "can't help doing it", "not that we won't"], "「抜きにして」表示先抛开某事。", "抜きにして = setting that aside.", "#/day/1-3/p3"),
        ],
        "mondai2": [
            q(16, 4, "身体好不好另说，总不能说精神不好。", "Leaving how I feel aside, I can hardly say my body is fine.", ["心情", "称作／作为", "暂且不论", "健康"], ["feelings", "as / called", "leaving aside", "healthy"], "「AはともかくB」：A先不论，说B。", "Aはともかく B = never mind A, as for B.", "#/day/1-3/p1", {"order": "1→3→4→2"}),
            q(17, 1, "她用一副可爱得没办法的表情盯着孙子。", "She gazes at her grandchild with a face that says she can't help finding them adorable.", ["叫做／所谓", "没办法", "表情", "可爱得…"], ["called", "can't help it", "with a face", "so cute that"], "「かわいくてしかたないという顔」。", "てしかたない = so … one can't help it.", "#/day/1-4/p1", {"order": "4→2→1→3"}),
            q(18, 4, "想买的话也不是买不到，只是不想买。", "It's not that I couldn't buy it if I wanted to; I just don't feel like it.", ["但是", "也（不）…", "买不到", "没有"], ["but", "also / even", "cannot buy", "not"], "「ないこともないけれど」。", "ないこともない = not entirely impossible.", "#/day/1-5/p1", {"order": "3→2→4→1"}),
            q(19, 1, "没有他的活跃，我们队根本不可能夺冠。", "Without his contribution our team could never have won.", ["去掉／没有", "他的", "活跃", "要是做了"], ["without", "his", "performance", "if one does"], "「ぬきにしては」＝没有…的话。", "ぬきにしては = if you leave that out.", "#/day/1-3/p3", {"order": "2→3→1→4"}),
            q(20, 2, "对那些不抽烟就受不了的人，也不能不提醒香烟的危害。", "You can't help warning people who can't go without smoking about the dangers.", ["不能不提醒", "香烟的危害", "对那样的人", "不能忍受"], ["can't help warning", "the danger of tobacco", "to such people", "can't endure"], "「ずにはいられない」表示忍不住做。", "ずにはいられない = can't help doing.", "#/day/1-5/p3", {"order": "4→3→2→1"}),
        ],
        "mondai3": [
            q(21, 4, "可是我与其说在享受，不如说更担心选手的心情和身体。", "But rather than enjoying it, I can't help worrying about the athletes.", ["因此", "于是", "而且", "可是"], ["therefore", "so / then", "besides", "however"], "前后是转折，用「しかし」。", "しかし marks contrast with the previous enjoyment.", "#/day/1-3/p1"),
            q(22, 3, "担心得不得了。", "I can't help being worried.", ["不必担心", "担心也待不住", "担心得不得了", "不该担心"], ["needn't worry", "can't stay worried", "so worried I can't help it", "must not worry"], "「心配でならない」表示感情强烈。", "でならない = so … I can't help it.", "#/day/1-4/p3"),
            q(23, 1, "也有人看上去有些疲倦。", "Some people look a little worn out.", ["略微…", "带有…色彩", "动辄…", "显得…的样子"], ["a touch of", "tinged with", "tends to", "looks"], "「疲れ気味」＝有点累。", "気味 = slightly.", "#/day/1-1/p3"),
            q(24, 3, "年轻新选手尚且如此，被期待夺牌的选手就更不用说了。", "If that's true even of young newcomers, how much more for medal favorites.", ["去掉", "受不了但是", "…还算可以", "没办法但是"], ["without", "unbearable but", "X is still better", "can't be helped but"], "「まだしも」：前者相对还能接受。", "まだしも: the first case is still easier to accept.", "#/day/1-3/p2"),
            q(25, 4, "我忍不住这样想。", "I can't help thinking that way.", ["不能光是想", "必须想", "不该想", "不能不想"], ["can't just think", "must think", "must not think", "can't help thinking"], "「思わずにはいられない」。", "ずにはいられない = can't help doing.", "#/day/1-5/p3"),
        ],
    }
}

from generate_n2_exam_weeks import WEEK_DATA  # noqa: E402

data.update(WEEK_DATA)

if __name__ == "__main__":
    OUT.write_text(json.dumps(data, ensure_ascii=False, indent="\t") + "\n", encoding="utf-8")
    total = sum(len(sec) for week in data.values() for sec in week.values())
    print(f"Wrote {OUT.name} ({total} items)")
