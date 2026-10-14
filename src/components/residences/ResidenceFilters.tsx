'use client'

import React from 'react'
import { Filter, X } from 'lucide-react'

interface ResidenceFiltersProps {
  propertyType: string
  onPropertyTypeChange: (type: string) => void
  location: string
  onLocationChange: (loc: string) => void
  bedrooms: string
  onBedroomsChange: (beds: string) => void
  maxPrice: number
  onMaxPriceChange: (price: number) => void
  onClearFilters: () => void
  resultCount: number
  totalCount: number
}

export function ResidenceFilters({
  propertyType,
  onPropertyTypeChange,
  location,
  onLocationChange,
  bedrooms,
  onBedroomsChange,
  maxPrice,
  onMaxPriceChange,
  onClearFilters,
  resultCount,
  totalCount,
}: ResidenceFiltersProps) {
  const isFiltered = propertyType !== 'all' || location !== 'all' || bedrooms !== 'all' || maxPrice < 6000000

  return (
    <div className="rounded-xs border border-rovelle-border bg-white p-6 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-rovelle-border pb-4 mb-5">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-rovelle-slate" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-rovelle-charcoal">
            Filter Residences
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-rovelle-muted">
            Showing <strong className="text-rovelle-charcoal font-semibold">{resultCount}</strong> of {totalCount} properties
          </span>
          {isFiltered && (
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex items-center gap-1 text-xs text-rovelle-slate hover:text-rovelle-charcoal font-medium underline"
            >
              <X className="h-3.5 w-3.5" />
              <span>Clear filters</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Property Type Filter */}
        <div>
          <label htmlFor="filterType" className="block text-xs font-semibold uppercase tracking-wider text-rovelle-charcoal mb-2">
            Property Category
          </label>
          <select
            id="filterType"
            value={propertyType}
            onChange={(e) => onPropertyTypeChange(e.target.value)}
            className="w-full rounded-xs border border-rovelle-border bg-white px-3 py-2 text-xs text-rovelle-charcoal transition-colors hover:border-rovelle-muted focus:outline-none focus:ring-1 focus:ring-rovelle-slate"
          >
            <option value="all">All Architectural Types</option>
            <option value="Villa">Villa Residences</option>
            <option value="Penthouse">Penthouses</option>
            <option value="Residence">Pavilion Residences</option>
            <option value="Townhome">Townhouses &amp; Townhomes</option>
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label htmlFor="filterLocation" className="block text-xs font-semibold uppercase tracking-wider text-rovelle-charcoal mb-2">
            Region / Location
          </label>
          <select
            id="filterLocation"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full rounded-xs border border-rovelle-border bg-white px-3 py-2 text-xs text-rovelle-charcoal transition-colors hover:border-rovelle-muted focus:outline-none focus:ring-1 focus:ring-rovelle-slate"
          >
            <option value="all">All Regions (Global &amp; India)</option>
            <option value="India">India (Alibaug, Goa, Mumbai, Bengaluru, Bokaro, NCR)</option>
            <option value="United States">United States (San Francisco)</option>
          </select>
        </div>

        {/* Bedrooms Filter */}
        <div>
          <label htmlFor="filterBeds" className="block text-xs font-semibold uppercase tracking-wider text-rovelle-charcoal mb-2">
            Bedroom Count
          </label>
          <select
            id="filterBeds"
            value={bedrooms}
            onChange={(e) => onBedroomsChange(e.target.value)}
            className="w-full rounded-xs border border-rovelle-border bg-white px-3 py-2 text-xs text-rovelle-charcoal transition-colors hover:border-rovelle-muted focus:outline-none focus:ring-1 focus:ring-rovelle-slate"
          >
            <option value="all">Any Bedroom Count</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
          </select>
        </div>

        {/* Max Price Range Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="filterPrice" className="text-xs font-semibold uppercase tracking-wider text-rovelle-charcoal">
              Max Price (USD Eq.)
            </label>
            <span className="font-mono text-xs font-semibold text-rovelle-slate">
              ${(maxPrice / 1000000).toFixed(2)}M
            </span>
          </div>
          <input
            type="range"
            id="filterPrice"
            min={1000000}
            max={6000000}
            step={250000}
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(Number(e.target.value))}
            className="w-full accent-rovelle-slate cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-rovelle-muted mt-1 font-mono">
            <span>$1.00M</span>
            <span>$6.00M</span>
          </div>
        </div>
      </div>
    </div>
  )
}
