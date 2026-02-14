# Plan: Tests E2E con Playwright

## Resumen

Implementar tests E2E con Playwright para validar que todos los componentes de la web se renderizan correctamente y que la navegación, enlaces externos, SEO y accesibilidad básica funcionan.

## Contexto

La web no tiene ninguna infraestructura de testing. Playwright no está instalado, no hay configuración, ni directorio de tests. El proyecto tiene ~50 `data-testid` repartidos en 8 páginas y 14 componentes, listos para ser usados.

## Enfoque

- **Playwright** como framework E2E (ya especificado en CLAUDE.md)
- **2 viewports**: Desktop Chrome (1280x720) + Mobile Safari (iPhone 13, 390x844)
- **~90 tests** organizados en 8 spec files por página/feature
- **Helpers compartidos**: constantes, selectores centralizados, fixture base
- **`page.getByTestId()`** para localizar elementos
- **`scrollToSection()`** helper para secciones lazy-loaded (6 secciones usan `next/dynamic`)

## Archivos a crear/modificar

| # | Archivo | Acción | Descripción | Estado |
|---|---------|--------|-------------|--------|
| 1 | `playwright.config.ts` | Crear | Config: 2 proyectos, webServer, baseURL | ❌ |
| 2 | `e2e/helpers/constants.ts` | Crear | Datos esperados (clinic, slugs, team, nav) | ❌ |
| 3 | `e2e/helpers/selectors.ts` | Crear | Mapa centralizado de data-testid | ❌ |
| 4 | `e2e/fixtures/base.ts` | Crear | Fixture extendido + helpers | ❌ |
| 5 | `e2e/home.spec.ts` | Crear | Tests landing (~13 tests) | ❌ |
| 6 | `e2e/navigation.spec.ts` | Crear | Nav desktop, mobile, footer (~12 tests) | ❌ |
| 7 | `e2e/services.spec.ts` | Crear | Listado servicios (~6 tests) | ❌ |
| 8 | `e2e/service-detail.spec.ts` | Crear | Detalle servicio + paramétricos (~14 tests) | ❌ |
| 9 | `e2e/about.spec.ts` | Crear | Sobre nosotros (~8 tests) | ❌ |
| 10 | `e2e/contact.spec.ts` | Crear | Contacto (~7 tests) | ❌ |
| 11 | `e2e/legal.spec.ts` | Crear | Privacidad, cookies, aviso legal (~14 tests) | ❌ |
| 12 | `e2e/seo.spec.ts` | Crear | Metadata, JSON-LD, robots (~16 tests) | ❌ |
| 13 | `package.json` | Modificar | Añadir scripts test:e2e | ❌ |
| 14 | `.gitignore` | Modificar | Añadir artifacts Playwright | ❌ |

## Tareas de Implementación

### Fase 1: Infraestructura

- [ ] Instalar `@playwright/test` y browsers
- [ ] Crear `playwright.config.ts`
- [ ] Añadir scripts en `package.json`
- [ ] Añadir a `.gitignore` artifacts Playwright

### Fase 2: Módulos compartidos

- [ ] Crear `e2e/helpers/constants.ts`
- [ ] Crear `e2e/helpers/selectors.ts`
- [ ] Crear `e2e/fixtures/base.ts`

### Fase 3: Tests por página

- [ ] `e2e/home.spec.ts`
- [ ] `e2e/navigation.spec.ts`
- [ ] `e2e/services.spec.ts`
- [ ] `e2e/service-detail.spec.ts`
- [ ] `e2e/about.spec.ts`
- [ ] `e2e/contact.spec.ts`
- [ ] `e2e/legal.spec.ts`
- [ ] `e2e/seo.spec.ts`

### Fase 4: Validación

- [ ] Ejecutar todos los tests
- [ ] Corregir tests flaky

### Post-ejecución

- [ ] Marcar todas las tareas completadas
- [ ] Mover plan a `docs/plans/_archive/`
- [ ] Actualizar `docs/plans/README.md`

## Progreso

- Inicio: 2026-02-14
- Estado: **PENDIENTE**

## Historial

| Fecha | Descripción |
|-------|-------------|
