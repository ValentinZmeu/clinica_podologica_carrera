import { Award, Heart, MapPin, Sparkles } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

const benefits = [
  {
    icon: Award,
    title: 'Profesionales Colegiados',
    description:
      'Equipo de podólogas tituladas y colegiadas con formación continua y años de experiencia.',
  },
  {
    icon: Heart,
    title: 'Trato Personalizado',
    description:
      'Cada paciente es único. Escuchamos tus necesidades y diseñamos el tratamiento perfecto para ti.',
  },
  {
    icon: Sparkles,
    title: 'Tecnología Avanzada',
    description:
      'Equipamiento moderno para diagnósticos precisos y tratamientos efectivos.',
  },
  {
    icon: MapPin,
    title: 'En el Centro de Móstoles',
    description:
      'Ubicación céntrica y accesible. Fácil aparcamiento y transporte público cerca.',
  },
];

export function Benefits() {
  return (
    <section className="py-16 md:py-24" data-testid="benefits-section">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-lg text-muted-foreground">
            Más de 15 años cuidando la salud de los pies de las familias de
            Móstoles y alrededores.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="border-0 bg-muted/50 transition-all hover:bg-muted"
              data-testid={`benefit-card-${index}`}
            >
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
