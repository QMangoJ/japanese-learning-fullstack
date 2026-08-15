let DATA={}, G={weeks:[]}, V={weeks:[]}, K={weeks:[]}, G2={weeks:[]}, V2={weeks:[]}, K2={weeks:[]}, G4={weeks:[]}, V4={weeks:[]}, K4={weeks:[]}, dataLoaded=false, n2Loaded=false, n4Loaded=false;
let _lastRenderedHash=null; // only scroll-to-top on an actual navigation, not on a background-sync re-render of the same view
let MODULE = 'grammar';
try{ const m=localStorage.getItem('module'); if(['vocab','grammar','n2grammar','kanji','n2vocab','n2kanji','n4grammar','n4vocab','n4kanji'].includes(m)) MODULE=m; }catch(e){}
let lastVisit={};
try{ lastVisit=JSON.parse(localStorage.getItem('lastVisit')||'{}')||{}; }catch(e){ lastVisit={}; }
let lastDay={};
try{ lastDay=JSON.parse(localStorage.getItem('lastDay')||'{}')||{}; }catch(e){ lastDay={}; }
function entryHash(mod){ return lastVisit[mod] || '#/'; }
function saveLastVisit(hash){
  lastVisit[MODULE] = hash;
  // 首页手风琴要知道「上次看的是哪一周」，而 lastVisit 回首页时会被覆盖成 '#/'，
  // 所以单独留一份只记天的，跨会话也保住展开位置。
  if(hash.startsWith('#/day/')) { lastDay[MODULE] = hash; try{ localStorage.setItem('lastDay', JSON.stringify(lastDay)); }catch(e){} }
  try{ localStorage.setItem('lastVisit', JSON.stringify(lastVisit)); }catch(e){}
}
let LANG = 'cn';
try{ const l=localStorage.getItem('lang'); if(l==='en'||l==='cn') LANG=l; }catch(e){}
const LX = (cn,en)=> (LANG==='en' && en) ? en : (cn||'');
const CUR = ()=> ({vocab:V, n2grammar:G2, kanji:K, n2vocab:V2, n2kanji:K2, n4grammar:G4, n4vocab:V4, n4kanji:K4}[MODULE]) || G;
const isGram = ()=> MODULE==='grammar'||MODULE==='n2grammar'||MODULE==='n4grammar';
const MODLABELS = {grammar:['N3 语法','N3 Grammar'], n2grammar:['N2 语法','N2 Grammar'], vocab:['N3 词汇','N3 Vocabulary'], kanji:['N3 汉字','N3 Kanji'], n2vocab:['N2 词汇','N2 Vocabulary'], n2kanji:['N2 汉字','N2 Kanji'], n4grammar:['N4 语法','N4 Grammar'], n4vocab:['N4 词汇','N4 Vocabulary'], n4kanji:['N4 汉字','N4 Kanji']};
const modLabel = ()=> LX(...MODLABELS[MODULE]);

const $ = s=>document.querySelector(s);
const app=$('#app'), titleEl=$('#title'), backBtn=$('#backBtn'), topAction=$('#topAction'), lvChip=$('#lvChip');
const esc = s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const fmt = s=>esc(s).replace(/~([^~]+)~/g,'<del>$1</del>');
const R = (o,f)=>(o&&o[f+'_r'])||esc(o?o[f]:'');
try{ if(localStorage.getItem('noruby')==='1') document.body.classList.add('no-ruby'); }catch(e){}
try{ if(localStorage.getItem('hidejp')==='1') document.body.classList.add('hide-jp'); }catch(e){}
try{ if(localStorage.getItem('hidecn')==='1') document.body.classList.add('hide-cn'); }catch(e){}
function syncRubyBtn(){
  const off = document.body.classList.contains('no-ruby');
  topAction.textContent = 'ふ';
  topAction.classList.toggle('on', !off);
  topAction.title = off ? '注音：关' : '注音：开';
  topAction.setAttribute('aria-label', topAction.title);
}
topAction.onclick = ()=>{
  document.body.classList.toggle('no-ruby');
  try{ localStorage.setItem('noruby', document.body.classList.contains('no-ruby')?'1':'0'); }catch(e){}
  syncRubyBtn();
  syncMemBar();
};
function memBarHTML(){
  const on=(cls)=>document.body.classList.contains(cls)?'on':'';
  return `<div class="mem-bar">
    <button data-memtoggle="ruby" class="${document.body.classList.contains('no-ruby')?'':'on'}">读音</button>
    <button data-memtoggle="jp" class="${on('hide-jp')?'':'on'}">汉字</button>
    <button data-memtoggle="cn" class="${on('hide-cn')?'':'on'}">翻译</button>
  </div>`;
}
function syncMemBar(){
  const bar=document.querySelector('.mem-bar'); if(!bar) return;
  const btns=bar.querySelectorAll('button');
  btns[0].classList.toggle('on', !document.body.classList.contains('no-ruby'));
  btns[1].classList.toggle('on', !document.body.classList.contains('hide-jp'));
  btns[2].classList.toggle('on', !document.body.classList.contains('hide-cn'));
}
function noteClass(t){ return (t==='ダメ')?'note dame':'note'; }
function noteLabel(t){ return ({'れい':'れい','ダメ':'ダメ✗','OK':'OK','もっと':'もっと!','tag':'💬','!':'注意','◆':'◆'})[t]||t; }

/* ---- TTS (朗读) ---- */
const escAttr = s=>esc(s).replace(/"/g,'&quot;');
let jaVoice=null;
function pickVoice(){ try{ const vs=speechSynthesis.getVoices()||[]; jaVoice=vs.find(v=>/^ja/i.test(v.lang))||vs.find(v=>/japan/i.test(v.name))||null; }catch(e){} }
if('speechSynthesis' in window){ pickVoice(); try{ speechSynthesis.onvoiceschanged=pickVoice; }catch(e){} }
function say(t){ try{ if(!('speechSynthesis' in window)||!t) return; speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(t); u.lang='ja-JP'; u.rate=.9; if(jaVoice)u.voice=jaVoice; speechSynthesis.speak(u); }catch(e){} }
function sayBtn(t){ return t?`<button class="sayb" data-say="${escAttr(t)}" aria-label="朗读">🔊</button>`:''; }

/* ---- 收藏 (生词本) ---- 本地 localStorage 即时可用，同时后台与 /api/favorites (Cloudflare KV) 同步实现跨设备 */
/* ---------- 错题/生词本 (自己录入的错题、忘记的单词/语法，纯本地存储) ---------- */
// 只保留结构正常的条目（必须有字符串 id），挡掉脏数据：没有 id 的记录既删不掉又会在合并时无限复活
const MISTAKE_TYPES={q:'错题', word:'单词', grammar:'语法'};
const MISTAKE_LEVELS={new:'不熟', mid:'一般', done:'已掌握'};
const MISTAKE_LEVEL_ORDER=['new','mid','done'];
function cleanMistakes(arr){ return Array.isArray(arr) ? arr.filter(m=>m && typeof m.id==='string' && m.id).map(m=> MISTAKE_LEVELS[m.level] ? m : Object.assign({}, m, {level:'new'})) : []; }
let MISTAKES=[]; try{ MISTAKES=cleanMistakes(JSON.parse(localStorage.getItem('mistakes')||'[]')); }catch(e){ MISTAKES=[]; }
let mistakeAddType='q';
let _mistakeSyncing=false, _mistakePushTimer=null, _mistakesReady=false, _mistakesPendingPush=false;
function pushMistakesNow(){
  fetch('/api/mistakes', {method:'PUT', headers:{'content-type':'application/json'}, body: JSON.stringify(MISTAKES)}).catch(()=>{});
}
function saveMistakes(){
  try{ localStorage.setItem('mistakes', JSON.stringify(MISTAKES)); }catch(e){}
  if(_mistakeSyncing) return; // 刚从服务器拉取时不要把同一份数据立刻推回去
  if(!_mistakesReady){ _mistakesPendingPush=true; return; } // 首次拉取完成前，本地改动先不推送，避免用旧数据整体覆盖云端
  clearTimeout(_mistakePushTimer);
  _mistakePushTimer = setTimeout(pushMistakesNow, 400);
}
async function pullMistakesFromServer(){
  try{
    const res = await fetch('/api/mistakes', {cache:'no-store'});
    if(res.ok){
      const data = await res.json();
      if(Array.isArray(data)){
        _mistakeSyncing = true;
        // 合并而非整体覆盖：拉取完成前本地新增的条目（服务器还没有）要保留下来
        const merged = cleanMistakes(data);
        for(const m of MISTAKES){ if(!data.some(d=>d.id===m.id)) merged.push(m); }
        merged.sort((a,b)=>b.ts-a.ts);
        MISTAKES = merged;
        try{ localStorage.setItem('mistakes', JSON.stringify(MISTAKES)); }catch(e){}
        _mistakeSyncing = false;
        render();
      }
    }
  }catch(e){ /* 离线或本地 file:// 打开时静默失败，继续用本地缓存 */ }
  _mistakesReady = true;
  if(_mistakesPendingPush){ _mistakesPendingPush=false; saveMistakes(); }
}
function addMistake(type, text){
  text=(text||'').trim(); if(!text) return;
  MISTAKES.unshift({id:Date.now()+'-'+Math.random().toString(36).slice(2,7), type, text, ts:Date.now(), level:'new'});
  saveMistakes();
}
// 墓碑式删除：保留一个 {deleted:true} 标记并同步上去，别的设备据此隐藏，
// 这样删除能跨设备传播，又不会在合并时把它当成“本地独有”复活。
function deleteMistake(id){
  const e = MISTAKES.find(m=>m.id===id);
  if(e){ e.deleted=true; e.ts=e.ts||Date.now(); }
  else { MISTAKES.push({id, deleted:true, ts:Date.now()}); }
  saveMistakes();
}
// 点一下熟练度标签，在 不熟→一般→已掌握→不熟 之间循环；不改 ts，避免影响列表排序
function cycleMistakeLevel(id){
  const m = MISTAKES.find(x=>x.id===id); if(!m) return;
  const i = MISTAKE_LEVEL_ORDER.indexOf(m.level);
  m.level = MISTAKE_LEVEL_ORDER[(i+1) % MISTAKE_LEVEL_ORDER.length];
  saveMistakes();
}
function activeMistakes(){ return MISTAKES.filter(m=>!m.deleted); }
function mistakeDate(ts){
  const d=new Date(ts), p=n=>String(n).padStart(2,'0');
  return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`;
}
function mistakeItemHTML(m){
  const lvl = m.level||'new';
  return `<div class="mistake-item">
    <div class="mistake-item-head"><span class="mtag mt-${m.type}">${MISTAKE_TYPES[m.type]||m.type}</span><button class="mlvl ml-${lvl}" data-mlevel-cycle="${escAttr(m.id)}" aria-label="切换熟练度">${MISTAKE_LEVELS[lvl]}</button><span class="mistake-date">${mistakeDate(m.ts)}</span><button class="mistake-del" data-mistake-del="${escAttr(m.id)}" aria-label="删除">✕</button></div>
    <div class="mistake-text">${esc(m.text).replace(/\n/g,'<br>')}</div>
  </div>`;
}
let mistakeFilter='all';
let mistakeLevelFilter='all';
let mistakeDraft=''; // 输入框草稿：切到后台再切回来时 resync 会触发 render() 重画整页，草稿要能扛住这次重画
let mistakeStudyMode=false, favStudyMode=false, studyHideJapanese=false, studyHideTranslation=false;
function studyDateGroups(rows){
  const groups={};
  rows.forEach(row=>{ const day=row.ts ? mistakeDate(row.ts) : '早期记录'; (groups[day]=groups[day]||[]).push(row); });
  return Object.keys(groups).sort((a,b)=>b.localeCompare(a)).map(day=>({day,rows:groups[day]}));
}
function mistakeStudyParts(m){
  const text=String(m.text||'');
  const correct=text.match(/(?:^|\n)正确答案：\s*([^\n]+)/);
  const question=text.replace(/(?:\n|^)你的答案：[\s\S]*$/,'').trim();
  return {jp:question||text, cn:correct ? correct[1] : ''};
}
function studyToolbar(kind,count){
  return `<div class="study-toolbar"><button class="primary" data-${kind}study="0">‹ 返回列表</button><span>${count} 条</span><div><button class="${studyHideJapanese?'on':''}" data-study-hide="jp">日语</button><button class="${studyHideTranslation?'on':''}" data-study-hide="cn">翻译 / 答案</button></div></div>`;
}
function studyRowsHTML(rows,kind){
  return `<div class="study-columns${studyHideJapanese?' study-hide-jp':''}${studyHideTranslation?' study-hide-cn':''}"><div class="study-columns__head"><b>日本語</b><b>${kind==='mistake'?'答え・メモ':'翻译'}</b></div>${studyDateGroups(rows).map(group=>`<section class="study-date-group"><h3>${group.day}<small>${group.rows.length} 条</small></h3>${group.rows.map(row=>`<article class="study-row"><div class="study-jp">${row.tag||''}${esc(row.jp||'')}</div><div class="study-cn">${row.cn?esc(row.cn):'—'}</div></article>`).join('')}</section>`).join('')}</div>`;
}
function viewMistakes(){
  setNav('mistakes'); setHeader(LX('错题 / 生词本','My Mistakes & Notes'), false);
  const src = activeMistakes();
  const byType = mistakeFilter==='all' ? src : src.filter(m=>m.type===mistakeFilter);
  const list = mistakeLevelFilter==='all' ? byType : byType.filter(m=>(m.level||'new')===mistakeLevelFilter);
  const filterBar = `<div class="fc-filter" style="margin-bottom:8px">
    <button class="${mistakeFilter==='all'?'on':''}" data-mfilter="all">全部（${src.length}）</button>
    ${Object.entries(MISTAKE_TYPES).map(([k,v])=>`<button class="${mistakeFilter===k?'on':''}" data-mfilter="${k}">${v}（${src.filter(m=>m.type===k).length}）</button>`).join('')}
  </div>`;
  const levelFilterBar = `<div class="fc-filter" style="margin-bottom:14px">
    <button class="${mistakeLevelFilter==='all'?'on':''}" data-lfilter="all">熟练度：全部（${byType.length}）</button>
    ${MISTAKE_LEVEL_ORDER.map(k=>`<button class="${mistakeLevelFilter===k?'on':''}" data-lfilter="${k}">${MISTAKE_LEVELS[k]}（${byType.filter(m=>(m.level||'new')===k).length}）</button>`).join('')}
  </div>`;
  if(mistakeStudyMode){
    const rows=list.map(m=>Object.assign({ts:m.ts},mistakeStudyParts(m)));
    app.innerHTML=studyToolbar('m',rows.length)+studyRowsHTML(rows,'mistake');
    return;
  }
  const body = list.length ? list.map(mistakeItemHTML).join('') : '<div class="empty">还没有记录，在上面写一条保存试试。</div>';
  app.innerHTML = `<div class="card mistake-widget" style="margin-bottom:14px">
    <div class="mistake-types" id="mistakeTypes">${Object.entries(MISTAKE_TYPES).map(([k,v])=>`<button class="${k===mistakeAddType?'on':''}" data-mtype="${k}">${v}</button>`).join('')}</div>
    <textarea id="mistakeInput" class="mistake-input" rows="2" placeholder="记一下考试错题、老是记不住的单词或语法点……">${esc(mistakeDraft)}</textarea>
    <button class="primary" data-mistake-add>保存</button>
  </div>${filterBar}${levelFilterBar}<div class="study-entry"><button data-mstudy="1">背诵模式（${list.length}）</button></div>${body}`;
}
let FAV={}; try{ FAV=JSON.parse(localStorage.getItem('favs')||'{}')||{}; }catch(e){ FAV={}; }
const FAVMETA={};
let _favSyncing=false, _favPushTimer=null, _favReady=false, _favPendingPush=false;
function pushFavsNow(){
  fetch('/api/favorites', {method:'PUT', headers:{'content-type':'application/json'}, body: JSON.stringify(FAV)}).catch(()=>{});
}
function saveFav(){
  try{ localStorage.setItem('favs', JSON.stringify(FAV)); }catch(e){}
  if(_favSyncing) return; // 刚从服务器拉取时不要把同一份数据立刻推回去
  if(!_favReady){ _favPendingPush=true; return; } // 首次拉取完成前，本地改动先不推送，避免用旧数据整体覆盖云端
  clearTimeout(_favPushTimer);
  _favPushTimer = setTimeout(pushFavsNow, 400);
}
async function pullFavsFromServer(){
  try{
    const res = await fetch('/api/favorites', {cache:'no-store'});
    if(res.ok){
      const data = await res.json();
      if(data && typeof data==='object' && !Array.isArray(data)){
        _favSyncing = true;
        // 合并而非整体覆盖：拉取完成前本地新增/取消的收藏要保留下来
        FAV = Object.assign({}, data, FAV);
        try{ localStorage.setItem('favs', JSON.stringify(FAV)); }catch(e){}
        _favSyncing = false;
        render();
      }
    }
  }catch(e){ /* 离线或本地 file:// 打开时静默失败，继续用本地缓存 */ }
  _favReady = true;
  if(_favPendingPush){ _favPendingPush=false; saveFav(); }
}
function isFav(id){ return !!FAV[id]; }
function toggleFav(id){ if(FAV[id]) delete FAV[id]; else if(FAVMETA[id]) FAV[id]=Object.assign({}, FAVMETA[id], {ts:Date.now()}); saveFav(); }
function star(id, snap){ FAVMETA[id]=snap; return `<button class="starb" data-fav="${escAttr(id)}" aria-label="收藏">${isFav(id)?'★':'☆'}</button>`; }

/* ---------- 划词收藏 ---------- */
// 划词条目和普通收藏共用 FAV，因此同样能写入 Cloudflare KV，在其它设备继续复习。
const SELECTION_FAV_TYPES={newword:'生词',word:'单词',sentence:'句子',q:'错题',grammar:'语法'};
let selectionFavType='word', selectionText='', selectionPopover=null, selectionPopoverTimer=null, selectionCheckTimer=null;
function normalizeSelectionText(t){ return String(t||'').replace(/\s+/g,' ').trim(); }
function selectionFavId(type, text){
  let h=2166136261;
  for(let i=0;i<text.length;i++){ h^=text.charCodeAt(i); h=Math.imul(h,16777619); }
  return `selection#${type}#${(h>>>0).toString(36)}#${text.length}`;
}
function selectionBelongsToApp(sel){
  if(!sel||!sel.rangeCount||sel.isCollapsed) return false;
  const range=sel.getRangeAt(0), node=range.commonAncestorContainer;
  const el=node&& (node.nodeType===1 ? node : node.parentElement);
  // commonAncestor 在跨 ruby / 文本节点选择时不一定是 #app 的直接后代，
  // 因此同时用 Range 的交集来判断，避免把真实选区误判成页面外选择。
  return !!(el&&app.contains(el)) || !!(range.intersectsNode&&range.intersectsNode(app));
}
function ensureSelectionPopover(){
  if(selectionPopover) return selectionPopover;
  const el=document.createElement('div');
  el.id='selectionPopover'; el.className='selection-popover'; el.hidden=true;
  el.setAttribute('role','dialog'); el.setAttribute('aria-label','收藏划词');
  el.innerHTML=`<div class="selection-popover__title">收藏到生词本</div><div class="selection-popover__text"></div><div class="selection-popover__types"></div><div class="selection-popover__actions"><button type="button" data-selection-cancel>取消</button><button type="button" class="primary" data-selection-save>收藏</button></div>`;
  el.addEventListener('click', e=>{
    const type=e.target.closest('[data-selection-type]');
    if(type){ selectionFavType=type.dataset.selectionType; renderSelectionPopover(); return; }
    if(e.target.closest('[data-selection-cancel]')){ hideSelectionPopover(); return; }
    if(e.target.closest('[data-selection-save]')) saveSelectedText();
  });
  document.body.appendChild(el); selectionPopover=el;
  return el;
}
function renderSelectionPopover(){
  const el=ensureSelectionPopover();
  el.querySelector('.selection-popover__text').textContent=selectionText;
  el.querySelector('.selection-popover__types').innerHTML=Object.entries(SELECTION_FAV_TYPES).map(([k,v])=>`<button type="button" class="${k===selectionFavType?'on':''}" data-selection-type="${k}">${v}</button>`).join('');
}
function hideSelectionPopover(){
  clearTimeout(selectionPopoverTimer);
  if(selectionPopover) selectionPopover.hidden=true;
}
function showSelectionPopover(text, rect){
  selectionText=text; selectionFavType='word';
  const el=ensureSelectionPopover(); renderSelectionPopover(); el.hidden=false;
  // 先显示以得到真实宽高，再优先放在选区上方；空间不够则放在下方。
  const pad=12, width=el.offsetWidth, height=el.offsetHeight;
  const left=Math.max(pad,Math.min(window.innerWidth-width-pad,rect.left+(rect.width-width)/2));
  const above=rect.top-height-10, top=above>=pad ? above : Math.min(window.innerHeight-height-pad,rect.bottom+10);
  el.style.left=Math.round(left)+'px'; el.style.top=Math.max(pad,Math.round(top))+'px';
}
function saveSelectedText(){
  const text=normalizeSelectionText(selectionText); if(!text) return;
  const id=selectionFavId(selectionFavType,text);
  FAV[id]={
    module:'selection', selectionType:selectionFavType, hash:routeKey(),
    w:'', d:'', jp:text, cn:`划词收藏 · ${SELECTION_FAV_TYPES[selectionFavType]}`, ts:Date.now()
  };
  saveFav(); renderSide();
  const btn=selectionPopover&&selectionPopover.querySelector('[data-selection-save]');
  if(btn){ btn.textContent='已收藏'; btn.disabled=true; }
  try{ document.getSelection().removeAllRanges(); }catch(e){}
  clearTimeout(selectionPopoverTimer);
  selectionPopoverTimer=setTimeout(hideSelectionPopover,700);
}
function maybeShowSelectionPopover(){
  requestAnimationFrame(()=>{
    const sel=document.getSelection();
    const text=normalizeSelectionText(sel&&sel.toString());
    if(!text||!selectionBelongsToApp(sel)){ hideSelectionPopover(); return; }
    const rect=sel.getRangeAt(0).getBoundingClientRect();
    if(rect.width||rect.height) showSelectionPopover(text,rect);
  });
}
function queueSelectionPopover(){
  clearTimeout(selectionCheckTimer);
  selectionCheckTimer=setTimeout(maybeShowSelectionPopover,48);
}
document.addEventListener('selectionchange', ()=>{
  // 点击浮窗控件时不重新读取（可能已被浏览器清空的）文本选区。
  if(selectionPopover&&!selectionPopover.hidden&&selectionPopover.contains(document.activeElement)) return;
  queueSelectionPopover();
});
document.addEventListener('pointerup', e=>{ if(!e.target.closest('#selectionPopover')) queueSelectionPopover(); },true);
document.addEventListener('mouseup', e=>{ if(!e.target.closest('#selectionPopover')) queueSelectionPopover(); },true);
document.addEventListener('touchend', e=>{ if(!e.target.closest('#selectionPopover')) queueSelectionPopover(); },true);
document.addEventListener('keyup', e=>{ if(e.key==='Escape') hideSelectionPopover(); else if(e.shiftKey||e.key==='ArrowLeft'||e.key==='ArrowRight') queueSelectionPopover(); });
document.addEventListener('pointerdown', e=>{ if(selectionPopover&&!e.target.closest('#selectionPopover')) hideSelectionPopover(); },true);
window.addEventListener('scroll', hideSelectionPopover,{passive:true});

/* ---------- module switch ---------- */
let LEVEL='n3', TYPE='grammar';
const MOD2LT = {grammar:['n3','grammar'], vocab:['n3','vocab'], kanji:['n3','kanji'], n2grammar:['n2','grammar'], n2vocab:['n2','vocab'], n2kanji:['n2','kanji'], n4grammar:['n4','grammar'], n4vocab:['n4','vocab'], n4kanji:['n4','kanji']};
const LT2MOD = {'n3:grammar':'grammar', 'n3:vocab':'vocab', 'n3:kanji':'kanji', 'n2:grammar':'n2grammar', 'n2:vocab':'n2vocab', 'n2:kanji':'n2kanji', 'n4:grammar':'n4grammar', 'n4:vocab':'n4vocab', 'n4:kanji':'n4kanji'};
function deriveLT(){ const p=MOD2LT[MODULE]||['n3','grammar']; LEVEL=p[0]; TYPE=p[1]; }
deriveLT();
function moduleFrom(lv,ty){ return LT2MOD[lv+':'+ty] || 'grammar'; }
function syncModeBar(){
  deriveLT();
  lvChip.firstChild.nodeValue = LEVEL.toUpperCase()+' ';
  // 读解/听解を開いている間、typebar の選択は React 側（.reader-mode-link /
  // .listening-mode-link）が持つ。ここで TYPE から点け直すと、popstate 由来の
  // 再描画のたびに前の tab が復活し、2つ同時に選択されて見える。
  const modeActive = document.body.classList.contains('reader-mode-active')
                  || document.body.classList.contains('listening-mode-active');
  document.querySelectorAll('#typebar button').forEach(b=>b.classList.toggle('on', !modeActive && b.dataset.ty===TYPE));
  document.querySelectorAll('#langbar button').forEach(b=>b.classList.toggle('on', b.dataset.lang===LANG));
  document.querySelectorAll('.lbl[data-cn]').forEach(el=>{ el.textContent = LX(el.dataset.cn, el.dataset.en); });
}
function setModule(m){
  MODULE=m; try{ localStorage.setItem('module',m); }catch(e){}
  fc.deck=[]; fc.week=0; syncModeBar();
}

/* ---------- 底部弹层（级别选择 / 通用知识共用） ---------- */
const sheetEl=$('#sheet'), sheetMask=$('#sheetMask');
function openSheet(html){ sheetEl.innerHTML=`<div class="sheet-grip"></div>`+html; sheetEl.hidden=false; sheetMask.hidden=false; }
function closeSheet(){ sheetEl.hidden=true; sheetMask.hidden=true; sheetEl.innerHTML=''; }
sheetMask.onclick = closeSheet;
document.addEventListener('keydown', e=>{ if(e.key==='Escape' && !sheetEl.hidden) closeSheet(); });
const LEVEL_LIST=[['n4','N4','基础'],['n3','N3','进阶'],['n2','N2','高阶']];
function openLevelSheet(){
  openSheet(`<div class="sheet-h">选择级别<span class="sub">当前 · ${modLabel()}</span></div>
    <div class="sheet-row">` + LEVEL_LIST.map(([lv,name,sub])=>
      `<button class="sheet-item ${lv===LEVEL?'on':''}" data-golevel="${lv}"><span class="ic">${name}</span><span class="sub">${sub}</span></button>`
    ).join('') + `</div>`);
}
// 接续表 / 活用 / 数字讲的是日语本身，不属于任何级别，所以放在这个全局弹层里，
// 每个页面都够得着；辨析是某个级别的语法家族对照，只在有数据时才出现，并标级别。
function openCommonSheet(){
  const ct = isGram() && hasContrast(MODULE);
  openSheet(`<div class="sheet-h">通用知识<span class="sub">不分级别</span></div>
    <div class="sheet-row">
      <button class="sheet-item" data-go="#/ref"><span class="ic">📖</span>接续表</button>
      <button class="sheet-item" data-go="#/katsuyou"><span class="ic">🔄</span>活用</button>
      <button class="sheet-item" data-go="#/henkei"><span class="ic">✍️</span>变形</button>
      <button class="sheet-item" data-go="#/numbers"><span class="ic">🔢</span>数字</button>
    </div>
    <div class="sheet-h">本模块<span class="sub">${modLabel()}</span></div>
    <div class="sheet-row">
      <button class="sheet-item scoped" data-go="#/cards"><span class="ic">🗂️</span>记忆卡</button>` +
      (ct ? `<button class="sheet-item scoped" data-go="#/contrast"><span class="ic">🔀</span>${LEVEL.toUpperCase()}辨析</button>` : '') +
      `<span class="sheet-item" style="visibility:hidden"></span>${ct?'':'<span class="sheet-item" style="visibility:hidden"></span>'}
    </div>`);
}
lvChip.onclick = openLevelSheet;
sheetEl.addEventListener('click', e=>{
  const lv=e.target.closest('[data-golevel]');
  if(lv){ closeSheet(); const mod=moduleFrom(lv.dataset.golevel, TYPE); setModule(mod); navTo(entryHash(mod)); return; }
  const go=e.target.closest('[data-go]');
  if(go){ closeSheet(); navTo(go.dataset.go); return; }
});

// 点语法/词汇/汉字一律回该模块的周目录：正在看某一天时想退回目录，
// 之前会跳回「上次看的那天」＝你正待着的那页，等于点了没反应。
// 换级别仍然回到上次看的那天（entryHash），那是跨级别时想接着看的场景。
document.querySelectorAll('#typebar button').forEach(b=>{
  b.onclick=()=>{ setModule(moduleFrom(LEVEL, b.dataset.ty)); navTo('#/'); };
});
document.querySelectorAll('#langbar button').forEach(b=>{
  b.onclick=()=>{ LANG=b.dataset.lang; try{localStorage.setItem('lang',LANG);}catch(e){} syncModeBar(); render(); };
});

/* ---------- routing ---------- */
/* URL は /study/... の実パス。ただし legacy 全体が '#/favs' のようなキーで
   書かれているので、内部の識別子はそのまま残し、境界だけで変換する。
   lastVisit / lastDay に保存済みのキーもこの形なので、移行不要。 */
const STUDY_BASE = '/study';
function keyToPath(key){
  const k = String(key || '#/').replace(/^#/, '');      // '#/favs' -> '/favs'
  return k === '/' ? STUDY_BASE : STUDY_BASE + k;       //          -> '/study/favs'
}
function pathToKey(pathname){
  if(pathname.indexOf(STUDY_BASE) !== 0) return '#/';
  const rest = pathname.slice(STUDY_BASE.length).replace(/\/+$/, '');
  return rest ? '#' + rest : '#/';
}
function routeKey(){ return pathToKey(location.pathname); }

/* 旧 hash リンク（/study#/favs）を実パスへ。ブックマークや共有済みリンク、
   localStorage の lastDay を生かすため、この shim は今後も残す。 */
if(location.hash.indexOf('#/') === 0){
  history.replaceState(null, '', keyToPath(location.hash) + location.search);
}

function navTo(key){
  const path = keyToPath(key);
  if(location.pathname === path){ render(); return; }
  history.pushState(null, '', path);
  render();
}
window.addEventListener('popstate', render);
backBtn.onclick = ()=>{ history.length>1 ? history.back() : navTo('#/'); };
document.querySelectorAll('nav.bottom button').forEach(b=>{
  // 「通用」不是一个页面，是个弹层入口，所以不走 navTo
  b.onclick = ()=>{ const n=b.dataset.nav;
    if(n==='common'){ openCommonSheet(); return; }
    closeSheet(); navTo({home:'#/',search:'#/search',favs:'#/favs',mistakes:'#/mistakes'}[n]); };
});
/* delegated clicks (artifact CSP blocks inline onclick=) */
app.addEventListener('click', e=>{
  const mt=e.target.closest('[data-memtoggle]'); if(mt){
    const kind=mt.dataset.memtoggle;
    if(kind==='ruby'){ document.body.classList.toggle('no-ruby'); try{localStorage.setItem('noruby', document.body.classList.contains('no-ruby')?'1':'0');}catch(e){} syncRubyBtn(); }
    else if(kind==='jp'){ document.body.classList.toggle('hide-jp'); try{localStorage.setItem('hidejp', document.body.classList.contains('hide-jp')?'1':'0');}catch(e){} }
    else if(kind==='cn'){ document.body.classList.toggle('hide-cn'); try{localStorage.setItem('hidecn', document.body.classList.contains('hide-cn')?'1':'0');}catch(e){} }
    syncMemBar();
    return;
  }
  const ob=e.target.closest('.opt-btn'); if(ob){
    const wrap=ob.closest('.qz');
    if(wrap && !wrap.classList.contains('answered')) gradeQz(wrap, +ob.dataset.optidx, true);
    return;
  }
  const wt=e.target.closest('[data-wktoggle]'); if(wt){ toggleWeek(+wt.dataset.wktoggle); viewHome(); updateStickyVars(); return; }
  // 顶部周条：收起的周点了要先展开再滚过去，否则等于什么都没发生
  const wj=e.target.closest('[data-wkjump]'); if(wj){
    const n=+wj.dataset.wkjump; openWeekSet().add(n); viewHome(); updateStickyVars();
    const el=document.getElementById('wk-'+n); if(el) el.scrollIntoView({behavior:'auto',block:'start'});
    return;
  }
  const sc=e.target.closest('[data-scroll]'); if(sc){ const el=document.getElementById(sc.dataset.scroll); if(el) el.scrollIntoView({behavior:sc.classList.contains('wk-tocitem')?'auto':'smooth',block:'start'}); return; }
  const sb=e.target.closest('[data-say]'); if(sb){ say(sb.dataset.say); return; }
  const fv=e.target.closest('[data-fav]'); if(fv){ toggleFav(fv.dataset.fav); fv.textContent=isFav(fv.dataset.fav)?'★':'☆'; if(routeKey()==='#/favs') viewFavs(); return; }
  if(e.target.closest('[data-favfc]')){ startFavFc(); return; }
  const fs=e.target.closest('[data-favstudy]'); if(fs){ favStudyMode=fs.dataset.favstudy==='1'; viewFavs(); return; }
  const ms=e.target.closest('[data-mstudy]'); if(ms){ mistakeStudyMode=ms.dataset.mstudy==='1'; viewMistakes(); return; }
  const sh=e.target.closest('[data-study-hide]'); if(sh){ if(sh.dataset.studyHide==='jp') studyHideJapanese=!studyHideJapanese; else studyHideTranslation=!studyHideTranslation; const h=routeKey(); if(h==='#/favs') viewFavs(); else if(h==='#/mistakes') viewMistakes(); return; }
  const ffl=e.target.closest('[data-favfilter]'); if(ffl){ favFilter=ffl.dataset.favfilter; viewFavs(); return; }
  const sff=e.target.closest('[data-selfavfilter]'); if(sff){ favSelectionFilter=sff.dataset.selfavfilter; viewFavs(); return; }
  const cm=e.target.closest('[data-ctmode]'); if(cm){ ctMode=cm.dataset.ctmode; viewContrast(); return; }
  const cw=e.target.closest('[data-ctweek]'); if(cw){ ctWeek=+cw.dataset.ctweek; viewContrast(); return; }
  const mty=e.target.closest('[data-mtype]'); if(mty){ mistakeAddType=mty.dataset.mtype; document.querySelectorAll('#mistakeTypes button').forEach(b=>b.classList.toggle('on', b.dataset.mtype===mistakeAddType)); return; }
  if(e.target.closest('[data-mistake-add]')){ const ta=document.getElementById('mistakeInput'); if(ta && ta.value.trim()){ addMistake(mistakeAddType, ta.value); mistakeDraft=''; render(); } return; }
  const md=e.target.closest('[data-mistake-del]'); if(md){ deleteMistake(md.dataset.mistakeDel); render(); return; }
  const mlv=e.target.closest('[data-mlevel-cycle]'); if(mlv){ cycleMistakeLevel(mlv.dataset.mlevelCycle); viewMistakes(); return; }
  const mf=e.target.closest('[data-mfilter]'); if(mf){ mistakeFilter=mf.dataset.mfilter; viewMistakes(); return; }
  const lf=e.target.closest('[data-lfilter]'); if(lf){ mistakeLevelFilter=lf.dataset.lfilter; viewMistakes(); return; }
  const fclr=e.target.closest('[data-favclear]'); if(fclr){ if(fclr.dataset.armed){ FAV={}; saveFav(); viewFavs(); } else { fclr.dataset.armed='1'; fclr.textContent='再点一次清空'; } return; }
  if(e.target.closest('[data-favflip]')){ favFlip=!favFlip; renderFavFc(); return; }
  if(e.target.closest('[data-favprev]')){ if(favIdx>0){ favIdx--; favFlip=false; renderFavFc(); } return; }
  if(e.target.closest('[data-favnext]')){ favIdx=(favIdx+1)%favDeck.length; favFlip=false; renderFavFc(); return; }
  if(e.target.closest('[data-favback]')){ navTo('#/favs'); return; }
  const go=e.target.closest('[data-go]'); if(go){ if(go.dataset.mod) setModule(go.dataset.mod); navTo(go.dataset.go); return; }
  const an=e.target.closest('[data-ans]'); if(an){ const a=document.getElementById(an.dataset.ans); if(a){ a.classList.toggle('show'); an.textContent=a.classList.contains('show')?'隐藏答案':'显示答案'; } return; }
  const hit=e.target.closest('[data-hit]'); if(hit){ openHit(+hit.dataset.hit); return; }
  const hq=e.target.closest('[data-histq]'); if(hq){ const qi=$('#q'); if(qi){ qi.value=hq.dataset.histq; qi.oninput(); } return; }
  const hc=e.target.closest('[data-histclear]'); if(hc){ clearSearchHistory(); const qi=$('#q'); if(qi){ qi.value=''; qi.oninput(); } return; }
  const fw=e.target.closest('[data-fcweek]'); if(fw){ fcSetWeek(+fw.dataset.fcweek); return; }
  const fb=e.target.closest('[data-fc]'); if(fb){ ({prev:fcPrev,next:fcNext,shuffle:fcShuffle})[fb.dataset.fc](); return; }
  if(e.target.closest('[data-fcflip]')){ fcFlip(); return; }
});
app.addEventListener('input', e=>{
  if(e.target.id==='mistakeInput') mistakeDraft=e.target.value;
});
/* 判分与还原共用。log=false 用于 render() 后重放已答过的题——
   那时错题早就记过了，再记一次会在错题本里出现重复。 */
function gradeQz(wrap, picked, log){
  const correct=+wrap.dataset.qcorrect;
  wrap.classList.add('answered');
  wrap.querySelectorAll('.opt-btn').forEach(b=>{
    const idx=+b.dataset.optidx;
    if(idx===correct) b.classList.add('correct');
    else if(idx===picked) b.classList.add('wrong');
  });
  const qEl=wrap.closest('.q'); if(!qEl) return;
  const r=qEl.querySelector('.qz-result');
  if(r){ r.textContent = picked===correct?'✓ 答对了':'✗ 答错了'; r.classList.add(picked===correct?'ok':'ng'); }
  const note=qEl.querySelector('.qz-note'); if(note) note.classList.add('show');
  if(log && picked!==correct){
    const qText=(qEl.querySelector('.jp')||{}).textContent||'';
    const pickedBtn=wrap.querySelector(`[data-optidx="${picked}"]`);
    const correctBtn=wrap.querySelector(`[data-optidx="${correct}"]`);
    addMistake('q', `${qText.trim()}\n你的答案：${((pickedBtn?pickedBtn.textContent:'')||'').trim()}\n正确答案：${((correctBtn?correctBtn.textContent:'')||'').trim()}`);
  }
}
/* 答题状态同样只存在 DOM 里。按页面上第几道题来对应，
   数量对不上就说明画的不是同一份内容，宁可不还原也不能张冠李戴。 */
function snapshotQz(){
  return Array.from(app.querySelectorAll('.qz[data-qcorrect]')).map(w=>{
    if(!w.classList.contains('answered')) return null;
    const wrong=w.querySelector('.opt-btn.wrong');
    return wrong ? +wrong.dataset.optidx : +w.dataset.qcorrect;
  });
}
function restoreQz(snap){
  const ws=app.querySelectorAll('.qz[data-qcorrect]');
  if(!snap || ws.length!==snap.length) return;
  ws.forEach((w,i)=>{ if(snap[i]!=null) gradeQz(w, snap[i], false); });
}
function setNav(name){ document.querySelectorAll('nav.bottom button').forEach(b=>b.classList.toggle('on', b.dataset.nav===name)); }
/* 桌面侧栏：把底栏五个 tab、级别、类型、通用弹层里的东西摊平成一列常驻目录。
   内容跟手机端一一对应，只是不用再点开弹层，所以走同一套 setModule / navTo。 */
const sideEl=$('#side');
function sideRow(go, ic, label, count, on){
  return `<button class="side-item ${on?'on':''}" data-go="${go}"><span class="ic">${ic}</span>${esc(label)}` +
    (count!=null && count!=='' ? `<span class="ct">${count}</span>` : '') + `</button>`;
}
function renderSide(){
  deriveLT();
  // typebar と同じ理由：読解／聴解モード中は選択状態を React 側が持つので、
  // ここで hash から点け直すと注入された読解リンクと二重に光る。
  const modeActive = document.body.classList.contains('reader-mode-active')
                  || document.body.classList.contains('listening-mode-active');
  const h = modeActive ? '' : routeKey();
  const LV = LEVEL.toUpperCase();
  const weeksOf = ty => { const w=((DATA[moduleFrom(LEVEL,ty)]||{}).weeks||[]).length; return w?w+'周':''; };
  // 在某个模块的首页或某一天里，才算「正待在这个类型上」
  const inModule = h==='#/' || h.startsWith('#/day/');
  const types = [['grammar','📘','语法'],['vocab','📗','词汇'],['kanji','📙','汉字']];
  const favCount = Object.keys(FAV).length;
  sideEl.innerHTML =
    `<div class="side-brand">日本語上手</div>
     <div class="side-sec"><div class="side-h">级别</div>
       <div class="side-seg">` + LEVEL_LIST.map(([lv,name])=>
         `<button class="${lv===LEVEL?'on':''}" data-golevel="${lv}">${name}</button>`).join('') + `</div>
     </div>
     <div class="side-sec"><div class="side-h">${LV} 内容</div>` +
       types.map(([ty,ic,label])=>
         `<button class="side-item ${(inModule && ty===TYPE)?'on':''}" data-gotype="${ty}"><span class="ic">${ic}</span>${label}<span class="ct">${weeksOf(ty)}</span></button>`
       ).join('') + `</div>
     <div class="side-sec"><div class="side-h">通用知识 <span class="n">· 不分级别</span></div>` +
       sideRow('#/ref','📖','接续表',null,h==='#/ref') +
       sideRow('#/katsuyou','🔄','活用',null,h==='#/katsuyou') +
       sideRow('#/henkei','✍️','变形',null,h==='#/henkei') +
       sideRow('#/numbers','🔢','数字',null,h==='#/numbers') + `</div>
     <div class="side-sec"><div class="side-h">本模块</div>` +
       sideRow('#/cards','🗂️','记忆卡',null,h==='#/cards') +
       (isGram() && hasContrast(MODULE) ? sideRow('#/contrast','🔀',LV+'辨析',null,h==='#/contrast') : '') + `</div>
     <div class="side-foot">` +
       sideRow('#/search','🔍','搜索',null,h==='#/search') +
       sideRow('#/mistakes','📝','错题本',MISTAKES.length||'',h==='#/mistakes') +
       sideRow('#/favs','⭐','收藏',favCount||'',h==='#/favs') + `</div>`;
}
sideEl.addEventListener('click', e=>{
  const lv=e.target.closest('[data-golevel]');
  if(lv){ const mod=moduleFrom(lv.dataset.golevel, TYPE); setModule(mod); navTo(entryHash(mod)); return; }
  const ty=e.target.closest('[data-gotype]');
  if(ty){ setModule(moduleFrom(LEVEL, ty.dataset.gotype)); navTo('#/'); return; }
  const go=e.target.closest('[data-go]');
  if(go){ closeSheet(); navTo(go.dataset.go); return; }
});
function setHeader(t, showBack){
  titleEl.textContent = t;
  backBtn.style.display = showBack?'':'none';
  topAction.style.display='inline-block'; syncRubyBtn();
}
function updateStickyVars(){
  const tb = document.getElementById('topbar');
  if(tb) document.documentElement.style.setProperty('--topbarh', tb.offsetHeight+'px');
  const ht = document.querySelector('.home-top');
  document.documentElement.style.setProperty('--hometoph', (ht?ht.offsetHeight:0)+'px');
  const nn = document.querySelector('.num-nav');
  if(nn) document.documentElement.style.setProperty('--numnavh', nn.offsetHeight+'px');
}
window.addEventListener('resize', updateStickyVars);

/* 数字页吸顶目录：跟着滚动高亮当前小节，并把高亮的胶囊拉回可视范围。
   render() 每次都会重建 DOM，所以这里用一个常驻监听器＋存在性判断，不需要销毁逻辑。 */
function updateNumNavActive(){
  const nav = document.querySelector('.num-nav');
  if(!nav) return;
  const heads = document.querySelectorAll('.num-sec-h');
  if(!heads.length) return;
  const line = nav.getBoundingClientRect().bottom + 4;
  let activeId = heads[0].id;
  heads.forEach(h=>{ if(h.getBoundingClientRect().top <= line) activeId = h.id; });
  let onEl = null;
  nav.querySelectorAll('a').forEach(a=>{
    const on = a.dataset.scroll === activeId;
    a.classList.toggle('on', on);
    if(on) onEl = a;
  });
  if(onEl){ // 只在胶囊确实跑出视野时才横向滚动，避免和手动滑动打架
    const nr = nav.getBoundingClientRect(), ar = onEl.getBoundingClientRect();
    if(ar.left < nr.left || ar.right > nr.right) nav.scrollLeft += ar.left - nr.left - 12;
  }
}
let _numNavTick = false;
window.addEventListener('scroll', ()=>{
  if(_numNavTick) return;
  _numNavTick = true;
  requestAnimationFrame(()=>{ _numNavTick = false; updateNumNavActive(); });
}, {passive:true});
function render(){
  hideCommonPage();
  if(!dataLoaded){ app.innerHTML='<div class="empty">加载中…</div>'; return; }
  const h = routeKey();
  renderSide();
  if((MODULE==='n2grammar'||MODULE==='n2vocab'||MODULE==='n2kanji') && !n2Loaded){ setNav('home'); setHeader(modLabel(), false); app.innerHTML='<div class="empty">N2 数据加载中，请稍候…</div>'; return; }
  if((MODULE==='n4grammar'||MODULE==='n4vocab'||MODULE==='n4kanji') && !n4Loaded){ setNav('home'); setHeader(modLabel(), false); app.innerHTML='<div class="empty">N4 数据加载中，请稍候…</div>'; return; }
  if(h==='#/search' && !n2Loaded){ setNav('search'); setHeader(LX('搜索（语法 + 词汇）','Search (Grammar + Vocabulary)'), false); app.innerHTML='<div class="empty">词典数据加载中，马上就好…</div>'; return; }
  syncModeBar();
  // 必须带上模块：切模块时 hash 可能不变（两个模块的入口都停在同一天），
  // 只比 hash 会把上一个模块的答题状态还原到新模块的题上
  const viewKey = MODULE + '|' + h;
  const sameView = (viewKey===_lastRenderedHash);
  if(!sameView) window.scrollTo(0,0);
  // <details> 的展开状态只存在 DOM 里，重画同一个页面时要自己收好再放回去
  const openSnap = sameView ? Array.from(app.querySelectorAll('details')).map(d=>d.open) : null;
  const qzSnap   = sameView ? snapshotQz() : null;
  _lastRenderedHash = viewKey;
  if(h==='#/'){ saveLastVisit('#/'); viewHome(); }
  else if(h==='#/search') viewSearch();
  else if(h==='#/cards') viewCards();
  else if(h==='#/favs') viewFavs();
  // 接续表 / 活用表 / 数字表达讲的是日语本身，任何模块下都能直接看，不改当前模块。
  // 辨析不同：它的内容就是 N3 语法的家族对照，跳转链接也指向 N3 语法的某天，所以仍要切过去。
  else if(h==='#/ref') viewRef();
  else if(h==='#/katsuyou') viewKatsuyou();
  else if(h==='#/henkei') viewHenkei();
  else if(h==='#/numbers') viewNumbers();
  else if(h==='#/contrast'){ const cm=contrastModule(); if(MODULE!==cm) setModule(cm); viewContrast(); }
  else if(h==='#/mistakes') viewMistakes();
  else {
    let m = h.match(/^#\/day\/(\d)-(\d)(?:\/(p\d+|v\d+-\d+|k\d+))?$/);
    if(m){
      saveLastVisit(`#/day/${m[1]}-${m[2]}`);
      viewDay(+m[1], +m[2], m[3]||null);
    }
    else viewHome();
  }
  if(openSnap){
    const ds = app.querySelectorAll('details');
    // 数量对不上说明画的不是同一份内容，硬套会张冠李戴，宁可不还原
    if(ds.length===openSnap.length) ds.forEach((d,i)=>{ d.open = openSnap[i]; });
  }
  restoreQz(qzSnap);
  updateStickyVars();
}

/* ---------- home ---------- */
function viewHome(){
  setNav('home'); setHeader(modLabel(), false);
  const book = LX(
    {grammar:'N3语法训练', n2grammar:'N2语法训练', vocab:'N3词汇训练', kanji:'N3汉字训练', n2vocab:'N2词汇训练', n2kanji:'N2汉字训练', n4grammar:'N4语法训练', n4vocab:'N4词汇训练', n4kanji:'N4汉字训练'}[MODULE],
    {grammar:'JLPT Prep N3 Grammar', n2grammar:'JLPT Prep N2 Grammar', vocab:'JLPT Prep N3 Vocabulary', kanji:'JLPT Prep N3 Kanji', n2vocab:'JLPT Prep N2 Vocabulary', n2kanji:'JLPT Prep N2 Kanji', n4grammar:'JLPT Prep N4 Grammar', n4vocab:'JLPT Prep N4 Vocabulary', n4kanji:'JLPT Prep N4 Kanji'}[MODULE]
  );
  const kind = LX(
    (MODULE==='vocab'||MODULE==='n2vocab'||MODULE==='n4vocab')?'词汇':((MODULE==='kanji'||MODULE==='n2kanji'||MODULE==='n4kanji')?'汉字':'语法'),
    (MODULE==='vocab'||MODULE==='n2vocab'||MODULE==='n4vocab')?'vocabulary':((MODULE==='kanji'||MODULE==='n2kanji'||MODULE==='n4kanji')?'kanji':'grammar')
  );
  const weeks = CUR().weeks;
  // 不写死「× 7 天」：N2 词汇有两周是缺天的，写死会跟周里实际列出的天数对不上
  const totalDays = weeks.reduce((n,w)=>n+w.days.length, 0);
  const intro = LX(`《${book}》 · ${weeks.length} 周 · 共 ${totalDays} 天 · 点击进入每日${kind}`, `${book} · ${weeks.length} weeks · ${totalDays} days · Tap to open each day's ${kind}`);
  let html = `<div class="home-top"><div class="meta" style="margin-bottom:10px">${intro}</div>` +
    (weeks.length>3 ? `<div class="wk-toc">${weeks.map(w=>`<a class="wk-tocitem" data-wkjump="${w.n}">第${w.n}周</a>`).join('')}</div>` : '') +
    `</div>`;
  // 数字 / 接续表 / 活用 讲的是日语本身，不分级别，所以九个模块的首页都放；
  // 辨析的内容是 N3 语法的家族对照，属于 N3 语法这一层，只在那里出现并标明级别。
  // 工具入口全部收进底部「通用」弹层了，首页只剩内容本身。
  const open = openWeekSet();
  for(const w of weeks){
    const wt = w.title ? ` <span class="jp">${esc(w.title)}</span>` : '';
    const wsubText = LX(w.title_cn, w.title_en);
    const wsub = wsubText ? `<div class="sub">${esc(wsubText)}</div>` : '';
    const isOpen = open.has(w.n);
    html += `<div class="card week-card" id="wk-${w.n}">
      <div class="wk-head" data-wktoggle="${w.n}" role="button" aria-expanded="${isOpen}">
        <div class="wk-t"><h2>第${w.n}週${wt}</h2>${wsub}</div>
        <span class="cnt">${w.days.length}天</span><span class="cv">${isOpen?'▾':'▸'}</span>
      </div>`;
    if(isOpen){
      html += `<div class="wk-body"><div class="day-list">` +
        w.days.map(d=>{
          const isExam = d.day===7;
          return `<div class="day-item" data-go="#/day/${w.n}-${d.day}">
            <div class="d">${d.day}日目${isExam?' · 实战':''}</div>
            <div class="t jp">${R(d,'title')}</div>
            <div class="tc">${esc(LX(d.title_cn, d.title_en))}</div>${dayPreviewHTML(d)}</div>`;
        }).join('') + `</div></div>`;
    }
    html += `</div>`;
  }
  app.innerHTML = html;
}
/* 周手风琴的展开状态：按模块各记各的，默认展开上次看的那一周。
   render() 会整页重画，所以状态必须存在模块级变量里，不能只存在 DOM 上。 */
const openWeeks = {};
function openWeekSet(){
  if(!openWeeks[MODULE]){
    const m = (lastDay[MODULE]||'').match(/^#\/day\/(\d+)-/);
    const first = (CUR().weeks[0]||{}).n || 1;
    openWeeks[MODULE] = new Set([m ? +m[1] : first]);
  }
  return openWeeks[MODULE];
}
function toggleWeek(n){
  const s = openWeekSet();
  if(s.has(n)) s.delete(n); else s.add(n);
}
// 一眼看出这天讲什么：语法日给语法点，汉字日给汉字，词汇日给头几个词
function dayPreviewHTML(d){
  let items = [];
  if(Array.isArray(d.points)) items = d.points.map(p=>p.pattern);
  else if(Array.isArray(d.kanji)) items = d.kanji.map(k=>k.char);
  else if(Array.isArray(d.sections)) items = d.sections.reduce((a,s)=>a.concat((s.items||[]).map(i=>i.jp)), []);
  items = items.filter(Boolean).slice(0, 6);
  if(!items.length) return '';
  return `<div class="day-prev">` + items.map(t=>`<span class="dp jp">${esc(t)}</span>`).join('') + `</div>`;
}

/* ---------- shared helpers ---------- */
function findDay(w,d){ const wk=CUR().weeks.find(x=>x.n===w); return wk?wk.days.find(x=>x.day===d):null; }
function ansBlock(id, content){
  return `<button class="ansbtn" data-ans="${id}">显示答案</button>
  <div class="answer" id="${id}">${content}</div>`;
}
function afterRender(scrollP){
  if(scrollP!=null){
    const el=document.querySelector(`[id$="-${scrollP}"].point`);
    if(el){ el.scrollIntoView({block:'center'}); el.style.background='var(--amber-soft)'; setTimeout(()=>el.style.background='',1600); }
  }
}
const CIRCLED_NUMS = '①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟';
function parseCircledAnswers(str){
  const map={};
  if(!str) return map;
  let i=0;
  while(i<str.length){
    const ci = CIRCLED_NUMS.indexOf(str[i]);
    if(ci>=0){
      let j=i+1, num='';
      while(j<str.length && /[0-9]/.test(str[j])){ num+=str[j]; j++; }
      if(num) map[ci+1]=+num;
      i=j;
    } else i++;
  }
  return map;
}
function parseExamAnswerDetails(str){
  const map={};
  if(!str) return map;
  const re=new RegExp('(['+CIRCLED_NUMS+'])([^'+CIRCLED_NUMS+']*)','g');
  for(const match of str.matchAll(re)){
    const n=CIRCLED_NUMS.indexOf(match[1])+1, raw=match[2].trim();
    const star=raw.match(/★\s*([1-4])/), direct=raw.match(/^\s*([1-4])(?:\s|$|→)/);
    const ans=star?+star[1]:(direct?+direct[1]:null);
    if(ans!=null) map[n]={ans,order:star?raw:''};
    else if(raw) map[n]={text:raw};
  }
  return map;
}
function numericExamAnswers(details){
  const map={};
  for(const [n,a] of Object.entries(details||{})) if(a.ans!=null) map[n]=a.ans;
  return map;
}
function rangedAnswerHTML(details, n){
  const nums=String(n).match(/\d+/g)||[];
  const list=nums.length===2 && nums[0]!==nums[1]
    ? Array.from({length:+nums[1]-+nums[0]+1},(_,i)=>+nums[0]+i) : nums.map(Number);
  const entries=list.map(i=>details[i]&&details[i].text?`${CIRCLED_NUMS[i-1]} ${esc(details[i].text)}`:'').filter(Boolean);
  return entries.length?entries.join('　'):'';
}
function answerMapFromKeys(keys){
  const map={};
  (keys||[]).forEach((answer,i)=>{ map[i+1]=answer; });
  return map;
}
// N3 汉字训练：各周第七日实战题答案。
// 原书题目页标注为“答えは別冊”，扫描件未收录别册；以下答案逐题按本地题目和原书选项校对。
const N3_KANJI_EXAM_KEYS={
  1:[2,1,2,4,3,4,1,2,2,4,3,1,4,2,3,4,2,3,4,1],
  2:[2,2,2,3,1,1,4,4,3,1,2,1,4,3,1,3,4,1,3,4],
  3:[1,3,1,4,4,2,3,1,2,1,4,1,4,2,4,2,1,3,2,3],
  4:[3,3,4,1,3,2,4,4,3,1,4,2,3,3,1,1,3,1,2,3]
};
function quizOptsHTML(it, correctAns){
  const opts = it.opts_r||(it.opts||[]).map(esc);
  if(!it.opts) return '';
  if(correctAns==null) return `<div class="opts">${opts.map((o,i)=>`<span class="jp">${i+1} ${o}</span>`).join('')}</div>`;
  return `<div class="opts qz" data-qcorrect="${correctAns}">${opts.map((o,i)=>`<button type="button" class="opt-btn jp" data-optidx="${i+1}">${i+1} ${o}</button>`).join('')}</div>`;
}
function optsRow(it){
  const opts = it.options_r||it.opts_r||(it.options||it.opts||[]).map(esc);
  if(!(it.options||it.opts)) return '';
  const numbered = !!it.opts; // exam-style opts are numbered
  return `<div class="opts">${opts.map((o,i)=>`<span class="jp">${numbered?(i+1)+' ':''}${o}</span>`).join('')}</div>`;
}

/* ---------- day view (dispatch) ---------- */
function viewDay(w,d,scrollTok){
  const day=findDay(w,d);
  if(!day){ app.innerHTML='<div class="empty">未找到</div>'; return; }
  setNav('home'); setHeader(LX(`第${w}週 ${d}日目`, `Week ${w} Day ${d}`), true);
  if(isGram()) viewDayGrammar(day,w,d, scrollTok&&scrollTok[0]==='p'?+scrollTok.slice(1):null);
  else if(MODULE==='kanji'||MODULE==='n2kanji'||MODULE==='n4kanji') viewDayKanji(day,w,d, scrollTok&&scrollTok[0]==='k'?scrollTok.slice(1):null);
  else viewDayVocab(day,w,d, scrollTok&&scrollTok[0]==='v'?scrollTok.slice(1):null);
  app.insertAdjacentHTML('beforeend', dayNavHTML(w,d));
}
/* 上一日/下一日：按模块里实际存在的天排一条链，所以跨周能走（w1d7→w2d1），
   缺天的模块（N2词汇第5、6周）会自然跳过，起点不是第1周的（N4词汇从第4周开始）也不用特判。 */
function dayChain(){
  const out=[];
  for(const wk of CUR().weeks) for(const dy of wk.days) out.push([wk.n, dy.day, dy]);
  return out;
}
function dayNeighbors(w,d){
  const chain=dayChain();
  const i=chain.findIndex(x=>x[0]===w && x[1]===d);
  if(i<0) return {};
  return { prev: i>0?chain[i-1]:null, next: i<chain.length-1?chain[i+1]:null };
}
function dayNavHTML(w,d){
  const {prev,next} = dayNeighbors(w,d);
  const fab=(t,dir)=>{
    if(!t) return '';
    const [cw,cd,day]=t;
    const label=LX(`第${cw}週 ${cd}日目`, `Week ${cw} Day ${cd}`);
    const ar=dir==='prev'?'‹':'›';
    const txt=`<span class="txt"><span class="lb">${esc(label)}</span><span class="sub jp">${esc(day.title||'')}</span></span>`;
    return `<a class="daynav-fab ${dir}" data-go="#/day/${cw}-${cd}" title="${escAttr(label)}" aria-label="${escAttr(label)}">` +
      (dir==='prev' ? `<span class="ar">${ar}</span>${txt}` : `${txt}<span class="ar">${ar}</span>`) + `</a>`;
  };
  return fab(prev,'prev')+fab(next,'next');
}
// 桌面上顺手支持左右方向键翻页；在输入框里打字时不抢按键
document.addEventListener('keydown', e=>{
  if(e.key!=='ArrowLeft' && e.key!=='ArrowRight') return;
  if(e.metaKey||e.ctrlKey||e.altKey) return;
  const t=e.target, tag=t&&t.tagName;
  if(tag==='INPUT'||tag==='TEXTAREA'||(t&&t.isContentEditable)) return;
  const m=routeKey().match(/^#\/day\/(\d+)-(\d+)/);
  if(!m) return;
  const n=dayNeighbors(+m[1],+m[2])[e.key==='ArrowLeft'?'prev':'next'];
  if(n){ e.preventDefault(); navTo(`#/day/${n[0]}-${n[1]}`); }
});
function scrollHighlight(id){
  const el=document.getElementById(id);
  if(el){ el.scrollIntoView({block:'center'}); el.style.background='var(--amber-soft)'; setTimeout(()=>{el.style.background='';},1600); }
}

/* ---------- grammar day ---------- */
/* 接続的排版。书里用三层分隔符，之前全当普通文字渲染，挤成一段还会在分隔符处换行：
     「；」「　」「❶❷」 顶层分组      「／」 并列候选      「＋」 前接与后接的连接点
   注意 ASCII 的 "/"（V/A/na/N 这种）不是分隔符，只有全角「／」是，所以只切全角。
   「＋」正好一个时才当连接点拆前后两半；出现多个说明它属于各个候选内部（如
   Aくて＋仕方がない／naで＋しょうがない），那就只按「／」切，别拆坏。 */
/* 括号内的「／」是说明文字的一部分（如「注意：Nだ／naだ→だを取る」），不能当分隔符切开 */
function splitTop(str, sep){
  const out=[]; let depth=0, cur='';
  for(const ch of str){
    if('（(「〈〔'.indexOf(ch)>=0) depth++;
    else if('）)」〉〕'.indexOf(ch)>=0) depth--;
    if(ch===sep && depth===0){ out.push(cur); cur=''; }
    else cur += ch;
  }
  out.push(cur); return out;
}
/* 一个「槽」＝两个「＋」之间的部分。括号的作用是把竖列的候选跟外面的固定部分
   对齐，所以整行只有一个槽（没有固定部分）时书上不画括号，直接一行一个列出来。 */
function connRowHTML(row){
  const slots = splitTop(row,'＋').map(s=>s.trim()).filter(Boolean);
  if(slots.length===1){
    const alts = splitTop(slots[0],'／').map(x=>x.trim()).filter(Boolean);
    return alts.map(a=>`<div class="conn-row"><span class="conn-fix jp">${fmt(a)}</span></div>`).join('');
  }
  const altsOf = seg => splitTop(seg,'／').map(x=>x.trim()).filter(Boolean);
  return `<div class="conn-row">` + slots.map((seg,i)=>{
    const alts = altsOf(seg);
    if(alts.length<2) return `<span class="conn-fix jp">${fmt(seg)}</span>`;
    // 括号是用来把竖列跟旁边的内容隔开的：行首没有左括号；右边紧跟着又一个竖列时
    // 也不收口，因为那个竖列自己会画左括号，两道挨在一起书上是不画的。
    const cls = (i>0 ? ' brl' : '') + ((i<slots.length-1 && altsOf(slots[i+1]).length<2) ? ' brr' : '');
    return `<span class="conn-br${cls}">${alts.map(a=>`<span class="conn-alt jp">${fmt(a)}</span>`).join('')}</span>`;
  }).join('') + `</div>`;
}
function connHTML(str){
  return String(str||'').split(/[；　]/).map(s=>s.trim()).filter(Boolean).map(g=>{
    // 「（注意：…）」是补充说明，不属于接続本身，抽出来放在下面一行
    const m = g.match(/^([\s\S]*?)(（注意：[^）]*）)\s*$/);
    const row = m ? m[1].trim() : g, note = m ? m[2] : '';
    return `<div class="conn-grp">${connRowHTML(row)}` +
      (note ? `<div class="conn-note jp">${fmt(note)}</div>` : '') + `</div>`;
  }).join('');
}
function connBlockHTML(p){
  if(!p.connection) return '';
  const hint = /~[^~]+~/.test(p.connection) ? `<span class="conn-hint">（划线部分去掉）</span>` : '';
  return `<div class="conn jp"><span class="conn-label">接続${hint}</span>${connHTML(p.connection)}</div>`;
}
function pointHTML(p, wid, i){
  const pid = MODULE+'#'+wid+'#'+i, pw=wid.split('-')[0], pd=wid.split('-')[1];
  const psnap = {module:MODULE, hash:'#/day/'+wid+'/p'+i, w:pw, d:pd, jp:p.pattern, cn:p.usage_cn||''};
  const puse = LX(p.usage_cn, p.usage_en);
  let h = `<div class="point" id="pt-${wid}-${i}">
    <h3 class="jp">${R(p,'pattern')}</h3>${star(pid,psnap)}${sayBtn(p.pattern)}
    ${p.reading?`<div class="reading jp">${esc(p.reading)}</div>`:''}
    ${connBlockHTML(p)}
    ${p.usage_jp?`<div class="usage jp">${R(p,'usage_jp')}</div>`:''}
    ${puse?`<div class="usage"><span class="cn">${esc(puse)}</span></div>`:''}`;
  for(const ex of (p.examples||[])){ const exTx=LX(ex.cn, ex.en); h += `<div class="ex"><div class="jp">${R(ex,'jp')}${sayBtn(ex.jp)}</div>${ex.eq?`<div class="eq jp">（${R(ex,'eq')}）</div>`:''}${exTx?`<div class="cn">${esc(exTx)}</div>`:''}</div>`; }
  for(const nt of (p.notes||[])) h += `<div class="${noteClass(nt.type)}"><b class="nt">${esc(noteLabel(nt.type))}</b><span class="jp">${R(nt,'text')}</span></div>`;
  return h + `</div>`;
}
function viewDayGrammar(day,w,d,scrollP){
  const wk=CUR().weeks.find(x=>x.n===w);
  const wt = wk.title?` <span class="jp">${esc(wk.title)}</span>（${esc(LX(wk.title_cn, wk.title_en))}）`:` · ${MODULE==='n2grammar'?'N2 语法':(MODULE==='n4grammar'?'N4 语法':'语法')}`;
  let html = `<div class="crumb">第${w}週${wt}</div>`;
  if(d===7){ app.innerHTML = html + examGrammarHTML(day,w); afterRender(scrollP); return; }
  html += `<h2 class="page jp">${R(day,'title')} <span class="meta">${esc(LX(day.title_cn, day.title_en))}</span></h2>`;
  if(day.dialog){
    const lines = day.dialog.lines_r || (day.dialog.lines||[]).map(esc);
    const dTx = LX(day.dialog.cn, day.dialog.en);
    html += `<div class="dialog jp">${lines.join('<br>')} ${sayBtn((day.dialog.lines||[]).join('　'))}${dTx?`<div class="cn">${esc(dTx)}</div>`:''}</div>`;
  }
  html += `<div class="card">` + (day.points||[]).map((p,i)=>pointHTML(p,`${w}-${d}`,i)).join('<hr style="border:none;border-top:1px solid var(--line);margin:16px 0">') + `</div>`;
  if(day.exercises){
    html += `<div class="sec-title">れんしゅう（练习）</div><div class="card">`;
    for(const sec of (day.exercises.sections||[])){
      html += `<div class="meta jp" style="margin:4px 0 8px">${sec.type==='choice'?'Ⅰ':'Ⅱ'}　${R(sec,'instruction')}</div>`;
      for(const it of (sec.items||[])) html += `<div class="q"><span class="n">${it.n}</span><span class="jp">${R(it,'q')}</span>${optsRow(it)}</div>`;
    }
    if(day.exercises.answers) html += ansBlock(`ans-${w}-${d}`, `<b>答案：</b><span class="jp">${esc(day.exercises.answers)}</span>`);
    else if(day.exercises.answers_note) html += `<div class="meta">${esc(day.exercises.answers_note)}</div>`;
    html += `</div>`;
  }
  app.innerHTML = html; afterRender(scrollP);
}
/* 别册里一道题可能带：一句 note、译文、四个选项各自的讲解、要点、生单词。
   答对答错都要能复盘，所以整块跟原来的 note 一样，答完题才显示。 */
/* 出处链接的标题从课程数据现取，改了课程这里跟着变，不会出现"链接写着A、点进去是B"。
   三种模块的锚点各不相同：语法 pN、词汇 vSI-II、汉字 kKI。 */
function srcLabel(link){
  const m = String(link||'').match(/^#\/day\/(\d+)-(\d+)\/(.+)$/);
  if(!m) return '看出处';
  const w=+m[1], d=+m[2], tok=m[3], dy=findDay(w,d);
  let name='', mm;
  if(dy){
    if((mm=tok.match(/^p(\d+)$/))){ const p=(dy.points||[])[+mm[1]]; if(p) name=R(p,'pattern'); }
    else if((mm=tok.match(/^v(\d+)-(\d+)$/))){
      const sec=(dy.sections||[])[+mm[1]], it=sec&&(sec.items||[])[+mm[2]];
      // 词条可能整条是一段对话，太长就截断，否则这个胶囊会撑满一屏
      if(it) name = (it.jp||'').length>14 ? esc(it.jp.slice(0,14))+'…' : (it.jp_r||esc(it.jp));
    }
    else if((mm=tok.match(/^k(\d+)$/))){ const k=(dy.kanji||[])[+mm[1]]; if(k) name=esc(k.char); }
  }
  return `第${w}週${d}日目` + (name ? ` · <span class="jp">${name}</span>` : '');
}
function examNoteHTML(a, it){
  const opts = it.opts_r || (it.opts||[]).map(esc);
  const optionTranslations = a.option_translations || [];
  let h = a.note ? `<div class="jp">${R(a,'note')}</div>` : '';
  if(a.trans) h += `<div class="an-trans">${esc(a.trans)}</div>`;
  if(a.link) h += `<div class="an-link" data-go="${escAttr(a.link)}">📘 ${srcLabel(a.link)} ›</div>`;
  const why = a.why||[], words = a.words||[];
  if(!why.length && !a.point && !words.length) return h;
  h += `<details class="an-more"><summary>详细解析</summary>`;
  if(why.length) h += `<ol class="an-why">` + why.map((t,i)=>
    `<li class="${(i+1)===a.ans?'ok':''}"><span class="o jp">${opts[i]||''}</span>${optionTranslations[i]?`<span class="an-opt-trans">${esc(optionTranslations[i])}</span>`:''}<span class="w">${esc(t)}</span></li>`).join('') + `</ol>`;
  if(a.point) h += `<div class="an-point">要点：${esc(a.point)}</div>`;
  // 逐节拆解：把句子切成一个个成分，说清每一节在句子里干什么
  if((a.parse||[]).length) h += `<div class="an-h">逐节拆解</div><div class="an-words an-parse">` + a.parse.map(v=>
    `<div class="an-word"><span class="j jp">${esc(v.t)}</span>${(v.k&&v.k!=='—')?`<span class="k jp">${esc(v.k)}</span>`:''}<span class="m">${esc(v.r)}</span></div>`).join('') + `</div>`;
  // 层层叠加：从最里层的动词开始，一层层接上去，看清整个句型是怎么长出来的
  if((a.build||[]).length) h += `<div class="an-h">怎么一层层搭起来的</div><ol class="an-build">` + a.build.map((s,i)=>
    `<li><span class="a jp">${i?'＋':''}${esc(s.add)}</span><span class="m">${esc(s.mean)}</span>` +
    (s.res===s.add ? '' : `<div class="r jp">${esc(s.res)}</div>`) + `</li>`).join('') + `</ol>`;
  if(words.length) h += `<div class="an-words"><div class="h">生词</div>` + words.map(v=>
    `<div class="an-word"><span class="j jp">${esc(v.jp)}</span><span class="k jp">${esc(v.kana)}</span><span class="m">${esc(v.cn)}</span></div>`).join('') + `</div>`;
  return h + `</details>`;
}
function fallbackExamNoteHTML(it,a,module,section){
  const opts=it.opts_r||(it.opts||[]).map(esc);
  const answer=opts[(a.ans||1)-1]||'';
  const answerPlain=(it.opts||[])[(a.ans||1)-1]||'';
  const target=it.ul?`「${esc(it.ul)}」`:'题干中的空格';
  let hint='结合题干语境，选择最符合题意的表达。';
  if(module==='kanji'){
    if(section==='mondai1') hint=`${target} 的正确读法为上面的选项。`;
    else if(section==='mondai2') hint=`平假名 ${target} 应写作上面的汉字。`;
    else hint='将正确的汉字放入句中，构成自然、正确的词语。';
  }else if(module==='vocab'){
    if(section==='mondai1') hint='根据句意和搭配，选择最自然的词语。';
    else if(section==='mondai2') hint='根据题干表达的含义，选择对应的词语。';
    else if(section==='mondai3') hint='选择与题干意思最接近的表达。';
    else if(section==='mondai4') hint='根据上下文，选择最自然的用法。';
  }else if(module==='grammar'){
    hint=a.order?`正确顺序为 ${a.order}，请选择放在 ★ 位置的选项。`:'根据句型含义和接续，选择最符合语境的表达。';
  }
  const rawQuestion=it.q||'';
  const marker='__ANSWER__';
  let restored='';
  if(a.order){
    const order=[...a.order.matchAll(/[1-4]/g)].map(m=>+m[0]); let oi=0;
    const completed=esc(rawQuestion).replace(/＿{2,}|★/g,()=>`<strong>${esc((it.opts||[])[order[oi++]-1]||'')}</strong>`);
    if(completed!==esc(rawQuestion)) restored=`<div class="an-complete"><b>题干还原：</b><span class="jp">${completed}</span></div>`;
  }else{
    const completed=rawQuestion.replace(/（[ 　_]*）|＿{2,}|_{2,}/,marker);
    if(completed!==rawQuestion) restored=`<div class="an-complete"><b>题干还原：</b><span class="jp">${esc(completed).replace(marker,`<strong>${esc(answerPlain)}</strong>`)}</span></div>`;
  }
  let strategy='先观察空格前后的语法形式和句子意思，再代入选项确认搭配是否自然。';
  let wrongReason='代入后会与本句所需的接续、含义或固定搭配不一致。';
  if(module==='grammar'){
    strategy=section==='mondai2'?'先把四个片段排成自然的句子，再看 ★ 所在位置应放哪一项。':(section==='mondai3'?'结合前后句的逻辑关系，判断最能让段落连贯的表达。':'先确认接续形式，再判断句型表达的语气和含义。');
    wrongReason='该选项的接续、语气或句型意义不能让这句话自然成立。';
  }else if(module==='vocab'){
    strategy=section==='mondai3'?'先抓住题干的核心意思，再比较各选项的近义差别。':'把每个候选词放回原句，核对词义、语感和固定搭配。';
    wrongReason='词义或搭配与本题语境不符，代入后句意不自然。';
  }else if(module==='kanji'){
    strategy=section==='mondai1'?`先锁定标线词 ${target}，再按读音逐音节比对。`:(section==='mondai2'?`先根据句意确认 ${target} 的读音和词义，再选择对应汉字。`:'先把汉字放回词语中，确认能组成正确、自然的词。');
    wrongReason=section==='mondai1'?'读音与标线汉字不一致。':'不能组成题干要求的正确汉字词或固定表达。';
  }
  const choices=(it.opts||[]).map((opt,i)=>`<li class="${i+1===a.ans?'ok':''}"><span class="o jp">${i+1}. ${opts[i]||esc(opt)}</span><span class="w">${i+1===a.ans?'能同时满足本题的语法形式、词义和搭配要求。':wrongReason}</span></li>`).join('');
  const guided=`<details class="an-more"><summary>详细解析</summary>${restored}<div class="an-h">解题思路</div><ol class="an-solve"><li>${strategy}</li><li>正确项为「<span class="jp">${answer}</span>」，${hint}</li></ol><div class="an-h">选项辨析</div><ol class="an-why">${choices}</ol></details>`;
  const order=a.order?`<div class="an-fallback jp">顺序：${esc(a.order)}</div>`:'';
  return `<div class="an-answer-key jp">正确答案：${a.ans}. ${answer}</div><div class="an-fallback">${hint}</div>${order}${guided}`;
}
function examExplanationHTML(a,it,module,section){
  const detail=examNoteHTML(a,it);
  if(!detail) return `<div class="an-explain-title">答案解析</div>`+fallbackExamNoteHTML(it,a,module,section);
  // 第 1–4 周原书给的是简要释义；保留原文释义，再补齐与第 5 周相同的解题步骤和选项辨析。
  const hasExpandedSource=!!((a.why||[]).length||a.point||(a.words||[]).length||(a.parse||[]).length||(a.build||[]).length);
  if(hasExpandedSource) return `<div class="an-explain-title">答案解析</div>`+detail;
  const generated=fallbackExamNoteHTML(it,a,module,section);
  const detailsAt=generated.indexOf('<details');
  return `<div class="an-explain-title">答案解析</div>`+detail+(detailsAt>=0?generated.slice(detailsAt):'');
}
function examGrammarHTML(day,w){
  const useBesatsu = MODULE==='grammar';
  const bes = useBesatsu ? (G.besatsu['w'+w]||{}) : {}; const ansMap={};
  if(useBesatsu) for(const k of ['mondai1','mondai2','mondai3']) for(const a of (bes[k]||[])) ansMap[a.n]=a;
  const directAnswers=useBesatsu?{}:parseExamAnswerDetails(day.answers);
  let html = `<h2 class="page jp">実戦問題 <span class="meta">实战问题 · ${esc(day.time_limit||'')} · ${esc(day.scoring||'')}</span></h2>`;
  const renderQ = (it,section)=>{
    const a=ansMap[it.n]||directAnswers[it.n];
    let h=`<div class="q"><span class="n">${it.n}</span><span class="jp">${R(it,'q')}</span>`;
    if(it.opts && a && a.ans && !(useBesatsu&&a.order)){
      h += quizOptsHTML(it, a.ans);
      h += `<div class="qz-result"></div>`;
      const nh = examExplanationHTML(a, it, 'grammar', section);
      if(nh) h += `<div class="qz-note">${nh}</div>`;
    } else if(it.opts){
      const opts=it.opts_r||(it.opts||[]).map(esc);
      h += `<div class="opts">${opts.map((o,i)=>`<span class="jp">${i+1} ${o}</span>`).join('')}</div>`;
      if(a){
        let c=`<b>答案：${a.ans}</b>`;
        if(a.order) c+=`　<span class="jp">顺序：${esc(a.order)}</span>`;
        const nh2 = examExplanationHTML(a, it, 'grammar', section);
        if(nh2) c+=`<div style="margin-top:4px">${nh2}</div>`;
        h+=ansBlock(`exam-${w}-${it.n}`, c);
      }
    }
    return h+`</div>`;
  };
  for(const [key,label] of [['mondai1','問題1'],['mondai2','問題2'],['mondai3','問題3']]){
    const m=day[key]; if(!m) continue;
    html += `<div class="sec-title">${label}</div><div class="card"><div class="meta jp">${R(m,'instruction')}</div>`;
    if(m.passage) html += `<div class="passage jp">${R(m,'passage')}</div>`;
    html += m.items.map(it=>renderQ(it,key)).join('') + `</div>`;
  }
  if(day.keigo){
    const kc = day.keigo.content_r || (day.keigo.content||[]).map(esc);
    html += `<div class="keigo"><h4>${R(day.keigo,'title')}</h4><ul>` + kc.map(c=>`<li class="jp">${c}</li>`).join('') + `</ul>`;
    if(day.keigo.quiz){
      const kq = day.keigo.quiz.items_r || (day.keigo.quiz.items||[]).map(esc);
      html += `<div class="meta jp" style="margin-top:6px">${R(day.keigo.quiz,'instruction')}</div>` + kq.map(q=>`<div class="q jp">${q}</div>`).join('');
      if(day.keigo.quiz.answers) html += ansBlock(`keigo-${w}`, `<b>答案：</b><span class="jp">${R(day.keigo.quiz,'answers')}</span>`);
    }
    html += `</div>`;
  }
  if(!useBesatsu && day.answers) html += `<div class="card">` + ansBlock(`examn2-${w}`, `<b>答案：</b><span class="jp">${esc(day.answers)}</span>`) + `</div>`;
  if(day.answers_note) html += `<div class="meta" style="margin-top:8px">${esc(day.answers_note)}${useBesatsu?'（答案已内置，点击各题「显示答案」）':''}</div>`;
  return html;
}

/* ---------- vocab day ---------- */
function viewDayVocab(day,w,d,scrollTok){
  const mod = MODULE, modLbl = mod==='n2vocab'?'N2 词汇':(mod==='n4vocab'?'N4 词汇':'词汇');
  let html = `<div class="crumb">第${w}週 · ${modLbl}</div>`;
  if(d===7){ app.innerHTML = html + examVocabHTML(day,w); return; }
  html += `<h2 class="page jp">${R(day,'title')} <span class="meta">${esc(LX(day.title_cn, day.title_en))}</span></h2>`;
  html += memBarHTML();
  if(day.dialog){
    const lines = day.dialog.lines_r || (day.dialog.lines||[]).map(esc);
    html += `<div class="dialog jp">${lines.map(l=>'「'+l+'」').join('<br>')} ${sayBtn((day.dialog.lines||[]).join('　'))}${day.dialog.cn?`<div class="cn">${esc(day.dialog.cn)}</div>`:''}</div>`;
  }
  (day.sections||[]).forEach((sec,si)=>{
    const meta=[sec.heading_cn,sec.heading_en].filter(Boolean).join(' / ');
    html += `<div class="sec-title"><span class="jp">${esc(sec.heading||'')}</span>${meta?`<small>${esc(meta)}</small>`:''}</div><div class="card">`;
    if(sec.type==='fillin' && sec.pattern) html += `<div class="fillin-pat jp">${sec.pattern_r||esc(sec.pattern)}</div>`;
    (sec.items||[]).forEach((it,ii)=>{
      const vid=mod+'#'+w+'-'+d+'#'+si+'#'+ii;
      const vsnap={module:mod, hash:'#/day/'+w+'-'+d, w:w, d:d, jp:it.jp, cn:it.cn||it.en||''};
      html += `<div class="vrow" id="v-${w}-${d}-${si}-${ii}"><div class="vjp jp"><span class="vjp-text">${it.jp_r||esc(it.jp)}</span>${sayBtn(it.jp)}${star(vid,vsnap)}</div><div class="vmn">`;
      if(it.cn) html += `<span class="vcn">${esc(it.cn)}</span>`;
      if(it.en) html += `<span class="ven">${esc(it.en)}</span>`;
      if(it.rel) html += `<span class="vrel jp">${it.rel_r||esc(it.rel)}</span>`;
      if(it.note) html += `<div class="vnote">${esc(it.note)}</div>`;
      html += `</div></div>`;
    });
    html += `</div>`;
  });
  if(day.exercises){
    html += `<div class="sec-title">れんしゅう（练习）</div><div class="card">`;
    (day.exercises.sections||[]).forEach((sec,si)=>{
      html += `<div class="meta jp" style="margin:4px 0 8px">${romanN(si)}　${R(sec,'instruction')}</div>`;
      for(const it of (sec.items||[])) html += `<div class="q"><span class="n">${it.n}</span><span class="jp">${R(it,'q')}</span>${optsRow(it)}</div>`;
    });
    if(day.exercises.answers) html += ansBlock(`ans-v-${w}-${d}`, `<b>答案：</b><span class="jp">${esc(day.exercises.answers)}</span>`);
    else if(day.exercises.answers_note) html += `<div class="meta">${esc(day.exercises.answers_note)}</div>`;
    html += `</div>`;
  }
  if(day.hitokoto) html += `<div class="card hito"><div class="jp">${esc(day.hitokoto)}</div></div>`;
  app.innerHTML = html;
  if(scrollTok) scrollHighlight(`v-${w}-${d}-${scrollTok}`);
}
function examVocabHTML(day,w){
  const ansMap = numericExamAnswers(parseExamAnswerDetails(day.answers));
  const kai = {}; for(const e of (day.kaisetsu||[])) kai[e.n]=e;
  let html = `<h2 class="page jp">実戦問題 <span class="meta">实战问题 · ${esc(day.time_limit||'')} · ${esc(day.scoring||'')}</span></h2>`;
  // 有的实战日在书源里是残缺的，缺了哪部分要说清楚，别让人以为这天本来就只有几道题
  if(day.note) html += `<div class="card"><div class="note">${esc(day.note)}</div></div>`;
  for(const [key,label] of [['mondai1','問題1'],['mondai2','問題2'],['mondai3','問題3'],['mondai4','問題4']]){
    const m=day[key]; if(!m) continue;
    html += `<div class="sec-title">${label}</div><div class="card"><div class="meta jp">${R(m,'instruction')}</div>`;
    html += m.items.map(it=>{
      const correct=ansMap[it.n];
      let h=`<div class="q"><span class="n">${it.n}</span><span class="jp">${R(it,'q')}</span>`;
      h += it.opts ? quizOptsHTML(it, correct!=null?correct:null) : '';
      if(it.opts && correct!=null){
        h += `<div class="qz-result"></div>`;
        const nh = examExplanationHTML(Object.assign({ans:correct}, kai[it.n]||{}), it, 'vocab', key);
        if(nh) h += `<div class="qz-note">${nh}</div>`;
      }
      return h+`</div>`;
    }).join('') + `</div>`;
  }
  if(day.answers) html += `<div class="card">` + ansBlock(`examv-${w}`, `<b>完整答案：</b><span class="jp">${esc(day.answers)}</span>`) + `</div>`;
  return html;
}

/* ---------- kanji day ---------- */
function romanN(i){ return ['Ⅰ','Ⅱ','Ⅲ','Ⅳ','Ⅴ'][i]||(i+1); }
function viewDayKanji(day,w,d,scrollTok){
  let html = `<div class="crumb">第${w}週 · 汉字${day.theme?` <span class="jp">${esc(day.theme)}</span>（${esc(day.theme_cn||'')}）`:''}</div>`;
  if(d===7){ app.innerHTML = html + examKanjiHTML(day,w); return; }
  html += `<h2 class="page jp">${R(day,'title')} <span class="meta">${esc(LX(day.title_cn, day.title_en))}</span></h2>`;
  if(day.dialog){
    const lines = day.dialog.lines_r || (day.dialog.lines||[]).map(esc);
    const dTx = LX(day.dialog.cn, day.dialog.en);
    html += `<div class="dialog jp">${lines.join('<br>')} ${sayBtn((day.dialog.lines||[]).join('　'))}${dTx?`<div class="cn">${esc(dTx)}</div>`:''}</div>`;
  }
  html += memBarHTML();
  html += `<div class="card kanji-card">`;
  (day.kanji||[]).forEach((k,ki)=>{
    html += `<div class="krow" id="k-${w}-${d}-${ki}"><div class="kchar-wrap"><div class="kchar jp">${esc(k.char)}</div><div class="kmeta">${k.strokes?esc(k.strokes)+'画':''}</div><div class="kreads jp">${(k.readings||[]).map(r=>`<span class="kread">${esc(r)}</span>`).join('')}</div></div><div class="kwords">`;
    (k.words||[]).forEach((wd,wi)=>{
      const kid=MODULE+'#'+w+'-'+d+'#'+ki+'#'+wi;
      const ksnap={module:MODULE, hash:'#/day/'+w+'-'+d, w:w, d:d, jp:wd.jp, cn:wd.cn||wd.en||''};
      html += `<div class="vrow"><div class="vjp jp"><span class="vjp-text">${wd.jp_r||esc(wd.jp)}</span>${sayBtn(wd.jp)}${star(kid,ksnap)}</div><div class="vmn">`;
      if(wd.cn) html += `<span class="vcn">${esc(wd.cn)}</span>`;
      if(wd.en) html += `<span class="ven">${esc(wd.en)}</span>`;
      html += `</div></div>`;
    });
    html += `</div></div>`;
  });
  html += `</div>`;
  if(day.exercises){
    html += `<div class="sec-title">れんしゅう（练习）</div><div class="card">`;
    (day.exercises.sections||[]).forEach((sec,si)=>{
      html += `<div class="meta jp" style="margin:4px 0 8px">${romanN(si)}　${R(sec,'instruction')}</div>`;
      for(const it of (sec.items||[])) html += `<div class="q"><span class="n">${it.n}</span><span class="jp">${R(it,'q')}</span>${optsRow(it)}</div>`;
    });
    if(day.exercises.answers) html += ansBlock(`ans-k-${w}-${d}`, `<b>答案：</b><span class="jp">${esc(day.exercises.answers)}</span>`);
    else if(day.exercises.answers_note) html += `<div class="meta">${esc(day.exercises.answers_note)}</div>`;
    html += `</div>`;
  }
  app.innerHTML = html;
  if(scrollTok) scrollHighlight(`k-${w}-${d}-${scrollTok}`);
}
function examKanjiHTML(day,w){
  const answerDetails=parseExamAnswerDetails(day.answers);
  const ansMap = day.answers ? numericExamAnswers(answerDetails) : answerMapFromKeys(N3_KANJI_EXAM_KEYS[w]);
  const kai = {}; for(const e of (day.kaisetsu||[])) kai[e.n]=e;
  let html = `<h2 class="page jp">実戦問題 <span class="meta">实战问题 · ${esc(day.time_limit||'')} · ${esc(day.scoring||'')}</span></h2>`;
  // 有的实战日在书源里是残缺的，缺了哪部分要说清楚，别让人以为这天本来就只有几道题
  if(day.note) html += `<div class="card"><div class="note">${esc(day.note)}</div></div>`;
  for(const [key,label] of [['mondai1','問題1'],['mondai2','問題2'],['mondai3','問題3'],['mondai4','問題4']]){
    const m=day[key]; if(!m) continue;
    html += `<div class="sec-title">${label}</div><div class="card"><div class="meta jp">${R(m,'instruction')}</div>`;
    if(m.wordbank) html += `<div class="opts">${m.wordbank.map(x=>`<span class="jp">${esc(x)}</span>`).join('')}</div>`;
    html += m.items.map(it=>{
      const correct=ansMap[it.n];
      let h=`<div class="q"><span class="n">${it.n}</span><span class="jp">${R(it,'q')}</span>`;
      h += it.opts ? quizOptsHTML(it, correct!=null?correct:null) : optsRow(it);
      if(it.opts && correct!=null){
        h += `<div class="qz-result"></div>`;
        const nh = examExplanationHTML(Object.assign({ans:correct}, kai[it.n]||{}), it, 'kanji', key);
        if(nh) h += `<div class="qz-note">${nh}</div>`;
      }else if(!it.opts){
        const textAnswer=rangedAnswerHTML(answerDetails,it.n);
        if(textAnswer) h += ansBlock(`examk-${w}-${String(it.n).replace(/[^0-9]/g,'-')}`, `<b>答案：</b><span class="jp">${textAnswer}</span>`);
      }
      return h+`</div>`;
    }).join('') + `</div>`;
  }
  if(day.answers) html += `<div class="card">` + ansBlock(`examk-${w}`, `<b>完整答案：</b><span class="jp">${esc(day.answers)}</span>`) + `</div>`;
  else if(day.answers_note) html += `<div class="meta" style="margin-top:8px">答案已内置，逐题作答后可查看解析。</div>`;
  return html;
}

/* ---------- search (cross-module) ---------- */
let searchIndex=null;
function buildIndex(){
  if(searchIndex) return searchIndex;
  searchIndex=[];
  const pushG = (mod, weeks)=>{ for(const w of weeks) for(const d of w.days) (d.points||[]).forEach((p,i)=>{
    searchIndex.push({module:mod, w:w.n,d:d.day,i, key:p.pattern||'', reading:p.reading||'',
      extra:((p.connection||'').replace(/~/g,''))+' '+(p.usage_jp||'')+' '+(p.usage_cn||'')+' '+(p.examples||[]).map(e=>e.jp+' '+(e.cn||'')).join(' '),
      sub:p.usage_cn||'', dayTitle:d.title});
  }); };
  pushG('grammar', G.weeks);
  pushG('n2grammar', G2.weeks);
  pushG('n4grammar', G4.weeks);
  const pushV = (mod, weeks)=>{ for(const w of weeks) for(const d of w.days) (d.sections||[]).forEach((sec,si)=>(sec.items||[]).forEach((it,ii)=>{
    searchIndex.push({module:mod, w:w.n,d:d.day, si, ii, key:it.jp||'', reading:'',
      extra:(it.en||'')+' '+(it.cn||'')+' '+(it.rel||''), sub:[it.cn,it.en].filter(Boolean).join(' · '), dayTitle:d.title});
  })); };
  pushV('vocab', V.weeks);
  pushV('n2vocab', V2.weeks);
  pushV('n4vocab', V4.weeks);
  const pushK = (mod, weeks)=>{ for(const w of weeks) for(const d of w.days) (d.kanji||[]).forEach((k,ki)=>(k.words||[]).forEach(wd=>{
    searchIndex.push({module:mod, w:w.n,d:d.day, ki, key:wd.jp||'', reading:wd.reading||'',
      extra:(wd.en||'')+' '+(wd.cn||'')+' '+(k.char||''), sub:[wd.cn,wd.en].filter(Boolean).join(' · '), dayTitle:d.title});
  })); };
  pushK('kanji', K.weeks);
  pushK('n2kanji', K2.weeks);
  pushK('n4kanji', K4.weeks);
  return searchIndex;
}
const SEARCH_HIST_KEY='searchHistory', SEARCH_HIST_MAX=15;
function getSearchHistory(){ try{ return JSON.parse(localStorage.getItem(SEARCH_HIST_KEY)||'[]'); }catch(e){ return []; } }
function saveSearchHistory(kw){
  if(!kw) return;
  try{
    let h=getSearchHistory().filter(x=>x!==kw);
    h.unshift(kw);
    localStorage.setItem(SEARCH_HIST_KEY, JSON.stringify(h.slice(0,SEARCH_HIST_MAX)));
  }catch(e){}
}
function clearSearchHistory(){ try{ localStorage.removeItem(SEARCH_HIST_KEY); }catch(e){} }
let lastSearchKw='';
function viewSearch(){
  setNav('search'); setHeader(LX('搜索（语法 + 词汇）','Search (Grammar + Vocabulary)'), false);
  const total=buildIndex().length;
  app.innerHTML = `<div class="search-box"><input id="q" type="search" placeholder="日文 / 假名 / 中文 / 英文，如：ばかり · 冰箱 · fridge" autocomplete="off"></div><div id="results"></div>`;
  const q=$('#q'), res=$('#results'); q.focus();
  q.oninput = ()=>{
    const kw=q.value.trim();
    lastSearchKw=kw;
    if(!kw){
      const h=getSearchHistory();
      const histHTML = h.length ? `<div class="search-hist"><div class="search-hist-h"><span>最近搜索</span><a data-histclear>清空</a></div><div class="search-hist-chips">${h.map(x=>`<span class="hist-chip" data-histq="${esc(x)}">${esc(x)}</span>`).join('')}</div></div>` : '';
      res.innerHTML = `${histHTML}<div class="empty">共收录 ${total} 条（语法点 + 词汇）<br>结果标注所属模块，点击直达</div>`;
      return;
    }
    const lk=kw.toLowerCase();
    const hits=buildIndex().filter(e=> e.key.toLowerCase().includes(lk)||e.reading.includes(kw)||e.extra.toLowerCase().includes(lk)).slice(0,60);
    if(!hits.length){ res.innerHTML='<div class="empty">没有找到，换个关键词试试</div>'; return; }
    const mark=s=>{ const t=esc(s); if(!kw) return t; try{ return t.split(esc(kw)).join(`<span class="hl">${esc(kw)}</span>`);}catch(e){return t;} };
    res.innerHTML = hits.map((e,ix)=>{
      const tag = {grammar:'<span class="mtag g">N3语法</span>', n2grammar:'<span class="mtag g2">N2语法</span>', vocab:'<span class="mtag v">N3词汇</span>', kanji:'<span class="mtag k">N3汉字</span>', n2vocab:'<span class="mtag v2">N2词汇</span>', n2kanji:'<span class="mtag k2">N2汉字</span>', n4grammar:'<span class="mtag g4">N4语法</span>', n4vocab:'<span class="mtag v4">N4词汇</span>', n4kanji:'<span class="mtag k4">N4汉字</span>'}[e.module];
      window['__hit'+ix]=e;
      return `<div class="card result" data-hit="${ix}">
        <div class="jp" style="font-size:16.5px;font-weight:700">${tag}${mark(e.key)}</div>
        ${e.sub?`<div class="meta">${mark(e.sub)}</div>`:''}
        <div class="where">第${e.w}週 ${e.d}日目 · <span class="jp">${esc(e.dayTitle)}</span></div>
      </div>`;
    }).join('');
  };
  q.onkeydown = ev=>{ if(ev.key==='Enter' && q.value.trim()) saveSearchHistory(q.value.trim()); };
  q.oninput();
}
window.openHit = ix=>{
  const e=window['__hit'+ix]; if(!e) return;
  if(lastSearchKw) saveSearchHistory(lastSearchKw);
  setModule(e.module);
  let hash=`#/day/${e.w}-${e.d}`;
  if(e.module==='kanji'||e.module==='n2kanji'||e.module==='n4kanji') hash+=`/k${e.ki}`;
  else if(e.module==='vocab'||e.module==='n2vocab'||e.module==='n4vocab') hash+=`/v${e.si}-${e.ii}`;
  else hash+=`/p${e.i}`;
  navTo(hash);
};

/* ---------- flashcards (per module) ---------- */
let fc={week:0, deck:[], idx:0, flipped:false};
function buildDeck(week){
  const deck=[];
  if(isGram()){
    for(const w of CUR().weeks){ if(week&&w.n!==week) continue; for(const d of w.days) (d.points||[]).forEach((p,i)=>deck.push({w:w.n,d:d.day,i,p})); }
  } else if(MODULE==='kanji'||MODULE==='n2kanji'||MODULE==='n4kanji'){
    for(const w of CUR().weeks){ if(week&&w.n!==week) continue; for(const d of w.days) (d.kanji||[]).forEach(k=>{ if(k.words&&k.words.length) deck.push({k}); }); }
  } else {
    for(const w of CUR().weeks){ if(week&&w.n!==week) continue; for(const d of w.days) (d.sections||[]).forEach(sec=>(sec.items||[]).forEach(it=>{ if(it.jp&&(it.cn||it.en)) deck.push({v:it}); })); }
  }
  for(let i=deck.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [deck[i],deck[j]]=[deck[j],deck[i]]; }
  return deck;
}
function viewCards(){
  setNav('common'); setHeader(LX('记忆卡','Flashcards')+' · '+modLabel(), false);
  if(!fc.deck.length){ fc.deck=buildDeck(fc.week); fc.idx=0; fc.flipped=false; }
  const nWeeks=CUR().weeks.length;
  const filt=[0].concat(Array.from({length:nWeeks},(_,i)=>i+1)).map(n=>`<button class="${fc.week===n?'on':''}" data-fcweek="${n}">${n===0?'全部':'第'+n+'週'}</button>`).join('');
  const cur=fc.deck[fc.idx];
  let cardHTML;
  if(!cur){ cardHTML=`<div class="fcard"><div class="empty">本组已完成 🎉<br>点「重新洗牌」再来一轮</div></div>`; }
  else if(isGram()){
    if(!fc.flipped) cardHTML=`<div class="fcard" data-fcflip="1"><div class="big jp">${esc(cur.p.pattern)}</div><div class="hint">回想接续与意思，点击翻面</div></div>`;
    else{ const p=cur.p; cardHTML=`<div class="fcard" data-fcflip="1"><div class="backside">
      <div class="jp" style="font-weight:700;font-size:18px">${R(p,'pattern')}</div>
      ${p.reading?`<div class="reading jp meta">${esc(p.reading)}</div>`:''}
      ${connBlockHTML(p)}
      ${p.usage_jp?`<div class="usage jp">${R(p,'usage_jp')}</div>`:''}
      ${p.usage_cn?`<div class="usage"><span class="cn">${esc(p.usage_cn)}</span></div>`:''}
      ${(p.examples&&p.examples[0])?`<div class="ex"><div class="jp">${R(p.examples[0],'jp')}</div>${p.examples[0].cn?`<div class="cn">${esc(p.examples[0].cn)}</div>`:''}</div>`:''}
      <div class="meta">出处：第${cur.w}週 ${cur.d}日目　<span class="plink" data-go="#/day/${cur.w}-${cur.d}/p${cur.i}" style="cursor:pointer">详情 ›</span></div>
    </div></div>`; }
  } else if(MODULE==='kanji'||MODULE==='n2kanji'||MODULE==='n4kanji'){
    const k=cur.k;
    if(!fc.flipped) cardHTML=`<div class="fcard" data-fcflip="1"><div class="big jp" style="font-size:64px">${esc(k.char)}</div><div class="hint">回想读音与词语，点击翻面</div></div>`;
    else cardHTML=`<div class="fcard" data-fcflip="1"><div class="backside" style="text-align:center">
      <div class="jp" style="font-weight:700;font-size:40px">${esc(k.char)}</div>
      <div class="meta jp" style="font-size:15px">${(k.readings||[]).map(r=>`<span class="kread">${esc(r)}</span>`).join('')}${k.strokes?`<span class="kread">${esc(k.strokes)}画</span>`:''}</div>
      ${(k.words||[]).map(wd=>`<div class="ex"><div class="jp">${wd.jp_r||esc(wd.jp)}</div>${wd.cn?`<div class="cn">${esc(wd.cn)}</div>`:''}</div>`).join('')}
    </div></div>`;
  } else {
    const it=cur.v;
    if(!fc.flipped) cardHTML=`<div class="fcard" data-fcflip="1"><div class="big jp">${it.jp_r||esc(it.jp)}</div><div class="hint">回想中/英文，点击翻面</div></div>`;
    else cardHTML=`<div class="fcard" data-fcflip="1"><div class="backside" style="text-align:center">
      <div class="jp" style="font-weight:700;font-size:22px">${it.jp_r||esc(it.jp)}</div>
      ${it.cn?`<div style="font-size:18px;margin-top:10px">${esc(it.cn)}</div>`:''}
      ${it.en?`<div class="meta" style="font-size:14px">${esc(it.en)}</div>`:''}
      ${it.rel?`<div class="vrel jp" style="margin-top:8px">${it.rel_r||esc(it.rel)}</div>`:''}
    </div></div>`;
  }
  app.innerHTML = `<div class="fc-wrap"><div class="fc-filter">${filt}</div>
    <div class="fc-prog">${fc.deck.length?`${Math.min(fc.idx+1,fc.deck.length)} / ${fc.deck.length}`:''}</div>
    ${cardHTML}
    <div class="fc-btns"><button data-fc="prev">‹ 上一张</button><button class="primary" data-fc="next">下一张 ›</button><button data-fc="shuffle">重新洗牌</button></div></div>`;
}
window.fcSetWeek=n=>{ fc.week=n; fc.deck=buildDeck(n); fc.idx=0; fc.flipped=false; viewCards(); };
window.fcFlip=()=>{ fc.flipped=!fc.flipped; viewCards(); };
window.fcNext=()=>{ if(fc.idx<fc.deck.length){ fc.idx++; fc.flipped=false; } viewCards(); };
window.fcPrev=()=>{ if(fc.idx>0){ fc.idx--; fc.flipped=false; } viewCards(); };
window.fcShuffle=()=>{ fc.deck=buildDeck(fc.week); fc.idx=0; fc.flipped=false; viewCards(); };

/* ---------- favorites (收藏 / 生词本) ---------- */
let favDeck=[], favIdx=0, favFlip=false;
let favFilter='all', favSelectionFilter='all';
const FAV_MOD_ORDER=['grammar','n2grammar','n4grammar','vocab','n2vocab','n4vocab','kanji','n2kanji','n4kanji','selection'];
const FAV_MOD_LABEL={grammar:'N3语法', n2grammar:'N2语法', n4grammar:'N4语法', vocab:'N3词汇', n2vocab:'N2词汇', n4vocab:'N4词汇', kanji:'N3汉字', n2kanji:'N2汉字', n4kanji:'N4汉字', selection:'划词收藏'};
function favGroups(){
  const groups={};
  for(const id of Object.keys(FAV)){ const m=(FAV[id]||{}).module||'other'; (groups[m]=groups[m]||[]).push(id); }
  return groups;
}
function shownFavIds(groups){
  const source=favFilter==='all' ? Object.keys(FAV) : (groups[favFilter]||[]);
  return favSelectionFilter==='all' ? source : source.filter(id=>(FAV[id]||{}).selectionType===favSelectionFilter);
}
function viewFavs(){
  setNav('favs'); setHeader(LX('收藏 · 生词本','Favorites · Word Book'), false);
  const ids=Object.keys(FAV);
  if(!ids.length){ app.innerHTML='<div class="empty">还没有收藏。<br>选中页面里的文字，即可收藏到生词本。</div>'; return; }
  const tagMap={grammar:'<span class="mtag g">N3语法</span>', n2grammar:'<span class="mtag g2">N2语法</span>', vocab:'<span class="mtag v">N3词汇</span>', kanji:'<span class="mtag k">N3汉字</span>', n2vocab:'<span class="mtag v2">N2词汇</span>', n2kanji:'<span class="mtag k2">N2汉字</span>', n4grammar:'<span class="mtag g4">N4语法</span>', n4vocab:'<span class="mtag v4">N4词汇</span>', n4kanji:'<span class="mtag k4">N4汉字</span>', selection:'<span class="mtag mt-selection">划词</span>'};
  const groups=favGroups();
  const presentMods=FAV_MOD_ORDER.filter(m=>groups[m]&&groups[m].length);
  if(favFilter!=='all' && !(groups[favFilter]&&groups[favFilter].length)) favFilter='all';
  const selectionIds=ids.filter(id=>SELECTION_FAV_TYPES[(FAV[id]||{}).selectionType]);
  const presentSelectionTypes=Object.keys(SELECTION_FAV_TYPES).filter(k=>selectionIds.some(id=>(FAV[id]||{}).selectionType===k));
  if(favSelectionFilter!=='all' && !presentSelectionTypes.includes(favSelectionFilter)) favSelectionFilter='all';
  const shownIds = shownFavIds(groups);
  const filterBar = presentMods.length>1 ? `<div class="fc-filter" style="margin-bottom:12px">
    <button class="${favFilter==='all'?'on':''}" data-favfilter="all">全部（${ids.length}）</button>
    ${presentMods.map(m=>`<button class="${favFilter===m?'on':''}" data-favfilter="${m}">${FAV_MOD_LABEL[m]}（${groups[m].length}）</button>`).join('')}
  </div>` : '';
  const typeFilterBar = presentSelectionTypes.length ? `<div class="fc-filter fav-type-filter" style="margin-bottom:12px">
    <span>划词类别</span><button class="${favSelectionFilter==='all'?'on':''}" data-selfavfilter="all">全部</button>
    ${presentSelectionTypes.map(k=>`<button class="${favSelectionFilter===k?'on':''}" data-selfavfilter="${k}">${SELECTION_FAV_TYPES[k]}（${selectionIds.filter(id=>(FAV[id]||{}).selectionType===k).length}）</button>`).join('')}
  </div>` : '';
  if(favStudyMode){
    const rows=shownIds.map(id=>{ const s=FAV[id]||{}; const tag=(tagMap[s.module]||'')+(s.selectionType?`<span class="mtag mt-${escAttr(s.selectionType)}">${SELECTION_FAV_TYPES[s.selectionType]}</span>`:''); return {ts:s.ts,jp:s.jp||'',cn:s.cn||'',tag}; });
    app.innerHTML=studyToolbar('fav',rows.length)+studyRowsHTML(rows,'fav');
    return;
  }
  let html=`<div class="fav-actions"><button class="primary" data-favfc>▶ 用收藏刷闪卡（${shownIds.length}）</button><button data-favstudy="1">背诵模式</button><button data-favclear>清空收藏</button></div>${filterBar}${typeFilterBar}<div class="card">`;
  shownIds.forEach(id=>{
    const s=FAV[id]||{};
    const tag=(tagMap[s.module]||'')+(s.selectionType?`<span class="mtag mt-${escAttr(s.selectionType)}">${SELECTION_FAV_TYPES[s.selectionType]}</span>`:'');
    html+=`<div class="fav-item"><button class="starb" data-fav="${escAttr(id)}" aria-label="取消收藏">★</button>
      <div class="fj" data-go="${esc(s.hash||'#/')}" data-mod="${esc(s.module==='selection'?'':(s.module||''))}"><div class="t jp">${tag}${esc(s.jp||'')}</div>${s.cn?`<div class="c">${esc(s.cn)}</div>`:''}</div>
      <span class="fw">${s.selectionType?'划词':`第${esc(String(s.w||''))}週${esc(String(s.d||''))}日`}</span></div>`;
  });
  html+='</div>';
  app.innerHTML=html;
}
function startFavFc(){
  const groups=favGroups();
  const ids = shownFavIds(groups);
  favDeck=ids.map(id=>FAV[id]).map(s=>({jp:s.jp,cn:s.cn}));
  for(let i=favDeck.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [favDeck[i],favDeck[j]]=[favDeck[j],favDeck[i]]; }
  favIdx=0; favFlip=false; renderFavFc();
}
function renderFavFc(){
  if(!favDeck.length){ viewFavs(); return; }
  setNav('favs'); setHeader(LX('收藏 · 闪卡','Favorites · Flashcards'), false);
  const c=favDeck[favIdx];
  const card = favFlip
    ? `<div class="fcard" data-favflip><div class="backside" style="text-align:center"><div class="jp" style="font-weight:700;font-size:24px">${esc(c.jp)} ${sayBtn(c.jp)}</div>${c.cn?`<div style="font-size:18px;margin-top:12px">${esc(c.cn)}</div>`:''}</div></div>`
    : `<div class="fcard" data-favflip><div class="big jp">${esc(c.jp)}</div><div class="hint">点击翻面看释义</div></div>`;
  app.innerHTML=`<div class="fc-wrap"><div class="fc-prog">${favIdx+1} / ${favDeck.length}</div>${card}
    <div class="fc-btns"><button data-favprev>‹ 上一张</button><button class="primary" data-favnext>下一张 ›</button><button data-favback>返回收藏</button></div></div>`;
}

/* ---------- contrast (语法辨析, N3 grammar only) ---------- */
let ctMode='family', ctWeek=1;
// 每个语法家族末尾的辨析练习：选项就是这一族的成员，逼着你在易混形式之间做选择。
// 复用 examGrammarHTML 那套 .q/.qz/.qz-result/.qz-note 结构，所以判对错、显示解析、
// 答错自动记进错题本这些行为全都是现成的，不需要新的事件处理。
function ctQuizHTML(g){
  const qz = g.quiz;
  if(!qz || !(qz.items||[]).length) return '';
  const ansMap = parseCircledAnswers(qz.answers);
  const qs = qz.items.map(it=>{
    const correct = ansMap[it.n];
    let h = `<div class="q"><span class="n">${it.n}</span><span class="jp">${R(it,'q')}</span>`;
    h += quizOptsHTML(it, correct!=null?correct:null);
    if(correct!=null){
      h += `<div class="qz-result"></div>`;
      if(it.note) h += `<div class="qz-note">${esc(it.note)}</div>`;
    }
    return h + `</div>`;
  }).join('');
  return `<details class="ct-quiz"><summary>✍️ ${esc(qz.title||'辨析练习')}（${qz.items.length}题）</summary>${qs}</details>`;
}
// 辨析属于「某一级的语法」这一层，每级语法各有一份，所以跟着当前语法模块走。
// 不在语法模块时优先切到同级别的语法；那一级没有辨析数据就退回 N3。
function hasContrast(mod){ return !!((DATA[mod]||{}).contrast); }
function contrastModule(){
  if(isGram() && hasContrast(MODULE)) return MODULE;
  const same = moduleFrom(LEVEL,'grammar');
  return hasContrast(same) ? same : 'grammar';
}
function viewContrastFamily(){
  const C = CUR().contrast || {groups:[]};
  const groups = C.groups||[];
  const toc = groups.map((g,i)=>`<a class="ct-tocitem" data-scroll="ct-g-${i}">${esc(g.title)}</a>`).join('');
  let body = C.intro ? `<div class="meta" style="margin-bottom:10px">${esc(C.intro)}</div>` : '';
  groups.forEach((g,i)=>{
    body += `<div class="card ct-card" id="ct-g-${i}"><h3 class="ct-h jp">${esc(g.title)}</h3>`;
    if(g.tip) body += `<div class="ct-tip">💡 ${esc(g.tip)}</div>`;
    for(const r of (g.rows||[])){
      body += `<div class="ct-row"><div class="ct-form jp">${r.form_r||esc(r.form)}<span class="ct-loc" data-go="#/day/${esc(r.loc)}">${esc(r.loc)} ›</span></div>`
        + (r.eg?`<div class="ct-eg jp">例：${r.eg_r||esc(r.eg)}</div>`:'')
        + (r.eg_cn?`<div class="ct-egcn">译：${esc(r.eg_cn)}</div>`:'')
        + `<div class="ct-mean">${esc(r.mean)}</div></div>`;
    }
    body += ctQuizHTML(g);
    body += `</div>`;
  });
  return `<div class="ct-wrap"><nav class="ct-toc"><div class="ct-toc-h">目录</div>${toc}</nav><div class="ct-body">${body}</div></div>`;
}
function viewContrastWeek(){
  const weeks = CUR().weeks||[];
  if(ctWeek>weeks.length) ctWeek=1;
  const wkBar = weeks.map(w=>`<button class="${ctWeek===w.n?'on':''}" data-ctweek="${w.n}">第${w.n}周</button>`).join('');
  const wk = weeks.find(w=>w.n===ctWeek);
  let body = `<div class="fc-filter" style="margin-bottom:12px">${wkBar}</div>`;
  if(!wk){ return body+'<div class="empty">暂无内容</div>'; }
  const wt = wk.title?` <span class="jp">${esc(wk.title)}</span>`:'';
  const wsub = LX(wk.title_cn, wk.title_en);
  body += `<div class="card" style="margin-bottom:12px"><h3 class="ct-h">第${wk.n}周${wt}</h3>${wsub?`<div class="meta">${esc(wsub)}</div>`:''}</div>`;
  wk.days.forEach(d=>{
    if(d.day===7 || !d.points) return;
    const dt = LX(d.title_cn, d.title_en);
    body += `<div class="card ct-daysum">
      <h4>${d.day}日目 <span class="jp">${R(d,'title')}</span>${dt?`<span class="meta">（${esc(dt)}）</span>`:''}<a class="plink" data-go="#/day/${wk.n}-${d.day}">详情 ›</a></h4>
      <ul>${(d.points||[]).map(p=>{
        const use=LX(p.usage_cn,p.usage_en);
        return `<li><span class="jp">${p.pattern_r||esc(p.pattern)}</span>${use?`<span class="ct-mean"> — ${esc(use)}</span>`:''}</li>`;
      }).join('')}</ul>
    </div>`;
  });
  return body;
}
function viewContrast(){
  const LV = LEVEL.toUpperCase();
  setNav('common'); setHeader(LX('语法辨析 · '+LV, 'Grammar Contrast · '+LV), true);
  const modeBar = `<div class="fc-filter" style="margin-bottom:12px">
    <button class="${ctMode==='family'?'on':''}" data-ctmode="family">语法家族</button>
    <button class="${ctMode==='week'?'on':''}" data-ctmode="week">每周总结</button>
  </div>`;
  app.innerHTML = modeBar + (ctMode==='week' ? viewContrastWeek() : viewContrastFamily());
}

/* ---------- numbers reference (global, level-agnostic) ---------- */
// 数据里用「★」标出不规则读法，渲染时高亮出来——这是整个页面的重点
function viewNumbers(){
  setNav('common'); setHeader(LX('数字表达','Number Expressions'), true);
  showCommonPage('numbers');
}

/* ---------- 通用知识：本文の描画は React（study-common.tsx）が担当 ---------- */
/* ヘッダー・ナビ・戻るボタンは従来どおりここが持ち、本文だけ React に渡す。
   データ未読込のときの表示も移行前と同じ文言のままにしてある。 */
function showCommonPage(page){
  if(!DATA.common){ app.innerHTML='<div class="empty">通用参考数据加载中，请稍候…</div>'; return; }
  app.innerHTML='';
  app.hidden = true;
  window.dispatchEvent(new CustomEvent('study:common-page', {detail:{page, data:DATA.common}}));
}
function hideCommonPage(){
  if(!app.hidden) return;
  app.hidden = false;
  window.dispatchEvent(new CustomEvent('study:common-page', {detail:null}));
}
/* React 側から legacy のルーティングを呼ぶための明示的な橋。
   #app の委任クリックは React が描いたノードには届かないため。 */
window.__studyNav = function(key){ navTo(key); };
window.__studySay = function(text){ say(text); };
/* React の commit 後に呼ばれる。legacy が innerHTML 直後に同期でやっていた実測を、
   同じ順序（目次の高さ → 現在位置のハイライト）で行う。 */
window.__studyAfterPaint = function(){ updateStickyVars(); updateNumNavActive(); };

function viewRef(){
  setNav('common'); setHeader(LX('接续表示法 · 接続の表示方法','Connection Notation'), true);
  showCommonPage('ref');
}

function viewKatsuyou(){
  setNav('common'); setHeader(LX('活用一覧 · 敬語レベルと活用形','Conjugation: Politeness Levels & Verb Forms'), true);
  showCommonPage('katsuyou');
}
function viewHenkei(){
  setNav('common'); setHeader(LX('動詞の変形ルール · 音便と組み合わせ','Verb Conjugation Rules'), true);
  showCommonPage('henkei');
}

const DATA_FILES = {"grammar":"grammar.d15be04258.json","kanji":"kanji.e43232869e.json","vocab":"vocab.856eb48e32.json","n2grammar":"n2grammar.4e6157570a.json","n2vocab":"n2vocab.4e440284d9.json","n2kanji":"n2kanji.d9739ca8d4.json","n4grammar":"n4grammar.40e138ccdb.json","n4vocab":"n4vocab.026f711eb7.json","n4kanji":"n4kanji.655356d8e2.json","common":"common.aa13cae172.json"};
async function bootN3(){
  try{
    // common（接续表/活用表/数字表达）跟级别无关但每个模块都可能点开，体积也小，跟 N3 一起加载
    const names=['grammar','vocab','kanji','common'];
    const [g,v,k,com,grammarExplanations]=await Promise.all([
      ...names.map(n=>fetch('/data/'+DATA_FILES[n]).then(r=>r.json())),
      fetch('/data/n3-grammar-explanations.json').then(r=>r.ok?r.json():({})).catch(()=>({}))
    ]);
    for(const [weekKey, sections] of Object.entries(grammarExplanations||{})){
      const targetWeek=g.besatsu&&g.besatsu[weekKey]; if(!targetWeek) continue;
      for(const section of ['mondai1','mondai2','mondai3']){
        const enriched=sections&&sections[section]; if(!Array.isArray(enriched)||!Array.isArray(targetWeek[section])) continue;
        const byNumber=new Map(enriched.map(item=>[item.n,item]));
        targetWeek[section]=targetWeek[section].map(item=>Object.assign({},item,byNumber.get(item.n)||{}));
      }
    }
    G=g; V=v; K=k;
    DATA.grammar=G; DATA.vocab=V; DATA.kanji=K; DATA.common=com;
    dataLoaded=true;
  }catch(e){ app.innerHTML='<div class="empty">数据加载失败，请检查网络后刷新重试。</div>'; return; }
  render();
  bootN2(); // N3 优先，N2 随后低优先级加载
}
async function bootN2(){
  try{
    const names=['n2grammar','n2vocab','n2kanji'];
    const [g2,v2,k2]=await Promise.all(names.map(n=>fetch('/data/'+DATA_FILES[n]).then(r=>r.json())));
    G2=g2; V2=v2; K2=k2;
    DATA.n2grammar=G2; DATA.n2vocab=V2; DATA.n2kanji=K2;
    n2Loaded=true;
    searchIndex=null; // N2 数据到位后让搜索索引下次重新构建，纳入N2结果
    const h=routeKey();
    if(MODULE==='n2grammar'||MODULE==='n2vocab'||MODULE==='n2kanji'||h==='#/search') render();
  }catch(e){ /* N2 加载失败时静默：N3 内容不受影响，用户切到N2或搜索时会看到持续的加载提示 */ }
  bootN4(); // N2 之后最后加载 N4（数据量最小，优先级最低）
}
async function bootN4(){
  try{
    const names=['n4grammar','n4vocab','n4kanji'];
    const [g4,v4,k4]=await Promise.all(names.map(n=>fetch('/data/'+DATA_FILES[n]).then(r=>r.json())));
    G4=g4; V4=v4; K4=k4;
    DATA.n4grammar=G4; DATA.n4vocab=V4; DATA.n4kanji=K4;
    n4Loaded=true;
    searchIndex=null; // N4 数据到位后让搜索索引下次重新构建，纳入N4结果
    const h=routeKey();
    if(MODULE==='n4grammar'||MODULE==='n4vocab'||MODULE==='n4kanji'||h==='#/search') render();
  }catch(e){ /* N4 加载失败时静默 */ }
}
render();
bootN3();
pullFavsFromServer();
pullMistakesFromServer();

/* 切回页面（可见/获得焦点）时自动重新同步：与云端合并，反映另一台设备的新增，
   删除通过墓碑标记传播。本地若还有未推送完的改动（防抖计时器未触发）则跳过这轮。 */
let _resyncingM=false, _resyncingF=false;
/* 切回标签页就会 resync 一次，而绝大多数时候拉回来的跟本地一模一样。
   以前不管变没变都 render()，整页重建，正在做的实战题、展开的详细解析、
   输入到一半的错题草稿全没了。所以先比对内容，真变了才重画。 */
function mistakesSig(arr){
  return JSON.stringify(arr.map(m=>[m.id,m.type,m.text,m.level,m.ts]).sort((a,b)=>a[0]<b[0]?-1:1));
}
function favsSig(o){ return JSON.stringify(Object.keys(o).sort().map(k=>[k,o[k]])); }
async function resyncMistakes(){
  if(!_mistakesReady || _mistakePushTimer || _resyncingM) return;
  _resyncingM=true;
  try{
    const res = await fetch('/api/mistakes', {cache:'no-store'});
    if(res.ok){
      const data = await res.json();
      if(Array.isArray(data)){
        const before = mistakesSig(MISTAKES);
        _mistakeSyncing=true;
        const merged = cleanMistakes(data);
        for(const m of MISTAKES){ if(!data.some(d=>d.id===m.id)) merged.push(m); }
        merged.sort((a,b)=>b.ts-a.ts);
        MISTAKES = merged;
        try{ localStorage.setItem('mistakes', JSON.stringify(MISTAKES)); }catch(e){}
        _mistakeSyncing=false;
        if(mistakesSig(MISTAKES)!==before) render();
      }
    }
  }catch(e){}
  _resyncingM=false;
}
async function resyncFavs(){
  if(!_favReady || _favPushTimer || _resyncingF) return;
  _resyncingF=true;
  try{
    const res = await fetch('/api/favorites', {cache:'no-store'});
    if(res.ok){
      const data = await res.json();
      if(data && typeof data==='object' && !Array.isArray(data)){
        const before = favsSig(FAV);
        _favSyncing=true;
        FAV = Object.assign({}, data, FAV);
        try{ localStorage.setItem('favs', JSON.stringify(FAV)); }catch(e){}
        _favSyncing=false;
        if(favsSig(FAV)!==before) render();
      }
    }
  }catch(e){}
  _resyncingF=false;
}
function resyncAll(){ resyncFavs(); resyncMistakes(); }
document.addEventListener('visibilitychange', ()=>{ if(document.visibilityState==='visible') resyncAll(); });
window.addEventListener('focus', resyncAll);
