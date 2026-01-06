import { Phone, MessageCircle, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { siteConfig } from '@/lib/constants';
import { formatWhatsAppUrl } from '@/lib/utils';

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white py-20 md:py-28"
      data-testid="hero-section"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary-100/50 blur-3xl" />
      </div>

      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          {/* Rating Badge */}
          <Badge
            variant="secondary"
            className="mb-6 inline-flex items-center gap-1 px-3 py-1"
          >
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{siteConfig.rating}</span>
            <span className="text-muted-foreground">en Google</span>
          </Badge>

          {/* Main Heading - H1 optimizado para SEO */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Tu{' '}
            <span className="text-primary">Clínica Podológica</span>
            <br />
            de confianza en{' '}
            <span className="text-primary">Móstoles</span>
          </h1>

          {/* Subtitle */}
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Especialistas en el cuidado integral de tus pies. Quiropodia,
            plantillas personalizadas, estudio biomecánico y más.
            <span className="font-medium text-foreground">
              {' '}Más de 15 años cuidando de ti.
            </span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <a
                href={formatWhatsAppUrl(
                  siteConfig.whatsapp,
                  'Hola, me gustaría pedir una cita en la Clínica Podológica Carrera'
                )}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-whatsapp-button"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Pedir Cita por WhatsApp
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
              asChild
            >
              <a
                href={`tel:${siteConfig.phone}`}
                data-testid="hero-call-button"
              >
                <Phone className="mr-2 h-5 w-5" />
                Llamar Ahora
              </a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Primera consulta sin compromiso</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Resultados desde la primera visita</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
