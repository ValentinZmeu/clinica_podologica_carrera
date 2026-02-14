# Plan: Integrar Google Analytics 4

## Resumen

Integrar GA4 para tracking de visitas, usando variables de entorno para mantener las credenciales fuera del código. Google Search Console ya está verificado vía DNS (no requiere cambios en código).

## Tareas de Implementación

### Fase 1: Configuración
- [x] Instalar `@next/third-parties` (`npm install @next/third-parties`)
- [x] Añadir variable `NEXT_PUBLIC_GA_ID` a `.env` y `.env.example`

### Fase 2: Integración en layout
- [x] Importar `GoogleAnalytics` de `@next/third-parties/google` en `src/app/layout.tsx`
- [x] Añadir `<GoogleAnalytics>` con renderizado condicional (solo si `NEXT_PUBLIC_GA_ID` tiene valor)

### Fase 3: Verificación
- [x] `npm run build` compila sin errores
- [x] Script GA4 solo se carga cuando `NEXT_PUBLIC_GA_ID` tiene valor
- [x] Sin variable configurada, no carga nada ni da errores

### Post-ejecución
- [x] Actualizar changelog.json
- [x] Mover plan a `_archive/` y actualizar `docs/plans/README.md`

## Archivos Creados/Modificados

| Archivo | Acción | Estado |
| ------- | ------ | ------ |
| `src/app/layout.tsx` | Modificar - añadir GA4 | ✅ |
| `.env` | Modificar - añadir variables | ✅ |
| `.env.example` | Modificar - añadir variables | ✅ |

## Progreso
- Inicio: 2026-02-14
- Estado: **COMPLETADO**

## Historial

| Fecha | Descripción |
| ----- | ----------- |
| 2026-02-14 | Plan creado |
| 2026-02-15 | Plan ejecutado y archivado |
