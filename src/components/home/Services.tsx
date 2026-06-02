import { services } from '@/data/content';

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="services__inner">
        <div className="section-head reveal">
          <p className="micro-label">Our Capabilities</p>
          <h2 className="services__title">What We Build.</h2>
        </div>
        <div className="services__grid">
          {services.map((service, i) => (
            <article
              key={service.title}
              className={`service-card reveal reveal-scale stagger-${i}${i === 4 ? ' service-card--wide' : ''}`}
            >
              <span className="service-card__index">{String(i + 1).padStart(2, '0')}</span>
              <span className="service-card__tag">{service.tag}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
