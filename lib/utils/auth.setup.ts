// auth.setup.ts
import { FullConfig, chromium } from '@playwright/test';
import 'dotenv/config';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(`${process.env.BASE_URL}`);

  await page.fill('input[data-test="username"]', process.env.USERNAME!);
  await page.fill('input[data-test="password"]', process.env.PASSWORD!);
  await page.click('input[data-test="login-button"]');

  await page.waitForURL('**/inventory.html');

  // generate state
  await page.context().storageState({ path: 'storageState.json' });

  await browser.close();
}

export default globalSetup;
