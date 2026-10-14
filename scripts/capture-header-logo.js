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
  await page.goto('http://localhost:3000/residences/the-atrium-penthouse', { waitUntil: 'networkidle0' })
  await page.waitForSelector('header')
  const header = await page.$('header')
  await header.screenshot({ path: 'public/screenshots/updated-header-logo.png' })
  console.log('✓ Captured updated header screenshot!')
  await browser.close()
}

capture().catch(console.error)
