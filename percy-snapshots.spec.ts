// percy-snapshots.spec.ts
import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Capture Nuxt 4 Pages for Manager Review', async ({ page, context }) => {
  const baseUrl = process.env.VERCEL_PREVIEW_URL || 'http://localhost:3000';
  const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

  // If a bypass secret exists, inject it into the browser headers globally
  if (bypassSecret) {
    await context.setExtraHTTPHeaders({
      'x-vercel-protection-bypass': bypassSecret,
    });
  }

  // 1. Snapshot the Home Page (Will now completely bypass Vercel's login wall!)
  await page.goto(`${baseUrl}/`);
  await page.waitForLoadState('networkidle'); 
  await percySnapshot(page, 'Home Page');

  // 2. Snapshot the About Page
  await page.goto(`${baseUrl}/about`);
  await page.waitForLoadState('networkidle');
  await percySnapshot(page, 'About Page');
});
