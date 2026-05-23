const { chromium } = require('playwright');

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

  if (mayarPage.url() !== 'https://web.mayar.id/webhook') {
    console.log('Navigating to https://web.mayar.id/webhook...');
    await mayarPage.goto('https://web.mayar.id/webhook');
    await mayarPage.waitForLoadState('networkidle');
    await mayarPage.waitForTimeout(2000);
  }

  // Find all elements inside .rui-page-content
  const pageContentInfo = await mayarPage.evaluate(() => {
    const mainContent = document.querySelector('.rui-page-content');
    if (!mainContent) return 'No .rui-page-content found';

    const items = [];
    mainContent.querySelectorAll('button, a, h1, h2, h3, h4, h5, th, td, span').forEach(el => {
      const text = (el.innerText || el.textContent || '').trim();
      if (text) {
        items.push({
          tag: el.tagName,
          text: text,
          className: el.className,
          id: el.id,
          parentTag: el.parentElement ? el.parentElement.tagName : ''
        });
      }
    });
    return items;
  });

  console.log('--- MAIN CONTENT ELEMENTS ---');
  console.log(JSON.stringify(pageContentInfo, null, 2));

  await browser.close();
})();
