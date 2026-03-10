import { test, expect, expectLayout, scrollToSection } from './fixtures/base';
import { SEL } from './helpers/selectors';
import { CLINIC } from './helpers/constants';

test.describe('Contact Page (/contacto)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contacto');
  });

  test('should render layout', async ({ page }) => {
    await expectLayout(page);
  });

  test('should display page heading', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('ayudarte');
  });

  test('contact methods section should be visible', async ({ page }) => {
    await expect(page.getByTestId(SEL.contactMethods)).toBeVisible();
  });

  test('WhatsApp button should link to wa.me', async ({ page }) => {
    const btn = page.getByTestId(SEL.contactWhatsappBtn);
    await expect(btn).toBeVisible();
    await expect(btn).toHaveAttribute('href', /wa\.me/);
    await expect(btn).toHaveAttribute('target', '_blank');
  });

  test('phone button should have tel: href', async ({ page }) => {
    const btn = page.getByTestId(SEL.contactPhoneBtn);
    await expect(btn).toBeVisible();
    await expect(btn).toHaveAttribute('href', `tel:${CLINIC.phoneLink}`);
  });

  test('should display clinic email and schedule', async ({ page }) => {
    const methods = page.getByTestId(SEL.contactMethods);
    await expect(methods).toContainText(CLINIC.email);
    await expect(methods).toContainText('Lunes a Jueves');
  });

  test('should render map section with iframe', async ({ page }) => {
    const map = await scrollToSection(page, SEL.contactMap);
    const iframe = map.locator('iframe');
    await expect(iframe).toHaveAttribute('title', /Ubicación/);
    await expect(iframe).toHaveAttribute('src', /google\.com\/maps/);
  });
});
