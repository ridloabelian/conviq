const { chromium } = require('playwright');
const fs = require('fs');

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

  console.log('Found Mayar page:', mayarPage.url());

  // Wait 1 second
  await new Promise(r => setTimeout(r, 1000));

  // Extract all textareas and inputs text
  const values = await mayarPage.evaluate(() => {
    const textareas = Array.from(document.querySelectorAll('textarea')).map(el => el.value || el.textContent);
    const inputs = Array.from(document.querySelectorAll('input')).map(el => el.value);
    const modals = Array.from(document.querySelectorAll('.modal, [role="dialog"]')).map(el => el.innerText);
    const divs = Array.from(document.querySelectorAll('div')).filter(el => el.innerText && el.innerText.includes('eyJh')).map(el => el.innerText);
    return { textareas, inputs, modals, divs };
  });

  console.log('--- EXTRACTED VALUES ---');
  console.log('Textareas:', values.textareas);
  console.log('Inputs:', values.inputs);
  console.log('Modals:', values.modals);
  if (values.divs.length > 0) {
    console.log('Matching Divs:', values.divs[0].substring(0, 500));
  }

  await browser.close();
})();
