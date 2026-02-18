// Game interface - each game is a simple state machine
export interface Game {
  name: string;
  description: string;
  init(): string[];
  handleInput(input: string): { output: string[]; done: boolean };
}

export type GameFactory = () => Game;

export { createWordle } from './wordle';
export { createHangman } from './hangman';
export { createTictactoe } from './tictactoe';
export { createMinesweeper } from './minesweeper';
export { create2048 } from './game2048';

export const GAME_LIST: { id: string; name: string; description: string; factory: () => Promise<Game> }[] = [
  { id: 'wordle', name: 'Wordle', description: 'Guess the 5-letter word in 6 tries', factory: async () => (await import('./wordle')).createWordle() },
  { id: 'hangman', name: 'Hangman', description: 'Classic word guessing with ASCII art', factory: async () => (await import('./hangman')).createHangman() },
  { id: 'tictactoe', name: 'Tic-Tac-Toe', description: 'Play X vs O against the computer', factory: async () => (await import('./tictactoe')).createTictactoe() },
  { id: 'minesweeper', name: 'Minesweeper', description: 'Reveal cells, avoid mines', factory: async () => (await import('./minesweeper')).createMinesweeper() },
  { id: '2048', name: '2048', description: 'Slide tiles to reach 2048', factory: async () => (await import('./game2048')).create2048() },
];
