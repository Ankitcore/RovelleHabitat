const puppeteer = require('puppeteer-core')
const fs = require('fs')
const path = require('path')

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
  <rect width="64" height="64" rx="14" fill="#202A36" />
  <rect x="14" y="14" width="8" height="36" fill="#657DA0" rx="1.5" />
  <rect x="22" y="14" width="28" height="8" fill="#F6F4EF" rx="1.5" />
  <rect x="22" y="28" width="20" height="7" fill="#657DA0" rx="1.5" />
  <rect x="42" y="28" width="8" height="22" fill="#F6F4EF" rx="1.5" />
</svg>`

function createIcoFromPngs(pngBuffers) {
  // pngBuffers: array of { width, height, buffer }
  const count = pngBuffers.length
  const headerSize = 6
  const dirEntrySize = 16
  let offset = headerSize + dirEntrySize * count

  const header = Buffer.alloc(headerSize)
  header.writeUInt16LE(0, 0) // Reserved
  header.writeUInt16LE(1, 2) // Type 1 = ICO
  header.writeUInt16LE(count, 4) // Count

  const dirEntries = []
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(dirEntrySize)
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0)
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1)
    entry.writeUInt8(0, 2) // Color count (0 = no palette)
    entry.writeUInt8(0, 3) // Reserved
    entry.writeUInt16LE(1, 4) // Color planes
    entry.writeUInt16LE(32, 6) // Bits per pixel
    entry.writeUInt32LE(item.buffer.length, 8) // Size
    entry.writeUInt32LE(offset, 12) // Offset
    offset += item.buffer.length
    dirEntries.push(entry)
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map((p) => p.buffer)])
}

async function generate() {
  console.log('[Favicon] Launching browser to generate raster favicons...')
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
  console.log('✓ Generated public/favicon.ico and src/app/favicon.ico (16x16, 32x32, 48x48)')

  await browser.close()
  console.log('[Favicon] All favicon formats generated successfully!')
}

generate().catch((err) => {
  console.error('[Favicon] Generation error:', err)
  process.exit(1)
})
