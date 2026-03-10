# Plan: Dockerización y CI/CD desde cero

## Resumen

Reescribir desde cero la configuración de Docker y CI/CD del proyecto. Se corrigen bugs detectados (uso incorrecto de `GITHUB_TOKEN` en servidor remoto, build de 3 stages innecesario) y se añaden mejoras (persistencia de datos, builds en PRs).

**Destino**: VPS propio con SSH | **Registry**: GHCR | **Pipeline**: Build + Deploy (sin CI de tests)

## Tareas de Implementación

### Fase 1: Docker

- [x] Reescribir `Dockerfile` — 2 stages (builder + runner) en vez de 3
- [x] Reescribir `.dockerignore` — añadir exclusiones faltantes (e2e, prisma, .github, changelog.json)
- [x] Reescribir `docker-compose.prod.yml` — volumen `contact-data` para persistir mensajes
- [x] `docker-compose.yml` — sin cambios (ya estaba correcto)

### Fase 2: CI/CD (GitHub Actions)

- [x] Reescribir `.github/workflows/deploy.yml`
  - Job `build`: triggers push main + PRs + dispatch. Push a GHCR solo en main.
  - Job `deploy`: solo push a main. Login a GHCR con `CR_PAT`.
  - Actions actualizadas: `build-push-action@v6`, `ssh-action@v1.2.0`
- [x] Actualizar `docs/plans/DEPLOYMENT.md` — CR_PAT documentado

### Post-ejecución

- [x] Marcar tareas completadas
- [x] Mover plan a `_archive/`
- [x] Actualizar `docs/plans/README.md`

## Archivos Creados/Modificados

| Archivo | Acción | Estado |
|---------|--------|--------|
| `Dockerfile` | Reescribir | ✅ |
| `.dockerignore` | Reescribir | ✅ |
| `docker-compose.prod.yml` | Reescribir | ✅ |
| `.github/workflows/deploy.yml` | Reescribir | ✅ |
| `docs/plans/DEPLOYMENT.md` | Actualizar | ✅ |

## Verificación

**Local:**

- `docker compose build` — OK
- `docker compose up -d` + `curl http://localhost:3000` — HTTP 200
- `docker compose down` — OK

## Progreso

- Inicio: 2026-02-14
- Completado: 2026-02-14
- Estado: **COMPLETADO**

## Historial

| Fecha | Descripción |
|-------|-------------|
| 2026-02-14 | Fase 1: Dockerfile 2 stages, .dockerignore, docker-compose.prod.yml con volumen |
| 2026-02-14 | Fase 2: deploy.yml con build en PRs y CR_PAT fix, DEPLOYMENT.md actualizado |
| 2026-02-14 | Verificación local: build + up + curl 200 |
| 2026-02-14 | Post-ejecución: plan archivado |
