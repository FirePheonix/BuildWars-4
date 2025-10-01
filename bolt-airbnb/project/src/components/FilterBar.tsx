import { SlidersHorizontal } from 'lucide-react';

const categories = [
  { name: 'Beachfront', emoji: '🏖️' },
  { name: 'Villas', emoji: '🏰' },
  { name: 'Cabins', emoji: '🏡' },
  { name: 'Trending', emoji: '🔥' },
  { name: 'Mountains', emoji: '⛰️' },
  { name: 'Unique', emoji: '✨' },
  { name: 'Countryside', emoji: '🌾' },
  { name: 'Lakefront', emoji: '🏞️' },
  { name: 'Design', emoji: '🎨' },
  { name: 'Luxury', emoji: '💎' },
];

export default function FilterBar() {
  return (
    <div className="border-b border-gray-200 bg-white sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.name}
                className="flex flex-col items-center space-y-2 group cursor-pointer flex-shrink-0"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {category.emoji}
                </span>
                <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900 transition-colors whitespace-nowrap">
                  {category.name}
                </span>
                <div className="h-0.5 w-full bg-transparent group-hover:bg-gray-900 transition-colors"></div>
              </button>
            ))}
          </div>

          <button className="ml-6 flex items-center space-x-2 border border-gray-300 rounded-lg px-4 py-2 hover:border-gray-400 transition-colors flex-shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
}
