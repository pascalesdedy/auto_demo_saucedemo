import { Page } from '@playwright/test';

export class BasePage {
    protected page: Page;
    constructor(page: Page) {
      this.page = page;
    }
    async navigateTo(path: string) {
      await this.page.goto(path);
    }
    async waitForTimeout(ms: number) {
      await this.page.waitForTimeout(ms);
    }
    async takeScreenshot(testTitle: string) {
      await this.page.screenshot({ path: `screenshots/${testTitle}.jpg` });
    }
  }