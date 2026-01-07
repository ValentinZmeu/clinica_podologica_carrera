import { Metadata } from 'next';
import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Navigation,
  ExternalLink,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/layout/page-hero';
import { siteConfig } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contacto | Clínica Podológica Carrera - Móstoles',
  description:
    'Contacta con Clínica Podológica Carrera en Móstoles. Pide tu cita por teléfono o WhatsApp. C. de la Carrera, 7, junto al Mercado de la Constitución.',
  keywords: [
    'contacto podólogo móstoles',
    'cita podólogo móstoles',
    'clínica podológica móstoles contacto',
    'podólogo zona sur madrid',
  ],
  openGraph: {
    title: 'Contacto - Clínica Podológica Carrera',
    description:
      'Pide tu cita en Clínica Podológica Carrera. Llámanos o escríbenos por WhatsApp.',
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
      <PageHero
        badge="Contacto"
        badgeIcon={Navigation}
        title="¿Cómo podemos"
        titleHighlight="ayudarte?"
        description="Estamos a tu disposición. Elige la forma de contacto que prefieras y te atenderemos en menos de 24 horas."
      />

      {/* Contact Methods */}
      <section className="py-16 md:py-24" data-testid="contact-methods">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            {/* Primary CTA - WhatsApp */}
            <div className="mb-8">
              <Card className="overflow-hidden border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-0">
                  <div className="flex flex-col items-center gap-6 p-8 md:flex-row md:p-10">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25">
                      <MessageCircle className="h-10 w-10" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <p className="text-sm font-medium text-green-600">
                        Método más rápido
                      </p>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Escríbenos por WhatsApp
                      </h2>
                      <p className="mt-1 text-lg text-gray-600">
                        {siteConfig.whatsapp}
                      </p>
                    </div>
                    <Button
                      size="lg"
                      className="h-14 bg-gradient-to-r from-green-500 to-emerald-500 px-8 text-lg font-semibold shadow-lg transition-all hover:shadow-green-500/25 hover:scale-105"
                      asChild
                    >
                      <a
                        href={`https://wa.me/${siteConfig.whatsapp.replace(/\s/g, '').replace('+', '')}?text=${encodeURIComponent('Hola, me gustaría pedir cita')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="contact-whatsapp-btn"
                      >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Escribir ahora
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Secondary Contact Methods */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Phone */}
              <Card className="group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-md">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">Teléfono</h3>
                      <p className="text-2xl font-bold text-primary">
                        {siteConfig.phone}
                      </p>
                      <Button
                        variant="link"
                        className="mt-2 h-auto p-0 text-primary"
                        asChild
                      >
                        <a
                          href={`tel:${siteConfig.phoneLink}`}
                          data-testid="contact-phone-btn"
                        >
                          Llamar ahora
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 text-white shadow-md">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">Email</h3>
                      <p className="text-lg text-muted-foreground">
                        {siteConfig.email}
                      </p>
                      <Button
                        variant="link"
                        className="mt-2 h-auto p-0 text-primary"
                        asChild
                      >
                        <a href={`mailto:${siteConfig.email}`}>
                          Enviar email
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Location & Schedule */}
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {/* Address */}
              <Card className="group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-md">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">Dirección</h3>
                      <p className="text-muted-foreground">
                        {siteConfig.address}
                        <br />
                        {siteConfig.postalCode} {siteConfig.city}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Junto al Mercado de la Constitución
                      </p>
                      <Button
                        variant="link"
                        className="mt-2 h-auto p-0 text-primary"
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

              {/* Schedule */}
              <Card className="group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">Horario</h3>
                      <div className="space-y-1 text-muted-foreground">
                        <p>
                          <span className="font-medium text-foreground">
                            Lunes a Jueves:
                          </span>
                        </p>
                        <p>09:30 - 14:30 y 17:00 - 19:30</p>
                        <p className="pt-1">
                          <span className="font-medium text-foreground">
                            Viernes:
                          </span>{' '}
                          09:30 - 14:30
                        </p>
                        <p>
                          <span className="font-medium text-foreground">
                            Sábado y Domingo:
                          </span>{' '}
                          Cerrado
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

      {/* Map Section */}
      <section className="pb-16 md:pb-24" data-testid="contact-map">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold md:text-3xl">
                Encuéntranos en{' '}
                <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                  Móstoles
                </span>
              </h2>
              <p className="mt-2 text-muted-foreground">
                En pleno centro, junto al Mercado de la Constitución
              </p>
            </div>

            {/* Clinic Entrance Image */}
            <div className="mb-6 group relative overflow-hidden rounded-2xl border shadow-lg">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/images/Entrada de Clínica Podológica Carrera.png"
                  alt="Fachada de Clínica Podológica Carrera en Móstoles"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm font-medium text-white/80">Nuestra clínica</p>
                  <p className="text-lg font-bold text-white">
                    {siteConfig.fullAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-2xl border shadow-lg">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3041.8!2d${siteConfig.coordinates.lng}!3d${siteConfig.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd418e81e5d565c3%3A0x8f1c87dfcd45852b!2sClinica%20Podol%C3%B3gica%20Carrera!5e0!3m2!1ses!2ses!4v1704067200000!5m2!1ses!2ses`}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Clínica Podológica Carrera"
                className="grayscale transition-all duration-500 hover:grayscale-0"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
