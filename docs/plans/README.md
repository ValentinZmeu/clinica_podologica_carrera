# Planes de Desarrollo

Índice de planes para el proyecto Clínica Podológica Carrera.

## Planes Activos

| Plan | Descripción | Estado | Fecha Inicio |
| ---- | ----------- | ------ | ------------ |
| [12-fix-puerto-fijo-plesk](pending/12-fix-puerto-fijo-plesk.md) | Fijar puerto host del container a 32771 para evitar desincronización Plesk ↔ Docker tras auto-deploy | EN PROGRESO | 2026-05-15 |

## Planes Archivados

| Plan | Descripción | Fecha Completado |
| --- | --- | --- |
| [11-feedback-cliente-precios-plantillas](_archive/11-feedback-cliente-precios-plantillas.md) | Ajustes de copy: precios de quiropodia y comparativa de plantillas (feedback cliente 19/04) | 2026-05-14 |
| [10-google-places-datos-completos](_archive/10-google-places-datos-completos.md) | Google Places API: horarios, reseñas y datos dinámicos | 2026-02-15 |
| [09-seo-inicio-sobre-nosotros](_archive/09-seo-inicio-sobre-nosotros.md) | SEO local, Maps y LLM para Inicio y Sobre Nosotros | 2026-02-15 |
| [08-google-places-rating](_archive/08-google-places-rating.md) | Rating dinámico desde Google Places API (ISR 24h) | 2026-02-15 |
| [07-seo-servicios-local-llm](_archive/07-seo-servicios-local-llm.md) | SEO local, Maps y LLM para páginas de servicios | 2026-02-15 |
| [06-google-analytics](_archive/06-google-analytics.md) | Integrar GA4 con variables .env | 2026-02-15 |
| [05-mejoras-web-v2](_archive/05-mejoras-web-v2.md) | Bugs, UX/UI, accesibilidad y SEO | 2026-02-15 |
| [04-docker-cicd](_archive/04-docker-cicd.md) | Dockerización y CI/CD (GHCR + VPS SSH) | 2026-02-14 |
| [03-e2e-playwright](_archive/03-e2e-playwright.md) | Tests E2E con Playwright (202 tests, 2 viewports) | 2026-02-14 |
| [02-scroll-animations](_archive/02-scroll-animations.md) | Animaciones sutiles de scroll (CSS + IntersectionObserver) | 2026-02-14 |
| [01-landing-nextjs-seo](_archive/01-landing-nextjs-seo.md) | Landing Next.js + shadcn + Tailwind + SQLite | 2026-01-06 |

---

## Guía Rápida

### Nomenclatura obligatoria

Todos los planes llevan **prefijo numérico secuencial** global (compartido entre `pending/` y `_archive/`):

```
XX-nombre-del-plan.md
```

- El número es incremental respecto al último plan creado (pendiente o archivado)
- Consultar ambas carpetas para determinar el siguiente número
- Ejemplo: si el último es `10-...`, el siguiente es `11-...`

### Crear nuevo plan

1. Determinar el siguiente número secuencial (revisar `pending/` y `_archive/`)
2. Crear archivo en `pending/XX-nombre-funcionalidad.md`
3. Usar la plantilla estándar
4. Añadir entrada en la tabla "Planes Activos"

### Completar plan

1. Verificar todas las tareas marcadas como `[x]`
2. Verificar todas las tablas con ✅
3. Mover archivo de `pending/` a `_archive/` (mantener el prefijo numérico)
4. Mover entrada de "Planes Activos" a "Planes Archivados"

### Plantilla de plan

```markdown
# Plan: [Nombre]

## Resumen
Descripción breve.

## Tareas de Implementación

### Fase 1: [Nombre]
- [ ] Tarea 1
- [ ] Tarea 2

## Archivos Creados/Modificados

| Archivo | Acción | Estado |
| ------- | ------ | ------ |
| `path`  | Crear  | ❌     |

## Progreso
- Inicio: YYYY-MM-DD
- Estado: **PENDIENTE**

## Historial

| Fecha | Descripción |
| ----- | ----------- |
```
