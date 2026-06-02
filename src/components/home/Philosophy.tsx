import { stats } from '@/data/content';

export default function Philosophy() {
  return (
    <section className="philosophy" id="philosophy">
      <div className="philosophy__bg" aria-hidden="true" />
      <div className="philosophy__inner">
        <h2 className="philosophy__headline reveal">
          Modern Influence Isn&apos;t
          <br />
          About Followers.
        </h2>
        <p className="philosophy__statement reveal stagger-1">
          It&apos;s about trust, storytelling, and communities that genuinely care.
        </p>
        <p className="philosophy__body reveal stagger-2">
          We help brands move beyond traditional advertising with creator-led work that
          audiences don&apos;t just see — they feel.
        </p>

        <div className="philosophy__stats reveal stagger-3">
          {stats.map((stat, i) => (
            <div key={stat.label} style={{ display: 'contents' }}>
              {i > 0 && <div className="stat__divider" />}
              <div className="stat">
                <span
                  className="stat__number"
                  data-target={stat.value}
                  data-decimals={stat.decimals}
                  data-suffix={stat.suffix}
                >
                  0
                </span>
                <span className="stat__label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
