import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { getIconComponent } from '@/lib/icons';

interface ServiceCardProps {
  slug: string;
  name: string;
  shortDesc: string;
  image?: string | null;
  icon?: string | null;
  isFeatured?: boolean;
}

export function ServiceCard({
  slug,
  name,
  shortDesc,
  image,
  icon,
  isFeatured,
}: ServiceCardProps) {
  const Icon = getIconComponent(icon);

  return (
    <Link
      href={`/servicios/${slug}`}
      className="group relative block overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      data-testid={`service-card-${slug}`}
    >
      {/* Image area */}
      <div className="relative aspect-video overflow-hidden">
        {image ? (
          <>
            <Image
              src={image}
              alt={`Servicio de ${name} en Clínica Podológica Carrera`}
              fill
              className="object-cover saturate-[0.3] brightness-[0.85] transition-[filter] duration-[400ms] ease-in-out group-hover:saturate-100 group-hover:brightness-100"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Teal overlay */}
            <div className="absolute inset-0 bg-[rgba(13,59,59,0.3)] transition-opacity duration-[400ms] ease-in-out group-hover:opacity-0" />
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-primary/10">
            <Icon className="h-12 w-12 text-primary/40" />
          </div>
        )}

        {/* Featured badge */}
        {isFeatured && (
          <Badge className="absolute right-3 top-3 border-0 bg-primary text-white shadow-md">
            Destacado
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
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
      </div>
    </Link>
  );
}
