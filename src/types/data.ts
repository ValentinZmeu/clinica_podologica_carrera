/**
 * Tipos para los datos de la clínica
 */

export interface ServiceFAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  benefits: string[];
  duration: string;
  icon: string | null;
  keywords: string;
  order: number;
  isActive: boolean;
  isFeatured: boolean;
  faqs: ServiceFAQ[];
}

export interface Testimonial {
  id: string;
  name: string;
  initials: string | null;
  location: string | null;
  rating: number;
  content: string;
  service: string | null;
  isVerified: boolean;
  source: string | null;
  isFeatured: boolean;
  isActive: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  collegiateNum: string | null;
  order: number;
  isActive: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  order: number;
  isActive: boolean;
}
