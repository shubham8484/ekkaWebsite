import { creatorNiches } from '@/data/content';

export default function CreatorNetwork() {
  return (
    <section className="creators" id="creators">
      <div className="creators__texture" aria-hidden="true" />
      <div className="creators__inner">
        <div className="creators__copy">
          <p className="micro-label reveal">Our Network</p>
          <h2 className="creators__headline reveal">
            A Network Built
            <br />
            Around Culture.
          </h2>
          <p className="reveal stagger-1">
            From emerging voices to established creators in niche communities — we build
            partnerships where audience fit and authenticity come first.
          </p>
          <p className="creators__statement reveal stagger-2">
            We don&apos;t work with everyone. We work with the right ones.
          </p>
        </div>

        <div className="creators__scroll-wrap">
          <div className="creators__row" id="creatorsRow">
            {creatorNiches.map((item, i) => (
              <article key={item.niche} className="creator-card">
                <span className="creator-card__index">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="creator-card__title">{item.niche}</h3>
                <p className="creator-card__focus">{item.focus}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
