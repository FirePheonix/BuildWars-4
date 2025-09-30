import React, { useState, useCallback } from 'react';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import PropertiesPanel from './components/PropertiesPanel';
import { DrawingElement, CanvasState, Tool } from './types/drawing';
import { useDrawingHistory } from './hooks/useDrawingHistory';

function App() {
  const { elements, addToHistory, undo, redo, canUndo, canRedo, clearHistory } = useDrawingHistory();
  const [currentTool, setCurrentTool] = useState<Tool>('pen');
  const [currentColor, setCurrentColor] = useState('#ffffff');
  const [currentStrokeWidth, setCurrentStrokeWidth] = useState(3);
  const [currentOpacity, setCurrentOpacity] = useState(1);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    scale: 1,
    offsetX: 0,
    offsetY: 0
  });

  const handleAddElement = useCallback((element: DrawingElement) => {
    const newElements = [...elements, element];
    addToHistory(newElements);
  }, [elements, addToHistory]);

  const handleUpdateElement = useCallback((id: string, updates: Partial<DrawingElement>) => {
    const newElements = elements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    );
    addToHistory(newElements);
  }, [elements, addToHistory]);

  const handleElementVisibilityToggle = useCallback((id: string) => {
    const newElements = elements.map(el => 
      el.id === id ? { ...el, visible: !el.visible } : el
    );
    addToHistory(newElements);
  }, [elements, addToHistory]);

  const handleElementDelete = useCallback((id: string) => {
    const newElements = elements.filter(el => el.id !== id);
    addToHistory(newElements);
  }, [elements, addToHistory]);

  const handleClear = useCallback(() => {
    clearHistory();
  }, [clearHistory]);

  const handleExport = useCallback(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 1920;
    canvas.height = 1080;

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw all visible elements
    elements.filter(el => el.visible).forEach(element => {
      ctx.save();
      ctx.globalAlpha = element.opacity;
      ctx.strokeStyle = element.color;
      ctx.lineWidth = element.strokeWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      switch (element.type) {
        case 'freehand':
          if (element.points.length > 1) {
            ctx.beginPath();
            ctx.moveTo(element.points[0].x, element.points[0].y);
            for (let i = 1; i < element.points.length; i++) {
              ctx.lineTo(element.points[i].x, element.points[i].y);
            }
            ctx.stroke();
          }
          break;
        
        case 'rectangle':
          if (element.startPoint && element.width && element.height) {
            ctx.beginPath();
            ctx.rect(element.startPoint.x, element.startPoint.y, element.width, element.height);
            ctx.stroke();
          }
          break;
        
        case 'circle':
          if (element.startPoint && element.width && element.height) {
            const centerX = element.startPoint.x + element.width / 2;
            const centerY = element.startPoint.y + element.height / 2;
            const radius = Math.min(Math.abs(element.width), Math.abs(element.height)) / 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.stroke();
          }
          break;
        
        case 'line':
          if (element.startPoint && element.endPoint) {
            ctx.beginPath();
            ctx.moveTo(element.startPoint.x, element.startPoint.y);
            ctx.lineTo(element.endPoint.x, element.endPoint.y);
            ctx.stroke();
          }
          break;
        
        case 'arrow':
          if (element.startPoint && element.endPoint) {
            const start = element.startPoint;
            const end = element.endPoint;
            const headLength = 15;
            const angle = Math.atan2(end.y - start.y, end.x - start.x);
            
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(end.x, end.y);
            ctx.lineTo(
              end.x - headLength * Math.cos(angle - Math.PI / 6),
              end.y - headLength * Math.sin(angle - Math.PI / 6)
            );
            ctx.moveTo(end.x, end.y);
            ctx.lineTo(
              end.x - headLength * Math.cos(angle + Math.PI / 6),
              end.y - headLength * Math.sin(angle + Math.PI / 6)
            );
            ctx.stroke();
          }
          break;
      }
      
      ctx.restore();
    });

    // Download the canvas as PNG
    const link = document.createElement('a');
    link.download = `drawing-${new Date().toISOString().split('T')[0]}.png`;
    link.href = canvas.toDataURL();
    link.click();
  }, [elements]);

  return (
    <div className="w-screen h-screen bg-gray-900 overflow-hidden relative">
      <Canvas
        elements={elements}
        onAddElement={handleAddElement}
        onUpdateElement={handleUpdateElement}
        currentTool={currentTool}
        currentColor={currentColor}
        currentStrokeWidth={currentStrokeWidth}
        currentOpacity={currentOpacity}
        canvasState={canvasState}
        onCanvasStateChange={setCanvasState}
      />
      
      <Toolbar
        currentTool={currentTool}
        onToolChange={setCurrentTool}
        onUndo={undo}
        onRedo={redo}
        onClear={handleClear}
        onExport={handleExport}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      
      <PropertiesPanel
        currentColor={currentColor}
        currentStrokeWidth={currentStrokeWidth}
        currentOpacity={currentOpacity}
        onColorChange={setCurrentColor}
        onStrokeWidthChange={setCurrentStrokeWidth}
        onOpacityChange={setCurrentOpacity}
        elements={elements}
        onElementVisibilityToggle={handleElementVisibilityToggle}
        onElementDelete={handleElementDelete}
      />

      {/* Info Panel */}
      <div className="fixed bottom-4 left-4 bg-gray-800 rounded-lg p-3 text-gray-300 text-sm border border-gray-700">
        <div className="flex items-center gap-4">
          <span>Zoom: {Math.round(canvasState.scale * 100)}%</span>
          <span>Elements: {elements.length}</span>
          <span className="text-xs text-gray-400">Scroll to zoom, drag to pan</span>
        </div>
      </div>
    </div>
  );
}

export default App;