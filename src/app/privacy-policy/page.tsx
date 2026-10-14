import React from 'react'
import type { Metadata } from 'next'
import { siteConfig } from '@/data/siteConfig'

export const metadata: Metadata = {
  title: 'Privacy Policy | Rovelle Habitat',
  description:
    'Rovelle Habitat privacy policy detailing collection of enquiry information, data security, retention practices, and user privacy rights.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="border-b border-rovelle-border pb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-rovelle-slate">
            Legal &amp; Data Governance
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-rovelle-charcoal sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-rovelle-muted">
            Last Updated: October 2026 • Prepared for Owner Review Prior to Production
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-sm max-w-none text-rovelle-charcoal space-y-6 text-xs sm:text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-rovelle-charcoal uppercase tracking-wider">
              1. Overview and Scope
            </h2>
            <p className="text-rovelle-muted">
              Rovelle Habitat operates this website to showcase contemporary residential properties and facilitate direct advisory inquiries. This Privacy Policy outlines our transparent practices regarding the collection, processing, and safeguarding of personal details submitted through our contact and property enquiry forms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-rovelle-charcoal uppercase tracking-wider">
              2. Information We Collect
            </h2>
            <p className="text-rovelle-muted">
              We collect information only when explicitly supplied by you through our interactive enquiry forms or direct email correspondence:
            </p>
            <ul className="list-disc pl-5 text-rovelle-muted space-y-1">
              <li>Full name and contact identifier.</li>
              <li>Email address for advisory correspondence.</li>
              <li>Telephone number, where provided voluntarily for scheduling private viewings.</li>
              <li>Specific residences or floor plans of interest.</li>
              <li>Preferred viewing windows and custom architectural queries.</li>
              <li>Technical metadata including client IP addresses and submission timestamps utilized solely for rate-limiting and preventing automated form abuse.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-rovelle-charcoal uppercase tracking-wider">
              3. Purpose of Processing
            </h2>
            <p className="text-rovelle-muted">
              Personal information submitted to Rovelle Habitat is processed strictly for the following purposes:
            </p>
            <ul className="list-disc pl-5 text-rovelle-muted space-y-1">
              <li>Coordinating private property viewings and site inspections.</li>
              <li>Transmitting requested CAD drawing packages, dimension sheets, and specification documents.</li>
              <li>Responding directly to purchaser and architect questions.</li>
              <li>Maintaining operational security against bot spam, malicious automated inputs, and denial-of-service attempts.</li>
            </ul>
            <p className="text-rovelle-muted">
              We do not sell, rent, monetize, or publicly distribute submitted contact details to third-party marketing brokers or advertisers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-rovelle-charcoal uppercase tracking-wider">
              4. Service Providers &amp; Technical Infrastructure
            </h2>
            <p className="text-rovelle-muted">
              Our website may utilize trusted infrastructure providers to deliver reliable and secure services:
            </p>
            <ul className="list-disc pl-5 text-rovelle-muted space-y-1">
              <li>Cloud hosting and Content Delivery Networks (such as Vercel) for server execution and edge asset delivery.</li>
              <li>Configured email routing services to transmit form notifications directly to the Rovelle Habitat advisory desk ({siteConfig.contact.email}).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-rovelle-charcoal uppercase tracking-wider">
              5. Cookies and Web Analytics
            </h2>
            <p className="text-rovelle-muted">
              Rovelle Habitat does not deploy invasive cross-site marketing trackers, behavioral profiling pixels, or intrusive advertising cookies. Any cookies utilized are strictly technical and necessary for the fundamental operation of the web session, responsive preference retention, and security rate-limiting.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-rovelle-charcoal uppercase tracking-wider">
              6. Data Retention and Security
            </h2>
            <p className="text-rovelle-muted">
              We retain enquiry communications for the duration necessary to fulfill your request and coordinate property advisory discussions. Technical logs used for rate limiting are automatically cleared on rolling 15-minute cycles. We apply HTTPS transmission encryption across all routes and sanitize incoming inputs to prevent injection vulnerabilities.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-rovelle-charcoal uppercase tracking-wider">
              7. Your Rights and Contact Information
            </h2>
            <p className="text-rovelle-muted">
              You have the right to request access to the personal data we hold about you, request corrections to inaccurate records, or ask for the deletion of your enquiry history. To exercise these rights or discuss privacy governance, please contact our team directly at:
            </p>
            <div className="rounded-xs border border-rovelle-border bg-rovelle-ivory/50 p-4 text-xs space-y-1">
              <p className="font-semibold text-rovelle-charcoal">Rovelle Habitat Privacy Desk</p>
              <p className="text-rovelle-muted">Attention: Ankit Kumar</p>
              <p className="text-rovelle-muted">
                Email:{' '}
                <a href={`mailto:${siteConfig.contact.email}`} className="text-rovelle-slate underline font-medium">
                  {siteConfig.contact.email}
                </a>
              </p>
              <p className="text-rovelle-muted">Address: {siteConfig.contact.address.street}, {siteConfig.contact.address.city}, {siteConfig.contact.address.region} {siteConfig.contact.address.postalCode}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
