import Link from 'next/link';
import Image from 'next/image';
import { navLinks, site } from '@/data/content';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__col footer__brand">
          <Link href="/" className="footer__logo-link" aria-label={`${site.name} home`}>
            <Image src="/assets/logo-full.png" alt={site.name} className="footer__logo-img" width={168} height={80} />
          </Link>
          <p className="footer__tagline">{site.tagline}</p>
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
        <p>Built for modern influence.</p>
      </div>
    </footer>
  );
}
