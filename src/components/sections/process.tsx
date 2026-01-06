import { Calendar, Stethoscope, HeartHandshake, ChevronRight } from 'lucide-react';

const steps = [
  {
    icon: Calendar,
    step: '01',
    title: 'Pide tu Cita',
    description:
      'Llámanos o escríbenos por WhatsApp. Te daremos cita lo antes posible en el horario que mejor te convenga.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Stethoscope,
    step: '02',
    title: 'Diagnóstico Completo',
    description:
      'Evaluamos el estado de tus pies, escuchamos tus necesidades y te explicamos el mejor tratamiento.',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: HeartHandshake,
    step: '03',
    title: 'Tratamiento Personalizado',
    description:
      'Aplicamos el tratamiento adaptado a ti. Saldrás con los pies renovados y un plan de cuidado.',
    gradient: 'from-emerald-500 to-teal-500',
  },
];

export function Process() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" data-testid="process-section">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-accent-100 px-4 py-1.5 text-sm font-medium text-accent-700">
            Proceso Simple
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            ¿Cómo{' '}
            <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              Funciona?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Tres sencillos pasos para comenzar a cuidar la salud de tus pies.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative"
                data-testid={`process-step-${index + 1}`}
              >
                {/* Connector arrow */}
                {index < steps.length - 1 && (
                  <div className="absolute -right-4 top-16 z-10 hidden md:block">
                    <ChevronRight className="h-8 w-8 text-muted-foreground/30" />
                  </div>
                )}

                <div className="relative overflow-hidden rounded-2xl border bg-card p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  {/* Step number background */}
                  <div className="absolute -right-4 -top-4 text-8xl font-black text-muted/10">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div
                    className={`relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <step.icon className="h-10 w-10" />
                  </div>

                  {/* Step badge */}
                  <span
                    className={`mb-4 inline-block rounded-full bg-gradient-to-r ${step.gradient} px-3 py-1 text-xs font-bold text-white`}
                  >
                    Paso {step.step}
                  </span>

                  <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Bottom line */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${step.gradient} opacity-0 transition-opacity group-hover:opacity-100`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
