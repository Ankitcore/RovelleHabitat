import React from 'react'
import Link from 'next/link'
import { siteConfig } from '@/data/siteConfig'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-rovelle-border bg-rovelle-charcoal text-white">
      <div className="mx-auto max-w-site px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Main Grid: Responsive layout for mobile (1 col brand, 2 cols links, 1 col contact) and desktop (4 cols) */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand Column (full on mobile, 4 cols on lg) */}
          <div className="space-y-4 lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate"
              aria-label="Rovelle Habitat homepage"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-sm overflow-hidden shrink-0 border border-white/10 shadow-2xs">
                <svg
                  className="h-full w-full"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="64" height="64" rx="12" fill="#202A36" />
                  <rect x="14" y="14" width="8" height="36" fill="#657DA0" rx="1" />
                  <rect x="22" y="14" width="28" height="8" fill="#F6F4EF" rx="1" />
                  <rect x="22" y="28" width="20" height="7" fill="#657DA0" rx="1" />
                  <rect x="42" y="28" width="8" height="22" fill="#F6F4EF" rx="1" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {siteConfig.brand.name}
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-rovelle-ivory/80 leading-relaxed max-w-sm">
              {siteConfig.brand.tagline} {siteConfig.brand.description}
            </p>

            <div className="text-[11px] font-mono uppercase tracking-wider text-rovelle-slate">
              Curated Architectural Residences
            </div>
          </div>

          {/* Links Section: Two-column grid on mobile for optimal compact browsing (4 cols total on lg) */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:col-span-4">
            {/* Explore Column */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-rovelle-slate mb-3 sm:mb-4">
                Explore
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm">
                {siteConfig.navigation.main.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-block py-1 text-rovelle-ivory/80 transition-colors duration-150 hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Governance Column */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-rovelle-slate mb-3 sm:mb-4">
                Governance
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm">
                {siteConfig.navigation.legal.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-block py-1 text-rovelle-ivory/80 transition-colors duration-150 hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li className="pt-1">
                  <span className="text-[10px] text-rovelle-ivory/50 block leading-tight">
                    Demonstration inventory disclosed.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Advisory Office Column (full on mobile, 4 cols on lg) */}
          <div className="space-y-4 lg:col-span-4 border-t border-white/10 pt-8 md:border-t-0 md:pt-0">
            <h3 className="text-xs font-bold uppercase tracking-widest text-rovelle-slate mb-3 sm:mb-4">
              Advisory Office
            </h3>

            {/* Contact Information */}
            <div className="space-y-3 text-xs sm:text-sm text-rovelle-ivory/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-rovelle-slate mt-0.5" />
                <span className="leading-snug">
                  {siteConfig.contact.address.formatted}
                </span>
              </div>

              {/* Direct Touch-Friendly Actions on Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 pt-1">
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="inline-flex items-center justify-between rounded-xs border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs text-white transition-colors hover:bg-white/10 hover:border-rovelle-slate focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate"
                  aria-label={`Call ${siteConfig.contact.phone}`}
                >
                  <span className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-rovelle-slate shrink-0" />
                    <span>{siteConfig.contact.phone}</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 text-rovelle-ivory/60" />
                </a>

                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center justify-between rounded-xs border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs text-white transition-colors hover:bg-white/10 hover:border-rovelle-slate focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate"
                  aria-label={`Email ${siteConfig.contact.email}`}
                >
                  <span className="flex items-center gap-2 truncate mr-1">
                    <Mail className="h-3.5 w-3.5 text-rovelle-slate shrink-0" />
                    <span className="truncate">{siteConfig.contact.email}</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 text-rovelle-ivory/60 shrink-0" />
                </a>
              </div>

              <p className="pt-2 text-[11px] text-rovelle-ivory/60 leading-relaxed">
                {siteConfig.contact.businessHours}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Ankit Kumar Credit */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col items-center justify-between gap-3 text-xs text-rovelle-ivory/70 sm:flex-row text-center sm:text-left">
          <p>© {currentYear} Rovelle Habitat. All rights reserved.</p>
          <p className="font-medium text-white/90">
            {siteConfig.brand.developerCredit}
          </p>
        </div>
      </div>
    </footer>
  )
}
