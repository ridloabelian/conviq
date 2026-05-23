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

  // If drawer is not open, open it
  const isDrawerOpen = await cfPage.evaluate(() => {
    return !!document.querySelector('input[name*="variables"]');
  });

  if (!isDrawerOpen) {
    console.log('Drawer is not open, opening it...');
    const configButton = cfPage.locator('button:has-text("Configure API tokens"), button:has-text("Add"), [class*="Configure"]').first();
    if (await configButton.count() > 0) {
      await configButton.click();
      await cfPage.waitForTimeout(3000);
    }
  }

  // Click "Add variable" (blue link text)
  const addVarLink = cfPage.locator('text=Add variable');
  if (await addVarLink.count() > 0) {
    console.log('Clicking "Add variable" once...');
    await addVarLink.first().click();
    await cfPage.waitForTimeout(1000);

    console.log('Clicking "Add variable" second time...');
    await addVarLink.first().click();
    await cfPage.waitForTimeout(1000);
  } else {
    console.log('"Add variable" element not found!');
  }

  // Dump all input names and values
  const inputs = await cfPage.evaluate(() => {
    return Array.from(document.querySelectorAll('input, textarea, select')).map((el, i) => ({
      index: i,
      tag: el.tagName,
      type: el.getAttribute('type'),
      name: el.getAttribute('name'),
      placeholder: el.getAttribute('placeholder'),
      value: el.value || '',
      labelText: el.closest('label') ? el.closest('label').innerText : ''
    })).filter(inp => inp.name || inp.placeholder);
  });

  console.log('--- DRAWER INPUTS AFTER ADDING ROWS ---');
  console.log(inputs);

  const screenshotPath = path.join(artifactDir, 'add_rows_and_inspect.png');
  await cfPage.screenshot({ path: screenshotPath });
  console.log(`Saved screenshot to ${screenshotPath}`);

  await browser.close();
})();
