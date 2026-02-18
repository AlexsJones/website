import { Game } from './index';

export function createMinesweeper(): Game {
  const SIZE = 8;
  const MINES = 10;
  const board: number[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
  const revealed: boolean[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill(false));
  const flagged: boolean[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill(false));
  const mineMap: boolean[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill(false));
  let gameOver = false;
  let won = false;

  // Place mines
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * SIZE);
    const c = Math.floor(Math.random() * SIZE);
    if (!mineMap[r][c]) {
      mineMap[r][c] = true;
      placed++;
    }
  }

  // Calculate numbers
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (mineMap[r][c]) { board[r][c] = -1; continue; }
      let count = 0;
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE && mineMap[nr][nc]) count++;
        }
      board[r][c] = count;
    }
  }

  function reveal(r: number, c: number) {
    if (r < 0 || r >= SIZE || c < 0 || c >= SIZE || revealed[r][c] || flagged[r][c]) return;
    revealed[r][c] = true;
    if (board[r][c] === 0) {
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) reveal(r + dr, c + dc);
    }
  }

  function checkWin(): boolean {
    for (let r = 0; r < SIZE; r++)
      for (let c = 0; c < SIZE; c++)
        if (!mineMap[r][c] && !revealed[r][c]) return false;
    return true;
  }

  const NUM_CHARS = [' ', '1', '2', '3', '4', '5', '6', '7', '8'];

  function render(): string[] {
    const header = '    ' + Array.from({ length: SIZE }, (_, i) => (i + 1).toString()).join(' ');
    const divider = '   ┌' + '──┬'.repeat(SIZE - 1) + '──┐';
    const bottom = '   └' + '──┴'.repeat(SIZE - 1) + '──┘';
    const lines: string[] = [header, divider];

    for (let r = 0; r < SIZE; r++) {
      let row = ` ${r + 1} │`;
      for (let c = 0; c < SIZE; c++) {
        if (gameOver && mineMap[r][c]) {
          row += '💣│';
        } else if (flagged[r][c]) {
          row += '🚩│';
        } else if (!revealed[r][c]) {
          row += '░░│';
        } else if (board[r][c] === -1) {
          row += '💣│';
        } else {
          row += (board[r][c] === 0 ? '  ' : ' ' + NUM_CHARS[board[r][c]]) + '│';
        }
      }
      lines.push(row);
      if (r < SIZE - 1) lines.push('   ├' + '──┼'.repeat(SIZE - 1) + '──┤');
    }
    lines.push(bottom);
    return lines;
  }

  return {
    name: 'Minesweeper',
    description: 'Reveal cells, avoid mines',
    init() {
      return [
        '┌─────────────────────────────┐',
        '│       MINESWEEPER           │',
        '└─────────────────────────────┘',
        '',
        `${SIZE}×${SIZE} grid, ${MINES} mines`,
        'Commands: r <row> <col> (reveal), f <row> <col> (flag), q (quit)',
        '',
        ...render(),
      ];
    },
    handleInput(input: string) {
      const parts = input.trim().toLowerCase().split(/\s+/);
      const cmd = parts[0];
      const r = parseInt(parts[1]) - 1;
      const c = parseInt(parts[2]) - 1;

      if (cmd === 'r' || cmd === 'reveal') {
        if (isNaN(r) || isNaN(c) || r < 0 || r >= SIZE || c < 0 || c >= SIZE) {
          return { output: ['Usage: r <row> <col> (1-' + SIZE + ')'], done: false };
        }
        if (mineMap[r][c]) {
          gameOver = true;
          return { output: [...render(), '', '💥 BOOM! You hit a mine!'], done: true };
        }
        reveal(r, c);
        won = checkWin();
        if (won) {
          return { output: [...render(), '', '🎉 You cleared the field!'], done: true };
        }
        return { output: render(), done: false };
      }

      if (cmd === 'f' || cmd === 'flag') {
        if (isNaN(r) || isNaN(c) || r < 0 || r >= SIZE || c < 0 || c >= SIZE) {
          return { output: ['Usage: f <row> <col> (1-' + SIZE + ')'], done: false };
        }
        if (revealed[r][c]) {
          return { output: ['Cell already revealed.', ...render()], done: false };
        }
        flagged[r][c] = !flagged[r][c];
        return { output: render(), done: false };
      }

      return { output: ['Commands: r <row> <col>, f <row> <col>, q'], done: false };
    },
  };
}
