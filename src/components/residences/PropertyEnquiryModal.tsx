'use client'

import React, { useEffect } from 'react'
import { EnquiryForm } from '@/components/common/EnquiryForm'
import { X } from 'lucide-react'

interface PropertyEnquiryModalProps {
  isOpen: boolean
  onClose: () => void
  propertySlug: string
  propertyName: string
}

export function PropertyEnquiryModal({
  isOpen,
  onClose,
  propertySlug,
  propertyName,
}: PropertyEnquiryModalProps) {
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
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-rovelle-charcoal/80 p-4 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative my-8 w-full max-w-xl rounded-xs border border-rovelle-border bg-white p-6 sm:p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-rovelle-border pb-4 mb-6">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-rovelle-slate">
              Direct Advisory
            </span>
            <h2 id="modal-title" className="text-xl font-bold text-rovelle-charcoal">
              Enquire: {propertyName}
            </h2>
            <p className="mt-1 text-xs text-rovelle-muted">
              Submit your private viewing or drawing request directly to our team.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xs p-1.5 text-rovelle-muted hover:bg-rovelle-tint-blue hover:text-rovelle-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate"
            aria-label="Close modal dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Enquiry Form */}
        <EnquiryForm
          propertySlug={propertySlug}
          propertyName={propertyName}
          defaultType="viewing"
          onSuccess={() => {
            // Optional delay before close
          }}
        />
      </div>
    </div>
  )
}
