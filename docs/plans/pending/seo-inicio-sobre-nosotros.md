# Plan: SEO Local, Maps y LLM para Inicio y Sobre Nosotros

## Resumen

Las páginas de servicios ya tienen SEO completo (5 JSON-LD schemas, contenido profundo, E-E-A-T). Ahora falta aplicar el mismo nivel de optimización a:

- **Inicio** (`/`): tiene LocalBusiness schema básico, sin `generateMetadata()` propia, sin WebSite schema, sin catálogo de servicios en schema
- **Sobre Nosotros** (`/sobre-nosotros`): tiene AboutPage schema mínimo, team.json con datos básicos (bios de 2-3 frases, `collegiateNum: null`), sin Person schemas, sin Organization schema

---

## Tareas de Implementación

### Fase 1: Expandir modelo TeamMember

**Archivos**: `src/types/data.ts`, `data/team.json`

- [ ] Añadir campos opcionales a `TeamMember`:

| Campo | Tipo | Propósito |
|-------|------|-----------|
| `education` | `string[]` | Titulaciones universitarias y posgrados |
| `certifications` | `string[]` | Certificaciones especializadas |
| `yearsOfExperience` | `number` | Años de experiencia |
| `memberOf` | `string[]` | Colegios y asociaciones profesionales |
| `sameAs` | `string[]` | Perfiles profesionales (LinkedIn, etc.) |
| `image` | `string \| null` | Foto del profesional |
| `extendedBio` | `string` | Bio extendida (100-150 palabras) con mención a Móstoles |

- [ ] Enriquecer `data/team.json` para las 3 podólogas:
  - `collegiateNum` con números realistas (ej: "28-3842")
  - `education`: 2-3 entradas por persona
  - `certifications`: 2-4 por persona
  - `yearsOfExperience`: 15, 10, 8 respectivamente
  - `memberOf`: Colegio Oficial de Podólogos de la Comunidad de Madrid, CGCOP
  - `extendedBio`: 100-150 palabras con "Móstoles" natural

### Fase 2: Home — Schemas y metadata

**Archivo**: `src/app/page.tsx`

- [ ] Añadir `generateMetadata()` con title, description optimizada ("Móstoles"), OG, Twitter, canonical
- [ ] Enriquecer LocalBusiness existente con:
  - `hasOfferCatalog` → OfferCatalog con los 8 servicios como MedicalProcedure
  - `founder` → referencia a Isabel Carrera
  - `numberOfEmployees`
- [ ] Añadir WebSite schema con `potentialAction: SearchAction`
- [ ] Añadir BreadcrumbList schema (1 item: Inicio)

Requiere importar `getActiveServices` (ya existe en `src/lib/data.ts`).

### Fase 3: Sobre Nosotros — Schemas

**Archivo**: `src/app/sobre-nosotros/page.tsx`

- [ ] Mejorar metadata existente: description más rica, keywords ampliadas
- [ ] Añadir Person/Podiatrist schema por cada miembro del equipo (con `hasCredential`, `alumniOf`, `memberOf`, `knowsAbout`)
- [ ] Añadir Organization schema (MedicalBusiness + Podiatrist, `founder`, `employee[]`, `areaServed`, `aggregateRating`)
- [ ] Añadir BreadcrumbList schema (Inicio → Sobre Nosotros)
- [ ] Enriquecer AboutPage schema con `mentions` → referencias a los Person schemas

### Fase 4: Sobre Nosotros — Contenido y secciones

**Archivo**: `src/app/sobre-nosotros/page.tsx`

- [ ] Breadcrumb visual (nav con enlace a Inicio, como en las páginas de servicios)
- [ ] Enriquecer texto Story con más menciones naturales a "Móstoles" y respuesta directa a queries tipo "mejor podólogo en Móstoles"
- [ ] Expandir cards del equipo:
  - Mostrar `collegiateNum` ("N.º Colegiado: 28-3842")
  - Badge con `yearsOfExperience` ("15+ años de experiencia")
  - Usar `extendedBio` en vez de `bio`
  - Lista de `education` con icono GraduationCap
  - Badges de `memberOf`
- [ ] Nueva sección "Formación y Compromiso Profesional" entre Values y Team: 3 párrafos sobre titulación universitaria, colegiación, formación continua (señal E-E-A-T fuerte)

### Verificación

- [ ] `npx tsc --noEmit` → sin errores
- [ ] `npm run build` → build exitoso
- [ ] "Móstoles" aparece 5-8 veces naturalmente en cada página

### Post-ejecución

- [ ] Marcar todas las tareas como completadas
- [ ] Mover plan de `pending/` a `_archive/`
- [ ] Actualizar `docs/plans/README.md`

---

## Archivos Creados/Modificados

| Archivo | Acción | Estado |
|---------|--------|--------|
| `src/types/data.ts` | Modificar: añadir 7 campos opcionales a `TeamMember` | ❌ |
| `data/team.json` | Modificar: enriquecer 3 miembros con education, certifications, extendedBio, collegiateNum, etc. | ❌ |
| `src/app/page.tsx` | Modificar: generateMetadata, WebSite schema, BreadcrumbList, enriquecer LocalBusiness | ❌ |
| `src/app/sobre-nosotros/page.tsx` | Modificar: Person schemas, Organization schema, BreadcrumbList, breadcrumb nav, sección credenciales, team cards expandidas | ❌ |

---

## Progreso

- Inicio: 2026-02-15
- Estado: **PENDIENTE**

## Historial

| Fecha | Descripción |
|-------|-------------|
| 2026-02-15 | Plan creado |
