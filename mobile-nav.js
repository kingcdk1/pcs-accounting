/* PCS For Business — mobile navigation
   One shared file. Reads whatever nav links the page already has and builds a
   clearly-labelled MENU button + full drop-down panel for phones.
   Requirement: the button must be OBVIOUS — bordered, gold, and the word MENU
   spelled out. A bare hamburger icon does not get tapped by people who aren't
   used to them.
   Add with: <script src="mobile-nav.js" defer></script>
*/
(function () {
  'use strict';

  function build() {
    if (document.getElementById('mnavBtn')) return;

    // --- find this page's nav links (works across the site's different navs) ---
    var host = document.querySelector('.nav-links');
    var links = [];
    if (host) {
      links = Array.prototype.slice.call(host.querySelectorAll('a'));
    } else {
      var navEl = document.querySelector('nav') || document.querySelector('header');
      if (navEl) links = Array.prototype.slice.call(navEl.querySelectorAll('a')).filter(function (a) {
        return !a.querySelector('.logo-text') && !/logo/i.test(a.className);
      });
    }
    // the standalone Team pill some pages carry
    var teamPill = document.querySelector('.team-mobile');
    if (teamPill && !links.some(function (a) { return a.getAttribute('href') === teamPill.getAttribute('href'); })) {
      links.push(teamPill);
    }
    if (!links.length) return;

    // --- styles ---
    var css = document.createElement('style');
    css.textContent = [
      '#mnavBtn{display:none;align-items:center;gap:8px;background:rgba(212,176,102,.12);',
      'border:1.5px solid #b5904a;color:#e7cf91;font:700 13px/1 "Source Sans 3",system-ui,sans-serif;',
      'letter-spacing:1.6px;padding:11px 16px;border-radius:10px;cursor:pointer;white-space:nowrap}',
      '#mnavBtn .bars{display:inline-block;width:16px}',
      '#mnavBtn .bars i{display:block;height:2px;background:#e7cf91;border-radius:2px;margin:3px 0}',
      '#mnavPanel{display:none;position:fixed;inset:0;z-index:4000;background:rgba(6,9,17,.97);',
      'backdrop-filter:blur(6px);overflow-y:auto;padding:18px 20px 40px}',
      '#mnavPanel.on{display:block}',
      '#mnavHead{display:flex;align-items:center;justify-content:space-between;padding-bottom:14px;',
      'border-bottom:1px solid #2a3045;margin-bottom:6px}',
      '#mnavHead .t{font:700 11px/1 "Source Sans 3",sans-serif;letter-spacing:2.6px;color:#d4b066;text-transform:uppercase}',
      '#mnavClose{background:transparent;border:1px solid #2a3045;color:#f0ead6;font:700 13px "Source Sans 3",sans-serif;',
      'padding:9px 15px;border-radius:9px;cursor:pointer;letter-spacing:1px}',
      '#mnavPanel a{display:flex;align-items:center;justify-content:space-between;padding:17px 4px;',
      'color:#f0ead6;text-decoration:none;font:600 17px "Source Sans 3",sans-serif;border-bottom:1px solid #1f2536}',
      '#mnavPanel a:last-of-type{border-bottom:0}',
      '#mnavPanel a .ar{color:#b5904a;font-size:15px}',
      '#mnavPanel a.cur{color:#e7cf91}',
      '#mnavCall{display:block;margin-top:22px;text-align:center;background:linear-gradient(135deg,#d4b066,#e7cf91);',
      'color:#1a1408;font:700 15px "Source Sans 3",sans-serif;padding:15px;border-radius:11px;text-decoration:none}',
      '@media(max-width:760px){#mnavBtn{display:inline-flex}.team-mobile{display:none!important}}',
      '@media(min-width:761px){#mnavPanel{display:none!important}}'
    ].join('');
    document.head.appendChild(css);

    // --- the MENU button (spelled out, bordered — not a bare icon) ---
    var btn = document.createElement('button');
    btn.id = 'mnavBtn';
    btn.setAttribute('aria-label', 'Open menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span class="bars"><i></i><i></i><i></i></span>MENU';

    var bar = document.querySelector('.nav-inner') || document.querySelector('nav') || document.querySelector('header');
    if (!bar) return;
    bar.appendChild(btn);

    // --- the panel ---
    var here = location.pathname.split('/').pop() || 'index.html';
    var panel = document.createElement('div');
    panel.id = 'mnavPanel';
    var rows = links.map(function (a) {
      var href = a.getAttribute('href') || '#';
      var label = (a.textContent || '').trim();
      var cur = href.split('#')[0] === here ? ' cur' : '';
      return '<a class="' + cur.trim() + '" href="' + href + '">' + label + '<span class="ar">&rsaquo;</span></a>';
    }).join('');
    panel.innerHTML =
      '<div id="mnavHead"><span class="t">PCS Tax Service &middot; For Business</span>' +
      '<button id="mnavClose" aria-label="Close menu">CLOSE &times;</button></div>' +
      rows +
      '<a id="mnavCall" href="tel:+12149431099">Call (214) 943-1099</a>';
    document.body.appendChild(panel);

    function open() {
      panel.classList.add('on');
      document.body.style.overflow = 'hidden';
      btn.setAttribute('aria-expanded', 'true');
    }
    function close() {
      panel.classList.remove('on');
      document.body.style.overflow = '';
      btn.setAttribute('aria-expanded', 'false');
    }
    btn.addEventListener('click', open);
    document.getElementById('mnavClose').addEventListener('click', close);
    panel.addEventListener('click', function (e) { if (e.target === panel) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
