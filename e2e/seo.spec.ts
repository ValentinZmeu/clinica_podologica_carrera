import { test, expect, scrollToSection } from './fixtures/base';
import { CLINIC } from './helpers/constants';
import { SEL } from './helpers/selectors';

const pages = [
  { path: '/', titleContains: 'Podólogo en Móstoles' },
  { path: '/servicios', titleContains: 'Servicios de Podología' },
  { path: '/sobre-nosotros', titleContains: 'Sobre Nosotros' },
  { path: '/contacto', titleContains: 'Contacto' },
  { path: '/servicios/quiropodia', titleContains: 'Quiropodia' },
];

test.describe('SEO Elements', () => {
  for (const pg of pages) {
    test(`${pg.path}: should have correct title`, async ({ page }) => {
      await page.goto(pg.path);
      await expect(page).toHaveTitle(new RegExp(pg.titleContains));
    });

    test(`${pg.path}: should have meta description`, async ({ page }) => {
      await page.goto(pg.path);
      const desc = page.locator('meta[name="description"]');
      const content = await desc.getAttribute('content');
      expect(content).toBeTruthy();
      expect(content!.length).toBeGreaterThan(50);
    });
  }

  test('html lang should be "es"', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  });

  test('home page should have og:type "website"', async ({ page }) => {
    await page.goto('/');
    const ogType = page.locator('meta[property="og:type"]');
    await expect(ogType).toHaveAttribute('content', 'website');
  });

  // JSON-LD Schema Tests
  test('home: should have LocalBusiness schema', async ({ page }) => {
    await page.goto('/');
    const schemas = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const localBiz = schemas.find((s) => s.includes('LocalBusiness'));
    expect(localBiz).toBeTruthy();
    const parsed = JSON.parse(localBiz!);
    expect(parsed.telephone).toBe(CLINIC.phone);
    expect(parsed.address.addressLocality).toBe(CLINIC.city);
  });

  test('home: should have FAQPage schema', async ({ page }) => {
    await page.goto('/');
    // FAQ section is dynamically loaded, scroll to it first
    await scrollToSection(page, SEL.faqSection);
    const schemas = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const faqSchema = schemas.find((s) => s.includes('FAQPage'));
    expect(faqSchema).toBeTruthy();
  });

  test('service detail should have MedicalProcedure + BreadcrumbList schemas', async ({
    page,
  }) => {
    await page.goto('/servicios/quiropodia');
    const schemas = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    expect(schemas.some((s) => s.includes('MedicalProcedure'))).toBe(true);
    expect(schemas.some((s) => s.includes('BreadcrumbList'))).toBe(true);
  });

  test('servicios page should have MedicalWebPage schema', async ({
    page,
  }) => {
    await page.goto('/servicios');
    const schemas = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    expect(schemas.some((s) => s.includes('MedicalWebPage'))).toBe(true);
  });

  test('legal pages should have noindex robots meta', async ({ page }) => {
    for (const path of ['/privacidad', '/cookies', '/aviso-legal']) {
      await page.goto(path);
      const robots = page.locator('meta[name="robots"]');
      const content = await robots.getAttribute('content');
      expect(content).toContain('noindex');
    }
  });

  test('each page should have exactly one H1', async ({ page }) => {
    for (const pg of pages) {
      await page.goto(pg.path);
      const h1Count = await page.locator('h1').count();
      expect(h1Count, `${pg.path} should have exactly 1 H1`).toBe(1);
    }
  });

  // Tipos donde Google permite `aggregateRating` para review snippets.
  // Ref: https://developers.google.com/search/docs/appearance/structured-data/review-snippet
  const RATING_ELIGIBLE_TYPES = new Set([
    'LocalBusiness',
    'MedicalBusiness',
    'Podiatrist',
    'Organization',
    'Product',
    'Recipe',
    'Movie',
    'Event',
    'Book',
    'Course',
    'SoftwareApplication',
    'CreativeWork',
  ]);

  function findRatingViolations(
    node: unknown,
    parent: Record<string, unknown> | null = null,
  ): string[] {
    const violations: string[] = [];
    if (Array.isArray(node)) {
      node.forEach((n) => violations.push(...findRatingViolations(n, parent)));
    } else if (node && typeof node === 'object') {
      const obj = node as Record<string, unknown>;
      if (obj.aggregateRating && parent) {
        const parentTypes = ([] as string[]).concat(
          (parent['@type'] as string | string[]) ?? [],
        );
        const eligible = parentTypes.some((t) =>
          RATING_ELIGIBLE_TYPES.has(t),
        );
        if (!eligible) {
          violations.push(
            `aggregateRating anidado en tipo no elegible: ${parentTypes.join(
              ',',
            ) || '(sin @type)'}`,
          );
        }
      }
      Object.values(obj).forEach((v) =>
        violations.push(...findRatingViolations(v, obj)),
      );
    }
    return violations;
  }

  test('JSON-LD: todos los bloques parsean como JSON válido', async ({
    page,
  }) => {
    for (const pg of pages) {
      await page.goto(pg.path);
      const blocks = await page
        .locator('script[type="application/ld+json"]')
        .allTextContents();
      for (const raw of blocks) {
        expect(
          () => JSON.parse(raw),
          `JSON-LD malformado en ${pg.path}`,
        ).not.toThrow();
      }
    }
  });

  test('JSON-LD: aggregateRating solo en tipos elegibles para review snippets', async ({
    page,
  }) => {
    for (const pg of pages) {
      await page.goto(pg.path);
      const blocks = await page
        .locator('script[type="application/ld+json"]')
        .allTextContents();
      for (const raw of blocks) {
        const data = JSON.parse(raw);
        const violations = findRatingViolations(data);
        expect(
          violations,
          `${pg.path}: aggregateRating mal anidado → ${violations.join(' | ')}`,
        ).toEqual([]);
      }
    }
  });
});
