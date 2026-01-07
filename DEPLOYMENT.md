# Guía de Despliegue - Clínica Podológica Carrera

Esta guía describe cómo desplegar la aplicación en un servidor bare metal usando PM2 y Nginx.

## Índice

1. [Requisitos](#requisitos)
2. [Configuración Inicial del Servidor](#configuración-inicial-del-servidor)
3. [Despliegue Automatizado](#despliegue-automatizado)
4. [Comandos PM2](#comandos-pm2)
5. [Configuración de Nginx](#configuración-de-nginx)
6. [SSL con Let's Encrypt](#ssl-con-lets-encrypt)
7. [Monitorización](#monitorización)
8. [Troubleshooting](#troubleshooting)

---

## Requisitos

### Servidor

- Ubuntu 20.04+ / Debian 11+
- Mínimo 1GB RAM
- Node.js 20.x
- Nginx
- PM2

### Puertos

| Puerto | Servicio | Descripción |
|--------|----------|-------------|
| 22 | SSH | Acceso remoto |
| 80 | HTTP | Redirección a HTTPS |
| 443 | HTTPS | Tráfico web |
| 3000 | Next.js | Interno (solo localhost) |

---

## Configuración Inicial del Servidor

### Opción 1: Script Automatizado

```bash
# Ejecutar como root
sudo bash scripts/setup-server.sh
```

Este script instala y configura automáticamente:
- Node.js 20.x
- PM2 (con inicio automático)
- Nginx (con configuración optimizada)
- Firewall (UFW)
- Directorios necesarios

### Opción 2: Configuración Manual

```bash
# 1. Actualizar sistema
sudo apt update && sudo apt upgrade -y

# 2. Instalar Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 3. Instalar PM2
sudo npm install -g pm2

# 4. Configurar PM2 para inicio automático
pm2 startup systemd
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME

# 5. Instalar Nginx
sudo apt install -y nginx

# 6. Configurar firewall
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

---

## Despliegue Automatizado

### Primer Despliegue

```bash
# 1. Clonar repositorio
cd /var/www
sudo git clone git@github.com:tu-usuario/clinica-podologica.git
cd clinica-podologica

# 2. Configurar variables de entorno
cp .env.example .env
nano .env

# 3. Hacer ejecutable el script
chmod +x scripts/deploy.sh

# 4. Ejecutar despliegue
./scripts/deploy.sh --force
```

### Despliegues Posteriores

```bash
# Despliegue estándar (con confirmación)
./scripts/deploy.sh

# Despliegue sin confirmación
./scripts/deploy.sh --force

# Despliegue sin reinstalar dependencias
./scripts/deploy.sh --skip-deps

# Despliegue sin recompilar
./scripts/deploy.sh --skip-build
```

### Opciones del Script

| Opción | Descripción |
|--------|-------------|
| `--force` | Ejecutar sin confirmación |
| `--skip-deps` | No reinstalar node_modules |
| `--skip-build` | Usar build existente |

### ¿Qué Hace el Script?

1. **Verifica requisitos** - Node.js, PM2, Git
2. **Crea backup** - Del despliegue anterior
3. **Actualiza código** - `git pull` o `git clone`
4. **Instala dependencias** - `npm ci`
5. **Compila aplicación** - `npm run build`
6. **Reinicia PM2** - Zero-downtime reload
7. **Verifica salud** - Health check HTTP
8. **Limpia backups** - Mantiene últimos 5

---

## Comandos PM2

### Comandos Básicos

```bash
# Iniciar aplicación
npm run pm2:start

# Detener aplicación
npm run pm2:stop

# Reiniciar (zero-downtime)
npm run pm2:restart

# Ver estado
npm run pm2:status

# Ver logs en tiempo real
npm run pm2:logs
```

### Comandos Avanzados

```bash
# Ver métricas de rendimiento
pm2 monit

# Reiniciar todos los procesos
pm2 restart all

# Recargar configuración
pm2 reload ecosystem.config.js

# Guardar estado actual
pm2 save

# Restaurar procesos guardados
pm2 resurrect

# Eliminar aplicación de PM2
pm2 delete clinica-podologica

# Ver información detallada
pm2 show clinica-podologica
```

### Gestión de Logs

```bash
# Ver últimas 100 líneas
pm2 logs clinica-podologica --lines 100

# Vaciar logs
pm2 flush

# Logs de error solamente
pm2 logs clinica-podologica --err
```

---

## Configuración de Nginx

### Archivo de Configuración

Ubicación: `/etc/nginx/sites-available/clinica-podologica`

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name podologiacarrera.com www.podologiacarrera.com;
    return 301 https://$server_name$request_uri;
}

# Main HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name podologiacarrera.com www.podologiacarrera.com;

    # SSL (Certbot configura esto)
    ssl_certificate /etc/letsencrypt/live/podologiacarrera.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/podologiacarrera.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    # Static files (cache 1 año)
    location /_next/static {
        alias /var/www/clinica-podologica/.next/static;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    # Images (cache 30 días)
    location /images {
        alias /var/www/clinica-podologica/public/images;
        expires 30d;
    }

    # Proxy a Next.js
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

### Comandos Nginx

```bash
# Verificar configuración
sudo nginx -t

# Recargar configuración
sudo systemctl reload nginx

# Reiniciar Nginx
sudo systemctl restart nginx

# Ver estado
sudo systemctl status nginx

# Ver logs de acceso
sudo tail -f /var/log/nginx/access.log

# Ver logs de error
sudo tail -f /var/log/nginx/error.log
```

---

## SSL con Let's Encrypt

### Instalación

```bash
# Instalar Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtener certificado
sudo certbot --nginx -d podologiacarrera.com -d www.podologiacarrera.com
```

### Renovación Automática

Certbot configura automáticamente un cron job para renovar certificados. Verificar:

```bash
# Ver timer de renovación
sudo systemctl status certbot.timer

# Probar renovación (sin aplicar)
sudo certbot renew --dry-run
```

### Renovación Manual

```bash
sudo certbot renew
sudo systemctl reload nginx
```

---

## Monitorización

### PM2 Monitoring

```bash
# Dashboard en tiempo real
pm2 monit

# Métricas de la aplicación
pm2 show clinica-podologica
```

### Logs del Sistema

```bash
# Logs de PM2
pm2 logs

# Logs de Nginx
sudo tail -f /var/log/nginx/error.log

# Logs del sistema
sudo journalctl -u nginx -f
```

### Health Check

```bash
# Verificar que la app responde
curl -I http://localhost:3000

# Desde fuera del servidor
curl -I https://podologiacarrera.com
```

---

## Troubleshooting

### La aplicación no inicia

```bash
# Ver logs de error
pm2 logs clinica-podologica --err --lines 50

# Verificar que el puerto no está en uso
sudo lsof -i :3000

# Reiniciar PM2 completamente
pm2 kill
pm2 start ecosystem.config.js --env production
```

### Error 502 Bad Gateway

```bash
# Verificar que Next.js está corriendo
pm2 status

# Verificar que Nginx puede conectar
curl http://127.0.0.1:3000

# Revisar logs de Nginx
sudo tail -f /var/log/nginx/error.log
```

### La aplicación se reinicia constantemente

```bash
# Ver logs para identificar el error
pm2 logs --lines 100

# Verificar memoria disponible
free -h

# Aumentar límite de memoria en ecosystem.config.js
# max_memory_restart: '1G'
```

### Certificado SSL expirado

```bash
# Renovar manualmente
sudo certbot renew --force-renewal

# Recargar Nginx
sudo systemctl reload nginx
```

### Rollback a versión anterior

```bash
# Listar backups disponibles
ls -la /var/www/clinica-podologica_backup_*

# Restaurar backup
pm2 stop clinica-podologica
rm -rf /var/www/clinica-podologica
cp -r /var/www/clinica-podologica_backup_YYYYMMDD_HHMMSS /var/www/clinica-podologica
pm2 start ecosystem.config.js --env production
```

---

## Estructura de Archivos en Servidor

```
/var/www/clinica-podologica/
├── .next/                    # Build de Next.js
├── public/                   # Assets estáticos
├── scripts/
│   ├── deploy.sh            # Script de despliegue
│   └── setup-server.sh      # Configuración inicial
├── ecosystem.config.js       # Configuración PM2
├── package.json
├── .env                      # Variables de entorno (no en git)
└── node_modules/

/var/log/pm2/
├── clinica-out.log          # Logs de stdout
└── clinica-error.log        # Logs de stderr

/etc/nginx/sites-available/
└── clinica-podologica       # Configuración Nginx
```

---

## Variables de Entorno

Crear archivo `.env` en el servidor:

```bash
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_SITE_URL=https://podologiacarrera.com
```

---

## Checklist de Despliegue

### Pre-despliegue

- [ ] Código probado localmente
- [ ] Build exitoso (`npm run build`)
- [ ] Variables de entorno configuradas
- [ ] Certificado SSL válido

### Post-despliegue

- [ ] Aplicación corriendo (`pm2 status`)
- [ ] Sin errores en logs (`pm2 logs`)
- [ ] Sitio accesible por HTTPS
- [ ] Health check OK

---

## Contacto

Para problemas con el despliegue, revisar primero los logs:

```bash
pm2 logs clinica-podologica --lines 100
sudo tail -50 /var/log/nginx/error.log
```
