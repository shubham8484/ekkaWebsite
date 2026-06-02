import type { Metadata } from 'next';
import { Suspense } from 'react';
import ContactForms from '@/components/contact/ContactForms';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Work with Ekka Media as a brand or apply to join as a creator.',
};

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
