import { useState, useCallback } from 'react';
import { DrawingElement } from '../types/drawing';

export function useDrawingHistory() {
  const [history, setHistory] = useState<DrawingElement[][]>([[]]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentElements = history[currentIndex] || [];

  const addToHistory = useCallback((elements: DrawingElement[]) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push([...elements]);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  }, [history, currentIndex]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, history.length]);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  const clearHistory = useCallback(() => {
    setHistory([[]]);
    setCurrentIndex(0);
  }, []);

  return {
    elements: currentElements,
    addToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory
  };
}