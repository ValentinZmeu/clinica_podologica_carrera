import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { getIconComponent } from '@/lib/icons';

const gradients = [
  'from-blue-500 to-cyan-500',
  'from-violet-500 to-purple-500',
  'from-rose-500 to-pink-500',
  'from-amber-500 to-orange-500',
  'from-emerald-500 to-teal-500',
  'from-indigo-500 to-blue-500',
];

interface ServiceCardProps {
  slug: string;
  name: string;
  shortDesc: string;
  icon?: string | null;
  isFeatured?: boolean;
  index?: number;
}

export function ServiceCard({
  slug,
  name,
  shortDesc,
  icon,
  isFeatured,
  index = 0,
}: ServiceCardProps) {
  const Icon = getIconComponent(icon);
  const gradient = gradients[index % gradients.length];

  return (
    <Link
      href={`/servicios/${slug}`}
      className="group relative block overflow-hidden rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      data-testid={`service-card-${slug}`}
    >
      {/* Background gradient on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
      />

      {/* Featured badge */}
      {isFeatured && (
        <Badge className={`absolute right-4 top-4 bg-gradient-to-r ${gradient} border-0 text-white`}>
          Destacado
        </Badge>
      )}

      {/* Icon */}
      <div
        className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon className="h-7 w-7" />
      </div>

      {/* Content */}
      <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">
        {name}
      </h3>
      <p className="mb-4 line-clamp-2 text-muted-foreground leading-relaxed">
        {shortDesc}
      </p>

      {/* Arrow indicator */}
      <div className="flex items-center text-sm font-medium text-primary">
        <span>Más información</span>
        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </div>

      {/* Decorative corner */}
      <div
        className={`absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br ${gradient} opacity-10 transition-transform duration-300 group-hover:scale-150`}
      />
    </Link>
  );
}
