# Plan: SEO Local, Maps y LLM para Inicio y Sobre Nosotros

## Resumen

Optimización SEO de las páginas de Inicio y Sobre Nosotros para Local SEO, Maps y LLM, replicando el enfoque aplicado a las páginas de servicios.

---

## Tareas de Implementación

### Fase 1: Expandir modelo TeamMember

- [x] Añadir 7 campos opcionales a `TeamMember`: education, certifications, yearsOfExperience, memberOf, sameAs, image, extendedBio
- [x] Enriquecer `data/team.json`: collegiateNum, education (2-3 por persona), certifications (3 por persona), yearsOfExperience (15, 10, 8), memberOf, extendedBio (100-150 palabras con "Móstoles")

### Fase 2: Home — Schemas y metadata

- [x] Añadir `metadata` con title, description, keywords, OG, Twitter, canonical
- [x] Enriquecer LocalBusiness con hasOfferCatalog (8 servicios), founder, numberOfEmployees, foundingDate
- [x] Corregir openingHoursSpecification (L-J mañana+tarde, V solo mañana)
- [x] Ampliar areaServed (7 ciudades)
- [x] Añadir WebSite schema con publisher
- [x] Añadir BreadcrumbList schema

### Fase 3: Sobre Nosotros — Schemas

- [x] Mejorar metadata: title, description, keywords ampliadas, OG, Twitter
- [x] Añadir Person/Podiatrist schema por cada miembro (hasCredential, alumniOf, memberOf, knowsAbout)
- [x] Añadir Organization schema (MedicalBusiness + Podiatrist, founder, employee[], areaServed, aggregateRating)
- [x] Añadir BreadcrumbList schema
- [x] Enriquecer AboutPage schema con mentions

### Fase 4: Sobre Nosotros — Contenido y secciones

- [x] Breadcrumb visual
- [x] Enriquecer Story con "Móstoles" y answer-first
- [x] Nueva sección "Formación y Compromiso Profesional" (E-E-A-T)
- [x] Expandir team cards: collegiateNum, yearsOfExperience badge, extendedBio, education con GraduationCap, memberOf badges

### Verificación

- [x] `npx tsc --noEmit` → sin errores
- [x] `npm run build` → build exitoso (21 páginas estáticas)

### Post-ejecución

- [x] Marcar todas las tareas como completadas
- [x] Mover plan de `pending/` a `_archive/`
- [x] Actualizar `docs/plans/README.md`

---

## Archivos Creados/Modificados

| Archivo | Acción | Estado |
|---------|--------|--------|
| `src/types/data.ts` | Modificar: 7 campos opcionales en TeamMember | ✅ |
| `data/team.json` | Modificar: enriquecer 3 miembros | ✅ |
| `src/app/page.tsx` | Modificar: metadata, WebSite schema, BreadcrumbList, LocalBusiness enriquecido | ✅ |
| `src/app/sobre-nosotros/page.tsx` | Modificar: Person/Organization/BreadcrumbList schemas, breadcrumb nav, sección credenciales, team cards expandidas | ✅ |

---

## Progreso

- Inicio: 2026-02-15
- Fin: 2026-02-15
- Estado: **COMPLETADO**

## Historial

| Fecha | Descripción |
|-------|-------------|
| 2026-02-15 | Plan creado |
| 2026-02-15 | Todas las fases completadas y verificadas |
| 2026-02-15 | Plan archivado |
