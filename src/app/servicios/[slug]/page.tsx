import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, Phone, MessageCircle } from 'lucide-react';

import {
  NativeAccordion,
  NativeAccordionItem,
} from '@/components/ui/native-accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { siteConfig } from '@/lib/constants';
import prisma from '@/lib/prisma';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getService(slug: string) {
  return prisma.service.findUnique({
    where: { slug },
    include: {
      faqs: {
        orderBy: { order: 'asc' },
      },
    },
  });
}

async function getOtherServices(currentSlug: string) {
  return prisma.service.findMany({
    where: {
      isActive: true,
      slug: { not: currentSlug },
    },
    orderBy: { order: 'asc' },
    take: 3,
  });
}

export async function generateStaticParams() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    select: { slug: true },
  });

  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return {
      title: 'Servicio no encontrado',
    };
  }

  const keywords = service.keywords.split(',').map((k) => k.trim());

  return {
    title: `${service.name} en Móstoles | Clínica Podológica Carrera`,
    description: service.shortDesc,
    keywords,
    openGraph: {
      title: `${service.name} - Clínica Podológica Carrera`,
      description: service.shortDesc,
      url: `${siteConfig.url}/servicios/${service.slug}`,
      type: 'article',
      images: service.image
        ? [{ url: service.image, alt: service.name }]
        : undefined,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const [service, otherServices] = await Promise.all([
    getService(slug),
    getOtherServices(slug),
  ]);

  if (!service) {
    notFound();
  }

  const benefits = JSON.parse(service.benefits) as string[];

  // JSON-LD Schema para el servicio
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: service.name,
    description: service.fullDesc,
    url: `${siteConfig.url}/servicios/${service.slug}`,
    provider: {
      '@type': 'Podiatrist',
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: siteConfig.phone,
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

  // FAQ Schema si hay FAQs
  const faqSchema =
    service.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: service.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Servicios',
        item: `${siteConfig.url}/servicios`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.name,
        item: `${siteConfig.url}/servicios/${service.slug}`,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Breadcrumb */}
      <nav
        className="border-b bg-muted/30 py-3"
        aria-label="Breadcrumb"
        data-testid="breadcrumb"
      >
        <div className="container">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-muted-foreground hover:text-primary">
                Inicio
              </Link>
            </li>
            <li className="text-muted-foreground">/</li>
            <li>
              <Link
                href="/servicios"
                className="text-muted-foreground hover:text-primary"
              >
                Servicios
              </Link>
            </li>
            <li className="text-muted-foreground">/</li>
            <li className="font-medium text-foreground">{service.name}</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 md:py-20" data-testid="service-hero">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/servicios"
              className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a servicios
            </Link>

            <div className="flex items-start gap-4">
              {service.icon && (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-4xl">
                  {service.icon}
                </div>
              )}
              <div>
                {service.isFeatured && (
                  <Badge className="mb-2" variant="secondary">
                    Servicio Destacado
                  </Badge>
                )}
                <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  {service.name}
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl">
                  {service.shortDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-16 md:pb-24" data-testid="service-content">
        <div className="container">
          <div className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2>¿Qué es {service.name.toLowerCase()}?</h2>
                <p className="text-muted-foreground">{service.fullDesc}</p>
              </div>

              {/* Benefits */}
              {benefits.length > 0 && (
                <div className="mt-10">
                  <h2 className="mb-6 text-2xl font-bold">
                    Beneficios del tratamiento
                  </h2>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3"
                        data-testid={`benefit-${index}`}
                      >
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* FAQs */}
              {service.faqs.length > 0 && (
                <div className="mt-12">
                  <h2 className="mb-6 text-2xl font-bold">Preguntas frecuentes</h2>
                  <div className="rounded-lg border">
                    <NativeAccordion>
                      {service.faqs.map((faq, index) => (
                        <NativeAccordionItem
                          key={faq.id}
                          value={faq.id}
                          trigger={faq.question}
                          data-testid={`service-faq-${index}`}
                        >
                          {faq.answer}
                        </NativeAccordionItem>
                      ))}
                    </NativeAccordion>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold">
                    ¿Necesitas este tratamiento?
                  </h3>
                  <p className="mb-6 text-sm text-muted-foreground">
                    Pide tu cita y te atenderemos lo antes posible. Evaluaremos
                    tu caso y te propondremos el mejor tratamiento.
                  </p>

                  <div className="space-y-3">
                    <Button className="w-full" size="lg" asChild>
                      <a
                        href={`https://wa.me/${siteConfig.whatsapp.replace(/\s/g, '')}?text=${encodeURIComponent(`Hola, me gustaría pedir cita para ${service.name}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="service-whatsapp-cta"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Pedir Cita por WhatsApp
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full" size="lg" asChild>
                      <a
                        href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                        data-testid="service-phone-cta"
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Llamar Ahora
                      </a>
                    </Button>
                  </div>

                  <div className="mt-6 border-t pt-6">
                    <p className="text-sm text-muted-foreground">
                      <strong>Dirección:</strong>
                      <br />
                      {siteConfig.address}
                      <br />
                      {siteConfig.postalCode} {siteConfig.city}
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">
                      <strong>Horario:</strong>
                      <br />
                      L-V: 09:30-14:00 y 17:00-20:00
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      {otherServices.length > 0 && (
        <section
          className="bg-muted/30 py-16 md:py-24"
          data-testid="other-services"
        >
          <div className="container">
            <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
              Otros servicios que pueden interesarte
            </h2>
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
              {otherServices.map((otherService) => (
                <Link
                  key={otherService.id}
                  href={`/servicios/${otherService.slug}`}
                  className="group"
                >
                  <Card className="h-full transition-all hover:shadow-md">
                    <CardContent className="p-6">
                      {otherService.icon && (
                        <div className="mb-3 text-3xl">{otherService.icon}</div>
                      )}
                      <h3 className="mb-2 font-semibold group-hover:text-primary">
                        {otherService.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {otherService.shortDesc}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
