import Link from 'next/link';
import { site, stats } from '@/data/content';

export default function Hero() {
  const networkStat = stats[0];
  const campaignsStat = stats[1];
  const engageStat = stats[2];

  return (
    <section className="hero" id="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__glow hero__glow--cyan" aria-hidden="true" />
      <div className="hero__glow hero__glow--violet" aria-hidden="true" />
      <div className="hero__glow hero__glow--blue" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__copy">
          <div className="hero__badge animate-on-load" style={{ ['--delay' as string]: '0s' }}>
            <span className="hero__badge-dot" aria-hidden="true" />
            <span>
              Partnerships, UGC, campaigns &amp; creator ops — by {site.parent.shortName}
            </span>
          </div>

          <h1 className="hero__headline animate-on-load" style={{ ['--delay' as string]: '0.12s' }}>
            Influence that moves
            <br />
            your <span className="hero__grad-cyan">brand</span>{' '}
            <span className="hero__grad-violet">forward.</span>
          </h1>

          <p className="hero__sub animate-on-load" style={{ ['--delay' as string]: '0.28s' }}>
            Ekka Media connects brands with creators who move culture — strategic partnerships,
            native storytelling, and campaigns built for real engagement.
          </p>

          <div className="hero__buttons animate-on-load" style={{ ['--delay' as string]: '0.42s' }}>
            <Link href="/#services" className="btn btn--ghost btn--lg">
              Explore services
            </Link>
            <Link href="/contact" className="btn btn--gradient btn--lg">
              Work With Us
            </Link>
          </div>
        </div>

        <div className="hero__panel animate-on-load" style={{ ['--delay' as string]: '0.35s' }}>
          <div className="hero__panel-chrome" aria-hidden="true">
            <span className="hero__dot hero__dot--rose" />
            <span className="hero__dot hero__dot--amber" />
            <span className="hero__dot hero__dot--green" />
            <span className="hero__panel-live">
              <span className="hero__panel-live-dot" />
              Creator systems online
            </span>
          </div>

          <div className="hero__panel-stats">
            <div className="hero__panel-stat">
              <span className="hero__panel-num">
                {Math.floor(networkStat.value / 1000)}K+
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
            <div className="hero__panel-divider" />
            <div className="hero__panel-stat">
              <span className="hero__panel-num">
                {engageStat.value}
                {engageStat.suffix}
              </span>
              <span className="hero__panel-label">Avg. engagement</span>
            </div>
          </div>

          <div className="hero__panel-flow">
            <div className="hero__panel-step">
              <span className="hero__panel-step-num">01</span>
              <p>Discover</p>
              <span className="hero__panel-step-detail">Audience &amp; niche fit across culture</span>
            </div>
            <div className="hero__panel-step">
              <span className="hero__panel-step-num">02</span>
              <p>Partner</p>
              <span className="hero__panel-step-detail">Brief, creative &amp; creator alignment</span>
            </div>
            <div className="hero__panel-step">
              <span className="hero__panel-step-num">03</span>
              <p>Scale</p>
              <span className="hero__panel-step-detail">Ship, measure &amp; amplify reach</span>
            </div>
          </div>

          <div className="hero__core" aria-hidden="true">
            <div className="hero__core-orbit">
              <span className="hero__core-node hero__core-node--1">Creators</span>
              <span className="hero__core-node hero__core-node--2">Brands</span>
              <span className="hero__core-node hero__core-node--3">Culture</span>
              <div className="hero__core-center">
                <strong>EKKA</strong>
                <span>Influence Core</span>
              </div>
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
