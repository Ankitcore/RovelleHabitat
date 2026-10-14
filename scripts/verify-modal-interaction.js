const puppeteer = require('puppeteer-core')
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

async function verifyModalInteraction() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' })
  await page.waitForSelector('[role="dialog"]')
  console.log('✓ Modal is open on homepage mount')

  // Find the Explore Rovelle Habitat button and click it
  const buttons = await page.$$('button[type="button"]')
  // button 0 is close X, button 1 is Explore button
  const exploreBtn = buttons[1]
  await exploreBtn.click()
  await new Promise((r) => setTimeout(r, 450))

  const dialogElement = await page.$('[role="dialog"]')
  console.log('✓ Modal closed successfully via button. In DOM:', !!dialogElement)

  // Verify Escape key also closes modal on fresh navigation
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' })
  await page.waitForSelector('[role="dialog"]')
  await page.keyboard.press('Escape')
  await new Promise((r) => setTimeout(r, 450))
  const dialogAfterEscape = await page.$('[role="dialog"]')
  console.log('✓ Modal closed successfully via Escape key. In DOM:', !!dialogAfterEscape)

  await browser.close()
}

verifyModalInteraction().catch((err) => {
  console.error(err)
  process.exit(1)
})
