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

  console.log('Extracting text areas and inputs...');
  const data = await page.evaluate(() => {
    const textareas = Array.from(document.querySelectorAll('textarea')).map(t => t.value || t.textContent);
    const inputs = Array.from(document.querySelectorAll('input')).map(i => i.value);
    const divs = Array.from(document.querySelectorAll('div')).map(d => d.textContent).filter(t => t && t.includes('eyJ'));
    return { textareas, inputs, divs };
  });

  console.log('TEXTAREAS:', data.textareas);
  console.log('INPUTS:', data.inputs);
  console.log('DIVS:', data.divs.map(t => t.substring(0, 100) + '...'));

  await browser.close();
})();
