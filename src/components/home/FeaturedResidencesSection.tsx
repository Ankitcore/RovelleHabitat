import React from 'react'
import Link from 'next/link'
import { properties } from '@/data/properties'
import { ResidenceCard } from '@/components/residences/ResidenceCard'
import { ArrowRight } from 'lucide-react'

export function FeaturedResidencesSection() {
  const featured = properties.slice(0, 3)

  return (
    <section className="bg-white py-16 sm:py-24 border-b border-rovelle-border">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-rovelle-slate">
              Curated Portfolio
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-rovelle-charcoal sm:text-3xl">
              Featured contemporary residences
            </h2>
            <p className="mt-3 text-sm text-rovelle-muted leading-relaxed">
              Explore our current residential offerings. Each home is characterized by generous volumetric proportions, authentic material palettes, and direct architectural advisory.
            </p>
          </div>
          <Link
            href="/residences"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rovelle-slate hover:text-rovelle-charcoal transition-colors group"
          >
            <span>View All Residences ({properties.length})</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((property) => (
            <ResidenceCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  )
}
