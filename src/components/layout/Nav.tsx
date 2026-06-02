'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navLinks, site } from '@/data/content';

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="nav" id="nav" role="banner">
        <div className="nav__inner">
          <Link href="/" className="nav__logo" aria-label={`${site.name} home`}>
            <Image src="/assets/logo-icon.png" alt="" className="nav__logo-mark" width={40} height={40} />
            <span className="nav__logo-text">
              EKKA <span className="nav__logo-media">MEDIA</span>
            </span>
          </Link>

          <nav className="nav__links" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/contact" className="nav__cta">
            Work With Us
          </Link>

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
        <Link href="/" className="nav-overlay__brand" aria-label={`${site.name} home`} onClick={() => setOpen(false)}>
          <Image src="/assets/logo-full.png" alt={site.name} width={200} height={80} />
        </Link>
        <nav className="nav-overlay__links" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="btn btn--primary nav-overlay__cta" onClick={() => setOpen(false)}>
          Work With Us
        </Link>
      </div>
    </>
  );
}
