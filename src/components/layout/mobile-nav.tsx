'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, X, Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { siteConfig, navLinks } from '@/lib/constants';
import { formatWhatsAppUrl } from '@/lib/utils';

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleClose = React.useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 200); // Match animation duration
  }, []);

  const handleOpen = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <>
      {/* Trigger Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={handleOpen}
        data-testid="nav-mobile-menu-button"
        aria-label="Abrir menú"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Overlay + Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 h-screen z-40 bg-black/60 backdrop-blur-sm cursor-pointer transition-opacity duration-200 ${
              isClosing ? 'opacity-0' : 'animate-in fade-in-0'
            }`}
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            className={`fixed top-0 right-0 z-50 h-screen w-4/5 max-w-sm border-l bg-white p-6 shadow-2xl overflow-y-auto transition-transform duration-200 ${
              isClosing ? 'translate-x-full' : 'animate-in slide-in-from-right'
            }`}
            data-testid="nav-mobile-menu"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/logo.png"
                  alt={`Logo de ${siteConfig.name}`}
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
                <span className="text-lg font-semibold">{siteConfig.name}</span>
              </div>
              <button
                className="rounded-sm p-1 opacity-70 transition-opacity hover:opacity-100"
                onClick={handleClose}
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="mt-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={handleClose}
                  data-testid={`nav-mobile-${link.label.toLowerCase().replace(' ', '-')}-link`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-4 flex flex-col gap-2">
                <Button variant="outline" asChild>
                  <a href={`tel:${siteConfig.phoneLink}`}>
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
          </div>
        </>
      )}
    </>
  );
}
