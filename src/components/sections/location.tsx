import { MapPin, Phone, Mail, Clock, ExternalLink, Navigation } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/constants';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Dirección',
    content: siteConfig.fullAddress,
    link: siteConfig.googleMapsUrl,
    linkText: 'Cómo llegar',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Phone,
    title: 'Teléfono',
    content: siteConfig.phone,
    subContent: `WhatsApp: ${siteConfig.whatsapp}`,
    link: `tel:${siteConfig.phone}`,
    linkText: 'Llamar ahora',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Mail,
    title: 'Email',
    content: siteConfig.email,
    link: `mailto:${siteConfig.email}`,
    linkText: 'Enviar email',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: Clock,
    title: 'Horario',
    content: `L-J: ${siteConfig.schedule.weekdays}`,
    subContent: `V: ${siteConfig.schedule.friday} | S-D: ${siteConfig.schedule.weekend}`,
    gradient: 'from-amber-500 to-orange-500',
  },
];

export function Location() {
  return (
    <section
      id="contacto"
      className="relative py-24 md:py-32 overflow-hidden"
      data-testid="location-section"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/30 to-background" />

      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700">
            <Navigation className="mr-1 inline-block h-4 w-4" />
            Ubicación
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Encuéntranos en{' '}
            <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              Móstoles
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            En pleno centro de la ciudad, con fácil acceso en transporte público
            y aparcamiento cercano.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Map */}
          <div className="lg:col-span-3">
            <div className="group relative h-full min-h-[400px] overflow-hidden rounded-2xl border shadow-lg">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3041.8!2d${siteConfig.coordinates.lng}!3d${siteConfig.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd418e81e5d565c3%3A0x8f1c87dfcd45852b!2sClinica%20Podol%C3%B3gica%20Carrera!5e0!3m2!1ses!2ses!4v1704067200000!5m2!1ses!2ses`}
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Clínica Podológica Carrera"
                className="transition-all duration-500 grayscale group-hover:grayscale-0"
              />
              {/* Overlay gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity group-hover:opacity-5`}
                />

                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} text-white shadow-md`}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1 font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.content}</p>
                    {item.subContent && (
                      <p className="text-sm text-muted-foreground">
                        {item.subContent}
                      </p>
                    )}
                    {item.link && (
                      <Button
                        variant="link"
                        className="mt-1 h-auto p-0 text-primary"
                        asChild
                      >
                        <a
                          href={item.link}
                          target={item.link.startsWith('http') ? '_blank' : undefined}
                          rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {item.linkText}
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
