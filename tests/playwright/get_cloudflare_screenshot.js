const { chromium } = require('playwright');
const path = require('path');

const artifactDir = '/Users/ridloabelian/.gemini/antigravity/brain/27f9c08d-3579-4b88-8e54-c641fa63fbc7';

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const contexts = browser.contexts();
  let page = null;
  for (const c of contexts) {
    for (const p of c.pages()) {
      if (p.url().includes('dash.cloudflare.com')) {
        page = p;
      }
    }
  }

  if (!page) {
    console.log('No Cloudflare tab found.');
    await browser.close();
    process.exit(1);
  }

  console.log('Found Cloudflare page at:', page.url());
  await page.bringToFront();
  await page.waitForTimeout(3000);
  
  const scPath = path.join(artifactDir, 'cloudflare_dashboard.png');
  await page.screenshot({ path: scPath });
  console.log('Saved Cloudflare dashboard screenshot to:', scPath);

  await browser.close();
})();
