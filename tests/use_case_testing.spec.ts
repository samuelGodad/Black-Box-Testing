import { test, expect } from '@playwright/test';

test('End-to-End Purchase Flow', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com');

  await page.click('a[href="/books"]');
  await page.click('a:has-text("Fahrenheit 451")');
  await page.fill('#product_enteredQuantity_37', '1');
  await page.click('#add-to-cart-button-37');
  await page.goto('https://demo.nopcommerce.com/cart');

  await page.check('#termsofservice');
  await page.click('#checkout');

  // Login if not already
  await page.fill('#Email', 'testuser@example.com');
  await page.fill('#Password', 'Test@123');
  await page.click('button.login-button');

  // Billing Address
  await page.selectOption('#BillingNewAddress_CountryId', '1');
  await page.fill('#BillingNewAddress_City', 'New York');
  await page.fill('#BillingNewAddress_Address1', '123 Broadway');
  await page.fill('#BillingNewAddress_ZipPostalCode', '10001');
  await page.fill('#BillingNewAddress_PhoneNumber', '1234567890');
  await page.click('button[name="save"]');

  // Shipping Method
  await page.click('input[name="shippingoption"]');
  await page.click('button.shipping-method-next-step-button');

  // Payment Method
  await page.click('input[name="paymentmethod"]');
  await page.click('button.payment-method-next-step-button');

  // Payment Info
  await page.click('button.payment-info-next-step-button');

  // Confirm
  await page.click('button.confirm-order-next-step-button');

  await expect(page.locator('.order-completed')).toContainText('Your order has been successfully processed!');
});
