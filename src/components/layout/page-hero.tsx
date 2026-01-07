import { LucideIcon } from 'lucide-react';

interface PageHeroProps {
  badge: string;
  badgeIcon: LucideIcon;
  title: string;
  titleHighlight?: string;
  description: string;
}

export function PageHero({
  badge,
  badgeIcon: BadgeIcon,
  title,
  titleHighlight,
  description,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 py-20 md:py-28">
      {/* Background elements - optimized for performance */}
      <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary-500/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" aria-hidden="true" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <BadgeIcon className="h-4 w-4 text-primary-400" />
            <span className="text-sm font-medium text-white/90">{badge}</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            {title}{' '}
            {titleHighlight && (
              <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                {titleHighlight}
              </span>
            )}
          </h1>
          <p className="text-lg text-white/70 md:text-xl">{description}</p>
        </div>
      </div>
    </section>
  );
}
