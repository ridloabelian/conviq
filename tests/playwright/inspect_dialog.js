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

  // Find the dialog element
  const dialog = cfPage.locator('[role="dialog"], .modal');
  if (await dialog.count() > 0) {
    console.log('Found dialog/modal!');
    
    // Take screenshot of the dialog
    const screenshotPath = path.join(artifactDir, 'cf_dialog_open.png');
    await dialog.first().screenshot({ path: screenshotPath });
    console.log(`Saved screenshot of the dialog to ${screenshotPath}`);

    // Print all text in the dialog
    const dialogText = await dialog.first().innerText();
    console.log('--- DIALOG TEXT ---');
    console.log(dialogText);

    // List all inputs, textareas and buttons inside the dialog
    const elementsInfo = await cfPage.evaluate(() => {
      const modal = document.querySelector('[role="dialog"]') || document.querySelector('.modal');
      if (!modal) return null;
      
      const inputs = Array.from(modal.querySelectorAll('input, textarea')).map((el, i) => ({
        tag: el.tagName,
        name: el.getAttribute('name'),
        type: el.getAttribute('type'),
        placeholder: el.getAttribute('placeholder'),
        value: el.value
      }));

      const buttons = Array.from(modal.querySelectorAll('button')).map((el, i) => ({
        text: el.innerText || el.textContent,
        className: el.className
      }));

      return { inputs, buttons };
    });

    console.log('--- DIALOG INPUTS ---');
    console.log(elementsInfo.inputs);
    console.log('--- DIALOG BUTTONS ---');
    console.log(elementsInfo.buttons);
  } else {
    console.log('No dialog/modal found on the page!');
  }

  await browser.close();
})();
