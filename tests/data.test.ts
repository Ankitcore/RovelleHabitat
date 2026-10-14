import { describe, it, expect } from 'vitest'
import { properties, getPropertyBySlug, getAllPropertySlugs } from '../src/data/properties'
import { masterAmenities } from '../src/data/amenities'
import { siteConfig } from '../src/data/siteConfig'

describe('Rovelle Habitat Data & Portfolio Integrity', () => {
  it('contains verified properties with required architectural attributes', () => {
    expect(properties.length).toBe(12)

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
      expect(property.country).toBeDefined()
    })
  })

  it('contains 3 residences per architectural typology', () => {
    const villas = properties.filter((p) => p.propertyType === 'Villa')
    const penthouses = properties.filter((p) => p.propertyType === 'Penthouse')
    const pavilions = properties.filter((p) => p.propertyType === 'Residence')
    const townhouses = properties.filter((p) => p.propertyType === 'Townhome')

    expect(villas.length).toBe(3)
    expect(penthouses.length).toBe(3)
    expect(pavilions.length).toBe(3)
    expect(townhouses.length).toBe(3)
  })

  it('includes authentic Indian residences across major architectural centers', () => {
    const indianProperties = properties.filter((p) => p.country === 'India')
    expect(indianProperties.length).toBe(8)

    const cities = indianProperties.map((p) => p.city)
    expect(cities).toContain('Alibaug')
    expect(cities).toContain('Assagao')
    expect(cities).toContain('Mumbai')
    expect(cities).toContain('Bengaluru')
    expect(cities).toContain('Gurugram')
    expect(cities).toContain('Bokaro Steel City')
  })

  it('retrieves correct property by slug', () => {
    const slug = 'the-monolith-residence'
    const prop = getPropertyBySlug(slug)
    expect(prop).toBeDefined()
    expect(prop?.title).toBe('The Monolith Residence')
    expect(prop?.propertyType).toBe('Villa')

    const indianProp = getPropertyBySlug('the-chotanagpur-plateau-residence')
    expect(indianProp).toBeDefined()
    expect(indianProp?.city).toBe('Bokaro Steel City')
    expect(indianProp?.currency).toBe('INR')
  })

  it('returns undefined for invalid slugs', () => {
    const invalid = getPropertyBySlug('nonexistent-property-slug')
    expect(invalid).toBeUndefined()
  })

  it('provides all slugs for static site generation', () => {
    const slugs = getAllPropertySlugs()
    expect(slugs.length).toBe(12)
    expect(slugs).toContain('the-monolith-residence')
    expect(slugs).toContain('the-atrium-penthouse')
    expect(slugs).toContain('the-courtyard-house')
    expect(slugs).toContain('the-marina-terrace')
    expect(slugs).toContain('the-alibaug-basalt-villa')
    expect(slugs).toContain('the-goa-laterite-sanctuary')
    expect(slugs).toContain('the-worli-seaface-penthouse')
    expect(slugs).toContain('the-indiranagar-canopy-penthouse')
    expect(slugs).toContain('the-aravali-stone-pavilion')
    expect(slugs).toContain('the-chotanagpur-plateau-residence')
    expect(slugs).toContain('the-bandra-mews-townhouse')
    expect(slugs).toContain('the-koramangala-garden-townhouse')
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
    expect(siteConfig.brand.developerGithub).toBe('https://github.com/Ankitcore')
    expect(siteConfig.brand.developerLinkedin).toBe('https://www.linkedin.com/in/ankit-kumar')
    expect(siteConfig.contact.email).toBe('ankit.vzn@gmail.com')
    expect(siteConfig.contact.phone).toBe('+91 9876543210')
    expect(siteConfig.contact.address.formatted).toBe('Bokaro, Jharkhand 827010, India')
  })
})
