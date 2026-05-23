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

  console.log('Found Cloudflare project page at:', cfPage.url());
  await cfPage.bringToFront();

  // Print tabs/navigation
  const textContent = await cfPage.evaluate(() => {
    return Array.from(document.querySelectorAll('a, button, [role="tab"]')).map(el => ({
      tag: el.tagName,
      role: el.getAttribute('role'),
      text: el.innerText || el.textContent,
      href: el.getAttribute('href')
    })).filter(item => item.text && item.text.trim() !== '');
  });

  console.log('--- NAVIGATION ELEMENTS ---');
  console.log(textContent);

  // Take screenshot
  await cfPage.screenshot({ path: path.join(artifactDir, 'cf_project_dashboard_loaded.png') });
  console.log('Saved project dashboard screenshot.');

  // Try to find "Settings" tab
  // Usually it has a link or button with text "Settings" or href ending with "/settings"
  const settingsTab = cfPage.locator('a:has-text("Settings"), button:has-text("Settings"), [role="tab"]:has-text("Settings")');
  if (await settingsTab.count() > 0) {
    console.log('Found Settings tab. Clicking it...');
    await settingsTab.first().click();
    await cfPage.waitForTimeout(3000);
    console.log('Navigated URL after settings click:', cfPage.url());
    await cfPage.screenshot({ path: path.join(artifactDir, 'cf_project_settings.png') });
    
    // Now let's list the settings sub-navigation to find Environment Variables
    const settingsSubNav = await cfPage.evaluate(() => {
      return Array.from(document.querySelectorAll('a, button, [role="tab"]')).map(el => ({
        tag: el.tagName,
        text: el.innerText || el.textContent,
        href: el.getAttribute('href')
      })).filter(item => item.text && item.text.trim() !== '');
    });
    console.log('--- SETTINGS SUB-NAVIGATION ---');
    console.log(settingsSubNav);
  } else {
    console.log('Could not find Settings tab/button!');
  }

  await browser.close();
})();
