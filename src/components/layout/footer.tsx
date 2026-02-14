import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Star } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { siteConfig, navLinks } from '@/lib/constants';

export function Footer() {
  return (
    <footer
      className="relative z-50 border-t bg-background"
      data-testid="footer"
    >
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.webp"
                alt={`Logo de ${siteConfig.name}`}
                width={48}
                height={48}
                className="h-12 w-12"
                unoptimized
              />
              <h3 className="text-lg font-semibold">{siteConfig.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Tu clínica de podología de confianza en Móstoles. Cuidamos de la
              salud de tus pies con profesionalidad y cercanía.
            </p>
            <a
              href="https://www.google.com/maps/place/Clinica+Podol%C3%B3gica+Carrera/@40.3266811,-3.8639111,17z/data=!4m16!1m9!3m8!1s0xd418e81e5d565c3:0x8f1c87dfcd45852b!2sClinica+Podol%C3%B3gica+Carrera!8m2!3d40.326677!4d-3.8613362!9m1!1b1!16s%2Fg%2F11c2j39c56!3m5!1s0xd418e81e5d565c3:0x8f1c87dfcd45852b!8m2!3d40.326677!4d-3.8613362!16s%2Fg%2F11c2j39c56"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
              data-testid="footer-reviews-link"
            >
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{siteConfig.rating}</span>
              <span>en Google Reviews</span>
            </a>
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
          <div className="flex flex-col items-center gap-1 md:flex-row md:gap-0">
            <p>
              Made with <span className="text-red-500">&#10084;</span> by{' '}
              <a
                href="https://dev-dim.com"
                target="_blank"
                rel="noopener noreferrer"
                className="devdim-gradient font-semibold"
              >
                DevDim
              </a>
            </p>
            <p>
              <span className="hidden md:inline">{' '}·{' '}</span>
              © {new Date().getFullYear()} {siteConfig.name}.
            </p>
          </div>
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
