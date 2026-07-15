import type { MetadataRoute } from 'next';
import { site } from '@/data/content';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.legalName} — Creator Partnership Studio`,
    short_name: site.legalName,
    description: site.seo.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#080D18',
    theme_color: '#080D18',
    icons: [
      {
        src: '/assets/logo-icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/logo-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
