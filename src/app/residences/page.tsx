import React from 'react'
import type { Metadata } from 'next'
import { ResidencesClient } from './ResidencesClient'

export const metadata: Metadata = {
  title: 'Curated Residences | Rovelle Habitat',
  description:
    'Explore our portfolio of contemporary residences, penthouses, and architectural pavilions with verified room dimensions and floor plans.',
}

export default function ResidencesPage() {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-rovelle-slate">
            Portfolio Showcase
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-rovelle-charcoal sm:text-4xl">
            Contemporary Residential Portfolio
          </h1>
          <p className="mt-3 text-sm text-rovelle-muted leading-relaxed">
            Every home in our collection is presented with exact structural dimensions, spatial floor plans, and verified amenity records. Filter by category, room count, or price tier.
          </p>
        </div>

        {/* Client Interactive Filter & List */}
        <ResidencesClient />
      </div>
    </div>
  )
}
