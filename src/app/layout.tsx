import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { siteConfig } from '@/data/siteConfig'

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700', '800'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#202A36',
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://rovellehabitat.com'),
  title: {
    default: 'Rovelle Habitat | Spaces designed for living',
    template: '%s | Rovelle Habitat',
  },
  description:
    'Curated residential property showcase and architectural web experience presenting contemporary residences with spatial precision, natural illumination, and verified floor plans.',
  authors: [{ name: 'Ankit Kumar', url: 'https://rovellehabitat.com' }],
  creator: 'Ankit Kumar',
  icons: {
    icon: [
      { url: '/favicon.svg?v=3', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png?v=3', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=3', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico?v=3', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=3', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=3',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rovellehabitat.com',
    siteName: 'Rovelle Habitat',
    title: 'Rovelle Habitat | Spaces designed for living',
    description:
      'Contemporary residential homes documented with verified room dimensions, architectural drawings, and honest spatial photography.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Rovelle Habitat Architectural Property Showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rovelle Habitat | Spaces designed for living',
    description:
      'Contemporary residential homes documented with verified room dimensions, architectural drawings, and honest spatial photography.',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&h=630&q=80'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="flex min-h-screen flex-col font-sans bg-white text-rovelle-charcoal antialiased">
        {/* Skip to Main Content Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-xs focus:bg-rovelle-slate focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        >
          Skip to main content
        </a>

        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
