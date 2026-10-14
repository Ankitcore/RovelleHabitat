export const siteConfig = {
  brand: {
    name: 'Rovelle Habitat',
    tagline: 'Spaces designed for living.',
    description:
      'Curated residential property showcase and architectural web experience presenting contemporary residences with spatial precision, natural illumination, and verified floor plans.',
    developerCredit: 'Designed and developed by Ankit Kumar.',
    developerName: 'Ankit Kumar',
    developerEmail: 'itsankitkumar405@gmail.com',
  },
  contact: {
    email: 'itsankitkumar405@gmail.com',
    phone: '+1 (415) 890-4281', // Display format for architectural advisory team
    phoneRaw: '+14158904281',
    address: {
      street: '420 Montgomery Street, Suite 850',
      city: 'San Francisco',
      region: 'CA',
      postalCode: '94104',
      country: 'United States',
    },
    businessHours: 'Monday to Friday, 9:00 AM to 6:00 PM PST. Private weekend viewings arranged by appointment.',
  },
  navigation: {
    main: [
      { name: 'Residences', href: '/residences' },
      { name: 'About', href: '/about' },
      { name: 'Amenities', href: '/amenities' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms and Conditions', href: '/terms-and-conditions' },
    ],
  },
  colors: {
    slate: '#657DA0',
    charcoal: '#202A36',
    ivory: '#F6F4EF',
    white: '#FFFFFF',
    secondaryText: '#68717C',
    borders: '#E2E5E9',
    subtleBlueTint: '#EEF2F8',
  },
} as const
