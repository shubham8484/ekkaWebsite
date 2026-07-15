import type { Metadata } from 'next';
import { site } from '@/data/content';

export function getSiteUrl() {
  return site.url;
}

export function absoluteUrl(path = '/') {
  const base = getSiteUrl();
  if (!path || path === '/') return base;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export const defaultOgImage = {
  url: '/assets/logo-full.png',
  width: 1200,
  height: 630,
  alt: `${site.legalName} — Creator Partnership Studio`,
} as const;

export function buildPageMetadata({
  title,
  description,
  path = '/',
  keywords,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const pageTitle = title ?? site.seo.title;
  const pageDescription = description ?? site.seo.description;
  const url = absoluteUrl(path);
  const kw = [...site.seo.keywords, ...(keywords ?? [])];

  return {
    title: title
      ? { absolute: `${title} — ${site.legalName}` }
      : { absolute: site.seo.title },
    description: pageDescription,
    keywords: kw,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url,
      siteName: site.legalName,
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: absoluteUrl('/opengraph-image'),
          width: 1200,
          height: 630,
          alt: `${site.legalName} — Creator Partnership Studio`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [absoluteUrl('/opengraph-image')],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
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
}
