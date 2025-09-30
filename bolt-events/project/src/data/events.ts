import { Event } from '../App';

export const events: Event[] = [
  {
    id: '1',
    title: 'Summer Music Festival 2025',
    date: 'July 15, 2025',
    time: '6:00 PM',
    venue: 'Central Park Amphitheater',
    location: 'New York, NY',
    price: 75,
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'concert',
    description: 'Join us for an unforgettable evening of music featuring top artists from around the world. This outdoor festival promises amazing performances, great food, and an electric atmosphere under the summer sky.',
    capacity: 5000,
    sold: 3200,
    featured: true,
    tickets: [
      {
        type: 'General Admission',
        price: 75,
        available: 800,
        benefits: ['Standing area access', 'Festival map', 'Parking included']
      },
      {
        type: 'VIP Experience',
        price: 150,
        available: 150,
        benefits: ['Premium seating area', 'Complimentary drinks', 'Meet & greet opportunity', 'VIP parking']
      },
      {
        type: 'Premium Package',
        price: 250,
        available: 50,
        benefits: ['Front row seating', 'Backstage tour', 'Artist merchandise', 'Catered dinner', 'Private bar access']
      }
    ]
  },
  {
    id: '2',
    title: 'Broadway Spectacular: Hamilton',
    date: 'August 22, 2025',
    time: '8:00 PM',
    venue: 'Majestic Theatre',
    location: 'New York, NY',
    price: 120,
    image: 'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'theater',
    description: 'Experience the groundbreaking musical that tells the story of Alexander Hamilton, one of Americas most influential founding fathers. This Tony Award-winning masterpiece features incredible performances and unforgettable music.',
    capacity: 1800,
    sold: 1650,
    featured: true,
    tickets: [
      {
        type: 'Orchestra',
        price: 200,
        available: 50,
        benefits: ['Best seats in the house', 'Complimentary program', 'Priority entry']
      },
      {
        type: 'Mezzanine',
        price: 150,
        available: 75,
        benefits: ['Great elevated view', 'Complimentary program', 'Bar access']
      },
      {
        type: 'Balcony',
        price: 120,
        available: 25,
        benefits: ['Affordable seating', 'Full stage view', 'Complimentary program']
      }
    ]
  },
  {
    id: '3',
    title: 'NBA Championship Finals Game 7',
    date: 'June 18, 2025',
    time: '9:00 PM',
    venue: 'Madison Square Garden',
    location: 'New York, NY',
    price: 300,
    image: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'sports',
    description: 'Witness history in the making at the decisive Game 7 of the NBA Championship Finals. The atmosphere will be electric as two incredible teams battle for basketball supremacy in this winner-take-all showdown.',
    capacity: 20000,
    sold: 19500,
    featured: false,
    tickets: [
      {
        type: 'Upper Level',
        price: 300,
        available: 200,
        benefits: ['Stadium seating', 'Concession discounts', 'Official program']
      },
      {
        type: 'Lower Level',
        price: 500,
        available: 150,
        benefits: ['Premium seating', 'In-seat service', 'Club access', 'Premium restrooms']
      },
      {
        type: 'Courtside',
        price: 1500,
        available: 150,
        benefits: ['Floor seating', 'Meet players', 'Exclusive hospitality', 'Commemorative gift', 'Valet parking']
      }
    ]
  },
  {
    id: '4',
    title: 'Stand-Up Comedy Night with Trevor Noah',
    date: 'September 10, 2025',
    time: '7:30 PM',
    venue: 'Comedy Cellar',
    location: 'New York, NY',
    price: 45,
    image: 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'comedy',
    description: 'Get ready for an evening of laughter with internationally acclaimed comedian Trevor Noah. Known for his sharp wit and insightful humor, Trevor will deliver a performance that will leave you in stitches.',
    capacity: 300,
    sold: 250,
    featured: false,
    tickets: [
      {
        type: 'General Seating',
        price: 45,
        available: 30,
        benefits: ['Reserved seating', 'One drink included', 'Show program']
      },
      {
        type: 'Premium Seating',
        price: 75,
        available: 20,
        benefits: ['Front section seating', 'Two drinks included', 'Meet & greet opportunity', 'Signed poster']
      }
    ]
  },
  {
    id: '5',
    title: 'Food & Wine Festival',
    date: 'October 5, 2025',
    time: '2:00 PM',
    venue: 'Brooklyn Bridge Park',
    location: 'Brooklyn, NY',
    price: 85,
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'festival',
    description: 'Indulge in a culinary journey featuring renowned chefs, premium wines, and gourmet food from around the world. This outdoor festival combines great food, fine wine, and beautiful waterfront views.',
    capacity: 2000,
    sold: 1200,
    featured: true,
    tickets: [
      {
        type: 'Tasting Pass',
        price: 85,
        available: 500,
        benefits: ['Food tastings', 'Wine samples', 'Recipe booklet', 'Reusable tote bag']
      },
      {
        type: 'VIP Pass',
        price: 150,
        available: 200,
        benefits: ['Premium tastings', 'Unlimited wine', 'Chef meet & greets', 'Cooking demonstration access', 'VIP lounge']
      },
      {
        type: 'Master Class',
        price: 200,
        available: 100,
        benefits: ['Private cooking class', 'Wine pairing dinner', 'Take-home ingredients', 'Signed cookbook', 'Photos with chefs']
      }
    ]
  },
  {
    id: '6',
    title: 'Electronic Dance Music Festival',
    date: 'August 28, 2025',
    time: '4:00 PM',
    venue: 'Randalls Island',
    location: 'New York, NY',
    price: 95,
    image: 'https://images.pexels.com/photos/1540338/pexels-photo-1540338.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'concert',
    description: 'Dance the day and night away at the biggest electronic music festival of the year. Featuring world-renowned DJs, stunning visual productions, and an unforgettable atmosphere that will keep you moving.',
    capacity: 8000,
    sold: 6000,
    featured: true,
    tickets: [
      {
        type: 'General Admission',
        price: 95,
        available: 1500,
        benefits: ['Full festival access', 'Water stations', 'Map and schedule']
      },
      {
        type: 'VIP Experience',
        price: 200,
        available: 300,
        benefits: ['VIP viewing areas', 'Dedicated bars', 'Air-conditioned restrooms', 'Fast entry', 'Artist meet & greets']
      },
      {
        type: 'Ultra VIP',
        price: 350,
        available: 200,
        benefits: ['Side stage access', 'Open bar', 'Gourmet catering', 'Backstage tours', 'Exclusive merchandise', 'Golf cart transport']
      }
    ]
  },
  {
    id: '7',
    title: 'Yankees vs Red Sox - Opening Day',
    date: 'April 1, 2025',
    time: '1:05 PM',
    venue: 'Yankee Stadium',
    location: 'Bronx, NY',
    price: 55,
    image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'sports',
    description: 'Experience the excitement of Opening Day as the Yankees take on their historic rivals, the Red Sox. This classic matchup promises great baseball, passionate fans, and the start of another thrilling season.',
    capacity: 50000,
    sold: 45000,
    featured: false,
    tickets: [
      {
        type: 'Bleachers',
        price: 55,
        available: 3000,
        benefits: ['General admission', 'Standing room', 'Concession access']
      },
      {
        type: 'Grandstand',
        price: 85,
        available: 1500,
        benefits: ['Reserved seating', 'Better views', 'Concession discounts']
      },
      {
        type: 'Field Level',
        price: 150,
        available: 500,
        benefits: ['Premium seating', 'In-seat service', 'Club access', 'Batting practice viewing']
      }
    ]
  },
  {
    id: '8',
    title: 'Shakespeare in the Park: Romeo and Juliet',
    date: 'July 20, 2025',
    time: '8:00 PM',
    venue: 'Delacorte Theater',
    location: 'Central Park, NY',
    price: 0,
    image: 'https://images.pexels.com/photos/3042863/pexels-photo-3042863.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'theater',
    description: 'Enjoy this timeless tale of love and tragedy under the stars in Central Park. This free outdoor production brings Shakespeares masterpiece to life with stellar performances and beautiful staging.',
    capacity: 1800,
    sold: 1500,
    featured: false,
    tickets: [
      {
        type: 'Free Admission',
        price: 0,
        available: 300,
        benefits: ['Free entry', 'Outdoor seating', 'Bring your own blanket', 'Program included']
      }
    ]
  }
];