export type PropertyType = 'Residence' | 'Penthouse' | 'Villa' | 'Townhome'

export type PropertyStatus = 'Available' | 'Under Offer' | 'Private Viewing'

export interface RoomSpec {
  name: string
  dimensionsFt: string
  dimensionsM: string
  level: string
  description: string
}

export interface FloorPlanData {
  imageUrl: string
  alt: string
  totalFloors: number
  grossInternalAreaSqFt: number
  grossInternalAreaSqM: number
  rooms: RoomSpec[]
}

export interface PropertyImage {
  id: string
  url: string
  alt: string
  caption: string
  category: 'exterior' | 'interior' | 'detail' | 'plan'
}

export interface Property {
  id: string
  slug: string
  title: string
  subtitle: string
  propertyType: PropertyType
  status: PropertyStatus
  price: number
  currency?: 'USD' | 'INR'
  priceUsdEquivalent?: number
  country?: string
  bedrooms: number
  bathrooms: number
  areaSqFt: number
  areaSqM: number
  ceilingHeightFt: number
  orientation: string
  yearCompleted: number
  address: string
  city: string
  region: string
  postalCode: string
  heroImage: string
  heroAlt: string
  summary: string
  architecturalEthos: string
  gallery: PropertyImage[]
  floorPlan: FloorPlanData
  verifiedAmenityIds: string[]
  isDemonstrationInventory: boolean
}
