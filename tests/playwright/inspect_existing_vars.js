const { chromium } = require('playwright');
const path = require('path');

const artifactDir = '/Users/ridloabelian/.gemini/antigravity/brain/27f9c08d-3579-4b88-8e54-c641fa63fbc7';

(async () => {
  console.log('Connecting to Chrome on port 9222...');
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const contexts = browser.contexts();
  let cfPage = null;

  for (const context of contexts) {
    for (const page of context.pages()) {
      if (page.url().includes('dash.cloudflare.com') && page.url().includes('pages/view/conviq-website')) {
        cfPage = page;
        break;
      }
    }
    if (cfPage) break;
  }

  if (!cfPage) {
    console.log('No Cloudflare page found!');
    await browser.close();
    process.exit(1);
  }

  console.log('Found Cloudflare page at:', cfPage.url());
  await cfPage.bringToFront();

  // Navigate to settings if needed
  if (!cfPage.url().includes('settings/production')) {
    console.log('Navigating to settings page...');
    await cfPage.goto('https://dash.cloudflare.com/7094f29424a9d001e9550daa33874cda/pages/view/conviq-website/settings/production#variables');
    await cfPage.waitForLoadState('networkidle');
    await cfPage.waitForTimeout(3000);
  }

  // Click on "Variables and Secrets" section if needed
  const varsLink = cfPage.locator('a[href="#variables"]');
  if (await varsLink.count() > 0) {
    await varsLink.first().click();
    await cfPage.waitForTimeout(2000);
  }

  // Click on "Configure API tokens and other runtime variables" card/button to open the drawer
  const configButton = cfPage.locator('button:has-text("Configure API tokens"), [class*="Configure"]').first();
  if (await configButton.count() > 0) {
    console.log('Clicking configure variables button...');
    await configButton.click();
    await cfPage.waitForTimeout(3000);
  } else {
    // Try by finding any button/card containing "Configure"
    const configureText = cfPage.locator('text=Configure').first();
    if (await configureText.count() > 0) {
      console.log('Clicking "Configure" text element...');
      await configureText.click();
      await cfPage.waitForTimeout(3000);
    } else {
      console.log('Could not find configure variables button/card!');
    }
  }

  // Now, let's dump all inputs/textareas and select elements in the drawer
  const inputs = await cfPage.evaluate(() => {
    return Array.from(document.querySelectorAll('input, textarea, select')).map((el, i) => ({
      index: i,
      tag: el.tagName,
      type: el.getAttribute('type'),
      name: el.getAttribute('name'),
      placeholder: el.getAttribute('placeholder'),
      value: el.value,
      innerText: el.innerText
    }));
  });

  console.log('--- DRAWER INPUTS ---');
  console.log(inputs);

  const screenshotPath = path.join(artifactDir, 'inspect_existing_vars.png');
  await cfPage.screenshot({ path: screenshotPath });
  console.log(`Saved screenshot to ${screenshotPath}`);

  await browser.close();
})();
