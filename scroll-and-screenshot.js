const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  
  // Scroll to contact section
  await page.evaluate(() => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  
  await page.waitForTimeout(2000);
  
  // Take screenshot of contact section
  const contactSection = await page.$('#contact');
  if (contactSection) {
    await contactSection.screenshot({ path: '/tmp/contact-section.png' });
  }
  
  await browser.close();
})();
