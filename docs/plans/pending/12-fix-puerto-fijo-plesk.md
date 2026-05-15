# Plan: Fix sitio caído tras auto-deploy en Plesk

## Resumen

Fijar el puerto host del container Docker a `32771` en `docker-compose.prod.yml` para que la *Plesk Proxy Rule* no se desincronice cada vez que el workflow recrea el container. Hasta ahora el `ports:` usaba un puerto host dinámico (asignado por Docker), y cuando Docker reasignaba el puerto tras un redeploy, la regla de Plesk quedaba apuntando a vacío y el sitio caía hasta que se re-guardaba manualmente la regla en la UI.

## Context

**Problema:** Tras cada `git push` a `main`, el workflow recrea el container Docker. A veces, Plesk *Proxy Rule* pierde la sincronización con el nuevo container y el sitio queda caído. La única forma de recuperarlo es entrar en Plesk → *Websites & Domains* → *Proxy Rules* y pulsar **OK** sin modificar nada.

**Estado actual confirmado en el servidor** (`docker ps`):

```
clinica_podologica_carrera_v2-web   0.0.0.0:32771->3000/tcp, [::]:32771->3000/tcp
```

**Causa raíz:** El antiguo `docker-compose.plesk.yml` usaba `ports: ["3000"]`, que pide a Docker asignar un puerto host dinámico en `0.0.0.0`. Hoy es 32771; tras un `down`/`up`, puede ser otro si el 32771 ya está ocupado (otros containers del servidor — `erp_economic_frontend:32770`, `gcastells-web:32768` — están en el mismo rango). La *Plesk Proxy Rule* guarda el puerto host al momento de crear la regla, así que cuando Docker reasigna, la regla queda apuntando a vacío → 502.

**Solución elegida:** Fijar el puerto host del container a **32771** explícitamente. Plesk *Proxy Rule* seguirá viendo siempre `3000 → 32771` y nunca se desincronizará. **Cero cambios en Plesk.**

**Pre-requisito ya resuelto:** El workflow `.github/workflows/deploy.yml` ya fue arreglado en los commits `f777d3e` → `7710fcb`: hace SCP de `docker-compose.prod.yml` al servidor con `overwrite: true` antes de cada deploy. Por tanto, basta con cambiar el `ports:` en `docker-compose.prod.yml` del repo y el siguiente deploy lo aplicará automáticamente.

---

## Tareas de Implementación

### Fase 1: Cambios en el repositorio

- [x] Editar `docker-compose.prod.yml` línea `ports`: reemplazar `"127.0.0.1:${PORT:-3000}:3000"` por `"32771:3000"`
- [x] Eliminar `docker-compose.plesk.yml` del repo (ya no se usa; era la fuente del problema)

### Fase 2: Deploy

- [ ] Commit + push a `main`
- [ ] Verificar que el workflow `Build and Deploy` corre y termina sin errores
- [ ] Verificar en el servidor: `docker ps | grep clinica` debe mostrar `PORTS = 0.0.0.0:32771->3000/tcp, [::]:32771->3000/tcp`

### Fase 3: Verificación end-to-end

- [ ] `curl -I https://clinica-podologica-carrera.es` → 200
- [ ] Forzar un segundo redeploy (commit trivial) y comprobar que el sitio sigue accesible sin tocar Plesk (era el síntoma original)

### Fase 4: Healthcheck unhealthy (oportunista, no bloqueante)

`docker ps` mostraba `Up XX minutes (unhealthy)`. El healthcheck usa `wget --spider`. Si `wget` no está en la imagen final, falla aunque el sitio funcione.

- [ ] `docker exec clinica_podologica_carrera_v2-web wget --version` — si falla, sustituir healthcheck por la variante con `node -e`:

  ```yaml
  healthcheck:
    test: ["CMD-SHELL", "node -e \"require('http').get('http://localhost:3000/', r => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))\""]
    interval: 30s
    timeout: 5s
    retries: 3
    start_period: 30s
  ```

### Alternativa segura (opcional)

Exponer `0.0.0.0:32771` hace el container alcanzable directo desde Internet (bypass del Plesk reverse proxy). Si el firewall del VPS no lo bloquea y se quiere blindar:

- [ ] Plesk → *Tools & Settings* → *Firewall* → añadir regla DENY incoming TCP 32771 (el loopback Plesk Nginx → container seguirá funcionando)

---

## Archivos Creados/Modificados

| Archivo | Acción | Estado |
| --- | --- | --- |
| `docker-compose.prod.yml` | Cambiar `ports` a `"32771:3000"` | ✅ |
| `docker-compose.plesk.yml` | Eliminar | ✅ |
| `.github/workflows/deploy.yml` | Sin cambios (ya corregido en commits previos) | ✅ |
| `docs/plans/README.md` | Añadir entrada del plan | ✅ |

---

## Tests

No aplica generar tests automatizados — es un cambio de infraestructura, no de código de la app. La verificación es manual (Fase 3).

---

## Progreso

- Inicio: 2026-05-15
- Estado: **EN PROGRESO**

## Historial

| Fecha | Descripción |
| --- | --- |
| 2026-05-15 | Creado el plan tras diagnosticar la desincronización Plesk ↔ Docker |
| 2026-05-15 | Aplicados cambios Fase 1: puerto fijo `32771:3000` en `docker-compose.prod.yml` y eliminado `docker-compose.plesk.yml` |

---

## Post-ejecución

- [ ] Marcar todas las tareas completadas (`[x]`)
- [ ] Mover este plan a `docs/plans/_archive/12-fix-puerto-fijo-plesk.md`
- [ ] Actualizar `docs/plans/README.md` (mover entrada a "Planes Archivados")
- [ ] Commit con scope `deploy` (ej: `fix(deploy): fijar puerto host del container a 32771 para evitar desincronización con Plesk`)
