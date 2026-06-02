(function () {
  'use strict';

  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navClose = document.getElementById('navClose');
  const navOverlay = document.getElementById('navOverlay');
  const scrollIndicator = document.getElementById('scrollIndicator');

  if (!nav) return;

  /* ——— First page load intro ——— */
  function initPageIntro() {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.body.classList.add('is-loaded');
        setTimeout(function () {
          document.querySelectorAll('.intro-on-load').forEach(function (el) {
            el.classList.add('visible');
          });
        }, 1100);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageIntro);
  } else {
    initPageIntro();
  }

  /* ——— Nav scroll state ——— */
  function updateNav() {
    const scrolled = window.scrollY > 60;
    nav.classList.toggle('nav--scrolled', scrolled);

    if (scrollIndicator) {
      scrollIndicator.classList.toggle('scroll-indicator--hidden', window.scrollY > 100);
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ——— Mobile menu ——— */
  function openMenu() {
    navOverlay.classList.add('nav-overlay--open');
    navOverlay.setAttribute('aria-hidden', 'false');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navOverlay.classList.remove('nav-overlay--open');
    navOverlay.setAttribute('aria-hidden', 'true');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navToggle) navToggle.addEventListener('click', openMenu);
  if (navClose) navClose.addEventListener('click', closeMenu);

  if (navOverlay) {
    navOverlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ——— Scroll reveal ——— */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });

  document.querySelectorAll('.reveal-fade, .reveal-scale, .reveal-left').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ——— Scroll progress bar ——— */
  const scrollProgress = document.getElementById('scrollProgress');
  let ticking = false;

  function updateScrollEffects() {
    const scrollY = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docH > 0 ? (scrollY / docH) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = progress + '%';
    }

    document.querySelectorAll('.parallax').forEach(function (el) {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0.06;
      const rect = el.getBoundingClientRect();
      const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
      const y = centerOffset * speed * -1;
      el.style.setProperty('--parallax-y', y + 'px');
    });

    ticking = false;
  }

  window.addEventListener(
    'scroll',
    function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScrollEffects);
      }
    },
    { passive: true }
  );
  updateScrollEffects();

  /* ——— Closing headline word stagger ——— */
  const closingWords = document.querySelectorAll('.reveal-word');
  const closingSection = document.querySelector('.closing');

  if (closingSection && closingWords.length) {
    const wordObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            closingWords.forEach(function (word, i) {
              setTimeout(function () {
                word.classList.add('visible');
              }, i * 150);
            });
            wordObserver.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    wordObserver.observe(closingSection);
  }

  /* ——— Creator cards slide-in ——— */
  const creatorCards = document.querySelectorAll('.creator-card');
  creatorCards.forEach(function (card, i) {
    card.classList.add('slide-in');
    card.style.transitionDelay = i * 0.08 + 's';
  });

  const creatorsRow = document.getElementById('creatorsRow');
  if (creatorsRow) {
    const creatorObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            creatorCards.forEach(function (card) {
              card.classList.add('visible');
            });
            creatorObserver.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    creatorObserver.observe(creatorsRow);
  }

  /* ——— Stat count-up ——— */
  function animateValue(el, target, duration, decimals, suffix) {
    const start = performance.now();
    suffix = suffix || '';

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      if (decimals > 0) {
        el.textContent = current.toFixed(decimals) + suffix;
      } else {
        el.textContent = Math.floor(current) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        if (decimals > 0) {
          el.textContent = target.toFixed(decimals) + suffix;
        } else {
          el.textContent = Math.floor(target) + suffix;
        }
      }
    }

    requestAnimationFrame(tick);
  }

  const statNumbers = document.querySelectorAll('.stat__number[data-target]');
  const statsObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const stat = el.closest('.stat');
          if (stat) stat.classList.add('is-counting');
          const target = parseFloat(el.getAttribute('data-target'), 10);
          const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
          const suffix = el.getAttribute('data-suffix') || '';
          animateValue(el, target, 1500, decimals, suffix);
          statsObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach(function (el) {
    statsObserver.observe(el);
  });

  const philosophyStats = document.querySelector('.philosophy__stats');
  if (philosophyStats) {
    const statsBlockObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            statsBlockObserver.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    statsBlockObserver.observe(philosophyStats);
  }

  /* ——— Smooth anchor offset for fixed nav ——— */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();
