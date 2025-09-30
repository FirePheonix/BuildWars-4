import React from 'react';
import { Link } from 'react-router-dom';
import { Problem } from '../types/Problem';
import DifficultyBadge from './DifficultyBadge';
import { CheckCircle, Clock } from 'lucide-react';

interface ProblemCardProps {
  problem: Problem;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => {
  return (
    <Link 
      to={`/problem/${problem.id}`}
      className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-sm text-gray-500">#{problem.id}</span>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
              {problem.title}
            </h3>
          </div>
          <DifficultyBadge difficulty={problem.difficulty} />
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <Clock className="h-4 w-4" />
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {problem.description.substring(0, 120)}...
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {problem.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
            >
              {tag}
            </span>
          ))}
          {problem.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{problem.tags.length - 3} more</span>
          )}
        </div>
        
        <div className="text-sm text-gray-500">
          {problem.acceptance.toFixed(1)}% acceptance
        </div>
      </div>
    </Link>
  );
};

export default ProblemCard;
