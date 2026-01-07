import dynamic from 'next/dynamic';
import { Hero } from '@/components/sections/hero';
import { Benefits } from '@/components/sections/benefits';
import { siteConfig } from '@/lib/constants';

// Dynamic imports for below-the-fold components to reduce initial bundle
const ServicesPreview = dynamic(() => import('@/components/sections/services-preview').then(mod => ({ default: mod.ServicesPreview })));
const Process = dynamic(() => import('@/components/sections/process').then(mod => ({ default: mod.Process })));
const Testimonials = dynamic(() => import('@/components/sections/testimonials').then(mod => ({ default: mod.Testimonials })));
const Location = dynamic(() => import('@/components/sections/location').then(mod => ({ default: mod.Location })));
const FAQ = dynamic(() => import('@/components/sections/faq').then(mod => ({ default: mod.FAQ })));
const CTASection = dynamic(() => import('@/components/sections/cta-section').then(mod => ({ default: mod.CTASection })));

// JSON-LD Schema para LocalBusiness
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Podiatrist',
  '@id': `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  image: `${siteConfig.url}/og-image.jpg`,
  logo: `${siteConfig.url}/logo.png`,
  priceRange: '$$',
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
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:30',
      closes: '14:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '17:00',
      closes: '20:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: siteConfig.rating,
    bestRating: 5,
    worstRating: 1,
    ratingCount: 50,
  },
  areaServed: [
    { '@type': 'City', name: 'Móstoles' },
    { '@type': 'City', name: 'Alcorcón' },
    { '@type': 'City', name: 'Fuenlabrada' },
    { '@type': 'City', name: 'Leganés' },
  ],
};

export default function Home() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
