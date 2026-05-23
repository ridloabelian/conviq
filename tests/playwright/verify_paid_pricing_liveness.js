const { chromium } = require('playwright');
const path = require('path');

const artifactDir = '/Users/ridloabelian/.gemini/antigravity/brain/27f9c08d-3579-4b88-8e54-c641fa63fbc7';

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

  // Click the "Mulai Sekarang" button for the second plan (index 1 = Growth, which is a paid plan)
  const planButtons = page.locator('button:has-text("Mulai"), a:has-text("Mulai")');
  console.log('Clicking the Growth plan button (index 1)...');
  await planButtons.nth(1).click();
  await page.waitForTimeout(2500); // Wait for modal animation

  const modalScreenshot = path.join(artifactDir, 'checkout_modal_open_paid.png');
  await page.screenshot({ path: modalScreenshot });
  console.log(`Saved screenshot of checkout modal to ${modalScreenshot}`);

  // Fill out the form fields
  console.log('Filling out the checkout form...');
  await page.fill('input[name="name"]', 'Ridlo Abeliansyah');
  await page.fill('input[name="email"]', 'ridlofalaky@gmail.com');
  await page.fill('input[name="mobile"]', '081234567890');
  
  // Let's use a mock account ID (UUID format or standard ID)
  // Let's check what the Rails DB has, or we can just use 1.
  await page.fill('input[name="accountId"]', '1');

  const filledScreenshot = path.join(artifactDir, 'checkout_modal_filled_paid.png');
  await page.screenshot({ path: filledScreenshot });
  console.log(`Saved screenshot of filled checkout modal to ${filledScreenshot}`);

  // Click the submit button inside the form
  console.log('Clicking the submit checkout button...');
  // The submit button is inside the form
  await page.click('form button[type="submit"]');

  console.log('Waiting 8 seconds for redirection or Mayar checkout URL construction...');
  await page.waitForTimeout(8000);

  const redirectScreenshot = path.join(artifactDir, 'checkout_redirect_result_paid.png');
  await page.screenshot({ path: redirectScreenshot });
  console.log(`Saved screenshot of redirect result to ${redirectScreenshot}`);

  console.log('Current Page URL after checkout:', page.url());

  await browser.close();
})();
