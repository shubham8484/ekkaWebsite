import Link from 'next/link';
import { navLinks, site } from '@/data/content';
import Logo from '@/components/brand/Logo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__col footer__brand">
          <Logo href="/" size="md" />
          <p className="footer__tagline">{site.tagline}</p>
          <p className="footer__parent-line">{site.parent.label}</p>
          <p className="footer__legal">
            &copy; {year} Ekka Media. All rights reserved.
          </p>
        </div>
        <nav className="footer__col footer__links" aria-label="Footer navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="footer__col footer__social">
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`}>Email</a>
        </div>
      </div>
      <div className="footer__bar">
        <p>
          Built for modern influence · Part of <span className="footer__parent-name">{site.parent.name}</span>
        </p>
      </div>
    </footer>
  );
}
