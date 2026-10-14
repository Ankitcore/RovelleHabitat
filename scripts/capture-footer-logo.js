const puppeteer = require('puppeteer-core')
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' })
  await page.waitForSelector('footer')
  const footer = await page.$('footer')
  await footer.screenshot({ path: 'public/screenshots/updated-footer-logo.png' })
  console.log('✓ Captured updated footer screenshot!')
  await browser.close()
}

capture().catch(console.error)
