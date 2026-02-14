import { test, expect, expectLayout, scrollToSection } from './fixtures/base';
import { SEL } from './helpers/selectors';
import { SERVICE_SLUGS } from './helpers/constants';

test.describe('Services Listing Page (/servicios)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/servicios');
  });

  test('should render layout', async ({ page }) => {
    await expectLayout(page);
  });

  test('should display page heading with "Servicios"', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Servicios');
  });

  test('should render all active service cards in grid', async ({ page }) => {
    const grid = page.getByTestId(SEL.servicesGrid);
    await expect(grid).toBeVisible();
    for (const slug of SERVICE_SLUGS) {
      await expect(page.getByTestId(SEL.serviceCard(slug))).toBeVisible();
    }
  });

  test('each service card should link to /servicios/{slug}', async ({
    page,
  }) => {
    for (const slug of SERVICE_SLUGS) {
      const card = page.getByTestId(SEL.serviceCard(slug));
      await expect(card).toHaveAttribute('href', `/servicios/${slug}`);
    }
  });

  test('should render benefits section', async ({ page }) => {
    const section = await scrollToSection(page, SEL.servicesBenefits);
    await expect(section.locator('h2')).toBeVisible();
  });

  test('should render CTA section', async ({ page }) => {
    await scrollToSection(page, SEL.ctaSection);
    await expect(page.getByTestId(SEL.ctaWhatsappButton)).toBeVisible();
  });
});
