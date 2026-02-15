# Plan: Rating dinámico desde Google Places API

## Resumen

El rating de Google Maps es 4.7 (23 reseñas) pero en la web aparece 4.8 hardcodeado. Integrar Google Places API para que el rating se actualice automáticamente cada 24h vía ISR (sin rebuild).

## Tareas de Implementación

### Fase 1: Configuración
- [x] Añadir variables `GOOGLE_PLACES_API_KEY` y `GOOGLE_PLACE_ID` a `.env` y `.env.example`

### Fase 2: Función cached
- [x] Crear `src/lib/google-places.ts` con `getGoogleRating()` usando `fetch` con `next: { revalidate: 86400 }`
- [x] Fallback a `siteConfig.rating` si la API falla o no hay API key

### Fase 3: Actualizar componentes (todos Server Components)
- [x] `src/components/sections/hero.tsx` — hacer async, usar `getGoogleRating()`
- [x] `src/components/layout/footer.tsx` — hacer async, usar `getGoogleRating()`
- [x] `src/components/sections/testimonials.tsx` — hacer async, usar `getGoogleRating()`
- [x] `src/app/page.tsx` — rating dinámico en JSON-LD (`ratingValue` + `ratingCount`)
- [x] `src/app/sobre-nosotros/page.tsx` — reemplazar `4.8` hardcodeado
- [x] `src/app/opengraph-image.tsx` — reemplazar `"4.8 estrellas"` hardcodeado
- [x] `src/app/twitter-image.tsx` — reemplazar `"4.8 estrellas"` hardcodeado

### Fase 4: Verificación
- [x] `npm run build` compila sin errores
- [x] Sin API key: muestra fallback (`siteConfig.rating`) sin errores
- [x] Con API key: muestra rating real de Google
- [x] Rating se actualiza cada 24h sin rebuild

### Post-ejecución
- [x] Actualizar changelog.json
- [x] Mover plan a `_archive/` y actualizar `docs/plans/README.md`

## Archivos Creados/Modificados

| Archivo | Acción | Estado |
| ------- | ------ | ------ |
| `src/lib/google-places.ts` | Crear - función cached | ✅ |
| `.env` | Modificar - añadir 2 variables | ✅ |
| `.env.example` | Modificar - añadir 2 variables | ✅ |
| `src/lib/constants.ts` | Modificar - fallback rating 4.8 → 4.7 | ✅ |
| `src/components/sections/hero.tsx` | Modificar - rating dinámico | ✅ |
| `src/components/layout/footer.tsx` | Modificar - rating dinámico | ✅ |
| `src/components/sections/testimonials.tsx` | Modificar - rating dinámico | ✅ |
| `src/app/page.tsx` | Modificar - JSON-LD dinámico | ✅ |
| `src/app/sobre-nosotros/page.tsx` | Modificar - stats dinámico | ✅ |
| `src/app/opengraph-image.tsx` | Modificar - rating dinámico | ✅ |
| `src/app/twitter-image.tsx` | Modificar - rating dinámico | ✅ |

## Detalles Técnicos

**Implementación final:** Se usó `fetch` con `next: { revalidate: 86400 }` en lugar de `unstable_cache` para compatibilidad con edge runtime (necesario para OG/twitter images en Windows).

```typescript
export async function getGoogleRating(): Promise<GoogleRating> {
  const res = await fetch(
    `https://places.googleapis.com/v1/places/${placeId}`,
    {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'rating,userRatingCount',
      },
      next: { revalidate: 86400 },
    }
  );
  const data = await res.json();
  return { rating: data.rating, reviewCount: data.userRatingCount };
}
```

**Variables server-only** (sin `NEXT_PUBLIC_`): la API key nunca llega al cliente.

**Coste:** ~30 requests/mes (1/día) → dentro de capa gratuita (10,000 req/mes).

**Place ID encontrado:** `ChIJw2XV5YGOQQ0RK4VFzd-HHI8`

## Progreso
- Inicio: 2026-02-15
- Completado: 2026-02-15
- Estado: **COMPLETADO**

## Historial

| Fecha | Descripción |
| ----- | ----------- |
| 2026-02-15 | Plan creado |
| 2026-02-15 | Todas las fases implementadas y verificadas. Build OK |
