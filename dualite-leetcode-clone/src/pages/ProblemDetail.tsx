import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { problems } from '../data/problems';
import DifficultyBadge from '../components/DifficultyBadge';
import CodeEditor from '../components/CodeEditor';
import { ArrowLeft, BookOpen, Code, Lightbulb, CheckCircle } from 'lucide-react';

const ProblemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const problem = problems.find(p => p.id === Number(id));
  const [activeTab, setActiveTab] = useState<'description' | 'solution'>('description');

  if (!problem) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Problem not found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
            ← Back to problems
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to problems</span>
        </Link>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-sm text-gray-500">#{problem.id}</span>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{problem.title}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <DifficultyBadge difficulty={problem.difficulty} />
              <div className="text-sm text-gray-500">
                {problem.acceptance.toFixed(1)}% acceptance • {problem.submissions.toLocaleString()} submissions
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Problem Description */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'description'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Description</span>
                  </div>
                </button>
                {problem.solution && (
                  <button
                    onClick={() => setActiveTab('solution')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'solution'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="h-4 w-4" />
                      <span>Solution</span>
                    </div>
                  </button>
                )}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'description' ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Problem Statement</h3>
                    <div className="prose text-gray-700 whitespace-pre-line">
                      {problem.description}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Examples</h3>
                    <div className="space-y-4">
                      {problem.examples.map((example, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="font-medium text-gray-900 mb-2">Example {index + 1}:</div>
                          <div className="font-mono text-sm space-y-1">
                            <div><span className="font-semibold">Input:</span> {example.input}</div>
                            <div><span className="font-semibold">Output:</span> {example.expectedOutput}</div>
                            {example.explanation && (
                              <div><span className="font-semibold">Explanation:</span> {example.explanation}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Constraints</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {problem.constraints.map((constraint, index) => (
                        <li key={index} className="font-mono text-sm">{constraint}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {problem.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : problem.solution && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Solution Explanation</h3>
                    <div className="prose text-gray-700">
                      {problem.solution.explanation}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Solution Code</h3>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm">
                        <code>{problem.solution.code}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Code className="h-5 w-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">Code Editor</h3>
            </div>
            <CodeEditor problem={problem} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
