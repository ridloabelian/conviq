const { chromium } = require('playwright');
const path = require('path');

const artifactDir = '/Users/ridloabelian/.gemini/antigravity/brain/27f9c08d-3579-4b88-8e54-c641fa63fbc7';

const MAYAR_API_KEY = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MmIwMWZiZi04OTU3LTQ2MWEtYjcyMS1mZTRjNWI2OGFiZjkiLCJhY2NvdW50SWQiOiI1NDc5NDg5NS1jMDNiLTRjODctYjYwZC0yZDQzYzdlNjUxNGUiLCJjcmVhdGVkQXQiOiIxNzc5MzU3NjAxMTkwIiwicm9sZSI6ImRldmVsb3BlciIsInNjb3BlIjp7InJlYWQiOnRydWUsIndyaXRlIjp0cnVlfSwic3ViIjoicmlkbG9mYWxha3lAZ21haWwuY29tIiwibmFtZSI6IlBUIFByb2R1ayBEaWdpdGFsIEluZG9uZXNpYSIsImxpbmsiOiJyaWRsbyIsImlzU2VsZkRvbWFpbiI6ZmFsc2UsImlhdCI6MTc3OTM1NzYwMX0.Tz6tUSNjM0-IeKIpBYhyoA9im1g9UlEHk_5xn39O7gFrQb_CXqEcv-O3vgDVJak2dzsM6X-Qmg9W777X8V7oS-qfguRqSzKdjxlmlEAOFp7eOZGh9nV3OYcYwSkUtGCZ6fgHu7OG5sBFeN8RF5xfHysyoLrAaDnQq2y5DEmEdQA4G42uuErXc3e9elziz-ckIx6f1KfoGSnSzj7lXU85EKSCuG_nBgFnoMSxAF_Gk9quFPSmlNToRfxo81Cndez9j57kELjQf21n-U1M5HtBODfVV63zsKbm7iTLjFUFsPoHBBPgbJ_mfeeo87exRXFo0ZpJ5V08N8G1Iqs1x2PpVg';
const MAYAR_WEBHOOK_TOKEN = '47a94b34bd48261f993c6c2161f8ecb35c6e151a491bf66ff70521b68f032898491b917cdb4a706c5af2c8e8c76d15c84c7a8eec085e3b4578f6d3f2e1a980e8';
const RAILS_BACKEND_URL = 'https://app.conviq.id';

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

  // 1. Enter MAYAR_API_KEY in row 0
  console.log('Filling MAYAR_API_KEY...');
  await cfPage.fill('input[name="variables.0.name"]', 'MAYAR_API_KEY');
  await cfPage.fill('textarea[name="variables.0.value"]', MAYAR_API_KEY);

  // 2. Click "Add variable" to get row 1
  console.log('Clicking "Add variable" for the second row...');
  await cfPage.click('button:has-text("Add variable")');
  await cfPage.waitForTimeout(500);

  // 3. Fill MAYAR_WEBHOOK_TOKEN in row 1
  console.log('Filling MAYAR_WEBHOOK_TOKEN...');
  await cfPage.fill('input[name="variables.1.name"]', 'MAYAR_WEBHOOK_TOKEN');
  await cfPage.fill('textarea[name="variables.1.value"]', MAYAR_WEBHOOK_TOKEN);

  // 4. Click "Add variable" to get row 2
  console.log('Clicking "Add variable" for the third row...');
  await cfPage.click('button:has-text("Add variable")');
  await cfPage.waitForTimeout(500);

  // 5. Fill RAILS_BACKEND_URL in row 2
  console.log('Filling RAILS_BACKEND_URL...');
  await cfPage.fill('input[name="variables.2.name"]', 'RAILS_BACKEND_URL');
  await cfPage.fill('textarea[name="variables.2.value"]', RAILS_BACKEND_URL);

  // Take screenshot before saving
  const filledScreenshot = path.join(artifactDir, 'cf_env_filled.png');
  await cfPage.screenshot({ path: filledScreenshot });
  console.log(`Saved screenshot of filled form to ${filledScreenshot}`);

  // 6. Click Save
  console.log('Clicking Save...');
  await cfPage.click('button:has-text("Save")');
  
  console.log('Waiting 8 seconds for the save operation to complete...');
  await cfPage.waitForTimeout(8000);

  // Take screenshot after saving
  const savedScreenshot = path.join(artifactDir, 'cf_env_saved.png');
  await cfPage.screenshot({ path: savedScreenshot });
  console.log(`Saved screenshot of saved state to ${savedScreenshot}`);

  // Print all elements inside "#variables" to verify they exist now
  const savedVars = await cfPage.evaluate(() => {
    const section = document.querySelector('#variables');
    if (!section) return 'No variables section found';
    return section.innerText;
  });

  console.log('--- SAVED VARIABLES TEXT ---');
  console.log(savedVars);

  await browser.close();
})();
