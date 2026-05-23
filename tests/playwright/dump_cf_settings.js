const { chromium } = require('playwright');

(async () => {
  console.log('Connecting to Chrome on port 9222...');
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const contexts = browser.contexts();
  
  let cfPage = null;
  for (const context of contexts) {
    for (const page of context.pages()) {
      if (page.url().includes('dash.cloudflare.com') && page.url().includes('conviq-website')) {
        cfPage = page;
        break;
      }
    }
  }

  if (!cfPage) {
    console.log('No Cloudflare page found in open tabs!');
    await browser.close();
    return;
  }

  console.log('Found Cloudflare page at URL:', cfPage.url());
  await cfPage.bringToFront();
  await cfPage.waitForTimeout(2000);

  // Let's dump all text inside divs that might contain variable tables
  const elements = await cfPage.evaluate(() => {
    const results = [];
    // Find all table rows, inputs, buttons
    document.querySelectorAll('tr, td, th, input, button, span, code').forEach(el => {
      const text = (el.innerText || el.textContent || el.value || '').trim();
      if (text.length > 0 && text.length < 200) {
        results.push({
          tag: el.tagName,
          text: text,
          id: el.id,
          name: el.name,
          className: el.className
        });
      }
    });
    return results;
  });

  console.log('--- DETECTED ELEMENTS ON CLOUDFLARE PAGE ---');
  console.log(JSON.stringify(elements.slice(0, 150), null, 2));

  await browser.close();
})();
