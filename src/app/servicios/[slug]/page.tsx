import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Check,
  Phone,
  Clock,
  AlertCircle,
  UserCheck,
  MapPin,
  Star,
  CalendarCheck,
  ShieldCheck,
} from 'lucide-react';

import { WhatsAppIcon } from '@/components/ui/whatsapp-icon';

import {
  NativeAccordion,
  NativeAccordionItem,
} from '@/components/ui/native-accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll';
import { Badge } from '@/components/ui/badge';
import { siteConfig } from '@/lib/constants';
import { formatWhatsAppUrl } from '@/lib/utils';
import {
  getServiceBySlug,
  getOtherServices,
  getServiceSlugs,
  getTestimonialsByService,
  getTeamMemberById,
} from '@/lib/data';
import { getIconComponent } from '@/lib/icons';
import { ServiceCard } from '@/components/cards/service-card';
import { getActiveServices } from '@/lib/data';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  const slugs = getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Servicio no encontrado',
    };
  }

  const keywords = service.keywords.split(',').map((k) => k.trim());
  const title = service.h1Override || `${service.name} en Móstoles`;
  const description = service.metaDescription || service.shortDesc;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: `${service.name} - ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/servicios/${service.slug}`,
      type: 'article',
      ...(service.image && { images: [{ url: `${siteConfig.url}${service.image}` }] }),
      ...(service.lastReviewed && { modifiedTime: service.lastReviewed }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.name} - ${siteConfig.name}`,
      description,
    },
    alternates: {
      canonical: `${siteConfig.url}/servicios/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const otherServices = getOtherServices(slug);
  const testimonials = getTestimonialsByService(slug);
  const author = service.author
    ? getTeamMemberById(service.author.teamMemberId)
    : undefined;

  // Servicios relacionados
  const allServices = getActiveServices();
  const relatedServices = service.relatedServices
    ? allServices.filter((s) => service.relatedServices!.includes(s.slug))
    : [];


  // --- JSON-LD Schemas ---

  // 1. MedicalWebPage
  const medicalWebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: service.h1Override || `${service.name} en Móstoles`,
    description: service.metaDescription || service.shortDesc,
    url: `${siteConfig.url}/servicios/${service.slug}`,
    ...(service.lastReviewed && { lastReviewed: service.lastReviewed }),
    medicalAudience: { '@type': 'MedicalAudience', audienceType: 'Patient' },
    ...(service.author && {
      author: {
        '@type': 'Person',
        name: service.author.name,
        jobTitle: service.author.role,
        worksFor: {
          '@type': 'Podiatrist',
          name: siteConfig.name,
        },
      },
    }),
    mainEntity: { '@id': `${siteConfig.url}/servicios/${service.slug}#procedure` },
    ...(service.condition && {
      about: { '@id': `${siteConfig.url}/servicios/${service.slug}#condition` },
    }),
  };

  // 2. MedicalProcedure (mejorado)
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    '@id': `${siteConfig.url}/servicios/${service.slug}#procedure`,
    name: service.name,
    description: service.fullDesc,
    url: `${siteConfig.url}/servicios/${service.slug}`,
    ...(service.procedureType && { procedureType: `https://schema.org/${service.procedureType}` }),
    ...(service.condition?.bodyLocation && { bodyLocation: service.condition.bodyLocation }),
    ...(service.treatmentProcess && {
      howPerformed: service.treatmentProcess.map((s) => `${s.title}: ${s.description}`).join('. '),
    }),
    ...(service.preparation && { preparation: service.preparation }),
    ...(service.aftercare && { followup: service.aftercare.join('. ') }),
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
      geo: {
        '@type': 'GeoCoordinates',
        latitude: siteConfig.coordinates.lat,
        longitude: siteConfig.coordinates.lng,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: siteConfig.rating,
        bestRating: 5,
        ratingCount: 150,
      },
      ...(service.localContext?.serviceArea && {
        areaServed: service.localContext.serviceArea.map((city) => ({
          '@type': 'City',
          name: city,
        })),
      }),
    },
  };

  // 3. MedicalCondition (si existe)
  const conditionSchema = service.condition
    ? {
        '@context': 'https://schema.org',
        '@type': 'MedicalCondition',
        '@id': `${siteConfig.url}/servicios/${service.slug}#condition`,
        name: service.condition.name,
        ...(service.condition.alternateName && {
          alternateName: service.condition.alternateName,
        }),
        description: service.condition.description,
        ...(service.condition.bodyLocation && {
          associatedAnatomy: {
            '@type': 'AnatomicalStructure',
            name: service.condition.bodyLocation,
          },
        }),
        ...(service.condition.riskFactors && {
          riskFactor: service.condition.riskFactors.map((rf) => ({
            '@type': 'MedicalRiskFactor',
            name: rf,
          })),
        }),
        ...(service.symptoms && {
          signOrSymptom: service.symptoms.map((s) => ({
            '@type': 'MedicalSignOrSymptom',
            name: s.name,
            description: s.description,
          })),
        }),
        possibleTreatment: {
          '@id': `${siteConfig.url}/servicios/${service.slug}#procedure`,
        },
      }
    : null;

  // 4. FAQPage
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

  // 5. BreadcrumbList
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {conditionSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(conditionSchema) }}
        />
      )}
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
          <div className="mx-auto max-w-5xl">
            <Link
              href="/servicios"
              className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a servicios
            </Link>

            {service.image && (
              <div className="relative mb-8 h-[280px] w-full overflow-hidden rounded-2xl md:h-[380px]">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority
                />
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
              </div>
            )}

            <div className="mb-3 flex flex-wrap gap-2">
              {service.isFeatured && (
                <Badge variant="secondary">Servicio Destacado</Badge>
              )}
              <Badge variant="outline" className="gap-1">
                <Clock className="h-3 w-3" />
                {service.duration}
              </Badge>
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {service.h1Override || service.name}
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              {service.shortDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-16 md:pb-24" data-testid="service-content">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-12 lg:col-span-2">
              {/* TL;DR */}
              {service.tldr && (
                <AnimateOnScroll variant="fade-up">
                  <div className="rounded-xl border-l-4 border-primary bg-primary/5 p-6">
                    <p className="text-base font-medium leading-relaxed text-foreground">
                      {service.tldr}
                    </p>
                  </div>
                </AnimateOnScroll>
              )}

              {/* ¿Qué es? */}
              <AnimateOnScroll variant="fade-up">
                <div className="prose prose-lg max-w-none">
                  <h2>¿Qué es {service.name.toLowerCase().startsWith('el ') || service.name.toLowerCase().startsWith('la ') ? '' : service.name.toLowerCase().match(/^(uñas|hongos|papilomas|pie|plantillas|estudio|quiropodia|podología)/) ? 'la ' : ''}{service.name.toLowerCase()}?</h2>
                  <p className="text-muted-foreground leading-relaxed">{service.fullDesc}</p>
                  {service.condition?.affectedPopulation && (
                    <p className="text-muted-foreground leading-relaxed">
                      {service.condition.affectedPopulation}
                    </p>
                  )}
                </div>
              </AnimateOnScroll>

              {/* Síntomas */}
              {service.symptoms && service.symptoms.length > 0 && (
                <AnimateOnScroll variant="fade-up">
                  <h2 className="mb-6 text-2xl font-bold">
                    Síntomas: cuándo acudir al podólogo
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {service.symptoms.map((symptom, index) => (
                      <div
                        key={index}
                        className="rounded-lg border p-4 transition-colors hover:border-primary/30"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 shrink-0 text-primary" />
                          <h3 className="font-semibold">{symptom.name}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {symptom.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </AnimateOnScroll>
              )}

              {/* ¿Quién necesita este tratamiento? */}
              {service.whoNeedsIt && service.whoNeedsIt.length > 0 && (
                <AnimateOnScroll variant="fade-up">
                  <h2 className="mb-6 text-2xl font-bold">
                    ¿Quién necesita este tratamiento?
                  </h2>
                  <ul className="space-y-3">
                    {service.whoNeedsIt.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <UserCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </AnimateOnScroll>
              )}

              {/* Proceso de tratamiento */}
              {service.treatmentProcess && service.treatmentProcess.length > 0 && (
                <AnimateOnScroll variant="fade-up">
                  <h2 className="mb-6 text-2xl font-bold">
                    Cómo tratamos {service.name.toLowerCase()} en Móstoles
                  </h2>
                  <div className="relative space-y-6 pl-8 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-primary/20">
                    {service.treatmentProcess.map((step) => (
                      <div key={step.step} className="relative">
                        <div className="absolute -left-8 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                          {step.step}
                        </div>
                        <h3 className="mb-1 font-semibold">{step.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </AnimateOnScroll>
              )}

              {/* Antes, durante y después */}
              {(service.preparation || service.aftercare || service.recoveryTimeline) && (
                <AnimateOnScroll variant="fade-up">
                  <h2 className="mb-6 text-2xl font-bold">
                    Antes, durante y después
                  </h2>
                  <div className="space-y-6">
                    {service.preparation && (
                      <div>
                        <h3 className="mb-2 flex items-center gap-2 font-semibold">
                          <CalendarCheck className="h-4 w-4 text-primary" />
                          Antes de tu cita
                        </h3>
                        <p className="text-muted-foreground">{service.preparation}</p>
                      </div>
                    )}
                    {service.aftercare && service.aftercare.length > 0 && (
                      <div>
                        <h3 className="mb-2 flex items-center gap-2 font-semibold">
                          <ShieldCheck className="h-4 w-4 text-primary" />
                          Cuidados posteriores
                        </h3>
                        <ul className="space-y-2">
                          {service.aftercare.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <span className="text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {service.recoveryTimeline && (
                      <div>
                        <h3 className="mb-2 flex items-center gap-2 font-semibold">
                          <Clock className="h-4 w-4 text-primary" />
                          Tiempo de recuperación
                        </h3>
                        <p className="text-muted-foreground">{service.recoveryTimeline}</p>
                      </div>
                    )}
                  </div>
                </AnimateOnScroll>
              )}

              {/* Beneficios */}
              {service.benefits.length > 0 && (
                <AnimateOnScroll variant="fade-up">
                  <h2 className="mb-6 text-2xl font-bold">
                    Beneficios del tratamiento
                  </h2>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, index) => (
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
                </AnimateOnScroll>
              )}

              {/* Secciones adicionales */}
              {service.additionalSections?.map((section, index) => (
                <AnimateOnScroll key={index} variant="fade-up">
                  <h2 className="mb-4 text-2xl font-bold">{section.heading}</h2>
                  <p className="mb-4 text-muted-foreground leading-relaxed">
                    {section.body}
                  </p>
                  {section.listItems && section.listItems.length > 0 && (
                    <ul className="space-y-2">
                      {section.listItems.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </AnimateOnScroll>
              ))}

              {/* FAQs */}
              {service.faqs.length > 0 && (
                <AnimateOnScroll variant="fade-up">
                  <h2 className="mb-6 text-2xl font-bold">Preguntas frecuentes</h2>
                  <div className="rounded-lg border">
                    <NativeAccordion defaultValue={service.faqs[0]?.id}>
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
                </AnimateOnScroll>
              )}

              {/* Author Box */}
              {service.author && author && (
                <AnimateOnScroll variant="fade-up">
                  <div className="rounded-xl border bg-muted/30 p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                        {author.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Contenido revisado por
                        </p>
                        <p className="font-semibold">{author.name}</p>
                        <p className="text-sm text-muted-foreground">{author.role}</p>
                        {service.lastReviewed && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            Última revisión:{' '}
                            {new Date(service.lastReviewed).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              )}

              {/* Testimonios del servicio */}
              {testimonials.length > 0 && (
                <AnimateOnScroll variant="fade-up">
                  <h2 className="mb-6 text-2xl font-bold">
                    Lo que dicen nuestros pacientes
                  </h2>
                  <div className="space-y-4">
                    {testimonials.map((t) => (
                      <div key={t.id} className="rounded-lg border p-5">
                        <div className="mb-2 flex items-center gap-1">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <p className="mb-3 text-muted-foreground italic">
                          &ldquo;{t.content}&rdquo;
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-semibold">{t.name}</span>
                          {t.location && (
                            <span className="text-muted-foreground">
                              · {t.location}
                            </span>
                          )}
                          {t.isVerified && (
                            <Badge variant="outline" className="gap-1 text-xs">
                              <Check className="h-3 w-3" />
                              Verificado
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimateOnScroll>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 lg:flex lg:flex-col lg:justify-end">
              <div className="space-y-6 lg:sticky lg:bottom-6">
                {/* Info local */}
                {service.localContext && (
                  <AnimateOnScroll variant="fade-right" delay={200}>
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="mb-4 flex items-center gap-2 text-base font-semibold">
                          <MapPin className="h-4 w-4 text-primary" />
                          Zona de servicio
                        </h3>
                        {service.localContext.serviceArea && (
                          <div className="mb-4">
                            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                              Ciudades
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {service.localContext.serviceArea.map((city) => (
                                <Badge key={city} variant="outline" className="text-xs">
                                  {city}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {service.localContext.neighborhoods && (
                          <div>
                            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                              Barrios de Móstoles
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {service.localContext.neighborhoods.map((neighborhood) => (
                                <Badge
                                  key={neighborhood}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {neighborhood}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </AnimateOnScroll>
                )}

                {/* Servicios relacionados */}
                {relatedServices.length > 0 && (
                  <AnimateOnScroll variant="fade-right" delay={300}>
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="mb-4 text-base font-semibold">
                          Servicios relacionados
                        </h3>
                        <div className="space-y-3">
                          {relatedServices.map((rs) => {
                            const RSIcon = getIconComponent(rs.icon);
                            return (
                              <Link
                                key={rs.id}
                                href={`/servicios/${rs.slug}`}
                                className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
                              >
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                  <RSIcon className="h-4 w-4 text-primary" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-medium truncate">{rs.name}</p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </AnimateOnScroll>
                )}

                {/* CTA Card - al final, sticky bottom en desktop */}
                <AnimateOnScroll variant="fade-right" delay={400}>
                  <Card>
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
                            href={formatWhatsAppUrl(siteConfig.whatsapp, `Hola, me gustaría pedir cita para ${service.name}`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid="service-whatsapp-cta"
                          >
                            <WhatsAppIcon className="mr-2 h-4 w-4" />
                            Pedir Cita por WhatsApp
                          </a>
                        </Button>
                        <Button variant="outline" className="w-full" size="lg" asChild>
                          <a
                            href={`tel:${siteConfig.phoneLink}`}
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
                          L-J: {siteConfig.schedule.weekdays}
                          <br />
                          V: {siteConfig.schedule.friday}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </AnimateOnScroll>
              </div>
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
            <AnimateOnScroll variant="fade-up">
              <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
                Otros servicios que pueden interesarte
              </h2>
            </AnimateOnScroll>
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              {otherServices.map((otherService, index) => (
                <AnimateOnScroll key={otherService.id} variant="fade-up" delay={index * 100}>
                  <ServiceCard
                    slug={otherService.slug}
                    name={otherService.name}
                    shortDesc={otherService.shortDesc}
                    image={otherService.image}
                    icon={otherService.icon}
                    isFeatured={otherService.isFeatured}
                  />
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
