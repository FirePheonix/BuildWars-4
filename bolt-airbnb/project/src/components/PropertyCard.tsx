import { Star, Heart } from 'lucide-react';
import { Property } from '../types';
import { useState } from 'react';

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
}

export default function PropertyCard({ property, onClick }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white hover:scale-110 transition-all"
        >
          <Heart
            className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-gray-700'}`}
          />
        </button>

        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:scale-110"
            >
              <span className="text-gray-800 font-bold">‹</span>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:scale-110"
            >
              <span className="text-gray-800 font-bold">›</span>
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
              {property.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 line-clamp-1">
              {property.location}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-1">{property.title}</p>
          </div>
          <div className="flex items-center space-x-1 ml-2">
            <Star className="w-4 h-4 fill-current text-gray-900" />
            <span className="text-sm font-medium text-gray-900">{property.rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600">
          {property.bedrooms} beds · {property.bathrooms} baths
        </p>

        <div className="flex items-baseline space-x-1">
          <span className="font-semibold text-gray-900">${property.price}</span>
          <span className="text-sm text-gray-600">night</span>
        </div>
      </div>
    </div>
  );
}
