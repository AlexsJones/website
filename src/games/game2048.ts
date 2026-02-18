import { Game } from './index';

export function create2048(): Game {
  const SIZE = 4;
  const grid: number[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
  let score = 0;

  function addRandom() {
    const empty: [number, number][] = [];
    for (let r = 0; r < SIZE; r++)
      for (let c = 0; c < SIZE; c++)
        if (grid[r][c] === 0) empty.push([r, c]);
    if (empty.length === 0) return;
    const [r, c] = empty[Math.floor(Math.random() * empty.length)];
    grid[r][c] = Math.random() < 0.9 ? 2 : 4;
  }

  function slide(row: number[]): number[] {
    const filtered = row.filter(x => x !== 0);
    const result: number[] = [];
    for (let i = 0; i < filtered.length; i++) {
      if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
        result.push(filtered[i] * 2);
        score += filtered[i] * 2;
        i++;
      } else {
        result.push(filtered[i]);
      }
    }
    while (result.length < SIZE) result.push(0);
    return result;
  }

  function move(dir: string): boolean {
    const before = JSON.stringify(grid);
    if (dir === 'left' || dir === 'a') {
      for (let r = 0; r < SIZE; r++) grid[r] = slide(grid[r]);
    } else if (dir === 'right' || dir === 'd') {
      for (let r = 0; r < SIZE; r++) grid[r] = slide([...grid[r]].reverse()).reverse();
    } else if (dir === 'up' || dir === 'w') {
      for (let c = 0; c < SIZE; c++) {
        const col = slide([grid[0][c], grid[1][c], grid[2][c], grid[3][c]]);
        for (let r = 0; r < SIZE; r++) grid[r][c] = col[r];
      }
    } else if (dir === 'down' || dir === 's') {
      for (let c = 0; c < SIZE; c++) {
        const col = slide([grid[3][c], grid[2][c], grid[1][c], grid[0][c]]).reverse();
        for (let r = 0; r < SIZE; r++) grid[r][c] = col[r];
      }
    }
    return JSON.stringify(grid) !== before;
  }

  function canMove(): boolean {
    for (let r = 0; r < SIZE; r++)
      for (let c = 0; c < SIZE; c++) {
        if (grid[r][c] === 0) return true;
        if (c + 1 < SIZE && grid[r][c] === grid[r][c + 1]) return true;
        if (r + 1 < SIZE && grid[r][c] === grid[r + 1][c]) return true;
      }
    return false;
  }

  function hasWon(): boolean {
    return grid.some(row => row.some(c => c >= 2048));
  }

  function pad(n: number): string {
    const s = n === 0 ? '·' : n.toString();
    return s.padStart(4, ' ').padEnd(5, ' ');
  }

  function render(): string[] {
    const border = '  ┌─────┬─────┬─────┬─────┐';
    const divider = '  ├─────┼─────┼─────┼─────┤';
    const bottom = '  └─────┴─────┴─────┴─────┘';
    const lines: string[] = [border];
    for (let r = 0; r < SIZE; r++) {
      lines.push('  │' + grid[r].map(pad).join('│') + '│');
      lines.push(r < SIZE - 1 ? divider : bottom);
    }
    lines.push(`  Score: ${score}`);
    return lines;
  }

  // Start with 2 random tiles
  addRandom();
  addRandom();

  return {
    name: '2048',
    description: 'Slide tiles to reach 2048',
    init() {
      return [
        '┌─────────────────────────┐',
        '│         2 0 4 8         │',
        '└─────────────────────────┘',
        '',
        'Controls: w/a/s/d or up/down/left/right',
        'Type q to quit.',
        '',
        ...render(),
      ];
    },
    handleInput(input: string) {
      const cmd = input.trim().toLowerCase();
      const dirMap: Record<string, string> = {
        w: 'up', a: 'left', s: 'down', d: 'right',
        up: 'up', down: 'down', left: 'left', right: 'right',
      };

      if (!dirMap[cmd]) {
        return { output: ['Use w/a/s/d or up/down/left/right.'], done: false };
      }

      const moved = move(dirMap[cmd]);
      if (moved) addRandom();

      if (hasWon()) {
        return { output: [...render(), '', '🎉 You reached 2048! You win!'], done: true };
      }
      if (!canMove()) {
        return { output: [...render(), '', 'No moves left. Game over! Final score: ' + score], done: true };
      }

      return { output: render(), done: false };
    },
  };
}
