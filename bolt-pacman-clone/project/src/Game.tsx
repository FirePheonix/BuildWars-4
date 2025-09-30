import React, { useEffect, useRef, useState } from 'react';
import { GameState } from './gameLogic';
import { GAME_CONFIG } from './constants';
import { MAZE_LAYOUT } from './maze';

// Make maze layout available globally for game logic
(window as any).MAZE_LAYOUT = MAZE_LAYOUT;

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameStateRef = useRef<GameState>(new GameState());
  const animationFrameRef = useRef<number>();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = GAME_CONFIG.CANVAS_WIDTH;
    canvas.height = GAME_CONFIG.CANVAS_HEIGHT;

    // Game loop
    const gameLoop = () => {
      gameStateRef.current.update();
      gameStateRef.current.render(ctx);
      
      if (!gameStateRef.current.gameOver && !gameStateRef.current.gameWon) {
        animationFrameRef.current = requestAnimationFrame(gameLoop);
      } else {
        setIsPlaying(false);
      }
    };

    // Input handling
    const handleKeyPress = (event: KeyboardEvent) => {
      event.preventDefault();
      gameStateRef.current.handleKeyPress(event.code);
    };

    // Start game
    const startGame = () => {
      if (!isPlaying) {
        setIsPlaying(true);
        gameStateRef.current = new GameState();
        gameLoop();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    // Auto-start the game
    startGame();

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  const handleRestart = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setIsPlaying(false);
    setTimeout(() => {
      gameStateRef.current = new GameState();
      setIsPlaying(true);
    }, 100);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <div className="mb-4 text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-2">
          PACMAN
        </h1>
        <p className="text-white mb-4">
          Collect all dots while avoiding the ghosts!
        </p>
      </div>
      
      <div className="relative border-4 border-blue-500 rounded-lg overflow-hidden shadow-2xl">
        <canvas
          ref={canvasRef}
          className="block bg-black"
          style={{
            imageRendering: 'pixelated',
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </div>

      <div className="mt-4 text-center space-y-2">
        <div className="text-white text-sm">
          <p><span className="text-yellow-400">Arrow Keys</span> or <span className="text-yellow-400">WASD</span> to move</p>
        </div>
        
        <button
          onClick={handleRestart}
          className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors duration-200 transform hover:scale-105"
        >
          New Game
        </button>
      </div>

      <div className="mt-4 text-xs text-gray-400 text-center max-w-lg">
        <p>Classic Pacman gameplay with four ghosts, each with different AI behaviors.</p>
        <p>Collect all dots to win! Avoid the ghosts or you'll lose a life.</p>
      </div>
    </div>
  );
};

export default Game;