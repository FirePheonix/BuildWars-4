import { useState, useEffect } from 'react';
import { SearchFilters } from '../components/SearchFilters';
import { ProfileCard } from '../components/ProfileCard';
import { profiles } from '../data/profiles';
import { SearchFilters as SearchFiltersType, Profile } from '../types';
import { SlidersHorizontal, Grid2x2 as Grid, List } from 'lucide-react';

interface BrowsePageProps {
  onViewProfile: (profileId: string) => void;
}

export function BrowsePage({ onViewProfile }: BrowsePageProps) {
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>(profiles);
  const [likedProfiles, setLikedProfiles] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'relevance' | 'activity'>('relevance');
  
  const [filters, setFilters] = useState<SearchFiltersType>({
    ageRange: { min: 18, max: 60 },
    heightRange: { min: '4\'0"', max: '7\'0"' },
    education: [],
    occupation: [],
    location: [],
    religion: [],
    maritalStatus: [],
    income: []
  });

  const handleSearch = () => {
    let filtered = profiles.filter(profile => {
      const ageMatch = profile.age >= filters.ageRange.min && profile.age <= filters.ageRange.max;
      const educationMatch = filters.education.length === 0 || filters.education.includes(profile.education);
      const locationMatch = filters.location.length === 0 || 
        filters.location.some(loc => profile.location.toLowerCase().includes(loc.toLowerCase()));
      const religionMatch = filters.religion.length === 0 || filters.religion.includes(profile.religion);
      
      return ageMatch && educationMatch && locationMatch && religionMatch;
    });

    // Apply sorting
    if (sortBy === 'activity') {
      filtered = filtered.sort((a, b) => {
        const aHours = parseInt(a.lastActive.split(' ')[0]) || 0;
        const bHours = parseInt(b.lastActive.split(' ')[0]) || 0;
        return aHours - bHours;
      });
    } else if (sortBy === 'newest') {
      filtered = filtered.sort((a, b) => a.age - b.age);
    }

    setFilteredProfiles(filtered);
  };

  const handleLike = (profileId: string) => {
    const newLikedProfiles = new Set(likedProfiles);
    if (newLikedProfiles.has(profileId)) {
      newLikedProfiles.delete(profileId);
    } else {
      newLikedProfiles.add(profileId);
    }
    setLikedProfiles(newLikedProfiles);
  };

  useEffect(() => {
    handleSearch();
  }, [filters, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Profiles</h1>
        <p className="text-gray-600">Discover your perfect match from thousands of verified profiles</p>
      </div>

      {/* Search and Filters */}
      <SearchFilters
        filters={filters}
        onFiltersChange={setFilters}
        onSearch={handleSearch}
      />

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center space-x-4">
          <p className="text-gray-600">
            Showing {filteredProfiles.length} profiles
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="h-4 w-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="relevance">Most Relevant</option>
              <option value="activity">Recently Active</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      {filteredProfiles.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-6"
        }>
          {filteredProfiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onViewProfile={onViewProfile}
              onLike={handleLike}
              isLiked={likedProfiles.has(profile.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <SlidersHorizontal className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No profiles found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search filters to see more results</p>
          <button
            onClick={() => {
              setFilters({
                ageRange: { min: 18, max: 60 },
                heightRange: { min: '4\'0"', max: '7\'0"' },
                education: [],
                occupation: [],
                location: [],
                religion: [],
                maritalStatus: [],
                income: []
              });
            }}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Load More */}
      {filteredProfiles.length > 0 && (
        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium">
            Load More Profiles
          </button>
        </div>
      )}
    </div>
  );
}