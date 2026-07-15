import type { MetadataRoute } from 'next';
import { site } from '@/data/content';

export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, '');
  const host = base.replace(/^https?:\/\//, '');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host,
  };
}
