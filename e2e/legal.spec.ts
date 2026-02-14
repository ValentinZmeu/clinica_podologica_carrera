import { test, expect, expectLayout } from './fixtures/base';
import { LEGAL_PAGES } from './helpers/constants';

test.describe('Legal Pages', () => {
  for (const legalPage of LEGAL_PAGES) {
    test.describe(legalPage.path, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(legalPage.path);
      });

      test('should render layout', async ({ page }) => {
        await expectLayout(page);
      });

      test('should display page heading', async ({ page }) => {
        await expect(page.locator('h1')).toContainText(legalPage.title);
      });

      test('should contain legal content sections', async ({ page }) => {
        const headings = page.locator('.legal-content h2');
        const count = await headings.count();
        expect(count).toBeGreaterThanOrEqual(3);
      });

      test('should contain "Volver al inicio" link', async ({ page }) => {
        const backLink = page.locator('a', { hasText: 'Volver al inicio' });
        await expect(backLink).toBeVisible();
        await expect(backLink).toHaveAttribute('href', '/');
      });
    });
  }

  test('privacy page should link to cookies page', async ({ page }) => {
    await page.goto('/privacidad');
    const cookieLink = page.locator('.legal-content a[href="/cookies"]');
    await expect(cookieLink).toBeAttached();
  });

  test('cookies page should link to privacy page', async ({ page }) => {
    await page.goto('/cookies');
    const privacyLink = page.locator('.legal-content a[href="/privacidad"]');
    await expect(privacyLink).toBeAttached();
  });
});
