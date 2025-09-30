import { Heart, Search, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Header({ currentPage, onPageChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => onPageChange('home')}>
            <Heart className="h-8 w-8 text-red-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">SoulMatch</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onPageChange('browse')}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'browse'
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
              }`}
            >
              <Search className="h-4 w-4 mr-2" />
              Browse Profiles
            </button>
            <button
              onClick={() => onPageChange('matches')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'matches'
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
              }`}
            >
              My Matches
            </button>
            <button
              onClick={() => onPageChange('messages')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'messages'
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
              }`}
            >
              Messages
            </button>
            <button
              onClick={() => onPageChange('profile')}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'profile'
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
              }`}
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </button>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
              Login
            </button>
            <button className="px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg">
              Sign Up Free
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => {
                onPageChange('browse');
                setIsMenuOpen(false);
              }}
              className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50"
            >
              <Search className="h-4 w-4 mr-2" />
              Browse Profiles
            </button>
            <button
              onClick={() => {
                onPageChange('matches');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50"
            >
              My Matches
            </button>
            <button
              onClick={() => {
                onPageChange('messages');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50"
            >
              Messages
            </button>
            <button
              onClick={() => {
                onPageChange('profile');
                setIsMenuOpen(false);
              }}
              className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50"
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </button>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5 space-x-3">
              <button className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600">
                Login
              </button>
              <button className="w-full px-3 py-2 bg-red-600 text-white text-base font-medium rounded-lg hover:bg-red-700 transition-colors">
                Sign Up Free
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}