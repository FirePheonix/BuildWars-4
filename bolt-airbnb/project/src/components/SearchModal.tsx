import { X, MapPin, Calendar, Users, Search } from 'lucide-react';
import { useState } from 'react';
import { SearchFilters } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (filters: SearchFilters) => void;
}

export default function SearchModal({ isOpen, onClose, onSearch }: SearchModalProps) {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  if (!isOpen) return null;

  const handleSearch = () => {
    onSearch({
      location,
      checkIn,
      checkOut,
      guests,
      priceMin: 0,
      priceMax: 10000
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">Search for stays</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4" />
              <span>Where</span>
            </label>
            <input
              type="text"
              placeholder="Search destinations"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4" />
                <span>Check in</span>
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4" />
                <span>Check out</span>
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4" />
              <span>Guests</span>
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-10 h-10 border border-gray-300 rounded-full hover:border-gray-400 transition-colors font-semibold"
              >
                -
              </button>
              <span className="text-lg font-medium w-12 text-center">{guests}</span>
              <button
                onClick={() => setGuests(guests + 1)}
                className="w-10 h-10 border border-gray-300 rounded-full hover:border-gray-400 transition-colors font-semibold"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={handleSearch}
            className="flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-3 rounded-lg font-medium hover:from-rose-600 hover:to-pink-700 transition-all shadow-md hover:shadow-lg"
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
}
