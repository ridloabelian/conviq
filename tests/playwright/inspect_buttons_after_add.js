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

  // If the form isn't already open, click "Add"
  const addButton = cfPage.locator('button', { hasText: /^Add$/ }).first();
  if (await addButton.count() > 0) {
    console.log('Clicking Add to make sure the form is open...');
    await addButton.click();
    await cfPage.waitForTimeout(3000);
  }

  // Dump all button texts and HTML properties
  const buttonsInfo = await cfPage.evaluate(() => {
    return Array.from(document.querySelectorAll('button')).map((el, i) => ({
      index: i,
      text: el.innerText || el.textContent,
      className: el.className,
      outerHTML: el.outerHTML.substring(0, 150)
    })).filter(b => b.text && b.text.trim() !== '');
  });

  console.log('--- ALL ACTIVE BUTTONS WITH TEXT ---');
  console.log(buttonsInfo);

  // Let's also check for "Save" or "Cancel" buttons by text
  const saveButton = cfPage.locator('button:has-text("Save"), button:has-text("Simpan")');
  console.log('Save button count:', await saveButton.count());

  await browser.close();
})();
