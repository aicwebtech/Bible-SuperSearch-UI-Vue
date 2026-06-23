// @ts-check
import { test, expect } from '@playwright/test';

//import appConfig from '../config.js';

console.log('Hello world!', process.env.TEST_BASE_URL); // TEST_BASE_URL='http://hello-world' npm run test:e2e

test('has title', async ({ page }, testInfo) => {
    //console.log('Test Config:', testInfo.config);

    await page.goto('https://playwright.dev/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
