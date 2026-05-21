const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Use the exact conversation brain directory for saving visual artifacts
const artifactDir = '/Users/ridloabelian/.gemini/antigravity/brain/27f9c08d-3579-4b88-8e54-c641fa63fbc7';
if (!fs.existsSync(artifactDir)) {
  fs.mkdirSync(artifactDir, { recursive: true });
}

(async () => {
  console.log('Connecting to Chrome on port 9222 via CDP...');
  let browser;
  try {
    browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
    console.log('Successfully connected to Chrome!');
  } catch (err) {
    console.error('Failed to connect to Chrome over CDP on port 9222:', err.message);
    process.exit(1);
  }

  // Get all open pages in all contexts
  const contexts = browser.contexts();
  let mayarPage = null;

  console.log(`Discovered ${contexts.length} browser contexts.`);
  for (let cIdx = 0; cIdx < contexts.length; cIdx++) {
    const context = contexts[cIdx];
    const pages = context.pages();
    console.log(`Context ${cIdx} has ${pages.length} pages.`);
    for (const page of pages) {
      const url = page.url();
      console.log(`- Page: ${url}`);
      if (url.includes('mayar.id') || url.includes('mayar.club')) {
        mayarPage = page;
      }
    }
  }

  if (mayarPage) {
    console.log(`Found active Mayar tab: ${mayarPage.url()}`);
    await mayarPage.bringToFront();
    if (!mayarPage.url().includes('api-keys')) {
      console.log('Navigating active tab to https://web.mayar.id/api-keys...');
      try {
        await mayarPage.goto('https://web.mayar.id/api-keys', { waitUntil: 'domcontentloaded', timeout: 30000 });
      } catch (err) {
        console.warn('Navigation took too long or was interrupted, proceeding...', err.message);
      }
    }
  } else {
    console.log('No existing Mayar tab found. Opening a new tab and navigating to https://web.mayar.id/api-keys...');
    const context = contexts.length > 0 ? contexts[0] : await browser.newContext();
    mayarPage = await context.newPage();
    try {
      await mayarPage.goto('https://web.mayar.id/api-keys', { waitUntil: 'domcontentloaded', timeout: 30000 });
    } catch (err) {
      console.warn('Navigation took too long or was interrupted, proceeding...', err.message);
    }
  }

  // Take an initial screenshot to see if login is required
  const initialScreenshotPath = path.join(artifactDir, 'mayar_initial.png');
  await mayarPage.screenshot({ path: initialScreenshotPath });
  console.log(`Saved initial screenshot to ${initialScreenshotPath}`);

  console.log('Waiting for Mayar API keys page to load and extracting keys...');
  
  // We will poll the page to see if an API key is visible
  let apiKey = null;
  let keyType = 'unknown';

  for (let i = 0; i < 15; i++) {
    const url = mayarPage.url();
    const title = await mayarPage.title();
    console.log(`[Attempt ${i + 1}/15] URL: ${url} | Title: ${title}`);

    // If we are on the login page or dashboard home, we might need the user to navigate/log in.
    // Let's look for common patterns of API keys on Mayar.
    // Sandbox keys start with 'sk_sandbox_' or 'pk_sandbox_', production with 'sk_live_' or 'pk_live_'.
    const htmlContent = await mayarPage.content();
    
    // Check if key is present in text
    const textMatch = htmlContent.match(/(sk_sandbox_[a-zA-Z0-9]+|sk_live_[a-zA-Z0-9]+|pk_sandbox_[a-zA-Z0-9]+|pk_live_[a-zA-Z0-9]+)/);
    if (textMatch) {
      apiKey = textMatch[0];
      keyType = apiKey.includes('sandbox') ? 'Sandbox' : 'Live';
      console.log(`SUCCESS: Found API Key in HTML content: ${apiKey} (${keyType})`);
      break;
    }

    // Check if key is present in input elements
    const inputValues = await mayarPage.evaluate(() => {
      return Array.from(document.querySelectorAll('input')).map(el => el.value);
    });
    
    const inputMatch = inputValues.find(val => 
      val.startsWith('sk_') || val.startsWith('pk_')
    );
    if (inputMatch) {
      apiKey = inputMatch;
      keyType = apiKey.includes('sandbox') ? 'Sandbox' : 'Live';
      console.log(`SUCCESS: Found API Key in input value: ${apiKey} (${keyType})`);
      break;
    }

    // Take an intermediate screenshot for progress
    await mayarPage.screenshot({ path: path.join(artifactDir, `mayar_poll_${i}.png`) });

    // Wait 2 seconds before next poll
    await new Promise(r => setTimeout(r, 2000));
  }

  // Let's also check for Webhook page or settings if possible
  console.log('Checking if we are on the Webhook page or if it can be opened...');
  const webhookScreenshotPath = path.join(artifactDir, 'mayar_webhook_status.png');
  
  // If we found the API key, let's navigate to webhooks page to inspect webhooks
  if (apiKey) {
    console.log('Navigating to Webhook settings page at https://web.mayar.id/webhooks...');
    try {
      await mayarPage.goto('https://web.mayar.id/webhooks', { waitUntil: 'domcontentloaded', timeout: 20000 });
      await new Promise(r => setTimeout(r, 3000));
      await mayarPage.screenshot({ path: webhookScreenshotPath });
      console.log(`Saved webhook page screenshot to ${webhookScreenshotPath}`);
    } catch (e) {
      console.error('Failed to navigate to webhooks settings:', e.message);
    }
  }

  if (apiKey) {
    console.log('=== EXTRACTION SUCCESS ===');
    console.log(`API_KEY: ${apiKey}`);
    console.log(`KEY_TYPE: ${keyType}`);
  } else {
    console.log('=== EXTRACTION FAILED ===');
    console.log('Could not find API Key automatically. It is possible login is required.');
  }

  // Close the browser connection
  await browser.close();
})();
