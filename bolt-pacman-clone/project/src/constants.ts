export const GAME_CONFIG = {
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,
  CELL_SIZE: 20,
  MAZE_WIDTH: 40,
  MAZE_HEIGHT: 30,
  PACMAN_SPEED: 2,
  GHOST_SPEED: 1.5,
  DOT_RADIUS: 2,
  PACMAN_RADIUS: 8,
  GHOST_RADIUS: 8,
};

export const COLORS = {
  WALL: '#0000FF',
  DOT: '#FFFF00',
  PACMAN: '#FFFF00',
  GHOST_RED: '#FF0000',
  GHOST_PINK: '#FFB8FF',
  GHOST_CYAN: '#00FFFF',
  GHOST_ORANGE: '#FFB852',
  BACKGROUND: '#000000',
  TEXT: '#FFFFFF',
};

export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

export const KEYS = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  W: 'KeyW',
  S: 'KeyS',
  A: 'KeyA',
  D: 'KeyD',
};