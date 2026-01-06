'use client';

import { MessageCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/constants';
import { formatWhatsAppUrl } from '@/lib/utils';

export function WhatsAppButton() {
  return (
    <a
      href={formatWhatsAppUrl(
        siteConfig.whatsapp,
        'Hola, me gustaría pedir una cita en la Clínica Podológica Carrera'
      )}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
      data-testid="whatsapp-float-button"
      aria-label="Contactar por WhatsApp"
    >
      <Button
        size="lg"
        className="h-14 w-14 rounded-full bg-green-500 p-0 shadow-lg hover:bg-green-600"
      >
        <MessageCircle className="h-7 w-7" />
      </Button>
    </a>
  );
}
