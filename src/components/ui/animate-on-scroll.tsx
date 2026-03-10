'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type AnimationVariant =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'fade-in'
  | 'scale-up';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

export function AnimateOnScroll({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.15,
  once = true,
  className,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      el.classList.add('aos-visible');
      return;
    }

    el.classList.add('aos-init');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.setProperty('--aos-delay', `${delay}ms`);
          el.style.setProperty('--aos-duration', `${duration}ms`);
          el.classList.remove('aos-init');
          el.classList.add('aos-visible');

          if (once) {
            observer.unobserve(el);
          }
        } else if (!once) {
          el.classList.remove('aos-visible');
          el.classList.add('aos-init');
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [delay, duration, threshold, once]);

  return (
    <div ref={ref} className={cn(`aos-${variant}`, className)}>
      {children}
    </div>
  );
}
