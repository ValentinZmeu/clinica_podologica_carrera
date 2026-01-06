import Link from 'next/link';
import { Home, Phone, ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/constants';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="mx-auto max-w-md">
        {/* 404 Number */}
        <div className="mb-8">
          <span className="text-9xl font-bold text-primary/20">404</span>
        </div>

        {/* Message */}
        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          Página no encontrada
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Lo sentimos, la página que buscas no existe o ha sido movida. Pero no
          te preocupes, ¡tus pies siguen en buenas manos!
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Volver al Inicio
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}>
              <Phone className="mr-2 h-4 w-4" />
              Llamar Ahora
            </a>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 border-t pt-8">
          <p className="mb-4 text-sm font-medium text-muted-foreground">
            ¿Buscabas alguna de estas páginas?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/servicios"
              className="text-sm text-primary hover:underline"
            >
              Nuestros Servicios
            </Link>
            <Link
              href="/contacto"
              className="text-sm text-primary hover:underline"
            >
              Contacto
            </Link>
            <Link
              href="/sobre-nosotros"
              className="text-sm text-primary hover:underline"
            >
              Sobre Nosotros
            </Link>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Ir a la página principal
          </Link>
        </div>
      </div>
    </div>
  );
}
