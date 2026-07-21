import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Capture Nuxt 4 Pages with Vercel Auth Enabled', async ({ page, context }) => {
  const baseUrl = process.env.VERCEL_PREVIEW_URL || 'http://localhost:3000';
  const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

  if (bypassSecret) {
    // 1. Maintain the global header for Playwright's navigation
    await context.setExtraHTTPHeaders({
      'x-vercel-protection-bypass': bypassSecret,
    });

    // 2. Append the Vercel cookie setter parameter to the first URL string.
    // This tells Vercel to drop a session cookie that Percy's asset collector can reuse.
    const authBypassUrl = `${baseUrl}/?x-vercel-protection-bypass=${bypassSecret}&x-vercel-set-bypass-cookie=samesitenone`;
    await page.goto(authBypassUrl);
  } else {
    await page.goto(`${baseUrl}/`);
  }

  await page.waitForLoadState('networkidle'); 
  await percySnapshot(page, 'Home Page');

  // Next pages do not need the long query string because the bypass cookie is active
  await page.goto(`${baseUrl}/about`);
  await page.waitForLoadState('networkidle');
  await percySnapshot(page, 'About Page');
});
