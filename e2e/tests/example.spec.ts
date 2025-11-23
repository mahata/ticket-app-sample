import { test, expect } from '@playwright/test';

test('It can display the homepage', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/ticket-app-sample/i);
});
