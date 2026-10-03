# 日本語総まとめ N1 漢字 — source format (hand-typed from the scanned book, Chinese edition)

PDF page = book page + 2. Week N day D = `wNdD.txt`; exam answers `wNex.txt` (from 別冊).

    T title|title_r(読み)|title_cn|title_en      e.g. T 五・語・悟|ゴ・ゴ・ゴ|五・语・悟|
    I intro quiz bubble (Q. ＿の音読みは？ etc.), kept as a note
    S heading|heading_cn|heading_en               おぼえましょう heading
    G group|reading                               left column: shared part + shared 音読み (古|コ)
    K kanji                                       one kanji row inside the group
    W word|reading|en|cn[|note]                   reading in hiragana; note = book's ＊ remark
                                                  "•" before reading = book's ● mark (reading changes)
                                                  "◆" before word = book's ◆ (related word)
    X1 instruction / Q sentence >> 中文           練習Ⅰ (a/b choice, readings)
    X2 instruction / B a.殊|b.株|…               練習Ⅱ with box choices
       Q n|sentence|→ answer slot >> 中文
    A answer key (from 別冊)

Page map: lesson pages = book p.12+ (pdf 14+); TOC on pdf 4–5 (week/day titles).
別冊 (解答・解説): cover pdf 163, 別冊 p.2 = pdf 164 … (別冊 page n = pdf 162+n).
別冊 gives full furigana for every exercise sentence — use it for readings.

## Additional tags (weeks 3–8)

    K word|reading                                week 3: a kun word as the row head (新たな|あらた)
    K 漢|読み / K 漢                              weeks 5–8: row head; the reading after | is the group
                                                  reading or a gloss and is NOT added to the furigana lexicon
    W phrase|||中文                               empty reading = phrase, rubied with the lexicon + UniDic;
                                                  write 漢字[よみ] to force a reading
    W ◆⇔word|reading|en|cn                        antonym; "⇔"/"～" stay outside the ruby
    R line                                        やさしい読み (shown as 常用读法)
    V word|reading|en|cn|example|example_cn|note  one row per word (weeks 4–7 tables); example may be empty
    N note                                        a free note; on day 1–6 it is shown under the intro,
                                                  on day 7 under the コラム
    Q 7|{（　）引き}／{横（　）}|（　）>> 中文      練習Ⅱ "same kanji in both blanks" (weeks 6, 8)
    Q 7|耳を{うたがう}ような話|＿う >> 中文        single-item 練習Ⅱ (⑦–⑭)

Day 7 (`wNd7.txt`): `M1`–`M4` instructions; `Q {underlined}…|o1|o2|o3|o4 >> 中文`;
M4 uses `B word|word…` and `Q 21-25|passage >> 中文`; then `S column|cn|en` with K/W lines.
`wNex.txt`: `n|answer|point` (for 21–25 the answer is the written word).

Tested parts carry no furigana: the 練習Ⅰ (a./b.) choices and any {…} in that sentence,
the 練習Ⅱ {…} underline, 問題1 underlines and the 問題2/3 options. 練習Ⅰ readings are
listed in `exercises.answers_note` instead.

Page map: week N title = pdf 13+16(N−1); day D = pdf 14+16(N−1)+2(D−1) (+1);
day 7 = pdf 26–27+16(N−1), コラム pdf 28+16(N−1).
