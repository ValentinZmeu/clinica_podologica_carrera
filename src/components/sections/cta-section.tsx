import { Phone, Clock, CheckCircle } from 'lucide-react';

import { WhatsAppIcon } from '@/components/ui/whatsapp-icon';

import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/constants';
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll';
import { formatWhatsAppUrl } from '@/lib/utils';
import { getGooglePlaceData } from '@/lib/google-places';

const benefits = [
  'Respuesta en menos de 24 horas',
  'Profesionales colegiados',
  'Tecnología de última generación',
  'Resultados garantizados',
];

export async function CTASection() {
  const { schedule } = await getGooglePlaceData();
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      data-testid="cta-section"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900" />

      {/* Gradient orbs - optimized for performance */}
      <div className="absolute left-1/4 top-0 -z-10 h-96 w-96 rounded-full bg-primary-500/20 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" aria-hidden="true" />

      <div className="container">
        <AnimateOnScroll variant="fade-up" duration={800}>
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-white/90">
              Aceptando citas ahora
            </span>
          </div>

          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            ¿Listo para cuidar{' '}
            <span className="text-primary-400">
              de tus pies?
            </span>
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-white/80">
            Pide tu cita hoy y empieza a disfrutar de unos pies sanos y sin
            molestias. Más de 15 años de experiencia nos avalan.
          </p>

          {/* Benefits */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-sm"
              >
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                {benefit}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="h-14 w-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 text-lg font-semibold text-white shadow-xl transition-all hover:shadow-emerald-500/25 hover:scale-105 sm:w-auto"
              asChild
            >
              <a
                href={formatWhatsAppUrl(
                  siteConfig.whatsapp,
                  'Hola, me gustaría pedir una cita en la Clínica Podológica Carrera'
                )}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="cta-whatsapp-button"
              >
                <WhatsAppIcon className="mr-2 h-5 w-5" />
                Pide tu Cita por WhatsApp
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 w-full border-white/20 bg-white/5 px-8 text-lg text-white backdrop-blur-sm transition-all hover:bg-white/85 hover:text-slate-900 hover:scale-105 sm:w-auto"
              asChild
            >
              <a
                href={`tel:${siteConfig.phoneLink}`}
                data-testid="cta-call-button"
              >
                <Phone className="mr-2 h-5 w-5" />
                Llamar al {siteConfig.phone}
              </a>
            </Button>
          </div>

          {/* Schedule */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-white backdrop-blur-sm">
            <Clock className="h-4 w-4 text-primary-300" />
            <div className="text-sm">
              <span className="font-semibold">Lunes a Jueves</span>
              <span className="ml-1.5 text-white/80">{schedule.weekdays}</span>
            </div>
            <span className="hidden sm:inline text-white/30">|</span>
            <div className="text-sm">
              <span className="font-semibold">Viernes</span>
              <span className="ml-1.5 text-white/80">{schedule.friday}</span>
            </div>
          </div>
        </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
