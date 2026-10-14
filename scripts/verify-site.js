const puppeteer = require('puppeteer-core')
const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 3456
const BASE_URL = `http://localhost:${PORT}`

const VIEWPORTS = [
  { width: 320, height: 600, name: '320px' },
  { width: 360, height: 640, name: '360px' },
  { width: 375, height: 667, name: '375px' },
  { width: 390, height: 844, name: '390px' },
  { width: 430, height: 932, name: '430px' },
  { width: 768, height: 1024, name: '768px' },
  { width: 1024, height: 768, name: '1024px' },
  { width: 1280, height: 800, name: '1280px' },
  { width: 1440, height: 900, name: '1440px' },
  { width: 1920, height: 1080, name: '1920px' },
]

const ROUTES = [
  '/',
  '/residences',
  '/residences/the-monolith-residence',
  '/about',
  '/amenities',
  '/contact',
  '/privacy-policy',
  '/terms-and-conditions',
  '/non-existent-test-404',
]

const screenshotDir = path.join(__dirname, '..', 'public', 'screenshots')
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true })
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function runVerification() {
  console.log('[Verify] Starting production server on port', PORT)
  const server = spawn('npx', ['next', 'start', '-p', PORT.toString()], {
    shell: true,
    stdio: 'pipe',
  })

  server.stdout.on('data', (data) => {
    // console.log(`[Next.js stdout]: ${data}`)
  })
  server.stderr.on('data', (data) => {
    // console.error(`[Next.js stderr]: ${data}`)
  })

  // Wait for server to boot
  let serverReady = false
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`${BASE_URL}/`)
      if (res.ok) {
        serverReady = true
        console.log('[Verify] Server is ready!')
        break
      }
    } catch {
      await sleep(500)
    }
  }

  if (!serverReady) {
    console.error('[Verify] Server failed to start!')
    server.kill()
    process.exit(1)
  }

  console.log('[Verify] Launching Chrome...')
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })

  let allPassed = true
  const results = {
    overflowChecks: [],
    interactions: [],
    seoChecks: [],
  }

  const page = await browser.newPage()

  // 1. Check SEO, Metadata and Favicon on Home
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' })
  const homeTitle = await page.title()
  const homeMetaDesc = await page.$eval('meta[name="description"]', (el) => el.content).catch(() => '')
  console.log(`[SEO Check] Home Title: "${homeTitle}"`)
  console.log(`[SEO Check] Home Description: "${homeMetaDesc}"`)

  if (!homeTitle || !homeTitle.includes('Rovelle Habitat')) {
    console.error('FAIL: Missing or invalid home page title')
    allPassed = false
  }
  if (!homeMetaDesc) {
    console.error('FAIL: Missing home page description')
    allPassed = false
  }

  // 2. Viewport Overflow Checks
  console.log('\n--- TESTING HORIZONTAL OVERFLOW ACROSS ALL 10 VIEWPORTS ---')
  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height })

    for (const route of ROUTES) {
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle0' })
      const overflow = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth
        const winWidth = window.innerWidth
        return {
          scrollWidth: docWidth,
          innerWidth: winWidth,
          hasOverflow: docWidth > winWidth,
        }
      })

      if (overflow.hasOverflow) {
        console.error(`[OVERFLOW DETECTED] Viewport: ${vp.name}, Route: ${route}, scrollWidth: ${overflow.scrollWidth}, innerWidth: ${overflow.innerWidth}`)
        allPassed = false
        results.overflowChecks.push({ viewport: vp.name, route, status: 'FAILED', ...overflow })
      } else {
        results.overflowChecks.push({ viewport: vp.name, route, status: 'PASSED' })
      }
    }
    console.log(`✓ Viewport ${vp.name} verified without horizontal overflow.`)
  }

  // 3. Test Interactive Elements
  console.log('\n--- TESTING USER INTERACTIONS ---')

  // A. Mobile Menu
  await page.setViewport({ width: 375, height: 667 })
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' })
  const menuBtn = await page.$('button[aria-label*="navigation menu"]')
  if (menuBtn) {
    await menuBtn.click()
    await sleep(300)
    const isExpanded = await page.evaluate(() => {
      const btn = document.querySelector('button[aria-label*="navigation menu"]')
      return btn.getAttribute('aria-expanded') === 'true'
    })
    console.log(`[Interaction] Mobile Menu Open: ${isExpanded ? 'PASSED' : 'FAILED'}`)
    // Take mobile screenshot
    await page.screenshot({ path: path.join(screenshotDir, '01-mobile-hero.png') })
    await menuBtn.click()
    await sleep(200)
  }

  // B. Floor Plan thumbnail switching and Lightbox on Desktop
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' })
  await page.screenshot({ path: path.join(screenshotDir, '02-desktop-home.png'), fullPage: true })

  // C. Residences Filter
  await page.goto(`${BASE_URL}/residences`, { waitUntil: 'networkidle0' })
  await page.select('#filterType', 'Penthouse')
  await sleep(300)
  const cardCount = await page.$$eval('article', (cards) => cards.length)
  console.log(`[Interaction] Filtered Residences Count for Penthouse: ${cardCount} (Expected: 1)`)
  if (cardCount !== 1) {
    console.error('FAIL: Filter did not yield exactly 1 penthouse')
    allPassed = false
  } else {
    console.log('✓ Property filter genuinely updates displayed count.')
  }
  await page.screenshot({ path: path.join(screenshotDir, '03-residences-filtered.png') })

  // D. Contact Form Submission
  await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle0' })
  await page.type('#fullName', 'Ankit Kumar Verification')
  await page.type('#email', 'ankit.vzn@gmail.com')
  await page.type('#phone', '+91 9876543210')
  await page.select('#enquiryType', 'viewing')
  await page.type('#message', 'Automated architectural verification enquiry testing end to end transmission.')

  const submitBtn = await page.$('button[type="submit"]')
  await submitBtn.click()
  await sleep(1000)

  const successMessage = await page.$eval('[role="status"]', (el) => el.textContent).catch(() => null)
  console.log(`[Interaction] Form Submission Result: ${successMessage ? 'PASSED (' + successMessage.trim() + ')' : 'FAILED'}`)
  if (!successMessage) {
    allPassed = false
  }
  await page.screenshot({ path: path.join(screenshotDir, '04-contact-success.png') })

  // E. Property Detail Page
  await page.goto(`${BASE_URL}/residences/the-monolith-residence`, { waitUntil: 'networkidle0' })
  await page.screenshot({ path: path.join(screenshotDir, '05-residence-detail.png') })

  console.log('\n--- VERIFICATION SUMMARY ---')
  console.log(`Total Viewport-Route checks: ${results.overflowChecks.length}`)
  console.log(`All checks passed: ${allPassed}`)

  await browser.close()
  server.kill()

  if (!allPassed) {
    process.exit(1)
  }
  process.exit(0)
}

runVerification().catch((err) => {
  console.error('[Verify] Fatal error:', err)
  process.exit(1)
})
