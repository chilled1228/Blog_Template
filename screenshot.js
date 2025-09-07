const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport size
  await page.setViewportSize({ width: 1200, height: 800 });
  
  // Navigate to the Freepik blog post
  await page.goto('https://www.freepik.com/blog/how-to-create-better-visuals-with-less-prompting-workshop-by-jerrod/');
  
  // Wait for the page to load completely
  await page.waitForLoadState('networkidle');
  
  // Take a full page screenshot
  await page.screenshot({ 
    path: 'freepik-blog-screenshot.png', 
    fullPage: true 
  });
  
  console.log('Screenshot saved as freepik-blog-screenshot.png');
  
  await browser.close();
})();