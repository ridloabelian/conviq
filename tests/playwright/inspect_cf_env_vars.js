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
      if (page.url().includes('dash.cloudflare.com') && page.url().includes('settings/production')) {
        cfPage = page;
      }
    }
  }

  if (!cfPage) {
    console.log('No Cloudflare settings page found in open tabs, opening new one...');
    const context = contexts.length > 0 ? contexts[0] : await browser.newContext();
    cfPage = await context.newPage();
    await cfPage.goto('https://dash.cloudflare.com/7094f29424a9d001e9550daa33874cda/pages/view/conviq-website/settings/production#variables');
  } else {
    console.log('Found open tab with Cloudflare settings!');
    await cfPage.bringToFront();
  }

  await cfPage.waitForLoadState('networkidle');
  await cfPage.waitForTimeout(5000);

  // Take screenshot of env variables
  const screenshotPath = path.join(artifactDir, 'cloudflare_env_variables_page.png');
  await cfPage.screenshot({ path: screenshotPath });
  console.log(`Saved screenshot to ${screenshotPath}`);

  // Find all environment variable names displayed
  const envVars = await cfPage.evaluate(() => {
    return Array.from(document.querySelectorAll('span, td, input, code, th'))
      .map(el => (el.innerText || el.textContent || el.value || '').trim())
      .filter(t => t.includes('MAYAR') || t.includes('RAILS') || t.includes('TOKEN') || t.includes('KEY'));
  });

  console.log('Detected variable keywords:', envVars);

  await browser.close();
})();
