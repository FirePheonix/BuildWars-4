import { Property } from '../types';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Beachfront Villa in Malibu',
    description: 'Wake up to stunning ocean views in this modern beachfront villa. Features floor-to-ceiling windows, private beach access, infinity pool, and designer furnishings throughout.',
    price: 850,
    location: 'Malibu, California',
    country: 'United States',
    images: [
      'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    rating: 4.95,
    reviewCount: 127,
    host: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
      superhost: true
    },
    amenities: ['WiFi', 'Pool', 'Beach Access', 'Kitchen', 'Parking', 'Air Conditioning'],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    propertyType: 'Villa'
  },
  {
    id: '2',
    title: 'Cozy Mountain Cabin in Aspen',
    description: 'Escape to this charming mountain retreat with panoramic views of the Rockies. Perfect for skiing enthusiasts, with slopes just 5 minutes away. Features hot tub, fireplace, and rustic elegance.',
    price: 425,
    location: 'Aspen, Colorado',
    country: 'United States',
    images: [
      'https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    rating: 4.89,
    reviewCount: 94,
    host: {
      name: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
      superhost: true
    },
    amenities: ['WiFi', 'Hot Tub', 'Fireplace', 'Kitchen', 'Parking', 'Ski-in/Ski-out'],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    propertyType: 'Cabin'
  },
  {
    id: '3',
    title: 'Modern Loft in Downtown Manhattan',
    description: 'Experience NYC living at its finest in this industrial-chic loft. High ceilings, exposed brick, and floor-to-ceiling windows. Walking distance to Times Square, Central Park, and world-class dining.',
    price: 320,
    location: 'New York, New York',
    country: 'United States',
    images: [
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    rating: 4.92,
    reviewCount: 203,
    host: {
      name: 'Emma Rodriguez',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200',
      superhost: true
    },
    amenities: ['WiFi', 'Kitchen', 'Washer', 'Dryer', 'Gym Access', 'Doorman'],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    propertyType: 'Loft'
  },
  {
    id: '4',
    title: 'Tuscan Farmhouse with Vineyard Views',
    description: 'Immerse yourself in Italian countryside living. This restored 18th-century farmhouse overlooks rolling vineyards and olive groves. Enjoy wine tasting, cooking classes, and authentic Italian hospitality.',
    price: 580,
    location: 'Tuscany',
    country: 'Italy',
    images: [
      'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1502252/pexels-photo-1502252.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2029670/pexels-photo-2029670.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    rating: 4.97,
    reviewCount: 156,
    host: {
      name: 'Giovanni Rossi',
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200',
      superhost: true
    },
    amenities: ['WiFi', 'Pool', 'Kitchen', 'Garden', 'Vineyard Access', 'Parking'],
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 10,
    propertyType: 'Farmhouse'
  },
  {
    id: '5',
    title: 'Tropical Paradise Villa in Bali',
    description: 'Your private sanctuary in Ubud. Surrounded by lush rice terraces and tropical gardens. Features open-air living, private pool, yoga pavilion, and daily breakfast service.',
    price: 280,
    location: 'Ubud, Bali',
    country: 'Indonesia',
    images: [
      'https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    rating: 4.94,
    reviewCount: 178,
    host: {
      name: 'Wayan Putra',
      avatar: 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=200',
      superhost: true
    },
    amenities: ['WiFi', 'Pool', 'Kitchen', 'Garden', 'Yoga Studio', 'Breakfast Included'],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    propertyType: 'Villa'
  },
  {
    id: '6',
    title: 'Parisian Apartment with Eiffel Tower Views',
    description: 'Elegance meets convenience in this classic Parisian apartment. Wake up to views of the Eiffel Tower from your balcony. Original hardwood floors, high ceilings, and authentic French charm.',
    price: 395,
    location: 'Paris',
    country: 'France',
    images: [
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1743225/pexels-photo-1743225.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    rating: 4.91,
    reviewCount: 142,
    host: {
      name: 'Claire Dubois',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200',
      superhost: true
    },
    amenities: ['WiFi', 'Kitchen', 'Balcony', 'Washer', 'City Views', 'Central Location'],
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    propertyType: 'Apartment'
  },
  {
    id: '7',
    title: 'Cliffside Villa in Santorini',
    description: 'Iconic Cycladic architecture perched on the caldera. Infinity pool with sunset views over the Aegean Sea. Minutes from Oia village, featuring cave-style living and ultimate romance.',
    price: 720,
    location: 'Santorini',
    country: 'Greece',
    images: [
      'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2029670/pexels-photo-2029670.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    rating: 4.98,
    reviewCount: 211,
    host: {
      name: 'Nikos Papadopoulos',
      avatar: 'https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=200',
      superhost: true
    },
    amenities: ['WiFi', 'Pool', 'Kitchen', 'Sea Views', 'Outdoor Dining', 'Concierge'],
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    propertyType: 'Villa'
  },
  {
    id: '8',
    title: 'Glass Treehouse in Swedish Lapland',
    description: 'Sleep under the Northern Lights in this unique glass treehouse. Surrounded by pristine forest, featuring heated floors, sauna, and unobstructed views of the night sky.',
    price: 495,
    location: 'Lapland',
    country: 'Sweden',
    images: [
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    rating: 4.96,
    reviewCount: 89,
    host: {
      name: 'Lars Andersson',
      avatar: 'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=200',
      superhost: true
    },
    amenities: ['WiFi', 'Sauna', 'Kitchen', 'Fireplace', 'Forest Views', 'Aurora Tours'],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    propertyType: 'Treehouse'
  }
];
