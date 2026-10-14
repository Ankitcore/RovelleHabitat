const puppeteer = require('puppeteer-core')
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()

  // Mobile 375px
  await page.setViewport({ width: 375, height: 812 })
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' })
  await page.waitForSelector('footer')
  const footerMobile = await page.$('footer')
  await footerMobile.screenshot({ path: 'public/screenshots/mobile-footer-375.png' })

  // Tablet 768px
  await page.setViewport({ width: 768, height: 1024 })
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' })
  await page.waitForSelector('footer')
  const footerTablet = await page.$('footer')
  await footerTablet.screenshot({ path: 'public/screenshots/tablet-footer-768.png' })

  await browser.close()
  console.log('Mobile and tablet footer screenshots captured!')
}

capture().catch(console.error)
