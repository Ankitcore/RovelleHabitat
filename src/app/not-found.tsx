import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Home, Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-white px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="max-w-md space-y-6">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xs bg-rovelle-tint-blue text-rovelle-slate">
          <Compass className="h-6 w-6" />
        </div>

        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-rovelle-slate">
            Status Code 404
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-rovelle-charcoal sm:text-4xl">
            Page Not Found
          </h1>
          <p className="mt-3 text-sm text-rovelle-muted leading-relaxed">
            The architectural record, property slug, or page you requested could not be located in our current index. It may have been relocated or archived.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xs bg-rovelle-charcoal px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-rovelle-slate transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate"
          >
            <Home className="h-4 w-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/residences"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xs border border-rovelle-border bg-rovelle-tint-blue px-5 py-3 text-xs font-semibold uppercase tracking-wider text-rovelle-charcoal hover:bg-rovelle-tint-blue-hover transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Browse Residences</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
