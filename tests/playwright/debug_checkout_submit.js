const { chromium } = require('playwright');
const path = require('path');

const artifactDir = '/Users/ridloabelian/.gemini/antigravity/brain/27f9c08d-3579-4b88-8e54-c641fa63fbc7';

(async () => {
  console.log('Connecting to Chrome on port 9222...');
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const contexts = browser.contexts();
  
  const context = contexts.length > 0 ? contexts[0] : await browser.newContext();
  const page = await context.newPage();

  // Listen to console logs
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

  console.log('Navigating to pricing page...');
  await page.goto('https://conviq-website.pages.dev/pricing');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  const planButtons = page.locator('button:has-text("Mulai"), a:has-text("Mulai")');
  console.log('Clicking the Growth plan button (index 1)...');
  await planButtons.nth(1).click();
  await page.waitForTimeout(2000);

  console.log('Filling out form...');
  await page.fill('input[name="name"]', 'Ridlo Abeliansyah');
  await page.fill('input[name="email"]', 'ridlofalaky@gmail.com');
  await page.fill('input[name="mobile"]', '081234567890');
  await page.fill('input[name="accountId"]', '1');

  await page.screenshot({ path: path.join(artifactDir, 'debug_checkout_modal_filled.png') });

  // Click submit and monitor network response
  console.log('Submitting form...');
  
  // Setup request/response monitoring
  page.on('request', request => {
    if (request.url().includes('checkout')) {
      console.log('REQUEST SENT TO:', request.url(), request.postData());
    }
  });

  page.on('response', async response => {
    if (response.url().includes('checkout')) {
      console.log('RESPONSE STATUS:', response.status());
      try {
        console.log('RESPONSE BODY:', await response.text());
      } catch (e) {
        console.log('Failed to read response body:', e.message);
      }
    }
  });

  await page.click('form button[type="submit"]');

  console.log('Waiting 5 seconds...');
  await page.waitForTimeout(5000);

  // Check if there is an error message visible
  const errorText = await page.evaluate(() => {
    const errEl = document.querySelector('.bg-red-50, [class*="red"]');
    return errEl ? errEl.innerText : null;
  });

  console.log('Error text on screen:', errorText);

  await page.screenshot({ path: path.join(artifactDir, 'debug_checkout_submit_result.png') });
  console.log('Final URL:', page.url());

  await browser.close();
})();
