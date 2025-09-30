import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Problem } from '../types/Problem';
import { Play, RotateCcw } from 'lucide-react';

interface CodeEditorProps {
  problem: Problem;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ problem }) => {
  const [language, setLanguage] = useState<'javascript' | 'python' | 'java'>('javascript');
  const [code, setCode] = useState(problem.starterCode[language]);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleLanguageChange = (newLanguage: 'javascript' | 'python' | 'java') => {
    setLanguage(newLanguage);
    setCode(problem.starterCode[newLanguage]);
    setOutput('');
  };

  const handleReset = () => {
    setCode(problem.starterCode[language]);
    setOutput('');
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Running...');
    
    // Simulate code execution
    setTimeout(() => {
      const firstExample = problem.examples[0];
      const secondExample = problem.examples[1];
      
      setOutput(`Test Case 1: ${firstExample.input}
Expected: ${firstExample.expectedOutput}
Output: ${firstExample.expectedOutput}
Status: Passed

${secondExample ? `Test Case 2: ${secondExample.input}
Expected: ${secondExample.expectedOutput}
Output: ${secondExample.expectedOutput}
Status: Passed` : 'Test Case 2: N/A'}

All test cases passed!`);
      setIsRunning(false);
    }, 1500);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Language:</span>
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value as 'javascript' | 'python' | 'java')}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleReset}
              className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </button>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center space-x-1 px-4 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-green-400 rounded-md transition-colors"
            >
              <Play className="h-4 w-4" />
              <span>{isRunning ? 'Running...' : 'Run'}</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="h-96">
        <Editor
          height="100%"
          language={language === 'javascript' ? 'javascript' : language}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="light"
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible'
            },
            automaticLayout: true
          }}
          loading={<div className="flex items-center justify-center h-full">Loading editor...</div>}
        />
      </div>
      
      {output && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Output:</h4>
          <pre className="text-sm text-gray-600 whitespace-pre-wrap font-mono bg-white p-3 rounded border">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
