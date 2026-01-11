# Google Rich Results Test

Esta guía explica cómo validar los datos estructurados (JSON-LD) de la web para asegurar que Google pueda mostrar rich snippets.

## ¿Qué son los Rich Results?

Los Rich Results son resultados de búsqueda enriquecidos que muestran información adicional como:
- Calificaciones con estrellas (★★★★★)
- Precio de servicios
- Horarios de apertura
- Información de contacto
- FAQs
- Breadcrumbs (migas de pan)

## Datos Estructurados Implementados

La web incluye JSON-LD en las siguientes páginas:

### Página Principal (`/`)

- **LocalBusiness**: Información de la clínica
- **Organization**: Datos de la empresa
- **WebSite**: Metadatos del sitio

### Servicios (`/servicios`, `/servicios/[slug]`)

- **Service**: Cada servicio con descripción y proveedor
- **BreadcrumbList**: Navegación breadcrumb

### Contacto (`/contacto`)

- **LocalBusiness**: Con horarios, ubicación y contacto
- **GeoCoordinates**: Coordenadas de Google Maps

### FAQs (`/`)

- **FAQPage**: Preguntas frecuentes

### Sobre Nosotros (`/sobre-nosotros`)

- **AboutPage**: Información sobre la clínica y el equipo

## Cómo Hacer el Test

### Opción 1: URL en Producción (Recomendado)

1. Ve a: **https://search.google.com/test/rich-results**
2. Ingresa la URL: `https://clinica-podologica-carrera.com`
3. Click en **"Probar URL"**
4. Espera los resultados (30-60 segundos)

### Opción 2: Código HTML Local

Si la web aún no está en producción:

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre la página en el navegador: `http://localhost:3000`

3. View source (Ctrl+U o botón derecho → "Ver código fuente")

4. Copia TODO el HTML (Ctrl+A, Ctrl+C)

5. Ve a: **https://search.google.com/test/rich-results**

6. Selecciona la pestaña **"CÓDIGO"**

7. Pega el HTML completo

8. Click en **"PROBAR CÓDIGO"**

### Opción 3: Usar ngrok (Túnel Local)

Para testear con URL antes de deploy:

```bash
# Instalar ngrok
# Windows: choco install ngrok
# Mac: brew install ngrok

# Iniciar servidor local
npm run dev

# En otra terminal, crear túnel
ngrok http 3000

# Copiar la URL HTTPS que te da ngrok (ej: https://abc123.ngrok.io)
# Usar esa URL en Google Rich Results Test
```

## Páginas a Testear

Testea cada una de estas URLs para verificar todos los tipos de datos estructurados:

| URL | Tipo de Schema | Qué valida |
|-----|----------------|------------|
| `/` | LocalBusiness, Organization, FAQPage | Información de negocio, FAQs |
| `/servicios` | ItemList, BreadcrumbList | Lista de servicios |
| `/servicios/quiropodia` | Service, BreadcrumbList | Servicio específico |
| `/contacto` | LocalBusiness | Horarios, ubicación |
| `/sobre-nosotros` | AboutPage | Información del equipo |

## Errores Comunes y Soluciones

### ⚠️ "Missing field 'image'"

**Solución**: Añadir imagen a LocalBusiness:

```typescript
"image": "https://clinica-podologica-carrera.com/images/entrada-clinica.webp"
```

### ⚠️ "Invalid value for 'priceRange'"

**Solución**: Usar formato correcto:

```typescript
"priceRange": "€€"  // Correcto
"priceRange": "25-80€"  // Incorrecto
```

### ⚠️ "Missing field 'address'"

**Solución**: Asegúrate de incluir PostalAddress completo:

```json
"address": {
  "@type": "PostalAddress",
  "streetAddress": "C. de la Carrera, 7",
  "addressLocality": "Móstoles",
  "addressRegion": "Madrid",
  "postalCode": "28931",
  "addressCountry": "ES"
}
```

### ⚠️ "URL must be absolute"

**Solución**: Usar URLs completas con dominio:

```typescript
"url": "https://clinica-podologica-carrera.com/servicios/quiropodia"  // Correcto
"url": "/servicios/quiropodia"  // Incorrecto
```

## Verificar Implementación Actual

Para ver el JSON-LD en cualquier página:

1. Abre la página en el navegador
2. Abre DevTools (F12)
3. Consola, ejecuta:

```javascript
// Ver todos los scripts JSON-LD
document.querySelectorAll('script[type="application/ld+json"]').forEach((script, i) => {
  console.log(`JSON-LD ${i + 1}:`, JSON.parse(script.textContent));
});
```

## Resultados Esperados

### ✅ Sin Errores

Si todo está correcto, deberías ver:

- **"Valid"** con checkmark verde ✓
- Lista de tipos de schema detectados
- Vista previa de cómo se mostrará en Google

### ⚠️ Con Advertencias

Las advertencias no impiden que funcione, pero mejoran la presentación:

- "Recommended field missing": Campos opcionales pero recomendados
- Sigue siendo válido, pero añade esos campos para mejor resultado

### ❌ Con Errores

Si hay errores críticos:

1. Copia el mensaje de error completo
2. Identifica el tipo de schema con problema
3. Ve al archivo correspondiente en `src/app/`
4. Corrige el JSON-LD siguiendo el mensaje de error

## Monitoreo Continuo

### Google Search Console (Post-Deploy)

Una vez en producción:

1. Registra la web en **Google Search Console**
2. Ve a **"Mejoras" → "Datos estructurados"**
3. Verás un informe con:
   - Tipos de schema detectados
   - Páginas con errores/advertencias
   - Tendencia histórica

### Validación Automática

Considera añadir test automatizado:

```bash
# Instalar schema-dts (opcional)
npm install -D schema-dts

# Crear test que valide estructura de JSON-LD
```

## Recursos

- **Rich Results Test**: https://search.google.com/test/rich-results
- **Schema.org**: https://schema.org/
- **Google Search Central**: https://developers.google.com/search/docs/appearance/structured-data
- **LocalBusiness Schema**: https://schema.org/LocalBusiness
- **Service Schema**: https://schema.org/Service

## Checklist

- [ ] Testear página principal (/)
- [ ] Testear página de servicios (/servicios)
- [ ] Testear 2-3 páginas de servicios individuales
- [ ] Testear página de contacto
- [ ] Testear página sobre nosotros
- [ ] Verificar que NO hay errores críticos
- [ ] Corregir advertencias importantes
- [ ] Registrar en Google Search Console (post-deploy)
- [ ] Monitorear informe de datos estructurados semanalmente
