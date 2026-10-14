'use client'

import React, { useState, useMemo } from 'react'
import { properties } from '@/data/properties'
import { ResidenceCard } from '@/components/residences/ResidenceCard'
import { ResidenceFilters } from '@/components/residences/ResidenceFilters'
import { Info, RotateCcw } from 'lucide-react'

export function ResidencesClient() {
  const [propertyType, setPropertyType] = useState('all')
  const [location, setLocation] = useState('all')
  const [bedrooms, setBedrooms] = useState('all')
  const [maxPrice, setMaxPrice] = useState(6000000)

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Type filter
      if (propertyType !== 'all' && property.propertyType !== propertyType) {
        return false
      }
      // Location / Country filter
      if (location !== 'all' && property.country !== location) {
        return false
      }
      // Bedrooms filter
      if (bedrooms !== 'all') {
        const bedNum = parseInt(bedrooms, 10)
        if (property.bedrooms < bedNum) return false
      }
      // Price filter (normalized USD equivalent)
      const effectivePrice = property.priceUsdEquivalent || property.price
      if (effectivePrice > maxPrice) {
        return false
      }
      return true
    })
  }, [propertyType, location, bedrooms, maxPrice])

  const handleClearFilters = () => {
    setPropertyType('all')
    setLocation('all')
    setBedrooms('all')
    setMaxPrice(6000000)
  }

  return (
    <div className="space-y-8">
      {/* Developmental Integrity Notice */}
      <div className="flex items-start gap-3 rounded-xs border border-rovelle-border bg-rovelle-ivory/80 p-4 text-xs text-rovelle-charcoal">
        <Info className="h-4 w-4 shrink-0 text-rovelle-slate mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-semibold text-rovelle-charcoal">Demonstration Inventory Notice:</span> The residences presented below reflect verified architectural typologies, room dimensions, and CAD drawings prepared for owner evaluation. In accordance with Rovelle Habitat integrity policies, mock or fabricated inventory is explicitly designated prior to final client handoff.
        </div>
      </div>

      {/* Filter Bar */}
      <ResidenceFilters
        propertyType={propertyType}
        onPropertyTypeChange={setPropertyType}
        location={location}
        onLocationChange={setLocation}
        bedrooms={bedrooms}
        onBedroomsChange={setBedrooms}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        onClearFilters={handleClearFilters}
        resultCount={filteredProperties.length}
        totalCount={properties.length}
      />

      {/* Results Grid or Empty State */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <ResidenceCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="rounded-xs border border-dashed border-rovelle-border bg-rovelle-ivory/40 p-12 text-center">
          <p className="text-base font-bold text-rovelle-charcoal">
            No residences match your current filter parameters.
          </p>
          <p className="mt-2 text-xs text-rovelle-muted">
            Try adjusting your maximum price or bedroom selection to view available properties.
          </p>
          <button
            type="button"
            onClick={handleClearFilters}
            className="mt-6 inline-flex items-center gap-2 rounded-xs bg-rovelle-charcoal px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-rovelle-slate transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  )
}
