const puppeteer = require('puppeteer-core')
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

async function captureModal() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  // 1. Desktop capture
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' })
  
  // Wait for modal to be visible
  await page.waitForSelector('[role="dialog"]')
  await new Promise((r) => setTimeout(r, 600)) // wait for CSS scale/opacity transition

  await page.screenshot({ path: 'public/screenshots/creator-modal-desktop.png' })
  console.log('✓ Captured desktop creator modal screenshot!')

  // 2. Mobile capture
  const mobilePage = await browser.newPage()
  await mobilePage.setViewport({ width: 375, height: 812 })
  await mobilePage.goto('http://localhost:3000/', { waitUntil: 'networkidle0' })
  await mobilePage.waitForSelector('[role="dialog"]')
  await new Promise((r) => setTimeout(r, 600))

  await mobilePage.screenshot({ path: 'public/screenshots/creator-modal-mobile.png' })
  console.log('✓ Captured mobile creator modal screenshot!')

  await browser.close()
}

captureModal().catch(console.error)
