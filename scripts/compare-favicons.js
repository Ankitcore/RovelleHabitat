const puppeteer = require('puppeteer-core')
const fs = require('fs')
const path = require('path')

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

// Design 1: Refined architectural "R" monogram with high contrast border & bold strokes
const design1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#202A36" stroke="#657DA0" stroke-width="2" />
  <!-- Bold Architectural 'R' monogram -->
  <!-- Left column -->
  <rect x="14" y="14" width="10" height="36" rx="2" fill="#FFFFFF" />
  <!-- Upper loop -->
  <path d="M24 14 H38 C44 14 48 18 48 24 C48 30 44 34 38 34 H24 Z" fill="#657DA0" />
  <rect x="24" y="21" width="12" height="6" rx="1" fill="#202A36" />
  <!-- Angled architectural strut -->
  <polygon points="32,32 44,50 34,50 24,35" fill="#FFFFFF" />
</svg>`

// Design 2: Architectural Pavilion / Modernist cantilever house profile (geometric & iconic)
const design2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#202A36" stroke="#657DA0" stroke-width="2" />
  <!-- Cantilever Roof / Slab -->
  <rect x="12" y="18" width="40" height="7" rx="1.5" fill="#657DA0" />
  <!-- Main Glass / White Living Volume -->
  <rect x="18" y="25" width="28" height="18" rx="1" fill="#FFFFFF" />
  <!-- Floor to ceiling architectural mullions -->
  <rect x="26" y="25" width="3" height="18" fill="#202A36" />
  <rect x="35" y="25" width="3" height="18" fill="#202A36" />
  <!-- Solid Base Plinth -->
  <rect x="10" y="43" width="44" height="6" rx="1.5" fill="#657DA0" />
</svg>`

// Design 3: Optimized Intersecting Architectural Volumes (Header Logo matched, but bold 1:1 contrast)
const design3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#202A36" stroke="#657DA0" stroke-width="2" />
  <!-- Upright Column -->
  <rect x="14" y="14" width="11" height="36" rx="2" fill="#657DA0" />
  <!-- Top Horizontal Lintel -->
  <rect x="25" y="14" width="25" height="11" rx="2" fill="#FFFFFF" />
  <!-- Mid Cantilever -->
  <rect x="25" y="27" width="16" height="8" rx="1.5" fill="#657DA0" />
  <!-- Right Supporting Pillar -->
  <rect x="39" y="27" width="11" height="23" rx="2" fill="#FFFFFF" />
</svg>`

async function compareDesigns() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1000, height: 900 })

  await page.setContent(`<!DOCTYPE html>
  <html>
    <head>
      <title>Favicon Design Comparison</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 30px; background: #eaedf2; margin: 0; }
        h1 { font-size: 20px; color: #202A36; margin-bottom: 24px; }
        .designs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .design-col { background: #fff; border-radius: 10px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
        .design-title { font-size: 15px; font-weight: 700; color: #202A36; margin-bottom: 6px; }
        .design-desc { font-size: 12px; color: #68717C; margin-bottom: 20px; min-height: 36px; }
        .tab-box { padding: 12px; border-radius: 8px; margin-bottom: 16px; }
        .tab-light { background: #dee1e6; }
        .tab-dark { background: #202124; }
        .tab-header { font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 8px; }
        .tab-light .tab-header { color: #5f6368; }
        .tab-dark .tab-header { color: #9aa0a6; }
        .tab-item { display: flex; align-items: center; gap: 8px; padding: 6px 12px; border-radius: 6px 6px 0 0; font-size: 12px; }
        .tab-item.l { background: #f1f3f4; color: #202124; border-bottom: 2px solid #fff; }
        .tab-item.d { background: #292a2d; color: #e8eaed; border-bottom: 2px solid #202124; }
        .scales { display: flex; align-items: flex-end; gap: 16px; margin-top: 14px; }
        .scale-item { text-align: center; font-size: 10px; color: #68717C; }
        .svg-icon { display: block; }
      </style>
    </head>
    <body>
      <h1>Rovelle Habitat: Favicon Visual Design Comparison</h1>
      <div class="designs-grid">
        <!-- Design 1 -->
        <div class="design-col">
          <div class="design-title">Option A: Architectural 'R' Monogram</div>
          <div class="design-desc">Classic luxury architectural monogram with sharp structural serif strut and high-contrast ivory/slate.</div>
          <div class="tab-box tab-light">
            <div class="tab-header">Light Browser Tab (Chrome)</div>
            <div class="tab-item l">
              <div style="width:16px;height:16px;">${design1}</div>
              <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">Rovelle Habitat</span>
            </div>
            <div class="scales">
              <div class="scale-item"><div style="width:16px;height:16px;">${design1}</div>16px</div>
              <div class="scale-item"><div style="width:32px;height:32px;">${design1}</div>32px</div>
              <div class="scale-item"><div style="width:64px;height:64px;">${design1}</div>64px</div>
            </div>
          </div>
          <div class="tab-box tab-dark">
            <div class="tab-header">Dark Browser Tab (Chrome / Edge)</div>
            <div class="tab-item d">
              <div style="width:16px;height:16px;">${design1}</div>
              <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">Rovelle Habitat</span>
            </div>
            <div class="scales">
              <div class="scale-item"><div style="width:16px;height:16px;">${design1}</div>16px</div>
              <div class="scale-item"><div style="width:32px;height:32px;">${design1}</div>32px</div>
              <div class="scale-item"><div style="width:64px;height:64px;">${design1}</div>64px</div>
            </div>
          </div>
        </div>

        <!-- Design 2 -->
        <div class="design-col">
          <div class="design-title">Option B: Modernist Pavilion Elevation</div>
          <div class="design-desc">Cantilevered roof slab, glass living pavilion with mullions, and solid stone plinth base.</div>
          <div class="tab-box tab-light">
            <div class="tab-header">Light Browser Tab (Chrome)</div>
            <div class="tab-item l">
              <div style="width:16px;height:16px;">${design2}</div>
              <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">Rovelle Habitat</span>
            </div>
            <div class="scales">
              <div class="scale-item"><div style="width:16px;height:16px;">${design2}</div>16px</div>
              <div class="scale-item"><div style="width:32px;height:32px;">${design2}</div>32px</div>
              <div class="scale-item"><div style="width:64px;height:64px;">${design2}</div>64px</div>
            </div>
          </div>
          <div class="tab-box tab-dark">
            <div class="tab-header">Dark Browser Tab (Chrome / Edge)</div>
            <div class="tab-item d">
              <div style="width:16px;height:16px;">${design2}</div>
              <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">Rovelle Habitat</span>
            </div>
            <div class="scales">
              <div class="scale-item"><div style="width:16px;height:16px;">${design2}</div>16px</div>
              <div class="scale-item"><div style="width:32px;height:32px;">${design2}</div>32px</div>
              <div class="scale-item"><div style="width:64px;height:64px;">${design2}</div>64px</div>
            </div>
          </div>
        </div>

        <!-- Design 3 -->
        <div class="design-col">
          <div class="design-title">Option C: Intersecting Volumes (Wordmark Matched)</div>
          <div class="design-desc">Matches the exact header mark geometry, boosted with 2px slate boundary and calibrated proportions.</div>
          <div class="tab-box tab-light">
            <div class="tab-header">Light Browser Tab (Chrome)</div>
            <div class="tab-item l">
              <div style="width:16px;height:16px;">${design3}</div>
              <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">Rovelle Habitat</span>
            </div>
            <div class="scales">
              <div class="scale-item"><div style="width:16px;height:16px;">${design3}</div>16px</div>
              <div class="scale-item"><div style="width:32px;height:32px;">${design3}</div>32px</div>
              <div class="scale-item"><div style="width:64px;height:64px;">${design3}</div>64px</div>
            </div>
          </div>
          <div class="tab-box tab-dark">
            <div class="tab-header">Dark Browser Tab (Chrome / Edge)</div>
            <div class="tab-item d">
              <div style="width:16px;height:16px;">${design3}</div>
              <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">Rovelle Habitat</span>
            </div>
            <div class="scales">
              <div class="scale-item"><div style="width:16px;height:16px;">${design3}</div>16px</div>
              <div class="scale-item"><div style="width:32px;height:32px;">${design3}</div>32px</div>
              <div class="scale-item"><div style="width:64px;height:64px;">${design3}</div>64px</div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>`)

  const outPath = path.join(__dirname, '..', 'public', 'screenshots', 'favicon-comparison.png')
  await page.screenshot({ path: outPath, fullPage: true })
  console.log('✓ Favicon comparison saved to:', outPath)

  await browser.close()
}

compareDesigns().catch(console.error)
