import { trustVerticals } from '@/data/content';

export default function TrustStrip() {
  const items = [...trustVerticals, ...trustVerticals];

  return (
    <section className="trust intro-on-load" aria-label="Industries we work across" style={{ ['--delay' as string]: '0.95s' }}>
      <div className="trust__inner">
        <p className="micro-label trust__label">Industries we partner across</p>
        <div className="trust__marquee-wrap">
          <div className="trust__fade trust__fade--left" />
          <div className="trust__fade trust__fade--right" />
          <div className="trust__marquee">
            <div className="trust__track">
              {items.map((label, i) => (
                <span key={`${label}-${i}`} className="trust__item">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
