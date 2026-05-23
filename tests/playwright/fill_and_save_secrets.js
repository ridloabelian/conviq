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
      if (page.url().includes('dash.cloudflare.com') && page.url().includes('pages/view/conviq-website')) {
        cfPage = page;
        break;
      }
    }
    if (cfPage) break;
  }

  if (!cfPage) {
    console.log('No Cloudflare page found!');
    await browser.close();
    process.exit(1);
  }

  console.log('Found Cloudflare page at:', cfPage.url());
  await cfPage.bringToFront();

  // Always reload to ensure a fresh, closed drawer state
  console.log('Reloading Cloudflare settings page...');
  await cfPage.reload();
  await cfPage.waitForTimeout(6000);

  // Click on "Variables and Secrets" section
  const varsLink = cfPage.locator('a[href="#variables"]').first();
  if (await varsLink.count() > 0) {
    console.log('Clicking Variables and Secrets tab...');
    await varsLink.click();
    await cfPage.waitForTimeout(2000);
  }

  // Click the Configure button to open drawer fresh
  const configButton = cfPage.locator('button', { hasText: /^Add$/ }).first();
  if (await configButton.count() > 0) {
    console.log('Opening drawer via exact Add button...');
    await configButton.click();
    await cfPage.waitForTimeout(3000);
  } else {
    const bigButton = cfPage.locator('button:has-text("Configure API tokens and other runtime variables")').first();
    if (await bigButton.count() > 0) {
      console.log('Opening drawer via big button...');
      await bigButton.click();
      await cfPage.waitForTimeout(3000);
    } else {
      console.log('Could not find Add or Configure button!');
    }
  }

  // Add 2 more rows
  const addVarLink = cfPage.locator('text=Add variable');
  if (await addVarLink.count() > 0) {
    console.log('Adding second row...');
    await addVarLink.first().click();
    await cfPage.waitForTimeout(1000);

    console.log('Adding third row...');
    await addVarLink.first().click();
    await cfPage.waitForTimeout(1000);
  } else {
    console.log('Could not find Add variable link!');
  }

  // Fill Row 0: MAYAR_API_KEY
  console.log('Filling MAYAR_API_KEY...');
  await cfPage.fill('input[name="variables.0.name"]', 'MAYAR_API_KEY');
  await cfPage.fill('textarea[name="variables.0.value"]', MAYAR_API_KEY);

  // Fill Row 1: MAYAR_WEBHOOK_TOKEN
  console.log('Filling MAYAR_WEBHOOK_TOKEN...');
  await cfPage.fill('input[name="variables.1.name"]', 'MAYAR_WEBHOOK_TOKEN');
  await cfPage.fill('textarea[name="variables.1.value"]', MAYAR_WEBHOOK_TOKEN);

  // Fill Row 2: RAILS_BACKEND_URL
  console.log('Filling RAILS_BACKEND_URL...');
  await cfPage.fill('input[name="variables.2.name"]', 'RAILS_BACKEND_URL');
  await cfPage.fill('textarea[name="variables.2.value"]', RAILS_BACKEND_URL);

  // Take screenshot of filled secrets
  const screenshotFilled = path.join(artifactDir, 'cf_secrets_filled.png');
  await cfPage.screenshot({ path: screenshotFilled });
  console.log(`Saved filled screenshot to ${screenshotFilled}`);

  // Click Save
  const saveButton = cfPage.locator('button:has-text("Save")').first();
  if (await saveButton.count() > 0) {
    console.log('Clicking Save...');
    await saveButton.click();
    console.log('Waiting 8 seconds for save to complete...');
    await cfPage.waitForTimeout(8000);
  } else {
    console.log('Save button not found!');
  }

  // Take screenshot after save
  const screenshotSaved = path.join(artifactDir, 'cf_secrets_saved.png');
  await cfPage.screenshot({ path: screenshotSaved });
  console.log(`Saved saved screenshot to ${screenshotSaved}`);

  await browser.close();
})();
