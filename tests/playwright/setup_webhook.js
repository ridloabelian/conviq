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

  console.log('Navigating to https://web.mayar.id/webhook...');
  await mayarPage.goto('https://web.mayar.id/webhook');
  await mayarPage.waitForLoadState('networkidle');
  await mayarPage.waitForTimeout(2000);

  // Take a screenshot of the initial webhook page
  const screenshotPath = path.join(artifactDir, 'mayar_webhook_initial.png');
  await mayarPage.screenshot({ path: screenshotPath });
  console.log(`Saved screenshot to ${screenshotPath}`);

  // Print all links, buttons, inputs on the webhook page
  const elements = await mayarPage.evaluate(() => {
    const results = [];
    document.querySelectorAll('a, button, input, select, textarea').forEach(el => {
      results.push({
        tag: el.tagName,
        text: el.innerText || el.textContent,
        id: el.id,
        name: el.name,
        type: el.type,
        placeholder: el.placeholder,
        value: el.value,
        className: el.className
      });
    });
    return results;
  });

  console.log('--- WEBHOOK PAGE ELEMENTS ---');
  console.log(elements);

  await browser.close();
})();
