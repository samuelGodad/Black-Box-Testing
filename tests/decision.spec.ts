import { test, expect } from '@playwright/test';

// Test cases from decision table
const discountCases = [
  {
    name: 'Logged in, Coupon applied, Cart ≥ $100',
    loggedIn: true,
    applyCoupon: true,
    cartTotal: 100,
    expectedDiscount: 20
  },
  {
    name: 'Not logged in, Coupon applied, Cart ≥ $100',
    loggedIn: false,
    applyCoupon: true,
    cartTotal: 100,
    expectedDiscount: 10
  },
  {
    name: 'Logged in, No coupon, Cart ≥ $100',
    loggedIn: true,
    applyCoupon: false,
    cartTotal: 100,
    expectedDiscount: 5
  },
  {
    name: 'Not logged in, No coupon, Cart < $100',
    loggedIn: false,
    applyCoupon: false,
    cartTotal: 50,
    expectedDiscount: 0
  }
];

test.describe('Decision Table Discount Testing - nopCommerce Cart', () => {
  for (const t of discountCases) {
    test(t.name, async ({ page }) => {
      // Go to nopCommerce home page
      await page.goto('https://demo.nopcommerce.com/');

      // If logged in is required
      if (t.loggedIn) {
        await page.click('a[href="/login"]');
        await page.fill('#Email', 'testuser@example.com');
        await page.fill('#Password', 'Test@123');
        await page.click('button.login-button');
        await expect(page.locator('a.account')).toBeVisible();
      }

      // Add items to cart to meet desired cart total
      await page.goto('https://demo.nopcommerce.com/books'); // Example category
      await page.click('a:has-text("Fahrenheit 451")'); // Or any known book/product
      await page.fill('#product_enteredQuantity_37', Math.ceil(t.cartTotal / 15).toString()); // quantity * price ≈ total
      await page.click('#add-to-cart-button-37');

      await page.goto('https://demo.nopcommerce.com/cart');

      // Apply coupon if required
      if (t.applyCoupon) {
        await page.fill('#discountcouponcode', 'DISCOUNT10'); 
        await page.click('button[name="applydiscountcouponcode"]');
        // Optionally wait for confirmation
        await page.waitForTimeout(1000);
      }

      // Get discount from cart summary
      const discountText = await page.locator('.discount-value').first().textContent();
      const discountValue = discountText ? parseFloat(discountText.replace(/[^0-9.]/g, '')) : 0;

      expect(discountValue).toBeCloseTo((t.expectedDiscount / 100) * t.cartTotal, 1);
    });
  }
});
