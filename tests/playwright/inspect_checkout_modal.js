const { chromium } = require('playwright');

(async () => {
  console.log('Connecting to Chrome on port 9222...');
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const contexts = browser.contexts();
  
  const context = contexts.length > 0 ? contexts[0] : await browser.newContext();
  const page = await context.newPage();

  console.log('Navigating to https://conviq-website.pages.dev/pricing...');
  await page.goto('https://conviq-website.pages.dev/pricing');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Click the "Mulai Sekarang" button for the Growth plan
  const planButtons = page.locator('button:has-text("Mulai"), a:has-text("Mulai")');
  console.log('Clicking the Growth plan button...');
  await planButtons.nth(1).click();
  await page.waitForTimeout(2000);

  // Print all inputs
  const inputs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('input, select, textarea')).map(el => ({
      tagName: el.tagName,
      name: el.name,
      id: el.id,
      placeholder: el.placeholder,
      type: el.type,
      className: el.className
    }));
  });

  console.log('--- ALL INPUTS ON THE PAGE ---');
  console.log(inputs);

  await browser.close();
})();
