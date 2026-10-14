const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, '..', 'public', 'images', 'floorplans')
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}

function generateSvgFloorPlan(title, areaSqFt, subtitle, rooms, orientation) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="100%" height="100%">
  <defs>
    <pattern id="grid_${title.replace(/[^a-zA-Z]/g, '')}" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E5E9" stroke-width="0.5" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1000" height="700" fill="#FBFBFA" />
  <rect width="1000" height="700" fill="url(#grid_${title.replace(/[^a-zA-Z]/g, '')})" />

  <!-- Frame -->
  <rect x="20" y="20" width="960" height="660" fill="none" stroke="#202A36" stroke-width="2" />
  <rect x="25" y="25" width="950" height="650" fill="none" stroke="#657DA0" stroke-width="0.75" />

  <!-- Title Block -->
  <g transform="translate(680, 560)">
    <rect width="285" height="105" fill="#FFFFFF" stroke="#202A36" stroke-width="1.5" />
    <rect width="285" height="24" fill="#657DA0" />
    <text x="12" y="16" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF" letter-spacing="1">ROVELLE HABITAT • ARCHITECTURAL SPECIFICATION</text>
    <text x="12" y="44" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#202A36">${title.toUpperCase()}</text>
    <text x="12" y="62" font-family="system-ui, sans-serif" font-size="10" fill="#68717C">${subtitle} • ${areaSqFt.toLocaleString()} SQ FT</text>
    <text x="12" y="80" font-family="system-ui, sans-serif" font-size="10" fill="#68717C">SCALE: 1:100 • ORIENTATION: ${orientation.toUpperCase()}</text>
    <text x="12" y="96" font-family="system-ui, sans-serif" font-size="9" fill="#657DA0" font-weight="600">VERIFIED ARCHITECTURAL PLAN</text>
  </g>

  <!-- North Arrow -->
  <g transform="translate(80, 80)">
    <circle cx="0" cy="0" r="28" fill="#FFFFFF" stroke="#202A36" stroke-width="1.5" />
    <path d="M 0 -22 L 6 0 L -6 0 Z" fill="#202A36" />
    <path d="M 0 22 L 6 0 L -6 0 Z" fill="#E2E5E9" />
    <text x="-4" y="-32" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#202A36">N</text>
  </g>

  <!-- Outer Walls -->
  <rect x="140" y="140" width="500" height="400" fill="#FFFFFF" stroke="#202A36" stroke-width="4" />

  <!-- Verandah / Courtyard Area -->
  <rect x="640" y="140" width="180" height="400" fill="#EEF2F8" stroke="#657DA0" stroke-width="1.5" stroke-dasharray="6,4" />
  <text x="730" y="330" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#657DA0" text-anchor="middle">COURTYARD / VERANDAH</text>
  <text x="730" y="350" font-family="system-ui, sans-serif" font-size="10" fill="#68717C" text-anchor="middle">Native Stone Pavers</text>

  <!-- Room Partitions & Labels -->
  <rect x="140" y="140" width="300" height="240" fill="#FFFFFF" stroke="#202A36" stroke-width="2" />
  <text x="290" y="250" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#202A36" text-anchor="middle">${rooms[0] || 'LIVING PAVILION'}</text>
  <text x="290" y="270" font-family="system-ui, sans-serif" font-size="11" fill="#657DA0" font-weight="600" text-anchor="middle">Primary Social Volume</text>

  <rect x="440" y="140" width="200" height="240" fill="#FFFFFF" stroke="#202A36" stroke-width="2" />
  <text x="540" y="250" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#202A36" text-anchor="middle">${rooms[1] || 'DINING &amp; KITCHEN'}</text>
  <text x="540" y="270" font-family="system-ui, sans-serif" font-size="10" fill="#68717C" text-anchor="middle">Open to Verandah</text>

  <rect x="140" y="380" width="260" height="160" fill="#FFFFFF" stroke="#202A36" stroke-width="2" />
  <text x="270" y="460" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#202A36" text-anchor="middle">${rooms[2] || 'PRIMARY SUITE'}</text>
  <text x="270" y="480" font-family="system-ui, sans-serif" font-size="10" fill="#657DA0" font-weight="600" text-anchor="middle">Private Courtyard View</text>

  <rect x="400" y="380" width="240" height="160" fill="#FFFFFF" stroke="#202A36" stroke-width="2" />
  <text x="520" y="460" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#202A36" text-anchor="middle">${rooms[3] || 'GUEST SUITE'}</text>
  <text x="520" y="480" font-family="system-ui, sans-serif" font-size="10" fill="#68717C" text-anchor="middle">En-Suite Bathroom</text>

  <!-- Dimension Markers -->
  <line x1="140" y1="120" x2="640" y2="120" stroke="#68717C" stroke-width="1" />
  <line x1="140" y1="112" x2="140" y2="128" stroke="#68717C" stroke-width="1" />
  <line x1="640" y1="112" x2="640" y2="128" stroke="#68717C" stroke-width="1" />
  <text x="390" y="114" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#68717C" text-anchor="middle">50&apos; - 0&quot; (15.2m)</text>
</svg>`
}

const plans = [
  {
    filename: 'alibaug-villa-plan.svg',
    title: 'The Alibaug Basalt Villa',
    area: 5400,
    sub: 'GROUND & COURTYARD PLAN',
    rooms: ['GREAT LIVING VERANDAH', 'TEAK DINING PAVILION', 'PRIMARY POOL SUITE', 'GUEST WING'],
    orientation: 'North-West Maritime',
  },
  {
    filename: 'goa-sanctuary-plan.svg',
    title: 'The Goa Laterite Sanctuary',
    area: 4600,
    sub: 'QUADRANGLE COURTYARD PLAN',
    rooms: ['LATERITE LIVING ROOM', 'BALCAO & VERANDAH', 'GARDEN PRIMARY SUITE', 'MEZZANINE SUITE'],
    orientation: 'East-West Tropical',
  },
  {
    filename: 'worli-penthouse-plan.svg',
    title: 'The Worli Sea-Face Penthouse',
    area: 5800,
    sub: 'TRIPLEX SKY VILLA LOWER LEVEL',
    rooms: ['DOUBLE HEIGHT OCEAN LOUNGE', 'BANQUET DINING GALLERY', 'PRIMARY CORNER SUITE', 'MEDIA & CELLAR'],
    orientation: 'West Arabian Sea',
  },
  {
    filename: 'bengaluru-canopy-plan.svg',
    title: 'The Indiranagar Canopy Penthouse',
    area: 3850,
    sub: 'SKY PENTHOUSE PLAN',
    rooms: ['TREE CANOPY LIVING ROOM', 'TIMBER DINING TERRACE', 'PRIMARY RETREAT', 'STUDY & LOUNGE'],
    orientation: 'South-East Light Axis',
  },
  {
    filename: 'aravali-pavilion-plan.svg',
    title: 'The Aravali Stone Pavilion',
    area: 4800,
    sub: 'PAVILION RESIDENCE PLAN',
    rooms: ['QUARTZITE GREAT ROOM', 'JAALI DINING COURT', 'MASTER WING', 'LIBRARY PAVILION'],
    orientation: 'North-South Axis',
  },
  {
    filename: 'chotanagpur-plan.svg',
    title: 'The Chotanagpur Plateau Residence',
    area: 3450,
    sub: 'PLATEAU ELEVATED PLAN',
    rooms: ['BOARD-FORMED CONCRETE LOUNGE', 'SAL WOOD DINING VERANDAH', 'PLATEAU MASTER SUITE', 'GUEST CABIN'],
    orientation: 'South Forest Vista',
  },
  {
    filename: 'bandra-townhouse-plan.svg',
    title: 'The Bandra Mews Townhouse',
    area: 2850,
    sub: 'MULTI-LEVEL TOWNHOME PLAN',
    rooms: ['MEWS LIVING SALON', 'FLUTED GLASS KITCHEN', 'TOP FLOOR SUITE', 'ROOF DECK LOUNGE'],
    orientation: 'West Sea Breeze',
  },
  {
    filename: 'koramangala-plan.svg',
    title: 'The Koramangala Garden Townhouse',
    area: 3100,
    sub: 'THREE-STOREY URBAN PLAN',
    rooms: ['LIGHTWELL LIVING ROOM', 'KOTA STONE DINING', 'PRIMARY BEDROOM', 'DOUBLE-HEIGHT STUDY'],
    orientation: 'East Morning Axis',
  },
]

for (const p of plans) {
  const content = generateSvgFloorPlan(p.title, p.area, p.sub, p.rooms, p.orientation)
  fs.writeFileSync(path.join(dir, p.filename), content)
  console.log(`✓ Created floor plan: ${p.filename}`)
}
