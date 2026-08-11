/* 访客试用层：现在仅负责体验分流。真正的付费权限必须在账户与 API 层校验。 */
(() => {
  if (new URLSearchParams(location.search).get('trial') !== '1') return;

  const FREE_WEEK = 1;
  const style = document.createElement('style');
  style.textContent = `.trial-context{position:sticky;top:0;z-index:100;display:flex;align-items:center;justify-content:center;gap:9px;padding:7px 14px;background:#1b1e23;color:#f2efe9;font-size:12.5px}.trial-context[hidden]{display:none}.trial-context span{padding:2px 7px;border-radius:999px;background:#c0392b;color:#fff;font-size:11px;font-weight:700;letter-spacing:.08em}.trial-context b{font-weight:600}.trial-context a{color:#f4a59b;text-decoration:underline}.trial-context~.topbar{top:35px}.trial-lock-card,.trial-week-lock{margin:18px 0;border:1px solid var(--line);border-radius:var(--radius);background:var(--card);box-shadow:var(--shadow);padding:24px}.trial-lock-card{text-align:center;padding:44px 24px}.trial-lock-card__eyebrow{color:var(--accent);font-size:11px;letter-spacing:.14em;font-weight:800}.trial-lock-card h2{margin:9px 0;font-size:21px}.trial-lock-card p{margin:0 auto 18px;max-width:440px;color:var(--sub);font-size:14px;line-height:1.8}.trial-lock-card a,.trial-week-lock a{display:inline-block;color:#fff;background:var(--accent);padding:8px 14px;border-radius:8px;font-size:13px;font-weight:700;text-decoration:none}.trial-week-lock{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:0;background:var(--accent-soft)}.trial-week-lock span{color:var(--sub);font-size:13px;flex:1}.trial-week-lock a{padding:6px 11px}.trial-hidden-week{display:none}`;
  document.head.appendChild(style);
  const context = document.querySelector('.trial-context');
  if (context) context.hidden = false;

  function hashIsFree() {
    const match = location.hash.match(/^#\/day\/(\d+)-(\d+)/);
    return !match || Number(match[1]) === FREE_WEEK;
  }

  function isN3() {
    const title = document.querySelector('#title')?.textContent || '';
    return title.includes('N3');
  }

  function lockMessage() {
    return `<section class="trial-lock-card">
      <span class="trial-lock-card__eyebrow">TRIAL COMPLETE</span>
      <h2>这一部分将在完整课程中开放</h2>
      <p>你可以先完整体验 N3 第一周：每天的讲解、例句、练习、答案与收藏都可以使用。</p>
      <a href="/#contents">查看课程内容</a>
    </section>`;
  }

  function applyTrialRules() {
    const app = document.querySelector('#app');
    if (!app) return;
    const locked = !isN3() || !hashIsFree();
    document.body.classList.toggle('is-trial-locked', locked);

    if (locked) {
      if (!app.querySelector('.trial-lock-card')) app.innerHTML = lockMessage();
      return;
    }

    // 课程目录仅展示第一周；第二周及以后保留清晰的升级入口。
    if ((location.hash || '#/') === '#/') {
      app.querySelectorAll('.week-card').forEach((card) => {
        const isFree = card.id === `wk-${FREE_WEEK}`;
        card.classList.toggle('trial-hidden-week', !isFree);
      });
      if (!app.querySelector('.trial-week-lock')) {
        const firstWeek = app.querySelector(`#wk-${FREE_WEEK}`);
        firstWeek?.insertAdjacentHTML('afterend', `<section class="trial-week-lock"><b>第一周体验完成后</b><span>完整课程将按你的学习进度继续开放。</span><a href="/#contents">查看课程内容 →</a></section>`);
      }
    }
  }

  function schedule() { window.requestAnimationFrame(applyTrialRules); }
  window.addEventListener('hashchange', schedule);
  document.addEventListener('click', (event) => {
    const levelButton = event.target.closest('[data-golevel]');
    if (levelButton && levelButton.dataset.golevel !== 'n3') {
      event.preventDefault();
      event.stopPropagation();
      document.querySelector('#sheet')?.setAttribute('hidden', '');
      document.querySelector('#sheetMask')?.setAttribute('hidden', '');
      const app = document.querySelector('#app');
      if (app) app.innerHTML = lockMessage();
    }
  }, true);

  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true, characterData: true });
  schedule();
})();
