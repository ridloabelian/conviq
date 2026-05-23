const { chromium } = require('playwright');
const path = require('path');

const artifactDir = '/Users/ridloabelian/.gemini/antigravity/brain/27f9c08d-3579-4b88-8e54-c641fa63fbc7';

(async () => {
  console.log('Connecting to Chrome on port 9222...');
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const contexts = browser.contexts();
  
  // Use the first context or create one
  const context = contexts.length > 0 ? contexts[0] : await browser.newContext();
  const page = await context.newPage();

  console.log('Navigating to https://conviq-website.pages.dev/pricing...');
  await page.goto('https://conviq-website.pages.dev/pricing');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Take a screenshot of the pricing page
  const pricingScreenshot = path.join(artifactDir, 'website_pricing_page.png');
  await page.screenshot({ path: pricingScreenshot });
  console.log(`Saved screenshot of pricing page to ${pricingScreenshot}`);

  // Find all buttons on the pricing page
  const buttonsText = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button, a')).map(el => (el.innerText || el.textContent || '').trim()).filter(Boolean);
  });
  console.log('Available buttons/links:', buttonsText);

  // Click the first "Mulai Sekarang" or "Pilih Paket" or similar button
  // Let's click the first button containing "Mulai"
  const planButtons = page.locator('button:has-text("Mulai"), a:has-text("Mulai")');
  const btnCount = await planButtons.count();
  console.log(`Found ${btnCount} plan buttons.`);

  if (btnCount > 0) {
    console.log('Clicking the first plan button...');
    await planButtons.first().click();
    await page.waitForTimeout(2000);

    const modalScreenshot = path.join(artifactDir, 'checkout_modal_open.png');
    await page.screenshot({ path: modalScreenshot });
    console.log(`Saved screenshot of checkout modal to ${modalScreenshot}`);

    // Let's inspect the inputs inside the modal
    const inputs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('input, select, textarea')).map(el => ({
        name: el.name,
        id: el.id,
        placeholder: el.placeholder,
        value: el.value,
        type: el.type
      }));
    });
    console.log('Checkout modal inputs:', inputs);

    // Let's fill the checkout form
    console.log('Filling out the checkout form...');
    if (await page.locator('input[placeholder*="Nama Lengkap"]').count() > 0) {
      await page.fill('input[placeholder*="Nama Lengkap"]', 'Ridlo Abeliansyah');
    } else if (await page.locator('input[name="name"]').count() > 0) {
      await page.fill('input[name="name"]', 'Ridlo Abeliansyah');
    }

    if (await page.locator('input[placeholder*="Email"]').count() > 0) {
      await page.fill('input[placeholder*="Email"]', 'test-customer@conviq.id');
    } else if (await page.locator('input[name="email"]').count() > 0) {
      await page.fill('input[name="email"]', 'test-customer@conviq.id');
    }

    if (await page.locator('input[placeholder*="Telepon"]').count() > 0) {
      await page.fill('input[placeholder*="Telepon"]', '081234567890');
    } else if (await page.locator('input[placeholder*="HP"]').count() > 0) {
      await page.fill('input[placeholder*="HP"]', '081234567890');
    } else if (await page.locator('input[name="phone"]').count() > 0) {
      await page.fill('input[name="phone"]', '081234567890');
    }

    if (await page.locator('input[placeholder*="Nama Perusahaan"]').count() > 0) {
      await page.fill('input[placeholder*="Nama Perusahaan"]', 'Conviq Indo Test');
    } else if (await page.locator('input[name="company"]').count() > 0) {
      await page.fill('input[name="company"]', 'Conviq Indo Test');
    }

    const filledScreenshot = path.join(artifactDir, 'checkout_modal_filled.png');
    await page.screenshot({ path: filledScreenshot });
    console.log(`Saved screenshot of filled checkout modal to ${filledScreenshot}`);

    // Click submit/pay button
    // Let's find button with text "Bayar" or "Lanjutkan" or "Proses"
    const submitBtn = page.locator('button:has-text("Bayar"), button:has-text("Lanjutkan"), button:has-text("Proses"), button[type="submit"]');
    console.log('Clicking the checkout submit button...');
    await submitBtn.first().click();

    console.log('Waiting 8 seconds for redirection or Mayar checkout URL construction...');
    await page.waitForTimeout(8000);

    const redirectScreenshot = path.join(artifactDir, 'checkout_redirect_result.png');
    await page.screenshot({ path: redirectScreenshot });
    console.log(`Saved screenshot of redirect result to ${redirectScreenshot}`);

    console.log('Current Page URL after checkout:', page.url());
  } else {
    console.log('No plan buttons found on the pricing page.');
  }

  await browser.close();
})();
