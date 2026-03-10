# Plan: Google Places API — Datos completos dinámicos

## Resumen

Expandir la integración de Google Places API para usar **todos los datos útiles** en una sola petición (mismo cache 24h, mismo coste). Reemplazar datos estáticos (horarios, reseñas) por datos dinámicos de Google.

## Tareas de Implementación

### Fase 1: Expandir `src/lib/google-places.ts`

- [x] Crear interfaz `GooglePlaceData` con todos los campos
- [x] Ampliar FieldMask: `rating,userRatingCount,regularOpeningHours,reviews,googleMapsUri,businessStatus`
- [x] Crear función `getGooglePlaceData()` que parsea la respuesta completa
- [x] Parsear `regularOpeningHours.weekdayDescriptions` al formato `schedule.weekdays/friday/weekend`
- [x] Parsear `regularOpeningHours.periods` para JSON-LD `openingHoursSpecification`
- [x] Parsear `reviews` (authorName, rating, text, relativeTime, profilePhotoUrl)
- [x] Mantener `getGoogleRating()` como wrapper fino (para OG/twitter images en edge runtime)
- [x] Fallback completo a `siteConfig` si la API falla

### Fase 2: Horarios dinámicos

- [x] `src/components/layout/footer.tsx` — schedule dinámico (ya es async)
- [x] `src/components/sections/cta-section.tsx` — hacer async + schedule dinámico
- [x] `src/components/sections/location.tsx` — hacer async + schedule dinámico
- [x] `src/app/servicios/[slug]/page.tsx` — sidebar schedule dinámico
- [x] `src/app/contacto/page.tsx` — horarios hardcodeados → dinámicos
- [x] `src/app/page.tsx` — JSON-LD `openingHoursSpecification` dinámico desde `periods`
- [x] `public/llms.txt` — actualizar horarios manualmente

### Fase 3: Reseñas de Google en homepage

- [x] `src/components/sections/testimonials.tsx` — mostrar 5 reseñas reales de Google (reemplaza las 3 estáticas)
- [x] `src/components/cards/testimonial-card.tsx` — añadir props `profilePhotoUrl` y `relativeTime`
- [x] Mantener testimonios estáticos por servicio en páginas de detalle (`data/testimonials.json`)

### Fase 4: Otros datos dinámicos

- [x] `src/app/servicios/[slug]/page.tsx` — JSON-LD `ratingCount` dinámico (ahora hardcodeado `150`)
- [x] Reemplazar URLs de Google Maps hardcodeadas por `googleMapsUri` dinámico donde aplique

### Fase 5: Limpieza

- [x] Verificar/corregir horarios fallback en `siteConfig.schedule` (inconsistencia 14:30/19:30 vs 14:00/20:00)
- [x] Actualizar `data.json` rating y hours para consistencia
- [x] `npm run build` sin errores

### Post-ejecución

- [x] Actualizar changelog.json
- [x] Mover plan a `_archive/` y actualizar `docs/plans/README.md`

## Archivos Creados/Modificados

| Archivo | Acción | Estado |
| ------- | ------ | ------ |
| `src/lib/google-places.ts` | Expandir función + interfaz + FieldMask | ✅ |
| `src/components/layout/footer.tsx` | Horarios dinámicos + googleMapsUri | ✅ |
| `src/components/sections/cta-section.tsx` | Hacer async + horarios dinámicos | ✅ |
| `src/components/sections/location.tsx` | Hacer async + horarios dinámicos | ✅ |
| `src/components/sections/testimonials.tsx` | Reseñas reales de Google | ✅ |
| `src/components/cards/testimonial-card.tsx` | Props para foto y fecha | ✅ |
| `src/app/page.tsx` | JSON-LD openingHours dinámico | ✅ |
| `src/app/contacto/page.tsx` | Horarios hardcodeados → dinámicos | ✅ |
| `src/app/servicios/[slug]/page.tsx` | Sidebar horarios + JSON-LD reviewCount | ✅ |
| `data.json` | Actualizar rating y hours | ✅ |
| `public/llms.txt` | Actualizar horarios | ✅ |
| `changelog.json` | Añadir v0.4.0 | ✅ |

## Detalles Técnicos

**FieldMask ampliado** (misma petición, mismo coste):
```
rating,userRatingCount,regularOpeningHours,reviews,googleMapsUri,businessStatus
```

**Parsing de horarios:** `regularOpeningHours.weekdayDescriptions` devuelve array de 7 strings en español. Se parsean al formato `weekdays/friday/weekend` para compatibilidad con el diseño actual.

**Reseñas:** La API devuelve hasta 5 reseñas más relevantes con nombre, texto, rating, fecha relativa y foto de perfil. Se muestran en homepage. Las reseñas por servicio siguen siendo estáticas (la API no filtra por servicio).

**Edge runtime:** `getGoogleRating()` se mantiene como wrapper fino para `opengraph-image.tsx` y `twitter-image.tsx` que usan edge runtime.

## Progreso

- Inicio: 2026-02-15
- Estado: **COMPLETADO**

## Historial

| Fecha | Descripción |
| ----- | ----------- |
| 2026-02-15 | Plan creado |
| 2026-02-15 | Plan ejecutado: todas las fases completadas, build OK |
