# Planes de Desarrollo

Índice de planes para el proyecto Clínica Podológica Carrera.

## Planes Activos

| Plan | Descripción | Estado | Fecha Inicio |
| ---- | ----------- | ------ | ------------ |
| -    | -           | -      | -            |

## Planes Archivados

| Plan                                                          | Descripción                                  | Fecha Completado |
| ------------------------------------------------------------- | -------------------------------------------- | ---------------- |
| [docker-cicd](_archive/04-docker-cicd.md)                     | Dockerización y CI/CD (GHCR + VPS SSH)       | 2026-02-14       |
| [e2e-playwright](_archive/03-e2e-playwright.md)               | Tests E2E con Playwright (202 tests, 2 viewports) | 2026-02-14       |
| [scroll-animations](_archive/02-scroll-animations.md)         | Animaciones sutiles de scroll (CSS + IntersectionObserver) | 2026-02-14       |
| [landing-nextjs-seo](_archive/01-landing-nextjs-seo.md)       | Landing Next.js + shadcn + Tailwind + SQLite | 2026-01-06       |

---

## Guía Rápida

### Crear nuevo plan

1. Crear archivo en `pending/nombre-funcionalidad.md`
2. Usar la plantilla estándar
3. Añadir entrada en la tabla "Planes Activos"

### Completar plan

1. Verificar todas las tareas marcadas como `[x]`
2. Verificar todas las tablas con ✅
3. Mover archivo de `pending/` a `_archive/`
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
