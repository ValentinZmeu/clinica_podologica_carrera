'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email no válido'),
  phone: z
    .string()
    .min(9, 'El teléfono debe tener al menos 9 dígitos')
    .optional()
    .or(z.literal('')),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>(
    'idle'
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el mensaje');
      }

      setSubmitStatus('success');
      reset();
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      data-testid="contact-form"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Nombre *</Label>
        <Input
          id="name"
          placeholder="Tu nombre"
          {...register('name')}
          aria-invalid={errors.name ? 'true' : 'false'}
          data-testid="contact-name-input"
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          placeholder="tu@email.com"
          {...register('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
          data-testid="contact-email-input"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Teléfono (opcional)</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="612 345 678"
          {...register('phone')}
          aria-invalid={errors.phone ? 'true' : 'false'}
          data-testid="contact-phone-input"
        />
        {errors.phone && (
          <p className="text-sm text-destructive">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mensaje *</Label>
        <Textarea
          id="message"
          placeholder="Cuéntanos en qué podemos ayudarte..."
          rows={4}
          {...register('message')}
          aria-invalid={errors.message ? 'true' : 'false'}
          data-testid="contact-message-input"
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      {submitStatus === 'success' && (
        <div
          className="rounded-md bg-green-50 p-4 text-green-800"
          data-testid="contact-success-message"
        >
          ¡Mensaje enviado correctamente! Te responderemos lo antes posible.
        </div>
      )}

      {submitStatus === 'error' && (
        <div
          className="rounded-md bg-destructive/10 p-4 text-destructive"
          data-testid="contact-error-message"
        >
          Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo o
          contacta por teléfono.
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
        data-testid="contact-submit-btn"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          'Enviar mensaje'
        )}
      </Button>

      <p className="text-xs text-muted-foreground">
        * Campos obligatorios. Tus datos serán tratados de forma confidencial.
      </p>
    </form>
  );
}
