import { Star } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface TestimonialCardProps {
  name: string;
  initials?: string | null;
  location?: string | null;
  rating: number;
  content: string;
  source?: string | null;
}

export function TestimonialCard({
  name,
  initials,
  location,
  rating,
  content,
  source,
}: TestimonialCardProps) {
  return (
    <Card className="h-full" data-testid={`testimonial-card-${name.replace(/\s/g, '-').toLowerCase()}`}>
      <CardContent className="flex h-full flex-col p-6">
        {/* Rating */}
        <div className="mb-4 flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-muted text-muted'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <blockquote className="mb-4 flex-1 text-muted-foreground">
          &ldquo;{content}&rdquo;
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-primary">
              {initials || name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-muted-foreground">
              {location}
              {source === 'google' && ' • Google'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
