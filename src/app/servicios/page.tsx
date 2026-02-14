import { Metadata } from 'next';
import { Stethoscope } from 'lucide-react';

import { ServiceCard } from '@/components/cards/service-card';
import { PageHero } from '@/components/layout/page-hero';
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll';
import { CTASection } from '@/components/sections/cta-section';
import { siteConfig } from '@/lib/constants';
import { getActiveServices } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Servicios de Podología en Móstoles',
  description:
    'Servicios de podología profesional en Móstoles: quiropodía, plantillas personalizadas, estudio biomecánico, podología deportiva, uñas encarnadas, pie diabético y más.',
  keywords: [
    'servicios podología móstoles',
    'tratamientos podológicos',
    'quiropodía móstoles',
    'plantillas ortopédicas móstoles',
    'podólogo móstoles',
  ],
  openGraph: {
    title: 'Servicios de Podología en Móstoles',
    description:
      'Descubre todos nuestros tratamientos podológicos especializados. Más de 15 años de experiencia cuidando la salud de tus pies.',
    url: `${siteConfig.url}/servicios`,
    type: 'website',
  },
  alternates: {
    canonical: `${siteConfig.url}/servicios`,
  },
};

// JSON-LD Schema para MedicalWebPage
const servicesPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Servicios de Podología',
  description:
    'Servicios de podología profesional en Móstoles: quiropodía, plantillas personalizadas, estudio biomecánico y más.',
  url: `${siteConfig.url}/servicios`,
  mainEntity: {
    '@type': 'MedicalBusiness',
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

export default function ServiciosPage() {
  const services = getActiveServices();

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesPageSchema) }}
      />

      {/* Hero Section */}
      <PageHero
        badge="Servicios"
        badgeIcon={Stethoscope}
        title="Nuestros Servicios de"
        titleHighlight="Podología"
        description="Tratamientos especializados para todas las necesidades de tus pies. Desde quiropodía general hasta soluciones avanzadas para problemas específicos."
      />

      {/* Services Grid */}
      <section className="py-16 md:py-24" data-testid="services-grid">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <AnimateOnScroll key={service.id} variant="fade-up" delay={index * 100}>
                <ServiceCard
                  slug={service.slug}
                  name={service.name}
                  shortDesc={service.shortDesc}
                  icon={service.icon}
                  isFeatured={service.isFeatured}
                />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        className="bg-primary/5 py-16 md:py-24"
        data-testid="services-benefits"
      >
        <div className="container">
          <AnimateOnScroll variant="fade-up">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Nuestro Enfoque Clínico
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Cada tratamiento sigue un proceso riguroso para garantizar
              los mejores resultados para tu salud podológica.
            </p>
            <div className="grid gap-6 text-left md:grid-cols-3">
              <div className="rounded-lg bg-background p-6 shadow-sm">
                <h3 className="mb-2 font-semibold">1. Diagnóstico Preciso</h3>
                <p className="text-sm text-muted-foreground">
                  Evaluación completa con las técnicas más avanzadas para
                  identificar la causa exacta de tu problema.
                </p>
              </div>
              <div className="rounded-lg bg-background p-6 shadow-sm">
                <h3 className="mb-2 font-semibold">2. Plan Personalizado</h3>
                <p className="text-sm text-muted-foreground">
                  Diseñamos un plan de tratamiento adaptado a tu caso,
                  explicándote cada paso del proceso.
                </p>
              </div>
              <div className="rounded-lg bg-background p-6 shadow-sm">
                <h3 className="mb-2 font-semibold">3. Seguimiento Activo</h3>
                <p className="text-sm text-muted-foreground">
                  Te acompañamos durante la recuperación con revisiones
                  para asegurar los mejores resultados.
                </p>
              </div>
            </div>
          </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </>
  );
}
