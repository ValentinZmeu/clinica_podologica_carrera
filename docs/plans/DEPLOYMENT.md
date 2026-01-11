# Guía de Despliegue

Esta guía explica cómo configurar el servidor de producción y el auto-deployment con GitHub Actions.

## Arquitectura

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│   GitHub Repo   │──────│  GitHub Actions  │──────│  GHCR Registry  │
│   (push main)   │      │  (build image)   │      │  (store image)  │
└─────────────────┘      └──────────────────┘      └────────┬────────┘
                                                            │
                                                            ▼
                         ┌──────────────────┐      ┌─────────────────┐
                         │   Nginx/Caddy    │◄─────│  Docker Server  │
                         │  (reverse proxy) │      │  (pull & run)   │
                         └──────────────────┘      └─────────────────┘
```

## Requisitos del Servidor

### Software necesario

- **Sistema operativo**: Ubuntu 22.04+ / Debian 12+ (recomendado)
- **Docker**: 24.0+
- **Docker Compose**: v2.0+ (plugin)
- **Nginx** o **Caddy**: como reverse proxy
- **Certbot** (si usas Nginx): para SSL automático

### Recursos mínimos

- **CPU**: 1 vCore
- **RAM**: 1 GB
- **Disco**: 10 GB SSD

---

## Configuración de GitHub

### 1. Secrets del repositorio

Ve a **Settings > Secrets and variables > Actions** y crea los siguientes secrets:

| Secret | Descripción | Ejemplo |
|--------|-------------|---------|
| `SERVER_HOST` | IP o dominio del servidor | `123.45.67.89` o `clinica-podologica-carrera.com` |
| `SERVER_USER` | Usuario SSH del servidor | `clinica_podologica_carrera` |
| `SERVER_SSH_KEY` | Clave privada SSH (sin passphrase) | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `APP_PATH` | Ruta del proyecto en el servidor | `/home/clinica_podologica_carrera/app` |

### 2. Generar clave SSH

Puedes generar las claves desde **cualquier máquina** (tu PC, el servidor, donde sea):

```bash
# Generar par de claves (sin passphrase para automatización)
ssh-keygen -t ed25519 -C "github-actions-deploy" -f github_deploy

# Ver la clave PRIVADA (copiar TODO el contenido → SECRET en GitHub)
cat github_deploy

# Ver la clave PÚBLICA (copiar → authorized_keys en el servidor)
cat github_deploy.pub
```

**¿Dónde va cada clave?**

- **Clave privada** (`github_deploy`) → GitHub Secret: `SERVER_SSH_KEY` (incluye `-----BEGIN` y `-----END`)
- **Clave pública** (`github_deploy.pub`) → Servidor: `/home/clinica_podologica_carrera/.ssh/authorized_keys`

### 3. Permisos del repositorio

El workflow usa `GITHUB_TOKEN` automáticamente para:
- Publicar imágenes en GitHub Container Registry (ghcr.io)
- No necesitas configurar tokens adicionales

---

## Configuración del Servidor

### 1. Crear usuario del proyecto

```bash
# Crear usuario
sudo adduser clinica_podologica_carrera
sudo usermod -aG docker clinica_podologica_carrera

# Configurar SSH
sudo mkdir -p /home/clinica_podologica_carrera/.ssh
sudo nano /home/clinica_podologica_carrera/.ssh/authorized_keys
# Pegar la clave pública (github_deploy.pub)

# Permisos
sudo chmod 700 /home/clinica_podologica_carrera/.ssh
sudo chmod 600 /home/clinica_podologica_carrera/.ssh/authorized_keys
sudo chown -R clinica_podologica_carrera:clinica_podologica_carrera /home/clinica_podologica_carrera/.ssh
```

### 2. Instalar Docker

```bash
# Instalar Docker
curl -fsSL https://get.docker.com | sudo sh

# Añadir usuario al grupo docker
sudo usermod -aG docker clinica_podologica_carrera

# Verificar instalación
docker --version
docker compose version
```

### 3. Crear estructura del proyecto

```bash
# Como usuario clinica_podologica_carrera
sudo -u clinica_podologica_carrera mkdir -p /home/clinica_podologica_carrera/app
cd /home/clinica_podologica_carrera/app

# Crear docker-compose.prod.yml
cat > docker-compose.prod.yml << 'EOF'
services:
  web:
    image: ghcr.io/TU_USUARIO/clinica_podologica_carrera_v2:latest
    container_name: clinica-podologica
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000/"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 5s
EOF

# Crear archivo .env
cat > .env << 'EOF'
GITHUB_REPOSITORY=TU_USUARIO/clinica_podologica_carrera_v2
PORT=3000
EOF
```

> **Nota**: Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub.

### 4. Configurar Nginx (reverse proxy)

```bash
sudo apt install nginx certbot python3-certbot-nginx -y

# Crear configuración del sitio
sudo nano /etc/nginx/sites-available/clinica-podologica-carrera.com
```

Contenido:

```nginx
# Redirección de .es a .com
server {
    listen 80;
    server_name clinica-podologica-carrera.es www.clinica-podologica-carrera.es;
    return 301 https://clinica-podologica-carrera.com$request_uri;
}

# Sitio principal (.com)
server {
    listen 80;
    server_name clinica-podologica-carrera.com www.clinica-podologica-carrera.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Activar sitio
sudo ln -s /etc/nginx/sites-available/clinica-podologica-carrera.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Obtener certificados SSL (incluye ambos dominios .com y .es)
sudo certbot --nginx \
  -d clinica-podologica-carrera.com \
  -d www.clinica-podologica-carrera.com \
  -d clinica-podologica-carrera.es \
  -d www.clinica-podologica-carrera.es
```

#### Alternativa: Configuración con Caddy

Si prefieres usar Caddy (SSL automático, configuración más simple):

```bash
# Instalar Caddy
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy

# Crear Caddyfile
sudo nano /etc/caddy/Caddyfile
```

Contenido del Caddyfile:

```caddy
# Redirección de .es a .com
clinica-podologica-carrera.es, www.clinica-podologica-carrera.es {
    redir https://clinica-podologica-carrera.com{uri} permanent
}

# Sitio principal
clinica-podologica-carrera.com, www.clinica-podologica-carrera.com {
    reverse_proxy localhost:3000
    encode gzip
}
```

```bash
# Reiniciar Caddy (SSL automático vía Let's Encrypt)
sudo systemctl reload caddy
```

### 5. Configurar firewall

```bash
sudo ufw allow ssh

# Si usas Nginx:
sudo ufw allow 'Nginx Full'

# Si usas Caddy:
# sudo ufw allow 80/tcp
# sudo ufw allow 443/tcp

sudo ufw enable
```

---

## Primer Despliegue Manual

Antes de que funcione el auto-deploy, necesitas hacer el primer pull manualmente:

```bash
# Como usuario clinica_podologica_carrera
cd /home/clinica_podologica_carrera/app

# Login en GitHub Container Registry
echo "TU_GITHUB_TOKEN" | docker login ghcr.io -u TU_USUARIO --password-stdin

# Pull de la imagen
docker pull ghcr.io/TU_USUARIO/clinica_podologica_carrera_v2:latest

# Iniciar contenedor
docker compose -f docker-compose.prod.yml up -d

# Verificar estado
docker compose ps
docker logs clinica-podologica
```

---

## Cómo Funciona el Auto-Deployment

### Flujo automático

1. **Push a main** → Se dispara el workflow
2. **Build** → GitHub Actions construye la imagen Docker
3. **Push a GHCR** → La imagen se sube a GitHub Container Registry
4. **Deploy vía SSH** → GitHub Actions se conecta al servidor y ejecuta:
   - `docker pull` de la nueva imagen
   - `docker compose down` del contenedor antiguo
   - `docker compose up -d` con la nueva imagen
   - Limpieza de imágenes antiguas

### Trigger manual

También puedes disparar el deploy manualmente desde GitHub:
1. Ve a **Actions** en tu repositorio
2. Selecciona **Build and Deploy**
3. Click en **Run workflow**

---

## Comandos Útiles

### En el servidor

```bash
# Ver estado del contenedor
docker compose -f docker-compose.prod.yml ps

# Ver logs en tiempo real
docker compose -f docker-compose.prod.yml logs -f

# Reiniciar contenedor
docker compose -f docker-compose.prod.yml restart

# Parar contenedor
docker compose -f docker-compose.prod.yml down

# Actualizar manualmente
docker pull ghcr.io/TU_USUARIO/clinica_podologica_carrera_v2:latest
docker compose -f docker-compose.prod.yml up -d

# Ver uso de recursos
docker stats clinica-podologica

# Limpiar imágenes antiguas
docker image prune -f
```

### Verificar salud

```bash
# Desde el servidor
curl http://localhost:3000

# Desde fuera
curl https://clinica-podologica-carrera.com
```

---

## Troubleshooting

### El deploy falla en GitHub Actions

1. **Verifica los secrets**: Asegúrate de que todos están configurados
2. **Prueba SSH manualmente**:
   ```bash
   ssh -i github_deploy clinica_podologica_carrera@TU_SERVIDOR
   ```
3. **Revisa los logs** en la pestaña Actions de GitHub

### El contenedor no arranca

```bash
# Ver logs del contenedor
docker logs clinica-podologica

# Ver eventos de Docker
docker events --since 10m
```

### Error de permisos en Docker

```bash
# Asegúrate de que el usuario está en el grupo docker
groups clinica_podologica_carrera
# Debe mostrar: clinica_podologica_carrera docker

# Si no, añádelo:
sudo usermod -aG docker clinica_podologica_carrera
# Y reconecta la sesión SSH
```

### Nginx no funciona

```bash
# Verificar configuración
sudo nginx -t

# Ver logs de Nginx
sudo tail -f /var/log/nginx/error.log

# Verificar que el puerto 3000 está escuchando
sudo ss -tlnp | grep 3000
```

### Certificado SSL expirado

```bash
# Renovar manualmente
sudo certbot renew

# Verificar renovación automática
sudo systemctl status certbot.timer
```

---

## Resumen de Configuración

### Checklist del servidor

- [ ] Docker instalado
- [ ] Usuario `clinica_podologica_carrera` creado y en grupo `docker`
- [ ] Clave SSH pública añadida a `authorized_keys`
- [ ] Estructura de carpetas creada (`/home/clinica_podologica_carrera/app`)
- [ ] `docker-compose.prod.yml` configurado
- [ ] Nginx configurado como reverse proxy
- [ ] Certificado SSL instalado
- [ ] Firewall configurado

### Checklist de GitHub

- [ ] Secret `SERVER_HOST` configurado
- [ ] Secret `SERVER_USER` configurado
- [ ] Secret `SERVER_SSH_KEY` configurado
- [ ] Secret `APP_PATH` configurado
- [ ] Primer deploy manual exitoso

---

## Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto de la aplicación | `3000` |
| `NODE_ENV` | Entorno de ejecución | `production` |
| `GITHUB_REPOSITORY` | Nombre del repo (para pull de imagen) | - |
