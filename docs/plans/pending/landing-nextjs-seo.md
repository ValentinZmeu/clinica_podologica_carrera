# Plan: Landing Page - Clínica Podológica Carrera

## Resumen

Crear una landing page optimizada para SEO local con Next.js + shadcn/ui + Tailwind + SQLite (Prisma).

## Progreso

- **Inicio**: 2026-01-06
- **Finalizado**: 2026-01-06
- **Estado**: **COMPLETADO** ✅

---

## Tareas de Implementación

### Fase 1: Setup Inicial ✅

- [x] Inicializar Next.js con TypeScript, Tailwind, ESLint, App Router
- [x] Configurar shadcn/ui
- [x] Configurar Prisma con SQLite
- [x] Crear estructura de carpetas
- [x] Configurar variables de entorno (.env)

### Fase 2: Base de Datos ✅

- [x] Definir schema Prisma completo
- [x] Ejecutar migración inicial
- [x] Crear seed con datos de data.json + servicios
- [x] Crear cliente Prisma singleton

### Fase 3: Layout y Componentes Base ✅

- [x] Instalar componentes shadcn/ui
- [x] Header con navegación responsive
- [x] Footer con datos de contacto
- [x] Botón flotante WhatsApp
- [x] Componentes de cards (ServiceCard, TestimonialCard)

### Fase 4: Landing Principal (/) ✅

- [x] Hero section con H1 optimizado
- [x] Sección de beneficios (4 cards)
- [x] Preview de servicios destacados
- [x] Proceso de atención (3 pasos)
- [x] Carousel de testimonios
- [x] Ubicación con mapa embebido
- [x] FAQ con accordion
- [x] CTA final

### Fase 5: Páginas de Servicios ✅

- [x] Listado de servicios (/servicios)
- [x] Template de servicio individual (/servicios/[slug])
- [x] generateMetadata dinámico para SEO
- [x] generateStaticParams para SSG
- [x] JSON-LD MedicalProcedure por servicio
- [x] FAQs específicos por servicio

### Fase 6: Páginas Adicionales ✅

- [x] Página sobre nosotros (/sobre-nosotros)
- [x] Página de contacto con formulario (/contacto)
- [x] API de contacto (/api/contact)
- [x] Formulario con validación Zod

### Fase 7: SEO y Optimización ✅

- [x] Sitemap dinámico (sitemap.ts)
- [x] Robots.txt (robots.ts)
- [x] JSON-LD schemas (LocalBusiness, FAQPage, MedicalProcedure, BreadcrumbList)
- [x] Metadata y OpenGraph por página

---

## Archivos Creados

| Archivo | Estado |
|---------|--------|
| `package.json` | ✅ |
| `tsconfig.json` | ✅ |
| `tailwind.config.ts` | ✅ |
| `next.config.mjs` | ✅ |
| `.env` / `.env.example` | ✅ |
| `prisma/schema.prisma` | ✅ |
| `prisma/seed.ts` | ✅ |
| `src/lib/prisma.ts` | ✅ |
| `src/lib/utils.ts` | ✅ |
| `src/lib/constants.ts` | ✅ |
| `src/app/globals.css` | ✅ |
| `src/app/layout.tsx` | ✅ |
| `src/app/page.tsx` | ✅ |
| `src/app/sitemap.ts` | ✅ |
| `src/app/robots.ts` | ✅ |
| `src/app/servicios/page.tsx` | ✅ |
| `src/app/servicios/[slug]/page.tsx` | ✅ |
| `src/app/sobre-nosotros/page.tsx` | ✅ |
| `src/app/contacto/page.tsx` | ✅ |
| `src/app/api/contact/route.ts` | ✅ |
| `src/components/layout/header.tsx` | ✅ |
| `src/components/layout/footer.tsx` | ✅ |
| `src/components/layout/whatsapp-button.tsx` | ✅ |
| `src/components/sections/hero.tsx` | ✅ |
| `src/components/sections/benefits.tsx` | ✅ |
| `src/components/sections/services-preview.tsx` | ✅ |
| `src/components/sections/process.tsx` | ✅ |
| `src/components/sections/testimonials.tsx` | ✅ |
| `src/components/sections/location.tsx` | ✅ |
| `src/components/sections/faq.tsx` | ✅ |
| `src/components/sections/cta-section.tsx` | ✅ |
| `src/components/cards/service-card.tsx` | ✅ |
| `src/components/cards/testimonial-card.tsx` | ✅ |
| `src/components/forms/contact-form.tsx` | ✅ |
| `src/components/ui/*` | ✅ |

---

## Historial

| Fecha | Descripción |
|-------|-------------|
| 2026-01-06 | Plan creado |
| 2026-01-06 | Fase 1 completada: Setup Next.js, Tailwind, shadcn/ui |
| 2026-01-06 | Fase 2 completada: Prisma, SQLite, seed con datos iniciales |
| 2026-01-06 | Fase 3 completada: Header, Footer, WhatsApp button, cards |
| 2026-01-06 | Fase 4 completada: Todas las secciones de la landing |
| 2026-01-06 | Fase 5 completada: Páginas de servicios con SSG |
| 2026-01-06 | Fase 6 completada: Sobre nosotros, Contacto, API |
| 2026-01-06 | Fase 7 completada: Sitemap, robots.txt, JSON-LD |
| 2026-01-06 | **PLAN COMPLETADO** - Commit: `cbee969` |
| 2026-01-06 | Mejoras opcionales: OG images, 404 page, +6 testimonios |

---

## Build Output

```text
Route (app)                                 Size     First Load JS
┌ ○ /                                       3.19 kB         112 kB
├ ○ /_not-found                             873 B          88.1 kB
├ ƒ /api/contact                            0 B                0 B
├ ○ /contacto                               25.6 kB         120 kB
├ ○ /robots.txt                             0 B                0 B
├ ○ /servicios                              175 B          96.1 kB
├ ● /servicios/[slug]                       844 B           110 kB
├   ├ /servicios/quiropodia
├   ├ /servicios/plantillas-personalizadas
├   ├ /servicios/estudio-biomecanico
├   └ [+5 more paths]
├ ○ /sitemap.xml                            0 B                0 B
└ ○ /sobre-nosotros                         2.86 kB        97.1 kB
```

---

## Información de Referencia

### Datos de la Clínica

- **Nombre**: Clínica Podológica Carrera
- **Dirección**: C. de la Carrera, 7, 28931 Móstoles, Madrid
- **Coordenadas**: 40.3264923, -3.8614242
- **Teléfono**: +34 912 26 88 58
- **WhatsApp**: +34 682 15 81 58
- **Web**: https://podologiacarrera.com
- **Horarios**: L-V 09:30-14:00 y 17:00-20:00 | S-D Cerrado
- **Rating**: 4.8 estrellas

### Páginas y Keywords SEO

| Ruta | Keywords Target |
|------|-----------------|
| `/` | "podólogo móstoles", "clínica podológica móstoles" |
| `/servicios` | "servicios podología móstoles" |
| `/servicios/quiropodia` | "quiropodia móstoles", "eliminar durezas pies" |
| `/servicios/plantillas-personalizadas` | "plantillas ortopédicas móstoles" |
| `/servicios/estudio-biomecanico` | "estudio pisada móstoles" |
| `/servicios/podologia-deportiva` | "podólogo deportivo móstoles" |
| `/servicios/unas-encarnadas` | "uñas encarnadas tratamiento" |
| `/servicios/pie-diabetico` | "pie diabético móstoles" |
| `/servicios/papilomas-plantares` | "papilomas pies móstoles" |
| `/servicios/hongos-unas` | "hongos uñas pies tratamiento" |
| `/sobre-nosotros` | "podólogo profesional móstoles" |
| `/contacto` | "cita podólogo móstoles" |

### Próximos Pasos (Opcional)

- [ ] Añadir imágenes reales de la clínica
- [x] Implementar Open Graph images personalizadas
- [x] Añadir más testimonios (9 testimonios totales)
- [ ] Validar Core Web Vitals en producción
- [ ] Test en Google Rich Results
- [x] Implementar página 404 personalizada
