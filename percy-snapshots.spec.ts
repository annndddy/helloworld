// percy-snapshots.spec.ts
import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Capture Nuxt 4 Pages for Manager Review', async ({ page }) => {
  // Pull the dynamic URL from Vercel's preview or fallback to local development
  const baseUrl = process.env.VERCEL_PREVIEW_URL || 'http://localhost:3000';

  // 1. Snapshot the Home Page
  await page.goto(`${baseUrl}/`);
  // Wait for Nuxt 4 hydration to complete so the page is fully interactive
  await page.waitForLoadState('networkidle'); 
  await percySnapshot(page, 'Home Page');

  // 2. Snapshot the About Page
  await page.goto(`${baseUrl}/about`);
  await page.waitForLoadState('networkidle');
  await percySnapshot(page, 'About Page');
});
