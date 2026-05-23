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
      if (page.url().includes('dash.cloudflare.com') && page.url().includes('workers-and-pages')) {
        cfPage = page;
      }
    }
  }

  if (!cfPage) {
    console.log('No Cloudflare Workers & Pages tab found!');
    await browser.close();
    process.exit(1);
  }

  console.log('Found Cloudflare page at:', cfPage.url());
  await cfPage.bringToFront();
  
  // Take a screenshot to inspect
  const screenshotPath = path.join(artifactDir, 'cloudflare_workers_pages.png');
  await cfPage.screenshot({ path: screenshotPath });
  console.log(`Saved screenshot to ${screenshotPath}`);

  // Print all links/elements text to see what is on the page
  const textContent = await cfPage.evaluate(() => {
    return Array.from(document.querySelectorAll('a, button, h1, h2, h3')).map(el => ({
      tag: el.tagName,
      text: el.innerText || el.textContent,
      href: el.getAttribute('href')
    })).filter(item => item.text && item.text.trim() !== '');
  });

  console.log('--- PAGE TEXT CONTENT ---');
  console.log(textContent);

  await browser.close();
})();
