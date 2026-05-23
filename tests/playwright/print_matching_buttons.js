const { chromium } = require('playwright');

(async () => {
  console.log('Connecting to Chrome on port 9222...');
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const contexts = browser.contexts();
  
  const context = contexts.length > 0 ? contexts[0] : await browser.newContext();
  const page = await context.newPage();

  console.log('Navigating to https://conviq-website.pages.dev/pricing...');
  await page.goto('https://conviq-website.pages.dev/pricing');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  const buttonDetails = await page.evaluate(() => {
    // Select all button and link elements containing the word "Mulai"
    return Array.from(document.querySelectorAll('button, a'))
      .filter(el => (el.innerText || el.textContent || '').includes('Mulai'))
      .map((el, index) => ({
        index,
        tagName: el.tagName,
        text: (el.innerText || el.textContent || '').trim(),
        className: el.className,
        outerHTML: el.outerHTML
      }));
  });

  console.log('--- MATCHING BUTTONS DETAILS ---');
  console.log(JSON.stringify(buttonDetails, null, 2));

  await browser.close();
})();
