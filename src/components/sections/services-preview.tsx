import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/cards/service-card';
import { getFeaturedServices } from '@/lib/data';

export function ServicesPreview() {
  const services = getFeaturedServices();

  return (
    <section
      id="servicios"
      className="relative py-24 md:py-32 overflow-hidden"
      data-testid="services-section"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/50 via-background to-muted/50" />

      {/* Decorative elements */}
      <div className="absolute left-0 top-1/3 -z-10 h-96 w-96 rounded-full bg-primary-100/30 blur-3xl" />
      <div className="absolute right-0 bottom-1/3 -z-10 h-96 w-96 rounded-full bg-accent-100/30 blur-3xl" />

      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">
              Tratamientos Especializados
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Nuestros{' '}
            <span className="text-primary-500">
              Servicios
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Soluciones profesionales para todas las necesidades de tus pies,
            desde tratamientos básicos hasta los más avanzados.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              slug={service.slug}
              name={service.name}
              shortDesc={service.shortDesc}
              icon={service.icon}
              isFeatured={service.isFeatured}
              index={index}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="bg-accent-500 hover:bg-accent-600 text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
            asChild
          >
            <Link href="/servicios" data-testid="services-view-all-link">
              Ver Todos los Servicios
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
