import { Phone, MessageCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/constants';
import { formatWhatsAppUrl } from '@/lib/utils';

export function CTASection() {
  return (
    <section
      className="bg-primary py-16 text-primary-foreground md:py-24"
      data-testid="cta-section"
    >
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            ¿Listo para cuidar de tus pies?
          </h2>
          <p className="mb-8 text-lg text-primary-foreground/80">
            Pide tu cita hoy y empieza a disfrutar de unos pies sanos y sin
            molestias. Estamos aquí para ayudarte.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
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
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
              asChild
            >
              <a
                href={`tel:${siteConfig.phone}`}
                data-testid="cta-call-button"
              >
                <Phone className="mr-2 h-5 w-5" />
                {siteConfig.phone}
              </a>
            </Button>
          </div>

          <p className="mt-6 text-sm text-primary-foreground/60">
            Horario de atención: {siteConfig.schedule.weekdays}
          </p>
        </div>
      </div>
    </section>
  );
}
