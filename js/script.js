/* =====================================================================
   Shopify Homepage Clone — Custom JavaScript
   ===================================================================== */

(function () {
  'use strict';

  /* ---------- 1. Sticky Navbar (scroll effect) ---------- */
  const nav = document.getElementById('mainNav');
  const onScroll = () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 2. Rotating Hero Phrase ---------- */
  const phrases = [
    'AI all-star',
    'household name',
    'solopreneur',
    'category creator',
    'global empire',
    'store they line up for',
    'big thing',
  ];
  const heroPhrase = document.getElementById('heroPhrase');
  let phraseIndex = 0;

  function renderPhrase(text) {
    if (!heroPhrase) return;
    heroPhrase.innerHTML = '';
    const words = text.split(' ');
    words.forEach((word, wi) => {
      const wSpan = document.createElement('span');
      wSpan.className = 'word';
      const inner = document.createElement('span');
      inner.textContent = word + (wi < words.length - 1 ? '\u00A0' : '');
      wSpan.appendChild(inner);
      heroPhrase.appendChild(wSpan);
    });
    // stagger-in
    requestAnimationFrame(() => {
      heroPhrase.querySelectorAll('.word').forEach((w, i) => {
        setTimeout(() => w.classList.add('in'), i * 80);
      });
      // stagger-out
      const current = phraseIndex;
      setTimeout(() => {
        heroPhrase.querySelectorAll('.word').forEach((w, i) => {
          setTimeout(() => w.classList.remove('in'), i * 80);
        });
      }, 2600);
    });
  }

  function rotatePhrase() {
    callPhrase();
    setInterval(callPhrase, 4200);
  }

  function callPhrase() {
    renderPhrase(phrases[phraseIndex]);
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  if (heroPhrase) {
    renderPhrase(phrases[0]);
    setTimeout(rotatePhrase, 3000);
  }

  /* ---------- 3. AB Tabs (Sell everywhere) ---------- */
  const tabs = document.querySelectorAll('.ab-tab');
  const panels = document.querySelectorAll('.ab-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const idx = tab.dataset.tab;
      tabs.forEach((t) => t.classList.toggle('active', t === tab));
      panels.forEach((p) => p.classList.toggle('active', p.dataset.panel === idx));
    });
  });

  /* ---------- 4. Scroll Reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.section-title, .feature-card, .story-card, .agentic-card, .global-card, .ab-tabs, .sidekick-card, .stat-item, .quote-card, .conv-img, .checkout-mock, .globe, .dev-card');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  /* ---------- 5. Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- 6. Close mobile menu after clicking a link ---------- */
  const navCollapse = document.getElementById('navMenu');
  document.querySelectorAll('#navMenu .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      if (navCollapse && navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse) || new bootstrap.Collapse(navCollapse);
        bsCollapse.hide();
      }
    });
  });

  /* ---------- 7. Navbar dropdowns open on hover (desktop) ---------- */
  if (window.innerWidth >= 992) {
    document.querySelectorAll('.nav-item.dropdown').forEach((dropdown) => {
      const menu = dropdown.querySelector('.dropdown-menu');
      const toggle = dropdown.querySelector('.dropdown-toggle');

      dropdown.addEventListener('mouseenter', () => {
        if (menu) menu.classList.add('show');
        if (toggle) toggle.setAttribute('aria-expanded', 'true');
      });
      dropdown.addEventListener('mouseleave', () => {
        if (menu) menu.classList.remove('show');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

/* ---------- 8. Hero video autoplay + fallback handling ---------- */
  const hero = document.getElementById('hero');
  const heroVideo = document.querySelector('.hero-video');

  function showImageFallback() {
    if (hero) hero.classList.add('hero-video-fallback');
  }

  if (heroVideo) {
    // If the video fails to load/play, reveal the poster image fallback.
    heroVideo.addEventListener('error', showImageFallback);
    heroVideo.addEventListener('stalled', showImageFallback);
    const playPromise = heroVideo.play();
    if (playPromise) {
      playPromise.catch(showImageFallback);
    }
  }

  /* ---------- 9. Subtle parallax on hero video ---------- */
  const heroMedia = heroVideo || document.querySelector('.hero-bg');
  if (heroMedia) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroMedia.style.transform = `translateY(${y * 0.3}px) scale(1.05)`;
      }
    }, { passive: true });
  }
})();
