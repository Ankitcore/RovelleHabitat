'use client'

import React, { useState, useEffect } from 'react'
import { X, Github, Linkedin, ExternalLink, ArrowRight, Compass, Code2 } from 'lucide-react'
import { siteConfig } from '@/data/siteConfig'

export function CreatorWelcomeModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isRendered, setIsRendered] = useState(false)

  useEffect(() => {
    // Show modal on homepage open
    setIsRendered(true)
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      setIsRendered(false)
    }, 300)
  }

  if (!isRendered) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="creator-modal-title"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${
        isOpen
          ? 'bg-rovelle-charcoal/70 backdrop-blur-sm opacity-100'
          : 'bg-transparent backdrop-blur-none opacity-0 pointer-events-none'
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-lg sm:max-w-xl overflow-hidden rounded-xs border border-rovelle-border bg-white shadow-2xl transition-all duration-300 transform ${
          isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Architectural Accent Bar */}
        <div className="h-1.5 w-full bg-rovelle-slate" />

        {/* Modal Inner Container */}
        <div className="p-6 sm:p-8">
          {/* Header Row: Brand Logo and Close Button */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-rovelle-border">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand/rovelle-habitat-logo-light.png"
                alt="Rovelle Habitat Brand Logo"
                className="h-10 sm:h-12 w-auto max-w-[190px] sm:max-w-[220px] object-contain"
              />
            </div>

            <button
              onClick={handleClose}
              type="button"
              className="rounded-xs p-1.5 text-rovelle-muted transition-colors hover:bg-rovelle-ivory hover:text-rovelle-charcoal focus:outline-none focus:ring-2 focus:ring-rovelle-slate shrink-0"
              aria-label="Close welcome modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Main Statement & Editorial Content */}
          <div className="mt-5">
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-xs border border-rovelle-slate/30 bg-rovelle-tint-blue px-2 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-rovelle-slate">
                <Compass className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span>Architectural Portfolio</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-rovelle-muted">
                Creator Profile
              </span>
            </div>

            <h2
              id="creator-modal-title"
              className="text-2xl font-bold tracking-tight text-rovelle-charcoal sm:text-3xl leading-snug"
            >
              This website is made by{' '}
              <span className="inline-block whitespace-nowrap rounded-xs bg-rovelle-tint-blue px-2.5 py-0.5 text-rovelle-slate font-extrabold border border-rovelle-slate/30 shadow-2xs">
                {siteConfig.brand.developerName}
              </span>
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-rovelle-muted">
              Welcome to Rovelle Habitat, a curated residential property showcase and architectural web experience presenting contemporary residences with spatial precision, natural illumination, and verified CAD floor plans.
            </p>
          </div>

          {/* Social Profiles & Developer Links */}
          <div className="mt-6 space-y-3">
            {/* GitHub Profile */}
            <a
              href={siteConfig.brand.developerGithub}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xs border border-rovelle-border bg-rovelle-ivory/60 p-3.5 transition-all duration-150 hover:border-rovelle-slate hover:bg-rovelle-tint-blue/80"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xs bg-rovelle-charcoal text-white transition-colors group-hover:bg-rovelle-slate">
                  <Github className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold uppercase tracking-wider text-rovelle-charcoal">
                    GitHub Profile
                  </div>
                  <div className="text-xs text-rovelle-muted">
                    github.com/Ankitcore
                  </div>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-rovelle-muted transition-colors group-hover:text-rovelle-slate" />
            </a>

            {/* LinkedIn Profile */}
            <a
              href={siteConfig.brand.developerLinkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xs border border-rovelle-border bg-rovelle-ivory/60 p-3.5 transition-all duration-150 hover:border-rovelle-slate hover:bg-rovelle-tint-blue/80"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xs bg-[#0A66C2] text-white transition-opacity group-hover:opacity-90">
                  <Linkedin className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold uppercase tracking-wider text-rovelle-charcoal">
                    LinkedIn Profile
                  </div>
                  <div className="text-xs text-rovelle-muted">
                    linkedin.com/in/ankitcore
                  </div>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-rovelle-muted transition-colors group-hover:text-rovelle-slate" />
            </a>

            {/* GitHub Repository Reference */}
            <a
              href={siteConfig.brand.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xs border border-dashed border-rovelle-border bg-white px-3.5 py-2.5 transition-all duration-150 hover:border-rovelle-slate hover:bg-rovelle-ivory/40"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-rovelle-charcoal">
                <Code2 className="h-3.5 w-3.5 text-rovelle-slate" />
                <span>Source Code Repository: Ankitcore/RovelleHabitat</span>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-rovelle-muted group-hover:text-rovelle-slate" />
            </a>
          </div>

          {/* Action Button & Contact Footer */}
          <div className="mt-6 pt-5 border-t border-rovelle-border">
            <button
              onClick={handleClose}
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xs bg-rovelle-charcoal px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-150 hover:bg-rovelle-slate focus:outline-none focus:ring-2 focus:ring-rovelle-slate focus:ring-offset-2"
            >
              <span>Explore Rovelle Habitat</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="mt-3 flex items-center justify-between text-[11px] text-rovelle-muted">
              <span>{siteConfig.contact.address.formatted}</span>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="hover:text-rovelle-slate transition-colors"
              >
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
