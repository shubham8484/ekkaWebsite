import Link from 'next/link';
import { stats } from '@/data/content';

export default function Hero() {
  const networkStat = stats[0];
  const campaignsStat = stats[1];

  return (
    <section className="hero" id="hero">
      <div className="hero__grain" aria-hidden="true" />
      <div className="hero__orb hero__orb--1" aria-hidden="true" />
      <div className="hero__orb hero__orb--2" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__copy">
          <p className="micro-label hero__tag animate-on-load" style={{ ['--delay' as string]: '0s' }}>
            Creator Partnership Studio · Est. 2024
          </p>
          <h1 className="hero__headline animate-on-load" style={{ ['--delay' as string]: '0.1s' }}>
            The Ace of
            <br />
            <em className="hero__emphasis">Influence.</em>
          </h1>
          <p className="hero__sub animate-on-load" style={{ ['--delay' as string]: '0.4s' }}>
            We connect brands with creators who move culture — through strategic partnerships,
            native storytelling, and campaigns built for real engagement.
          </p>
          <div className="hero__buttons animate-on-load" style={{ ['--delay' as string]: '0.6s' }}>
            <Link href="/contact" className="btn btn--primary btn--lg">
              Work With Us
            </Link>
            <Link href="/contact?tab=creator" className="btn btn--secondary btn--lg">
              Join as Creator
            </Link>
          </div>
        </div>

        <div className="hero__panel animate-on-load" style={{ ['--delay' as string]: '0.5s' }} aria-hidden="true">
          <div className="hero__panel-header">
            <span className="hero__panel-badge">Studio overview</span>
            <span className="hero__panel-live">Active network</span>
          </div>

          <div className="hero__panel-stats">
            <div className="hero__panel-stat">
              <span className="hero__panel-num">
                {Math.floor(networkStat.value / 1000)}K{networkStat.suffix}
              </span>
              <span className="hero__panel-label">{networkStat.label}</span>
            </div>
            <div className="hero__panel-divider" />
            <div className="hero__panel-stat">
              <span className="hero__panel-num">
                {campaignsStat.value}
                {campaignsStat.suffix}
              </span>
              <span className="hero__panel-label">{campaignsStat.label}</span>
            </div>
          </div>

          <div className="hero__panel-flow">
            <div className="hero__panel-step">
              <span className="hero__panel-step-num">01</span>
              <p>Discover</p>
              <span className="hero__panel-step-detail">Niche &amp; audience fit</span>
            </div>
            <div className="hero__panel-step">
              <span className="hero__panel-step-num">02</span>
              <p>Align</p>
              <span className="hero__panel-step-detail">Brief &amp; creative direction</span>
            </div>
            <div className="hero__panel-step">
              <span className="hero__panel-step-num">03</span>
              <p>Deliver</p>
              <span className="hero__panel-step-detail">Publish &amp; measure</span>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator" id="scrollIndicator" aria-hidden="true">
        <span>Scroll</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </section>
  );
}
