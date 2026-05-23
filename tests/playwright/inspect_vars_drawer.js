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

  // If not on settings, navigate
  if (!cfPage.url().includes('settings/production')) {
    console.log('Navigating to settings page...');
    await cfPage.goto('https://dash.cloudflare.com/7094f29424a9d001e9550daa33874cda/pages/view/conviq-website/settings/production#variables');
    await cfPage.waitForLoadState('networkidle');
    await cfPage.waitForTimeout(3000);
  }

  // Click on "Variables and Secrets" section
  const varsLink = cfPage.locator('a[href="#variables"]');
  if (await varsLink.count() > 0) {
    await varsLink.first().click();
    await cfPage.waitForTimeout(2000);
  }

  // Check if drawer is open (look for heading "Variables and Secrets" inside drawer, or input name variables.*.name)
  let isDrawerOpen = await cfPage.evaluate(() => {
    return !!document.querySelector('input[name*="variables"]');
  });

  if (!isDrawerOpen) {
    console.log('Drawer is not open. Trying to open it...');
    // Look for exact "Add" or "Configure..." or "+ Add"
    const addButton = cfPage.locator('button', { hasText: /^Add$/ }).first();
    if (await addButton.count() > 0) {
      console.log('Clicking "Add" button...');
      await addButton.click();
      await cfPage.waitForTimeout(3000);
    } else {
      const addTextButton = cfPage.locator('button:has-text("Add")').first();
      if (await addTextButton.count() > 0) {
        console.log('Clicking "Add" text button...');
        await addTextButton.click();
        await cfPage.waitForTimeout(3000);
      } else {
        console.log('Could not find Add button!');
      }
    }
  }

  // Now, let's dump all inputs
  const inputs = await cfPage.evaluate(() => {
    return Array.from(document.querySelectorAll('input, textarea')).map((el, i) => ({
      index: i,
      tag: el.tagName,
      type: el.getAttribute('type'),
      name: el.getAttribute('name'),
      placeholder: el.getAttribute('placeholder'),
      value: el.value
    }));
  });

  console.log('--- DRAWER INPUTS ---');
  console.log(inputs);

  const screenshotPath = path.join(artifactDir, 'inspect_vars_drawer.png');
  await cfPage.screenshot({ path: screenshotPath });
  console.log(`Saved screenshot to ${screenshotPath}`);

  await browser.close();
})();
