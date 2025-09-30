import React from 'react';
import { Palette, Eye, EyeOff } from 'lucide-react';
import { DrawingElement } from '../types/drawing';

interface PropertiesPanelProps {
  currentColor: string;
  currentStrokeWidth: number;
  currentOpacity: number;
  onColorChange: (color: string) => void;
  onStrokeWidthChange: (width: number) => void;
  onOpacityChange: (opacity: number) => void;
  elements: DrawingElement[];
  onElementVisibilityToggle: (id: string) => void;
  onElementDelete: (id: string) => void;
}

const presetColors = [
  '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff',
  '#ffff00', '#ff00ff', '#00ffff', '#ff8000', '#8000ff',
  '#0080ff', '#80ff00', '#ff0080', '#8080ff', '#ff8080',
  '#80ff80', '#8080ff', '#ffff80', '#ff80ff', '#80ffff'
];

export default function PropertiesPanel({
  currentColor,
  currentStrokeWidth,
  currentOpacity,
  onColorChange,
  onStrokeWidthChange,
  onOpacityChange,
  elements,
  onElementVisibilityToggle,
  onElementDelete
}: PropertiesPanelProps) {
  return (
    <div className="fixed right-4 top-4 w-64 bg-gray-800 rounded-lg shadow-2xl border border-gray-700 p-4 z-40">
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
        <Palette size={18} />
        Properties
      </h3>

      <div className="space-y-4">
        {/* Color Selection */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Color</label>
          <div className="grid grid-cols-5 gap-2 mb-2">
            {presetColors.map((color) => (
              <button
                key={color}
                onClick={() => onColorChange(color)}
                className={`
                  w-8 h-8 rounded-md border-2 transition-all duration-200
                  ${currentColor === color ? 'border-blue-500 scale-110' : 'border-gray-600 hover:border-gray-500'}
                `}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <input
            type="color"
            value={currentColor}
            onChange={(e) => onColorChange(e.target.value)}
            className="w-full h-8 rounded-md bg-transparent border border-gray-600"
          />
        </div>

        {/* Stroke Width */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Brush Size: {currentStrokeWidth}px
          </label>
          <input
            type="range"
            min="1"
            max="50"
            value={currentStrokeWidth}
            onChange={(e) => onStrokeWidthChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Opacity */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Opacity: {Math.round(currentOpacity * 100)}%
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={currentOpacity}
            onChange={(e) => onOpacityChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Layers */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Layers ({elements.length})
          </label>
          <div className="max-h-40 overflow-y-auto space-y-1">
            {elements.slice().reverse().map((element, index) => (
              <div
                key={element.id}
                className="flex items-center justify-between p-2 bg-gray-700 rounded-md"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-sm border border-gray-500"
                    style={{ backgroundColor: element.color }}
                  />
                  <span className="text-gray-300 text-sm capitalize">
                    {element.type} {elements.length - index}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onElementVisibilityToggle(element.id)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    {element.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button
                    onClick={() => onElementDelete(element.id)}
                    className="p-1 text-red-400 hover:text-red-300 transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}