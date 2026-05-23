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
      if (page.url().includes('dash.cloudflare.com') && page.url().includes('pages/view/conviq-website/settings')) {
        cfPage = page;
      }
    }
  }

  if (!cfPage) {
    console.log('No Cloudflare Project Settings page found!');
    await browser.close();
    process.exit(1);
  }

  console.log('Found Cloudflare settings page at:', cfPage.url());
  await cfPage.bringToFront();

  // Find the button with exact text "Add" using locator with regex or exact option
  try {
    const addButton = cfPage.locator('button', { hasText: /^Add$/ }).first();
    if (await addButton.count() > 0) {
      console.log('Found exact Add button. Clicking...');
      await addButton.click();
      await cfPage.waitForTimeout(3000);
      console.log('Clicked! Taking screenshot...');
      
      const screenshotPath = path.join(artifactDir, 'cf_project_variables_form_exact.png');
      await cfPage.screenshot({ path: screenshotPath });
      console.log(`Saved screenshot to ${screenshotPath}`);

      // Let's dump all input elements on the page to see the variable fields
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
      console.log('Inputs/Textareas on page after Add:', inputs);
    } else {
      console.log('Exact Add button not found!');
    }
  } catch (err) {
    console.error('Error:', err);
  }

  await browser.close();
})();
