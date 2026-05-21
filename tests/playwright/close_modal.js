const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const contexts = browser.contexts();
  let page = null;
  for (const c of contexts) {
    for (const p of c.pages()) {
      if (p.url().includes('mayar.id')) {
        page = p;
      }
    }
  }

  if (!page) {
    console.log('No Mayar page found.');
    await browser.close();
    process.exit(1);
  }

  console.log('Closing modal...');
  try {
    await page.click('button:has-text("Close")');
    console.log('Successfully closed modal.');
  } catch (e) {
    console.error('Failed to click Close button:', e.message);
  }

  await browser.close();
})();
