import { Game } from './index';

const WORDS = [
  'kubernetes', 'container', 'terminal', 'compiler', 'function',
  'database', 'network', 'pipeline', 'firewall', 'protocol',
  'variable', 'abstract', 'hardware', 'software', 'debugger',
  'endpoint', 'operator', 'snapshot', 'platform', 'instance',
];

const STAGES = [
  `
  ┌───┐
  │   │
  │
  │
  │
  ═══════`,
  `
  ┌───┐
  │   │
  │   O
  │
  │
  ═══════`,
  `
  ┌───┐
  │   │
  │   O
  │   │
  │
  ═══════`,
  `
  ┌───┐
  │   │
  │   O
  │  /│
  │
  ═══════`,
  `
  ┌───┐
  │   │
  │   O
  │  /│\\
  │
  ═══════`,
  `
  ┌───┐
  │   │
  │   O
  │  /│\\
  │  /
  ═══════`,
  `
  ┌───┐
  │   │
  │   O
  │  /│\\
  │  / \\
  ═══════`,
];

export function createHangman(): Game {
  const word = WORDS[Math.floor(Math.random() * WORDS.length)];
  const guessed = new Set<string>();
  let wrong = 0;

  function renderWord(): string {
    return word.split('').map(c => guessed.has(c) ? c.toUpperCase() : '_').join(' ');
  }

  function render(): string[] {
    return [
      ...STAGES[wrong].split('\n'),
      '',
      `  Word: ${renderWord()}`,
      '',
      `  Guessed: ${[...guessed].sort().join(', ') || '(none)'}`,
      `  Remaining: ${6 - wrong} wrong guesses left`,
    ];
  }

  return {
    name: 'Hangman',
    description: 'Classic word guessing with ASCII art',
    init() {
      return [
        '┌─────────────────────────┐',
        '│       H A N G M A N     │',
        '└─────────────────────────┘',
        '',
        'Guess one letter at a time. 6 wrong guesses and it\'s over!',
        'Type a single letter, or q to quit.',
        ...render(),
      ];
    },
    handleInput(input: string) {
      const letter = input.trim().toLowerCase();
      if (letter.length !== 1 || !/^[a-z]$/.test(letter)) {
        return { output: ['Please enter a single letter (a-z).'], done: false };
      }
      if (guessed.has(letter)) {
        return { output: [`You already guessed '${letter}'.`, ...render()], done: false };
      }

      guessed.add(letter);
      if (!word.includes(letter)) {
        wrong++;
      }

      const won = word.split('').every(c => guessed.has(c));
      if (won) {
        return {
          output: [...render(), '', `🎉 You got it! The word was: ${word.toUpperCase()}`],
          done: true,
        };
      }
      if (wrong >= 6) {
        return {
          output: [...render(), '', `💀 Game over! The word was: ${word.toUpperCase()}`],
          done: true,
        };
      }

      return { output: render(), done: false };
    },
  };
}
