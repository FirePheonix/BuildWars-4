import { GAME_CONFIG, COLORS, DIRECTIONS } from './constants';
import { MazeUtils, Position } from './maze';

export class Pacman {
  x: number;
  y: number;
  direction: Position;
  nextDirection: Position;
  animationFrame: number;
  mouthOpen: boolean;

  constructor(startX: number, startY: number) {
    this.x = startX;
    this.y = startY;
    this.direction = { x: 0, y: 0 };
    this.nextDirection = { x: 0, y: 0 };
    this.animationFrame = 0;
    this.mouthOpen = true;
  }

  update(): void {
    // Try to change direction if requested
    if (this.nextDirection.x !== 0 || this.nextDirection.y !== 0) {
      const nextX = this.x + this.nextDirection.x * GAME_CONFIG.PACMAN_SPEED;
      const nextY = this.y + this.nextDirection.y * GAME_CONFIG.PACMAN_SPEED;
      
      if (MazeUtils.canMoveTo(nextX, nextY, GAME_CONFIG.PACMAN_RADIUS)) {
        this.direction = { ...this.nextDirection };
        this.nextDirection = { x: 0, y: 0 };
      }
    }

    // Move in current direction
    const nextX = this.x + this.direction.x * GAME_CONFIG.PACMAN_SPEED;
    const nextY = this.y + this.direction.y * GAME_CONFIG.PACMAN_SPEED;

    if (MazeUtils.canMoveTo(nextX, nextY, GAME_CONFIG.PACMAN_RADIUS)) {
      this.x = nextX;
      this.y = nextY;
    } else {
      this.direction = { x: 0, y: 0 };
    }

    // Handle screen wrapping
    if (this.x < -GAME_CONFIG.PACMAN_RADIUS) {
      this.x = GAME_CONFIG.CANVAS_WIDTH + GAME_CONFIG.PACMAN_RADIUS;
    } else if (this.x > GAME_CONFIG.CANVAS_WIDTH + GAME_CONFIG.PACMAN_RADIUS) {
      this.x = -GAME_CONFIG.PACMAN_RADIUS;
    }

    // Animation
    this.animationFrame = (this.animationFrame + 1) % 20;
    if (this.animationFrame % 10 === 0) {
      this.mouthOpen = !this.mouthOpen;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = COLORS.PACMAN;
    ctx.beginPath();

    if (this.mouthOpen && (this.direction.x !== 0 || this.direction.y !== 0)) {
      // Calculate mouth angle based on direction
      let startAngle = 0.2 * Math.PI;
      let endAngle = 1.8 * Math.PI;

      if (this.direction.x > 0) { // Right
        startAngle = 0.2 * Math.PI;
        endAngle = 1.8 * Math.PI;
      } else if (this.direction.x < 0) { // Left
        startAngle = 1.2 * Math.PI;
        endAngle = 0.8 * Math.PI;
      } else if (this.direction.y > 0) { // Down
        startAngle = 1.7 * Math.PI;
        endAngle = 1.3 * Math.PI;
      } else if (this.direction.y < 0) { // Up
        startAngle = 0.7 * Math.PI;
        endAngle = 0.3 * Math.PI;
      }

      ctx.arc(this.x, this.y, GAME_CONFIG.PACMAN_RADIUS, startAngle, endAngle);
      ctx.lineTo(this.x, this.y);
    } else {
      ctx.arc(this.x, this.y, GAME_CONFIG.PACMAN_RADIUS, 0, 2 * Math.PI);
    }
    
    ctx.fill();

    // Add a subtle glow effect
    ctx.shadowColor = COLORS.PACMAN;
    ctx.shadowBlur = 5;
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  setNextDirection(direction: Position): void {
    this.nextDirection = { ...direction };
  }

  getBounds() {
    return {
      x: this.x - GAME_CONFIG.PACMAN_RADIUS,
      y: this.y - GAME_CONFIG.PACMAN_RADIUS,
      width: GAME_CONFIG.PACMAN_RADIUS * 2,
      height: GAME_CONFIG.PACMAN_RADIUS * 2,
    };
  }
}

export class Ghost {
  x: number;
  y: number;
  direction: Position;
  color: string;
  animationFrame: number;
  target: Position;
  mode: 'chase' | 'scatter';
  modeTimer: number;

  constructor(startX: number, startY: number, color: string) {
    this.x = startX;
    this.y = startY;
    this.direction = this.getRandomDirection();
    this.color = color;
    this.animationFrame = 0;
    this.target = { x: 0, y: 0 };
    this.mode = 'chase';
    this.modeTimer = 0;
  }

  private getRandomDirection(): Position {
    const directions = [DIRECTIONS.UP, DIRECTIONS.DOWN, DIRECTIONS.LEFT, DIRECTIONS.RIGHT];
    return directions[Math.floor(Math.random() * directions.length)];
  }

  private getValidDirections(): Position[] {
    const directions = [DIRECTIONS.UP, DIRECTIONS.DOWN, DIRECTIONS.LEFT, DIRECTIONS.RIGHT];
    return directions.filter(dir => {
      const nextX = this.x + dir.x * GAME_CONFIG.GHOST_SPEED;
      const nextY = this.y + dir.y * GAME_CONFIG.GHOST_SPEED;
      return MazeUtils.canMoveTo(nextX, nextY, GAME_CONFIG.GHOST_RADIUS);
    });
  }

  private getOppositeDirection(direction: Position): Position {
    return { x: -direction.x, y: -direction.y };
  }

  private chooseDirection(pacman: Pacman): Position {
    const validDirections = this.getValidDirections();
    if (validDirections.length === 0) return this.direction;

    // Remove reverse direction unless it's the only option
    const opposite = this.getOppositeDirection(this.direction);
    const nonReverseDirections = validDirections.filter(dir => 
      !(dir.x === opposite.x && dir.y === opposite.y)
    );
    
    const directionsToConsider = nonReverseDirections.length > 0 ? nonReverseDirections : validDirections;

    if (this.mode === 'chase') {
      // Chase mode: move towards Pacman
      let bestDirection = directionsToConsider[0];
      let shortestDistance = Infinity;

      for (const dir of directionsToConsider) {
        const nextX = this.x + dir.x * GAME_CONFIG.GHOST_SPEED;
        const nextY = this.y + dir.y * GAME_CONFIG.GHOST_SPEED;
        const distance = Math.sqrt((nextX - pacman.x) ** 2 + (nextY - pacman.y) ** 2);
        
        if (distance < shortestDistance) {
          shortestDistance = distance;
          bestDirection = dir;
        }
      }
      
      return bestDirection;
    } else {
      // Scatter mode: move randomly but prefer current direction
      const currentDirectionValid = directionsToConsider.some(dir => 
        dir.x === this.direction.x && dir.y === this.direction.y
      );
      
      if (currentDirectionValid && Math.random() < 0.8) {
        return this.direction;
      } else {
        return directionsToConsider[Math.floor(Math.random() * directionsToConsider.length)];
      }
    }
  }

  update(pacman: Pacman): void {
    // Mode switching
    this.modeTimer++;
    if (this.modeTimer > 600) { // 10 seconds at 60fps
      this.mode = this.mode === 'chase' ? 'scatter' : 'chase';
      this.modeTimer = 0;
    }

    // At intersections or when stuck, choose new direction
    const validDirections = this.getValidDirections();
    if (validDirections.length > 2 || validDirections.length === 1) {
      this.direction = this.chooseDirection(pacman);
    }

    // Move
    const nextX = this.x + this.direction.x * GAME_CONFIG.GHOST_SPEED;
    const nextY = this.y + this.direction.y * GAME_CONFIG.GHOST_SPEED;

    if (MazeUtils.canMoveTo(nextX, nextY, GAME_CONFIG.GHOST_RADIUS)) {
      this.x = nextX;
      this.y = nextY;
    } else {
      this.direction = this.chooseDirection(pacman);
    }

    // Handle screen wrapping
    if (this.x < -GAME_CONFIG.GHOST_RADIUS) {
      this.x = GAME_CONFIG.CANVAS_WIDTH + GAME_CONFIG.GHOST_RADIUS;
    } else if (this.x > GAME_CONFIG.CANVAS_WIDTH + GAME_CONFIG.GHOST_RADIUS) {
      this.x = -GAME_CONFIG.GHOST_RADIUS;
    }

    this.animationFrame = (this.animationFrame + 1) % 60;
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    
    // Body
    ctx.beginPath();
    ctx.arc(this.x, this.y - 2, GAME_CONFIG.GHOST_RADIUS, Math.PI, 0);
    ctx.rect(this.x - GAME_CONFIG.GHOST_RADIUS, this.y - 2, 
             GAME_CONFIG.GHOST_RADIUS * 2, GAME_CONFIG.GHOST_RADIUS + 2);
    ctx.fill();

    // Bottom wavy part
    ctx.beginPath();
    const waveY = this.y + GAME_CONFIG.GHOST_RADIUS;
    const waveOffset = Math.sin(this.animationFrame * 0.1) * 2;
    
    ctx.moveTo(this.x - GAME_CONFIG.GHOST_RADIUS, waveY);
    for (let i = 0; i <= 4; i++) {
      const waveX = this.x - GAME_CONFIG.GHOST_RADIUS + (i * GAME_CONFIG.GHOST_RADIUS / 2);
      const offsetY = i % 2 === 0 ? waveOffset : -waveOffset;
      ctx.lineTo(waveX, waveY + offsetY);
    }
    ctx.lineTo(this.x - GAME_CONFIG.GHOST_RADIUS, waveY);
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(this.x - 6, this.y - 8, 4, 6);
    ctx.fillRect(this.x + 2, this.y - 8, 4, 6);

    ctx.fillStyle = '#000000';
    ctx.fillRect(this.x - 5, this.y - 7, 2, 3);
    ctx.fillRect(this.x + 3, this.y - 7, 2, 3);

    // Add glow effect
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 3;
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  getBounds() {
    return {
      x: this.x - GAME_CONFIG.GHOST_RADIUS,
      y: this.y - GAME_CONFIG.GHOST_RADIUS,
      width: GAME_CONFIG.GHOST_RADIUS * 2,
      height: GAME_CONFIG.GHOST_RADIUS * 2,
    };
  }

  checkCollision(pacman: Pacman): boolean {
    const distance = Math.sqrt((this.x - pacman.x) ** 2 + (this.y - pacman.y) ** 2);
    return distance < GAME_CONFIG.GHOST_RADIUS + GAME_CONFIG.PACMAN_RADIUS - 2;
  }
}