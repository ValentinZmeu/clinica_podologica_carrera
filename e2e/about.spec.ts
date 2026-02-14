import { test, expect, expectLayout, scrollToSection } from './fixtures/base';
import { SEL } from './helpers/selectors';
import { TEAM_MEMBERS } from './helpers/constants';

test.describe('About Page (/sobre-nosotros)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sobre-nosotros');
  });

  test('should render layout', async ({ page }) => {
    await expectLayout(page);
  });

  test('should display page heading with "Equipo"', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Equipo');
  });

  test('should render story section', async ({ page }) => {
    const story = page.getByTestId(SEL.aboutStory);
    await expect(story).toBeVisible();
    await expect(story.locator('h2')).toContainText('Historia');
  });

  test('should render values section with 4 cards', async ({ page }) => {
    await scrollToSection(page, SEL.aboutValues);
    for (let i = 0; i < 4; i++) {
      await expect(page.getByTestId(SEL.valueCard(i))).toBeVisible();
    }
  });

  test('should render team section with 3 members', async ({ page }) => {
    await scrollToSection(page, SEL.aboutTeam);
    for (let i = 0; i < TEAM_MEMBERS.length; i++) {
      const member = page.getByTestId(SEL.teamMember(i));
      await expect(member).toBeVisible();
      await expect(member).toContainText(TEAM_MEMBERS[i].name);
      await expect(member).toContainText(TEAM_MEMBERS[i].role);
    }
  });

  test('team members should display specialties badges', async ({ page }) => {
    await scrollToSection(page, SEL.aboutTeam);
    const firstMember = page.getByTestId(SEL.teamMember(0));
    // Isabel Carrera has specialty "Onicomicosis"
    await expect(firstMember).toContainText('Onicomicosis');
  });

  test('should render stats section with key numbers', async ({ page }) => {
    const stats = await scrollToSection(page, SEL.aboutStats);
    await expect(stats).toContainText('15+');
    await expect(stats).toContainText('5000+');
    await expect(stats).toContainText('4.8');
  });

  test('should render CTA section', async ({ page }) => {
    await scrollToSection(page, SEL.ctaSection);
    await expect(page.getByTestId(SEL.ctaWhatsappButton)).toBeVisible();
  });
});
