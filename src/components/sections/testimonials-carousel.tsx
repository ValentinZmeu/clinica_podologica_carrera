'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { TestimonialCard } from '@/components/cards/testimonial-card';

interface Review {
  authorName: string;
  rating: number;
  text: string;
  profilePhotoUrl: string;
  relativeTime: string;
}

interface StaticTestimonial {
  id: number;
  name: string;
  initials?: string | null;
  location?: string | null;
  rating: number;
  content: string;
  source?: string | null;
}

interface TestimonialsCarouselProps {
  reviews?: Review[];
  staticTestimonials?: StaticTestimonial[];
}

export function TestimonialsCarousel({
  reviews,
  staticTestimonials,
}: TestimonialsCarouselProps) {
  const isGoogle = reviews && reviews.length > 0;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      {/* Carousel viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="-ml-4 flex">
          {isGoogle
            ? reviews.map((review, index) => (
                <div
                  key={`google-${index}`}
                  className="min-w-0 shrink-0 basis-full pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full py-2">
                    <TestimonialCard
                      name={review.authorName}
                      rating={review.rating}
                      content={review.text}
                      source="google"
                      profilePhotoUrl={review.profilePhotoUrl}
                      relativeTime={review.relativeTime}
                    />
                  </div>
                </div>
              ))
            : staticTestimonials?.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="min-w-0 shrink-0 basis-full pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full py-2">
                    <TestimonialCard
                      name={testimonial.name}
                      initials={testimonial.initials}
                      location={testimonial.location}
                      rating={testimonial.rating}
                      content={testimonial.content}
                      source={testimonial.source}
                    />
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className="absolute -left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-border transition-all hover:bg-primary-50 hover:ring-primary-200 disabled:opacity-0 md:-left-5"
        aria-label="Reseña anterior"
      >
        <ChevronLeft className="h-5 w-5 text-primary-600" />
      </button>
      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        className="absolute -right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-border transition-all hover:bg-primary-50 hover:ring-primary-200 disabled:opacity-0 md:-right-5"
        aria-label="Siguiente reseña"
      >
        <ChevronRight className="h-5 w-5 text-primary-600" />
      </button>
    </div>
  );
}
