'use client'

import React, { useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export interface LightboxImage {
  url: string
  alt: string
  caption?: string
}

interface LightboxProps {
  images: LightboxImage[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (newIndex: number) => void
}

export function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          onNavigate(currentIndex - 1)
        } else {
          onNavigate(images.length - 1)
        }
      } else if (e.key === 'ArrowRight') {
        if (currentIndex < images.length - 1) {
          onNavigate(currentIndex + 1)
        } else {
          onNavigate(0)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex, images.length, onClose, onNavigate])

  if (!isOpen || images.length === 0) return null

  const currentImage = images[currentIndex] || images[0]

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-rovelle-charcoal/90 p-4 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Architectural image view"
    >
      {/* Top Bar Controls */}
      <div
        className="absolute top-4 right-4 z-50 flex items-center gap-4 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-xs font-mono tracking-widest text-rovelle-border">
          {currentIndex + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="rounded-sm bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate"
          aria-label="Close image lightbox"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Prev button */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-4 z-50 rounded-sm bg-white/10 p-3 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate"
          aria-label="Previous architectural image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {/* Main Image Container */}
      <div
        className="relative max-h-[85vh] max-w-[90vw] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImage.url}
            alt={currentImage.alt}
            className="max-h-[75vh] w-auto max-w-full rounded-xs object-contain shadow-2xl"
          />
          {currentImage.caption && (
            <p className="mt-3 text-center text-xs text-rovelle-border tracking-wide max-w-xl">
              {currentImage.caption}
            </p>
          )}
        </div>
      </div>

      {/* Next button */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-4 z-50 rounded-sm bg-white/10 p-3 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate"
          aria-label="Next architectural image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </div>
  )
}
