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

  // Let's see if we see "conviq-website" on the page
  const pageText = await cfPage.innerText('body');
  console.log('Does page contain "conviq-website"?', pageText.includes('conviq-website'));

  // Take screenshot of the initial dashboard list
  await cfPage.screenshot({ path: path.join(artifactDir, 'cf_dashboard_initial.png') });
  console.log('Saved initial dashboard screenshot.');

  // Let's click on "conviq-website" if it's there
  try {
    const projectLink = cfPage.locator('text=conviq-website');
    if (await projectLink.count() > 0) {
      console.log('Clicking on project link...');
      await projectLink.first().click();
      await cfPage.waitForTimeout(3000);
      console.log('Navigated to project URL:', cfPage.url());
      await cfPage.screenshot({ path: path.join(artifactDir, 'cf_project_dashboard.png') });
    } else {
      console.log('conviq-website element not found directly! Let\'s look for any pages or links.');
    }
  } catch (err) {
    console.error('Error during click:', err);
  }

  await browser.close();
})();
