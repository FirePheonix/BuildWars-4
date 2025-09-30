import React from 'react';
import { Pen, Square, Circle, Minus, ArrowRight, Hand, RotateCcw, RotateCw, Trash2, Download } from 'lucide-react';
import { Tool } from '../types/drawing';

interface ToolbarProps {
  currentTool: Tool;
  onToolChange: (tool: Tool) => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onExport: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const tools: { id: Tool; icon: React.ReactNode; label: string }[] = [
  { id: 'pen', icon: <Pen size={18} />, label: 'Pen' },
  { id: 'rectangle', icon: <Square size={18} />, label: 'Rectangle' },
  { id: 'circle', icon: <Circle size={18} />, label: 'Circle' },
  { id: 'line', icon: <Minus size={18} />, label: 'Line' },
  { id: 'arrow', icon: <ArrowRight size={18} />, label: 'Arrow' },
  { id: 'pan', icon: <Hand size={18} />, label: 'Pan' },
];

export default function Toolbar({
  currentTool,
  onToolChange,
  onUndo,
  onRedo,
  onClear,
  onExport,
  canUndo,
  canRedo
}: ToolbarProps) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-lg shadow-2xl border border-gray-700 p-2 flex items-center gap-2 z-50">
      <div className="flex items-center gap-1">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onToolChange(tool.id)}
            className={`
              p-2 rounded-md transition-all duration-200 flex items-center justify-center
              ${currentTool === tool.id 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }
            `}
            title={tool.label}
          >
            {tool.icon}
          </button>
        ))}
      </div>

      <div className="w-px h-6 bg-gray-600 mx-1" />

      <div className="flex items-center gap-1">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`
            p-2 rounded-md transition-all duration-200 flex items-center justify-center
            ${canUndo 
              ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
              : 'text-gray-500 cursor-not-allowed'
            }
          `}
          title="Undo"
        >
          <RotateCcw size={18} />
        </button>
        
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`
            p-2 rounded-md transition-all duration-200 flex items-center justify-center
            ${canRedo 
              ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
              : 'text-gray-500 cursor-not-allowed'
            }
          `}
          title="Redo"
        >
          <RotateCw size={18} />
        </button>
      </div>

      <div className="w-px h-6 bg-gray-600 mx-1" />

      <div className="flex items-center gap-1">
        <button
          onClick={onClear}
          className="p-2 rounded-md text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all duration-200 flex items-center justify-center"
          title="Clear Canvas"
        >
          <Trash2 size={18} />
        </button>
        
        <button
          onClick={onExport}
          className="p-2 rounded-md text-green-400 hover:bg-green-900/20 hover:text-green-300 transition-all duration-200 flex items-center justify-center"
          title="Export"
        >
          <Download size={18} />
        </button>
      </div>
    </div>
  );
}