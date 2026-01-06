'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { siteConfig, navLinks } from '@/lib/constants';
import { formatWhatsAppUrl } from '@/lib/utils';

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      data-testid="header"
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2"
          data-testid="nav-home-link"
        >
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
              href={`tel:${siteConfig.phone}`}
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

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              data-testid="nav-mobile-menu-button"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" data-testid="nav-mobile-menu">
            <SheetHeader>
              <SheetTitle>{siteConfig.name}</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                  data-testid={`nav-mobile-${link.label.toLowerCase().replace(' ', '-')}-link`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-2">
                <Button variant="outline" asChild>
                  <a href={`tel:${siteConfig.phone}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    {siteConfig.phone}
                  </a>
                </Button>
                <Button asChild>
                  <a
                    href={formatWhatsAppUrl(
                      siteConfig.whatsapp,
                      'Hola, me gustaría pedir una cita'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pedir Cita por WhatsApp
                  </a>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
