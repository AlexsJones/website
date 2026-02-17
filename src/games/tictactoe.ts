import { Game } from './index';

type Cell = 'X' | 'O' | '';

export function createTictactoe(): Game {
  const board: Cell[][] = [['', '', ''], ['', '', ''], ['', '', '']];

  function renderBoard(): string[] {
    const rows = board.map((row, i) =>
      `  ${row.map((c, j) => c || (i * 3 + j + 1).toString()).join(' │ ')}`
    );
    return [
      rows[0],
      '  ──┼───┼──',
      rows[1],
      '  ──┼───┼──',
      rows[2],
    ];
  }

  function checkWin(player: Cell): boolean {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === player && board[i][1] === player && board[i][2] === player) return true;
      if (board[0][i] === player && board[1][i] === player && board[2][i] === player) return true;
    }
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true;
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true;
    return false;
  }

  function isFull(): boolean {
    return board.every(row => row.every(c => c !== ''));
  }

  function aiMove() {
    // Try to win
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (board[i][j] === '') { board[i][j] = 'O'; if (checkWin('O')) return; board[i][j] = ''; }
    // Try to block
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (board[i][j] === '') { board[i][j] = 'X'; if (checkWin('X')) { board[i][j] = 'O'; return; } board[i][j] = ''; }
    // Take center
    if (board[1][1] === '') { board[1][1] = 'O'; return; }
    // Take corner
    for (const [i, j] of [[0,0],[0,2],[2,0],[2,2]] as [number,number][])
      if (board[i][j] === '') { board[i][j] = 'O'; return; }
    // Take any
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (board[i][j] === '') { board[i][j] = 'O'; return; }
  }

  return {
    name: 'Tic-Tac-Toe',
    description: 'Play X vs O against the computer',
    init() {
      return [
        '┌─────────────────────────┐',
        '│     TIC-TAC-TOE         │',
        '└─────────────────────────┘',
        '',
        'You are X. Enter a number (1-9) to place your mark:',
        '',
        ...renderBoard(),
        '',
      ];
    },
    handleInput(input: string) {
      const num = parseInt(input.trim());
      if (isNaN(num) || num < 1 || num > 9) {
        return { output: ['Enter a number 1-9.'], done: false };
      }

      const row = Math.floor((num - 1) / 3);
      const col = (num - 1) % 3;
      if (board[row][col] !== '') {
        return { output: ['That cell is taken!', ...renderBoard()], done: false };
      }

      board[row][col] = 'X';
      if (checkWin('X')) {
        return { output: [...renderBoard(), '', '🎉 You win!'], done: true };
      }
      if (isFull()) {
        return { output: [...renderBoard(), '', "It's a draw!"], done: true };
      }

      aiMove();
      if (checkWin('O')) {
        return { output: [...renderBoard(), '', '🤖 Computer wins!'], done: true };
      }
      if (isFull()) {
        return { output: [...renderBoard(), '', "It's a draw!"], done: true };
      }

      return { output: [...renderBoard(), ''], done: false };
    },
  };
}
