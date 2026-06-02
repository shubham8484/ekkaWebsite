import Link from 'next/link';
import { workHighlights } from '@/data/content';

export default function WorkSection() {
  const [large, ...stacked] = workHighlights;

  return (
    <section className="campaigns" id="work">
      <div className="campaigns__inner">
        <div className="section-head reveal">
          <p className="micro-label">How We Work</p>
          <h2 className="campaigns__title">Campaign Capabilities.</h2>
        </div>

        <div className="campaigns__grid">
          <article className="campaign-card campaign-card--large reveal reveal-scale">
            <div className={`campaign-card__visual ${large.visual}`}>
              <span className="campaign-card__visual-label">{large.category}</span>
            </div>
            <div className="campaign-card__info">
              <div className="campaign-card__tags">
                <span>{large.category.split(' · ')[0]}</span>
                <span>{large.category.split(' · ')[1]}</span>
              </div>
              <h3>{large.title}</h3>
              <p className="campaign-card__desc">{large.description}</p>
              <Link href="/contact" className="campaign-card__link">
                Discuss a project
              </Link>
            </div>
          </article>
          <div className="campaigns__stack">
            {stacked.map((item, i) => (
              <article key={item.id} className={`campaign-card reveal reveal-scale stagger-${i + 1}`}>
                <div className={`campaign-card__visual ${item.visual}`}>
                  <span className="campaign-card__visual-label">{item.category}</span>
                </div>
                <div className="campaign-card__info">
                  <div className="campaign-card__tags">
                    <span>{item.category.split(' · ')[0]}</span>
                    <span>{item.category.split(' · ')[1]}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p className="campaign-card__desc">{item.description}</p>
                  <Link href="/contact" className="campaign-card__link">
                    Discuss a project
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <Link href="/contact" className="campaigns__view-all reveal">
          Start a conversation
        </Link>
      </div>
    </section>
  );
}
