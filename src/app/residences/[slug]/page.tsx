import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { properties, getPropertyBySlug, getAllPropertySlugs } from '@/data/properties'
import { ResidenceDetailClient } from '@/components/residences/ResidenceDetailClient'

interface PropertyPageProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return getAllPropertySlugs().map((slug) => ({
    slug,
  }))
}

export function generateMetadata({ params }: PropertyPageProps): Metadata {
  const property = getPropertyBySlug(params.slug)
  if (!property) {
    return {
      title: 'Residence Not Found | Rovelle Habitat',
      description: 'The requested architectural residence record could not be located.',
    }
  }

  return {
    title: `${property.title} | Rovelle Habitat`,
    description: `${property.subtitle} ${property.summary.substring(0, 150)}...`,
    openGraph: {
      title: `${property.title} | Rovelle Habitat`,
      description: property.subtitle,
      images: [
        {
          url: property.heroImage,
          width: 1200,
          height: 630,
          alt: property.heroAlt,
        },
      ],
    },
  }
}

export default function PropertyDetailPage({ params }: PropertyPageProps) {
  const property = getPropertyBySlug(params.slug)

  if (!property) {
    notFound()
  }

  // Related properties: other residences
  const relatedProperties = properties
    .filter((p) => p.slug !== property.slug)
    .slice(0, 3)

  return (
    <ResidenceDetailClient
      property={property}
      relatedProperties={relatedProperties}
    />
  )
}
