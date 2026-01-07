import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { siteConfig, navLinks } from '@/lib/constants';
import { formatWhatsAppUrl } from '@/lib/utils';

// Lazy load mobile nav - only loads JavaScript when needed on mobile
const MobileNav = dynamic(
  () => import('./mobile-nav').then((mod) => mod.MobileNav),
  { ssr: false }
);

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/10 backdrop-blur supports-[backdrop-filter]:bg-background/85"
      data-testid="header"
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          data-testid="nav-home-link"
        >
          <Image
            src="/images/logo.png"
            alt={`Logo de ${siteConfig.name}`}
            width={40}
            height={40}
            className="h-10 w-10"
            priority
          />
          <span className="text-xl font-bold text-primary-600">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex md:items-center md:gap-6"
          data-testid="nav-desktop"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              data-testid={`nav-${link.label.toLowerCase().replace(' ', '-')}-link`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex md:items-center md:gap-2">
          <Button variant="outline" size="sm" asChild>
            <a
              href={`tel:${siteConfig.phoneLink}`}
              data-testid="nav-call-button"
            >
              <Phone className="mr-2 h-4 w-4" />
              Llamar
            </a>
          </Button>
          <Button size="sm" asChild>
            <a
              href={formatWhatsAppUrl(
                siteConfig.whatsapp,
                'Hola, me gustaría pedir una cita'
              )}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="nav-whatsapp-button"
            >
              Pedir Cita
            </a>
          </Button>
        </div>

        {/* Mobile Menu - Lazy loaded */}
        <MobileNav />
      </div>
    </header>
  );
}
