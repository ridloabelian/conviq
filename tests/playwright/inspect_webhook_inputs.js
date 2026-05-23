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

  // Find all input elements in .rui-page-content
  const inputsInfo = await mayarPage.evaluate(() => {
    const mainContent = document.querySelector('.rui-page-content');
    if (!mainContent) return 'No .rui-page-content found';

    const items = [];
    // Select all inputs, textareas, selects, and labels
    mainContent.querySelectorAll('input, select, textarea, label, p').forEach(el => {
      items.push({
        tag: el.tagName,
        type: el.type,
        name: el.name,
        id: el.id,
        placeholder: el.placeholder,
        value: el.value,
        text: el.innerText || el.textContent,
        className: el.className
      });
    });
    return items;
  });

  console.log('--- INPUTS/LABELS IN MAIN CONTENT ---');
  console.log(JSON.stringify(inputsInfo, null, 2));

  await browser.close();
})();
