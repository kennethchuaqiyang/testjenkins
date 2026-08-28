import { test, expect } from '@playwright/test';

test('standard user can log in', async ({ page }) => {
  await page.goto('/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.locator('.title')).toHaveText('Products');
});

test('locked out user sees error', async ({ page }) => {
  await page.goto('/');
  await page.fill('#user-name', 'locked_out_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page.locator('[data-test="error"]')).toContainText('locked out');
});