# Plan: Dockerización y CI/CD desde cero

## Resumen

Reescribir desde cero la configuración de Docker y CI/CD del proyecto. Se corrigen bugs detectados (uso incorrecto de `GITHUB_TOKEN` en servidor remoto, build de 3 stages innecesario) y se añaden mejoras (persistencia de datos, builds en PRs).

**Destino**: VPS propio con SSH | **Registry**: GHCR | **Pipeline**: Build + Deploy (sin CI de tests)

## Tareas de Implementación

### Fase 1: Docker

- [ ] Reescribir `Dockerfile` — 2 stages (builder + runner) en vez de 3
  - Builder: `node:20-alpine` + `libc6-compat`, `npm ci`, `npm run build`
  - Runner: `node:20-alpine` + `libc6-compat`, usuario `nextjs` non-root, healthcheck
  - Copiar: `/public`, `.next/standalone`, `.next/static`, `/data`
- [ ] Reescribir `.dockerignore` — añadir exclusiones faltantes (`prisma/`, `.github/`, `changelog.json`, `data.json`, dirs de testing)
- [ ] Reescribir `docker-compose.prod.yml` — imagen hardcodeada con fallback, volumen `contact-data` para persistir mensajes de contacto
- [ ] `docker-compose.yml` — sin cambios (ya está correcto)

### Fase 2: CI/CD (GitHub Actions)

- [ ] Reescribir `.github/workflows/deploy.yml`
  - Job `build`: todos los triggers (push main, PRs, dispatch manual). Push a GHCR solo en main.
  - Job `deploy`: solo push a main. Login a GHCR con `CR_PAT` (fix del bug de `GITHUB_TOKEN`).
  - Actualizar actions: `docker/build-push-action@v6`, `appleboy/ssh-action@v1.2.0`
- [ ] Actualizar `docs/plans/DEPLOYMENT.md` — añadir `CR_PAT` a tabla de secrets, corregir instrucciones

### Post-ejecución

- [ ] Marcar tareas completadas
- [ ] Mover plan a `_archive/`
- [ ] Actualizar `docs/plans/README.md`

## Archivos Creados/Modificados

| Archivo | Acción | Estado |
|---------|--------|--------|
| `Dockerfile` | Reescribir | ❌ |
| `.dockerignore` | Reescribir | ❌ |
| `docker-compose.prod.yml` | Reescribir | ❌ |
| `.github/workflows/deploy.yml` | Reescribir | ❌ |
| `docs/plans/DEPLOYMENT.md` | Actualizar | ❌ |

## Secrets necesarios en GitHub

| Secret | Descripción |
|--------|-------------|
| `SERVER_HOST` | IP o dominio del VPS |
| `SERVER_USER` | Usuario SSH |
| `SERVER_SSH_KEY` | Clave SSH privada |
| `APP_PATH` | Ruta del proyecto en el servidor |
| `CR_PAT` | GitHub PAT con scope `read:packages` |

## Verificación

**Local:**
```bash
docker compose build
docker compose up -d
curl http://localhost:3000  # debe responder 200
docker compose down
```

**CI/CD:**
- Push a rama PR → solo build (sin push a GHCR, sin deploy)
- Push a main → build + push a GHCR + deploy al VPS
- En el servidor: `docker compose -f docker-compose.prod.yml ps` → container healthy

## Progreso

- Inicio: 2026-02-14
- Estado: **PENDIENTE**

## Historial

| Fecha | Descripción |
|-------|-------------|
