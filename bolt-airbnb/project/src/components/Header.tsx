import { Search, Menu, User, Globe } from 'lucide-react';

interface HeaderProps {
  onSearch: () => void;
}

export default function Header({ onSearch }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 cursor-pointer">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">staybnb</span>
              </div>
            </div>
          </div>

          <div
            onClick={onSearch}
            className="hidden md:flex items-center space-x-2 border border-gray-300 rounded-full px-6 py-2.5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <span className="text-sm font-medium text-gray-700">Anywhere</span>
            <div className="w-px h-6 bg-gray-300"></div>
            <span className="text-sm font-medium text-gray-700">Any week</span>
            <div className="w-px h-6 bg-gray-300"></div>
            <span className="text-sm text-gray-500">Add guests</span>
            <div className="bg-rose-500 p-2 rounded-full">
              <Search className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="hidden md:block text-sm font-medium text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full transition-colors">
              Become a Host
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Globe className="w-5 h-5 text-gray-700" />
            </button>
            <div className="flex items-center space-x-2 border border-gray-300 rounded-full px-3 py-2 hover:shadow-md transition-shadow cursor-pointer">
              <Menu className="w-4 h-4 text-gray-700" />
              <div className="bg-gray-700 p-1.5 rounded-full">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
