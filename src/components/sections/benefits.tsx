import { Award, Heart, MapPin, Sparkles } from 'lucide-react';

const benefits = [
  {
    icon: Award,
    title: 'Profesionales Colegiados',
    description:
      'Equipo de podólogas tituladas y colegiadas con formación continua y años de experiencia.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Heart,
    title: 'Trato Personalizado',
    description:
      'Cada paciente es único. Escuchamos tus necesidades y diseñamos el tratamiento perfecto para ti.',
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    icon: Sparkles,
    title: 'Tecnología Avanzada',
    description:
      'Equipamiento moderno para diagnósticos precisos y tratamientos efectivos.',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: MapPin,
    title: 'En el Centro de Móstoles',
    description:
      'Ubicación céntrica y accesible. Fácil aparcamiento y transporte público cerca.',
    gradient: 'from-amber-500 to-orange-500',
  },
];

export function Benefits() {
  return (
    <section className="relative py-24 md:py-32" data-testid="benefits-section">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-primary-100/50 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-accent-100/50 blur-3xl" />
      </div>

      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700">
            ¿Por qué elegirnos?
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Más de 15 años cuidando{' '}
            <span className="text-primary-500">
              la salud de tus pies
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Somos la clínica de referencia para las familias de Móstoles y
            alrededores.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              data-testid={`benefit-card-${index}`}
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
              />

              <div
                className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${benefit.gradient} text-white shadow-lg`}
              >
                <benefit.icon className="h-7 w-7" />
              </div>

              <h3 className="mb-3 text-xl font-semibold">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>

              {/* Decorative corner */}
              <div
                className={`absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br ${benefit.gradient} opacity-10 transition-transform duration-300 group-hover:scale-150`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
