export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  country: string;
  images: string[];
  rating: number;
  reviewCount: number;
  host: {
    name: string;
    avatar: string;
    superhost: boolean;
  };
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  propertyType: string;
}

export interface SearchFilters {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  priceMin: number;
  priceMax: number;
}

export interface Booking {
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
}
