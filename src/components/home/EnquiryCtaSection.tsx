import React from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, FileText, PhoneCall } from 'lucide-react'
import { siteConfig } from '@/data/siteConfig'

export function EnquiryCtaSection() {
  return (
    <section className="bg-rovelle-charcoal text-white py-16 sm:py-20">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div className="rounded-xs border border-white/10 bg-rovelle-charcoal-light/40 p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-rovelle-slate">
                Private Advisory &amp; Viewings
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Coordinate a private viewing or request architectural plans
              </h2>
              <p className="text-sm sm:text-base text-rovelle-ivory/80 leading-relaxed max-w-2xl">
                We coordinate private one-on-one appointments for qualified purchasers. Detailed dimension packages, structural engineering drawings, and zoning documentation are available on request.
              </p>

              {/* Advisory pillars */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-rovelle-ivory/80">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-rovelle-slate shrink-0" />
                  <span>Flexible viewing windows</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-rovelle-slate shrink-0" />
                  <span>Complete drawing packs</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 text-rovelle-slate shrink-0" />
                  <span>Direct architectural advice</span>
                </div>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xs bg-rovelle-slate px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-150 hover:bg-rovelle-slate-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Initiate Property Enquiry</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex items-center justify-center rounded-xs border border-white/20 bg-transparent px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-150 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Direct Email: {siteConfig.contact.email}
              </a>
              <span className="text-center text-[11px] text-rovelle-ivory/60">
                Inquiries are addressed directly by Ankit Kumar and the team.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
