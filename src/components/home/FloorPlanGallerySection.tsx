'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { properties } from '@/data/properties'
import { Lightbox, LightboxImage } from '@/components/common/Lightbox'
import { Maximize2, FileText, ChevronRight, Check } from 'lucide-react'

export function FloorPlanGallerySection() {
  const property = properties[0] // Featured property: The Monolith Residence
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // Composite images: floor plan + interior photographs
  const galleryItems = [
    {
      id: 'fp-main',
      url: property.floorPlan.imageUrl,
      alt: property.floorPlan.alt,
      caption: 'Verified Architectural Floor Plan Drawing • 1:100 Scale',
      title: 'Architectural Floor Plan',
      tag: 'Vector Plan',
    },
    ...property.gallery
      .filter((g) => g.category !== 'plan')
      .map((g) => ({
        id: g.id,
        url: g.url,
        alt: g.alt,
        caption: g.caption,
        title: g.alt.split(' ').slice(0, 4).join(' '),
        tag: g.category.toUpperCase(),
      })),
  ]

  const activeImage = galleryItems[selectedImageIndex] || galleryItems[0]

  const lightboxImages: LightboxImage[] = galleryItems.map((item) => ({
    url: item.url,
    alt: item.alt,
    caption: item.caption,
  }))

  return (
    <section className="bg-rovelle-ivory/60 py-16 sm:py-24 border-b border-rovelle-border">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-rovelle-slate">
            Plans and Dimensions
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-rovelle-charcoal sm:text-3xl">
            Architectural layouts and spatial dimensions
          </h2>
          <p className="mt-3 text-sm text-rovelle-muted leading-relaxed">
            Floor plans are measured and verified against physical construction. Browse the composite drawing and interior room views of The Monolith Residence.
          </p>
        </div>

        {/* Asymmetrical Layout for Floor Plan and Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Presentation (7 columns) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative overflow-hidden rounded-xs border border-rovelle-border bg-white shadow-sm">
              {/* Main Image Container */}
              <div
                className="relative aspect-[16/11] w-full overflow-hidden bg-rovelle-charcoal/5 cursor-pointer group"
                onClick={() => setIsLightboxOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setIsLightboxOpen(true)
                  }
                }}
                aria-label={`Enlarge ${activeImage.title}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeImage.url}
                  alt={activeImage.alt}
                  className="h-full w-full object-contain p-2 sm:p-4 transition-transform duration-200 group-hover:scale-[1.01]"
                />

                {/* Enlarge Hint Button */}
                <div className="absolute top-4 right-4 rounded-xs bg-rovelle-charcoal/80 p-2 text-white shadow-sm backdrop-blur-xs transition-opacity group-hover:bg-rovelle-slate">
                  <Maximize2 className="h-4 w-4" />
                </div>

                {/* Caption Bar */}
                <div className="absolute bottom-0 inset-x-0 bg-rovelle-charcoal/85 px-4 py-2.5 text-white backdrop-blur-xs flex items-center justify-between text-xs">
                  <span className="font-medium truncate mr-2">{activeImage.caption}</span>
                  <span className="shrink-0 text-[10px] uppercase tracking-wider text-rovelle-border">
                    Click to Enlarge
                  </span>
                </div>
              </div>
            </div>

            {/* Thumbnail Navigation Row */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {galleryItems.map((item, index) => {
                const isActive = index === selectedImageIndex
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-[4/3] overflow-hidden rounded-xs border bg-white p-1 transition-all text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate ${
                      isActive
                        ? 'border-rovelle-slate ring-2 ring-rovelle-slate shadow-sm'
                        : 'border-rovelle-border opacity-70 hover:opacity-100 hover:border-rovelle-muted'
                    }`}
                    aria-label={`View ${item.title}`}
                    aria-pressed={isActive}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt={item.alt}
                      className="h-full w-full object-cover rounded-2xs"
                    />
                    <div className="absolute bottom-1 right-1 rounded-2xs bg-rovelle-charcoal/90 px-1 py-0.5 text-[8px] font-mono text-white">
                      {item.tag}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Specifications and Room Breakdown (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xs border border-rovelle-border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-rovelle-border pb-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-rovelle-slate">
                    Verified Dimensions
                  </span>
                  <h3 className="text-xl font-bold text-rovelle-charcoal">
                    {property.title}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-rovelle-muted block">Internal Area</span>
                  <span className="text-base font-bold text-rovelle-charcoal">
                    {property.areaSqFt.toLocaleString()} sq ft
                  </span>
                  <span className="text-[11px] text-rovelle-muted block">({property.areaSqM} m²)</span>
                </div>
              </div>

              {/* Technical Specifications Table */}
              <dl className="mt-4 divide-y divide-rovelle-border/60 text-xs">
                <div className="flex justify-between py-2.5">
                  <dt className="text-rovelle-muted">Bedrooms / Bathrooms</dt>
                  <dd className="font-semibold text-rovelle-charcoal">
                    {property.bedrooms} Beds / {property.bathrooms} Baths
                  </dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-rovelle-muted">Finished Ceiling Height</dt>
                  <dd className="font-semibold text-rovelle-charcoal">
                    {property.ceilingHeightFt} ft clear
                  </dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-rovelle-muted">Levels &amp; Vertical Access</dt>
                  <dd className="font-semibold text-rovelle-charcoal">
                    {property.floorPlan.totalFloors} Levels with architectural stair
                  </dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-rovelle-muted">Solar &amp; Light Axis</dt>
                  <dd className="font-semibold text-rovelle-charcoal text-right">
                    South-Southwest Exposure
                  </dd>
                </div>
              </dl>

              {/* Room Measurements Breakdown */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rovelle-charcoal mb-3">
                  Verified Room Measurements
                </h4>
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {property.floorPlan.rooms.map((room) => (
                    <div
                      key={room.name}
                      className="rounded-xs bg-rovelle-ivory/60 p-2.5 border border-rovelle-border/70 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-rovelle-charcoal">{room.name}</span>
                        <span className="font-mono text-rovelle-slate font-medium">
                          {room.dimensionsFt}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-rovelle-muted leading-tight">
                        {room.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3 pt-4 border-t border-rovelle-border">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedImageIndex(0)
                    setIsLightboxOpen(true)
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xs bg-rovelle-charcoal px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-rovelle-slate transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Open Full Plan</span>
                </button>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xs border border-rovelle-border bg-rovelle-tint-blue px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-rovelle-charcoal hover:bg-rovelle-tint-blue-hover transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate"
                >
                  <span>Request Floor Plan PDF</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-rovelle-muted">
              <Check className="h-4 w-4 text-rovelle-slate shrink-0" />
              <span>Scale drawings available in 1:50 and 1:100 CAD format upon client enquiry.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Accessible Fullscreen Lightbox */}
      <Lightbox
        images={lightboxImages}
        currentIndex={selectedImageIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={(newIndex) => setSelectedImageIndex(newIndex)}
      />
    </section>
  )
}
