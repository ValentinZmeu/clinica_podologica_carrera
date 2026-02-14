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

- [ ] Añadir interfaces auxiliares:
  ```typescript
  interface ServiceSymptom { name: string; description: string; }
  interface ServiceTreatmentStep { step: number; title: string; description: string; }
  interface ServiceAuthor { name: string; role: string; teamMemberId: string; }
  interface ServiceContentSection { heading: string; body: string; listItems?: string[]; }
  ```
- [ ] Añadir campos opcionales a `Service`:

| Campo | Tipo | Propósito |
|-------|------|-----------|
| `metaDescription` | `string` | Meta desc optimizada (150-160 chars con "Móstoles") |
| `h1Override` | `string` | H1 tipo "Tratamiento de Pie Diabético en Móstoles" |
| `tldr` | `string` | Resumen 2-3 frases para LLM (answer-first) |
| `condition` | `object` | MedicalCondition: name, alternateName, description, bodyLocation, riskFactors[], affectedPopulation |
| `symptoms` | `ServiceSymptom[]` | Síntomas que indican necesidad del servicio |
| `whoNeedsIt` | `string[]` | Público objetivo (quién necesita este tratamiento) |
| `treatmentProcess` | `ServiceTreatmentStep[]` | Proceso paso a paso del tratamiento en clínica |
| `preparation` | `string` | Qué traer/hacer antes de la cita |
| `aftercare` | `string[]` | Cuidados posteriores |
| `recoveryTimeline` | `string` | Tiempo de recuperación |
| `additionalSections` | `ServiceContentSection[]` | Secciones únicas por servicio |
| `relatedServices` | `string[]` | Slugs de servicios complementarios |
| `procedureType` | `string` | "NoninvasiveProcedure" / "PercutaneousProcedure" |
| `author` | `ServiceAuthor` | Autora/revisora del contenido (E-E-A-T) |
| `lastReviewed` | `string` | Fecha última revisión médica (ISO 8601) |
| `references` | `string[]` | Referencias médicas citadas |
| `localContext` | `object` | neighborhoods[], nearbyLandmarks[], serviceArea[] |

### Fase 2: Capa de datos

**Archivo**: `src/lib/data.ts`

- [ ] Añadir `getTestimonialsByService(serviceSlug: string): Testimonial[]` (filtra testimonials.json por campo "service")
- [ ] Añadir `getTeamMemberById(id: string): TeamMember | undefined` (para el author box)

### Fase 3: JSON-LD schemas mejorados

**Archivo**: `src/app/servicios/[slug]/page.tsx`

De 3 schemas actuales → 4-5 schemas:

- [ ] **MedicalWebPage (NUEVO)** - Wrapper que indica contenido médico autorizado
  - `mainEntity` → referencia al MedicalProcedure
  - `about` → referencia al MedicalCondition
  - `author` con credentials, `lastReviewed`, `medicalAudience: Patient`
- [ ] **MedicalProcedure (MEJORADO)** - Añadir:
  - `procedureType`, `bodyLocation`, `howPerformed` (pasos concatenados)
  - `preparation`, `followup` (aftercare concatenado)
  - Provider con `geo` (coordenadas de siteConfig) y `aggregateRating`
  - `areaServed` con ciudades del localContext
- [ ] **MedicalCondition (NUEVO)** - Solo si `service.condition` existe:
  - `name`, `alternateName`, `description`
  - `associatedAnatomy` (bodyLocation)
  - `riskFactor[]` como MedicalRiskFactor
  - `signOrSymptom[]` desde symptoms
  - `possibleTreatment` → ref al MedicalProcedure
- [ ] **FAQPage** - Sin cambios de schema, pero con 5-10 FAQs por servicio
- [ ] **BreadcrumbList** - Sin cambios

### Fase 4: Template de página rediseñado

**Archivo**: `src/app/servicios/[slug]/page.tsx`

Orden de secciones (cada una renderiza solo si hay datos):

```
1. Schemas JSON-LD
2. Breadcrumb
3. Hero: H1 (h1Override o "Nombre en Móstoles"), shortDesc, badges (duración, tipo)
4. Grid contenido (2/3) + sidebar (1/3):
   a. TL;DR box (callout destacado, fondo primary/5)
   b. "¿Qué es [condición]?" (fullDesc + condition.description + affectedPopulation)
   c. "Síntomas: cuándo acudir al podólogo" (symptoms como grid de cards)
   d. "¿Quién necesita este tratamiento?" (whoNeedsIt como checklist)
   e. "Cómo tratamos [nombre] en Móstoles" (treatmentProcess como timeline vertical)
   f. "Antes, durante y después" (preparation + aftercare + recoveryTimeline)
   g. "Beneficios" (benefits existentes)
   h. Secciones adicionales (additionalSections)
   i. "Preguntas frecuentes" (FAQs expandidas, 5-10)
   j. Author box (avatar, nombre, rol, lastReviewed) → señal E-E-A-T
   k. Testimonios del servicio (filtrados de testimonials.json)
   --- Sidebar ---
   l. CTA card (sin cambios)
   m. Info local (barrios, zona de servicio, landmarks)
   n. Servicios relacionados (relatedServices)
5. "Otros servicios" (existente)
```

- [ ] Implementar layout grid 2/3 + 1/3 con sidebar
- [ ] TL;DR box (callout destacado, fondo primary/5)
- [ ] Sección "¿Qué es [condición]?" (fullDesc + condition)
- [ ] Sección "Síntomas: cuándo acudir al podólogo" (grid de cards)
- [ ] Sección "¿Quién necesita este tratamiento?" (checklist)
- [ ] Sección "Cómo tratamos [nombre] en Móstoles" (timeline vertical)
- [ ] Sección "Antes, durante y después" (preparation + aftercare + recovery)
- [ ] Secciones adicionales (additionalSections)
- [ ] FAQs expandidas (5-10 por servicio)
- [ ] Author box (avatar, nombre, rol, lastReviewed) → señal E-E-A-T
- [ ] Testimonios del servicio (filtrados)
- [ ] Sidebar: info local (barrios, zona de servicio, landmarks)
- [ ] Sidebar: servicios relacionados (relatedServices)

> Nota: No se crean archivos separados para los sub-componentes. Son secciones condicionales dentro de la misma page.tsx.

### Fase 5: Metadata mejorada

**Archivo**: `src/app/servicios/[slug]/page.tsx` (generateMetadata)

- [ ] `title`: usa `h1Override` si existe
- [ ] `description`: usa `metaDescription` si existe (150-160 chars, incluye "Móstoles")
- [ ] OG image: `service.image` como fallback si no hay ogImage
- [ ] Twitter card: summary_large_image
- [ ] `article:modified_time`: desde `lastReviewed`

### Fase 6: Contenido para los 8 servicios

**Archivo**: `data/services.json`

Escribir contenido completo en español para cada servicio. Prioridad:

1. **pie-diabetico** (el ejemplo del usuario)
2. **unas-encarnadas** (alta demanda)
3. **quiropodia** (servicio estrella)
4. Los 5 restantes

- [ ] Contenido completo para `pie-diabetico`
- [ ] Contenido completo para `unas-encarnadas`
- [ ] Contenido completo para `quiropodia`
- [ ] Contenido completo para `plantillas-personalizadas`
- [ ] Contenido completo para `estudio-biomecanico`
- [ ] Contenido completo para `podologia-deportiva`
- [ ] Contenido completo para `papilomas-plantares`
- [ ] Contenido completo para `hongos-unas`

Cada servicio tendrá: metaDescription, h1Override, tldr, condition (con riskFactors), symptoms (4-6), whoNeedsIt (4-5), treatmentProcess (4-6 pasos), preparation, aftercare (5-6 items), recoveryTimeline, 6-8 FAQs, author, lastReviewed, references, localContext, relatedServices.

### Verificación

- [ ] `npx tsc --noEmit` → sin errores de tipos
- [ ] `npm run build` → build exitoso
- [ ] Abrir `/servicios/pie-diabetico` → verificar todas las secciones renderizan
- [ ] Validar JSON-LD con Rich Results Test
- [ ] Verificar que "Móstoles" aparece 5-8 veces naturalmente en el contenido
- [ ] Comprobar que el contenido tiene ~1500-2500 palabras por página

### Post-ejecución

- [ ] Marcar todas las tareas como completadas
- [ ] Mover plan de `pending/` a `_archive/`
- [ ] Actualizar `docs/plans/README.md`

---

## Archivos Creados/Modificados

| Archivo | Acción | Estado |
|---------|--------|--------|
| `src/types/data.ts` | Modificar: nuevos tipos e interfaces | ❌ |
| `data/services.json` | Modificar: contenido expandido para 8 servicios | ❌ |
| `src/app/servicios/[slug]/page.tsx` | Modificar: schemas, metadata, secciones nuevas | ❌ |
| `src/lib/data.ts` | Modificar: getTestimonialsByService, getTeamMemberById | ❌ |
| `src/lib/constants.ts` | Solo lectura: coordenadas y datos ya existen | — |

---

## Progreso

- Inicio: 2026-02-15
- Estado: **PENDIENTE**

## Historial

| Fecha | Descripción |
|-------|-------------|
| 2026-02-15 | Plan creado |
