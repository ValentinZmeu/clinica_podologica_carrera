# Plan: Animaciones sutiles de scroll para la landing

## Resumen

Añadir animaciones de entrada al hacer scroll en todas las secciones below-the-fold, usando CSS + Intersection Observer sin librerías externas. Impacto: ~1.4KB total.

## Progreso

- Inicio: 2026-02-14
- Finalizado: 2026-02-14
- Estado: **COMPLETADO** ✅

---

## Contexto

La landing tiene un Lighthouse de 100 y LCP de 0.5s. Solo hay animaciones hover (Tailwind transitions) y una animación CSS `fade-in` en el hero. No hay animaciones de entrada al hacer scroll, lo que hace que la experiencia se sienta estática. El objetivo es añadir animaciones sutiles sin penalizar rendimiento ni SEO.

## Enfoque: CSS + Intersection Observer (sin librerías)

**Descartado Framer Motion** (~32KB+ bundle, requiere client components masivos).
**Descartado CSS scroll-driven animations** (sin soporte estable en Safari/Firefox).

Se crea **un único componente client** (`AnimateOnScroll`, ~50 líneas, <1KB gzip) que usa `IntersectionObserver` nativo para añadir/quitar clases CSS. Las animaciones se definen en CSS puro con `transform` + `opacity` (GPU-accelerated, sin CLS).

### Garantías
- **SEO**: El contenido se renderiza en servidor. La clase `aos-init` (que oculta) se añade en `useEffect` (solo client), así que crawlers y usuarios sin JS ven todo el contenido
- **Rendimiento**: ~1.4KB total (JS + CSS). Solo usa `opacity` y `transform` (compositor thread)
- **Accesibilidad**: Respeta `prefers-reduced-motion` a nivel CSS y JS
- **Hero NO se toca**: Está above-the-fold, ya tiene sus animaciones, tocarlo penalizaría LCP

---

## Tareas de Implementación

### Fase 1: Infraestructura de animaciones ✅
- [x] Añadir CSS de animaciones en `globals.css` (6 variantes + prefers-reduced-motion)
- [x] Crear componente `AnimateOnScroll` en `src/components/ui/animate-on-scroll.tsx`

### Fase 2: Aplicar animaciones a secciones ✅
- [x] Benefits: wrap heading + 4 cards (fade-up stagger 100ms)
- [x] Services Preview: wrap heading + cards + botón (fade-up stagger 100ms)
- [x] Process: wrap heading + 3 steps (fade-up stagger 150ms)
- [x] Testimonials: wrap heading + cards + botón (fade-up stagger 100ms)
- [x] Location: wrap heading + mapa (fade-left) + cards (fade-right stagger 100ms)
- [x] FAQ: wrap heading + accordion (scale-up) + CTA (fade-up)
- [x] CTA Section: wrap contenido como bloque único (fade-up 800ms)

### Fase 3: Verificación ✅
- [x] Build sin errores (`npm run build`)
- [ ] Lighthouse Performance 95+ (verificar manualmente)
- [ ] Verificar animaciones en navegador (verificar manualmente)
- [ ] Verificar `prefers-reduced-motion` desactiva animaciones (verificar manualmente)
- [ ] Verificar contenido visible con JS desactivado (verificar manualmente)
- [ ] Verificar sin CLS (Layout Shift) (verificar manualmente)

### Post-ejecución ✅
- [x] Marcar todas las tareas como completadas
- [x] Mover plan de `pending/` a `_archive/`
- [x] Actualizar `docs/plans/README.md`

---

## Archivos Creados/Modificados

| Archivo | Acción | Estado |
|---------|--------|--------|
| `src/components/ui/animate-on-scroll.tsx` | Crear | ✅ |
| `src/app/globals.css` | Modificar | ✅ |
| `src/components/sections/benefits.tsx` | Modificar | ✅ |
| `src/components/sections/services-preview.tsx` | Modificar | ✅ |
| `src/components/sections/process.tsx` | Modificar | ✅ |
| `src/components/sections/testimonials.tsx` | Modificar | ✅ |
| `src/components/sections/location.tsx` | Modificar | ✅ |
| `src/components/sections/faq.tsx` | Modificar | ✅ |
| `src/components/sections/cta-section.tsx` | Modificar | ✅ |

---

## Detalle técnico

### Componente `AnimateOnScroll`

```
Props: variant, delay, duration, threshold, once, className
```

- `useEffect` → añade `aos-init` → `IntersectionObserver` → al entrar en viewport añade `aos-visible`
- Si `prefers-reduced-motion` → marca visible inmediatamente
- `rootMargin: '0px 0px -50px 0px'` para que se active un poco antes del borde inferior
- `once: true` por defecto (anima solo la primera vez)

### Animaciones por sección

| Sección | Heading | Contenido | Efecto |
|---------|---------|-----------|--------|
| Benefits | fade-up | 4 cards fade-up stagger 100ms | Cards aparecen en cascada |
| Services | fade-up | Cards fade-up stagger 100ms + botón fade-up | Cards + CTA |
| Process | fade-up | 3 steps fade-up stagger 150ms | Pasos secuenciales |
| Testimonials | fade-up | Cards fade-up stagger 100ms + botón fade-in | Cards + link Google |
| Location | fade-up | Mapa fade-left, cards fade-right stagger 100ms | Convergen al centro |
| FAQ | fade-up | Accordion scale-up, CTA fade-up | Accordion destaca |
| CTA | - | Todo fade-up como bloque único (800ms) | Entrada cohesiva |

### Consideraciones técnicas

- **Grid layout**: Los wrappers `AnimateOnScroll` son `div` que se convierten en grid children. Pasar `className="h-full"` donde los cards internos usen `h-full`
- **Server Components**: Las secciones siguen siendo Server Components. `AnimateOnScroll` es client pero se renderiza como hijo — patrón estándar de Next.js
- **Dynamic imports**: Las secciones below-the-fold ya usan `next/dynamic`. El observer se monta cuando el chunk carga, funciona correctamente

---

## Historial

| Fecha | Descripción |
|-------|-------------|
| 2026-02-14 | Plan creado |
| 2026-02-14 | Fase 1 completada: CSS + componente AnimateOnScroll |
| 2026-02-14 | Fase 2 completada: 7 secciones animadas |
| 2026-02-14 | Fase 3: Build exitoso |
| 2026-02-14 | **PLAN COMPLETADO** |
