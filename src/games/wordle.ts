import { Game } from './index';

const WORDS = [
  'audio', 'beach', 'crane', 'delta', 'eagle', 'flame', 'grape', 'house',
  'ivory', 'jewel', 'knack', 'lemon', 'maple', 'nerve', 'ocean', 'pearl',
  'queen', 'rover', 'solar', 'thorn', 'ultra', 'vivid', 'world', 'xenon',
  'yacht', 'zebra', 'brain', 'cloud', 'drift', 'forge', 'glyph', 'haste',
  'input', 'joust', 'knife', 'lunar', 'magic', 'noble', 'orbit', 'plume',
  'quest', 'rogue', 'steam', 'trace', 'unity', 'vigor', 'wheat', 'pixel',
];

export function createWordle(): Game {
  const word = WORDS[Math.floor(Math.random() * WORDS.length)];
  const guesses: string[] = [];
  const feedbacks: string[][] = [];

  function renderBoard(): string[] {
    const lines: string[] = [''];
    for (let i = 0; i < guesses.length; i++) {
      lines.push(`  ${guesses[i].toUpperCase().split('').join(' ')}    ${feedbacks[i].join(' ')}`);
    }
    for (let i = guesses.length; i < 6; i++) {
      lines.push('  _ _ _ _ _');
    }
    lines.push('');
    lines.push(`  Attempt ${guesses.length}/6`);
    return lines;
  }

  return {
    name: 'Wordle',
    description: 'Guess the 5-letter word in 6 tries',
    init() {
      return [
        '┌─────────────────────────┐',
        '│        W O R D L E      │',
        '└─────────────────────────┘',
        '',
        'Guess the 5-letter word. You have 6 attempts.',
        '🟩 = correct letter & position',
        '🟨 = correct letter, wrong position',
        '⬜ = letter not in word',
        '',
        'Type a 5-letter word, or q to quit.',
        ...renderBoard(),
      ];
    },
    handleInput(input: string) {
      const guess = input.trim().toLowerCase();
      if (guess.length !== 5 || !/^[a-z]+$/.test(guess)) {
        return { output: ['Please enter a valid 5-letter word.'], done: false };
      }

      const feedback: string[] = [];
      const wordArr = word.split('');
      const used = Array(5).fill(false);

      // First pass: exact matches
      for (let i = 0; i < 5; i++) {
        if (guess[i] === wordArr[i]) {
          feedback[i] = '🟩';
          used[i] = true;
        }
      }
      // Second pass: wrong position
      for (let i = 0; i < 5; i++) {
        if (feedback[i]) continue;
        const idx = wordArr.findIndex((c, j) => c === guess[i] && !used[j]);
        if (idx !== -1) {
          feedback[i] = '🟨';
          used[idx] = true;
        } else {
          feedback[i] = '⬜';
        }
      }

      guesses.push(guess);
      feedbacks.push(feedback);

      if (guess === word) {
        return {
          output: [...renderBoard(), '', `🎉 You got it in ${guesses.length}/6!`],
          done: true,
        };
      }

      if (guesses.length >= 6) {
        return {
          output: [...renderBoard(), '', `The word was: ${word.toUpperCase()}. Better luck next time!`],
          done: true,
        };
      }

      return { output: renderBoard(), done: false };
    },
  };
}
