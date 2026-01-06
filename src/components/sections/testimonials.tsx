import { Star } from 'lucide-react';

import { TestimonialCard } from '@/components/cards/testimonial-card';
import prisma from '@/lib/prisma';
import { siteConfig } from '@/lib/constants';

async function getFeaturedTestimonials() {
  return prisma.testimonial.findMany({
    where: {
      isActive: true,
      isFeatured: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 3,
  });
}

export async function Testimonials() {
  const testimonials = await getFeaturedTestimonials();

  return (
    <section
      className="bg-muted/30 py-16 md:py-24"
      data-testid="testimonials-section"
    >
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-6 w-6 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Lo Que Dicen Nuestros Pacientes
          </h2>
          <p className="text-lg text-muted-foreground">
            <span className="font-semibold text-foreground">
              {siteConfig.rating} estrellas
            </span>{' '}
            de valoración en Google. La opinión de nuestros pacientes es
            nuestra mejor carta de presentación.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              initials={testimonial.initials}
              location={testimonial.location}
              rating={testimonial.rating}
              content={testimonial.content}
              source={testimonial.source}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://www.google.com/maps/place/Cl%C3%ADnica+Podol%C3%B3gica+Carrera"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            Ver todas las reseñas en Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
