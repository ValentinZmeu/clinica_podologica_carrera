import Link from 'next/link';
import {
  Footprints,
  Layers,
  Activity,
  Dumbbell,
  Scissors,
  Heart,
  CircleDot,
  Sparkles,
  LucideIcon,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const iconMap: Record<string, LucideIcon> = {
  Footprints,
  Layers,
  Activity,
  Dumbbell,
  Scissors,
  Heart,
  CircleDot,
  Sparkles,
};

interface ServiceCardProps {
  slug: string;
  name: string;
  shortDesc: string;
  icon?: string | null;
  isFeatured?: boolean;
}

export function ServiceCard({
  slug,
  name,
  shortDesc,
  icon,
  isFeatured,
}: ServiceCardProps) {
  const Icon = icon ? iconMap[icon] || Footprints : Footprints;

  return (
    <Card
      className="group transition-all hover:shadow-lg"
      data-testid={`service-card-${slug}`}
    >
      <CardHeader>
        <div className="mb-2 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="h-6 w-6" />
          </div>
          {isFeatured && (
            <Badge variant="secondary" className="text-xs">
              Destacado
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription className="line-clamp-2">{shortDesc}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/servicios/${slug}`}>Más información</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
