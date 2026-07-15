'use client';

import { useEffect } from 'react';

function revealEl(el: Element) {
  el.classList.add('visible');
}

function revealInView(selector = '.reveal, .reveal-fade, .reveal-scale, .reveal-left, .reveal-word') {
  document.querySelectorAll(selector).forEach((el) => {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || 0;
    if (rect.top < vh * 0.98 && rect.bottom > 0) {
      revealEl(el);
    }
  });
}

function revealSection(hash: string) {
  const id = hash.replace(/^#/, '');
  if (!id) return;
  const section = document.getElementById(id);
  if (!section) return;

  section
    .querySelectorAll('.reveal, .reveal-fade, .reveal-scale, .reveal-left, .reveal-word, .slide-in')
    .forEach(revealEl);

  // Also reveal nearby siblings that may sit just under the fold
  requestAnimationFrame(() => revealInView());
}

function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, '');
  if (!id) return;
  const section = document.getElementById(id);
  if (!section) return;

  const navH = document.getElementById('nav')?.offsetHeight ?? 64;
  const top = section.getBoundingClientRect().top + window.scrollY - navH - 8;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  revealSection(hash);
}

export default function PageEffects() {
  useEffect(() => {
    const nav = document.getElementById('nav');
    const scrollIndicator = document.getElementById('scrollIndicator');
    const scrollProgress = document.getElementById('scrollProgress');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.classList.add('is-loaded');
        setTimeout(() => {
          document.querySelectorAll('.intro-on-load').forEach((el) => el.classList.add('visible'));
        }, 1100);
      });
    });

    function updateNav() {
      const scrolled = window.scrollY > 60;
      nav?.classList.toggle('nav--scrolled', scrolled);
      scrollIndicator?.classList.toggle('scroll-indicator--hidden', window.scrollY > 100);
    }

    let ticking = false;
    function updateScrollEffects() {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollProgress) {
        scrollProgress.style.width = `${docH > 0 ? (scrollY / docH) * 100 : 0}%`;
      }

      document.querySelectorAll('.parallax').forEach((el) => {
        const htmlEl = el as HTMLElement;
        const speed = parseFloat(htmlEl.getAttribute('data-parallax') || '0.06');
        const rect = htmlEl.getBoundingClientRect();
        const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
        htmlEl.style.setProperty('--parallax-y', `${centerOffset * speed * -1}px`);
      });

      updateNav();
      ticking = false;
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScrollEffects);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollEffects();

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealEl(entry.target);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '80px 0px 80px 0px' }
    );

    document.querySelectorAll('.reveal, .reveal-fade, .reveal-scale, .reveal-left').forEach((el) => {
      revealObserver.observe(el);
    });

    // Catch elements already in view (hash jumps / fast scroll)
    const revealPass = () => revealInView();
    requestAnimationFrame(revealPass);
    setTimeout(revealPass, 200);
    setTimeout(revealPass, 600);
    setTimeout(revealPass, 1200);

    if (window.location.hash) {
      setTimeout(() => {
        scrollToHash(window.location.hash);
      }, 100);
    }

    const onHashChange = () => {
      if (window.location.hash) scrollToHash(window.location.hash);
    };
    window.addEventListener('hashchange', onHashChange);

    const closingSection = document.querySelector('.closing');
    const closingWords = document.querySelectorAll('.reveal-word');
    if (closingSection && closingWords.length) {
      const wordObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              closingWords.forEach((word, i) => {
                setTimeout(() => word.classList.add('visible'), i * 150);
              });
              wordObserver.disconnect();
            }
          });
        },
        { threshold: 0.15, rootMargin: '40px' }
      );
      wordObserver.observe(closingSection);
    }

    const creatorCards = document.querySelectorAll('.creator-card');
    creatorCards.forEach((card, i) => {
      card.classList.add('slide-in');
      (card as HTMLElement).style.transitionDelay = `${i * 0.06}s`;
    });

    const creatorsRow = document.getElementById('creatorsRow');
    if (creatorsRow) {
      const creatorObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              creatorCards.forEach((c) => c.classList.add('visible'));
              creatorObserver.disconnect();
            }
          });
        },
        { threshold: 0.1, rootMargin: '60px' }
      );
      creatorObserver.observe(creatorsRow);
    }

    function animateValue(
      el: HTMLElement,
      target: number,
      duration: number,
      decimals: number,
      suffix: string
    ) {
      const start = performance.now();
      function tick(now: number) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
        el.textContent =
          decimals > 0
            ? `${current.toFixed(decimals)}${suffix}`
            : `${Math.floor(current)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
        else {
          el.textContent =
            decimals > 0
              ? `${target.toFixed(decimals)}${suffix}`
              : `${Math.floor(target)}${suffix}`;
        }
      }
      requestAnimationFrame(tick);
    }

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const stat = el.closest('.stat');
            stat?.classList.add('is-counting');
            animateValue(
              el,
              parseFloat(el.dataset.target || '0'),
              1500,
              parseInt(el.dataset.decimals || '0', 10),
              el.dataset.suffix || ''
            );
            statsObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.35, rootMargin: '40px' }
    );

    document.querySelectorAll('.stat__number[data-target]').forEach((el) => statsObserver.observe(el));

    const philosophyStats = document.querySelector('.philosophy__stats');
    if (philosophyStats) {
      const blockObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              blockObs.disconnect();
            }
          });
        },
        { threshold: 0.15, rootMargin: '40px' }
      );
      blockObs.observe(philosophyStats);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('hashchange', onHashChange);
      revealObserver.disconnect();
    };
  }, []);

  return null;
}
