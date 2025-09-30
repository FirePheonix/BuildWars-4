import React from 'react';
import { Check, Flame, Trash2, Calendar } from 'lucide-react';
import { Habit } from '../types/habit';

interface HabitCardProps {
  habit: Habit;
  onToggle: (habitId: string) => void;
  onDelete: (habitId: string) => void;
  today: string;
}

const categoryIcons = {
  Health: '🏥',
  Fitness: '💪',
  Productivity: '⚡',
  Learning: '📚',
  Mindfulness: '🧘',
  Social: '👥'
};

const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggle, onDelete, today }) => {
  const isCompletedToday = habit.completions[today] || false;
  
  // Get last 7 days for mini calendar
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const last7Days = getLast7Days();
  const completedThisWeek = last7Days.filter(date => habit.completions[date]).length;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-4 h-4 rounded-full" 
            style={{ backgroundColor: habit.color }}
          />
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{habit.name}</h3>
            {habit.description && (
              <p className="text-sm text-gray-600 mt-1">{habit.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xl">{categoryIcons[habit.category]}</span>
          <button
            onClick={() => onDelete(habit.id)}
            className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>

      {/* Progress indicators */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-600">
              {habit.currentStreak} day streak
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Best: {habit.longestStreak}
          </div>
        </div>
        <div className="text-sm text-gray-600">
          {completedThisWeek}/{habit.targetDays} this week
        </div>
      </div>

      {/* Mini calendar for last 7 days */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-1">
          {last7Days.map((date, index) => {
            const isCompleted = habit.completions[date];
            const isToday = date === today;
            return (
              <div
                key={date}
                className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-medium transition-all duration-200 ${
                  isCompleted
                    ? 'bg-green-100 text-green-700'
                    : isToday
                    ? 'bg-gray-200 text-gray-600'
                    : 'bg-gray-50 text-gray-400'
                } ${isToday ? 'ring-2 ring-blue-300' : ''}`}
              >
                {new Date(date).getDate()}
              </div>
            );
          })}
        </div>
        <div className="text-xs text-gray-500 flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          Last 7 days
        </div>
      </div>

      {/* Completion button */}
      <button
        onClick={() => onToggle(habit.id)}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
          isCompletedToday
            ? 'bg-green-500 text-white shadow-lg shadow-green-200'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <div className="flex items-center justify-center space-x-2">
          {isCompletedToday ? (
            <>
              <Check className="w-5 h-5" />
              <span>Completed Today!</span>
            </>
          ) : (
            <span>Mark as Complete</span>
          )}
        </div>
      </button>
    </div>
  );
};

export default HabitCard;