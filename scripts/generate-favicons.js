const puppeteer = require('puppeteer-core')
const fs = require('fs')
const path = require('path')

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
  <rect width="64" height="64" rx="14" fill="#202A36" stroke="#657DA0" stroke-width="2.5" />
  <!-- Bold Architectural 'R' Monogram -->
  <!-- Left structural column -->
  <rect x="14" y="14" width="10" height="36" rx="2" fill="#FFFFFF" />
  <!-- Upper loop -->
  <path d="M24 14 H38 C44 14 48 18 48 24 C48 30 44 34 38 34 H24 Z" fill="#657DA0" />
  <rect x="24" y="21" width="12" height="6" rx="1" fill="#202A36" />
  <!-- Angled architectural strut -->
  <polygon points="32,32 44,50 34,50 24,35" fill="#FFFFFF" />
</svg>`

function createIcoFromPngs(pngBuffers) {
  const count = pngBuffers.length
  const headerSize = 6
  const dirEntrySize = 16
  let offset = headerSize + dirEntrySize * count

  const header = Buffer.alloc(headerSize)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(count, 4)

  const dirEntries = []
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(dirEntrySize)
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0)
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1)
    entry.writeUInt8(0, 2)
    entry.writeUInt8(0, 3)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(item.buffer.length, 8)
    entry.writeUInt32LE(offset, 12)
    offset += item.buffer.length
    dirEntries.push(entry)
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map((p) => p.buffer)])
}

async function generate() {
  console.log('[Favicon] Generating refined architectural favicons...')
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.setContent(`<!DOCTYPE html>
  <html>
    <head>
      <style>
        body, html { margin: 0; padding: 0; overflow: hidden; background: transparent; }
        svg { display: block; width: 100vw; height: 100vh; }
      </style>
    </head>
    <body>${svgContent}</body>
  </html>`)

  const sizes = [
    { width: 16, height: 16, filename: 'favicon-16x16.png' },
    { width: 32, height: 32, filename: 'favicon-32x32.png' },
    { width: 48, height: 48, filename: 'favicon-48x48.png' },
    { width: 180, height: 180, filename: 'apple-touch-icon.png' },
    { width: 192, height: 192, filename: 'icon-192.png' },
    { width: 512, height: 512, filename: 'icon-512.png' },
  ]

  const publicDir = path.join(__dirname, '..', 'public')
  const appDir = path.join(__dirname, '..', 'src', 'app')

  const icoSources = []

  for (const s of sizes) {
    await page.setViewport({ width: s.width, height: s.height, deviceScaleFactor: 1 })
    const buf = await page.screenshot({ type: 'png', omitBackground: true })
    fs.writeFileSync(path.join(publicDir, s.filename), buf)
    console.log(`✓ Generated ${s.filename} (${s.width}x${s.height})`)

    if (s.width <= 48) {
      icoSources.push({ width: s.width, height: s.height, buffer: buf })
    }
  }

  // Create multi-resolution ICO file
  const icoBuffer = createIcoFromPngs(icoSources)
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer)
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer)

  // Write SVG files
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent)
  fs.writeFileSync(path.join(appDir, 'icon.svg'), svgContent)
  console.log('✓ Generated SVG and ICO files across public/ and src/app/')

  await browser.close()
  console.log('[Favicon] All favicon formats generated successfully!')
}

generate().catch((err) => {
  console.error('[Favicon] Generation error:', err)
  process.exit(1)
})
