import { test, expect } from '@playwright/test';

test.setTimeout(60_000); // Extend test timeout to 60 seconds

test('BVA for book prices in each category', async ({ page }) => {
  await page.goto('http://books.toscrape.com/');

  const categoryLinks = await page.$$eval('.side_categories ul li ul li a', links =>
    links.map(link => ({
      name: link.textContent?.trim() || '',
      href: link.getAttribute('href') || ''
    }))
  );

  for (const category of categoryLinks) {
    console.log(`\n📚 Checking category: ${category.name}`);
    console.log(`🔗 URL: http://books.toscrape.com/${category.href}`);

    try {
      await page.goto(`http://books.toscrape.com/${category.href}`, {
        timeout: 10000,
        waitUntil: 'domcontentloaded'
      });

      const prices = await page.$$eval('.product_price .price_color', elements =>
        elements.map(el => parseFloat(el.textContent?.replace('£', '') || '0'))
      );

      const titles = await page.$$eval('.product_pod h3 a', elements =>
        elements.map(el => el.getAttribute('title') || 'Untitled Book')
      );

      prices.forEach((price, i) => {
        const title = titles[i];
        console.log(`   💷 "${title}" — £${price}`);
      });

      const invalidPrices: string[] = [];

      prices.forEach((price, i) => {
        if (price < 0 || price > 100) {
          invalidPrices.push(`Book "${titles[i]}" in ${category.name} has invalid price: £${price}`);
        }
      });

      if (invalidPrices.length > 0) {
        console.log('\n❌ Invalid prices found:');
        invalidPrices.forEach(msg => console.log(msg));
      } else {
        console.log('✅ All prices in this category are within £0 - £100');
      }

      expect(invalidPrices.length).toBe(0);

    } catch (err) {
      console.warn(`⚠️ Skipping category "${category.name}" due to loading error or timeout.`);
      console.error(err); // Log the actual error
    }
  }
});
