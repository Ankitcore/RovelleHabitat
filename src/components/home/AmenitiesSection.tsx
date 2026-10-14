import React from 'react'
import Link from 'next/link'
import { masterAmenities } from '@/data/amenities'
import {
  Car,
  Trees,
  Sun,
  Waves,
  Dumbbell,
  Wifi,
  Wind,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react'

// Icon resolver for Lucide icons
const iconMap = {
  Car,
  Trees,
  Sun,
  Waves,
  Dumbbell,
  Wifi,
  Wind,
  ShieldCheck,
}

export function AmenitiesSection() {
  return (
    <section className="bg-white py-16 sm:py-24 border-b border-rovelle-border">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        {/* Section Header inspired by reference "What we are offering" */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-rovelle-slate">
              Residential Amenities
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-rovelle-charcoal sm:text-3xl">
              What we are offering
            </h2>
            <p className="mt-3 text-sm text-rovelle-muted leading-relaxed">
              Every residence in the Rovelle Habitat portfolio is selected for tangible physical qualities: dedicated parking, private landscaped gardens, acoustic isolation, and architectural wellness spaces.
            </p>
          </div>
          <Link
            href="/amenities"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rovelle-slate hover:text-rovelle-charcoal transition-colors group"
          >
            <span>Explore All Standards</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Amenity Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {masterAmenities.map((amenity) => {
            const Icon = iconMap[amenity.iconName] || ShieldCheck

            return (
              <div
                key={amenity.id}
                className="group relative rounded-xs border border-rovelle-border bg-rovelle-ivory/40 p-6 transition-colors duration-150 hover:border-rovelle-slate hover:bg-white focus-within:ring-2 focus-within:ring-rovelle-slate"
              >
                {/* Icon Box */}
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xs bg-rovelle-tint-blue text-rovelle-slate transition-colors group-hover:bg-rovelle-slate group-hover:text-white">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>

                {/* Content */}
                <h3 className="text-base font-bold text-rovelle-charcoal tracking-tight">
                  {amenity.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-rovelle-muted">
                  {amenity.shortDescription}
                </p>

                <div className="mt-4 pt-3 border-t border-rovelle-border/60 text-[11px] font-mono uppercase tracking-wider text-rovelle-slate">
                  {amenity.category}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
