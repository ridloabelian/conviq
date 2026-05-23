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
      if (page.url().includes('dash.cloudflare.com') && page.url().includes('conviq-website')) {
        cfPage = page;
      }
    }
  }

  if (!cfPage) {
    console.log('No Cloudflare page found in existing tabs, opening a new tab...');
    const context = contexts.length > 0 ? contexts[0] : await browser.newContext();
    cfPage = await context.newPage();
  }

  console.log('Navigating to Cloudflare Pages project page...');
  await cfPage.goto('https://dash.cloudflare.com/7094f29424a9d001e9550daa33874cda/pages/view/conviq-website');
  await cfPage.waitForLoadState('networkidle');
  await cfPage.waitForTimeout(5000);

  const screenshotPath = path.join(artifactDir, 'cloudflare_project_deployments.png');
  await cfPage.screenshot({ path: screenshotPath });
  console.log(`Saved screenshot to ${screenshotPath}`);

  const textContent = await cfPage.evaluate(() => {
    return Array.from(document.querySelectorAll('h1, h2, h3, span, a, button'))
      .map(el => (el.innerText || el.textContent || '').trim())
      .filter(t => t.length > 0);
  });

  console.log('--- CF DEPLOYMENTS TEXT (TRUNCATED) ---');
  console.log(textContent.slice(0, 100));

  await browser.close();
})();
