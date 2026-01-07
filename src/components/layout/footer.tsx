import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { siteConfig, navLinks } from '@/lib/constants';

export function Footer() {
  return (
    <footer
      className="border-t bg-muted/50"
      data-testid="footer"
    >
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt={`Logo de ${siteConfig.name}`}
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <h3 className="text-lg font-semibold">{siteConfig.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Tu clínica de podología de confianza en Móstoles. Cuidamos de la
              salud de tus pies con profesionalidad y cercanía.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Enlaces</h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contacto</h3>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a
                href={`tel:${siteConfig.phoneLink}`}
                className="flex items-center gap-2 hover:text-primary"
                data-testid="footer-phone-link"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 hover:text-primary"
                data-testid="footer-email-link"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.email}
              </a>
              <a
                href={siteConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-primary"
                data-testid="footer-address-link"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{siteConfig.fullAddress}</span>
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Horario</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Lunes a Jueves</p>
                  <p>{siteConfig.schedule.weekdays}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 opacity-0" />
                <div>
                  <p className="font-medium text-foreground">Viernes</p>
                  <p>{siteConfig.schedule.friday}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 opacity-0" />
                <div>
                  <p className="font-medium text-foreground">Fines de Semana</p>
                  <p>{siteConfig.schedule.weekend}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-4">
            <Link href="/privacidad" className="hover:text-primary">
              Política de Privacidad
            </Link>
            <Link href="/cookies" className="hover:text-primary">
              Cookies
            </Link>
            <Link href="/aviso-legal" className="hover:text-primary">
              Aviso Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
