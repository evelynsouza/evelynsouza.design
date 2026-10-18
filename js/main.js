/*
 * Evelyn Souza — Portfólio
 * Comportamentos compartilhados por todas as páginas:
 * tema claro/escuro, menu mobile, copiar e-mail, atalho para "Projetos" e vídeo do case +Capital.
 */
(function () {
  'use strict';

  var THEME_KEY = 'es-theme';   // preferência de tema (mesma chave em todas as páginas)
  var GOTO_KEY = 'es-goto';     // pede à página inicial para abrir na seção Projetos

  var site = document.querySelector('.site');
  if (!site) return;

  /* ---------- Tema ---------- */
  function readTheme() {
    try {
      var v = window.localStorage.getItem(THEME_KEY);
      return v === 'dark' || v === 'light' ? v : null;
    } catch (e) { return null; }
  }
  function applyTheme(theme) {
    var dark = theme === 'dark';
    site.classList.toggle('is-dark', dark);
    document.querySelectorAll('[data-click="toggle-theme"]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
    });
  }
  applyTheme(readTheme() || 'light');
  window.addEventListener('storage', function (e) {
    if (e.key === THEME_KEY && (e.newValue === 'dark' || e.newValue === 'light')) applyTheme(e.newValue);
  });

  /* ---------- Menu mobile ---------- */
  function setMenu(open) {
    site.classList.toggle('menu-open', open);
    document.querySelectorAll('[data-click="toggle-menu"]').forEach(function (btn) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- Copiar e-mail ---------- */
  var toastTimer;
  function copyEmail(btn) {
    var valueEl = btn.querySelector('.contact-value');
    var email = valueEl ? valueEl.textContent.trim() : '';
    if (!email) return;
    var toast = btn.parentNode.querySelector('.copy-toast');
    function done() {
      if (!toast) return;
      toast.textContent = 'E-mail copiado';
      toast.classList.add('is-on');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () {
        toast.classList.remove('is-on');
        toast.textContent = '';
      }, 2200);
    }
    function fallback() {
      try {
        var ta = document.createElement('textarea');
        ta.value = email; ta.setAttribute('readonly', '');
        ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
      } catch (err) {}
      done();
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(email).then(done, fallback);
      else fallback();
    } catch (err) { fallback(); }
  }

  /* ---------- Vídeo (case +Capital) ---------- */
  function hidePlay(box) {
    var btn = box && box.querySelector('[data-click="play-video"]');
    if (btn) btn.remove();
  }
  document.querySelectorAll('video[data-play]').forEach(function (v) {
    v.addEventListener('play', function () { hidePlay(v.closest('.video')); });
  });

  /* ---------- Cliques ---------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-click]');
    if (!el) return;
    switch (el.getAttribute('data-click')) {
      case 'toggle-theme':
        var next = site.classList.contains('is-dark') ? 'light' : 'dark';
        applyTheme(next);
        try { window.localStorage.setItem(THEME_KEY, next); } catch (err) {}
        break;
      case 'toggle-menu':
        setMenu(!site.classList.contains('menu-open'));
        break;
      case 'close-menu':
        setMenu(false);
        break;
      case 'go-projects':
        try { window.sessionStorage.setItem(GOTO_KEY, 'projetos'); } catch (err) {}
        setMenu(false);
        break; // o link segue normalmente para a página inicial
      case 'copy-email':
        copyEmail(el);
        break;
      case 'play-video':
        var box = el.closest('.video');
        var v = box && box.querySelector('video');
        hidePlay(box);
        if (v) {
          try { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } catch (err) {}
          v.focus();
        }
        break;
    }
  });

  /* ---------- Chegada na seção Projetos (página inicial) ---------- */
  var projetos = document.getElementById('projetos');
  if (projetos) {
    var goto = null;
    try { goto = window.sessionStorage.getItem(GOTO_KEY); window.sessionStorage.removeItem(GOTO_KEY); } catch (e) {}
    if (goto === 'projetos' || window.location.hash === '#projetos') {
      projetos.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }
})();
