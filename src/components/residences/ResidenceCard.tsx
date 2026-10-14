import React from 'react'
import Link from 'next/link'
import { Property } from '@/types/property'
import { Badge } from '@/components/common/Badge'
import { Bed, Bath, Maximize, MapPin, ArrowRight } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface ResidenceCardProps {
  property: Property
}

export function ResidenceCard({ property }: ResidenceCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xs border border-rovelle-border bg-white shadow-xs transition-colors duration-200 hover:border-rovelle-slate">
      {/* Property Image Container */}
      <Link
        href={`/residences/${property.slug}`}
        className="relative aspect-[16/10] w-full overflow-hidden bg-rovelle-charcoal/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-rovelle-slate"
        aria-label={`View full details of ${property.title}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={property.heroImage}
          alt={property.heroAlt}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />

        {/* Status and Type Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <Badge variant="charcoal">{property.propertyType}</Badge>
          {property.status === 'Under Offer' && (
            <Badge variant="status">Under Offer</Badge>
          )}
        </div>

        {/* Subtle Demonstration inventory tag */}
        {property.isDemonstrationInventory && (
          <div className="absolute bottom-2.5 right-2.5 rounded-2xs bg-rovelle-charcoal/80 px-2 py-0.5 text-[10px] font-mono uppercase text-rovelle-ivory">
            Demonstration Portfolio
          </div>
        )}
      </Link>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          {/* Location Line */}
          <div className="flex items-center gap-1.5 text-xs text-rovelle-muted">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-rovelle-slate" />
            <span>
              {property.city}, {property.region}
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-2 text-xl font-bold tracking-tight text-rovelle-charcoal transition-colors group-hover:text-rovelle-slate">
            <Link
              href={`/residences/${property.slug}`}
              className="focus:outline-none focus-visible:underline"
            >
              {property.title}
            </Link>
          </h3>

          {/* Subtitle */}
          <p className="mt-2 text-xs leading-relaxed text-rovelle-muted line-clamp-2">
            {property.subtitle}
          </p>
        </div>

        {/* Specifications and Price */}
        <div className="mt-6 border-t border-rovelle-border pt-4">
          {/* Specs Row */}
          <div className="flex items-center justify-between text-xs text-rovelle-charcoal/90 mb-4">
            <div className="flex items-center gap-1" title={`${property.bedrooms} Bedrooms`}>
              <Bed className="h-3.5 w-3.5 text-rovelle-slate" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1" title={`${property.bathrooms} Bathrooms`}>
              <Bath className="h-3.5 w-3.5 text-rovelle-slate" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1" title={`${property.areaSqFt} Square Feet`}>
              <Maximize className="h-3.5 w-3.5 text-rovelle-slate" />
              <span>{property.areaSqFt.toLocaleString()} sq ft</span>
            </div>
          </div>

          {/* Price & Link */}
          <div className="flex items-center justify-between">
            <div>
              <span className="block text-[10px] font-mono uppercase text-rovelle-muted">Offering</span>
              <span className="text-base font-bold text-rovelle-charcoal">
                {formatCurrency(property.price)}
              </span>
            </div>
            <Link
              href={`/residences/${property.slug}`}
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-rovelle-slate group-hover:text-rovelle-charcoal transition-colors focus:outline-none focus-visible:underline"
            >
              <span>Explore</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
