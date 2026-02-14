export const SEL = {
  // Layout
  header: 'header',
  navHomeLink: 'nav-home-link',
  navDesktop: 'nav-desktop',
  navCallButton: 'nav-call-button',
  navWhatsappButton: 'nav-whatsapp-button',
  navMobileMenuButton: 'nav-mobile-menu-button',
  navMobileMenu: 'nav-mobile-menu',
  footer: 'footer',
  footerPhoneLink: 'footer-phone-link',
  footerEmailLink: 'footer-email-link',
  footerAddressLink: 'footer-address-link',
  whatsappFloat: 'whatsapp-float-button',

  // Home sections
  heroSection: 'hero-section',
  heroWhatsappButton: 'hero-whatsapp-button',
  heroCallButton: 'hero-call-button',
  benefitsSection: 'benefits-section',
  servicesSection: 'services-section',
  servicesViewAllLink: 'services-view-all-link',
  processSection: 'process-section',
  testimonialsSection: 'testimonials-section',
  locationSection: 'location-section',
  faqSection: 'faq-section',
  ctaSection: 'cta-section',
  ctaWhatsappButton: 'cta-whatsapp-button',
  ctaCallButton: 'cta-call-button',

  // Services page
  servicesGrid: 'services-grid',
  servicesBenefits: 'services-benefits',

  // Service detail
  breadcrumb: 'breadcrumb',
  serviceHero: 'service-hero',
  serviceContent: 'service-content',
  serviceWhatsappCta: 'service-whatsapp-cta',
  servicePhoneCta: 'service-phone-cta',
  otherServices: 'other-services',

  // About page
  aboutStory: 'about-story',
  aboutValues: 'about-values',
  aboutTeam: 'about-team',
  aboutStats: 'about-stats',

  // Contact page
  contactMethods: 'contact-methods',
  contactWhatsappBtn: 'contact-whatsapp-btn',
  contactPhoneBtn: 'contact-phone-btn',
  contactMap: 'contact-map',

  // Dynamic helpers
  serviceCard: (slug: string) => `service-card-${slug}`,
  benefitCard: (index: number) => `benefit-card-${index}`,
  processStep: (n: number) => `process-step-${n}`,
  valueCard: (index: number) => `value-card-${index}`,
  teamMember: (index: number) => `team-member-${index}`,
  faqItem: (index: number) => `faq-item-${index}`,
  benefit: (index: number) => `benefit-${index}`,
  serviceFaq: (index: number) => `service-faq-${index}`,
  navLink: (label: string) =>
    `nav-${label.toLowerCase().replace(/\s/g, '-')}-link`,
  navMobileLink: (label: string) =>
    `nav-mobile-${label.toLowerCase().replace(/\s/g, '-')}-link`,
};
