import React from 'react'
import type { Metadata } from 'next'
import { EnquiryForm } from '@/components/common/EnquiryForm'
import { siteConfig } from '@/data/siteConfig'
import { Mail, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Advisory | Rovelle Habitat',
  description:
    'Enquire about contemporary residential properties, schedule private viewings, or request full architectural drawing packs.',
}

export default function ContactPage() {
  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-rovelle-slate">
            Direct Consultation
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-rovelle-charcoal sm:text-4xl lg:text-5xl leading-tight">
            Initiate a property enquiry or private viewing
          </h1>
          <p className="mt-4 text-base text-rovelle-muted leading-relaxed">
            Our advisory team handles private purchaser inquiries directly. Please indicate the residence of interest, your scheduling preferences, or request technical CAD packages below.
          </p>
        </div>

        {/* Split Grid: Form (7 cols) and Contact Info (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Column */}
          <div className="lg:col-span-7 rounded-xs border border-rovelle-border bg-white p-6 sm:p-10 shadow-xs">
            <h2 className="text-lg font-bold text-rovelle-charcoal mb-1">
              Residential Enquiry Form
            </h2>
            <p className="text-xs text-rovelle-muted mb-6">
              Complete the fields below to transmit your request to the architectural advisory desk.
            </p>
            <EnquiryForm defaultType="viewing" />
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xs border border-rovelle-border bg-rovelle-ivory/60 p-6 sm:p-8 space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-rovelle-slate border-b border-rovelle-border pb-3">
                Advisory Office &amp; Verification
              </h2>

              <div className="space-y-4 text-sm">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="rounded-2xs bg-rovelle-slate/10 p-2 text-rovelle-slate shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-rovelle-charcoal uppercase tracking-wider">
                      Advisory Inbox
                    </span>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="font-medium text-rovelle-slate hover:text-rovelle-charcoal transition-colors underline"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="rounded-2xs bg-rovelle-slate/10 p-2 text-rovelle-slate shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-rovelle-charcoal uppercase tracking-wider">
                      Telephone
                    </span>
                    <a
                      href={`tel:${siteConfig.contact.phoneRaw}`}
                      className="font-medium text-rovelle-charcoal hover:text-rovelle-slate transition-colors"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="rounded-2xs bg-rovelle-slate/10 p-2 text-rovelle-slate shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-rovelle-charcoal uppercase tracking-wider">
                      Advisory Office
                    </span>
                    <p className="text-xs text-rovelle-muted leading-relaxed">
                      {siteConfig.contact.address.street}
                      <br />
                      {siteConfig.contact.address.city}, {siteConfig.contact.address.region} {siteConfig.contact.address.postalCode}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <div className="rounded-2xs bg-rovelle-slate/10 p-2 text-rovelle-slate shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-rovelle-charcoal uppercase tracking-wider">
                      Advisory Hours
                    </span>
                    <p className="text-xs text-rovelle-muted leading-relaxed">
                      {siteConfig.contact.businessHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Architect Credit Box */}
            <div className="rounded-xs border border-rovelle-border bg-white p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rovelle-slate">
                <ShieldCheck className="h-4 w-4" />
                <span>Executive Lead</span>
              </div>
              <p className="text-xs text-rovelle-charcoal leading-relaxed">
                Direct all architectural, design, or technical inquiries directly to <strong>{siteConfig.brand.developerName}</strong> at{' '}
                <a
                  href={`mailto:${siteConfig.brand.developerEmail}`}
                  className="font-medium underline hover:text-rovelle-slate"
                >
                  {siteConfig.brand.developerEmail}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
