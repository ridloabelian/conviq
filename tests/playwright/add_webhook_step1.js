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

  // Make sure we are on the webhook page
  if (mayarPage.url() !== 'https://web.mayar.id/webhook') {
    console.log('Navigating to https://web.mayar.id/webhook...');
    await mayarPage.goto('https://web.mayar.id/webhook');
    await mayarPage.waitForLoadState('networkidle');
    await mayarPage.waitForTimeout(2000);
  }

  // Find all buttons inside the main content area
  const buttonsInfo = await mayarPage.evaluate(() => {
    // Look for non-sidebar buttons
    // The sidebar might be under a class like yaybar, yay-hide, etc. Let's find all buttons and their container tags.
    return Array.from(document.querySelectorAll('button, a')).map(el => {
      let parent = el.parentElement;
      let path = el.tagName;
      while (parent && parent.tagName !== 'BODY') {
        path = parent.tagName + (parent.className ? '.' + parent.className.split(' ').join('.') : '') + ' > ' + path;
        parent = parent.parentElement;
      }
      return {
        tag: el.tagName,
        text: el.innerText || el.textContent,
        path: path,
        id: el.id,
        className: el.className
      };
    }).filter(item => {
      const isSidebar = item.path.includes('yay') || item.path.includes('sidebar') || item.className.includes('yay');
      return !isSidebar && item.text && item.text.trim() !== '';
    });
  });

  console.log('--- NON-SIDEBAR BUTTONS/LINKS ---');
  console.log(JSON.stringify(buttonsInfo, null, 2));

  // Let's search for "tambah", "webhook", "add", "buat" button
  const targetButton = buttonsInfo.find(b => 
    b.text.toLowerCase().includes('tambah') || 
    b.text.toLowerCase().includes('add') || 
    b.text.toLowerCase().includes('buat') ||
    b.text.toLowerCase().includes('webhook')
  );

  if (targetButton) {
    console.log('Found potential target button:', targetButton);
    // Click the button using Playwright locator
    // We can locate by text
    console.log(`Clicking button with text: "${targetButton.text.trim()}"`);
    await mayarPage.click(`text="${targetButton.text.trim()}"`);
    await mayarPage.waitForTimeout(2000);

    const screenshotPath = path.join(artifactDir, 'mayar_webhook_clicked.png');
    await mayarPage.screenshot({ path: screenshotPath });
    console.log(`Saved screenshot to ${screenshotPath}`);

    // Inspect if any inputs are now visible
    const inputsInfo = await mayarPage.evaluate(() => {
      return Array.from(document.querySelectorAll('input, select, textarea')).map(el => ({
        tag: el.tagName,
        type: el.type,
        name: el.name,
        id: el.id,
        placeholder: el.placeholder,
        value: el.value,
        labels: Array.from(el.labels || []).map(l => l.innerText)
      }));
    });
    console.log('--- VISIBLE INPUTS AFTER CLICK ---');
    console.log(inputsInfo);
  } else {
    console.log('No "Tambah Webhook" button found by text search!');
  }

  await browser.close();
})();
