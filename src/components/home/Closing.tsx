import Link from 'next/link';

export default function Closing() {
  return (
    <section className="closing" id="closing">
      <div className="closing__grain" aria-hidden="true" />
      <div className="closing__watermark parallax" data-parallax="0.05" aria-hidden="true">
        EKKA
      </div>
      <div className="closing__sparks" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="closing__inner">
        <h2 className="closing__headline">
          <span className="closing__word reveal-word">Culture</span>
          <span className="closing__word reveal-word">Moves</span>
          <span className="closing__word reveal-word">Through</span>
          <span className="closing__word reveal-word">Creators.</span>
        </h2>
        <p className="closing__support reveal stagger-4">
          The next era of influence is already being written.
          <br />
          Let&apos;s write yours.
        </p>
        <Link href="/contact" className="btn btn--primary btn--lg closing__cta reveal stagger-5">
          Work With Us →
        </Link>
      </div>
    </section>
  );
}
