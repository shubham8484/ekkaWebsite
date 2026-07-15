'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/data/content';
import Logo from '@/components/brand/Logo';

function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, '');
  if (!id) return false;
  const section = document.getElementById(id);
  if (!section) return false;

  const navH = document.getElementById('nav')?.offsetHeight ?? 64;
  const top = section.getBoundingClientRect().top + window.scrollY - navH - 8;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });

  section
    .querySelectorAll('.reveal, .reveal-fade, .reveal-scale, .reveal-left, .reveal-word, .slide-in')
    .forEach((el) => el.classList.add('visible'));

  return true;
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleSectionLink = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith('/#')) return;
    const hash = href.slice(1); // #about

    if (pathname === '/' || pathname === '') {
      e.preventDefault();
      window.history.pushState(null, '', href);
      scrollToHash(hash);
      setOpen(false);
    }
  };

  return (
    <>
      <header className="nav" id="nav" role="banner">
        <div className="nav__inner">
          <Logo size="md" />

          <nav className="nav__links" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={handleSectionLink(link.href)}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="nav__actions">
            <Link href="/#services" className="nav__cta-ghost" onClick={handleSectionLink('/#services')}>
              Explore services
            </Link>
            <Link href="/contact" className="nav__cta">
              Work With Us
            </Link>
          </div>

          <button
            type="button"
            className="nav__toggle"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`nav-overlay${open ? ' nav-overlay--open' : ''}`} aria-hidden={!open}>
        <button type="button" className="nav-overlay__close" aria-label="Close menu" onClick={() => setOpen(false)}>
          &times;
        </button>
        <Logo size="lg" onClick={() => setOpen(false)} />
        <nav className="nav-overlay__links" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => {
                handleSectionLink(link.href)(e);
                setOpen(false);
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="btn btn--gradient nav-overlay__cta" onClick={() => setOpen(false)}>
          Work With Us
        </Link>
      </div>
    </>
  );
}
