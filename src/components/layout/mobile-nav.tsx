'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, X, Menu, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { siteConfig, navLinks } from '@/lib/constants';
import { formatWhatsAppUrl } from '@/lib/utils';

const EDGE_ZONE = 24; // px from right edge to start swipe-open
const SWIPE_THRESHOLD = 80; // px to commit open/close

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isPeeking, setIsPeeking] = React.useState(false); // panel visible but following drag-to-open
  const [dragOffset, setDragOffset] = React.useState<number | null>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const backdropRef = React.useRef<HTMLDivElement>(null);
  const touchStart = React.useRef<{ x: number; y: number; time: number } | null>(null);
  const panelWidth = React.useRef(0);

  // Peek refs (for global edge-swipe, can't use React state in native listeners)
  const peekRef = React.useRef({ active: false, startX: 0, startY: 0, startTime: 0, dx: 0 });

  const showPanel = isOpen || isPeeking;

  // --- Open / Close ---
  const open = React.useCallback(() => {
    setIsPeeking(false);
    setIsOpen(true);
    setDragOffset(null);
    document.body.style.overflow = 'hidden';
    // Double-rAF ensures browser paints off-screen position before animating in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (panelRef.current) {
          panelRef.current.style.transition = 'transform 200ms ease';
          panelRef.current.style.transform = 'translateX(0)';
        }
      });
    });
  }, []);

  const close = React.useCallback(() => {
    setDragOffset(null);
    setIsPeeking(false);
    setIsOpen(false);
    document.body.style.overflow = '';
  }, []);

  const animateClose = React.useCallback(() => {
    if (panelRef.current) {
      panelRef.current.style.transition = 'transform 200ms ease';
      panelRef.current.style.transform = 'translateX(100%)';
    }
    setTimeout(close, 200);
  }, [close]);

  const snapBack = React.useCallback(() => {
    if (panelRef.current) {
      panelRef.current.style.transition = 'transform 200ms ease';
      panelRef.current.style.transform = 'translateX(0)';
    }
    setDragOffset(null);
  }, []);

  // Measure panel width once it renders
  React.useEffect(() => {
    if (showPanel && panelRef.current) {
      panelWidth.current = panelRef.current.offsetWidth;
    }
  }, [showPanel]);

  // --- Edge swipe to open with drag effect ---
  React.useEffect(() => {
    const peek = peekRef.current;

    function onTouchStart(e: TouchEvent) {
      if (isOpen || isPeeking) return;
      const touch = e.touches[0];
      const fromRight = window.innerWidth - touch.clientX;
      if (fromRight <= EDGE_ZONE) {
        peek.active = true;
        peek.startX = touch.clientX;
        peek.startY = touch.clientY;
        peek.startTime = Date.now();
        peek.dx = 0;
        // Show panel in peeking state (starts off-screen)
        setIsPeeking(true);
        document.body.style.overflow = 'hidden';
      }
    }

    function onTouchMove(e: TouchEvent) {
      if (!peek.active) return;
      const touch = e.touches[0];
      const dx = peek.startX - touch.clientX; // positive = dragging left (opening)
      const dy = Math.abs(touch.clientY - peek.startY);

      // Cancel if vertical
      if (dy > Math.abs(dx) && peek.dx === 0) {
        peek.active = false;
        setIsPeeking(false);
        document.body.style.overflow = '';
        return;
      }

      peek.dx = Math.max(0, dx);
    }

    function onTouchEnd() {
      if (!peek.active) return;
      const dx = peek.dx;
      const elapsed = Date.now() - peek.startTime;
      const velocity = dx / elapsed;
      peek.active = false;

      if (dx > SWIPE_THRESHOLD || velocity > 0.5) {
        // Commit open
        setIsPeeking(false);
        setIsOpen(true);
        setDragOffset(null);
      } else {
        // Cancel - close peek
        setIsPeeking(false);
        document.body.style.overflow = '';
      }
    }

    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [isOpen, isPeeking]);

  // Animate peeking panel position via rAF
  React.useEffect(() => {
    if (!isPeeking) return;
    const peek = peekRef.current;
    let raf: number;

    function tick() {
      if (panelRef.current && panelWidth.current > 0) {
        const clamped = Math.min(peek.dx, panelWidth.current);
        const offset = panelWidth.current - clamped;
        panelRef.current.style.transition = 'none';
        panelRef.current.style.transform = `translateX(${offset}px)`;
        // Update backdrop opacity to follow drag
        if (backdropRef.current) {
          backdropRef.current.style.opacity = String(clamped / panelWidth.current);
        }
      }
      if (peek.active) {
        raf = requestAnimationFrame(tick);
      }
    }

    // Start off-screen with backdrop hidden
    if (panelRef.current) {
      panelRef.current.style.transition = 'none';
      panelRef.current.style.transform = 'translateX(100%)';
      panelWidth.current = panelRef.current.offsetWidth;
    }
    if (backdropRef.current) {
      backdropRef.current.style.opacity = '0';
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isPeeking]);

  // When transitioning from peek to open, animate snap
  React.useEffect(() => {
    if (isOpen && panelRef.current) {
      panelRef.current.style.transition = 'transform 200ms ease';
      panelRef.current.style.transform = 'translateX(0)';
    }
  }, [isOpen]);

  // --- Panel drag to close ---
  const onPanelTouchStart = React.useCallback((e: React.TouchEvent) => {
    if (isPeeking) return; // Don't interfere with peek gesture
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
    panelWidth.current = panelRef.current?.offsetWidth ?? 300;
    if (panelRef.current) {
      panelRef.current.style.transition = 'none';
    }
  }, [isPeeking]);

  const onPanelTouchMove = React.useCallback((e: React.TouchEvent) => {
    if (!touchStart.current || isPeeking) return;
    const dx = e.touches[0].clientX - touchStart.current.x;
    const dy = Math.abs(e.touches[0].clientY - touchStart.current.y);
    if (dy > Math.abs(dx) && dragOffset === null) return;
    if (dx > 0) {
      setDragOffset(dx);
      if (panelRef.current) {
        panelRef.current.style.transform = `translateX(${dx}px)`;
      }
    }
  }, [dragOffset, isPeeking]);

  const onPanelTouchEnd = React.useCallback(() => {
    if (!touchStart.current || isPeeking) return;
    const offset = dragOffset ?? 0;
    const velocity = touchStart.current
      ? offset / (Date.now() - touchStart.current.time)
      : 0;
    touchStart.current = null;

    if (offset > SWIPE_THRESHOLD || velocity > 0.5) {
      animateClose();
    } else {
      snapBack();
    }
  }, [dragOffset, isPeeking, animateClose, snapBack]);

  // Backdrop opacity
  let backdropOpacity = 1;
  if (isPeeking && panelWidth.current > 0) {
    backdropOpacity = Math.max(0, peekRef.current.dx / panelWidth.current);
  } else if (dragOffset !== null && panelWidth.current > 0) {
    backdropOpacity = Math.max(0, 1 - dragOffset / panelWidth.current);
  }

  return (
    <>
      {/* Trigger Button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={open}
        data-testid="nav-mobile-menu-button"
        aria-label="Abrir menú"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Overlay + Panel */}
      {showPanel && (
        <>
          {/* Backdrop */}
          <div
            ref={backdropRef}
            className="fixed inset-0 h-screen z-40 bg-black/60 backdrop-blur-sm cursor-pointer"
            style={{ opacity: backdropOpacity }}
            onClick={isOpen ? animateClose : undefined}
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            ref={panelRef}
            className="fixed top-0 right-0 z-50 h-screen w-4/5 max-w-sm border-l bg-white p-6 shadow-2xl overflow-y-auto flex flex-col"
            style={{ transform: 'translateX(100%)' }}
            data-testid="nav-mobile-menu"
            role="dialog"
            aria-modal="true"
            onTouchStart={onPanelTouchStart}
            onTouchMove={onPanelTouchMove}
            onTouchEnd={onPanelTouchEnd}
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
                onClick={animateClose}
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
                  onClick={animateClose}
                  data-testid={`nav-mobile-${link.label.toLowerCase().replace(' ', '-')}-link`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons - pinned to bottom */}
            <div className="mt-auto flex flex-col gap-2 pt-6">
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
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Contactar por WhatsApp
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href={siteConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Cómo llegar
                </a>
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
