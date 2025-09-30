import { useState, useEffect, useMemo } from 'react';
import { Habit, HabitStats } from '../types/habit';

const STORAGE_KEY = 'habit-tracker-data';

const sampleHabits: Habit[] = [
  {
    id: '1',
    name: 'Morning Meditation',
    description: '10 minutes of mindfulness meditation',
    category: 'Mindfulness',
    targetDays: 7,
    currentStreak: 12,
    longestStreak: 23,
    completions: {
      '2025-01-15': true,
      '2025-01-14': true,
      '2025-01-13': true,
      '2025-01-12': false,
      '2025-01-11': true,
      '2025-01-10': true,
      '2025-01-09': true,
      '2025-01-08': true,
    },
    createdAt: '2024-12-01',
    color: '#8B5CF6'
  },
  {
    id: '2',
    name: 'Read for 30 min',
    description: 'Daily reading habit',
    category: 'Learning',
    targetDays: 5,
    currentStreak: 8,
    longestStreak: 15,
    completions: {
      '2025-01-15': true,
      '2025-01-14': true,
      '2025-01-13': false,
      '2025-01-12': true,
      '2025-01-11': true,
      '2025-01-10': false,
      '2025-01-09': true,
      '2025-01-08': true,
    },
    createdAt: '2024-11-15',
    color: '#3B82F6'
  },
  {
    id: '3',
    name: 'Exercise',
    description: '45 minutes workout',
    category: 'Fitness',
    targetDays: 4,
    currentStreak: 3,
    longestStreak: 28,
    completions: {
      '2025-01-15': false,
      '2025-01-14': true,
      '2025-01-13': true,
      '2025-01-12': true,
      '2025-01-11': false,
      '2025-01-10': false,
      '2025-01-09': true,
      '2025-01-08': false,
    },
    createdAt: '2024-10-01',
    color: '#10B981'
  },
  {
    id: '4',
    name: 'Drink 8 glasses of water',
    description: 'Stay hydrated throughout the day',
    category: 'Health',
    targetDays: 7,
    currentStreak: 5,
    longestStreak: 45,
    completions: {
      '2025-01-15': true,
      '2025-01-14': true,
      '2025-01-13': true,
      '2025-01-12': true,
      '2025-01-11': true,
      '2025-01-10': false,
      '2025-01-09': true,
      '2025-01-08': true,
    },
    createdAt: '2024-09-01',
    color: '#06B6D4'
  }
];

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHabits(JSON.parse(stored));
      } catch {
        setHabits(sampleHabits);
      }
    } else {
      setHabits(sampleHabits);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  const getTodayString = () => {
    return new Date().toISOString().split('T')[0];
  };

  const toggleHabit = (habitId: string) => {
    const today = getTodayString();
    setHabits(prevHabits => 
      prevHabits.map(habit => {
        if (habit.id === habitId) {
          const newCompletions = { ...habit.completions };
          const isCompleted = newCompletions[today];
          newCompletions[today] = !isCompleted;

          // Recalculate current streak
          let currentStreak = 0;
          const dates = Object.keys(newCompletions).sort().reverse();
          
          for (const date of dates) {
            if (newCompletions[date]) {
              currentStreak++;
            } else {
              break;
            }
          }

          return {
            ...habit,
            completions: newCompletions,
            currentStreak,
            longestStreak: Math.max(habit.longestStreak, currentStreak)
          };
        }
        return habit;
      })
    );
  };

  const addHabit = (newHabit: Omit<Habit, 'id' | 'currentStreak' | 'longestStreak' | 'completions'>) => {
    const habit: Habit = {
      ...newHabit,
      id: Date.now().toString(),
      currentStreak: 0,
      longestStreak: 0,
      completions: {}
    };
    setHabits(prev => [...prev, habit]);
  };

  const deleteHabit = (habitId: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== habitId));
  };

  const stats: HabitStats = useMemo(() => {
    const today = getTodayString();
    const totalHabits = habits.length;
    const activeStreaks = habits.filter(habit => habit.currentStreak > 0).length;
    const completedToday = habits.filter(habit => habit.completions[today]).length;
    const completionRate = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;
    
    // Calculate weekly progress
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    let weeklyCompletions = 0;
    let weeklyTargets = 0;
    
    habits.forEach(habit => {
      dates.forEach(date => {
        weeklyTargets++;
        if (habit.completions[date]) {
          weeklyCompletions++;
        }
      });
    });
    
    const weeklyProgress = weeklyTargets > 0 ? (weeklyCompletions / weeklyTargets) * 100 : 0;
    
    return {
      totalHabits,
      activeStreaks,
      completionRate,
      weeklyProgress
    };
  }, [habits]);

  return {
    habits,
    stats,
    toggleHabit,
    addHabit,
    deleteHabit,
    getTodayString
  };
};