import { test, expect } from '@playwright/test';

test.describe('State Transition - Login Page', () => {
  const baseURL = 'https://demo.nopcommerce.com';
  const loginURL = `${baseURL}/login`;

  test('Successful Login', async ({ page }) => {
    await page.goto(loginURL);
    await page.fill('#Email', 'testuser@example.com');
    await page.fill('#Password', 'Test@123');
    await page.click('button.login-button');
    await expect(page.locator('a.account')).toBeVisible();
    console.log('Transition: Login Form → Logged In');
  });

  test('Invalid Login Attempt', async ({ page }) => {
    await page.goto(loginURL);
    await page.fill('#Email', 'invalid@example.com');
    await page.fill('#Password', 'wrongpass');
    await page.click('button.login-button');
    await expect(page.locator('.message-error')).toContainText('Login was unsuccessful');
    console.log('Transition: Login Form → Invalid Login');
  });

  test('Multiple Failed Attempts', async ({ page }) => {
    for (let i = 0; i < 3; i++) {
      await page.goto(loginURL);
      await page.fill('#Email', 'invalid@example.com');
      await page.fill('#Password', 'wrongpass');
      await page.click('button.login-button');
      await expect(page.locator('.message-error')).toContainText('Login was unsuccessful');
      console.log(`Attempt ${i + 1}: Invalid Login`);
    }
    console.log('Simulated: Invalid Login → Locked Out');
  });

  test('Retry with Valid Credentials', async ({ page }) => {
    await page.goto(loginURL);
    await page.fill('#Email', 'testuser@example.com');
    await page.fill('#Password', 'Test@123');
    await page.click('button.login-button');
    await expect(page.locator('a.account')).toBeVisible();
    console.log('Transition: Invalid Login → Logged In');
  });
});
