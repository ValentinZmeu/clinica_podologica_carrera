import { HelpCircle, MessageCircle } from 'lucide-react';

import {
  NativeAccordion,
  NativeAccordionItem,
} from '@/components/ui/native-accordion';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import { siteConfig } from '@/lib/constants';
import { formatWhatsAppUrl } from '@/lib/utils';

async function getFAQs() {
  return prisma.fAQ.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      order: 'asc',
    },
  });
}

export async function FAQ() {
  const faqs = await getFAQs();

  // Schema JSON-LD para FAQPage
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" data-testid="faq-section">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute left-0 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-accent-100/30 blur-3xl" />
      </div>

      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-100 px-4 py-1.5">
            <HelpCircle className="h-4 w-4 text-accent-600" />
            <span className="text-sm font-medium text-accent-700">
              Dudas Resueltas
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Preguntas{' '}
            <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              Frecuentes
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Resolvemos tus dudas más comunes sobre nuestros servicios,
            tratamientos y cómo trabajamos.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border bg-card p-2 shadow-lg">
            <NativeAccordion>
              {faqs.map((faq, index) => (
                <NativeAccordionItem
                  key={faq.id}
                  value={faq.id}
                  trigger={
                    <span className="flex items-center text-left">
                      <span className="mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-sm font-bold text-white">
                        {index + 1}
                      </span>
                      {faq.question}
                    </span>
                  }
                  data-testid={`faq-item-${index}`}
                >
                  {faq.answer}
                </NativeAccordionItem>
              ))}
            </NativeAccordion>
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <p className="mb-4 text-muted-foreground">
              ¿Tienes más preguntas? Estamos aquí para ayudarte.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
              asChild
            >
              <a
                href={formatWhatsAppUrl(
                  siteConfig.whatsapp,
                  'Hola, tengo una consulta sobre los servicios de la clínica'
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Pregúntanos por WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
