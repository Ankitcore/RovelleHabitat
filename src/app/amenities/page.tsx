import React from 'react'
import type { Metadata } from 'next'
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
  CheckCircle2,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Amenities & Architectural Standards | Rovelle Habitat',
  description:
    'Comprehensive overview of residential amenities, structural acoustics, climate systems, and private wellness provisions across Rovelle Habitat properties.',
}

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

export default function AmenitiesPage() {
  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-rovelle-slate">
            Residential Infrastructure
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-rovelle-charcoal sm:text-4xl lg:text-5xl leading-tight">
            Curated amenities and structural standards
          </h1>
          <p className="mt-4 text-base text-rovelle-muted leading-relaxed">
            Every facility represented across the Rovelle Habitat collection is backed by physical engineering specifications. We do not list speculative services or decorative conveniences.
          </p>
        </div>

        {/* Categories of Amenities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {masterAmenities.map((amenity) => {
            const Icon = iconMap[amenity.iconName] || ShieldCheck

            return (
              <div
                key={amenity.id}
                className="flex flex-col justify-between rounded-xs border border-rovelle-border bg-rovelle-ivory/30 p-8 hover:border-rovelle-slate transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xs bg-rovelle-slate text-white">
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </div>
                    <span className="rounded-2xs bg-rovelle-tint-blue px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-rovelle-charcoal">
                      {amenity.category}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-rovelle-charcoal tracking-tight">
                    {amenity.name}
                  </h2>
                  <p className="mt-3 text-sm text-rovelle-charcoal/90 font-medium">
                    {amenity.shortDescription}
                  </p>
                  <p className="mt-3 text-xs text-rovelle-muted leading-relaxed">
                    {amenity.detailedDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-rovelle-border/60 flex items-center gap-2 text-xs text-rovelle-slate">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Verified across applicable inventory</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Technical Standards Box */}
        <div className="rounded-xs border border-rovelle-border bg-rovelle-charcoal p-8 sm:p-12 text-white space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-rovelle-slate">
              Engineering Baseline
            </span>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Acoustic &amp; Environmental Performance
            </h2>
            <p className="mt-3 text-sm text-rovelle-ivory/80 leading-relaxed">
              Beyond visible luxury, true residential quality is determined by structural mass and acoustic isolation. Our properties incorporate double-wall partition framing, isolated acoustic subfloors, and triple-laminated glazing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10 text-xs">
            <div>
              <span className="block font-bold text-white text-sm mb-1">STC 55+ Acoustic Dampening</span>
              <p className="text-rovelle-ivory/70 leading-relaxed">
                Inter-unit and exterior wall assemblies engineered to eliminate urban noise intrusion.
              </p>
            </div>
            <div>
              <span className="block font-bold text-white text-sm mb-1">MERV 13 &amp; HEPA Filtration</span>
              <p className="text-rovelle-ivory/70 leading-relaxed">
                Continuous fresh air intake with heat recovery ventilation and particulate capture.
              </p>
            </div>
            <div>
              <span className="block font-bold text-white text-sm mb-1">Low-E Solar Optimization</span>
              <p className="text-rovelle-ivory/70 leading-relaxed">
                Thermal barrier window envelopes designed to admit natural light while curbing solar heat gain.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-rovelle-border pt-10">
          <div>
            <h3 className="text-lg font-bold text-rovelle-charcoal">
              View residences featuring these amenities
            </h3>
            <p className="text-xs text-rovelle-muted">
              Filter by specific facilities and room configurations.
            </p>
          </div>
          <Link
            href="/residences"
            className="inline-flex items-center gap-1.5 rounded-xs bg-rovelle-charcoal px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-rovelle-slate transition-colors"
          >
            <span>Explore Residences</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
