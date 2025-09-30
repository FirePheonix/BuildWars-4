import React from 'react';
import { Plus, Target } from 'lucide-react';

interface HeaderProps {
  onAddHabit: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddHabit }) => {
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Habit Tracker</h1>
        </div>
        <p className="text-gray-600">{dateString}</p>
      </div>
      
      <button
        onClick={onAddHabit}
        className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center space-x-2 shadow-lg hover:shadow-xl"
      >
        <Plus className="w-5 h-5" />
        <span>Add Habit</span>
      </button>
    </div>
  );
};

export default Header;