import Image from 'next/image';
import { Phone, Star, CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon';
import { siteConfig } from '@/lib/constants';
import { formatWhatsAppUrl } from '@/lib/utils';

export function Hero() {
  return (
    <section
      className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900"
      data-testid="hero-section"
    >
      {/* Background image */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/podologa-tratamiento-clinica.webp"
          alt="Podóloga realizando tratamiento en Clínica Podológica Carrera"
          fill
          className="object-cover blur-[2px]"
          sizes="100vw"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-primary-900/80 to-slate-900/85" />
      </div>

      <div className="container relative z-10 flex min-h-[90vh] flex-col items-center justify-center py-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* Rating Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm animate-fade-in">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="font-semibold text-white">{siteConfig.rating}</span>
            <span className="text-white/80">en Google</span>
          </div>

          {/* Main Heading - H1 optimizado para SEO y LCP */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Tu{' '}
            <span className="relative">
              <span className="relative z-10 text-primary-400">
                Clínica Podológica
              </span>
            </span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            de confianza en{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-white">Móstoles</span>
              <span className="absolute -bottom-2 left-0 h-3 w-full bg-primary-500/30 -rotate-1" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/80 sm:text-xl">
            Especialistas en el cuidado integral de tus pies. Quiropodia,
            plantillas personalizadas, estudio biomecánico y más.
            <span className="block mt-2 font-medium text-white/90">
              Más de 15 años cuidando de ti.
            </span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="group h-14 w-full bg-[#25D366] px-8 text-base font-semibold text-white hover:bg-[#1fb855] sm:w-auto"
              asChild
            >
              <a
                href={formatWhatsAppUrl(
                  siteConfig.whatsapp,
                  'Hola, me gustaría pedir una cita en la Clínica Podológica Carrera'
                )}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-whatsapp-button"
              >
                <WhatsAppIcon className="mr-2 h-5 w-5" />
                Pedir Cita por WhatsApp
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 w-full border-white/20 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/10 hover:text-white sm:w-auto"
              asChild
            >
              <a
                href={`tel:${siteConfig.phoneLink}`}
                data-testid="hero-call-button"
              >
                <Phone className="mr-2 h-5 w-5" />
                Llamar Ahora
              </a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <CheckCircle2 className="h-5 w-5 text-accent-400" />
              <span>Primera consulta sin compromiso</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <CheckCircle2 className="h-5 w-5 text-accent-400" />
              <span>Resultados desde la primera visita</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <CheckCircle2 className="h-5 w-5 text-accent-400" />
              <span>Respuesta en menos de 24h</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <div className="flex flex-col items-center gap-2 text-white/50">
            <span className="text-xs uppercase tracking-wider">Descubre más</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
