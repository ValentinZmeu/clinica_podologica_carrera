import { cn } from '@/lib/utils';

interface AccordionItemProps {
  value: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

export function NativeAccordionItem({
  value,
  trigger,
  children,
  className,
  defaultOpen = false,
}: AccordionItemProps) {
  return (
    <details
      name="accordion"
      className={cn('group border-b-0 px-4', className)}
      data-testid={`accordion-item-${value}`}
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between py-5 font-semibold transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
        {trigger}
        <svg
          className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="pb-5 pl-12 text-muted-foreground leading-relaxed">
        {children}
      </div>
    </details>
  );
}

interface NativeAccordionProps {
  children: React.ReactNode;
  className?: string;
}

export function NativeAccordion({ children, className }: NativeAccordionProps) {
  return <div className={cn('w-full', className)}>{children}</div>;
}
