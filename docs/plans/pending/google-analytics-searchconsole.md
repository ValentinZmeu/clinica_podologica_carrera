# Plan: Integrar Google Analytics 4 y Search Console

## Resumen

Integrar GA4 para tracking de visitas y Google Search Console para indexación, usando variables de entorno para mantener las credenciales fuera del código.

## Tareas de Implementación

### Fase 1: Configuración
- [ ] Instalar `@next/third-parties` (`npm install @next/third-parties`)
- [ ] Añadir variables `NEXT_PUBLIC_GA_ID` y `NEXT_PUBLIC_GSC_VERIFICATION` a `.env` y `.env.example`

### Fase 2: Integración en layout
- [ ] Importar `GoogleAnalytics` de `@next/third-parties/google` en `src/app/layout.tsx`
- [ ] Añadir `verification.google` al objeto `metadata` (lee de `process.env.NEXT_PUBLIC_GSC_VERIFICATION`)
- [ ] Añadir `<GoogleAnalytics>` con renderizado condicional (solo si `NEXT_PUBLIC_GA_ID` tiene valor)

### Fase 3: Verificación
- [ ] `npm run build` compila sin errores
- [ ] HTML incluye `<meta name="google-site-verification">` cuando la variable GSC tiene valor
- [ ] Script GA4 solo se carga cuando `NEXT_PUBLIC_GA_ID` tiene valor
- [ ] Sin variables configuradas, no carga nada ni da errores

### Post-ejecución
- [ ] Actualizar changelog.json
- [ ] Mover plan a `_archive/` y actualizar `docs/plans/README.md`

## Archivos Creados/Modificados

| Archivo | Acción | Estado |
| ------- | ------ | ------ |
| `src/app/layout.tsx` | Modificar - añadir GA4 + GSC verification | ❌ |
| `.env` | Modificar - añadir variables | ❌ |
| `.env.example` | Modificar - añadir variables | ❌ |

## Detalles Técnicos

**Enfoque:** `@next/third-parties/google` (paquete oficial Next.js) para GA4 + API `metadata.verification` nativa para Search Console.

**Cambios en `layout.tsx`:**
```tsx
import { GoogleAnalytics } from '@next/third-parties/google';

// En metadata:
verification: {
  google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
},

// En el JSX, antes de </html>:
{process.env.NEXT_PUBLIC_GA_ID && (
  <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
)}
```

## Progreso
- Inicio: 2026-02-14
- Estado: **PENDIENTE**

## Historial

| Fecha | Descripción |
| ----- | ----------- |
| 2026-02-14 | Plan creado |
