import React, { useState } from 'react';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import HabitCard from './components/HabitCard';
import AddHabitModal from './components/AddHabitModal';
import { useHabits } from './hooks/useHabits';

function App() {
  const { habits, stats, toggleHabit, addHabit, deleteHabit, getTodayString } = useHabits();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Header onAddHabit={() => setIsAddModalOpen(true)} />
        
        <StatsCard stats={stats} />
        
        {habits.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No habits yet</h3>
            <p className="text-gray-600 mb-6">Start building great habits today!</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200"
            >
              Add Your First Habit
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggle={toggleHabit}
                onDelete={deleteHabit}
                today={getTodayString()}
              />
            ))}
          </div>
        )}
        
        <AddHabitModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={addHabit}
        />
      </div>
    </div>
  );
}

export default App;