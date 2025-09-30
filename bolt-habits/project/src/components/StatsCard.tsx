import React from 'react';
import { TrendingUp, Target, Flame, Calendar } from 'lucide-react';
import { HabitStats } from '../types/habit';

interface StatsCardProps {
  stats: HabitStats;
}

const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Total Habits</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalHabits}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Active Streaks</p>
            <p className="text-2xl font-bold text-gray-900">{stats.activeStreaks}</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <Flame className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Today's Progress</p>
            <p className="text-2xl font-bold text-gray-900">{Math.round(stats.completionRate)}%</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Weekly Progress</p>
            <p className="text-2xl font-bold text-gray-900">{Math.round(stats.weeklyProgress)}%</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;