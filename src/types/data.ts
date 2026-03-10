/**
 * Tipos para los datos de la clínica
 */

export interface ServiceFAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface ServiceSymptom {
  name: string;
  description: string;
}

export interface ServiceTreatmentStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceAuthor {
  name: string;
  role: string;
  teamMemberId: string;
}

export interface ServiceContentSection {
  heading: string;
  body: string;
  listItems?: string[];
}

export interface ServiceCondition {
  name: string;
  alternateName?: string[];
  description: string;
  bodyLocation?: string;
  riskFactors?: string[];
  affectedPopulation?: string;
}

export interface ServiceLocalContext {
  neighborhoods?: string[];
  nearbyLandmarks?: string[];
  serviceArea?: string[];
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  benefits: string[];
  duration: string;
  image: string | null;
  icon: string | null;
  keywords: string;
  order: number;
  isActive: boolean;
  isFeatured: boolean;
  faqs: ServiceFAQ[];
  metaDescription?: string;
  h1Override?: string;
  tldr?: string;
  condition?: ServiceCondition;
  symptoms?: ServiceSymptom[];
  whoNeedsIt?: string[];
  treatmentProcess?: ServiceTreatmentStep[];
  preparation?: string;
  aftercare?: string[];
  recoveryTimeline?: string;
  additionalSections?: ServiceContentSection[];
  relatedServices?: string[];
  procedureType?: string;
  author?: ServiceAuthor;
  lastReviewed?: string;
  references?: string[];
  localContext?: ServiceLocalContext;
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
  education?: string[];
  certifications?: string[];
  yearsOfExperience?: number;
  memberOf?: string[];
  sameAs?: string[];
  image?: string | null;
  extendedBio?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  order: number;
  isActive: boolean;
}
