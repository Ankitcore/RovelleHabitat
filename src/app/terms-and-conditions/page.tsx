import React from 'react'
import type { Metadata } from 'next'
import { siteConfig } from '@/data/siteConfig'

export const metadata: Metadata = {
  title: 'Terms and Conditions | Rovelle Habitat',
  description:
    'Website terms and conditions governing permitted use, property information accuracy, floor plan documentation, and intellectual property.',
}

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="border-b border-rovelle-border pb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-rovelle-slate">
            Terms of Service
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-rovelle-charcoal sm:text-4xl">
            Terms and Conditions
          </h1>
          <p className="mt-2 text-xs text-rovelle-muted">
            Last Updated: October 2026 • Prepared for Owner &amp; Legal Review Prior to Production
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-sm max-w-none text-rovelle-charcoal space-y-6 text-xs sm:text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-rovelle-charcoal uppercase tracking-wider">
              1. Permitted Use of This Website
            </h2>
            <p className="text-rovelle-muted">
              By accessing and browsing the Rovelle Habitat website, you agree to comply with these Terms and Conditions. This platform is provided solely for personal exploration of residential architecture, reviewing property portfolios, and submitting bona fide purchaser or architectural inquiries.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-rovelle-charcoal uppercase tracking-wider">
              2. Accuracy of Property Information &amp; Architectural Plans
            </h2>
            <p className="text-rovelle-muted">
              While Rovelle Habitat makes every effort to verify dimensions, floor plan drawings, and amenity specifications against physical construction data, all plans, measurements, and renderings are provided for informational and identification guidance only:
            </p>
            <ul className="list-disc pl-5 text-rovelle-muted space-y-1">
              <li>Dimensions and room square footages are measured from internal finished wall faces and are subject to nominal construction tolerances.</li>
              <li>Floor plans and CAD vector drawings represent architectural layout concepts and do not constitute a legal survey, title deed guarantee, or engineering structural certificate.</li>
              <li>Property availability, status, and offering prices may change without prior notice prior to formal contractual execution.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-rovelle-charcoal uppercase tracking-wider">
              3. Demonstration Content Notice
            </h2>
            <p className="text-rovelle-muted">
              During current development, client review, and platform staging, select residential entries may represent demonstration portfolios. Prospective buyers and interested parties should verify current active inventory and legal title deeds directly with the designated advisory lead prior to executing binding purchase contracts.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-rovelle-charcoal uppercase tracking-wider">
              4. Intellectual Property &amp; Development Credits
            </h2>
            <p className="text-rovelle-muted">
              All architectural layout drawings, visual layouts, text copy, graphic designs, code, and digital styling on this website are protected under copyright and intellectual property laws:
            </p>
            <ul className="list-disc pl-5 text-rovelle-muted space-y-1">
              <li>© Rovelle Habitat. All rights reserved.</li>
              <li>Website design and full-stack software development credit is held by Ankit Kumar.</li>
              <li>Unauthorized copying, scraping, reproduction, or commercial re-distribution of website assets, vector drawings, or code is strictly prohibited without prior written consent.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-rovelle-charcoal uppercase tracking-wider">
              5. Limitation of Liability
            </h2>
            <p className="text-rovelle-muted">
              To the fullest extent permitted by applicable law, Rovelle Habitat and its creators disclaim all warranties, express or implied, regarding website uptime, unbroken availability, or third-party network interruptions. In no event shall Rovelle Habitat be liable for indirect, incidental, or consequential damages resulting from website access or reliance on digital property presentations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-rovelle-charcoal uppercase tracking-wider">
              6. Governing Law &amp; Legal Inquiries
            </h2>
            <p className="text-rovelle-muted">
              These terms are governed by the applicable laws of the jurisdiction in which Rovelle Habitat conducts primary property advisory operations. If you have questions concerning these terms or wish to discuss licensing, please direct inquiries to:
            </p>
            <div className="rounded-xs border border-rovelle-border bg-rovelle-ivory/50 p-4 text-xs space-y-1">
              <p className="font-semibold text-rovelle-charcoal">Rovelle Habitat Legal &amp; Development Inquiries</p>
              <p className="text-rovelle-muted">Lead Developer &amp; Designer: Ankit Kumar</p>
              <p className="text-rovelle-muted">
                Email:{' '}
                <a href={`mailto:${siteConfig.contact.email}`} className="text-rovelle-slate underline font-medium">
                  {siteConfig.contact.email}
                </a>
              </p>
              <p className="text-rovelle-muted">Office: {siteConfig.contact.address.formatted}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
