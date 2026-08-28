import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
});

test('add item to cart and checkout', async ({ page }) => {
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');

  await page.fill('#first-name', 'Kenneth');
  await page.fill('#last-name', 'Tan');
  await page.fill('#postal-code', '556123');
  await page.click('[data-test="continue"]');

  await page.click('[data-test="finish"]');
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});