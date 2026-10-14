import React from 'react'
import Link from 'next/link'
import { siteConfig } from '@/data/siteConfig'
import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-rovelle-border bg-rovelle-charcoal text-white">
      <div className="mx-auto max-w-site px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate"
              aria-label="Rovelle Habitat homepage"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-rovelle-slate text-white">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                >
                  <rect x="3" y="3" width="7" height="18" fill="#FFFFFF" stroke="none" />
                  <rect x="10" y="3" width="11" height="5" fill="#EEF2F8" stroke="none" />
                  <rect x="14" y="8" width="7" height="13" fill="#FFFFFF" stroke="none" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {siteConfig.brand.name}
              </span>
            </Link>
            <p className="text-sm text-rovelle-ivory/80 leading-relaxed">
              {siteConfig.brand.tagline} {siteConfig.brand.description}
            </p>
            <div className="pt-2 text-xs text-rovelle-ivory/60">
              Curated architectural residences with structural integrity.
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-rovelle-slate mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.navigation.main.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-rovelle-ivory/80 transition-colors duration-150 hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-rovelle-slate mb-4">
              Governance
            </h3>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.navigation.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-rovelle-ivory/80 transition-colors duration-150 hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <span className="text-xs text-rovelle-ivory/50 block pt-2">
                  Demonstration inventory clearly disclosed for launch review.
                </span>
              </li>
            </ul>
          </div>

          {/* Contact & Advisory */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-rovelle-slate mb-4">
              Advisory Office
            </h3>
            <div className="space-y-3 text-sm text-rovelle-ivory/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-rovelle-slate mt-0.5" />
                <span className="leading-snug">
                  {siteConfig.contact.address.formatted}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-rovelle-slate" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-rovelle-slate" />
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="transition-colors hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
              <p className="pt-2 text-xs text-rovelle-ivory/60 leading-relaxed">
                {siteConfig.contact.businessHours}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Ankit Kumar Credit */}
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col items-center justify-between gap-4 text-xs text-rovelle-ivory/70 sm:flex-row">
          <p>© {currentYear} Rovelle Habitat. All rights reserved.</p>
          <p className="font-medium text-white/90">
            {siteConfig.brand.developerCredit}
          </p>
        </div>
      </div>
    </footer>
  )
}
