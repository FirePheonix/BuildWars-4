import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Point, DrawingElement, CanvasState, Tool } from '../types/drawing';

interface CanvasProps {
  elements: DrawingElement[];
  onAddElement: (element: DrawingElement) => void;
  onUpdateElement: (id: string, updates: Partial<DrawingElement>) => void;
  currentTool: Tool;
  currentColor: string;
  currentStrokeWidth: number;
  currentOpacity: number;
  canvasState: CanvasState;
  onCanvasStateChange: (state: CanvasState) => void;
}

export default function Canvas({
  elements,
  onAddElement,
  currentTool,
  currentColor,
  currentStrokeWidth,
  currentOpacity,
  canvasState,
  onCanvasStateChange
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentElement, setCurrentElement] = useState<DrawingElement | null>(null);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState<Point | null>(null);

  const getCanvasPoint = useCallback((clientX: number, clientY: number): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left - canvasState.offsetX) / canvasState.scale,
      y: (clientY - rect.top - canvasState.offsetY) / canvasState.scale
    };
  }, [canvasState]);

  const drawElement = useCallback((ctx: CanvasRenderingContext2D, element: DrawingElement) => {
    if (!element.visible) return;

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
  }, []);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvasState.offsetX, canvasState.offsetY);
    ctx.scale(canvasState.scale, canvasState.scale);

    // Draw grid
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 1 / canvasState.scale;
    const gridSize = 20;
    const startX = Math.floor(-canvasState.offsetX / canvasState.scale / gridSize) * gridSize;
    const startY = Math.floor(-canvasState.offsetY / canvasState.scale / gridSize) * gridSize;
    const endX = startX + (canvas.width / canvasState.scale) + gridSize;
    const endY = startY + (canvas.height / canvasState.scale) + gridSize;

    ctx.beginPath();
    for (let x = startX; x < endX; x += gridSize) {
      ctx.moveTo(x, startY);
      ctx.lineTo(x, endY);
    }
    for (let y = startY; y < endY; y += gridSize) {
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
    }
    ctx.stroke();

    // Draw all elements
    elements.forEach(element => drawElement(ctx, element));
    
    // Draw current element if drawing
    if (currentElement) {
      drawElement(ctx, currentElement);
    }

    ctx.restore();
  }, [elements, currentElement, canvasState, drawElement]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      redraw();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [redraw]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (currentTool === 'pan') {
      setIsPanning(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
      return;
    }

    const point = getCanvasPoint(e.clientX, e.clientY);
    setIsDrawing(true);
    setStartPoint(point);

    const newElement: DrawingElement = {
      id: `element-${Date.now()}-${Math.random()}`,
      type: currentTool === 'pen' ? 'freehand' : currentTool,
      points: currentTool === 'pen' ? [point] : [],
      color: currentColor,
      strokeWidth: currentStrokeWidth,
      opacity: currentOpacity,
      visible: true,
      startPoint: currentTool !== 'pen' ? point : undefined
    };

    setCurrentElement(newElement);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning && lastPanPoint) {
      const deltaX = e.clientX - lastPanPoint.x;
      const deltaY = e.clientY - lastPanPoint.y;
      onCanvasStateChange({
        ...canvasState,
        offsetX: canvasState.offsetX + deltaX,
        offsetY: canvasState.offsetY + deltaY
      });
      setLastPanPoint({ x: e.clientX, y: e.clientY });
      return;
    }

    if (!isDrawing || !currentElement || !startPoint) return;

    const point = getCanvasPoint(e.clientX, e.clientY);

    if (currentTool === 'pen') {
      setCurrentElement({
        ...currentElement,
        points: [...currentElement.points, point]
      });
    } else {
      const width = point.x - startPoint.x;
      const height = point.y - startPoint.y;
      setCurrentElement({
        ...currentElement,
        endPoint: point,
        width,
        height
      });
    }
  };

  const handleMouseUp = () => {
    if (isPanning) {
      setIsPanning(false);
      setLastPanPoint(null);
      return;
    }

    if (isDrawing && currentElement) {
      onAddElement(currentElement);
      setCurrentElement(null);
    }
    setIsDrawing(false);
    setStartPoint(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.1, Math.min(5, canvasState.scale * delta));
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const newOffsetX = mouseX - (mouseX - canvasState.offsetX) * (newScale / canvasState.scale);
    const newOffsetY = mouseY - (mouseY - canvasState.offsetY) * (newScale / canvasState.scale);
    
    onCanvasStateChange({
      scale: newScale,
      offsetX: newOffsetX,
      offsetY: newOffsetY
    });
  };

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full bg-gray-900 cursor-crosshair"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      style={{ cursor: currentTool === 'pan' ? 'grab' : 'crosshair' }}
    />
  );
}