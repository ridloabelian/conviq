const { chromium } = require('playwright');
const path = require('path');

const artifactDir = '/Users/ridloabelian/.gemini/antigravity/brain/27f9c08d-3579-4b88-8e54-c641fa63fbc7';

(async () => {
  console.log('Connecting to Chrome on port 9222...');
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const contexts = browser.contexts();
  let mayarPage = null;

  for (const context of contexts) {
    for (const page of context.pages()) {
      if (page.url().includes('mayar.id')) {
        mayarPage = page;
      }
    }
  }

  if (!mayarPage) {
    console.log('No Mayar page found!');
    await browser.close();
    process.exit(1);
  }

  console.log('Found Mayar page at:', mayarPage.url());
  await mayarPage.bringToFront();

  if (mayarPage.url() !== 'https://web.mayar.id/webhook') {
    console.log('Navigating to https://web.mayar.id/webhook...');
    await mayarPage.goto('https://web.mayar.id/webhook');
    await mayarPage.waitForLoadState('networkidle');
    await mayarPage.waitForTimeout(2000);
  }

  // 1. Enter the Webhook URL
  console.log('Filling urlHook...');
  await mayarPage.fill('input[name="urlHook"]', 'https://conviq-website.pages.dev/api/webhook');

  // 2. Ensure purchase checkbox is checked
  console.log('Checking purchase checkbox status...');
  const purchaseCheckbox = mayarPage.locator('#purchaseToggle');
  const isChecked = await purchaseCheckbox.isChecked();
  console.log('Purchase checkbox is checked:', isChecked);
  if (!isChecked) {
    console.log('Clicking purchase checkbox to enable it...');
    // Sometimes custom checkboxes need to be clicked via their label or force clicked
    await purchaseCheckbox.click({ force: true });
    console.log('Purchase checkbox checked status now:', await purchaseCheckbox.isChecked());
  }

  // 3. Take a screenshot before saving
  const beforeSaveScreenshot = path.join(artifactDir, 'mayar_webhook_before_save.png');
  await mayarPage.screenshot({ path: beforeSaveScreenshot });
  console.log(`Saved screenshot before save to ${beforeSaveScreenshot}`);

  // 4. Click SIMPAN button
  console.log('Clicking SIMPAN button...');
  await mayarPage.click('button:has-text("SIMPAN")');

  console.log('Waiting 5 seconds for webhook saving to complete...');
  await mayarPage.waitForTimeout(5000);

  // 5. Take a screenshot after saving
  const afterSaveScreenshot = path.join(artifactDir, 'mayar_webhook_after_save.png');
  await mayarPage.screenshot({ path: afterSaveScreenshot });
  console.log(`Saved screenshot after save to ${afterSaveScreenshot}`);

  // 6. Verify value on the page
  const savedUrl = await mayarPage.inputValue('input[name="urlHook"]');
  const savedCheckboxStatus = await purchaseCheckbox.isChecked();
  console.log('--- SAVED CONFIGURATION ---');
  console.log('Saved Webhook URL:', savedUrl);
  console.log('Saved Purchase Checkbox Checked:', savedCheckboxStatus);

  await browser.close();
})();
