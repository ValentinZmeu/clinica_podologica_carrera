import { test, expect, expectLayout, scrollToSection } from './fixtures/base';
import { SEL } from './helpers/selectors';
import { SERVICE_SLUGS, CLINIC } from './helpers/constants';

test.describe('Service Detail Page', () => {
  // Parametric: verify every service slug loads without 404
  for (const slug of SERVICE_SLUGS) {
    test(`/servicios/${slug} should load successfully`, async ({ page }) => {
      const response = await page.goto(`/servicios/${slug}`);
      expect(response?.status()).toBe(200);
      await expectLayout(page);
      await expect(page.getByTestId(SEL.serviceHero)).toBeVisible();
    });
  }

  test.describe('Quiropodia detail', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/servicios/quiropodia');
    });

    test('should display breadcrumb navigation', async ({ page }) => {
      const breadcrumb = page.getByTestId(SEL.breadcrumb);
      await expect(breadcrumb).toBeVisible();
      await expect(breadcrumb).toContainText('Inicio');
      await expect(breadcrumb).toContainText('Servicios');
      await expect(breadcrumb).toContainText('Quiropodia');
    });

    test('breadcrumb links should have correct hrefs', async ({ page }) => {
      const breadcrumb = page.getByTestId(SEL.breadcrumb);
      await expect(breadcrumb.locator('a[href="/"]')).toBeVisible();
      await expect(breadcrumb.locator('a[href="/servicios"]')).toBeVisible();
    });

    test('should display service hero with name and featured badge', async ({
      page,
    }) => {
      const hero = page.getByTestId(SEL.serviceHero);
      await expect(hero.locator('h1')).toContainText('Quiropodia');
      await expect(hero).toContainText('Servicio Destacado');
    });

    test('should render service content', async ({ page }) => {
      const content = page.getByTestId(SEL.serviceContent);
      await expect(content).toBeVisible();
      await expect(content).toContainText('quiropodia');
    });

    test('should render 4 benefit items', async ({ page }) => {
      for (let i = 0; i < 4; i++) {
        await expect(page.getByTestId(SEL.benefit(i))).toBeVisible();
      }
    });

    test('should render FAQ accordion items', async ({ page }) => {
      // Quiropodia has 2 FAQs with ids: quiropodia-faq-1, quiropodia-faq-2
      await expect(
        page.getByTestId('accordion-item-quiropodia-faq-1'),
      ).toBeAttached();
      await expect(
        page.getByTestId('accordion-item-quiropodia-faq-2'),
      ).toBeAttached();
    });

    test('sidebar WhatsApp CTA should link to wa.me with service name', async ({
      page,
    }) => {
      const cta = page.getByTestId(SEL.serviceWhatsappCta);
      await expect(cta).toBeVisible();
      const href = await cta.getAttribute('href');
      expect(href).toContain('wa.me');
      expect(href).toContain(encodeURIComponent('Quiropodia'));
    });

    test('sidebar phone CTA should have tel: href', async ({ page }) => {
      const cta = page.getByTestId(SEL.servicePhoneCta);
      await expect(cta).toHaveAttribute('href', `tel:${CLINIC.phoneLink}`);
    });

    test('should render "other services" section', async ({ page }) => {
      const section = await scrollToSection(page, SEL.otherServices);
      await expect(section.locator('h2')).toContainText('Otros servicios');
    });
  });

  test('service without FAQs should not render FAQ accordion', async ({
    page,
  }) => {
    await page.goto('/servicios/estudio-biomecanico');
    // estudio-biomecanico has empty faqs array
    const faqHeading = page.locator('h2', { hasText: 'Preguntas frecuentes' });
    await expect(faqHeading).not.toBeVisible();
  });

  test('non-existent service slug should show 404', async ({ page }) => {
    const response = await page.goto('/servicios/servicio-inexistente');
    expect(response?.status()).toBe(404);
  });
});
