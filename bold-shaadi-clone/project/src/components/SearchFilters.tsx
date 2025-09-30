import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import { SearchFilters as SearchFiltersType } from '../types';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onSearch: () => void;
}

export function SearchFilters({ filters, onFiltersChange, onSearch }: SearchFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const religions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Others'];
  const educations = ['Graduate', 'Post Graduate', 'BE/BTech', 'MBA', 'CA', 'MBBS', 'PhD'];
  const occupations = ['Software Engineer', 'Doctor', 'Teacher', 'Business Owner', 'Government Employee', 'Lawyer'];
  const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata'];
  const incomes = ['Below 3 Lakhs', '3-5 Lakhs', '5-8 Lakhs', '8-12 Lakhs', '12-15 Lakhs', '15-20 Lakhs', '20+ Lakhs'];

  const updateFilters = (key: keyof SearchFiltersType, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: keyof SearchFiltersType, value: string) => {
    const currentArray = filters[key] as string[];
    const updatedArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilters(key, updatedArray);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search by name, location, profession..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      {/* Quick Filters */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            Age: {filters.ageRange.min}-{filters.ageRange.max}
          </button>
          {filters.education.length > 0 && (
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Education ({filters.education.length})
            </button>
          )}
          {filters.location.length > 0 && (
            <button className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              Location ({filters.location.length})
            </button>
          )}
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Advanced Filters
        </button>
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="border-t pt-4 space-y-6">
          {/* Age Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="18"
                max="60"
                value={filters.ageRange.min}
                onChange={(e) => updateFilters('ageRange', { ...filters.ageRange, min: Number(e.target.value) })}
                className="flex-1"
              />
              <span className="text-sm font-medium w-16 text-center">{filters.ageRange.min} - {filters.ageRange.max}</span>
              <input
                type="range"
                min="18"
                max="60"
                value={filters.ageRange.max}
                onChange={(e) => updateFilters('ageRange', { ...filters.ageRange, max: Number(e.target.value) })}
                className="flex-1"
              />
            </div>
          </div>

          {/* Religion */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Religion</label>
            <div className="flex flex-wrap gap-2">
              {religions.map((religion) => (
                <button
                  key={religion}
                  onClick={() => toggleArrayFilter('religion', religion)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filters.religion.includes(religion)
                      ? 'bg-red-100 text-red-700 border-red-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } border`}
                >
                  {religion}
                </button>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
            <div className="flex flex-wrap gap-2">
              {educations.map((education) => (
                <button
                  key={education}
                  onClick={() => toggleArrayFilter('education', education)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filters.education.includes(education)
                      ? 'bg-blue-100 text-blue-700 border-blue-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } border`}
                >
                  {education}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <div className="flex flex-wrap gap-2">
              {locations.map((location) => (
                <button
                  key={location}
                  onClick={() => toggleArrayFilter('location', location)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filters.location.includes(location)
                      ? 'bg-green-100 text-green-700 border-green-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } border`}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <button
              onClick={() => {
                onFiltersChange({
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
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={() => {
                onSearch();
                setIsExpanded(false);
              }}
              className="px-8 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}