import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/lib/constants';

export function Location() {
  return (
    <section className="py-16 md:py-24" data-testid="location-section">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Encuéntranos
          </h2>
          <p className="text-lg text-muted-foreground">
            Estamos en pleno centro de Móstoles, con fácil acceso y aparcamiento
            cercano.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Map */}
          <div className="overflow-hidden rounded-lg border">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3041.8!2d${siteConfig.coordinates.lng}!3d${siteConfig.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4192fb8b4d6c05%3A0x96dc6799db1f541c!2sCl%C3%ADnica%20Podol%C3%B3gica%20Carrera!5e0!3m2!1ses!2ses!4v1704067200000!5m2!1ses!2ses`}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Clínica Podológica Carrera"
              className="grayscale transition-all hover:grayscale-0"
            />
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Dirección</h3>
                    <p className="text-muted-foreground">
                      {siteConfig.fullAddress}
                    </p>
                    <Button
                      variant="link"
                      className="h-auto p-0 text-primary"
                      asChild
                    >
                      <a
                        href={siteConfig.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Cómo llegar
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Teléfono</h3>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {siteConfig.phone}
                    </a>
                    <p className="text-sm text-muted-foreground">
                      WhatsApp: {siteConfig.whatsapp}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Horario</h3>
                    <div className="text-muted-foreground">
                      <p>
                        <span className="font-medium text-foreground">
                          Lunes a Viernes:
                        </span>{' '}
                        {siteConfig.schedule.weekdays}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">
                          Sábados y Domingos:
                        </span>{' '}
                        {siteConfig.schedule.weekend}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
