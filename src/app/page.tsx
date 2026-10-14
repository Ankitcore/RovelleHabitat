import React from 'react'
import { HeroSection } from '@/components/home/HeroSection'
import { AmenitiesSection } from '@/components/home/AmenitiesSection'
import { FloorPlanGallerySection } from '@/components/home/FloorPlanGallerySection'
import { FeaturedResidencesSection } from '@/components/home/FeaturedResidencesSection'
import { EnquiryCtaSection } from '@/components/home/EnquiryCtaSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AmenitiesSection />
      <FloorPlanGallerySection />
      <FeaturedResidencesSection />
      <EnquiryCtaSection />
    </>
  )
}
