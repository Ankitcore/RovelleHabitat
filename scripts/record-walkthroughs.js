const puppeteer = require('puppeteer-core')
const fs = require('fs')
const path = require('path')
const GIFEncoder = require('gif-encoder-2')
const { PNG } = require('pngjs')

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const BASE_URL = 'http://localhost:3000'

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function captureFrame(page, encoder) {
  const screenshotBuffer = await page.screenshot({ type: 'png' })
  const png = PNG.sync.read(screenshotBuffer)
  encoder.addFrame(png.data)
}

async function recordResidencesWalkthrough(browser) {
  console.log('[GIF 1/3] Recording Residences Interactive Filtering Walkthrough...')
  const page = await browser.newPage()
  // Record at 960x540 for optimal GitHub README display & file size
  await page.setViewport({ width: 960, height: 540 })
  await page.goto(`${BASE_URL}/residences`, { waitUntil: 'networkidle0' })
  await sleep(600)

  const encoder = new GIFEncoder(960, 540)
  encoder.setDelay(250) // 4 fps for crisp, lightweight gif
  encoder.setRepeat(0) // loop forever
  encoder.start()

  // Frame 1-3: Initial Page
  for (let i = 0; i < 3; i++) {
    await captureFrame(page, encoder)
    await sleep(150)
  }

  // Scroll down smoothly to the filter section
  await page.evaluate(() => window.scrollBy({ top: 220, behavior: 'smooth' }))
  await sleep(400)
  for (let i = 0; i < 2; i++) {
    await captureFrame(page, encoder)
  }

  // Action 1: Filter by Villa
  await page.select('#filterType', 'Villa')
  await sleep(400)
  for (let i = 0; i < 4; i++) {
    await captureFrame(page, encoder)
    await sleep(150)
  }

  // Action 2: Filter by Penthouse
  await page.select('#filterType', 'Penthouse')
  await sleep(400)
  for (let i = 0; i < 4; i++) {
    await captureFrame(page, encoder)
    await sleep(150)
  }

  // Action 3: Filter by India Region
  await page.select('#filterType', 'all')
  await sleep(250)
  await page.select('#filterLocation', 'India')
  await sleep(400)
  for (let i = 0; i < 5; i++) {
    await captureFrame(page, encoder)
    await sleep(150)
  }

  // Scroll down into the Indian cards
  await page.evaluate(() => window.scrollBy({ top: 300, behavior: 'smooth' }))
  await sleep(400)
  for (let i = 0; i < 4; i++) {
    await captureFrame(page, encoder)
    await sleep(150)
  }

  encoder.finish()
  const gifBuffer = encoder.out.getData()
  const outPath = path.join(__dirname, '..', 'public', 'screenshots', 'walkthrough-residences.gif')
  fs.writeFileSync(outPath, gifBuffer)
  console.log(`✓ Saved walkthrough-residences.gif (${(gifBuffer.length / 1024 / 1024).toFixed(2)} MB)`)
  await page.close()
}

async function recordFloorplanWalkthrough(browser) {
  console.log('[GIF 2/3] Recording Interactive Floor Plan & Lightbox Walkthrough...')
  const page = await browser.newPage()
  await page.setViewport({ width: 960, height: 540 })
  await page.goto(`${BASE_URL}/residences/the-chotanagpur-plateau-residence`, { waitUntil: 'networkidle0' })
  await sleep(500)

  const encoder = new GIFEncoder(960, 540)
  encoder.setDelay(280)
  encoder.setRepeat(0)
  encoder.start()

  // Initial view
  for (let i = 0; i < 2; i++) {
    await captureFrame(page, encoder)
  }

  // Scroll down to floor plan section
  await page.evaluate(() => {
    const el = document.querySelector('section[aria-label="Architectural Floor Plan & Room Dimensions"]')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
  await sleep(500)
  for (let i = 0; i < 4; i++) {
    await captureFrame(page, encoder)
    await sleep(150)
  }

  // Open Full Screen Lightbox
  const expandBtn = await page.$('button[aria-label="Expand architectural floor plan in full screen"]')
  if (expandBtn) {
    await expandBtn.click()
    await sleep(500)
    for (let i = 0; i < 6; i++) {
      await captureFrame(page, encoder)
      await sleep(150)
    }

    // Press Escape to close
    await page.keyboard.press('Escape')
    await sleep(400)
    for (let i = 0; i < 3; i++) {
      await captureFrame(page, encoder)
      await sleep(150)
    }
  }

  encoder.finish()
  const gifBuffer = encoder.out.getData()
  const outPath = path.join(__dirname, '..', 'public', 'screenshots', 'walkthrough-floorplan.gif')
  fs.writeFileSync(outPath, gifBuffer)
  console.log(`✓ Saved walkthrough-floorplan.gif (${(gifBuffer.length / 1024 / 1024).toFixed(2)} MB)`)
  await page.close()
}

async function recordEnquiryWalkthrough(browser) {
  console.log('[GIF 3/3] Recording Validated Enquiry Form Submission Walkthrough...')
  const page = await browser.newPage()
  await page.setViewport({ width: 960, height: 540 })
  await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle0' })
  await sleep(400)

  const encoder = new GIFEncoder(960, 540)
  encoder.setDelay(250)
  encoder.setRepeat(0)
  encoder.start()

  // Scroll to form
  await page.evaluate(() => window.scrollBy({ top: 180, behavior: 'smooth' }))
  await sleep(300)
  for (let i = 0; i < 2; i++) {
    await captureFrame(page, encoder)
  }

  // Fill inputs
  await page.type('#fullName', 'Elena Rostova', { delay: 40 })
  await captureFrame(page, encoder)
  await page.type('#email', 'elena.rostova@architecture.org', { delay: 30 })
  await captureFrame(page, encoder)
  await page.type('#phone', '+91 9876543210', { delay: 30 })
  await captureFrame(page, encoder)
  await page.select('#enquiryType', 'viewing')
  await captureFrame(page, encoder)
  await page.type('#message', 'Requesting private accompanied tour of the coastal villa.', { delay: 25 })
  for (let i = 0; i < 3; i++) {
    await captureFrame(page, encoder)
  }

  // Click Submit
  const submitBtn = await page.$('button[type="submit"]')
  if (submitBtn) {
    await submitBtn.click()
    await sleep(900)
    for (let i = 0; i < 6; i++) {
      await captureFrame(page, encoder)
      await sleep(200)
    }
  }

  encoder.finish()
  const gifBuffer = encoder.out.getData()
  const outPath = path.join(__dirname, '..', 'public', 'screenshots', 'walkthrough-enquiry.gif')
  fs.writeFileSync(outPath, gifBuffer)
  console.log(`✓ Saved walkthrough-enquiry.gif (${(gifBuffer.length / 1024 / 1024).toFixed(2)} MB)`)
  await page.close()
}

async function captureHighResScreenshots(browser) {
  console.log('[Screenshots] Capturing high-resolution static showcase captures...')
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 })

  // 1. Home Asymmetrical Split Hero
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' })
  await sleep(400)
  await page.screenshot({ path: path.join(__dirname, '..', 'public', 'screenshots', 'readme-hero.png') })
  console.log('✓ Captured readme-hero.png')

  // 2. Residences Portfolio Grid with India Filter Active
  await page.goto(`${BASE_URL}/residences`, { waitUntil: 'networkidle0' })
  await page.select('#filterLocation', 'India')
  await sleep(400)
  await page.screenshot({ path: path.join(__dirname, '..', 'public', 'screenshots', 'readme-residences-grid.png') })
  console.log('✓ Captured readme-residences-grid.png')

  // 3. Indian Residence Detail: Worli Sea-Face Penthouse
  await page.goto(`${BASE_URL}/residences/the-worli-seaface-penthouse`, { waitUntil: 'networkidle0' })
  await sleep(400)
  await page.screenshot({ path: path.join(__dirname, '..', 'public', 'screenshots', 'readme-worli-detail.png') })
  console.log('✓ Captured readme-worli-detail.png')

  // 4. Mobile Responsive Capture (iPhone 14 Pro style: 393x852)
  await page.setViewport({ width: 393, height: 852, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' })
  await sleep(400)
  await page.screenshot({ path: path.join(__dirname, '..', 'public', 'screenshots', 'readme-mobile-hero.png') })
  console.log('✓ Captured readme-mobile-hero.png')

  await page.close()
}

async function main() {
  console.log('[Media Generator] Launching browser to record GIFs and capture screenshots...')
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  try {
    await captureHighResScreenshots(browser)
    await recordResidencesWalkthrough(browser)
    await recordFloorplanWalkthrough(browser)
    await recordEnquiryWalkthrough(browser)
    console.log('[Media Generator] All walkthrough GIFs and screenshots created successfully!')
  } catch (err) {
    console.error('[Media Generator] Error:', err)
  } finally {
    await browser.close()
  }
}

main()
