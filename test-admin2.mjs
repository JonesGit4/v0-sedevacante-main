import { chromium } from 'playwright';

const consoleErrors = [];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('[PAYLOAD ADMIN ERROR]') || msg.type() === 'error') {
      consoleErrors.push({ type: msg.type(), text });
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push({ type: 'pageerror', text: err.message });
  });

  try {
    // Check the admin root page
    console.log('=== Checking /admin ===');
    await page.goto('https://sedevacante.com.br/admin', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);

    const adminScreenshot = '/workspace/repo/admin-root.png';
    await page.screenshot({ path: adminScreenshot, fullPage: true });
    console.log('Screenshot saved:', adminScreenshot);

    // Check for Admin Render Error
    const adminErrorText = await page.locator('text=Admin Render Error').count();
    console.log('"Admin Render Error" found:', adminErrorText > 0);

    // Get pre element content
    const preTexts = await page.locator('pre').allTextContents();
    for (const t of preTexts) {
      console.log('Pre element content:', t);
    }

    // Get full visible text
    const bodyText = await page.evaluate(() => document.body?.innerText);
    console.log('Full page text:', bodyText);

    // Now navigate directly to the article edit page
    console.log('\n=== Checking /admin/collections/articles/23 ===');
    await page.goto('https://sedevacante.com.br/admin/collections/articles/23', { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(5000);

    const articleScreenshot = '/workspace/repo/admin-article-23.png';
    await page.screenshot({ path: articleScreenshot, fullPage: true });
    console.log('Screenshot saved:', articleScreenshot);

    const articleErrorText = await page.locator('text=Admin Render Error').count();
    console.log('"Admin Render Error" found:', articleErrorText > 0);

    const preTexts2 = await page.locator('pre').allTextContents();
    for (const t of preTexts2) {
      console.log('Pre element content:', t);
    }

    const bodyText2 = await page.evaluate(() => document.body?.innerText);
    console.log('Full page text:', bodyText2);

    // Report console errors
    console.log('\n=== Console Errors ===');
    if (consoleErrors.length === 0) {
      console.log('No console errors captured.');
    } else {
      for (const err of consoleErrors) {
        console.log(`[${err.type}]: ${err.text.substring(0, 1000)}`);
      }
    }

  } catch (err) {
    console.error('Error:', err.message);
    try { await page.screenshot({ path: '/workspace/repo/admin-error2.png', fullPage: true }); } catch (_) {}
  } finally {
    await browser.close();
  }
})();
