import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  page.setDefaultTimeout(60000);

  // Step 1: Navigate to login
  console.log('1. Navigating to login page...');
  await page.goto('https://sedevacante.com.br/admin/login', { waitUntil: 'networkidle', timeout: 60000 });
  console.log('   Login page loaded. URL:', page.url());

  // Step 2: Log in
  console.log('2. Logging in...');
  await page.fill('input[name="email"], input[id="field-email"], input[type="email"]', 'jonessilva@gmail.com');
  await page.fill('input[name="password"], input[id="field-password"], input[type="password"]', 'Somaria20500#');
  await page.click('button[type="submit"]');

  // Step 3: Wait for dashboard
  console.log('3. Waiting for login to complete...');
  try {
    await page.waitForURL('**/admin/**', { timeout: 30000 });
    await page.waitForLoadState('networkidle', { timeout: 30000 });
  } catch (e) {
    console.log('   Warning during login wait:', e.message.split('\n')[0]);
  }
  await page.waitForTimeout(3000);
  console.log('   Current URL after login:', page.url());

  // Step 4: Navigate to article 23
  console.log('4. Navigating to article 23...');
  await page.goto('https://sedevacante.com.br/admin/collections/articles/23', { waitUntil: 'networkidle', timeout: 60000 });
  console.log('   Article page loaded. URL:', page.url());

  // Step 5: Wait up to 45 seconds for full render
  console.log('5. Waiting up to 45s for page to fully render...');
  let formVisible = false;
  try {
    await page.waitForSelector('input, textarea, [contenteditable="true"], .rich-text, .field-type, [class*="field"]', { timeout: 45000 });
    formVisible = true;
    console.log('   Form elements detected!');
  } catch (e) {
    console.log('   Timeout waiting for form elements.');
  }
  await page.waitForTimeout(3000);

  // Step 6: Screenshot
  console.log('6. Taking screenshot...');
  await page.screenshot({ path: '/workspace/screenshot-admin-fix.png', fullPage: true });
  console.log('   Screenshot saved to /workspace/screenshot-admin-fix.png');

  // Step 7: Check form visibility
  console.log('7. Checking form fields...');
  const checks = {
    'input fields': await page.locator('input').count(),
    'textarea fields': await page.locator('textarea').count(),
    'contenteditable': await page.locator('[contenteditable="true"]').count(),
    'field-type divs': await page.locator('.field-type').count(),
    'any class with field': await page.locator('[class*="field"]').count(),
    'form element': await page.locator('form').count(),
    'sidebar': await page.locator('[class*="sidebar"], [class*="Sidebar"]').count(),
    'error messages': await page.locator('.error, [class*="error"], [class*="Error"]').count(),
  };
  for (const [label, count] of Object.entries(checks)) {
    console.log(`   ${label}: ${count}`);
  }

  const bodyText = await page.locator('body').innerText();
  const snippet = bodyText.substring(0, 1500);
  console.log('   Page text snippet:', snippet);

  const editFormRendered = checks['input fields'] > 2 || checks['field-type divs'] > 0 || checks['textarea fields'] > 0;
  console.log(`\n   EDIT FORM RENDERED: ${editFormRendered ? 'YES' : 'NO'}`);

  // Step 8: If form NOT visible, try alternative pages
  if (!editFormRendered) {
    console.log('\n8a. Form not visible. Trying /admin/collections/users/1...');
    await page.goto('https://sedevacante.com.br/admin/collections/users/1', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(5000);
    await page.screenshot({ path: '/workspace/screenshot-admin-user.png', fullPage: true });
    console.log('   Screenshot saved to /workspace/screenshot-admin-user.png');
    const userInputs = await page.locator('input').count();
    const userFields = await page.locator('.field-type').count();
    console.log(`   Users page - inputs: ${userInputs}, field-type: ${userFields}`);
    const userText = await page.locator('body').innerText();
    console.log('   Users page text:', userText.substring(0, 800));

    console.log('\n8b. Trying /admin/collections/articles/create...');
    await page.goto('https://sedevacante.com.br/admin/collections/articles/create', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(5000);
    await page.screenshot({ path: '/workspace/screenshot-admin-create.png', fullPage: true });
    console.log('   Screenshot saved to /workspace/screenshot-admin-create.png');
    const createInputs = await page.locator('input').count();
    const createFields = await page.locator('.field-type').count();
    console.log(`   Create page - inputs: ${createInputs}, field-type: ${createFields}`);
    const createText = await page.locator('body').innerText();
    console.log('   Create page text:', createText.substring(0, 800));
  }

  await browser.close();
  console.log('\nDone.');
})();
