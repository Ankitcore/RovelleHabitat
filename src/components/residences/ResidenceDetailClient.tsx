'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Property } from '@/types/property'
import { masterAmenities } from '@/data/amenities'
import { siteConfig } from '@/data/siteConfig'
import { ResidenceGallery } from '@/components/residences/ResidenceGallery'
import { PropertyEnquiryModal } from '@/components/residences/PropertyEnquiryModal'
import { ResidenceCard } from '@/components/residences/ResidenceCard'
import { Lightbox, LightboxImage } from '@/components/common/Lightbox'
import { formatCurrency } from '@/lib/utils'
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Calendar,
  Compass,
  ArrowRight,
  FileText,
  ShieldCheck,
  Check,
  Car,
  Trees,
  Sun,
  Waves,
  Dumbbell,
  Wifi,
  Wind,
} from 'lucide-react'

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

interface ResidenceDetailClientProps {
  property: Property
  relatedProperties: Property[]
}

export function ResidenceDetailClient({
  property,
  relatedProperties,
}: ResidenceDetailClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPlanLightboxOpen, setIsPlanLightboxOpen] = useState(false)

  // Filter amenities applicable to this property
  const propertyAmenities = masterAmenities.filter((amenity) =>
    property.verifiedAmenityIds.includes(amenity.id)
  )

  const planLightboxImages: LightboxImage[] = [
    {
      url: property.floorPlan.imageUrl,
      alt: property.floorPlan.alt,
      caption: `${property.title} • Architectural Floor Plan drawing • ${property.floorPlan.grossInternalAreaSqFt.toLocaleString()} sq ft`,
    },
  ]

  return (
    <div className="bg-white py-10 sm:py-16">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-rovelle-muted">
          <Link href="/" className="hover:text-rovelle-charcoal transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/residences" className="hover:text-rovelle-charcoal transition-colors">
            Residences
          </Link>
          <span>/</span>
          <span className="text-rovelle-charcoal font-semibold">{property.title}</span>
        </nav>

        {/* Title and Offering Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 border-b border-rovelle-border pb-8">
          <div className="max-w-3xl space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-2xs bg-rovelle-charcoal px-2.5 py-0.5 font-bold uppercase tracking-wider text-white">
                {property.propertyType}
              </span>
              <span className="flex items-center gap-1 text-rovelle-muted">
                <MapPin className="h-3.5 w-3.5 text-rovelle-slate" />
                {property.address}, {property.city}, {property.region} {property.postalCode}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-rovelle-charcoal sm:text-4xl lg:text-5xl">
              {property.title}
            </h1>
            <p className="text-sm sm:text-base text-rovelle-muted leading-relaxed">
              {property.subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:text-right shrink-0">
            <div>
              <span className="block text-[11px] font-mono uppercase text-rovelle-muted">
                Offering Price
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-rovelle-charcoal">
                {formatCurrency(property.price)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xs bg-rovelle-charcoal px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-rovelle-slate transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate"
            >
              <Calendar className="h-4 w-4" />
              <span>Schedule Private Viewing</span>
            </button>
          </div>
        </div>

        {/* Visual Gallery */}
        <section aria-label="Property Visual Gallery">
          <ResidenceGallery images={property.gallery} title={property.title} />
        </section>

        {/* Architectural Overview & Specifications Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Ethos & Room Descriptions (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-rovelle-slate mb-3">
                Architectural Ethos
              </h2>
              <p className="text-base text-rovelle-charcoal leading-relaxed">
                {property.summary}
              </p>
              <p className="mt-4 text-sm text-rovelle-muted leading-relaxed">
                {property.architecturalEthos}
              </p>
            </div>

            {/* Verified Amenities */}
            <div className="border-t border-rovelle-border pt-8">
              <h2 className="text-xs font-bold uppercase tracking-widest text-rovelle-slate mb-4">
                Verified Amenities &amp; Inclusions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {propertyAmenities.map((amenity) => {
                  const Icon = iconMap[amenity.iconName] || Check
                  return (
                    <div
                      key={amenity.id}
                      className="flex items-start gap-3 rounded-xs border border-rovelle-border/80 bg-rovelle-ivory/40 p-3.5"
                    >
                      <div className="rounded-2xs bg-rovelle-tint-blue p-2 text-rovelle-slate shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-rovelle-charcoal">
                          {amenity.name}
                        </h3>
                        <p className="mt-0.5 text-[11px] text-rovelle-muted leading-normal">
                          {amenity.shortDescription}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Room Breakdown */}
            <div className="border-t border-rovelle-border pt-8">
              <h2 className="text-xs font-bold uppercase tracking-widest text-rovelle-slate mb-4">
                Room Layout &amp; Measured Proportions
              </h2>
              <div className="space-y-3">
                {property.floorPlan.rooms.map((room) => (
                  <div
                    key={room.name}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xs border border-rovelle-border p-4 hover:border-rovelle-slate/60 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-rovelle-charcoal">{room.name}</h3>
                        <span className="text-[10px] uppercase font-mono bg-rovelle-tint-blue px-2 py-0.5 rounded-2xs text-rovelle-charcoal">
                          {room.level}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-rovelle-muted">{room.description}</p>
                    </div>
                    <div className="sm:text-right shrink-0">
                      <span className="font-mono text-xs font-bold text-rovelle-slate block">
                        {room.dimensionsFt}
                      </span>
                      <span className="text-[10px] text-rovelle-muted">({room.dimensionsM})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Key Spec Sheet & Floor Plan CTA (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xs border border-rovelle-border bg-rovelle-ivory/50 p-6 shadow-xs">
              <h2 className="text-xs font-bold uppercase tracking-widest text-rovelle-charcoal mb-4 border-b border-rovelle-border pb-3">
                Verified Property Metrics
              </h2>
              <dl className="divide-y divide-rovelle-border/60 text-xs">
                <div className="flex justify-between py-2.5">
                  <dt className="text-rovelle-muted flex items-center gap-1.5">
                    <Maximize className="h-3.5 w-3.5 text-rovelle-slate" />
                    Gross Internal Area
                  </dt>
                  <dd className="font-semibold text-rovelle-charcoal">
                    {property.areaSqFt.toLocaleString()} sq ft ({property.areaSqM} m²)
                  </dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-rovelle-muted flex items-center gap-1.5">
                    <Bed className="h-3.5 w-3.5 text-rovelle-slate" />
                    Bedrooms
                  </dt>
                  <dd className="font-semibold text-rovelle-charcoal">{property.bedrooms} En-suites</dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-rovelle-muted flex items-center gap-1.5">
                    <Bath className="h-3.5 w-3.5 text-rovelle-slate" />
                    Bathrooms
                  </dt>
                  <dd className="font-semibold text-rovelle-charcoal">{property.bathrooms}</dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-rovelle-muted flex items-center gap-1.5">
                    <Compass className="h-3.5 w-3.5 text-rovelle-slate" />
                    Finished Ceiling Height
                  </dt>
                  <dd className="font-semibold text-rovelle-charcoal">{property.ceilingHeightFt} ft</dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-rovelle-muted">Solar Exposure Axis</dt>
                  <dd className="font-semibold text-rovelle-charcoal text-right max-w-[200px]">
                    {property.orientation}
                  </dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-rovelle-muted">Year Completed</dt>
                  <dd className="font-semibold text-rovelle-charcoal">{property.yearCompleted}</dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-rovelle-muted">Property Status</dt>
                  <dd className="font-semibold text-rovelle-charcoal">{property.status}</dd>
                </div>
              </dl>

              {/* Floor Plan Preview Card */}
              <div className="mt-6 rounded-xs border border-rovelle-border bg-white p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-rovelle-charcoal">Architectural Drawing</span>
                  <span className="text-[10px] font-mono text-rovelle-slate uppercase">1:100 Scale</span>
                </div>
                <div
                  className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-xs border border-rovelle-border/60 bg-rovelle-charcoal/5 group"
                  onClick={() => setIsPlanLightboxOpen(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setIsPlanLightboxOpen(true)
                    }
                  }}
                  aria-label="Enlarge architectural drawing"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={property.floorPlan.imageUrl}
                    alt={property.floorPlan.alt}
                    className="h-full w-full object-contain p-2 transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-rovelle-charcoal/10 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                    <span className="rounded-xs bg-rovelle-charcoal/90 px-3 py-1.5 text-[11px] font-semibold text-white">
                      Click to Expand Plan
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPlanLightboxOpen(true)}
                    className="flex-1 rounded-xs bg-rovelle-charcoal py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white hover:bg-rovelle-slate transition-colors"
                  >
                    View Drawing
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="flex-1 rounded-xs border border-rovelle-border bg-white py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-rovelle-charcoal hover:bg-rovelle-tint-blue transition-colors"
                  >
                    Request CAD Pack
                  </button>
                </div>
              </div>
            </div>

            {/* Direct Consultation Box */}
            <div className="rounded-xs border border-rovelle-border bg-white p-6 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rovelle-charcoal mb-2">
                Private Consultation
              </h3>
              <p className="text-xs text-rovelle-muted leading-relaxed">
                Contact our advisory office to receive structural calculations, local planning permissions, or coordinate a discreet accompanied site walk.
              </p>
              <div className="mt-4 pt-4 border-t border-rovelle-border space-y-2 text-xs">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="block font-semibold text-rovelle-charcoal hover:text-rovelle-slate transition-colors underline"
                >
                  {siteConfig.contact.email}
                </a>
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="block text-rovelle-muted hover:text-rovelle-charcoal transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <div className="border-t border-rovelle-border pt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-rovelle-slate">
                  Portfolio Context
                </span>
                <h2 className="text-2xl font-bold text-rovelle-charcoal mt-1">
                  Related Residences
                </h2>
              </div>
              <Link
                href="/residences"
                className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-rovelle-slate hover:text-rovelle-charcoal transition-colors"
              >
                <span>View Full Portfolio</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProperties.map((relProp) => (
                <ResidenceCard key={relProp.id} property={relProp} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal for Property Enquiry */}
      <PropertyEnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        propertySlug={property.slug}
        propertyName={property.title}
      />

      {/* Lightbox for Floor Plan */}
      <Lightbox
        images={planLightboxImages}
        currentIndex={0}
        isOpen={isPlanLightboxOpen}
        onClose={() => setIsPlanLightboxOpen(false)}
        onNavigate={() => {}}
      />
    </div>
  )
}
