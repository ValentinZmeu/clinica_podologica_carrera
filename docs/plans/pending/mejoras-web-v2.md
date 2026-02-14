# Plan: Mejoras Web v2

## Resumen

Correcciones de bugs, mejoras de UX/UI, accesibilidad y SEO detectadas tras auditoría completa del sitio web.

---

## Tareas de Implementación

### Fase 1: Bugs críticos

- [ ] **1.1** Corregir logo en mobile nav: cambiar `logo.png` a `logo.webp` en `mobile-nav.tsx:265`
- [ ] **1.2** Corregir horario incorrecto en sidebar de servicio individual (`servicios/[slug]/page.tsx:319`). Dice "L-V: 09:30-14:00 y 17:00-20:00" pero debería usar `siteConfig.schedule`
- [ ] **1.3** Corregir URL WhatsApp en sidebar de servicio individual (`servicios/[slug]/page.tsx:288`). Usa `siteConfig.whatsapp.replace(/\s/g, '')` que deja el `+`, debería usar `siteConfig.whatsappLink`
- [ ] **1.4** Eliminar `siteConfig` duplicado en `layout.tsx:18-24` e importar desde `@/lib/constants`

### Fase 2: Navegación y Header

- [ ] **2.1** Añadir indicador de página activa en los enlaces del navbar (highlight con color/underline)
- [ ] **2.2** Añadir efecto de sombra al header al hacer scroll (`shadow-sm` cuando `scrollY > 0`)
- [ ] **2.3** Corregir breakpoint mobile nav: cambiar `md:hidden` a `lg:hidden` en hamburger button (o viceversa, alinear con el nav desktop que usa `md:flex`)

### Fase 3: Accesibilidad

- [ ] **3.1** Revisar contraste de textos `text-white/60` y `text-white/70` en hero y CTA section contra fondo oscuro (WCAG AA)
- [ ] **3.2** Añadir focus trap y gestión de tecla `Escape` en mobile nav dialog
- [ ] **3.3** Subir opacidades bajas a mínimo `text-white/80` donde no cumplan ratio 4.5:1

### Fase 4: Mejoras UX/UI

- [ ] **4.1** Mover scroll indicator del hero de `bottom-2` a `bottom-8` para mejor visibilidad
- [ ] **4.2** Cambiar mapa de contacto de `grayscale` por defecto a color (o grayscale más suave con `grayscale-[50%]`)
- [ ] **4.3** Añadir enlace a reseñas de Google en el footer
- [ ] **4.4** Diferenciar la sección "¿Por qué elegir nuestros servicios?" de `/servicios` respecto a Benefits del home (evitar redundancia)

### Fase 5: SEO y Rendimiento

- [ ] **5.1** Verificar/crear `sitemap.xml` (Next.js puede generarlo automáticamente con `app/sitemap.ts`)
- [ ] **5.2** Verificar/crear `robots.txt` (con `app/robots.ts`)
- [ ] **5.3** Verificar que existe la imagen `og-image.jpg` referenciada en metadata
- [ ] **5.4** Añadir canonical URLs en páginas interiores (servicios individuales, sobre-nosotros, contacto)

### Fase 6: Contenido y Conversión (requiere assets del cliente)

- [ ] **6.1** Añadir imagen real en la sección hero (foto de la clínica o del equipo)
- [ ] **6.2** Añadir fotos reales del equipo en página "Sobre Nosotros" (reemplazar avatares con iniciales)
- [ ] **6.3** Considerar añadir formulario de contacto básico en página de contacto
- [ ] **6.4** Considerar añadir precios orientativos ("Desde X€") en tarjetas de servicio
- [ ] **6.5** Reemplazar stat "100% Dedicación" por algo más concreto (ej: "3 Especialistas" o "8 Tratamientos")
- [ ] **6.6** Añadir enlaces a redes sociales en footer (si la clínica tiene Instagram/Facebook)

### Post-ejecución

- [ ] Marcar todas las tareas como completadas (`[x]`, `✅`)
- [ ] Mover el plan de `pending/` a `_archive/` con prefijo `05-`
- [ ] Actualizar `docs/plans/README.md` (eliminar de pendientes, añadir a archivados)

---

## Archivos a Modificar

| Archivo | Fase | Cambio | Estado |
|---------|------|--------|--------|
| `src/components/layout/mobile-nav.tsx` | 1, 2 | Fix logo, alinear breakpoints | ❌ |
| `src/app/servicios/[slug]/page.tsx` | 1 | Fix horario y URL WhatsApp | ❌ |
| `src/app/layout.tsx` | 1 | Eliminar siteConfig duplicado | ❌ |
| `src/components/layout/header.tsx` | 2 | Indicador activo, sombra scroll | ❌ |
| `src/components/sections/hero.tsx` | 3, 4 | Contraste, scroll indicator | ❌ |
| `src/components/sections/cta-section.tsx` | 3 | Contraste textos | ❌ |
| `src/app/contacto/page.tsx` | 4 | Mapa grayscale | ❌ |
| `src/components/layout/footer.tsx` | 4, 6 | Enlace reseñas, redes sociales | ❌ |
| `src/app/sitemap.ts` | 5 | Crear si no existe | ❌ |
| `src/app/robots.ts` | 5 | Crear si no existe | ❌ |
| `src/app/servicios/page.tsx` | 4 | Diferenciar sección beneficios | ❌ |
| `src/app/sobre-nosotros/page.tsx` | 6 | Fotos equipo, stat | ❌ |
| `src/components/sections/location.tsx` | 4 | Mapa grayscale | ❌ |

---

## Notas

- **Fase 1-5**: Se pueden ejecutar sin dependencias externas
- **Fase 6**: Requiere assets del cliente (fotos, precios, redes sociales). Marcar como pendiente hasta obtenerlos
- Las fases 1-3 son las más prioritarias (bugs + UX + accesibilidad)

---

## Progreso

- Inicio: 2026-02-14
- Estado: **PENDIENTE**

## Historial

| Fecha | Descripción |
|-------|-------------|
| 2026-02-14 | Plan creado tras auditoría completa del sitio |
