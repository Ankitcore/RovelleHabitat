import { describe, it, expect } from 'vitest'
import { properties, getPropertyBySlug, getAllPropertySlugs } from '../src/data/properties'
import { masterAmenities } from '../src/data/amenities'
import { siteConfig } from '../src/data/siteConfig'

describe('Rovelle Habitat Data & Portfolio Integrity', () => {
  it('contains verified properties with required architectural attributes', () => {
    expect(properties.length).toBeGreaterThanOrEqual(4)

    properties.forEach((property) => {
      expect(property.id).toBeDefined()
      expect(property.slug).toBeDefined()
      expect(property.title).toBeDefined()
      expect(property.price).toBeGreaterThan(0)
      expect(property.bedrooms).toBeGreaterThan(0)
      expect(property.bathrooms).toBeGreaterThan(0)
      expect(property.areaSqFt).toBeGreaterThan(0)
      expect(property.areaSqM).toBeGreaterThan(0)
      expect(property.ceilingHeightFt).toBeGreaterThan(0)
      expect(property.heroImage).toBeDefined()
      expect(property.floorPlan).toBeDefined()
      expect(property.floorPlan.rooms.length).toBeGreaterThan(0)
      expect(property.verifiedAmenityIds.length).toBeGreaterThan(0)
    })
  })

  it('retrieves correct property by slug', () => {
    const slug = 'the-monolith-residence'
    const prop = getPropertyBySlug(slug)
    expect(prop).toBeDefined()
    expect(prop?.title).toBe('The Monolith Residence')
    expect(prop?.propertyType).toBe('Villa')
  })

  it('returns undefined for invalid slugs', () => {
    const invalid = getPropertyBySlug('nonexistent-property-slug')
    expect(invalid).toBeUndefined()
  })

  it('provides all slugs for static site generation', () => {
    const slugs = getAllPropertySlugs()
    expect(slugs).toContain('the-monolith-residence')
    expect(slugs).toContain('the-atrium-penthouse')
    expect(slugs).toContain('the-courtyard-house')
    expect(slugs).toContain('the-marina-terrace')
  })

  it('master amenities list is valid and structured', () => {
    expect(masterAmenities.length).toBe(8)
    masterAmenities.forEach((a) => {
      expect(a.id).toBeDefined()
      expect(a.name).toBeDefined()
      expect(a.shortDescription).toBeDefined()
      expect(a.category).toBeDefined()
    })
  })

  it('verifies creator credit and contact details', () => {
    expect(siteConfig.brand.developerCredit).toBe('Designed and developed by Ankit Kumar.')
    expect(siteConfig.brand.developerName).toBe('Ankit Kumar')
    expect(siteConfig.contact.email).toBe('ankit.vzn@gmail.com')
    expect(siteConfig.contact.phone).toBe('+91 9876543210')
    expect(siteConfig.contact.address.formatted).toBe('Bokaro, Jharkhand 827010, India')
  })
})
