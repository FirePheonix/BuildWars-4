import { X, Star, Users, Bed, Bath, MapPin, Award, Shield, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Property } from '../types';
import { useState } from 'react';

interface PropertyDetailProps {
  property: Property;
  onClose: () => void;
  onBook: () => void;
}

export default function PropertyDetail({ property, onClose, onBook }: PropertyDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };

  const nights = calculateNights();
  const totalPrice = nights * property.price;
  const serviceFee = Math.round(totalPrice * 0.14);
  const cleaningFee = 75;
  const grandTotal = totalPrice + serviceFee + cleaningFee;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onClose}
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <div className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-6 h-6" />
            </div>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-current text-gray-900" />
            <span className="font-semibold">{property.rating}</span>
            <span className="text-gray-600">({property.reviewCount} reviews)</span>
          </div>
          <span className="text-gray-600">·</span>
          <div className="flex items-center space-x-1 text-gray-700">
            <MapPin className="w-4 h-4" />
            <span className="underline">{property.location}, {property.country}</span>
          </div>
        </div>

        <div className="relative mb-8 rounded-2xl overflow-hidden">
          <div className="aspect-[16/10] bg-gray-200">
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>

          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
              >
                <ChevronLeft className="w-6 h-6 text-gray-900" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
              >
                <ChevronRight className="w-6 h-6 text-gray-900" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {property.images.length}
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="pb-8 border-b border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    {property.propertyType} hosted by {property.host.name}
                  </h2>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <span>{property.maxGuests} guests</span>
                    <span>·</span>
                    <span>{property.bedrooms} bedrooms</span>
                    <span>·</span>
                    <span>{property.bathrooms} bathrooms</span>
                  </div>
                </div>
                <img
                  src={property.host.avatar}
                  alt={property.host.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              {property.host.superhost && (
                <div className="flex items-center space-x-2 text-gray-700 mb-4">
                  <Award className="w-5 h-5 text-rose-500" />
                  <span className="font-medium">{property.host.name} is a Superhost</span>
                </div>
              )}
            </div>

            <div className="pb-8 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">About this place</h3>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            <div className="pb-8 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">What this place offers</h3>
              <div className="grid grid-cols-2 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 text-gray-700">
                    <Shield className="w-5 h-5" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pb-8 border-b border-gray-200">
              <div className="flex items-center space-x-4 mb-4">
                <Users className="w-6 h-6 text-gray-700" />
                <div>
                  <p className="font-semibold text-gray-900">Up to {property.maxGuests} guests</p>
                  <p className="text-sm text-gray-600">Perfect for families or groups</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <Bed className="w-6 h-6 text-gray-700" />
                <div>
                  <p className="font-semibold text-gray-900">{property.bedrooms} spacious bedrooms</p>
                  <p className="text-sm text-gray-600">Comfortable sleeping arrangements</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Bath className="w-6 h-6 text-gray-700" />
                <div>
                  <p className="font-semibold text-gray-900">{property.bathrooms} bathrooms</p>
                  <p className="text-sm text-gray-600">Modern and well-maintained</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-gray-300 rounded-2xl shadow-xl p-6">
              <div className="mb-6">
                <div className="flex items-baseline space-x-1 mb-2">
                  <span className="text-2xl font-bold text-gray-900">${property.price}</span>
                  <span className="text-gray-600">night</span>
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <Star className="w-4 h-4 fill-current text-gray-900" />
                  <span className="font-semibold">{property.rating}</span>
                  <span className="text-gray-600">({property.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-2">
                  <div className="border border-gray-300 rounded-lg p-3">
                    <label className="text-xs font-semibold text-gray-700 uppercase block mb-1">
                      Check in
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full text-sm outline-none"
                    />
                  </div>
                  <div className="border border-gray-300 rounded-lg p-3">
                    <label className="text-xs font-semibold text-gray-700 uppercase block mb-1">
                      Check out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="border border-gray-300 rounded-lg p-3">
                  <label className="text-xs font-semibold text-gray-700 uppercase block mb-2">
                    Guests
                  </label>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-8 h-8 border border-gray-300 rounded-full hover:border-gray-400 transition-colors font-semibold"
                    >
                      -
                    </button>
                    <span className="font-medium">{guests}</span>
                    <button
                      onClick={() => setGuests(Math.min(property.maxGuests, guests + 1))}
                      className="w-8 h-8 border border-gray-300 rounded-full hover:border-gray-400 transition-colors font-semibold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={onBook}
                disabled={!checkIn || !checkOut || nights <= 0}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                Reserve
              </button>

              {nights > 0 && (
                <>
                  <p className="text-center text-sm text-gray-600 mt-3">
                    You won't be charged yet
                  </p>

                  <div className="mt-6 space-y-3 pt-6 border-t border-gray-200">
                    <div className="flex justify-between text-gray-700">
                      <span className="underline">${property.price} x {nights} nights</span>
                      <span>${totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span className="underline">Service fee</span>
                      <span>${serviceFee}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span className="underline">Cleaning fee</span>
                      <span>${cleaningFee}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-gray-900 pt-3 border-t border-gray-200">
                      <span>Total</span>
                      <span>${grandTotal}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
