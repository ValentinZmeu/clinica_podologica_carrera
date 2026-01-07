import { Metadata } from 'next';
import { Stethoscope } from 'lucide-react';

import { ServiceCard } from '@/components/cards/service-card';
import { PageHero } from '@/components/layout/page-hero';
import { CTASection } from '@/components/sections/cta-section';
import { siteConfig } from '@/lib/constants';
import { getActiveServices } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Servicios de Podología en Móstoles | Clínica Podológica Carrera',
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
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                slug={service.slug}
                name={service.name}
                shortDesc={service.shortDesc}
                icon={service.icon}
                isFeatured={service.isFeatured}
              />
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
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              ¿Por qué elegir nuestros servicios?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              En Clínica Podológica Carrera combinamos experiencia, tecnología y
              un trato cercano para ofrecerte la mejor atención podológica.
            </p>
            <div className="grid gap-6 text-left md:grid-cols-3">
              <div className="rounded-lg bg-background p-6 shadow-sm">
                <h3 className="mb-2 font-semibold">Diagnóstico Preciso</h3>
                <p className="text-sm text-muted-foreground">
                  Utilizamos las técnicas más avanzadas para identificar la causa
                  exacta de tu problema.
                </p>
              </div>
              <div className="rounded-lg bg-background p-6 shadow-sm">
                <h3 className="mb-2 font-semibold">Tratamiento Personalizado</h3>
                <p className="text-sm text-muted-foreground">
                  Cada paciente es único. Diseñamos el tratamiento que mejor se
                  adapta a ti.
                </p>
              </div>
              <div className="rounded-lg bg-background p-6 shadow-sm">
                <h3 className="mb-2 font-semibold">Seguimiento Continuo</h3>
                <p className="text-sm text-muted-foreground">
                  Te acompañamos durante todo el proceso de recuperación para
                  asegurar los mejores resultados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </>
  );
}
