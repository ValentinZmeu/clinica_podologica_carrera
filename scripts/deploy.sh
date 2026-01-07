#!/bin/bash

# =============================================================================
# Script de Despliegue Automatizado - Clínica Podológica Carrera
# =============================================================================
# Uso: ./scripts/deploy.sh [opciones]
# Opciones:
#   --skip-build    Saltar build (usar build existente)
#   --skip-deps     Saltar instalación de dependencias
#   --force         Forzar despliegue sin confirmación
# =============================================================================

set -e  # Salir en caso de error

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuración
APP_NAME="clinica-podologica"
APP_DIR="/var/www/clinica-podologica"
REPO_URL="git@github.com:ValentinZmeu/clinica_podologica_carrera.git"
BRANCH="main"
NODE_VERSION="20"
PORT=3000

# Flags
SKIP_BUILD=false
SKIP_DEPS=false
FORCE=false

# Parsear argumentos
for arg in "$@"; do
  case $arg in
    --skip-build)
      SKIP_BUILD=true
      shift
      ;;
    --skip-deps)
      SKIP_DEPS=true
      shift
      ;;
    --force)
      FORCE=true
      shift
      ;;
  esac
done

# Funciones de utilidad
log_info() {
  echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
  echo -e "${GREEN}[OK]${NC} $1"
}

log_warning() {
  echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar requisitos
check_requirements() {
  log_info "Verificando requisitos..."

  # Node.js
  if ! command -v node &> /dev/null; then
    log_error "Node.js no está instalado"
    exit 1
  fi

  # PM2
  if ! command -v pm2 &> /dev/null; then
    log_error "PM2 no está instalado. Ejecutar: npm install -g pm2"
    exit 1
  fi

  # Git
  if ! command -v git &> /dev/null; then
    log_error "Git no está instalado"
    exit 1
  fi

  log_success "Todos los requisitos cumplidos"
}

# Verificar disponibilidad del puerto
check_port() {
  log_info "Verificando puerto $PORT..."

  # Si la app ya está corriendo con PM2, el puerto estará ocupado por ella (OK)
  if pm2 list | grep -q "$APP_NAME.*online"; then
    log_success "Puerto $PORT en uso por $APP_NAME (se reiniciará)"
    return
  fi

  # Verificar si otro proceso está usando el puerto
  if command -v lsof &> /dev/null; then
    PORT_PID=$(lsof -ti :$PORT 2>/dev/null || true)
    if [ -n "$PORT_PID" ]; then
      log_error "Puerto $PORT ocupado por proceso PID: $PORT_PID"
      log_info "Ejecutar: sudo kill $PORT_PID  (para liberar el puerto)"
      exit 1
    fi
  elif command -v ss &> /dev/null; then
    if ss -tuln | grep -q ":$PORT "; then
      log_error "Puerto $PORT está ocupado"
      log_info "Ejecutar: sudo ss -tulnp | grep :$PORT  (para ver qué proceso)"
      exit 1
    fi
  fi

  log_success "Puerto $PORT disponible"
}

# Crear backup del directorio actual
backup_current() {
  if [ -d "$APP_DIR" ]; then
    BACKUP_DIR="${APP_DIR}_backup_$(date +%Y%m%d_%H%M%S)"
    log_info "Creando backup en $BACKUP_DIR..."
    cp -r "$APP_DIR" "$BACKUP_DIR"
    log_success "Backup creado"
  fi
}

# Actualizar código desde repositorio
update_code() {
  log_info "Actualizando código desde $BRANCH..."

  if [ -d "$APP_DIR/.git" ]; then
    cd "$APP_DIR"
    git fetch origin
    git reset --hard "origin/$BRANCH"
    git clean -fd
  else
    log_info "Clonando repositorio..."
    mkdir -p "$APP_DIR"
    git clone --branch "$BRANCH" "$REPO_URL" "$APP_DIR"
    cd "$APP_DIR"
  fi

  log_success "Código actualizado a $(git rev-parse --short HEAD)"
}

# Instalar dependencias
install_deps() {
  if [ "$SKIP_DEPS" = true ]; then
    log_warning "Saltando instalación de dependencias"
    return
  fi

  log_info "Instalando dependencias..."
  cd "$APP_DIR"
  npm ci --production=false
  log_success "Dependencias instaladas"
}

# Build de la aplicación
build_app() {
  if [ "$SKIP_BUILD" = true ]; then
    log_warning "Saltando build"
    return
  fi

  log_info "Compilando aplicación..."
  cd "$APP_DIR"
  npm run build
  log_success "Build completado"
}

# Reiniciar aplicación con PM2
restart_app() {
  log_info "Reiniciando aplicación con PM2..."
  cd "$APP_DIR"

  # Verificar si la app ya está corriendo
  if pm2 list | grep -q "$APP_NAME"; then
    pm2 reload ecosystem.config.js --env production
  else
    pm2 start ecosystem.config.js --env production
  fi

  # Guardar configuración de PM2
  pm2 save

  log_success "Aplicación reiniciada"
}

# Verificar estado de la aplicación
verify_deployment() {
  log_info "Verificando despliegue..."

  sleep 5

  # Verificar que PM2 está corriendo la app
  if pm2 list | grep -q "$APP_NAME.*online"; then
    log_success "Aplicación corriendo correctamente"
  else
    log_error "La aplicación no está corriendo"
    pm2 logs "$APP_NAME" --lines 50
    exit 1
  fi

  # Health check
  if command -v curl &> /dev/null; then
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 || echo "000")
    if [ "$HTTP_CODE" = "200" ]; then
      log_success "Health check OK (HTTP $HTTP_CODE)"
    else
      log_warning "Health check retornó HTTP $HTTP_CODE"
    fi
  fi
}

# Limpiar backups antiguos (mantener últimos 5)
cleanup_backups() {
  log_info "Limpiando backups antiguos..."
  ls -dt "${APP_DIR}_backup_"* 2>/dev/null | tail -n +6 | xargs rm -rf 2>/dev/null || true
  log_success "Limpieza completada"
}

# Mostrar resumen
show_summary() {
  echo ""
  echo "=============================================="
  echo -e "${GREEN}DESPLIEGUE COMPLETADO${NC}"
  echo "=============================================="
  echo "Aplicación: $APP_NAME"
  echo "Directorio: $APP_DIR"
  echo "Commit: $(cd $APP_DIR && git rev-parse --short HEAD)"
  echo "Fecha: $(date)"
  echo ""
  echo "Comandos útiles:"
  echo "  pm2 logs $APP_NAME    - Ver logs"
  echo "  pm2 status            - Ver estado"
  echo "  pm2 restart $APP_NAME - Reiniciar"
  echo "=============================================="
}

# Función principal
main() {
  echo ""
  echo "=============================================="
  echo "DESPLIEGUE - Clínica Podológica Carrera"
  echo "=============================================="
  echo ""

  if [ "$FORCE" != true ]; then
    read -p "¿Continuar con el despliegue? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
      log_warning "Despliegue cancelado"
      exit 0
    fi
  fi

  check_requirements
  check_port
  backup_current
  update_code
  install_deps
  build_app
  restart_app
  verify_deployment
  cleanup_backups
  show_summary
}

# Ejecutar
main
