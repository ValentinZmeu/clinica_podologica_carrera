# Plan: Optimización SEO de páginas de servicios para Local SEO, Maps y LLM

## Resumen

Las páginas de servicios individuales (`/servicios/[slug]`) tienen contenido muy fino (~300 caracteres de fullDesc, 0-2 FAQs). Al buscar "pie diabetico mostoles" en Google, la clínica no aparece en Maps. Necesitamos:

1. **Contenido profundo** (1500-2500 palabras por servicio) para YMYL/E-E-A-T
2. **JSON-LD mejorado** (MedicalWebPage + MedicalCondition + MedicalProcedure enriquecido)
3. **Optimización LLM** (TL;DR, estructura pregunta-respuesta, datos estructurados)
4. **SEO local** ("Móstoles" natural 5-8 veces, barrios, zona de servicio)

---

## Tareas de Implementación

### Fase 1: Modelo de datos expandido

**Archivos**: `src/types/data.ts`, `data/services.json`

- [x] Añadir interfaces auxiliares: ServiceSymptom, ServiceTreatmentStep, ServiceAuthor, ServiceContentSection, ServiceCondition, ServiceLocalContext
- [x] Añadir ~17 campos opcionales a `Service`

### Fase 2: Capa de datos

**Archivo**: `src/lib/data.ts`

- [x] Añadir `getTestimonialsByService(serviceSlug: string): Testimonial[]`
- [x] Añadir `getTeamMemberById(id: string): TeamMember | undefined`

### Fase 3: JSON-LD schemas mejorados

**Archivo**: `src/app/servicios/[slug]/page.tsx`

- [x] **MedicalWebPage (NUEVO)** - mainEntity, about, author con credentials, lastReviewed, medicalAudience
- [x] **MedicalProcedure (MEJORADO)** - procedureType, bodyLocation, howPerformed, preparation, followup, geo, aggregateRating, areaServed
- [x] **MedicalCondition (NUEVO)** - name, alternateName, description, associatedAnatomy, riskFactor[], signOrSymptom[], possibleTreatment
- [x] **FAQPage** - Con 6-8 FAQs por servicio
- [x] **BreadcrumbList** - Sin cambios

### Fase 4: Template de página rediseñado

**Archivo**: `src/app/servicios/[slug]/page.tsx`

- [x] Implementar layout grid 2/3 + 1/3 con sidebar
- [x] TL;DR box (callout destacado, fondo primary/5)
- [x] Sección "¿Qué es [condición]?" (fullDesc + condition)
- [x] Sección "Síntomas: cuándo acudir al podólogo" (grid de cards)
- [x] Sección "¿Quién necesita este tratamiento?" (checklist)
- [x] Sección "Cómo tratamos [nombre] en Móstoles" (timeline vertical)
- [x] Sección "Antes, durante y después" (preparation + aftercare + recovery)
- [x] Secciones adicionales (additionalSections)
- [x] FAQs expandidas (6-8 por servicio)
- [x] Author box (avatar, nombre, rol, lastReviewed) → señal E-E-A-T
- [x] Testimonios del servicio (filtrados)
- [x] Sidebar: info local (barrios, zona de servicio)
- [x] Sidebar: servicios relacionados (relatedServices)

### Fase 5: Metadata mejorada

**Archivo**: `src/app/servicios/[slug]/page.tsx` (generateMetadata)

- [x] `title`: usa `h1Override` si existe
- [x] `description`: usa `metaDescription` si existe (150-160 chars, incluye "Móstoles")
- [x] OG image: `service.image` como fallback
- [x] Twitter card: summary_large_image
- [x] `article:modified_time`: desde `lastReviewed`

### Fase 6: Contenido para los 8 servicios

**Archivo**: `data/services.json`

- [x] Contenido completo para `pie-diabetico`
- [x] Contenido completo para `unas-encarnadas`
- [x] Contenido completo para `quiropodia`
- [x] Contenido completo para `plantillas-personalizadas`
- [x] Contenido completo para `estudio-biomecanico`
- [x] Contenido completo para `podologia-deportiva`
- [x] Contenido completo para `papilomas-plantares`
- [x] Contenido completo para `hongos-unas`

### Verificación

- [x] `npx tsc --noEmit` → sin errores de tipos
- [x] `npm run build` → build exitoso (21 páginas estáticas)
- [ ] Abrir `/servicios/pie-diabetico` → verificar visualmente (pendiente despliegue)
- [ ] Validar JSON-LD con Rich Results Test (pendiente despliegue)
- [x] "Móstoles" aparece múltiples veces naturalmente en el contenido
- [x] Contenido expandido con FAQs, síntomas, proceso, aftercare por servicio

### Post-ejecución

- [x] Marcar todas las tareas como completadas
- [x] Mover plan de `pending/` a `_archive/`
- [x] Actualizar `docs/plans/README.md`

---

## Archivos Creados/Modificados

| Archivo | Acción | Estado |
|---------|--------|--------|
| `src/types/data.ts` | Modificar: 6 nuevas interfaces + ~17 campos opcionales en Service | ✅ |
| `data/services.json` | Modificar: contenido SEO expandido para 8 servicios | ✅ |
| `src/app/servicios/[slug]/page.tsx` | Modificar: 5 JSON-LD schemas, layout grid+sidebar, 13 secciones, metadata | ✅ |
| `src/lib/data.ts` | Modificar: getTestimonialsByService, getTeamMemberById | ✅ |
| `src/lib/constants.ts` | Solo lectura: coordenadas y datos ya existen | — |

---

## Progreso

- Inicio: 2026-02-15
- Fin: 2026-02-15
- Estado: **COMPLETADO**

## Historial

| Fecha | Descripción |
|-------|-------------|
| 2026-02-15 | Plan creado |
| 2026-02-15 | Fase 1 completada: modelo de datos expandido con 6 interfaces y ~17 campos opcionales |
| 2026-02-15 | Fase 2 completada: funciones getTestimonialsByService y getTeamMemberById |
| 2026-02-15 | Fase 6 completada: contenido SEO completo para los 8 servicios |
| 2026-02-15 | Fases 3-5 completadas: JSON-LD (MedicalWebPage, MedicalCondition, MedicalProcedure mejorado), template rediseñado con sidebar, metadata mejorada |
| 2026-02-15 | Verificación: tsc sin errores, build exitoso (21 páginas estáticas) |
| 2026-02-15 | Plan archivado |
