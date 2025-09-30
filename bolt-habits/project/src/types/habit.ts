export interface Habit {
  id: string;
  name: string;
  description?: string;
  category: 'Health' | 'Fitness' | 'Productivity' | 'Learning' | 'Mindfulness' | 'Social';
  targetDays: number; // days per week
  currentStreak: number;
  longestStreak: number;
  completions: { [date: string]: boolean }; // YYYY-MM-DD format
  createdAt: string;
  color: string;
}

export interface HabitStats {
  totalHabits: number;
  activeStreaks: number;
  completionRate: number;
  weeklyProgress: number;
}