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

  // Find all buttons on the page to identify the correct "Add" button
  const buttons = await cfPage.evaluate(() => {
    return Array.from(document.querySelectorAll('button')).map((el, i) => ({
      index: i,
      text: el.innerText || el.textContent,
      className: el.className,
      id: el.id
    }));
  });

  console.log('Buttons on page:', buttons);

  // Let's look for a button containing "Add" or click the one near "Variables and Secrets"
  // Wait, let's try to click the button with text "Add"
  try {
    const addButton = cfPage.locator('button:has-text("Add")').first();
    if (await addButton.count() > 0) {
      console.log('Found Add button. Clicking...');
      await addButton.click();
      await cfPage.waitForTimeout(3000);
      console.log('Clicked! Taking screenshot...');
      
      const screenshotPath = path.join(artifactDir, 'cf_project_variables_form.png');
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
      console.log('Add button not found!');
    }
  } catch (err) {
    console.error('Error:', err);
  }

  await browser.close();
})();
