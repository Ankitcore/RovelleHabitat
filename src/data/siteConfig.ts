export const siteConfig = {
  brand: {
    name: 'Rovelle Habitat',
    tagline: 'Spaces designed for living.',
    description:
      'Curated residential property showcase and architectural web experience presenting contemporary residences with spatial precision, natural illumination, and verified floor plans.',
    developerCredit: 'Designed and developed by Ankit Kumar.',
    developerName: 'Ankit Kumar',
    developerEmail: 'ankit.vzn@gmail.com',
  },
  contact: {
    email: 'ankit.vzn@gmail.com',
    phone: '+91 9876543210',
    phoneRaw: '+919876543210',
    address: {
      street: 'Bokaro',
      city: 'Bokaro',
      region: 'Jharkhand',
      postalCode: '827010',
      country: 'India',
      formatted: 'Bokaro, Jharkhand 827010, India',
    },
    businessHours: 'Monday to Saturday, 9:00 AM to 6:00 PM IST. Private viewings arranged by appointment.',
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
