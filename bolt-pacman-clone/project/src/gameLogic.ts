import { Pacman, Ghost } from './entities';
import { MazeUtils } from './maze';
import { COLORS, GAME_CONFIG, DIRECTIONS } from './constants';

export class GameState {
  pacman: Pacman;
  ghosts: Ghost[];
  score: number;
  lives: number;
  gameOver: boolean;
  gameWon: boolean;
  totalDots: number;
  
  constructor() {
    // Find Pacman start position
    const pacmanStart = MazeUtils.findStartPosition(3);
    this.pacman = new Pacman(pacmanStart.x, pacmanStart.y);
    
    // Create ghosts
    this.ghosts = [];
    const ghostColors = [COLORS.GHOST_RED, COLORS.GHOST_PINK, COLORS.GHOST_CYAN, COLORS.GHOST_ORANGE];
    
    for (let i = 0; i < 4; i++) {
      const ghostStart = MazeUtils.findStartPosition(4);
      // Spread ghosts around the start area
      const offsetX = (i % 2) * 40 - 20;
      const offsetY = Math.floor(i / 2) * 40 - 20;
      this.ghosts.push(new Ghost(
        ghostStart.x + offsetX, 
        ghostStart.y + offsetY, 
        ghostColors[i]
      ));
    }
    
    this.score = 0;
    this.lives = 3;
    this.gameOver = false;
    this.gameWon = false;
    this.totalDots = MazeUtils.countDots();
  }

  update(): void {
    if (this.gameOver || this.gameWon) return;

    this.pacman.update();

    // Check dot collection
    if (MazeUtils.isDot(this.pacman.x, this.pacman.y)) {
      MazeUtils.removeDot(this.pacman.x, this.pacman.y);
      this.score += 10;
      
      // Check win condition
      if (MazeUtils.countDots() === 0) {
        this.gameWon = true;
      }
    }

    // Update ghosts
    this.ghosts.forEach(ghost => {
      ghost.update(this.pacman);
      
      // Check collision with Pacman
      if (ghost.checkCollision(this.pacman)) {
        this.lives--;
        if (this.lives <= 0) {
          this.gameOver = true;
        } else {
          // Reset positions
          const pacmanStart = MazeUtils.findStartPosition(3);
          this.pacman.x = pacmanStart.x;
          this.pacman.y = pacmanStart.y;
          this.pacman.direction = { x: 0, y: 0 };
          this.pacman.nextDirection = { x: 0, y: 0 };
        }
      }
    });
  }

  render(ctx: CanvasRenderingContext2D): void {
    // Clear canvas
    ctx.fillStyle = COLORS.BACKGROUND;
    ctx.fillRect(0, 0, GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.CANVAS_HEIGHT);

    // Render maze
    this.renderMaze(ctx);

    // Render dots
    this.renderDots(ctx);

    // Render entities
    this.pacman.render(ctx);
    this.ghosts.forEach(ghost => ghost.render(ctx));

    // Render UI
    this.renderUI(ctx);

    // Render game over/win screen
    if (this.gameOver || this.gameWon) {
      this.renderGameEnd(ctx);
    }
  }

  private renderMaze(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = COLORS.WALL;
    ctx.strokeStyle = '#4444FF';
    ctx.lineWidth = 1;

    for (let y = 0; y < GAME_CONFIG.MAZE_HEIGHT; y++) {
      for (let x = 0; x < GAME_CONFIG.MAZE_WIDTH; x++) {
        if (y < 30 && x < 40) {
          const mazeValue = y < 30 && x < 40 ? (window as any).MAZE_LAYOUT?.[y]?.[x] : 0;
          if (mazeValue === 1) {
            const pixelX = x * GAME_CONFIG.CELL_SIZE;
            const pixelY = y * GAME_CONFIG.CELL_SIZE;
            
            ctx.fillRect(pixelX, pixelY, GAME_CONFIG.CELL_SIZE, GAME_CONFIG.CELL_SIZE);
            ctx.strokeRect(pixelX, pixelY, GAME_CONFIG.CELL_SIZE, GAME_CONFIG.CELL_SIZE);
          }
        }
      }
    }
  }

  private renderDots(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = COLORS.DOT;
    
    for (let y = 0; y < GAME_CONFIG.MAZE_HEIGHT && y < 30; y++) {
      for (let x = 0; x < GAME_CONFIG.MAZE_WIDTH && x < 40; x++) {
        const mazeValue = (window as any).MAZE_LAYOUT?.[y]?.[x];
        if (mazeValue === 2) {
          const pixelX = x * GAME_CONFIG.CELL_SIZE + GAME_CONFIG.CELL_SIZE / 2;
          const pixelY = y * GAME_CONFIG.CELL_SIZE + GAME_CONFIG.CELL_SIZE / 2;
          
          ctx.beginPath();
          ctx.arc(pixelX, pixelY, GAME_CONFIG.DOT_RADIUS, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    }
  }

  private renderUI(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = COLORS.TEXT;
    ctx.font = 'bold 18px Arial';
    
    // Score
    ctx.fillText(`Score: ${this.score}`, 10, 30);
    
    // Lives
    ctx.fillText(`Lives: ${this.lives}`, 10, 55);
    
    // Controls hint
    ctx.font = '12px Arial';
    ctx.fillText('Use arrow keys to move', GAME_CONFIG.CANVAS_WIDTH - 150, 30);
  }

  private renderGameEnd(ctx: CanvasRenderingContext2D): void {
    // Semi-transparent overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.CANVAS_HEIGHT);
    
    ctx.fillStyle = COLORS.TEXT;
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    
    const centerX = GAME_CONFIG.CANVAS_WIDTH / 2;
    const centerY = GAME_CONFIG.CANVAS_HEIGHT / 2;
    
    if (this.gameWon) {
      ctx.fillStyle = COLORS.PACMAN;
      ctx.fillText('YOU WIN!', centerX, centerY - 20);
    } else {
      ctx.fillStyle = COLORS.GHOST_RED;
      ctx.fillText('GAME OVER', centerX, centerY - 20);
    }
    
    ctx.fillStyle = COLORS.TEXT;
    ctx.font = '18px Arial';
    ctx.fillText(`Final Score: ${this.score}`, centerX, centerY + 20);
    
    ctx.font = '14px Arial';
    ctx.fillText('Press F5 to play again', centerX, centerY + 50);
    
    ctx.textAlign = 'left';
  }

  handleKeyPress(code: string): void {
    if (this.gameOver || this.gameWon) return;

    switch (code) {
      case 'ArrowUp':
      case 'KeyW':
        this.pacman.setNextDirection(DIRECTIONS.UP);
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.pacman.setNextDirection(DIRECTIONS.DOWN);
        break;
      case 'ArrowLeft':
      case 'KeyA':
        this.pacman.setNextDirection(DIRECTIONS.LEFT);
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.pacman.setNextDirection(DIRECTIONS.RIGHT);
        break;
    }
  }
}