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

  // Print all visible buttons
  const buttons = await cfPage.evaluate(() => {
    return Array.from(document.querySelectorAll('button')).map((el, i) => ({
      index: i,
      text: el.innerText || el.textContent,
      className: el.className
    }));
  });

  console.log('--- ALL BUTTONS ON PAGE ---');
  console.log(buttons);

  // Print all input/textarea elements and their surroundings
  const inputsInfo = await cfPage.evaluate(() => {
    return Array.from(document.querySelectorAll('input, textarea, select')).map((el, i) => ({
      index: i,
      tag: el.tagName,
      name: el.getAttribute('name'),
      type: el.getAttribute('type'),
      placeholder: el.getAttribute('placeholder'),
      value: el.value,
      parentText: el.parentElement ? el.parentElement.innerText.substring(0, 100) : ''
    }));
  });

  console.log('--- ALL INPUTS ON PAGE ---');
  console.log(inputsInfo);

  await browser.close();
})();
