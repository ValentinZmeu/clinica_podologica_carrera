import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Hero } from '@/components/sections/hero';
import { Benefits } from '@/components/sections/benefits';
import { siteConfig } from '@/lib/constants';
import { getGooglePlaceData } from '@/lib/google-places';
import { getActiveServices } from '@/lib/data';

// Dynamic imports for below-the-fold components to reduce initial bundle
const ServicesPreview = dynamic(() => import('@/components/sections/services-preview').then(mod => ({ default: mod.ServicesPreview })));
const Process = dynamic(() => import('@/components/sections/process').then(mod => ({ default: mod.Process })));
const Testimonials = dynamic(() => import('@/components/sections/testimonials').then(mod => ({ default: mod.Testimonials })));
const Location = dynamic(() => import('@/components/sections/location').then(mod => ({ default: mod.Location })));
const FAQ = dynamic(() => import('@/components/sections/faq').then(mod => ({ default: mod.FAQ })));
const CTASection = dynamic(() => import('@/components/sections/cta-section').then(mod => ({ default: mod.CTASection })));

export const metadata: Metadata = {
  title: 'Clínica Podológica Carrera | Podólogo en Móstoles, Madrid',
  description:
    'Clínica podológica en Móstoles con más de 15 años de experiencia. Quiropodia, plantillas personalizadas, estudio biomecánico, pie diabético y podología deportiva. Podólogas colegiadas. Pide cita.',
  keywords: [
    'podólogo móstoles',
    'clínica podológica móstoles',
    'podología móstoles',
    'mejor podólogo móstoles',
    'podóloga móstoles',
    'quiropodia móstoles',
    'plantillas ortopédicas móstoles',
    'podólogo madrid sur',
    'pie diabético móstoles',
    'podología deportiva móstoles',
  ],
  openGraph: {
    title: 'Clínica Podológica Carrera | Podólogo en Móstoles',
    description:
      'Clínica de podología en Móstoles con más de 15 años de experiencia. Podólogas colegiadas especializadas en quiropodia, plantillas, biomecánica y pie diabético.',
    url: siteConfig.url,
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 800,
        height: 533,
        alt: 'Clínica Podológica Carrera - Podólogo en Móstoles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clínica Podológica Carrera | Podólogo en Móstoles',
    description:
      'Clínica podológica en Móstoles. Podólogas colegiadas con más de 15 años de experiencia.',
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

const dayNumberToName: Record<number, string> = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

const fallbackHoursSpec = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    opens: '09:30',
    closes: '14:30',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    opens: '17:00',
    closes: '19:30',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Friday'],
    opens: '09:30',
    closes: '14:30',
  },
];

export default async function Home() {
  const { rating, reviewCount, openingHours } = await getGooglePlaceData();
  const services = getActiveServices();

  // Build openingHoursSpecification from API periods (or fallback)
  let openingHoursSpec = fallbackHoursSpec;
  if (openingHours.periods.length > 0) {
    const grouped: Record<string, number[]> = {};
    for (const period of openingHours.periods) {
      const key = `${period.openTime}|${period.closeTime}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(period.day);
    }
    openingHoursSpec = Object.entries(grouped).map(([key, days]) => {
      const [opens, closes] = key.split('|');
      return {
        '@type': 'OpeningHoursSpecification' as const,
        dayOfWeek: days.map((d) => dayNumberToName[d]).filter(Boolean),
        opens,
        closes,
      };
    });
  }

  // JSON-LD Schema para LocalBusiness
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'MedicalBusiness', 'Podiatrist'],
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${siteConfig.url}/images/entrada-clinica.webp`,
    logo: `${siteConfig.url}/images/logo.webp`,
    priceRange: '$$',
    foundingDate: '2010',
    founder: {
      '@type': 'Person',
      name: 'Isabel Carrera',
      jobTitle: 'Podóloga Colegiada - Directora',
    },
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 3,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.province,
      postalCode: siteConfig.postalCode,
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.coordinates.lat,
      longitude: siteConfig.coordinates.lng,
    },
    openingHoursSpecification: openingHoursSpec,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating,
      bestRating: '5',
      worstRating: '1',
      ratingCount: String(reviewCount || 23),
    },
    areaServed: [
      { '@type': 'City', name: 'Móstoles' },
      { '@type': 'City', name: 'Alcorcón' },
      { '@type': 'City', name: 'Fuenlabrada' },
      { '@type': 'City', name: 'Leganés' },
      { '@type': 'City', name: 'Villaviciosa de Odón' },
      { '@type': 'City', name: 'Navalcarnero' },
      { '@type': 'City', name: 'Arroyomolinos' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Podología',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'MedicalProcedure',
          name: service.name,
          description: service.shortDesc,
          url: `${siteConfig.url}/servicios/${service.slug}`,
        },
      })),
    },
  };

  // JSON-LD Schema para WebSite
  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
    inLanguage: 'es',
  };

  // JSON-LD Schema para BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: siteConfig.url,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Hero />
      <Benefits />
      <ServicesPreview />
      <Process />
      <Testimonials />
      <Location />
      <FAQ />
      <CTASection />
    </>
  );
}
