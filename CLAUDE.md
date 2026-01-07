# Clínica Podológica Carrera - Instrucciones del Proyecto

## Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Database**: SQLite + Prisma
- **Language**: TypeScript (strict mode)
- **Testing**: Playwright (E2E)

## Reglas Aplicables

Aplica las reglas de:
- `~/.claude/rules/global/*`
- `~/.claude/rules/lenguajes/typescript.md`
- `~/.claude/rules/frontend/nextjs/*`
- `~/.claude/rules/proyectos/landing/*`

---

## Flujo de Trabajo

### Acciones bajo demanda

Las siguientes acciones **solo se ejecutan cuando el usuario lo pide explícitamente**:

| Acción | Comando | Cuándo ejecutar |
|--------|---------|-----------------|
| Build | `npm run build` | Solo si el usuario dice "build", "compila", etc. |
| Commit | `git commit` | Solo si el usuario dice "commit", "commitea", etc. |
| Push | `git push` | Solo si el usuario lo pide explícitamente |
| Deploy | Cualquier deploy | Solo si el usuario lo pide explícitamente |

### Flujo por defecto

1. Realizar los cambios solicitados en los archivos
2. Informar al usuario de los cambios realizados
3. **Esperar** a que el usuario decida si quiere build/commit/push

---

## Gestión de Planes

### Estructura de carpetas

```
docs/plans/
├── pending/          # Planes pendientes o en progreso
├── _archive/         # Planes completados y archivados
└── README.md         # Índice de planes
```

### Estados de planes

| Estado      | Ubicación   | Descripción                    |
|-------------|-------------|--------------------------------|
| Pendiente   | `pending/`  | Plan creado, sin iniciar       |
| En progreso | `pending/`  | Plan parcialmente ejecutado    |
| Completado  | `_archive/` | Plan terminado y commiteado    |

### Flujo de trabajo

1. **Crear plan**: Añadir archivo en `pending/`
2. **Ejecutar**: Marcar tareas completadas con `[x]`
3. **Archivar**: Mover a `_archive/` cuando esté 100% completado
4. **Actualizar README**: Reflejar cambios en `docs/plans/README.md`

### Sincronización obligatoria (IMPORTANTE)

Después de completar cada tarea o grupo de tareas relacionadas:

1. **Actualizar el plan activo**: Marcar `[x]` en las tareas completadas
2. **Actualizar tablas de estado**: Si hay tablas con ❌/✅, actualizarlas
3. **Añadir entrada al historial**: Registrar qué se completó y cuándo
4. **Verificar si la fase está completa**: Si todas las tareas de una fase están hechas, marcarla como ✅
5. **Verificar si el plan está completo**: Si todas las fases están terminadas:
   - Cambiar estado a **COMPLETADO**
   - Mover archivo de `pending/` a `_archive/`
   - Actualizar `docs/plans/README.md` moviendo el plan a la tabla de archivados

### Checklist de sincronización

```markdown
- [ ] Tareas individuales marcadas como [x]
- [ ] Tablas de estado actualizadas (❌ → ✅)
- [ ] Historial actualizado con fecha y descripción
- [ ] Fase marcada como completa si aplica
- [ ] Plan movido a _archive/ si 100% completado
- [ ] README.md de plans actualizado
```

### Convención de nombres

- Formato: `nombre-funcionalidad.md` o `YYYY-MM-DD_nombre-funcionalidad.md`
- Nombres en minúsculas con guiones
- Sin prefijos numéricos

### Estructura de un plan

```markdown
# Plan: [Nombre de la Funcionalidad]

## Resumen
Breve descripción del objetivo.

## Tareas de Implementación

### Fase 1: [Nombre]
- [ ] Tarea 1
- [ ] Tarea 2

## Archivos Creados/Modificados

| Archivo           | Acción   | Estado |
|-------------------|----------|--------|
| `path/to/file.ts` | Crear    | ❌/✅  |

## Progreso
- Inicio: YYYY-MM-DD
- Estado: **PENDIENTE** / **EN PROGRESO** / **COMPLETADO**
```

---

## Testing con Playwright

### Atributo de testing: `data-testid`

Usar el atributo estándar `data-testid` para identificar elementos en tests E2E.

### Convención de nomenclatura

```
data-testid="[seccion]-[tipo]-[nombre]"
```

### Tipos de elementos

| Tipo   | Descripción       | Ejemplo                        |
|--------|-------------------|--------------------------------|
| table  | Tablas de datos   | `services-table`               |
| row    | Filas de tabla    | `services-row-{id}`            |
| button | Botones           | `hero-cta-button`              |
| input  | Campos de texto   | `contact-form-email-input`     |
| form   | Formularios       | `contact-form`                 |
| card   | Tarjetas          | `service-card-{slug}`          |
| list   | Listas            | `testimonials-list`            |
| item   | Items de lista    | `testimonial-item-{id}`        |
| link   | Enlaces           | `nav-services-link`            |
| section| Secciones         | `hero-section`                 |

### Ejemplos para este proyecto

```tsx
<!-- Navegación -->
<a data-testid="nav-home-link">Inicio</a>
<a data-testid="nav-services-link">Servicios</a>
<button data-testid="nav-cta-button">Pedir Cita</button>

<!-- Hero -->
<section data-testid="hero-section">
  <button data-testid="hero-whatsapp-button">WhatsApp</button>
  <button data-testid="hero-call-button">Llamar</button>
</section>

<!-- Servicios -->
<div data-testid="services-grid">
  <div data-testid="service-card-quiropodia">...</div>
  <div data-testid="service-card-plantillas">...</div>
</div>

<!-- Testimonios -->
<div data-testid="testimonials-carousel">
  <div data-testid="testimonial-item-1">...</div>
</div>

<!-- Contacto -->
<form data-testid="contact-form">
  <input data-testid="contact-form-name-input" />
  <input data-testid="contact-form-email-input" />
  <input data-testid="contact-form-phone-input" />
  <textarea data-testid="contact-form-message-input" />
  <button data-testid="contact-form-submit-button">Enviar</button>
</form>
```

### Uso en Playwright

```typescript
// Localizar por testId
await page.getByTestId('hero-section').isVisible();
await page.getByTestId('hero-whatsapp-button').click();
await page.getByTestId('contact-form-email-input').fill('test@example.com');

// Localizar elemento dinámico
await page.getByTestId(`service-card-${serviceSlug}`).click();
```

### Reglas

- **Obligatorio** en todos los elementos interactivos (botones, inputs, links)
- **Obligatorio** en secciones principales y contenedores
- **IDs dinámicos** para elementos repetidos (`-{id}` o `-{slug}` al final)
- **Consistencia** entre secciones (mismo patrón de nombres)
- **No usar para estilos** (solo para testing)

---

## Reglas de Commits

### Estructura

Los commits deben seguir **Conventional Commits**:

```
<tipo>(<alcance>): <descripción>
```

### Tipos permitidos

| Tipo     | Uso                                      |
|----------|------------------------------------------|
| feat     | Nueva funcionalidad                      |
| fix      | Corrección de bug                        |
| docs     | Cambios en documentación                 |
| style    | Formato, espacios (sin cambios de código)|
| refactor | Refactorización                          |
| perf     | Mejoras de rendimiento                   |
| test     | Tests                                    |
| chore    | Tareas de mantenimiento                  |

### Alcances para este proyecto

- `landing` - Página principal
- `services` - Páginas de servicios
- `contact` - Formulario y página de contacto
- `seo` - Metadatos, JSON-LD, sitemap
- `db` - Base de datos y Prisma
- `ui` - Componentes de interfaz
- `config` - Configuración del proyecto

### Reglas obligatorias

1. **Commits por funcionalidad**: Agrupar cambios relacionados en un solo commit
2. **Actualizar documentación**: Antes de commitear, actualizar docs afectados
3. **Actualizar changelog.json**: Añadir entrada para cambios significativos
4. **NO incluir**: `Co-Authored-By` ni referencias a asistentes IA en los commits

### Ejemplos de commits

```bash
feat(landing): añadir sección hero con CTAs
feat(services): crear página de quiropodía
fix(contact): corregir validación de teléfono
docs(plans): actualizar progreso del plan
chore(db): añadir seed de servicios
```

---

## Changelog

### Ubicación

El archivo `changelog.json` está en la raíz del proyecto.

### Estructura

```json
{
  "versions": [
    {
      "version": "0.1.0",
      "date": "YYYY-MM-DD",
      "title": "Título descriptivo",
      "changes": [
        { "type": "added", "description": "..." },
        { "type": "changed", "description": "..." },
        { "type": "fixed", "description": "..." }
      ]
    }
  ]
}
```

### Tipos de cambio

- `added`: Nueva funcionalidad
- `changed`: Cambios en funcionalidad existente
- `fixed`: Correcciones
- `removed`: Funcionalidad eliminada

### Reglas

- Descripciones **para usuarios finales** (no técnicos)
- No mencionar tecnologías específicas
- Incrementar versión según **semver**:
  - MAJOR: cambios incompatibles
  - MINOR: nuevas funcionalidades
  - PATCH: correcciones

---

## Buenas Prácticas de Código

### TypeScript

- **No usar `any`** - Usar `unknown` si es necesario
- **Tipar todas las funciones** y variables
- **Usar interfaces** para objetos complejos
- **Strict mode** habilitado

### React/Next.js

- **Server Components** por defecto
- **Client Components** solo cuando necesario (`'use client'`)
- **Componentización** reutilizable
- **next/image** para todas las imágenes

### Estilos

- Usar **variables CSS de Tailwind**, no valores hardcoded
- Seguir la **paleta de colores** definida:
  - Primary: Sky blue (#0ea5e9)
  - Accent: Emerald green (#10b981)
- **Mobile-first** approach

### Accesibilidad

- **Alt text** en todas las imágenes
- **Labels** en todos los formularios
- **Contraste** WCAG AA mínimo
- **Navegación por teclado** funcional
- **ARIA labels** en elementos interactivos

### SEO

- **H1 único** por página
- **Metadatos** en todas las páginas
- **JSON-LD** para structured data
- **URLs semánticas** (slugs descriptivos)
- **Imágenes optimizadas** (WebP, lazy loading)

---

## Estructura del Proyecto

```
clinica_podologica_carrera_v2/
├── prisma/
│   ├── schema.prisma      # Esquema de base de datos
│   ├── seed.ts            # Datos iniciales
│   └── dev.db             # SQLite (gitignored)
├── public/
│   └── images/            # Assets estáticos
├── src/
│   ├── app/               # App Router pages
│   ├── components/
│   │   ├── ui/            # shadcn/ui
│   │   ├── layout/        # Header, Footer
│   │   ├── sections/      # Secciones landing
│   │   └── seo/           # JSON-LD
│   ├── lib/               # Utilidades
│   └── data/              # Queries DB
├── docs/
│   └── plans/             # Planes de desarrollo
├── data.json              # Datos de la clínica
├── changelog.json         # Historial de cambios
└── CLAUDE.md              # Este archivo
```

---

## Datos de la Clínica

Los datos de contacto están en `data.json`:

- **Nombre**: Clínica Podológica Carrera
- **Dirección**: C. de la Carrera, 7, 28931 Móstoles, Madrid
- **Teléfono**: +34 912 26 88 58
- **WhatsApp**: +34 682 15 81 58
- **Web**: https://podologiacarrera.com
- **Horarios**: L-V 09:30-14:00 y 17:00-20:00
- **Rating**: 4.8 estrellas
