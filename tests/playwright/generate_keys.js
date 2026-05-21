const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const artifactDir = '/Users/ridloabelian/.gemini/antigravity/brain/27f9c08d-3579-4b88-8e54-c641fa63fbc7';

(async () => {
  console.log('Connecting to Chrome on port 9222 via CDP...');
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
    console.log('Successfully connected to Chrome!');
  } catch (err) {
    console.error('Failed to connect to Chrome over CDP:', err.message);
    process.exit(1);
  }

  const contexts = browser.contexts();
  let mayarPage = null;

  for (const context of contexts) {
    for (const page of context.pages()) {
      const url = page.url();
      if (url.includes('mayar.id') || url.includes('mayar.club')) {
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

  // Navigate to api-keys if not already there
  if (!mayarPage.url().includes('api-keys')) {
    console.log('Navigating to https://web.mayar.id/api-keys...');
    await mayarPage.goto('https://web.mayar.id/api-keys', { waitUntil: 'domcontentloaded' });
    await mayarPage.waitForTimeout(3000);
  }

  // Take a screenshot before action
  await mayarPage.screenshot({ path: path.join(artifactDir, 'before_generation.png') });

  // 1. Click "Read & Write" radio button
  console.log('Clicking Read & Write radio button...');
  try {
    // Try checking the radio input itself
    const radioInput = await mayarPage.locator('input[type="radio"]').nth(1);
    await radioInput.click({ force: true });
    console.log('Clicked radio input');
  } catch (e) {
    console.error('Failed to click Read & Write radio input:', e.message);
  }

  await mayarPage.waitForTimeout(1000);

  // 2. Click "GENERATE API KEY" button
  console.log('Clicking GENERATE API KEY button...');
  try {
    // Try multiple ways to click the button
    const generateBtn = await mayarPage.locator('button:has-text("GENERATE API KEY")');
    if (await generateBtn.count() > 0) {
      await generateBtn.click();
      console.log('Clicked GENERATE API KEY button');
    } else {
      await mayarPage.click('text="GENERATE API KEY"');
      console.log('Clicked GENERATE API KEY text');
    }
  } catch (e) {
    console.error('Failed to click GENERATE API KEY button:', e.message);
  }

  await mayarPage.waitForTimeout(4000);
  await mayarPage.screenshot({ path: path.join(artifactDir, 'after_generate_clicked.png') });

  // 3. Extract API Key
  const htmlContent = await mayarPage.content();
  console.log('Extracting Webhook Token and API Key...');

  const keyMatch = htmlContent.match(/(sk_sandbox_[a-zA-Z0-9]+|sk_live_[a-zA-Z0-9]+|pk_sandbox_[a-zA-Z0-9]+|pk_live_[a-zA-Z0-9]+)/);
  if (keyMatch) {
    console.log('=== FOUND API KEY ===');
    console.log('API_KEY:', keyMatch[0]);
  } else {
    const inputValues = await mayarPage.evaluate(() => {
      return Array.from(document.querySelectorAll('input')).map(el => el.value);
    });
    const inputMatch = inputValues.find(val => val.startsWith('sk_') || val.startsWith('pk_'));
    if (inputMatch) {
      console.log('=== FOUND API KEY IN INPUT ===');
      console.log('API_KEY:', inputMatch);
    } else {
      console.log('API Key not found in HTML or inputs yet.');
    }
  }

  // 4. Copy/Show Webhook Token
  console.log('Attempting to extract Webhook Token...');
  try {
    // Find the webhook token field. Let's find inputs or containers with border/bg
    const tokenInputsBefore = await mayarPage.evaluate(() => {
      return Array.from(document.querySelectorAll('input')).map(el => el.value);
    });
    console.log('Inputs before eye click:', tokenInputsBefore);

    // Let's click the Eye button. The Eye button has an SVG and is in the container.
    // In our screenshot, the token is in a container. Let's look for buttons next to it.
    // We can find all buttons and try clicking ones with index 0 or 1
    const buttons = await mayarPage.locator('button');
    const buttonCount = await buttons.count();
    console.log(`Found ${buttonCount} buttons on the page.`);
    for (let i = 0; i < buttonCount; i++) {
      const txt = await buttons.nth(i).textContent();
      console.log(`Button ${i}: "${txt}"`);
    }

    // Usually, the Webhook Token container is the first or second section.
    // Let's try clicking the first button that does not have text "BACA LEBIH" or "LIHAT API" or "GENERATE"
    for (let i = 0; i < buttonCount; i++) {
      const txt = await buttons.nth(i).textContent();
      if (!txt || txt.trim() === '') {
        console.log(`Clicking empty button ${i} (likely eye or copy icon)...`);
        await buttons.nth(i).click();
        await mayarPage.waitForTimeout(1000);
      }
    }

    await mayarPage.waitForTimeout(2000);
    await mayarPage.screenshot({ path: path.join(artifactDir, 'after_eye_clicked.png') });

    const tokenInputsAfter = await mayarPage.evaluate(() => {
      return Array.from(document.querySelectorAll('input')).map(el => el.value);
    });
    console.log('Inputs after eye click:', tokenInputsAfter);
  } catch (e) {
    console.error('Failed to click eye button:', e.message);
  }

  await browser.close();
})();
