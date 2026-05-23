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
  await cfPage.waitForTimeout(2000);

  // Click on "Variables and Secrets" tab/link
  const varsLink = cfPage.locator('a[href="#variables"]').first();
  if (await varsLink.count() > 0) {
    console.log('Clicking Variables and Secrets tab...');
    await varsLink.click();
    await cfPage.waitForTimeout(2000);
  }

  // Click the configure variables button/card
  const configButton = cfPage.locator('button:has-text("Configure API tokens"), button:has-text("Add"), [class*="Configure"]').first();
  if (await configButton.count() > 0) {
    console.log('Clicking configure variables button...');
    await configButton.click();
    await cfPage.waitForTimeout(3000);
  } else {
    console.log('Trying text search...');
    const configText = cfPage.locator('text=Configure').first();
    if (await configText.count() > 0) {
      await configText.click();
      await cfPage.waitForTimeout(3000);
    }
  }

  // Let's dump all input names and values in the form
  const inputs = await cfPage.evaluate(() => {
    return Array.from(document.querySelectorAll('input, textarea, select')).map((el, i) => ({
      index: i,
      tag: el.tagName,
      type: el.getAttribute('type'),
      name: el.getAttribute('name'),
      placeholder: el.getAttribute('placeholder'),
      value: el.value || '',
      text: el.innerText || ''
    })).filter(inp => inp.name || inp.placeholder);
  });

  console.log('--- DRAWER INPUTS ---');
  console.log(inputs);

  const screenshotPath = path.join(artifactDir, 'inspect_existing_vars_simple.png');
  await cfPage.screenshot({ path: screenshotPath });
  console.log(`Saved screenshot to ${screenshotPath}`);

  await browser.close();
})();
