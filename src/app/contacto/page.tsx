import { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/forms/contact-form';
import { siteConfig } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contacto | Clínica Podológica Carrera - Móstoles',
  description:
    'Contacta con Clínica Podológica Carrera en Móstoles. Pide tu cita por teléfono, WhatsApp o a través de nuestro formulario. C. de la Carrera, 7.',
  keywords: [
    'contacto podólogo móstoles',
    'cita podólogo móstoles',
    'clínica podológica móstoles contacto',
  ],
  openGraph: {
    title: 'Contacto - Clínica Podológica Carrera',
    description:
      'Pide tu cita en Clínica Podológica Carrera. Llámanos, escríbenos por WhatsApp o usa nuestro formulario de contacto.',
    url: `${siteConfig.url}/contacto`,
    type: 'website',
  },
};

// JSON-LD Schema para ContactPage
const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contacto - Clínica Podológica Carrera',
  description: 'Página de contacto de Clínica Podológica Carrera.',
  url: `${siteConfig.url}/contacto`,
  mainEntity: {
    '@type': 'Podiatrist',
    name: siteConfig.name,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.province,
      postalCode: siteConfig.postalCode,
      addressCountry: 'ES',
    },
  },
};

export default function ContactoPage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />

      {/* Hero Section */}
      <section
        className="bg-muted/30 py-16 md:py-24"
        data-testid="contact-hero"
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Contacta con Nosotros
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              ¿Tienes alguna duda o quieres pedir cita? Estamos aquí para
              ayudarte. Elige la forma de contacto que prefieras.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 md:py-24" data-testid="contact-methods">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Información de Contacto</h2>

              {/* WhatsApp - Primary CTA */}
              <Card className="border-primary bg-primary/5">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">WhatsApp (más rápido)</h3>
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp.replace(/\s/g, '')}`}
                      className="text-lg text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {siteConfig.whatsapp}
                    </a>
                  </div>
                  <Button asChild>
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp.replace(/\s/g, '')}?text=${encodeURIComponent('Hola, me gustaría pedir cita')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="contact-whatsapp-btn"
                    >
                      Escribir
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Phone */}
              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Teléfono</h3>
                    <a
                      href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                      className="text-lg text-muted-foreground hover:text-primary"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                  <Button variant="outline" asChild>
                    <a
                      href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                      data-testid="contact-phone-btn"
                    >
                      Llamar
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Email */}
              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail className="h-6 w-6" />
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
                </CardContent>
              </Card>

              {/* Address */}
              <Card>
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Dirección</h3>
                    <p className="text-muted-foreground">
                      {siteConfig.address}
                      <br />
                      {siteConfig.postalCode} {siteConfig.city},{' '}
                      {siteConfig.province}
                    </p>
                    <a
                      href={siteConfig.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm text-primary hover:underline"
                    >
                      Ver en Google Maps →
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Hours */}
              <Card>
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Horario</h3>
                    <div className="space-y-1 text-muted-foreground">
                      <p>
                        <span className="font-medium">Lunes a Viernes:</span>
                      </p>
                      <p>09:30 - 14:00</p>
                      <p>17:00 - 20:00</p>
                      <p className="pt-2">
                        <span className="font-medium">Sábados y Domingos:</span>{' '}
                        Cerrado
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Envíanos un mensaje</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Rellena el formulario y te responderemos lo antes posible.
                  </p>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-16 md:pb-24" data-testid="contact-map">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-2xl font-bold">Cómo llegar</h2>
            <div className="aspect-video overflow-hidden rounded-xl">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3044.5!2d${siteConfig.coordinates.lng}!3d${siteConfig.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDE5JzM1LjQiTiAzwrA1MScxMy4xIlc!5e0!3m2!1ses!2ses!4v1234567890`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Clínica Podológica Carrera"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
