'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { siteConfig } from '@/data/siteConfig'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Prevent background scrolling while mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-rovelle-border bg-white/95 backdrop-blur-sm transition-colors duration-200">
      <div className="mx-auto flex h-20 max-w-site items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate"
          aria-label="Rovelle Habitat homepage"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-sm overflow-hidden shrink-0 shadow-2xs">
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
          <div className="flex flex-col">
            <span className="font-sans text-lg font-bold tracking-tight text-rovelle-charcoal transition-colors group-hover:text-rovelle-slate">
              {siteConfig.brand.name}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-rovelle-muted">
              Architectural Living
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center space-x-1 lg:space-x-2"
          aria-label="Main Navigation"
        >
          {siteConfig.navigation.main.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-150 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate ${
                  isActive
                    ? 'text-rovelle-charcoal font-semibold border-b-2 border-rovelle-slate'
                    : 'text-rovelle-muted hover:text-rovelle-charcoal hover:bg-rovelle-tint-blue'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-sm bg-rovelle-charcoal px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-rovelle-slate focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate"
          >
            <span>Enquire</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-sm p-2 text-rovelle-charcoal hover:bg-rovelle-tint-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close main navigation menu' : 'Open main navigation menu'}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-20 z-50 bg-rovelle-charcoal/50 backdrop-blur-xs md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-x-0 top-20 z-50 transform border-b border-rovelle-border bg-white p-6 shadow-lg transition-transform duration-200 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
        aria-label="Mobile Navigation"
      >
        <div className="flex flex-col space-y-4">
          {siteConfig.navigation.main.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 text-base font-medium transition-colors ${
                  isActive
                    ? 'text-rovelle-slate font-semibold'
                    : 'text-rovelle-charcoal hover:text-rovelle-slate'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.name}
              </Link>
            )
          })}
          <div className="pt-4 border-t border-rovelle-border">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-sm bg-rovelle-charcoal py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-rovelle-slate"
            >
              <span>Enquire About a Property</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="pt-2 text-xs text-rovelle-muted">
            Direct advisory: <a href={`mailto:${siteConfig.contact.email}`} className="underline hover:text-rovelle-charcoal">{siteConfig.contact.email}</a>
          </div>
        </div>
      </div>
    </header>
  )
}
