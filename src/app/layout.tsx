import type { Metadata, Viewport } from 'next';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import PageEffects from '@/components/layout/PageEffects';
import Chatbot from '@/components/chat/Chatbot';
import JsonLd from '@/components/seo/JsonLd';
import { site } from '@/data/content';
import { absoluteUrl } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seo.title,
    template: `%s — ${site.legalName}`,
  },
  description: site.seo.description,
  keywords: [...site.seo.keywords],
  applicationName: site.legalName,
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.parent.name,
  category: 'marketing',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  // Favicon = original Ekka E (theme-tinted) via src/app/icon.png + apple-icon.png
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: absoluteUrl('/'),
    siteName: site.legalName,
    title: site.seo.title,
    description: site.seo.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.seo.title,
    description: site.seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#080D18' },
    { media: '(prefers-color-scheme: light)', color: '#080D18' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body>
        <JsonLd />
        <ScrollProgress />
        <Nav />
        {children}
        <Footer />
        <PageEffects />
        <Chatbot />
      </body>
    </html>
  );
}
