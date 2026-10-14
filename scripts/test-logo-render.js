const puppeteer = require('puppeteer-core')
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

async function test() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox'],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 900, height: 750 })
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="font-family: -apple-system, sans-serif; padding: 30px; background: #0d1117; color: #c9d1d9;">
        <h2 style="color: white; margin-bottom: 8px;">Theme-Aware GitHub README Logo Lockup</h2>
        <p style="font-size: 13px; color: #8b949e; margin-bottom: 24px;">Automatically switches between Dark Theme and Light Theme on GitHub</p>

        <!-- Dark Background Preview -->
        <h3 style="font-size: 14px; text-transform: uppercase; color: #8b949e;">GitHub Dark Theme Mode</h3>
        <div style="background: #0d1117; padding: 30px; border-radius: 8px; text-align: center; border: 1px solid #30363d; margin-bottom: 30px;">
          <img src="http://localhost:3000/images/brand/rovelle-habitat-logo-dark.png" width="560" />
        </div>

        <!-- Light Background Preview -->
        <h3 style="font-size: 14px; text-transform: uppercase; color: #8b949e;">GitHub Light Theme Mode</h3>
        <div style="background: #ffffff; padding: 30px; border-radius: 8px; text-align: center; border: 1px solid #d0d7de;">
          <img src="http://localhost:3000/images/brand/rovelle-habitat-logo-light.png" width="560" />
        </div>
      </body>
    </html>
  `)
  await page.waitForNetworkIdle()
  await page.screenshot({ path: 'public/screenshots/logo-theme-comparison.png', fullPage: true })
  await browser.close()
  console.log('✓ Captured theme comparison screenshot!')
}

test().catch(console.error)
