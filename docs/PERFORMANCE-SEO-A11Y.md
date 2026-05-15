# Buenas prácticas: Rendimiento + SEO + Accesibilidad

> Guía agnóstica de proyecto basada en lecciones reales corrigiendo problemas de
> indexación, Core Web Vitals y WCAG en un sitio Next.js 14 desplegado en VPS
> con Plesk. Aplicable a cualquier stack moderno con Next.js / SSR / contenedores.
>
> **Cómo usarla:** lectura única antes de iniciar un proyecto + checklist
> pre-launch + sección de debugging cuando algo falle.

---

## Índice

1. [Pilares y prioridades](#1-pilares-y-prioridades)
2. [SEO técnico — fundamentos](#2-seo-técnico--fundamentos)
3. [Datos estructurados (JSON-LD)](#3-datos-estructurados-json-ld)
4. [Rendimiento — Core Web Vitals](#4-rendimiento--core-web-vitals)
5. [Accesibilidad WCAG AA](#5-accesibilidad-wcag-aa)
6. [SEO en la era de la IA — llms.txt](#6-seo-en-la-era-de-la-ia--llmstxt)
7. [Logo y favicon en la SERP](#7-logo-y-favicon-en-la-serp)
8. [Infraestructura — el deploy es SEO](#8-infraestructura--el-deploy-es-seo)
9. [Debugging — cómo resolver problemas comunes](#9-debugging--cómo-resolver-problemas-comunes)
10. [Checklist pre-launch](#10-checklist-pre-launch)
11. [Monitorización post-launch](#11-monitorización-post-launch)
12. [Herramientas y referencias](#12-herramientas-y-referencias)

---

## 1. Pilares y prioridades

Tres ejes que se solapan más de lo que parece:

- **SEO** = que Google entienda, confíe y muestre tu sitio.
- **Rendimiento (Core Web Vitals)** = forma parte del ranking desde 2021.
  Un sitio lento se posiciona peor aunque tenga buen contenido.
- **Accesibilidad** = legalmente obligatoria en UE para muchos sectores, y
  forma parte de la señal "Page Experience" de Google.

**Regla de oro:** un sitio que falla 5xx aunque sea 30 segundos durante un
crawl de Google pierde indexación de URLs concretas durante semanas. La
infraestructura **es** SEO.

---

## 2. SEO técnico — fundamentos

### 2.1 Dominio canónico decidido el día 0

Antes de la primera línea de código:

- Decide UN dominio canónico (con/sin www, .com/.es, etc.).
- Documenta la decisión en `CLAUDE.md` / `README.md`.
- TODOS los alias (`www.`, `.com` si el canónico es `.es`, etc.) **redirigen
  con 301 al canónico a nivel servidor**, no a nivel app.

**Patrón obligatorio en código:**

```ts
// src/lib/constants.ts (o equivalente)
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://midominio.com";

export const siteConfig = {
  url: siteUrl,
  ogImage: `${siteUrl}/og.webp`,
  // …
};
```

**Trampa común:** hardcodear el dominio en una constante mientras la
env-var apunta a otro. El sitemap saldrá con URLs de `.com` mientras el sitio
se sirve en `.es`. Mala señal SEO durante semanas.

### 2.2 Sitemap dinámico nativo de Next.js

```ts
// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: siteConfig.url, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    // …
  ];
  // + páginas dinámicas desde DB/JSON
  return staticPages;
}
```

**Reglas:**

- **Solo URLs indexables.** Aviso legal, cookies, privacidad y `/api/*` quedan fuera.
- Cada entry con `lastModified`, `changeFrequency`, `priority`.
- Dinámico (lee de DB/JSON), nunca `public/sitemap.xml` estático.
- **NO uses `next-sitemap`** (paquete deprecado, sin updates en 3 años).

### 2.3 robots.ts con bloque para AI crawlers

Los bots de búsqueda AI (ChatGPT, Claude, Perplexity, Gemini) son ya canal
real de tráfico. Bloque explícito en `robots.ts`:

```ts
// src/app/robots.ts
const AI_CRAWLERS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended',
  'CCBot', 'Bytespider', 'meta-externalagent',
  'Amazonbot', 'DuckAssistBot', 'cohere-ai',
  'MistralAI-User', 'YouBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/aviso-legal', '/cookies', '/privacidad'],
      },
      {
        userAgent: AI_CRAWLERS,
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
```

### 2.4 `metadataBase` + canonical por página

En `app/layout.tsx`:

```ts
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: siteConfig.url },
  openGraph: { url: siteConfig.url, … },
  // …
};
```

En CADA `page.tsx`:

```ts
export const metadata: Metadata = {
  alternates: { canonical: `${siteConfig.url}/ruta-especifica` },
  // …
};
```

Páginas legales:

```ts
export const metadata: Metadata = {
  robots: 'noindex, follow',
};
```

### 2.5 Decisión consciente sobre `Disallow` + `noindex`

`noindex` y `Disallow` no son redundantes — son complementarios:

- **Solo `noindex`** (metadata): Google rastrea pero no indexa. Consume crawl budget.
- **Solo `Disallow`** (robots.txt): Google no rastrea pero **puede indexar** si encuentra enlaces externos.
- **Ambos**: tras el primer crawl Google ya tiene el `noindex` cacheado y respeta el `Disallow`. Ahorra crawl budget.

**Recomendación**: para páginas que ya fueron rastreadas, ambos. Para páginas nuevas que nunca queremos en el índice, solo `noindex` la primera vez y añadir `Disallow` cuando confirmamos que Google las ha procesado.

---

## 3. Datos estructurados (JSON-LD)

### 3.1 Reglas duras del `aggregateRating`

Tipos **elegibles** para review snippets (Google los acepta como padre de `aggregateRating`):

`LocalBusiness`, `Organization`, `Product`, `Recipe`, `Movie`, `Event`,
`Course`, `SoftwareApplication`, `Book`, `CreativeWork`, `MediaObject`.

Tipos **NO elegibles** (Google los rechaza):

`Service`, `MedicalProcedure`, `MedicalCondition`, `Place`, `Person`,
`Article`, `WebPage`.

**Trampa común:** anidar `aggregateRating` en el `provider` (Podiatrist /
LocalBusiness) **dentro de** un `MedicalProcedure`. Google interpreta que el
rating pertenece al MedicalProcedure (entidad principal de la página) y lo
rechaza con `"El tipo de objeto del campo '<parent_node>' no es válido"`.

**Solución:** una sola fuente de `aggregateRating` por sitio (típicamente en
el `LocalBusiness` del home). No la repitas en sub-páginas.

### 3.2 Números literales, no strings

```diff
- bestRating: '5', worstRating: '1', ratingCount: String(23)
+ bestRating: 5,   worstRating: 1,   ratingCount: 23
```

Schema.org acepta ambos pero Google a veces marca strings como warning.

### 3.3 Validación automática en CI

Test que valida que ningún JSON-LD inválido vuelva a colarse:

```ts
// e2e/seo.spec.ts (Playwright)
const RATING_ELIGIBLE = new Set([
  'LocalBusiness', 'MedicalBusiness', 'Organization', 'Product',
  'Recipe', 'Movie', 'Event', 'Course', 'SoftwareApplication',
  'Book', 'CreativeWork',
]);

test('aggregateRating solo en tipos elegibles', async ({ page }) => {
  for (const path of indexablePages) {
    await page.goto(path);
    const blocks = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    for (const raw of blocks) {
      const data = JSON.parse(raw);
      const violations = findRatingViolations(data);
      expect(violations, `${path}: ${violations.join(' | ')}`).toEqual([]);
    }
  }
});

function findRatingViolations(node, parent = null) {
  // walk recursivo: cuando encuentres aggregateRating, mira el @type del parent
}
```

Sin este test, el bug vuelve al primer refactor. Con el test, el CI bloquea
cualquier regresión.

### 3.4 Validación manual antes del primer deploy

[Google Rich Results Test](https://search.google.com/test/rich-results) sobre
al menos 3 URLs representativas:

- Home (LocalBusiness + Organization + WebSite + BreadcrumbList).
- Una página de listado (CollectionPage / ItemList).
- Una página de detalle (MedicalProcedure / Product / Article).

---

## 4. Rendimiento — Core Web Vitals

### 4.1 Google Analytics: SIEMPRE `lazyOnload`

Wrappers como `<GoogleAnalytics>` de `@next/third-parties/google` usan
`afterInteractive` hardcoded. Resultado: ~65 KiB de gtag.js bloqueando LCP
sin necesidad. **Reemplazar por `<Script>` manual:**

```tsx
import Script from 'next/script';

const gaId = process.env.NEXT_PUBLIC_GA_ID ?? 'G-XXXXXXXX';

{gaId && (
  <>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      strategy="lazyOnload"
    />
    <Script id="ga-init" strategy="lazyOnload">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    `}</Script>
  </>
)}
```

**Trade-off**: en sesiones ultracortas (<3 s y cerrar pestaña) se pueden
perder hits. Aceptable para todo lo que no sea analytics financiero.

### 4.2 Fallback hardcodeado para IDs públicos de tracking

```ts
const gaId = process.env.NEXT_PUBLIC_GA_ID ?? 'G-XXXXXXXX';
```

Si la env-var no llega al build (build args mal pasados, secret no
configurado), el script GA desaparece silenciosamente. El fallback es defensa
en profundidad y se aplica a CUALQUIER ID/clave pública.

### 4.3 Imágenes

- TODAS con `next/image`, nunca `<img>`.
- `priority={true}` en el LCP image (hero) y solo ahí.
- WebP/AVIF como primario; PNG/JPG fallback solo si lo necesitas explícitamente.
- Script con `sharp` que genera variantes responsivas + WebP a partir de un master:

```ts
// scripts/optimize-images.ts
import sharp from 'sharp';

const sizes = [48, 96, 192];
for (const size of sizes) {
  await sharp('public/images/logo.png')
    .resize(size, size, { fit: 'contain', background: { r:0, g:0, b:0, alpha:0 } })
    .webp({ quality: 85 })
    .toFile(`public/images/logo-${size}.webp`);
}
```

### 4.4 Fuentes

```ts
import { Plus_Jakarta_Sans } from 'next/font/google';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',          // evita FOIT
  weight: ['400', '500', '600', '700'],
  preload: true,
  adjustFontFallback: true, // reduce CLS
  variable: '--font-sans',
});
```

NUNCA cargar fuentes con `<link>` a `fonts.googleapis.com`: bloquea render,
no se beneficia del preload optimizado y añade un dominio externo al critical path.

### 4.5 Eliminar forced reflow

**Regla absoluta**: nunca leer geometría (`getBoundingClientRect`,
`offsetWidth`, `scrollTop`) dentro de handlers de `scroll`. Lighthouse lo
detecta y penaliza decenas de ms.

**Patrón correcto** — `IntersectionObserver`:

```tsx
useEffect(() => {
  const target = document.querySelector('[data-testid="hero-section"]');
  if (!target) return;

  const observer = new IntersectionObserver(
    ([entry]) => setIsVisible(entry.intersectionRatio < 0.5),
    { threshold: [0, 0.5, 1] },
  );

  observer.observe(target);
  return () => observer.disconnect();
}, []);
```

### 4.6 Preconnect quirúrgico

Cada `preconnect` reserva un socket TCP. Abusar empeora el rendimiento de
los recursos críticos reales.

- `dns-prefetch` ✓ para dominios que el navegador puede usar más tarde (Google Maps, wa.me).
- `preconnect` ✗ salvo para recursos en el critical path (CDN de fuentes, p.ej.).
- Eliminar preconnects a servicios que no se consultan hasta interacción del usuario.

### 4.7 `next.config.mjs` mínimo recomendado

```js
const nextConfig = {
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'tu-dominio.com' }],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    optimizeCss: true, // Critters inlinea critical CSS
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};
```

`output: 'standalone'` reduce drásticamente el tamaño de la imagen Docker
final (~150 MB → ~50 MB).

---

## 5. Accesibilidad WCAG AA

### 5.1 Ratios mínimos de contraste — memorízalos

| Elemento | Ratio mínimo (AA) |
|---|---|
| Texto normal (<18 pt o <14 pt bold) | **4.5 : 1** |
| Texto grande (≥18 pt o ≥14 pt bold) | **3 : 1** |
| Componentes UI (botones, iconos, bordes activos) | **3 : 1** |

### 5.2 Trampas típicas con shadcn/ui + Tailwind

**`text-muted-foreground` default**

El default `175 10% 45%` (HSL) sobre fondo blanco da **4.3 : 1** → FAIL AA.
Aparece típicamente en footer, testimonios, ratings, leyendas: 20+ archivos
heredan el problema. Solución: bajar la luminosidad a 38% → 5.5 : 1 PASS.

```css
:root {
  --muted-foreground: 175 10% 38%; /* antes: 45%, fallaba 4.3:1 */
}
```

**Colores "brand" de marcas conocidas**

- WhatsApp brand `#25D366` + texto blanco = **2.0 : 1** → FAIL grave.
  Usa `#075E54` (brand dark de WhatsApp) → **7.8 : 1** PASS AAA.
- Tailwind `bg-green-500` (`#22c55e`) + blanco = 2.3 : 1 → FAIL.
  Usa `bg-green-700` (`#15803d`) → 5.0 : 1 PASS AA.

**Regla práctica**: si el botón usa un color "brand" llamativo, **asume que
falla contraste** hasta haberlo medido.

### 5.3 Cómo verificar

- Lighthouse Accessibility audit — objetivo: **≥ 95**.
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) para casos puntuales.
- axe DevTools (extensión Chrome).
- Test E2E con `@axe-core/playwright` para regresión continua.

---

## 6. SEO en la era de la IA — `llms.txt`

### 6.1 Por qué

ChatGPT, Claude, Perplexity citan sitios web como fuente en sus respuestas.
`llms.txt` y `llms-full.txt` son specs informales (no W3C aún) para servirles
contenido pre-digerido en Markdown — los LLMs prefieren citarte porque no
tienen que parsear HTML.

### 6.2 Estructura

- **`public/llms.txt`**: índice resumido. NAP (nombre, dirección, teléfono),
  bloque de servicios con links, FAQs breves, datos verificables.
- **`public/llms-full.txt`**: contenido íntegro de cada página en Markdown.
- Ambos declarados en `<head>` para que los crawlers los encuentren:

```html
<link rel="alternate" type="text/markdown" title="llms.txt" href="/llms.txt" />
<link rel="alternate" type="text/markdown" title="llms-full.txt" href="/llms-full.txt" />
```

### 6.3 Contenido óptimo

Los LLMs valoran citas precisas:

- Coordenadas GPS exactas.
- Número de colegiación / licencia / registro mercantil.
- Email y teléfono completos con prefijo internacional.
- Horarios en formato estructurado (días + rango horario).
- Reseñas verbatim con autor y rating.
- URLs canónicas absolutas, nunca relativas.

### 6.4 Sincronización obligatoria

**Cualquier cambio en datos visibles del sitio (precios, horarios, servicios,
reseñas) debe actualizar `llms.txt` y `llms-full.txt` en el mismo commit.**

Si no, los LLMs propagarán información desactualizada durante meses (su crawl
es menos frecuente que el de Google).

---

## 7. Logo y favicon en la SERP

### 7.1 El favicon es lo primero que ven los usuarios en Google

A 16×16 / 32×32 px contra el blanco de la SERP. Si tu logo tiene fondo claro
o transparente, se evapora visualmente y pierdes click-through rate.

**Regla**: fondo de **color sólido** alineado con tu paleta de marca,
símbolo en claro encima.

Antes y después típico:

- **Mal**: línea oscura sobre fondo crema → invisible en SERP.
- **Bien**: disco color sólido (teal/azul/morado…) con símbolo blanco → destaca.

### 7.2 Generación automatizada con `sharp`

Una master única (`public/images/logo.png` en alta resolución, ej. 1024×1024)
y un script que genera todas las variantes con máscara circular para
eliminar halos / esquinas de imágenes AI-generadas:

```ts
const sourceSize = 1024;
const maskRadius = Math.round((sourceSize / 2) * 0.93);
const circleMask = Buffer.from(
  `<svg width="${sourceSize}" height="${sourceSize}">
     <circle cx="${sourceSize/2}" cy="${sourceSize/2}" r="${maskRadius}" fill="white"/>
   </svg>`
);

const maskedLogo = await sharp('public/images/logo.png')
  .composite([{ input: circleMask, blend: 'dest-in' }])
  .png()
  .toBuffer();

// luego resize a 48, 96, 192 → webp + png
```

Una sola fuente, una sola ejecución, todo se regenera.

### 7.3 Declaración en `metadata`

```ts
icons: {
  icon: [
    { url: '/images/logo-48.png',  sizes: '48x48',  type: 'image/png' },
    { url: '/images/logo-96.png',  sizes: '96x96',  type: 'image/png' },
    { url: '/images/logo-192.png', sizes: '192x192', type: 'image/png' },
  ],
  apple: [{ url: '/images/logo-192.png', sizes: '192x192', type: 'image/png' }],
},
```

PNG (no WebP) para favicons — Safari < 14 no soporta WebP en `<link rel="icon">`.

---

## 8. Infraestructura — el deploy es SEO

### 8.1 Un 5xx durante el crawl = pérdida de indexación

Si Google rastrea durante una ventana en la que el sitio responde 5xx,
marca la URL como "Error de servidor (5xx)" en Search Console y suspende
su indexación durante semanas.

**Mitigaciones obligatorias:**

- Healthcheck en `docker-compose` con `start_period` generoso (≥30s).
- `restart: unless-stopped` en todos los servicios.
- Limpieza de contenedores legacy ANTES del `up`:

```yaml
# docker-compose.prod.yml
services:
  app:
    image: ghcr.io/usuario/proyecto:latest
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:3000/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s
```

```bash
# Workflow CI antes del up
docker compose down --remove-orphans
docker compose pull
docker compose up -d --remove-orphans
```

### 8.2 Puerto fijo entre Docker y reverse proxy externo

Si tienes un reverse proxy EXTERNO (Plesk, nginx en host, Caddy) que apunta
a `127.0.0.1:PUERTO`, **fija ese puerto host del container**:

```yaml
services:
  app:
    ports:
      - "127.0.0.1:32771:3000"  # PUERTO FIJO, no dinámico
```

**Trampa real:** dejarlo dinámico (`${PORT:-3000}:3000`) hace que Docker
reasigne el puerto host al reiniciar. El reverse proxy queda apuntando al
puerto viejo → 502 Bad Gateway → Google rastrea → indexación cae.

### 8.3 Variables `NEXT_PUBLIC_*` en Docker build

`NEXT_PUBLIC_*` se inlinea en **build-time**, no runtime. El bundle
JavaScript las trae como string literal.

**Patrón obligatorio en Dockerfile:**

```dockerfile
# Stage builder
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_GA_ID
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
RUN npm run build
```

**Y en el workflow CI:**

```yaml
- uses: docker/build-push-action@v5
  with:
    context: .
    push: true
    build-args: |
      NEXT_PUBLIC_SITE_URL=${{ secrets.NEXT_PUBLIC_SITE_URL }}
      NEXT_PUBLIC_GA_ID=${{ secrets.NEXT_PUBLIC_GA_ID }}
    tags: ghcr.io/usuario/proyecto:latest
```

Si no las pasas como `--build-arg`, el bundle se compila con strings vacías
y el sitemap/canonical/GA salen rotos en producción.

### 8.4 Redirects de dominios alias al canónico (nginx)

Si tienes alias (`.com`, `www.`, etc.) apuntando al mismo servidor, fuerza
301 al canónico **a nivel servidor** antes de que el request entre en cualquier
`location`:

```nginx
# Plesk > dominio.com > Additional nginx directives
return 301 https://midominio.es$request_uri;
```

```nginx
# Plesk > midominio.es > Additional nginx directives (antes de "location /")
if ($host = "www.midominio.es") {
    return 301 https://midominio.es$request_uri;
}

location / {
    proxy_pass http://127.0.0.1:32771;
    # …
}
```

### 8.5 Cabeceras de seguridad en el reverse proxy

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; ..." always;
```

Lighthouse Best Practices lo audita.

---

## 9. Debugging — cómo resolver problemas comunes

### 9.1 Search Console reporta 502 en el sitemap

1. **Verifica desde fuera**: `curl -I https://midominio.com/sitemap.xml`.
2. Si responde 200 → el error es **stale**. Re-envía el sitemap en GSC y
   pulsa "Validar corrección". Espera 1-2 semanas.
3. Si sigue dando 502 → diagnóstico:
   - ¿Container vivo? `docker ps` en el VPS.
   - ¿Puerto host correcto? `curl -I http://127.0.0.1:32771/sitemap.xml` en el VPS.
   - ¿Reverse proxy apunta al puerto correcto? Revisa directivas Plesk/nginx.

### 9.2 "Página con redirección" en GSC

Causa típica: trailing slash. Next.js 308-redirige `/path/` → `/path`. Si
Google tenía `/path/` cacheado, lo cuenta como redirect.

**No es bug — es comportamiento correcto.** Google consolidará al ver el
canonical en el HTML. No requiere acción.

### 9.3 Muchas URLs descubiertas pero pocas indexadas

1. Lista todas las URLs del sitemap y verifica que respondan 200:

   ```bash
   for path in / /servicios /sobre-nosotros ... ; do
     curl -o /dev/null -s -w "%{http_code} ${path}\n" "https://midominio.com${path}"
   done
   ```

2. En GSC, click en "2 motivos" (o el número que sea) para ver causas reales:
   - **Error de servidor (5xx)**: stale; pulsa "Validar corrección".
   - **Página con redirección**: probablemente trailing slash; ignora.
   - **Página alternativa con etiqueta canónica adecuada**: la página declara
     canonical a otra URL — comportamiento correcto.
   - **Excluida por la etiqueta noindex**: intencional para legales.
   - **Descubierta: actualmente sin indexar**: Google la conoce pero no ha
     priorizado el crawl. Soluciones:
     - Inspeccionar URL → "Solicitar indexación" (límite ~10/día).
     - Mejorar enlazado interno desde páginas ya indexadas.
     - Conseguir backlinks externos.

### 9.4 La Indexing API de Google NO es para sitios normales

Oficialmente restringida a `JobPosting` y `BroadcastEvent`. Usarla para una
clínica, ecommerce o SaaS es **violación de ToS** y puede penalizar el
dominio.

**Alternativa oficial**: Search Console API → `sitemaps.submit` para
forzar re-lectura del sitemap. Requiere Service Account de GCP.

### 9.5 IndexNow (Bing/Yandex/Naver)

Google **no** soporta IndexNow. Si te interesa Bing (suele dar el 2-5% del
tráfico en mercados europeos), un POST sin auth:

```bash
curl "https://api.indexnow.org/IndexNow?url=https://midominio.com/&key=$INDEXNOW_KEY"
```

Requiere publicar `public/$INDEXNOW_KEY.txt` con el mismo contenido para
validar la propiedad.

### 9.6 Solicitar indexación manual de un lote de URLs

GSC limita a ~10-12 solicitudes manuales por día por propiedad. Si tienes
más URLs, divide en sesiones de varios días. Prioriza:

1. Home y páginas core (servicios, sobre-nosotros, contacto).
2. Páginas de detalle de productos/servicios más relevantes para tu SEO.
3. El resto en sesiones posteriores.

---

## 10. Checklist pre-launch

### Día 0 (antes de la primera línea de código)

- [ ] Dominio canónico decidido y documentado.
- [ ] DNS con A/CNAME apuntando al servidor.
- [ ] SSL en apex + alias.
- [ ] Reverse proxy con redirects alias → canónico.

### Implementación

- [ ] `NEXT_PUBLIC_SITE_URL` leído de env-var con fallback al canónico.
- [ ] `app/sitemap.ts` con TODAS las páginas indexables.
- [ ] `app/robots.ts` con `Disallow` legales + bloque `AI_CRAWLERS` + sitemap declarado.
- [ ] `metadataBase` en `layout.tsx` y `alternates.canonical` en cada `page.tsx`.
- [ ] Páginas legales con `robots: 'noindex, follow'`.
- [ ] JSON-LD validado en [Rich Results Test](https://search.google.com/test/rich-results).
- [ ] Test E2E que valida estructura JSON-LD (`aggregateRating` solo en tipos elegibles).
- [ ] Imágenes con `next/image`, `priority` solo en LCP.
- [ ] Fonts con `next/font/google` (`display: swap`).
- [ ] GA con `<Script strategy="lazyOnload">` + fallback hardcodeado del ID.
- [ ] `optimizeCss: true` + `optimizePackageImports` en `next.config.mjs`.
- [ ] Contraste WCAG AA en TODOS los textos (revisa `muted-foreground` y botones brand).
- [ ] `llms.txt` + `llms-full.txt` con datos verificables.
- [ ] Favicon con fondo de color sólido visible en SERP.

### Infraestructura

- [ ] Healthcheck en `docker-compose` con `start_period ≥ 30s`.
- [ ] Puerto host de container FIJO si hay reverse proxy externo.
- [ ] Workflow CI pasa `NEXT_PUBLIC_*` como `--build-arg`.
- [ ] Deploy con `docker compose down --remove-orphans` antes del `up`.
- [ ] Logs centralizados (o al menos accesibles vía SSH).

### Pre-launch

- [ ] Lighthouse local: Performance ≥ 90, Accessibility ≥ 95, SEO 100.
- [ ] Rich Results Test sobre 3-5 URLs representativas (home + listado + detalle).
- [ ] axe DevTools scan sobre las mismas URLs.
- [ ] Sitemap accesible: `curl -I https://midominio.com/sitemap.xml` → 200.
- [ ] Robots.txt correcto: `curl -s https://midominio.com/robots.txt`.
- [ ] Test de redirects: `.com → .es`, `www → apex`, `http → https` todos 301.
- [ ] Test E2E completo en CI (Playwright).

---

## 11. Monitorización post-launch

### Diaria (primeros 7 días)

- Search Console → Cobertura → ¿hay URLs en "Error" o "Excluidas"?
- Logs del servidor → ¿algún 5xx?
- Uptime monitor externo (UptimeRobot, BetterStack…) configurado.

### Semanal (primer mes)

- Search Console → Rendimiento → ¿impresiones subiendo? ¿clicks?
- Search Console → Mejoras → ¿algún warning nuevo en Fragmentos de reseñas, Breadcrumbs, etc.?
- Lighthouse CI (idealmente integrado en GitHub Actions): regresión de Performance.
- Google Business Profile (si aplica): reviews respondidas, info actualizada.

### Continuo

- Cualquier cambio en datos visibles → actualizar `llms.txt` + `llms-full.txt` en el MISMO commit.
- Cualquier cambio de URL → 301 desde la URL vieja en nginx, no 404.
- Cualquier deploy fallido → verificar inmediatamente que el sitio responde 200 (no esperar al crawl de Google para descubrirlo).

---

## 12. Herramientas y referencias

### Validación

| Herramienta | Uso |
|---|---|
| [Google Rich Results Test](https://search.google.com/test/rich-results) | Validar JSON-LD |
| [Schema.org Validator](https://validator.schema.org/) | Validar Schema.org puro |
| [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) | Contraste WCAG |
| Chrome DevTools → Lighthouse | Performance + A11y + SEO + Best Practices |
| axe DevTools (extensión Chrome) | A11y en profundidad |
| Chrome DevTools → Performance Insights | LCP, FCP, CLS, INP |

### Monitorización

| Herramienta | Uso |
|---|---|
| [Google Search Console](https://search.google.com/search-console) | Indexación, Mejoras, Cobertura |
| [Bing Webmaster Tools](https://www.bing.com/webmasters) | Equivalente Microsoft |
| [PageSpeed Insights](https://pagespeed.web.dev/) | CWV oficiales de Google |
| UptimeRobot / BetterStack | Disponibilidad |
| Sentry / Datadog | Errores runtime |

### Docs oficiales

- [Google Search Central](https://developers.google.com/search) — guía oficial SEO.
- [Schema.org](https://schema.org/) — vocabulario completo.
- [WCAG 2.2 Quick Ref](https://www.w3.org/WAI/WCAG22/quickref/) — accesibilidad.
- [web.dev](https://web.dev/) — guías de performance.
- [llms.txt spec](https://llmstxt.org/) — spec informal del archivo.

### Reglas mentales rápidas

- **Si dudas, mide.** Lighthouse/Rich Results Test/Contrast Checker antes de discutir.
- **El deploy es SEO.** Cualquier 5xx que aparezca en tu uptime monitor también lo verá Google.
- **Una fuente de verdad** para el dominio canónico (env-var) y para el rating (un solo `aggregateRating`).
- **Validación automatizada** en CI para todo lo que pueda regresar (JSON-LD, contraste, performance).
- **Documentar en el repo** las decisiones que no son obvias del código (canónico, estrategia de rating, exclusiones del sitemap).
