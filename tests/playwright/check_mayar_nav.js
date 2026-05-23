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

  // Print all links on the Mayar page to find where Webhooks settings are located
  const links = await mayarPage.evaluate(() => {
    return Array.from(document.querySelectorAll('a, button')).map(el => ({
      tag: el.tagName,
      text: el.innerText || el.textContent,
      href: el.getAttribute('href')
    })).filter(item => item.text && item.text.trim() !== '');
  });

  console.log('--- MAYAR NAV LINKS ---');
  console.log(links);

  // Take a screenshot of the current page
  const screenshotPath = path.join(artifactDir, 'mayar_dashboard_nav.png');
  await mayarPage.screenshot({ path: screenshotPath });
  console.log(`Saved screenshot to ${screenshotPath}`);

  await browser.close();
})();
