import { cache } from 'react';
import { readFileSync } from 'fs';
import { join } from 'path';

import type { Service, Testimonial, TeamMember, FAQ } from '@/types/data';

/**
 * Lee un archivo JSON desde la carpeta data/
 */
function readJsonFile<T>(filename: string): T {
  const filePath = join(process.cwd(), 'data', filename);
  const content = readFileSync(filePath, 'utf-8');
  return JSON.parse(content) as T;
}

/**
 * Obtiene todos los servicios
 */
export const getServices = cache((): Service[] => {
  return readJsonFile<Service[]>('services.json');
});

/**
 * Obtiene los servicios activos ordenados
 */
export const getActiveServices = cache((): Service[] => {
  return getServices()
    .filter((s) => s.isActive)
    .sort((a, b) => a.order - b.order);
});

/**
 * Obtiene los servicios destacados
 */
export const getFeaturedServices = cache((): Service[] => {
  return getActiveServices()
    .filter((s) => s.isFeatured)
    .slice(0, 3);
});

/**
 * Obtiene un servicio por slug
 */
export const getServiceBySlug = cache((slug: string): Service | undefined => {
  return getServices().find((s) => s.slug === slug);
});

/**
 * Obtiene otros servicios (excluyendo uno por slug)
 */
export const getOtherServices = cache(
  (currentSlug: string, limit = 3): Service[] => {
    return getActiveServices()
      .filter((s) => s.slug !== currentSlug)
      .slice(0, limit);
  }
);

/**
 * Obtiene todos los testimonios
 */
export const getTestimonials = cache((): Testimonial[] => {
  return readJsonFile<Testimonial[]>('testimonials.json');
});

/**
 * Obtiene los testimonios activos
 */
export const getActiveTestimonials = cache((): Testimonial[] => {
  return getTestimonials().filter((t) => t.isActive);
});

/**
 * Obtiene los testimonios destacados
 */
export const getFeaturedTestimonials = cache((): Testimonial[] => {
  return getActiveTestimonials()
    .filter((t) => t.isFeatured)
    .slice(0, 3);
});

/**
 * Obtiene todos los miembros del equipo
 */
export const getTeamMembers = cache((): TeamMember[] => {
  return readJsonFile<TeamMember[]>('team.json');
});

/**
 * Obtiene los miembros del equipo activos ordenados
 */
export const getActiveTeamMembers = cache((): TeamMember[] => {
  return getTeamMembers()
    .filter((m) => m.isActive)
    .sort((a, b) => a.order - b.order);
});

/**
 * Obtiene todas las FAQs
 */
export const getFAQs = cache((): FAQ[] => {
  return readJsonFile<FAQ[]>('faqs.json');
});

/**
 * Obtiene las FAQs activas ordenadas
 */
export const getActiveFAQs = cache((): FAQ[] => {
  return getFAQs()
    .filter((f) => f.isActive)
    .sort((a, b) => a.order - b.order);
});

/**
 * Obtiene los slugs de todos los servicios activos (para generateStaticParams)
 */
export const getServiceSlugs = cache((): string[] => {
  return getActiveServices().map((s) => s.slug);
});
