import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/cards/service-card';
import prisma from '@/lib/prisma';

async function getFeaturedServices() {
  return prisma.service.findMany({
    where: {
      isActive: true,
      isFeatured: true,
    },
    orderBy: {
      order: 'asc',
    },
    take: 3,
  });
}

export async function ServicesPreview() {
  const services = await getFeaturedServices();

  return (
    <section
      className="bg-muted/30 py-16 md:py-24"
      data-testid="services-section"
    >
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-muted-foreground">
            Tratamientos especializados para todas las necesidades de tus pies.
          </p>
        </div>

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

        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" asChild>
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
