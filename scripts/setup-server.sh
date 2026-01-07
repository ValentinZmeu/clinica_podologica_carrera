#!/bin/bash

# =============================================================================
# Script de Configuración Inicial del Servidor
# =============================================================================
# Uso: curl -fsSL https://raw.githubusercontent.com/tu-usuario/repo/main/scripts/setup-server.sh | bash
# O:   ./scripts/setup-server.sh
# =============================================================================

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuración
NODE_VERSION="20"
APP_USER="www-data"
APP_DIR="/var/www/clinica-podologica"
DOMAIN="podologiacarrera.com"

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[OK]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Verificar root
if [ "$EUID" -ne 0 ]; then
  log_error "Este script debe ejecutarse como root"
  exit 1
fi

echo ""
echo "=============================================="
echo "CONFIGURACIÓN INICIAL DEL SERVIDOR"
echo "=============================================="
echo ""

# Actualizar sistema
log_info "Actualizando sistema..."
apt-get update && apt-get upgrade -y
log_success "Sistema actualizado"

# Instalar dependencias básicas
log_info "Instalando dependencias básicas..."
apt-get install -y curl git build-essential nginx certbot python3-certbot-nginx
log_success "Dependencias instaladas"

# Instalar Node.js via nvm
log_info "Instalando Node.js $NODE_VERSION..."
if ! command -v node &> /dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
  apt-get install -y nodejs
fi
log_success "Node.js $(node -v) instalado"

# Instalar PM2 globalmente
log_info "Instalando PM2..."
npm install -g pm2
log_success "PM2 instalado"

# Configurar PM2 para iniciar con el sistema
log_info "Configurando PM2 para inicio automático..."
pm2 startup systemd -u $APP_USER --hp /home/$APP_USER
log_success "PM2 configurado para inicio automático"

# Crear directorio de la aplicación
log_info "Creando directorios..."
mkdir -p $APP_DIR
mkdir -p /var/log/pm2
chown -R $APP_USER:$APP_USER $APP_DIR
chown -R $APP_USER:$APP_USER /var/log/pm2
log_success "Directorios creados"

# Configurar Nginx
log_info "Configurando Nginx..."
cat > /etc/nginx/sites-available/clinica-podologica << 'EOF'
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

    # SSL configuration (Certbot will update this)
    ssl_certificate /etc/letsencrypt/live/podologiacarrera.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/podologiacarrera.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript application/json;

    # Static files caching
    location /_next/static {
        alias /var/www/clinica-podologica/.next/static;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    location /images {
        alias /var/www/clinica-podologica/public/images;
        expires 30d;
        add_header Cache-Control "public";
    }

    # Proxy to Next.js
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
        proxy_connect_timeout 60s;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
EOF

# Crear enlace simbólico
ln -sf /etc/nginx/sites-available/clinica-podologica /etc/nginx/sites-enabled/

# Verificar configuración de Nginx
nginx -t

log_success "Nginx configurado"

# Configurar firewall
log_info "Configurando firewall..."
ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw --force enable
log_success "Firewall configurado"

# Instrucciones finales
echo ""
echo "=============================================="
echo -e "${GREEN}CONFIGURACIÓN COMPLETADA${NC}"
echo "=============================================="
echo ""
echo "Próximos pasos:"
echo ""
echo "1. Configurar SSL con Let's Encrypt:"
echo "   certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo ""
echo "2. Clonar el repositorio:"
echo "   cd $APP_DIR"
echo "   git clone <tu-repo> ."
echo ""
echo "3. Configurar variables de entorno:"
echo "   cp .env.example .env"
echo "   nano .env"
echo ""
echo "4. Ejecutar el script de despliegue:"
echo "   ./scripts/deploy.sh"
echo ""
echo "5. Verificar estado:"
echo "   pm2 status"
echo "   systemctl status nginx"
echo ""
echo "=============================================="
