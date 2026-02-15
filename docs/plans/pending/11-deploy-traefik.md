# Plan: Ajustar despliegue a convenciones VPS Docker + Traefik

## Contexto

El proyecto ya tiene archivos de despliegue (Dockerfile, docker-compose.prod.yml, workflow, DEPLOYMENT.md) pero siguen un esquema propio con Nginx/Caddy como reverse proxy, usuario dedicado por proyecto y rutas en home. Se necesita migrar a las convenciones del skill `/deploy`: Traefik compartido, usuario `deploy`, ruta `/opt/projects/`, secrets estandarizados.

## Diferencias detectadas

| Aspecto | Actual | Objetivo |
|---------|--------|----------|
| Reverse proxy | Nginx/Caddy manual | Traefik (ya corriendo, auto-SSL) |
| Redes Docker | Ninguna (usa `ports`) | `traefik` (external) + `internal` |
| Labels Traefik | No existen | 5 labels obligatorias |
| Memory limits | No existen | `512M` por servicio |
| Usuario SSH | `SERVER_USER` (secret) | `deploy` (hardcoded) |
| Ruta VPS | `APP_PATH` (secret) | `/opt/projects/clinica-podologica-carrera/` |
| Secrets CI/CD | 5: `SERVER_HOST`, `SERVER_USER`, `SERVER_SSH_KEY`, `APP_PATH`, `CR_PAT` | 3: `VPS_HOST`, `VPS_SSH_KEY`, `GHCR_PAT` |
| Compose en VPS | `docker-compose.prod.yml` (nombre custom) | `docker-compose.yml` (default) |
| Deploy script | `down` + `up -d` | `pull` + `up -d --remove-orphans` |
| Dockerfile CMD | `node server.js` | `node --max-old-space-size=256 server.js` |
| Documentación | `docs/DEPLOYMENT.md` (Nginx/Caddy) | `docs/DEPLOYMENT.md` (Traefik) |
| Env vars compose | Sin `env_file` | `env_file: .env` |

---

## Tarea 1: Reescribir `docker-compose.prod.yml`

**Archivo**: `docker-compose.prod.yml`

- Renombrar servicio `web` → `app`
- Eliminar `ports` (Traefik enruta por labels)
- Añadir `env_file: .env`
- Añadir redes `traefik` (external) + `internal`
- Añadir 5 labels Traefik con `Host(clinica-podologica-carrera.com) || Host(www.clinica-podologica-carrera.com)`
- Añadir `deploy.resources.limits.memory: 512M`
- Mantener: healthcheck, volumes, restart

---

## Tarea 2: Ajustar `Dockerfile`

**Archivo**: `Dockerfile`

Solo cambiar CMD:

```dockerfile
CMD ["node", "server.js"]  →  CMD ["node", "--max-old-space-size=256", "server.js"]
```

---

## Tarea 3: Reescribir `.github/workflows/deploy.yml`

**Archivo**: `.github/workflows/deploy.yml`

Cambios en el job `deploy`:

- Secrets: `VPS_HOST`, `VPS_SSH_KEY`, `GHCR_PAT`
- Username: `deploy` (hardcoded)
- Ruta: `/opt/projects/clinica-podologica-carrera` (hardcoded)
- Script: sin `down`, usa `pull` + `up -d --remove-orphans`
- Compose: `docker compose` (sin `-f`, asume `docker-compose.yml` en VPS)
- Mantener: job `build` con Buildx, GHA cache, metadata-action, PR check

---

## Tarea 4: Actualizar `docs/DEPLOYMENT.md`

**Archivo**: `docs/DEPLOYMENT.md`

Reescribir adaptado a Traefik (mantener ubicación actual):

- Arquitectura: GitHub → GHCR → VPS (Docker + Traefik)
- Prerequisites: Docker + Docker Compose (Traefik ya instalado)
- 3 GitHub secrets (`VPS_HOST`, `VPS_SSH_KEY`, `GHCR_PAT`)
- VPS setup: usuario `deploy`, ruta `/opt/projects/clinica-podologica-carrera/`
- Copiar `docker-compose.yml` + `.env` al VPS
- Eliminar secciones Nginx/Caddy/Certbot/firewall (Traefik lo gestiona)
- DNS: registros A (`@` y `www`) → IP del VPS, TTL 3600
- Comandos útiles, rollback, troubleshooting

---

## Sin cambios

| Archivo | Motivo |
|---------|--------|
| `docker-compose.yml` | Es para desarrollo local, no producción |
| `.env.example` | Variables de la app correctas |
| `.dockerignore` | Ya bien configurado |

---

## Verificación

1. `docker compose -f docker-compose.prod.yml config` — Validar compose
2. `docker build -t clinica-test .` — Verificar build con nuevo CMD
3. Revisar sintaxis YAML del workflow

---

## Progreso

- Inicio: 2026-02-15
- Estado: **PENDIENTE**
