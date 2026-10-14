const puppeteer = require('puppeteer-core')
const path = require('path')

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

async function testFavicon() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 800, height: 600 })

  // Render a visual comparison of the favicon at various sizes and on light/dark backgrounds
  await page.setContent(`<!DOCTYPE html>
  <html>
    <head>
      <title>Favicon Visual Test</title>
      <style>
        body { font-family: sans-serif; padding: 40px; background: #f0f0f0; margin: 0; }
        .row { display: flex; gap: 40px; margin-bottom: 40px; }
        .card { padding: 24px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .light { background: #ffffff; color: #202A36; }
        .dark { background: #202124; color: #ffffff; }
        .tab-preview { display: flex; align-items: center; gap: 10px; padding: 8px 16px; border-radius: 6px 6px 0 0; font-size: 13px; width: 220px; }
        .tab-light { background: #dee1e6; color: #3c4043; border-bottom: 2px solid #fff; }
        .tab-dark { background: #292a2d; color: #e8eaed; border-bottom: 2px solid #202124; }
        .grid { display: flex; align-items: center; gap: 20px; margin-top: 20px; }
        img { image-rendering: auto; }
      </style>
    </head>
    <body>
      <h2>Rovelle Habitat Favicon Clarity &amp; Contrast Audit</h2>
      
      <div class="row">
        <!-- Light Theme Browser Tab -->
        <div class="card light">
          <h3>Light Browser Tab (Chrome / Safari Light)</h3>
          <div class="tab-preview tab-light">
            <img src="http://localhost:3000/favicon-16x16.png" width="16" height="16" />
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Rovelle Habitat | Spaces designed...</span>
          </div>
          <div class="grid">
            <div><img src="http://localhost:3000/favicon-16x16.png" width="16" height="16" /><br><small>16x16</small></div>
            <div><img src="http://localhost:3000/favicon-32x32.png" width="32" height="32" /><br><small>32x32</small></div>
            <div><img src="http://localhost:3000/favicon.svg" width="64" height="64" /><br><small>64x64 SVG</small></div>
            <div><img src="http://localhost:3000/apple-touch-icon.png" width="96" height="96" /><br><small>Apple Touch</small></div>
          </div>
        </div>

        <!-- Dark Theme Browser Tab -->
        <div class="card dark">
          <h3>Dark Browser Tab (Chrome / Edge Dark Mode)</h3>
          <div class="tab-preview tab-dark">
            <img src="http://localhost:3000/favicon-16x16.png" width="16" height="16" />
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Rovelle Habitat | Spaces designed...</span>
          </div>
          <div class="grid">
            <div><img src="http://localhost:3000/favicon-16x16.png" width="16" height="16" /><br><small>16x16</small></div>
            <div><img src="http://localhost:3000/favicon-32x32.png" width="32" height="32" /><br><small>32x32</small></div>
            <div><img src="http://localhost:3000/favicon.svg" width="64" height="64" /><br><small>64x64 SVG</small></div>
            <div><img src="http://localhost:3000/apple-touch-icon.png" width="96" height="96" /><br><small>Apple Touch</small></div>
          </div>
        </div>
      </div>
    </body>
  </html>`)

  await page.waitForNetworkIdle()
  const outPath = path.join(__dirname, '..', 'public', 'screenshots', 'favicon-audit.png')
  await page.screenshot({ path: outPath, fullPage: true })
  console.log('✓ Favicon audit screenshot saved to:', outPath)

  await browser.close()
}

testFavicon().catch(console.error)
