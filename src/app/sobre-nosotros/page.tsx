import { Metadata } from 'next';
import { Award, Heart, Users, Clock } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PageHero } from '@/components/layout/page-hero';
import { CTASection } from '@/components/sections/cta-section';
import { siteConfig } from '@/lib/constants';
import prisma from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Clínica Podológica Carrera - Móstoles',
  description:
    'Conoce al equipo de Clínica Podológica Carrera. Más de 15 años cuidando la salud de los pies de las familias de Móstoles. Podólogas colegiadas y formación continua.',
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
  ],
  openGraph: {
    title: 'Sobre Nosotros - Clínica Podológica Carrera',
    description:
      'Más de 15 años cuidando la salud de los pies de las familias de Móstoles.',
    url: `${siteConfig.url}/sobre-nosotros`,
    type: 'website',
  },
};

async function getTeamMembers() {
  return prisma.teamMember.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });
}

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

// JSON-LD Schema para AboutPage
const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Sobre Nosotros - Clínica Podológica Carrera',
  description:
    'Conoce al equipo de Clínica Podológica Carrera. Más de 15 años cuidando la salud de los pies.',
  url: `${siteConfig.url}/sobre-nosotros`,
  mainEntity: {
    '@type': 'MedicalBusiness',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    description: siteConfig.description,
  },
};

export default async function SobreNosotrosPage() {
  const teamMembers = await getTeamMembers();

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />

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
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
              Nuestra Historia
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Clínica Podológica Carrera nació con un objetivo claro: ofrecer
                una atención podológica de calidad, cercana y accesible a los
                vecinos de Móstoles y localidades cercanas.
              </p>
              <p>
                Desde nuestros inicios, hemos apostado por la formación continua
                y la incorporación de las técnicas más avanzadas, sin perder
                nunca la esencia de lo que nos define: un trato humano y
                personalizado.
              </p>
              <p>
                Hoy, después de más de 15 años, nos sentimos orgullosas de haber
                ayudado a miles de pacientes a cuidar la salud de sus pies,
                convirtiéndonos en la clínica de referencia para muchas familias
                de la zona sur de Madrid.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        className="bg-primary/5 py-16 md:py-24"
        data-testid="about-values"
      >
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Nuestros Valores
            </h2>
            <p className="text-lg text-muted-foreground">
              Los principios que guían nuestro trabajo cada día.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {values.map((value, index) => (
              <Card
                key={index}
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
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24" data-testid="about-team">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              El Equipo
            </h2>
            <p className="text-lg text-muted-foreground">
              Profesionales colegiadas comprometidas con tu salud podológica.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {teamMembers.map((member, index) => {
              const specialties = JSON.parse(member.specialties) as string[];
              const initials = member.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase();

              return (
                <Card
                  key={member.id}
                  className="overflow-hidden"
                  data-testid={`team-member-${index}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarFallback className="bg-primary/10 text-xl text-primary">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">{member.name}</h3>
                        <p className="text-primary">{member.role}</p>
                        {member.collegiateNum && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Nº Colegiado: {member.collegiateNum}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="mt-4 text-muted-foreground">{member.bio}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {specialties.map((specialty, i) => (
                        <Badge key={i} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
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
          <div className="mx-auto grid max-w-4xl gap-8 text-center md:grid-cols-4">
            <div>
              <div className="text-4xl font-bold md:text-5xl">15+</div>
              <div className="mt-2 text-primary-foreground/80">
                Años de experiencia
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold md:text-5xl">5000+</div>
              <div className="mt-2 text-primary-foreground/80">
                Pacientes atendidos
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold md:text-5xl">4.8</div>
              <div className="mt-2 text-primary-foreground/80">
                Valoración media
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold md:text-5xl">100%</div>
              <div className="mt-2 text-primary-foreground/80">
                Dedicación
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </>
  );
}
