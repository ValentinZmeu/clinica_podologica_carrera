# Clínica Podológica Carrera

Sitio web de la Clínica Podológica Carrera, ubicada en Móstoles, Madrid. Landing page optimizada para SEO y conversión, con información sobre servicios podológicos, equipo profesional y formulario de contacto.

## Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **UI**: shadcn/ui + Tailwind CSS
- **Lenguaje**: TypeScript
- **Datos**: Archivos JSON (sin base de datos)
- **Despliegue**: Docker + GitHub Actions

## Requisitos

- Node.js >= 18
- npm >= 9
- Docker (para producción)

## Desarrollo Local

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/clinica-podologica-carrera.git
cd clinica-podologica-carrera

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env
```

### Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo en http://localhost:3000 |
| `npm run build` | Compila la aplicación para producción |
| `npm run start` | Inicia servidor de producción (requiere build previo) |
| `npm run lint` | Ejecuta ESLint para verificar código |

### Estructura del Proyecto

```
├── public/              # Assets estáticos (imágenes, favicon)
├── src/
│   ├── app/             # Páginas (App Router)
│   ├── components/
│   │   ├── ui/          # Componentes shadcn/ui
│   │   ├── layout/      # Header, Footer
│   │   ├── sections/    # Secciones de la landing
│   │   └── seo/         # Componentes JSON-LD
│   ├── lib/             # Utilidades
│   └── data/            # Queries de datos
├── data/                # Archivos JSON con datos
├── docker-compose.yml   # Docker para desarrollo
└── docker-compose.prod.yml  # Docker para producción
```

## Despliegue en Producción

### Prerrequisitos en el Servidor

1. **Docker y Docker Compose** instalados
2. **Nginx** instalado y configurado
3. **Certificado SSL** (recomendado: Let's Encrypt con Certbot)

### Configuración de GitHub

Añadir los siguientes **Secrets** en el repositorio (Settings → Secrets and variables → Actions):

| Secret | Descripción | Ejemplo |
|--------|-------------|---------|
| `SERVER_HOST` | IP o dominio del servidor | `123.45.67.89` |
| `SERVER_USER` | Usuario SSH | `deploy` |
| `SERVER_SSH_KEY` | Clave SSH privada | `-----BEGIN OPENSSH...` |
| `APP_PATH` | Ruta de la aplicación en el servidor | `/opt/clinica-podologica` |

### Preparar el Servidor

```bash
# Crear directorio de la aplicación
sudo mkdir -p /opt/clinica-podologica
sudo chown $USER:$USER /opt/clinica-podologica

# Copiar docker-compose.prod.yml al servidor
scp docker-compose.prod.yml usuario@servidor:/opt/clinica-podologica/

# Crear archivo .env en el servidor
echo "GITHUB_REPOSITORY=tu-usuario/clinica-podologica-carrera" > /opt/clinica-podologica/.env
echo "PORT=3000" >> /opt/clinica-podologica/.env
```

### Configuración de Nginx

Crear archivo `/etc/nginx/sites-available/podologiacarrera.com`:

```nginx
server {
    listen 80;
    server_name podologiacarrera.com www.podologiacarrera.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name podologiacarrera.com www.podologiacarrera.com;

    # SSL (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/podologiacarrera.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/podologiacarrera.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml;

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
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;
    }

    # Cache static assets
    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location /images {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 200 30d;
        add_header Cache-Control "public, max-age=2592000";
    }
}
```

Activar el sitio:

```bash
sudo ln -s /etc/nginx/sites-available/podologiacarrera.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Obtener Certificado SSL

```bash
sudo certbot --nginx -d podologiacarrera.com -d www.podologiacarrera.com
```

### Despliegue Automático

Una vez configurado, cada push a la rama `main` desplegará automáticamente:

1. GitHub Actions construye la imagen Docker
2. La imagen se sube a GitHub Container Registry
3. El servidor descarga la nueva imagen
4. Se reinicia el contenedor con la nueva versión

### Despliegue Manual

Si necesitas desplegar manualmente:

```bash
# En el servidor
cd /opt/clinica-podologica

# Login en GitHub Container Registry
echo $GITHUB_TOKEN | docker login ghcr.io -u tu-usuario --password-stdin

# Descargar última imagen
docker pull ghcr.io/tu-usuario/clinica-podologica-carrera:latest

# Reiniciar contenedor
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d

# Verificar estado
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f
```

## Troubleshooting

### El contenedor no arranca

```bash
# Ver logs del contenedor
docker compose -f docker-compose.prod.yml logs

# Verificar que el puerto no está ocupado
sudo lsof -i :3000

# Reiniciar el contenedor
docker compose -f docker-compose.prod.yml restart
```

### Error 502 Bad Gateway en Nginx

```bash
# Verificar que el contenedor está corriendo
docker ps

# Verificar que escucha en el puerto correcto
docker compose -f docker-compose.prod.yml ps

# Verificar conectividad desde nginx
curl http://127.0.0.1:3000

# Revisar logs de nginx
sudo tail -f /var/log/nginx/error.log
```

### La imagen no se descarga

```bash
# Verificar login en registry
docker login ghcr.io -u tu-usuario

# Verificar que la imagen existe
docker pull ghcr.io/tu-usuario/clinica-podologica-carrera:latest

# Si el repositorio es privado, crear token con permisos de packages:read
```

### El GitHub Action falla

1. **Verificar secrets**: Asegúrate de que todos los secrets están configurados
2. **Verificar permisos SSH**: La clave debe tener acceso al servidor
3. **Verificar ruta**: `APP_PATH` debe existir y el usuario debe tener permisos

```bash
# Probar conexión SSH manualmente
ssh -i ~/.ssh/tu_clave usuario@servidor "echo 'Conexión OK'"

# Verificar permisos del directorio
ls -la /opt/clinica-podologica
```

### Limpiar espacio en disco

```bash
# Eliminar imágenes no utilizadas
docker image prune -a

# Eliminar todo lo no utilizado (contenedores, redes, imágenes)
docker system prune -a
```

### Rollback a versión anterior

```bash
# Ver imágenes disponibles
docker images ghcr.io/tu-usuario/clinica-podologica-carrera

# Usar una versión específica (por SHA del commit)
docker pull ghcr.io/tu-usuario/clinica-podologica-carrera:abc1234

# Editar docker-compose.prod.yml para usar esa versión
# image: ghcr.io/tu-usuario/clinica-podologica-carrera:abc1234

docker compose -f docker-compose.prod.yml up -d
```

### Verificar salud del contenedor

```bash
# Ver estado del healthcheck
docker inspect --format='{{json .State.Health}}' clinica-podologica | jq

# Ejecutar healthcheck manualmente
docker exec clinica-podologica wget --no-verbose --tries=1 --spider http://localhost:3000/
```

## Variables de Entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| `NODE_ENV` | Entorno de ejecución | `development` |
| `PORT` | Puerto del servidor | `3000` |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio | `https://podologiacarrera.com` |

## Licencia

Proyecto privado. Todos los derechos reservados.
