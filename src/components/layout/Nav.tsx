'use client';

import { useState } from 'react';
import Link from 'next/link';
import { navLinks } from '@/data/content';
import Logo from '@/components/brand/Logo';

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="nav" id="nav" role="banner">
        <div className="nav__inner">
          <Logo size="md" />

          <nav className="nav__links" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="nav__actions">
            <Link href="/#services" className="nav__cta-ghost">
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
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
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
