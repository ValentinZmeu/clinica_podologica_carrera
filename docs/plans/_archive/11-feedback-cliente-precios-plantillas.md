# Plan: Feedback cliente — Ajustes de precios y comparativa de plantillas

## Resumen

La clienta (Isabel, podóloga) ha enviado 4 audios + 3 capturas (2026-04-19) señalando tres bloques de copy en la web que pueden inducir a malentendidos o crear conflicto con farmacias. Todos los cambios viven en `data/services.json`.

Cambios solicitados:

1. **FAQ quiropodia precio** — eliminar la idea de que el precio varía según el estado de los pies. Es un precio cerrado, tratamiento integral, igual para todos.
2. **Sección plantillas vs farmacia** — sustituir "de farmacia" por "prefabricadas" para no entrar en conflicto con farmacias y reflejar la realidad: la gente compra plantillas estándar en muchos sitios (Decathlon, bazares, Amazon).
3. **FAQ plantillas precio** — separar el coste del estudio biomecánico (que va aparte) del coste de las plantillas (tres gamas según material/calidad).

## Tareas de Implementación

### Fase 1: Aplicar cambios de contenido en `data/services.json`

- [x] Modificar FAQ `quiropodia-faq-4` (líneas 108-111): precio cerrado, tratamiento integral
- [x] Modificar `additionalSections[0]` del servicio `plantillas-personalizadas` (líneas 196-205): cambiar "farmacia" por "prefabricadas"
- [x] Modificar FAQ `plantillas-faq-6` (líneas 252-256): estudio biomecánico aparte, tres tipos de plantillas

### Fase 2: Validación

- [x] Validar que el JSON sigue siendo válido (`node -e "JSON.parse(...)"`)
- [x] (Opcional) `npm run dev` y revisar `/servicios/quiropodia` y `/servicios/plantillas-personalizadas`
- [x] (Opcional) Revisar tests Playwright que asserteen literales modificados

### Fase 3: Cierre

- [x] Actualizar `changelog.json` con entrada `changed` orientada a usuario final
- [x] Pedir confirmación a la clienta antes de build/deploy

## Textos finales

### Cambio 1 — FAQ quiropodia precio

```
Nuestra quiropodia tiene un precio cerrado, igual para todos los pacientes,
independientemente del estado de los pies. Es un tratamiento integral con una
excelente relación calidad-precio: en una sola sesión nos ocupamos de durezas,
callosidades, uñas y cuidado completo del pie. Contacta con nosotros para
conocer la tarifa actual.
```

### Cambio 2 — Sección plantillas

- Heading: `Plantillas personalizadas vs. plantillas prefabricadas`
- Body:
```
Las plantillas prefabricadas o estándar que se venden en grandes superficies,
tiendas deportivas o por internet ofrecen una solución genérica que no se
adapta a la anatomía de tu pie. Las plantillas personalizadas que fabricamos
en nuestra clínica de Móstoles se diseñan a partir de un estudio biomecánico
individual, lo que permite corregir de forma precisa las alteraciones
específicas de cada paciente y ofrecer resultados duraderos.
```

### Cambio 3 — FAQ plantillas precio

```
El estudio biomecánico y las plantillas se facturan por separado. Trabajamos
con tres tipos de plantillas personalizadas, con precios distintos según el
material y las prestaciones; tras valorar tu caso te recomendamos la más
adecuada y te informamos del coste. Contacta con nosotros para conocer las
tarifas actuales.
```

## Archivos Creados/Modificados

| Archivo | Acción | Estado |
| ------- | ------ | ------ |
| `data/services.json` | Modificar 3 bloques | ✅ |
| `changelog.json` | Añadir entrada `changed` (v0.4.1) | ✅ |

## Progreso

- Inicio: 2026-05-14
- Fin: 2026-05-14
- Estado: **COMPLETADO**

## Historial

| Fecha | Descripción |
| ----- | ----------- |
| 2026-05-14 | Plan creado a partir de audios y capturas del cliente (19/04/2026) |
| 2026-05-14 | Aplicados los 3 cambios en `data/services.json`; añadida v0.4.1 al changelog; JSON validado |
