import { test as base, expect, type Page } from '@playwright/test';
import { SEL } from '../helpers/selectors';

export const test = base;
export { expect };

/**
 * Assert common layout shell (header + footer) is visible.
 */
export async function expectLayout(page: Page) {
  await expect(page.getByTestId(SEL.header)).toBeVisible();
  await expect(page.getByTestId(SEL.footer)).toBeVisible();
}

/**
 * Scroll a section into view and wait for it to be visible.
 * Useful for below-the-fold sections using next/dynamic.
 */
export async function scrollToSection(page: Page, testId: string) {
  const section = page.getByTestId(testId);
  await section.scrollIntoViewIfNeeded();
  await expect(section).toBeVisible();
  return section;
}
