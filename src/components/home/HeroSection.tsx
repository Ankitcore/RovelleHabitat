import React from 'react'
import Link from 'next/link'
import { ArrowRight, Compass, ShieldCheck, Ruler } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-rovelle-ivory py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        {/* Asymmetrical Split Layout Grid */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Prominent Slate-Blue Hero Panel (5 cols on lg) */}
          <div className="flex flex-col justify-between rounded-xs bg-rovelle-slate p-8 text-white shadow-sm sm:p-10 lg:col-span-5 lg:p-12">
            <div>
              {/* Architectural Discipline Subtitle */}
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-rovelle-tint-blue/90">
                <Compass className="h-4 w-4" />
                <span>Rovelle Habitat • Residential Architecture</span>
              </div>

              {/* Main Headline */}
              <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-4xl xl:text-5xl leading-[1.15]">
                Spaces designed around the way you live.
              </h1>

              {/* Honest, Clear Supporting Paragraph (No em dashes) */}
              <p className="mt-6 text-sm sm:text-base leading-relaxed text-rovelle-ivory/90 font-normal">
                We present contemporary residential homes shaped by proportion, natural illumination, and physical durability. Each property is documented with verified room dimensions, architectural drawings, and honest spatial photography.
              </p>
            </div>

            {/* Quick architectural spec badges */}
            <div className="my-8 grid grid-cols-2 gap-4 border-y border-white/20 py-6">
              <div className="flex items-start gap-2.5">
                <Ruler className="h-4 w-4 shrink-0 text-rovelle-ivory mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-white uppercase tracking-wider">Spatial Clarity</span>
                  <span className="text-[11px] text-rovelle-ivory/80">Verified 1:100 layout drawings</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 shrink-0 text-rovelle-ivory mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-white uppercase tracking-wider">Direct Advisory</span>
                  <span className="text-[11px] text-rovelle-ivory/80">Private owner consultations</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/residences"
                className="inline-flex items-center justify-center gap-2 rounded-xs bg-rovelle-charcoal px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-150 hover:bg-rovelle-charcoal-light focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Explore Residences</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xs border border-white/40 bg-white/10 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-150 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Enquire About a Property
              </Link>
            </div>
          </div>

          {/* Right Column: Architectural Photography Panel (7 cols on lg) */}
          <div className="relative min-h-[380px] overflow-hidden rounded-xs border border-rovelle-border bg-white shadow-sm lg:col-span-7 lg:min-h-[580px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
              alt="Architectural exterior of contemporary residence with cantilevered stone volumes and natural light"
              className="h-full w-full object-cover object-center"
              loading="eager"
            />
            {/* Architectural Overlay Information Tag */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto max-w-md rounded-xs bg-rovelle-charcoal/90 p-4 text-white backdrop-blur-xs border border-white/10">
              <div className="flex items-center justify-between gap-4 text-xs font-mono uppercase tracking-wider text-rovelle-slate">
                <span>Featured Study: The Monolith</span>
                <span>San Francisco, CA</span>
              </div>
              <p className="mt-1 text-xs text-rovelle-ivory/80 leading-snug">
                Cantilevered board-formed concrete volume, south-facing garden orientation with 11.5-foot internal ceilings.
              </p>
              <div className="mt-2.5 flex items-center gap-4 text-[11px] text-white/90">
                <Link
                  href="/residences/the-monolith-residence"
                  className="font-medium underline hover:text-rovelle-slate transition-colors inline-flex items-center gap-1"
                >
                  View Floor Plans &amp; Specs <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
