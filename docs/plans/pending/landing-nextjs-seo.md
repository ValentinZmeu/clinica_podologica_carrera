# Plan: Landing Page - Clínica Podológica Carrera

## Resumen

Crear una landing page optimizada para SEO local con Next.js + shadcn/ui + Tailwind + SQLite (Prisma).

## Progreso

- **Inicio**: 2026-01-06
- **Estado**: **EN PROGRESO** (Fases 1, 2 y 3 completadas)

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
- [ ] Implementar queries en `/src/data/`
- [x] Crear cliente Prisma singleton

### Fase 3: Layout y Componentes Base ✅

- [x] Instalar componentes shadcn/ui
- [x] Header con navegación responsive
- [x] Footer con datos de contacto
- [x] Botón flotante WhatsApp
- [x] Componentes de cards (ServiceCard, TestimonialCard)

### Fase 4: Landing Principal (/) ⬜

- [ ] Hero section con H1 optimizado
- [ ] Sección de beneficios (4 cards)
- [ ] Preview de servicios destacados
- [ ] Proceso de atención (3 pasos)
- [ ] Carousel de testimonios
- [ ] Sección del equipo
- [ ] Ubicación con mapa embebido
- [ ] FAQ con accordion
- [ ] CTA final con formulario

### Fase 5: Páginas de Servicios ⬜

- [ ] Listado de servicios (/servicios)
- [ ] Template de servicio individual (/servicios/[slug])
- [ ] generateMetadata dinámico para SEO
- [ ] generateStaticParams para SSG
- [ ] JSON-LD MedicalWebPage por servicio

### Fase 6: Páginas Adicionales ⬜

- [ ] Página sobre nosotros (/sobre-nosotros)
- [ ] Página de contacto con formulario (/contacto)
- [ ] API de contacto (/api/contact)
- [ ] Página 404 personalizada

### Fase 7: SEO y Optimización ⬜

- [ ] Sitemap dinámico (sitemap.ts)
- [ ] Robots.txt (robots.ts)
- [ ] JSON-LD schemas completos
- [ ] Open Graph images
- [ ] Optimización de imágenes (next/image)
- [ ] Validar Core Web Vitals
- [ ] Test en Google Rich Results

---

## Archivos Creados/Modificados

| Archivo | Acción | Estado |
|---------|--------|--------|
| `package.json` | Crear | ✅ |
| `tsconfig.json` | Crear | ✅ |
| `tailwind.config.ts` | Crear | ✅ |
| `next.config.mjs` | Crear | ✅ |
| `.env` | Crear | ✅ |
| `.env.example` | Crear | ✅ |
| `prisma/schema.prisma` | Crear | ✅ |
| `prisma/seed.ts` | Crear | ✅ |
| `src/lib/prisma.ts` | Crear | ✅ |
| `src/lib/utils.ts` | Crear | ✅ |
| `src/lib/constants.ts` | Crear | ❌ |
| `src/app/globals.css` | Crear | ✅ |
| `src/app/layout.tsx` | Crear | ✅ |
| `src/app/page.tsx` | Crear | ✅ |
| `src/app/sitemap.ts` | Crear | ❌ |
| `src/app/robots.ts` | Crear | ❌ |
| `src/app/not-found.tsx` | Crear | ❌ |
| `src/app/servicios/page.tsx` | Crear | ❌ |
| `src/app/servicios/[slug]/page.tsx` | Crear | ❌ |
| `src/app/sobre-nosotros/page.tsx` | Crear | ❌ |
| `src/app/contacto/page.tsx` | Crear | ❌ |
| `src/app/api/contact/route.ts` | Crear | ❌ |
| `src/components/layout/header.tsx` | Crear | ❌ |
| `src/components/layout/footer.tsx` | Crear | ❌ |
| `src/components/layout/mobile-nav.tsx` | Crear | ❌ |
| `src/components/layout/whatsapp-button.tsx` | Crear | ❌ |
| `src/components/sections/hero.tsx` | Crear | ❌ |
| `src/components/sections/benefits.tsx` | Crear | ❌ |
| `src/components/sections/services-preview.tsx` | Crear | ❌ |
| `src/components/sections/process.tsx` | Crear | ❌ |
| `src/components/sections/testimonials.tsx` | Crear | ❌ |
| `src/components/sections/team.tsx` | Crear | ❌ |
| `src/components/sections/location.tsx` | Crear | ❌ |
| `src/components/sections/faq.tsx` | Crear | ❌ |
| `src/components/sections/cta-section.tsx` | Crear | ❌ |
| `src/components/cards/service-card.tsx` | Crear | ❌ |
| `src/components/cards/testimonial-card.tsx` | Crear | ❌ |
| `src/components/forms/contact-form.tsx` | Crear | ❌ |
| `src/components/seo/json-ld.tsx` | Crear | ❌ |
| `src/data/services.ts` | Crear | ❌ |
| `src/data/testimonials.ts` | Crear | ❌ |
| `src/data/faqs.ts` | Crear | ❌ |

---

## Historial

| Fecha | Descripción |
|-------|-------------|
| 2026-01-06 | Plan creado |
| 2026-01-06 | Fase 1 completada: Setup Next.js, Tailwind, shadcn/ui |
| 2026-01-06 | Fase 2 completada: Prisma, SQLite, seed con datos iniciales |
| 2026-01-06 | Fase 3 completada: Header, Footer, WhatsApp button, ServiceCard, TestimonialCard |

---

## Información de Referencia

### Datos de la Clínica

- **Nombre**: Clínica Podológica Carrera
- **Dirección**: C. de la Carrera, 7, 28931 Móstoles, Madrid
- **Coordenadas**: 40.3264923, -3.8614242
- **Teléfono**: +34 912 26 88 58
- **WhatsApp**: +34 682 15 81 58
- **Web**: https://podologiacarrera.com
- **Google Maps**: https://goo.gl/maps/yB9gMJqHqM6VBGen9
- **Horarios**: L-V 09:30-14:00 y 17:00-20:00 | S-D Cerrado
- **Rating**: 4.8 estrellas

### Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Primary 500 | `#0ea5e9` | Sky blue - color principal |
| Primary 600 | `#0284c7` | Sky blue - hover |
| Accent 500 | `#10b981` | Emerald - acentos |
| Accent 600 | `#059669` | Emerald - hover |

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

### Secciones de la Landing

1. **Hero** - H1: "Clínica Podológica en Móstoles" + CTAs (WhatsApp, Llamar)
2. **Benefits** - 4 beneficios clave
3. **Services Preview** - Grid de servicios destacados (quiropodía, plantillas)
4. **Process** - 3 pasos: Cita → Diagnóstico → Tratamiento
5. **Testimonials** - Carousel con reseñas reales
6. **Team** - Equipo: Isabel, Cristina
7. **Location** - Mapa Google + dirección + horarios
8. **FAQ** - Preguntas frecuentes con accordion
9. **Final CTA** - "Pide tu cita" + formulario rápido

### Dependencias Principales

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "@prisma/client": "^5.15.0",
    "react-hook-form": "^7.52.0",
    "@hookform/resolvers": "^3.6.0",
    "zod": "^3.23.0",
    "lucide-react": "^0.394.0",
    "embla-carousel-react": "^8.1.0"
  }
}
```

### Schema Prisma (Resumen)

- `Service` - Servicios de la clínica
- `ServiceFAQ` - FAQs por servicio
- `FAQ` - FAQs generales
- `Testimonial` - Testimonios de pacientes
- `TeamMember` - Miembros del equipo
- `SiteConfig` - Configuración del sitio
- `ContactMessage` - Mensajes de contacto

### Competidores

| Competidor | URL | Fortaleza |
|------------|-----|-----------|
| Clínica 70.3 | clinica703.com | Posicionamiento local Móstoles |
| Podoplus | podoplus.es | 20 años experiencia, zona sur |
| Podoactiva | podoactiva.com | Cadena con fuerte SEO nacional |
