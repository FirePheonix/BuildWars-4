import { useState } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import PropertyCard from './components/PropertyCard';
import PropertyDetail from './components/PropertyDetail';
import SearchModal from './components/SearchModal';
import BookingModal from './components/BookingModal';
import { mockProperties } from './data/mockProperties';
import { Property, SearchFilters } from './types';

function App() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);

  const handleSearch = (filters: SearchFilters) => {
    let filtered = mockProperties;

    if (filters.location) {
      filtered = filtered.filter(
        (property) =>
          property.location.toLowerCase().includes(filters.location.toLowerCase()) ||
          property.country.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.guests > 0) {
      filtered = filtered.filter((property) => property.maxGuests >= filters.guests);
    }

    setFilteredProperties(filtered);
  };

  const handleBook = () => {
    setSelectedProperty(null);
    setShowBookingModal(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onSearch={() => setShowSearchModal(true)} />
      <FilterBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={() => setSelectedProperty(property)}
            />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-4">No properties found</p>
            <button
              onClick={() => {
                setFilteredProperties(mockProperties);
                setShowSearchModal(true);
              }}
              className="text-rose-500 font-medium hover:underline"
            >
              Clear filters and try again
            </button>
          </div>
        )}
      </main>

      {selectedProperty && (
        <PropertyDetail
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onBook={handleBook}
        />
      )}

      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onSearch={handleSearch}
      />

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </div>
  );
}

export default App;
