import { test, expect, expectLayout } from './fixtures/base';
import { SEL } from './helpers/selectors';
import { NAV_LINKS, CLINIC } from './helpers/constants';

test.describe('Desktop Navigation', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('desktop nav should be visible with all links', async ({ page }) => {
    const nav = page.getByTestId(SEL.navDesktop);
    await expect(nav).toBeVisible();
    for (const link of NAV_LINKS) {
      await expect(page.getByTestId(SEL.navLink(link.label))).toBeVisible();
    }
  });

  test('nav call button should have tel: href', async ({ page }) => {
    const callBtn = page.getByTestId(SEL.navCallButton);
    await expect(callBtn).toHaveAttribute('href', /^tel:/);
  });

  test('nav WhatsApp button should link to wa.me', async ({ page }) => {
    const waBtn = page.getByTestId(SEL.navWhatsappButton);
    await expect(waBtn).toHaveAttribute('href', /wa\.me/);
    await expect(waBtn).toHaveAttribute('target', '_blank');
  });

  test('clicking logo should navigate to home', async ({ page }) => {
    await page.goto('/servicios');
    await page.getByTestId(SEL.navHomeLink).click();
    await expect(page).toHaveURL('/');
  });

  for (const link of NAV_LINKS.filter((l) => l.href !== '/')) {
    test(`clicking "${link.label}" should navigate to ${link.href}`, async ({
      page,
    }) => {
      await page.getByTestId(SEL.navLink(link.label)).click();
      await expect(page).toHaveURL(link.href);
      await expectLayout(page);
    });
  }
});

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('mobile menu button should be visible, desktop nav hidden', async ({
    page,
  }) => {
    await expect(page.getByTestId(SEL.navMobileMenuButton)).toBeVisible();
    await expect(page.getByTestId(SEL.navDesktop)).not.toBeVisible();
  });

  test('tapping menu button opens mobile menu with all links', async ({
    page,
  }) => {
    await page.getByTestId(SEL.navMobileMenuButton).click();
    const menu = page.getByTestId(SEL.navMobileMenu);
    await expect(menu).toBeVisible();
    for (const link of NAV_LINKS) {
      await expect(
        page.getByTestId(SEL.navMobileLink(link.label)),
      ).toBeVisible();
    }
  });

  test('mobile menu should have role="dialog" and aria-modal', async ({
    page,
  }) => {
    await page.getByTestId(SEL.navMobileMenuButton).click();
    const menu = page.getByTestId(SEL.navMobileMenu);
    await expect(menu).toHaveAttribute('role', 'dialog');
    await expect(menu).toHaveAttribute('aria-modal', 'true');
  });

  test('tapping a mobile nav link navigates and closes menu', async ({
    page,
  }) => {
    await page.getByTestId(SEL.navMobileMenuButton).click();
    await page.getByTestId(SEL.navMobileLink('Servicios')).click();
    await expect(page).toHaveURL('/servicios');
    await expect(page.getByTestId(SEL.navMobileMenu)).not.toBeVisible();
  });
});

test.describe('Footer Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('footer phone link should have correct href', async ({ page }) => {
    const link = page.getByTestId(SEL.footerPhoneLink);
    await expect(link).toHaveAttribute('href', `tel:${CLINIC.phoneLink}`);
  });

  test('footer email link should have correct href', async ({ page }) => {
    const link = page.getByTestId(SEL.footerEmailLink);
    await expect(link).toHaveAttribute('href', `mailto:${CLINIC.email}`);
  });

  test('footer address link should open Google Maps', async ({ page }) => {
    const link = page.getByTestId(SEL.footerAddressLink);
    await expect(link).toHaveAttribute('href', /google\.com\/maps/);
    await expect(link).toHaveAttribute('target', '_blank');
  });

  test('footer should contain legal links', async ({ page }) => {
    const footer = page.getByTestId(SEL.footer);
    await expect(footer.locator('a[href="/privacidad"]')).toBeAttached();
    await expect(footer.locator('a[href="/cookies"]')).toBeAttached();
    await expect(footer.locator('a[href="/aviso-legal"]')).toBeAttached();
  });
});
