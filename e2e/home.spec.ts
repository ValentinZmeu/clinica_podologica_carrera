import { test, expect, expectLayout, scrollToSection } from './fixtures/base';
import { SEL } from './helpers/selectors';
import { CLINIC, FEATURED_SERVICE_SLUGS } from './helpers/constants';

test.describe('Home Page (/)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render header and footer', async ({ page }) => {
    await expectLayout(page);
  });

  test('should display hero section with heading', async ({ page }) => {
    const hero = page.getByTestId(SEL.heroSection);
    await expect(hero).toBeVisible();
    await expect(hero.locator('h1')).toContainText('Clínica Podológica');
    await expect(hero.locator('h1')).toContainText('Móstoles');
  });

  test('hero WhatsApp button should link to wa.me', async ({ page }) => {
    const btn = page.getByTestId(SEL.heroWhatsappButton);
    await expect(btn).toBeVisible();
    await expect(btn).toHaveAttribute('href', /wa\.me/);
    await expect(btn).toHaveAttribute('target', '_blank');
  });

  test('hero call button should link to tel:', async ({ page }) => {
    const btn = page.getByTestId(SEL.heroCallButton);
    await expect(btn).toBeVisible();
    await expect(btn).toHaveAttribute('href', /^tel:/);
  });

  test('should render benefits section with 4 cards', async ({ page }) => {
    await scrollToSection(page, SEL.benefitsSection);
    for (let i = 0; i < 4; i++) {
      await expect(page.getByTestId(SEL.benefitCard(i))).toBeVisible();
    }
  });

  test('should render featured services preview', async ({ page }) => {
    await scrollToSection(page, SEL.servicesSection);
    for (const slug of FEATURED_SERVICE_SLUGS) {
      await expect(page.getByTestId(SEL.serviceCard(slug))).toBeVisible();
    }
  });

  test('services "View All" link should navigate to /servicios', async ({ page }) => {
    await scrollToSection(page, SEL.servicesSection);
    const link = page.getByTestId(SEL.servicesViewAllLink);
    await expect(link).toHaveAttribute('href', '/servicios');
  });

  test('should render process section with 3 steps', async ({ page }) => {
    await scrollToSection(page, SEL.processSection);
    for (let i = 1; i <= 3; i++) {
      await expect(page.getByTestId(SEL.processStep(i))).toBeVisible();
    }
  });

  test('should render testimonials section with cards', async ({ page }) => {
    const section = await scrollToSection(page, SEL.testimonialsSection);
    await expect(section.locator('h2')).toContainText('Pacientes');
    const cards = section.locator('[data-testid^="testimonial-card-"]');
    await expect(cards).toHaveCount(3);
  });

  test('should render location section with map', async ({ page }) => {
    const section = await scrollToSection(page, SEL.locationSection);
    await expect(section.locator('iframe')).toHaveAttribute(
      'title',
      /Ubicación/,
    );
  });

  test('should render FAQ section with accordion items', async ({ page }) => {
    await scrollToSection(page, SEL.faqSection);
    // FAQ items use accordion-item-{faq.id} pattern
    for (let i = 1; i <= 6; i++) {
      await expect(
        page.getByTestId(`accordion-item-faq-${i}`),
      ).toBeAttached();
    }
  });

  test('should render CTA section with buttons', async ({ page }) => {
    await scrollToSection(page, SEL.ctaSection);
    const whatsapp = page.getByTestId(SEL.ctaWhatsappButton);
    const call = page.getByTestId(SEL.ctaCallButton);
    await expect(whatsapp).toBeVisible();
    await expect(whatsapp).toHaveAttribute('href', /wa\.me/);
    await expect(call).toBeVisible();
    await expect(call).toHaveAttribute('href', /^tel:/);
  });

  test('floating WhatsApp button should appear after scroll', async ({
    page,
  }) => {
    const floatBtn = page.getByTestId(SEL.whatsappFloat);
    // Scroll to bottom of page
    await scrollToSection(page, SEL.ctaSection);
    await expect(floatBtn).toBeVisible();
    await expect(floatBtn).toHaveAttribute('href', /wa\.me/);
    await expect(floatBtn).toHaveAttribute('aria-label', /WhatsApp/);
  });

  test('should include LocalBusiness JSON-LD schema', async ({ page }) => {
    const scripts = page.locator('script[type="application/ld+json"]');
    const allTexts = await scripts.allTextContents();
    const localBiz = allTexts.find((s) => s.includes('LocalBusiness'));
    expect(localBiz).toBeTruthy();
    const parsed = JSON.parse(localBiz!);
    expect(parsed.telephone).toBe(CLINIC.phone);
    expect(parsed.address.addressLocality).toBe(CLINIC.city);
  });
});
