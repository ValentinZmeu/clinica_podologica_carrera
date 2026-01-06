import { Calendar, Stethoscope, HeartHandshake } from 'lucide-react';

const steps = [
  {
    icon: Calendar,
    step: '1',
    title: 'Pide tu Cita',
    description:
      'Llámanos o escríbenos por WhatsApp. Te daremos cita lo antes posible en el horario que mejor te convenga.',
  },
  {
    icon: Stethoscope,
    step: '2',
    title: 'Diagnóstico Completo',
    description:
      'Evaluamos el estado de tus pies, escuchamos tus necesidades y te explicamos el mejor tratamiento.',
  },
  {
    icon: HeartHandshake,
    step: '3',
    title: 'Tratamiento Personalizado',
    description:
      'Aplicamos el tratamiento adaptado a ti. Saldrás con los pies renovados y un plan de cuidado.',
  },
];

export function Process() {
  return (
    <section className="py-16 md:py-24" data-testid="process-section">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            ¿Cómo Funciona?
          </h2>
          <p className="text-lg text-muted-foreground">
            Tres sencillos pasos para cuidar de la salud de tus pies.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center"
              data-testid={`process-step-${index + 1}`}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-12 hidden h-0.5 w-full bg-border md:block" />
              )}

              {/* Step circle */}
              <div className="relative mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                <step.icon className="h-10 w-10 text-primary" />
                <span className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {step.step}
                </span>
              </div>

              <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
