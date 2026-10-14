export interface Amenity {
  id: string
  name: string
  shortDescription: string
  detailedDescription: string
  iconName: 'Car' | 'Trees' | 'Sun' | 'Waves' | 'Dumbbell' | 'Wifi' | 'ShieldCheck' | 'Wind'
  category: 'building' | 'wellness' | 'environment' | 'technology'
}

export const masterAmenities: Amenity[] = [
  {
    id: 'parking',
    name: 'Secure Private Parking',
    shortDescription: 'Dedicated underground bays with EV charging provisions.',
    detailedDescription:
      'Gated subterranean parking with automated license plate recognition, private double garages for select residences, and integrated Level 2 electric vehicle charging stations.',
    iconName: 'Car',
    category: 'building',
  },
  {
    id: 'garden',
    name: 'Landscaped Courtyard Gardens',
    shortDescription: 'Drought-tolerant native plantings and quiet stone seating.',
    detailedDescription:
      'Private landscaped perimeter designed with mature olive trees, native grasses, architectural water features, and sheltered reading alcoves.',
    iconName: 'Trees',
    category: 'environment',
  },
  {
    id: 'balcony',
    name: 'Expansive Private Terraces',
    shortDescription: 'Sheltered outdoor living with frameless glass balustrades.',
    detailedDescription:
      'Deep cantilevered balconies and garden terraces paved in non-slip honed limestone, equipped with recessed warm ambient lighting and concealed drainage.',
    iconName: 'Sun',
    category: 'environment',
  },
  {
    id: 'swimming-pool',
    name: 'Heated Lap Pool',
    shortDescription: 'Subtle slate tiling, ozone filtration, and poolside loungers.',
    detailedDescription:
      'A 20-meter heated lap pool framed by basalt stonework, gentle acoustic water flow, ozone water purification, and private sundeck cabanas.',
    iconName: 'Waves',
    category: 'wellness',
  },
  {
    id: 'fitness',
    name: 'Private Movement Studio',
    shortDescription: 'Technogym equipment, reformer pilates area, and oak flooring.',
    detailedDescription:
      'A naturally lit wellness studio appointed with custom timber joinery, acoustic baffle ceilings, premium strength equipment, and private personal training space.',
    iconName: 'Dumbbell',
    category: 'wellness',
  },
  {
    id: 'internet',
    name: 'Dedicated Fiber Backbone',
    shortDescription: 'Symmetrical gigabit data points throughout all living spaces.',
    detailedDescription:
      'Enterprise-grade cat6a cabling, recessed discreet access points, and dual redundant optical fiber backbones ensuring flawless work-from-home reliability.',
    iconName: 'Wifi',
    category: 'technology',
  },
  {
    id: 'climate-control',
    name: 'Zoned Acoustic Climate Control',
    shortDescription: 'Concealed linear slot diffusers and individual room sensors.',
    detailedDescription:
      'Multi-zone VRF climate systems with heat recovery, silent ducting, HEPA air filtration, and independent smart thermostatic control in each room.',
    iconName: 'Wind',
    category: 'technology',
  },
  {
    id: 'security',
    name: 'Discreet Architectural Security',
    shortDescription: 'Biometric access, encrypted video intercom, and 24/7 monitoring.',
    detailedDescription:
      'Secure foyer vestibules, biometric keycard entry for elevators and private residences, CCTV coverage across common access points, and on-site concierge.',
    iconName: 'ShieldCheck',
    category: 'building',
  },
]
