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
      }
    }
  }

  if (!cfPage) {
    console.log('No Cloudflare Project page found!');
    await browser.close();
    process.exit(1);
  }

  console.log('Found Cloudflare project page. Current URL:', cfPage.url());
  
  const targetUrl = 'https://dash.cloudflare.com/7094f29424a9d001e9550daa33874cda/pages/view/conviq-website/settings';
  console.log('Navigating directly to settings page:', targetUrl);
  await cfPage.goto(targetUrl);
  
  console.log('Waiting for page to load...');
  await cfPage.waitForTimeout(5000);
  
  console.log('Current URL now:', cfPage.url());
  
  // Take screenshot
  const screenshotPath = path.join(artifactDir, 'cf_project_settings_direct.png');
  await cfPage.screenshot({ path: screenshotPath });
  console.log(`Saved screenshot to ${screenshotPath}`);

  // List all text content on the page to find if Environment Variables is visible
  const bodyText = await cfPage.innerText('body');
  console.log('Does page contain "Environment variables"?', bodyText.includes('Environment variables'));
  console.log('Does page contain "Variabel lingkungan"?', bodyText.includes('Variabel lingkungan'));

  // Print all links
  const links = await cfPage.evaluate(() => {
    return Array.from(document.querySelectorAll('a, button')).map(el => ({
      tag: el.tagName,
      text: el.innerText || el.textContent,
      href: el.getAttribute('href')
    })).filter(item => item.text && item.text.trim() !== '');
  });
  console.log('Links on settings page:', links.filter(l => l.text.toLowerCase().includes('variable') || l.text.toLowerCase().includes('lingkungan') || l.text.toLowerCase().includes('build')));

  await browser.close();
})();
