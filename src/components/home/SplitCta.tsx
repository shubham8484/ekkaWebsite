import Link from 'next/link';

export default function SplitCta() {
  return (
    <section className="split-cta">
      <div className="split-cta__inner">
        <article className="split-card split-card--brands reveal reveal-scale">
          <h2>For Brands</h2>
          <p>
            Launch creator-led campaigns with a team that handles strategy, talent, and
            delivery — from brief to publish.
          </p>
          <Link href="/contact" className="btn btn--ivory btn--lg">
            Start a Campaign →
          </Link>
        </article>
        <article className="split-card split-card--creators reveal reveal-scale stagger-1">
          <h2>For Creators</h2>
          <p>
            Join a curated network matched with brands that respect your voice and your
            community — not just your follower count.
          </p>
          <Link href="/contact?tab=creator" className="btn btn--primary btn--lg">
            Apply to Join →
          </Link>
        </article>
      </div>
    </section>
  );
}
