import { site } from '@/data/content';
import { absoluteUrl } from '@/lib/seo';

export default function JsonLd() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${absoluteUrl('/')}#organization`,
    name: site.legalName,
    legalName: site.legalName,
    alternateName: ['EKKA MEDIA', 'Ekka'],
    url: absoluteUrl('/'),
    logo: absoluteUrl('/assets/logo-full.png'),
    image: absoluteUrl('/assets/logo-full.png'),
    email: site.email,
    description: site.seo.description,
    foundingDate: site.est,
    parentOrganization: {
      '@type': 'Organization',
      name: site.parent.name,
    },
    sameAs: [site.social.instagram, site.social.linkedin],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: site.email,
        url: absoluteUrl('/contact'),
        availableLanguage: ['English', 'Hindi'],
      },
    ],
    areaServed: 'IN',
    knowsAbout: [
      'Influencer marketing',
      'Creator partnerships',
      'UGC campaigns',
      'Brand collaborations',
      'Talent coordination',
    ],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${absoluteUrl('/')}#website`,
    url: absoluteUrl('/'),
    name: site.legalName,
    description: site.seo.description,
    publisher: { '@id': `${absoluteUrl('/')}#organization` },
    inLanguage: 'en-IN',
  };

  const professionalService = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${absoluteUrl('/')}#service`,
    name: site.legalName,
    url: absoluteUrl('/'),
    image: absoluteUrl('/assets/logo-full.png'),
    description: site.seo.description,
    provider: { '@id': `${absoluteUrl('/')}#organization` },
    serviceType: [
      'Influencer Campaigns',
      'Creator Partnerships',
      'UGC Campaigns',
      'Brand Collaborations',
      'Talent Coordination',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService) }}
      />
    </>
  );
}
