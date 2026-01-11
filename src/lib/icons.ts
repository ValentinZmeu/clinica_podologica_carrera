import {
  Footprints,
  Layers,
  Activity,
  Dumbbell,
  Scissors,
  Heart,
  CircleDot,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

/**
 * Mapa de nombres de iconos a componentes de Lucide React
 */
export const iconMap: Record<string, LucideIcon> = {
  Footprints,
  Layers,
  Activity,
  Dumbbell,
  Scissors,
  Heart,
  CircleDot,
  Sparkles,
};

/**
 * Obtiene el componente de icono a partir de su nombre
 * @param iconName - Nombre del icono
 * @param fallback - Icono por defecto si no se encuentra
 * @returns Componente de icono
 */
export function getIconComponent(
  iconName?: string | null,
  fallback: LucideIcon = Footprints
): LucideIcon {
  if (!iconName) return fallback;
  return iconMap[iconName] || fallback;
}
