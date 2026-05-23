const { chromium } = require('playwright');
const path = require('path');

const artifactDir = '/Users/ridloabelian/.gemini/antigravity/brain/27f9c08d-3579-4b88-8e54-c641fa63fbc7';

(async () => {
  console.log('Connecting to Chrome on port 9222...');
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const contexts = browser.contexts();
  let cfPage = null;

  for (const context of contexts) {
    for (const page of context.pages()) {
      if (page.url().includes('dash.cloudflare.com') && page.url().includes('pages/view/conviq-website')) {
        cfPage = page;
        break;
      }
    }
    if (cfPage) break;
  }

  if (!cfPage) {
    console.log('No Cloudflare page found!');
    await browser.close();
    process.exit(1);
  }

  console.log('Found Cloudflare page at:', cfPage.url());
  await cfPage.bringToFront();

  // Let's dump all inputs/textareas and select elements on the entire page
  const inputs = await cfPage.evaluate(() => {
    return Array.from(document.querySelectorAll('input, textarea, select')).map((el, i) => ({
      index: i,
      tag: el.tagName,
      type: el.getAttribute('type'),
      name: el.getAttribute('name'),
      placeholder: el.getAttribute('placeholder'),
      value: el.value || '',
      labelText: el.closest('label') ? el.closest('label').innerText : (el.id ? (document.querySelector(`label[for="${el.id}"]`) ? document.querySelector(`label[for="${el.id}"]`).innerText : '') : '')
    })).filter(inp => inp.name || inp.placeholder || inp.value);
  });

  console.log('--- ALL INPUTS ON CF PAGE ---');
  console.log(inputs);

  const screenshotPath = path.join(artifactDir, 'read_already_open_drawer.png');
  await cfPage.screenshot({ path: screenshotPath });
  console.log(`Saved screenshot to ${screenshotPath}`);

  await browser.close();
})();
