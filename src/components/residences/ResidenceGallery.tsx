'use client'

import React, { useState } from 'react'
import { PropertyImage } from '@/types/property'
import { Lightbox, LightboxImage } from '@/components/common/Lightbox'
import { Maximize2 } from 'lucide-react'

interface ResidenceGalleryProps {
  images: PropertyImage[]
  title: string
}

export function ResidenceGallery({ images, title }: ResidenceGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const filteredImages =
    activeCategory === 'all'
      ? images
      : images.filter((img) => img.category === activeCategory)

  const activeImage = filteredImages[selectedIndex] || filteredImages[0] || images[0]

  const lightboxImages: LightboxImage[] = filteredImages.map((img) => ({
    url: img.url,
    alt: img.alt,
    caption: img.caption,
  }))

  return (
    <div className="space-y-4">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {['all', 'exterior', 'interior', 'plan'].map((cat) => {
          const isSelected = activeCategory === cat
          const label = cat === 'all' ? 'All Visuals' : cat.charAt(0).toUpperCase() + cat.slice(1)
          return (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveCategory(cat)
                setSelectedIndex(0)
              }}
              className={`rounded-xs px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate ${
                isSelected
                  ? 'bg-rovelle-charcoal text-white'
                  : 'bg-rovelle-tint-blue text-rovelle-charcoal hover:bg-rovelle-tint-blue-hover'
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Main Image Display */}
      <div className="relative overflow-hidden rounded-xs border border-rovelle-border bg-white shadow-sm">
        <div
          className="relative aspect-[16/10] w-full overflow-hidden bg-rovelle-charcoal/5 cursor-pointer group"
          onClick={() => setIsLightboxOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setIsLightboxOpen(true)
            }
          }}
          aria-label={`View enlarged image: ${activeImage.alt}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeImage.url}
            alt={activeImage.alt}
            className="h-full w-full object-contain p-2 transition-transform duration-200 group-hover:scale-[1.01]"
          />

          <div className="absolute top-4 right-4 rounded-xs bg-rovelle-charcoal/80 p-2 text-white shadow-sm backdrop-blur-xs transition-opacity group-hover:bg-rovelle-slate">
            <Maximize2 className="h-4 w-4" />
          </div>

          <div className="absolute bottom-0 inset-x-0 bg-rovelle-charcoal/85 px-4 py-2.5 text-white backdrop-blur-xs flex items-center justify-between text-xs">
            <span className="font-medium truncate mr-2">{activeImage.caption}</span>
            <span className="shrink-0 text-[10px] uppercase tracking-wider text-rovelle-border">
              Click to Enlarge
            </span>
          </div>
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
        {filteredImages.map((img, idx) => {
          const isSelected = idx === selectedIndex
          return (
            <button
              key={img.id}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative aspect-[4/3] overflow-hidden rounded-xs border bg-white p-1 transition-all text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate ${
                isSelected
                  ? 'border-rovelle-slate ring-2 ring-rovelle-slate shadow-sm'
                  : 'border-rovelle-border opacity-70 hover:opacity-100 hover:border-rovelle-muted'
              }`}
              aria-label={`Show ${img.caption}`}
              aria-pressed={isSelected}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.alt}
                className="h-full w-full object-cover rounded-2xs"
              />
            </button>
          )
        })}
      </div>

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        currentIndex={selectedIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={(newIdx) => setSelectedIndex(newIdx)}
      />
    </div>
  )
}
