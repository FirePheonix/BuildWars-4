export interface Point {
  x: number;
  y: number;
}

export interface DrawingElement {
  id: string;
  type: 'freehand' | 'rectangle' | 'circle' | 'line' | 'arrow';
  points: Point[];
  color: string;
  strokeWidth: number;
  opacity: number;
  visible: boolean;
  startPoint?: Point;
  endPoint?: Point;
  width?: number;
  height?: number;
}

export interface CanvasState {
  scale: number;
  offsetX: number;
  offsetY: number;
}

export type Tool = 'pen' | 'rectangle' | 'circle' | 'line' | 'arrow' | 'pan';