# Plan: Mejoras Web v2

## Resumen

Correcciones de bugs, mejoras de UX/UI, accesibilidad y SEO detectadas tras auditoría completa del sitio web.

---

## Tareas de Implementación

### Fase 1: Bugs críticos

- [x] **1.1** Corregir logo en mobile nav: cambiar `logo.png` a `logo.webp`
- [x] **1.2** Corregir horario incorrecto en sidebar de servicio individual (usar `siteConfig.schedule`)
- [x] **1.3** Corregir URL WhatsApp en sidebar de servicio individual (usar `formatWhatsAppUrl`)
- [x] **1.4** Eliminar `siteConfig` duplicado en `layout.tsx` e importar desde `@/lib/constants`

### Fase 2: Navegación y Header

- [x] **2.1** Añadir indicador de página activa en los enlaces del navbar (highlight con color/underline)
- [x] **2.2** Añadir efecto de sombra al header al hacer scroll (`shadow-sm` cuando `scrollY > 0`)
- [x] **2.3** Alinear breakpoints entre nav desktop (`lg:flex`) y hamburger button (`lg:hidden`)

### Fase 3: Accesibilidad

- [x] **3.1** Revisar contraste de textos en hero y CTA section contra fondo oscuro (WCAG AA)
- [x] **3.2** Añadir gestión de tecla `Escape` en mobile nav dialog
- [x] **3.3** Subir opacidades bajas a mínimo `text-white/80` donde no cumplían ratio 4.5:1

### Fase 4: Mejoras UX/UI

- [x] **4.1** Mover scroll indicator del hero de `bottom-2` a `bottom-8`
- [x] **4.2** Quitar mapa `grayscale` en contacto y location (mostrar en color)
- [x] **4.3** Añadir enlace a reseñas de Google en el footer (con estrella y rating)
- [x] **4.4** Diferenciar sección de `/servicios` como "Nuestro Enfoque Clínico" (pasos 1-2-3)

### Fase 5: SEO y Rendimiento

- [x] **5.1** Verificar `sitemap.xml` (ya existía `app/sitemap.ts`)
- [x] **5.2** Verificar `robots.txt` (ya existía `app/robots.ts`)
- [x] **5.3** Corregir og-image: apuntar a imagen real de la clínica (`entrada-clinica.webp`)
- [x] **5.4** Añadir canonical URLs en servicios, sobre-nosotros, contacto y servicios/[slug]

### Fase 6: Contenido y Conversión (requiere assets del cliente)

- [x] **6.1** Añadir imagen real en la sección hero (foto de la clínica o del equipo)
- [ ] **6.2** Añadir fotos reales del equipo en página "Sobre Nosotros" (reemplazar avatares con iniciales)
- [ ] **6.3** Considerar añadir formulario de contacto básico en página de contacto
- [ ] **6.4** Considerar añadir precios orientativos ("Desde X€") en tarjetas de servicio
- [ ] **6.5** Reemplazar stat "100% Dedicación" por algo más concreto (ej: "3 Especialistas" o "8 Tratamientos")
- [ ] **6.6** Añadir enlaces a redes sociales en footer (si la clínica tiene Instagram/Facebook)

### Post-ejecución

- [x] Marcar todas las tareas ejecutables como completadas (`[x]`, `✅`)
- [ ] Mover el plan de `pending/` a `_archive/` con prefijo `05-` (cuando fase 6 se complete)
- [ ] Actualizar `docs/plans/README.md` (cuando se archive)

---

## Archivos Modificados

| Archivo | Fase | Cambio | Estado |
|---------|------|--------|--------|
| `src/components/layout/mobile-nav.tsx` | 1, 3 | Fix logo.webp, Escape key | ✅ |
| `src/app/servicios/[slug]/page.tsx` | 1, 5 | Fix horario, WhatsApp URL, canonical | ✅ |
| `src/app/layout.tsx` | 1 | Importar siteConfig desde constants | ✅ |
| `src/components/layout/header.tsx` | 2 | Indicador activo, sombra scroll | ✅ |
| `src/components/sections/hero.tsx` | 3, 4, 6 | Contraste white/80, scroll indicator bottom-8, imagen fondo | ✅ |
| `src/components/sections/cta-section.tsx` | 3 | Contraste white/80 | ✅ |
| `src/app/contacto/page.tsx` | 4, 5 | Quitar grayscale mapa, canonical | ✅ |
| `src/components/layout/footer.tsx` | 4 | Enlace Google Reviews con estrella | ✅ |
| `src/app/servicios/page.tsx` | 4, 5 | "Nuestro Enfoque Clínico", canonical | ✅ |
| `src/app/sobre-nosotros/page.tsx` | 5 | Canonical URL | ✅ |
| `src/components/sections/location.tsx` | 4 | Quitar grayscale mapa | ✅ |
| `src/lib/constants.ts` | 1, 5 | Description + og-image actualizados | ✅ |

---

## Notas

- **Fases 1-5**: Completadas
- **Fase 6**: Pendiente - requiere assets del cliente (fotos, precios, redes sociales)
- Build verificado: OK sin errores

---

## Progreso

- Inicio: 2026-02-14
- Estado: **EN PROGRESO** (fases 1-5 completadas, fase 6 pendiente de assets)

## Historial

| Fecha | Descripción |
|-------|-------------|
| 2026-02-14 | Plan creado tras auditoría completa del sitio |
| 2026-02-14 | Fases 1-5 ejecutadas: bugs, header, accesibilidad, UX/UI, SEO |
| 2026-02-14 | Fase 6.1: imagen hero añadida (PNG→WebP, 7MB→124KB) |
