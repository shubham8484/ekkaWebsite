import type { Metadata } from 'next';
import { Suspense } from 'react';
import ContactForms from '@/components/contact/ContactForms';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact',
  description:
    'Contact Ekka Media to run influencer campaigns, book creator partnerships, or join our creator network. Brands and creators welcome.',
  path: '/contact',
  keywords: ['contact Ekka Media', 'hire influencer agency', 'join as creator', 'brand collaboration inquiry'],
});

export default function ContactPage() {
  return (
    <main>
      <section className="contact-hero">
        <p className="micro-label animate-on-load" style={{ ['--delay' as string]: '0.05s' }}>
          Get in touch
        </p>
        <h1 className="animate-on-load" style={{ ['--delay' as string]: '0.15s' }}>
          Contact Us
        </h1>
        <p className="animate-on-load" style={{ ['--delay' as string]: '0.3s' }}>
          Brands and creators — tell us about yourself. Every submission is saved securely to our
          team sheet.
        </p>
      </section>

      <Suspense fallback={<div className="contact-main" style={{ minHeight: 400 }} />}>
        <ContactForms />
      </Suspense>
    </main>
  );
}
