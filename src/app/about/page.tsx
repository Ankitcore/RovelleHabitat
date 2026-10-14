import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Compass, Ruler, ShieldCheck, Eye } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About | Rovelle Habitat',
  description:
    'Learn about the Rovelle Habitat architectural philosophy, residential curation principles, and our commitment to truthful spatial representation.',
}

export default function AboutPage() {
  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-rovelle-slate">
            Our Architectural Ethos
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-rovelle-charcoal sm:text-4xl lg:text-5xl leading-tight">
            Curating residences with spatial discipline and honesty.
          </h1>
          <p className="mt-6 text-base text-rovelle-muted leading-relaxed">
            Rovelle Habitat exists to present residential architecture through clarity, proportion, and verified physical metrics. We believe that choosing a home begins with understanding its volume, its orientation to light, and its material integrity.
          </p>
        </div>

        {/* Hero Asymmetrical Photographic Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 overflow-hidden rounded-xs border border-rovelle-border bg-rovelle-ivory">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
              alt="Architectural facade displaying concrete structural clarity and glass pocket doors"
              className="h-full w-full object-cover aspect-[16/10]"
            />
          </div>
          <div className="lg:col-span-5 rounded-xs border border-rovelle-border bg-rovelle-ivory/60 p-8 sm:p-10 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-rovelle-slate">
              Design &amp; Development Direction
            </span>
            <h2 className="text-2xl font-bold text-rovelle-charcoal">
              Truth in Architectural Representation
            </h2>
            <p className="text-sm text-rovelle-muted leading-relaxed">
              Traditional real estate web experiences often rely on distorted wide-angle lenses, exaggerated descriptions, and opaque floor plans. Rovelle Habitat adopts an editorial standard: unvarnished photography, 1:100 scale architectural CAD drawings, and verified square footages.
            </p>
            <div className="pt-4 border-t border-rovelle-border text-xs text-rovelle-charcoal font-medium">
              Concept and architectural digital experience engineered by Ankit Kumar.
            </div>
          </div>
        </div>

        {/* Core Principles Grid */}
        <div className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-rovelle-slate">
              Foundational Standards
            </span>
            <h2 className="mt-2 text-2xl font-bold text-rovelle-charcoal sm:text-3xl">
              Principles of Our Residential Showcase
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-xs border border-rovelle-border bg-white p-6 shadow-xs">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xs bg-rovelle-tint-blue text-rovelle-slate">
                <Ruler className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-rovelle-charcoal">Dimensional Honesty</h3>
              <p className="mt-2 text-xs text-rovelle-muted leading-relaxed">
                Every listed room measurement is verified against construction plans. We document gross internal areas, ceiling clearances, and window openings without fabrication.
              </p>
            </div>

            <div className="rounded-xs border border-rovelle-border bg-white p-6 shadow-xs">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xs bg-rovelle-tint-blue text-rovelle-slate">
                <Compass className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-rovelle-charcoal">Solar &amp; Light Analysis</h3>
              <p className="mt-2 text-xs text-rovelle-muted leading-relaxed">
                Understanding natural light is essential. We detail building orientation, primary light axes, and thermal overhangs so purchasers understand seasonal sunlight patterns.
              </p>
            </div>

            <div className="rounded-xs border border-rovelle-border bg-white p-6 shadow-xs">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xs bg-rovelle-tint-blue text-rovelle-slate">
                <Eye className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-rovelle-charcoal">Material Authenticity</h3>
              <p className="mt-2 text-xs text-rovelle-muted leading-relaxed">
                We celebrate genuine materials: board-formed concrete, European oak, honed limestone, and acoustic architectural glass that age with dignity.
              </p>
            </div>

            <div className="rounded-xs border border-rovelle-border bg-white p-6 shadow-xs">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xs bg-rovelle-tint-blue text-rovelle-slate">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-rovelle-charcoal">Direct Advisory</h3>
              <p className="mt-2 text-xs text-rovelle-muted leading-relaxed">
                Rather than generic call centers, inquiries connect directly with our advisory team to discuss structural specifications, zoning permissions, and viewing schedules.
              </p>
            </div>
          </div>
        </div>

        {/* Development Disclosure Box */}
        <div className="rounded-xs border border-rovelle-border bg-rovelle-ivory/60 p-8 text-xs text-rovelle-charcoal leading-relaxed max-w-3xl">
          <h3 className="font-bold uppercase tracking-wider text-rovelle-slate mb-2">
            Portfolio Curation &amp; Development Note
          </h3>
          <p>
            Rovelle Habitat is developed by Ankit Kumar as a dedicated platform for architectural residential presentation. During current development and client onboarding, sample properties are marked as demonstration inventory. Verified owner assets replace demonstration models upon live property commission.
          </p>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-rovelle-border pt-10">
          <div>
            <h3 className="text-lg font-bold text-rovelle-charcoal">
              Explore our current residential portfolio
            </h3>
            <p className="text-xs text-rovelle-muted">
              Inspect floor plans, dimensions, and architectural photography.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/residences"
              className="inline-flex items-center gap-1.5 rounded-xs bg-rovelle-charcoal px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-rovelle-slate transition-colors"
            >
              <span>Browse Residences</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xs border border-rovelle-border bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wider text-rovelle-charcoal hover:bg-rovelle-tint-blue transition-colors"
            >
              Contact Advisory
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
