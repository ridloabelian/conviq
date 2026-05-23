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

  // Print all visible headers (h1, h2, h3, h4) and buttons on the page
  const domInfo = await cfPage.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5')).map(el => el.innerText);
    const buttons = Array.from(document.querySelectorAll('button')).map(el => el.innerText);
    const links = Array.from(document.querySelectorAll('a')).map(el => ({ text: el.innerText, href: el.getAttribute('href') }));
    return { headings, buttons, links };
  });

  console.log('--- HEADINGS ---');
  console.log(domInfo.headings);
  console.log('--- BUTTONS ---');
  console.log(domInfo.buttons);
  console.log('--- LINKS ---');
  console.log(domInfo.links.filter(l => l.text && l.text.trim() !== ''));

  // Dump the main container's text if possible
  const mainContainerText = await cfPage.evaluate(() => {
    const main = document.querySelector('main') || document.querySelector('[role="main"]');
    return main ? main.innerText : document.body.innerText;
  });

  console.log('--- MAIN TEXT CONTENT (truncated) ---');
  console.log(mainContainerText.substring(0, 1500));

  await browser.close();
})();
