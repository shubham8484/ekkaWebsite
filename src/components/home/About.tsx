export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__watermark parallax" data-parallax="0.08" aria-hidden="true">
        EKKA
      </div>
      <div className="about__inner">
        <div className="about__left">
          <div className="gold-rule reveal" />
          <p className="micro-label reveal">About Ekka</p>
          <h2 className="about__headline reveal">
            Influence Works Best
            <br />
            <span className="about__headline-accent">When It Feels Human.</span>
          </h2>
        </div>
        <div className="about__body">
          <blockquote className="about__pull reveal stagger-1">
            &ldquo;Connection over reach. Culture over clicks.&rdquo;
          </blockquote>
          <p className="reveal stagger-2">
            Ekka Media is a creator partnership studio. We help brands find the right voices —
            aligned on audience, values, and creative direction — not just reach.
          </p>
          <p className="reveal stagger-3">
            We work with creators who build trust and community over time. Our focus is
            connection and cultural relevance, not vanity metrics.
          </p>
        </div>
      </div>
    </section>
  );
}
