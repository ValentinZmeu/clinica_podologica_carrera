import { Metadata } from 'next';
import Link from 'next/link';
import { Award, Heart, Users, Clock, GraduationCap, ShieldCheck } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PageHero } from '@/components/layout/page-hero';
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll';
import { CountUp } from '@/components/ui/count-up';
import { CTASection } from '@/components/sections/cta-section';
import { siteConfig } from '@/lib/constants';
import { getGoogleRating } from '@/lib/google-places';
import { getActiveTeamMembers } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Equipo de Podólogas Colegiadas en Móstoles | Sobre Nosotros',
  description:
    'Conoce al equipo de Clínica Podológica Carrera en Móstoles: Isabel Carrera, Cristina López y Miriam Casas. Podólogas colegiadas con más de 15 años de experiencia, formación universitaria y especialización continua.',
  keywords: [
    'podólogo móstoles',
    'podóloga móstoles',
    'clínica podológica móstoles',
    'equipo podología',
    'podóloga colegiada móstoles',
    'Isabel Carrera podóloga',
    'Cristina López podóloga',
    'Miriam Casas podóloga',
    'zona sur madrid podología',
    'equipo podológico móstoles',
    'podóloga colegiada madrid sur',
  ],
  openGraph: {
    title: 'Equipo de Podólogas Colegiadas en Móstoles - Clínica Podológica Carrera',
    description:
      'Conoce a Isabel Carrera, Cristina López y Miriam Casas. Podólogas colegiadas con más de 15 años cuidando la salud de los pies en Móstoles.',
    url: `${siteConfig.url}/sobre-nosotros`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Equipo de Podólogas Colegiadas en Móstoles',
    description:
      'Podólogas colegiadas con más de 15 años de experiencia en Móstoles.',
  },
  alternates: {
    canonical: `${siteConfig.url}/sobre-nosotros`,
  },
};

const values = [
  {
    icon: Award,
    title: 'Profesionalidad',
    description:
      'Podólogas tituladas y colegiadas con formación continua para ofrecerte los mejores tratamientos.',
  },
  {
    icon: Heart,
    title: 'Trato Cercano',
    description:
      'Cada paciente es único. Te escuchamos, te entendemos y diseñamos el tratamiento perfecto para ti.',
  },
  {
    icon: Users,
    title: 'Confianza',
    description:
      'Más de 15 años cuidando de las familias de Móstoles. Tus pies en las mejores manos.',
  },
  {
    icon: Clock,
    title: 'Disponibilidad',
    description:
      'Horarios amplios y citas rápidas para que puedas cuidar de tus pies cuando lo necesites.',
  },
];

export default async function SobreNosotrosPage() {
  const teamMembers = getActiveTeamMembers();
  const { rating } = await getGoogleRating();

  // JSON-LD Schema para AboutPage
  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Sobre Nosotros - Clínica Podológica Carrera en Móstoles',
    description:
      'Conoce al equipo de Clínica Podológica Carrera en Móstoles. Podólogas colegiadas con más de 15 años de experiencia.',
    url: `${siteConfig.url}/sobre-nosotros`,
    mainEntity: {
      '@id': `${siteConfig.url}/#organization`,
    },
    mentions: teamMembers.map((m) => ({
      '@id': `${siteConfig.url}/sobre-nosotros#${m.id}`,
    })),
  };

  // JSON-LD Schema para Organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'MedicalBusiness', 'Podiatrist'],
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    foundingDate: '2010',
    founder: {
      '@id': `${siteConfig.url}/sobre-nosotros#isabel-carrera`,
    },
    employee: teamMembers.map((m) => ({
      '@id': `${siteConfig.url}/sobre-nosotros#${m.id}`,
    })),
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: teamMembers.length,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.province,
      postalCode: siteConfig.postalCode,
      addressCountry: 'ES',
    },
    areaServed: [
      { '@type': 'City', name: 'Móstoles' },
      { '@type': 'City', name: 'Alcorcón' },
      { '@type': 'City', name: 'Fuenlabrada' },
      { '@type': 'City', name: 'Leganés' },
      { '@type': 'City', name: 'Villaviciosa de Odón' },
      { '@type': 'City', name: 'Navalcarnero' },
      { '@type': 'City', name: 'Arroyomolinos' },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: siteConfig.rating,
      bestRating: 5,
      ratingCount: 50,
    },
  };

  // JSON-LD Schemas para Person/Podiatrist
  const personSchemas = teamMembers.map((member) => ({
    '@context': 'https://schema.org',
    '@type': ['Person', 'Podiatrist'],
    '@id': `${siteConfig.url}/sobre-nosotros#${member.id}`,
    name: member.name,
    jobTitle: member.role,
    description: member.extendedBio || member.bio,
    worksFor: {
      '@id': `${siteConfig.url}/#organization`,
    },
    ...(member.collegiateNum && {
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Número de colegiado',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Colegio Oficial de Podólogos de la Comunidad de Madrid',
        },
        identifier: member.collegiateNum,
      },
    }),
    ...(member.education && {
      alumniOf: member.education.map((edu) => ({
        '@type': 'EducationalOrganization',
        name: edu,
      })),
    }),
    ...(member.memberOf && {
      memberOf: member.memberOf.map((org) => ({
        '@type': 'Organization',
        name: org,
      })),
    }),
    ...(member.sameAs && member.sameAs.length > 0 && { sameAs: member.sameAs }),
    knowsAbout: member.specialties,
  }));

  // JSON-LD Schema para BreadcrumbList
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
        name: 'Sobre Nosotros',
        item: `${siteConfig.url}/sobre-nosotros`,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {personSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="border-b bg-muted/30 py-3" aria-label="Breadcrumb">
        <div className="container">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-muted-foreground hover:text-primary">
                Inicio
              </Link>
            </li>
            <li className="text-muted-foreground">/</li>
            <li className="font-medium text-foreground">Sobre Nosotros</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <PageHero
        badge="Sobre Nosotros"
        badgeIcon={Users}
        title="Conoce a Nuestro"
        titleHighlight="Equipo"
        description="Más de 15 años cuidando la salud de los pies de las familias de Móstoles y alrededores. Profesionalidad, cercanía y pasión por lo que hacemos."
      />

      {/* Story Section */}
      <section className="py-16 md:py-24" data-testid="about-story">
        <div className="container">
          <AnimateOnScroll variant="fade-up">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
              Nuestra Historia
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                <strong>Clínica Podológica Carrera es la clínica de podología de referencia en Móstoles</strong>,
                fundada por Isabel Carrera con el objetivo de ofrecer una atención
                podológica de calidad, cercana y accesible. Ubicada en la Calle de la
                Carrera 7, en pleno centro de Móstoles, somos la clínica de confianza
                para miles de familias de la zona sur de Madrid.
              </p>
              <p>
                Desde nuestros inicios, hemos apostado por la formación continua
                y la incorporación de las técnicas más avanzadas, sin perder
                nunca la esencia de lo que nos define: un trato humano y
                personalizado con cada paciente que nos visita en Móstoles.
              </p>
              <p>
                Hoy, después de más de 15 años, nos sentimos orgullosas de haber
                ayudado a más de 5.000 pacientes a cuidar la salud de sus pies.
                Nuestro equipo de tres podólogas colegiadas atiende a vecinos de
                Móstoles, Alcorcón, Fuenlabrada, Leganés y toda la zona sur de Madrid.
              </p>
            </div>
          </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Values Section */}
      <section
        className="bg-primary/5 py-16 md:py-24"
        data-testid="about-values"
      >
        <div className="container">
          <AnimateOnScroll variant="fade-up">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Nuestros Valores
            </h2>
            <p className="text-lg text-muted-foreground">
              Los principios que guían nuestro trabajo cada día.
            </p>
          </div>
          </AnimateOnScroll>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {values.map((value, index) => (
              <AnimateOnScroll key={index} variant="fade-up" delay={index * 100}>
              <Card
                className="border-0 bg-background"
                data-testid={`value-card-${index}`}
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-16 md:py-24" data-testid="about-credentials">
        <div className="container">
          <AnimateOnScroll variant="fade-up">
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
                Formación y Compromiso Profesional
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Todas las podólogas de nuestra clínica en Móstoles son <strong>tituladas
                  universitarias en Podología</strong> y están colegiadas en el Colegio Oficial
                  de Podólogos de la Comunidad de Madrid, garantizando el cumplimiento de
                  los más altos estándares de práctica clínica.
                </p>
                <p>
                  Invertimos continuamente en formación especializada: cursos de posgrado,
                  congresos nacionales de podología y certificaciones en técnicas avanzadas
                  como el tratamiento láser, cirugía ungueal mínimamente invasiva y
                  biomecánica deportiva.
                </p>
                <p>
                  Nuestro compromiso con la formación continua nos permite ofrecer a los
                  pacientes de Móstoles y la zona sur de Madrid los tratamientos más
                  actualizados y basados en la evidencia científica.
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-muted/30 py-16 md:py-24" data-testid="about-team">
        <div className="container">
          <AnimateOnScroll variant="fade-up">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              El Equipo
            </h2>
            <p className="text-lg text-muted-foreground">
              Profesionales colegiadas comprometidas con tu salud podológica.
            </p>
          </div>
          </AnimateOnScroll>

          <div className="mx-auto max-w-3xl space-y-8">
            {teamMembers.map((member, index) => {
              const initials = member.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase();

              return (
                <AnimateOnScroll key={member.id} variant="fade-up" delay={index * 150}>
                <Card
                  className="overflow-hidden"
                  data-testid={`team-member-${index}`}
                >
                  <CardContent className="p-6 md:p-8">
                    {/* Header: avatar + name + meta */}
                    <div className="flex items-center gap-5">
                      <Avatar className="h-16 w-16 md:h-20 md:w-20">
                        <AvatarFallback className="bg-primary/10 text-lg text-primary md:text-xl">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <h3 className="text-xl font-semibold md:text-2xl">{member.name}</h3>
                        <p className="text-primary">{member.role}</p>
                        {member.collegiateNum && (
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            N.º Colegiado: {member.collegiateNum}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Badges row: experience + specialties */}
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      {member.yearsOfExperience && (
                        <Badge variant="outline" className="gap-1 text-xs">
                          <Award className="h-3 w-3" />
                          {member.yearsOfExperience}+ años
                        </Badge>
                      )}
                      {member.specialties.map((specialty, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    {/* Bio */}
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      {member.extendedBio || member.bio}
                    </p>

                    {/* Footer: education + memberOf inline */}
                    {((member.education && member.education.length > 0) ||
                      (member.memberOf && member.memberOf.length > 0)) && (
                      <div className="mt-4 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:gap-8">
                        {member.education && member.education.length > 0 && (
                          <div className="flex items-start gap-2 text-sm text-muted-foreground">
                            <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span>{member.education[0]}</span>
                          </div>
                        )}
                        {member.memberOf && member.memberOf.length > 0 && (
                          <div className="flex items-start gap-2 text-sm text-muted-foreground">
                            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span>{member.memberOf[0]}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="bg-primary py-16 text-primary-foreground md:py-24"
        data-testid="about-stats"
      >
        <div className="container">
          <AnimateOnScroll variant="fade-up">
          <div className="mx-auto grid max-w-4xl gap-8 text-center md:grid-cols-4">
            <div>
              <div className="text-4xl font-bold md:text-5xl">
                <CountUp end={15} suffix="+" />
              </div>
              <div className="mt-2 text-primary-foreground/80">
                Años de experiencia
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold md:text-5xl">
                <CountUp end={5000} suffix="+" />
              </div>
              <div className="mt-2 text-primary-foreground/80">
                Pacientes atendidos
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold md:text-5xl">
                <CountUp end={rating} decimals={1} />
              </div>
              <div className="mt-2 text-primary-foreground/80">
                Valoración media
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold md:text-5xl">
                <CountUp end={100} suffix="%" />
              </div>
              <div className="mt-2 text-primary-foreground/80">
                Dedicación
              </div>
            </div>
          </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </>
  );
}
