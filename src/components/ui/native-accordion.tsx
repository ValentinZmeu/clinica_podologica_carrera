'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AccordionItemProps {
  value: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function NativeAccordionItem({
  value,
  trigger,
  children,
  className,
  isOpen = false,
  onToggle,
}: AccordionItemProps) {
  return (
    <div
      className={cn('border-b last:border-b-0 px-4', className)}
      data-testid={`accordion-item-${value}`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between py-5 font-semibold transition-colors hover:text-primary"
        aria-expanded={isOpen}
      >
        {trigger}
        <svg
          className={cn(
            'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300',
            isOpen && 'rotate-180'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-in-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-5 pl-12 text-muted-foreground leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

interface NativeAccordionProps {
  children: React.ReactNode;
  className?: string;
  defaultValue?: string;
}

export function NativeAccordion({ children, className, defaultValue }: NativeAccordionProps) {
  const [openItem, setOpenItem] = useState<string | null>(defaultValue ?? null);

  const items = Array.isArray(children) ? children : [children];

  return (
    <div className={cn('w-full', className)}>
      {items.map((child) => {
        if (!child || typeof child !== 'object' || !('props' in child)) return child;
        const itemValue = child.props.value as string;
        return {
          ...child,
          key: itemValue,
          props: {
            ...child.props,
            isOpen: openItem === itemValue,
            onToggle: () => setOpenItem(openItem === itemValue ? null : itemValue),
          },
        };
      })}
    </div>
  );
}
