import type { Metadata } from 'next';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import PageEffects from '@/components/layout/PageEffects';
import Chatbot from '@/components/chat/Chatbot';
import { site } from '@/data/content';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Creator Partnership Studio`,
    template: `%s — ${site.name}`,
  },
  description:
    'Ekka Media connects brands with creators who move culture — strategic partnerships, native storytelling, and campaigns built for real engagement.',
  icons: {
    icon: '/assets/logo-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
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
