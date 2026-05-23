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
      if (page.url().includes('dash.cloudflare.com') && page.url().includes('pages/view/conviq-website/settings')) {
        cfPage = page;
      }
    }
  }

  if (!cfPage) {
    console.log('No Cloudflare Project Settings page found!');
    await browser.close();
    process.exit(1);
  }

  console.log('Found Cloudflare settings page at:', cfPage.url());
  await cfPage.bringToFront();

  // Click on "Variables and Secrets" link
  const varsLink = cfPage.locator('a[href="#variables"]');
  if (await varsLink.count() > 0) {
    console.log('Clicking "Variables and Secrets" link...');
    await varsLink.first().click();
    await cfPage.waitForTimeout(3000);
    console.log('Clicked! URL now:', cfPage.url());
  } else {
    console.log('"Variables and Secrets" link not found! Let\'s try clicking text.');
    const varsText = cfPage.locator('text=Variables and Secrets');
    if (await varsText.count() > 0) {
      await varsText.first().click();
      await cfPage.waitForTimeout(3000);
    } else {
      console.log('Text "Variables and Secrets" also not found!');
    }
  }

  // Take screenshot
  const screenshotPath = path.join(artifactDir, 'cf_project_variables.png');
  await cfPage.screenshot({ path: screenshotPath });
  console.log(`Saved screenshot to ${screenshotPath}`);

  // Let's inspect the inputs, buttons, and text in the main content area
  const mainContentText = await cfPage.evaluate(() => {
    // Let's find the content of the main settings panel or just body text related to variables
    const body = document.body.innerText;
    const lines = body.split('\n');
    return lines.filter(line => 
      line.includes('Variable') || 
      line.includes('Secret') || 
      line.includes('MAYAR') || 
      line.includes('RAILS') ||
      line.includes('Value') ||
      line.includes('Add variable') ||
      line.includes('Edit variables') ||
      line.includes('token')
    );
  });

  console.log('--- RELEVANT TEXT LINES ON PAGE ---');
  console.log(mainContentText);

  // Let's look for any tables or forms that show variable names
  const variablesList = await cfPage.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('tr, div')).filter(el => {
      const text = el.innerText || '';
      return text.includes('MAYAR_API_KEY') || text.includes('MAYAR_WEBHOOK_TOKEN') || text.includes('RAILS_BACKEND_URL');
    }).map(el => el.innerText.split('\n'));
    return rows;
  });
  console.log('--- DETECTED VARIABLES ---');
  console.log(variablesList);

  await browser.close();
})();
