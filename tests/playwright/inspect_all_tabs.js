const { chromium } = require('playwright');

(async () => {
  console.log('Connecting to Chrome on port 9222...');
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const contexts = browser.contexts();
  
  console.log(`Found ${contexts.length} browser contexts.`);
  
  for (let cIdx = 0; cIdx < contexts.length; cIdx++) {
    const context = contexts[cIdx];
    const pages = context.pages();
    console.log(`Context ${cIdx} has ${pages.length} pages:`);
    
    for (let pIdx = 0; pIdx < pages.length; pIdx++) {
      const page = pages[pIdx];
      console.log(`  Page ${pIdx}: Title: "${await page.title()}", URL: "${page.url()}"`);
    }
  }

  await browser.close();
})();
