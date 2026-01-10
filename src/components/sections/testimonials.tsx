import { Star, MessageSquareQuote, ExternalLink } from 'lucide-react';

import { TestimonialCard } from '@/components/cards/testimonial-card';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/constants';
import { getFeaturedTestimonials } from '@/lib/data';

export function Testimonials() {
  const testimonials = getFeaturedTestimonials();

  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      data-testid="testimonials-section"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/30 to-background" />

      {/* Decorative blobs */}
      <div className="absolute left-1/4 top-0 -z-10 h-96 w-96 rounded-full bg-primary-100/40 blur-3xl" />
      <div className="absolute right-1/4 bottom-0 -z-10 h-96 w-96 rounded-full bg-accent-100/40 blur-3xl" />

      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          {/* Section label */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5">
            <MessageSquareQuote className="h-4 w-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">
              Testimonios Reales
            </span>
          </div>

          {/* Rating badge */}
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full bg-amber-50 px-4 py-2 ring-1 ring-amber-200">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-amber-700">
                {siteConfig.rating} en Google
              </span>
            </div>
          </div>

          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Lo Que Dicen{' '}
            <span className="text-primary-500">
              Nuestros Pacientes
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            La opinión de quienes confían en nosotros es nuestra mejor carta de
            presentación. Más de 15 años cuidando la salud de los pies de
            nuestros pacientes.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="group" asChild>
            <a
              href="https://www.google.com/maps/place/Cl%C3%ADnica+Podol%C3%B3gica+Carrera"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver todas las reseñas en Google
              <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
